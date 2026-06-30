#!/usr/bin/env python3
"""
Telegram Voice Remote — voice control for Claude Code.
Send a voice note → Whisper transcribes locally → claude -p runs it → reply.
No Anthropic API key needed. Uses your Claude Pro plan via the CLI.
"""

import asyncio
import json
import os
import subprocess
import tempfile
import time
from pathlib import Path

# Only one claude subprocess at a time — prevents token pile-ups from concurrent requests
_claude_lock = asyncio.Lock()

from dotenv import load_dotenv
from faster_whisper import WhisperModel
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

load_dotenv()

BOT_TOKEN       = os.getenv("TELEGRAM_BOT_TOKEN")
ALLOWED_USER_ID = int(os.getenv("ALLOWED_USER_ID"))

HERE          = Path(__file__).parent
CATCHUP_FILE  = HERE / "catchup.md"
PROMPT_FILE   = HERE / "prompt.txt"
HISTORY_FILE  = HERE / "history.json"
INFLIGHT_FILE = HERE / "inflight.json"

# Mutable session state
state = {
    "workdir":      os.getenv("CLAUDE_WORKDIR", str(Path.home())),
    "extra_prompt": PROMPT_FILE.read_text().strip() if PROMPT_FILE.exists() else "",
    "history":      json.loads(HISTORY_FILE.read_text()) if HISTORY_FILE.exists() else [],  # list of {"user": str, "bot": str}
}

# Load Whisper once at startup (base model ~150MB, runs fine on CPU)
print("Loading Whisper model...", flush=True)
whisper = WhisperModel("base", device="cpu", compute_type="int8")
print("✓ Whisper ready", flush=True)


# ── Core ───────────────────────────────────────────────────────────────────────────────────

def detect_project(message: str) -> tuple[Path, str] | tuple[None, None]:
    """
    Scans direct subdirectories of workdir for CLAUDE.md files, then checks if
    any folder name appears in the message (case-insensitive).
    Returns (project_path, claude_md_content) or (None, None) if not found.
    """
    base = Path(state["workdir"])
    msg  = message.lower()
    for subdir in sorted(base.iterdir()):
        if subdir.is_dir():
            claude_md = subdir / "CLAUDE.md"
            if claude_md.exists() and subdir.name.lower() in msg:
                return subdir, claude_md.read_text().strip()
    return None, None


def build_prompt(user_message: str) -> tuple[str, str]:
    """Returns (cwd, full_prompt_string)."""
    parts = []

    # 1. Session memory
    if CATCHUP_FILE.exists():
        catchup = CATCHUP_FILE.read_text().strip()
        if catchup:
            parts.append("[MEMORIA DE SESIONES ANTERIORES]\n" + catchup)

    # 2. Project CLAUDE.md — only when a project is detected and message looks like a task
    project_dir, claude_md = detect_project(user_message)
    is_task_flag = len(user_message.split()) > 3  # skip for short replies like "dale", "ok"
    if claude_md and is_task_flag:
        trimmed = "\n".join(claude_md.splitlines()[:100])
        parts.append(f"[CLAUDE.md DEL PROYECTO — {project_dir.name}]\n" + trimmed)
        cwd = str(project_dir)
    else:
        cwd = state["workdir"]

    # 3. Conversation history — last 5 turns, bot responses capped at 300 chars to save tokens
    if state["history"]:
        turns = state["history"][-5:]
        lines = []
        for h in turns:
            bot_text = h["bot"][:300] + ("…" if len(h["bot"]) > 300 else "")
            lines.append("Usuario: " + h["user"] + "\nClaude: " + bot_text)
        parts.append("[HISTORIAL DE ESTA SESIÓN]\n" + "\n".join(lines))

    # 4. Extra user instructions
    if state["extra_prompt"]:
        parts.append("[INSTRUCCIONES ESPECIALES]\n" + state["extra_prompt"])

    # 5. Environment marker
    parts.append("[ENTORNO]\nEsta sesión fue iniciada vía Alan (Telegram bot alan_mp_bot). Si escribís en catchup.md, usá \"vía Alan\" como Source.")

    # 6. The actual request
    parts.append("[PEDIDO]\n" + user_message)

    return cwd, "\n\n".join(parts)


TASK_KEYWORDS = ("implementa", "crea", "modifica", "agrega", "borra", "elimina",
                 "refactor", "arregla", "fix", "push", "commit", "deploy",
                 "instala", "configura", "mueve", "renombra", "build")

def is_task(message: str) -> bool:
    msg = message.lower()
    if any(kw in msg for kw in TASK_KEYWORDS):
        return True
    # Long messages without ? are probably tasks
    words = msg.split()
    return len(words) > 8 and not msg.rstrip().endswith("?")


def run_claude(user_message: str) -> str:
    t0  = time.time()
    cwd, prompt = build_prompt(user_message)
    cmd = ["/Users/mataldao/.local/bin/claude", "-p", prompt, "--dangerously-skip-permissions", "--max-turns", "10"]
    if not is_task(user_message):
        # Conversational / question — disable shell tools for fast pure-text response
        cmd += ["--disallowed-tools", "Bash,Edit,Write,MultiEdit,NotebookEdit"]
    mode = "task" if is_task(user_message) else "chat"
    print(f"[claude/{mode}] start: {user_message[:80]} | cwd={cwd}", flush=True)
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        cwd=cwd,
        timeout=300,
    )
    print(f"[claude] done in {time.time()-t0:.1f}s | exit={result.returncode}", flush=True)
    output = (result.stdout or result.stderr or "Sin respuesta.").strip()
    if len(output) > 4000:
        output = output[:4000] + "\n\n_(respuesta recortada — pedí el resto si necesitás)_"
    return output


def transcribe(audio_path: str) -> str:
    segments, _ = whisper.transcribe(audio_path)
    return " ".join(s.text.strip() for s in segments).strip()


# ── Auth guard ─────────────────────────────────────────────────────────────────────────────

def only_me(func):
    async def wrapper(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
        uid = update.effective_user.id
        if uid != ALLOWED_USER_ID:
            print(f"[BLOCKED] Unauthorized access attempt from user_id={uid} username={update.effective_user.username!r}", flush=True)
            return
        return await func(update, ctx)
    return wrapper


# ── Handlers ──────────────────────────────────────────────────────────────────────────────

@only_me
async def cmd_start(update: Update, _ctx: ContextTypes.DEFAULT_TYPE):
    catchup_status = "✓ cargado" if CATCHUP_FILE.exists() and CATCHUP_FILE.read_text().strip() else "vacío"
    prompt_status  = f"`{state['extra_prompt'][:60]}...`" if state["extra_prompt"] else "_ninguno_"
    text = (
        "🎙️ *Voice Remote — Claude Code*\n\n"
        "Mandamé un audio o texto y lo ejecuto con Claude\\.\n\n"
        f"📁 Directorio: `{state['workdir']}`\n"
        f"🧠 Memoria: {catchup_status}\n"
        f"💬 Prompt extra: {prompt_status}\n\n"
        "/cd `<path>` — cambiar directorio\n"
        "/edit\\-prompt `<texto>` — cambiar instrucciones\n"
        "/edit\\-prompt — ver instrucciones actuales"
    )
    await update.message.reply_text(text, parse_mode="MarkdownV2")


@only_me
async def cmd_cd(update: Update, _ctx: ContextTypes.DEFAULT_TYPE):
    parts = update.message.text.split(maxsplit=1)
    if len(parts) < 2:
        await update.message.reply_text(
            f"📁 Directorio actual: `{state['workdir']}`", parse_mode="Markdown"
        )
        return
    path = os.path.expanduser(parts[1].strip())
    if not os.path.isdir(path):
        await update.message.reply_text(f"❌ No existe: `{path}`", parse_mode="Markdown")
        return
    state["workdir"] = path
    await update.message.reply_text(f"✓ Directorio: `{path}`", parse_mode="Markdown")


@only_me
async def cmd_clear(update: Update, _ctx: ContextTypes.DEFAULT_TYPE):
    state["history"] = []
    if HISTORY_FILE.exists():
        HISTORY_FILE.unlink()
    await update.message.reply_text("✓ Historial limpiado.")


@only_me
async def cmd_edit_prompt(update: Update, _ctx: ContextTypes.DEFAULT_TYPE):
    parts = update.message.text.split(maxsplit=1)
    if len(parts) < 2:
        current = state["extra_prompt"] or "_ninguno_"
        await update.message.reply_text(
            f"💬 Prompt extra actual:\n\n{current}", parse_mode="Markdown"
        )
        return
    new_prompt = parts[1].strip()
    state["extra_prompt"] = new_prompt
    PROMPT_FILE.write_text(new_prompt)
    await update.message.reply_text("✓ Prompt actualizado.")


@only_me
async def handle_voice(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    msg = await update.message.reply_text("_Transcribiendo..._", parse_mode="Markdown")
    voice = update.message.voice or update.message.audio
    tg_file = await ctx.bot.get_file(voice.file_id)

    with tempfile.NamedTemporaryFile(suffix=".ogg", delete=False) as f:
        tmp_path = f.name
    try:
        await tg_file.download_to_drive(tmp_path)
        loop = asyncio.get_event_loop()
        text = await loop.run_in_executor(None, transcribe, tmp_path)
    finally:
        os.unlink(tmp_path)

    if not text:
        await msg.edit_text("No pude transcribir el audio.")
        return

    await msg.edit_text(f"🎙 _{text}_", parse_mode="Markdown")
    await _run_and_reply(update, text)


@only_me
async def handle_text(update: Update, _ctx: ContextTypes.DEFAULT_TYPE):
    await _run_and_reply(update, update.message.text)


async def _run_and_reply(update: Update, prompt: str):
    # Defense-in-depth: verify identity even if called outside @only_me
    if update.effective_user.id != ALLOWED_USER_ID:
        return

    if _claude_lock.locked():
        await update.message.reply_text("_Procesando el mensaje anterior, esperá un momento..._", parse_mode="Markdown")
        return

    async with _claude_lock:
        loop = asyncio.get_event_loop()
        future = loop.run_in_executor(None, run_claude, prompt)
        thinking = None
        try:
            response = await asyncio.wait_for(asyncio.shield(future), timeout=5.0)
        except asyncio.TimeoutError:
            thinking = await update.message.reply_text("_Pensando..._", parse_mode="Markdown")
            response = await future
        state["history"].append({"user": prompt, "bot": response})
        HISTORY_FILE.write_text(json.dumps(state["history"][-20:]))
        if thinking:
            await thinking.delete()
        await update.message.reply_text(response)


# ── Entry point ──────────────────────────────────────────────────────────────────────────────

def main():
    INFLIGHT_FILE.unlink(missing_ok=True)  # clear any stale inflight from crashed sessions
    app = Application.builder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start",       cmd_start))
    app.add_handler(CommandHandler("cd",          cmd_cd))
    app.add_handler(CommandHandler("clear",       cmd_clear))
    app.add_handler(CommandHandler("edit_prompt", cmd_edit_prompt))
    app.add_handler(MessageHandler(filters.VOICE | filters.AUDIO, handle_voice))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text))

    print("✓ Bot corriendo — mandá /start en Telegram", flush=True)
    app.run_polling(drop_pending_updates=True, close_loop=False)


if __name__ == "__main__":
    main()
