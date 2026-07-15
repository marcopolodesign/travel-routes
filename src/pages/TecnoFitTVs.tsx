import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import MermaidDiagram from '../components/MermaidDiagram'
import MarcopoloLogo from '../components/MarcopoloLogo'

const EXPERIENCE_FLOW = `
flowchart TD
  subgraph ING["1 · Entrada"]
    A1["Socio escanea QR<br/>o tag NFC"]
  end
  A1 --> D1[("access_logs")]

  subgraph FILA["2 · Lista de espera"]
    B1["App: se anota en la fila"]
    B2["Motor de cola (pg_cron)<br/>avanza box → box"]
    B3["App: confirma turno<br/>al llegar al box 1"]
  end
  D1 -.-> B1
  B1 --> D2[("production_lines / boxes /<br/>line_box_status")]
  D2 --> B2
  B2 --> B3
  B3 --> D2

  subgraph ANTES["3 · Antes de la clase"]
    C1["App: socio edita los<br/>ejercicios de su rutina"]
    C2["Admin: staff sube video<br/>y arma la rutina"]
  end
  C1 --> D3[("rutinas / ejercicios / video")]
  C2 --> D3

  subgraph PISO["4 · Lo que se ve en vivo"]
    E1["TV pública × 10<br/>(2 líneas × 5 boxes)"]
    E2["App: pantalla de<br/>entrenamiento"]
  end
  D2 -. Realtime .-> E1
  D3 -. Realtime .-> E1
  D3 --> E2
`.trim()

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
          Motor de cola en tiempo real, pantallas del piso y CMS de rutinas y video.
        </p>
        <hr className="mt-10 md:mt-14 border-t border-[var(--marco-border)]" />
      </div>

      <ContentBox title="Visión general">
        <p>
          Un motor de cola en tiempo real que ordena y muestra en vivo quién entra a cada box,
          sincronizado en las 10 pantallas del piso del gym (2 líneas × 5 boxes). Junto con eso,
          una herramienta para que el staff cargue videos de ejercicios y arme rutinas nuevas sin
          depender de que alguien toque código para publicar contenido — y dos funcionalidades
          nuevas del lado del socio: poder ajustar los ejercicios de su rutina desde la app antes
          de entrenar, y tags NFC como método de ingreso.
        </p>
      </ContentBox>

      <TwoColumnSection title="Lista de espera en tiempo real">
        <ul className="list-disc pl-5 space-y-2">
          <li>Motor de cola nativo (Supabase Realtime + <code>pg_cron</code>), sin depender de hardware LAN-only</li>
          <li>Avance automático de box a box cada 1 minuto, visible en vivo sin refrescar</li>
          <li>El socio confirma su turno desde la app al llegar al box 1 — si no confirma, se salta o penaliza</li>
          <li>Sincronización de las 10 TVs físicas (2 líneas × 5 boxes) desde un único canal por línea</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="CMS de rutinas y video">
        <ul className="list-disc pl-5 space-y-2">
          <li>Catálogo de ejercicios con video, administrado desde el panel — sin código</li>
          <li>Constructor de rutinas de punta a punta para el staff</li>
          <li>Pipeline de carga de video (storage, compresión, entrega) pensado para el volumen real de un gym</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="Nuevo: más control desde la app">
        <ul className="list-disc pl-5 space-y-2">
          <li>El socio va a poder modificar los ejercicios de su rutina desde la app, antes de entrar a clase</li>
          <li>Tags NFC como método de ingreso, junto al QR existente</li>
        </ul>
        <p className="text-sm text-black/60 pt-2">
          Estas dos funcionalidades son scope nuevo respecto de la propuesta original — ver nota en Inversión.
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

      {/* Flujo de la experiencia */}
      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-4 flex flex-col">
            <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)]">
              Cómo fluye la experiencia
            </h2>
            <p className="text-sm text-black/60 mt-3">
              Desde que el socio entra al gym hasta que termina la clase — y de dónde sale cada dato.
            </p>
          </div>
          <div className="md:col-span-8 space-y-8">
            <MermaidDiagram
              chart={EXPERIENCE_FLOW}
              className="min-h-[420px] rounded-xl border-2 border-[var(--marco-border)] bg-white p-6 md:p-8 shadow-sm [&_svg]:h-auto"
            />
            <ul className="space-y-3 text-black font-interphases">
              <li><strong>1 · Entrada:</strong> el socio escanea el QR de la puerta o pasa un tag NFC — queda registrado en <code>access_logs</code>.</li>
              <li><strong>2 · Lista de espera:</strong> se anota en la fila desde la app; el motor de cola (<code>pg_cron</code>) avanza box a box en <code>production_lines / boxes / line_box_status</code>, y confirma su turno al llegar al box 1.</li>
              <li><strong>3 · Antes de la clase:</strong> el socio puede ajustar los ejercicios de su rutina desde la app; el staff sube video y arma rutinas desde el admin — todo vive en las tablas de rutinas/ejercicios/video.</li>
              <li><strong>4 · En el piso:</strong> las 10 TVs y la pantalla de entrenamiento de la app leen esos mismos datos por Realtime — es la misma fuente de verdad, mostrada en dos superficies distintas.</li>
            </ul>
          </div>
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
        <p className="text-sm text-black/60 pt-2">
          Nota: la edición de rutina desde la app y los tags NFC son scope agregado después de esta estimación —
          todavía no están reflejados en el rango de arriba. Falta definir si van dentro de estos U$20.000–25.000
          o como una fase aparte.
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
