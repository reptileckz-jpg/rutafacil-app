/* ===================== TEMA · Sueldo del dueño, caja semanal, banco y apartado (24 nov · punto 34 de la nueva numeración) =====================
   Plan del 30 nov (fuente/PLAN-ARRANQUE-30NOV.md). Decisiones de Ricardo:
   1) Gasto fijo "Es el sueldo del dueño (no es gasto del negocio)": al pagarlo se anota como "Retiro del dueño" (baja la caja, NO la
      ganancia). Antes solo la demo lo traía; en la versión real no había forma de marcarlo.
   2) Cierre de caja CADA SÁBADO (antes se pedía todos los días): una sola caja, aunque el dinero esté en su casa. Si el sábado no se
      cerró, en los días siguientes la app lo pide antes de empezar. En "Hoy" del sábado: "Cerrar la caja de la semana".
   3) Banco: "Pasé dinero de la caja al banco" (para pagar por transferencia). Los pagos al proveedor por transferencia salen del banco.
      Si el banco queda en negativo, la app pide anotar de dónde salió (un depósito que faltó).
   4) Apartado semanal para aguinaldo y vacaciones: cuánto conviene guardar cada semana y cuánto debería llevar apartado (el dinero no
      se mueve, solo se informa).
   Ningún cálculo de ganancia cambia. Se arma al final.
   ============================================================================================ */
/* ---------- 1) sueldo del dueño en gastos fijos ---------- */
var C34 = { ret: false };
function caja34Fijo() {
  if (S.role !== 'admin') return;
  var d = document.querySelector('details[data-k="fijonew"]'); if (!d || d.querySelector('[data-x="ret34"]')) return;
  var btn = d.querySelector('[data-act="fijoadd"]'); if (!btn) return;
  var w = document.createElement('div'); w.dataset.x = 'ret34'; w.className = 'field'; w.style.marginTop = '8px';
  w.innerHTML = '<label>¿Es el sueldo del dueño?</label><div class="chips" role="group" aria-label="Sueldo del dueño"><button data-act="ret34" data-v="1" aria-pressed="' + C34.ret + '">Sí, es mi sueldo</button><button data-act="ret34" data-v="0" aria-pressed="' + (!C34.ret) + '">No, es gasto del negocio</button></div>'
    + '<div class="lbl">Tu sueldo no es gasto del negocio: baja la caja pero no la ganancia.</div>';
  btn.before(w);
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="ret34"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); C34.ret = b.dataset.v === '1'; render();
}, true);
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="fijoadd"]'); if (!b || S.role !== 'admin') return;
  var n0 = (S.fijos || []).length, ret = C34.ret;
  setTimeout(function () { try { if ((S.fijos || []).length > n0 && ret) { var f = S.fijos[S.fijos.length - 1]; f.retiro = true; S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Gasto fijo "' + f.n + '" marcado como sueldo del dueño' }); } C34.ret = false; render(); } catch (er) {} }, 0);
}, true);
/* ---------- 2) cierre de caja semanal (sábado) ---------- */
function sabPasado34() { var d = new Date(TODAY.getTime()), w = d.getDay(); var n = w === 6 ? 7 : (w + 1); return iso(new Date(TODAY.getTime() - n * 864e5)); }
var _cap34 = cajaAyerPend;
cajaAyerPend = function () {
  try {
    if (S.role !== 'admin' || S.encOn || S.primerDia || S.cajaAyerSkip) return false;
    var s = sabPasado34(), hoy = iso(TODAY);
    if ((S.cajaCierres || []).some(function (x) { return (x.f || '') >= s || (x.ayer || '') >= s; })) return false;
    if ((S.sinTrabajo || []).indexOf(s) > -1) return false;
    if (S.setup && S.setup.fin && S.setup.finF34 && S.setup.finF34 > s) return false; /* la app empezó después de ese sábado */
    try { if (typeof sinMov82 === 'function') { var hubo = false; for (var i = 0; i < 7; i++) { if (!sinMov82(iso(new Date(new Date(s + 'T12:00:00').getTime() - i * 864e5)))) { hubo = true; break; } } if (!hubo) return false; } } catch (er) {}
    return hoy > s;
  } catch (e) { return false; }
};
var _cah34 = cajaAyerHTML;
cajaAyerHTML = function () {
  var h = _cah34.apply(this, arguments); if (!h) return h;
  try {
    var s = sabPasado34();
    h = h.replace('Antes de empezar: cierra la caja de ayer', 'Antes de empezar: cierra la caja de la semana')
      .replace(/Ayer \([^)]*\) no se hizo el cierre de caja\./, 'El sábado (' + fmtF(s) + ') no se hizo el cierre de caja de la semana.')
      .replace('Cuenta el efectivo que hay ahorita', 'Cuenta TODO el efectivo del negocio que hay ahorita (también el que guardas en tu casa)')
      .replace('Registrar cierre de ayer', 'Registrar el cierre de la semana').replace('Ayer no se trabajó', 'Esa semana no se trabajó');
  } catch (e) {}
  return h;
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="cajaayerno"]'); if (!b) return;
  /* "Esa semana no se trabajó": se anota el sábado */
  setTimeout(function () { try { var s = sabPasado34(); if ((S.sinTrabajo || []).indexOf(s) < 0) S.sinTrabajo = (S.sinTrabajo || []).concat([s]); render(); } catch (er) {} }, 0);
}, true);
var _hT34 = hoyTareas;
hoyTareas = function () {
  var L = _hT34.apply(this, arguments);
  try {
    var sab = TODAY.getDay() === 6;
    L = L.filter(function (x) { return !(x && x.k === 'cj') || sab; });
    L.forEach(function (x) { if (x && x.k === 'cj') x.t = 'Cerrar la caja de la semana: cuenta todo el efectivo (también el de tu casa)' + (apartado34().sem > 0 ? ' · aparta ' + money(apartado34().sem) + ' para aguinaldo y vacaciones' : ''); });
  } catch (e) {}
  return L;
};
/* ---------- 3) banco ---------- */
var _cE34 = cajaEsp;
cajaEsp = function () { return _cE34.apply(this, arguments) - sum((S.bancoMov || []).filter(function (x) { return x && x.t === 'Depósito desde la caja'; }), function (x) { return num(x.m); }); };
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="abonoprov"],[data-act="wzfin"],[data-act="pagook"]'); if (!b || S.role !== 'admin') return;
  /* los pagos al proveedor por transferencia salen del banco */
  var antes = {}; (S.cargas || []).forEach(function (c) { antes[c.id] = (c.pagos || []).length; });
  setTimeout(function () {
    try {
      (S.cargas || []).forEach(function (c) {
        (c.pagos || []).slice(antes[c.id] || 0).forEach(function (p) {
          if (!p || p.forma !== 'Transferencia' || p.m <= 0 || p.ban34) return; p.ban34 = 1;
          S.bancoMov = S.bancoMov || []; S.bancoMov.push({ f: iso(TODAY), h: hhmm(), m: -r2(num(p.m)), t: 'Pago a proveedor (transferencia)', n: (p.prov || c.prov || '') + ' · ' + quien() });
        });
      });
    } catch (er) {}
  }, 60);
}, true);
function banco34HTML() {
  if (S.role !== 'admin' || S.encOn) return '';
  var s = bancoSaldo(), x = S.bdep34;
  var h = '<div class="card" data-x="bdep34"><b>🏦 Caja y banco</b><div class="lbl" style="margin-top:4px">El efectivo del negocio es una sola caja, aunque una parte esté en tu casa. Cuando deposites para pagar por transferencia, anótalo aquí.</div>'
    + rw('En el banco', money(s), s < -0.5 ? 'neg' : '')
    + (s < -0.5 ? '<div class="lbl neg" style="margin-top:4px">El banco quedó en negativo: falta anotar un depósito. ¿De dónde salió ese dinero?</div>' : '');
  h += x ? '<div class="field"><label for="bdep34">¿Cuánto pasaste de la caja al banco? $</label><input id="bdep34" type="number" inputmode="decimal" data-bind="bdep34.m" value="' + esc(x.m || '') + '"></div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn" style="flex:2" data-act="bdep34si">Anotar depósito</button><button class="btn sec" style="flex:1" data-act="bdep34no">Cancelar</button></div>'
    : '<button class="btn sec" style="margin-top:8px;width:100%" data-act="bdep34ab">Pasé dinero de la caja al banco</button>';
  return h + '</div>';
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="bdep34"]'); if (!b || S.role !== 'admin') return;
  e.preventDefault(); e.stopImmediatePropagation(); var a = b.dataset.act;
  if (a === 'bdep34ab') { S.bdep34 = { m: '' }; render(); return; }
  if (a === 'bdep34no') { S.bdep34 = null; render(); return; }
  var m = r2(num(S.bdep34 && S.bdep34.m)); if (!(m > 0)) { toast('Escribe cuánto pasaste al banco'); return; }
  if (m > cajaEsp() + 0.5) { toast('En la caja solo debería haber ' + money(cajaEsp())); return; }
  S.bancoMov = S.bancoMov || []; S.bancoMov.push({ f: iso(TODAY), h: hhmm(), m: m, t: 'Depósito desde la caja', n: quien() });
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Pasó ' + money(m) + ' de la caja al banco' }); } catch (er) {}
  S.bdep34 = null; toast(money(m) + ' pasaron de la caja al banco'); render();
}, true);
/* ---------- 4) apartado semanal para aguinaldo y vacaciones ---------- */
function apartado34() {
  var sem = 0, lleva = 0;
  try {
    var an = TODAY.getFullYear(), ene = an + '-01-01';
    (S.choferes || []).forEach(function (c) {
      if (!c || c.baja || c.arch || (typeof esAdm === 'function' && esAdm(c))) return;
      var sd = sdLey118(c); if (!(sd > 0)) return;
      var a = typeof anios118 === 'function' ? anios118(c) : 0, vd = typeof vacLey118 === 'function' ? vacLey118(Math.max(1, a + 1)) : 12;
      var anual = 15 * sd + vd * sd * 1.25, s = anual / 52; sem += s;
      var desde = ene; if (fechaOk118(c.ing) && c.ing > desde) desde = c.ing;
      var semanas = Math.max(0, (TODAY - new Date(desde + 'T12:00:00')) / (7 * 864e5));
      if (!aguiPag118(c, an)) lleva += s * semanas;
    });
  } catch (e) {}
  return { sem: Math.round(sem), lleva: Math.round(lleva) };
}
function apartado34HTML() {
  var a = apartado34(); if (!(a.sem > 0)) return '';
  return '<div class="card" data-x="apar34"><b>🐷 Apartado para aguinaldo y vacaciones</b>' + rw('Conviene apartar cada semana', money(a.sem)) + rw('A hoy deberías llevar apartado', money(a.lleva))
    + '<div class="lbl">Es una guía: el dinero no se mueve de la caja. Así en diciembre el aguinaldo no te pega de golpe.</div></div>';
}
var _rd34 = render;
render = function () {
  var r = _rd34.apply(this, arguments);
  try { caja34Fijo(); } catch (e) {}
  try {
    if (S.role === 'admin' && !S.encOn && S.tab.admin === 'inicio') {
      var m = document.querySelector('main');
      if (m && !m.querySelector('[data-x="bdep34"]')) {
        var ref = m.querySelector('details[data-k="banco"]') || m.querySelector('[data-x="hoy92"]');
        var d = document.createElement('div'); d.innerHTML = banco34HTML() + (TODAY.getDay() === 6 ? apartado34HTML() : '');
        if (ref) { var n = ref; Array.prototype.slice.call(d.children).forEach(function (ch) { n.after(ch); n = ch; }); } else Array.prototype.slice.call(d.children).forEach(function (ch) { m.appendChild(ch); });
      }
    }
    if (S.role === 'admin' && S.tab.admin === 'personal' && (S.per92 || '') === 'sue') {
      var m2 = document.querySelector('main'); if (m2 && !m2.querySelector('[data-x="apar34"]')) { var h2 = apartado34HTML(); if (h2) { var d2 = document.createElement('div'); d2.innerHTML = h2; m2.appendChild(d2.firstElementChild); } }
    }
  } catch (e) {}
  return r;
};
/* al terminar la configuración inicial: la semana empieza ese día (no se pide el cierre de un sábado anterior) */
var _rdF34 = render;
render = function () { try { if (S.setup && S.setup.fin && !S.setup.finF34) S.setup.finF34 = iso(TODAY); } catch (e) {} return _rdF34.apply(this, arguments); };
