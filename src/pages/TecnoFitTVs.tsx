import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import MarcopoloLogo from '../components/MarcopoloLogo'

const FLOW_STEPS = [
  {
    title: 'Llega y entra sin hacer fila en la puerta',
    body: 'Sofía llega al gym a las 7 de la mañana. Apoya el teléfono en la entrada — ni QR impreso, ni tarjeta, ni nadie de recepción tiene que escanearla. La app ya sabe quién es.',
  },
  {
    title: 'Se anota y espera cómoda, no parada',
    body: 'Desde la misma app se anota en la fila de su línea. Ve en el celular cuánto falta para que la llamen a su box — no hace fila de pie esperando que alguien le diga "ya podés pasar".',
  },
  {
    title: 'El sistema la conoce, aunque ella no lo note',
    body: 'Cada clase que entrena queda registrada sola. El sistema sabe que esta semana ya vino 3 veces — y si en cambio hubiera bajado el ritmo, un motor de alerta se lo avisa al gym antes de que Sofía deje de venir, para que alguien del equipo la llame a tiempo.',
  },
  {
    title: 'Entrena su plan, no el de todos',
    body: 'Le toca el turno. La pantalla de su box ya muestra el entrenamiento que armó su coach para ella — no la rutina genérica de la semana. Si un ejercicio no le cae bien, lo cambia ahí mismo desde el celular.',
  },
  {
    title: 'Todo se actualiza solo, para todos',
    body: 'El cambio se ve al instante en la pantalla, sin que nadie del staff tenga que tocar nada. Del otro lado, el dueño ve en su panel en tiempo real cuántas líneas están activas ahora mismo, cómo viene cada coach con sus alumnos y qué sede necesita atención esta semana.',
  },
]

export default function TecnoFitTVs() {
  return (
    <>
      {/* Cover */}
      <div className="mb-20 md:mb-32">
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance">
          Fitness<br />Central
        </h1>
        <div className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black mt-4 md:mt-6">
          TecnoFit
        </div>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-xl">
          Un nuevo CMS de entrenamiento, lista de espera y TVs sin hardware, y un panel de
          control total para el dueño — pensado para dar más valor al socio y para franquiciar.
        </p>
        <hr className="mt-10 md:mt-14 border-t border-[var(--marco-border)]" />
      </div>

      <BoxedListSection
        title="Objetivos"
        items={[
          'Generar valor real para los socios actuales de TecnoFit y bajar la tasa de abandono (churn) del gimnasio.',
          'Darle al equipo herramientas de control y KPIs de referencia para coaches y recepción.',
          'Construir un ambiente franquiciable, a nivel tecnología y experiencia, para que TecnoFit pueda replicarse en nuevas sedes.',
        ]}
      />

      <ContentBox title="Visión general">
        <p>
          Este proyecto le da al dueño control total sobre cómo está funcionando cada sede, en
          tiempo real — no solo cuántos socios entrenan, sino cómo está rindiendo el equipo que
          los atiende: qué coach retiene mejor a sus alumnos, qué recepcionista convierte más
          clases de prueba, y qué sede necesita atención antes de que se note en la facturación.
        </p>
        <p>
          Del lado del socio, el entrenamiento deja de ser genérico. Un nuevo módulo de
          entrenamiento le da al coach la posibilidad de armar planes 100% a medida, con
          variantes reales más allá del Tabata — AMRAP, On the Minute / EMOM y lo que el gym
          quiera sumar — para que cada clase se sienta hecha para esa persona, no para todo el
          grupo.
        </p>
      </ContentBox>

      <div className="mb-10 md:mb-14">
        <span className="text-xs uppercase tracking-wide text-black/50">Stack de tecnología a crear</span>
      </div>

      <TwoColumnSection title="Fitness 2.0 — CMS de rutinas">
        <p>
          Reemplaza el sistema actual de rutinas por uno pensado para la personalización real,
          administrado desde el mismo panel de Tecno que ya existe.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Constructor de rutinas y catálogo de ejercicios con video, sin código</li>
          <li>El coach arma el entrenamiento de cada alumno a medida — no rutina → grupo — y lo puede cambiar de forma dinámica sumando ejercicios y nuevas modalidades: <strong>AMRAP</strong>, <strong>On the Minute / EMOM</strong>, además de Tabata</li>
          <li>Desde la app, el socio también puede ajustar o cambiar su rutina completa antes de entrenar</li>
          <li>Carga de video optimizada para uso real: compresión automática y varias resoluciones según el video subido, para que cargue rápido sin importar la conexión del gym</li>
          <li>Visualización en tiempo real de los socios en cada línea, con la posibilidad de adaptar los ejercicios sobre la marcha</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="Lista de espera">
        <p className="text-sm text-black/60">Apunta directo al objetivo de hacer el gimnasio franquiciable.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Reemplaza la lista de espera actual sin necesitar hardware dedicado — el socio apoya el teléfono (QR o tag NFC) y entra</li>
          <li>Confirma su turno e ingresa a la línea directo desde la app, sin que el personal tenga que intervenir</li>
          <li>Cada ingreso queda registrado en el administrador: el staff puede ver quién viene poco y hacerle seguimiento antes de perderlo como socio</li>
          <li>Al no depender de hardware a medida, se replica igual en cualquier sede nueva</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="TVs">
        <p className="text-sm text-black/60">También apunta al objetivo de franquicias.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Reemplazo de las TVs actuales por links dinámicos por línea, box y sede — una sede nueva se conecta en minutos, sin configuración a medida</li>
          <li>El ejercicio que se ve en la TV está siempre en vivo: si el socio lo cambia desde la app, o si lo cambia front desk o el coach, se refleja al instante en la pantalla</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="Administrador — métricas de negocio">
        <p>
          La funcionalidad de mayor valor estratégico para franquicias: convertir la operación diaria
          del gym en datos accionables, con asignación trazable de cada alumno a un coach y a quien lo
          recibió en recepción.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Conversión de lead a clase de prueba, atribuida a recepción</li>
          <li>Conversión de clase de prueba a alumno, atribuida al coach</li>
          <li>Retención por coach y retención por recepcionista</li>
          <li>Frecuencia de asistencia por socio e ingresos por coach — la base para planes de compensación variable a futuro</li>
          <li>Predicción de abandono (churn), en base a benchmarks de industria fitness</li>
        </ul>
        <p className="text-sm text-black/60 pt-2">
          La asignación de leads a recepcionistas es manual por ahora, pero queda trackeada en el sistema.
          Con esta trazabilidad, TecnoFit puede identificar qué coaches y qué procesos de recepción
          funcionan mejor y replicar ese modelo al abrir nuevas sedes. Esto probablemente requiere un
          dashboard de administración nuevo, además del CMS de rutinas ya contemplado.
        </p>
      </TwoColumnSection>

      <BoxedListSection
        title="Por qué esto es producto, no infraestructura"
        items={[
          'Lo que se construye acá lo usa el socio todos los días: la pantalla antes de entrenar, la fila para el box, el video del ejercicio.',
          'El staff deja de depender de un desarrollador para subir un video o armar una rutina nueva.',
          'Dónde hostear el video y cómo sincronizar 10 pantallas sin errores se decide y documenta antes de construir, no se improvisa en el camino.',
        ]}
      />

      <div className="mb-20 md:mb-28">
        <p className="text-black/80 max-w-2xl mb-10 md:mb-14">
          Un proyecto de este alcance toma habitualmente <strong>16 a 20 semanas</strong>. Lo
          comprimimos a <strong className="text-[var(--marco-accent)]">8 semanas</strong> para
          que TecnoFit empiece a darle valor al socio lo antes posible — con la salvedad de que
          el sprint de implementación (semana 7–8) puede estirar el total a{' '}
          <strong>10 a 12 semanas</strong> si el trabajo sobre las TVs físicas lo requiere.
        </p>
        <Timeline
          title="Timeline"
          steps={[
            {
              label: 'Semana 1–2',
              items: [
                'Arquitectura de video y hosting (Supabase Storage vs. CDN dedicado)',
                'Pipeline de carga funcionando',
                'El gym empieza a cargar contenido real',
              ],
            },
            {
              label: 'Semana 3–4',
              items: [
                'Catálogo de ejercicios en el admin',
                'Constructor de rutinas de punta a punta',
                'Staff arma rutinas reales, sin código',
              ],
            },
            {
              label: 'Semana 5–6',
              items: [
                'Sincronización para 10 TVs, definida con datos reales de video',
                'Avance automático por box, verificado en staging',
                'Diseño resiliente ante caídas de conexión',
              ],
            },
            {
              label: 'Semana 7–8',
              items: [
                'TV, admin y app conectados de punta a punta',
                'Despliegue en las 10 pantallas reales del piso',
                'Pruebas en clases reales, ajustes de hardware (incluye NFC) in situ',
              ],
            },
          ]}
        />
      </div>

      {/* Flujo de la experiencia — contado como lo vive el socio, no como lo ve el código */}
      <section className="mb-14 md:mb-20">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)]">
            Así se vive puertas adentro
          </h2>
          <p className="text-sm text-black/60 mt-3">
            Desde que el socio llega al gym hasta que termina la clase — y lo que ve el dueño mientras tanto.
          </p>
        </div>
        <div className="space-y-10 md:space-y-12">
          {FLOW_STEPS.map((step, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
              <div className="md:col-span-1">
                <span className="font-thunder text-3xl md:text-4xl text-[var(--marco-accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="md:col-span-11">
                <h3 className="font-thunder text-xl md:text-2xl uppercase text-black mb-2">{step.title}</h3>
                <p className="text-black/80 max-w-2xl">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContentBox title="Inversión">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-14 mb-6">
          <svg viewBox="0 0 200 200" className="w-20 h-20 md:w-28 md:h-28 shrink-0" fill="none" aria-hidden>
            <circle cx="100" cy="100" r="100" fill="var(--marco-accent-light)" opacity="0.6" />
            <path
              d="M100 40 V160 M124 62c0-14-11-22-24-22-15 0-27 9-27 22 0 30 51 15 51 44 0 14-13 24-27 24-14 0-25-8-26-23"
              stroke="var(--marco-accent)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="flex flex-col gap-6 min-w-0">
            <div>
              <span className="text-xs uppercase tracking-wide text-black/60">Inversión total estimada</span>
              <p className="font-thunder text-3xl md:text-5xl text-[var(--marco-accent)] mt-1">U$20.000 – U$25.000</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-black/60">Duración estimada</span>
              <p className="font-thunder text-3xl md:text-5xl text-black mt-1">8 semanas · 4 sprints</p>
              <p className="text-sm text-black/60 mt-1">Posible extensión a 10–12 semanas (vs. 16–20 habituales)</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-black/60">Forma de pago</span>
              <p className="font-thunder text-2xl md:text-3xl text-black mt-1">4 cuotas de U$5.000</p>
            </div>
          </div>
        </div>
        <p>
          El rango responde a un único factor de incertidumbre real: el sprint de <strong>implementación</strong>
          {' '}(semana 7–8), que incluye el despliegue y las pruebas sobre las 10 TVs físicas del gym. Ese trabajo
          depende de variables fuera de nuestro control — la red del gym, el hardware de cada pantalla, la
          disponibilidad de horarios sin clase — por eso se cotiza con un mínimo y un máximo en vez de un
          número fijo. Los primeros tres sprints (arquitectura, CMS y motor de cola) son software que
          controlamos de punta a punta y no varían dentro de ese rango.
        </p>
      </ContentBox>

      {/* Contacto — full bleed */}
      <div className="mx-[-4vw] md:mx-[-10.5vw] mb-14 md:mb-20">
        <div className="bg-[var(--marco-accent)] px-[4vw] md:px-[10.5vw] py-16 md:py-24">
          <div className="flex flex-wrap items-center justify-between gap-10 md:gap-16">
            <h2 className="font-thunder text-4xl md:text-6xl lg:text-7xl uppercase text-black">
              ¿Dudas?
            </h2>
            <div className="flex flex-wrap gap-10 md:gap-16">
              <div>
                <p className="font-thunder text-lg md:text-xl uppercase text-black">Mateo Aldao</p>
                <p className="text-black/70 text-sm mt-2">m@marcopolo.agency<br />Director</p>
              </div>
              <div>
                <p className="font-thunder text-lg md:text-xl uppercase text-black">Marco Polo — General</p>
                <p className="text-black/70 text-sm mt-2">hi@marcopolo.agency<br />Av. Del Libertador 7766</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contraportada */}
      <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24">
        <MarcopoloLogo className="h-8 md:h-10 w-auto text-[var(--marco-accent)]" />
        <p className="text-sm tracking-wide text-black/50">
          www.marcopolo.agency · Av. Del Libertador 7766
        </p>
      </div>
    </>
  )
}
