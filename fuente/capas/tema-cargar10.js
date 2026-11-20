/* ===================== TEMA · "Cargar más" solo cuando ya no trae mercancía (20 nov · punto 10 de la nueva numeración) =====================
   Ricardo: "el botón de Cargar más en ruta solo debe habilitarse o mostrarse arriba (en la parte superior de la pantalla) cuando ya no haya
   mercancía disponible en la camioneta de reparto y aún queden clientes pendientes por atender".
   - Ya no sale abajo de la lista de clientes (extraCard).
   - Sale ARRIBA de la Ruta, en su tarjeta, solo si: está en ruta (salió y no ha mandado su cierre), en la camioneta quedan 0 cajas y 0 kg,
     y le quedan clientes por atender. Si ya va a la bodega (tarjeta "🏭 Bodega · a cargar más"), no se repite.
   - El botón abre lo mismo de siempre ("¿Vas a la bodega por más?", 110).
   - El aviso "No te alcanza para los pedidos: regresa a la bodega a cargar más" (l78) se queda: avisa ANTES de quedarse sin mercancía.
   Solo cambia dónde y cuándo se ve el botón; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
extraCard = function () { return ''; };
function cargar10Pend() {
  try { return (S.stops || []).filter(function (s) { if (!s || s.done) return false; var c = cl(s.c); return !!c && !c.rapida; }).length; } catch (e) { return 0; }
}
function cargar10Toca() {
  try {
    if (S.role !== 'rep' || S.tab.rep !== 'ruta' || typeof enRuta110 !== 'function' || !enRuta110() || S.bod110) return false;
    if (num(S.inv && S.inv.reparto) > 0 || num(S.inv && S.inv.repartoKg) > 0.0001) return false;
    return cargar10Pend() > 0;
  } catch (e) { return false; }
}
function cargar10Pon() {
  if (!cargar10Toca()) return;
  var m = document.querySelector('main'); if (!m || m.querySelector('[data-x="cargar10"]')) return;
  var n = cargar10Pend(), d = document.createElement('div');
  d.className = 'card alert'; d.dataset.x = 'cargar10'; d.style.padding = '14px';
  d.innerHTML = '<div style="font-size:19px;font-weight:900">Ya no traes mercancía</div><div style="font-size:16px;margin-top:4px">Te falta' + (n === 1 ? '' : 'n') + ' <b>' + n + ' cliente' + (n === 1 ? '' : 's') + '</b> por atender.</div>'
    + '<button class="btn big" style="width:100%;margin-top:10px" data-act="cxabre">📦 Cargar más mercancía</button>';
  var h = m.querySelector('.hola89, .hello'); if (h) h.after(d); else m.prepend(d);
}
var _rd10 = render;
render = function () { var r = _rd10.apply(this, arguments); try { cargar10Pon(); } catch (e) { console.error('cargar10', e); } return r; };
