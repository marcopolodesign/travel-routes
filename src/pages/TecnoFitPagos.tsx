import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

// Estado de pagos de Fitness Central (TVs + lista de espera + rutinas). Montos en dólares.
// Fuente: chat con TecnoFit (agosto–octubre 2026) y la propuesta en /budget/tecnofit-tvs.
const NAV: NavItem[] = [
  { id: 'pagos', label: 'Pagos' },
  { id: 'por-mes', label: 'Por mes' },
  { id: 'saldo', label: 'Saldo' },
]

const PAGOS = [
  { fecha: '3 de agosto', monto: 2500, mes: 'Agosto' },
  { fecha: '12 de agosto', monto: 2500, mes: 'Agosto' },
  { fecha: '1 de septiembre', monto: 3300, mes: 'Septiembre' },
  { fecha: '23 de septiembre', monto: 1700, mes: 'Septiembre' },
  { fecha: '26 de octubre', monto: 5000, mes: 'Octubre' },
]

const usd = (n: number) => `U$${n.toLocaleString('es-AR')}`
const PAGADO = PAGOS.reduce((s, p) => s + p.monto, 0)
const MESES = ['Agosto', 'Septiembre', 'Octubre'].map((mes) => ({
  mes,
  monto: PAGOS.filter((p) => p.mes === mes).reduce((s, p) => s + p.monto, 0),
}))

export default function TecnoFitPagos() {
  return (
    <>
      <ScrollNav items={NAV} />

      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          TecnoFit · Fitness Central
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Tres meses<br />al día
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Pagos de Fitness Central (TVs de la sala, lista de espera y rutinas) registrados hasta el 27 de noviembre
          de 2026, y lo que queda para cerrar el proyecto.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Pagado</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">{usd(PAGADO)}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Inversión total</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">U$20.000 a 25.000</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Saldo</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">U$5.000 a 10.000</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Pagos</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">{PAGOS.length}</p>
          </div>
        </div>
      </div>

      <section id="pagos" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-6">Pagos recibidos</h3>
        <div className="border border-[var(--marco-border)] rounded-lg overflow-x-auto">
          <table className="w-full text-[15px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-black/50 border-b border-[var(--marco-border)]">
                <th className="px-6 py-4 font-normal">Fecha</th>
                <th className="px-6 py-4 font-normal text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--marco-border)]">
              {PAGOS.map((p) => (
                <tr key={p.fecha}>
                  <td className="px-6 py-4 text-black/80">{p.fecha} de 2026</td>
                  <td className="px-6 py-4 text-right font-thunder text-xl text-black">{usd(p.monto)}</td>
                </tr>
              ))}
              <tr>
                <td className="px-6 py-5 font-thunder uppercase text-lg text-black">Total</td>
                <td className="px-6 py-5 text-right font-thunder text-2xl text-[var(--marco-accent)]">{usd(PAGADO)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="por-mes" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-6">Por mes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MESES.map((m) => (
            <div key={m.mes} className="border border-[var(--marco-border)] rounded-lg p-6">
              <p className="font-thunder uppercase text-black/60 text-lg">{m.mes}</p>
              <p className="font-thunder text-3xl md:text-4xl text-black mt-2">{usd(m.monto)}</p>
              <p className="text-sm text-black/60 mt-1">Cuota mensual completa</p>
            </div>
          ))}
        </div>
      </section>

      <TwoColumnSection title="Saldo" id="saldo">
        <p className="max-w-2xl">
          La propuesta fija la inversión entre U$20.000 y U$25.000, en cuotas de U$5.000. Con agosto, septiembre y
          octubre completos, el saldo queda entre U$5.000 y U$10.000.
        </p>
        <p className="max-w-2xl">
          El monto final se define al cerrar la implementación en la sala: las TVs de las dos líneas corriendo con la
          lista de espera y las rutinas nuevas.
        </p>
        <ul className="space-y-2 text-black/80 text-[15px] max-w-2xl">
          <li>— Noviembre: U$5.000, con lo que se llega a U$20.000.</li>
          <li>— Cierre: hasta U$5.000 más, según el monto final de la implementación.</li>
        </ul>
      </TwoColumnSection>
    </>
  )
}
