import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import BudgetTemplate from './components/BudgetTemplate'
const HealthMvp = lazy(() => import('./pages/HealthMvp'))
const TecnoFit = lazy(() => import('./pages/TecnoFit'))
const TecnoFitTVs = lazy(() => import('./pages/TecnoFitTVs'))
const TecnoFitSprint1 = lazy(() => import('./pages/TecnoFitSprint1'))
const TecnoFitSprint1Mcp = lazy(() => import('./pages/TecnoFitSprint1Mcp'))
const TecnoFitSprint1Cierre = lazy(() => import('./pages/TecnoFitSprint1Cierre'))
const TecnoFitSprint2 = lazy(() => import('./pages/TecnoFitSprint2'))
const TecnoFitMotorRutinas = lazy(() => import('./pages/TecnoFitMotorRutinas'))
const Ronzio = lazy(() => import('./pages/Ronzio'))
const GinLane = lazy(() => import('./pages/GinLane'))
const SendaArqAds = lazy(() => import('./pages/SendaArqAds'))
const SendaAdsMes1 = lazy(() => import('./pages/SendaAdsMes1'))
const SendaAdsPreviews = lazy(() => import('./pages/SendaAdsPreviews'))
const TagMetaAgosto = lazy(() => import('./pages/TagMetaAgosto'))
const TagAgostoCierre = lazy(() => import('./pages/TagAgostoCierre'))
const Home = lazy(() => import('./pages/Home'))
const Agent = lazy(() => import('./pages/Agent'))
const Monotributo = lazy(() => import('./pages/Monotributo'))
const HectorBarea = lazy(() => import('./pages/HectorBarea'))
const PicnicJob = lazy(() => import('./pages/PicnicJob'))
const PicnicPlataforma = lazy(() => import('./pages/PicnicPlataforma'))
const PicnicDeck = lazy(() => import('./pages/PicnicDeck'))
const AszArquitectos = lazy(() => import('./pages/AszArquitectos'))
const MariaSioli = lazy(() => import('./pages/MariaSioli'))
const HealthierCierre = lazy(() => import('./pages/HealthierCierre'))
const HealthierSemana = lazy(() => import('./pages/HealthierSemana'))
const HealthierFase1 = lazy(() => import('./pages/HealthierFase1'))
const PacerAvances = lazy(() => import('./pages/PacerAvances'))
const HealthierAvancesOctubre = lazy(() => import('./pages/HealthierAvancesOctubre'))
const Sala = lazy(() => import('./pages/Sala'))
const SalaPrivacidad = lazy(() => import('./pages/SalaPrivacidad'))

// Mientras baja el código de la página (cada ruta es un chunk aparte): en /sala/* el mismo indicador que ya puso index.html.
function PreCarga() {
  if (typeof location === 'undefined' || !/^\/sala(\/|$)/.test(location.pathname)) return null
  const es = /^es/i.test(navigator.language || '')
  return (
    <div role="status" aria-live="polite" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, font: '15px/22px system-ui,-apple-system,Segoe UI,sans-serif', color: '#776E65', background: 'linear-gradient(to bottom,#F6EEE4,#EFC4BD)' }}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #FCEBEA', borderTopColor: '#E66065', animation: 'salapre 1s linear infinite' }} />
      <span>{es ? 'Cargando la sala…' : 'Loading the room…'}</span>
      <style>{'@keyframes salapre{to{transform:rotate(360deg)}}'}</style>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<PreCarga />}>
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
        <Route path="/budget/tecnofit-sprint-1-cierre" element={
          <BudgetTemplate
            title="Cierre Sprint 1 — Catálogo y video — TecnoFit"
            timeline="Sprint 1 de 4 · entregado"
            stack="Catálogo · Video en TV y app · Encuadre"
            whatLabel="Cierre de Sprint"
          >
            <TecnoFitSprint1Cierre />
          </BudgetTemplate>
        } />
        <Route path="/budget/tecnofit-sprint-2" element={
          <BudgetTemplate
            title="Sprint 2 — Constructor de rutinas — TecnoFit"
            timeline="2 semanas · Sprint 2 de 4"
            stack="Constructor · Motor de sustitución · AMRAP/EMOM"
            whatLabel="Plan de Sprint"
          >
            <TecnoFitSprint2 />
          </BudgetTemplate>
        } />
        <Route path="/budget/tecnofit-motor-rutinas" element={
          <BudgetTemplate
            title="El motor de rutinas, andando — TecnoFit"
            timeline="Sprint 2 · un mes generado"
            stack="Motor de sustitución · EMOM/Tabata/AMRAP"
            whatLabel="Muestra"
          >
            <TecnoFitMotorRutinas />
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
        <Route path="/budget/senda-ads-mes-1" element={
          <BudgetTemplate
            title="Mes 1 — Salir a la cancha — Senda Arquitectura"
            timeline="4 semanas · Mes 1"
            stack="Meta Ads · Web + Instagram · 20 anuncios"
            whatLabel="Plan del mes"
          >
            <SendaAdsMes1 />
          </BudgetTemplate>
        } />
        <Route path="/budget/tag-meta-agosto" element={
          <BudgetTemplate
            title="Meta Ads, agosto — The Acting Garage"
            timeline="Agosto 2026 · 3 campañas activas"
            stack="Meta Ads · WhatsApp + Web · €650/mes"
            whatLabel="Estado y plan"
          >
            <TagMetaAgosto />
          </BudgetTemplate>
        } />
        <Route path="/budget/tag-agosto-cierre" element={
          <BudgetTemplate
            title="Cierre de agosto — The Acting Garage"
            timeline="1 al 31 de agosto 2026"
            stack="Meta Ads · WhatsApp + Web · 3 campañas"
            whatLabel="Resultados del mes"
          >
            <TagAgostoCierre />
          </BudgetTemplate>
        } />
        <Route path="/docs/senda-ads-previews" element={
          <BudgetTemplate
            title="Previews de los anuncios — Senda Arquitectura"
            timeline="Mes 1 · listos para activar"
            stack="Meta Ads · 5 ubicaciones · 20 versiones"
            whatLabel="Previews"
          >
            <SendaAdsPreviews />
          </BudgetTemplate>
        } />
        <Route path="/budget/hector-barea" element={
          <BudgetTemplate
            title="Marketplace de Lotes de Ganadería — Héctor Barea"
            timeline="9 a 10 semanas (Web)"
            stack="Web App · PWA instalable · React"
            whatLabel="Propuesta"
          >
            <HectorBarea />
          </BudgetTemplate>
        } />
        <Route path="/budget/picnic-job" element={
          <BudgetTemplate
            title="Plataforma de datos de campo — Job para Picnic"
            timeline="Fase 1: 4 a 6 semanas"
            stack="Web App · Carga en campo · Multi-rol"
            whatLabel="Propuesta por fases"
          >
            <PicnicJob />
          </BudgetTemplate>
        } />
        <Route path="/budget/asz-arquitectos" element={
          <BudgetTemplate
            title="Sitio web — ASZ Arquitectos"
            timeline="5 a 6 semanas"
            stack="Sitio web · Panel de carga de obras"
            whatLabel="Propuesta"
          >
            <AszArquitectos />
          </BudgetTemplate>
        } />
        <Route path="/budget/maria-sioli" element={
          <BudgetTemplate
            title="Sitio web — María Sioli"
            timeline="5 a 6 semanas"
            stack="Sitio web · Panel de carga de obras"
            whatLabel="Propuesta"
          >
            <MariaSioli />
          </BudgetTemplate>
        } />
        <Route path="/budget/picnic-plataforma" element={
          <BudgetTemplate
            title="Plataforma de gestión de campo — Picnic BTL"
            timeline="Fase 1 · entrega 13 de octubre"
            stack="Panel de Picnic · Carga en el celular · Vista del cliente"
            whatLabel="Diseño de producto"
          >
            <PicnicPlataforma />
          </BudgetTemplate>
        } />
        <Route path="/budget/healthier-cierre" element={
          <BudgetTemplate
            title="Alcance de cierre — Healthier"
            timeline="Estado a septiembre 2026"
            stack="Plataforma web · App iPhone y Android"
            whatLabel="Acta de cierre"
          >
            <HealthierCierre />
          </BudgetTemplate>
        } />
        {/* documentos para cliente: /cliente/<slug> */}
        <Route path="/cliente/healthier-fase-1" element={
          <BudgetTemplate
            title="Cierre de la Fase 1 — Healthier"
            timeline="Fase 1 + Fase 1.1 · Octubre 2026"
            stack="Plataforma web · App iPhone y Android"
            whatLabel="Cierre de fase"
          >
            <HealthierFase1 />
          </BudgetTemplate>
        } />
        <Route path="/budget/healthier-avances-16-18-octubre" element={
          <BudgetTemplate
            title="Avances — Healthier"
            timeline="Del 16 al 18 de octubre de 2026"
            stack="Plataforma web · App iPhone y Android · Super admin"
            whatLabel="Informe de avance"
          >
            <HealthierAvancesOctubre />
          </BudgetTemplate>
        } />
        {/* informes de avance por proyecto: /updates/<proyecto> */}
        <Route path="/updates/healthier" element={
          <BudgetTemplate
            title="Avances de la semana — Healthier"
            timeline="Semana del 18 al 24 de septiembre"
            stack="App iPhone · Plataforma web · Google Play"
            whatLabel="Informe semanal"
          >
            <HealthierSemana />
          </BudgetTemplate>
        } />
        <Route path="/updates/pacer" element={
          <BudgetTemplate
            title="Avances — Pacer"
            timeline="Del 16 al 18 de octubre de 2026"
            stack="App iPhone · Anillo Pacer"
            whatLabel="Informe de avance"
          >
            <PacerAvances />
          </BudgetTemplate>
        } />
        {/* link viejo, por si ya se compartió */}
        <Route path="/budget/healthier-semana-2026-09-25" element={<Navigate to="/updates/healthier" replace />} />
        {/* deck a pantalla completa: sin BudgetTemplate, la presentación es la página */}
        <Route path="/deck/picnic" element={<PicnicDeck />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/sala" element={<Sala />} />
        <Route path="/sala/privacidad" element={<SalaPrivacidad />} />
        <Route path="/sala/:codigo" element={<Sala />} />
        <Route path="/monotributo" element={<Monotributo />} />
      </Routes>
      </Suspense>
    </div>
  )
}
