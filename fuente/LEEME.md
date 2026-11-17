# Fuente de la app (respaldo)

Aquí está todo lo necesario para seguir trabajando en la app desde otra conversación.

**Lee también:** `CONTEXTO-PARA-OTRA-IA.md` (todo lo que ya hace la app, para otra IA), `negocio.md` (cómo funciona el negocio) e `instrucciones.md` (cómo trabajar con Ricardo).

- `base-v38.html`: la app base sobre la que se aplican las capas.
- `capas/`: las capas `l1.js` … `l89.js`, que van en orden. También:
  - `patch39.py` y `ql.py`: cambios de texto sobre la base.
  - `imgs.json`: las imágenes.
  - `build.sh`: arma todo.
- `pruebas/`: las pruebas automáticas (Playwright). Cada una imprime `N OK · N FAIL`. Las de la versión 7.2 son `t58.js` … `t63.js` y `t62xss.js` (textos peligrosos); las de la 7.5 son `t68.js`, `t69.js` (el dinero) y `t70.js`; las de la 7.6 son `t71.js` … `t76.js`; `t77.js` es la red de seguridad (7.7); las de la 7.8 son `t78.js` y `t78nube.js` (pedido asignado con dos celulares); las de la 8.0 son `t80.js` y `t80vacio.js` (la app real no trae nada de la demo); las de la 8.1 son `t81.js` y `t81nube.js` (Rutas, con dos celulares); las de la 8.2 son `t82.js` y `t82scroll.js` (la pantalla no brinca); la de la 8.5 es `t85.js` (administrador que reparte, días fijos, no visitados); las de la 8.6 son `t86.js` (taras y numeritos) y `t86nube.js` (chofer trabado y liberar, con dos celulares); la de la 8.7 es `t87.js` (bloquear solo si salió, avisos agrupados); la de la 8.8 es `t88.js` (pendientes que se resuelven y se quitan); la de la 8.9 es `t89.js` (ubicación, odómetro, pantalla del chofer, color). `t61.js` prueba los saldos con dos celulares y una nube de prueba que se porta como Firestore.
- `pendientes.md`: la bitácora completa. Están los puntos 1–100 (ya hechos) y la lista nueva, que empieza otra vez en 1.
- `www.sh`: copia la versión "primera vez" a `www/index.html` y agrega los scripts de Firebase, Leaflet y mapas.
- `fotos/`: capturas que mandó Ricardo para los pendientes.
- `datos-prueba/clientes-prueba-tijuana.csv`: 40 clientes de prueba con ubicaciones de Tijuana, para "Importar clientes".

## Cómo se arma
1. `build.sh` junta las capas en `libl.js`.
2. `patch39.py` aplica los cambios sobre `base-v38.html` y deja `prototipo-platanos.html` (con datos de demo).
3. De ahí sale `platanos-primera-vez.html` (la versión real, `PN_MODO="vacio"`).
4. `www.sh` la copia a `www/index.html`.
5. Al subir a `main`, GitHub Actions arma el APK. La versión es `1.0.<número de corrida>`.

Las rutas dentro de `build.sh`, `patch39.py`, `www.sh` y las pruebas son las de la conversación original (`/tmp/claude-0/-home-claude/0fa80c8a-…/scratchpad/v40src/` y `/mnt/user-data/outputs/`). Lo más fácil es crear esas carpetas: copiar `capas/*` a `…/scratchpad/v40src/`, `base-v38.html` a `…/scratchpad/v38.bak.html`, y enlazar `/home/claude/rutafacil-app` al repositorio. Las pruebas se corren desde `/tmp` (ahí encuentra Playwright).

## Reglas de trabajo con Ricardo
- Siempre en español sencillo de México.
- Si algo no está claro, preguntar con opciones antes de construir.
- Nada de zips ni archivos duplicados, y no sacar versiones duplicadas.
- Probar antes de publicar.
- Lo más importante son los números.
- Cuando dice "aún no hagas cambios", solo se anota en `pendientes.md`.
