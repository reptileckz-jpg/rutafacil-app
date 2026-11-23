/* ===================== TEMA · Crédito: sin la pregunta de las 5 compras; al pedir fiar, sus compras a la vista (23 nov · parte del punto 30) =====================
   Ricardo (opción múltiple + nota): "Que no pregunte (¿le das crédito? ya lleva 5 compras); el chofer puede solicitarlo al hacer la visita
   al cliente, como ya lo teníamos, con el temporizador de 5 min. Cuando le llegue este aviso al administrador, ábrele una pantalla con un
   resumen de sus compras semanales y mensuales, para ver cuánto compró y si es merecedor de un crédito".
   Ahora:
     - Ya no sale "X ya lleva 5 compras pagadas: ¿le das crédito?" (se queda guardado lo que compró, como siempre).
     - En "Piden permiso para fiar", cada cliente trae su resumen corto (últimos 7 y 30 días) y "📊 Ver sus compras": una pantalla con
       semana y mes (visitas, comprado, pagado al momento, fiado, abonos, cajas y kilos), lo que debe hoy y desde cuándo, y su promedio.
       Desde ahí mismo "Sí, que le fíe hoy" / "No" (los mismos botones de siempre).
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
var _av30c = avisos;
avisos = function () { var a = _av30c.apply(this, arguments); try { a = a.filter(function (x) { return !(typeof x === 'string' && /ya lleva 5 compras pagadas: ¿le das crédito\?/.test(x)); }); } catch (e) {} return a; };
function comp30(cid, dias) {
  var desde = iso(new Date(TODAY.getTime() - (dias - 1) * 864e5)), hoy = iso(TODAY), vis = {}, o = { n: 0, total: 0, pago: 0, fiado: 0, abono: 0, R: 0, M: 0 };
  var suma = function (l, f) {
    if (!l || l.anul || +l.c !== +cid) return; f = l.f || f; if (!f || f < desde || f > hoy) return;
    vis[f + '|' + (l.h || o.n)] = 1; o.n++;
    o.total += num(l.total); o.pago += Math.min(num(l.pago), num(l.total)); o.fiado += Math.max(0, num(l.total) - num(l.pago)); o.abono += num(l.abono); o.R += num(l.R); o.M += num(l.M);
  };
  var visto = {};
  (S.rutasHist || []).forEach(function (r) { if (!r) return; (r.log || []).forEach(function (l) { var k = JSON.stringify([r.f, l && l.h, l && l.c, l && l.total]); if (visto[k]) return; visto[k] = 1; suma(l, r.f); }); });
  var vivas = [S].concat(Object.keys(S.chSt || {}).map(function (k) { return S.chSt[k]; }));
  vivas.forEach(function (o2) { if (!o2) return; var f = o2.rutaDia80 || hoy; (o2.log || []).forEach(function (l) { var k = JSON.stringify([f, l && l.h, l && l.c, l && l.total]); if (visto[k]) return; visto[k] = 1; suma(l, f); }); });
  ['total', 'pago', 'fiado', 'abono', 'M'].forEach(function (k) { o[k] = r2(o[k]); });
  return o;
}
function comp30Corto(c) {
  var s = comp30(c.id, 7), m = comp30(c.id, 30);
  return 'Semana: ' + s.n + ' compra' + (s.n === 1 ? '' : 's') + ' · ' + money(s.total) + ' — Mes: ' + m.n + ' · ' + money(m.total);
}
function comp30HTML() {
  var id = S.cmp30; if (id == null || S.role !== 'admin') return '';
  var c = cl(+id); if (!c) { S.cmp30 = null; return ''; }
  var s = comp30(c.id, 7), m = comp30(c.id, 30);
  var col = function (t, o) {
    return '<div class="card" style="flex:1 1 220px;margin:0"><b>' + t + '</b>' + rw('Compras', o.n) + rw('Compró', money(o.total)) + rw('Pagó al momento', money(o.pago)) + rw('Fiado', money(o.fiado)) + rw('Abonó', money(o.abono))
      + rw('Cajas de roatán', o.R) + (o.M ? rw('Kilos de macho', o.M) : '') + '</div>';
  };
  var pend = (S.permisos || []).filter(function (p) { return p && p.est === 'pend' && +p.c === +c.id; })[0];
  var desde = c.credDesde ? Math.max(0, Math.round((TODAY - new Date(c.credDesde + 'T12:00:00')) / 864e5)) : 0;
  var h = '<div class="lbl">' + esc(c.n) + (pend ? ' · lo pide ' + esc(chofN(pend.ch)) : '') + '</div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px">' + col('Últimos 7 días', s) + col('Últimos 30 días', m) + '</div>'
    + '<div class="card" style="margin-top:10px"><b>Hoy</b>' + rw('Debe', money(num(c.cred))) + (num(c.cred) > 0.005 && c.credDesde ? rw('Desde hace', desde + ' día' + (desde === 1 ? '' : 's')) : '')
    + rw('Límite de crédito', num(c.lim) > 0 ? money(num(c.lim)) : 'sin crédito') + (m.n ? rw('Promedio por compra (mes)', money(r2(m.total / m.n))) : '') + '</div>'
    + (pend ? '<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" style="flex:1" data-act="permok" data-id="' + c.id + '">Sí, que le fíe hoy</button><button class="btn sec" style="flex:1" data-act="permno" data-id="' + c.id + '">No</button></div>' : '');
  return ovW70('cmp30ov', '📊 Compras de ' + c.n, h, 'cmp30x');
}
var _pH30 = permsHTML;
permsHTML = function () {
  var h = _pH30.apply(this, arguments);
  try {
    if (S.role !== 'admin' || !h) return h;
    h = h.replace(/(<div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm" style="flex:1" data-act="permok" data-id="(\d+)")/g, function (all, pre, id) {
      var c = cl(+id); if (!c) return all;
      return '<div class="lbl" style="margin-top:4px">' + esc(comp30Corto(c)) + '</div><button class="link" style="min-height:40px" data-act="cmp30" data-id="' + id + '">📊 Ver sus compras</button>' + pre;
    });
  } catch (e) {}
  return h;
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="cmp30"],[data-act="cmp30x"],#cmp30ov [data-act="permok"],#cmp30ov [data-act="permno"]'); if (!b) return;
  var a = b.dataset.act;
  if (a === 'cmp30') { e.preventDefault(); e.stopImmediatePropagation(); S.cmp30 = +b.dataset.id; render(); return; }
  if (a === 'cmp30x') { e.preventDefault(); e.stopImmediatePropagation(); S.cmp30 = null; render(); return; }
  /* permok / permno: sigue su camino de siempre y se cierra la pantalla */
  S.cmp30 = null;
}, true);
var _rd30c = render;
render = function () { var r = _rd30c.apply(this, arguments); try { ovPon70('cmp30ov', comp30HTML()); } catch (e) { console.error('cmp30', e); } return r; };
