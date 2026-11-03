import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'oportunidad', label: 'La oportunidad' },
  { id: 'caminos', label: 'Tres caminos' },
  { id: 'piloto', label: 'Piloto' },
  { id: 'aporte', label: 'Qué aporta Pacer' },
  { id: 'equity', label: 'Participación' },
  { id: 'ventas', label: 'Sobre las ventas' },
  { id: 'ejemplo', label: 'Por usuario' },
  { id: 'reglas', label: 'Reglas' },
  { id: 'pasos', label: 'Próximos pasos' },
]

/** Una vía de venta del wearable. */
function Camino({
  letra,
  titulo,
  precio,
  children,
}: {
  letra: string
  titulo: string
  precio: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-6 flex flex-col">
      <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-1">
        {letra} · {titulo}
      </p>
      <p className="text-sm text-black/50 mb-4">{precio}</p>
      <div className="text-black/80 text-[15px] leading-relaxed space-y-3">{children}</div>
    </div>
  )
}

/** Fila de la tabla de participación. */
function Fila({ pct, concepto, detalle }: { pct: string; concepto: string; detalle: string }) {
  return (
    <div className="grid grid-cols-[72px_1fr] md:grid-cols-[110px_1fr] gap-4 py-5 border-b border-[var(--marco-border)] last:border-0">
      <p className="font-thunder text-3xl md:text-4xl text-[var(--marco-accent)] leading-none">{pct}</p>
      <div>
        <p className="font-thunder uppercase text-black text-lg leading-tight mb-1">{concepto}</p>
        <p className="text-black/70 text-[15px] leading-relaxed">{detalle}</p>
      </div>
    </div>
  )
}

/** Cuenta de un usuario en su primer año. */
function Cuenta({
  titulo,
  filas,
  kiwell,
  pacer,
  nota,
}: {
  titulo: string
  filas: { label: string; valor: string }[]
  kiwell: string
  pacer: string
  nota: string
}) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-6">
      <p className="font-thunder uppercase text-black text-lg mb-4">{titulo}</p>
      <div className="space-y-2 text-[15px]">
        {filas.map((f) => (
          <div key={f.label} className="flex justify-between gap-4 text-black/70">
            <span>{f.label}</span>
            <span className="text-black">{f.valor}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-[var(--marco-border)] grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-black/50">Queda en Kiwell</span>
          <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">{kiwell}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide text-black/50">Para Pacer</span>
          <p className="font-thunder text-2xl md:text-3xl text-black mt-1">{pacer}</p>
        </div>
      </div>
      <p className="text-sm text-black/60 mt-4">{nota}</p>
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
          Kiwell · Pacer
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          El wearable<br />como puerta<br />de entrada
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Un anillo o una banda con la metodología médica de Kiwell adentro, para que el
          seguimiento no dependa sólo del próximo chequeo. Proponemos salir con tres caminos de
          venta a la vez, medirlos en 90 días y atar la participación de Pacer a lo que venda.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Piloto</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">90 días</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Caminos de venta</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">3 en paralelo</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Costo del anillo</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">U$50–60</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Participación fija</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">4%</p>
          </div>
        </div>
      </div>

      {/* La oportunidad */}
      <TwoColumnSection title="La oportunidad" id="oportunidad">
        <p className="text-lg">
          La longevidad no genera urgencia de compra. El diagnóstico médico sí. Kiwell ya tiene lo
          que ningún competidor ofrece en la región: análisis de sangre con mirada médica y un
          equipo que acompaña.
        </p>
        <p>
          El wearable suma lo que falta entre un chequeo y el siguiente: datos de cada noche y de
          cada día que el equipo médico puede leer, y una razón diaria para abrir la app. Por eso
          lo pensamos como puerta de entrada a Kiwell, no como un accesorio. El upsell natural es
          el acompañamiento humano.
        </p>
        <p className="text-sm text-black/60">
          Referencias de mercado: Function Health (250.000 miembros a cerca de U$1 por día), Oura y
          Ultrahuman. Ninguno combina el dispositivo con seguimiento médico local.
        </p>
      </TwoColumnSection>

      {/* Tres caminos */}
      <div id="caminos" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-3">
          Tres caminos de venta
        </h3>
        <p className="text-black/80 max-w-2xl mb-8">
          No hace falta elegir uno antes de salir. Corren juntos durante el piloto y los números
          deciden en cuál se pone el peso. Los precios son de partida, para validar en el piloto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Camino letra="A" titulo="Plan Kiwell Pro" precio="~U$120 de ingreso + ~U$80 / mes">
            <p>
              El Plan Kiwell con el wearable incluido y un contacto mensual con el equipo. Es el
              camino de mayor ticket y el que mejor muestra el diferencial médico.
            </p>
            <p className="text-sm text-black/60">
              Convive con el Plan Kiwell actual, que sigue igual para quien no quiera dispositivo.
            </p>
          </Camino>
          <Camino letra="B" titulo="Wearable + IA" precio="~U$150 el anillo + U$8–10 / mes">
            <p>
              El anillo solo, con métricas básicas gratis y una suscripción de IA que explica cada
              noche y cada día. Compite con Oura y Ultrahuman a un precio menor.
            </p>
            <p className="text-sm text-black/60">
              Funciona como embudo: quien ya usa el anillo es el candidato natural al Diagnóstico y
              al Plan.
            </p>
          </Camino>
          <Camino letra="C" titulo="Empresas" precio="Lotes de 100 a 300 unidades">
            <p>
              El anillo como beneficio de salud corporativo, sumado a la oferta para empresas que
              Kiwell ya vende. Es la vía más rápida para mover volumen de una vez.
            </p>
            <p className="text-sm text-black/60">
              Abre la opción de marca compartida con la empresa para cuentas grandes.
            </p>
          </Camino>
        </div>
      </div>

      {/* Piloto */}
      <div id="piloto" className="mb-20 md:mb-28 scroll-mt-28">
        <Timeline
          title="Plan de acción · 90 días"
          steps={[
            {
              label: 'Noviembre',
              items: [
                'Precios finales de los tres caminos',
                'Diseño de la app Kiwell con el wearable',
                'Primeros anillos con corredores y referentes',
              ],
            },
            {
              label: 'Hasta el 15/12',
              items: [
                'Preventa: 50 unidades con seña o 3 empresas',
                'Experimento de pauta para medir interés por camino',
                'Equipo de Kiwell capacitado en el producto',
              ],
            },
            {
              label: 'Enero',
              items: [
                'App en las tiendas con la marca Kiwell',
                'Entrega de la preventa',
                'Primeros datos de uso en manos del equipo médico',
              ],
            },
            {
              label: 'Febrero',
              items: [
                'Lectura de ventas, uso y conversión por camino',
                'Decisión de en qué camino se pone el peso',
                'Ajuste de precios y del plan del año',
              ],
            },
          ]}
        />
      </div>

      {/* Qué aporta Pacer */}
      <TwoColumnSection title="Qué aporta Pacer" id="aporte">
        <p className="text-lg">
          Pacer ya funciona con este mismo fabricante: la conexión con el anillo, la lectura de
          sueño, estrés, recuperación y actividad, y un copiloto de IA que explica cada métrica.
        </p>
        <p>
          Construirlo desde cero lleva entre 6 y 12 meses de desarrollo entre la integración con el
          fabricante, la app y los algoritmos. Con Pacer de base, la app de Kiwell sale en 90 días y
          el piloto arranca con el producto probado.
        </p>
        <p>
          La app no es una copia de Pacer. Es una adaptación de la metodología de Kiwell al
          wearable: las métricas que importan al equipo médico, el lenguaje de Kiwell y el camino
          hacia el Plan.
        </p>
        <ul className="space-y-2 text-black/80 text-[15px] pt-2">
          <li>— Integración del anillo y la banda, con marca Kiwell</li>
          <li>— Diseño de la experiencia y de la app con el wearable</li>
          <li>— Estrategia de planes y precios</li>
          <li>— Capacitación del equipo para operar y vender el producto</li>
          <li>— Automatizaciones de marketing y campañas</li>
          <li>— Contactos con inversores y referentes interesados en wearables</li>
        </ul>
      </TwoColumnSection>

      {/* Participación */}
      <ContentBox title="Participación de Pacer" id="equity">
        <div className="max-w-3xl">
          <Fila
            pct="1%"
            concepto="Advisorship"
            detalle="Acompañamiento estratégico a Kiwell: reunión semanal y trabajo asincrónico sobre producto, negocio y ronda."
          />
          <Fila
            pct="1%"
            concepto="App Kiwell con wearables"
            detalle="La entrega inicial: licencia white label de la tecnología de Pacer y el SDK del fabricante, y la app de Kiwell con el wearable diseñada, integrada y lista para lanzar."
          />
          <Fila
            pct="2%"
            concepto="Evolución del producto"
            detalle="Lo que viene después del lanzamiento: ideación, propuestas e implementación de las mejoras y funciones nuevas, y capacitación del equipo. Con vesting a 24 meses."
          />
          <Fila
            pct="+2%"
            concepto="Liberación por ventas"
            detalle="0,5% al llegar a 500, 1.500, 3.000 y 5.000 dispositivos vendidos en tres años, como en el esquema que propuso Kiwell."
          />
        </div>
        <p className="text-sm text-black/60 pt-2">
          4% fijo y hasta 2% más si el wearable vende. El 1% de la app cubre la entrega inicial y el 2%
          de evolución, el trabajo continuo sobre el producto: no se cobra dos veces lo mismo.
        </p>
      </ContentBox>

      {/* Sobre las ventas */}
      <TwoColumnSection title="Sobre las ventas" id="ventas">
        <p className="text-lg">
          El ingreso de cada venta es de Kiwell. Pacer participa con una parte chica de un negocio
          que hoy no existe y que se abre con el wearable.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-1">Por dispositivo</p>
            <p className="font-thunder text-4xl text-black mt-2">U$5</p>
            <p className="text-black/70 text-[15px] leading-relaxed mt-3">
              Por cada anillo o banda vendido, en cualquiera de los tres caminos. Menos del 10% del
              margen de un anillo suelto.
            </p>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-1">Por suscripción</p>
            <p className="font-thunder text-4xl text-black mt-2">10%</p>
            <p className="text-black/70 text-[15px] leading-relaxed mt-3">
              Sólo de las suscripciones que incluyen el wearable (Plan Pro o IA), por usuario
              activo y durante sus primeros 24 meses. El Plan Kiwell sin dispositivo no paga nada.
            </p>
          </div>
        </div>
        <p className="text-sm text-black/60">
          Si entra una ronda de capital de riesgo, la participación en suscripciones puede
          convertirse en equity, para que no pese en la valuación.
        </p>
      </TwoColumnSection>

      {/* Ejemplo por usuario */}
      <div id="ejemplo" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-3">
          Un usuario en su primer año
        </h3>
        <p className="text-black/80 max-w-2xl mb-8">
          Con los precios de partida y un anillo de U$55. Antes de logística e impuestos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Cuenta
            titulo="A · Plan Kiwell Pro"
            filas={[
              { label: 'Ingreso', valor: 'U$120' },
              { label: '12 meses de plan', valor: 'U$960' },
              { label: 'Costo del anillo', valor: '− U$55' },
            ]}
            kiwell="U$924"
            pacer="U$101"
            nota="U$5 del dispositivo y U$96 del 10% de la suscripción. Pacer se lleva cerca del 10% de lo que entra."
          />
          <Cuenta
            titulo="B · Wearable + IA"
            filas={[
              { label: 'Anillo', valor: 'U$150' },
              { label: '12 meses de IA', valor: 'U$108' },
              { label: 'Costo del anillo', valor: '− U$55' },
            ]}
            kiwell="U$187"
            pacer="U$16"
            nota="U$5 del dispositivo y U$11 de la suscripción. Y cada usuario es un candidato al Diagnóstico y al Plan."
          />
        </div>
      </div>

      {/* Reglas */}
      <div id="reglas" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-3">
          Qué queda de cada lado
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-3">De Kiwell</p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— La marca, los usuarios y todos sus datos</li>
              <li>— La app en sus cuentas de las tiendas</li>
              <li>— La relación médica y el Plan</li>
              <li>— La compra de los dispositivos, directo al fabricante</li>
              <li>— El ingreso de cada venta</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black/70 text-lg mb-3">De Pacer</p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— La tecnología de base, que se licencia a Kiwell</li>
              <li>— La app Pacer para el consumidor, que sigue aparte</li>
              <li>— El mantenimiento de la integración con el fabricante</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-black/60 mt-5 max-w-2xl">
          Sin exclusividad por ahora. Si el wearable crece, se firma exclusividad en salud y medicina
          con liberación parcial del vesting.
        </p>
      </div>

      {/* Próximos pasos */}
      <BoxedListSection
        id="pasos"
        title="Próximos pasos"
        items={[
          'Kiwell: confirmar con qué caminos sale el piloto y validar los precios de partida.',
          'Kiwell y Pacer: acordar los porcentajes y los hitos del vesting sobre esta base.',
          'Pacer: con el acuerdo, arrancar el diseño de la app y pedir los primeros anillos para corredores y referentes.',
          'Ambos: fijar la meta de preventa del 15 de diciembre como primer corte del piloto.',
        ]}
      />
    </>
  )
}
