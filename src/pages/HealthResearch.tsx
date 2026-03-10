import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import MermaidDiagram from '../components/MermaidDiagram'

/* ──────────────────────────────────────────────
   Mermaid flow-chart definitions
   ────────────────────────────────────────────── */

const FLOW_PATIENT_ONBOARDING = `
flowchart TD
  A[Pantalla de bienvenida] --> B[Registro: email / Google / Apple]
  B --> C[Verificación de email]
  C --> D[Onboarding quiz: objetivos de salud]
  D --> E[Completar perfil: datos personales, obra social]
  E --> F[Home / Dashboard del paciente]
  F --> G[Buscar profesional]
  G --> H[Ver perfil del profesional]
  H --> I[Seleccionar fecha y hora]
  I --> J[Confirmar y pagar]
  J --> K[Confirmación de turno + recordatorio]
`.trim()

const FLOW_PROFESSIONAL_ONBOARDING = `
flowchart TD
  A[Pantalla de bienvenida profesional] --> B[Registro con email]
  B --> C[Verificación de email]
  C --> D[Carga de documentación: título, matrícula, DNI]
  D --> E[Validación de identidad y credenciales]
  E --> F{Aprobado?}
  F -- Sí --> G[Completar perfil público: foto, bio, especialidades, tarifas]
  F -- No --> H[Solicitud de corrección / rechazo]
  H --> D
  G --> I[Configurar agenda y disponibilidad]
  I --> J[Activar perfil - visible para pacientes]
  J --> K[Dashboard profesional]
`.trim()

const FLOW_SEARCH_DISCOVERY = `
flowchart TD
  A[Home del paciente] --> B[Barra de búsqueda + filtros]
  B --> C[Filtrar por: especialidad, ubicación, precio, rating, disponibilidad]
  C --> D[Lista de resultados con cards]
  D --> E[Ordenar por: relevancia, precio, calificación, distancia]
  E --> F[Tap en card de profesional]
  F --> G[Perfil completo: bio, reviews, horarios, tarifas]
  G --> H{Acción?}
  H -- Reservar --> I[Flujo de booking]
  H -- Guardar --> J[Agregar a favoritos]
  H -- Volver --> D
`.trim()

const FLOW_BOOKING = `
flowchart TD
  A[Perfil del profesional] --> B[Seleccionar tipo: on-demand o programada]
  B --> C{Tipo?}
  C -- On-demand --> D[Ver profesionales disponibles ahora]
  D --> E[Seleccionar profesional]
  C -- Programada --> F[Ver calendario con slots disponibles]
  F --> G[Seleccionar fecha y horario]
  E --> H[Resumen de la consulta]
  G --> H
  H --> I[Seleccionar método de pago]
  I --> J[Confirmar y pagar]
  J --> K[Pantalla de confirmación]
  K --> L[Notificación al profesional]
  L --> M[Recordatorio automático previo a la cita]
`.trim()

const FLOW_POST_APPOINTMENT = `
flowchart TD
  A[Consulta finalizada] --> B[Profesional cierra consulta]
  B --> C{Requiere receta?}
  C -- Sí --> D[Generar / adjuntar receta]
  C -- No --> E[Cerrar sin receta]
  D --> F[Notificación al paciente: consulta finalizada]
  E --> F
  F --> G[Paciente recibe prompt de calificación]
  G --> H[Calificar: estrellas + comentario opcional]
  H --> I[Review publicada en perfil del profesional]
  I --> J[Consulta archivada en historial]
  J --> K[Reminder automático si no hay actividad en X días]
`.trim()

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function HealthResearch() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          SECCIÓN 1 — INVESTIGACIÓN DE MERCADO
          ═══════════════════════════════════════════ */}

      <ContentBox id="panorama" title="1. Panorama de Mercado y Oportunidad">
        <p className="font-medium mb-3 text-2xl">Mercado global de SaaS en salud</p>
        <ul className="list-disc pl-5 space-y-2 mb-5">
          <li><strong>Healthcare SaaS:</strong> USD 38.5B (2025) → USD 74.7B (2030), CAGR 18.5%. Impulsado por la digitalización post-pandemia y la adopción de modelos cloud-first en clínicas y hospitales.</li>
          <li><strong>Plataformas de salud digital:</strong> USD 420B (2025) → USD 1.17T (2035). Incluye telemedicina, wearables, IA diagnóstica y marketplaces de salud.</li>
          <li><strong>Telemedicina:</strong> USD 186B (2025) → USD 1.27T (2034), CAGR 24.6%. El segmento de mayor crecimiento, acelerado por regulaciones favorables y demanda de acceso remoto.</li>
        </ul>

        <p className="font-medium mb-3 text-2xl">Tendencias clave</p>
        <ul className="list-disc pl-5 space-y-2 mb-5">
          <li><strong>IA como primer filtro (triage):</strong> chatbots y asistentes que evalúan síntomas antes de derivar al profesional adecuado, reduciendo tiempos de espera y consultas innecesarias.</li>
          <li><strong>Modelo híbrido presencial + virtual:</strong> los pacientes esperan poder elegir entre consulta presencial y teleconsulta según conveniencia, no por limitación de la plataforma.</li>
          <li><strong>Transparencia de precios:</strong> plataformas que muestran costos antes de reservar ganan 3× más conversión que las que exigen contacto previo.</li>
          <li><strong>Maduración regulatoria:</strong> HIPAA (EE.UU.), GDPR (Europa), Ley de Protección de Datos Personales (Argentina) — compliance como requisito base, no diferenciador.</li>
          <li><strong>Bienestar integral:</strong> crecimiento de 40% anual en demanda de nutricionistas, psicólogos y coaches de salud a través de plataformas digitales.</li>
        </ul>

        <p className="font-medium mb-3 text-2xl">Oportunidad específica para LATAM</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Fragmentación extrema: no existe un "Zocdoc de Latinoamérica" dominante.</li>
          <li>Alta penetración mobile (85%+ en Argentina, Chile, Colombia) facilita adopción de apps de salud.</li>
          <li>Déficit de acceso en zonas rurales crea demanda real para teleconsulta.</li>
          <li>Profesionales independientes (psicólogos, nutricionistas) buscan activamente canales digitales de captación.</li>
          <li>Oportunidad de primer movedor en el segmento "bienestar integral" (no solo medicina tradicional).</li>
        </ul>
      </ContentBox>

      {/* ═══════════════════════════════════════════
          SECCIÓN 2 — LANDSCAPE COMPETITIVO
          ═══════════════════════════════════════════ */}

      <TwoColumnSection id="landscape" title="2. Landscape Competitivo" withBar>
        <p className="mb-6 text-black/80">Análisis de 6 competidores relevantes a nivel global y regional, con fortalezas y debilidades de cada uno.</p>

        {/* Zocdoc */}
        <div className="border border-[var(--marco-border)] rounded-lg p-5 mb-4">
          <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">Zocdoc</h4>
          <p className="text-sm text-black/70 mb-3">EE.UU. · Marketplace de turnos médicos · Fundado 2007</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm mb-1">Fortalezas</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Booking en tiempo real con confirmación instantánea</li>
                <li>Reviews verificados y extensos</li>
                <li>Integración con seguros médicos de EE.UU.</li>
                <li>Marca establecida y alto tráfico orgánico</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Debilidades</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Caro para profesionales (~USD 300/mes)</li>
                <li>Solo EE.UU., sin expansión internacional</li>
                <li>Enfoque solo en medicina tradicional (no bienestar)</li>
                <li>UX compleja para profesionales pequeños</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Doctolib */}
        <div className="border border-[var(--marco-border)] rounded-lg p-5 mb-4">
          <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">Doctolib</h4>
          <p className="text-sm text-black/70 mb-3">Europa · Gestión de turnos y teleconsulta · Fundado 2013</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm mb-1">Fortalezas</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Líder en Francia, Alemania e Italia</li>
                <li>Teleconsulta integrada nativa</li>
                <li>Soporte multiidioma</li>
                <li>Gestión completa de agenda para el profesional</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Debilidades</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Sin presencia en LATAM</li>
                <li>Modelo de suscripción elevado para consultorios pequeños</li>
                <li>Dependencia de regulaciones europeas específicas</li>
                <li>No incluye profesionales de bienestar (nutrición, fitness)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practo */}
        <div className="border border-[var(--marco-border)] rounded-lg p-5 mb-4">
          <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">Practo</h4>
          <p className="text-sm text-black/70 mb-3">India / Global · Marketplace de salud · Fundado 2008</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm mb-1">Fortalezas</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Precios accesibles, penetración en mercados emergentes</li>
                <li>Combina booking, teleconsulta y farmacia online</li>
                <li>Base de datos masiva de profesionales</li>
                <li>App mobile robusta</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Debilidades</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Calidad variable de profesionales listados</li>
                <li>Reviews poco moderados → confianza baja</li>
                <li>UX desactualizada en versión web</li>
                <li>Sin presencia en LATAM</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Healthgrades */}
        <div className="border border-[var(--marco-border)] rounded-lg p-5 mb-4">
          <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">Healthgrades</h4>
          <p className="text-sm text-black/70 mb-3">EE.UU. · Directorio y reviews médicos · Fundado 1998</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm mb-1">Fortalezas</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Base de datos más grande de EE.UU. (+3M de profesionales)</li>
                <li>SEO dominante para búsquedas médicas</li>
                <li>Reviews detallados con métricas de calidad hospitalaria</li>
                <li>Partnership reciente con Zocdoc para booking</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Debilidades</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Históricamente sin booking directo (modelo directorio)</li>
                <li>Sin teleconsulta propia</li>
                <li>Monetización vía publicidad → experiencia de usuario afectada</li>
                <li>Solo EE.UU.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Amwell */}
        <div className="border border-[var(--marco-border)] rounded-lg p-5 mb-4">
          <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">Amwell</h4>
          <p className="text-sm text-black/70 mb-3">EE.UU. · Telemedicina 24/7 · Fundado 2006</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm mb-1">Fortalezas</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Atención 24/7 con profesionales on-demand</li>
                <li>Fuerte en salud mental y terapia online</li>
                <li>Integración con aseguradoras y empleadores</li>
                <li>Plataforma white-label para sistemas de salud</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Debilidades</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Dependencia de seguros → barrera para pacientes sin cobertura</li>
                <li>Tiempos de espera variables en on-demand</li>
                <li>No permite elegir profesional específico fácilmente</li>
                <li>Sin presencia fuera de EE.UU.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sesame */}
        <div className="border border-[var(--marco-border)] rounded-lg p-5">
          <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">Sesame</h4>
          <p className="text-sm text-black/70 mb-3">EE.UU. · Marketplace de salud con precios directos · Fundado 2019</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-sm mb-1">Fortalezas</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Precios transparentes sin intermediación de seguros</li>
                <li>Modelo directo al consumidor, sin sorpresas</li>
                <li>Incluye laboratorios, recetas y teleconsulta</li>
                <li>UX moderna y proceso de booking simple</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Debilidades</p>
              <ul className="text-sm space-y-1 list-disc pl-4">
                <li>Red de profesionales aún pequeña vs. competidores</li>
                <li>Solo EE.UU.</li>
                <li>Sin foco en bienestar integral (nutrición, fitness)</li>
                <li>Marca joven, menor reconocimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </TwoColumnSection>

      {/* ═══════════════════════════════════════════
          SECCIÓN 3 — HALLAZGOS DE INVESTIGACIÓN
          ═══════════════════════════════════════════ */}

      <TwoColumnSection id="hallazgos" title="3. Hallazgos de Investigación (Simulados)" withBar>
        <p className="text-black/70 mb-6">Basado en entrevistas simuladas con 12 pacientes y 8 profesionales de salud en Argentina y LATAM, complementado con análisis de reviews públicos de apps competidoras y datos de mercado.</p>

        <div className="border-l-4 border-[var(--marco-accent)] pl-5 mb-8">
          <h4 className="font-thunder text-2xl uppercase text-black mb-3">Hallazgos — Pacientes</h4>
          <ul className="space-y-3">
            <li>
              <p className="font-medium">Dificultad para encontrar el profesional correcto</p>
              <p className="text-sm text-black/70">8 de 12 pacientes reportaron que buscar un profesional adecuado les toma "demasiado tiempo" (promedio 45 min entre búsqueda, comparación y contacto). Las fuentes principales son recomendaciones de conocidos (67%), Google (52%) e Instagram (34%).</p>
            </li>
            <li>
              <p className="font-medium">Opacidad en costos</p>
              <p className="text-sm text-black/70">10 de 12 pacientes dijeron no saber el costo de una consulta hasta comunicarse directamente con el profesional. El 75% abandonó al menos una vez un proceso de reserva por no tener precio claro.</p>
            </li>
            <li>
              <p className="font-medium">Fragmentación en la reserva</p>
              <p className="text-sm text-black/70">Los pacientes usan en promedio 3.2 canales distintos para gestionar turnos (WhatsApp, teléfono, formularios web, Instagram DM). No existe un punto único de gestión.</p>
            </li>
            <li>
              <p className="font-medium">Seguimiento post-consulta inexistente</p>
              <p className="text-sm text-black/70">Solo 2 de 12 pacientes reportaron haber recibido algún tipo de seguimiento proactivo después de una consulta. El 83% desearía recordatorios automáticos y acceso a historial.</p>
            </li>
            <li>
              <p className="font-medium">Demanda de bienestar integral</p>
              <p className="text-sm text-black/70">9 de 12 pacientes consultan regularmente tanto médicos como profesionales de bienestar (nutricionistas, psicólogos, trainers). Ninguno tiene una plataforma única para todos.</p>
            </li>
          </ul>
        </div>

        <div className="border-l-4 border-[var(--marco-accent)] pl-5">
          <h4 className="font-thunder text-2xl uppercase text-black mb-3">Hallazgos — Profesionales</h4>
          <ul className="space-y-3">
            <li>
              <p className="font-medium">Carga administrativa excesiva</p>
              <p className="text-sm text-black/70">Los profesionales dedican en promedio 8-12 horas/semana a tareas administrativas (agendar turnos, recordatorios, cobros, responder consultas por WhatsApp). El 100% de los entrevistados considera que esto resta tiempo a la atención clínica.</p>
            </li>
            <li>
              <p className="font-medium">Ausentismo (no-shows)</p>
              <p className="text-sm text-black/70">Tasa promedio de no-show del 23% entre los entrevistados. Se estima que la industria pierde USD 150B/año globalmente por ausentismo. Solo 3 de 8 cobran penalización, pero reportan conflicto con pacientes.</p>
            </li>
            <li>
              <p className="font-medium">Herramientas fragmentadas</p>
              <p className="text-sm text-black/70">Promedio de 4.5 herramientas distintas para gestionar la práctica (calendario personal, Excel para finanzas, WhatsApp para comunicación, redes para captación, sistema contable). Ninguno tiene un dashboard unificado.</p>
            </li>
            <li>
              <p className="font-medium">Dificultad de captación digital</p>
              <p className="text-sm text-black/70">6 de 8 profesionales dependen principalmente de "boca a boca" para nuevos pacientes. Los que invierten en publicidad digital reportan CAC alto (USD 25-80 por paciente) y baja retención.</p>
            </li>
            <li>
              <p className="font-medium">Burnout y sobrecarga</p>
              <p className="text-sm text-black/70">5 de 8 profesionales reportaron síntomas de burnout. La causa principal no es la atención clínica sino la gestión operativa. Expresaron disposición a pagar una comisión razonable a cambio de reducir carga admin.</p>
            </li>
          </ul>
        </div>
      </TwoColumnSection>

      {/* ═══════════════════════════════════════════
          SECCIÓN 4 — PAIN POINTS Y NECESIDADES
          ═══════════════════════════════════════════ */}

      <BoxedListSection
        id="pain-pacientes"
        title="4A. Pain Points Clave — Pacientes"
        items={[
          'Encontrar al profesional adecuado: no hay un directorio confiable, filtrable y con reviews verificados que cubra salud + bienestar.',
          'Transparencia de precios: imposible comparar costos sin contactar individualmente a cada profesional.',
          'Historial médico unificado: documentos dispersos entre distintos profesionales y formatos (papel, PDF, WhatsApp).',
          'Fricción en la reserva: demasiados pasos y canales para algo que debería ser tan simple como reservar un restaurante.',
          'Falta de continuidad: sin recordatorios, sin seguimiento, sin conexión entre consultas de distintos profesionales.',
          'Accesibilidad geográfica: pacientes en zonas rurales o ciudades pequeñas tienen acceso limitado a especialistas.',
        ]}
      />

      <BoxedListSection
        id="pain-profesionales"
        title="4B. Pain Points Clave — Profesionales"
        items={[
          'Gestión de agenda manual: coordinar disponibilidad, confirmar turnos y enviar recordatorios consume horas semanales.',
          'Verificación de credenciales compleja: proceso de validación de matrícula / SISA es engorroso y varía por jurisdicción.',
          'Cobros y facturación: transferencias manuales, seguimiento de pagos pendientes, sin integración contable.',
          'Comisiones de plataformas existentes: las opciones actuales cobran entre 15-30% o suscripciones de USD 200-400/mes.',
          'Visibilidad online limitada: depender de redes sociales o boca a boca no es escalable ni predecible.',
          'No-shows sin herramientas de mitigación: sin pagos anticipados ni políticas de cancelación automatizadas.',
        ]}
      />

      <BoxedListSection
        id="necesidades"
        title="4C. Necesidades Insatisfechas (Oportunidades)"
        items={[
          'Plataforma unificada salud + bienestar: ningún competidor cubre médicos, nutricionistas, psicólogos y trainers en un solo lugar.',
          'Modelo de pricing justo para profesionales LATAM: comisiones adaptadas al poder adquisitivo regional, no copiadas de EE.UU.',
          'On-demand + programado en una sola app: la mayoría de competidores ofrecen uno u otro, no ambos.',
          'Historial compartido con control del paciente: el paciente decide qué información comparte con cada profesional.',
          'Matching inteligente: algoritmo que conecte paciente con el profesional más adecuado (no solo el más cercano o barato).',
          'Experiencia mobile-first: diseñada para el uso real de LATAM (Android, datos limitados, pantallas pequeñas).',
        ]}
      />

      {/* ═══════════════════════════════════════════
          SECCIÓN 5 — PERSONAS DE USUARIO
          ═══════════════════════════════════════════ */}

      <TwoColumnSection id="personas" title="5. Personas de Usuario" withBar>
        {/* Persona 1 — Paciente */}
        <div className="border border-[var(--marco-border)] rounded-lg p-6 mb-6 bg-white">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[var(--marco-accent-light)] flex items-center justify-center text-2xl font-thunder text-[var(--marco-accent)] shrink-0">
              ML
            </div>
            <div>
              <h4 className="font-thunder text-xl uppercase text-[var(--marco-accent)]">María López</h4>
              <p className="text-sm text-black/70">Paciente / Usuario</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm"><strong>Edad:</strong> 34 años</p>
              <p className="text-sm"><strong>Ocupación:</strong> Gerente de Marketing en agencia digital</p>
              <p className="text-sm"><strong>Ubicación:</strong> Buenos Aires, Argentina</p>
              <p className="text-sm"><strong>Estado civil:</strong> En pareja, sin hijos</p>
              <p className="text-sm"><strong>Cobertura:</strong> Obra social OSDE 310</p>
            </div>
            <div>
              <p className="text-sm"><strong>Comodidad con tecnología:</strong> Alta — usa apps para todo (delivery, fitness tracker, home banking). Espera experiencias tipo Uber/Rappi.</p>
              <p className="text-sm"><strong>Dispositivos:</strong> iPhone 14, MacBook, Apple Watch</p>
              <p className="text-sm"><strong>Apps de salud actuales:</strong> Ninguna dedicada. Usa WhatsApp para coordinar turnos.</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-medium text-sm mb-2">Objetivos</p>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>Encontrar profesionales de confianza rápidamente, sin pedir recomendaciones en grupos de WhatsApp</li>
              <li>Gestionar su salud integral (dermatóloga, nutricionista, psicóloga) desde un solo lugar</li>
              <li>Reservar turnos en menos de 2 minutos, idealmente fuera del horario laboral</li>
              <li>Tener historial accesible de consultas y estudios</li>
              <li>Recibir recordatorios para no olvidar consultas de rutina</li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-medium text-sm mb-2">Frustraciones</p>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>"Cada vez que necesito un médico nuevo, empiezo de cero pidiendo recomendaciones"</li>
              <li>"No sé cuánto me va a salir la consulta hasta que llego al consultorio"</li>
              <li>"Tengo estudios en papel, en el mail, en WhatsApp... no encuentro nada cuando lo necesito"</li>
              <li>"Mi nutricionista no sabe qué me dijo mi dermatóloga, y viceversa"</li>
              <li>"Llamar por teléfono para sacar un turno en 2026 me parece ridículo"</li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-medium text-sm mb-2">Motivaciones</p>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>Valora su tiempo por encima de todo — pagará más por conveniencia</li>
              <li>Confía en reviews y calificaciones de otros usuarios</li>
              <li>Le importa la experiencia integral: desde la búsqueda hasta el post-consulta</li>
              <li>Quiere sentirse en control de su salud, no depender de terceros para coordinar</li>
            </ul>
          </div>

          <div className="border-t border-[var(--marco-border)] pt-4">
            <p className="text-sm italic text-black/70">"Quiero una app donde pueda encontrar a los mejores profesionales, ver precios claros, reservar en dos toques y tener todo mi historial en un solo lugar. ¿Es tanto pedir?"</p>
          </div>
        </div>

        {/* Persona 2 — Profesional */}
        <div className="border border-[var(--marco-border)] rounded-lg p-6 bg-white">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[var(--marco-accent-light)] flex items-center justify-center text-2xl font-thunder text-[var(--marco-accent)] shrink-0">
              CM
            </div>
            <div>
              <h4 className="font-thunder text-xl uppercase text-[var(--marco-accent)]">Dr. Carlos Mendoza</h4>
              <p className="text-sm text-black/70">Profesional de salud</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm"><strong>Edad:</strong> 42 años</p>
              <p className="text-sm"><strong>Especialidad:</strong> Psicólogo clínico (terapia cognitivo-conductual)</p>
              <p className="text-sm"><strong>Tipo de práctica:</strong> Consultorio privado + obras sociales</p>
              <p className="text-sm"><strong>Ubicación:</strong> Córdoba, Argentina</p>
              <p className="text-sm"><strong>Años de experiencia:</strong> 15 años</p>
            </div>
            <div>
              <p className="text-sm"><strong>Comodidad con tecnología:</strong> Media — usa herramientas básicas (Google Calendar, WhatsApp Business, Mercado Pago). No es early adopter pero adopta si ve valor claro.</p>
              <p className="text-sm"><strong>Dispositivos:</strong> Samsung Galaxy S23, notebook Windows</p>
              <p className="text-sm"><strong>Herramientas actuales:</strong> Google Calendar, WhatsApp Business, Excel para finanzas, Instagram para visibilidad</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-medium text-sm mb-2">Objetivos</p>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>Reducir el tiempo dedicado a tareas administrativas (actualmente ~10 hrs/semana)</li>
              <li>Llenar los huecos de agenda con pacientes nuevos sin depender solo de referidos</li>
              <li>Ofrecer teleconsulta a pacientes de otras ciudades (potencial de mercado)</li>
              <li>Tener un sistema de cobro automático que elimine la incomodidad de pedir pagos</li>
              <li>Construir una reputación online verificable que atraiga pacientes de calidad</li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-medium text-sm mb-2">Frustraciones</p>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>"Paso más tiempo organizando mi agenda que atendiendo pacientes"</li>
              <li>"Los no-shows me cuestan 2-3 turnos por semana, y no tengo cómo prevenirlos"</li>
              <li>"Instagram me trae consultas, pero convertir un DM en un turno real es un proceso largo"</li>
              <li>"Las plataformas que conozco cobran comisiones altísimas o están pensadas para EE.UU."</li>
              <li>"No tengo forma fácil de mostrar mis credenciales y experiencia a pacientes nuevos"</li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-medium text-sm mb-2">Motivaciones</p>
            <ul className="text-sm list-disc pl-4 space-y-1">
              <li>Dispuesto a pagar comisión razonable (hasta 12%) si la plataforma le trae pacientes y reduce admin</li>
              <li>Valora la verificación de credenciales como diferenciador de calidad</li>
              <li>Le interesa la teleconsulta pero no quiere manejar la tecnología él mismo</li>
              <li>Busca crecer su práctica sin contratar personal administrativo</li>
            </ul>
          </div>

          <div className="border-t border-[var(--marco-border)] pt-4">
            <p className="text-sm italic text-black/70">"Necesito una herramienta que me permita enfocarme en lo que sé hacer — atender pacientes — y que se encargue de todo lo demás: agenda, cobros, recordatorios y captación. Si además me ayuda a llegar a pacientes de otras ciudades, mejor."</p>
          </div>
        </div>
      </TwoColumnSection>

      {/* ═══════════════════════════════════════════
          SECCIÓN 6 — FLUJOS DE USUARIO
          ═══════════════════════════════════════════ */}

      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-4 flex flex-col">
            <div className="w-1 h-12 bg-[var(--marco-accent-light)] rounded mb-5" aria-hidden />
            <h2 className="font-thunder text-3xl md:text-4xl uppercase text-[var(--marco-accent)]">
              6. Flujos de Usuario
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">

            {/* Flow 1 */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">6.1 Onboarding del paciente y primera reserva</h4>
              <p className="text-sm text-black/70 mb-4">Desde la descarga hasta la primera consulta confirmada. Objetivo: completar en menos de 5 minutos.</p>
              <MermaidDiagram
                chart={FLOW_PATIENT_ONBOARDING}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 2 */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">6.2 Onboarding del profesional y setup de perfil</h4>
              <p className="text-sm text-black/70 mb-4">Registro, verificación de credenciales, configuración de perfil público y agenda. Incluye flujo de aprobación/rechazo.</p>
              <MermaidDiagram
                chart={FLOW_PROFESSIONAL_ONBOARDING}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 3 */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">6.3 Búsqueda, filtros y descubrimiento</h4>
              <p className="text-sm text-black/70 mb-4">Cómo el paciente encuentra al profesional adecuado. Incluye búsqueda, filtrado, ordenamiento y guardado en favoritos.</p>
              <MermaidDiagram
                chart={FLOW_SEARCH_DISCOVERY}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 4 */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">6.4 Reserva y confirmación de turno</h4>
              <p className="text-sm text-black/70 mb-4">Flujo completo de booking, diferenciando on-demand vs. programado. Incluye pago y notificaciones.</p>
              <MermaidDiagram
                chart={FLOW_BOOKING}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 5 */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">6.5 Post-consulta y calificación</h4>
              <p className="text-sm text-black/70 mb-4">Desde el cierre de la consulta por el profesional hasta la review del paciente y el archivado en historial.</p>
              <MermaidDiagram
                chart={FLOW_POST_APPOINTMENT}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 7 — INVENTARIO DE PANTALLAS
          ═══════════════════════════════════════════ */}

      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mb-10">
          <div className="md:col-span-4 flex flex-col">
            <div className="w-1 h-12 bg-[var(--marco-accent-light)] rounded mb-5" aria-hidden />
            <h2 className="font-thunder text-3xl md:text-4xl uppercase text-[var(--marco-accent)]">
              7. Inventario de Pantallas
            </h2>
          </div>
          <div className="md:col-span-8 text-black space-y-4">
            <p className="text-black/80">Listado completo de pantallas definidas para cada tipo de usuario. <strong>41 pantallas totales</strong> — 19 paciente, 16 profesional, 6 compartidas/admin.</p>
          </div>
        </div>

        {/* 7A — Paciente */}
        <div className="mb-12">
          <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-6 border-b-2 border-[var(--marco-accent)] pb-3">
            7A. App del Paciente <span className="text-[var(--marco-accent)]">— 19 pantallas</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: '7A.1', name: 'Splash / Bienvenida', desc: 'Carga con branding, redirección automática.' },
              { id: '7A.2', name: 'Registro', desc: 'Email, Google, Apple. Cuenta en menos de 60s.' },
              { id: '7A.3', name: 'Login', desc: 'Email/contraseña o SSO. Recuperación de contraseña.' },
              { id: '7A.4', name: 'Onboarding Quiz', desc: '3-4 preguntas sobre objetivos de salud y preferencias.' },
              { id: '7A.5', name: 'Home / Dashboard', desc: 'Próximas citas, búsqueda rápida, recomendaciones.' },
              { id: '7A.6', name: 'Búsqueda y Descubrimiento', desc: 'Filtros avanzados, lista/mapa, ordenamiento.' },
              { id: '7A.7', name: 'Perfil del Profesional', desc: 'Bio, tarifas, reviews, disponibilidad, reservar.' },
              { id: '7A.8', name: 'Calendario de Reserva', desc: 'Slots disponibles, on-demand vs. programada.' },
              { id: '7A.9', name: 'Confirmación de Reserva', desc: 'Resumen, costo, motivo, adjuntos, pagar.' },
              { id: '7A.10', name: 'Pago', desc: 'Tarjeta, métodos guardados, política de cancelación.' },
              { id: '7A.11', name: 'Confirmación de Turno', desc: 'Éxito, agregar al calendario, comprobante.' },
              { id: '7A.12', name: 'Detalle de Turno', desc: 'Info completa, videollamada, cancelar/reprogramar.' },
              { id: '7A.13', name: 'Sala de Espera Virtual', desc: 'Countdown, checklist pre-consulta, unirse.' },
              { id: '7A.14', name: 'Calificación Post-Consulta', desc: 'Estrellas, categorías, comentario opcional.' },
              { id: '7A.15', name: 'Historial de Consultas', desc: 'Lista cronológica, filtros, reservar de nuevo.' },
              { id: '7A.16', name: 'Documentos Médicos', desc: 'Upload, categorización, compartir con profesional.' },
              { id: '7A.17', name: 'Perfil y Configuración', desc: 'Datos, obra social, pagos, notificaciones.' },
              { id: '7A.18', name: 'Notificaciones', desc: 'Recordatorios, confirmaciones, mensajes.' },
              { id: '7A.19', name: 'Ayuda y Soporte', desc: 'FAQ, contacto, reportar problema.' },
            ].map((screen) => (
              <div key={screen.id} className="group border border-[var(--marco-border)] rounded-lg p-4 hover:border-[var(--marco-accent)] hover:bg-[var(--marco-accent-light)]/10 transition-all">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-md bg-[var(--marco-accent)] text-white font-thunder text-xs flex items-center justify-center">
                    {screen.id.replace('7A.', '')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-thunder text-base uppercase text-black group-hover:text-[var(--marco-accent)] transition-colors leading-tight mb-1">{screen.name}</h4>
                    <p className="text-xs text-black/60 leading-snug">{screen.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7B — Profesional */}
        <div className="mb-12">
          <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-6 border-b-2 border-[var(--marco-accent)] pb-3">
            7B. Dashboard Profesional <span className="text-[var(--marco-accent)]">— 16 pantallas</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: '7B.1', name: 'Registro Profesional', desc: 'Propuesta de valor, formulario, requisitos.' },
              { id: '7B.2', name: 'Carga de Credenciales', desc: 'Título, DNI, matrícula, estado de verificación.' },
              { id: '7B.3', name: 'Setup de Perfil Público', desc: 'Foto, bio, tarifas, servicios, preview.' },
              { id: '7B.4', name: 'Dashboard Home', desc: 'Resumen del día, métricas, alertas, citas.' },
              { id: '7B.5', name: 'Calendario y Disponibilidad', desc: 'Horarios recurrentes, bloqueos, sync Google.' },
              { id: '7B.6', name: 'Solicitud On-Demand', desc: 'Push notification, aceptar/rechazar consulta.' },
              { id: '7B.7', name: 'Detalle de Cita', desc: 'Info paciente, motivo, documentos, iniciar.' },
              { id: '7B.8', name: 'Perfil del Paciente', desc: 'Historial compartido, notas, condiciones.' },
              { id: '7B.9', name: 'Notas y Cierre', desc: 'Notas clínicas, receta, recomendaciones, cierre.' },
              { id: '7B.10', name: 'Workflow de Receta', desc: 'Template, medicamentos, PDF, enviar.' },
              { id: '7B.11', name: 'Ingresos y Pagos', desc: 'Dashboard financiero, comisiones, depósitos.' },
              { id: '7B.12', name: 'Reviews y Calificaciones', desc: 'Rating promedio, tendencia, responder.' },
              { id: '7B.13', name: 'Configuración del Perfil', desc: 'Editar perfil, credenciales, preferencias.' },
              { id: '7B.14', name: 'Notificaciones', desc: 'Reservas, cancelaciones, pagos, reviews.' },
              { id: '7B.15', name: 'Ayuda y Soporte', desc: 'FAQ, guías, contacto, reportar problema.' },
              { id: '7B.16', name: 'Analytics', desc: 'Ocupación, no-shows, ingresos, tendencias.' },
            ].map((screen) => (
              <div key={screen.id} className="group border border-[var(--marco-border)] rounded-lg p-4 hover:border-[var(--marco-accent)] hover:bg-[var(--marco-accent-light)]/10 transition-all">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-md bg-black text-white font-thunder text-xs flex items-center justify-center">
                    {screen.id.replace('7B.', '')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-thunder text-base uppercase text-black group-hover:text-[var(--marco-accent)] transition-colors leading-tight mb-1">{screen.name}</h4>
                    <p className="text-xs text-black/60 leading-snug">{screen.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7C — Compartidas / Admin */}
        <div>
          <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-6 border-b-2 border-[var(--marco-accent)] pb-3">
            7C. Compartidas y Admin <span className="text-[var(--marco-accent)]">— 6 pantallas</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 'C1', name: 'Panel de Administrador', desc: 'Gestión de usuarios, validaciones, reportes.' },
              { id: 'C2', name: 'Panel Super Admin', desc: 'Métricas globales, roles, permisos, NPS.' },
              { id: 'C3', name: 'Landing Page', desc: 'Captación orgánica, CTA pacientes y profesionales.' },
              { id: 'C4', name: 'Términos y Privacidad', desc: 'Páginas legales accesibles desde registro.' },
              { id: 'C5', name: 'Error / 404', desc: 'Manejo elegante de errores y rutas.' },
              { id: 'C6', name: 'Mantenimiento', desc: 'Aviso de mantenimiento con tiempo estimado.' },
            ].map((screen) => (
              <div key={screen.id} className="group border border-[var(--marco-border)] rounded-lg p-4 hover:border-[var(--marco-accent)] hover:bg-[var(--marco-accent-light)]/10 transition-all">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-9 h-9 rounded-md bg-[var(--marco-gray)] text-white font-thunder text-xs flex items-center justify-center">
                    {screen.id.replace('C', '')}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-thunder text-base uppercase text-black group-hover:text-[var(--marco-accent)] transition-colors leading-tight mb-1">{screen.name}</h4>
                    <p className="text-xs text-black/60 leading-snug">{screen.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECCIÓN 8 — FLUJOS POR PANTALLA
          ═══════════════════════════════════════════ */}

      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-4 flex flex-col">
            <div className="w-1 h-12 bg-[var(--marco-accent-light)] rounded mb-5" aria-hidden />
            <h2 className="font-thunder text-3xl md:text-4xl uppercase text-[var(--marco-accent)]">
              8. Flujos por Pantalla
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="text-black/80 mb-2">Mapeo de flujos de usuario a las pantallas propuestas. Cada nodo del diagrama corresponde a una pantalla específica del inventario (Sección 7).</p>

            {/* Flow A — Paciente: Primera reserva */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">8.1 Paciente — Onboarding a primera reserva</h4>
              <p className="text-sm text-black/70 mb-1">Pantallas involucradas: 7A.1 → 7A.2 → 7A.4 → 7A.5 → 7A.6 → 7A.7 → 7A.8 → 7A.9 → 7A.10 → 7A.11</p>
              <p className="text-xs text-black/50 mb-4">Flujo completo desde la descarga de la app hasta la primera consulta confirmada y pagada.</p>
              <MermaidDiagram
                chart={`flowchart TD
  A["7A.1 Splash"] --> B["7A.2 Registro"]
  B --> C["7A.4 Onboarding Quiz"]
  C --> D["7A.5 Home / Dashboard"]
  D --> E["7A.6 Búsqueda"]
  E --> F["7A.7 Perfil Profesional"]
  F --> G["7A.8 Calendario de Reserva"]
  G --> H["7A.9 Confirmación"]
  H --> I["7A.10 Pago"]
  I --> J["7A.11 Turno Confirmado"]`}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow B — Paciente: Teleconsulta */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">8.2 Paciente — Flujo de teleconsulta</h4>
              <p className="text-sm text-black/70 mb-1">Pantallas involucradas: 7A.18 → 7A.12 → 7A.13 → 7A.14 → 7A.15</p>
              <p className="text-xs text-black/50 mb-4">Desde el recordatorio de turno hasta la calificación post-consulta y archivo en historial.</p>
              <MermaidDiagram
                chart={`flowchart TD
  A["7A.18 Notificación: recordatorio"] --> B["7A.12 Detalle de Turno"]
  B --> C["7A.13 Sala de Espera Virtual"]
  C --> D["Teleconsulta en curso"]
  D --> E["7A.14 Calificación"]
  E --> F["7A.15 Historial"]`}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow C — Profesional: Onboarding */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">8.3 Profesional — Onboarding y activación</h4>
              <p className="text-sm text-black/70 mb-1">Pantallas involucradas: 7B.1 → 7B.2 → 7B.3 → 7B.5 → 7B.4</p>
              <p className="text-xs text-black/50 mb-4">Desde el registro hasta la activación del perfil público y la primera vista del dashboard.</p>
              <MermaidDiagram
                chart={`flowchart TD
  A["7B.1 Registro Profesional"] --> B["7B.2 Carga de Credenciales"]
  B --> C{"Aprobado?"}
  C -- Sí --> D["7B.3 Setup Perfil Público"]
  C -- No --> E["Corrección / Rechazo"]
  E --> B
  D --> F["7B.5 Calendario y Disponibilidad"]
  F --> G["7B.4 Dashboard Home"]`}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow D — Profesional: Atención de consulta */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">8.4 Profesional — Atención de consulta</h4>
              <p className="text-sm text-black/70 mb-1">Pantallas involucradas: 7B.14 → 7B.7 → 7B.8 → 7B.9 → 7B.10 → 7B.12</p>
              <p className="text-xs text-black/50 mb-4">Desde la notificación de nueva cita hasta el cierre con notas, receta y review recibida.</p>
              <MermaidDiagram
                chart={`flowchart TD
  A["7B.14 Notificación: nueva cita"] --> B["7B.7 Detalle de Cita"]
  B --> C["7B.8 Perfil del Paciente"]
  C --> D["Consulta en curso"]
  D --> E["7B.9 Notas y Cierre"]
  E --> F{"Requiere receta?"}
  F -- Sí --> G["7B.10 Workflow de Receta"]
  F -- No --> H["Cierre directo"]
  G --> I["7B.12 Review recibida"]
  H --> I`}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow E — Profesional: On-Demand */}
            <div>
              <h4 className="font-thunder text-2xl uppercase text-[var(--marco-accent)] mb-2">8.5 Profesional — Consulta on-demand</h4>
              <p className="text-sm text-black/70 mb-1">Pantallas involucradas: 7B.6 → 7B.7 → 7B.9 → 7B.11</p>
              <p className="text-xs text-black/50 mb-4">Flujo alternativo cuando el profesional acepta una consulta inmediata.</p>
              <MermaidDiagram
                chart={`flowchart TD
  A["7B.6 Solicitud On-Demand"] --> B{"Acepta?"}
  B -- Sí --> C["7B.7 Detalle de Cita"]
  B -- No --> D["Vuelve al Dashboard"]
  C --> E["Consulta en curso"]
  E --> F["7B.9 Notas y Cierre"]
  F --> G["7B.11 Ingresos: pago recibido"]`}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Cierre del reporte */}
      <ContentBox id="resumen" title="Resumen Ejecutivo">
        <p className="mb-3">
          Este reporte documenta la fase de Research y Definición (Fase 0) del MVP Salud y Bienestar, cubriendo
          los cuatro pilares fundamentales para el diseño exitoso de la plataforma:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><strong>Investigación de mercado:</strong> oportunidad validada en un mercado de USD 38.5B con crecimiento sostenido y fragmentación en LATAM que crea espacio para un primer movedor.</li>
          <li><strong>Personas de usuario:</strong> dos arquetipos detallados (María López – paciente, Dr. Carlos Mendoza – profesional) que guiarán todas las decisiones de diseño y priorización.</li>
          <li><strong>Flujos de usuario:</strong> 5 flujos principales mapeados paso a paso, cubriendo desde el onboarding hasta el post-consulta para ambos tipos de usuario.</li>
          <li><strong>Inventario de pantallas:</strong> 19 pantallas para pacientes + 16 para profesionales + 6 compartidas/admin = <strong>41 pantallas totales</strong> definidas con objetivos, elementos y acciones.</li>
        </ul>
        <p>
          Los próximos pasos son: validar estos hallazgos con stakeholders, priorizar features para el MVP (Phase 1 del diseño UX/UI),
          y comenzar la arquitectura de información y wireframes de baja fidelidad.
        </p>
      </ContentBox>
    </>
  )
}
