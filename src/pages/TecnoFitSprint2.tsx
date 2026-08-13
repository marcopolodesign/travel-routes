import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import DualDiagram from '../components/DualDiagram'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'punto', label: 'Punto de partida' },
  { id: 'objetivo', label: 'Objetivo' },
  { id: 'constructor', label: 'Constructor' },
  { id: 'motor', label: 'Motor' },
  { id: 'modos', label: 'AMRAP · EMOM' },
  { id: 'recorte', label: 'Recorte' },
  { id: 'alcance', label: 'Alcance' },
  { id: 'plan', label: 'Plan' },
  { id: 'tecnofit', label: 'De TecnoFit' },
  { id: 'listo', label: 'Terminado' },
]

export default function TecnoFitSprint2() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Fitness Central · TecnoFit
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Sprint 2<br />El constructor<br />de rutinas
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Ahora que el catálogo tiene video y está clasificado, armar el entrenamiento de un
          socio pasa de ser una tarde de trabajo a unos minutos. El coach elige de una lista,
          el sistema propone las variantes, y cada socio recibe una rutina distinta cada día sin
          perder la progresión.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Duración</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">2 semanas</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Posición</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">2 de 4</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Pilar</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">Fitness 2.0</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Apoyado en</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Sprint 1</p>
          </div>
        </div>
      </div>

      {/* Punto de partida */}
      <TwoColumnSection title="De dónde partimos" id="punto">
        <p className="text-lg">
          El Sprint 1 dejó lo que este sprint necesita para existir: un catálogo de 296
          ejercicios con video propio, cada uno etiquetado con su patrón de movimiento, el
          músculo que trabaja y el material que necesita.
        </p>
        <p>
          Esa clasificación no era un lujo del sprint anterior — es la materia prima de éste.
          Un constructor de rutinas contra un catálogo vacío o sin etiquetas obliga a escribir
          todo a mano; contra el catálogo real, armar una rutina es elegir de una lista filtrada.
        </p>
      </TwoColumnSection>

      {/* Objetivo */}
      <BoxedListSection
        id="objetivo"
        title="Qué resuelve este sprint"
        subtitle="Tres cosas, en orden de valor para el gym."
        items={[
          'Que armar la rutina de un socio sea cuestión de minutos, eligiendo de una lista y no escribiendo texto libre.',
          'Que cada socio reciba un entrenamiento distinto cada día sin que el coach lo rehaga: el sistema propone variantes del mismo estímulo.',
          'Que la progresión no se pierda en el medio — el peso y el volumen de la semana anterior viajan a la siguiente.',
        ]}
      />

      {/* Constructor */}
      <DualDiagram
        id="constructor"
        title="El constructor de rutinas"
        subtitle="Cómo el coach arma el entrenamiento, y qué pasa por debajo."
        user={{
          caption:
            'El coach abre al socio, elige el objetivo del día y para cada estación del circuito filtra el catálogo por lo que quiere: “algo de pierna, que entre en el box 3, que hoy tiene mancuernas”. Elige, y la estación queda armada con su video, sus repeticiones y su descanso.',
          chart: `flowchart TD
  A["Coach abre al socio"] --> B["Elige objetivo del día"]
  B --> C["Por cada estación:<br/>filtra el catálogo"]
  C --> D["Elige el ejercicio<br/>de una lista con video"]
  D --> E["La rutina queda armada"]
  E --> F["El socio la ve en la app<br/>y en la pantalla del box"]`,
          points: [
            'El filtro combina músculo, patrón de movimiento y material disponible en el box.',
            'Cada elección trae el video, las repeticiones y el descanso ya cargados.',
          ],
        }}
        dev={{
          caption:
            'El constructor lee el catálogo clasificado del Sprint 1. El filtro es una consulta contra los campos que ya existen — patrón, músculo, elementos — así que no hay estructura nueva que inventar: el trabajo es la pantalla y la lógica de armado, no el modelo de datos.',
          chart: `flowchart TD
  A["Catálogo clasificado<br/>(Sprint 1)"] --> B["Filtro: patrón +<br/>músculo + material"]
  B --> C["Lista de candidatos"]
  C --> D["El coach elige"]
  D --> E["Se guarda la sesión<br/>del socio"]
  E --> F["La app y la TV leen<br/>la misma sesión"]`,
          points: [
            'Reusa el modelo de datos del Sprint 1 — sin migraciones de fondo.',
            'La sesión guardada es la que ya consumen la app y la pantalla del box.',
          ],
        }}
      />

      {/* Motor de sustitución */}
      <TwoColumnSection title="El motor de sustitución" id="motor">
        <p className="text-lg">
          Es el corazón del producto y lo que lo distingue de “un randomizador por grupo
          muscular”. El socio no registra 296 ejercicios, registra movimientos: si tres días
          seguidos hace sentadilla —con kettlebell, con sandbag, sin carga— siente que hizo lo
          mismo tres veces.
        </p>
        <p>
          El motor evita eso. Al armar el día, para cada estación elige un ejercicio que comparte
          patrón de movimiento y exigencia con el objetivo, respeta las contraindicaciones del
          socio, y no repite la familia de movimiento de la sesión anterior. La progresión va por
          otro carril: en la fuerza principal mantiene la familia durante todo el bloque para que
          el peso pueda subir.
        </p>
        <p className="text-sm text-black/60">
          La lógica del motor —qué es sustituible por qué, y la política de rotación por rol— la
          define TecnoFit. Nosotros la implementamos contra la clasificación que ya está cargada.
        </p>
      </TwoColumnSection>

      {/* Modos */}
      <ContentBox title="AMRAP, EMOM y Tabata" id="modos">
        <p>
          Además de las series clásicas, el constructor incorpora los formatos por tiempo que
          TecnoFit ya usa en el piso: AMRAP (todas las vueltas posibles en un tiempo), EMOM (un
          bloque por minuto) y Tabata. El coach elige el formato al armar la estación y el socio
          lo ve con su reloj corriendo en la app y en la pantalla del box.
        </p>
        <p>
          Se apoyan en la misma cuenta regresiva sincronizada que ya mueve la lista de espera y
          la pantalla del box — no es un cronómetro nuevo, es el que ya está probado.
        </p>
      </ContentBox>

      {/* Recorte */}
      <TwoColumnSection title="Recortar el video en el tiempo" id="recorte">
        <p className="text-lg">
          Hermano del reencuadre del Sprint 1, pero sobre el tiempo en vez del cuadro: sacarle a
          un video el principio dudoso o la cola de más, para que el loop quede limpio. Se marca
          desde el administrador, se aplica al instante y es reversible — el original nunca se
          toca.
        </p>
        <p className="text-sm text-black/60">
          Entra en este sprint como complemento del constructor; si el gym lo necesita antes, se
          adelanta.
        </p>
      </TwoColumnSection>

      {/* Alcance */}
      <TwoColumnSection title="Qué entra y qué no" id="alcance">
        <p className="text-lg">Para que el sprint entre en dos semanas, el borde es explícito.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-3">Entra</p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— El constructor de rutinas con filtro por catálogo</li>
              <li>— El motor de sustitución diaria</li>
              <li>— AMRAP, EMOM y Tabata</li>
              <li>— El recorte de video en el tiempo</li>
              <li>— Carryover de peso entre semanas</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black/40 text-lg mb-3">No entra</p>
            <ul className="space-y-2 text-black/60 text-[15px]">
              <li>— El panel de métricas del dueño (es otro pilar)</li>
              <li>— Predicción de abandono / churn</li>
              <li>— Cargar más video: eso es trabajo continuo del gym</li>
              <li>— El mapa de material por box, si no está cargado aún</li>
            </ul>
          </div>
        </div>
      </TwoColumnSection>

      {/* Plan */}
      <div id="plan" className="mb-20 md:mb-28 scroll-mt-28">
        <p className="text-black/80 max-w-2xl mb-10 md:mb-14">
          Diez días hábiles. La primera semana deja el constructor armando rutinas; la segunda le
          suma la inteligencia de sustitución y los formatos por tiempo.
        </p>
        <Timeline
          title="Semana a semana"
          steps={[
            {
              label: 'Días 1–2',
              items: [
                'Kickoff y repaso de la lógica de armado con el coach',
                'Filtro del catálogo por músculo, patrón y material',
                'Primera estación armada de punta a punta',
              ],
            },
            {
              label: 'Días 3–5',
              items: [
                'El constructor completo: circuito, repeticiones, descanso, video',
                'Guardado de la sesión y su lectura desde la app y la TV',
                'Recorte de video en el tiempo, en el administrador',
              ],
            },
            {
              label: 'Días 6–8',
              items: [
                'El motor de sustitución diaria, con reglas de patrón y familia',
                'Contraindicaciones y carryover de peso entre semanas',
                'Formatos AMRAP, EMOM y Tabata sobre la cuenta sincronizada',
              ],
            },
            {
              label: 'Días 9–10',
              items: [
                'Prueba con un socio real de punta a punta',
                'Ajuste de la lógica con el coach',
                'Entrega, medición y arranque del Sprint 3',
              ],
            },
          ]}
        />
      </div>

      {/* De TecnoFit */}
      <BoxedListSection
        id="tecnofit"
        title="Lo que necesitamos de TecnoFit"
        subtitle="Poco, pero es lo que le da criterio al motor."
        items={[
          'Día 1 — El coach de referencia, para definir qué es sustituible por qué y la política de rotación por rol.',
          'Día 1 — Seguir cargando video: cuanto más lleno el catálogo, mejores propuestas hace el motor.',
          'Día 6 — Un socio de prueba con un objetivo definido, para validar el armado con un caso real.',
          'Continuo — El mapa de material por box, para que el filtro sepa qué entra en cada estación.',
        ]}
      />

      {/* Terminado */}
      <BoxedListSection
        id="listo"
        title="Cómo sabemos que el sprint terminó"
        subtitle="Criterios verificables."
        items={[
          'El coach arma la rutina completa de un socio eligiendo de listas filtradas, sin escribir texto libre, en minutos.',
          'El sistema propone una variante distinta para el mismo estímulo, respetando contraindicaciones y sin repetir la familia del día anterior.',
          'Una estación en formato AMRAP, EMOM o Tabata corre con su reloj en la app y en la pantalla del box.',
          'Un video se recorta en el tiempo desde el administrador y el loop queda limpio, sin volver a subir el archivo.',
          'El peso de una semana aparece propuesto en la siguiente.',
        ]}
      />

      <ContentBox title="Qué habilita para el Sprint 3">
        <p>
          Con el constructor funcionando, cada rutina servida deja un registro: qué hizo cada
          socio, con cuánto peso, qué día. Ese historial es lo que el Sprint 3 —el panel del
          dueño— convierte en métricas de negocio: adherencia, socios en riesgo, y todo lo que
          hace al gimnasio franquiciable.
        </p>
      </ContentBox>
    </>
  )
}
