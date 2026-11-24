/* ===================== TEMA · Préstamos a empleados (24 nov · punto 39 de la nueva numeración) =====================
   Ricardo: "nunca falta un empleado que dice: oiga, don Ricardo, ¿no tiene $1,000 o $2,000 que me adelante y me los descuenta en una
   quincena o dos, o se los pago en tantos días?". Decisiones (24 nov):
   - Lo anota solo el dueño/administrador, en Personal → Sueldos (tarjeta del empleado) → "💵 Prestarle dinero" (por pasos).
   - Cada vez se escoge cómo paga: DESCONTADO de su sueldo en N pagos, o él lo paga EN EFECTIVO para una fecha. Si trae efectivo, siempre
     puede abonar.
   - Cuida: avisa si pasa de 2 semanas de su sueldo; avisa si todavía debe otro préstamo; recibo por WhatsApp al prestar; si deja de
     trabajar, lo que debe se descuenta de su finiquito.
   Cómo cuadra el dinero (fuente/REGLAS-NUMEROS.md):
   - Prestar: el efectivo SALE de la caja, pero NO es gasto (es dinero que le deben al negocio). cajaEsp − lo prestado.
   - Abono en efectivo: ENTRA a la caja. cajaEsp + abonos en efectivo.
   - Descuento en el sueldo: "Total a pagarle" baja la cuota → el gasto de Sueldos en efectivo baja la cuota; se anota además un gasto de
     Sueldos por la cuota con caja:false (no mueve la caja). Así el gasto de Sueldos sigue siendo el sueldo completo y la caja baja solo
     lo que de verdad se le dio. Lo mismo con el finiquito.
   Datos: S.prest39 = [{id, ch, m, f, forma:'sueldo'|'efectivo', n, cuota, vence, mot, q, abonos:[{m, f, forma, q}]}] (compartido).
   No borra nada. Se arma al final (antes de tema-config38.js).
   ============================================================================================ */
try { if (NB_SH.indexOf('prest39') < 0) NB_SH.push('prest39'); } catch (e) {}
function pr39L() { return S.prest39 || (S.prest39 = []); }
function pr39Saldo(p) { return Math.max(0, r2(num(p.m) - sum(p.abonos || [], function (a) { return num(a.m); }))); }
function pr39De(c) { return pr39L().filter(function (p) { return p && +p.ch === +c.id && pr39Saldo(p) > 0.005; }); }
function pr39Debe(c) { return r2(sum(pr39De(c), function (p) { return pr39Saldo(p); })); }
function pr39Semana(c) { var z = c.sz || {}; return z.tipo === 'semana' ? num(z.monto) : (z.tipo === 'dia' ? num(z.porDia) * 6 : (z.tipo === 'base' ? num(z.base) : 0)); }
/* la caja */
var _cE39 = cajaEsp;
cajaEsp = function () {
  var v = _cE39.apply(this, arguments);
  try { pr39L().forEach(function (p) { if (!p) return; v -= num(p.m); (p.abonos || []).forEach(function (a) { if (a && a.forma === 'efectivo') v += num(a.m); }); }); } catch (e) {}
  return v;
};
/* el sueldo: la cuota de esta semana */
function pr39Cuota(c, k) {
  if (!k || k.vacio || c.baja118) return { m: 0 };
  var L = pr39De(c).filter(function (p) { return p.forma === 'sueldo'; }); if (!L.length) return { m: 0 };
  var p = L[0], s = pr39Saldo(p), q = Math.min(s, num(p.cuota) || s, Math.max(0, num(k.pagar)));
  var hechos = (p.abonos || []).filter(function (a) { return a.forma === 'sueldo'; }).length;
  return { m: r2(q), p: p, i: hechos + 1, n: num(p.n) || 1 };
}
var _sc39 = szCalc;
szCalc = function (c) {
  var k = _sc39.apply(this, arguments);
  try { var q = pr39Cuota(c, k); k.pr39 = q.m; k.pr39i = q.i; k.pr39n = q.n; k.pr39id = q.p && q.p.id; if (q.m > 0) k.pagar = Math.max(0, r2(k.pagar - q.m)); } catch (e) {}
  return k;
};
var _sd39 = szDesg;
szDesg = function (c) {
  var h = _sd39.apply(this, arguments);
  try {
    var k = szCalc(c); if (!(k.pr39 > 0)) return h;
    var row = rw('Préstamo (pago ' + k.pr39i + ' de ' + k.pr39n + ')', '− ' + money(k.pr39), 'neg');
    var t = '<div class="row" style="min-height:60px;border-top:2px solid var(--fg)">'; var i = h.indexOf(t);
    if (i > -1) h = h.slice(0, i) + row + h.slice(i);
  } catch (e) {}
  return h;
};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="pagarsz"]'); if (!b || S.role !== 'admin') return;
  var c = chById118(b.dataset.id); if (!c) return; var k = szCalc(c); if (k.vacio || !(k.pr39 > 0)) return;
  var n0 = (S.pagosSueldo || []).length, q = k.pr39, id = k.pr39id;
  setTimeout(function () {
    try {
      if ((S.pagosSueldo || []).length <= n0) return;
      var p = pr39L().filter(function (x) { return x.id === id; })[0]; if (!p) return;
      p.abonos = p.abonos || []; p.abonos.push({ m: q, f: iso(TODAY), forma: 'sueldo', q: quien() });
      S.gastos.push({ t: 'Sueldos', m: q, n: 'Préstamo de ' + c.n + ' (descontado del sueldo)', caja: false, f: iso(TODAY), h: hhmm(), q: quien() });
      S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Se le descontaron ' + money(q) + ' del préstamo a ' + c.n + (pr39Saldo(p) > 0 ? ' · debe ' + money(pr39Saldo(p)) : ' · ya lo terminó de pagar') });
      render();
    } catch (er) { console.error('pr39', er); }
  }, 20);
}, true);
/* si deja de trabajar: se descuenta del finiquito */
var _fq39 = finiq118;
finiq118 = function (c) {
  var F = _fq39.apply(this, arguments);
  try { if (F && !c.finiq118) { var d = Math.min(pr39Debe(c), Math.max(0, num(F.tot))); F.pr39 = r2(d); F.tot = r2(F.tot - d); } } catch (e) {}
  return F;
};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="finiq118"]'); if (!b) return;
  var c = chById118(b.dataset.id); if (!c || c.finiq118) return; var F = finiq118(c); if (!F || !(F.pr39 > 0)) return;
  setTimeout(function () {
    try {
      if (!c.finiq118) return; var resta = F.pr39;
      pr39De(c).forEach(function (p) { if (resta <= 0) return; var m = Math.min(resta, pr39Saldo(p)); p.abonos = p.abonos || []; p.abonos.push({ m: r2(m), f: iso(TODAY), forma: 'finiquito', q: quien() }); resta = r2(resta - m); });
      S.gastos.push({ t: 'Sueldos', m: F.pr39, n: 'Préstamo de ' + c.n + ' (descontado del finiquito)', caja: false, f: iso(TODAY), h: hhmm(), q: quien() });
      S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Del finiquito de ' + c.n + ' se descontaron ' + money(F.pr39) + ' de su préstamo' + (pr39Debe(c) > 0 ? ' · todavía debe ' + money(pr39Debe(c)) : '') });
      render();
    } catch (er) {}
  }, 20);
}, true);
/* prestar: por pasos */
WZ.prest39 = { tit: '💵 Prestarle dinero', fin: 'Prestar', pasos: [
  { q: function (d) { return '¿Cuánto le prestas a ' + (chById118(d.ch) || {}).n + '?'; }, a: 'El dinero sale de la caja, pero no es un gasto: es dinero que te debe.', c: [{ k: 'm', l: 'Le presto $', t: 'number' }],
    ok: function (d) { return num(d.m) > 0 ? '' : 'Escribe cuánto le prestas'; } },
  { q: '¿Cómo te lo va a pagar?', c: [{ k: 'forma', t: 'opc', o: [['sueldo', 'Se lo descuento de su sueldo'], ['efectivo', 'Me lo paga en efectivo']], falta: 'Escoge una opción' }], auto: true },
  { q: '¿En cuántos pagos se lo descuentas?', si: function (d) { return d.forma === 'sueldo'; }, a: 'Se le descuenta cada vez que le pagas su semana.',
    c: [{ k: 'n', t: 'opc', o: function () { return [1, 2, 3, 4, 6, 8].map(function (n) { return [String(n), n === 1 ? 'En 1 pago' : n + ' pagos']; }); }, falta: 'Escoge en cuántos pagos' }], auto: true },
  { q: '¿Para cuándo te lo paga?', si: function (d) { return d.forma === 'efectivo'; }, a: 'Si se pasa de la fecha, te sale en "Hoy" para que se lo recuerdes.', c: [{ k: 'vence', l: 'Me lo paga a más tardar el', t: 'date' }],
    ok: function (d) { return /^\d{4}-\d\d-\d\d$/.test(String(d.vence || '')) && d.vence >= iso(TODAY) ? '' : 'Escoge una fecha de hoy en adelante'; } },
  { q: '¿Para qué es?', a: 'Opcional. Queda anotado en el recibo y en el historial.', c: [{ k: 'mot', l: 'Para qué', t: 'text', opc: true }], saltar: true },
  { q: 'Revisa antes de prestar', html: function (d) {
    var c = chById118(d.ch) || {}, m = num(d.m), sem = pr39Semana(c), debe = pr39Debe(c), n = num(d.n) || 1;
    var av = '';
    if (debe > 0) av += '<div class="card alert" style="padding:10px 12px"><b>⚠️ ' + esc(c.n) + ' todavía debe ' + money(debe) + ' de otro préstamo.</b><div class="lbl">Puedes prestarle, pero se va a juntar lo que debe.</div></div>';
    if (sem > 0 && m > sem * 2) av += '<div class="card alert" style="padding:10px 12px;margin-top:6px"><b>⚠️ Es más de lo que gana en 2 semanas (' + money(sem * 2) + ').</b><div class="lbl">Si se va antes de pagarlo, se descuenta de su finiquito, pero puede no alcanzar.</div></div>';
    return av + '<div class="card" style="margin-top:6px">' + rw('Le prestas', money(m)) + rw('Cómo paga', d.forma === 'sueldo' ? 'Descontado de su sueldo, ' + (n === 1 ? 'en 1 pago' : 'en ' + n + ' pagos de ' + money(r2(m / n))) : 'En efectivo, a más tardar el ' + fmtF(d.vence)) + (d.mot ? rw('Para', esc(d.mot)) : '') + '</div>'
      + '<div class="lbl" style="margin-top:6px">Al prestar sale el recibo para mandárselo por WhatsApp. Si deja de trabajar, lo que deba se descuenta de su finiquito.</div>';
  } }],
  guardar: function (d) {
    var c = chById118(d.ch); if (!c) return 'No encontré al empleado';
    var m = r2(num(d.m)); if (!(m > 0)) return 'Escribe cuánto le prestas';
    var n = d.forma === 'sueldo' ? (num(d.n) || 1) : 0;
    var p = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), ch: c.id, m: m, f: iso(TODAY), forma: d.forma === 'sueldo' ? 'sueldo' : 'efectivo', n: n, cuota: n ? r2(m / n) : 0, vence: d.forma === 'efectivo' ? d.vence : '', mot: String(d.mot || '').trim(), q: quien(), abonos: [] };
    pr39L().push(p);
    S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Le prestó ' + money(m) + ' a ' + c.n + (p.forma === 'sueldo' ? ' (se descuenta en ' + n + ' pago' + (n === 1 ? '' : 's') + ')' : ' (lo paga en efectivo a más tardar el ' + fmtF(p.vence) + ')') + (p.mot ? ' · ' + p.mot : '') });
    try { S.rec36 = { ch: c.id, img: pr39Img(c, p), tit: 'Préstamo', total: m }; } catch (e) {}
    toast('Préstamo de ' + money(m) + ' a ' + c.n);
  }
};
function pr39Img(c, p) {
  var L = [['Fecha', fmtF(p.f)], ['Le presté', money(p.m)], ['Cómo lo paga', p.forma === 'sueldo' ? 'Descontado del sueldo' : 'En efectivo'], p.forma === 'sueldo' ? ['Pagos', p.n + ' de ' + money(p.cuota)] : ['A más tardar el', fmtF(p.vence)]];
  if (p.mot) L.push(['Para', p.mot]);
  var W = 460, H = 200 + L.length * 30, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.fillStyle = '#1E2A1A'; x.font = 'bold 22px sans-serif'; x.fillText(String((S.cfg || {}).nombre || 'Plátanos Nietos'), 20, 36);
  x.font = '15px sans-serif'; x.fillStyle = '#555'; x.fillText('Recibo de préstamo · ' + fmtF(iso(TODAY)) + ' ' + hhmm(), 20, 58);
  x.fillStyle = '#111'; x.font = 'bold 18px sans-serif'; x.fillText(String(c.n || ''), 20, 88);
  var y = 120; L.forEach(function (l) { x.fillStyle = '#333'; x.font = '15px sans-serif'; x.fillText(String(l[0]), 20, y); x.textAlign = 'right'; x.fillText(String(l[1]).slice(0, 34), W - 20, y); x.textAlign = 'left'; y += 28; });
  x.strokeStyle = '#ccc'; x.beginPath(); x.moveTo(20, y - 12); x.lineTo(W - 20, y - 12); x.stroke();
  x.font = 'bold 20px sans-serif'; x.fillStyle = '#111'; x.fillText('Me debe', 20, y + 14); x.textAlign = 'right'; x.fillText(money(pr39Debe(c)), W - 20, y + 14); x.textAlign = 'left';
  x.font = '13px sans-serif'; x.fillStyle = '#555'; x.fillText('Si deja de trabajar, lo que deba se descuenta de su finiquito.', 20, y + 44);
  return cv.toDataURL('image/png');
}
/* la tarjeta del préstamo en Sueldos */
function pr39Card(c) {
  var L = pr39De(c), ab = S.pr39ab && +S.pr39ab.ch === +c.id ? S.pr39ab : null;
  var h = '<div class="card" data-x="pr39" style="padding:12px 14px;margin-top:8px"><b>💵 Préstamos</b>';
  if (!L.length) h += '<div class="lbl" style="margin-top:2px">No debe nada.</div>';
  L.forEach(function (p) {
    var s = pr39Saldo(p), venc = p.forma === 'efectivo' && p.vence && p.vence < iso(TODAY);
    h += '<div style="margin-top:6px">' + rw('Le prestaste el ' + fCorta118(p.f) + (p.mot ? ' · ' + esc(p.mot) : ''), money(p.m)) + rw('Debe', '<b>' + money(s) + '</b>')
      + '<div class="lbl' + (venc ? ' neg' : '') + '">' + (p.forma === 'sueldo' ? 'Se descuenta de su sueldo: ' + (p.abonos || []).filter(function (a) { return a.forma === 'sueldo'; }).length + ' de ' + p.n + ' pagos de ' + money(p.cuota) : (venc ? '⚠️ Ya se pasó: tenía que pagarlo el ' : 'Lo paga en efectivo a más tardar el ') + fmtF(p.vence)) + '</div></div>';
  });
  if (L.length) {
    h += ab ? '<div class="field"><label for="pr39m">¿Cuánto abonó en efectivo? $</label><input id="pr39m" type="number" inputmode="decimal" data-bind="pr39ab.m" value="' + esc(ab.m || '') + '"></div><div style="display:flex;gap:8px"><button class="btn sm" style="flex:2" data-act="pr39abok" data-id="' + c.id + '">Guardar abono</button><button class="btn sm sec" style="flex:1" data-act="pr39abx">Cancelar</button></div>'
      : '<button class="btn sm sec" style="margin-top:6px" data-act="pr39ab" data-id="' + c.id + '">Abonó en efectivo</button>';
    if (c.baja118 && !c.finiq118) h += '<div class="lbl" style="margin-top:4px">Al pagar su finiquito se le descuenta lo que debe.</div>';
  }
  h += '<button class="btn sec" style="margin-top:8px;width:100%;min-height:52px" data-act="pr39new" data-id="' + c.id + '">💵 Prestarle dinero</button></div>';
  return h;
}
var _su39 = sueldos;
sueldos = function () {
  var h = _su39.apply(this, arguments);
  try {
    h = h.replace(/(<button class="btn" style="margin-top:10px;min-height:56px" data-act="pagarsz" data-id="(\d+)">[^<]*<\/button>)/g, function (m, all, id) { var c = chById118(id); return c ? all + pr39Card(c) : all; });
  } catch (e) { console.error('pr39', e); }
  return h;
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="pr39"]'); if (!b || S.role !== 'admin') return;
  e.preventDefault(); e.stopImmediatePropagation(); var a = b.dataset.act, c = chById118(b.dataset.id);
  if (a === 'pr39new' && c) { wzAbre('prest39', { ch: c.id }); return; }
  if (a === 'pr39ab' && c) { S.pr39ab = { ch: c.id, m: '' }; render(); return; }
  if (a === 'pr39abx') { S.pr39ab = null; render(); return; }
  if (a === 'pr39abok' && c) {
    var m = r2(num(S.pr39ab && S.pr39ab.m)), debe = pr39Debe(c); if (!(m > 0)) { toast('Escribe cuánto abonó'); return; }
    if (m > debe + 0.005) { toast('Solo debe ' + money(debe)); return; }
    var resta = m; pr39De(c).forEach(function (p) { if (resta <= 0) return; var x = Math.min(resta, pr39Saldo(p)); p.abonos = p.abonos || []; p.abonos.push({ m: r2(x), f: iso(TODAY), forma: 'efectivo', q: quien() }); resta = r2(resta - x); });
    S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: c.n + ' abonó ' + money(m) + ' en efectivo a su préstamo' + (pr39Debe(c) > 0 ? ' · debe ' + money(pr39Debe(c)) : ' · ya lo terminó de pagar') });
    S.pr39ab = null; toast('Abono de ' + money(m) + ' guardado: entra a la caja'); render(); return;
  }
}, true);
/* recordatorio en "Hoy" si se pasó la fecha */
var _hT39 = hoyTareas;
hoyTareas = function () {
  var L = _hT39.apply(this, arguments);
  try {
    if (S.role !== 'admin' || S.encOn) return L;
    pr39L().forEach(function (p) { if (!p || p.forma !== 'efectivo' || !p.vence || p.vence >= iso(TODAY) || pr39Saldo(p) <= 0) return; var c = chById118(p.ch); if (!c) return;
      L.push({ k: 'pr39' + p.id, t: '💵 ' + c.n + ' ya se pasó de la fecha para pagar su préstamo: debe ' + money(pr39Saldo(p)) + ' (era el ' + fmtF(p.vence) + ')', go: 'personal', ok: false }); });
  } catch (e) {}
  return L;
};
