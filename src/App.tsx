import { Routes, Route } from 'react-router-dom'
import BudgetTemplate from './components/BudgetTemplate'
import HealthMvp from './pages/HealthMvp'
import TecnoFit from './pages/TecnoFit'
import Ronzio from './pages/Ronzio'
import Home from './pages/Home'
import Agent from './pages/Agent'

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
        <Route path="/agent" element={<Agent />} />
      </Routes>
    </div>
  )
}
