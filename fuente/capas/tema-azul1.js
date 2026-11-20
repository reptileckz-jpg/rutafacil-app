/* ===================== TEMA · Sin recuadro azul al tocar + el error del cierre a la vista (20 nov · punto 1 de la nueva numeración) =====================
   Ricardo (captura de "No mandaste tu cierre de ayer"): "al presionarlo y que cambia de color, el color azul se sale del cuadro verde".
   Causa: es el resaltado que Android pone solo al tocar (-webkit-tap-highlight-color). Es un RECTÁNGULO que no respeta las esquinas
   redondas, por eso se "sale" del botón. La app ya tiene su propio efecto al presionar (el botón se encoge un poco), así que el de
   Android se quita en toda la app (solo los botones del teclado del PIN y la barra lo tenían quitado).

   Y "Mandar mi cierre de ayer" que no hace nada: con los datos de prueba sí abre el cierre. Cuando el cierre se rompe al dibujarse, la
   red de seguridad (77) regresa sin avisar a "No mandaste tu cierre" y parece que el botón no hace nada. Ahora, si eso pasa, en esa
   misma pantalla sale en rojo "No se pudo abrir tu cierre" con el error, para mandárselo al administrador y arreglar la causa de verdad.
   Solo cambia cómo se ve; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
(function () {
  try {
    var st = document.createElement('style');
    st.id = 'azul1';
    st.textContent = 'html,body,button,a,summary,label,input,select,textarea,[data-act],[role="button"],[role="tab"]{-webkit-tap-highlight-color:transparent}';
    document.head.appendChild(st);
  } catch (e) {}
})();

/* el error que hizo que no abriera el cierre de un día anterior */
var ERR1 = { cierre: null };
var _fa1 = falloAnota77;
falloAnota77 = function (e, donde) {
  var t = _fa1.apply(this, arguments);
  try {
    if (S.role === 'rep' && S.dia80 && S.tab && S.tab.rep === 'cierre') {
      var L = String(t || '').split('\n');
      /* renglones: 0 título · 1 pantalla · 2 el error · 3 "En: capas" (si lo hay) */
      ERR1.cierre = { h: Date.now(), m: L[2] || String(e && e.message || e), en: /^En: /.test(L[3] || '') ? L[3] : '' };
    }
  } catch (x) {}
  return t;
};
function err1HTML() {
  var x = ERR1.cierre;
  if (!x || Date.now() - x.h > 30 * 60000) return '';
  return '<div class="card alert" data-x="err1" style="margin-top:14px;text-align:left"><b>No se pudo abrir tu cierre</b>'
    + '<div class="lbl" style="font-size:15px;margin-top:4px">Tómale captura a esto y mándasela al administrador para arreglarlo. Tus ventas y tu dinero no se tocaron.</div>'
    + '<pre style="white-space:pre-wrap;font-size:12px;margin:8px 0 0;background:#fff;border-radius:10px;padding:8px">' + esc(x.m + (x.en ? '\n' + x.en : '')) + '</pre></div>';
}
var _d1 = dia80HTML;
dia80HTML = function () {
  var h = _d1.apply(this, arguments);
  try {
    if (!h || h.indexOf('data-act="dia80c"') < 0) return h;
    var x = err1HTML(); if (!x) return h;
    var k = 'data-act="dia80c">';
    var i = h.indexOf(k); if (i < 0) return h;
    var j = h.indexOf('</button>', i); if (j < 0) return h;
    j += '</button>'.length;
    return h.slice(0, j) + x + h.slice(j);
  } catch (e) { return h; }
};
