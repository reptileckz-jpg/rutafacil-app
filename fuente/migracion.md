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

## Temas (de más fácil a más difícil)
| Tema | Envolturas aprox. | Estado |
|---|---|---|
| La ruta del día | 15 | ✅ `tema-rutadia.js` |
| Cobranza | — | ✅ `tema-cobranza.js` (nació así) |
| Avisos y pendientes (avisos, avDestino, avRow, avisosHTML, avFoco, numeritos, Ir/Listo) | 23 (+8 de temas) | ✅ `tema-avisos.js` (comprobado con `pruebas/comp-avisos.js`: 264 casos iguales en la demo y 246 en la real) |
| Quién reparte (choferes del día, el administrador que reparte, cambios de Rutas al chofer: chs81, chofsDia57, pedChoferes, choferes75, sinCh81, arTiene, toma81) | 9 | ✅ `tema-reparte.js` (comprobado con `pruebas/comp-reparte.js`: 33 casos iguales en la demo y en la real). Lo de l85/l90 que envuelve `render` y `toast` se junta con esos temas |
| Vehículos (vehHoy, vehLibres, vehiculos, vehBasic, fiVeh, vForm, plateSVG, fuelVeh, vehGastos, tagCruce, inspHTML, inspRepHTML, inspMarca, encVehHTML, velAlertaHTML, velBeep, fotoTile, fotoAbrir, fotoZoomable) | 23 | ✅ `tema-vehiculos.js` (comprobado con `pruebas/comp-vehiculos.js`: 54 casos iguales en la demo y 45 en la real; la única diferencia es a propósito: un camión del asistente ya no trae la fecha de afinación de la demo) |
| Ruta y entrega del chofer (ruta, entrega, entValida, entregaCalc, credBloq) | 28 | ✅ `tema-ruta.js` (va justo después de `l90`; `tema-taras` envuelve `entValida` después). Comprobado con `pruebas/comp-ruta.js` |
| Fichas del personal y de clientes (fiEmp 9, fiCli 5, mayHistHTML 4, permsHTML 6) | 24 | ⏭️ sigue |
| Cierre del chofer y recibir cierre (cierreTop, cierreAdm, cierre, cierrePasos, cierreRes, confMsg) | ~20 | pendiente |
| Inicio del administrador (inicio, cierreTop, tarjetas) | ~30 | pendiente |
| Ajustes (ajHTML) y ventanas (setupHTML) | ~45 | pendiente |
| Nube (nbAplica, fresh, guardar) | ~25 | pendiente (con mucho cuidado) |
| "Después de dibujar" (render: 118 envolturas) | 118 | al final: una sola lista ordenada |
| Lo que sobre | resto | pendiente |
| **Cambiar el armado a Vite** | — | cuando quede 0 |

## Antes de seguir
**Ricardo (17 nov): "aún no sigas con Vite"** → pausa en 503 (11%). **Ricardo (18 nov, después de la 9.9 / APK 1.0.46): "sigue con vite"** → se retomó el aplanado (esto es preparación dentro de las capas; NO se crean archivos de Vite ni se toca `package.json` hasta que diga "Empezamos con Vite", ver `REGLAS-NUMEROS.md`). 475 (16%).

**Ricardo (17 nov): primero la reorganización de pantallas (pendiente 92), luego seguir con la migración.** ✅ Reorganización hecha y publicada. Lo que se reorganice se escribe ya en su `tema-*.js`, así que también cuenta como avance.

## Reglas
- Cada tema se arma al final (después de los demás temas) y toma la función de la base; cada paso de las envolturas viejas va adentro, en el mismo orden.
- Antes de quitar una envoltura, buscar si alguien usa su variable (`_x`) directo en otra parte (pasó con `mig85` y `_chs85`). Las pruebas de siempre no lo detectaron; la de comparación sí.
- Cada tema se comprueba con su prueba de comparación (`pruebas/comp-tema.js`, `pruebas/comp-avisos.js`) (mismos casos antes y después = idéntico) y con todas las pruebas.
- Lo nuevo de un tema ya juntado se escribe en su `tema-*.js`, nunca como envoltura en otra capa.
- Arreglos urgentes primero; la migración va entre arreglo y arreglo.
