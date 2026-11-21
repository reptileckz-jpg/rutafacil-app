/* ===================== TEMA · En el Cuadre, todo lo que resta va en rojo (21 nov · punto 18 de la nueva numeración) =====================
   Ricardo: "en el cuadre, todo lo que reste ganancia o sea gasto, debe ir con color rojo, para identificar más fácil".
   En la pantalla del Cuadre (día, semana, mes y año):
     - Todo monto con signo de menos (−$80.00, -$35,415.10…) va en rojo.
     - Los renglones de lo que resta (gastos, desgaste, kilómetros y desgaste, sueldos, comisiones, merma, faltó, pérdida, costos)
       llevan su monto en rojo aunque se escriba sin el signo.
     - En la tarjeta verde de arriba (fondo oscuro) se usa un rojo claro para que se lea.
   Lo que suma (ventas, abonos, ganancia de la fruta, neto positivo) se queda como estaba. Solo cambia el color; no cambia ninguna cuenta.
   Se arma al final.
   ============================================================================================ */
(function () {
  try {
    var st = document.createElement('style'); st.id = 'rojo18';
    st.textContent = '.rojo18{color:var(--danger,#BE123C)!important}.k5hero .rojo18,.k5pill .rojo18{color:#FECACA!important}';
    document.head.appendChild(st);
  } catch (e) {}
})();
var ROJO18 = {
  menos: /^\s*[-−–]\s*\$/,
  resta: /gasto|desgaste|sueldo|comisi[oó]n|merma|falt[oó]|faltante|p[ée]rdida|costo|veh[ií]culo|combustible|gasolina|casetas|descuento/i,
  suma: /venta|abono|ganancia|neto|cobrad|ingreso|entr[oó]|sobr[oó]|libre/i
};
function rojo18Pinta() {
  if (S.role !== 'admin' || S.tab.admin !== 'cuadre121') return;
  var m = document.querySelector('#root > main') || document.querySelector('main'); if (!m) return;
  /* 1) todo monto con signo de menos */
  var L = m.querySelectorAll('b, strong, span, small, div');
  for (var i = 0; i < L.length; i++) {
    var el = L[i]; if (el.children.length > 1) continue;
    var t = (el.textContent || '').trim(); if (t.length > 22) continue;
    if (ROJO18.menos.test(t) && !el.classList.contains('rojo18')) el.classList.add('rojo18');
  }
  /* 2) renglones de lo que resta (etiqueta a la izquierda, monto a la derecha) */
  var R = m.querySelectorAll('.row, .k5li, .k5pill');
  for (var j = 0; j < R.length; j++) {
    var r = R[j], kids = r.children; if (kids.length < 2) continue;
    var lab = (kids[0].textContent || '').trim(), val = kids[kids.length - 1];
    if (!ROJO18.resta.test(lab) || ROJO18.suma.test(lab.replace(/ganancia\s+de\s+la\s+fruta/i, ''))) continue;
    if (!/\$/.test(val.textContent || '')) continue;
    if (!val.classList.contains('rojo18')) val.classList.add('rojo18');
  }
  /* 3) tarjetas cuyo título es de algo que resta (p. ej. "👷 Sueldos del día de quien no salió a ruta"): todos sus montos */
  var C = m.querySelectorAll('.card');
  for (var k = 0; k < C.length; k++) {
    var cd = C[k], tt = cd.querySelector('b'); if (!tt) continue;
    var tit = (tt.textContent || '').trim();
    if (!/^\W*(sueld|gasto|desgaste|comisi|merma|faltante|p[ée]rdida)/i.test(tit)) continue;
    var F = cd.querySelectorAll('.row > b:last-child, .row > span:last-child, .k5li > b');
    for (var q = 0; q < F.length; q++) if (/\$/.test(F[q].textContent || '') && !F[q].classList.contains('rojo18')) F[q].classList.add('rojo18');
  }
}
var _rd18 = render;
render = function () { var r = _rd18.apply(this, arguments); try { rojo18Pinta(); } catch (e) {} return r; };
