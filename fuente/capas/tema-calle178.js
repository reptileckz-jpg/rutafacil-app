/* ===================== TEMA · Venta rápida / cliente nuevo sin datos no se queda como parada (20 nov · punto 178) =====================
   Ricardo: "si selecciono cliente nuevo o venta rápida y le doy para atrás para ya no hacer la venta, como no puse ningún dato la app
   regresa, pero ese cliente nuevo o esa venta rápida me lo marca como parada de la ruta".
   Al tocar "Cliente nuevo" / "Venta rápida" la app crea una parada (y un cliente escondido) y abre la entrega. Solo el botón "Cancelar"
   de esa entrega la quitaba; si regresabas por "← Volver a la ruta", la barra de abajo o el botón de atrás del celular, se quedaba.
   "Cliente nuevo" primero abre el alta; al guardarlo crea la parada (nuevo72) y abre la entrega: igual, si regresas sin escribir nada
   se quita la PARADA, pero el cliente que diste de alta se queda guardado.
   Ahora: al salir de esa entrega por donde sea, si NO escribiste nada (cajas, kilos, vacías, nombre, teléfono, dirección, pago o abono
   iguales a como empezó), se quita igual que con "Cancelar". Si ya escribiste algo, se queda para que la termines.
   Solo quita esa parada vacía; no cambia nada más. Se arma al final.
   ============================================================================================ */
var CALLE178_CAMPOS = ['R', 'M', 'V', 'rn', 'rap', 'rtel', 'ra', 'pago', 'abono', 'tel', 'con', 'nota'];
var _calle178 = null;   /* {c: id del cliente de la calle, base: cómo empezó la entrega} */
function calle178Foto(d) { var o = {}; CALLE178_CAMPOS.forEach(function (k) { var v = d ? d[k] : ''; o[k] = (v == null ? '' : String(v)).trim(); }); return JSON.stringify(o); }
function calle178Quita() {
  var x = _calle178; _calle178 = null;
  if (!x || S.role !== 'rep') return;
  var i = -1; (S.stops || []).forEach(function (s, j) { if (s && (s.calle || s.nuevo72) && s.c === x.c && !s.done) i = j; });
  if (i < 0) return;
  var c = cl(x.c), st = S.stops[i];
  if (!c || (st.calle && !c.rapida)) return;
  /* ¿escribió algo? (el borrador es de este cliente) */
  if (S.d && x.dEs === S.d && calle178Foto(S.d) !== x.base) return;
  if ((S.log || []).some(function (l) { return l && l.c === x.c; })) return;   /* ya hubo entrega: no tocar */
  var cur = curStop(), eraCur = cur === i;
  if (st.calle) S.cli = S.cli.filter(function (y) { return y.id !== x.c; });   /* el cliente nuevo que diste de alta se queda; solo se quita la parada */
  S.stops.splice(i, 1);
  if (eraCur || cur > i) { var nx = curStop(); S.cur = nx >= 0 ? nx : 0; resetDraft(nx >= 0 ? cl(S.stops[nx].c) : null); }
}
var _rd178 = render;
render = function () {
  try {
    /* saliste de la entrega de una venta de la calle: si está vacía, se quita */
    if (_calle178 && !(S.role === 'rep' && S.tab.rep === 'entrega' && (function () { var i = curStop(); return i >= 0 && S.stops[i] && S.stops[i].c === _calle178.c; })())) calle178Quita();
  } catch (e) { console.error('calle178', e); }
  var r = _rd178.apply(this, arguments);
  try {
    if (S.role === 'rep' && S.tab.rep === 'entrega') {
      var i = curStop(), s = i >= 0 ? S.stops[i] : null;
      if (s && (s.calle || s.nuevo72) && !s.done) { if (!_calle178 || _calle178.c !== s.c) _calle178 = { c: s.c, base: calle178Foto(S.d), dEs: S.d }; }
      else _calle178 = null;
    }
  } catch (e) {}
  return r;
};
