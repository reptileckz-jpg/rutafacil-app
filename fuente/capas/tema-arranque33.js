/* ===================== TEMA · Periodo de arranque: 2 semanas con los números de Bodega aproximados (24 nov · punto 33 de la nueva numeración) =====================
   Ricardo (plan del 30 nov, fuente/PLAN-ARRANQUE-30NOV.md): "la primera vez los datos no van a ser muy exactos … que todo lo que se pone
   al inicio en kilos y taras sea aproximado y conforme pasan los días se vaya puliendo". Escogió: periodo de arranque de 2 semanas,
   solo para Bodega (taras vacías, llenas, en maduración, maduras y kilos de macho). Las taras con clientes, sus deudas y el efectivo
   cuentan EXACTO desde el día 1.
   - Empieza solo al terminar la configuración inicial (S.arr33 = {ini, fin = ini + 14 días}), o desde Ajustes. Se puede terminar antes.
   - Mientras dura, en Bodega sale "🟡 Periodo de arranque hasta …: los números son aproximados".
   - Contar la bodega: el motivo de la diferencia ya viene como "Ajuste de arranque" y no pide volver a contar aunque la diferencia sea
     grande. Lo que salga NO es merma: se anota con valor $0 (queda la cantidad y el valor que habría sido, para el historial).
   - Ajustar taras (descuadre): el motivo ya viene como "Ajuste de arranque". No se le descuenta a nadie.
   24 nov (Ricardo, después): el MACHO siempre cuenta como merma, también en el arranque (al madurar y al moverlo se caen plátanos de la
   penca y baja de peso; así sabe cuánto se pierde de lo que cargó). El arranque solo ajusta las cajas (vacías, verdes, en maduración, maduras).
   Textos: "ve contando, con cada conteo el número se ajusta; tienes hasta el … para dejarlo bien; después las diferencias son merma".
   Los últimos 4 días sale en "Hoy" cuántos días quedan.
   No borra nada: todo queda en el historial. Se arma al final.
   ============================================================================================ */
try { if (NB_SH.indexOf('arr33') < 0) NB_SH.push('arr33'); } catch (e) {}
var ARR33 = { dias: 14, mot: 'Ajuste de arranque' };
function arr33Activo() { try { var a = S.arr33, h = iso(TODAY); return !!(a && a.ini && !a.term && h >= a.ini && h <= a.fin); } catch (e) { return false; } }
function arr33Empieza(q) {
  var h = iso(TODAY); S.arr33 = { ini: h, fin: iso(new Date(TODAY.getTime() + (ARR33.dias - 1) * 864e5)), q: q || quien() };
  try { S.hist.push({ t: fmtF(h) + ' ' + hhmm(), q: quien(), x: 'Empezó el periodo de arranque (números de Bodega aproximados) hasta el ' + fmtF(S.arr33.fin) }); } catch (e) {}
}
/* al terminar la configuración inicial, empieza solo */
var _rdA33 = render;
render = function () {
  try {
    if (S.setup && S.setup.fin && !S.arr33 && S.role === 'admin' && MODO === 'vacio') arr33Empieza('App');
    if (arr33Activo() && S.role === 'admin' && S.tab.admin === 'bodega') { S.cnt82 = S.cnt82 || {}; if (!S.cnt82.mot) S.cnt82.mot = ARR33.mot; }
  } catch (e) {}
  var r = _rdA33.apply(this, arguments);
  try { arr33Banner(); } catch (e) {}
  return r;
};
function arr33Quedan() { try { return Math.round((new Date(S.arr33.fin + 'T12:00:00') - new Date(iso(TODAY) + 'T12:00:00')) / 864e5) + 1; } catch (e) { return 0; } }
function arr33Txt() {
  return 'Ve contando la bodega: con cada conteo el número de <b>cajas</b> (vacías, verdes, en maduración y maduras) se va ajustando, y esa diferencia es <b>ajuste de arranque</b>: no es merma ni se le descuenta a nadie. '
    + 'Tienes hasta el <b>' + esc(fmtF(S.arr33.fin)) + '</b> para dejar bien tus números. <b>Después, las diferencias al contar ya cuentan como merma.</b> '
    + 'El <b>macho</b> siempre cuenta como merma (al madurar y al moverlo se caen plátanos y baja de peso): así sabes cuánto se pierde de lo que cargaste.';
}
function arr33Banner() {
  if (S.role !== 'admin' || S.tab.admin !== 'bodega' || !arr33Activo()) return;
  var m = document.querySelector('main'); if (!m || m.querySelector('[data-x="arr33"]')) return;
  var d = document.createElement('div'); d.className = 'card a42c a42-o'; d.dataset.x = 'arr33';
  d.setAttribute('style', 'padding:14px 16px');
  var q = arr33Quedan();
  d.innerHTML = (typeof A42 !== 'undefined' ? '<span class="a42i" aria-hidden="true" style="float:left;margin:0 12px 6px 0">' + A42.ic.o + '</span>' : '') + '<b>Periodo de arranque · ' + (q <= 1 ? 'hoy es el último día' : 'te quedan ' + q + ' días') + ' (hasta el ' + esc(fmtF(S.arr33.fin)) + ')</b><div style="font-size:15px;margin-top:4px">' + arr33Txt() + '</div>';
  var h = m.querySelector('h1'); if (h) h.after(d); else m.prepend(d);
}
/* contar la bodega: no pide volver a contar y la diferencia no es merma */
var _cg33 = cntGrande82;
cntGrande82 = function () { if (arr33Activo()) return false; return _cg33.apply(this, arguments); };
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="registrarcnt"]'); if (!b || !arr33Activo()) return;
  var n0 = (S.mermas || []).length;
  setTimeout(function () {
    try {
      (S.mermas || []).slice(n0).forEach(function (m) {
        if (!m || m.aj33) return;
        /* el macho sigue siendo merma; solo las cajas son ajuste de arranque */
        var v = num(m.valor), vM = num(m.M) > 0 ? Math.min(v, r2(num(m.M) * costoKgMAct())) : 0, vR = r2(v - vM);
        m.aj33 = { valor: vR, R: num(m.R), f: iso(TODAY) }; m.R = 0; m.valor = vM; m.mot82 = m.mot82 || ARR33.mot;
        m.txt = (m.txt ? m.txt + ' · ' : '') + (num(m.aj33.R) ? 'Cajas: ajuste de arranque (no es merma)' : '') + (num(m.M) ? (num(m.aj33.R) ? ' · ' : '') + 'Macho: sí es merma' : '');
      });
    } catch (er) {}
  }, 30);
}, true);
/* ajustar taras: el motivo ya viene puesto */
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="aj6"]'); if (!b || !arr33Activo()) return;
  setTimeout(function () { try { if (S.aj6 && !S.aj6.mot) { S.aj6.mot = ARR33.mot; S.aj6m = ARR33.mot; render(); } } catch (er) {} }, 0);
}, true);
/* Ajustes: ver, empezar o terminar el periodo */
var _aj33 = ajHTML;
ajHTML = function () {
  var h = _aj33.apply(this, arguments);
  try {
    if (!h || S.role !== 'admin' || S.encOn) return h;
    var a = S.arr33, act = arr33Activo();
    var x = '<div class="card" data-k="arr33aj"><b>🟡 Periodo de arranque</b><div class="lbl" style="margin-top:4px">'
      + (act ? 'Activo (' + arr33Quedan() + ' días). ' + arr33Txt() : (a ? 'Terminó' + (a.term ? ' el ' + esc(fmtF(a.term)) : ' el ' + esc(fmtF(a.fin))) + '. Ya todo cuenta normal.' : 'No se ha usado. Sirve para las primeras 2 semanas, cuando los números de la bodega todavía son aproximados.'))
      + '</div>' + (act ? '<button class="btn sec" style="margin-top:8px" data-act="arr33fin">Ya está todo contado: terminar el arranque</button>' : (!a ? '<button class="btn sec" style="margin-top:8px" data-act="arr33ini">Empezar el periodo de arranque (2 semanas)</button>' : '')) + '</div>';
    var i = h.lastIndexOf('</div></div>'); return i > -1 ? h.slice(0, i) + x + h.slice(i) : h + x;
  } catch (e) { return h; }
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="arr33fin"],[data-act="arr33ini"]'); if (!b || S.role !== 'admin') return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (b.dataset.act === 'arr33ini') { arr33Empieza(); toast('Periodo de arranque: 2 semanas'); render(); return; }
  if (!confirm('¿Terminar el periodo de arranque? Desde hoy, las diferencias al contar cuentan como merma.')) return;
  S.arr33.term = iso(TODAY); try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Terminó el periodo de arranque' }); } catch (er) {}
  toast('Listo: el arranque terminó'); render();
}, true);
/* los últimos 4 días: recordatorio en "Hoy" */
var _hT33 = hoyTareas;
hoyTareas = function () {
  var L = _hT33.apply(this, arguments);
  try { if (S.role === 'admin' && !S.encOn && arr33Activo()) { var q = arr33Quedan(); if (q <= 4) L.push({ k: 'arr33q', t: '🟡 ' + (q <= 1 ? 'Hoy termina' : 'Quedan ' + q + ' días del') + ' periodo de arranque: cuenta la bodega para dejar bien tus cajas. Después, las diferencias cuentan como merma.', go: 'bodega', ok: false }); } } catch (e) {}
  return L;
};
