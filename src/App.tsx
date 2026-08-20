import { Routes, Route } from 'react-router-dom'
import BudgetTemplate from './components/BudgetTemplate'
import HealthMvp from './pages/HealthMvp'
import TecnoFit from './pages/TecnoFit'
import TecnoFitTVs from './pages/TecnoFitTVs'
import TecnoFitSprint1 from './pages/TecnoFitSprint1'
import TecnoFitSprint1Mcp from './pages/TecnoFitSprint1Mcp'
import TecnoFitSprint1Cierre from './pages/TecnoFitSprint1Cierre'
import TecnoFitSprint2 from './pages/TecnoFitSprint2'
import TecnoFitMotorRutinas from './pages/TecnoFitMotorRutinas'
import Ronzio from './pages/Ronzio'
import GinLane from './pages/GinLane'
import SendaArqAds from './pages/SendaArqAds'
import SendaAdsMes1 from './pages/SendaAdsMes1'
import SendaAdsPreviews from './pages/SendaAdsPreviews'
import TagMetaAgosto from './pages/TagMetaAgosto'
import Home from './pages/Home'
import Agent from './pages/Agent'
import Monotributo from './pages/Monotributo'
import HectorBarea from './pages/HectorBarea'

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
        <Route path="/agent" element={<Agent />} />
        <Route path="/monotributo" element={<Monotributo />} />
      </Routes>
    </div>
  )
}
