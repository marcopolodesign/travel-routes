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
  { id: 'optimizacion', label: 'Optimización' },
  { id: 'reencuadre', label: 'Reencuadre' },
  { id: 'spec', label: 'Especificación' },
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
          'El video se sube tal como salió del celular y el servidor lo optimiza solo: baja de peso, se le limpian los datos ocultos del archivo y se genera su portada. El gym no comprime, no exporta y no prepara nada.',
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
              <li>Optimización en el servidor: el video baja de peso solo, sin trabajo del gym</li>
              <li>Limpieza de metadata del archivo, incluida la ubicación GPS</li>
              <li>Reencuadre del video en el sistema, al subirlo y al editarlo después</li>
              <li>Dos variantes por video: una para la TV y otra para la app, cada una con su encuadre</li>
              <li>Un formato único que se ve igual en la TV y en la app</li>
              <li>Portada generada sola, para cualquier video que se suba</li>
              <li>Búsqueda y filtros por músculo y equipamiento sobre el catálogo</li>
              <li>Reproducción verificada en la TV real y en la app real</li>
              <li>Imagen de respaldo y manejo de error, para que una pantalla nunca quede negra</li>
              <li>Precarga del ejercicio siguiente durante el OFF, para que el ON arranque sin espera</li>
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
              <li>Recortar el video en el tiempo — sacarle el principio o el final. Es hermano del reencuadre pero es otra herramienta; queda como candidato a Sprint 2 salvo que el gym lo pida ahora</li>
              <li>El panel de métricas de negocio y churn — posterior</li>
              <li>Grabar los videos: eso lo hace el gym, no nosotros</li>
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
  C --> D["Dos variantes encuadradas<br/>TV horizontal + app<br/>+ imagen de portada"]
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
  D --> P["Proxy rápido para<br/>previsualizar y encuadrar"]
  P --> E["Normalización + encuadre<br/>limpieza de metadata<br/>+ variante TV y variante app"]
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
        id="optimizacion"
        title="El video se optimiza solo, en el servidor"
        subtitle="Nadie del gym tiene que comprimir, recortar ni exportar nada antes de subir. Se sube lo que salió del celular."
        user={{
          caption:
            'Un video grabado con un celular moderno puede pesar 200 MB por 30 segundos. Si tuviéramos que pedirle al gym que lo comprima antes de subirlo, el sistema no se usaría: nadie va a abrir un editor para cargar un ejercicio. Así que el trabajo pesado lo hace el servidor. Se sube el archivo tal cual salió de la cámara y, del otro lado, sale liviano, parejo y listo para las pantallas.',
          chart: `flowchart LR
  A["Video del celular<br/>pesado, 4K, vertical<br/>con datos del dispositivo"] --> B["El servidor lo<br/>optimiza solo"]
  B --> C["Mismo video,<br/>una fracción del peso"]
  B --> D["Se le borran los datos<br/>ocultos del archivo"]
  B --> E["Portada generada<br/>automáticamente"]
  C --> F["Carga rápido en la TV<br/>y en el celular"]
  D --> F
  E --> F
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class A,B hi
  class F soft`,
          points: [
            'Cero trabajo extra para el gym. Quien carga no abre un editor, no elige calidad y no exporta nada: sube el archivo original y listo.',
            'Los videos del celular vienen con datos escondidos adentro: ubicación GPS de dónde se grabó, modelo del teléfono, fecha y hora. Todo eso se borra en el procesamiento — no queda pegado a un archivo que después se sirve a las pantallas.',
            'El ahorro no es cosmético: menos peso es menos costo de almacenamiento, menos consumo de datos del socio y menos tiempo hasta que el video arranca en la TV.',
            'Que el gym no tenga que preparar nada es lo que hace que el catálogo crezca. Si cargar un ejercicio cuesta trabajo, no se carga.',
          ],
        }}
        dev={{
          caption:
            'La normalización es un paso obligatorio del pipeline, no una optimización opcional. Toma el archivo original tal como se subió y produce una escalera de variantes homogéneas: mismo códec, mismo perfil de color, sin metadata, con el índice al principio del archivo. La entrada es impredecible — HEVC de iPhone, VP9 de Android, cualquier resolución y orientación — y la salida tiene que ser siempre la misma para que la TV y la app no tengan que negociar nada.',
          chart: `flowchart TD
  IN["Original tal como se subió<br/>HEVC · VP9 · H.264<br/>4K · vertical · con metadata"] --> N1["Limpieza de metadata<br/>map_metadata -1"]
  N1 --> N2["Rotación aplicada<br/>y flag descartado"]
  N2 --> N3["Escalado con lado mayor<br/>acotado, sin deformar"]
  N3 --> N4["H.264 High · yuv420p<br/>CRF por variante<br/>audio descartado"]
  N4 --> N5["faststart<br/>índice al principio"]
  N5 --> V1["Variante TV<br/>encuadre horizontal"]
  N5 --> V2["Variante app<br/>su propio encuadre"]
  N5 --> P["Portada del segundo 1<br/>WebP · sin metadata"]
  V1 --> DB[("Fila del ejercicio:<br/>variantes · duración<br/>dimensiones · peso final")]
  V2 --> DB
  V3 --> DB
  P --> DB
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class N1,N2,N3,N4,N5 hi
  class V1,V2,P soft`,
          points: [
            'Las funciones serverless de Supabase corren Deno y no tienen ffmpeg disponible: este paso no puede vivir ahí. O se resuelve con un worker propio con ffmpeg disparado por webhook del storage, o con un servicio de video que ya traiga la escalera incluida. Es exactamente el eje de la decisión del día 2.',
            'El original nunca se pisa. Si mañana cambia el códec objetivo, hace falta otra resolución o aparece un bug en el escalado, se re-procesa desde la fuente sin pedirle al gym que vuelva a subir nada.',
            'Descartar el audio no es sólo ahorro de peso: elimina toda una clase de problemas de compatibilidad de códec de audio, y las pantallas del piso reproducen en mute igual. Es una decisión de producto a confirmar con el gym, no un supuesto técnico.',
            'faststart es el flag que decide si el video arranca al toque o después de bajar el archivo entero. Sin él, el objetivo de menos de dos segundos no se cumple por más CDN que haya.',
            'Todo el paso es idempotente y las rutas de salida se derivan del ejercicio y la variante: re-procesar sobrescribe, no duplica.',
          ],
        }}
      />

      <DualDiagram
        id="reencuadre"
        title="Reencuadre desde el sistema"
        subtitle="El video se recorta y se centra en el mismo administrador, al subirlo o después — sin editor externo y sin volver a subir el archivo."
        user={{
          caption:
            'Un video grabado con el celular casi nunca sale con el encuadre que necesita una pantalla de gimnasio: viene vertical, con demasiado techo, o con la persona corrida a un costado. Al subir el ejercicio aparece una vista previa con un marco que se arrastra y se agranda hasta dejar el movimiento centrado. Y si más adelante el encuadre no convence, se entra al ejercicio, se corre el marco y listo — no hay que volver a subir el video ni buscar el archivo original.',
          chart: `flowchart LR
  A["Subo el video<br/>tal como salió"] --> B["Aparece la vista previa<br/>con un marco encima"]
  B --> C["Arrastro y agrando<br/>hasta centrar el movimiento"]
  C --> D["Confirmo · el sistema<br/>genera el video final"]
  D --> E["Se ve encuadrado en la TV<br/>y en el celular"]
  E --> F["¿No convence?<br/>Se corre el marco de nuevo,<br/>sin volver a subir nada"]
  F --> C
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class B,C hi
  class E,F soft`,
          points: [
            'Se puede corregir cuantas veces haga falta, meses después de cargado el ejercicio. El video original queda guardado y siempre se puede volver a él.',
            'Si nadie toca el marco, el sistema propone un encuadre por defecto y el ejercicio queda igual de usable. Reencuadrar mejora el resultado, no es un requisito para cargar.',
            'Mientras se regenera el video con el encuadre nuevo, las pantallas siguen mostrando la versión anterior. Reencuadrar un ejercicio en el medio de una clase no deja un box en negro.',
            'Es lo que evita tener que volver a grabar por un problema de cámara. Un buen movimiento mal encuadrado se arregla en el sistema, no en el gimnasio.',
          ],
        }}
        dev={{
          caption:
            'El encuadre se guarda como dato en la fila del ejercicio —un rectángulo normalizado más el aspecto objetivo— y nunca se hornea en el archivo subido. El original queda intacto y las variantes se re-renderizan a partir de él cada vez que el encuadre cambia. Eso hace que editar el encuadre sea una operación barata y reversible, en vez de una re-subida.',
          chart: `flowchart TD
  UP["Original subido<br/>intacto, nunca se pisa"] --> PX["Proxy rápido 480p H.264<br/>para poder previsualizar"]
  PX --> UI["Editor de encuadre<br/>sobre el proxy"]
  UI --> CROP[("crop en la fila:<br/>x · y · w · h normalizados<br/>+ aspecto objetivo")]
  DEF["Encuadre por defecto<br/>si nadie toca nada"] --> CROP
  CROP --> REN["Render de variantes<br/>desde el ORIGINAL<br/>crop y luego scale"]
  UP --> REN
  REN --> OUT["Variante TV + variante app<br/>+ portada, ya encuadradas"]
  EDIT["Edición posterior<br/>del encuadre"] --> CROP
  OUT --> SWAP["Swap atómico:<br/>las pantallas siguen sirviendo<br/>lo viejo hasta que lo nuevo está"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class CROP,REN hi
  class OUT,SWAP soft`,
          points: [
            'El crop se persiste normalizado entre 0 y 1, no en píxeles. Así sobrevive a un cambio de resolución objetivo y se aplica igual a las tres variantes de la escalera.',
            'El recorte se aplica antes del escalado y siempre sobre el original, nunca sobre una variante ya generada — recortar algo ya comprimido acumula pérdida de calidad sin necesidad.',
            'La previsualización no puede correr contra el archivo crudo: un .mov HEVC de iPhone no se reproduce de forma confiable en un navegador. Por eso el pipeline genera primero un proxy liviano en H.264, que es contra lo que dibuja el editor de encuadre.',
            'Editar el encuadre vuelve el ejercicio al estado "procesando" pero mantiene publicadas las variantes vigentes hasta que las nuevas terminan. El reemplazo es atómico: no existe una ventana en la que la TV pida un archivo que se está escribiendo.',
            'Al no ser destructivo, el encuadre por defecto puede cambiar más adelante y re-aplicarse en lote a todo el catálogo sin pedirle nada al gym.',
          ],
        }}
      />

      <TwoColumnSection title="Especificación de procesamiento" id="spec">
        <p className="text-sm text-black/60">
          Sección técnica, para el equipo de desarrollo. En la reunión se puede saltear.
        </p>
        <p>
          Estos son los parámetros concretos con los que se implementa la normalización. Están acá y
          no en un documento aparte porque son la parte del sprint que más fácil se implementa
          distinto de como se acordó — y porque los números son los que después se verifican contra
          los criterios de aceptación.
        </p>
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b-2 border-[var(--marco-accent)]">
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3 pr-4 w-1/3">Parámetro</th>
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3">Definición</th>
              </tr>
            </thead>
            <tbody className="text-black/80">
              {[
                ['Formatos de entrada', '.mp4 · .mov · .m4v · .webm — incluye HEVC de iPhone y VP9 de Android'],
                ['Límites de entrada', '500 MB y 2 minutos por archivo. Se validan antes de emitir la URL de subida'],
                ['Metadata', 'Se elimina toda: GPS, modelo de dispositivo, fecha de captura, autor'],
                ['Orientación', 'La rotación se aplica al fotograma y el flag se descarta, para que ninguna pantalla la reinterprete'],
                ['Códec de salida', 'H.264 Main profile, Level 4.0, espacio de color yuv420p — no High. Es exactamente el perfil de la videoteca que hoy funciona en las pantallas del gym, verificado sobre los archivos reales; High es más eficiente pero no está probado en ese hardware'],
                ['Audio', 'Se descarta. No es una decisión nueva: los videos actuales del gym ya vienen sin pista de audio'],
                ['Variantes', 'Dos por ejercicio, no más: una para la TV con encuadre horizontal, otra para la app con su propio encuadre. El contenido son loops de segundos y pesa poco, así que una escalera de tres resoluciones agrega archivos sin agregar beneficio'],
                ['Encuadres', 'Dos, independientes entre sí: TV y app. Cada uno guarda su propio rectángulo y se puede ajustar por separado sin tocar el otro'],
                ['Proxy de previsualización', '480p H.264, generado apenas termina la subida — es contra lo que dibuja el editor de encuadre, porque el original crudo no se reproduce de forma confiable en un navegador'],
                ['Encuadre', 'Rectángulo normalizado 0–1 más aspecto objetivo, uno por destino, persistido en la fila del ejercicio. Nunca se hornea en el archivo subido'],
                ['Encuadre por defecto', 'Centrado al aspecto de cada destino — horizontal para la TV. Si nadie toca el marco, el ejercicio queda igualmente usable'],
                ['Orden de operaciones', 'Recorte y después escalado, siempre desde el original — nunca sobre una variante ya comprimida'],
                ['Edición del encuadre', 'Re-renderiza las variantes desde el original, sin re-subida. Reversible e ilimitada'],
                ['Publicación', 'Swap atómico: las variantes vigentes se siguen sirviendo hasta que las nuevas están completas'],
                ['Escalado', 'Lado mayor acotado por variante, relación de aspecto intacta, sin barras'],
                ['Calidad', 'CRF 23 / 24 / 26 según variante — calidad constante, no bitrate fijo'],
                ['Arranque', 'Índice del archivo movido al principio, para que empiece a reproducirse sin descargar todo'],
                ['Keyframes', 'Cada 2 segundos, para que la TV pueda saltar de ejercicio sin esperar'],
                ['Portada', 'Fotograma del segundo 1 — no el 0, que suele salir negro o movido — a 720p, sin metadata'],
                ['Se persiste', 'Ruta por variante, duración, dimensiones y peso final de cada una'],
                ['Original', 'Se conserva intacto en su propia ruta, para re-procesar sin volver a pedirle nada al gym'],
                ['Idempotencia', 'Las rutas de salida se derivan del ejercicio y la variante: re-procesar sobrescribe'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--marco-border)]">
                  <td className="py-3 pr-4 font-medium align-top">{row[0]}</td>
                  <td className="py-3">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border border-[var(--marco-border)] rounded-lg p-6 bg-[var(--marco-accent-light)]/20 mt-2">
          <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-3">
            Objetivo de peso
          </h4>
          <p className="text-black/80 text-sm">
            <strong>Punto de referencia real:</strong> se inspeccionaron nueve videos de la
            videoteca que hoy usa el gym. Son loops cortos, de 5 a 6,5 segundos, en H.264 Main a
            unos 1,2–1,6 Mbps, con altura fija de 700 px y ancho variable, sin audio, y pesan entre{' '}
            <strong>0,6 y 1,3 MB cada uno</strong>. Ése es el estándar de facto que las pantallas del
            gym ya reproducen sin problemas.
          </p>
          <p className="text-black/80 text-sm mt-3">
            La salida nueva tiene que quedar en ese orden de magnitud. Un clip grabado con un celular
            moderno entra pesando del orden de 150 a 250 MB por 30 segundos; para un loop de ejercicio
            de 6 segundos la salida objetivo es <strong>de 1 a 2 MB en la variante de TV</strong> y{' '}
            <strong>por debajo de 800 KB en la variante de app</strong>, sin pérdida visible en una
            pantalla de gimnasio.
          </p>
          <p className="text-black/60 text-sm mt-3">
            Estos rangos se recalibran en los días 1–2 contra los archivos reales del gym, grabados
            con los celulares que se van a usar de verdad. Si los números no dan, el que se ajusta es
            el CRF, no el criterio de aceptación.
          </p>
        </div>
      </TwoColumnSection>

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
  E[("exercises<br/>variante TV · variante app")] --> S["Emisión de URL firmada<br/>por variante"]
  S --> CDN["CDN · caché de borde"]
  CDN --> TV["TV del box · un video<br/>precarga del siguiente en el OFF"]
  CDN --> APP["App · variante propia<br/>con su encuadre"]
  CDN --> ADM["Admin · portada estática"]
  TV --> F{"¿Se cae la red?"}
  F -->|Sí| K["Mantiene el último<br/>fotograma y reintenta"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef warn fill:#fff,stroke:#e66065,color:#000
  class CDN hi
  class K warn`,
          points: [
            'Una pantalla por box, diez en total, y en cada una un solo video reproduciéndose por vez. Durante el ON se muestra el ejercicio activo; durante el OFF, el que viene. Eso acota la demanda real a un video en reproducción más uno ya descargado esperando su turno — no a cinco corriendo en paralelo.',
            'El OFF es la ventana de precarga, y por eso el ciclo se diseña como una sola cosa: mientras el socio descansa, el archivo del ejercicio siguiente ya se está bajando. Cuando arranca el ON no hay descarga, hay reproducción. Ese es el mecanismo que hace que el cambio de ejercicio se vea instantáneo.',
            'A los 1,2–1,6 Mbps de la videoteca actual, un video activo por pantalla es del orden de 1,5 Mbps por box. La medición del día 2 igual se hace con las diez pantallas encendidas a la vez, porque el pico real ocurre cuando varios boxes cambian de ejercicio en el mismo momento.',
            'Faltan dos mitigaciones que hoy no están en el código de la pantalla: no hay imagen de respaldo si el archivo no decodifica y no hay manejo de error en el elemento de video — si falla, la pantalla queda negra y en silencio. Entran en este sprint.',
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
          vive el video y quién lo procesa</strong>. No se toma por preferencia — se toma midiendo
          las dos opciones con un video real del gym, servido a una TV real, sobre el wifi real del
          gimnasio.
        </p>
        <p className="text-sm text-black/60">
          El requisito de optimización automática es lo que le da peso a esta decisión. Las
          funciones serverless que ya usa el proyecto no pueden procesar video, así que la opción
          de storage integrado implica además construir y mantener un worker propio, mientras que
          un servicio de video dedicado trae la escalera de variantes incluida. Eso es lo que se
          está comparando de verdad, no el precio por gigabyte.
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
                ['Optimización del video', 'Worker propio con ffmpeg, a construir y mantener', 'Incluida — es el corazón del servicio'],
                ['Control sobre la salida', 'Total: cada parámetro lo definimos nosotros', 'Acotado a lo que exponga el proveedor'],
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
                'Calibración de la optimización contra videos crudos de los celulares del gym',
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
                'Optimización en el servidor: limpieza de metadata y variantes por resolución',
                'Proxy de previsualización y editor de encuadre en el admin',
                'Portada y duración generadas solas, para todo video',
                'Objetivo de peso verificado contra los archivos reales del gym',
                'Búsqueda y filtros en el catálogo',
              ],
            },
            {
              label: 'Días 9–10',
              items: [
                'Reproducción verificada en TV real y en la app',
                'Reencuadre de un ejercicio ya cargado, verificado sin re-subida',
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
          'Día 1 — Acceso al wifi del gym y a una TV del piso para poder medir en condiciones reales, no simuladas. Alcanza con quince minutos frente a una pantalla: identificar qué es y qué navegador corre. Hoy no está documentado en ningún lado y es la única incógnita de hardware del sprint.',
          'Día 1 — Dos o tres videos crudos, tal como salen del celular con el que se va a grabar, sin comprimir ni exportar. Son los que calibran la optimización: si se mandan ya procesados, los números del sprint no sirven.',
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
          'Se sube un video crudo de celular sin tocarlo y sale optimizado dentro del rango de peso acordado, sin pérdida visible en la pantalla del gimnasio.',
          'Se reencuadra un ejercicio ya cargado desde el administrador, sin volver a subir el archivo, y el resultado se ve encuadrado en la TV y en la app.',
          'Durante ese re-proceso, la pantalla del box nunca queda en negro: sigue mostrando la versión anterior hasta que la nueva está publicada.',
          'El archivo servido ya no contiene la metadata del original: se verifica que la ubicación GPS y los datos del dispositivo no estén.',
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
              r: 'La pantalla nueva pide mucho más que la vieja',
              m: 'El modelo definido es una pantalla por box —diez en total— con un solo video en reproducción por vez: el activo durante el ON, el que viene durante el OFF. Eso mantiene la carga por pantalla parecida a la del sistema anterior. Lo que sí cambia es por dónde viajan los archivos: antes salían de una máquina en la red local del gimnasio, ahora vienen por internet desde un servidor externo. Por eso la medición es el día 2 y no la semana 7, y se hace con las diez pantallas prendidas — el pico real es cuando varios boxes cambian de ejercicio al mismo tiempo.',
            },
            {
              r: 'No sabemos qué son las pantallas del piso',
              m: 'Ningún registro del proyecto documenta marca, modelo, sistema operativo ni navegador de las TVs — ya figuraba como pendiente antes de este sprint. Lo que sí se verificó es que la videoteca actual está en H.264 Main y funciona, así que la salida se fija en ese perfil en vez del más eficiente. Se cierra el día 1 con quince minutos en el gym: abrir una pantalla, mirar qué navegador es y reproducir un archivo de prueba.',
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
