# Instrucciones para trabajar con Ricardo

Ricardo Nieto Mejía desarrolla la app "Plátanos Nietos" para el negocio de plátanos de su papá (también se llama Ricardo). El APK se llama "Ruta Fácil" (`com.rutafacil.app`, Capacitor 7). La bodega está en Banderilla, Veracruz. Ricardo vive en Tijuana y prueba desde allá.

**Idioma: hablarle a Ricardo SIEMPRE en español (todos los mensajes).**

## Antes de empezar cualquier trabajo
**Primero, obligatorio:** `fuente/REGLAS-NUMEROS.md` (las reglas de los números que dio Ricardo: nada se pierde ni se descuadra; plan de blindaje antes de tocar dinero; todavía NO Vite).

Luego lee, en este orden:
1. `fuente/LEEME.md`: cómo se arma la app.
2. `fuente/negocio.md`: cómo funciona el negocio.
3. `fuente/instrucciones.md`: este archivo.
4. `fuente/pendientes.md`: la bitácora y la lista de pendientes con las decisiones. Es muy largo; empieza por el final.

## Dónde está todo
- **Repositorio:** `reptileckz-jpg/rutafacil-app`, privado.
- **Código:** `fuente/base-v38.html` + las capas `fuente/capas/l1.js…l90.js`, en orden (`capas/orden.json`) + los cambios de texto de `fuente/vite/parches.mjs`. Se arma con Vite: `npm run build` (o `bash fuente/capas/build.sh`); `npm run dev` para probar.
- **Temas aplanados:** `fuente/capas/tema-rutadia.js` (la ruta del día), `fuente/capas/tema-cobranza.js` (Cobranza), `fuente/capas/tema-avisos.js` (avisos y pendientes: lista, a dónde lleva cada uno, numeritos, Ir / Listo), `fuente/capas/tema-reparte.js` (quién reparte: choferes del día, el administrador que reparte, cambios de Rutas al chofer en camino), `fuente/capas/tema-vehiculos.js` (vehículos) y `fuente/capas/tema-pantallas.js` (dónde va cada cosa en las pantallas del administrador; si se mueve algo de lugar, también se ajustan ahí los tutoriales y se corre `t92.js`). Lo nuevo de un tema va en su archivo `tema-*.js`. Si se cambia algo de ese tema, se cambia ahí, sin envolturas nuevas. Poco a poco se van aplanando más temas.
- **Errores:** cuando la app falla, el texto del error trae "En: lNN.js:renglón" (mapa de errores, `mapa.py`).
- **Pruebas:** `fuente/pruebas`, con Playwright. Cada una imprime "N OK · N FAIL".
- **Nativo:** está en `nativo/` (RutaNativa, RutaGps, RutaArranque, RutaAdmin y MainActivity).
- **Reglas de Firebase:** `firestore.rules`, con su prueba en `pruebas-reglas/`.
- **APK:** al subir a `main`, GitHub Actions arma el APK con la versión `1.0.<número de corrida>`. Los respaldos o pendientes que no deben armar APK llevan `[skip ci]` en el mensaje del commit.
- **Llave de Google Maps:** es el secreto `MAPS_KEY` en GitHub. **Nunca se escribe en el código.**

## Cómo trabajamos
- Siempre contestar en **español sencillo de México**. **SIEMPRE, en TODOS los mensajes, sin excepción** (Ricardo lo pidió dos veces el 18 nov: "háblame en español", "recuerda SIEMPRE hablarme en español"). Nunca contestarle en inglés, aunque el trabajo sea largo o técnico.
- Si algo no está claro, **preguntar con opciones** antes de construir.
- Nada de zips, archivos duplicados ni versiones duplicadas.
- **Probar antes de publicar.** Hay que correr las pruebas completas, y lo nativo se arma primero en la rama `prueba-nativa`.
- **Lo más importante son los números** (dinero, cajas y kilos): siempre tienen que cuadrar.
- Si Ricardo dice "aún no hagas cambios" o "no hagas cambios", **solo se anota** en `fuente/pendientes.md` (con número) y se sube con `[skip ci]`.
- Todo lo que pide datos o decisiones va en una **tarjeta de pantalla completa paso a paso**, con botones grandes y "¿Seguro?" en lo que no se puede deshacer.
- **Ningún botón puede quedarse sin hacer nada.** Si algo todavía no se puede, la app dice por qué.
- Con cada versión se manda una **lista de prueba corta, por número de punto**.
- Al terminar cada trabajo se actualiza el respaldo en `fuente/` (capas, pruebas y pendientes) en GitHub.
- Revisar contra el código real todo lo que proponga otra IA antes de meterlo.

## Negocio (lo básico)
- El roatán se compra por kilo y se vende por caja. El macho se compra y se vende por kilo.
- Los celulares de los choferes son del negocio, así que la ubicación se manda siempre.
- El detalle está en `fuente/negocio.md`.
