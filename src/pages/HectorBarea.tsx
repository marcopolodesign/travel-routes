import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import BudgetRemainderSection from '../components/BudgetRemainderSection'
import Timeline from '../components/Timeline'
import ScrollReveal from '../components/ScrollReveal'
import ContourLines from '../components/ContourLines'

const ROADMAP_STEPS = [
  {
    label: 'Fase 0',
    items: [
      'Research del rubro: consignatarios, ferias, cómo se compra hacienda hoy',
      'Arquitectura de información y taxonomía de lotes (familia, categoría, atributos zoosanitarios)',
      'Wireframes y diseño visual de la plataforma',
    ],
  },
  {
    label: 'Fase 1',
    items: [
      'Infraestructura, entornos y modelo de datos',
      'Alta de usuario: registro, login, recuperación de contraseña, perfil',
      'Carga de lote multi-paso (admin) con fotos y video',
    ],
  },
  {
    label: 'Fase 2',
    items: [
      'Catálogo: listado, filtros por familia y categoría, ficha de detalle',
      'Interés y oferta privada con condiciones comerciales',
      'Bandeja de ofertas del admin: aceptación, rechazo y notificación por mail',
    ],
  },
  {
    label: 'Fase 3',
    items: [
      'Back office: usuarios, moderación de publicaciones, parametrización, dashboard',
      'Landing institucional y vidriera pública indexable',
      'Formulario "Quiero vender mi lote"',
    ],
  },
  {
    label: 'Fase 4',
    items: [
      'QA end-to-end, ajustes de performance y SEO',
      'Deploy a producción y carga inicial de lotes reales',
      'Acompañamiento de las primeras semanas de operación',
    ],
  },
]

export default function HectorBarea() {
  return (
    <>
      <ContourLines
        lines={13}
        className="w-full h-32 md:h-44 mb-12 md:mb-16 opacity-70"
      />

      <ScrollReveal>
        <ContentBox title="Visión general">
        <p>
          Marketplace especializado en compra y venta de <strong>lotes de ganadería en pie</strong> para
          el mercado argentino. La plataforma encapsula y le da seriedad a una oferta que hoy circula
          suelta: los pedidos llegan por canales informales y se publican bajo el nombre y la curaduría
          del cliente.
        </p>
        <p>
          La demanda es centralizada: <strong>solo el administrador publica lotes</strong>. El comprador
          registrado navega, filtra, marca interés y emite ofertas privadas con condiciones comerciales
          completas. La transacción y el contacto final se cierran fuera de la plataforma.
        </p>
      </ContentBox>

      <TwoColumnSection title="Circuito funcional" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Alta de usuario</strong> — registro, login, recuperación de contraseña y perfil.</li>
          <li><strong>Carga de lote (solo admin)</strong> — publicación multi-paso con atributos zoosanitarios y multimedia (fotos y video).</li>
          <li><strong>Búsqueda y descubrimiento</strong> — listado con filtros por familia y categoría, más ficha de detalle de cada publicación.</li>
          <li><strong>Interés y oferta privada</strong> — el comprador marca "me interesa" y/o emite una oferta formal con precio, plazo, flete, gastos, restricciones y pesada. La oferta no se publica: le llega directo al administrador.</li>
          <li><strong>Gestión de ofertas (admin)</strong> — bandeja de ofertas recibidas, aceptación o rechazo con notificación por mail al comprador.</li>
          <li><strong>Contacto</strong> — aceptada la oferta, las partes cierran por fuera de la plataforma.</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="Módulos incluidos" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Onboarding y cuenta:</strong> registro, login, recuperación de contraseña, perfil de usuario.</li>
          <li><strong>Carga y gestión de lotes (admin):</strong> alta multi-paso con carga de fotos y video.</li>
          <li><strong>Catálogo:</strong> listado con filtros, búsqueda y ficha de detalle de publicación.</li>
          <li><strong>Ofertas:</strong> emisión con condiciones comerciales completas, más bandeja de ofertas enviadas y recibidas con aceptación y rechazo.</li>
          <li><strong>Formulario "Quiero vender mi lote":</strong> captura de contactos de venta para que el administrador los trabaje.</li>
          <li><strong>Notificaciones por mail</strong> en los eventos clave del circuito.</li>
          <li><strong>Landing institucional + vidriera pública</strong> indexable por buscadores.</li>
          <li><strong>Back office de administración:</strong> gestión de usuarios, moderación y curaduría de publicaciones, parametrización y dashboard básico.</li>
          <li><strong>Infraestructura cloud:</strong> entornos de desarrollo, staging y producción, más almacenamiento multimedia.</li>
        </ul>
      </TwoColumnSection>

      <BoxedListSection
        title="Fuera de alcance"
        subtitle="Definido con el cliente. No está cotizado y no forma parte de la entrega."
        items={[
          'Publicación de lotes por parte del usuario — la carga es 100% del administrador.',
          'Validación de CUIT contra ARCA (ex AFIP).',
          'Chat interno entre partes — el contacto se cierra por fuera.',
          'Procesamiento de pagos — la transacción se cierra por fuera.',
          'Integración con WhatsApp — la oferta le llega al cliente por sus canales actuales.',
        ]}
      />

      {/* Roadmap y timeline */}
      <section className="mb-20 md:mb-28">
        <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-8">
          Roadmap y timeline
        </h2>
        <div className="rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-6 md:p-10">
          <Timeline title="Fase 1 — Web (9 a 10 semanas)" steps={ROADMAP_STEPS} />
        </div>
      </section>

      <ContourLines lines={9} variant={1} className="w-full h-24 md:h-32 mb-14 md:mb-20 opacity-60" />

      {/* Opción 1 — Web */}
      <BudgetRemainderSection
        title="Opción 1 — Web (PWA instalable)"
        total={15000}
        items={[
          { name: 'Fase 0 — Research, arquitectura de información y diseño UX/UI', amount: 2500, status: 'pending' },
          { name: 'Onboarding y cuenta de usuario', amount: 1200, status: 'pending' },
          { name: 'Carga y gestión de lotes (admin, multi-paso, fotos y video)', amount: 2300, status: 'pending' },
          { name: 'Catálogo — listado, filtros, búsqueda y ficha de detalle', amount: 2200, status: 'pending' },
          { name: 'Ofertas — emisión con condiciones comerciales y bandeja de gestión', amount: 2600, status: 'pending' },
          { name: 'Formulario "Quiero vender mi lote" + notificaciones por mail', amount: 700, status: 'pending' },
          { name: 'Landing institucional + vidriera pública indexable', amount: 1500, status: 'pending' },
          { name: 'Back office — usuarios, moderación, parametrización y dashboard', amount: 1500, status: 'pending' },
          { name: 'QA, entornos (dev / staging / producción) y deploy', amount: 500, status: 'pending' },
        ]}
      />

      <ContentBox title="Por qué arrancar por web">
        <p>
          La web instalable (PWA) cubre desktop y mobile con un solo desarrollo: el comprador la agrega a
          la pantalla de inicio de su teléfono y la usa como una app, sin pasar por las tiendas de
          aplicaciones. Eso permite <strong>validar el modelo con usuarios reales</strong> — cuántos
          consignatarios se registran, cuántas ofertas efectivas entran — antes de invertir en desarrollo
          nativo.
        </p>
        <p>
          Además la vidriera pública es indexable por buscadores, algo que una app nativa no ofrece: los
          lotes publicados aparecen en Google y traen demanda que hoy no llega.
        </p>
      </ContentBox>

      <ContourLines lines={9} variant={2} className="w-full h-24 md:h-32 mb-14 md:mb-20 opacity-60" />

      {/* Opción 2 — Mobile nativo */}
      <BudgetRemainderSection
        title="Opción 2 — Mobile nativo (iOS + Android) · Fase posterior"
        total={9000}
        items={[
          { name: 'Diseño de interfaz mobile — adaptación a patrones iOS y Android', amount: 1500, status: 'pending' },
          { name: 'App nativa — cuenta, catálogo, filtros y ficha de lote', amount: 3000, status: 'pending' },
          { name: 'Ofertas y bandeja en la app + notificaciones push', amount: 2500, status: 'pending' },
          { name: 'Carga de lotes desde el teléfono (cámara y galería, uso del admin)', amount: 1000, status: 'pending' },
          { name: 'QA en dispositivos + publicación en App Store y Google Play', amount: 1000, status: 'pending' },
        ]}
      />

      <ContentBox title="Cómo se relacionan las dos opciones">
        <p>
          El núcleo de negocio — base de datos, lógica de ofertas, back office y notificaciones — se
          construye una sola vez en la Opción 1 y queda disponible para mobile. Por eso la Opción 2 cotiza
          únicamente el canal nuevo: la app nativa consume el mismo backend ya pago, sin duplicar costos
          de core.
        </p>
        <p>
          La recomendación es contratar la Opción 1, salir a mercado y decidir el nativo con datos de uso
          reales en la mano. Las dos opciones son independientes: se pueden contratar juntas o por
          separado.
        </p>
      </ContentBox>

      <BoxedListSection
        title="Costos recurrentes de terceros"
        subtitle="No están incluidos en el valor de desarrollo. Se contratan a nombre del cliente y se pagan mes a mes según consumo."
        items={[
          'Hosting y base de datos — escala con el volumen de publicaciones y usuarios.',
          'Almacenamiento y entrega de fotos y video (CDN).',
          'Servicio de mail transaccional para las notificaciones.',
          'Dominio y certificado.',
          'Cuentas de desarrollador de App Store y Google Play — solo si se avanza con la Opción 2.',
        ]}
      />

      <BoxedListSection
        title="Puntos a confirmar"
        items={[
          'Taxonomía definitiva de familias y categorías de hacienda, y qué atributos zoosanitarios son obligatorios en la publicación.',
          'Formato del video en la ficha de lote: subida directa o enlace externo.',
          'Alcance del dashboard: qué métricas necesita ver el administrador desde el día uno.',
          'Si el registro de compradores es abierto o requiere aprobación manual del administrador.',
        ]}
      />

      <ContentBox title="Condiciones">
        <p>
          Los valores expresados son <strong>netos, en dólares estadounidenses</strong>, y no incluyen IVA
          ni otros impuestos aplicables. El plazo estimado para la Opción 1 es de <strong>9 a 10
          semanas</strong> desde el inicio de la Fase 0.
        </p>
        <p>
          Los costos recurrentes de infraestructura y servicios de terceros se detallan por separado y no
          forman parte del valor de desarrollo. Cambios de alcance sobre lo definido en este documento se
          cotizan aparte.
        </p>
        </ContentBox>
      </ScrollReveal>
    </>
  )
}
