import BudgetRemainderSection from '../components/BudgetRemainderSection'

export default function TecnoFit() {
  return (
    <>
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
            status: 'partial',
            payments: [
              { label: 'Wire transfer', amount: 2000 },
            ],
          },
          {
            name: 'App – Development',
            amount: 13500,
            status: 'pending',
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
