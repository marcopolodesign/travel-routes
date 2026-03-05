import { Routes, Route } from 'react-router-dom'
import BudgetTemplate from './components/BudgetTemplate'
import HealthMvp from './pages/HealthMvp'
import TecnoFit from './pages/TecnoFit'
import Home from './pages/Home'

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
      </Routes>
    </div>
  )
}
