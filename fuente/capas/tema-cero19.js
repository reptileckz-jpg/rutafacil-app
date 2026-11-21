/* ===================== TEMA · "Cerrar su ruta y empezar de cero" para el administrador + km estimados cuando no hubo odómetro (21 nov · punto 19) =====================
   Ricardo: "no mandó el odómetro de salida porque se abrió la ruta en automático, tampoco las fotos … nunca me dijiste que le cerrara la ruta o se
   la cancelara, o que hay un botón para eso, para que empezara desde cero".
   No existía: "Liberar su ruta de hoy" solo sale cuando el chofer está bloqueado sin mandar su cierre. Ahora:
     1) En Rutas, en la tarjeta de cada chofer con la ruta abierta (salió o ya entregó, sin mandar cierre): "🔄 Cerrar su ruta y empezar de cero".
        Abre su pantalla con lo que trae (efectivo, taras, kilos) y "Sí, cerrar su ruta". Hace lo mismo que "Liberar" (95, probado): lo que traía
        se guarda como "📥 Cierre atrasado" para recibirlo (dinero, entregas, cajas, kilos, gastos, odómetro) y al chofer le sale su ruta nueva con
        "Antes de salir" (vehículo, fotos, odómetro, carga) y el aviso de por qué.
        Candado: si ese chofer ya tiene un cierre atrasado de ese día sin recibir, primero hay que recibirlo (si no, el segundo no se podría guardar).
     2) Corregir kilometraje (16): si nunca se anotó el odómetro de salida, "No se anotó: usar los km estimados" con los km que calcula la app
        con el mapa de los clientes que visitó (bodega → clientes → bodega). Queda marcado como estimado.
   No se borra nada: lo de antes queda para recibirlo. Se arma al final.
   ============================================================================================ */
function cero19Ruta(id) {
  try { var o = +id === +S.chofHoy && !S.arOn ? arPack() : (S.chSt || {})[id]; return o || null; } catch (e) { return null; }
}
function cero19Abierta(id) {
  var o = cero19Ruta(id); if (!o) return false;
  if (o.cierre && o.cierre.sent) return false;
  return !!((o.salida && o.salida.ok) || (o.log || []).length);
}
function cero19Choca(id) { var o = cero19Ruta(id), f = (o && o.rutaDia80) || iso(TODAY); return !!(S.atras93 || {})[(+id) + '|' + f]; }
function cero19Pon() {
  if (S.role !== 'admin' || S.encOn || S.tab.admin !== 'rutas') return;
  var L = document.querySelectorAll('main [data-x="ch92"][data-id]');
  Array.prototype.forEach.call(L, function (cd) {
    var id = +cd.dataset.id; if (cd.querySelector('[data-act="cero19"]')) return;
    try { if (esAdm({ id: id }) || !cero19Abierta(id)) return; } catch (e) { return; }
    cd.insertAdjacentHTML('beforeend', '<button class="btn sec" style="width:100%;margin-top:8px;min-height:44px" data-act="cero19" data-id="' + id + '">🔄 Cerrar su ruta y empezar de cero</button>');
  });
}
function cero19HTML() {
  var id = S.cero19id, o = cero19Ruta(id), vol = '<button class="link pnback" data-act="tab" data-t="rutas">← Volver a Rutas</button>';
  if (!o || !cero19Abierta(id)) return vol + '<h1>Cerrar su ruta</h1><div class="card good" style="padding:14px"><b>✓ ' + esc(chofN(id)) + ' ya no tiene una ruta abierta</b></div>';
  var d = null; try { d = rutaDet6(o); } catch (e) {}
  var h = vol + '<h1 style="margin-top:4px">Cerrar la ruta de ' + esc(chofN(id)) + '</h1><div class="fadein" key="c19">';
  h += '<div class="card" style="padding:12px 14px"><b>Lo que trae</b>' + (d ? detCorto6(d) : '') + '<button class="btn sec" style="width:100%;margin-top:8px;min-height:44px" data-act="cero19ver" data-id="' + id + '">Ver todo lo de esta ruta ›</button></div>';
  h += '<div class="card note" style="padding:12px 14px"><b>Qué pasa</b><div style="font-size:15px;margin-top:4px">• Todo lo de esta ruta (efectivo, entregas, cajas, kilos, gastos y odómetro) queda en Rutas como <b>"📥 Cierre atrasado"</b> para que lo recibas.<br>• A ' + esc(chofN(id)) + ' le sale su ruta de hoy nueva: <b>"Antes de salir"</b> otra vez (vehículo, fotos, odómetro y carga).<br>• No se borra nada.</div></div>';
  if (cero19Choca(id)) h += '<div class="card alert" style="padding:12px 14px"><b>Primero recibe su cierre atrasado de hoy</b><div class="lbl">Ya hay uno sin recibir de este día. Recíbelo en Rutas y luego cierras esta.</div></div>';
  else h += '<button class="btn big" style="width:100%" data-act="cero19ok" data-id="' + id + '">Sí, cerrar su ruta y empezar de cero</button>';
  return h + '</div>';
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="cero19"],[data-act="cero19ok"],[data-act="cero19ver"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  var id = +b.dataset.id, a = b.dataset.act;
  if (a === 'cero19') { S.cero19id = id; S.tab.admin = 'cero19'; render(); window.scrollTo(0, 0); return; }
  if (a === 'cero19ver') {
    /* "Todo lo de esta ruta" (6) es para cierres guardados; aquí se enseña la ruta abierta en su ficha de siempre */
    S.tab.admin = 'rutas'; try { var vb = document.createElement('button'); vb.dataset.act = 'verruta'; vb.dataset.id = id; vb.dataset.ir = 'cierreadm'; vb.style.display = 'none'; document.body.appendChild(vb); vb.click(); vb.remove(); } catch (er) {}
    return;
  }
  if (!cero19Abierta(id)) { toast('Ya no tiene una ruta abierta'); S.tab.admin = 'rutas'; render(); return; }
  if (cero19Choca(id)) { toast('Primero recibe su cierre atrasado de hoy'); render(); return; }
  var o = cero19Ruta(id), f = (o && o.rutaDia80) || iso(TODAY), k = id + '|' + f;
  libera86(id);
  var e2 = (S.atras93 || {})[k];
  if (!e2 && (o.log || []).length) { toast('No se pudo guardar lo que traía: no se cerró'); render(); return; }
  try { var av = S.rutaAv && S.rutaAv[id]; if (av && av.length) av[av.length - 1] = 'El administrador cerró tu ruta para empezar de cero: haz "Antes de salir" (vehículo, fotos y odómetro). Lo que traías lo recibe él.'; } catch (er) {}
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Cerró la ruta de ' + chofN(id) + ' para empezar de cero (lo que traía quedó para recibirlo)' }); } catch (er) {}
  S.tab.admin = 'rutas'; render(); window.scrollTo(0, 0);
}, true);
/* ---------- 2) km estimados cuando nunca se anotó el odómetro de salida ---------- */
function km19Est(x) {
  try {
    var log = (x.e && x.e.log) || (x.viva && x.viva.log) || [], vis = {}, L = [];
    log.forEach(function (l) { var c = l && cl(l.c); if (c && !c.rapida && !vis[c.id]) { vis[c.id] = 1; L.push(c); } });
    var b = typeof km180Bod === 'function' ? km180Bod() : null; if (!L.length) return 0;
    var con = L.filter(function (c) { return c.lat != null && c.lng != null && !isNaN(+c.lat) && !isNaN(+c.lng); });
    if (b && con.length >= Math.max(1, Math.ceil(L.length / 2))) {
      var km = 0, prev = b;
      con.forEach(function (c) { var d = kmE(prev, { lat: +c.lat, lng: +c.lng }); if (d != null) km += d; prev = { lat: +c.lat, lng: +c.lng }; });
      var v = kmE(prev, b); if (v != null) km += v;
      km += sum(L.filter(function (c) { return con.indexOf(c) < 0; }), function (c) { return num(c.km); });
      return Math.max(1, Math.round(km));
    }
    return Math.max(0, Math.round(sum(L, function (c) { return num(c.km); })));
  } catch (e) { return 0; }
}
var _k16H19 = km16HTML;
km16HTML = function () {
  var h = _k16H19.apply(this, arguments);
  try {
    var x = km16Busca(S.km16k); if (!x || h.indexOf('data-act="km16ok"') < 0) return h;
    var est = km19Est(x); if (!(est > 0 && est <= KM16.max)) return h;
    var tasa = x.res.tasa68 != null && x.res.tasa68 !== '' ? num(x.res.tasa68) : 0.7;
    var bt = '<div class="card note" style="padding:12px 14px;margin-top:10px"><b>¿No se anotó el odómetro de salida?</b><div class="lbl" style="margin-top:4px">Usa los km que calcula la app con el mapa de los clientes que visitó (bodega → clientes → bodega): <b>~' + est.toLocaleString('es-MX') + ' km</b> · desgaste ' + money(r2(est * tasa)) + '. Queda marcado como estimado.</div>'
      + '<button class="btn sec" style="width:100%;margin-top:8px;min-height:48px" data-act="km19est" data-km="' + est + '">No se anotó: usar ~' + est.toLocaleString('es-MX') + ' km</button></div>';
    var i = h.lastIndexOf('</div>'); return i > -1 ? h.slice(0, i) + bt + h.slice(i) : h + bt;
  } catch (e) { return h; }
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="km19est"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  var x = km16Busca(S.km16k); if (!x) return;
  var km = Math.round(num(b.dataset.km)); if (!(km > 0 && km <= KM16.max)) return;
  var k = x.res.km16, antes = num(x.res.km);
  x.res.km = km; k.corr = { km: km, est: true, q: quien(), t: fmtF(iso(TODAY)) + ' ' + hhmm() };
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Corrigió el kilometraje del cierre del ' + fCorta91(x.f) + ' de ' + chofN(x.ch) + ': de ' + (antes || k.orig).toLocaleString('es-MX') + ' a ~' + km.toLocaleString('es-MX') + ' km (estimado: no se anotó el odómetro de salida)' }); } catch (er) {}
  S.km16v = {}; S.tab.admin = 'cuadre121'; toast('Kilometraje corregido: ~' + km + ' km (estimado)'); render(); window.scrollTo(0, 0);
}, true);
try { ['cero19'].forEach(function (k) { if (SEC92.indexOf(k) < 0) SEC92.push(k); }); } catch (e) {}
var _rd19 = render;
render = function () {
  try { if (typeof VIEWS !== 'undefined' && !VIEWS.cero19) VIEWS.cero19 = cero19HTML; } catch (e) {}
  var r = _rd19.apply(this, arguments);
  try { cero19Pon(); } catch (e) { console.error('cero19', e); }
  return r;
};
