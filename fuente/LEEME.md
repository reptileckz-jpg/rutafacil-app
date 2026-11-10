# Fuente de la app (respaldo)

Aquí está todo lo necesario para seguir trabajando en la app desde otra conversación.

**Lee también:** `negocio.md` (cómo funciona el negocio) e `instrucciones.md` (cómo trabajar con Ricardo).

- `base-v38.html`: la app base sobre la que se aplican las capas.
- `capas/`: las capas `l1.js` … `l57.js`, que van en orden. También:
  - `patch39.py` y `ql.py`: cambios de texto sobre la base.
  - `imgs.json`: las imágenes.
  - `build.sh`: arma todo.
- `pruebas/`: las pruebas automáticas (Playwright). Cada una imprime `N OK · N FAIL`.
- `pendientes.md`: la bitácora completa. Están los puntos 1–100 (ya hechos) y la lista nueva, que empieza otra vez en 1.
- `www.sh`: copia la versión "primera vez" a `www/index.html` y agrega los scripts de Firebase, Leaflet y mapas.
- `fotos/`: capturas que mandó Ricardo para los pendientes.

## Cómo se arma
1. `build.sh` junta las capas en `libl.js`.
2. `patch39.py` aplica los cambios sobre `base-v38.html` y deja `prototipo-platanos.html` (con datos de demo).
3. De ahí sale `platanos-primera-vez.html` (la versión real, `PN_MODO="vacio"`).
4. `www.sh` la copia a `www/index.html`.
5. Al subir a `main`, GitHub Actions arma el APK. La versión es `1.0.<número de corrida>`.

Las rutas dentro de `build.sh`, `patch39.py`, `www.sh` y las pruebas son las de la conversación original (`/tmp/claude-0/.../scratchpad/` y `/mnt/user-data/outputs/`). Hay que cambiarlas a la carpeta donde se copie esto.

## Reglas de trabajo con Ricardo
- Siempre en español sencillo de México.
- Si algo no está claro, preguntar con opciones antes de construir.
- Nada de zips ni archivos duplicados, y no sacar versiones duplicadas.
- Probar antes de publicar.
- Lo más importante son los números.
- Cuando dice "aún no hagas cambios", solo se anota en `pendientes.md`.
