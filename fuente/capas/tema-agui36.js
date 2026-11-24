/* ===================== TEMA · Aguinaldo en partes y recibo de pago por WhatsApp (24 nov · punto 36 de la nueva numeración) =====================
   Plan del 30 nov (fuente/PLAN-ARRANQUE-30NOV.md). Ricardo: "ese módulo tiene que estar pulido: ya se le pagó, se le paga menos porque
   faltó, sobre qué se calcula… y un desglose que los choferes puedan tener de cuánto se les paga (tipo recibo de nómina)".
   Aguinaldo (por la Ley Federal del Trabajo, ya calculado desde el punto 118 de antes: 15 días de sueldo base, proporcional a lo
   trabajado en el año, las faltas lo bajan):
   - El desglose a la vista: salario diario × 15 días × días trabajados en el año (menos faltas) = lo que le toca.
   - Pagos parciales: "Pagar la mitad" (antes del 20 de noviembre) y "Pagar otra cantidad"; dice cuánto falta. Al completarse queda pagado.
   - "Ajustar el monto": pagar más o menos que lo calculado, con un motivo (queda en el historial).
   - Recordatorios en "Hoy": del 10 al 20 de noviembre si no lleva la mitad y del 10 al 20 de diciembre si falta algo (la ley pide
     tenerlo completo antes del 20 de diciembre).
   Recibo de pago: al pagar la semana o el aguinaldo sale "🧾 Recibo de pago" (imagen con el desglose) y "📲 Mandar por WhatsApp" a ese
   empleado. Es un comprobante sencillo, no un recibo fiscal (CFDI).
   Las cuentas de dinero son las mismas de siempre (cada pago es un gasto de "Sueldos"). Se arma al final.
   ============================================================================================ */
function ag36Obj(c, an) { var g = agui118(c, an), aj = (c.aguiAj36 || {})[an], P = (c.aguiP36 || {})[an] || []; var obj = aj ? num(aj.m) : num(g.m); var pag = r2(sum(P, function (p) { return num(p.m); })); if (aguiPag118(c, an) && !P.length) pag = obj; return { g: g, aj: aj, obj: r2(obj), P: P, pag: pag, falta: r2(Math.max(0, obj - pag)) }; }
function ag36HTML(c) {
  var an = TODAY.getFullYear(), x = ag36Obj(c, an), id = c.id, sd = sdLey118(c);
  var h = '<div data-x="ag36" style="border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin-top:8px"><b>Aguinaldo ' + an + '</b>'
    + '<div class="lbl" style="margin-top:4px">Cómo se calcula: ' + money(sd) + ' por día (sueldo base) × 15 días' + (x.g.prop < 1 ? ' × ' + x.g.d + ' días trabajados en el año' + (x.g.fal ? ' (ya sin ' + x.g.fal + ' falta' + (x.g.fal === 1 ? '' : 's') + ')' : '') + ' de ' + (Math.round((new Date(an + '-12-31') - new Date(an + '-01-01')) / 864e5) + 1) : '') + ' = <b>' + money(x.g.m) + '</b></div>'
    + (x.aj ? '<div class="lbl">Ajustado a <b>' + money(x.obj) + '</b>: ' + esc(x.aj.mot || '') + '</div>' : '')
    + rw('Le toca', money(x.obj)) + rw('Pagado', money(x.pag)) + rw('Falta', money(x.falta), x.falta > 0 ? 'neg' : '')
    + (x.P.length ? '<div class="lbl">' + x.P.map(function (p) { return fCorta118(p.f) + ': ' + money(num(p.m)); }).join(' · ') + '</div>' : '')
    + '<div class="lbl" style="margin-top:4px">La mitad antes del 20 de noviembre y el resto antes del 20 de diciembre.</div>';
  var S36 = S.ag36 && +S.ag36.id === +id ? S.ag36 : null;
  if (S36 && S36.modo === 'otra') h += '<div class="field"><label for="ag36m">¿Cuánto le pagas? $</label><input id="ag36m" type="number" inputmode="decimal" data-bind="ag36.m" value="' + esc(S36.m || '') + '"></div><div style="display:flex;gap:8px"><button class="btn" style="flex:2" data-act="ag36pag" data-id="' + id + '">Pagar</button><button class="btn sec" style="flex:1" data-act="ag36x">Cancelar</button></div>';
  else if (S36 && S36.modo === 'aj') h += '<div class="field"><label for="ag36a">Nuevo monto de su aguinaldo $</label><input id="ag36a" type="number" inputmode="decimal" data-bind="ag36.m" value="' + esc(S36.m || '') + '"></div><div class="field"><label for="ag36mot">¿Por qué?</label><input id="ag36mot" type="text" data-bind="ag36.mot" value="' + esc(S36.mot || '') + '" style="width:100%;text-align:left" placeholder="Ej. bono por buen año"></div><div style="display:flex;gap:8px"><button class="btn" style="flex:2" data-act="ag36ajok" data-id="' + id + '">Guardar ajuste</button><button class="btn sec" style="flex:1" data-act="ag36x">Cancelar</button></div>';
  else if (x.falta > 0) {
    var mitad = r2(Math.min(x.falta, x.obj / 2));
    h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">' + (x.pag < x.obj / 2 - 0.5 ? '<button class="btn sm" data-act="ag36mitad" data-id="' + id + '">Pagar la mitad (' + money(mitad) + ')</button>' : '<button class="btn sm" data-act="ag36resto" data-id="' + id + '">Pagar lo que falta (' + money(x.falta) + ')</button>')
      + '<button class="btn sm sec" data-act="ag36otra" data-id="' + id + '">Otra cantidad</button><button class="btn sm sec" data-act="ag36aj" data-id="' + id + '">Ajustar el monto</button></div>';
  } else h += '<div class="lbl" style="margin-top:6px;color:var(--accent);font-weight:800">✓ Aguinaldo ' + an + ' pagado completo</div>';
  return h + '</div>';
}
function ag36Paga(c, m, como) {
  var an = TODAY.getFullYear(), x = ag36Obj(c, an); m = r2(num(m));
  if (!(m > 0)) { toast('Escribe cuánto le pagas'); return false; }
  if (m > x.falta + 0.5) { toast('Solo le falta ' + money(x.falta)); return false; }
  if (!confirm('¿Pagarle a ' + c.n + ' ' + money(m) + ' de su aguinaldo ' + an + '?')) return false;
  var lineas = [['Aguinaldo ' + an + ' (le toca)', money(x.obj)], ['Pagado antes', money(x.pag)], ['Este pago', money(m)], ['Falta', money(Math.max(0, x.falta - m))]];
  c.aguiP36 = c.aguiP36 || {}; c.aguiP36[an] = (c.aguiP36[an] || []).concat([{ f: iso(TODAY), m: m, q: quien(), como: como || '' }]);
  S.gastos.push({ t: 'Sueldos', m: m, n: 'Aguinaldo ' + an + ' de ' + c.n + (m < x.falta - 0.5 ? ' (parte)' : '') });
  S.pagosSueldo.push({ ch: c.id, f: iso(TODAY), m: m, n: 'Aguinaldo ' + an + (m < x.falta - 0.5 ? ' (parte)' : '') });
  if (x.falta - m <= 0.5) { c.agui118 = c.agui118 || {}; c.agui118[an] = iso(TODAY); }
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Pagó ' + money(m) + ' del aguinaldo ' + an + ' a ' + c.n + (x.falta - m > 0.5 ? ' (falta ' + money(x.falta - m) + ')' : ' (completo)') }); } catch (e) {}
  rec36Abre(c, 'Aguinaldo ' + an, lineas, m);
  return true;
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="ag36"]'); if (!b || S.role !== 'admin') return;
  e.preventDefault(); e.stopImmediatePropagation(); var a = b.dataset.act, c = chById118(b.dataset.id);
  if (a === 'ag36x') { S.ag36 = null; render(); return; }
  if (!c) return; var an = TODAY.getFullYear(), x = ag36Obj(c, an);
  if (a === 'ag36mitad') { if (ag36Paga(c, Math.min(x.falta, r2(x.obj / 2)), 'mitad')) { S.ag36 = null; render(); } return; }
  if (a === 'ag36resto') { if (ag36Paga(c, x.falta, 'resto')) { S.ag36 = null; render(); } return; }
  if (a === 'ag36otra') { S.ag36 = { id: c.id, modo: 'otra', m: '' }; render(); return; }
  if (a === 'ag36pag') { if (ag36Paga(c, S.ag36 && S.ag36.m, 'otra')) { S.ag36 = null; render(); } return; }
  if (a === 'ag36aj') { S.ag36 = { id: c.id, modo: 'aj', m: String(x.obj), mot: '' }; render(); return; }
  if (a === 'ag36ajok') {
    var m = r2(num(S.ag36 && S.ag36.m)), mot = String((S.ag36 && S.ag36.mot) || '').trim();
    if (!(m >= 0) || m < x.pag - 0.5) { toast('No puede ser menos de lo que ya le pagaste (' + money(x.pag) + ')'); return; }
    if (!mot) { toast('Escribe por qué'); return; }
    c.aguiAj36 = c.aguiAj36 || {}; c.aguiAj36[an] = { m: m, mot: mot, f: iso(TODAY), q: quien(), calc: x.g.m };
    if (aguiPag118(c, an) && m > x.pag + 0.5) delete c.agui118[an];
    try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Ajustó el aguinaldo ' + an + ' de ' + c.n + ' a ' + money(m) + ' (calculado ' + money(x.g.m) + '): ' + mot }); } catch (er) {}
    S.ag36 = null; toast('Aguinaldo ajustado'); render(); return;
  }
}, true);
/* el botón viejo "Pagar aguinaldo" se cambia por el bloque nuevo */
var _rdAg36 = render;
render = function () {
  var r = _rdAg36.apply(this, arguments);
  try {
    if (S.role === 'admin' && S.tab.admin === 'personal') {
      Array.prototype.forEach.call(document.querySelectorAll('main [data-x="lab118"]'), function (box) {
        if (box.querySelector('[data-x="ag36"]')) return;
        var inp = box.querySelector('[id^="ing118_"]'); if (!inp) return; var c = chById118(inp.id.slice(7)); if (!c || !(sdLey118(c) > 0)) return;
        var lbls = Array.prototype.filter.call(box.querySelectorAll('.lbl'), function (l) { return /^Aguinaldo \d{4}$/.test(l.textContent.trim()); });
        if (!lbls.length) return; var t = lbls[0], nx = t.nextElementSibling, bt = nx && nx.nextElementSibling;
        if (bt && bt.dataset && bt.dataset.act === 'agui118') bt.remove(); if (nx && nx.classList.contains('lbl')) nx.remove();
        var d = document.createElement('div'); d.innerHTML = ag36HTML(c); t.replaceWith(d.firstElementChild);
      });
    }
  } catch (e) { console.error('ag36', e); }
  try { ovPon70('rec36ov', rec36HTML()); } catch (e) {}
  return r;
};
/* recordatorios */
var _hT36 = hoyTareas;
hoyTareas = function () {
  var L = _hT36.apply(this, arguments);
  try {
    if (S.role !== 'admin' || S.encOn) return L;
    var m = TODAY.getMonth(), d = TODAY.getDate(), an = TODAY.getFullYear();
    var nov = m === 10 && d >= 10 && d <= 20, dic = m === 11 && d >= 10 && d <= 20; if (!nov && !dic) return L;
    (S.choferes || []).forEach(function (c) {
      if (!c || c.baja || c.arch || (typeof esAdm === 'function' && esAdm(c)) || !(sdLey118(c) > 0)) return;
      var x = ag36Obj(c, an); if (!(x.obj > 0)) return;
      if (nov && x.pag < x.obj / 2 - 0.5) L.push({ k: 'ag36n' + c.id, t: '🎁 Pagar la primera mitad del aguinaldo a ' + c.n + ': ' + money(r2(x.obj / 2 - x.pag)) + ' (antes del 20 de noviembre)', go: 'personal', ok: false });
      if (dic && x.falta > 0.5) L.push({ k: 'ag36d' + c.id, t: '🎁 Pagar el aguinaldo que falta a ' + c.n + ': ' + money(x.falta) + ' (antes del 20 de diciembre, lo pide la ley)', go: 'personal', ok: false });
    });
  } catch (e) {}
  return L;
};
/* ---------- recibo de pago ---------- */
function rec36Img(tit, c, lineas, total) {
  var W = 460, H = 150 + lineas.length * 30, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.fillStyle = '#1E2A1A'; x.font = 'bold 22px sans-serif'; x.fillText('Plátanos Nietos', 20, 36);
  x.font = '15px sans-serif'; x.fillStyle = '#555'; x.fillText('Recibo de pago · ' + fmtF(iso(TODAY)) + ' ' + hhmm(), 20, 58);
  x.fillStyle = '#111'; x.font = 'bold 18px sans-serif'; x.fillText(String(c.n || ''), 20, 88); x.font = '15px sans-serif'; x.fillText(tit, 20, 108);
  var y = 138; lineas.forEach(function (l) { x.fillStyle = '#333'; x.font = '15px sans-serif'; x.fillText(String(l[0]).slice(0, 40), 20, y); x.textAlign = 'right'; x.fillText(String(l[1]), W - 20, y); x.textAlign = 'left'; y += 28; });
  x.strokeStyle = '#ccc'; x.beginPath(); x.moveTo(20, y - 16); x.lineTo(W - 20, y - 16); x.stroke();
  x.font = 'bold 20px sans-serif'; x.fillStyle = '#111'; x.fillText('Total pagado', 20, y + 8); x.textAlign = 'right'; x.fillText(money(total), W - 20, y + 8); x.textAlign = 'left';
  return cv.toDataURL('image/png');
}
function rec36Abre(c, tit, lineas, total) { try { S.rec36 = { ch: c.id, img: rec36Img(tit, c, lineas, total), tit: tit, total: total }; } catch (e) {} }
function rec36HTML() {
  var x = S.rec36; if (!x || S.role !== 'admin') return ''; var c = chById118(x.ch); if (!c) { S.rec36 = null; return ''; }
  return ovW70('rec36ov', '🧾 Recibo de pago', '<img src="' + x.img + '" alt="Recibo de pago de ' + esc(c.n) + '" style="width:100%;border:1px solid var(--line);border-radius:12px">'
    + '<button class="btn" style="width:100%;margin-top:10px;min-height:54px" data-act="rec36wa">📲 Mandar por WhatsApp a ' + esc(c.n) + '</button><button class="btn sec" style="width:100%;margin-top:8px" data-act="rec36x">Cerrar</button>', 'rec36x');
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="rec36wa"],[data-act="rec36x"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); var x = S.rec36; if (!x) return;
  if (b.dataset.act === 'rec36x') { S.rec36 = null; render(); return; }
  var c = chById118(x.ch);
  natCompartir(x.img, 'recibo-' + String((c && c.n) || 'pago').replace(/\s+/g, '-') + '.png', { tel: c && c.tel, texto: x.tit + ': ' + money(x.total) }).then(function (ok) { if (!ok) toast('No se pudo abrir WhatsApp: mantén presionada la imagen para compartirla'); });
}, true);
/* al pagar la semana: se guarda el desglose de ese momento y sale el recibo */
var REC36 = {};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="pagarsz"]'); if (!b || S.role !== 'admin') return;
  var c = chById118(b.dataset.id); if (!c) return;
  var lineas = []; try { var d = document.createElement('div'); d.innerHTML = szDesg(c); Array.prototype.forEach.call(d.querySelectorAll('.row'), function (r) { var ch = r.children; if (ch.length >= 2) lineas.push([ch[0].textContent.trim(), ch[ch.length - 1].textContent.trim()]); }); } catch (er) {}
  REC36 = { id: c.id, n0: (S.pagosSueldo || []).length, lineas: lineas };
  setTimeout(function () { try { var L = S.pagosSueldo || []; if (L.length > REC36.n0) { var p = L[L.length - 1]; if (+p.ch === +REC36.id) { rec36Abre(c, p.n || 'Pago de la semana', REC36.lineas.slice(0, 12), num(p.m)); render(); } } } catch (er) {} }, 60);
}, true);
