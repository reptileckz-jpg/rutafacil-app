# Bodega, Cargas y Clientes más fáciles de usar (y el error "Las taras no cuadran por lugar")

* **Autor:** Ricardo Nieto (la idea) · redactado con Claude
* **Para:** Ricardo Nieto (decide y prueba)
* **Fecha:** 24 de noviembre de 2026
* **Revisión:** 7 revisores independientes ("peces dorados"), cada uno desde un ángulo distinto. Todos terminaron (ver el anexo al final).
* **Documentos que se citan:** `fuente/CONTEXTO-PARA-OTRA-IA.md` (contexto y reglas) · `fuente/REGLAS-NUMEROS.md` (reglas de los números) · `fuente/pendientes.md` (bitácora). "Punto N" es siempre de la numeración nueva.

---

## 1. Resumen

**El problema.** Ricardo se confunde al capturar y al consultar en **Bodega**, **Cargas** (los viajes de carga del administrador) y **Clientes**. Esas pantallas enseñan todo al mismo tiempo.

**La propuesta.**
- Mismo diseño de siempre (mismas tarjetas, colores, letra y animaciones). Lo que cambia es el **acomodo** y el **orden de los pasos**.
- Arriba de cada pantalla, solo lo esencial. Todo lo demás, con "Ver todo ›".
- Las capturas largas, por pasos. Las cortas no se tocan.
- No se pierde ningún dato.

**Lo que encontraron los revisores (lo más importante primero).**

1. **El error de las taras tiene otra causa de la que creíamos, y probablemente es pequeño.** No se perdieron taras.
   - La revisión que falla compara las taras de los clientes **sin convertirlas a número**.
   - Basta un cliente con ese dato guardado como texto ("3") o vacío para que diga "no cuadra", aunque las sumas sí cuadren.
   - Pasa por un momento: justo después de que baja algo de la nube y antes de que la pantalla se redibuje. Por eso salió solo 2 veces.
   - El aviso no dice qué parte falló, por eso parecía que todo sumaba bien.
2. **Riesgo real de perder taras sin que nadie lo note.** Cuando la app encuentra un número que no puede leer (por ejemplo "1,200" con coma), lo cambia por **0** "por seguridad". Ese 0 se sube a la nube como si fuera una resta de verdad. Esto va contra la regla de no borrar nada y hay que corregirlo con tu permiso.
3. **La herramienta que lee los errores de la nube los imprime sin cifrar en GitHub, que es público.** Algunos tipos de error podrían llevar nombres de clientes. Hay que cifrarla antes de volver a usarla. La vez que la usamos solo salieron números de taras.
4. **Reorganizar las 3 pantallas a la vez es arriesgado.** Muchas partes de la app (avisos con "Ir ›", el centro de pendientes, el tutorial) llegan a lugares exactos de esas pantallas. Si algo se mueve, esos botones pueden dejar de llevar al lugar correcto sin que nadie lo note.
   - Los revisores proponen una salida simple: **"Ver todo" es la pantalla de hoy tal cual**, y arriba se pone una versión corta.
   - Probarlo primero solo en **Bodega**.
5. **Ya existe la pieza para capturar por pasos** (la misma de "alta de cliente" y del abono). No hay que construir otra. El abono a cliente y el pago a proveedor **ya van por pasos con "¿Seguro?"**. Lo que sí falta es "Pagó todo", que no pide confirmación.

**Lo que necesito que decidas** (detalle en la sección 5.2):
1. ¿Quién prueba: tú en la computadora, tu papá en el celular, o los dos?
2. ¿Empezamos con un piloto solo en Bodega?
3. ¿Haces antes la lista de prueba (sección 5.3) con la versión de hoy, para ver dónde te atoras de verdad?
4. ¿Me das permiso de corregir lo del 0 que se sube a la nube (punto 2 de arriba)?

---

## 2. Definiciones (para que todos entendamos lo mismo)

- **Mismo diseño:** mismas piezas visuales (estilos, tarjetas, colores, letra, animaciones). **Sí cambian** el acomodo y el flujo: qué va arriba, qué va en "Ver todo" y qué va por pasos.
- **Lo esencial:** lo que se usa todos los días en esa pantalla, más lo que está en rojo (urgente). Se decide con lo que te atore en la lista de prueba (5.3), no por suposición. Meta medible: cabe en una pantalla del celular sin bajar.
- **Ver todo:** abre la pantalla completa de hoy, sin cambios, con "← Volver". **Un solo nivel**: no hay "Ver todo" dentro de otro. Los avisos "Ir ›" y el tutorial llevan directo a esa vista completa. Ahí no se oculta nada.
- **Por pasos:** una pregunta por pantalla, "Paso N de M" y "← Atrás".
  - Solo para capturas de **varios datos**: meter a madurar, conteo de bodega, recibir una carga con las cajas vacías que regresaron, completar lo que se compre.
  - **No** para capturas de un dato. El abono ya tiene sus pasos. Para un dato suelto, como el teléfono de un cliente, se toca el renglón y se abre solo ese dato.
  - Los datos que ya conocemos (por ejemplo el clima del último lote) vienen puestos. En la computadora: Enter = Siguiente, Esc = Atrás.
  - Antes de guardar dinero o cajas siempre hay un paso **"Revisa"**.
  - Si sales a medias, la app pregunta "¿Dejas esto a medio llenar?", igual que hoy en la entrega.
- **Viajes:** solo entra la pestaña **Cargas** del administrador. El viaje paso a paso del chofer queda fuera.

---

## 3. Análisis

### 3.1 Qué pasa hoy en cada pantalla
- **Bodega:** existencias, lotes madurando, fruta madura, cajas sin contar, buró de taras, conteo y bodegas, todo seguido. "Meter a maduración" es un formulario de 6 datos (producto, cantidad, clima, temperatura, horas y método) en la misma pantalla. El conteo también es un formulario largo.
- **Cargas:** cada carga abierta trae mucho detalle. Además, en una carga abierta hay **una tarjeta dentro de otra** (la caja de costos), algo que la regla de diseño prohíbe.
- **Clientes:** la ficha tiene muchos campos. "Editar datos" sale en varios lugares. "Pagó todo" no pide confirmación.

### 3.2 El error de las taras, explicado
- La app revisa dos cosas: (a) que el total sea igual a la suma por lugar, y (b) que las taras "con clientes" sean iguales a la suma de las taras de cada cliente.
- La (a) ya está protegida contra números raros desde el punto 120.
- La (b) compara contra los datos **tal como están guardados**. Si un cliente tiene "3" como texto o el dato vacío, falla.
- Esto pasa en un momento puntual: cuando la revisión corre justo después de recibir algo de la nube, antes de que la app limpie esos datos al redibujar.
- No se movió ninguna caja: es la revisión la que se equivoca. Pero sí hay que arreglarla, porque además el aviso esconde qué falló.
- **Aclaración:** la app marca ese aviso como "arreglado en la 9.9" ella sola, pero eso solo pasa en tu lista de "Problemas reportados". No esconde los reportes que llegan a la nube. Los 2 reportes sí son pocos de verdad.

### 3.3 Riesgos que hay que cuidar
- **Botones que llevan a un lugar exacto:** unos 87 lugares en 50 archivos llevan a Bodega, Cargas o Clientes. Con "Ver todo = la pantalla de hoy", la mayoría siguen funcionando igual. Igual hay una prueba que los recorre todos.
- **Las capturas por pasos tocan dinero y cajas.** Cada paso solo junta los datos, y al final se llama **la misma acción de hoy**, con cada número convertido a número. No hay cuentas nuevas. Las comparaciones de números deben salir idénticas.
- **Dos administradores a la vez:** mientras uno llena los pasos, el otro podría recibir la misma carga. Al guardar se revisa de nuevo y, si ya la recibieron, avisa en vez de guardar dos veces.
- **Nada de la pantalla sube a la nube:** qué paso estás llenando o de dónde vienes vive solo en tu aparato. Así no se le mueve la pantalla al otro administrador.
- **Rapidez en celulares viejos:** cada paso redibuja la pantalla. Se mide antes. Si tarda más de 0.1 s, se ajusta.

### 3.4 Lo ideal
Mover algo entre "arriba" y "Ver todo" debería ser cambiar un dato, no reescribir pantallas. Y una revisión de números nunca debería fallar por cómo está guardado un dato; si falla, debe decir qué cliente y qué dato.

---

## 4. Metas y lo que no se busca

**Metas** (y cómo se comprueba cada una):
- Ricardo hace las 7 tareas de la lista 5.3 sin preguntar → la lista misma.
- Lo esencial de cada pantalla cabe sin bajar en el celular → revisión visual en la prueba.
- No se pierde ningún dato → prueba automática que busca cada tarjeta y botón por su marca.
- El error de las taras deja de salir y, si vuelve, dice qué falló → prueba con un cliente con "3" como texto y con dato vacío.
- Ningún número cambia → comparaciones de ventas y cajas idénticas.

**Lo que no se busca:**
- Rediseño visual.
- Pantallas del chofer (incluido su viaje).
- Buscador nuevo o "modo sencillo" aparte (quedan para después).
- **"Pulir lo que salga" sin límite:** solo entra lo que Ricardo anote en estas 3 pantallas durante la prueba. Lo demás va a la bitácora como puntos nuevos.

**Cómo se resuelven los choques entre metas:**
- *Enseñar menos* contra *no perder nada*: "Ver todo" es la pantalla completa de hoy.
- *Por pasos* contra *rápido en la computadora*: pasos solo en capturas largas, datos ya puestos y Enter/Esc.
- *Mismo diseño* contra *quitar la tarjeta dentro de otra en Cargas*: se acepta porque cumple la regla de diseño.

---

## 5. Decisiones y orden de trabajo

### 5.1 Ya decidido
- No se publica nada hasta que Ricardo diga "publica".
- La numeración de esta mejora empieza en el **punto 32** (ya existen del 26 al 31).
- El error de las taras va **primero**, en una entrega chica.
- Las capturas por pasos usan la pieza que ya existe y llaman a la misma acción de hoy.
- "Ver todo" = la pantalla de hoy completa, con "← Volver".
- Lo del asistente y de "Ver todo" no sube a la nube.
- **(24 nov, Ricardo)** Prueba **Ricardo en su celular**.
- **(24 nov, Ricardo)** **Piloto solo en Bodega**; Cargas y Clientes después, si funciona.
- **(24 nov, Ricardo)** Ricardo hace la lista de prueba **antes** con la versión de hoy (ver 5.3).
- **(24 nov, Ricardo)** Permiso para que el 0 "por seguridad" deje de escribirse (avisar en vez de poner 0) y para cifrar la herramienta de errores.
- **(24 nov, Ricardo)** Los puntos 26 al 31 se publican **junto** con el arreglo de las taras (Etapa 0).

### 5.2 Falta que decida Ricardo
- Nada por ahora. Lo esencial de Bodega se decide con lo que anote en la lista de prueba.

### 5.3 Lista de prueba para Ricardo
Se hace dos veces: **antes** (con la versión de hoy) y **después**, en el celular de Ricardo. En las tareas que mueven dinero o cajas (2 a 6) se llega hasta el último botón ("Guardar", "Registrar", "Recibir") **sin tocarlo**, para no cambiar los números reales. Por cada tarea se anota: ¿la hice sin preguntar?, ¿dónde dudé o me perdí?, ¿tuve que bajar mucho la pantalla?, ¿qué sobraba o qué faltaba a la vista? Pasa si las 7 salen a la primera, sin preguntar, y "¿Cuadran las cuentas?" queda en verde.
1. Ver cuántas cajas maduras hay y cuáles se pasan pronto.
2. Meter un lote a madurar.
3. Contar la bodega.
4. Recibir una carga con las cajas vacías que regresaron.
5. Pagarle al proveedor.
6. Ver cuánto debe un cliente y registrar un abono.
7. Corregir el teléfono de un cliente.

### 5.4 Etapas
- **Etapa 0 · Error de las taras (punto 32).**
  - Qué incluye: la revisión (b) compara con números ya convertidos; el aviso dice qué condición falló, qué cliente tiene el dato raro y desde dónde se revisó; la marca automática de "arreglado" solo aplica a reportes de antes de la 9.9; el 0 "por seguridad" deja de escribirse (si das permiso); la herramienta de errores se cifra.
  - Se termina cuando pasan su prueba y las anteriores, las comparaciones de números salen idénticas y, ya publicada, no llegan reportes nuevos en una semana.
- **Etapa 1 · Piloto en Bodega.**
  - Qué incluye: versión corta arriba y "Ver todo ›"; meter a madurar y el conteo por pasos.
  - Se termina cuando la prueba de "no se perdió nada" pasa, los avisos "Ir ›" llegan, las comparaciones de bodega salen idénticas y Ricardo aprueba las tareas 1 a 3.
- **Etapa 2 · Cargas** (solo si el piloto funcionó).
  - Qué incluye: tarjeta corta por carga con "Ver todo lo de esta carga ›"; recibir carga por pasos; quitar la tarjeta dentro de otra; revisar de nuevo al guardar por si otro administrador ya la recibió.
  - Se termina cuando pasan sus pruebas (incluida la de dos celulares) y Ricardo aprueba las tareas 4 y 5.
- **Etapa 3 · Clientes.**
  - Qué incluye: lo esencial arriba; corregir un dato tocando su renglón; "¿Seguro?" en "Pagó todo".
  - Se termina cuando Ricardo aprueba las tareas 6 y 7.

---

## 6. Opciones que se pesaron

| Opción | A favor | En contra | Decisión |
| :-- | :-- | :-- | :-- |
| A. Esconder partes en desplegables dentro de la misma pantalla | Rápido | Ya existe en Bodega y no quitó la confusión; los avisos buscan tarjetas que quedan cerradas | Rechazada (revisores: zoom-out, catalyst) |
| B. Reescribir las 3 pantallas en piezas nuevas | Queda más ordenado | Rompe en silencio los "Ir ›", el tutorial y las capas que agregan tarjetas | Rechazada (revisores: diseño, código) |
| C. "Ver todo" = la pantalla de hoy y arriba una versión corta | No se pierde nada; casi no se tocan los enlaces | Dos vistas que mantener | **Elegida**, con piloto en Bodega |
| D. Buscador general | Ayuda a encontrar | No resuelve capturar; es trabajo grande | Para después |
| E. "Modo sencillo" aparte para tu papá | Simple para él | Duplica la app | Para después (está en pendientes) |
| F. Construir otra pieza para pasos | — | Ya existe una con pasos, validación y "Revisa" | Rechazada: se reusa la que hay |

---

## 7. Para quien programa (referencias)

- **Revisión que falla:** `fuente/capas/l5.js:76`, condición `w.cli===sum(...c.vac)` sin `num()`. El detalle está en `fuente/capas/tema-sueltas.js:64`: no dice qué condición falló y pasa todo por `num()`. Prueba base: `fuente/pruebas/t69.js:50` (`vac='abc'`).
- **`cajasDonde` ya usa `num()`:** `fuente/vite/parches.mjs:548-553` (punto 120). La base `fuente/base-v38.html:281` NO es lo que corre.
- **Limpieza de datos:** `sano68()` en `fuente/capas/l69.js:153-157`, solo antes de `render()` (`tema-dibujar1.js:419`). Usa `Number()`, así que "1,200" se vuelve 0, y `salPuente()` (`l61.js:17`) lo sube como movimiento. `cuentasRevisar()` también se llama desde `tema-avisos.js:18` y `tema-toast.js:22,35`, fuera del redibujado. Sugerencia: limpiar al recibir de la nube (`nbAplica`).
- **Marca automática de arreglado:** `ARREG122` en `tema-retencion.js:86-89`; solo afecta `S.probs`. Envío a la nube: `apErr` (`l69.js:20`) → `err148Pon` (`tema-version.js:21-27`, corta a 300 letras). Mandar el diagnóstico como objeto aparte y con tamaño máximo.
- **Herramienta de errores en claro:** `herramientas/leer-errores.js:22` + `.github/workflows/errores.yml`. Algunos `apErr` llevan nombres (`l69.js:154,157`, `l5.js:81`).
- **Motor de pasos:** `WZ`/`wzAbre` en `fuente/capas/l47.js:8-36`. Guarda texto (`S.wz.d[k]=t.value`, línea 27): en cada `guardar`, pasar por `num()`/`r2()` y llamar la acción de hoy. Ya existentes: abono `WZ.abc` y pago a proveedor `WZ.abp` (`l55.js:10-22`), completar datos `WZ.cliF` (`l74.js:72`). Le falta Enter/Esc. No copiar los pasos de `l3.js`, que esconden HTML buscando texto.
- **"Ver todo":** base en `ruta6` (`tema-atras6.js:126-181`). Hacer una sola función y un registro de pantallas hijas (`esPantalla('bodega')` que también cuente "bodega-todo"), porque muchas capas preguntan por `S.tab.admin==='bodega'`.
- **Destinos:** `avDestino` (`base-v38.html:240`, `tema-avisos.js:65,83,86`), `S.dOpen`/`data-k` (31 capas), centro de pendientes `tema-centro30.js`.
- **Comparaciones:** `comp-venta`, `comp-cajas`, `comp-bodega`, `comp-fichas`, `comp-viaje`, `comp-avisos`, `comp-navega`. Se escribe **antes** cuáles deben salir idénticas (números y lo guardado) y qué diferencias de pantalla se esperan.
- **Cargas:** tarjeta dentro de otra en `base-v38.html:565`. "Pagó todo" sin confirmar: `cobrartodo` (`base-v38.html:421/726`).
- **Volver atrás:** cada etapa es un solo `tema-*.js` al final de `orden.json`. Sin campos nuevos en `S` que suban a la nube. Para regresar, se quita y se vuelve a publicar.

---

## Anexo: cómo se revisó

Revisores (todos terminaron): diseño, detalles del código, simplicidad y alcance, comprensión, preparación para construir, estructura del documento e "inventiva" (resolver contradicciones). Los 7 trabajaron por separado, sin ver esta conversación. El borrador anterior, hecho sin revisores, tenía mal la causa de las taras (decía que faltaba `num()` en la base), y la creía sobre el abono (ya tiene pasos). Ambas cosas se corrigieron aquí.
