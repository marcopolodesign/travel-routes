import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'rol', label: 'Mi rol' },
  { id: 'salida', label: 'Inversión' },
  { id: 'licencia', label: 'Licencia' },
  { id: 'tramos', label: 'Tramos' },
  { id: 'fee', label: 'Fee' },
  { id: 'pacer', label: 'Pacer' },
  { id: 'caminos', label: '90 días' },
  { id: 'juntos', label: 'Cómo trabajamos' },
  { id: 'resumen', label: 'En una mirada' },
]

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 md:mb-24 scroll-mt-28 max-w-3xl">
      <h2 className="font-thunder text-3xl md:text-5xl uppercase text-[var(--marco-accent)] mb-6">{titulo}</h2>
      <div className="text-black/80 text-[17px] leading-relaxed space-y-4">{children}</div>
    </section>
  )
}

function Punto({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <li>
      — <strong className="text-black font-medium">{titulo}</strong> {children}
    </li>
  )
}

function Tabla({ cabecera, filas, total }: { cabecera: string[]; filas: string[][]; total?: string[] }) {
  return (
    <div className="overflow-x-auto border border-[var(--marco-border)] rounded-lg">
      <table className="w-full text-[15px] text-left">
        <thead className="bg-[var(--marco-bg)] text-black/60">
          <tr>
            {cabecera.map((c) => (
              <th key={c} className="font-normal px-4 py-3 border-b border-[var(--marco-border)]">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f[0]} className="border-b border-[var(--marco-border)] last:border-0 align-top">
              {f.map((c, i) => (
                <td key={i} className={`px-4 py-3 ${i === 0 ? 'text-black' : 'text-black/80'} ${i >= 2 ? 'whitespace-nowrap' : ''}`}>{c}</td>
              ))}
            </tr>
          ))}
          {total && (
            <tr className="border-t border-[var(--marco-border)] bg-[var(--marco-accent-light)]/20">
              {total.map((c, i) => (
                <td key={i} className="px-4 py-3 font-thunder uppercase text-lg text-black whitespace-nowrap">{c}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function KiwellWearable() {
  return (
    <>
      <ScrollNav items={NAV} />

      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Kiwell · Pacer · Noviembre 2026
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Propuesta a<br />Alejo y Luca
        </h1>
        <div className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl space-y-4">
          <p>
            Gracias por la charla y por mandarme los números. Esta propuesta responde a lo que me
            pidieron: que asuma riesgo, que no haya licencia a perpetuidad y que no le pese a la caja de hoy.
          </p>
          <p>
            Kiwell pone la marca, los médicos y los pacientes. Yo traigo un negocio nuevo que la impulsa:
            el anillo funcionando, la app que lo lee y cómo venderlo. Lo implemento para la salida del
            producto y después superviso e implemento lo que siga. Por eso propongo una parte de cada
            venta y un porcentaje de Kiwell, para sentirlo propio.
          </p>
        </div>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Inversión + rol</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">4%</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Por los tramos</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Hasta 2%</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Efectivo de la caja de hoy</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">U$0</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">MVP</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">90 días</p>
          </div>
        </div>
      </div>

      <Seccion id="rol" titulo="1. Mi rol: 3% en producto y tecnología">
        <p>No entro sólo como advisor: ocupo el lugar de producto y tecnología que hoy no tiene dueño. El 3% tiene dos partes.</p>
        <Tabla
          cabecera={['Parte', 'A cambio de qué', '%']}
          filas={[
            ['Advisorship', 'Socio de producto y marca: una reunión por semana + conversación asincrónica. Experiencia, planes y precios, automatizaciones y agentes de marketing, conexiones con inversores.', '1%'],
            ['Evolución del producto', 'Supervisión e implementación de lo que venga después de la salida: mantener y mejorar el wearable en cada versión, definir el roadmap según ventas y uso, y terminar para Kiwell funciones como el seguimiento del ciclo menstrual. Capacitación del equipo.', '2%'],
          ]}
        />
        <ul className="space-y-3">
          <Punto titulo="3% de KIWELLAR LLC,">entre el 3% del socio-embajador y el 10% de la líder médica.</Punto>
          <Punto titulo="Vesting mensual en 12 meses, sin período de prueba,">como ya me ofrecieron.</Punto>
          <Punto titulo="Aceleración si se vende Kiwell:">en una venta, se libera todo lo pendiente.</Punto>
          <Punto titulo="Si Kiwell termina el acuerdo sin causa,">se libera lo que corresponda a los 3 meses siguientes.</Punto>
        </ul>
      </Seccion>

      <Seccion id="salida" titulo="2. Mi inversión: 1% por la salida del producto">
        <p>
          El 1% que me ofrecieron por invertir USD 30.000 lo tomo con trabajo en lugar de efectivo: la
          salida del producto, que une Pacer con la app y la metodología de Kiwell, lista para lanzar.
          No toca la caja de hoy y queda a riesgo, porque sólo vale si Kiwell crece.
        </p>
      </Seccion>

      <Seccion id="licencia" titulo="3. Licencia de Pacer: una parte de cada venta, con tope">
        <p>El uso de Pacer se paga sólo con lo que se vende, así que no hay costo fijo:</p>
        <ul className="space-y-3">
          <Punto titulo="15% del margen de cada anillo o banda vendido,">calculado sobre lo que queda después del costo de importación.</Punto>
          <Punto titulo="10% del margen de cada usuario activo del plan con wearable,">por mes.</Punto>
          <Punto titulo="Tope de USD 90.000:">cuando lo cobrado por licencia llega a ese número, se renegocia o paso a sueldo, in house.</Punto>
          <Punto titulo="Conversión a equity:">si entra un fondo de venture capital antes del tope, una parte de lo que falte cobrar se convierte en participación a la valuación de la ronda pre-seed actual.</Punto>
          <Punto titulo="Liquidación mensual,">con un reporte simple de unidades vendidas, usuarios activos y margen.</Punto>
        </ul>
      </Seccion>

      <Seccion id="tramos" titulo="4. Tramos por dispositivos vendidos">
        <p>Mantengo lo que propusieron: 0,5% de Kiwell por cada tramo, hasta 2% en total, dentro de los primeros 3 años.</p>
        <Tabla cabecera={['Dispositivos vendidos', 'Equity']} filas={[['500', '0,5%'], ['1.500', '0,5%'], ['3.000', '0,5%'], ['5.000', '0,5%']]} />
        <p>El porcentaje de cada tramo se calcula sobre el total de hoy, no sobre el que haya cuando se alcance.</p>
      </Seccion>

      <Seccion id="fee" titulo="5. Inversión primero, fee después">
        <p>
          Lo primero es acompañarlos a conseguir la plata: cerrar la ronda pre-seed o sumar a un ángel
          que quiera invertir en los wearables. Cuando ese dinero entre, una parte va a un fee que me
          permita dedicarle más tiempo a Kiwell.
        </p>
        <ul className="space-y-3">
          <Punto titulo="USD 1.200 por mes durante 6 meses,">por debajo de los ~USD 2.200 por mes que hoy gastan en producto y tecnología.</Punto>
          <Punto titulo="Se activa cuando entra la inversión,">sea por la ronda o por un ángel. Hasta entonces trabajo sólo por equity.</Punto>
          <Punto titulo="A los 6 meses lo revisamos">según cómo vayan las ventas del wearable y el Plan.</Punto>
          <li>— Desarrollos más grandes se presupuestan aparte, con precio preferencial para Kiwell.</li>
        </ul>
      </Seccion>

      <Seccion id="pacer" titulo="6. Pacer: licencia con marca Kiwell">
        <p>Pacer sigue siendo mío y Kiwell lo usa con su marca (white label). A cambio, Kiwell tiene la tranquilidad de no depender de mí.</p>
        <ul className="space-y-3">
          <Punto titulo="Licencia de uso">de Pacer con la marca Kiwell, mientras dure el acuerdo.</Punto>
          <Punto titulo="SDK compilado, código fuente en escrow:">lo guarda un tercero y se libera a Kiwell si dejo de dar soporte, si Pacer cierra o si Kiwell se vende. La lógica clave corre en mi backend y su app la consume por API.</Punto>
          <Punto titulo="Lo que se desarrolle sólo para Kiwell es de Kiwell.">Lo que ya existía, incluida la integración con el fabricante, sigue siendo mío.</Punto>
          <Punto titulo="La relación con el fabricante">puede ser de Kiwell para compras e importación.</Punto>
          <Punto titulo="Exclusividad:">hoy no la piden y no la ofrezco. Si el wearable despega y la quieren, la firmamos con más equity o con aceleración del vesting.</Punto>
        </ul>
      </Seccion>

      <Seccion id="caminos" titulo="7. 90 días vendiendo por cuatro caminos">
        <p>Sin definir cómo se vende el wearable no se pueden fijar bien los porcentajes. Propongo probar en paralelo y decidir con datos.</p>
        <ul className="space-y-3">
          <Punto titulo="Wearable por separado,">con métricas básicas y una suscripción de IA.</Punto>
          <Punto titulo="Dentro del Plan,">como Plan Kiwell Pro con anillo o banda y contacto humano mensual.</Punto>
          <Punto titulo="Empresas,">como regalo empresarial y dentro de Corporate Athletes.</Punto>
          <Punto titulo="Plan sin wearable,">como grupo de comparación.</Punto>
        </ul>
        <p>
          A los 90 días medimos cuántos pasan del Diagnóstico al Plan con y sin wearable, cuántos lo
          siguen usando a los 30 días y cuántas empresas lo suman. El playbook de venta lo armamos juntos.
        </p>
      </Seccion>

      <Seccion id="juntos" titulo="8. Cómo trabajamos y si no funciona">
        <ul className="space-y-3">
          <Punto titulo="Primero el criterio médico.">Ninguna función sale sin el respaldo de sus médicos.</Punto>
          <Punto titulo="Primero vendemos.">Los acompaño con la app y las demos hasta el 15 de diciembre. La meta sigue siendo 3 empresas o 50 unidades con seña.</Punto>
          <Punto titulo="Si llegamos,">firmamos, se hace el primer pedido al fabricante y arranca la salida del producto.</Punto>
          <Punto titulo="Si a los 90 días no da,">lo cerramos. Lo consolidado queda de cada uno y nadie queda atado.</Punto>
        </ul>
      </Seccion>

      <Seccion id="resumen" titulo="La propuesta en una mirada">
        <Tabla
          cabecera={['Parte', 'Qué propongo', 'Cuándo se cobra o se gana']}
          filas={[
            ['Inversión', '1% por la salida del producto, en trabajo en lugar de USD 30.000', 'Al firmar, al llegar a la meta de ventas'],
            ['Advisorship', '1% de Kiwell', 'Vesting mensual en 12 meses, sin prueba'],
            ['Evolución del producto', '2% de Kiwell', 'Vesting mensual en 12 meses, sin prueba'],

            ['Tramos', 'Hasta 2% (0,5% por tramo)', 'A los 500, 1.500, 3.000 y 5.000 vendidos, en 3 años'],
            ['Licencia de Pacer', '15% del margen por dispositivo + 10% por usuario activo', 'Mensual, sólo si se vende; a los USD 90.000 se renegocia o paso a sueldo'],
            ['Fee', 'USD 1.200 por mes, 6 meses', 'Desde que entra la inversión'],
            ['Pacer', 'Licencia white label, fuente en escrow', 'Mientras dure el acuerdo'],
          ]}
        />
        <p>En total, hasta 6% de Kiwell: 1% por la inversión, 3% por el rol y hasta 2% por los tramos. Todo queda sujeto a la cotización final del fabricante.</p>
      </Seccion>

      <section className="mb-20 max-w-3xl text-black/80 text-[17px] leading-relaxed space-y-4">
        <p>Me entusiasma construir esto con ustedes. Si les cierra la lógica, ajustamos los números en la próxima reunión.</p>
        <p>Un abrazo,</p>
        <p className="font-thunder uppercase text-2xl text-black">Mateo</p>
      </section>
    </>
  )
}
