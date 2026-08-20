import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'punto', label: 'Punto de partida' },
  { id: 'campanas', label: 'Las campañas' },
  { id: 'hecho', label: 'Lo que se hizo' },
  { id: 'writing', label: 'Garage Writing' },
  { id: 'medicion', label: 'Qué medimos' },
  { id: 'inversion', label: 'Inversión' },
  { id: 'plan', label: 'Plan' },
  { id: 'tag', label: 'De TAG' },
]

const CAMPANAS = [
  {
    nombre: 'Adultos · WhatsApp',
    que: 'Del anuncio directo a una conversación con la escuela.',
    dia: '€11,33',
    mes: '€340',
    estado: 'Corriendo desde junio',
  },
  {
    nombre: 'Adultos · Web',
    que: 'Lleva a la página de cursos de iniciación, que es la oferta que se compra.',
    dia: '€5,34',
    mes: '€160',
    estado: 'Corriendo desde junio',
  },
  {
    nombre: 'Garage Writing',
    que: 'Escritura de comedia. Online, a toda España. Carrusel de cinco tarjetas.',
    dia: '€5,00',
    mes: '€150',
    estado: 'Nueva — arranca hoy',
  },
] as const

export default function TagMetaAgosto() {
  return (
    <>
      <ScrollNav items={NAV} />

      <TwoColumnSection title="Punto de partida" id="punto">
        <p>
          El cliente decidió bajar la inversión en Google de €900 a €600 al mes y redirigir
          esos <strong>€300 a Meta</strong>. Además sumó un curso nuevo, Garage Writing, que
          necesitaba su propia campaña.
        </p>
        <p>
          Este documento cuenta dónde quedó esa inversión, qué mejoró en las campañas que ya
          venían corriendo y qué hay que mirar en las próximas semanas.
        </p>
        <p className="text-[var(--marco-accent)] font-medium">
          Las tres campañas están activas y entregando desde hoy.
        </p>
      </TwoColumnSection>

      <TwoColumnSection title="Las campañas" id="campanas">
        <div className="space-y-5">
          {CAMPANAS.map(c => (
            <div
              key={c.nombre}
              className="border border-[var(--marco-border)] rounded-lg p-6 bg-white"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                <h4 className="font-thunder text-xl md:text-2xl uppercase text-black">
                  {c.nombre}
                </h4>
                <span className="text-[11px] uppercase tracking-wide font-thunder text-[var(--marco-accent)]">
                  {c.estado}
                </span>
              </div>
              <p className="text-black mb-4">{c.que}</p>
              <div className="flex gap-8 border-t border-[var(--marco-border)] pt-4">
                <div>
                  <span className="block text-[11px] uppercase tracking-wide font-thunder text-neutral-500">
                    Al día
                  </span>
                  <span className="font-thunder text-2xl text-black">{c.dia}</span>
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wide font-thunder text-neutral-500">
                    Al mes
                  </span>
                  <span className="font-thunder text-2xl text-black">{c.mes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TwoColumnSection>

      <TwoColumnSection title="Lo que se hizo" id="hecho">
        <ContentBox title="Los contactos por WhatsApp se duplicaron y cuestan la mitad">
          <p>
            Se cambió lo que la campaña le pide a Meta: en vez de buscar clics baratos, ahora
            busca personas que efectivamente escriben.
          </p>
          <p className="mt-3">
            Pasó de unos <strong>4 contactos por semana a cerca de 9</strong>, y el coste por
            contacto bajó de unos <strong>€14 a €5,90</strong>.
          </p>
        </ContentBox>

        <BoxedListSection
          title="Y además"
          items={[
            'Las campañas dejaron de mostrarse dentro de vídeos de otros contenidos, donde el clic era accidental. Ahora aparecen donde la atención es voluntaria: feed, historias y reels.',
            'La campaña de web pasó a apuntar a los cursos de iniciación en lugar de a la ficha del programa completo de tres años. Es lo que la gente decide comprar.',
            'Esa misma campaña estrena dos versiones de texto que rotan solas, para que la plataforma aprenda cuál convence más.',
            'Cada campaña envía ahora un mensaje distinto por WhatsApp, y el panel de administración lo reconoce y lo clasifica solo.',
          ]}
        />
      </TwoColumnSection>

      <TwoColumnSection title="Garage Writing" id="writing">
        <p>
          Es el primer curso <strong>online</strong> de la escuela, así que la campaña no se
          limita a Barcelona como las otras dos: <strong>llega a toda España</strong>. Es la
          primera vez que una campaña puede captar alumnos fuera de la ciudad.
        </p>

        <BoxedListSection
          title="Cómo está armada"
          items={[
            'Objetivo: que dejen sus datos en el formulario de la página del curso.',
            'Público: España, de 25 a 55 años, con interés en escritura, guion y teatro.',
            'Formato: carrusel de cinco tarjetas con el material del curso.',
            'Destino: la página de Garage Writing, nunca la home.',
          ]}
        />

        <p className="mt-6">
          Las cinco tarjetas cuentan una historia en orden: la portada con las fechas, el
          gancho, qué se aprende, cómo se cursa y los datos para inscribirse. Cada tarjeta
          está marcada por separado, así que en unas semanas vamos a saber cuál engancha.
        </p>

        <ContentBox title="El curso empieza el 16 de septiembre">
          <p>
            La campaña arranca hoy, lo que da unas cuatro semanas de captación. Las
            plataformas necesitan alrededor de una semana de rodaje antes de rendir bien, así
            que <strong>las dos últimas semanas son las que más deberían traer</strong>.
          </p>
        </ContentBox>
      </TwoColumnSection>

      <TwoColumnSection title="Qué medimos" id="medicion">
        <p>
          Hasta ahora, cuando alguien escribía por WhatsApp se sabía que venía de Meta, pero
          no de qué campaña. Eso quedó resuelto.
        </p>
        <p>
          No es un detalle técnico: es lo que permite decidir dónde poner el dinero el mes que
          viene con datos y no por intuición. De acá en adelante,{' '}
          <strong>cada alumna matriculada se puede rastrear hasta la campaña que la trajo</strong>.
        </p>

        <BoxedListSection
          title="Lo que vamos a poder responder"
          items={[
            'De qué campaña vino cada persona que escribe por WhatsApp.',
            'Cuál de las cinco tarjetas del carrusel es la que engancha.',
            'Cuál de los dos textos de la campaña de web convence más.',
            'Cuánto cuesta cada matrícula, por campaña, y no sólo cada contacto.',
          ]}
        />
      </TwoColumnSection>

      <TwoColumnSection title="Inversión" id="inversion">
        <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden bg-white">
          <div className="flex justify-between items-baseline p-6 border-b border-[var(--marco-border)]">
            <span className="font-thunder text-xl uppercase text-black">Antes</span>
            <span className="font-thunder text-3xl text-neutral-500">€350 / mes</span>
          </div>
          <div className="flex justify-between items-baseline p-6 border-b border-[var(--marco-border)]">
            <span className="font-thunder text-xl uppercase text-black">
              Los que bajaron de Google
            </span>
            <span className="font-thunder text-3xl text-[var(--marco-accent)]">+ €300</span>
          </div>
          <div className="flex justify-between items-baseline p-6 bg-[var(--marco-accent-light)]/30">
            <span className="font-thunder text-xl uppercase text-black">Ahora en Meta</span>
            <span className="font-thunder text-3xl text-black">€650 / mes</span>
          </div>
        </div>
        <p className="mt-5 text-neutral-600 text-sm">
          Garage Writing arranca con el presupuesto más chico a propósito: es la campaña nueva
          y conviene ver cómo responde antes de reforzarla.
        </p>
      </TwoColumnSection>

      <TwoColumnSection title="Plan" id="plan">
        <Timeline
          title="Las próximas cuatro semanas"
          steps={[
            {
              label: 'Semana 1',
              items: [
                'Primeros interesados de Garage Writing',
                'Cuál de las cinco tarjetas funciona',
                'Decidir si reforzar el presupuesto',
              ],
            },
            {
              label: 'Semana 2',
              items: [
                'Si la página de iniciación convierte mejor',
                'Cuál de los dos textos gana',
                'Ajuste de audiencia si hace falta',
              ],
            },
            {
              label: 'Semana 3',
              items: [
                'Empuje final antes del cierre de matrícula',
                'Seguimiento comercial a los interesados',
              ],
            },
            {
              label: 'Semana 4',
              items: [
                'Arranca Garage Writing el 16 de septiembre',
                'Reparto del presupuesto de septiembre con datos reales',
              ],
            },
          ]}
        />
      </TwoColumnSection>

      <TwoColumnSection title="De TAG" id="tag">
        <p>Tres cosas dependen de la escuela, no de nosotros:</p>
        <BoxedListSection
          title="Lo que necesitamos de ustedes"
          items={[
            'Google: pedirle a la agencia que la campaña de principiantes deje de llevar a la home y apunte a la página de cursos de iniciación. No cuesta nada y es el ajuste pendiente con más impacto.',
            'Seguimiento a las 75 personas interesadas en los cursos largos que esperan a septiembre. Ya están en casa, no necesitan pauta, sólo que alguien las contacte.',
            'Confirmar si se refuerza el presupuesto de Garage Writing en cuanto tengamos los primeros datos, porque la matrícula cierra el 16 de septiembre.',
          ]}
        />
      </TwoColumnSection>
    </>
  )
}
