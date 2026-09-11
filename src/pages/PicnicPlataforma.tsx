import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'etapa', label: 'La etapa entera' },
  { id: 'material', label: 'Por material' },
  { id: 'zona', label: 'Entrar a una zona' },
  { id: 'local', label: 'Un local' },
  { id: 'colocaciones', label: 'Colocaciones' },
  { id: 'revision', label: 'Revisión' },
  { id: 'campo', label: 'En la calle' },
  { id: 'cliente', label: 'Lo que ve PedidosYa' },
  { id: 'decisiones', label: 'A decidir' },
]

/** Una pantalla, con su pie. Las capturas son de la plataforma con datos reales. */
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
          Picnic BTL · Plataforma de campo
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          La etapa de
          <br />
          septiembre,
          <br />
          adentro
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Las pantallas de la plataforma nueva, armadas con la etapa que Picnic está
          corriendo ahora mismo: sus once zonas, sus 2.273 colocaciones y sus locales
          reales. No es una demostración con datos de ejemplo — es la operación de
          septiembre, vista desde el sistema que la va a reemplazar.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Etapa</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">83 · Septiembre</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Zonas</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">11</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Colocaciones</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">
              2.273
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Roles</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Cuatro</p>
          </div>
        </div>
      </div>

      {/* ── La etapa entera ───────────────────────────────────── */}
      <TwoColumnSection title="Lo primero que se ve es la etapa entera" id="etapa">
        <p className="text-lg">
          Al entrar, la pantalla muestra la etapa completa: las once zonas, cuánto tiene
          cada una y cómo viene. Nada de arrancar adentro de una zona sola y tener que
          salir para ver el resto.
        </p>
        <p>
          Cada zona dice de un vistazo cuántas colocaciones tiene, cuántas son de kit
          básico y cuántas de backlight, cuántas se cargaron y quién responde por ella
          — el coordinador y el colocador, siempre a la vista.
        </p>
        <Pantalla
          src="/picnic/zonas.webp"
          alt="Pantalla de zonas de la etapa, con las once zonas en tarjetas"
          pie="Las once zonas de la etapa de septiembre, con su avance y sus responsables."
        />
      </TwoColumnSection>

      {/* ── El material como filtro ───────────────────────────── */}
      <TwoColumnSection title="El material es un filtro, no parte del nombre" id="material">
        <p className="text-lg">
          Arriba de todo están los tres botones grandes: todas, kit básico, backlight.
          Es el filtro que más se usa, así que ocupa el lugar más visible y muestra el
          número de cada uno.
        </p>
        <p>
          Eso permite que la zona se llame por su geografía —CABA Cordón 3, Tucumán— y
          que el material sea algo que se elige adentro. Una zona sola en vez de una por
          material, y la misma pantalla sirve para mirar el kit básico o los backlights
          sin cambiar de lugar.
        </p>
        <p>
          Debajo quedan los filtros finos y un buscador que entra por nombre de local o
          por código.
        </p>
      </TwoColumnSection>

      <ContentBox title="El selector de etapa" id="selector">
        <p className="text-black/80 text-lg">
          Arriba a la izquierda, el nombre de la etapa abre las últimas diez, con el
          total de cada una. Desde ahí se crea una etapa nueva o se pasa al listado
          completo, con las sesenta.
        </p>
        <Pantalla
          src="/picnic/etapas.webp"
          alt="Selector de etapa desplegado sobre el listado completo de etapas"
          pie="El selector abierto, y detrás el listado completo de etapas."
        />
      </ContentBox>

      {/* ── Zona ──────────────────────────────────────────────── */}
      <TwoColumnSection title="Entrar a una zona sin perder la etapa" id="zona">
        <p className="text-lg">
          Al tocar una zona se abre un panel encima, con sus locales, el estado de cada
          uno y quién lo tiene asignado. La etapa queda atrás, atenuada pero visible: se
          cierra el panel y se sigue donde se estaba.
        </p>
        <p>
          Adentro de la zona, cada local muestra el resultado de su visita. En el kit
          básico se ve además cómo salió cada material por separado —el saliente puede
          quedar puesto y el sticker no—; en un backlight, que es un material único, se
          registra sólo si la visita fue efectiva.
        </p>
        <Pantalla
          src="/picnic/zona.webp"
          alt="Panel de la zona CABA Cordón 1 abierto sobre la etapa"
          pie="CABA Cordón 1, con sus catorce colocaciones cargadas y el resultado de cada material."
        />
      </TwoColumnSection>

      {/* ── Local ─────────────────────────────────────────────── */}
      <TwoColumnSection title="Y de la zona al local, sin cambiar de pantalla" id="local">
        <p className="text-lg">
          El local abre un tercer panel, más angosto, encima de los dos anteriores. Los
          tres niveles quedan escalonados: se ve dónde se está parado y se vuelve un
          paso atrás con un clic.
        </p>
        <p>
          Adentro está la prueba completa: las dos fotos, qué verificó el servidor sobre
          ellas —cuándo se tomaron, a qué distancia del local, si esa imagen se usó
          antes—, el resultado y quién la controló. El colocador puede corregirla
          durante <strong>7 días hábiles</strong> desde que la sube.
        </p>
        <p>
          Abajo, <strong>las etapas anteriores del mismo local</strong>. Es lo que
          permite juzgar una colocación contra lo que había antes, y lo que hace posible
          armarle a PedidosYa un informe de rebranding con el antes y el después sin
          trabajo extra.
        </p>
        <Pantalla
          src="/picnic/cascada.webp"
          alt="Los tres paneles escalonados: etapa, zona y local"
          pie="Etapa, zona y local escalonados. El de adelante es el que se está mirando."
        />
      </TwoColumnSection>

      {/* ── Colocaciones ──────────────────────────────────────── */}
      <TwoColumnSection title="Todas las colocaciones, en una lista" id="colocaciones">
        <p className="text-lg">
          Para cuando la pregunta no es por zona sino por otra cosa: qué falta, qué se
          rechazó, qué cargó una persona, qué es rebranding y qué es local nuevo. La
          misma información, en una lista plana que se filtra y se exporta.
        </p>
        <Pantalla
          src="/picnic/colocaciones.webp"
          alt="Listado de todas las colocaciones de la etapa con sus filtros"
          pie="La lista completa de la etapa, con el motivo escrito en las que no fueron efectivas."
        />
      </TwoColumnSection>

      {/* ── Revisión ──────────────────────────────────────────── */}
      <TwoColumnSection title="Revisar de corrido" id="revision">
        <p className="text-lg">
          Revisar es mirar fotos, así que la pantalla se corre del medio: el menú se
          reduce a íconos, el fondo se oscurece y la imagen ocupa todo lo que puede. Se
          aprueba o se rechaza con el teclado y pasa sola a la siguiente.
        </p>
        <p>
          El motivo sale de la lista cerrada de once que nos pasaron, con un comentario
          libre para lo extraordinario. Al ser una lista y no texto suelto, después se
          puede ver en qué zonas se traba el trabajo y por qué.
        </p>
        <Pantalla
          src="/picnic/corrector.webp"
          alt="Modo de revisión con el menú colapsado y el fondo oscuro"
          pie="El modo de revisión: la cola a la derecha, la foto en el centro, los motivos a mano."
        />
      </TwoColumnSection>

      {/* ── Campo ─────────────────────────────────────────────── */}
      <TwoColumnSection title="Lo que ve el colocador en la calle" id="campo">
        <p className="text-lg">
          Desde el celular, y sólo lo suyo: lo que tiene que hacer hoy, lo que está
          esperando revisión y lo que le devolvió el coordinador, con el comentario
          escrito para que sepa qué corregir.
        </p>
        <p>
          Su propio avance, sin los totales de la etapa ni los de nadie más.
        </p>
        <Pantalla
          src="/picnic/colocador.webp"
          alt="Pantalla del colocador en el teléfono"
          pie="La pantalla del colocador. Arranca por lo que hay que rehacer."
          telefono
        />
      </TwoColumnSection>

      {/* ── Cliente ───────────────────────────────────────────── */}
      <TwoColumnSection title="Lo que ve PedidosYa" id="cliente">
        <p className="text-lg">
          Una vista propia, con su marca, donde ven el avance de la etapa y cada
          acreditación con su foto, su fecha y su lugar. El dato duro completo: qué se
          coloca, cuándo y dónde.
        </p>
        <p>
          <strong>Lo único que no ven es quién.</strong> Ni el colocador ni el
          coordinador aparecen en ninguna pantalla de esta vista — y no es un filtro que
          se pueda esquivar, el recorte vive en la base de datos.
        </p>
        <p>
          Pueden <strong>buscar un local</strong> y <strong>descargar informes</strong>.
          Nada más: no aprueban, no comentan y no editan.
        </p>
        <Pantalla
          src="/picnic/cliente.webp"
          alt="Vista del cliente con el avance de la etapa y el buscador de locales"
          pie="La vista de PedidosYa, con su marca, el buscador y la descarga de informes."
        />
      </TwoColumnSection>

      {/* ── Decisiones ────────────────────────────────────────── */}
      <ContentBox title="Lo que necesitamos de ustedes" id="decisiones">
        <p className="text-black/80 text-lg mb-5">
          Nada de esto frena el trabajo de esta semana. Cuanto antes tengan respuesta,
          menos riesgo de mover algo más adelante.
        </p>
        <ul className="space-y-2 text-black/80 text-[15px]">
          <li>
            — <strong>"No quiere o puede perforable"</strong> no está en la lista de once
            motivos, y hoy es de los que más se usan en la operación. ¿Queda afuera a
            propósito, o lo sumamos?
          </li>
          <li>
            — <strong>La clave de una zona:</strong> hoy es una sola para toda la zona, así
            que quien la tiene abre todos sus locales y el sistema no sabe quién entró.
            Dejarla abierta resuelve el vencimiento; ¿querés además una clave por persona?
          </li>
          <li>
            — <strong>El coordinador:</strong> hasta dónde llega su territorio, y si asigna
            él los locales o lo hace Picnic central.
          </li>
          <li>
            — <strong>Rebranding y locales nuevos:</strong> ¿los quieren ver separados en
            los informes, y sobre cuál se factura?
          </li>
          <li>
            — <strong>La casilla a nombre de Picnic</strong>, del tipo
            plataforma@wearepicnic.com, para abrir a su nombre las cuentas de los
            servicios de la plataforma.
          </li>
          <li>
            — <strong>Los colores de Picnic</strong>, para el panel interno. La vista de
            PedidosYa ya lleva los de ellos.
          </li>
        </ul>
      </ContentBox>

      <div className="mb-20 md:mb-28">
        <p className="text-black/60 text-[15px] max-w-2xl">
          Las capturas son de la plataforma en construcción, con los datos de la etapa de
          septiembre. Los nombres de coordinadores y colocadores son de ejemplo hasta que
          nos pasen los suyos.
        </p>
      </div>
    </>
  )
}
