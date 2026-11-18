# Fuente de la app (respaldo)

Aquí está todo lo necesario para seguir trabajando en la app desde otra conversación.

**Lee también:** `CONTEXTO-PARA-OTRA-IA.md` (todo lo que ya hace la app, para otra IA), `negocio.md` (cómo funciona el negocio) e `instrucciones.md` (cómo trabajar con Ricardo).

- `base-v38.html`: la app base sobre la que se aplican las capas.
- `capas/`: las capas `l1.js` … `l90.js`, que van en orden. También:
  - `patch39.py` y `ql.py`: cambios de texto sobre la base.
  - `imgs.json`: las imágenes.
  - `build.sh`: arma todo.
  - `mapa.py`: el mapa de errores. `build.sh` pone una marca `//@@capa lNN.js` donde empieza cada capa y `mapa.py` anota en el HTML en qué renglón queda cada una. Así, cuando la app falla, el error dice "En: l80.js:57" (capa y renglón) en vez de un renglón del HTML de 3 MB. Se ve en la pantalla de "La app encontró un problema" (Ver el error) y en Ajustes → Problemas reportados.
  - `tema-*.js`: **temas aplanados**. Lo de un tema que antes estaba repartido en envolturas de varias capas, junto y en orden en un solo archivo. Hay catorce: `tema-ganado.js` (barra flotante de lo ganado del chofer con comisión; va al final de todo), `tema-sueldos.js` (sueldos: semana dom–sáb que se paga el sábado, faltas, descanso, ingreso y baja, vacaciones, aguinaldo y finiquito; rehace szCalc y szDesg; va antes de `tema-ganado.js`), `tema-horario.js` (horario de los clientes en palabras, "¿Cierra a las 8 de la noche?", apodo igual al nombre; va antes de `tema-sueldos.js`), `tema-cobro.js` (el cobro en la entrega: "A cobrar" abajo con desglose, billetes, abono rápido, cajas vacías con saldo; va antes de `tema-horario.js`), `tema-cargas.js` (frutas de una carga y reparto de los gastos del viaje; va antes de `tema-cobro.js`), `tema-taras.js` (taras prestadas: cobrarlas al cliente, castigo al chofer, fondo; lo que el cliente ya debía en la entrega; tope de cajas vacías del chofer), `tema-cargarmas.js` ("Cargar más" en ruta: parada a la bodega), `tema-notas.js` (notas de remisión: el número de cada nota, serie por chofer), `tema-vehiculos.js` (vehículos: ficha, formulario, placa, combustible, TAG, revisión, encargo, alerta de velocidad y fotos; va antes de `tema-notas.js`), `tema-reparte.js` (quién reparte: qué choferes cuentan, el administrador solo si prendió "¿Repartes hoy?", su "Mi ruta de hoy" y los cambios de Rutas que le llegan al chofer en camino; va antes de `tema-vehiculos.js`), `tema-avisos.js` (avisos y pendientes: la lista de avisos, a dónde lleva cada uno, cómo se dibujan, numeritos de la barra y "🔔 N pendientes" con Ir / Listo; va después de `tema-pantallas.js`), `tema-pantallas.js` (cómo se acomodan las pantallas del administrador: barra, Rutas, Inicio, pestañas de Clientes, pendientes, Más), `tema-cobranza.js` (Cobranza) y `tema-rutadia.js` (la ruta del día: ruta nueva del chofer, cambio de día, "No mandaste tu cierre", liberar ruta), que se arma justo después de `l85.js`. **Si se cambia algo de un tema aplanado, se cambia en su archivo; no se agregan envolturas nuevas en otra capa.**
- `pruebas/`: las pruebas automáticas (Playwright). Cada una imprime `N OK · N FAIL`. Las de la versión 7.2 son `t58.js` … `t63.js` y `t62xss.js` (textos peligrosos); las de la 7.5 son `t68.js`, `t69.js` (el dinero) y `t70.js`; las de la 7.6 son `t71.js` … `t76.js`; `t77.js` es la red de seguridad (7.7); las de la 7.8 son `t78.js` y `t78nube.js` (pedido asignado con dos celulares); las de la 8.0 son `t80.js` y `t80vacio.js` (la app real no trae nada de la demo); las de la 8.1 son `t81.js` y `t81nube.js` (Rutas, con dos celulares); las de la 8.2 son `t82.js` y `t82scroll.js` (la pantalla no brinca); la de la 8.5 es `t85.js` (administrador que reparte, días fijos, no visitados); las de la 8.6 son `t86.js` (taras y numeritos) y `t86nube.js` (chofer trabado y liberar, con dos celulares); la de la 8.7 es `t87.js` (bloquear solo si salió, avisos agrupados); la de la 8.8 es `t88.js` (pendientes que se resuelven y se quitan); la de la 8.9 es `t89.js` (ubicación, odómetro, pantalla del chofer, color); `t90.js` (9.0: fotos, aviso al quitar clientes, admin que reparte, vehículo ocupado); `t91cob.js` es la Cobranza; `t100.js` revisa que la versión real no traiga valores de la demo en los números (odómetro, costos, vehículos, clientes) y lo de proveedores/básculas (98); `t102.js` los puntos 102–105; `t107.js` las notas de remisión; `t106.js` la foto del odómetro; `t108.js` taras cobradas al cliente, lo que ya debía y "Cargar más"; `t111.js` frutas de una carga y reparto de los gastos del viaje; `t112.js` visitados al final; `t113.js` parpadeo, fotos y cámara; `t115.js` el cobro en la entrega (el dinero cuadra); `t116.js` tope de cajas vacías del chofer; `t117.js` horario en palabras, apodo y etiquetas de la siguiente parada; `t119.js` tamaño y calidad de las fotos; `t117b.js` barra flotante de lo ganado; `t118.js` sueldos (semana, faltas, descanso, ingreso, vacaciones, aguinaldo, finiquito); `t92.js` la reorganización (incluye recorrer todos los tutoriales del administrador); `comp-avisos.js`, `comp-reparte.js` y `comp-vehiculos.js` (ANTES.html NUEVO.html) comparan lo mismo para los temas de avisos, quién reparte y vehículos; `comp-tema.js ANTES.html NUEVO.html` compara que un tema aplanado haga lo mismo que antes. `t61.js` prueba los saldos con dos celulares y una nube de prueba que se porta como Firestore.
- `pendientes.md`: la bitácora completa. Están los puntos 1–100 (ya hechos) y la lista nueva, que empieza otra vez en 1.
- `www.sh`: copia la versión "primera vez" a `www/index.html` y agrega los scripts de Firebase, Leaflet y mapas.
- `fotos/`: capturas que mandó Ricardo para los pendientes.
- `datos-prueba/clientes-prueba-tijuana.csv`: 40 clientes de prueba con ubicaciones de Tijuana, para "Importar clientes".

## Cómo se arma
1. `build.sh` junta las capas en `libl.js`.
2. `patch39.py` aplica los cambios sobre `base-v38.html` y deja `prototipo-platanos.html` (con datos de demo).
3. De ahí sale `platanos-primera-vez.html` (la versión real, `PN_MODO="vacio"`).
4. `mapa.py` anota el mapa de errores en los dos HTML (lo llama `build.sh`).
5. `www.sh` la copia a `www/index.html` (y vuelve a anotar el mapa, porque agrega renglones).
6. Al subir a `main`, GitHub Actions arma el APK. La versión es `1.0.<número de corrida>`.

Las rutas dentro de `build.sh`, `patch39.py`, `www.sh` y las pruebas son las de la conversación original (`/tmp/claude-0/-home-claude/0fa80c8a-…/scratchpad/v40src/` y `/mnt/user-data/outputs/`). Lo más fácil es crear esas carpetas: copiar `capas/*` a `…/scratchpad/v40src/`, `base-v38.html` a `…/scratchpad/v38.bak.html`, y enlazar `/home/claude/rutafacil-app` al repositorio. Las pruebas se corren desde `/tmp` (ahí encuentra Playwright).

## Reglas de trabajo con Ricardo
- Siempre en español sencillo de México.
- Si algo no está claro, preguntar con opciones antes de construir.
- Nada de zips ni archivos duplicados, y no sacar versiones duplicadas.
- Probar antes de publicar.
- Lo más importante son los números.
- Cuando dice "aún no hagas cambios", solo se anota en `pendientes.md`.
