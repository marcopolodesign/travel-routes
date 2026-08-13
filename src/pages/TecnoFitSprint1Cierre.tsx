import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'hecho', label: 'Hecho' },
  { id: 'envivo', label: 'En vivo' },
  { id: 'pantalla', label: 'Pantalla' },
  { id: 'app', label: 'App' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'encuadre', label: 'Encuadre' },
  { id: 'cobertura', label: 'Qué falta' },
  { id: 'sigue', label: 'Qué sigue' },
]

// Coverage by movement pattern, straight from the catalog. The point of the block is not
// the totals; it is which rows read zero — that is the filming list for the coming weeks.
const COBERTURA: { tipo: string; listos: number; total: number }[] = [
  { tipo: 'Aislamiento (bíceps, tríceps, gemelos…)', listos: 0, total: 59 },
  { tipo: 'Core anti-extensión (plancha, rollout…)', listos: 0, total: 38 },
  { tipo: 'Locomoción y metabólicos (soga, burpees…)', listos: 0, total: 45 },
  { tipo: 'Dominante de cadera (peso muerto, hip thrust…)', listos: 4, total: 24 },
  { tipo: 'Empuje y tracción (press, remo, dominadas…)', listos: 1, total: 47 },
]

export default function TecnoFitSprint1Cierre() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Fitness Central · TecnoFit · Cierre de Sprint 1
        </span>
        <h1 className="font-thunder text-[13vw] md:text-[7vw] leading-[0.9] uppercase text-[var(--marco-accent)] text-balance mt-3">
          El catálogo<br />cobró vida
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Cerramos las dos semanas con el circuito completo funcionando de punta a punta: el
          gym filma con el celular, sube, y el ejercicio aparece reproduciéndose en la pantalla
          del box y en la app del socio. Sin editar, sin comprimir, sin tocar nada técnico.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Sprint</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">1 de 4</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Estado</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">Entregado</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Catálogo</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">296 ejercicios</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Primeros videos</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">cargados por el gym</p>
          </div>
        </div>
      </div>

      {/* Lo que quedó andando */}
      <TwoColumnSection title="Lo que quedó andando" id="hecho">
        <p className="text-lg">
          Cinco piezas, y todas se tocan entre sí: se filma un ejercicio y en el mismo circuito
          termina viéndose en el piso y en el teléfono.
        </p>
        <div className="space-y-4 pt-2">
          {[
            ['El catálogo de 296 ejercicios, clasificado y buscable',
             'Cada ejercicio con su patrón de movimiento, músculo y material. Se busca por nombre, músculo y equipamiento a la vez — y encuentra aunque el nombre se escriba a medias.'],
            ['El gym ya carga su propio video, solo',
             'Se graba con el celular y se sube tal cual salió; el sistema lo optimiza, le saca peso y genera la portada. Sin editores, sin exportar. Los primeros ejercicios ya los cargó el equipo del gym.'],
            ['El video se ve en la pantalla del box y en la app',
             'La misma grabación llega optimizada a cada lugar: la versión grande a la TV, una liviana al celular del socio. Empieza a verse al instante.'],
            ['Encuadre por pantalla, ajustable cuando se quiera',
             'Desde el administrador se elige qué parte del video se ve en la TV y qué parte en el celular, por separado. Se cambia al instante, sin volver a subir ni esperar.'],
            ['Un tablero de qué falta filmar',
             'Muestra, por tipo de ejercicio, cuántos ya tienen video y cuántos no. Es la hoja de ruta de producción de contenido para las próximas semanas.'],
          ].map(([t, d], i) => (
            <div key={i} className="flex gap-4 border-b border-[var(--marco-border)] last:border-0 pb-4 last:pb-0">
              <span className="font-thunder text-[var(--marco-accent)] text-xl leading-none pt-1">✓</span>
              <div>
                <p className="font-thunder uppercase text-lg text-black leading-tight">{t}</p>
                <p className="text-black/70 mt-1">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </TwoColumnSection>

      {/* Links en vivo */}
      <BoxedListSection
        id="envivo"
        title="Para ver en vivo, ahora mismo"
        subtitle="Todo lo del Sprint 1, funcionando. Entorno de demostración, separado del sistema que el gym usa a diario."
        items={[
          'Pantalla del box — la TV de una línea con cuatro socios entrenando, cada uno con su video. Se abre sola, no pide login: tecno-admin-staging.vercel.app/lista-espera/tv/4',
          'Administrador y catálogo — los 296 ejercicios, el buscador combinado y el editor de encuadre: tecno-admin-staging.vercel.app/catalogo',
          'Para entrar al administrador: usuario lucas@tecnofit.test · contraseña TecnoFit2026!',
        ]}
      />

      {/* Pantalla del box */}
      <TwoColumnSection title="La pantalla del box" id="pantalla">
        <p className="text-lg">
          Cada estación de la línea muestra al socio que la ocupa, su tiempo, y el video del
          ejercicio que le toca — el video propio del gym, no un enlace de afuera. Cuando un box
          cambia de ejercicio, la imagen nunca queda en negro: sigue mostrando la portada hasta
          que arranca el nuevo.
        </p>
        <figure className="mt-4">
          <img
            src="/tecno/pantalla-box.png"
            alt="Pantalla del box con cuatro socios entrenando, cada uno con el video de su ejercicio"
            className="w-full rounded-lg border border-[var(--marco-border)]"
          />
          <figcaption className="text-sm text-black/50 mt-3">
            Cuatro estaciones de LINEA A, cada una con el video propio del gym.
          </figcaption>
        </figure>
      </TwoColumnSection>

      {/* App */}
      <TwoColumnSection title="El video en la app" id="app">
        <p className="text-lg">
          La misma grabación, en una versión liviana pensada para el celular del socio con
          datos móviles. Es un cambio real: antes la app no podía reproducir video de ejercicio,
          y ahora muestra el del gym en cada estación de la rutina.
        </p>
      </TwoColumnSection>

      {/* Catálogo */}
      <TwoColumnSection title="El catálogo, buscable" id="catalogo">
        <p className="text-lg">
          Los 296 ejercicios quedaron cargados y clasificados. La búsqueda combina lo que
          alguien realmente tiene en la cabeza: un nombre a medias, más el músculo, más el
          material que hay libre en la sala — los tres a la vez.
        </p>
        <p>
          Y encuentra aunque el nombre esté mal escrito: escribir “sentadila con keteball”
          igual trae las sentadillas con kettlebell.
        </p>
      </TwoColumnSection>

      {/* Encuadre */}
      <TwoColumnSection title="Encuadre por pantalla" id="encuadre">
        <p className="text-lg">
          La TV es horizontal y el celular no; el mismo video tiene que verse bien en los dos.
          Desde el administrador se elige qué parte de la imagen se ve en cada pantalla, por
          separado, arrastrando y con zoom — el gesto de encuadrar una foto.
        </p>
        <p>
          Se aplica al instante y se puede cambiar todas las veces que haga falta, sin volver a
          subir ni a procesar el video.
        </p>
        <figure className="mt-4">
          <img
            src="/tecno/encuadre.png"
            alt="Editor de encuadre en el administrador, ajustando el video para la pantalla del box"
            className="w-full rounded-lg border border-[var(--marco-border)]"
          />
          <figcaption className="text-sm text-black/50 mt-3">
            El editor de encuadre, eligiendo qué parte del video va a la pantalla del box.
          </figcaption>
        </figure>
      </TwoColumnSection>

      {/* Cobertura */}
      <TwoColumnSection title="Por dónde seguir filmando" id="cobertura">
        <p className="text-lg">
          El catálogo entero está clasificado y listo para recibir video. Filmar es lo único
          que marca el ritmo de acá en adelante. El tablero muestra por dónde arrancar.
        </p>
        <div className="mt-4 border border-[var(--marco-border)] rounded-lg overflow-hidden">
          <table className="w-full text-left" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <thead>
              <tr className="bg-[var(--marco-accent-light)]/30">
                <th className="font-thunder uppercase text-sm text-[var(--marco-accent)] px-4 py-3">Tipo de ejercicio</th>
                <th className="font-thunder uppercase text-sm text-[var(--marco-accent)] px-4 py-3 whitespace-nowrap">Con video</th>
                <th className="font-thunder uppercase text-sm text-[var(--marco-accent)] px-4 py-3 w-32">Avance</th>
              </tr>
            </thead>
            <tbody>
              {COBERTURA.map((c, i) => (
                <tr key={i} className="border-t border-[var(--marco-border)]">
                  <td className="px-4 py-3 text-black/80">{c.tipo}</td>
                  <td className="px-4 py-3 font-thunder text-black whitespace-nowrap">{c.listos} / {c.total}</td>
                  <td className="px-4 py-3">
                    <span className="block h-2 rounded bg-[var(--marco-border)] relative">
                      <span
                        className="absolute left-0 top-0 h-2 rounded bg-[var(--marco-accent)]"
                        style={{ width: `${Math.max(3, (c.listos / c.total) * 100)}%` }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-black/60 pt-2">
          Con un lote chico por semana el circuito ya empieza a llenarse.
        </p>
      </TwoColumnSection>

      {/* Qué sigue */}
      <div id="sigue" className="mb-20 md:mb-28 scroll-mt-28">
        <Timeline
          title="Qué sigue"
          steps={[
            {
              label: 'El gym filma',
              items: [
                'El próximo lote de videos, siguiendo el tablero — empezando por los tipos que hoy están en cero.',
                'Con diez ejercicios por sesión de grabación el catálogo avanza rápido.',
              ],
            },
            {
              label: 'Puesta en producción',
              items: [
                'Llevar el catálogo, los videos y las pantallas nuevas al sistema que el gym usa a diario.',
                'Que empiece a verse en las TVs reales del piso y en la app de todos los socios.',
              ],
            },
            {
              label: 'Material por box',
              items: [
                'Cargar qué equipamiento hay en cada box.',
                'Con eso, el tablero de cobertura y la futura armada de rutinas saben qué ejercicio corre en cada estación.',
              ],
            },
          ]}
        />
      </div>
    </>
  )
}
