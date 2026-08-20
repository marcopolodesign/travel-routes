import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import ContentBox from '../components/ContentBox'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'que', label: 'Qué hace' },
  { id: 'bloque', label: 'La estación' },
  { id: 'formato', label: 'La modalidad' },
  { id: 'criterio', label: 'El criterio' },
  { id: 'mismo', label: 'Dos nombres' },
  { id: 'ejemplo', label: 'Un día' },
  { id: 'mes', label: 'El mes' },
  { id: 'revisar', label: 'Para revisar' },
  { id: 'sigue', label: 'Qué sigue' },
]

// [código, nombre, patrón de movimiento]
type Ejercicio = [string, string, string]
type Estacion = {
  est: number
  formato: string
  como: string
  dura: string
  ejercicios: Ejercicio[]
}
type Sesion = { n: number; aMano: boolean; estaciones: Estacion[] }

const MES: Sesion[] = [
  { n: 1, aMano: true, estaciones: [
      { est: 1, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante'], ['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante'], ['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal'], ['EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal'], ['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0281', 'Planchas colchoneta', 'Core anti-extensión'], ['EJ0283', 'Vizagras alternos colchoneta', 'Core anti-extensión'], ['EJ0284', 'Vizagras colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0090', 'Trote en el lugar', 'Locomoción'], ['EJ0086', 'Jumping jump', 'Locomoción'], ['EJ0088', 'Skiping', 'Locomoción']] },
  ] },
  { n: 2, aMano: true, estaciones: [
      { est: 1, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante'], ['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante'], ['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal'], ['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal'], ['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0283', 'Vizagras alternos colchoneta', 'Core anti-extensión'], ['EJ0284', 'Vizagras colchoneta', 'Core anti-extensión'], ['EJ0006', 'Plancha con toque de hombros', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0086', 'Jumping jump', 'Locomoción'], ['EJ0088', 'Skiping', 'Locomoción'], ['EJ0087', 'Talon a la cola', 'Locomoción']] },
  ] },
  { n: 3, aMano: true, estaciones: [
      { est: 1, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante'], ['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante'], ['EJ0226', 'Sentadillas sobre bozu sin carga', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal'], ['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal'], ['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0284', 'Vizagras colchoneta', 'Core anti-extensión'], ['EJ0006', 'Plancha con toque de hombros', 'Core anti-extensión'], ['EJ0278', 'Planchas con apoyo de palmas de manos bb estirados y adelante colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0088', 'Skiping', 'Locomoción'], ['EJ0087', 'Talon a la cola', 'Locomoción'], ['EJ0089', 'Trote rodilla arriba', 'Locomoción']] },
  ] },
  { n: 4, aMano: true, estaciones: [
      { est: 1, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante'], ['EJ0226', 'Sentadillas sobre bozu sin carga', 'Rodilla dominante'], ['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal'], ['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0006', 'Plancha con toque de hombros', 'Core anti-extensión'], ['EJ0278', 'Planchas con apoyo de palmas de manos bb estirados y adelante colchoneta', 'Core anti-extensión'], ['EJ0256', 'Espinales con elevacion pp simultaneas colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0087', 'Talon a la cola', 'Locomoción'], ['EJ0089', 'Trote rodilla arriba', 'Locomoción'], ['EJ0173', 'Flexiones de brazos con desplazamiento a un lado y otro', 'Locomoción']] },
  ] },
  { n: 5, aMano: true, estaciones: [
      { est: 1, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0226', 'Sentadillas sobre bozu sin carga', 'Rodilla dominante'], ['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante'], ['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal'], ['EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0278', 'Planchas con apoyo de palmas de manos bb estirados y adelante colchoneta', 'Core anti-extensión'], ['EJ0256', 'Espinales con elevacion pp simultaneas colchoneta', 'Core anti-extensión'], ['EJ0257', 'Espinales con elevacion de pp alternas colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '3 ejercicios · 25s trabajo / 15s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0089', 'Trote rodilla arriba', 'Locomoción'], ['EJ0173', 'Flexiones de brazos con desplazamiento a un lado y otro', 'Locomoción'], ['EJ0090', 'Trote en el lugar', 'Locomoción']] },
  ] },
  { n: 6, aMano: false, estaciones: [
      { est: 1, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante'], ['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante'], ['EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante']] },
      { est: 3, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal'], ['EJ0028', 'Sentadilla + remo con polea baja', 'Tracción horizontal'], ['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal']] },
      { est: 4, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0267', 'Inferiores con agarre, elevacion de pp rodillas flexionadas mas cadera colchoneta', 'Core anti-extensión'], ['EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión'], ['EJ0296', 'Superiores cortitos con pp apoyados en piso colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción'], ['EJ0083', 'Trote con banda arnes hacia delante volviendo suave', 'Locomoción'], ['EJ0086', 'Jumping jump', 'Locomoción']] },
  ] },
  { n: 7, aMano: false, estaciones: [
      { est: 1, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante'], ['EJ0009', 'Sentadilla sobre bozu', 'Rodilla dominante'], ['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal'], ['EJ0111', 'Remo al menton en polea baja con barra', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal'], ['EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal']] },
      { est: 4, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0281', 'Planchas colchoneta', 'Core anti-extensión'], ['EJ0279', 'Planchas + crunch de rodillas por fuera colchoneta', 'Core anti-extensión'], ['EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0058', 'Saltos laterales al cajon un pp', 'Locomoción'], ['EJ0090', 'Trote en el lugar', 'Locomoción'], ['EJ0059', 'Saltos laterales al cajon dos pp', 'Locomoción'], ['EJ0088', 'Skiping', 'Locomoción']] },
  ] },
  { n: 8, aMano: false, estaciones: [
      { est: 1, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0192', 'Sentadilla + Biceps con banda elastica', 'Rodilla dominante'], ['EJ0225', 'Sentadillas sobre bozu con keteball', 'Rodilla dominante'], ['EJ0030', 'Sentadillas sobre bozu + hombros con keteball', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal'], ['EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal'], ['EJ0148', 'Remo cerrucho polea baja con barra', 'Tracción horizontal'], ['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal']] },
      { est: 4, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0257', 'Espinales con elevacion de pp alternas colchoneta', 'Core anti-extensión'], ['EJ0283', 'Vizagras alternos colchoneta', 'Core anti-extensión'], ['EJ0265', 'Inferiores con agarre, elevacion de cadera pp al techo colchoneta', 'Core anti-extensión'], ['EJ0267', 'Inferiores con agarre, elevacion de pp rodillas flexionadas mas cadera colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0083', 'Trote con banda arnes hacia delante volviendo suave', 'Locomoción'], ['EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción'], ['EJ0085', 'Burpees', 'Locomoción'], ['EJ0242', 'Sentadilla profunda mas salto', 'Locomoción']] },
  ] },
  { n: 9, aMano: false, estaciones: [
      { est: 1, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante'], ['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante'], ['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante'], ['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante']] },
      { est: 3, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal'], ['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal'], ['EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0294', 'Superiores cortitos con rodillas suspendidas a 90 grados colchoneta', 'Core anti-extensión'], ['EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión'], ['EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión'], ['EJ0289', 'Superiores cortitos con pp esiradas apoyadas en piso colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0090', 'Trote en el lugar', 'Locomoción'], ['EJ0088', 'Skiping', 'Locomoción'], ['EJ0089', 'Trote rodilla arriba', 'Locomoción']] },
  ] },
  { n: 10, aMano: false, estaciones: [
      { est: 1, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0030', 'Sentadillas sobre bozu + hombros con keteball', 'Rodilla dominante'], ['EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante'], ['EJ0224', 'Sentadillas sobre bozu con sng bag', 'Rodilla dominante']] },
      { est: 3, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal'], ['EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal'], ['EJ0193', 'Sentadilla + Remo con banda elastica', 'Tracción horizontal']] },
      { est: 4, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0267', 'Inferiores con agarre, elevacion de pp rodillas flexionadas mas cadera colchoneta', 'Core anti-extensión'], ['EJ0283', 'Vizagras alternos colchoneta', 'Core anti-extensión'], ['EJ0144', 'Plancha + Remo a un bb de dorsales con banda elastica (derecha)', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0062', 'Subidas al cajon con pp alternos y saltos', 'Locomoción'], ['EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción'], ['EJ0059', 'Saltos laterales al cajon dos pp', 'Locomoción'], ['EJ0242', 'Sentadilla profunda mas salto', 'Locomoción']] },
  ] },
  { n: 11, aMano: false, estaciones: [
      { est: 1, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante'], ['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante'], ['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante'], ['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante']] },
      { est: 3, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal'], ['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal'], ['EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0296', 'Superiores cortitos con pp apoyados en piso colchoneta', 'Core anti-extensión'], ['EJ0278', 'Planchas con apoyo de palmas de manos bb estirados y adelante colchoneta', 'Core anti-extensión'], ['EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión'], ['EJ0294', 'Superiores cortitos con rodillas suspendidas a 90 grados colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0243', 'Sentadilla media profundidad + salto', 'Locomoción'], ['EJ0089', 'Trote rodilla arriba', 'Locomoción'], ['EJ0090', 'Trote en el lugar', 'Locomoción']] },
  ] },
  { n: 12, aMano: false, estaciones: [
      { est: 1, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0225', 'Sentadillas sobre bozu con keteball', 'Rodilla dominante'], ['EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante'], ['EJ0192', 'Sentadilla + Biceps con banda elastica', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0148', 'Remo cerrucho polea baja con barra', 'Tracción horizontal'], ['EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal'], ['EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal'], ['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal']] },
      { est: 4, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0269', 'Inferiores con agarre de mano elevacion de pp rodillas flexionadas colchoneta', 'Core anti-extensión'], ['EJ0274', 'Completos sobre step + pararse colchoneta', 'Core anti-extensión'], ['EJ0156', 'Plancha + flexion - extencion de codos alternos colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0062', 'Subidas al cajon con pp alternos y saltos', 'Locomoción'], ['EJ0086', 'Jumping jump', 'Locomoción'], ['EJ0059', 'Saltos laterales al cajon dos pp', 'Locomoción'], ['EJ0058', 'Saltos laterales al cajon un pp', 'Locomoción']] },
  ] },
  { n: 13, aMano: false, estaciones: [
      { est: 1, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante'], ['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante'], ['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal'], ['EJ0111', 'Remo al menton en polea baja con barra', 'Tracción horizontal'], ['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal']] },
      { est: 4, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0281', 'Planchas colchoneta', 'Core anti-extensión'], ['EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión'], ['EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión'], ['EJ0289', 'Superiores cortitos con pp esiradas apoyadas en piso colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0085', 'Burpees', 'Locomoción'], ['EJ0242', 'Sentadilla profunda mas salto', 'Locomoción'], ['EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción'], ['EJ0090', 'Trote en el lugar', 'Locomoción']] },
  ] },
  { n: 14, aMano: false, estaciones: [
      { est: 1, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0030', 'Sentadillas sobre bozu + hombros con keteball', 'Rodilla dominante'], ['EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante'], ['EJ0009', 'Sentadilla sobre bozu', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal'], ['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal'], ['EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal'], ['EJ0148', 'Remo cerrucho polea baja con barra', 'Tracción horizontal']] },
      { est: 4, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0257', 'Espinales con elevacion de pp alternas colchoneta', 'Core anti-extensión'], ['EJ0279', 'Planchas + crunch de rodillas por fuera colchoneta', 'Core anti-extensión'], ['EJ0278', 'Planchas con apoyo de palmas de manos bb estirados y adelante colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0062', 'Subidas al cajon con pp alternos y saltos', 'Locomoción'], ['EJ0086', 'Jumping jump', 'Locomoción'], ['EJ0088', 'Skiping', 'Locomoción'], ['EJ0057', 'Saltos frontales al cajon un pp', 'Locomoción']] },
  ] },
  { n: 15, aMano: false, estaciones: [
      { est: 1, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante'], ['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante'], ['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal'], ['EJ0111', 'Remo al menton en polea baja con barra', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal'], ['EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0281', 'Planchas colchoneta', 'Core anti-extensión'], ['EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión'], ['EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión'], ['EJ0289', 'Superiores cortitos con pp esiradas apoyadas en piso colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0234', 'Estocadas alternas + salto', 'Locomoción'], ['EJ0080', 'Saltos a un pp con banda arnes', 'Locomoción'], ['EJ0242', 'Sentadilla profunda mas salto', 'Locomoción']] },
  ] },
  { n: 16, aMano: false, estaciones: [
      { est: 1, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0030', 'Sentadillas sobre bozu + hombros con keteball', 'Rodilla dominante'], ['EJ0225', 'Sentadillas sobre bozu con keteball', 'Rodilla dominante'], ['EJ0224', 'Sentadillas sobre bozu con sng bag', 'Rodilla dominante']] },
      { est: 3, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal'], ['EJ0194', 'Remo a un bb con banda elastica derecho', 'Tracción horizontal'], ['EJ0148', 'Remo cerrucho polea baja con barra', 'Tracción horizontal'], ['EJ0149', 'Remo bajo polea baja sentado en piso', 'Tracción horizontal']] },
      { est: 4, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0257', 'Espinales con elevacion de pp alternas colchoneta', 'Core anti-extensión'], ['EJ0279', 'Planchas + crunch de rodillas por fuera colchoneta', 'Core anti-extensión'], ['EJ0267', 'Inferiores con agarre, elevacion de pp rodillas flexionadas mas cadera colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0062', 'Subidas al cajon con pp alternos y saltos', 'Locomoción'], ['EJ0059', 'Saltos laterales al cajon dos pp', 'Locomoción'], ['EJ0058', 'Saltos laterales al cajon un pp', 'Locomoción'], ['EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción']] },
  ] },
  { n: 17, aMano: false, estaciones: [
      { est: 1, formato: 'AMRAP', como: '3 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante'], ['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante'], ['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante'], ['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante']] },
      { est: 3, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0193', 'Sentadilla + Remo con banda elastica', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal'], ['EJ0028', 'Sentadilla + remo con polea baja', 'Tracción horizontal']] },
      { est: 4, formato: 'AMRAP', como: '4 ejercicios · las vueltas que entren', dura: '6:00', ejercicios: [['EJ0289', 'Superiores cortitos con pp esiradas apoyadas en piso colchoneta', 'Core anti-extensión'], ['EJ0294', 'Superiores cortitos con rodillas suspendidas a 90 grados colchoneta', 'Core anti-extensión'], ['EJ0296', 'Superiores cortitos con pp apoyados en piso colchoneta', 'Core anti-extensión'], ['EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0083', 'Trote con banda arnes hacia delante volviendo suave', 'Locomoción'], ['EJ0090', 'Trote en el lugar', 'Locomoción'], ['EJ0088', 'Skiping', 'Locomoción'], ['EJ0089', 'Trote rodilla arriba', 'Locomoción']] },
  ] },
  { n: 18, aMano: false, estaciones: [
      { est: 1, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0172', 'Flexiones de brazos', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0009', 'Sentadilla sobre bozu', 'Rodilla dominante'], ['EJ0224', 'Sentadillas sobre bozu con sng bag', 'Rodilla dominante'], ['EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante']] },
      { est: 3, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal'], ['EJ0145', 'Remo parado ambos bb con banda elastica', 'Tracción horizontal'], ['EJ0148', 'Remo cerrucho polea baja con barra', 'Tracción horizontal'], ['EJ0146', 'Remo con mancuerna a un bb', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0281', 'Planchas colchoneta', 'Core anti-extensión'], ['EJ0256', 'Espinales con elevacion pp simultaneas colchoneta', 'Core anti-extensión'], ['EJ0006', 'Plancha con toque de hombros', 'Core anti-extensión'], ['EJ0265', 'Inferiores con agarre, elevacion de cadera pp al techo colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción'], ['EJ0242', 'Sentadilla profunda mas salto', 'Locomoción'], ['EJ0080', 'Saltos a un pp con banda arnes', 'Locomoción']] },
  ] },
  { n: 19, aMano: false, estaciones: [
      { est: 1, formato: 'Tabata', como: '3 ejercicios · 20s trabajo / 10s pausa · 4 vueltas', dura: '6:00', ejercicios: [['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal']] },
      { est: 2, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0247', 'Sentadilla completa sin carga', 'Rodilla dominante'], ['EJ0223', 'Sentadillas laterales con keteball', 'Rodilla dominante'], ['EJ0222', 'Sentadillas laterales con sand bag', 'Rodilla dominante'], ['EJ0248', 'Sentadilla media profundidad sin carga', 'Rodilla dominante']] },
      { est: 3, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0111', 'Remo al menton en polea baja con barra', 'Tracción horizontal'], ['EJ0099', 'Remo al menton con banda elastica', 'Tracción horizontal'], ['EJ0112', 'Remo al menton con mancuerna', 'Tracción horizontal']] },
      { est: 4, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0278', 'Planchas con apoyo de palmas de manos bb estirados y adelante colchoneta', 'Core anti-extensión'], ['EJ0294', 'Superiores cortitos con rodillas suspendidas a 90 grados colchoneta', 'Core anti-extensión'], ['EJ0285', 'Completos con flexion de rodillas cruzados colchoneta', 'Core anti-extensión'], ['EJ0287', 'Completos con plantas de pies apoyadas colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0090', 'Trote en el lugar', 'Locomoción'], ['EJ0243', 'Sentadilla media profundidad + salto', 'Locomoción'], ['EJ0058', 'Saltos laterales al cajon un pp', 'Locomoción']] },
  ] },
  { n: 20, aMano: false, estaciones: [
      { est: 1, formato: 'Tabata', como: '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas', dura: '6:00', ejercicios: [['EJ0172', 'Flexiones de brazos', 'Empuje horizontal'], ['EJ0175', 'Aperturas con banda elastica parado', 'Empuje horizontal'], ['EJ0171', 'Flexiones de brazos con apoyo de pies sobre fitball', 'Empuje horizontal'], ['EJ0014', 'Abductores en colchoneta con tobillera lateral rodilla flexionada', 'Empuje horizontal']] },
      { est: 2, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0009', 'Sentadilla sobre bozu', 'Rodilla dominante'], ['EJ0017', 'Sentadilla + extension de hombros con sandbag', 'Rodilla dominante'], ['EJ0224', 'Sentadillas sobre bozu con sng bag', 'Rodilla dominante']] },
      { est: 3, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0151', 'Remo a un bb con polea baja', 'Tracción horizontal'], ['EJ0193', 'Sentadilla + Remo con banda elastica', 'Tracción horizontal'], ['EJ0148', 'Remo cerrucho polea baja con barra', 'Tracción horizontal']] },
      { est: 4, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0283', 'Vizagras alternos colchoneta', 'Core anti-extensión'], ['EJ0274', 'Completos sobre step + pararse colchoneta', 'Core anti-extensión'], ['EJ0281', 'Planchas colchoneta', 'Core anti-extensión']] },
      { est: 5, formato: 'EMOM', como: '3 ejercicios · un minuto cada uno · 2 vueltas', dura: '6:00', ejercicios: [['EJ0077', 'Desplazamientos semi flexion con banda arnes', 'Locomoción'], ['EJ0083', 'Trote con banda arnes hacia delante volviendo suave', 'Locomoción'], ['EJ0088', 'Skiping', 'Locomoción']] },
  ] },
]

// Cuántas veces cayó cada modalidad en cada estación, entre las quince que armó el motor.
const REPARTO: { est: number; que: string; emom: number; tabata: number; amrap: number; pool: number }[] = [
  { est: 1, que: 'Empuje horizontal', emom: 7, tabata: 4, amrap: 4, pool: 3 },
  { est: 2, que: 'Rodilla dominante', emom: 11, tabata: 4, amrap: 0, pool: 11 },
  { est: 3, que: 'Tracción horizontal', emom: 6, tabata: 7, amrap: 2, pool: 11 },
  { est: 4, que: 'Core anti-extensión', emom: 7, tabata: 5, amrap: 3, pool: 25 },
  { est: 5, que: 'Locomoción', emom: 7, tabata: 8, amrap: 0, pool: 30 },
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

function Bloque({ e }: { e: Estacion }) {
  return (
    <div className="border-b border-[var(--marco-border)] last:border-b-0 px-5 py-4">
      <div className="flex items-baseline gap-3 flex-wrap mb-2">
        <span className="font-thunder uppercase text-[17px] text-black">Estación {e.est}</span>
        <Etiqueta f={e.formato} />
        <span className="text-[13px] text-black/55">{e.como}</span>
        <span className="text-[13px] text-black/40 tabular-nums ml-auto">{e.dura}</span>
      </div>
      <ol className="space-y-[6px]">
        {e.ejercicios.map(([code, nombre, patron], i) => (
          <li key={code + i} className="flex gap-3 text-[14.5px]">
            <span className="text-black/30 tabular-nums w-4 flex-shrink-0">{i + 1}</span>
            <span className="text-black/85">
              {nombre}
              <span className="text-black/40"> · {code} · {patron}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function TablaSesion({ s }: { s: Sesion }) {
  const total = s.estaciones.reduce((n, e) => n + e.ejercicios.length, 0)
  return (
    <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden">
      <div className={`flex items-baseline gap-3 flex-wrap px-5 py-3 border-b border-[var(--marco-border)] ${s.aMano ? 'bg-[var(--marco-accent-light)]' : 'bg-black/[0.02]'}`}>
        <span className="font-thunder uppercase text-lg text-black">Sesión {s.n}</span>
        <span className="text-[11px] uppercase tracking-wide text-black/50">
          {s.aMano ? 'Escrita por el coach' : 'Armada por el motor'}
        </span>
        <span className="text-[12.5px] text-black/40 ml-auto">
          {s.estaciones.length} estaciones · {total} ejercicios · 30 min
        </span>
      </div>
      {s.estaciones.map((e) => <Bloque key={e.est} e={e} />)}
    </div>
  )
}

export default function TecnoFitMotorRutinas() {
  const aMano = MES.filter((s) => s.aMano)
  const generadas = MES.filter((s) => !s.aMano)
  const distintos = new Set(
    generadas.flatMap((s) => s.estaciones.flatMap((e) => e.ejercicios.map((x) => x[0])))
  ).size
  const bloques = generadas.reduce((n, s) => n + s.estaciones.length, 0)

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
          El coach escribe cinco sesiones y el motor construye el resto del mes. Cada estación
          sigue siendo un circuito de seis minutos, como las que están cargadas hoy — lo que cambia
          son los ejercicios y la modalidad con la que se trabaja. Abajo está el mes entero, tal
          como quedó.
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
            <span className="text-xs uppercase tracking-wide text-black/50">Circuitos generados</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">{bloques}, de 6:00</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Ejercicios distintos</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">{distintos}</p>
          </div>
        </div>
      </div>

      {/* Qué hace */}
      <TwoColumnSection title="Qué hace el motor" id="que">
        <p className="text-lg">
          Toma cada sesión escrita por el coach como forma —las mismas cinco estaciones, los mismos
          seis minutos en cada una— y cambia dos cosas: qué ejercicios se hacen en cada estación y
          bajo qué modalidad se trabaja.
        </p>
        <p>
          Cada ejercicio se reemplaza por otro del mismo patrón de movimiento, que se pueda hacer
          con el equipamiento de esa estación y que el socio no tenga contraindicado. Si el socio
          tiene la rodilla marcada, los unilaterales de pierna dejan de aparecer sin que nadie
          tenga que acordarse.
        </p>
        <p className="text-sm text-black/60">
          Es determinístico: volver a generar el mismo mes da el mismo mes. Si el coach cambia algo
          y regenera, lo que ve distinto es exactamente lo que cambió.
        </p>
      </TwoColumnSection>

      {/* La estación */}
      <TwoColumnSection title="La estación es un circuito" id="bloque">
        <p className="text-lg">
          Una estación no es un ejercicio: son varios, y el socio va rotando entre ellos durante el
          turno. Las rutinas cargadas en agosto son tres ejercicios de 25 segundos de trabajo y 15
          de pausa, dando tres vueltas al circuito — seis minutos por estación, cinco estaciones,
          media hora de clase.
        </p>
        <p>
          El motor arma exactamente eso, y respeta los seis minutos siempre. Lo que sí cambia es
          <b> cuántos ejercicios entran</b>: tres son los que le sirven al Tabata, porque el reloj
          por vuelta obliga a que el circuito divida justo. En EMOM o AMRAP esa restricción no
          existe, así que el circuito puede ser de cuatro y el socio deja de reconocer la estación
          por su forma.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {[
            ['Tabata', '4 ejercicios · 20s trabajo / 10s pausa · 3 vueltas'],
            ['EMOM', '3 ejercicios · un minuto cada uno · 2 vueltas'],
            ['AMRAP', '4 ejercicios · 6 minutos corridos, las vueltas que entren'],
            ['Series', 'lo que prescribió el coach, sin reloj'],
          ].map(([f, como]) => (
            <div key={f} className="border border-[var(--marco-border)] rounded-lg p-4">
              <Etiqueta f={f} />
              <p className="text-[14.5px] text-black/70 mt-2 mb-0">{como}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-black/60">
          Las vueltas salen de dividir los seis minutos por lo que ocupa una vuelta del circuito,
          así que el bloque cierra en 6:00 aunque entren menos ejercicios de los previstos.
        </p>
      </TwoColumnSection>

      {/* La modalidad */}
      <TwoColumnSection title="La modalidad también rota" id="formato">
        <p className="text-lg">
          Rotar sólo los ejercicios deja la mitad de la variedad afuera: si el coach escribió la
          estación 3 como Tabata, el socio hacía Tabata en esa estación los treinta días. Ahora la
          modalidad rota con el circuito, y el turno en la estación sigue durando lo mismo.
        </p>
        <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-[14.5px]" style={{ minWidth: 520 }}>
              <thead>
                <tr className="border-b-2 border-[var(--marco-accent-light)]">
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-5">Estación</th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-3">EMOM</th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-3">Tabata</th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-3">AMRAP</th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-wider text-[var(--marco-accent)] py-3 px-3">Para elegir</th>
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
                    <td className="py-3 px-3 tabular-nums text-black/60">{r.pool} ejercicios</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-black/60">
          Veces que cayó cada modalidad en las {generadas.length} sesiones armadas por el motor, y
          con cuántos ejercicios del catálogo cuenta cada estación para elegir.
        </p>
      </TwoColumnSection>

      {/* El criterio */}
      <BoxedListSection
        id="criterio"
        title="Qué mira para elegir la modalidad"
        subtitle="El reloj es uno para toda la estación, así que todos los movimientos del circuito tienen que bancarlo."
        items={[
          'EMOM — las repeticiones entran en una ventana de 60 s y el descanso es lo que sobra. El socio maneja su propio ritmo, así que sirve para todo, incluso lo técnico y lo pesado.',
          'Tabata — 20 s a fondo, y otra vez. Sólo para movimientos que se puedan hacer rápido sin pensarlos: si la complejidad técnica es alta, el circuito entero queda afuera.',
          'AMRAP — seis minutos continuos. Nada obliga a frenar, así que queda afuera lo de intensidad alta, que no se sostiene sin que se caiga la técnica.',
        ]}
      />

      <ContentBox title="La modalidad se elige antes que los ejercicios">
        <p>
          Primero se decide con qué modalidad va a trabajar la estación, y después se llena el
          circuito con movimientos que la toleren. Al revés —elegir los ejercicios y ver después
          qué modalidad aguantan— basta un movimiento técnico para arrastrar toda la estación a
          EMOM, y el mes vuelve a quedar parejo.
        </p>
      </ContentBox>

      {/* Dos nombres */}
      <TwoColumnSection title="El mismo movimiento con dos nombres" id="mismo">
        <p className="text-lg">
          Un ejercicio distinto en la ficha no siempre es un movimiento distinto en el piso. Una
          sentadilla con sandbag y una con kettlebell son la misma sentadilla agarrando otra cosa,
          y al socio que las hace dos días seguidos no le cambió nada.
        </p>
        <p>
          El motor ahora mira <b>la familia de movimiento</b>, no la ficha: si ayer hubo algo de
          esa familia en la estación, hoy busca otra. Y dejamos fuera de la rotación catorce fichas
          que duplicaban movimientos que el catálogo ya tenía con otro nombre — no se borraron, sólo
          no se ofrecen.
        </p>
        <p className="text-sm text-black/60">
          En las estaciones 2 a 5 del mes de abajo no se repite ni un movimiento de un día al
          siguiente. Ni el mismo ejercicio, ni otro de la misma familia.
        </p>
      </TwoColumnSection>

      {/* Un día */}
      <TwoColumnSection title="Un día y el siguiente" id="ejemplo">
        <p className="text-lg">
          La sesión 5 la escribió el coach. La 6 la armó el motor a partir de ella: mismas cinco
          estaciones, mismos seis minutos cada una, otros ejercicios y otra modalidad.
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
      <TwoColumnSection title="Dos para revisar" id="revisar">
        <p className="text-lg">
          <b>A la estación 1 le falta catálogo, y es el único punto flojo del mes.</b> Tiene
          <b> tres</b> ejercicios de empuje horizontal que entren con su equipamiento, y un
          circuito se lleva tres por día: no hay forma de que no repita. Es la única estación donde
          pasa — las otras cuatro no repiten ni un movimiento de un día al siguiente.
        </p>
        <p>
          Con <b>seis o siete</b> empujes horizontales que entren en ese box —filmando dos o tres
          más, o sumándole material a la estación— se acomoda solo, sin tocar el motor.
        </p>
        <p>
          <b>Resuelto:</b> dos ejercicios de glúteo estaban cargados como empuje horizontal —
          <b> EJ0014</b>, abductores en colchoneta con tobillera, y <b>EJ0203</b>, glúteos patada
          en polea baja. Ya tienen su patrón correcto en el catálogo, así que no van a volver a
          aparecer en un circuito de flexiones. No tocó ninguna rutina ya armada.
        </p>
      </TwoColumnSection>

      {/* Qué sigue */}
      <BoxedListSection
        id="sigue"
        title="Qué sigue"
        subtitle="Tres, y la primera es una decisión del gym."
        items={[
          'Definir quién carga el peso que el socio levantó de verdad: el socio desde la app en el box, o el coach al cierre. Hoy la rutina arrastra lo que el coach prescribió; con el dato real, el peso sube solo.',
          'Sumar tres o cuatro ejercicios de empuje horizontal que entren en la estación 1: hoy tiene tres y el circuito se lleva tres por día.',
          'Llevar las modalidades por tiempo a la app del socio — la pantalla del box ya las muestra con el reloj corriendo.',
        ]}
      />
    </>
  )
}
