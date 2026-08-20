import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import ContentBox from '../components/ContentBox'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'que', label: 'Qué hace' },
  { id: 'formato', label: 'La modalidad' },
  { id: 'criterio', label: 'El criterio' },
  { id: 'ejemplo', label: 'Un día' },
  { id: 'mes', label: 'El mes' },
  { id: 'revisar', label: 'Para revisar' },
  { id: 'sigue', label: 'Qué sigue' },
]

// [estación, código, nombre, patrón, formato, prescripción, duración]
type Fila = [number, string, string, string, string, string, string]
type Sesion = { n: number; aMano: boolean; filas: Fila[] }

const MES: Sesion[] = [
  { n: 1, aMano: true, filas: [
    [1, 'EJ0172', 'Flexiones de brazos', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante', 'Series', '3x15 · descanso 60s', '—'],
    [3, 'EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0281', 'Planchas colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0090', 'Trote en el lugar', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 2, aMano: true, filas: [
    [1, 'EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal', 'Series', '3x10 · descanso 60s', '—'],
    [2, 'EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante', 'Series', '4x12 · descanso 45s', '—'],
    [3, 'EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0283', 'Vizagras alternos colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0086', 'Jumping jump', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 3, aMano: true, filas: [
    [1, 'EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal', 'Series', '3x15 · descanso 45s', '—'],
    [2, 'EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante', 'Series', '3x10 · descanso 75s', '—'],
    [3, 'EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0006', 'Plancha con toque de hombros', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0088', 'Skiping', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 4, aMano: true, filas: [
    [1, 'EJ0172', 'Flexiones de brazos', 'Empuje horizontal', 'Series', '4x10 · descanso 60s', '—'],
    [2, 'EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante', 'Series', '3x12 · descanso 75s', '—'],
    [3, 'EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0284', 'Vizagras colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0087', 'Talon a la cola', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 5, aMano: true, filas: [
    [1, 'EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0308', 'Squats', 'Rodilla dominante', 'Series', '4x15 · descanso 45s', '—'],
    [3, 'EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0278', 'Planchas con apoyo de palmas de manos bb estirados y adelante colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0089', 'Trote rodilla arriba', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 6, aMano: false, filas: [
    [1, 'EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0192', 'Sentadilla + Biceps con banda elastica', 'Rodilla dominante', 'Series', '3x15 · descanso 60s', '—'],
    [3, 'EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal', 'AMRAP', '8:00 continuos', '8:00'],
    [4, 'EJ0294', 'Superiores cortitos con rodillas suspendidas a 90 grados colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0086', 'Jumping jump', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 7, aMano: false, filas: [
    [1, 'EJ0306', 'Push-ups', 'Empuje horizontal', 'Series', '3x10 · descanso 60s', '—'],
    [2, 'EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante', 'Series', '4x12 · descanso 45s', '—'],
    [3, 'EJ0028', 'Sentadilla + remo con polea baja', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión', 'AMRAP', '4:00 continuos', '4:00'],
    [5, 'EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción', 'Tabata', '16 rondas · 20s / 10s', '8:00'],
  ] },
  { n: 8, aMano: false, filas: [
    [1, 'EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal', 'Series', '3x15 · descanso 45s', '—'],
    [2, 'EJ0192', 'Sentadilla + Biceps con banda elastica', 'Rodilla dominante', 'Series', '3x10 · descanso 75s', '—'],
    [3, 'EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0279', 'Planchas + crunch de rodillas por fuera colchoneta', 'Core anti-extensión', 'EMOM', '4 rondas de 60s · 4x10', '4:00'],
    [5, 'EJ0242', 'Sentadilla profunda mas salto', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 9, aMano: false, filas: [
    [1, 'EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal', 'Series', '4x10 · descanso 60s', '—'],
    [2, 'EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante', 'Series', '3x12 · descanso 75s', '—'],
    [3, 'EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal', 'AMRAP', '8:00 continuos', '8:00'],
    [4, 'EJ0257', 'Espinales con elevacion de pp alternas colchoneta', 'Core anti-extensión', 'EMOM', '4 rondas de 60s · 4x10', '4:00'],
    [5, 'EJ0083', 'Trote con banda arnes hacia delante volviendo suave', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 10, aMano: false, filas: [
    [1, 'EJ0306', 'Push-ups', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0224', 'Sentadillas sobre bozu con sng bag', 'Rodilla dominante', 'Series', '4x15 · descanso 45s', '—'],
    [3, 'EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal', 'AMRAP', '8:00 continuos', '8:00'],
    [4, 'EJ0283', 'Vizagras alternos colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0234', 'Estocadas alternas + salto', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 11, aMano: false, filas: [
    [1, 'EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0009', 'Sentadilla sobre bozu', 'Rodilla dominante', 'Series', '3x15 · descanso 60s', '—'],
    [3, 'EJ0111', 'Remo al menton en polea baja con barra', 'Tracción horizontal', 'AMRAP', '8:00 continuos', '8:00'],
    [4, 'EJ0257', 'Espinales con elevacion de pp alternas colchoneta', 'Core anti-extensión', 'EMOM', '4 rondas de 60s · 4x10', '4:00'],
    [5, 'EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción', 'Tabata', '16 rondas · 20s / 10s', '8:00'],
  ] },
  { n: 12, aMano: false, filas: [
    [1, 'EJ0306', 'Push-ups', 'Empuje horizontal', 'Series', '3x10 · descanso 60s', '—'],
    [2, 'EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante', 'Series', '4x12 · descanso 45s', '—'],
    [3, 'EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal', 'AMRAP', '8:00 continuos', '8:00'],
    [4, 'EJ0279', 'Planchas + crunch de rodillas por fuera colchoneta', 'Core anti-extensión', 'EMOM', '4 rondas de 60s · 4x10', '4:00'],
    [5, 'EJ0080', 'Saltos a un pp con banda arnes', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 13, aMano: false, filas: [
    [1, 'EJ0172', 'Flexiones de brazos', 'Empuje horizontal', 'Series', '3x15 · descanso 45s', '—'],
    [2, 'EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante', 'Series', '3x10 · descanso 75s', '—'],
    [3, 'EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0267', 'Inferiores con agarre, elevacion de pp rodillas flexionadas mas cadera colchoneta', 'Core anti-extensión', 'EMOM', '4 rondas de 60s · 4x10', '4:00'],
    [5, 'EJ0242', 'Sentadilla profunda mas salto', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 14, aMano: false, filas: [
    [1, 'EJ0306', 'Push-ups', 'Empuje horizontal', 'Series', '4x10 · descanso 60s', '—'],
    [2, 'EJ0030', 'Sentadillas sobre bozu + hombros con keteball', 'Rodilla dominante', 'Series', '3x12 · descanso 75s', '—'],
    [3, 'EJ0193', 'Sentadilla + Remo con banda elastica', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión', 'EMOM', '4 rondas de 60s · 4x10', '4:00'],
    [5, 'EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 15, aMano: false, filas: [
    [1, 'EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0225', 'Sentadillas sobre bozu con keteball', 'Rodilla dominante', 'Series', '4x15 · descanso 45s', '—'],
    [3, 'EJ0148', 'Remo cerrucho polea baja con barra', 'Tracción horizontal', 'AMRAP', '8:00 continuos', '8:00'],
    [4, 'EJ0006', 'Plancha con toque de hombros', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0086', 'Jumping jump', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 16, aMano: false, filas: [
    [1, 'EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante', 'Series', '3x15 · descanso 60s', '—'],
    [3, 'EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal', 'Tabata', '16 rondas · 20s / 10s', '8:00'],
    [4, 'EJ0296', 'Superiores cortitos con pp apoyados en piso colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0299', 'Burpees', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 17, aMano: false, filas: [
    [1, 'EJ0306', 'Push-ups', 'Empuje horizontal', 'Series', '3x10 · descanso 60s', '—'],
    [2, 'EJ0030', 'Sentadillas sobre bozu + hombros con keteball', 'Rodilla dominante', 'Series', '4x12 · descanso 45s', '—'],
    [3, 'EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal', 'AMRAP', '8:00 continuos', '8:00'],
    [4, 'EJ0294', 'Superiores cortitos con rodillas suspendidas a 90 grados colchoneta', 'Core anti-extensión', 'Tabata', '8 rondas · 20s / 10s', '4:00'],
    [5, 'EJ0083', 'Trote con banda arnes hacia delante volviendo suave', 'Locomoción', 'AMRAP', '8:00 continuos', '8:00'],
  ] },
  { n: 18, aMano: false, filas: [
    [1, 'EJ0172', 'Flexiones de brazos', 'Empuje horizontal', 'Series', '3x15 · descanso 45s', '—'],
    [2, 'EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante', 'Series', '3x10 · descanso 75s', '—'],
    [3, 'EJ0111', 'Remo al menton en polea baja con barra', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión', 'AMRAP', '4:00 continuos', '4:00'],
    [5, 'EJ0234', 'Estocadas alternas + salto', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 19, aMano: false, filas: [
    [1, 'EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal', 'Series', '4x10 · descanso 60s', '—'],
    [2, 'EJ0009', 'Sentadilla sobre bozu', 'Rodilla dominante', 'Series', '3x12 · descanso 75s', '—'],
    [3, 'EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal', 'Tabata', '16 rondas · 20s / 10s', '8:00'],
    [4, 'EJ0257', 'Espinales con elevacion de pp alternas colchoneta', 'Core anti-extensión', 'AMRAP', '4:00 continuos', '4:00'],
    [5, 'EJ0090', 'Trote en el lugar', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
  { n: 20, aMano: false, filas: [
    [1, 'EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal', 'Series', '3x12 · descanso 60s', '—'],
    [2, 'EJ0192', 'Sentadilla + Biceps con banda elastica', 'Rodilla dominante', 'Series', '4x15 · descanso 45s', '—'],
    [3, 'EJ0193', 'Sentadilla + Remo con banda elastica', 'Tracción horizontal', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
    [4, 'EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión', 'AMRAP', '4:00 continuos', '4:00'],
    [5, 'EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción', 'EMOM', '8 rondas de 60s · 8x10', '8:00'],
  ] },
]

// Cuántas veces cayó cada formato en cada estación, entre las quince que armó el motor. El
// punto no son los totales: es que la fila de la estación 3 tenga más de una columna con algo.
const REPARTO: { est: number; que: string; emom: number; tabata: number; amrap: number }[] = [
  { est: 3, que: 'Tracción horizontal', emom: 6, tabata: 2, amrap: 7 },
  { est: 4, que: 'Core anti-extensión', emom: 6, tabata: 5, amrap: 4 },
  { est: 5, que: 'Locomoción', emom: 10, tabata: 2, amrap: 3 },
]

const COLOR: Record<string, string> = {
  Series: 'text-black/45 border-black/15',
  EMOM: 'text-[#2E6F8E] border-[#2E6F8E]/40',
  Tabata: 'text-[var(--marco-accent)] border-[var(--marco-accent)]/40',
  AMRAP: 'text-[#2E7A57] border-[#2E7A57]/40',
}

function Etiqueta({ f }: { f: string }) {
  return (
    <span className={`inline-block text-[11px] font-bold uppercase tracking-wide border rounded-full px-2 py-[2px] whitespace-nowrap ${COLOR[f]}`}>
      {f}
    </span>
  )
}

function TablaSesion({ s }: { s: Sesion }) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden">
      <div className={`flex items-baseline gap-3 px-5 py-3 border-b border-[var(--marco-border)] ${s.aMano ? 'bg-[var(--marco-accent-light)]' : 'bg-black/[0.02]'}`}>
        <span className="font-thunder uppercase text-lg text-black">Sesión {s.n}</span>
        <span className="text-[11px] uppercase tracking-wide text-black/50">
          {s.aMano ? 'Escrita por el coach' : 'Armada por el motor'}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[14px] min-width-[560px]" style={{ minWidth: 560 }}>
          <tbody>
            {s.filas.map(([est, code, nombre, patron, formato, presc, dura]) => (
              <tr key={est} className="border-b border-[var(--marco-border)] last:border-b-0">
                <td className="py-3 pl-5 pr-2 text-black/40 align-top w-8 tabular-nums">{est}</td>
                <td className="py-3 pr-4 align-top">
                  <span className="block text-black font-medium leading-snug">{nombre}</span>
                  <span className="block text-black/45 text-[12.5px]">{code} · {patron}</span>
                </td>
                <td className="py-3 pr-4 align-top w-[92px]"><Etiqueta f={formato} /></td>
                <td className="py-3 pr-4 align-top text-black/60">{presc}</td>
                <td className="py-3 pr-5 align-top text-black/60 tabular-nums whitespace-nowrap w-14">{dura}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function TecnoFitMotorRutinas() {
  const aMano = MES.filter((s) => s.aMano)
  const generadas = MES.filter((s) => !s.aMano)
  const distintos = new Set(generadas.flatMap((s) => s.filas.map((f) => f[1]))).size

  return (
    <>
      <ScrollNav items={NAV} />

      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Fitness Central · TecnoFit · Sprint 2
        </span>
        <h1 className="font-thunder text-[13vw] md:text-[7.5vw] leading-[0.9] uppercase text-[var(--marco-accent)] text-balance mt-3">
          El motor ya<br />arma el mes
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          El coach escribe cinco sesiones y el motor construye el resto del mes: cambia el
          ejercicio de cada estación y también la modalidad de trabajo, sin mover un solo minuto
          de la rotación de la línea. Abajo está el mes entero, tal como quedó.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Escritas a mano</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">{aMano.length} sesiones</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Armadas por el motor</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">{generadas.length} sesiones</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Ejercicios distintos</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">{distintos}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Repetidos de un día al otro</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Ninguno</p>
          </div>
        </div>
      </div>

      {/* Qué hace */}
      <TwoColumnSection title="Qué hace el motor" id="que">
        <p className="text-lg">
          Toma cada sesión escrita por el coach como forma —las mismas estaciones, la misma
          prescripción, el mismo tiempo por estación— y cambia dos cosas: qué ejercicio se hace
          en cada estación y bajo qué modalidad se trabaja.
        </p>
        <p>
          El ejercicio se reemplaza por otro del mismo patrón de movimiento, que se pueda hacer
          con el equipamiento de esa estación y que el socio no tenga contraindicado. Si el socio
          tiene la rodilla marcada, los unilaterales de pierna dejan de aparecer sin que nadie
          tenga que acordarse.
        </p>
        <p className="text-sm text-black/60">
          Es determinístico: volver a generar el mismo mes da el mismo mes. Si el coach cambia
          algo y regenera, lo que ve distinto es exactamente lo que cambió.
        </p>
      </TwoColumnSection>

      {/* La modalidad */}
      <TwoColumnSection title="La modalidad también rota" id="formato">
        <p className="text-lg">
          Rotar sólo el ejercicio deja la mitad de la variedad afuera: si el coach escribió la
          estación 3 como EMOM, el socio hacía EMOM en esa estación los treinta días. Ahora la
          modalidad rota con el ejercicio.
        </p>
        <p>
          Las estaciones de carga no se tocan: si el coach prescribió series y repeticiones, eso
          es una decisión de peso y se respeta. Las estaciones a tiempo son las que rotan entre
          EMOM, Tabata y AMRAP.
        </p>
        <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-[14.5px]" style={{ minWidth: 460 }}>
              <thead>
                <tr className="border-b-2 border-[var(--marco-accent-light)]">
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-5">Estación</th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-3">EMOM</th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-3">Tabata</th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-3">AMRAP</th>
                </tr>
              </thead>
              <tbody>
                {REPARTO.map((r) => (
                  <tr key={r.est} className="border-b border-[var(--marco-border)] last:border-b-0">
                    <td className="py-3 px-5 text-black/70">
                      <b className="text-black">Estación {r.est}</b>
                      <span className="block text-[12.5px] text-black/45">{r.que}</span>
                    </td>
                    <td className="py-3 px-3 tabular-nums font-bold text-black">{r.emom}</td>
                    <td className="py-3 px-3 tabular-nums font-bold text-black">{r.tabata}</td>
                    <td className="py-3 px-3 tabular-nums font-bold text-black">{r.amrap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-black/60">
          Veces que cayó cada modalidad en las {generadas.length} sesiones armadas por el motor.
        </p>
        <p>
          <b>La duración no cambia nunca.</b> Sea EMOM, Tabata o AMRAP, el socio pasa los mismos
          ocho minutos en la estación — la línea sigue rotando igual y la cola no se entera.
        </p>
      </TwoColumnSection>

      {/* El criterio */}
      <BoxedListSection
        id="criterio"
        title="Qué mira para elegir la modalidad"
        subtitle="No todo movimiento admite todo formato, y lo decide la clasificación del catálogo."
        items={[
          'EMOM — las repeticiones entran en una ventana de 60 s y el descanso es lo que sobra. El socio maneja su propio ritmo, así que sirve para todo, incluso lo técnico y lo pesado.',
          'Tabata — 20 s a fondo, y otra vez. Sólo para movimientos que se puedan hacer rápido sin pensarlos: si la complejidad técnica es alta, queda afuera.',
          'AMRAP — ocho minutos continuos. Nada obliga a frenar, así que queda afuera lo de intensidad alta, que no se sostiene ocho minutos sin que se caiga la técnica.',
        ]}
      />

      <ContentBox title="Por qué la estación 5 cae más veces en EMOM">
        <p>
          Buena parte de los ejercicios de locomoción son escaleras de coordinación y saltos con
          arnés: movimientos que no se hacen a fondo contra el reloj. El motor los deja en EMOM
          en lugar de forzarlos a un Tabata. Es el criterio funcionando, no una preferencia.
        </p>
      </ContentBox>

      {/* Un día */}
      <TwoColumnSection title="Un día y el siguiente" id="ejemplo">
        <p className="text-lg">
          La sesión 5 la escribió el coach. La 6 la armó el motor a partir de ella: mismas cinco
          estaciones, mismo tiempo, ningún ejercicio repetido y la modalidad movida.
        </p>
        <div className="space-y-5 pt-2">
          {MES.filter((s) => s.n === 5 || s.n === 6).map((s) => (
            <TablaSesion key={s.n} s={s} />
          ))}
        </div>
      </TwoColumnSection>

      {/* El mes */}
      <div id="mes" className="mb-20 md:mb-28 scroll-mt-28">
        <h2 className="font-thunder text-3xl md:text-5xl uppercase text-[var(--marco-accent)] mb-4">
          El mes completo
        </h2>
        <p className="text-black/80 max-w-2xl mb-10">
          Las primeras {aMano.length} son las del coach; de la {aMano.length + 1} en adelante, el
          motor.
        </p>
        <div className="space-y-5">
          {MES.map((s) => <TablaSesion key={s.n} s={s} />)}
        </div>
      </div>

      {/* Para revisar */}
      <TwoColumnSection title="Una para revisar" id="revisar">
        <p className="text-lg">
          El motor rota por patrón de movimiento, así que lo que dice el catálogo es lo que
          termina apareciendo en la estación. Hay dos ejercicios de glúteo cargados como empuje
          horizontal —<b>EJ0014</b>, abductores en colchoneta con tobillera, y <b>EJ0203</b>,
          glúteos patada en polea baja— y por eso pueden aparecer como alternativa de unas
          flexiones de brazos.
        </p>
        <p>
          Cambiando el patrón en el catálogo se acomoda solo, sin tocar ninguna rutina ya armada.
        </p>
      </TwoColumnSection>

      {/* Qué sigue */}
      <BoxedListSection
        id="sigue"
        title="Qué sigue"
        subtitle="Tres, y la primera es una decisión del gym."
        items={[
          'Definir quién carga el peso que el socio levantó de verdad: el socio desde la app en el box, o el coach al cierre. Hoy la rutina arrastra lo que el coach prescribió; con el dato real, el peso sube solo.',
          'Llevar las modalidades por tiempo a la app del socio — la pantalla del box ya las muestra con el reloj corriendo.',
          'Repasar juntos las dos clasificaciones del catálogo de arriba.',
        ]}
      />
    </>
  )
}
