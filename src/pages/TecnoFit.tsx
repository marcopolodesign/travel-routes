import { Link } from 'react-router-dom'
import BudgetRemainderSection from '../components/BudgetRemainderSection'

export default function TecnoFit() {
  return (
    <>
      <Link
        to="/budget/tecnofit-tvs"
        className="inline-flex items-center gap-2 mb-10 text-sm font-interphases text-[var(--marco-accent)] hover:underline"
      >
        Ver propuesta: TVs + Lista de Espera + CMS de rutinas →
      </Link>
      <BudgetRemainderSection
        title="TecnoFit – Budget & Remainder"
        total={26700}
        items={[
          {
            name: 'Website',
            amount: 4000,
            status: 'paid',
          },
          {
            name: 'App – Design',
            amount: 5000,
            status: 'paid',
          },
          {
            name: 'Admin',
            amount: 4000,
            status: 'paid',
            payments: [
              { label: 'Wire transfer', amount: 2000 },
              { label: 'Household payment', amount: 2000 },
            ],
          },
          {
            name: 'App – Development',
            amount: 13500,
            status: 'partial',
            payments: [
              { label: 'Household payment', amount: 3000 },
              { label: 'Cash — March 10', amount: 5000 },
            ],
          },
          {
            name: 'Central Integration',
            amount: 200,
            status: 'pending',
          },
          {
            name: 'Fitness Integration',
            amount: 'A definir',
            status: 'pending',
          },
        ]}
      />
    </>
  )
}
