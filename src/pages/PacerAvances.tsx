import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'anillo', label: 'Anillo' },
  { id: 'medicion', label: 'Medición' },
  { id: 'noche', label: 'Noche' },
  { id: 'entrenos', label: 'Entrenos' },
  { id: 'hoy', label: 'Hoy' },
  { id: 'sincronizacion', label: 'Sincronización' },
  { id: 'sueno-movimiento', label: 'Sueño y movimiento' },
  { id: 'salud', label: 'Salud' },
  { id: 'sigue', label: 'Qué sigue' },
]

const IMG = '/pacer-avances'

/** Dónde vive cada cosa y en qué estado está. */
function Estado({ donde, estado }: { donde: string; estado: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-[11px] uppercase tracking-wide text-black/50 border border-[var(--marco-border)] rounded-full px-2.5 py-0.5">
        {donde}
      </span>
      <span className="text-[13px] text-black/70">{estado}</span>
    </div>
  )
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-black/80 text-[15px]">
      {items.map((it) => (
        <li key={it}>— {it}</li>
      ))}
    </ul>
  )
}

/** Capturas de la app, chicas y en grilla. */
function Pantallas({ items }: { items: { src: string; alt: string; pie: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-3">
      {items.map((it) => (
        <figure key={it.src}>
          <img
            src={`${IMG}/${it.src}`}
            alt={it.alt}
            loading="lazy"
            className="w-full rounded-lg border border-[var(--marco-border)]"
            style={{ maxWidth: 240 }}
          />
          <figcaption className="text-sm text-black/50 mt-2" style={{ maxWidth: 240 }}>
            {it.pie}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

const EN_LA_APP = 'Actualizado en la app'
const EN_PRUEBA = 'Versión de prueba 1.2.8'

export default function PacerAvances() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* ── Portada ───────────────────────────────────────────── */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Pacer · Del 16 al 18 de octubre
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          El anillo ahora
          <br />
          mide todo lo que
          <br />
          sabe medir
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Pacer suma una pantalla para el anillo, medición automática configurable, tres curvas
          nuevas de la noche y entrenos con los datos que el propio anillo registra cada segundo.
          La pantalla de inicio se ordenó alrededor de una pregunta de salud diaria, y la
          sincronización se ve en el logo.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Funciones nuevas del anillo
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">10</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Actualizaciones publicadas
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">22</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Curvas nuevas de la noche
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">3</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Versión de prueba
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">1.2.8</p>
          </div>
        </div>
      </div>

      {/* ── 1. Pantalla del anillo ────────────────────────────── */}
      <TwoColumnSection title="Pantalla del anillo" id="anillo">
        <p className="text-lg">
          Todo lo del anillo vive ahora en una sola pantalla: batería, si está cargando, versión y
          última sincronización arriba, y debajo cómo se usa y cómo se conecta. Se llega desde
          Perfil, con el botón "Ajustes del anillo", o desde Ajustes.
        </p>
        <Lista
          items={[
            'Ver la batería con el rayo cuando el anillo está en el cargador.',
            'Elegir en qué mano se usa el anillo.',
            'Activar "Detectar entrenos solos": si te movés un rato seguido, el anillo graba la sesión sin abrir la app.',
            'Reiniciar el anillo sin borrar nada, para cuando una medición queda colgada.',
            'Restablecer de fábrica con una sincronización previa, para que no se pierda ningún dato.',
          ]}
        />
        <Estado donde="App iPhone" estado={EN_PRUEBA} />
        <Pantallas
          items={[
            {
              src: '07-anillo.jpg',
              alt: 'Pantalla del anillo con batería, mano y detección de entrenos',
              pie: 'La pantalla del anillo, con todo en un lugar.',
            },
            {
              src: '14-perfil.jpg',
              alt: 'Perfil con el botón Ajustes del anillo',
              pie: 'Desde Perfil se llega con un solo botón.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 2. Medición automática ────────────────────────────── */}
      <TwoColumnSection title="Medición automática" id="medicion">
        <p className="text-lg">
          Cada persona decide qué mide el anillo solo y cada cuánto: pulso de día, oxígeno en
          sangre con su horario, y variabilidad cardíaca. El modo noche, que mide menos antes de
          dormir para que la luz no moleste, se mudó a esta misma pantalla.
        </p>
        <p className="max-w-2xl">
          Al abrirla, la pantalla lee lo que el anillo tiene configurado, así lo que se ve es
          siempre lo que el anillo está haciendo. La configuración elegida se mantiene aunque el
          anillo se desconecte y vuelva.
        </p>
        <Lista
          items={[
            'Pulso de día cada 5, 10 o 30 minutos, o cada hora.',
            'Oxígeno en sangre con horario propio, por ejemplo sólo de noche.',
            'Variabilidad cardíaca automática, con su frecuencia.',
            'Una nota corta en cada medición con qué luz usa y cuánta batería gasta.',
          ]}
        />
        <Estado donde="App iPhone" estado={EN_PRUEBA} />
        <Pantallas
          items={[
            {
              src: '08-medicion-automatica.jpg',
              alt: 'Pantalla de medición automática con pulso, oxígeno y variabilidad cardíaca',
              pie: 'Qué mide el anillo solo, y cada cuánto.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 3. Curvas de la noche ─────────────────────────────── */}
      <TwoColumnSection title="Tres curvas de la noche" id="noche">
        <p className="text-lg">
          El detalle de cada noche suma tres curvas que el anillo ya registraba y la app no
          mostraba. Se guardan en el teléfono después de cada sincronización, así se ven aunque el
          anillo esté lejos.
        </p>
        <Lista
          items={[
            'Variabilidad cardíaca durante el sueño, alineada con las fases del hipnograma.',
            'Variación de oxígeno a lo largo de la noche, con las bajadas que se destacan.',
            'Temperatura de la noche, minuto a minuto, comparada con tu valor habitual.',
          ]}
        />
        <Estado
          donde="App iPhone"
          estado={`Variabilidad y oxígeno: ${EN_LA_APP.toLowerCase()} · temperatura: ${EN_PRUEBA.toLowerCase()}`}
        />
        <Pantallas
          items={[
            {
              src: '09-curva-hrv.jpg',
              alt: 'Detalle de sueño con la curva de variabilidad cardíaca',
              pie: 'Variabilidad cardíaca debajo del hipnograma.',
            },
            {
              src: '10-curva-oxigeno.jpg',
              alt: 'Detalle de oxígeno con la variación de la noche',
              pie: 'Variación de oxígeno y bajadas marcadas.',
            },
            {
              src: '11-curva-temperatura.jpg',
              alt: 'Detalle de temperatura con la curva de la noche',
              pie: 'Temperatura de la noche frente a tu normal.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 4. Entrenos ───────────────────────────────────────── */}
      <TwoColumnSection title="Entrenos con los datos del anillo" id="entrenos">
        <p className="text-lg">
          Durante un entreno, el anillo manda pulso, pasos y calorías cada segundo, y la app los
          usa en vivo. El entreno lo termina siempre la persona: si pasa mucho tiempo sin pasos,
          Pacer pregunta si seguís y, si no hay respuesta, avisa con una notificación.
        </p>
        <Lista
          items={[
            'Pulso, pasos y calorías del propio anillo, segundo a segundo.',
            'A los 10 y 20 minutos sin pasos, una pregunta con "Seguir" o "Terminar".',
            'En gimnasio no hay preguntas: una serie de pesas puede durar sin pasos.',
            'Si la app se cierra en medio de una carrera, la retoma donde estaba.',
            'Mientras medís el pulso a mano, la onda del sensor se dibuja en vivo.',
          ]}
        />
        <Estado donde="App iPhone" estado={EN_PRUEBA} />
        <Pantallas
          items={[
            {
              src: '12-entreno-aviso.jpg',
              alt: 'Entreno en curso con la pregunta de si seguís entrenando',
              pie: 'La pregunta a los 10 minutos sin pasos.',
            },
            {
              src: '13-pulso-onda.jpg',
              alt: 'Medición de pulso con la onda del sensor',
              pie: 'La onda del pulso mientras se mide.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 5. Hoy ────────────────────────────────────────────── */}
      <TwoColumnSection title="Hoy" id="hoy">
        <p className="text-lg">
          La pantalla de inicio suma una pregunta de salud por día, debajo de "Tu resumen del
          día". Puede ser la hora de dormir de esa noche, que el anillo confirma a la mañana, o
          "¿Cómo te sentís hoy?" cuando las señales se mueven. Con "Mal", el día queda sin metas.
        </p>
        <p className="max-w-2xl">
          La entrada se anima la primera vez que se abre la app, los números ruedan al
          actualizarse y la racha de noches buenas aparece en el encabezado. Explorá se rediseñó
          con la trama de Pacer y una tarjeta con foto para salir a correr.
        </p>
        <Lista
          items={[
            'Una sola pregunta de salud por día, y ninguna si no hace falta.',
            'Racha de noches buenas, con hitos a las 3, 5, 7 y 10 noches.',
            'De dos a cuatro próximos pasos, elegidos por el coach según el día.',
            'Frases del encabezado cortas, de hasta tres palabras.',
            'Explorá con ilustraciones propias y la tarjeta de correr aparte.',
          ]}
        />
        <Estado donde="App iPhone" estado={EN_LA_APP} />
        <Pantallas
          items={[
            {
              src: '01-hoy.jpg',
              alt: 'Pantalla Hoy con la frase del día y las tres métricas',
              pie: 'Hoy, con la frase del día y las tres métricas.',
            },
            {
              src: '02-hoy-pregunta.jpg',
              alt: 'La pregunta de Pacer debajo del resumen del día',
              pie: 'La pregunta del día, debajo del resumen.',
            },
            {
              src: '04-explora.jpg',
              alt: 'Explorá con la trama de Pacer y la tarjeta para correr',
              pie: 'Explorá, con la tarjeta para salir a correr.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 6. Sincronización ─────────────────────────────────── */}
      <TwoColumnSection title="La sincronización se ve en el logo" id="sincronizacion">
        <p className="text-lg">
          Mientras el anillo pasa los datos, el logo de Pacer se va llenando y debajo aparece qué
          está llegando: sueño, pulso, actividad. Batería, oxígeno y la copia en la nube siguen
          en segundo plano, sin interrumpir.
        </p>
        <Lista
          items={[
            'Las etapas en orden: conectando, sueño, pulso, actividad, listo.',
            'Del inicio de la app se pasa directo a Hoy.',
            'Los botones de actualizar y reconectar, nativos de iPhone.',
          ]}
        />
        <Estado donde="App iPhone" estado={EN_LA_APP} />
        <Pantallas
          items={[
            {
              src: '03-header-sync.jpg',
              alt: 'Encabezado con el logo llenándose durante la sincronización',
              pie: 'El logo se llena a medida que llegan los datos.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 7. Sueño y movimiento ─────────────────────────────── */}
      <TwoColumnSection title="Regularidad y zona 2" id="sueno-movimiento">
        <p className="text-lg">
          Sueño suma la regularidad: cuánto se mueven la hora de acostarte y la de despertarte en
          las últimas siete noches, con una meta de 30 minutos. Movimiento suma los minutos en
          zona 2 de la semana, calculados con el pulso real de cada entreno, contra una meta de
          150.
        </p>
        <Lista
          items={[
            'Regularidad de las últimas siete noches, para acostarte y para despertarte.',
            'Minutos en zona 2 de lunes a domingo y cuánto falta para la meta.',
            'Cada carrera cuenta una sola vez, aunque la graben Pacer, el anillo y Apple Health.',
            'Vitals con un fondo propio en verde, turquesa y azul.',
          ]}
        />
        <Estado donde="App iPhone" estado={EN_LA_APP} />
        <Pantallas
          items={[
            {
              src: '05-sueno-regularidad.jpg',
              alt: 'Pestaña Sueño con la tarjeta de regularidad',
              pie: 'Regularidad, debajo de la deuda de sueño.',
            },
            {
              src: '06-movimiento-zona2.jpg',
              alt: 'Pestaña Movimiento con la tarjeta de zona 2',
              pie: 'Zona 2 de la semana, contra la meta.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 8. Salud ──────────────────────────────────────────── */}
      <TwoColumnSection title="Vigilancia de Salud y coach" id="salud">
        <p className="text-lg">
          La sección que sigue las señales de salud se llama ahora Vigilancia de Salud, y en
          inglés Health Watch. Los textos describen lo que mide el anillo, sin lenguaje de
          diagnóstico, y el aviso de la mañana llega en el idioma de cada persona.
        </p>
        <p className="max-w-2xl">
          El coach habla de comida y agua sólo con quienes las registran seguido, y cuando un dato
          puede estar incompleto, pregunta en lugar de suponer.
        </p>
        <Estado donde="App iPhone y servidor" estado={EN_LA_APP} />
      </TwoColumnSection>

      {/* ── Qué sigue ─────────────────────────────────────────── */}
      <ContentBox title="Qué sigue" id="sigue">
        <p className="text-black/80 text-lg mb-5 max-w-2xl">
          Lo que está en la app ya llegó a todos. Para que lo del anillo salga, quedan estos
          pasos.
        </p>
        <ul className="space-y-3 text-black/80 text-[15px]">
          <li>
            — <strong>Probar la versión 1.2.8 con el anillo puesto:</strong> pantalla del anillo,
            medición automática, un entreno corto y la onda del pulso. Con esa prueba se ajusta lo
            que haga falta antes de publicarla.
          </li>
          <li>
            — <strong>Revisión de Apple:</strong> la versión de prueba está enviada para que la
            vean los testers externos.
          </li>
          <li>
            — <strong>Curvas en la nube:</strong> las tres curvas de la noche pasan a guardarse en
            la cuenta, para verlas desde cualquier teléfono.
          </li>
          <li>
            — <strong>Apnea del sueño:</strong> queda para la próxima tanda.
          </li>
        </ul>
      </ContentBox>

      <div className="mb-20 md:mb-28">
        <p className="text-black/60 text-[15px] max-w-2xl">
          Las capturas son de la app de iPhone. Las pantallas que dependen del anillo se
          muestran con datos de ejemplo hasta la prueba con el anillo puesto.
        </p>
      </div>
    </>
  )
}
