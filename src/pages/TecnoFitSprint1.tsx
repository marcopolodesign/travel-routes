import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import MarcopoloLogo from '../components/MarcopoloLogo'
import DualDiagram from '../components/DualDiagram'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'hoy', label: 'Hoy' },
  { id: 'objetivo', label: 'Objetivo' },
  { id: 'alcance', label: 'Alcance' },
  { id: 'recorrido', label: 'Recorrido' },
  { id: 'carga', label: 'Carga' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'entrega', label: 'Entrega' },
  { id: 'convivencia', label: 'Convivencia' },
  { id: 'decision', label: 'Decisión' },
  { id: 'plan', label: 'Plan' },
  { id: 'tecnofit', label: 'De TecnoFit' },
  { id: 'listo', label: 'Terminado' },
]

export default function TecnoFitSprint1() {
  return (
    <>
      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Fitness Central · TecnoFit
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Sprint 1<br />Catálogo y video
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Las primeras dos semanas del proyecto. Al final de este sprint, TecnoFit tiene un
          catálogo propio de ejercicios con video — cargado por el equipo del gym, sin
          desarrolladores en el medio — y la infraestructura que lo va a servir a las 10 TVs
          y a la app durante el resto del proyecto.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Duración</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">2 semanas</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Posición</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">1 de 4</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Pilar</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">Fitness 2.0</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Riesgo</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Bajo</p>
          </div>
        </div>
      </div>

      <div className="mx-[-4vw] md:mx-[-10.5vw] mb-16 md:mb-24 sticky top-16 z-20">
        <ScrollNav items={NAV} />
      </div>

      <ContentBox title="Dónde estamos hoy" id="hoy">
        <p>
          TecnoFit no arranca de cero. En el último año se construyeron las piezas grandes, y hoy
          las tres están funcionando de verdad, con socios reales usándolas todos los días.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>La app está en la calle.</strong> Publicada en el App Store y aprobada por
            Apple. El socio se loguea, ve su rutina, entrena con ella, se anota en la fila y
            confirma su turno desde el teléfono.
          </li>
          <li>
            <strong>El administrador está operativo.</strong> Es desde donde el gym gestiona socios,
            rutinas, sedes, la lista de espera y las pantallas. No es un prototipo: es la
            herramienta con la que se trabaja.
          </li>
          <li>
            <strong>El piso ya está conectado.</strong> El motor de lista de espera, las líneas, los
            boxes y el avance automático están probados en producción, y las pantallas saben mostrar
            en vivo qué se está haciendo en cada box.
          </li>
        </ul>
        <p className="pt-2">
          <strong>Lo que falta no es una pieza más: es el hilo que las une.</strong> Hoy cada parte
          resuelve bien lo suyo, pero el contenido —los ejercicios, con su video, su nombre y su
          equipamiento— todavía vive afuera. Las rutinas reales siguen saliendo del sistema viejo,
          el catálogo propio está casi vacío, y no hay ninguna forma de que el gym cargue un
          ejercicio nuevo sin pedírselo a un desarrollador.
        </p>
        <p className="text-sm text-black/60 pt-2">
          Ese contenido es exactamente lo que comparten las tres piezas: es lo que el coach arma en
          el administrador, lo que el socio ve en la app y lo que aparece en la pantalla del box.
          Sin él, cada parte sigue funcionando por separado. Con él, empiezan a ser un solo
          producto. Por eso el Sprint 1 va primero — y por eso es de contenido, no de pantallas.
        </p>
      </ContentBox>

      <BoxedListSection
        id="objetivo"
        title="Qué resuelve este sprint"
        subtitle="Tres resultados concretos, verificables el último día."
        items={[
          'El equipo de TecnoFit puede subir el video de un ejercicio desde el administrador, el mismo día que lo graba y sin pedirle nada a nadie.',
          'Ese ejercicio queda disponible para las tres piezas a la vez: el coach lo usa en el administrador, el socio lo ve en la app y aparece en la pantalla del box. Un solo video, un solo formato, todas las pantallas.',
          'Ese video llega optimizado a cada pantalla: liviano al celular, en alta a la TV, con su portada generada sola, y siempre rápido sin importar la conexión del gym.',
          'Queda decidida y documentada la arquitectura de video que va a sostener las 10 TVs del piso durante el resto del proyecto — con números medidos, no con una corazonada.',
        ]}
      />

      <TwoColumnSection title="Alcance" id="alcance">
        <p>
          Un sprint corto sirve solo si el borde está claro. Esto es lo que entra y lo que
          deliberadamente queda para más adelante.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6 bg-[var(--marco-accent-light)]/20">
            <h4 className="font-thunder text-xl uppercase text-[var(--marco-accent)] mb-4">Entra</h4>
            <ul className="space-y-3 text-black/80 text-sm">
              <li>Almacenamiento de video decidido, configurado y con permisos</li>
              <li>Carga de archivo desde el catálogo que ya existe, con progreso y reintento</li>
              <li>Compresión automática y varias resoluciones por video</li>
              <li>Un formato único que se ve igual en la TV y en la app</li>
              <li>Portada generada sola, para cualquier video que se suba</li>
              <li>Búsqueda y filtros por músculo y equipamiento sobre el catálogo</li>
              <li>Reproducción verificada en la TV real y en la app real</li>
              <li>Carga asistida del primer lote de ejercicios del gym</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <h4 className="font-thunder text-xl uppercase text-black/70 mb-4">No entra</h4>
            <ul className="space-y-3 text-black/60 text-sm">
              <li>El constructor de rutinas — es el Sprint 2</li>
              <li>Las modalidades AMRAP y EMOM — Sprint 2</li>
              <li>El motor de cola y el avance por box — Sprint 3</li>
              <li>El despliegue sobre las 10 TVs físicas — Sprint 4</li>
              <li>El panel de métricas de negocio y churn — posterior</li>
              <li>Grabar y editar los videos: eso lo hace el gym, no nosotros</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-black/60 pt-2">
          El orden no es arbitrario: sin catálogo con video, el constructor de rutinas del Sprint 2
          no tendría con qué armar una rutina, y la TV del Sprint 4 no tendría qué mostrar.
        </p>
      </TwoColumnSection>

      <div className="mb-10 md:mb-14">
        <span className="text-xs uppercase tracking-wide text-black/50">
          Los diagramas — cada uno se puede ver desde los dos lados
        </span>
        <p className="text-black/80 max-w-2xl mt-3">
          Cada gráfico de acá abajo tiene un interruptor arriba a la derecha.{' '}
          <strong>Usuario</strong> muestra lo que pasa en pantalla, contado sin tecnicismos.{' '}
          <strong>Desarrollo</strong> muestra la misma cosa por dentro, para el equipo técnico.
          Es el mismo proceso visto desde dos alturas.
        </p>
      </div>

      <DualDiagram
        id="recorrido"
        title="El recorrido de un ejercicio"
        subtitle="De la cámara del coach a la pantalla del box. Es el circuito completo que este sprint deja funcionando."
        user={{
          caption:
            'Un coach graba una sentadilla con el celular. La sube desde el administrador como quien sube una foto. A partir de ese momento el ejercicio existe en TecnoFit: aparece en el catálogo, se puede sumar a la rutina de cualquier socio y se ve en la pantalla del box cuando le toca hacerlo.',
          chart: `flowchart LR
  A["Coach graba el<br/>ejercicio con el celular"] --> B["Lo sube desde el<br/>administrador"]
  B --> C["El ejercicio queda<br/>en el catálogo,<br/>con su video"]
  C --> D["Se suma a la rutina<br/>de un socio"]
  D --> E["El socio lo ve en la<br/>TV de su box"]
  D --> F["Y también en su<br/>celular, antes de entrenar"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class A,B hi
  class E,F soft`,
          points: [
            'Nadie del equipo técnico participa del circuito. El gym carga su propio contenido, el mismo día que lo graba.',
            'Un video subido una sola vez sirve al catálogo, a la app y a las 10 TVs — no hay que cargarlo en tres lugares.',
            'Si un video se reemplaza por una versión mejor, todas las pantallas pasan a mostrar la nueva sin tocar nada más.',
          ],
        }}
        dev={{
          caption:
            'El archivo nunca pasa por nuestro servidor: el admin pide una URL de subida firmada y manda el archivo directo al almacenamiento. Recién ahí se dispara el procesamiento, que genera las variantes y la portada, y actualiza la fila del ejercicio. Todo lo que consume video lee de esa misma fila.',
          chart: `flowchart LR
  A["Admin<br/>selector de archivo"] -->|"URL de subida firmada"| B["Object storage<br/>bucket de videos"]
  B --> C["Función de<br/>procesamiento"]
  C --> D["Variantes 1080p · 720p · 480p<br/>+ imagen de portada"]
  D --> E[("Tabla exercises<br/>video_url · poster_url<br/>variantes · estado")]
  E --> F["App del socio"]
  E --> G["Pantalla de TV"]
  E --> H["Admin · catálogo"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class B,C,D hi
  class F,G,H soft`,
          points: [
            'Subida directa al storage con URL firmada: el archivo no atraviesa nuestra API, así que un video de 200 MB no puede tumbar un endpoint ni chocar contra el límite de payload de la función.',
            'El procesamiento es asíncrono y el ejercicio guarda su estado — subiendo, procesando, listo, con error — para que la interfaz nunca mienta sobre lo que está pasando.',
            'La salida es siempre archivo de video directo, nunca un embed. Es lo que resuelve la incompatibilidad actual: el reproductor nativo de la app no abre YouTube ni Vimeo, pero sí reproduce esto, igual que la TV.',
            'La fila del ejercicio es la única fuente de verdad. App, TV y admin leen de ahí; ninguno arma la URL del video por su cuenta.',
          ],
        }}
      />

      <DualDiagram
        id="carga"
        title="El pipeline de carga"
        subtitle="Qué pasa entre que alguien arrastra un archivo y el momento en que el ejercicio queda listo."
        user={{
          caption:
            'Desde el punto de vista de quien carga, son tres pasos y una espera corta. Arrastra el archivo, completa el nombre y las etiquetas, y ve una barra de progreso. Cuando termina, el ejercicio ya aparece en la lista con su miniatura. Si algo falla —se cortó el wifi, el archivo estaba dañado— lo dice con todas las letras y ofrece reintentar, en vez de quedar girando.',
          chart: `flowchart TD
  A["Arrastro el video<br/>a la pantalla"] --> B["Le pongo nombre,<br/>músculo y equipamiento"]
  B --> C["Barra de progreso:<br/>subiendo"]
  C --> D["Optimizando el video<br/>unos segundos"]
  D --> E["Listo · aparece en el<br/>catálogo con su miniatura"]
  D --> F["Algo salió mal:<br/>te dice qué, y reintentás"]
  F --> C
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef warn fill:#fff,stroke:#e66065,color:#000
  class A,E hi
  class F warn`,
          points: [
            'La persona que carga no elige calidad, formato ni resolución. Sube lo que grabó y el sistema resuelve el resto.',
            'La miniatura se genera sola a partir del video: nadie tiene que buscar una foto de portada.',
            'Se puede seguir trabajando mientras un video se procesa — no hay que quedarse mirando la pantalla.',
          ],
        }}
        dev={{
          caption:
            'La subida y el procesamiento están desacoplados a propósito. La subida es responsabilidad del cliente contra el storage; el procesamiento corre después, disparado por el alta, y es idempotente: si se reintenta el mismo video, sobrescribe sus variantes en vez de duplicarlas.',
          chart: `flowchart TD
  A["Cliente pide<br/>URL de subida firmada"] --> B{"¿Formato y peso<br/>aceptables?"}
  B -->|No| R["Rechazo temprano<br/>con motivo claro"]
  B -->|Sí| C["PUT directo al bucket<br/>ruta original/"]
  C --> D["Alta del ejercicio<br/>estado: procesando"]
  D --> E["Transcodificación<br/>1080p · 720p · 480p"]
  E --> F["Extracción de portada<br/>+ duración"]
  F --> G["Update de la fila<br/>estado: listo"]
  E -->|Falla| H["estado: error<br/>+ log del motivo"]
  H --> C
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef warn fill:#fff,stroke:#e66065,color:#000
  class C,E,F hi
  class R,H warn`,
          points: [
            'La validación de formato y peso ocurre antes de emitir la URL firmada: un archivo inválido no llega a ocupar storage.',
            'El original se conserva en su propia ruta. Si mañana hace falta otra resolución o cambia el codec, se re-procesa desde la fuente sin pedirle al gym que vuelva a subir nada.',
            'El estado del ejercicio es una columna, no un valor inferido. La interfaz y cualquier proceso posterior leen lo mismo y no pueden desincronizarse.',
          ],
        }}
      />

      <DualDiagram
        id="catalogo"
        title="El catálogo de ejercicios"
        subtitle="Cómo queda organizado el contenido para que después se pueda armar una rutina en dos minutos."
        user={{
          caption:
            'El catálogo es una lista buscable. Cada ejercicio tiene su video, un nombre, el músculo que trabaja y el equipamiento que necesita. Con eso el coach filtra: "quiero algo de pierna que se pueda hacer en el box 3, que sólo tiene mancuernas". Ese filtro es lo que en el Sprint 2 va a convertir armar una rutina en un trabajo de minutos y no de una tarde.',
          chart: `flowchart TD
  A["Catálogo de ejercicios"] --> B["Buscar por nombre"]
  A --> C["Filtrar por músculo"]
  A --> D["Filtrar por equipamiento"]
  B --> E["Ficha del ejercicio:<br/>video · nombre<br/>músculo · equipamiento"]
  C --> E
  D --> E
  E --> F["Se suma a una rutina<br/>Sprint 2"]
  E --> G["Se muestra en el box<br/>Sprints 3 y 4"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef next fill:#fff,stroke:#d1d5db,color:#999
  class A,E hi
  class F,G next`,
          points: [
            'Etiquetar bien un ejercicio hoy es lo que permite que el coach lo encuentre en tres segundos dentro de seis meses, con 300 ejercicios cargados.',
            'El equipamiento no es decorativo: es el dato que permite proponer automáticamente qué ejercicio puede ir en qué box.',
            'El catálogo es del gym. Se puede exportar, ampliar y replicar tal cual en una sede nueva.',
          ],
        }}
        dev={{
          caption:
            'El modelo de datos ya existe y está en producción: exercises con su nombre, músculos, equipamiento y dificultad, ligado a las sesiones y a los boxes. Lo que el sprint agrega es la capa de medios que hoy falta — ruta en el almacenamiento, variantes por resolución, portada propia, duración y estado de procesamiento. No se crea un modelo nuevo: se completa el que ya funciona.',
          chart: `flowchart TD
  EX[("exercises · ya existe<br/>name · target_muscles<br/>equipment_needed<br/>difficulty · video_url")]
  NEW["Sprint 1 agrega:<br/>ruta en storage · variantes<br/>portada propia · duración<br/>estado de procesamiento"]
  BX[("boxes<br/>equipment")]
  SE[("session_exercises<br/>ejercicio ↔ box ↔ orden")]
  RS[("routine_sessions")]
  TR[("training_routines")]
  NEW --> EX
  EX --> SE
  BX -->|"equipment_needed del ejercicio<br/>contenido en equipment del box"| SE
  SE --> RS --> TR
  EX --> CAT["Catálogo en el admin<br/>ya existe · se le suma la carga"]
  EX --> TV["Pantalla de TV<br/>y app del socio"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class NEW,EX hi
  class CAT,TV soft`,
          points: [
            'La pantalla de catálogo, las categorías y las zonas del cuerpo ya están construidas. El sprint no las rehace: les agrega la carga de archivo y los filtros que faltan.',
            'El equipamiento ya se resuelve con contención de conjuntos en la base — el equipamiento que pide el ejercicio tiene que estar contenido en el del box — así que la compatibilidad ejercicio-box sale de una sola consulta.',
            'Todas las escrituras del catálogo pasan por el admin autenticado; el depósito de video no queda público, se sirve con acceso firmado.',
            'Se aprovecha el sprint para dejar el esquema alineado con lo que está corriendo en producción, incluyendo una columna que hoy usa todo el código pero que no está registrada en las migraciones del repositorio.',
          ],
        }}
      />

      <DualDiagram
        id="entrega"
        title="Cómo llega el video a cada pantalla"
        subtitle="La misma sentadilla, servida distinto a una TV de 55 pulgadas y a un celular con datos móviles."
        user={{
          caption:
            'La TV del box y el celular del socio no necesitan lo mismo. La TV está enchufada al wifi del gym y se ve grande: pide la versión en alta. El celular, muchas veces con datos, pide una versión liviana que arranca al toque. El socio no elige nada y no nota la diferencia — sólo nota que nunca se queda cargando.',
          chart: `flowchart LR
  V["Un video subido<br/>una sola vez"] --> TV["TV del box<br/>versión en alta"]
  V --> APP["Celular del socio<br/>versión liviana"]
  V --> ADM["Admin<br/>miniatura al pasar la lista"]
  TV --> R["Arranca al instante,<br/>sin pantalla de carga"]
  APP --> R
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class V hi
  class R soft`,
          points: [
            'Si se corta internet en medio de una clase, la pantalla mantiene lo último que mostró en vez de quedar en negro.',
            'El objetivo medible del sprint es que un ejercicio empiece a verse en menos de dos segundos desde el wifi real del gym, no desde una oficina.',
            'Cargar un video pesado no penaliza al socio: lo pesado se procesa una vez, del lado del sistema, no en cada reproducción.',
          ],
        }}
        dev={{
          caption:
            'Cada consumidor pide la variante que le corresponde y la sirve por CDN. Las URLs firmadas se emiten con una vigencia que cubre la duración de una clase, y la pantalla de TV precarga el ejercicio siguiente mientras reproduce el actual, para que el cambio de box no tenga latencia visible.',
          chart: `flowchart LR
  E[("exercises<br/>variantes")] --> S["Emisión de URL firmada<br/>por variante"]
  S --> CDN["CDN · caché de borde"]
  CDN --> TV["TV · 1080p<br/>precarga del siguiente"]
  CDN --> APP["App · 480p o 720p<br/>según red"]
  CDN --> ADM["Admin · portada estática"]
  TV --> F{"¿Se cae la red?"}
  F -->|Sí| K["Mantiene el último<br/>fotograma y reintenta"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef warn fill:#fff,stroke:#e66065,color:#000
  class CDN hi
  class K warn`,
          points: [
            'La medición se hace sobre la red real del gym con un video real del gym. Un número de laboratorio no sirve para decidir la arquitectura de 10 pantallas.',
            'La precarga del ejercicio siguiente es lo que hace que el avance automático por box del Sprint 3 se vea instantáneo en el Sprint 4.',
            'La degradación ante corte de red se diseña ahora, no se parchea después: la pantalla conserva el último estado válido y reintenta con espera creciente.',
          ],
        }}
      />

      <DualDiagram
        id="convivencia"
        title="Convivencia con el sistema actual"
        subtitle="Por qué durante estas dos semanas nadie en el gym nota absolutamente nada."
        defaultView="user"
        user={{
          caption:
            'Los socios siguen entrenando exactamente igual que hoy, con las rutinas del sistema de siempre. Lo que se construye en este sprint corre al lado, sin reemplazar nada todavía. El primer cambio visible para un socio no ocurre en el Sprint 1: ocurre cuando la rutina nueva empiece a usarse de verdad, más adelante y con el gym decidiendo cuándo.',
          chart: `flowchart TD
  S["Socio entrenando hoy"] --> A["Sistema actual<br/>rutinas de siempre"]
  A --> P["Su clase, sin cambios"]
  N["Lo nuevo del Sprint 1<br/>catálogo y video"] -.->|"todavía no lo toca"| S
  N --> T["El gym lo prueba<br/>por dentro"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class N hi
  class P soft`,
          points: [
            'Cero riesgo operativo: no se apaga ni se modifica nada de lo que hoy usa el gym para dar clases.',
            'El equipo del gym sí lo usa desde el día 10 — cargando contenido — así que llega al Sprint 2 con la herramienta ya conocida.',
            'La fecha de encendido la decide TecnoFit, no el calendario del proyecto.',
          ],
        }}
        dev={{
          caption:
            'La app ya resuelve las rutinas contra las dos fuentes: primero la plataforma nueva y, si ahí no hay nada, el sistema legado a través de una función puente. Ese doble camino es lo que permite construir en producción sin bandera de riesgo. La TV, en cambio, sólo sabe leer de la plataforma nueva — por eso el contenido que carga este sprint es literalmente lo único que puede hacerla funcionar.',
          chart: `flowchart TD
  APP["App del socio"] --> Q{"¿Hay rutina en<br/>la plataforma nueva?"}
  Q -->|Sí| SUP[("Plataforma nueva<br/>rutinas · ejercicios · video")]
  Q -->|No| FN["Función puente"]
  FN --> LEG[("Sistema legado<br/>CENTRAL · MySQL")]
  SUP --> UI["Misma pantalla,<br/>mismo formato"]
  LEG --> UI
  TVS["Pantalla de TV"] -->|"sin fallback:<br/>sólo lee de acá"| SUP
  S1["Sprint 1 escribe<br/>sólo de este lado"] --> SUP
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class S1,SUP hi
  class UI,TVS soft`,
          points: [
            'La app ya normaliza ambas fuentes al mismo formato, así que sumar contenido nuevo no obliga a tocar las pantallas de entrenamiento.',
            'La TV no tiene ese fallback: hoy sólo puede mostrar rutinas armadas en el administrador nuevo. Es la razón concreta por la que el contenido va antes que las pantallas.',
            'El Sprint 1 sólo escribe en la plataforma nueva. No hay migración destructiva ni escritura sobre el sistema legado.',
            'El corte definitivo se hace cuando el catálogo nuevo cubra el contenido real del gym — es una decisión de negocio, no un paso técnico forzado.',
          ],
        }}
      />

      <TwoColumnSection title="La decisión del sprint" id="decision">
        <p>
          Hay una sola decisión de arquitectura importante en estas dos semanas: <strong>dónde
          vive el video</strong>. No se toma por preferencia — se toma midiendo las dos opciones
          con un video real del gym, servido a una TV real, sobre el wifi real del gimnasio.
        </p>
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b-2 border-[var(--marco-accent)]">
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3 pr-4">Criterio</th>
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3 pr-4">Storage integrado</th>
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3">CDN dedicado</th>
              </tr>
            </thead>
            <tbody className="text-black/80">
              {[
                ['Puesta en marcha', 'Inmediata — ya está en el stack', 'Requiere cuenta, dominio y configuración'],
                ['Costo mensual', 'Predecible, incluido en el plan actual', 'Variable según tráfico y minutos servidos'],
                ['10 TVs en simultáneo', 'A verificar con la medición del sprint', 'Diseñado exactamente para esto'],
                ['Transcodificación', 'A resolver nosotros', 'Incluida en el servicio'],
                ['Dependencias externas', 'Ninguna nueva', 'Un proveedor más en la cadena'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--marco-border)]">
                  <td className="py-3 pr-4 font-medium">{row[0]}</td>
                  <td className="py-3 pr-4">{row[1]}</td>
                  <td className="py-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-black/60 pt-2">
          Lo importante no es cuál gane: es que la decisión quede tomada con datos en el día 2 y no
          se re-discuta en la semana 7, con las 10 pantallas ya colgadas de la pared. Cualquiera de
          las dos opciones se implementa detrás de la misma interfaz, así que cambiar de una a otra
          más adelante no obliga a reescribir la app ni el admin.
        </p>
      </TwoColumnSection>

      <div className="mb-20 md:mb-28" id="plan">
        <p className="text-black/80 max-w-2xl mb-10 md:mb-14">
          Diez días hábiles. La primera semana deja la infraestructura funcionando; la segunda la
          convierte en una herramienta que el equipo del gym usa solo.
        </p>
        <Timeline
          title="Semana a semana"
          steps={[
            {
              label: 'Días 1–2',
              items: [
                'Kickoff técnico y relevamiento del contenido real del gym',
                'Medición de las dos opciones de hosting con video y red reales',
                'Decisión de arquitectura tomada y documentada',
              ],
            },
            {
              label: 'Días 3–5',
              items: [
                'Almacenamiento configurado, con permisos y accesos firmados',
                'Carga de video desde el admin, con progreso y reintento',
                'Primer video real subido de punta a punta',
              ],
            },
            {
              label: 'Días 6–8',
              items: [
                'Compresión automática y variantes por resolución',
                'Portada y duración generadas solas, para todo video',
                'Búsqueda y filtros por músculo y equipamiento en el catálogo',
              ],
            },
            {
              label: 'Días 9–10',
              items: [
                'Reproducción verificada en TV real y en la app',
                'Sesión de carga asistida con el equipo del gym',
                'Entrega, medición final y arranque del Sprint 2',
              ],
            },
          ]}
        />
      </div>

      <BoxedListSection
        id="tecnofit"
        title="Lo que necesitamos de TecnoFit"
        subtitle="Poco, pero en fecha. Es lo único que puede demorar este sprint."
        items={[
          'Día 1 — Una persona referente del gym para el kickoff y para responder dudas de contenido durante las dos semanas.',
          'Día 1 — Acceso al wifi del gym y a una TV del piso para poder medir en condiciones reales, no simuladas.',
          'Día 3 — El listado de ejercicios que el gym quiere tener cargados primero, en orden de prioridad. No hace falta que estén grabados todavía.',
          'Día 6 — Un primer lote de videos grabados, aunque sean 10. Con eso alcanza para validar el circuito completo con contenido de verdad.',
          'Día 9 — Una hora del equipo que va a cargar contenido, para la sesión de carga asistida.',
        ]}
      />

      <BoxedListSection
        id="listo"
        title="Cómo sabemos que el sprint terminó"
        subtitle="Criterios verificables. Ninguno depende de una opinión."
        items={[
          'Una persona del gym, sin ayuda y sin instrucciones nuestras, sube un ejercicio nuevo con video y lo ve aparecer en el catálogo.',
          'Ese mismo ejercicio se reproduce correctamente en una TV del piso y en la app de un socio.',
          'El video empieza a verse en menos de dos segundos, medido sobre el wifi del gym.',
          'Se sube un archivo pesado y otro con formato inválido: el sistema los maneja con un mensaje claro, sin quedar colgado.',
          'La decisión de arquitectura de video está escrita, con los números que la respaldan y su costo mensual estimado.',
          'El gym tiene su primer lote de ejercicios reales cargados y usables por el Sprint 2.',
        ]}
      />

      <TwoColumnSection title="Riesgos">
        <p>
          Ninguno de estos es hipotético: son las tres cosas que en un proyecto así suelen correr la
          fecha. Van con su mitigación desde el día 1.
        </p>
        <div className="space-y-6 pt-2">
          {[
            {
              r: 'El contenido no llega a tiempo',
              m: 'Es el riesgo más probable y el único fuera de nuestro control. Se mitiga arrancando con un lote chico —10 ejercicios alcanzan para validar todo el circuito— y dejando la carga masiva como una tarea continua del gym, no como un bloqueante del sprint.',
            },
            {
              r: 'La red del gym no sostiene 10 pantallas con video',
              m: 'Por eso la medición es el día 2 y no la semana 7. Si el número no cierra, la respuesta es CDN con caché de borde y precarga, y esa decisión se toma cuando todavía sobra tiempo para implementarla.',
            },
            {
              r: 'Los videos vienen en formatos y calidades dispares',
              m: 'Es lo esperable cuando se graba con celulares distintos, y ya hay una versión de este problema hoy: según cómo esté cargado, un mismo video puede verse bien en la pantalla del box y no verse en el celular. Por eso la normalización es automática y del lado del sistema, y la salida es siempre un único formato que todas las pantallas saben reproducir. Quien carga no tiene que saber nada de codecs ni resoluciones.',
            },
          ].map((item, i) => (
            <div key={i} className="border-l-2 border-[var(--marco-accent-light)] pl-5">
              <h4 className="font-thunder text-lg uppercase text-black mb-2">{item.r}</h4>
              <p className="text-black/80 text-sm">{item.m}</p>
            </div>
          ))}
        </div>
      </TwoColumnSection>

      <ContentBox title="Qué habilita para el Sprint 2">
        <p>
          El Sprint 2 es el constructor de rutinas: la pantalla donde el coach arma el entrenamiento
          de cada alumno a medida, con AMRAP, EMOM y Tabata. Esa pantalla no se puede construir
          contra un catálogo vacío — necesita ejercicios reales, con video real y equipamiento
          etiquetado, para que armar una rutina sea elegir de una lista y no escribir texto libre.
        </p>
        <p>
          Por eso este sprint es primero. Al terminarlo, TecnoFit no sólo tiene infraestructura:
          tiene contenido propio, cargado por su equipo, que ya no depende de nosotros para crecer.
          Cada ejercicio que el gym suba a partir del día 10 hace más valioso todo lo que viene
          después.
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
