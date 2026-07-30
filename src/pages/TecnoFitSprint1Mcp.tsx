import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import MarcopoloLogo from '../components/MarcopoloLogo'
import DualDiagram from '../components/DualDiagram'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'cambio', label: 'Qué cambia' },
  { id: 'flujo', label: 'Flujo' },
  { id: 'herramientas', label: 'Herramientas' },
  { id: 'archivos', label: 'Archivos' },
  { id: 'estados', label: 'Estados' },
  { id: 'datos', label: 'Datos' },
  { id: 'alcance', label: 'Alcance' },
  { id: 'instrucciones', label: 'Instrucciones' },
  { id: 'limites', label: 'Límites' },
]

export default function TecnoFitSprint1Mcp() {
  return (
    <>
      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Fitness Central · TecnoFit · Sprint 1
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Carga por<br />conversación
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Plan de implementación del Sprint 1. Reemplaza el formulario de carga por una
          herramienta que la persona del gym maneja hablando con Claude: deja los videos en una
          carpeta, dice qué son, y el sistema los procesa, los sube y los deja listos.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Reemplaza</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">El formulario</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Procesamiento</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Local</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Infraestructura</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">Ninguna</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Quién carga</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">El gym</p>
          </div>
        </div>
      </div>

      <div className="mx-[-4vw] md:mx-[-10.5vw] mb-16 md:mb-24 sticky top-16 z-20">
        <ScrollNav items={NAV} />
      </div>

      <ContentBox title="Qué cambia respecto del plan original" id="cambio">
        <p>
          El plan del Sprint 1 daba por sentado que el gym iba a cargar contenido desde un
          formulario web. La realidad es más simple: <strong>por ahora hay una sola persona
          cargando, es del gimnasio, y ya trabaja con Claude</strong>. Para esa persona, un
          formulario es más lento que una conversación — sobre todo cargando de a cuarenta
          videos, donde nombrar y etiquetar uno por uno es el verdadero trabajo.
        </p>
        <p>
          Así que se invierte el orden: primero la herramienta conversacional, que existe en días
          y no necesita servidor; el formulario web queda para cuando haya más de una persona
          cargando o una segunda sede.
        </p>
        <p className="text-sm text-black/60 pt-2">
          Lo que <strong>no</strong> cambia: el modelo de salida del video, el perfil de codec, la
          limpieza de metadata, el encuadre como dato, y el hecho de que el original se conserva
          intacto. Todo eso está definido en el plan del sprint y sigue igual — esta herramienta
          es otra puerta de entrada al mismo pipeline, no otro pipeline.
        </p>
      </ContentBox>

      <DualDiagram
        id="flujo"
        title="El flujo, de punta a punta"
        subtitle="Desde que los videos están en una carpeta hasta que se ven en la pantalla del box."
        user={{
          caption:
            'La persona del gym deja los videos en una carpeta y le dice a Claude qué son. Claude los procesa, los sube y devuelve la portada de cada uno para que se vea cómo quedó el encuadre. Si alguno quedó mal, se lo dice con palabras y se regenera. Cuando está conforme, los publica y recién ahí aparecen en el piso.',
          chart: `flowchart TD
  A["Dejo los videos<br/>en una carpeta"] --> B["Le digo a Claude qué son:<br/>nombre, músculo, equipamiento"]
  B --> C["Procesa y sube<br/>cada uno"]
  C --> D["Me devuelve la portada<br/>para ver el encuadre"]
  D --> E{"¿Quedó bien?"}
  E -->|No| F["Le digo cómo corregirlo<br/>y lo regenera"]
  F --> D
  E -->|Sí| G["Publico · ya se ve<br/>en la pantalla del box"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class A,B hi
  class G soft`,
          points: [
            'No hay que abrir un editor de video, ni comprimir, ni exportar, ni elegir formato. Se sube el archivo tal como salió de la cámara.',
            'Cargar cuarenta ejercicios es una sola instrucción, no cuarenta formularios. Ahí está la mayor parte del ahorro real de tiempo.',
            'Nada aparece en el gimnasio hasta que la persona lo publica. Se puede cargar todo un lunes y revisarlo tranquilo el martes.',
            'Si un encuadre no convence dentro de seis meses, se corrige igual, sin volver a buscar el archivo original.',
          ],
        }}
        dev={{
          caption:
            'Un servidor MCP local expone las herramientas; ffmpeg corre en la misma máquina. Cada alta es una sola llamada que procesa, sube el original y las variantes, y escribe la fila — todo o nada. El modelo nunca queda a cargo de recordar un enlace entre dos llamadas, que es donde aparecerían archivos huérfanos.',
          chart: `flowchart TD
  CL["Claude"] -->|"llamada MCP"| MCP["Servidor MCP local"]
  MCP --> FF["ffmpeg local<br/>normaliza · encuadra · portada"]
  FF --> UP["Sube a Storage:<br/>original + variante TV<br/>+ variante app + portada"]
  UP --> DB[("Fila en exercises<br/>rutas · encuadre · duración<br/>is_active = false")]
  DB --> RET["Devuelve id + portada<br/>+ pesos finales"]
  RET --> CL
  CL -->|"reframe"| MCP
  CL -->|"publish"| PUB["is_active = true<br/>visible en el piso"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class MCP,FF hi
  class RET,PUB soft`,
          points: [
            'Una sola llamada hace procesar, subir y escribir. Si algo falla a mitad de camino, se limpia lo subido y no queda fila a medias ni archivo sin fila.',
            'El original se sube siempre, no solo las variantes. Es de lo que dependen el reencuadre posterior y cualquier re-render futuro; si viviera únicamente en esa Mac, el reencuadre desde el admin sería imposible.',
            'La fila guarda rutas de storage, no URLs completas. Las URLs se arman al leer, así que cambiar de bucket o poner un CDN adelante no obliga a reescribir datos.',
            'El alta nace con is_active en false — la columna ya existe en la tabla. Nada llega a la pantalla del box sin un paso explícito de publicación.',
            'El servidor MCP es un envoltorio fino sobre un script determinístico. El mismo script, sin tocar una línea, es el que después corre en un worker cuando la carga deje de ser de una sola persona.',
          ],
        }}
      />

      <TwoColumnSection title="Las herramientas" id="herramientas">
        <p>
          Cinco herramientas. Deliberadamente pocas: cada una hace una cosa y devuelve algo que se
          puede mirar.
        </p>
        <div className="space-y-5 pt-2">
          {[
            {
              n: 'crear_ejercicio',
              p: 'archivo, nombre, músculos, equipamiento, dificultad (opcional), encuadre (opcional)',
              d: 'Procesa el video con ffmpeg, sube original y variantes, y crea el ejercicio como borrador.',
              r: 'id del ejercicio · portada · peso final de cada variante · duración',
            },
            {
              n: 'reencuadrar',
              p: 'id del ejercicio, encuadre o instrucción de ajuste, destino (TV o app)',
              d: 'Vuelve a renderizar las variantes desde el original con el encuadre nuevo. No requiere volver a subir el archivo.',
              r: 'portada nueva, para verificar el resultado',
            },
            {
              n: 'publicar',
              p: 'id del ejercicio (o varios)',
              d: 'Pone is_active en true. A partir de acá el ejercicio es usable en rutinas y visible en el piso.',
              r: 'confirmación de qué quedó publicado',
            },
            {
              n: 'despublicar',
              p: 'id del ejercicio',
              d: 'Lo saca de circulación sin borrar nada. Para corregir un error sin perder el trabajo.',
              r: 'confirmación',
            },
            {
              n: 'listar_ejercicios',
              p: 'estado (opcional), búsqueda (opcional)',
              d: 'Qué hay cargado, qué está en borrador y qué está publicado. Es cómo se retoma el trabajo al día siguiente.',
              r: 'listado con estado y portada',
            },
          ].map((t, i) => (
            <div key={i} className="border-l-2 border-[var(--marco-accent-light)] pl-5">
              <h4 className="font-thunder text-lg uppercase text-black">{t.n}</h4>
              <p className="text-black/80 text-sm mt-2">{t.d}</p>
              <p className="text-black/60 text-sm mt-2">
                <span className="uppercase text-xs tracking-wide">Recibe:</span> {t.p}
              </p>
              <p className="text-black/60 text-sm">
                <span className="uppercase text-xs tracking-wide">Devuelve:</span> {t.r}
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-black/60 pt-2">
          Que <strong>crear_ejercicio</strong> devuelva la portada es lo que hace que el encuadre
          funcione sin editor visual: la instrucción es texto, pero la respuesta es una imagen.
          Se mira, se corrige, se vuelve a mirar. Como regenerar es barato, dos vueltas alcanzan.
        </p>
      </TwoColumnSection>

      <TwoColumnSection title="Dónde queda cada archivo" id="archivos">
        <p>
          Cuatro archivos por ejercicio. Uno no se sirve nunca y es el más importante de todos.
        </p>
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b-2 border-[var(--marco-accent)]">
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3 pr-4">Archivo</th>
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3 pr-4">Acceso</th>
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3">Para qué</th>
              </tr>
            </thead>
            <tbody className="text-black/80">
              {[
                ['Original', 'Privado — nunca se sirve', 'Es la fuente de todo re-render. Sin él, reencuadrar más adelante obliga a volver a subir el video'],
                ['Variante TV', 'Público', 'La pantalla del box, con encuadre horizontal'],
                ['Variante app', 'Público', 'El celular del socio, con su propio encuadre'],
                ['Portada', 'Público', 'Miniatura en el catálogo y respaldo si el video no carga'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--marco-border)]">
                  <td className="py-3 pr-4 font-medium align-top">{row[0]}</td>
                  <td className="py-3 pr-4 align-top">{row[1]}</td>
                  <td className="py-3">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="pt-2">
          <strong>Las variantes van en un bucket público, no con enlaces firmados.</strong> Es un
          cambio respecto de la definición inicial y tiene un motivo concreto: la pantalla del box
          es pública y está encendida todo el día, sin nadie que la refresque. Un enlace que vence
          es una pantalla en negro garantizada a las pocas horas. Un video de ejercicio no es un
          dato sensible, así que la complejidad no se justifica.
        </p>
        <p className="text-sm text-black/60">
          El original sí queda privado. No porque sea secreto, sino porque no hay razón para servir
          un archivo de 200 MB cuando existe una variante de 2 MB que se ve igual.
        </p>
      </TwoColumnSection>

      <DualDiagram
        id="estados"
        title="Borrador y publicado"
        subtitle="Por qué un ejercicio recién cargado no aparece en el gimnasio."
        user={{
          caption:
            'Cargar y publicar son dos cosas distintas a propósito. Se puede cargar un lote entero sin miedo: hasta que no se publica, no lo ve nadie en el piso. Eso permite cargar a la tarde, revisar los encuadres con calma, y recién después dejarlo disponible.',
          chart: `flowchart LR
  A["Cargado<br/>borrador"] --> B["Reviso la portada"]
  B --> C{"¿Está bien?"}
  C -->|No| D["Reencuadro"] --> B
  C -->|Sí| E["Publicado<br/>visible en el piso"]
  E --> F["Si algo salió mal:<br/>despublico, sin perder nada"]
  F --> B
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class A,B hi
  class E soft`,
          points: [
            'Un error de carga nunca llega a una clase. El costo de equivocarse cargando es cero.',
            'Despublicar no borra: el ejercicio y su video siguen ahí, listos para volver cuando se corrijan.',
            'Es lo que hace seguro cargar rápido y en volumen, que es justamente para lo que sirve esta herramienta.',
          ],
        }}
        dev={{
          caption:
            'El estado se apoya en la columna is_active que la tabla ya tiene, así que no hace falta inventar un modelo de publicación nuevo ni tocar lo que ya consulta el catálogo. Todo lo que lee ejercicios para armar rutinas o para mostrar en pantalla ya filtra por is_active.',
          chart: `flowchart LR
  N["crear_ejercicio"] --> D[("is_active = false<br/>procesado y subido")]
  D --> R["reencuadrar<br/>re-render desde el original"]
  R --> D
  D --> P["publicar"] --> A[("is_active = true")]
  A --> U["despublicar"] --> D
  A --> CAT["Catálogo · rutinas<br/>pantalla de box · app"]
  classDef hi fill:#e66065,stroke:#c44a4f,color:#fff
  classDef soft fill:#f5b5b8,stroke:#e66065,color:#000
  class D,A hi
  class CAT soft`,
          points: [
            'is_active ya existe y ya se respeta en las consultas del catálogo, así que el borrador sale gratis: un ejercicio inactivo simplemente no aparece en ningún lado.',
            'El re-render de un borrador reemplaza sus archivos directamente. El de un ejercicio publicado usa reemplazo atómico, para no dejar a la pantalla pidiendo un archivo a medio escribir.',
            'Despublicar no toca storage. Es reversible y barato, que es lo que permite corregir sin miedo.',
          ],
        }}
      />

      <TwoColumnSection title="Qué se guarda en la base" id="datos">
        <p>
          Las columnas que hay que sumar a la tabla de ejercicios. El resto —nombre, músculos,
          equipamiento, dificultad, categoría— ya existe y no se toca.
        </p>
        <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
          <table className="w-full text-sm border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b-2 border-[var(--marco-accent)]">
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3 pr-4">Campo</th>
                <th className="text-left font-thunder uppercase text-[var(--marco-accent)] py-3">Para qué</th>
              </tr>
            </thead>
            <tbody className="text-black/80">
              {[
                ['Ruta del original', 'La fuente de cualquier re-render futuro'],
                ['Ruta de la variante TV', 'Lo que pide la pantalla del box'],
                ['Ruta de la variante app', 'Lo que pide el celular del socio'],
                ['Ruta de la portada', 'Miniatura del catálogo y respaldo de la pantalla'],
                ['Encuadre TV', 'Rectángulo normalizado, para poder rehacer la variante sin el archivo'],
                ['Encuadre app', 'Ídem, independiente del anterior'],
                ['Duración', 'Para que la pantalla sepa cuánto dura el loop sin abrir el archivo'],
                ['Peso de cada variante', 'Para verificar el objetivo de peso sin salir a medir'],
                ['Estado de procesamiento', 'Procesando, listo o con error — y el motivo si falló'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--marco-border)]">
                  <td className="py-3 pr-4 font-medium align-top">{row[0]}</td>
                  <td className="py-3">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-black/60 pt-2">
          Guardar rutas y no direcciones completas es deliberado: el día que se ponga un CDN
          adelante, o cambie el nombre del bucket, no hay que reescribir una sola fila.
        </p>
      </TwoColumnSection>

      <TwoColumnSection title="Alcance revisado" id="alcance">
        <p>
          Respecto del plan original del Sprint 1, esto entra y esto se corre. El objetivo del
          sprint no cambia: que el catálogo exista, con contenido real del gym.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6 bg-[var(--marco-accent-light)]/20">
            <h4 className="font-thunder text-xl uppercase text-[var(--marco-accent)] mb-4">Entra</h4>
            <ul className="space-y-3 text-black/80 text-sm">
              <li>El pipeline de procesamiento como script determinístico</li>
              <li>El servidor MCP con las cinco herramientas</li>
              <li>Bucket de storage y columnas nuevas en la tabla</li>
              <li>Instrucciones escritas para la persona que carga</li>
              <li>La app y la pantalla de box leyendo las variantes nuevas</li>
              <li>El catálogo real del gym, cargado y publicado</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <h4 className="font-thunder text-xl uppercase text-black/70 mb-4">Se corre a Sprint 2</h4>
            <ul className="space-y-3 text-black/60 text-sm">
              <li>El formulario de carga web</li>
              <li>El editor visual de encuadre</li>
              <li>El worker de procesamiento en servidor</li>
              <li>Recorte temporal del video</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-black/60 pt-2">
          Nada de lo que se corre se tira: el formulario y el worker son otras puertas al mismo
          script, y el editor visual escribe el mismo encuadre que hoy se ajusta hablando.
        </p>
      </TwoColumnSection>

      <BoxedListSection
        id="instrucciones"
        title="Instrucciones para quien carga"
        subtitle="Lo que hay que escribir y dejar a mano en el gym. Se entrega junto con la herramienta."
        items={[
          'Cómo dejar los videos: en qué carpeta, y por qué conviene que el nombre del archivo diga qué ejercicio es — es lo que permite cargar de a cuarenta sin nombrarlos uno por uno.',
          'Qué pedirle a Claude para cargar un lote, con ejemplos exactos y copiables, no descripciones generales.',
          'Cómo mirar el encuadre en la portada que devuelve, y cómo pedir una corrección con palabras.',
          'Cómo publicar, y la regla de oro: nada se ve en el gimnasio hasta que se publica.',
          'Qué hacer cuando algo sale mal — un video que no procesa, un nombre repetido, un archivo dañado — y a quién avisarle.',
          'Qué NO hace falta hacer: comprimir, recortar, exportar, cambiar formato o elegir calidad. Todo eso lo resuelve el sistema.',
        ]}
      />

      <TwoColumnSection title="Los límites de esto" id="limites">
        <p>
          Vale la pena tenerlos escritos ahora, mientras la decisión está fresca, y no descubrirlos
          dentro de seis meses.
        </p>
        <div className="space-y-6 pt-2">
          {[
            {
              r: 'Una sola persona y una sola máquina',
              m: 'Si esa persona deja el gimnasio o esa Mac se rompe, la carga se detiene hasta que exista el formulario web. Es aceptable hoy porque efectivamente hay una sola persona cargando, y es reversible porque el pipeline es un script portable, no algo atado a la herramienta.',
            },
            {
              r: 'No se replica a una sede nueva',
              m: 'La propuesta general apunta a que TecnoFit sea franquiciable. Una herramienta que vive en una máquina no se franquicia. Esto no bloquea nada hoy, pero es exactamente lo que resuelve el formulario web del Sprint 2 — conviene no perderlo de vista al planificar la segunda sede.',
            },
            {
              r: 'El encuadre se corrige a ciegas, con dos vueltas',
              m: 'Ver una portada y pedir un ajuste con palabras funciona, pero es más lento que arrastrar un marco. Para un lote inicial está bien; para uso cotidiano a largo plazo, el editor visual del Sprint 2 lo reemplaza. El trabajo no se pierde: ambos escriben el mismo dato de encuadre.',
            },
          ].map((item, i) => (
            <div key={i} className="border-l-2 border-[var(--marco-accent-light)] pl-5">
              <h4 className="font-thunder text-lg uppercase text-black mb-2">{item.r}</h4>
              <p className="text-black/80 text-sm">{item.m}</p>
            </div>
          ))}
        </div>
      </TwoColumnSection>

      <ContentBox title="Por qué esto no es un atajo">
        <p>
          Podría parecer que se está cambiando el entregable por algo más fácil. No es el caso: lo
          que se construye es exactamente el mismo pipeline de procesamiento que iba a correr en un
          servidor — mismo codec, mismo encuadre como dato, misma limpieza de metadata, mismo
          original conservado. Lo único que cambia es quién lo dispara.
        </p>
        <p>
          Y cambia en el orden correcto. Primero se resuelve que el contenido exista, que es lo que
          desbloquea el constructor de rutinas, las pantallas y todo lo que viene después. El
          formulario web deja de ser un requisito para empezar y pasa a ser lo que reemplaza a esta
          herramienta cuando cargar deje de ser tarea de una sola persona.
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
