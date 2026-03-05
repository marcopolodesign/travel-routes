type Payment = {
  label: string
  amount: number
}

type BudgetItem = {
  name: string
  amount: number | string
  status: 'paid' | 'partial' | 'pending'
  payments?: Payment[]
}

type BudgetRemainderSectionProps = {
  title: string
  total: number | string
  items: BudgetItem[]
}

function formatCurrency(value: number | string): string {
  if (typeof value === 'string') return value
  return `$${value.toLocaleString('en-US')}`
}

function getStatusLabel(status: 'paid' | 'partial' | 'pending'): string {
  if (status === 'paid') return 'Paid in full'
  if (status === 'pending') return 'Pending'
  return 'Partially paid'
}

function getStatusColor(status: 'paid' | 'partial' | 'pending'): string {
  if (status === 'paid') return 'text-green-700 bg-green-100'
  if (status === 'pending') return 'text-red-700 bg-red-100'
  return 'text-amber-700 bg-amber-100'
}

export default function BudgetRemainderSection({ title, total, items }: BudgetRemainderSectionProps) {
  const totalPaid = items.reduce((sum, item) => {
    if (item.status === 'paid') {
      return sum + (typeof item.amount === 'number' ? item.amount : 0)
    }
    if (item.status === 'partial' && item.payments) {
      return sum + item.payments.reduce((s, p) => s + p.amount, 0)
    }
    return sum
  }, 0)

  const totalNumeric = typeof total === 'number' ? total : null
  const remainder = totalNumeric !== null ? totalNumeric - totalPaid : null

  return (
    <section className="mb-14 md:mb-20">
      <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--marco-accent)] px-7 py-5 md:px-8 md:py-6 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-thunder text-2xl md:text-3xl uppercase text-white">
            {title}
          </h2>
          <span className="font-thunder text-xl md:text-2xl text-white/90 uppercase">
            Total: {formatCurrency(total)}
          </span>
        </div>

        {/* Items */}
        <div className="divide-y divide-[var(--marco-border)]">
          {items.map((item, i) => {
            const paidAmount = item.status === 'paid'
              ? (typeof item.amount === 'number' ? item.amount : 0)
              : (item.payments?.reduce((s, p) => s + p.amount, 0) ?? 0)

            const itemRemainder = typeof item.amount === 'number'
              ? item.amount - paidAmount
              : null

            return (
              <div key={i} className="px-7 py-5 md:px-8 md:py-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-thunder text-lg md:text-xl uppercase text-black">
                      {item.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <span className="font-thunder text-lg text-[var(--marco-accent)]">
                    {formatCurrency(item.amount)}
                  </span>
                </div>

                {item.payments && item.payments.length > 0 && (
                  <div className="mt-3 ml-4 space-y-1.5">
                    {item.payments.map((payment, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-black/70">
                        <span className="text-[var(--marco-accent)]">-</span>
                        <span>{payment.label}</span>
                        <span className="font-medium">{formatCurrency(payment.amount)}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-sm font-medium pt-1.5 border-t border-dashed border-[var(--marco-border)]">
                      <span className="text-black/60">Paid so far:</span>
                      <span className="text-green-700">{formatCurrency(paidAmount)}</span>
                      {itemRemainder !== null && itemRemainder > 0 && (
                        <>
                          <span className="text-black/40 mx-1">|</span>
                          <span className="text-black/60">Remainder:</span>
                          <span className="text-amber-700">{formatCurrency(itemRemainder)}</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer – Total paid & remainder */}
        {remainder !== null && (
          <div className="border-t-2 border-[var(--marco-accent)] px-7 py-5 md:px-8 md:py-6 bg-[var(--marco-bg)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-sm text-black/60 uppercase tracking-wide">Total Paid</span>
                <p className="font-thunder text-xl text-green-700">{formatCurrency(totalPaid)}</p>
              </div>
              <div>
                <span className="text-sm text-black/60 uppercase tracking-wide">Remainder</span>
                <p className="font-thunder text-xl text-amber-700">{formatCurrency(remainder)}</p>
              </div>
            </div>
            <div>
              <span className="text-sm text-black/60 uppercase tracking-wide">Project Total</span>
              <p className="font-thunder text-xl text-[var(--marco-accent)]">{formatCurrency(total)}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
