import { Routes, Route } from 'react-router-dom'
import BudgetTemplate from './components/BudgetTemplate'
import HealthMvp from './pages/HealthMvp'
import TecnoFit from './pages/TecnoFit'
import TecnoFitTVs from './pages/TecnoFitTVs'
import TecnoFitSprint1 from './pages/TecnoFitSprint1'
import TecnoFitSprint1Mcp from './pages/TecnoFitSprint1Mcp'
import Ronzio from './pages/Ronzio'
import GinLane from './pages/GinLane'
import SendaArqAds from './pages/SendaArqAds'
import Home from './pages/Home'
import Agent from './pages/Agent'
import Monotributo from './pages/Monotributo'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budget/health-mvp" element={
          <BudgetTemplate
            title="MVP Salud y Bienestar"
            timeline="2 a 3 meses"
            stack="Web App · React · Vercel"
            whatLabel="Propuesta"
          >
            <HealthMvp />
          </BudgetTemplate>
        } />
        <Route path="/budget/tecnofit" element={
          <BudgetTemplate
            title="TecnoFit"
            whatLabel="Budget & Remainder"
          >
            <TecnoFit />
          </BudgetTemplate>
        } />
        <Route path="/budget/tecnofit-tvs" element={
          <BudgetTemplate
            title="Fitness Central — TecnoFit"
            timeline="8 semanas · 4 sprints"
            stack="Supabase · Realtime · pg_cron"
            whatLabel="Timeline & Propuesta"
          >
            <TecnoFitTVs />
          </BudgetTemplate>
        } />
        <Route path="/budget/tecnofit-sprint-1" element={
          <BudgetTemplate
            title="Sprint 1 — Catálogo y video — TecnoFit"
            timeline="2 semanas · Sprint 1 de 4"
            stack="Supabase Storage · Transcodificación · CDN"
            whatLabel="Plan de Sprint"
          >
            <TecnoFitSprint1 />
          </BudgetTemplate>
        } />
        <Route path="/budget/tecnofit-sprint-1-mcp" element={
          <BudgetTemplate
            title="Sprint 1 — Carga por conversación — TecnoFit"
            timeline="Sprint 1 · plan de implementación"
            stack="MCP local · ffmpeg · Supabase Storage"
            whatLabel="Implementación"
          >
            <TecnoFitSprint1Mcp />
          </BudgetTemplate>
        } />
        <Route path="/budget/ronzio" element={
          <BudgetTemplate
            title="Ronzio"
            timeline="45–60 días + 75 días follow-ups"
            stack="Landing + CRM · React · Vercel"
            whatLabel="Propuesta"
          >
            <Ronzio />
          </BudgetTemplate>
        } />
        <Route path="/budget/gin-lane" element={
          <BudgetTemplate
            title="Gin Lane"
            timeline="1 semana"
            stack="Landing One-Pager · React · Vercel"
            whatLabel="Propuesta"
          >
            <GinLane />
          </BudgetTemplate>
        } />
        <Route path="/budget/senda-arq-ads" element={
          <BudgetTemplate
            title="Senda Arquitectura — Ads"
            timeline="Mensual · renovable"
            stack="Meta Ads · Google Ads"
            whatLabel="Propuesta mensual"
          >
            <SendaArqAds />
          </BudgetTemplate>
        } />
        <Route path="/agent" element={<Agent />} />
        <Route path="/monotributo" element={<Monotributo />} />
      </Routes>
    </div>
  )
}
