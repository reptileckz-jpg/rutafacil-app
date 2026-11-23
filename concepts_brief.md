# Bodega, Cargas y Clientes más fáciles de leer y de llenar (y el error "Las taras no cuadran por lugar")

**Autor:** Ricardo Nieto
**Fecha:** 23 de noviembre de 2026
**Tipo:** lluvia de ideas antes de programar (todavía no se cambia nada de la app)

> **Cómo se hizo este documento.** Se pidió revisarlo con 7 revisores, cada uno desde un punto de vista distinto. En esta sesión no se pudieron lanzar: **ninguno corrió** (ver la tabla al final). Lo que sigue sale de leer directamente el código de la app (base, capas, pruebas y bitácora). Por eso hay que tomarlo como una primera revisión hecha por una sola persona, no como el resultado de los 7 revisores. Si se quiere la revisión completa, hay que volver a pedirla.

---

## 1. Resumen

Ricardo se confunde al capturar y al buscar datos en **Bodega**, **Cargas (viajes de carga)** y **Clientes** porque cada pantalla enseña todo al mismo tiempo. La propuesta es:

- **Mismo diseño de siempre.** Mismas tarjetas, botones, pestañas, chips, "← Volver" y la misma forma de entrar a cada pantalla. No se rediseña nada.
- **Arriba, solo lo esencial.** Lo demás se abre con **"Ver todo ›"** en su propia pantalla. Una tarjeta por tema, nunca tarjetas dentro de tarjetas.
- **Todo lo que se captura va por pasos.** Un paso por pantalla, con "Paso N de M" y "← Atrás", igual que "Iniciar el día" y la venta en ruta.
- **No se pierde ningún dato.** Todo lo que hoy se ve sigue en la app, aunque quede en otra pantalla.
- **Se revisa el único error que llegó a la nube en 14 días:** "Las taras no cuadran por lugar". Salió 2 veces, en las versiones 10.11 y 10.20.

Ricardo es quien dirá si funcionó, probando la app él mismo.

**Lo más importante que se encontró:**

1. **El error de las taras se esconde solo.** La app tiene una regla que marca como "arreglado en la 9.9" ese mismo error cada vez que vuelve a salir. Además, el detalle que manda no enseña todas las partes de la cuenta. Así no se puede saber de dónde viene.
2. **Muchas partes de la app "buscan" cosas en estas pantallas por su texto o por su lugar.** Hay unas 87 referencias en unos 50 archivos, entre ellas los avisos con "Ir ›"/"Atender", el tutorial y "Pendientes". Si algo se mueve a "Ver todo", esos botones pueden dejar de llevar al lugar correcto **sin que nadie lo note**.
3. **Mover lo que se captura a pasos toca dinero y cajas.** Pasa al recibir una carga y anotar las cajas vacías que regresaron, al meter a madurar y al registrar un abono. Hay que usar exactamente las mismas cuentas de hoy y comprobarlo con las pruebas de comparación.

---

## 2. Análisis

### 2.1 Qué pasa hoy en cada pantalla

**Bodega** (`bodega()` en la base y `tema-bodega.js`, más muchas capas que le agregan tarjetas):
- Hasta arriba salen la sugerencia de cuánto meter a madurar y las existencias (roatán y macho, y adentro la parte de maduración). Luego vienen otras frutas, una tarjeta por cada lote madurando y la fruta madura por antigüedad. Después siguen las cajas sin contar, el buró de taras, la tarjeta de taras, el conteo de bodega, las bodegas y el aviso "Las taras no cuadran".
- **"Meter a maduración" es un formulario de 5 datos en la misma pantalla:** producto, cantidad, clima, temperatura, horas y método. Es justo lo que Ricardo pidió que fuera por pasos.
- El conteo de bodega ("Registrar conteo") también es un formulario largo en la pantalla.

**Cargas** (`cargas()` y `cargaCard()` en la base, más `tema-viaje.js`, `tema-carga173.js` y `tema-viaje31.js`):
- Arriba salen el pronóstico y el próximo lote. Abajo, **todas** las cargas, que se abren ahí mismo. Al final vienen el historial de viajes, las plantillas, las básculas y los proveedores.
- **Al abrir una carga salen a la vez:** el viaje programado, "Completar con lo que se compre" (5 campos), la tarjeta de costos, "Ver detalle", la liquidación del viaje, "Cajas vacías que regresaron", "Llega a", "Marcar como recibida", la calidad con su nota, "Pagar al proveedor", "Modificar", el historial de cambios y "Agregar un gasto que se pasó" (2 campos).
- **Hay una tarjeta dentro de otra tarjeta** (la de "Pagaste / Viaje / Le debes", dentro de la tarjeta de la carga). Va contra la regla de Ricardo.

**Clientes** (`tema-pantallas.js` `cli92` y la ficha `fiCli` en `l2.js`, más `tema-fichas.js` y `tema-cobranza.js`):
- La lista ya tiene las pestañas Clientes · Pedidos · Cobranza. Esas pestañas funcionan **escondiendo** pedazos de la pantalla según su texto ("si empieza con 'Cobranza'…"). Si un texto cambia, algo puede quedar visible o escondido donde no va.
- La ficha del cliente ya tiene pestañas (Cuenta · Datos · Visitas · Más). Pero **"Abonó $" se escribe ahí mismo**, sin pasos y sin "¿Estás seguro?", y **"Editar datos" abre todos los campos al mismo tiempo**.

### 2.2 El error "Las taras no cuadran por lugar"

**Qué revisa.** No compara contra lo que *debería* haber; eso lo hace otra revisión, "Las taras no cuadran". Esta revisa que el **total** de taras sea igual a la **suma de sus partes**: vacías en bodega, llenas, en camión, vacías en el camión, con clientes y con proveedores. Si todos los números fueran números de verdad, nunca podría fallar. **Cuando falla, casi siempre es porque un dato quedó guardado como texto o vacío y la suma se rompe**, no porque falten taras de verdad.

**Lo que se encontró en el código:**

1. **La cuenta base no limpia los números.** `cajasDonde()` (base, línea 281) suma sin pasar por `num()`:
   - lo que debe cada cliente (`c.vac`);
   - las cajas de los lotes madurando (`l.q`, en `madR()`);
   - las vacías que se mandaron al proveedor (`c.vacEnv`);
   - las existencias de la bodega.

   Si uno de estos llega como texto (por ejemplo, desde la nube, una importación o un campo de captura), el total se arma "pegando" textos en vez de sumar. Las capas de encima sí usan `num()`, pero la base no. Ya pasó antes: la bitácora tiene "Total —" (13 y 16 nov) y "Total NaN" (arreglado en la 121).
2. **El detalle que se manda engaña.** Al armar el mensaje (`tema-sueltas.js`, línea 64), cada parte se pasa por `num()`, así que en el detalle **todas las partes se ven bien y sí suman**, aunque el total esté roto. Tampoco salen las "vacías en el camión" (`camV`), las de un cierre sin contar ni las de un cierre atrasado (`atras2`). Con ese mensaje no se puede saber cuál dato falló.
3. **El error se marca como arreglado solo.** En `tema-retencion.js` (línea 86), la lista `ARREG122` incluye "Las taras no cuadran por lugar". Una vez al día, cuando el administrador abre la app, cualquier reporte automático con ese texto queda como "Arreglado en la versión 9.9", **aunque sea de la 10.20**. Por eso puede parecer que "solo salió 2 veces", cuando quizá salió más y se escondió en "Problemas reportados".
4. **Las dos versiones dan una pista.** La 10.11 es de antes del arreglo de las taras de cierres atrasados (punto 2, versión 10.17) y la 10.20 es de después. Ese arreglo era para otra revisión ("deberían ser"). Que siga saliendo en la 10.20 apoya la idea de que la causa es un dato mal guardado y no un conteo.
5. **Algo aparte que conviene confirmar:** `cajasDonde()` solo mira la bodega principal (`S.inv`), no las demás bodegas (`S.invB`). Si un día se usa una segunda bodega, sus cajas no saldrían en "dónde están". Eso daría otro aviso ("deberían ser"), no este.

**Qué falta para cerrar el caso.** Hay que leer el texto completo de los 2 reportes de la nube: dicen "Total …" seguido de un número, "NaN" o "—". El repositorio es público, así que **se necesita el permiso de Ricardo y que los datos salgan cifrados** (ya está decidido así en el documento de contexto).

### 2.3 Objeciones y riesgos (de mayor a menor)

**Bloqueadores (resolver antes de empezar):**

- **B1. El error de las taras se esconde y no se puede diagnosticar.** Vienen de los puntos 1 a 3 de la sección 2.2. Primero hay que dejar de marcarlo como arreglado en automático (solo marcar los de antes de la 9.9) y mandar en el detalle **todas** las partes, con el valor tal como está guardado (número o texto). Sin eso, cualquier arreglo es a ciegas.
- **B2. Botones que llevan a un lugar exacto.** Los avisos ("Atender", "Ir ›"), "Pendientes" (punto 27), el centro de pendientes (punto 30), el tutorial y "Aprende la app" buscan cosas dentro de Bodega, Cargas y Clientes. Si esas cosas pasan a "Ver todo", el botón puede abrir la pantalla correcta pero no enseñar nada. En el punto 174 ya se revisaron 2,762 botones; esta reorganización puede descomponer varios. **Cada destino tiene que abrir directo su pantalla de "Ver todo" o su primer paso**, y hay que comprobarlo con una prueba.

**Importantes:**

- **I1. Las capas que cambian la pantalla "por texto".** Varias capas insertan o esconden cosas buscando un texto o un pedazo de HTML. Por ejemplo, "ponerlo después de `</h1>`", "esconder si empieza con 'Cobranza'" o "esconder si dice 'Avanzar el reloj'". Si una de ellas ya no encuentra lo que busca, **no avisa**: deja la pantalla como estaba o pone la cosa en otro lugar. Hay que hacer la lista de estas capas por pantalla antes de mover nada.
- **I2. Las cuentas no deben cambiar.** Pasar a pasos lo que mueve dinero o cajas (recibir carga y vacías que regresaron, meter a madurar, sacar maduro, abono, pagar al proveedor, conteo de bodega) debe **llamar a las mismas acciones de hoy** con los mismos datos. Las pruebas `comp-bodega`, `comp-cajas` y `comp-venta` deben salir IDÉNTICAS, y `t61`, `t120`, `t121`, `t122` y `t123nube` en 0 FAIL (reglas de los números).
- **I3. "No perder ningún dato" hay que poder comprobarlo.** Si no, es solo una promesa. Propuesta: una prueba que haga la lista de todo lo que hoy se ve (textos, números y botones) en cada pantalla, con datos de prueba, y revise que **cada cosa siga apareciendo** en la pantalla principal o en su "Ver todo".
- **I4. Editar un solo dato por pasos puede ser más lento.** Si Ricardo solo quiere cambiar el teléfono de un cliente, pasar por 8 pasos es peor que hoy. Ver la idea 3 de la sección 2.4.
- **I5. Ricardo usa la versión web en una computadora.** Los pasos de una sola pregunta se ven vacíos en pantalla ancha y obligan a usar mucho el ratón. Conviene: ancho máximo como hoy, **Enter = Siguiente** y **Esc = Atrás** (ya hay algo parecido en el PIN con teclado, punto 29).
- **I6. El teclado y los brincos.** Ya se arreglaron el teclado que se cierra solo (175) y la pantalla que brinca (15). Las pantallas nuevas con campos deben seguir esas mismas reglas del redibujado; si no, regresan esos errores.

**Menores:**

- **M1.** El documento de contexto dice que "el siguiente punto es el 26", pero ya existen del 26 al 31. Esta mejora debería numerarse desde el **32**.
- **M2.** En Cargas, "Ver detalle" y la tarjeta de costos repiten parte de lo mismo. Al reorganizar se puede dejar una sola vez, sin quitar ningún número.
- **M3.** Los textos de "Ver todo" deben decir qué se va a ver ("Ver todo lo de esta carga ›"), como ya se hace en "Ver todo lo de esta ruta ›" (`tema-atras6.js`). Ese ejemplo ya funciona y conviene copiarlo.

### 2.4 Choques entre metas y cómo resolverlos

1. **"Menos cosas a la vista" contra "no perder nada".** Se resuelve sin quitar nada: lo esencial sale arriba y "Ver todo ›" abre su pantalla. Para comprobar que nada se perdió, se usa la prueba de la lista (I3). Ya existe un ejemplo en la app: la pantalla "Ver todo lo de esta ruta" (`ruta6`), con su "← Volver" a la pantalla de donde vino.
2. **"Capturar por pasos" contra "no cambiar las cuentas".** Los pasos solo **juntan los datos**. Al final, en "Revisar y guardar", se llama al mismo botón y a la misma acción de hoy. Así se hizo la venta en ruta por pasos (125) y `comp-venta` salió idéntico.
3. **"Un paso por pantalla" contra "cambiar un solo dato rápido".** Para **dar de alta** algo nuevo se usan todos los pasos. Para **corregir** algo que ya existe, se toca el renglón (por ejemplo, "Teléfono") y se abre **un solo paso** con ese dato y "Guardar". Sigue siendo una pregunta por pantalla, pero sin recorrer todo.
4. **"Lo esencial arriba" contra "lo urgente".** Si algo está mal (taras que no cuadran, cajas sin contar, carga sin precio, cliente con deuda vencida), su aviso **sube arriba** aunque normalmente esté en "Ver todo", como ya se hace con el precio de hoy (24).
5. **"Mismo diseño" contra "pantallas nuevas".** Las pantallas nuevas solo usan piezas que ya existen: barra de pasos, "Paso N de M", "← Atrás", "← Volver", tarjetas, chips y pestañas `tabs92`. No se crea ningún estilo nuevo.

---

## 3. Metas y lo que no se busca

**Metas:**

- Que Ricardo encuentre lo que busca en Bodega, Cargas y Clientes sin bajar mucho la pantalla.
- Que cada captura en esas pantallas sea por pasos, una pregunta por pantalla, con "Paso N de M" y "← Atrás".
- Que ningún dato, número o botón deje de estar en la app (con una prueba que lo revise).
- Que todos los "Ir ›", "Atender", "Pendientes" y el tutorial sigan llevando al lugar exacto.
- Que las cuentas salgan idénticas a las de hoy (pruebas de comparación).
- Entender y cerrar el error "Las taras no cuadran por lugar", y que si vuelve a salir **no se esconda**.

**Lo que no se busca:**

- Rediseñar colores, letras, íconos o animaciones.
- Cambiar cómo se calculan dinero, cajas o kilos (solo se arregla que un dato guardado como texto rompa la suma).
- Borrar o resumir datos.
- Tocar las pantallas del chofer, Inicio, Gastos, Vehículos o Personal (pueden venir después con lo aprendido aquí).
- Proponer el "modo papá" o un modo sencillo aparte. Ya está anotado para después (sección 9 del contexto).

---

## 4. Opciones que se pesaron

| Opción | A favor | En contra | Decisión |
|---|---|---|---|
| **A. Desplegables dentro de la misma pantalla** (como el "Ver detalle" de hoy) | Poco trabajo | Lo de adentro se sigue viendo en la misma pantalla y en Cargas termina en tarjetas dentro de tarjetas. Es lo que hoy confunde | No |
| **B. Lo esencial en la tarjeta + "Ver todo ›" en su propia pantalla; capturas por pasos** | Es lo que pidió Ricardo. Ya hay un ejemplo que funciona (`ruta6`) y una barra de pasos (`wz-hd`) | Hay que corregir los destinos de avisos y del tutorial (B2) y las capas que buscan por texto (I1) | **Sí** |
| **C. Pestañas arriba en cada pantalla** (por ejemplo, Bodega: Hoy · Maduración · Taras) | Ya existe la pieza (`tabs92`) | Si se usa sola, cada pestaña puede volver a llenarse de cosas | Solo como ayuda a B, donde ya hay pestañas (Clientes) |
| **D. Un buscador arriba** | Útil en la computadora | No resuelve las capturas largas y es algo nuevo en el diseño | Para después |
| **E. Un modo sencillo aparte** | — | Dos versiones de cada pantalla para mantener. Ya está anotado para después | No |

---

## 5. Decisiones clave y orden de trabajo

### 5.1 Preguntas para Ricardo (antes de programar)

1. **¿Qué es "lo esencial" en cada pantalla?** Propuesta para que la corrija:
   - **Bodega:** existencias de roatán y macho, los lotes madurando (cuánto falta) y avisos en rojo si los hay. Botones "Meter a madurar" y "Contar la bodega". Lo demás va a "Ver todo".
   - **Cargas:** cada carga en una tarjeta corta (proveedor, fruta, fecha, estado, cajas y lo que se debe) con "Ver todo lo de esta carga ›". El pronóstico y el próximo lote, como hoy. Historial, plantillas, básculas y proveedores van a "Ver todo".
   - **Clientes:** en la lista, nombre, si debe dinero o taras y su día de visita. En la ficha, lo que hay hoy arriba ("Te debe…", Ir, Llamar, WhatsApp), con el abono y la edición por pasos.
2. **Para corregir un solo dato:** ¿le gusta "tocar el renglón y que se abra un solo paso", o prefiere todos los pasos?
3. **¿Da permiso de leer los 2 reportes de la nube** de "Las taras no cuadran por lugar", con salida cifrada?
4. **¿En qué orden quiere probar las pantallas?** Propuesta: Bodega, luego Cargas, luego Clientes. Cada una en su versión, para probarla antes de seguir.

### 5.2 Etapas

**Etapa 0 – El error de las taras (primero; no cambia nada que se vea):**
- Dejar de marcar como "arreglado en la 9.9" los reportes de ese error que sean de versiones nuevas.
- Que el detalle diga todas las partes (también vacías en el camión, cierres sin contar y cierres atrasados) y cuál dato está guardado como texto o vacío.
- Con permiso de Ricardo, leer los 2 reportes y confirmar la causa.
- Que la cuenta base pase cada dato por `num()`, con su prueba (un dato como texto no debe romper la suma). **Antes de tocarlo, explicarle a Ricardo cómo se protegen los números** (reglas de los números): no se mueve ninguna caja ni ningún registro; solo se suma bien lo que ya está.

**Etapa 1 – Piezas comunes y redes de seguridad:**
- Una forma única de abrir "Ver todo ›" como pantalla propia con "← Volver", copiando lo que ya hace `ruta6`.
- Una forma única de capturar por pasos con la barra que ya existe (`wz-hd`, "Paso N de M", "← Atrás"), con Enter y Esc en la computadora.
- Prueba de "no se perdió nada" (I3) y prueba de "todos los Ir ›, Atender, Pendientes y tutorial llegan" (B2). Se corren **antes** de mover nada, para tener la lista de hoy.

**Etapa 2 – Bodega** (punto 32): lo esencial arriba, "Ver todo", "Meter a madurar" por pasos (producto, cantidad, clima y temperatura, horas, método, revisar) y "Contar la bodega" por pasos.

**Etapa 3 – Cargas** (punto 33): tarjeta corta, sin tarjeta dentro de tarjeta, "Ver todo lo de esta carga ›". Por pasos: "Completar con lo que se compre", "Recibir en bodega" (con las cajas vacías que regresaron y a qué bodega llega), "Agregar un gasto que se pasó", "Pagar al proveedor" y "Calificar". Es la etapa con más riesgo para los números: `comp-cajas` y las pruebas de viaje (`t31`, `t173`, `t96viaje`) deben salir iguales.

**Etapa 4 – Clientes** (punto 34): lista más corta. En la ficha, "Registrar abono" por pasos (cuánto, cómo pagó, revisar) con "¿Estás seguro?", y corregir datos tocando el renglón.

**Etapa 5 – Pulido de lo que salga** cuando Ricardo pruebe.

Cada etapa lleva su prueba `tNNN.js` y todas las pruebas en 0 FAIL. Se sube a la rama de trabajo con `[skip ci]` y **no se publica la APK hasta que Ricardo diga "publica"**.

### 5.3 Lista de prueba para Ricardo (cómo se mide si funcionó)

En la computadora, sin ayuda, que intente:

1. Saber cuántas cajas de roatán maduras hay y cuándo sale el siguiente lote.
2. Meter 30 cajas a madurar.
3. Encontrar cuánto se le debe a Roly y pagarle una parte.
4. Recibir una carga y anotar 5 cajas vacías que regresaron sin llenar.
5. Ver cuánto debe un cliente (dinero y taras) y registrar un abono de $200.
6. Cambiar el teléfono de un cliente.
7. Tocar un aviso con "Ir ›" o "Atender" de cada pantalla y ver que llega al lugar exacto.

Para cada una, anotar si la encontró a la primera, si se confundió y en qué. Después, en Inicio, revisar que "¿Cuadran las cuentas?" siga en verde.

---

## Estado de los revisores

| Revisor | Estado |
|---|---|
| `egm-design` | no se corrió |
| `egm-codebase-details` | no se corrió |
| `egm-zoom-out` | no se corrió |
| `egm-comprehension` | no se corrió |
| `egm-implementation-readiness` | no se corrió |
| `egm-structural` | no se corrió |
| `egm-inventive-catalyst` | no se corrió |

En esta sesión no estaba disponible la herramienta para lanzar revisores, así que no se pudo lanzar ninguno ni reintentarlo. Todo lo anterior sale de una sola lectura directa del código. Se recomienda volver a pedir la revisión con los 7 revisores antes de empezar a programar.
