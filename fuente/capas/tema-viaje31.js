/* ===================== TEMA · Cerrar un viaje de carga que nunca llegó (23 nov · punto 31 de la nueva numeración) =====================
   Ricardo: "un viaje que nunca llegó, pero no me deja cancelar porque dice que está en curso". Escogió: "que la app pregunte cada vez".
   Antes solo se podía cancelar un viaje que NO había empezado (173). Ahora, si ya empezó (o tiene su pantalla abierta) y no llegó, en su
   carga sale "¿Este viaje no llegó? · Cerrarlo" y, por pasos (un paso por pantalla):
     1) ¿Qué pasó? (no salió / salió y regresó sin carga / otro) y una nota;
     2) Efectivo: cuánto le diste, cuánto regresó el chofer y cuánto gastó en el camino;
     3) Cajas vacías: cuántas llevaba y cuántas regresaron;
     4) Revisar y cerrar.
   Al cerrar (las mismas cuentas que la liquidación de un viaje y que la cancelación del 173):
     - El efectivo que regresó vuelve a la caja. Si falta (le diste − gastó − regresó > 0), queda como faltante del chofer (como siempre).
     - La carga queda "Cancelada" (no se borra): ya no cuenta como deuda; lo que ya pagaste al proveedor pasa a sus otras cargas.
     - Las vacías que regresaron vuelven a la bodega; las que no, se ven como faltante en Descuadres (no se esconden).
     - El viaje se quita de "en curso". Queda todo en el historial (carga.cerr31). Este cierre no se deshace con "Recuperar".
   Aviso: un viaje en curso de hace 2 días o más sale en los pendientes ("sigue en curso: si no llegó, ciérralo"). Se arma al final.
   ============================================================================================ */
function v31Vw(c) { return (S.vws || []).filter(function (v) { return v && v.cid === c.id; })[0] || null; }
function v31Aplica(c) { return !!(c && c.est === 'Por llegar' && !c.cerr31 && !c173Cancelable(c) && (c173Empezo(c) || vw173Abierto(c))); }
function v31Efe(c) { var v = v31Vw(c); if (v) return num(v.efe); return c.viaje ? num(c.viaje.efe) : 0; }
function v31Chofer(c) { var v = v31Vw(c); if (v && v.quien != null) return v.quien; return c.viaje ? c.viaje.chofer : null; }
var V31P = ['¿Qué pasó?', 'Efectivo', 'Cajas vacías', 'Revisar'];
function v31HTML() {
  var x = S.v31; if (!x || S.role !== 'admin') return '';
  var c = (S.cargas || []).filter(function (y) { return String(y.id) === String(x.id); })[0]; if (!c) { S.v31 = null; return ''; }
  var p = x.p || 0, efe = v31Efe(c), vac = num(c.vacEnv), ch = v31Chofer(c), chN = ch != null ? chofN(ch) : 'el chofer';
  var h = '<div class="lbl"><b>Paso ' + (p + 1) + ' de 4 · ' + V31P[p] + '</b></div><div class="wz-hd">' + V31P.map(function (t, i) { return '<i class="' + (i <= p ? 'on' : '') + '"></i>'; }).join('') + '</div>'
    + '<div class="lbl" style="margin-bottom:8px">Viaje a ' + esc(c.prov || '') + ' del ' + fmtF(c.fecha) + ' · ' + esc(chN) + '</div>';
  var campo = function (k, lbl, val) { return '<div class="field"><label for="v31' + k + '">' + lbl + '</label><input id="v31' + k + '" type="number" inputmode="decimal" min="0" data-v31="' + k + '" value="' + esc(String(val == null ? '' : val)) + '" style="width:140px"></div>'; };
  if (p === 0) {
    h += '<div class="card"><b>¿Qué pasó con este viaje?</b><div class="chips" role="group" style="margin-top:8px;flex-wrap:wrap">'
      + [['nosalio', 'No salió'], ['sincarga', 'Salió y regresó sin carga'], ['otro', 'Otra cosa']].map(function (o) { return '<button data-act="v31que" data-v="' + o[0] + '" aria-pressed="' + (x.que === o[0]) + '">' + o[1] + '</button>'; }).join('')
      + '</div><div class="field" style="margin-top:10px"><label for="v31nota">Nota (opcional)</label><input id="v31nota" type="text" data-v31="nota" value="' + esc(x.nota || '') + '" placeholder="Qué pasó" style="width:100%;text-align:left"></div></div>';
  } else if (p === 1) {
    h += '<div class="card"><b>Efectivo del viaje</b><div class="lbl" style="margin-top:4px">' + (efe > 0 ? 'Para este viaje le diste <b>' + money(efe) + '</b> a ' + esc(chN) + '.' : 'Este viaje no tenía efectivo para el chofer.') + '</div>'
      + campo('reg', 'Efectivo que regresó', x.reg) + campo('gas', 'Lo que gastó en el camino (casetas, gasolina, comida)', x.gas) + '</div>';
  } else if (p === 2) {
    h += '<div class="card"><b>Cajas vacías</b><div class="lbl" style="margin-top:4px">' + (vac > 0 ? 'Llevaba <b>' + vac + '</b> cajas vacías para el proveedor.' : 'No llevaba cajas vacías.') + '</div>'
      + (vac > 0 ? campo('vac', '¿Cuántas regresaron?', x.vac) : '') + '</div>';
  } else {
    var R = v31Cuenta(c, x);
    h += '<div class="card"><b>Revisa antes de cerrar</b>'
      + rw('Qué pasó', ({ nosalio: 'No salió', sincarga: 'Salió y regresó sin carga', otro: 'Otra cosa' })[x.que] || '—')
      + (efe > 0 ? rw('Le diste', money(efe)) + rw('Gastó en el camino', money(R.gas)) + rw('Regresó a la caja', money(R.reg)) : '')
      + (R.falt > 0.005 ? '<div class="card alert" style="margin-top:8px;padding:8px 10px"><b>Faltan ' + money(R.falt) + '</b><div class="lbl">Quedan como faltante de ' + esc(chN) + ' (como en cualquier viaje).</div></div>' : '')
      + (vac > 0 ? rw('Vacías que regresan a la bodega', R.vacReg + ' de ' + vac) : '')
      + (R.vacFalta > 0 ? '<div class="lbl" style="margin-top:4px">Las ' + R.vacFalta + ' que no regresaron se verán como faltante de taras en Descuadres.</div>' : '')
      + '<div class="lbl" style="margin-top:8px">La carga queda "Cancelada": ya no cuenta como deuda con ' + esc(c.prov || 'el proveedor') + ' y se quita de "en curso". Queda en el historial.</div></div>';
  }
  if (x.err) h += '<div class="card alert" style="padding:8px 10px"><b>' + esc(x.err) + '</b></div>';
  h += '<div class="wz-nav" style="display:flex;gap:8px;margin-top:10px">' + (p > 0 ? '<button class="btn sec" data-act="v31paso" data-v="' + (p - 1) + '">← Atrás</button>' : '')
    + (p < 3 ? '<button class="btn" data-act="v31paso" data-v="' + (p + 1) + '">Siguiente</button>' : '<button class="btn" style="background:var(--danger)" data-act="v31ok">Cerrar el viaje</button>') + '</div>';
  return ovW70('v31ov', '¿Este viaje no llegó?', h, 'v31x');
}
function v31Cuenta(c, x) {
  var efe = v31Efe(c), reg = Math.max(0, num(x.reg)), gas = Math.max(0, num(x.gas)), vac = num(c.vacEnv);
  var vacReg = vac > 0 ? Math.max(0, Math.min(vac, Math.round(num(x.vac)))) : 0;
  return { efe: efe, reg: r2(reg), gas: r2(gas), falt: r2(Math.max(0, efe - gas - reg)), vac: vac, vacReg: vacReg, vacFalta: vac - vacReg };
}
function v31Falta(c, x, p) {
  var efe = v31Efe(c);
  if (p === 0 && !x.que) return 'Escoge qué pasó';
  if (p === 1 && efe > 0 && (x.reg === '' || x.reg == null)) return 'Escribe cuánto efectivo regresó (0 si nada)';
  if (p === 1 && num(x.reg) + num(x.gas) > efe + 0.005 && efe > 0) return 'Lo que regresó más lo que gastó no puede pasar de ' + money(efe);
  if (p === 2 && num(c.vacEnv) > 0 && (x.vac === '' || x.vac == null)) return 'Escribe cuántas cajas vacías regresaron';
  if (p === 2 && num(x.vac) > num(c.vacEnv)) return 'No pueden regresar más de ' + num(c.vacEnv);
  return '';
}
function v31Cierra(c, x) {
  var R = v31Cuenta(c, x), v = v31Vw(c), ch = v31Chofer(c), hoy = iso(TODAY);
  /* efectivo: mismo camino que la liquidación del viaje */
  if (v) { S.vjEfeBack = (S.vjEfeBack || 0) + R.reg; }
  else if (c.viaje && R.efe > 0) { /* viaje programado: c173Cancela regresa todo el efectivo a la caja; lo que no regresó sale */ }
  if (R.falt > 0.005 && ch != null) { S.faltantes = S.faltantes || []; S.faltantes.push({ ch: ch, m: R.falt, fecha: hoy, desc: true, pend: true, v31: c.id }); }
  /* vacías: solo regresan las que sí volvieron */
  c.vacEnv = R.vacReg;
  c173Cancela(c);
  if (!v && c.viaje && R.efe > 0) { var fuera = r2(R.efe - R.reg); if (fuera > 0.005) S.vjEfeOut = (S.vjEfeOut || 0) + fuera; }
  c.cerr31 = { f: hoy, q: quien(), que: x.que, nota: String(x.nota || '').slice(0, 200), efe: R.efe, reg: R.reg, gas: R.gas, falt: R.falt, vac: R.vac, vacReg: R.vacReg, ch: ch };
  if (v) { try { vwQuitar(v); } catch (e) { S.vws = (S.vws || []).filter(function (y) { return y !== v; }); } }
  try {
    S.hist.push({ t: fmtF(hoy) + ' ' + hhmm(), q: quien(), x: 'Cerró el viaje a ' + c.prov + ' del ' + fmtF(c.fecha) + ' que no llegó (' + (({ nosalio: 'no salió', sincarga: 'regresó sin carga', otro: 'otra cosa' })[x.que] || '') + ')'
      + (R.efe > 0 ? ': regresó ' + money(R.reg) + ', gastó ' + money(R.gas) + (R.falt > 0.005 ? ', faltan ' + money(R.falt) + ' (faltante del chofer)' : '') : '')
      + (R.vac > 0 ? '; vacías ' + R.vacReg + ' de ' + R.vac + (R.vacFalta ? ' (faltan ' + R.vacFalta + ')' : '') : '') });
  } catch (e) {}
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act^="v31"]'); if (!b) return;
  var a = b.dataset.act; if (S.role !== 'admin') return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (a === 'v31abre') { S.v31 = { id: b.dataset.id, p: 0, que: '', nota: '', reg: '', gas: '', vac: '' }; render(); return; }
  var x = S.v31; if (!x) return;
  var c = (S.cargas || []).filter(function (y) { return String(y.id) === String(x.id); })[0]; if (!c) { S.v31 = null; render(); return; }
  if (a === 'v31x') { S.v31 = null; render(); return; }
  if (a === 'v31que') { x.que = b.dataset.v; x.err = ''; render(); return; }
  if (a === 'v31paso') { var n = +b.dataset.v; if (n > (x.p || 0)) { var f = v31Falta(c, x, x.p || 0); if (f) { x.err = f; render(); return; } } x.err = ''; x.p = n; render(); return; }
  if (a === 'v31ok') {
    for (var i = 0; i < 3; i++) { var f2 = v31Falta(c, x, i); if (f2) { x.err = f2; x.p = i; render(); return; } }
    if (!v31Aplica(c)) { S.v31 = null; toast('Este viaje ya no está en curso'); render(); return; }
    v31Cierra(c, x); S.v31 = null; toast('Viaje cerrado: la carga quedó cancelada'); render(); return;
  }
}, true);
document.addEventListener('input', function (e) {
  var t = e.target; if (!t || !t.dataset || !t.dataset.v31 || !S.v31) return;
  S.v31[t.dataset.v31] = t.value; S.v31.err = '';
}, true);
/* en la carga: el botón */
var _cc31 = cargaCard;
cargaCard = function (c) {
  var h = _cc31.apply(this, arguments);
  try {
    if (S.role !== 'admin' || S.encOn) return h;
    var x = '';
    if (v31Aplica(c)) {
      x = '<div class="card note" style="margin-top:10px;padding:10px 12px" data-k="v31_' + c.id + '"><b>¿Este viaje no llegó?</b><div class="lbl" style="margin-top:4px">Ya empezó, por eso no se cancela como uno que nunca salió. Ciérralo diciendo qué pasó y cuánto efectivo regresó.</div>'
        + '<button class="btn sm sec" style="margin-top:8px;color:var(--danger)" data-act="v31abre" data-id="' + c.id + '">Este viaje no llegó · cerrarlo</button></div>';
    } else if (c.cerr31) {
      var k = c.cerr31;
      h = h.replace(/<button[^>]*data-act="c173rec"[^>]*>[^<]*<\/button>/, '');
      x = '<div class="lbl" style="margin-top:6px">Se cerró porque no llegó (' + fmtF(k.f) + (k.q ? ' · ' + esc(k.q) : '') + ')' + (k.efe > 0 ? ': regresó ' + money(k.reg) + ', gastó ' + money(k.gas) + (k.falt > 0.005 ? ', faltante ' + money(k.falt) : '') : '') + '.</div>';
    }
    if (!x) return h;
    var i = h.lastIndexOf('</div>'); return i > -1 ? h.slice(0, i) + x + h.slice(i) : h + x;
  } catch (e) { return h; }
};
/* aviso: sigue en curso hace 2 días o más */
var _av31 = avisos;
avisos = function () {
  var a = _av31.apply(this, arguments);
  try {
    if (S.role !== 'admin') return a;
    (S.cargas || []).forEach(function (c) {
      if (!v31Aplica(c) || c173Dias(c) < 2) return;
      a.push('Viaje a ' + c.prov + ' del ' + fmtF(c.fecha) + ' sigue en curso hace ' + c173Dias(c) + ' días: si no llegó, ciérralo en Cargas');
    });
  } catch (e) {}
  return a;
};
var _rd31 = render;
render = function () { var r = _rd31.apply(this, arguments); try { ovPon70('v31ov', v31HTML()); } catch (e) { console.error('v31', e); } return r; };
