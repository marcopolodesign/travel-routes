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

      <ContentBox title="1. Panorama de Mercado y Oportunidad">
        <p className="font-medium mb-3 text-lg">Mercado global de SaaS en salud</p>
        <ul className="list-disc pl-5 space-y-2 mb-5">
          <li><strong>Healthcare SaaS:</strong> USD 38.5B (2025) → USD 74.7B (2030), CAGR 18.5%. Impulsado por la digitalización post-pandemia y la adopción de modelos cloud-first en clínicas y hospitales.</li>
          <li><strong>Plataformas de salud digital:</strong> USD 420B (2025) → USD 1.17T (2035). Incluye telemedicina, wearables, IA diagnóstica y marketplaces de salud.</li>
          <li><strong>Telemedicina:</strong> USD 186B (2025) → USD 1.27T (2034), CAGR 24.6%. El segmento de mayor crecimiento, acelerado por regulaciones favorables y demanda de acceso remoto.</li>
        </ul>

        <p className="font-medium mb-3 text-lg">Tendencias clave</p>
        <ul className="list-disc pl-5 space-y-2 mb-5">
          <li><strong>IA como primer filtro (triage):</strong> chatbots y asistentes que evalúan síntomas antes de derivar al profesional adecuado, reduciendo tiempos de espera y consultas innecesarias.</li>
          <li><strong>Modelo híbrido presencial + virtual:</strong> los pacientes esperan poder elegir entre consulta presencial y teleconsulta según conveniencia, no por limitación de la plataforma.</li>
          <li><strong>Transparencia de precios:</strong> plataformas que muestran costos antes de reservar ganan 3× más conversión que las que exigen contacto previo.</li>
          <li><strong>Maduración regulatoria:</strong> HIPAA (EE.UU.), GDPR (Europa), Ley de Protección de Datos Personales (Argentina) — compliance como requisito base, no diferenciador.</li>
          <li><strong>Bienestar integral:</strong> crecimiento de 40% anual en demanda de nutricionistas, psicólogos y coaches de salud a través de plataformas digitales.</li>
        </ul>

        <p className="font-medium mb-3 text-lg">Oportunidad específica para LATAM</p>
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

      <TwoColumnSection title="2. Landscape Competitivo" withBar>
        <p className="mb-6 text-black/80">Análisis de 6 competidores relevantes a nivel global y regional, con fortalezas y debilidades de cada uno.</p>

        {/* Zocdoc */}
        <div className="border border-[var(--marco-border)] rounded-lg p-5 mb-4">
          <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">Zocdoc</h4>
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
          <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">Doctolib</h4>
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
          <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">Practo</h4>
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
          <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">Healthgrades</h4>
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
          <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">Amwell</h4>
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
          <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">Sesame</h4>
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

      <TwoColumnSection title="3. Hallazgos de Investigación (Simulados)" withBar>
        <p className="text-black/70 mb-6">Basado en entrevistas simuladas con 12 pacientes y 8 profesionales de salud en Argentina y LATAM, complementado con análisis de reviews públicos de apps competidoras y datos de mercado.</p>

        <div className="border-l-4 border-[var(--marco-accent)] pl-5 mb-8">
          <h4 className="font-thunder text-lg uppercase text-black mb-3">Hallazgos — Pacientes</h4>
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
          <h4 className="font-thunder text-lg uppercase text-black mb-3">Hallazgos — Profesionales</h4>
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

      <TwoColumnSection title="5. Personas de Usuario" withBar>
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
            <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)]">
              6. Flujos de Usuario
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">

            {/* Flow 1 */}
            <div>
              <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">6.1 Onboarding del paciente y primera reserva</h4>
              <p className="text-sm text-black/70 mb-4">Desde la descarga hasta la primera consulta confirmada. Objetivo: completar en menos de 5 minutos.</p>
              <MermaidDiagram
                chart={FLOW_PATIENT_ONBOARDING}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 2 */}
            <div>
              <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">6.2 Onboarding del profesional y setup de perfil</h4>
              <p className="text-sm text-black/70 mb-4">Registro, verificación de credenciales, configuración de perfil público y agenda. Incluye flujo de aprobación/rechazo.</p>
              <MermaidDiagram
                chart={FLOW_PROFESSIONAL_ONBOARDING}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 3 */}
            <div>
              <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">6.3 Búsqueda, filtros y descubrimiento</h4>
              <p className="text-sm text-black/70 mb-4">Cómo el paciente encuentra al profesional adecuado. Incluye búsqueda, filtrado, ordenamiento y guardado en favoritos.</p>
              <MermaidDiagram
                chart={FLOW_SEARCH_DISCOVERY}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 4 */}
            <div>
              <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">6.4 Reserva y confirmación de turno</h4>
              <p className="text-sm text-black/70 mb-4">Flujo completo de booking, diferenciando on-demand vs. programado. Incluye pago y notificaciones.</p>
              <MermaidDiagram
                chart={FLOW_BOOKING}
                className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-4"
              />
            </div>

            {/* Flow 5 */}
            <div>
              <h4 className="font-thunder text-lg uppercase text-[var(--marco-accent)] mb-2">6.5 Post-consulta y calificación</h4>
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
          SECCIÓN 7 — DEFINICIÓN DE PANTALLAS
          ═══════════════════════════════════════════ */}

      <TwoColumnSection title="7A. Pantallas — App del Paciente" withBar>
        <div className="space-y-4">

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.1 Splash / Bienvenida</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Primera impresión y acceso rápido</p>
            <p className="text-sm mb-2">Pantalla de carga con branding de la plataforma. Redirige automáticamente al login o al home si ya hay sesión activa.</p>
            <p className="text-sm"><strong>Elementos:</strong> Logo animado, indicador de carga, redirección automática.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.2 Registro</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Crear cuenta en menos de 60 segundos</p>
            <p className="text-sm mb-2">Registro simplificado con opciones de email, Google y Apple. Mínimos campos requeridos para empezar.</p>
            <p className="text-sm"><strong>Elementos:</strong> Formulario (nombre, email, contraseña), botones SSO (Google, Apple), link a login, términos y condiciones.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.3 Login</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Acceder a la cuenta rápidamente</p>
            <p className="text-sm mb-2">Login con email/contraseña o SSO. Incluye recuperación de contraseña.</p>
            <p className="text-sm"><strong>Elementos:</strong> Formulario (email, contraseña), botones SSO, "Olvidé mi contraseña", link a registro.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.4 Onboarding Quiz</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Personalizar la experiencia desde el inicio</p>
            <p className="text-sm mb-2">3-4 preguntas rápidas sobre objetivos de salud, tipos de profesionales de interés y preferencias (presencial vs. virtual). Permite saltar.</p>
            <p className="text-sm"><strong>Elementos:</strong> Preguntas tipo card swipe, barra de progreso, botón "Saltar", selección múltiple, CTA "Empezar".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.5 Home / Dashboard</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Hub central con acceso rápido a todas las acciones</p>
            <p className="text-sm mb-2">Pantalla principal post-login. Muestra próximas citas, profesionales recomendados, acciones rápidas y alertas.</p>
            <p className="text-sm"><strong>Elementos:</strong> Saludo personalizado, próxima cita (card), barra de búsqueda, categorías de profesionales (horizontal scroll), profesionales recomendados, banner de recordatorio si no hay citas programadas.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.6 Búsqueda y Descubrimiento</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Encontrar al profesional adecuado en menos de 2 minutos</p>
            <p className="text-sm mb-2">Pantalla de búsqueda con filtros avanzados, resultados en lista o mapa, y ordenamiento.</p>
            <p className="text-sm"><strong>Elementos:</strong> Barra de búsqueda, filtros (especialidad, ubicación, precio, rating, disponibilidad, modalidad), toggle lista/mapa, cards de resultados (foto, nombre, especialidad, rating, precio, disponibilidad), ordenamiento (relevancia, precio, rating, distancia).</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.7 Perfil del Profesional</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Evaluar al profesional y decidir si reservar</p>
            <p className="text-sm mb-2">Perfil completo del profesional con toda la información necesaria para tomar una decisión.</p>
            <p className="text-sm"><strong>Elementos:</strong> Foto, nombre, especialidad, badge de verificación, bio, formación y experiencia, tarifas, modalidades (presencial/virtual), ubicación con mapa, reviews y calificaciones, horarios disponibles (preview), botón "Reservar turno", botón "Guardar en favoritos".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.8 Calendario de Reserva</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Seleccionar fecha y hora de consulta</p>
            <p className="text-sm mb-2">Vista de calendario con slots disponibles del profesional seleccionado. Diferencia consulta programada vs. on-demand.</p>
            <p className="text-sm"><strong>Elementos:</strong> Calendario mensual/semanal, slots disponibles por día, toggle presencial/virtual, selección de duración (si aplica), resumen de selección, botón "Continuar".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.9 Confirmación de Reserva</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Revisar y confirmar los detalles antes de pagar</p>
            <p className="text-sm mb-2">Resumen completo de la cita antes del pago. Última oportunidad de modificar.</p>
            <p className="text-sm"><strong>Elementos:</strong> Resumen (profesional, fecha, hora, modalidad, duración), costo desglosado, motivo de consulta (campo de texto), adjuntar estudios previos (opcional), botón "Modificar", botón "Confirmar y pagar".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.10 Pago</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Completar el pago de forma segura</p>
            <p className="text-sm mb-2">Pantalla de pago con tarjeta de crédito. Incluye resumen del monto y datos de seguridad.</p>
            <p className="text-sm"><strong>Elementos:</strong> Monto total, formulario de tarjeta (o tarjetas guardadas), selección de método de pago, checkbox de política de cancelación, botón "Pagar", indicador de seguridad (SSL/encriptación).</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.11 Confirmación de Turno</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Confirmar que la reserva fue exitosa</p>
            <p className="text-sm mb-2">Pantalla de éxito post-pago con todos los detalles de la cita y acciones de seguimiento.</p>
            <p className="text-sm"><strong>Elementos:</strong> Checkmark de éxito, resumen completo de la cita, "Agregar al calendario" (integración), comprobante de pago, botón "Ver mis turnos", botón "Volver al inicio".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.12 Detalle de Turno</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Ver información completa de una cita futura o pasada</p>
            <p className="text-sm mb-2">Vista detallada de un turno específico con opciones de gestión.</p>
            <p className="text-sm"><strong>Elementos:</strong> Info del profesional, fecha/hora/modalidad, link de videollamada (si virtual), motivo de consulta, estudios adjuntos, estado (confirmado/completado/cancelado), botón "Cancelar turno" (con política), botón "Reprogramar", notas post-consulta (si completado).</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.13 Sala de Espera Virtual</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Preparar y acceder a la teleconsulta</p>
            <p className="text-sm mb-2">Pantalla previa a la teleconsulta. Muestra cuenta regresiva y link de acceso.</p>
            <p className="text-sm"><strong>Elementos:</strong> Countdown al inicio, info del profesional, link externo de videollamada (configurable por admin), checklist pre-consulta (cámara, micrófono), botón "Unirse a la consulta".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.14 Calificación Post-Consulta</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Evaluar la experiencia para ayudar a otros pacientes</p>
            <p className="text-sm mb-2">Formulario de review presentado después de cada consulta completada.</p>
            <p className="text-sm"><strong>Elementos:</strong> Rating por estrellas (1-5), categorías (puntualidad, profesionalismo, claridad, trato), comentario escrito (opcional), toggle "Publicar como anónimo", botón "Enviar calificación", botón "Calificar después".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.15 Historial de Consultas</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Acceder al historial completo de atención</p>
            <p className="text-sm mb-2">Lista cronológica de todas las consultas pasadas con filtros y acceso a detalles.</p>
            <p className="text-sm"><strong>Elementos:</strong> Lista de consultas (fecha, profesional, especialidad, estado), filtros (por profesional, por fecha, por tipo), acceso a notas y recetas, botón "Reservar de nuevo" en cada entrada.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.16 Documentos Médicos</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Centralizar y gestionar documentación de salud</p>
            <p className="text-sm mb-2">Repositorio de estudios, análisis y documentos médicos subidos por el paciente.</p>
            <p className="text-sm"><strong>Elementos:</strong> Lista de documentos (nombre, fecha, tipo), upload de archivos (PDF), preview de documentos, categorización (análisis, estudios, recetas, otros), compartir con profesional específico, eliminar documentos.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.17 Perfil y Configuración</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Gestionar cuenta y preferencias</p>
            <p className="text-sm mb-2">Configuración de la cuenta del paciente, datos personales y preferencias.</p>
            <p className="text-sm"><strong>Elementos:</strong> Datos personales (editar), foto de perfil, obra social / seguro (editar), métodos de pago guardados, preferencias de notificaciones, idioma, profesionales favoritos, política de cancelación, cerrar sesión, eliminar cuenta.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.18 Notificaciones</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Mantener al paciente informado y engaged</p>
            <p className="text-sm mb-2">Centro de notificaciones con alertas de turnos, recordatorios y novedades.</p>
            <p className="text-sm"><strong>Elementos:</strong> Lista de notificaciones (ordenadas por fecha), tipos: recordatorio de turno, confirmación de reserva, review pendiente, recordatorio de inactividad, mensaje del profesional. Marcar como leída, acceso directo a la acción correspondiente.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7A.19 Ayuda y Soporte</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Paciente · Objetivo: Resolver dudas y problemas rápidamente</p>
            <p className="text-sm mb-2">Centro de ayuda con FAQ, contacto y reporte de problemas.</p>
            <p className="text-sm"><strong>Elementos:</strong> FAQ categorizado, barra de búsqueda, formulario de contacto, chat de soporte (si disponible), reportar un problema con turno/profesional.</p>
          </div>

        </div>
      </TwoColumnSection>

      <TwoColumnSection title="7B. Pantallas — Dashboard Profesional" withBar>
        <div className="space-y-4">

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.1 Bienvenida / Registro Profesional</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Iniciar el proceso de alta en la plataforma</p>
            <p className="text-sm mb-2">Pantalla de registro específica para profesionales con información sobre beneficios de la plataforma.</p>
            <p className="text-sm"><strong>Elementos:</strong> Propuesta de valor para profesionales, formulario de registro (nombre, email, especialidad), requisitos de documentación, botón "Comenzar registro".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.2 Carga de Credenciales</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Verificar identidad y habilitación profesional</p>
            <p className="text-sm mb-2">Formulario de carga de documentación requerida para validación.</p>
            <p className="text-sm"><strong>Elementos:</strong> Upload de título profesional (foto/PDF), upload de DNI/identificación, número de matrícula / registro SISA, selección de especialidad(es), barra de progreso de verificación, estado de cada documento (pendiente/aprobado/rechazado).</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.3 Setup de Perfil Público</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Crear un perfil atractivo para captar pacientes</p>
            <p className="text-sm mb-2">Configuración del perfil visible para pacientes. Preview en tiempo real.</p>
            <p className="text-sm"><strong>Elementos:</strong> Foto profesional (upload + crop), bio/descripción, formación académica, experiencia, especialidades y servicios ofrecidos, tarifas por tipo de consulta, modalidades (presencial/virtual), dirección del consultorio (si aplica), preview del perfil público, botón "Publicar perfil".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.4 Dashboard Home</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Vista general del día y métricas clave</p>
            <p className="text-sm mb-2">Panel principal con resumen del día, próximas citas, métricas rápidas y alertas.</p>
            <p className="text-sm"><strong>Elementos:</strong> Resumen del día (citas confirmadas, pendientes), próximas citas (lista), métricas rápidas (ingresos del mes, rating promedio, total pacientes), solicitudes on-demand pendientes (si aplica), alertas y notificaciones recientes, acceso rápido a calendario y perfil.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.5 Calendario y Disponibilidad</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Gestionar agenda y definir horarios de atención</p>
            <p className="text-sm mb-2">Calendario completo con gestión de slots, horarios recurrentes y bloqueos.</p>
            <p className="text-sm"><strong>Elementos:</strong> Vista semanal/mensual del calendario, configuración de horarios recurrentes (ej. lunes a viernes 9-18), bloquear horarios específicos, ver citas confirmadas/pendientes, duración de consulta por defecto, tiempo entre consultas (buffer), sincronización con Google Calendar (opcional).</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.6 Solicitud On-Demand</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Recibir y aceptar/rechazar consultas inmediatas</p>
            <p className="text-sm mb-2">Pantalla de notificación para consultas on-demand cuando el profesional está disponible.</p>
            <p className="text-sm"><strong>Elementos:</strong> Notificación push/in-app, info del paciente (nombre, motivo breve), countdown para aceptar, botón "Aceptar consulta", botón "Rechazar", historial de solicitudes on-demand.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.7 Detalle de Cita</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Ver toda la información de una cita específica</p>
            <p className="text-sm mb-2">Vista completa de una cita con información del paciente, motivo y documentos.</p>
            <p className="text-sm"><strong>Elementos:</strong> Info del paciente (nombre, edad, historial en plataforma), motivo de consulta, estudios adjuntos por el paciente, fecha/hora/modalidad, link de videollamada, notas de consultas anteriores con ese paciente, botón "Iniciar consulta", botón "Cancelar/Reprogramar".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.8 Perfil del Paciente (Vista Profesional)</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Acceder al historial del paciente para mejor atención</p>
            <p className="text-sm mb-2">Vista del historial del paciente dentro de la plataforma (solo lo compartido por el paciente).</p>
            <p className="text-sm"><strong>Elementos:</strong> Datos básicos del paciente, historial de consultas previas (con este profesional), documentos compartidos por el paciente, notas de consultas anteriores, alergias o condiciones relevantes (si el paciente las cargó).</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.9 Notas y Cierre de Consulta</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Documentar la consulta y cerrar formalmente</p>
            <p className="text-sm mb-2">Formulario post-consulta para notas clínicas y cierre formal. Campo obligatorio de receta.</p>
            <p className="text-sm"><strong>Elementos:</strong> Campo de notas clínicas (texto libre), toggle "Requiere receta" / "No requiere receta", adjuntar receta (si aplica), recomendaciones al paciente, sugerir próxima consulta (fecha), validación biométrica (Face ID) para confirmar cierre, botón "Cerrar consulta".</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.10 Workflow de Receta</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Generar y enviar receta al paciente</p>
            <p className="text-sm mb-2">Flujo de generación de receta post-consulta (nice to have en MVP, puede ser adjunto manual).</p>
            <p className="text-sm"><strong>Elementos:</strong> Template de receta, campos (medicamento, dosis, frecuencia, duración), preview de receta, adjuntar como PDF, enviar al paciente, guardar en historial.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.11 Ingresos y Pagos</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Visualizar ingresos y gestionar cobros</p>
            <p className="text-sm mb-2">Dashboard financiero con ingresos, pagos pendientes y configuración de cobros.</p>
            <p className="text-sm"><strong>Elementos:</strong> Resumen de ingresos (semanal/mensual/anual), gráfico de ingresos en el tiempo, detalle por consulta (fecha, paciente, monto, comisión, neto), estado de pagos (depositado/pendiente), configuración de cuenta bancaria para depósitos, historial de transferencias.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.12 Reviews y Calificaciones</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Monitorear reputación y feedback</p>
            <p className="text-sm mb-2">Vista de todas las calificaciones recibidas con métricas agregadas.</p>
            <p className="text-sm"><strong>Elementos:</strong> Rating promedio general, rating por categoría (puntualidad, profesionalismo, etc.), lista de reviews (con fecha y texto), tendencia del rating en el tiempo, responder a reviews (opcional), reportar review inapropiado.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.13 Configuración del Perfil</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Actualizar información profesional y configuración</p>
            <p className="text-sm mb-2">Edición del perfil público, configuración de la cuenta y preferencias operativas.</p>
            <p className="text-sm"><strong>Elementos:</strong> Editar perfil público (bio, foto, tarifas, servicios), actualizar credenciales, configuración de notificaciones, preferencias de consulta (duración, buffer, on-demand sí/no), datos fiscales, cambiar contraseña, cerrar sesión.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.14 Notificaciones</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Estar al tanto de citas, pagos y alertas</p>
            <p className="text-sm mb-2">Centro de notificaciones del profesional con alertas operativas.</p>
            <p className="text-sm"><strong>Elementos:</strong> Lista de notificaciones (nueva reserva, cancelación, solicitud on-demand, pago recibido, nueva review, recordatorio de cita), marcar como leída, acceso directo a la acción, filtros por tipo.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.15 Ayuda y Soporte</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Resolver dudas operativas y técnicas</p>
            <p className="text-sm mb-2">Centro de ayuda adaptado a profesionales con FAQ, guías y contacto de soporte.</p>
            <p className="text-sm"><strong>Elementos:</strong> FAQ para profesionales, guías de uso de la plataforma, contacto con soporte, reportar problema técnico, sugerir mejora.</p>
          </div>

          <div className="border border-[var(--marco-border)] rounded-lg p-5">
            <h4 className="font-thunder text-base uppercase text-[var(--marco-accent)] mb-1">7B.16 Analytics</h4>
            <p className="text-xs text-black/50 mb-2">Usuario: Profesional · Objetivo: Entender el rendimiento de la práctica en la plataforma</p>
            <p className="text-sm mb-2">Panel de métricas detalladas para el profesional (disponible post-MVP o versión básica en MVP).</p>
            <p className="text-sm"><strong>Elementos:</strong> Consultas por período, tasa de ocupación, tasa de no-show, ingresos acumulados, distribución por tipo de consulta (on-demand vs. programada, presencial vs. virtual), pacientes nuevos vs. recurrentes, horarios de mayor demanda.</p>
          </div>

        </div>
      </TwoColumnSection>

      {/* Pantallas compartidas / Admin */}
      <BoxedListSection
        title="7C. Pantallas Compartidas y Admin"
        subtitle="Pantallas que sirven a ambos tipos de usuario o al equipo administrativo."
        items={[
          'Panel de Administrador: gestión de usuarios, profesionales, validaciones de credenciales, reportes de contenido, configuración de plataforma. (Usuario: Admin)',
          'Panel Super Admin: dashboard ejecutivo con métricas globales (usuarios, consultas, ingresos, NPS), gestión completa de la plataforma, roles y permisos. (Usuario: Super Admin / Cliente)',
          'Landing Page / Marketing: página de presentación de la plataforma para captación orgánica, con CTA para registro de pacientes y profesionales. (Usuario: Visitante)',
          'Términos y Condiciones / Política de Privacidad: páginas legales accesibles desde registro y configuración. (Usuario: Todos)',
          'Pantalla de Error / 404: manejo elegante de errores y rutas no encontradas. (Usuario: Todos)',
          'Pantalla de Mantenimiento: aviso de mantenimiento programado con información de tiempo estimado. (Usuario: Todos)',
        ]}
      />

      {/* Cierre del reporte */}
      <ContentBox title="Resumen Ejecutivo">
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
