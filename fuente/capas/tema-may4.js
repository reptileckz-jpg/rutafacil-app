/* ===================== TEMA · El mayoreo igual o más alto que el precio normal se revisa (20 nov · punto 4 de la nueva numeración) =====================
   Ricardo: "si el administrador fija el precio de mayoreo igual o superior al precio normal, pedir que lo revise".
   Dónde se fija el mayoreo y qué pasa ahora:
     1) Al registrar el costo de una carga, paso "Precio de mayoreo": abajo de los precios sale en rojo "Revisa el mayoreo…". Y al tocar
        "Sí, guardar" (Confirmar y guardar) sale antes "Revisa el mayoreo" con "Corregir" o "Sí, así está bien".
     2) "Usar desde hoy / cuando se acabe / intermedio": el mensaje de confirmación lleva arriba el aviso "Revisa el mayoreo".
     3) "Mayoreo de hoy" (mínimo del chofer): MÁS ALTO ya no se dejaba (sigue igual); IGUAL ahora pide revisarlo: el botón cambia a
        "Sí, así está bien" y se guarda al tocarlo otra vez.
   Solo pide revisar; no cambia ningún precio por su cuenta. Se arma al final.
   ============================================================================================ */
function may4Mal(R, M, mR, mM, hayR, hayM) {
  var o = [], chk = function (nom, may, pr) {
    may = num(may); pr = num(pr);
    if (!(may > 0) || !(pr > 0)) return;
    if (may > pr + 0.004) o.push('El mayoreo de ' + nom + ' (' + money(may) + ') es MÁS ALTO que el precio normal (' + money(pr) + ')');
    else if (Math.abs(may - pr) < 0.005) o.push('El mayoreo de ' + nom + ' (' + money(may) + ') es IGUAL al precio normal: así no hay descuento');
  };
  if (hayR !== false) chk('la caja de roatán', mR, R);
  if (hayM !== false) chk('el kilo de macho', mM, M);
  return o;
}
function may4Lp(c) { var l = S.lp || {}; return may4Mal(l.R, l.M, l.mR, l.mM, !c || !!c.cajas, !c || !!c.kgM); }
function may4Aviso(L) {
  return '<div class="card alert" data-x="may4" style="padding:10px 14px;margin-top:10px"><b>Revisa el mayoreo</b><div style="font-size:15px;margin-top:4px">' + L.map(esc).join('<br>') + '</div><div class="lbl" style="margin-top:4px">El mayoreo debe ser más barato que el precio normal.</div></div>';
}
/* 1) el paso "Precio de mayoreo" de la carga */
var _cvP4 = cvPasoHTML;
cvPasoHTML = function (c, P) {
  var h = _cvP4.apply(this, arguments);
  try { if (P === 'may') { var L = may4Lp(c); if (L.length) h += may4Aviso(L); } } catch (e) {}
  return h;
};
/* 1) "Sí, guardar" del costo y precio: antes, revisar el mayoreo */
var MAY4 = { ok: '' };
function may4Firma() { var l = S.lp || {}; return [l.R, l.M, l.mR, l.mM].map(num).join('|'); }
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="cvconfirm2"]'); if (!b) return;
  var c = cargaById(+b.dataset.id), L = may4Lp(c);
  if (!L.length || MAY4.ok === may4Firma()) return;
  e.preventDefault(); e.stopImmediatePropagation();
  abrirModal('Revisa el mayoreo', L.map(esc).join('<br>') + '<br><br>El mayoreo debe ser más barato que el precio normal. ¿Lo corriges o así está bien?',
    [['Sí, así está bien', 'may4ok', ' data-id="' + (c ? c.id : '') + '"'], ['Corregir', 'may4cor', ' data-id="' + (c ? c.id : '') + '"']]);
  render();
}, true);
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="may4ok"],[data-act="may4cor"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  var id = b.dataset.id; S.modal = null;
  if (b.dataset.act === 'may4cor') {
    try { var f = S.cvf; if (f && typeof CVP !== 'undefined') { var i = CVP.map(function (x) { return x[0]; }).indexOf('may'); if (i > -1) f.paso = i; } } catch (er) {}
    render(); return;
  }
  MAY4.ok = may4Firma(); render();
  /* se sigue con el "Sí, guardar" de siempre */
  var bt = document.createElement('button'); bt.dataset.act = 'cvconfirm2'; bt.dataset.id = id; bt.style.display = 'none'; document.body.appendChild(bt);
  try { bt.click(); } finally { bt.remove(); }
}, true);
/* 2) "Usar desde hoy / cuando se acabe / intermedio": el aviso va arriba de la confirmación */
var _cm4 = confMsg;
confMsg = function (D) {
  var r = _cm4.apply(this, arguments);
  try {
    if (r && (D.act === 'lphoy' || D.act === 'lpinter' || D.act === 'lpdesp')) {
      var L = may4Lp(cargaById(+D.id));
      if (L.length) r = { t: r.t, m: '⚠️ Revisa el mayoreo: ' + L.join('. ') + '.\n\n' + r.m };
    }
  } catch (e) {}
  return r;
};
/* 3) "Mayoreo de hoy": igual al normal → pedir revisarlo una vez */
function may4Hoy(x) { var P = S.precio || {}; return may4Mal(P.R, P.M, x && x.R, x && x.M).filter(function (t) { return /IGUAL/.test(t); }); }
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="may71ok"]'); if (!b) return;
  var x = S.may71; if (!x) return;
  if (may71Mal(x.R, x.M).length) return;   /* lo de siempre (falta, más alto, abajo del costo) lo revisa l71 */
  var L = may4Hoy(x), f = [num(x.R), num(x.M)].join('|');
  if (!L.length || x.rev4 === f) return;
  e.preventDefault(); e.stopImmediatePropagation();
  x.rev4p = f; render();
}, true);
var _m71H4 = may71HTML;
may71HTML = function () {
  var h = _m71H4.apply(this, arguments);
  try {
    var x = S.may71; if (!h || !x) return h;
    var f = [num(x.R), num(x.M)].join('|');
    if (x.rev4p !== f) return h;
    var L = may4Hoy(x); if (!L.length) return h;
    x.rev4 = f;   /* el siguiente toque ya guarda */
    var k = '<button class="btn big" data-act="may71ok">Guardar mayoreo</button>';
    return h.replace(k, may4Aviso(L) + '<button class="btn big" data-act="may71ok">Sí, así está bien</button>');
  } catch (e) { return h; }
};
