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
/* 23c · (23 nov, captura de Ricardo) la pestaña Cierre, sin haber iniciado el día, abría el cierre por pasos con un odómetro "ya puesto"
   y "Recorriste 262 km… 128 km de más". Sin salida y sin ninguna entrega no hay nada que cerrar: solo se avisa. */
function antes23Nada() { try { return antes23() && !(S.log || []).length && !(S.cierre && S.cierre.sent); } catch (e) { return false; } }
var _cie23 = cierre;
cierre = function () {
  if (!antes23Nada()) return _cie23.apply(this, arguments);
  return '<h1>Cierre del día</h1><div class="card note" data-x="cie23"><b>Todavía no inicias el día</b><div style="font-size:15px;margin-top:4px">No hay nada que cerrar: el cierre se hace al terminar tu ruta. Primero escoge el vehículo y haz "Iniciar el día" en la pestaña Ruta.</div>'
    + '<button class="btn" style="margin-top:10px;min-height:56px" data-act="tab" data-t="ruta">Ir a Ruta</button></div>';
};
var _ciP23 = cierrePasos;
cierrePasos = function () { if (antes23Nada()) return; return _ciP23.apply(this, arguments); };
/* 23d · (23 nov) "dice cuántos km recorrí y ni siquiera la inicié": al escoger el vehículo la app ponía sola el odómetro final
   (salida + un cálculo de la ruta) y el cierre decía "recorrió 262 km … 128 km de más" con un número que nadie escribió.
   Ahora: al iniciar el día (antes de la primera entrega) el odómetro final queda IGUAL al de salida (0 km); en el cierre la casilla
   sale vacía ("Escribe lo que marca el tablero", con lo que mide la ruta como referencia), no dice "recorrió" ni "de más" hasta que el
   chofer escribe su número, y no deja seguir sin escribirlo. Solo los km que escribe el chofer cuentan. */
function odo23Falta() { try { var c = S.cierre; return !!(c && !c.sent && S.salida && S.salida.ok && num(c.odo) === num(c.odoIni)); } catch (e) { return false; } }
function odo23Limpia() {
  try {
    var c = S.cierre; if (S.role !== 'rep' || !c || c.sent || c.odo23 || !(S.salida && S.salida.ok) || (S.log || []).length) return;
    c.odo23 = 1; if (c.odoIni !== '' && c.odoIni != null) c.odo = num(c.odoIni);
  } catch (e) {}
}
function odo23Pinta() {
  if (S.role !== 'rep' || S.tab.rep !== 'cierre' || !odo23Falta()) return;
  var m = document.querySelector('main'), i = m && m.querySelector('#odo'); if (!i) return;
  if (document.activeElement !== i) i.value = '';
  i.placeholder = 'Lo que marca';
  var k = m.querySelector('#kmr'), l = k && k.closest('.lbl'); if (l) l.textContent = 'Salió con ' + num(S.cierre.odoIni).toLocaleString('es-MX') + ' km';
  var x = m.querySelector('[data-k="km154"]'); if (x) x.remove();
  Array.prototype.forEach.call(m.querySelectorAll('.card.note'), function (n) {
    if (!/Revisa el odómetro del tablero/.test(n.textContent)) return;
    var est = 0; try { est = Math.round(num(rutaKmEst())); } catch (e) {}
    n.innerHTML = '<b>Escribe lo que marca el tablero</b><div style="font-size:14px">' + (est > 0 ? 'Tu ruta mide ~' + est + ' km: debería marcar cerca de ' + (num(S.cierre.odoIni) + est).toLocaleString('es-MX') + ' km.' : 'El número del odómetro al llegar.') + '</div>';
  });
}
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="cipaso"],[data-act="enviar"]'); if (!b || S.role !== 'rep' || !odo23Falta()) return;
  if (b.dataset.act === 'cipaso' && !((S.cierreP || 0) === 0 && +b.dataset.v > 0)) return;
  e.preventDefault(); e.stopImmediatePropagation();
  S.cierreP = 0; toast('Escribe el odómetro que marca el tablero'); render(); window.scrollTo(0, 0);
}, true);
var _rd23 = render;
render = function () {
  odo23Limpia();
  var r = _rd23.apply(this, arguments);
  try { odo23Pinta(); } catch (e) {}
  return r;
};
