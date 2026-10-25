// Textos de la Sala en tres variantes:
//   ar: rioplatense (voseo)         → navegadores es-AR / es-UY
//   es: castellano neutro (tú/usted) → el resto de es-*
//   en: inglés                       → cualquier otro idioma (incluido portugués)
// Se elige una vez por navigator.languages (el primero manda) y no cambia en la sesión.

export type Idioma = 'ar' | 'es' | 'en'

export function detectarIdioma(langs?: readonly string[]): Idioma {
  const l = (langs ?? (typeof navigator !== 'undefined' ? (navigator.languages?.length ? navigator.languages : [navigator.language]) : [])).filter(Boolean)
  const primero = (l[0] ?? 'en').toLowerCase()
  if (/^es-(ar|uy)\b/.test(primero)) return 'ar'
  if (primero === 'es' || primero.startsWith('es-')) return 'es'
  return 'en'
}

const listaDe = (y: string) => (xs: string[]) => xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${y} ${xs[xs.length - 1]}`

type Privacidad = { titulo: string; intro: string; volver: string; secciones: { h: string; p: string }[]; contacto: string }

const ar = {
  lang: 'es-AR', html: 'es', hora12: false,
  listar: listaDe('y'),
  // errores
  errRed: 'No hay conexión con la sala. Revisá tu internet y probá de nuevo.',
  errWaf: 'El mensaje no pasó el filtro de seguridad.',
  errNombreRechazado: 'No pudimos procesar ese nombre. Probá con otro, sin símbolos raros.',
  errHttp: (n: number) => `Error ${n}`,
  errClave: 'Tu acceso venció. Entrá de nuevo con el link de invitación.',
  errLimiteIA: 'Límite de 3 idas y vueltas entre IAs en este hilo: esperá a que escriba una persona.',
  errNombreInvalido: 'El nombre no puede tener < ni >. Poné sólo tu nombre.',
  errNombreBot: 'Ese nombre es de un bot o una IA: elegí "Es un bot o IA" para entrar así.',
  errNombreReservado: 'Ese nombre está reservado: se parece al de alguien del equipo. Elegí otro.',
  errNombreTomado: 'Ya hay alguien con ese nombre en la sala. Probá con otro.',
  errLinkVencido: 'El link venció o ya se usó. Pedile uno nuevo a Mateo.',
  errArchivoGrande: 'El archivo pesa demasiado (máximo 50 MB).',
  errServidor: 'La sala tuvo un problema. Probá de nuevo en unos segundos.',
  errVacio: 'El mensaje está vacío.',
  errSubida: (n: number) => `no se pudo subir el archivo (HTTP ${n})`,
  sinConexion: 'Sin conexión, reintentando…',
  noSeMando: (e: string) => `No se pudo mandar. ${e} Tu mensaje sigue en el cuadro de texto.`,
  archivoMas50: 'El archivo pesa más de 50 MB',
  noReaccion: (e: string) => `No se pudo reaccionar: ${e}`,
  noEditar: (e: string) => `No se pudo editar: ${e}`,
  noBorrar: (e: string) => `No se pudo borrar: ${e}`,
  noElegir: (op: string, e: string) => `No se pudo elegir "${op}": ${e}`,
  // fechas
  hoy: 'Hoy', ayer: 'Ayer',
  // general
  sala: 'Sala', copiar: 'Copiar', copiado: 'Copiado', subiendo: 'Subiendo…', abrirOBajar: 'Abrir o bajar', tocarBajar: 'Tocá para bajarlo',
  privacidad: 'Privacidad',
  // pantallas
  entrando: 'Entrando a la sala…',
  sinAcceso: 'Sin acceso', sinAccesoLede: 'Para entrar hace falta el link de invitación. Pedíselo a Mateo.',
  descSala: (equipo: string[], personas: number, agentes: string[]) => {
    const partes = [listaDe('y')(equipo.length ? equipo : ['Mateo'])]
    if (personas > 0) partes.push(`${personas} ${personas === 1 ? 'persona' : 'personas'}`)
    if (agentes.length) partes.push(agentes.length === 1 ? `el agente ${agentes[0]}` : agentes.length === 2 ? `los agentes ${listaDe('y')(agentes)}` : `${agentes.length} agentes`)
    return `Sala con ${listaDe('y')(partes)}`
  },
  ledeResto: 'Mandá fotos, archivos o lo que necesites, y bajá lo que te manden.',
  avisoIA: 'En esta sala hay agentes de IA de Marco Polo que leen y responden los mensajes.',
  yaEsta: 'ya está adentro.', yaEstan: 'ya están adentro.', masN: (n: number) => `${n} más`,
  cargandoInv: 'Cargando la invitación…',
  quienEntra: 'Quién entra', soyPersona: 'Soy una persona', esBot: 'Es un bot o IA',
  nombreAgente: 'Nombre del agente', tuNombre: 'Tu nombre', phAgente: 'Ej: Grok de Martín',
  pareceBot: 'Ese nombre parece de un bot o una IA.', entrarComoAgente: 'Entrar como agente',
  sumarAgente: 'Sumar al agente', entrarSala: 'Entrar a la sala', entrandoBtn: 'Entrando…',
  fineAgente: 'Va a aparecer con la marca Agente y sus mensajes cuentan como de una IA. El link es el acceso: no lo reenvíes.',
  finePersona: 'Quien entra ve el historial. El link es tu acceso: no lo reenvíes.',
  // composer
  phCanal: 'Escribile a la sala…', phHilo: 'Responder en el hilo…',
  phCanalAgente: (a: string) => `Escribile a ${a} o a la sala…`, phCanalAgentes: 'Escribile a la sala o a un agente con @…',
  pistaAgente: (a: string) => `Preguntale lo que necesites a ${a}`, pistaAgentes: 'Preguntale lo que necesites a un agente: escribí @ y elegilo',
  ariaHilo: 'Responder en el hilo', ariaCanal: 'Mensaje',
  adjuntar: 'Adjuntar un archivo (hasta 50 MB)', seMandaCon: 'se manda con el mensaje', sacar: 'Sacar',
  tambien: 'También mandar a la sala', tambienAyuda: 'se ve también en el chat principal',
  tambienTitulo: 'Tu respuesta queda en el hilo y además aparece en el chat principal, para que todos la vean.',
  hintEnviar: 'Enter para mandar · Shift + Enter, nueva línea', hintMencion: '↑↓ · Enter elige · Esc cierra',
  mencionar: 'Mencionar a alguien', mandar: 'Mandar', mandarHilo: 'Mandar en el hilo',
  agente: 'Agente', invitado: 'Invitado', escribiendo: 'Escribiendo', estaEscribiendo: (a: string) => `${a} está escribiendo…`,
  // decisiones
  decision: 'Decisión', necesitaDecision: 'Necesita una decisión', esperandoA: (x: string) => `Esperando a ${x}`, recomendada: 'Recomendada',
  cambiasteEleccion: 'Cambiaste la elección', cambioEleccion: (a: string) => `${a} cambió la elección`, elegisteVos: 'Elegiste vos', eligio: (a: string) => `Eligió ${a}`,
  yaLaTomo: (a: string) => `${a} ya la tomó`, cambiar: 'Cambiar', elegiOtra: (a: string) => `Elegí otra opción mientras ${a} no la tome.`, cancelar: 'Cancelar',
  // mensaje
  enRespuestaA: 'En respuesta a', mensajeBorrado: 'mensaje borrado', msgBorrado: 'Mensaje borrado', editado: '(editado)',
  escCancelar: 'Esc para cancelar · Enter para guardar', guardar: 'Guardar',
  confirmarBorrar: '¿Borrar este mensaje? Los demás van a ver “Mensaje borrado”.', borrar: 'Borrar',
  atendidoPor: (x: string) => `Atendido por ${x}`, loEstaViendo: (x: string) => `${x} lo está viendo`, visto: 'Visto', leyendo: 'Leyendo',
  respuesta: 'respuesta', respuestas: 'respuestas', ultima: 'última', hayNuevas: 'Hay respuestas nuevas', verRespuestas: 'Ver respuestas',
  responder: 'Responder', cargandoRespuestas: 'Cargando respuestas…', errHilo: 'No se pudieron cargar las respuestas.', reintentar: 'Reintentar',
  vosTag: 'Vos', nuevoParaVos: 'Nuevo para vos', responderleA: (a: string) => `Responderle a ${a}`,
  soloEquipo: 'Sólo lo ve el equipo',
  ariaResponderA: (a: string, x: string) => `Responder a ${a}: ${x}`,
  ariaRespuestasA: (n: number, a: string, x: string) => `${n} ${n === 1 ? 'respuesta' : 'respuestas'} a ${a}: ${x}`,
  ariaResponderleA: (a: string, x: string) => `Responderle a ${a}: ${x}`,
  vistoPor: (x: string) => `Visto · ${x}`, leyendoPor: (x: string) => `${x} lo está leyendo…`,
  reaccionar: 'Reaccionar', responderHilo: 'Responder en hilo',
  responderHiloAyuda: 'Responder en un hilo: una conversación aparte, debajo de este mensaje, para no llenar el chat principal',
  editar: 'Editar', nuevos: 'Nuevos',
  // chat
  notiNombro: (a: string, t: string) => `${a} te nombró en ${t}`,
  salaYArchivos: 'Sala y archivos', tema: 'Tema', modoClaro: 'Modo claro', modoOscuro: 'Modo oscuro',
  conectando: 'Conectando…', enLaSala: (n: number) => `${n} en la sala`, nEscribiendo: (n: number) => `${n} escribiendo`,
  vacio: 'Todavía no hay mensajes. Escribí el primero.',
  mensajeNuevo: 'mensaje nuevo', mensajesNuevos: 'mensajes nuevos',
  hilo: 'Hilo', hiloAyuda: 'Conversación aparte', volver: 'Volver', cerrar: 'Cerrar', sinRespuestas: 'Todavía sin respuestas',
  // lateral
  enLaSalaSec: 'En la sala', vos: '(vos)', conectado: 'Conectado', sinConexionDot: 'Sin conexión', archivos: 'Archivos',
  decisionesCfg: 'Decisiones · quién responde', quienResponde: 'Quién responde las decisiones', soloEsa: 'Sólo esa persona', cualquiera: 'Cualquiera',
  conectadoDesde: 'Conectado desde este dispositivo', avisarme: 'Avisarme cuando me nombren', avisamos: 'Te avisamos cuando te nombren',
  sumarClaude: 'Conectar mi Claude', reconectarClaude: 'Reconectar mi Claude',
  sumarClaudeAyuda: 'Para quien usa Claude Code: instala un conector para que tu Claude lea y conteste en esta sala',
  modalTitulo: 'Conectar tu Claude a la sala',
  modal1: 'Si usás Claude Code en tu computadora, pegá esto en la terminal. Instala el conector de la sala con una clave sólo para tu Claude:',
  modal2: 'Después abrí Claude con este comando (la primera vez muestra un aviso: elegí "I am using this for local development"):',
  modal3: (yo: string) => `Va a aparecer en la sala como "Claude de ${yo}" y va a leer y contestar los mensajes solo.`,
  copiarPrimero: 'Copiar el primero', listo: 'Listo',
  // privacidad
  priv: {
    titulo: 'Privacidad', volver: 'Volver a la sala',
    intro: 'La sala es un chat grupal donde también participan agentes de IA de Marco Polo. Esto es lo que tenés que saber.',
    secciones: [
      { h: 'Quién ve los mensajes', p: 'Los miembros de la sala, el equipo de Marco Polo y sus agentes de IA, que leen y responden los mensajes. Quien entra a la sala ve el historial completo de mensajes, también los anteriores a su llegada. Los hilos también son visibles para todos los miembros de la sala.' },
      { h: 'Qué se guarda y dónde', p: 'Tu nombre, tus mensajes y los archivos que subas. Todo se guarda en servidores de Supabase. Los archivos adjuntos quedan guardados en Supabase. Los agentes de IA trabajan en computadoras del equipo de Marco Polo y pueden descargar ahí los archivos de la sala para trabajar con ellos. En tu dispositivo queda guardada la clave de acceso para que no tengas que entrar de nuevo.' },
      { h: 'Cuánto tiempo se guardan', p: 'Los mensajes y archivos se guardan mientras la sala esté activa, o hasta que pidas el borrado.' },
      { h: 'Los agentes de IA', p: 'Los agentes usan modelos de IA de Anthropic para responder: lo que se escribe en la sala les llega para que puedan contestar.' },
      { h: 'El link es el acceso', p: 'Quien tenga tu link puede entrar a la sala como vos. No lo reenvíes.' },
      { h: 'Borrar todo', p: 'Si querés que se borre todo lo tuyo (nombre, mensajes y archivos), escribí a m@marcopolo.agency.' },
    ],
    contacto: 'm@marcopolo.agency',
  } as Privacidad,
}

export type Dict = typeof ar

const es: Dict = {
  ...ar,
  lang: 'es-ES', html: 'es', hora12: false,
  errRed: 'No hay conexión con la sala. Revisa tu internet e inténtalo de nuevo.',
  errClave: 'Tu acceso ha caducado. Entra de nuevo con el enlace de invitación.',
  errLimiteIA: 'Límite de 3 idas y vueltas entre IAs en este hilo: espera a que escriba una persona.',
  errNombreInvalido: 'El nombre no puede tener < ni >. Pon solo tu nombre.',
  errNombreBot: 'Ese nombre es de un bot o una IA: elige "Es un bot o IA" para entrar así.',
  errNombreReservado: 'Ese nombre está reservado: se parece al de alguien del equipo. Elige otro.',
  errNombreTomado: 'Ya hay alguien con ese nombre en la sala. Prueba con otro.',
  errLinkVencido: 'El enlace ha caducado o ya se usó. Pídele uno nuevo a Mateo.',
  errServidor: 'La sala tuvo un problema. Inténtalo de nuevo en unos segundos.',
  sinConexion: 'Sin conexión, reintentando…',
  noSeMando: (e: string) => `No se pudo enviar. ${e} Tu mensaje sigue en el cuadro de texto.`,
  noReaccion: (e: string) => `No se pudo reaccionar: ${e}`,
  copiar: 'Copiar', tocarBajar: 'Toca para descargarlo', abrirOBajar: 'Abrir o descargar',
  sinAccesoLede: 'Para entrar hace falta el enlace de invitación. Pídeselo a Mateo.',
  descSala: (equipo: string[], personas: number, agentes: string[]) => {
    const partes = [listaDe('y')(equipo.length ? equipo : ['Mateo'])]
    if (personas > 0) partes.push(`${personas} ${personas === 1 ? 'persona' : 'personas'}`)
    if (agentes.length) partes.push(agentes.length === 1 ? `el agente ${agentes[0]}` : agentes.length === 2 ? `los agentes ${listaDe('y')(agentes)}` : `${agentes.length} agentes`)
    return `Sala con ${listaDe('y')(partes)}`
  },
  ledeResto: 'Envía fotos, archivos o lo que necesites, y descarga lo que te manden.',
  fineAgente: 'Aparecerá con la marca Agente y sus mensajes cuentan como de una IA. El enlace es el acceso: no lo reenvíes.',
  finePersona: 'Quien entra ve el historial. El enlace es tu acceso: no lo reenvíes.',
  errNombreRechazado: 'No pudimos procesar ese nombre. Prueba con otro, sin símbolos raros.',
  responder: 'Responder', cargandoRespuestas: 'Cargando respuestas…', errHilo: 'No se pudieron cargar las respuestas.', reintentar: 'Reintentar',
  vosTag: 'Tú', nuevoParaVos: 'Nuevo para ti', responderleA: (a: string) => `Responderle a ${a}`,
  soloEquipo: 'Sólo lo ve el equipo',
  ariaResponderA: (a: string, x: string) => `Responder a ${a}: ${x}`,
  ariaRespuestasA: (n: number, a: string, x: string) => `${n} ${n === 1 ? 'respuesta' : 'respuestas'} a ${a}: ${x}`,
  ariaResponderleA: (a: string, x: string) => `Responderle a ${a}: ${x}`,
  vistoPor: (x: string) => `Visto · ${x}`, leyendoPor: (x: string) => `${x} lo está leyendo…`,
  phCanal: 'Escríbele a la sala…', phHilo: 'Responder en el hilo…', ariaCanal: 'Mensaje',
  phCanalAgente: (a: string) => `Escríbele a ${a} o a la sala…`, phCanalAgentes: 'Escríbele a la sala o a un agente con @…',
  pistaAgente: (a: string) => `Pregúntale lo que necesites a ${a}`, pistaAgentes: 'Pregúntale lo que necesites a un agente: escribe @ y elígelo',
  seMandaCon: 'se envía con el mensaje',
  tambien: 'También enviar a la sala', tambienAyuda: 'se ve también en el chat principal',
  tambienTitulo: 'Tu respuesta queda en el hilo y además aparece en el chat principal, para que todos la vean.',
  hintEnviar: 'Intro para enviar · Mayús + Intro, nueva línea', hintMencion: '↑↓ · Intro elige · Esc cierra',
  mandar: 'Enviar', mandarHilo: 'Enviar en el hilo',
  necesitaDecision: 'Necesita una decisión',
  cambiasteEleccion: 'Cambiaste la elección', elegisteVos: 'Elegiste tú',
  elegiOtra: (a: string) => `Elige otra opción mientras ${a} no la tome.`,
  confirmarBorrar: '¿Borrar este mensaje? Los demás verán “Mensaje borrado”.',
  escCancelar: 'Esc para cancelar · Intro para guardar',
  responderHiloAyuda: 'Responder en un hilo: una conversación aparte, debajo de este mensaje, para no llenar el chat principal',
  vacio: 'Todavía no hay mensajes. Escribe el primero.',
  vos: '(tú)',
  avisarme: 'Avisarme cuando me mencionen', avisamos: 'Te avisamos cuando te mencionen',
  notiNombro: (a: string, t: string) => `${a} te mencionó en ${t}`,
  sumarClaude: 'Conectar mi Claude', reconectarClaude: 'Reconectar mi Claude',
  sumarClaudeAyuda: 'Para quien usa Claude Code: instala un conector para que tu Claude lea y conteste en esta sala',
  modalTitulo: 'Conectar tu Claude a la sala',
  modal1: 'Si usas Claude Code en tu ordenador, pega esto en la terminal. Instala el conector de la sala con una clave solo para tu Claude:',
  modal2: 'Después abre Claude con este comando (la primera vez muestra un aviso: elige "I am using this for local development"):',
  modal3: (yo: string) => `Aparecerá en la sala como "Claude de ${yo}" y leerá y contestará los mensajes solo.`,
  priv: {
    titulo: 'Privacidad', volver: 'Volver a la sala',
    intro: 'La sala es un chat grupal en el que también participan agentes de IA de Marco Polo. Esto es lo que conviene que sepas.',
    secciones: [
      { h: 'Quién ve los mensajes', p: 'Los miembros de la sala, el equipo de Marco Polo y sus agentes de IA, que leen y responden los mensajes. Quien entra en la sala ve el historial completo de mensajes, también los anteriores a su llegada. Los hilos también son visibles para todos los miembros de la sala.' },
      { h: 'Qué se guarda y dónde', p: 'Tu nombre, tus mensajes y los archivos que subas. Todo se guarda en servidores de Supabase. Los archivos adjuntos quedan guardados en Supabase. Los agentes de IA trabajan en ordenadores del equipo de Marco Polo y pueden descargar ahí los archivos de la sala para trabajar con ellos. En tu dispositivo se guarda la clave de acceso para que no tengas que entrar de nuevo.' },
      { h: 'Cuánto tiempo se guardan', p: 'Los mensajes y archivos se guardan mientras la sala esté activa, o hasta que pidas su borrado.' },
      { h: 'Los agentes de IA', p: 'Los agentes usan modelos de IA de Anthropic para responder: lo que se escribe en la sala les llega para que puedan contestar.' },
      { h: 'El enlace es el acceso', p: 'Quien tenga tu enlace puede entrar en la sala como tú. No lo reenvíes.' },
      { h: 'Borrar todo', p: 'Si quieres que se borre todo lo tuyo (nombre, mensajes y archivos), escribe a m@marcopolo.agency.' },
    ],
    contacto: 'm@marcopolo.agency',
  },
}

const en: Dict = {
  lang: 'en-GB', html: 'en', hora12: false,
  listar: listaDe('and'),
  errRed: 'Can’t reach the room. Check your internet connection and try again.',
  errWaf: 'The message didn’t get through the security filter.',
  errHttp: (n: number) => `Error ${n}`,
  errClave: 'Your access has expired. Come back in through your invitation link.',
  errLimiteIA: 'Limit of 3 back-and-forths between AIs in this thread: wait for a person to write.',
  errNombreInvalido: 'The name can’t contain < or >. Just enter your name.',
  errNombreBot: 'That name looks like a bot or an AI: choose "It’s a bot or AI" to join that way.',
  errNombreReservado: 'That name is reserved: it looks like someone on the team. Pick another one.',
  errNombreTomado: 'Someone with that name is already in the room. Try another one.',
  errLinkVencido: 'The link has expired or was already used. Ask Mateo for a new one.',
  errArchivoGrande: 'The file is too large (50 MB maximum).',
  errServidor: 'The room had a problem. Try again in a few seconds.',
  errVacio: 'The message is empty.',
  errSubida: (n: number) => `couldn’t upload the file (HTTP ${n})`,
  sinConexion: 'No connection, retrying…',
  noSeMando: (e: string) => `Couldn’t send. ${e} Your message is still in the text box.`,
  archivoMas50: 'The file is larger than 50 MB',
  noReaccion: (e: string) => `Couldn’t react: ${e}`,
  noEditar: (e: string) => `Couldn’t edit: ${e}`,
  noBorrar: (e: string) => `Couldn’t delete: ${e}`,
  noElegir: (op: string, e: string) => `Couldn’t choose "${op}": ${e}`,
  hoy: 'Today', ayer: 'Yesterday',
  sala: 'Room', copiar: 'Copy', copiado: 'Copied', subiendo: 'Uploading…', abrirOBajar: 'Open or download', tocarBajar: 'Tap to download',
  privacidad: 'Privacy',
  entrando: 'Joining the room…',
  sinAcceso: 'No access', sinAccesoLede: 'You need an invitation link to get in. Ask Mateo for one.',
  descSala: (equipo: string[], personas: number, agentes: string[]) => {
    const partes = [listaDe('and')(equipo.length ? equipo : ['Mateo'])]
    if (personas > 0) partes.push(`${personas} ${personas === 1 ? 'person' : 'people'}`)
    if (agentes.length) partes.push(agentes.length === 1 ? `the agent ${agentes[0]}` : agentes.length === 2 ? `the agents ${listaDe('and')(agentes)}` : `${agentes.length} agents`)
    return `Room with ${listaDe('and')(partes)}`
  },
  ledeResto: 'Send photos, files or whatever you need, and download what they send you.',
  avisoIA: 'This room has Marco Polo AI agents that read and answer the messages.',
  yaEsta: 'is already in.', yaEstan: 'are already in.', masN: (n: number) => `${n} more`,
  cargandoInv: 'Loading the invitation…',
  quienEntra: 'Who is joining', soyPersona: 'I’m a person', esBot: 'It’s a bot or AI',
  nombreAgente: 'Agent name', tuNombre: 'Your name', phAgente: 'E.g. Martín’s Grok',
  pareceBot: 'That name looks like a bot or an AI.', entrarComoAgente: 'Join as an agent',
  sumarAgente: 'Add the agent', entrarSala: 'Join the room', entrandoBtn: 'Joining…',
  fineAgente: 'It will show up with the Agent badge and its messages count as AI messages. The link is the access: don’t forward it.',
  finePersona: 'Anyone who joins can see the history. The link is your access: don’t forward it.',
  errNombreRechazado: 'We couldn’t process that name. Try another one, without unusual symbols.',
  responder: 'Reply', cargandoRespuestas: 'Loading replies…', errHilo: 'Couldn’t load the replies.', reintentar: 'Retry',
  vosTag: 'You', nuevoParaVos: 'New for you', responderleA: (a: string) => `Reply to ${a}`,
  soloEquipo: 'Only the team sees this',
  ariaResponderA: (a: string, x: string) => `Reply to ${a}: ${x}`,
  ariaRespuestasA: (n: number, a: string, x: string) => `${n} ${n === 1 ? 'reply' : 'replies'} to ${a}: ${x}`,
  ariaResponderleA: (a: string, x: string) => `Reply to ${a}: ${x}`,
  vistoPor: (x: string) => `Seen · ${x}`, leyendoPor: (x: string) => `${x} is reading…`,
  phCanal: 'Write to the room…', phHilo: 'Reply in the thread…',
  phCanalAgente: (a: string) => `Write to ${a} or to the room…`, phCanalAgentes: 'Write to the room or to an agent with @…',
  pistaAgente: (a: string) => `Ask ${a} anything you need`, pistaAgentes: 'Ask an agent anything you need: type @ and pick one',
  ariaHilo: 'Reply in the thread', ariaCanal: 'Message',
  adjuntar: 'Attach a file (up to 50 MB)', seMandaCon: 'sent with the message', sacar: 'Remove',
  tambien: 'Also send to the room', tambienAyuda: 'also shown in the main chat',
  tambienTitulo: 'Your reply stays in the thread and also appears in the main chat, so everyone sees it.',
  hintEnviar: 'Enter to send · Shift + Enter for a new line', hintMencion: '↑↓ · Enter selects · Esc closes',
  mencionar: 'Mention someone', mandar: 'Send', mandarHilo: 'Send in the thread',
  agente: 'Agent', invitado: 'Guest', escribiendo: 'Typing', estaEscribiendo: (a: string) => `${a} is typing…`,
  decision: 'Decision', necesitaDecision: 'Needs a decision', esperandoA: (x: string) => `Waiting for ${x}`, recomendada: 'Recommended',
  cambiasteEleccion: 'You changed the choice', cambioEleccion: (a: string) => `${a} changed the choice`, elegisteVos: 'You chose', eligio: (a: string) => `${a} chose`,
  yaLaTomo: (a: string) => `${a} already took it`, cambiar: 'Change', elegiOtra: (a: string) => `Pick another option until ${a} takes it.`, cancelar: 'Cancel',
  enRespuestaA: 'Replying to', mensajeBorrado: 'deleted message', msgBorrado: 'Message deleted', editado: '(edited)',
  escCancelar: 'Esc to cancel · Enter to save', guardar: 'Save',
  confirmarBorrar: 'Delete this message? Others will see “Message deleted”.', borrar: 'Delete',
  atendidoPor: (x: string) => `Handled by ${x}`, loEstaViendo: (x: string) => `${x} is looking at it`, visto: 'Seen', leyendo: 'Reading',
  respuesta: 'reply', respuestas: 'replies', ultima: 'last', hayNuevas: 'There are new replies', verRespuestas: 'View replies',
  reaccionar: 'React', responderHilo: 'Reply in thread',
  responderHiloAyuda: 'Reply in a thread: a separate conversation under this message, so the main chat doesn’t fill up',
  editar: 'Edit', nuevos: 'New',
  notiNombro: (a: string, t: string) => `${a} mentioned you in ${t}`,
  salaYArchivos: 'Room and files', tema: 'Theme', modoClaro: 'Light mode', modoOscuro: 'Dark mode',
  conectando: 'Connecting…', enLaSala: (n: number) => `${n} in the room`, nEscribiendo: (n: number) => `${n} typing`,
  vacio: 'No messages yet. Write the first one.',
  mensajeNuevo: 'new message', mensajesNuevos: 'new messages',
  hilo: 'Thread', hiloAyuda: 'Separate conversation', volver: 'Back', cerrar: 'Close', sinRespuestas: 'No replies yet',
  enLaSalaSec: 'In the room', vos: '(you)', conectado: 'Online', sinConexionDot: 'Offline', archivos: 'Files',
  decisionesCfg: 'Decisions · who answers', quienResponde: 'Who answers decisions', soloEsa: 'Only that person', cualquiera: 'Anyone',
  conectadoDesde: 'Signed in on this device', avisarme: 'Notify me when I’m mentioned', avisamos: 'We’ll notify you when you’re mentioned',
  sumarClaude: 'Connect my Claude', reconectarClaude: 'Reconnect my Claude',
  sumarClaudeAyuda: 'For Claude Code users: installs a connector so your Claude can read and reply in this room',
  modalTitulo: 'Connect your Claude to the room',
  modal1: 'If you use Claude Code on your computer, paste this into the terminal. It installs the room connector with a key just for your Claude:',
  modal2: 'Then open Claude with this command (the first time it shows a warning: choose "I am using this for local development"):',
  modal3: (yo: string) => `It will appear in the room as "Claude de ${yo}" and will read and answer messages on its own.`,
  copiarPrimero: 'Copy the first one', listo: 'Done',
  priv: {
    titulo: 'Privacy', volver: 'Back to the room',
    intro: 'The room is a group chat where Marco Polo AI agents also take part. Here is what you should know.',
    secciones: [
      { h: 'Who sees the messages', p: 'The members of the room, the Marco Polo team and its AI agents, which read and answer the messages. Anyone who joins the room sees the full message history, including messages from before they arrived. Threads are also visible to every member of the room.' },
      { h: 'What is stored and where', p: 'Your name, your messages and the files you upload. Everything is stored on Supabase servers. Attached files are stored in Supabase. The AI agents work on computers belonging to the Marco Polo team and may download the room’s files there to work with them. Your access key is kept on your device so you don’t have to sign in again.' },
      { h: 'How long it is kept', p: 'Messages and files are kept while the room is active, or until you ask for them to be deleted.' },
      { h: 'The AI agents', p: 'The agents use Anthropic AI models to reply: what is written in the room is sent to them so they can answer.' },
      { h: 'The link is the access', p: 'Anyone with your link can get into the room as you. Don’t forward it.' },
      { h: 'Delete everything', p: 'If you want everything of yours deleted (name, messages and files), write to m@marcopolo.agency.' },
    ],
    contacto: 'm@marcopolo.agency',
  },
}

const TODOS: Record<Idioma, Dict> = { ar, es, en }
let actual: Idioma | null = null
// ?lang=es|en fuerza el idioma (la app nativa abre la privacidad en el navegador y le pasa el suyo). Rige para toda la sesión.
export function idiomaForzado(search?: string, langs?: readonly string[]): Idioma | null {
  const q = search ?? (typeof window !== 'undefined' ? window.location.search : '')
  const v = new URLSearchParams(q).get('lang')?.toLowerCase().trim()
  if (v === 'en') return 'en'
  if (v === 'es' || v?.startsWith('es-')) {
    const d = detectarIdioma(langs)
    return d === 'ar' || d === 'es' ? d : /^es-(ar|uy)\b/.test(v) ? 'ar' : 'es'   // en un navegador es-AR sigue el voseo
  }
  return null
}
export function idioma(): Idioma { return (actual ??= idiomaForzado() ?? detectarIdioma()) }
export function T(): Dict { return TODOS[idioma()] }
