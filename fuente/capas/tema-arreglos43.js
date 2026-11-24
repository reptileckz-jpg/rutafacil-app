/* ===================== TEMA · Arreglos de los reportes de Ricardo (25 nov · punto 43 de la nueva numeración) =====================
   Reportes #1–#6 mandados desde la app (v10.22) y 3 notas del precio:
   - #2/#5 Cargas: "Ir ›" de "Pagar a …" y "Viaje a … nunca llegó" no hacía nada estando ya en Cargas → ahora abre esa carga.
   - #6 Cargas: "Este viaje nunca salió · cancelar" buscaba la carga solo por número (hay cargas repetidas) y decía "ya empezó";
     ahora usa la carga que sí se puede cancelar y pregunta con dos botones grandes ("Sí, cancelar el viaje" / "No").
   - #4 "Tu ruta: entregas $X…" se quedaba en pendientes aunque ya no hubiera ruta tuya abierta → se quita.
   - #3 Clientes "brinca": el destello de "N pendientes en …" (punto 27) se repetía 2 veces (parecía que se abría otra vez) → 1 vez, suave.
   - Precio: la pantalla grande "Fija el precio de hoy" sale en cualquier sección (antes solo en Inicio) y encima de las demás ventanas;
     "Después" la esconde 1 hora (antes todo el día). La tarjeta brilla en rojo (aro que late + resplandor; con "Modo ahorro", resplandor
     quieto). En la web el aro ya no hace crecer la página (sin barra de desplazamiento horizontal): crece 2 % desde adentro (antes 6 %).
   (No se usa overflow-x:clip en la página: hace que la pantalla se mueva al redibujar — prueba 15.)
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
(function () {
  var st = document.createElement('style');
  st.textContent = [
    /* #3: un solo destello, solo opacidad */
    '@keyframes pnd43{0%{opacity:.55}100%{opacity:1}}.pnd86.pnd27{animation:pnd43 .5s ease-out 1!important}',
    /* precio: que brille en rojo */
    '[data-x="precio65"].pr24{box-shadow:0 0 0 4px rgba(225,29,72,.16),0 12px 30px -6px rgba(225,29,72,.35)!important}',
    'html.ahorro171 [data-x="precio65"].pr24{box-shadow:0 0 0 6px rgba(225,29,72,.28),0 12px 30px -6px rgba(225,29,72,.45)!important}',
    '@media (prefers-reduced-motion:reduce){[data-x="precio65"].pr24{box-shadow:0 0 0 6px rgba(225,29,72,.28)!important}}',
    /* web: el aro que late ya no estira la página */
    /* web: el aro que late ya no estira la página (antes crecía 6 % y se salía por los lados): crece poquito y desde adentro */
    '[data-x="precio65"].pr24::after{inset:0!important;animation-name:pr43ring!important}@keyframes pr43ring{0%{transform:scale(.985);opacity:.9}100%{transform:scale(1.02);opacity:0}}',
    '#pr24ov{z-index:120!important}'
  ].join('\n');
  document.head.appendChild(st);
})();
/* ---------- #2/#5: "Ir ›" de Cargas abre esa carga ---------- */
var _avD43 = avDestino;
avDestino = function (x) {
  var r = _avD43.apply(this, arguments);
  try {
    var s = String(x || '').replace(/^URGENTE:\s*/, ''), m = /^Pagar a (.+?) \$/.exec(s), v = /^Viaje a (.+?) del (.+?) nunca llegó/.exec(s);
    if (m || v) {
      var prov = (m || v)[1], L = (S.cargas || []).filter(function (c) { return c && String(c.prov || '') === prov && c.est !== 'Cancelada'; });
      if (v) { var L2 = L.filter(function (c) { return fmtF(c.fecha) === v[2]; }); if (L2.length) L = L2; var L3 = L.filter(function (c) { return typeof c173Cancelable === 'function' && c173Cancelable(c); }); if (L3.length) L = L3; }
      var c = L[L.length - 1];
      if (c) { r = r || {}; r.t = 'cargas'; r.cli = null; r.sel = null; S.openProv = null; S.openCarga = c.id; S.fiLast = 'openCarga'; }
    }
  } catch (e) {}
  return r;
};
/* ---------- #6: cancelar el viaje correcto, y preguntar con dos botones ---------- */
function c43Carga(id) { var L = (S.cargas || []).filter(function (x) { return String(x.id) === String(id); }); return L.filter(function (c) { return c173Cancelable(c); })[0] || null; }
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="c173can"],[data-act="c43si"]'); if (!b || S.role !== 'admin') return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (b.dataset.act === 'c173can') {
    var c = c43Carga(b.dataset.id); if (!c) { toast('Ese viaje ya empezó: ábrelo y márcalo como recibido'); render(); return; }
    var d = c173Debe(c), p = c173Pagado(c); S.c43 = c.id;
    abrirModal('¿Cancelar el viaje a ' + c.prov + ' del ' + fmtF(c.fecha) + '?', (d > 0.005 ? '• Ya no contará ' + money(d) + ' de deuda.<br>' : '') + (p > 0.005 ? '• Lo que ya pagaste (' + money(p) + ') queda a tu favor con ' + esc(c.prov) + '.<br>' : '') + '• Queda en el historial y lo puedes recuperar.', [['Sí, cancelar el viaje', 'c43si']]);
    return;
  }
  var c2 = c43Carga(S.c43); S.modal = null; S.c43 = null;
  if (c2) { c173Cancela(c2); toast('Viaje cancelado'); } render();
}, true);
/* ---------- #4: "Tu ruta: entregas…" solo mientras tu ruta sigue abierta ---------- */
var _rd43 = render;
render = function () {
  try {
    if (S.avPrecio && S.avPrecio.length && !(S.arOn && S.cierre && S.cierre.sent)) {
      var L = S.avPrecio.filter(function (x) { return !/^Tu ruta: entregas /.test(String(x)); });
      if (L.length !== S.avPrecio.length) S.avPrecio = L;
    }
  } catch (e) {}
  return _rd43.apply(this, arguments);
};
/* ---------- precio: pantalla grande en cualquier sección; "Después" = 1 hora ---------- */
pr24Visto = function () {
  try { var v = localStorage.getItem(PR24.k) || ''; if (v === iso(TODAY)) return true; var m = /^(\d{4}-\d\d-\d\d)\|(\d+)$/.exec(v); return !!(m && m[1] === iso(TODAY) && Date.now() - +m[2] < 3600e3); } catch (e) { return PR24.v === iso(TODAY); }
};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="pr24x"]'); if (!b) return;
  setTimeout(function () { try { localStorage.setItem(PR24.k, iso(TODAY) + '|' + Date.now()); } catch (er) {} PR24.v = null; }, 0);
}, true);
var _prP43 = pr24Pantalla;
pr24Pantalla = function () {
  var t = S.tab.admin;
  /* en cualquier sección (no dentro de una ventana de pasos, del reporte o de la configuración) */
  var tapado = document.getElementById('wzov') || document.getElementById('setov') || document.querySelector('.ov70') || document.getElementById('pinov');
  try { if (S.role === 'admin' && !tapado) S.tab.admin = 'inicio'; return _prP43.apply(this, arguments); } finally { S.tab.admin = t; }
};
