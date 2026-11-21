/* ===================== TEMA · Contar por billetes vuelve a ser opcional (21 nov · punto 17 de la nueva numeración) =====================
   Ricardo: "al entregar la ruta me obliga a contar los billetes por denominación con la calculadora de billetes que tenemos; eso era una
   herramienta para facilitar contar, no obligatorio".
   Venía obligatorio desde el 153 de antes (Ajustes → 🛡️ Controles, "así viene"). Ahora:
     - Por omisión es OPCIONAL: en "¿Cuánto entregas?" sale "Entrego $" (ya puesto con lo que debe entregar) y abajo "Contar por billetes ·
       opcional · la app suma" para quien quiera usarlo. Si cuenta, lo entregado = lo contado (como siempre).
     - Solo es obligatorio si alguien lo pone así a propósito en Ajustes → Controles ("Obligatorio").
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
billObl153 = function () { return (S.cfg || {}).bill153 === 'obl'; };
/* en Ajustes: el botón marcado es el de ahora */
var _ajBill17 = ajHTML;
ajHTML = function () {
  var h = _ajBill17.apply(this, arguments);
  try {
    if (!h || h.indexOf('data-act="bill153"') < 0) return h;
    var ob = billObl153();
    h = h.replace(/(data-act="bill153" data-v="obl" aria-pressed=")(true|false)(")/, '$1' + ob + '$3').replace(/(data-act="bill153" data-v="opc" aria-pressed=")(true|false)(")/, '$1' + (!ob) + '$3');
  } catch (e) {}
  return h;
};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="bill153"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation();
  S.cfg = S.cfg || {}; S.cfg.bill153 = b.dataset.v === 'obl' ? 'obl' : 'opc';
  try { S.hist.push({ t: fmtF(iso(TODAY)) + ' ' + hhmm(), q: quien(), x: 'Contar billetes en el cierre ahora es ' + (S.cfg.bill153 === 'obl' ? 'obligatorio' : 'opcional') }); } catch (er) {}
  toast(S.cfg.bill153 === 'obl' ? 'Contar billetes es obligatorio' : 'Contar billetes es opcional'); render();
}, true);
