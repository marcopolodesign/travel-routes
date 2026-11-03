import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'por-que', label: 'Por qué sí' },
  { id: 'anillo', label: 'Cómo se vende' },
  { id: 'reconocimiento', label: 'Lo que traigo' },
  { id: 'ventas', label: 'Sobre las ventas' },
  { id: 'juntos', label: 'Cómo trabajamos' },
  { id: 'propiedad', label: 'Qué es de quién' },
  { id: 'no-funciona', label: 'Si no funciona' },
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

      {/* Portada */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Kiwell · Pacer · Noviembre 2026
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Propuesta a<br />Alejo y Luca
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          La respuesta a la propuesta del 26 de octubre, con lo que hablamos el 30.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Participación fija</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">4%</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Por el éxito del anillo</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Hasta 2%</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Efectivo por adelantado</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">U$0</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">MVP</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">90 días</p>
          </div>
        </div>
      </div>

      <Seccion id="por-que" titulo="Por qué sí">
        <p>Gracias por la propuesta. Me gusta lo que están armando y quiero ser parte.</p>
        <p>
          Kiwell pone la marca, los médicos y los pacientes. Yo traigo un negocio nuevo que la
          impulsa: el anillo funcionando, la app que lo lee y cómo venderlo.
        </p>
        <p>
          Lo implemento para la salida del producto, y después superviso e implemento lo que siga
          para que crezca. Por eso propongo una parte de cada venta y un porcentaje de Kiwell, para
          sentirlo propio.
        </p>
      </Seccion>

      <Seccion id="anillo" titulo="Cómo se vende el anillo">
        <p>Coincido: no vendemos un anillo, vendemos un plan con un anillo adentro. Lo probaría por tres caminos a la vez:</p>
        <ul className="space-y-3">
          <Punto titulo="Dentro del Plan.">Un Plan Kiwell Pro con el anillo incluido y un contacto mensual con el equipo.</Punto>
          <Punto titulo="Solo, con IA.">El anillo con métricas básicas y una suscripción de IA. Es la puerta al Diagnóstico y al Plan.</Punto>
          <Punto titulo="Empresas.">Como regalo empresarial y dentro de Corporate Athletes, como ya plantearon.</Punto>
        </ul>
        <p>A los 90 días, los números dicen en cuál ponemos el peso.</p>
      </Seccion>

      <Seccion id="reconocimiento" titulo="Lo que traigo y cómo se reconoce">
        <p>Cuatro partes, cada una con su "a cambio de qué". A la valuación de la ronda, cada 1% vale USD 40.000.</p>
        <Tabla
          cabecera={['Parte', 'A cambio de qué', '%', 'Valor hoy (USD)']}
          filas={[
            ['Mi rol', 'Socio de producto y marca: una reunión por semana + conversación asincrónica. Se consolida en 12 meses, sin período de prueba.', '1%', '40.000'],
            ['La salida del producto', 'La app de Kiwell con wearables, lista para lanzar: tecnología de Pacer licenciada, integración con el fabricante y diseño de la app. En lugar de los USD 30.000 en efectivo.', '1%', '40.000'],
            ['La evolución del producto', 'Supervisión e implementación de lo que venga después del lanzamiento: ideas, propuestas, funciones nuevas y capacitación del equipo. Se consolida en 12 meses.', '2%', '80.000'],
            ['El éxito del anillo', '0,5% por cada tramo: 500, 1.500, 3.000 y 5.000 dispositivos vendidos, en los primeros 3 años.', 'Hasta 2%', 'Hasta 80.000'],
          ]}
          total={['Total posible', '', 'Hasta 6%', 'Hasta 240.000']}
        />
        <p>La salida es la entrega inicial y la evolución es lo que sigue, sin presupuestos aparte.</p>
      </Seccion>

      <Seccion id="ventas" titulo="Sobre las ventas">
        <p>El ingreso de cada venta es de Kiwell. Pido una parte chica de lo que se abre con el anillo:</p>
        <ul className="space-y-3">
          <Punto titulo="5% del precio de cada dispositivo vendido,">en cualquiera de los tres caminos.</Punto>
          <Punto titulo="10% de las suscripciones que incluyen el anillo,">durante los primeros 24 meses de cada usuario. El Plan sin anillo no paga nada.</Punto>
        </ul>
        <p>Si entra una ronda de capital de riesgo, esta parte puede convertirse en equity para no pesar en la valuación.</p>
      </Seccion>

      <Seccion id="juntos" titulo="Cómo trabajamos juntos">
        <ul className="space-y-3">
          <Punto titulo="Primero el criterio médico.">Ninguna función sale sin el respaldo de sus médicos.</Punto>
          <Punto titulo="Primero vendemos.">Los acompaño en la fase comercial con la app y las demos hasta el 15 de diciembre. La meta sigue siendo 3 empresas o 50 unidades con seña.</Punto>
          <Punto titulo="Si llegamos,">firmamos, se hace el primer pedido al fabricante y arranca la integración.</Punto>
          <Punto titulo="El MVP">sigue como lo plantearon: validación médica, empresas, embajadores y medición a los 90 días.</Punto>
        </ul>
      </Seccion>

      <Seccion id="propiedad" titulo="Qué es de quién">
        <ul className="space-y-3">
          <Punto titulo="De Kiwell:">la marca, la app en sus tiendas, los usuarios y sus datos, la relación con el fabricante y el ingreso de cada venta.</Punto>
          <Punto titulo="De Pacer:">la tecnología de base, que se licencia a Kiwell, y la app Pacer para el consumidor, que sigue aparte.</Punto>
          <Punto titulo="Continuidad.">El código queda en custodia. Si Pacer deja de dar soporte 60 días, cierra o se vende a una prepaga, pasa a Kiwell.</Punto>
        </ul>
      </Seccion>

      <Seccion id="no-funciona" titulo="Si no funciona">
        <ul className="space-y-3">
          <li>— Si a los 90 días el MVP no da, lo cerramos. Sin vueltas.</li>
          <li>— Lo consolidado queda de cada uno. Los tramos por ventas que no se alcanzaron, no se ganan.</li>
          <li>— Nadie queda atado. No hay exclusividad de ningún lado; si el anillo crece, la hablamos.</li>
        </ul>
      </Seccion>

      <Seccion id="resumen" titulo="La propuesta en una mirada">
        <Tabla
          cabecera={['', '']}
          filas={[
            ['Rol', 'Socio de producto y marca de Kiwell, part-time'],
            ['Salida del producto', '1%: la app de Kiwell con wearables, en lugar de efectivo'],
            ['Por mi rol', '1%, consolidado en 12 meses, sin período de prueba'],
            ['Evolución del producto', '2%, consolidado en 12 meses'],
            ['Por el éxito del anillo', 'Hasta 2%: 0,5% a los 500, 1.500, 3.000 y 5.000 dispositivos, en 3 años'],
            ['Participación total posible', 'Hasta 6% de Kiwell'],
            ['Sobre las ventas', '5% de cada dispositivo + 10% de la suscripción con anillo, 24 meses por usuario'],
            ['Propiedad', 'Marca, app, usuarios y datos de Kiwell; tecnología de base licenciada por Pacer'],
            ['MVP', '3 empresas o 50 unidades con seña antes del 15/12; después, 90 días'],
          ]}
        />
      </Seccion>

      <section className="mb-20 max-w-3xl text-black/80 text-[17px] leading-relaxed space-y-4">
        <p>Lo podemos revisar juntos cuando tengan la cotización del fabricante. Me encantaría cerrarlo antes de fin de año.</p>
        <p>Un abrazo,</p>
        <p className="font-thunder uppercase text-2xl text-black">Mateo</p>
      </section>
    </>
  )
}
