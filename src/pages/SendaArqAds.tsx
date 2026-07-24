import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import MarcopoloLogo from '../components/MarcopoloLogo'

export default function SendaArqAds() {
  return (
    <>
      {/* Cover */}
      <div className="mb-20 md:mb-32">
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance">
          Senda<br />Arquitectura
        </h1>
        <div className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black mt-4 md:mt-6">
          Meta Ads + Google Ads — Gestión mensual
        </div>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-xl">
          Pauta paga en Instagram, Facebook y Google Search para generar consultas calificadas
          por WhatsApp — portfolio real como creatividad, intención de búsqueda como captación.
        </p>
        <hr className="mt-10 md:mt-14 border-t border-[var(--marco-border)]" />
      </div>

      <BoxedListSection
        title="Objetivos"
        items={[
          'Generar consultas calificadas por WhatsApp para nuevos proyectos (residencial, comercial, paisajismo, interiores).',
          'Capturar la demanda que ya está buscando activamente un estudio de arquitectura, vía Google Search.',
          'Construir marca y mostrar el portfolio real de obras frente a audiencias que todavía no saben que necesitan un arquitecto, vía Meta.',
          'Medir costo por conversación real cada mes — no solo alcance o clics — y optimizar la pauta en base a eso.',
        ]}
      />

      <ContentBox title="Visión general">
        <p>
          Las dos plataformas cubren etapas distintas del mismo recorrido. <strong>Meta</strong>{' '}
          (Instagram + Facebook) trabaja la parte alta del embudo: alcanza a gente que no está
          buscando un arquitecto todavía, pero que se detiene ante una obra bien mostrada —
          renders de Ambientar, fotos reales de proyectos entregados — y la acerca a WhatsApp.{' '}
          <strong>Google Search</strong> trabaja la parte baja: intercepta a quien ya está
          escribiendo "arquitecto en [zona]" o "estudio de arquitectura" en el buscador, con
          intención de compra mucho más alta.
        </p>
        <p>
          A diferencia de un curso o producto de ticket bajo, el ciclo de decisión acá es largo
          y el volumen de consultas mensuales esperado es bajo — la campaña se diseña para
          calidad de conversación, no para cantidad de clics.
        </p>
      </ContentBox>

      <div className="mb-10 md:mb-14">
        <span className="text-xs uppercase tracking-wide text-black/50">Qué incluye cada plataforma</span>
      </div>

      <TwoColumnSection title="Meta Ads — Instagram & Facebook">
        <ul className="list-disc pl-5 space-y-2">
          <li>Alta de Business Manager, Página de Facebook y cuenta de anuncios para Senda Arquitectura</li>
          <li>Instalación de Meta Pixel + Conversions API en senda-arq.com para medir conversación real, no solo clic</li>
          <li>
            3 campañas para los primeros 3–4 meses:
            <ul className="list-[circle] pl-5 mt-2 space-y-1.5">
              <li><strong>Awareness</strong> — alcance masivo en Buenos Aires, foco en diseño/arquitectura, objetivo de seguidores y visibilidad de marca</li>
              <li><strong>Reformas / ticket bajo</strong> — landing page específica + formulario/WhatsApp, segmentada a quienes ya están haciendo obra hoy (reformas activas)</li>
              <li><strong>Casa nueva</strong> — video UGC antes/después con los dueños contando el proceso, formato testimonio</li>
            </ul>
          </li>
          <li>Creatividades: video UGC como pieza clave (antes/después + dueños hablando), sumado a renders de Ambientar y fotos reales de proyectos — no stock genérico</li>
          <li>Segmentación geográfica (zona de cobertura del estudio) + intereses de arquitectura, diseño y remodelación</li>
          <li>Reporte mensual: costo por conversación, alcance, qué obra generó más interés</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="Google Ads — Search">
        <ul className="list-disc pl-5 space-y-2">
          <li>Alta de cuenta de Google Ads para Senda Arquitectura</li>
          <li>Google Tag + conversión configurada sobre el clic a WhatsApp (y envío del formulario de Contacto como conversión secundaria)</li>
          <li>Campaña de Búsqueda con keywords de alta intención: "arquitecto [zona]", "estudio de arquitectura", "remodelación de casa", etc.</li>
          <li>Página de Contacto ajustada para tráfico pago — WhatsApp con mensaje pre-cargado, sin fricción de formulario largo</li>
          <li>Reporte mensual: costo por clic, costo por conversación, términos de búsqueda que mejor convierten</li>
        </ul>
      </TwoColumnSection>

      <BoxedListSection
        title="Setup inicial (una sola vez)"
        subtitle="Antes de poder lanzar cualquier campaña, hay que crear la infraestructura de ambas cuentas — hoy Senda Arquitectura no tiene ninguna de las dos."
        items={[
          'Alta de Business Manager + Página de Facebook + cuenta de anuncios de Meta (requiere verificación y medio de pago del cliente)',
          'Alta de cuenta de Google Ads (requiere medio de pago del cliente)',
          'Instalación de Meta Pixel + CAPI + Google Tag en el sitio',
          'Ajuste de la página de Contacto para tráfico pago, con WhatsApp pre-cargado',
          'Primera tanda de creatividades (2 variantes) y primer set de keywords',
        ]}
      />

      <div className="mb-20 md:mb-28">
        <Timeline
          title="Timeline"
          steps={[
            {
              label: 'Semana 1',
              items: [
                'Alta de Business Manager y cuenta de Google Ads (requiere acción del cliente: verificación + medio de pago)',
                'Instalación de Pixel, CAPI y Google Tag',
                'Definición de zona de cobertura, keywords y primeras creatividades',
              ],
            },
            {
              label: 'Semana 2',
              items: [
                'Lanzamiento de campaña de Meta (Conversaciones WhatsApp)',
                'Lanzamiento de campaña de Google Search',
                'Ajuste de página de Contacto para tráfico pago',
              ],
            },
            {
              label: 'Mensual (recurrente)',
              items: [
                'Optimización de presupuesto entre campañas y creatividades',
                'Reporte mensual: costo por conversación, obras/keywords con mejor desempeño',
                'Rotación de creatividades e iteración de keywords',
              ],
            },
          ]}
        />
      </div>

      <ContentBox title="Inversión">
        <div className="flex flex-col gap-6 mb-6">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/60">Setup inicial (única vez)</span>
            <p className="font-thunder text-3xl md:text-5xl text-[var(--marco-accent)] mt-1">U$500</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/60">Gestión mensual — Meta Ads (3 campañas)</span>
            <p className="font-thunder text-3xl md:text-5xl text-black mt-1">U$500 / mes</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/60">+ Si se suma Google Ads</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">+ U$200 / mes <span className="text-black/50 text-lg">(U$700 / mes total)</span></p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/60">Presupuesto de pauta recomendado</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">U$200 – U$300 / mes <span className="text-black/50 text-lg">para arrancar</span></p>
            <p className="text-sm text-black/60 mt-1">Escala a U$500/mes según performance. Se paga directo a Meta y Google, no está incluido en la gestión.</p>
          </div>
        </div>
        <p>
          La gestión mensual arranca por Meta — mejor para captar el perfil pasivo de
          diseño/arquitectura — durante los primeros 2–3 meses, con reporte mensual de costo por
          conversación y qué obra generó más interés. Google Search captura intención activa
          ("arquitectos en Pilar") y necesita menos optimización continua, por eso se suma después
          en vez de encarecer el arranque con ambas plataformas desde el día uno (+U$200/mes).
        </p>
        <p>
          <strong>Compromiso mínimo de 6 meses.</strong> Con el volumen de consultas esperado para
          un estudio de arquitectura (bajo, de ticket alto), los primeros 1-2 meses son de
          aprendizaje del algoritmo y no alcanzan para medir bien indicadores como CAC (costo de
          adquisición) o CPC — recién con 6 meses de datos se puede optimizar la pauta con
          confianza en vez de estar reaccionando a ruido estadístico.
        </p>
        <p>
          <strong>Forma de pago:</strong> mensual, por adelantado — del 1 al 5 de cada mes.
        </p>
      </ContentBox>

      <ContentBox title="Métricas, conversión y CRM">
        <p>
          Con ticket alto, el embudo es angosto por diseño: de <strong>2.000 interacciones</strong>,
          unas <strong>200 escriben</strong>, <strong>20 quedan interesadas</strong> y{' '}
          <strong>1 convierte</strong> (1–5%). Una sola conversión cubre la inversión publicitaria
          del año — el ciclo de nurturing en este tipo de producto puede ser de <strong>1 a 2
          años</strong>, así que el valor está en no perder ningún contacto en el camino, no en el
          volumen de clics del mes.
        </p>
        <p>Herramientas de seguimiento incluidas en la gestión, sin costo adicional:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Dashboard de fuente de leads (Meta, Google, WhatsApp, referidos)</li>
          <li>Pipeline de estado de cada cliente: contactado / interesado / por cerrar / convertido</li>
          <li>Datos de conversión enviados de vuelta a Meta para que el algoritmo optimice sobre audiencias que realmente convierten, no solo clics</li>
        </ul>
        <p className="text-sm text-black/60 pt-2">
          En desarrollo: agente conversacional que reemplaza el formulario de contacto por preguntas
          automáticas integradas al sistema, para calificar leads sin fricción.
        </p>
      </ContentBox>

      <BoxedListSection
        title="Redes sociales — Add-on opcional"
        subtitle="Recomendado antes de lanzar campañas: Instagram necesita algo de actividad orgánica de base. No forma parte de la gestión de pauta — se cotiza y factura aparte, U$750/mes con motor de IA."
        items={[
          'Calendario de contenido mensual (mismo pipeline ya construido en senda-website: tagging de imágenes + generación de calendario)',
          'Piezas de Instagram/Stories usando renders de Ambientar como contenido diferencial',
          'Publicación y programación mensual',
          'Reporte mensual de alcance y engagement',
        ]}
      />

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
