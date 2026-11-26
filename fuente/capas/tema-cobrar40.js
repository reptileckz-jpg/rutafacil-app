/* ===================== TEMA · "Voy a cobrarle" (24 nov · punto 40 de la nueva numeración) =====================
   Ricardo: "terminas la ruta o sale a comer en su carro particular y dice: le voy a cobrar a tal cliente". Decisiones (24 nov):
   - En la ficha del cliente (si debe): "🚗 Voy a cobrarle" → ¿Quién va? Yo / un chofer.
   - Yo (el dueño): queda en Inicio "💵 Vas a cobrarle a …" con "Ya cobré" (por pasos: cuánto · ¿cómo fuiste?) y "Quitar".
     Gasolina, se pregunta cada vez: "Fui solo a cobrar en mi carro" → el negocio paga la gasolina (gasto "Mi carro (para el negocio)");
     "Aproveché otra salida" o "En una camioneta del negocio" → nada.
     El abono entra a la caja igual que "Registrar abono" (S.cobros + baja lo que debe).
   - Un chofer: le llega como parada nueva de "solo cobro" (0 cajas, 0 kilos) con aviso. Lo que cobre va en su ruta y lo entrega en su
     SIGUIENTE CIERRE (es una entrega normal con abono, así que todo cuadra con lo que ya existe).
     El chofer también puede ponerse "Voy a cobrarle" él mismo desde la ficha, si ya empezó su ruta.
   Datos: S.vcob40 = [{id, c, quien:'yo'|chId, f, est:'pend'|'hecho'|'quitado', m, q}] (compartido). No borra nada.
   ============================================================================================ */
try { if (NB_SH.indexOf('vcob40') < 0) NB_SH.push('vcob40'); } catch (e) {}
function vc40L() { return S.vcob40 || (S.vcob40 = []); }
function vc40Pend(c) { return vc40L().filter(function (x) { return x && x.est === 'pend' && (c == null || +x.c === +c); }); }
function vc40Hist(t) { try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: t }); } catch (e) {} }
/* un chofer: parada de solo cobro */
function vc40AChofer(c, id) {
  var st = p57Stops(id);
  var AP = Array.prototype;
  if (st) { if (!AP.some.call(st, function (s) { return +s.c === +c.id && !s.done; })) AP.push.call(st, { c: c.id, cob40: 1 }); else AP.forEach.call(st, function (s) { if (+s.c === +c.id && !s.done) s.cob40 = 1; }); }
  else { S.arPas = S.arPas || {}; S.arPas[id] = (S.arPas[id] || []).concat([c.id]); }
  try { rutaAviso(id, '💵 Pasa a cobrarle a ' + c.n + ': debe ' + money(num(c.cred)) + ' (solo cobrar, no le dejas fruta)'); } catch (e) {}
}
var _rD40 = resetDraft;
resetDraft = function (c) {
  var r = _rD40.apply(this, arguments);
  try {
    var s = S.role === 'rep' && S.stops && S.stops[S.cur];
    if (c && s && +s.c === +c.id && (s.cob40 || vc40Pend(c.id).some(function (x) { return String(x.quien) === String(S.chofHoy); }))) { S.d.R = 0; S.d.M = 0; S.d.V = 0; S.d.cob40 = 1; }
  } catch (e) {}
  return r;
};
/* el chofer guarda su visita: el cobro queda hecho (lo entrega en su cierre) */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="guardar"]'); if (!b || S.role !== 'rep') return;
  var c = null; try { c = curCli(); } catch (er) {} if (!c || !vc40Pend(c.id).length) return; var n0 = S.log.length;
  setTimeout(function () {
    try {
      if (S.log.length <= n0) return; var l = S.log[S.log.length - 1];
      var m = r2(num(l.abono) + (num(l.total) ? 0 : num(l.pago)));
      vc40Pend(c.id).forEach(function (x) { if (String(x.quien) === String(S.chofHoy) || x.quien === 'yo') { x.est = 'hecho'; x.m = m; x.fh = iso(TODAY); x.por = quien(); } });
      vc40Hist(chofN(S.chofHoy) + ' le cobró ' + money(m) + ' a ' + c.n + ' (lo entrega en su cierre)');
    } catch (er) {}
  }, 40);
}, true);
/* el botón en la ficha del cliente */
var _fc40 = fiCli;
fiCli = function (f) {
  var h = _fc40.apply(this, arguments);
  try {
    var c = cl(f.id); if (!c || !(num(c.cred) > 0)) return h;
    var p = vc40Pend(c.id)[0], bt;
    if (S.role === 'admin') bt = p ? '<div class="lbl" data-x="vc40" style="margin-top:6px;font-weight:800">💵 ' + (p.quien === 'yo' ? 'Vas a cobrarle tú' : 'Va a cobrarle ' + esc(chofN(+p.quien))) + ' <button class="link" data-act="vc40quita" data-i="' + esc(p.id) + '">Quitar</button></div>'
      : '<button class="btn sec" data-x="vc40" style="margin-top:8px;width:100%;min-height:50px" data-act="vc40" data-id="' + c.id + '">🚗 Voy a cobrarle</button>';
    else if (S.role === 'rep') bt = p ? '<div class="lbl" data-x="vc40" style="margin-top:6px;font-weight:800">💵 Ya está en tu ruta para cobrarle</div>'
      : '<button class="btn sec" data-x="vc40" style="margin-top:8px;width:100%;min-height:50px" data-act="vc40yo" data-id="' + c.id + '">🚗 Voy a cobrarle</button>';
    if (!bt) return h;
    var m = /(data-act="cobrar" data-id="\d+"[^>]*>[^<]*<\/button>)/.exec(h);
    if (m) return h.replace(m[1], m[1] + bt);
    var i = h.indexOf('</div></div>'); return i > -1 ? h.slice(0, i) + bt + h.slice(i) : h + bt;
  } catch (e) { return h; }
};
/* ¿quién va a cobrar? */
function vc40HTML() {
  var x = S.vc40; if (!x || S.role !== 'admin') return ''; var c = cl(x.c); if (!c) { S.vc40 = null; return ''; }
  var chs = []; try { chs = chofsDia57(); } catch (e) {}
  return ovW70('vc40ov', '🚗 Cobrarle a ' + esc(c.n), '<div class="lbl" style="font-size:16px">Debe <b>' + money(num(c.cred)) + '</b>. ¿Quién va a cobrarle?</div><div role="group" aria-label="Quién va a cobrarle" style="margin-top:8px">'
    + '<button class="btn" style="width:100%;min-height:56px;margin-top:8px;font-size:18px" data-act="vc40q" data-v="yo">Yo</button>' + chs.map(function (ch) { return '<button class="btn sec" style="width:100%;min-height:56px;margin-top:8px;font-size:17px;display:block;line-height:1.2" data-act="vc40q" data-v="' + ch.id + '">' + esc(ch.n) + '<span style="display:block;font-size:13px;font-weight:600;opacity:.75">lo entrega en su cierre</span></button>'; }).join('') + '</div>', 'vc40x');
}
/* Inicio: los cobros que vas a hacer tú */
function vc40Card() {
  var L = vc40Pend().filter(function (x) { return x.quien === 'yo'; }); if (!L.length) return '';
  return '<div class="card" data-x="vc40ini" style="padding:12px 14px"><b>💵 Vas a cobrar</b>' + L.map(function (x) {
    var c = cl(x.c) || { n: '¿?', cred: 0 };
    return '<div style="border-top:1px solid var(--line);padding:8px 0;margin-top:6px"><div style="display:flex;justify-content:space-between;gap:8px"><b>' + esc(c.n) + '</b><span>debe ' + money(num(c.cred)) + '</span></div>'
      + '<div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm" style="flex:2;min-height:46px" data-act="vc40ya" data-i="' + esc(x.id) + '">Ya cobré</button><button class="btn sm sec" style="flex:1;min-height:46px" data-act="vc40quita" data-i="' + esc(x.id) + '">Quitar</button></div></div>';
  }).join('') + '</div>';
}
WZ.cob40 = { tit: '💵 Ya cobré', fin: 'Guardar el cobro', pasos: [
  { q: function (d) { return '¿Cuánto te pagó ' + ((cl(d.c) || {}).n || '') + '?'; }, a: function (d) { return 'Debe ' + money(num((cl(d.c) || {}).cred)) + '.'; }, c: [{ k: 'm', l: 'Me pagó $', t: 'number' }],
    ok: function (d) { var c = cl(d.c) || {}, m = num(d.m); return !(m > 0) ? 'Escribe cuánto te pagó' : (m > num(c.cred) + 0.005 ? 'Solo debe ' + money(num(c.cred)) : ''); } },
  { q: '¿Cómo fuiste a cobrarle?', a: 'Si fuiste solo a eso en tu carro, el negocio te paga la gasolina.', c: [{ k: 'como', t: 'opc', o: [['solo', 'Fui solo a cobrar, en mi carro'], ['otra', 'Aproveché otra salida'], ['neg', 'En una camioneta del negocio']], falta: 'Escoge una opción' }], auto: true },
  { q: '¿Cuánto de gasolina gastaste?', si: function (d) { return d.como === 'solo'; }, a: 'Lo paga el negocio: sale de la caja como "Mi carro (para el negocio)".', c: [{ k: 'gas', l: 'Gasolina $', t: 'number', opc: true }] },
  { q: 'Revisa antes de guardar', html: function (d) { var c = cl(d.c) || {}, m = num(d.m), g = d.como === 'solo' ? num(d.gas) : 0;
    return '<div class="card">' + rw('Te pagó ' + esc(c.n || ''), money(m)) + rw('Le queda', money(Math.max(0, num(c.cred) - m))) + rw('Gasolina que paga el negocio', g > 0 ? money(g) : 'nada') + '</div><div class="lbl" style="margin-top:6px">El cobro entra a la caja.</div>'; } }],
  guardar: function (d) {
    var c = cl(d.c); if (!c) return 'No encontré al cliente'; var m = r2(num(d.m)); if (!(m > 0)) return 'Escribe cuánto te pagó'; if (m > num(c.cred) + 0.005) return 'Solo debe ' + money(num(c.cred));
    c.cred = r2(num(c.cred) - m); S.cobros.push({ c: c.id, m: m, f: iso(TODAY), q: quien(), vc40: 1 });
    var g = d.como === 'solo' ? r2(num(d.gas)) : 0;
    if (g > 0) S.gastos.push({ t: 'Mi carro (para el negocio)', m: g, n: 'Gasolina para cobrarle a ' + c.n, f: iso(TODAY), h: hhmm(), q: quien() });
    vc40Pend(c.id).forEach(function (x) { if (x.quien === 'yo') { x.est = 'hecho'; x.m = m; x.fh = iso(TODAY); x.por = quien(); x.gas = g; } });
    vc40Hist('Le cobró ' + money(m) + ' a ' + c.n + (g > 0 ? ' · gasolina ' + money(g) + ' (fue solo a cobrar en su carro)' : ''));
    toast(c.cred <= 0 ? c.n + ' quedó al corriente' : 'Cobro guardado. Le quedan ' + money(c.cred));
  }
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="vc40"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); var a = b.dataset.act;
  if (a === 'vc40' && S.role === 'admin') { S.vc40 = { c: +b.dataset.id }; render(); return; }
  if (a === 'vc40x') { S.vc40 = null; render(); return; }
  if (a === 'vc40q' && S.vc40) {
    var c = cl(S.vc40.c), v = b.dataset.v; if (!c) return;
    var x = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), c: c.id, quien: v === 'yo' ? 'yo' : +v, f: iso(TODAY), est: 'pend', q: quien() };
    vc40L().push(x); if (v !== 'yo') vc40AChofer(c, +v);
    vc40Hist(v === 'yo' ? 'Va a cobrarle a ' + c.n : 'Le pidió a ' + chofN(+v) + ' que le cobre a ' + c.n);
    toast(v === 'yo' ? 'Listo: te queda en Inicio' : 'Listo: ' + chofN(+v) + ' lo tiene en su ruta'); S.vc40 = null; render(); return;
  }
  if (a === 'vc40yo' && S.role === 'rep') {
    var c2 = cl(+b.dataset.id); if (!c2) return;
    if (!S.salida || !S.salida.ok || (S.cierre && S.cierre.sent)) { toast('Primero empieza tu ruta; luego lo agregas para cobrarle'); return; }
    vc40L().push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), c: c2.id, quien: +S.chofHoy, f: iso(TODAY), est: 'pend', q: quien() });
    if (!Array.prototype.some.call(S.stops, function (s) { return +s.c === +c2.id && !s.done; })) Array.prototype.push.call(S.stops, { c: c2.id, cob40: 1 });
    vc40Hist(chofN(S.chofHoy) + ' va a cobrarle a ' + c2.n); toast('Listo: está en tu ruta para cobrarle'); render(); return;
  }
  if (a === 'vc40ya') { var x2 = vc40L().filter(function (y) { return y.id === b.dataset.i; })[0]; if (x2) wzAbre('cob40', { c: x2.c }); return; }
  if (a === 'vc40quita') { var x3 = vc40L().filter(function (y) { return y.id === b.dataset.i; })[0]; if (x3) { x3.est = 'quitado'; vc40Hist('Quitó el pendiente de cobrarle a ' + ((cl(x3.c) || {}).n || '')); } render(); return; }
}, true);
var _rd40 = render;
render = function () {
  var r = _rd40.apply(this, arguments);
  try {
    ovPon70('vc40ov', vc40HTML());
    if (S.role === 'admin' && !S.encOn && S.tab.admin === 'inicio') {
      var m = document.querySelector('main'), h = vc40Card(), ya = m && m.querySelector('[data-x="vc40ini"]');
      if (m && h && !ya) { var d = document.createElement('div'); d.innerHTML = h; var ref = m.querySelector('[data-x="hoy92"]'); if (ref) ref.before(d.firstElementChild); else m.prepend(d.firstElementChild); }
    }
  } catch (e) { console.error('vc40', e); }
  return r;
};
