/* ===================== TEMA · Viaje de carga que nunca salió (19 nov · punto 173) =====================
   Ricardo: "con la 1.40 creé un viaje de carga a crédito pero nunca lo inicié; ya no me sale el viaje, pero me sigue marcando que le
   debo al proveedor, como si la carga se hubiera recibido".
   Lo que pasaba: al crear el viaje se crea su carga "Por llegar". Desde la 77, la app quita sola los viajes que quedaron a medias
   (para que no se cayera), pero su carga se quedaba "Por llegar" para siempre: seguía contando como deuda con el proveedor (y, si era
   un viaje programado, el efectivo para el chofer seguía restándose de la caja) y ya no había botón para cancelarla.
   Ahora:
   - AVISO: una carga "Por llegar" de hace 2 días o más que ya no tiene su viaje abierto sale en los avisos ("Viaje a … nunca llegó")
     y te lleva a Cargas.
   - En la carga, el botón "Este viaje nunca salió · cancelar" (solo administrador, y solo si el viaje no empezó). Pregunta antes.
   - Cancelar: la carga queda "Cancelada" (no se borra: queda en el historial); ya no cuenta como deuda; las cajas vacías que se
     apartaron regresan a la bodega; el efectivo que se iba a dar al chofer vuelve a la caja. Lo que YA le pagaste al proveedor por
     esa carga NO se pierde: pasa a sus otras cargas pendientes (traspaso, sin mover la caja); si sobra, queda a tu favor con él.
   - Si después resulta que sí llegó, "Recuperar" la regresa a "Por llegar" tal como estaba.
   ============================================================================================ */
function vw173Abierto(c) { return (S.vws || []).some(function (v) { return v && v.cid === c.id; }); }
function c173Empezo(c) {
  if (c.viaje && (c.viaje.ini || c.viaje.fin || c.viaje.liq)) return true;
  return (S.vws || []).some(function (v) { return v && v.cid === c.id && v.started; });
}
function c173Cancelable(c) { return c && c.est === 'Por llegar' && !c173Empezo(c) && !vw173Abierto(c); }
function c173Dias(c) { var d = new Date(String(c.fecha || iso(TODAY)) + 'T12:00:00'); return Math.floor((TODAY.getTime() - d.getTime()) / 864e5); }
function c173Debe(c) { try { return sum(provParts(c), function (x) { return Math.max(0, x[1] - provPagado(c, x[0])); }); } catch (e) { return 0; } }
function c173Pagado(c) { try { return sum(provParts(c), function (x) { return provPagado(c, x[0]); }); } catch (e) { return 0; } }

/* una carga cancelada no cuenta como deuda (lo que ya se pagó queda a favor con el proveedor) */
var _pp173 = provParts;
provParts = function (c) {
  var P = _pp173.apply(this, arguments);
  if (c && c.est === 'Cancelada') return P.map(function (x) { return [x[0], 0]; });
  return P;
};

/* aviso */
var _av173 = avisos;
avisos = function () {
  var a = _av173.apply(this, arguments);
  try {
    if (S.role === 'admin') (S.cargas || []).forEach(function (c) {
      if (!c173Cancelable(c) || c173Dias(c) < 2) return;
      var d = c173Debe(c);
      a.push('Viaje a ' + c.prov + ' del ' + fmtF(c.fecha) + ' nunca llegó' + (d > 0.005 ? ' y cuenta ' + money(d) + ' de deuda' : '') + ': ábrelo en Cargas y márcalo como recibido o cancélalo');
    });
  } catch (e) {}
  return a;
};

/* en la carga: cancelar / recuperar */
var _cc173 = cargaCard;
cargaCard = function (c) {
  var h = _cc173.apply(this, arguments);
  try {
    if (S.role !== 'admin' || S.encOn) return h;
    var x = '';
    if (c173Cancelable(c)) {
      var d = c173Debe(c), p = c173Pagado(c);
      x = '<div class="card note" style="margin-top:10px;padding:10px 12px" data-k="c173_' + c.id + '"><b>¿Este viaje nunca salió?</b>'
        + '<div class="lbl" style="margin-top:4px">Si no se hizo, cancélalo: ya no contará' + (d > 0.005 ? ' los ' + money(d) + ' de deuda con ' + esc(c.prov) : ' como deuda') + '.'
        + (p > 0.005 ? ' Lo que ya le pagaste (' + money(p) + ') queda a tu favor con ' + esc(c.prov) + '.' : '') + '</div>'
        + '<button class="btn sm sec" style="margin-top:8px;color:var(--danger)" data-act="c173can" data-id="' + c.id + '">Este viaje nunca salió · cancelar</button></div>';
    } else if (c.est === 'Cancelada') {
      var k = c.cancel173 || {};
      x = '<div class="card alert" style="margin-top:10px;padding:10px 12px"><b>Viaje cancelado</b><div class="lbl" style="margin-top:4px">'
        + (k.f ? fmtF(k.f) + (k.q ? ' · ' + esc(k.q) : '') + '. ' : '') + 'No cuenta como deuda ni como fruta en bodega.</div>'
        + '<button class="btn sm sec" style="margin-top:8px" data-act="c173rec" data-id="' + c.id + '">Sí llegó · recuperar</button></div>';
    }
    if (!x) return h;
    var i = h.lastIndexOf('</div>');
    return i > -1 ? h.slice(0, i) + x + h.slice(i) : h + x;
  } catch (e) { return h; }
};

/* lo que ya se le pagó por esta carga pasa a las otras cargas pendientes del mismo proveedor (la más vieja primero), SIN mover la caja:
   la carga baja su pagado y la otra lo sube por lo mismo (también la parte por transferencia). Lo que sobre se queda en la cancelada
   y cuenta a tu favor con ese proveedor. Se anota cada traspaso para poder recuperarla tal cual. */
function c173Traspasa(c) {
  var mov = [];
  provParts(c).forEach(function (x) {
    var prov = x[0], rest = r2(provPagado(c, prov));
    if (rest <= 0.005) return;
    provCargas(prov).filter(function (y) { return y.c !== c && y.c.est !== 'Cancelada' && y.pen > 0.005; }).forEach(function (y) {
      if (rest <= 0.005) return;
      var m = r2(Math.min(rest, y.pen)), t = y.c, base = c.pag > 0.005 ? r2(m * Math.min(1, num(c.pagBase) / c.pag)) : 0;
      c.pag = r2(c.pag - m); c.pagBase = r2(num(c.pagBase) - base);
      t.pag = r2(num(t.pag) + m); t.pagBase = r2(num(t.pagBase) + base);
      var nuevoC = !c.pagos, nuevoT = !t.pagos;
      c.pagos = c.pagos || []; t.pagos = t.pagos || [];
      var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      c.pagos.push({ prov: prov, m: -m, forma: 'Traspaso', f: iso(TODAY), q: quien(), t173: id, a: t.id });
      t.pagos.push({ prov: prov, m: m, forma: 'Traspaso', f: iso(TODAY), q: quien(), t173: id, de: c.id });
      mov.push({ id: id, t: t.id, m: m, base: base, prov: prov, nc: nuevoC, nt: nuevoT });
      rest = r2(rest - m);
    });
  });
  return mov;
}
function c173Cancela(c) {
  var k = { f: iso(TODAY), q: quien(), est: c.est, vac: num(c.vacEnv), efe: c.viaje ? num(c.viaje.efe) : 0, deuda: c173Debe(c) };
  k.mov = c173Traspasa(c);
  c.cancel173 = k;
  c.est = 'Cancelada';
  if (k.vac > 0) { S.inv.vacias = num(S.inv.vacias) + k.vac; c.vacEnv = 0; }
  if (c.viaje && k.efe > 0) c.viaje.efe = 0;
  var tr = sum(k.mov, function (x) { return x.m; });
  S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Canceló el viaje de carga a ' + c.prov + ' del ' + fmtF(c.fecha) + ' (nunca salió)' + (k.deuda > 0.005 ? '; ya no cuenta ' + money(k.deuda) + ' de deuda' : '') + (tr > 0.005 ? '; ' + money(tr) + ' que ya le habías pagado se pasaron a sus otras cargas' : '') });
}
function c173Recupera(c) {
  var k = c.cancel173 || {};
  (k.mov || []).forEach(function (x) {
    var t = (S.cargas || []).filter(function (y) { return y.id === x.t; })[0];
    if (t) { t.pag = r2(num(t.pag) - x.m); t.pagBase = r2(num(t.pagBase) - x.base); t.pagos = (t.pagos || []).filter(function (p) { return p.t173 !== x.id; }); if (x.nt && !t.pagos.length) delete t.pagos; }
    c.pag = r2(num(c.pag) + x.m); c.pagBase = r2(num(c.pagBase) + x.base); c.pagos = (c.pagos || []).filter(function (p) { return p.t173 !== x.id; }); if (x.nc && !c.pagos.length) delete c.pagos;
  });
  c.est = k.est || 'Por llegar';
  if (k.vac > 0 && num(S.inv.vacias) >= k.vac) { S.inv.vacias = num(S.inv.vacias) - k.vac; c.vacEnv = k.vac; }
  if (c.viaje && k.efe > 0) c.viaje.efe = k.efe;
  delete c.cancel173;
  S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Recuperó el viaje de carga a ' + c.prov + ' del ' + fmtF(c.fecha) });
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="c173can"],[data-act="c173rec"]'); if (!b) return;
  e.stopImmediatePropagation();
  var c = (S.cargas || []).filter(function (x) { return String(x.id) === String(b.dataset.id); })[0]; if (!c || S.role !== 'admin') return;
  if (b.dataset.act === 'c173can') {
    if (!c173Cancelable(c)) { toast('Este viaje ya empezó: no se puede cancelar desde aquí'); return; }
    var d = c173Debe(c), p = c173Pagado(c);
    if (!confirm('¿Cancelar el viaje a ' + c.prov + ' del ' + fmtF(c.fecha) + '?\n\n' + (d > 0.005 ? '• Ya no contará ' + money(d) + ' de deuda.\n' : '') + (p > 0.005 ? '• Lo que ya pagaste (' + money(p) + ') queda a tu favor con ' + c.prov + '.\n' : '') + '• Queda en el historial y lo puedes recuperar si sí llegó.')) return;
    c173Cancela(c); toast('Viaje cancelado');
  } else { c173Recupera(c); toast('Viaje recuperado'); }
  render();
}, true);
