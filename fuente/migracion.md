# Avance de la migración (para llegar a Vite)

**Cómo se mide:** cuántas "envolturas" quedan en las capas viejas (`l1.js`…`l90.js`). Una envoltura es cuando una capa
nueva se pone encima de una función vieja (`var _x=f; f=function(){…}`): es lo que hace difícil encontrar y arreglar cosas.
Al juntar un tema en su archivo `tema-*.js`, sus envolturas desaparecen. **Meta: 0** → ahí se cambia el armado a Vite.

Se mide con `bash capas/mide.sh`. Al empezar (17 nov, antes de la migración): **568**.

| Fecha | Quedan | Avance | Qué se hizo |
|---|---|---|---|
| 17 nov | 568 | 0% | Inicio |
| 17 nov | 560 | 1% | Mapa de errores · tema "la ruta del día" (−15) · Cobranza ya nació como tema · la 9.0 (l90) agregó 5 |

## Temas (de más fácil a más difícil)
| Tema | Envolturas aprox. | Estado |
|---|---|---|
| La ruta del día | 15 | ✅ `tema-rutadia.js` |
| Cobranza | — | ✅ `tema-cobranza.js` (nació así) |
| Avisos y pendientes (avisos, avDestino, numeritos, Ir/Listo) | ~25 | ⏭️ sigue |
| El administrador que reparte (Mi ruta, barra, textos, l85/l90) | ~15 | pendiente |
| Vehículos (fotos, ocupado, odómetro, revisión) | ~25 | pendiente |
| Ruta y entrega del chofer (ruta, entrega, hola, tarjetas) | ~40 | pendiente |
| Cierre del chofer y recibir cierre | ~30 | pendiente |
| Inicio del administrador (inicio, cierreTop, tarjetas) | ~30 | pendiente |
| Ajustes (ajHTML) y ventanas (setupHTML) | ~45 | pendiente |
| Nube (nbAplica, fresh, guardar) | ~25 | pendiente (con mucho cuidado) |
| "Después de dibujar" (render: 118 envolturas) | 118 | al final: una sola lista ordenada |
| Lo que sobre | resto | pendiente |
| **Cambiar el armado a Vite** | — | cuando quede 0 |

## Antes de seguir
**Ricardo (17 nov): primero la reorganización de pantallas (pendiente 92), luego seguir con la migración.** Lo que se reorganice se escribe ya en su `tema-*.js`, así que también cuenta como avance.

## Reglas
- Cada tema se comprueba con `pruebas/comp-tema.js` (mismos casos antes y después = idéntico) y con todas las pruebas.
- Lo nuevo de un tema ya juntado se escribe en su `tema-*.js`, nunca como envoltura en otra capa.
- Arreglos urgentes primero; la migración va entre arreglo y arreglo.
