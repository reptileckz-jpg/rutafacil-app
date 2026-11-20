/* ===================== TEMA · El chofer no puede recibir más taras de las que le deben (20 nov · punto 5 de la nueva numeración) =====================
   Ricardo: "cuando en ruta el repartidor recibe taras de esa entrega, taras adeudadas o combinado, no poder poner un número mayor al que se
   deben en total. Si va a entregar 4 solo recibe 4; si entrega 4 y le deben 2, máximo puede recibir 6".
   Tope = cajas de roatán que entrega ahora + las que ya debía el cliente (c.vac). Al corregir una entrega, la app primero regresa lo que
   debía el cliente (entCorregir), así que el tope es el mismo.
   Se cuida en todos los caminos: el botón +, escribir el número y, al final, "Guardar entrega" (por si algo se coló). Si se pasa, se
   deja en el tope y se avisa: "Máximo 6: 4 que le entregas + 2 que debe". Las rotas nunca pasan de las que devuelve (ya era así).
   Solo limita la captura; no cambia ninguna entrega guardada. Se arma al final.
   ============================================================================================ */
function tope5(d) {
  try {
    d = d || S.d; if (!d) return null;
    var c = typeof curCli === 'function' ? curCli() : null;
    var debe = c && !c.oculto ? Math.max(0, Math.round(num(c.vac))) : 0;
    var R = Math.max(0, Math.round(num(d.R)));
    return { max: R + debe, R: R, debe: debe };
  } catch (e) { return null; }
}
function tope5Txt(t) { return 'Máximo ' + t.max + (t.debe ? ': ' + t.R + ' que le entregas + ' + t.debe + ' que debe' : ' (las que le entregas)'); }
/* deja d.V (y las rotas) en el tope; regresa true si tuvo que bajarlo */
function tope5Aplica(avisa) {
  var d = S.d; if (!d || S.role !== 'rep') return false;
  var t = tope5(d); if (!t) return false;
  if (num(d.V) <= t.max) return false;
  d.V = t.max; d._vAuto = false; if (num(d.Vr) > d.V) d.Vr = d.V;
  var el = document.getElementById('dV'); if (el && String(el.value) !== String(d.V)) el.value = String(d.V);
  if (avisa) { try { toast(tope5Txt(t)); } catch (e) {} }
  return true;
}
/* al escribir el número */
document.addEventListener('input', function (e) {
  var t = e.target; if (!t || !t.dataset || t.dataset.bind !== 'd.V' || !S.d) return;
  setTimeout(function () { if (tope5Aplica(true)) { try { var c = document.getElementById('calc'); if (c && typeof calcHTML === 'function') c.innerHTML = calcHTML(); } catch (er) {} } }, 0);
});
/* con el + (y cualquier otro cambio que dibuje la pantalla) */
var _rd5 = render;
render = function () { try { tope5Aplica(true); } catch (e) {} return _rd5.apply(this, arguments); };
/* al guardar: la última revisión */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="entconf"],[data-act="guardar"]'); if (!b || S.role !== 'rep' || !S.d) return;
  tope5Aplica(true);
}, true);
