/* ===================== TEMA · Kilometraje imposible: no se cuenta y se corrige (21 nov · punto 16 de la nueva numeración) =====================
   Ricardo: "hay un error al contar el kilometraje de los vehículos: en lugar de contar la diferencia contó el total de kilómetros; eso se tradujo
   en ganancias mal calculadas, ahora sale que perdí con esa ruta" (Cuadre vie 20 nov: "Desgaste de vehículos −$35,415.10 · 50,593 km";
   recepción: "Recorrió 50593 km y la ruta era de ~156 km").
   Causa: km del cierre = odómetro de llegada − odómetro de SALIDA. La ruta de Danu del 20 arrancó sin "Antes de salir" (el error que arregla
   el punto 7), así que nunca se anotó el odómetro de salida (vacío = 0) y el cierre dejó mandarse así: 50,593 − 0 = 50,593 km × $0.70.
   Ahora:
     1) El chofer NO puede mandar un cierre sin odómetro de salida o con un kilometraje imposible (más de 1,000 km en un día, o negativo):
        sale el campo "Odómetro con el que SALIÓ" y el aviso con el número que saldría.
     2) Un cierre ya guardado con más de 1,000 km en un día no se cuenta en el desgaste (no puede ser): sus km quedan en 0 mientras se corrige.
        El número original NO se borra: queda en res.km16 = {orig, f} (y el odómetro de salida que tenía, si era de la ruta viva).
     3) En el Cuadre sale "⚠️ Kilometraje por corregir" y su pantalla (un solo paso): escribes el odómetro con el que salió, la app calcula los
        km y el desgaste, y al guardar queda en el historial quién lo corrigió y de cuánto a cuánto. Se puede volver a corregir.
   Blindaje: solo toca los km de ESE cierre (nunca ventas, efectivo ni inventario); lo de antes queda guardado en el mismo registro; los
   números se recalculan solos en Cuadre/Estadísticas porque salen de res.km. Se arma al final.
   ============================================================================================ */
var KM16 = { max: 1000 };
function km16Malo(km, odoIni) { km = num(km); return km > KM16.max || km < 0 || (!(num(odoIni) > 0) && km > 0); }
/* ---------- 2) los cierres ya guardados con km imposibles ---------- */
function km16Lista() {
  var L = [];
  try {
    (S.rutasHist || []).forEach(function (e) { if (e && e.res && (e.res.km16 || num(e.res.km) > KM16.max)) L.push({ res: e.res, ch: +e.ch, f: e.f, e: e }); });
    var vivas = [];
    if (S.chofHoy != null && S.cierre) vivas.push({ ch: +S.chofHoy, o: S });
    Object.keys(S.chSt || {}).forEach(function (id) { var o = S.chSt[id]; if (o && o.cierre) vivas.push({ ch: +id, o: o }); });
    vivas.forEach(function (v) { var r = v.o.cierre && v.o.cierre.res; if (r && (r.km16 || num(r.km) > KM16.max)) L.push({ res: r, ch: v.ch, f: v.o.rutaDia80 || iso(TODAY), viva: v.o }); });
  } catch (e) {}
  return L;
}
function km16Neutra() {
  km16Lista().forEach(function (x) {
    var r = x.res; if (r.km16) return;
    r.km16 = { orig: num(r.km), f: iso(TODAY) };
    if (x.viva && x.viva.cierre) { r.km16.odoIni = x.viva.cierre.odoIni; r.km16.odo = x.viva.cierre.odo; x.viva.cierre.odoIni = num(x.viva.cierre.odo); }
    r.km = 0;
    try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: 'App', x: 'El cierre del ' + fCorta91(x.f) + ' de ' + chofN(x.ch) + ' traía ' + r.km16.orig.toLocaleString('es-MX') + ' km (imposible en un día: faltó el odómetro de salida). No se cuenta en el desgaste hasta corregirlo.' }); } catch (e) {}
  });
}
function km16Pend() { return km16Lista().filter(function (x) { return x.res.km16 && !x.res.km16.corr; }); }
/* ---------- 1) el chofer no manda un cierre con km imposibles ---------- */
function km16Cierre() {
  var c = S.cierre; if (!c || c.sent) return null;
  var km = num(c.odo) - num(c.odoIni);
  return km16Malo(km, c.odoIni) ? { km: km } : null;
}
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="enviar"]'); if (!b || S.role !== 'rep') return;
  var x = km16Cierre(); if (!x) return;
  e.preventDefault(); e.stopImmediatePropagation();
  S.cierre.odoFalta181 = true;
  toast(!(num(S.cierre.odoIni) > 0) ? 'Escribe el odómetro con el que SALIÓ (no se anotó al salir)' : 'Revisa el odómetro con el que SALIÓ: así saldrían ' + Math.round(x.km).toLocaleString('es-MX') + ' km en un día');
  try { S.cierreP = 0; } catch (er) {}
  render();
  setTimeout(function () { var f = document.getElementById('odoIni181'); if (f) { f.scrollIntoView({ block: 'center', behavior: 'smooth' }); try { f.focus({ preventScroll: true }); } catch (er) {} } }, 60);
}, true);
var _cR16 = cierreRes;
cierreRes = function () {
  var r = _cR16.apply(this, arguments);
  try { if (r && S.cierre) { r.odo16 = num(S.cierre.odo); r.odoIni16 = num(S.cierre.odoIni); } } catch (e) {}
  try { if (r && S.role === 'rep' && S.cierre && !S.cierre.sent && km16Cierre()) S.cierre.odoFalta181 = true; } catch (e) {}
  return r;
};
/* ---------- 3) corregir desde el Cuadre (su propia pantalla) ---------- */
function km16Llave(x) { return x.ch + '|' + x.f; }
function km16Aviso() {
  if (S.role !== 'admin' || S.tab.admin !== 'cuadre121') return;
  var m = document.querySelector('main'); if (!m || m.querySelector('[data-x="km16"]')) return;
  var L = km16Pend(); if (!L.length) return;
  var d = document.createElement('div'); d.dataset.x = 'km16';
  d.innerHTML = L.map(function (x) {
    return '<button class="card alert" data-act="km16" data-k="' + esc(km16Llave(x)) + '" style="width:100%;text-align:left;color:inherit;display:flex;gap:10px;align-items:center;padding:12px 14px">'
      + '<span style="flex:1"><b>⚠️ Kilometraje por corregir</b><br><span class="lbl">' + esc(chofN(x.ch)) + ' · ' + esc(fCorta91(x.f)) + ': traía ' + x.res.km16.orig.toLocaleString('es-MX') + ' km (no puede ser de un día). Mientras, no se cuenta en el desgaste.</span></span><span>›</span></button>';
  }).join('');
  var h1 = m.querySelector('h1'); if (h1) h1.insertAdjacentElement('afterend', d); else m.prepend(d);
}
function km16Busca(k) { return km16Lista().filter(function (x) { return km16Llave(x) === k; })[0] || null; }
function km16Llegada(x) { var k = x.res.km16; return num(k.odo) || num(x.res.odo16) || num(k.orig); }
function km16Calc(x) { var v = S.km16v || {}, lle = v.lle != null && v.lle !== '' ? num(v.lle) : km16Llegada(x), sal = num(v.sal); var km = lle && sal ? lle - sal : 0; return { lle: lle, sal: sal, km: km, ok: km > 0 && km <= KM16.max }; }
function km16HTML() {
  var x = km16Busca(S.km16k), vol = '<button class="link pnback" data-act="tab" data-t="cuadre121">← Volver al Cuadre</button>';
  if (!x) return vol + '<h1>Kilometraje</h1><div class="card good" style="padding:14px"><b>✓ Ya no hay nada que corregir aquí</b></div>';
  var k = x.res.km16, vid = x.res.veh68 != null ? x.res.veh68 : (x.viva && x.viva.vehHoy), vh = vid != null ? vehById(+vid) : null;
  var tasa = vh && typeof tasa68 === 'function' ? tasa68(vh) : (x.res.tasa68 != null && x.res.tasa68 !== '' ? num(x.res.tasa68) : 0.7), c = km16Calc(x), v = S.km16v || {};
  var h = vol + '<h1 style="margin-top:4px">Corregir kilometraje</h1><div class="lbl" style="margin-bottom:8px">' + esc(chofN(x.ch)) + ' · ' + esc(fCorta91(x.f)) + (vh ? ' · ' + esc(vh.n) : '') + '</div><div class="fadein" key="km16">';
  h += '<div class="card" style="padding:12px 14px"><div class="row" style="border:0;min-height:28px"><span>Venía guardado</span><b class="neg">' + k.orig.toLocaleString('es-MX') + ' km</b></div>'
    + '<div class="lbl">Eso pasa cuando no se anotó el odómetro de salida: la app restó contra 0.</div>'
    + (k.corr ? '<div class="lbl" style="margin-top:4px">Ya se corrigió a ' + num(x.res.km).toLocaleString('es-MX') + ' km (' + esc(k.corr.q || '') + ', ' + esc(k.corr.t || '') + '). Puedes volver a corregirlo.</div>' : '') + '</div>';
  h += '<div class="card" style="padding:12px 14px">'
    + '<div class="field"><label for="km16lle">Odómetro al LLEGAR (km)</label><input id="km16lle" type="number" inputmode="numeric" data-km16="lle" value="' + esc(v.lle != null ? v.lle : String(km16Llegada(x) || '')) + '"></div>'
    + '<div class="field" style="margin-top:6px"><label for="km16sal">Odómetro con el que SALIÓ (km)</label><input id="km16sal" type="number" inputmode="numeric" data-km16="sal" value="' + esc(v.sal || '') + '"></div>'
    + '<div data-x="km16calc" style="margin-top:8px">' + (c.km ? '<div class="row" style="border:0;min-height:28px"><span>Recorrió</span><b' + (c.ok ? '' : ' class="neg"') + '>' + Math.round(c.km).toLocaleString('es-MX') + ' km</b></div><div class="row" style="border:0;min-height:28px"><span>Desgaste (' + money(tasa) + '/km)</span><b>' + money(r2(c.km * tasa)) + '</b></div>' + (c.ok ? '' : '<div class="neg" style="font-weight:700">Deben salir entre 1 y ' + KM16.max.toLocaleString('es-MX') + ' km.</div>') : '<div class="lbl">Escribe el odómetro con el que salió y aquí sale cuántos km y cuánto desgaste.</div>') + '</div></div>';
  h += '<button class="btn big" style="width:100%" data-act="km16ok"' + (c.ok ? '' : ' disabled') + '>Guardar' + (c.ok ? ' ' + Math.round(c.km).toLocaleString('es-MX') + ' km' : '') + '</button>';
  return h + '</div>';
}
document.addEventListener('input', function (e) { var t = e.target; if (!t || !t.dataset || !t.dataset.km16) return; S.km16v = S.km16v || {}; S.km16v[t.dataset.km16] = t.value; render(); }, true);
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="km16"],[data-act="km16ok"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (b.dataset.act === 'km16') { S.km16k = b.dataset.k; S.km16v = {}; S.tab.admin = 'km16'; render(); window.scrollTo(0, 0); return; }
  var x = km16Busca(S.km16k); if (!x) return;
  var k = x.res.km16, c = km16Calc(x), km = c.km, oi = c.sal;
  if (!c.ok) { toast('Revisa los números: deben salir entre 1 y ' + KM16.max + ' km'); return; }
  k.lle = c.lle;
  var antes = num(x.res.km);
  x.res.km = Math.round(km);
  k.corr = { km: Math.round(km), oi: oi || null, q: quien(), t: fmtF(iso(TODAY)) + ' ' + hhmm() };
  if (x.viva && x.viva.cierre && oi) x.viva.cierre.odoIni = oi;
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Corrigió el kilometraje del cierre del ' + fCorta91(x.f) + ' de ' + chofN(x.ch) + ': de ' + (antes || k.orig).toLocaleString('es-MX') + ' a ' + Math.round(km).toLocaleString('es-MX') + ' km' }); } catch (er) {}
  S.km16v = {}; S.tab.admin = 'cuadre121'; toast('Kilometraje corregido: ' + Math.round(km) + ' km'); render(); window.scrollTo(0, 0);
}, true);
try { if (SEC92.indexOf('km16') < 0) SEC92.push('km16'); } catch (e) {}
var _rd16 = render;
render = function () {
  try { if (typeof VIEWS !== 'undefined' && !VIEWS.km16) VIEWS.km16 = km16HTML; } catch (e) {}
  try { km16Neutra(); } catch (e) { console.error('km16', e); }
  var r = _rd16.apply(this, arguments);
  try { km16Aviso(); } catch (e) {}
  return r;
};
