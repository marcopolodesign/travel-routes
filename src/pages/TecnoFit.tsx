import BudgetRemainderSection from '../components/BudgetRemainderSection'

export default function TecnoFit() {
  return (
    <>
      <BudgetRemainderSection
        title="TecnoFit – Budget & Remainder"
        total={22000}
        items={[
          {
            name: 'Website',
            amount: 4000,
            status: 'paid',
          },
          {
            name: 'Admin',
            amount: 4000,
            status: 'paid',
          },
          {
            name: 'App – Design',
            amount: 500,
            status: 'paid',
          },
          {
            name: 'App – Coding',
            amount: 13500,
            status: 'partial',
            payments: [
              { label: 'Payment 1', amount: 2000 },
              { label: 'Payment 2', amount: 2000 },
            ],
          },
        ]}
      />
    </>
  )
}
