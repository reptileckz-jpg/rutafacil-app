/* ===================== TEMA · Antes de iniciar el día, la pestaña Entrega no arma ninguna entrega (23 nov · punto 23 de la nueva numeración) =====================
   Ricardo: "quiero iniciar mi ruta … por curiosidad me moví a otra pantalla y ya da por hecho que estoy en la primera parada"
   (le salió "Sin terminar · Entrega a Benavides" y "¿Dejas esto a medio llenar?" sin haber empezado).
   Causa: la pestaña Entrega, sin salida, decía "Primero inicia el reparto" pero abajo seguía la tarjeta "📍 Ubicación de Benavides" y el
   formulario de la primera parada contaba como abierto; al cambiar de pestaña preguntaba si dejarlo a medio llenar.
   Ahora, mientras no termina "Iniciar el día":
     - Entrega solo dice "Primero inicia el reparto" (sin tarjeta de ubicación de ningún cliente).
     - No hay formulario de entrega abierto: no pregunta "¿Dejas esto a medio llenar?" ni guarda "Sin terminar".
     - Un "Sin terminar · Entrega a …" que se haya guardado así: "Continuar" no abre nada hasta iniciar el día (sí se puede borrar).
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
function antes23() { return S.role === 'rep' && !(S.salida && S.salida.ok); }
try {
  var _bfEnt23 = BF.ent.abierto;
  BF.ent.abierto = function () { if (antes23()) return false; return _bfEnt23.apply(this, arguments); };
} catch (e) {}
var _cfUb23 = cfUb70;
cfUb70 = function () { if (antes23()) { var x = document.querySelector('main [data-x="cfub70"]'); if (x) x.remove(); return; } return _cfUb23.apply(this, arguments); };
window.addEventListener('click', function (e) {
  if (!antes23()) return;
  var b = e.target.closest && e.target.closest('[data-act]'); if (!b) return;
  var a = b.dataset.act;
  if (a === 'borrir' && b.dataset.k === 'ent') {
    e.preventDefault(); e.stopImmediatePropagation(); toast('Primero inicia el día; luego sigues esa entrega'); return;
  }
}, true);
/* 23b · al abrir una entrega (app real) el último pedido del cliente se ponía DESPUÉS de tomar la "foto" del formulario (tema-piezas 136):
   salir sin tocar nada preguntaba "¿Dejas esto a medio llenar?". Ahora la foto se toma al final. Los números del formulario no se tocan. */
var _rD23 = resetDraft;
resetDraft = function (c) {
  var r = _rD23.apply(this, arguments);
  try { if (S.d) S._d0 = JSON.stringify(S.d); } catch (e) {}
  return r;
};
