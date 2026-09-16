import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'etapa', label: 'Vista de etapa' },
  { id: 'material', label: 'Materiales' },
  { id: 'zona', label: 'Zona' },
  { id: 'local', label: 'Local' },
  { id: 'colocaciones', label: 'Listado' },
  { id: 'revision', label: 'Revisión' },
  { id: 'campo', label: 'Colocador' },
  { id: 'cliente', label: 'Vista de PedidosYa' },
  { id: 'decisiones', label: 'A definir' },
]

/** Una pantalla del diseño, con su pie. */
function Pantalla({
  src,
  alt,
  pie,
  telefono = false,
}: {
  src: string
  alt: string
  pie: string
  telefono?: boolean
}) {
  return (
    <figure className="mt-5">
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-lg border border-[var(--marco-border)] ${
          telefono ? 'pic-phone' : ''
        }`}
        style={telefono ? { maxWidth: 300 } : undefined}
      />
      <figcaption className="text-sm text-black/50 mt-3 max-w-2xl">{pie}</figcaption>
    </figure>
  )
}

export default function PicnicPlataforma() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* ── Portada ───────────────────────────────────────────── */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Picnic BTL · Fase 1
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Plataforma de
          <br />
          gestión de campo
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          El diseño de la plataforma, pantalla por pantalla. Está armado sobre la
          información que nos enviaron —la estructura de zonas, los materiales y el
          circuito de carga y revisión— y se presenta para revisarlo antes de
          construirlo.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Alcance</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Fase 1</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Pantallas</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Ocho</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Roles</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Cuatro</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Entrega</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">
              13/10
            </p>
          </div>
        </div>
      </div>

      {/* ── La etapa entera ───────────────────────────────────── */}
      <TwoColumnSection title="Vista general de la etapa" id="etapa">
        <p className="text-lg">
          La pantalla de inicio muestra la etapa completa, con todas sus zonas y el
          avance de cada una. No hace falta entrar y salir de una zona para entender
          cómo viene el conjunto.
        </p>
        <p>
          Cada zona indica cuántas colocaciones tiene, cuántas corresponden a kit
          básico y cuántas a backlight, cuántas se cargaron y quién responde por ella
          —coordinador y colocador—, siempre visible.
        </p>
        <Pantalla
          src="/picnic/zonas.webp"
          alt="Pantalla de zonas de la etapa, con las zonas en tarjetas"
          pie="Vista de etapa: cada zona con su avance y sus responsables."
        />
      </TwoColumnSection>

      {/* ── El material como filtro ───────────────────────────── */}
      <TwoColumnSection title="El material, como filtro" id="material">
        <p className="text-lg">
          Los tres botones principales —todas, kit básico, backlight— están arriba de
          todo, con el total de cada uno. Es el filtro de uso más frecuente, así que
          ocupa el lugar más visible.
        </p>
        <p>
          De esa manera la zona se identifica por su geografía —CABA Cordón 3,
          Tucumán— y el material se elige adentro. Se trabaja con una zona en lugar de
          una por material, y la misma pantalla sirve para revisar kit básico o
          backlights.
        </p>
        <p>
          Debajo quedan los filtros secundarios y un buscador por nombre de local o por
          código.
        </p>
      </TwoColumnSection>

      <ContentBox title="Selector de etapa" id="selector">
        <p className="text-black/80 text-lg">
          El nombre de la etapa, arriba a la izquierda, despliega las últimas diez con
          su total. Desde ahí se crea una etapa nueva o se accede al listado completo.
        </p>
        <Pantalla
          src="/picnic/etapas.webp"
          alt="Selector de etapa desplegado sobre el listado completo de etapas"
          pie="El selector desplegado, con el listado completo de etapas detrás."
        />
      </ContentBox>

      {/* ── Zona ──────────────────────────────────────────────── */}
      <TwoColumnSection title="Detalle de zona" id="zona">
        <p className="text-lg">
          Al seleccionar una zona se abre un panel sobre la pantalla anterior, con sus
          locales, el estado de cada uno y su asignación. La vista de etapa queda
          atenuada detrás: al cerrar el panel se retoma en el mismo punto.
        </p>
        <p>
          Dentro de la zona, cada local muestra el resultado de su visita. En el kit
          básico se registra cada material por separado —el saliente puede quedar
          colocado y el sticker no—; en backlight, que es un material único, se
          registra únicamente si la visita fue efectiva.
        </p>
        <Pantalla
          src="/picnic/zona.webp"
          alt="Panel de detalle de zona abierto sobre la vista de etapa"
          pie="Detalle de zona, con el resultado de cada material."
        />
      </TwoColumnSection>

      {/* ── Local ─────────────────────────────────────────────── */}
      <TwoColumnSection title="Detalle de local" id="local">
        <p className="text-lg">
          El local abre un tercer panel sobre los dos anteriores. Los tres niveles
          quedan escalonados, de modo que siempre se ve en qué punto de la jerarquía se
          está y se vuelve atrás con un clic.
        </p>
        <p>
          Ahí está la acreditación completa: las dos fotos, las verificaciones que hace
          el servidor sobre ellas —fecha de captura, distancia al local, si esa imagen
          se utilizó antes—, el resultado y quién lo controló. El colocador puede
          corregir su carga durante <strong>7 días hábiles</strong> desde que la sube.
        </p>
        <p>
          Debajo se listan <strong>las etapas anteriores del mismo local</strong>. Eso
          permite evaluar una colocación contra su antecedente y generar informes de
          rebranding con el antes y el después sin trabajo adicional.
        </p>
        <Pantalla
          src="/picnic/cascada.webp"
          alt="Los tres paneles escalonados: etapa, zona y local"
          pie="Etapa, zona y local escalonados; adelante, el nivel activo."
        />
      </TwoColumnSection>

      {/* ── Colocaciones ──────────────────────────────────────── */}
      <TwoColumnSection title="Listado de colocaciones" id="colocaciones">
        <p className="text-lg">
          Para las consultas que no se organizan por zona: qué falta, qué se rechazó,
          qué cargó una persona, qué corresponde a rebranding y qué a local nuevo. La
          misma información en una lista plana, con filtros y exportación.
        </p>
        <Pantalla
          src="/picnic/colocaciones.webp"
          alt="Listado de todas las colocaciones de la etapa con sus filtros"
          pie="Listado completo, con el motivo indicado en las colocaciones no efectivas."
        />
      </TwoColumnSection>

      {/* ── Revisión ──────────────────────────────────────────── */}
      <TwoColumnSection title="Revisión de colocaciones" id="revision">
        <p className="text-lg">
          La revisión consiste en mirar fotos, así que la pantalla se reorganiza para
          eso: el menú se reduce a íconos, el fondo se oscurece y la imagen ocupa el
          máximo espacio disponible. Se aprueba o se rechaza desde el teclado y avanza
          automáticamente a la siguiente.
        </p>
        <p>
          El motivo se toma de la lista cerrada de once que nos enviaron, con un campo
          de comentario libre para los casos excepcionales. Al ser una lista tipificada
          y no texto libre, después puede analizarse dónde y por qué se traba el
          trabajo.
        </p>
        <Pantalla
          src="/picnic/corrector.webp"
          alt="Pantalla de revisión con el menú colapsado"
          pie="Revisión: la cola a la derecha, la imagen en el centro y los motivos disponibles."
        />
      </TwoColumnSection>

      {/* ── Campo ─────────────────────────────────────────────── */}
      <TwoColumnSection title="Aplicación del colocador" id="campo">
        <p className="text-lg">
          Desde el celular, y acotada a su propio trabajo: las visitas del día, las que
          están esperando revisión y las que el coordinador devolvió, con el comentario
          correspondiente para saber qué corregir.
        </p>
        <p>
          Ve su propio avance, sin los totales de la etapa ni los de otros colocadores.
        </p>
        <Pantalla
          src="/picnic/colocador.webp"
          alt="Pantalla del colocador en el teléfono"
          pie="Aplicación del colocador; ordena primero lo que hay que rehacer."
          telefono
        />
      </TwoColumnSection>

      {/* ── Cliente ───────────────────────────────────────────── */}
      <TwoColumnSection title="Vista de PedidosYa" id="cliente">
        <p className="text-lg">
          Una vista propia, con su marca, donde ven el avance de la etapa y cada
          acreditación con su foto, su fecha y su ubicación. Acceden al dato completo:
          qué se coloca, cuándo y dónde.
        </p>
        <p>
          <strong>Lo único que no ven es quién.</strong> Ni el colocador ni el
          coordinador aparecen en ninguna pantalla de esta vista, y no se trata de un
          filtro que pueda esquivarse: la restricción está en la base de datos.
        </p>
        <p>
          Pueden <strong>buscar un local</strong> y <strong>descargar informes</strong>.
          No aprueban, no comentan y no editan.
        </p>
        <Pantalla
          src="/picnic/cliente.webp"
          alt="Vista del cliente con el avance de la etapa y el buscador de locales"
          pie="Vista de PedidosYa, con su marca, buscador y descarga de informes."
        />
      </TwoColumnSection>

      {/* ── Decisiones ────────────────────────────────────────── */}
      <ContentBox title="Puntos a definir" id="decisiones">
        <p className="text-black/80 text-lg mb-5">
          Ninguno frena el trabajo de esta semana. Cuanto antes queden resueltos, menor
          es el riesgo de tener que revisar algo más adelante.
        </p>
        <ul className="space-y-2 text-black/80 text-[15px]">
          <li>
            — <strong>Motivos de rechazo:</strong> "No quiere o puede perforable" no
            figura en la lista de once que nos enviaron, y aparece con frecuencia en los
            registros anteriores. ¿Queda excluido a propósito o lo incorporamos?
          </li>
          <li>
            — <strong>Acceso por zona:</strong> hoy la clave es única por zona, de modo
            que quien la tiene accede a todos sus locales y el sistema no identifica a la
            persona. Mantenerla abierta resuelve el vencimiento; queda definir si además
            quieren una clave por persona.
          </li>
          <li>
            — <strong>Coordinador:</strong> alcance de su territorio y si la asignación
            de locales la hace él o Picnic central.
          </li>
          <li>
            — <strong>Rebranding y locales nuevos:</strong> si deben distinguirse en los
            informes y sobre cuál de los dos se factura.
          </li>
          <li>
            — <strong>Identidad visual de Picnic</strong> para el panel interno. La vista
            de PedidosYa ya utiliza la de ellos.
          </li>
        </ul>
      </ContentBox>

      <div className="mb-20 md:mb-28">
        <p className="text-black/60 text-[15px] max-w-2xl">
          Las capturas corresponden al diseño de la plataforma, elaborado a partir de la
          información que nos enviaron. Los nombres, códigos y cifras que aparecen en
          pantalla son ilustrativos.
        </p>
      </div>
    </>
  )
}
