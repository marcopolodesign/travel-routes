# Picnic — brief de contexto para definir el producto

> **Cómo usar este documento.** Pegalo entero como primer mensaje de una conversación
> nueva con Claude. Está escrito para que Claude arranque sabiendo todo lo que ya
> sabemos, no vuelva a preguntar lo que está acá abajo, y dedique la charla a
> sacarme lo que falta.

---

## Lo que tenés que hacer, Claude

Sos el analista de producto de este proyecto. Yo soy Mateo, de Marco Polo — la
agencia que va a construir el sistema. El trabajo **ya está aprobado y el
presupuesto ya está cerrado con el cliente**: no hay que vender nada ni discutir
precios.

Lo que falta es el **spec de producto**: cómo funciona realmente el sistema que
vamos a construir. Yo tengo el detalle operativo en la cabeza y en reuniones que
no quedaron transcriptas. Tu trabajo es sacármelo.

**Cómo quiero que lleves la charla:**

1. Leé todo este documento antes de escribir nada.
2. Empezá diciéndome, en cinco líneas, qué entendiste del negocio — así corrijo
   de entrada si algo quedó torcido.
3. Después entrevistame. **De a una o dos preguntas por mensaje**, no listas de
   quince. Seguí el hilo de lo que te contesto antes de saltar al tema siguiente.
4. Al final de "Lo que hay que averiguar" te dejé los huecos que ya detecté.
   Usalos como guía, no como cuestionario cerrado — si algo de lo que te cuento
   abre una pregunta mejor, hacela.
5. Cuando algo que digo choca con otra cosa que dije antes, marcámelo en el
   momento. Es más barato que descubrirlo construyendo.
6. No inventes reglas de negocio para tapar un hueco. Si no te lo dije, preguntá
   o dejalo anotado como pendiente.

**Lo que tenés que producir al final** está especificado abajo, en "El entregable".

---

## El negocio

**Picnic BTL S.A.** es una agencia de BTL argentina. Su operación principal —la
que nos ocupa— es **colocar cartelería para Pedido Ya** en los locales
gastronómicos adheridos a la app: pizzerías, restaurantes, kioscos.

La escala:

| | |
|---|---|
| Puntos de colocación | ~3.000 |
| Etapas por mes | ~80 |
| Carga manual de una etapa hoy | ~4 horas |
| Deadline del sistema actual | **1° de enero** |

El circuito, en grueso: Pedido Ya define una campaña sobre un conjunto de
locales → Picnic la organiza en **etapas** → manda **repositores** al campo →
cada repositor coloca el material y **saca fotos como prueba** → Picnic consolida
y le reporta a Pedido Ya.

La foto es el corazón del negocio: es lo único que prueba que el trabajo se
hizo, y es lo que Picnic le factura al cliente.

## El sistema de hoy y por qué se cae

Hoy corre sobre `pedidosyatrade.com.ar`, un sistema heredado con tres problemas
que son, literalmente, el motivo por el que nos contrataron:

**1. No tiene autenticación.** Cualquiera con el link sube fotos. No hay usuario,
no hay autoría, no hay rastro de quién cargó qué.

**2. Ya hubo fraude real, no hipotético.** Dos casos concretos que me contó el
cliente:
- Fotos de **2023 reutilizadas** para acreditar 50 locales.
- Una foto **generada con IA** presentada como prueba de colocación.

**3. La carga es manual y cara.** Preparar una etapa consume ~4 horas de trabajo
humano, y son ~80 etapas por mes.

Y encima, **el sistema vence el 1° de enero**. Si no hay reemplazo, la operación
se queda sin plataforma.

## Los datos reales

En el repo hay una exportación real del sistema viejo:
`migracion-picnic/Etapa 84/Backlights CABA/2026-08-21_locales_BACKLIGHTS CABA.csv`

Este es su esquema exacto — es la mejor foto que tenemos de cómo piensa la
operación hoy:

```
etapa · grid · nombre · telefono · direccion · provincia · ciudad · barrio ·
visitas_realizadas · visita_efectiva · saliente_efectivo · sticker_efectivo ·
motivo_de_rechazo · comentarios · foto1 · foto2 · fecha
```

Una fila real:

```
84 · 4OV2OC · "Pizzeria La Continental - San Telmo" · 541137617377 ·
"Defensa 701" · Capital Federal · Buenos Aires · Monserrat ·
1 · SI · SI · NO · (sin motivo) · "Instalación y conexión ok" ·
[foto1] · [foto2] · 2026-07-16
```

Lo que se lee del esquema, y que conviene confirmar conmigo antes de darlo por
cierto:

- **`grid`** parece ser el identificador único del punto de colocación (`4OV2OC`).
- **`etapa`** es un número correlativo que agrupa un lote de trabajo (acá, la 84).
- **`saliente_efectivo`** y **`sticker_efectivo`** sugieren que en una misma
  visita se colocan **varios tipos de material distintos**, y cada uno se
  acredita por separado. La carpeta se llama "Backlights CABA", así que
  *backlight* sería un tercer tipo. **Preguntame cuál es el catálogo completo.**
- **`visita_efectiva`** vs. **`visitas_realizadas`**: se puede visitar un local y
  que la visita no sirva. Ahí entra `motivo_de_rechazo`.
- **Dos fotos por registro** (`foto1`, `foto2`), alojadas como URLs sueltas en un
  servidor público, sin metadatos ni autoría.

## Lo comercial, que ya está cerrado

Esto **no se discute en la charla** — está acordado con el cliente. Va acá sólo
para que sepas qué entra en cada fase y no me propongas meter en la Fase 1 algo
que se vendió para la Fase 3.

**Fase 1 — U$10.000 a 13.500 · 4 a 6 semanas**
Plataforma nueva. Autenticación con tres roles. Carga en campo con **autoría de
cada foto**. Migración de la operación actual. Exclusivo para el flujo de
Pedido Ya.

**Fase 2 — U$4.500 a 6.500 · 2 a 3 semanas · se contrata con la Fase 1 en producción**
Ingesta del Excel que manda Pedido Ya, con división automática por zona. Es la
fase que convierte las 4 horas de armado de etapa en minutos.

**Fase 3 — U$15.000 a 22.000**
App mobile con geolocalización y rutas. Multi-cliente: además de Pedido Ya,
Branca, Morixe y Media Monks.

**Retainer:** U$1.500/mes durante Fases 1 y 2. U$2.500 a 3.500/mes desde la Fase 3.

**Tres decisiones de producto que ya tomé y que sostengo:**

1. **El control antifraude no es un módulo que se cotiza y se entrega.** Es el
   eje del retainer. Razón: los métodos para esquivar un control cambian, así que
   el control tiene que cambiar con ellos. Un antifraude "terminado" es un
   antifraude vencido.
2. **El leaderboard de efectividad por repositor se plantea como beneficio, no
   como castigo.** El que trabaja bien lo ve; no es un panóptico.
3. **La Fase 3 se cobra como build + retainer más alto, no como fee por usuario.**

Y un dato de calendario: hay ~19 semanas hasta el 1° de enero para un build de
4 a 6. **No hay presión de deadline** — el calendario cómodo juega a favor.

## Lo ya decidido del lado técnico

- Trabajo aprobado; todavía no se factura.
- Staging real: **Supabase nuevo + preview de Vercel**. No se duplica el admin.
- Yo mando los archivos crudos de la operación actual para la migración.
- Stack por defecto de la casa: React + Vercel + Supabase.

---

## Lo que hay que averiguar

Estos son los huecos que ya detecté. Preguntámelos en este orden — de lo más
estructural a lo más fino — y frená a profundizar cuando una respuesta abra algo
interesante.

### 1. El modelo: qué es cada cosa

- **Etapa**: ¿qué la define? ¿Es un lote de locales, una campaña de Pedido Ya, un
  período de tiempo, una zona? ¿Cuál es su ciclo de vida de punta a punta?
- **Punto de colocación (`grid`)**: ¿el código lo asigna Pedido Ya o Picnic? ¿Es
  estable en el tiempo? ¿Un mismo local puede tener varios puntos?
- **Material**: catálogo completo de tipos (saliente, sticker, backlight, ¿qué
  más?). ¿Cada punto tiene un set fijo de materiales o se define por campaña?
- ¿Un mismo local puede estar en dos etapas simultáneas?

### 2. Los tres roles

Asumo que son **repositor en campo**, **alguien de Picnic que supervisa** y
**alguien de Pedido Ya que mira los resultados** — pero es una inferencia mía,
confirmámelo. Y de cada uno: qué ve, qué puede hacer, qué no puede hacer nunca.

- ¿El cliente (Pedido Ya) entra al sistema, o recibe un reporte y nada más?
- ¿Los repositores son empleados de Picnic o freelance por etapa? ¿Rotan mucho?
- ¿Cuántos repositores activos hay en un mes típico?

### 3. El circuito de campo

- ¿Quién le asigna los puntos a cada repositor, y con qué criterio?
- ¿Cómo se entera hoy el repositor de a dónde tiene que ir?
- ¿Va con el material encima o lo retira en algún lado?
- **Conectividad**: ¿hay puntos sin señal? ¿La carga tiene que funcionar offline
  y sincronizar después?
- ¿Qué pasa cuando llega y no puede colocar? (cerrado, el dueño no quiere, el
  local ya no existe). ¿`motivo_de_rechazo` es una lista cerrada o texto libre?

### 4. La foto — el punto crítico

Esta es la parte que justifica todo el proyecto, así que es donde más quiero que
insistas:

- ¿Qué hace que una foto sea **válida**? ¿Alcanza con que se vea el material, o
  tiene que verse algo más (la fachada, el número de puerta, el cartel del local)?
- ¿Por qué son **dos** fotos? ¿Son dos ángulos, antes/después, dos materiales?
- **¿Quién revisa las fotos hoy, y cuánto tarda?** ¿Se revisan todas o por muestreo?
- ¿Qué pasa cuando una foto se rechaza? ¿El repositor vuelve al local?
- Los dos fraudes que ya pasaron: ¿cómo se descubrieron? ¿Alguien los cazó
  mirando, o saltaron por otro lado?
- ¿Hasta dónde estamos dispuestos a llegar con la verificación —
  geolocalización, timestamp del dispositivo, cámara embebida que no deja subir
  de la galería— y qué de eso le complica la vida al repositor honesto?

### 5. La entrega al cliente

- ¿Qué recibe Pedido Ya al final de una etapa, y en qué formato?
- ¿Cada cuánto? ¿Por etapa, semanal, mensual?
- ¿Sobre qué le factura Picnic a Pedido Ya — por punto colocado, por etapa, fijo?
- ¿Hay un SLA o un umbral de efectividad comprometido?

### 6. La Fase 2 — el Excel de Pedido Ya

- ¿Quién lo manda, cada cuánto, y con qué estructura?
- ¿Podés conseguirme uno real para mirar?
- **"División automática por zona"**: ¿qué es una zona? ¿Barrio, radio
  geográfico, recorrido de un repositor, criterio propio de Picnic?
- ¿Dónde se van exactamente las 4 horas de hoy? Quiero el detalle del paso a
  paso manual, porque ahí está lo que hay que automatizar.

### 7. Migración

- ¿Cuánta historia hay que traer del sistema viejo? ¿Todas las etapas o las
  últimas N?
- Las fotos viejas viven en URLs de `pedidosyatrade.com.ar`. **Cuando ese sistema
  se apague el 1° de enero, ¿esas fotos se pierden?** Si sí, hay que
  descargarlas todas antes — y eso es trabajo que hoy no está en ningún lado.
- ¿Tenemos acceso a la base del sistema viejo o sólo a exportaciones CSV como la
  de la Etapa 84?

### 8. Fase 3 y multi-cliente

- Branca, Morixe y Media Monks: ¿su operación se parece a la de Pedido Ya o es
  otra cosa?
- ¿Qué tiene que ser configurable por cliente para que el mismo sistema sirva
  para los cuatro?

---

## El entregable

Cuando terminemos de conversar, escribime **un solo documento en Markdown**, en
español, listo para que lo lea otro Claude que va a construir el sistema. Con
esta estructura:

1. **Resumen ejecutivo** — qué es Picnic y qué vamos a construir, en un párrafo.
2. **Glosario** — etapa, grid, punto, material, visita efectiva, repositor y todo
   término del negocio que aparezca. Un renglón cada uno.
3. **Los roles** — qué ve y qué puede hacer cada uno.
4. **Los flujos** — de punta a punta, escritos como pasos numerados: armado de
   etapa, asignación, carga en campo, revisión, reporte al cliente. Marcá en cada
   paso qué es hoy manual y qué pasa a ser automático.
5. **Modelo de datos propuesto** — entidades, campos y relaciones, anclado en el
   esquema real del CSV de la Etapa 84.
6. **Reglas de validación de foto** — todo lo que hace válida o inválida una
   prueba de colocación.
7. **Alcance por fase** — qué entra en la Fase 1, en la 2 y en la 3, respetando
   lo que ya está vendido.
8. **Decisiones tomadas** — cada una con su porqué en una línea.
9. **Preguntas abiertas** — lo que quedó sin responder, y de quién depende la
   respuesta (mía o del cliente).

Dos reglas para ese documento:

- **Separá lo que te dije de lo que inferiste.** Si algo lo dedujiste vos, marcalo
  como supuesto. No quiero descubrir en la semana 3 que una regla de negocio la
  inventó un modelo.
- **Nada de relleno.** Si una sección quedó vacía porque no llegamos a cubrirla,
  ponelo así y listo.
