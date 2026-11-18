# Avance de la migración (para llegar a Vite)

**Cómo se mide:** cuántas "envolturas" quedan en las capas viejas (`l1.js`…`l90.js`). Una envoltura es cuando una capa
nueva se pone encima de una función vieja (`var _x=f; f=function(){…}`): es lo que hace difícil encontrar y arreglar cosas.
Al juntar un tema en su archivo `tema-*.js`, sus envolturas desaparecen. **Meta: 0** → ahí se cambia el armado a Vite.

Se mide con `bash capas/mide.sh`. Al empezar (17 nov, antes de la migración): **568**.

| Fecha | Quedan | Avance | Qué se hizo |
|---|---|---|---|
| 17 nov | 568 | 0% | Inicio |
| 17 nov | 560 | 1% | Mapa de errores · tema "la ruta del día" (−15) · Cobranza ya nació como tema · la 9.0 (l90) agregó 5 |
| 17 nov | 560 | 1% | Reorganización de pantallas (punto 92) hecha en `tema-pantallas.js` (sin envolturas nuevas en capas viejas) |
| 17 nov | 537 | 5% | Tema "avisos y pendientes" (`tema-avisos.js`, −23). También se juntaron ahí las 8 envolturas de avisos que estaban en `tema-cobranza.js` y `tema-pantallas.js` |
| 17 nov | 528 | 7% | Tema "quién reparte" (`tema-reparte.js`, −9). La comparación encontró que `mig85` usaba directo la variable de una envoltura (`_chs85`); se cambió a `_chs81Base` |
| 17 nov | 503 | 11% | Tema "vehículos" (`tema-vehiculos.js`, −23) y las 2 envolturas de `l82` sobre `nuevoVeh`/`nuevoCli` pasaron a su definición en `l7.js` |
| 18 nov | 475 | 16% | Tema "ruta y entrega del chofer" (`tema-ruta.js`, −28: ruta 13, entrega 7, entValida 4, entregaCalc 2, credBloq 2), comprobado con `pruebas/comp-ruta.js` (148 casos iguales en la demo y 77 en la real; la prueba sí detecta un cambio a propósito en el tope de crédito) |
| 18 nov | 451 | 20% | Tema "fichas del personal y de clientes" (`tema-fichas.js`, −24: fiEmp 9, fiCli 5, mayHistHTML 4, permsHTML 6), comprobado con `pruebas/comp-fichas.js` (192 casos iguales en la demo y 81 en la real; detecta un cambio a propósito en fiCli) |
| 18 nov | 431 | 24% | Tema "cierre del chofer y recibir el cierre" (`tema-cierre.js`, −20: cierreTop 6, cierreAdm 4, cierre 4, confMsg 4, cierrePasos 2, cierreRes 2), comprobado con `pruebas/comp-cierre.js` (65 casos iguales en la demo y en la real: los 6 pasos con efectivo exacto, faltante y sobrante, gastos y combustible, las cuentas del cierre, las confirmaciones, el envío, la pantalla para recibir y el efectivo recibido en caja; detecta dos cambios a propósito) |
| 18 nov | 407 | 28% | Tema "Inicio del administrador y sus tarjetas" (`tema-inicio.js`, −24: inicio 6, pedidoCard 4, popItems 4, bienvHTML 3, mapaVivoHTML 3, proveedoresCard 2, popHTML 2), comprobado con `pruebas/comp-inicio.js` (123 casos iguales en la demo y 117 en la real: Inicio de admin, contador y chofer a varias horas, con y sin pedidos, cada aviso de "¿Qué sigue?" y el mapa; detecta un cambio a propósito en pedidoCard) |
| 18 nov | 363 | 36% | Tema "Ajustes y asistente de la primera vez" (`tema-ajustes.js`, −44: ajHTML 23, setupHTML 21), comprobado con `pruebas/comp-ajustes.js` (37 casos iguales en la real y 19 en la demo: los 8 pasos del asistente vacío y lleno, Ajustes de admin, encargado, contador, chofer y bodega con dos juegos de opciones y la pantalla completa; detecta un cambio a propósito en cada uno) |
| 18 nov | 353 | 37% | Tema "Nube: subir y bajar los datos" (`tema-nube.js`, −10: nbForzarRol 2, nbDocAPlano, nbCodifica, nbArma, nbEmpuja, nbPrimera, nbEmpezarSync, nbPantalla, guardarYa), comprobado con `pruebas/comp-nube.js` (999 casos iguales en la real y 1086 en la demo: cada dato convertido para la nube y de regreso como admin, chofer y encargado, la subida a una nube de prueba y la bajada en un celular nuevo; detecta un cambio a propósito) y con t61, t78nube, t81nube, t86nube, t94nube, t95nube, t122nube y t123nube. **Se quedan en su capa a propósito:** `fresh` (7, dentro de bloques que cambian S al cargar; l7 usa la copia de l6b) y `nbAplica` (7, dos dentro de bloques; mover solo una parte cambiaría el orden) |
| 18 nov | 326 | 42% | Tema "Viaje de carga al proveedor" (`tema-viaje.js`, −27: vwBurbuja 4, vwBody 3, vwSideHTML 2, vwNodos 2, vwBasc 2, fiProv 2, fiCarga 2 y 10 sueltas), comprobado con `pruebas/comp-viaje.js` (261 casos iguales en la demo y 146 en la real: cada paso del viaje como admin y chofer, panel de lado, burbuja, mapa, básculas, fichas de proveedores y cargas; detecta un cambio a propósito). Se quedan: la última envoltura de vwBurbuja (en `tema-pantallas.js`) y `cargas` (dentro de un bloque) |
| 18 nov | 305 | 46% | Tema "Ubicaciones y mapas" (`tema-ubica.js`, −21: ubHTML 3, ub68HTML 3, ubGuardar 2, ubCliFalta 2, ub68Guarda 2, gpsRutaHTML 2 y 7 sueltas), comprobado con `pruebas/comp-ubica.js` (113 casos iguales en la demo y 105 en la real: guardar el lugar en cada modo y lo que queda guardado, corregir en el mapa, mapas, recorrido GPS, aviso en la entrega; detecta un cambio a propósito) |
| 18 nov | 294 | 48% | Tema "Personal y cuentas de sueldo" (`tema-personal.js`, −11: personal 3, sueldos 3, szRes 2, szCalc, szDesg, fichaHTML), comprobado con `pruebas/comp-sueldos.js` (104 casos iguales en la demo y 101 en la real: cada tipo de sueldo, con ruta de hoy, mayoreo y faltantes; pantallas de Sueldos y Personal; detecta un cambio a propósito en el descuento de faltantes) y `t118`. **Ojo:** las envolturas de `szCalc` y `szDesg` de l18 ya no se usan (`tema-sueldos.js` las rehace completas); se dejaron para no cambiar nada y se pueden quitar con Vite |
| 18 nov | 282 | 50% | Tema "Entrar con PIN" (`tema-pin.js`, −12: pinHTML 4, pinDe 2, personasEntrar 2, pinRow, pinLimMin, pinEntrar, entrarComo), comprobado con `pruebas/comp-pin.js` (99 casos iguales en la demo y en la real: tiempo sin usar de cada quien, renglón del PIN como admin/encargado/chofer, 6 intentos mal con bloqueo y aviso, pantalla para entrar/confirmar/crear/bloqueada, quién puede entrar con cada tipo de cuenta de la nube, gracia al volver a entrar y cambiar de usuario; detecta un cambio a propósito en el bloqueo) |
| 18 nov | 272 | 52% | `suAplicar` (−4: l16, l22, l75, l90) pasó al final de `tema-ajustes.js` (es el asistente de la primera vez) y tema "Atrás y deslizar" (`tema-navega.js`, −6: navAtras 3, swBloq 3), comprobados con `pruebas/comp-navega.js` (31 casos iguales en la demo y en la real: el asistente lleno y todo lo que deja en vehículos, personal, PINs, clientes y proveedores; atrás con foto, ubicación, mapa grande y pantallas; dónde no se desliza) y `comp-ajustes.js`; detecta un cambio a propósito en cada uno |
| 18 nov | 255 | 55% | Tema "Cajas y caja de dinero" (`tema-cajas.js`, −7: cajasDonde 3, cajaEsp 2, cajasEsperadas, cajaAyerPend), la nota de remisión al final de `tema-notas.js` (−6: notaBlock 3, notaImg, notaItems, notasDe) y tema "Cámara" (`tema-camara.js`, −4: cam73Prende 2, cam73Abre, cam73Galeria), comprobados con `pruebas/comp-cajas.js` (101 casos iguales en la demo y en la real: cajas al abrir la app y `cajasT0`, ruta abierta con vacías, rotas y cambios, cierre sin contar, otras rutas, banco y TAG pagados de la caja, caja de ayer, Inicio y Más; la nota en pantalla, renglones, texto e imagen con 4 ajustes y 4 tipos de venta; notas "Así se hace" por papel; la cámara). Detecta cambios a propósito en las cajas, en la caja de dinero y en las notas. **Ojo:** `S.cajasT0` se fija al cargar en l5, antes de estas envolturas, igual que antes |

## Temas (de más fácil a más difícil)
| Tema | Envolturas aprox. | Estado |
|---|---|---|
| La ruta del día | 15 | ✅ `tema-rutadia.js` |
| Cobranza | — | ✅ `tema-cobranza.js` (nació así) |
| Avisos y pendientes (avisos, avDestino, avRow, avisosHTML, avFoco, numeritos, Ir/Listo) | 23 (+8 de temas) | ✅ `tema-avisos.js` (comprobado con `pruebas/comp-avisos.js`: 264 casos iguales en la demo y 246 en la real) |
| Quién reparte (choferes del día, el administrador que reparte, cambios de Rutas al chofer: chs81, chofsDia57, pedChoferes, choferes75, sinCh81, arTiene, toma81) | 9 | ✅ `tema-reparte.js` (comprobado con `pruebas/comp-reparte.js`: 33 casos iguales en la demo y en la real). Lo de l85/l90 que envuelve `render` y `toast` se junta con esos temas |
| Vehículos (vehHoy, vehLibres, vehiculos, vehBasic, fiVeh, vForm, plateSVG, fuelVeh, vehGastos, tagCruce, inspHTML, inspRepHTML, inspMarca, encVehHTML, velAlertaHTML, velBeep, fotoTile, fotoAbrir, fotoZoomable) | 23 | ✅ `tema-vehiculos.js` (comprobado con `pruebas/comp-vehiculos.js`: 54 casos iguales en la demo y 45 en la real; la única diferencia es a propósito: un camión del asistente ya no trae la fecha de afinación de la demo) |
| Ruta y entrega del chofer (ruta, entrega, entValida, entregaCalc, credBloq) | 28 | ✅ `tema-ruta.js` (va justo después de `l90`; `tema-taras` envuelve `entValida` después). Comprobado con `pruebas/comp-ruta.js` |
| Fichas del personal y de clientes (fiEmp 9, fiCli 5, mayHistHTML 4, permsHTML 6) | 24 | ✅ `tema-fichas.js` (después de `tema-ruta.js`). Comprobado con `pruebas/comp-fichas.js` |
| Cierre del chofer y recibir cierre (cierreTop 6, cierreAdm 4, cierre 4, confMsg 4, cierrePasos 2, cierreRes 2) | 20 | ✅ `tema-cierre.js` (después de `tema-fichas.js`). Comprobado con `pruebas/comp-cierre.js`. La versión base de `cierrePasos` (rehecha completa) sigue en l32 |
| Inicio del administrador (inicio 6, pedidoCard 4, popItems 4, bienvHTML 3, mapaVivoHTML 3, proveedoresCard 2, popHTML 2) | 24 | ✅ `tema-inicio.js` (después de `tema-cierre.js`). Comprobado con `pruebas/comp-inicio.js` |
| Ajustes (ajHTML 23) y asistente de la primera vez (setupHTML 21) | 44 | ✅ `tema-ajustes.js` (después de `tema-inicio.js`). Comprobado con `pruebas/comp-ajustes.js` |
| Nube (nbForzarRol, nbDocAPlano, nbCodifica, nbArma, nbEmpuja, nbPrimera, nbEmpezarSync, nbPantalla, guardarYa) | 10 | ✅ `tema-nube.js` (después de `tema-ajustes.js`). `fresh` y `nbAplica` (14) se quedan: van dentro de bloques que corren al cargar; se resuelven al final con Vite (módulos) |
| Entrar con PIN (pinHTML 4, pinDe 2, personasEntrar 2, pinRow, pinLimMin, pinEntrar, entrarComo) | 12 | ✅ `tema-pin.js` (después de `tema-personal.js`). Comprobado con `pruebas/comp-pin.js` |
| Lo del asistente pasa a la app (suAplicar 4) | 4 | ✅ al final de `tema-ajustes.js`. Comprobado con `pruebas/comp-navega.js` |
| Atrás y deslizar (navAtras 3, swBloq 3) | 6 | ✅ `tema-navega.js` (después de `tema-pin.js`). Comprobado con `pruebas/comp-navega.js` |
| Cajas y caja de dinero (cajasDonde 3, cajaEsp 2, cajasEsperadas, cajaAyerPend) | 7 | ✅ `tema-cajas.js` (después de `tema-navega.js`). Comprobado con `pruebas/comp-cajas.js` |
| La nota de remisión (notaBlock 3, notaImg, notaItems, notasDe) | 6 | ✅ al final de `tema-notas.js`. Comprobado con `pruebas/comp-cajas.js` |
| Cámara (cam73Prende 2, cam73Abre, cam73Galeria) | 4 | ✅ `tema-camara.js` (después de `tema-cajas.js`). Comprobado con `pruebas/comp-cajas.js` |
| "Después de dibujar" (render: 118 envolturas) | 118 | al final: una sola lista ordenada |
| Lo que sobre | resto | pendiente |
| **Cambiar el armado a Vite** | — | cuando quede 0 |

## Antes de seguir
**Ricardo (17 nov): "aún no sigas con Vite"** → pausa en 503 (11%). **Ricardo (18 nov, después de la 9.9 / APK 1.0.46): "sigue con vite"** → se retomó el aplanado (esto es preparación dentro de las capas; NO se crean archivos de Vite ni se toca `package.json` hasta que diga "Empezamos con Vite", ver `REGLAS-NUMEROS.md`). 451 (20%).

**Ricardo (17 nov): primero la reorganización de pantallas (pendiente 92), luego seguir con la migración.** ✅ Reorganización hecha y publicada. Lo que se reorganice se escribe ya en su `tema-*.js`, así que también cuenta como avance.

## Reglas
- Cada tema se arma al final (después de los demás temas) y toma la función de la base; cada paso de las envolturas viejas va adentro, en el mismo orden.
- Antes de quitar una envoltura, buscar si alguien usa su variable (`_x`) directo en otra parte (pasó con `mig85` y `_chs85`). Las pruebas de siempre no lo detectaron; la de comparación sí.
- Cada tema se comprueba con su prueba de comparación (`pruebas/comp-tema.js`, `pruebas/comp-avisos.js`) (mismos casos antes y después = idéntico) y con todas las pruebas.
- Lo nuevo de un tema ya juntado se escribe en su `tema-*.js`, nunca como envoltura en otra capa.
- Arreglos urgentes primero; la migración va entre arreglo y arreglo.
