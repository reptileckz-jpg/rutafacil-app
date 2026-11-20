/* ===================== TEMA · Resumen de lo que se va a cerrar (20 nov · punto 182) =====================
   Ricardo: "sí, me gusta esa idea": en "No mandaste tu cierre de ayer", que el chofer vea qué está cerrando antes de empezar:
   "Ayer: 12 entregas · 30 cajas y 80 kg ($8,450) · efectivo a entregar $6,200 · a crédito $2,250 · regresan 3 cajas · 10 vacías".
   Sale de lo mismo que usa el cierre (cierreRes y las entregas de esa ruta); solo muestra lo que tenga algo.
   Solo información; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
function dia182HTML() {
  try {
    var L = (S.log || []).filter(function (l) { return l && (l.c != null || num(l.total) > 0); }), r = cierreRes() || {};
    var p = [];
    p.push('<b>' + L.length + '</b> entrega' + (L.length === 1 ? '' : 's'));
    var v = [];
    if (num(r.R) > 0) v.push(num(r.R) + ' caja' + (num(r.R) === 1 ? '' : 's'));
    if (num(r.M) > 0) v.push(num(r.M) + ' kg de macho');
    if (v.length) p.push('vendiste ' + v.join(' y ') + (num(r.total) > 0 ? ' (<b>' + money(r.total) + '</b>)' : ''));
    var d = [];
    if (num(r.efectivo) > 0) d.push('<div class="row" style="border:0;min-height:30px"><span>Efectivo a entregar</span><b>' + money(r.efectivo) + '</b></div>');
    if (num(r.tarj) + num(r.trans) > 0) d.push('<div class="row" style="border:0;min-height:30px"><span>Con tarjeta o transferencia</span><b>' + money(num(r.tarj) + num(r.trans)) + '</b></div>');
    if (num(r.cred) > 0) d.push('<div class="row" style="border:0;min-height:30px"><span>Quedó a crédito</span><b>' + money(r.cred) + '</b></div>');
    var cj = num(r.reg) || num(S.inv && S.inv.reparto), kg = num(r.regK) || num(S.inv && S.inv.repartoKg);
    if (cj > 0 || kg > 0) d.push('<div class="row" style="border:0;min-height:30px"><span>Traes en el camión</span><b>' + [cj > 0 ? cj + ' caja' + (cj === 1 ? '' : 's') : '', kg > 0 ? kg + ' kg' : ''].filter(Boolean).join(' · ') + '</b></div>');
    if (num(r.V) > 0) d.push('<div class="row" style="border:0;min-height:30px"><span>Cajas vacías que recogiste</span><b>' + num(r.V) + '</b></div>');
    return '<div class="card" data-x="dia182" style="margin:14px 0 4px;text-align:left"><div style="font-size:16px"><b>' + esc(cap182(del80(S.dia80))) + ':</b> ' + p.join(' · ') + '</div>' + (d.length ? '<div style="margin-top:6px">' + d.join('') + '</div>' : '') + '<div class="lbl" style="margin-top:6px">Es lo que vas a mandar. Si algo no cuadra, lo revisas en el cierre.</div></div>';
  } catch (e) { return ''; }
}
function cap182(s) { s = String(s || '').replace(/^de /, '').replace(/^del /, 'el '); return s.charAt(0).toUpperCase() + s.slice(1); }
var _d182 = dia80HTML;
dia80HTML = function () {
  var h = _d182.apply(this, arguments);
  try {
    if (!h || h.indexOf('data-act="dia80c"') < 0) return h;
    var x = dia182HTML(); if (!x) return h;
    var k = 'Para empezar tu ruta de hoy, primero mándalo.</p>';
    return h.indexOf(k) > -1 ? h.replace(k, k + x) : h;
  } catch (e) { return h; }
};
