/* ===================== TEMA · Atrás y deslizar entre pantallas (aplanado el 18 nov) =====================
   Antes estaba repartido en 6 envolturas encadenadas en l24, l26, l45, l52, l82, l88.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-pin.js.
   - navAtras: el botón o gesto de "atrás" (cierra la foto abierta, la ventana de ubicación, el mapa grande; si no, la pantalla anterior). La base está en l22.
   - swBloq: dónde NO se cambia de pantalla al deslizar (mapas, antigüedad de saldos, lotes, pendientes, días, taras).
   ============================================================================================ */

/* navAtras · de l24 */
var _navA24=navAtras;navAtras=function(){var o=document.getElementById('fotov');if(o){o.remove();return true}return _navA24.apply(this,arguments)};

/* navAtras · de l26 */
var _navA26=navAtras;navAtras=function(){if(S.ub&&!document.getElementById('fotov')){var sg=S.ub.sigue&&S.ub.modo==='foto';S.ub=null;render();if(sg)ubSeguir();return true}return _navA26.apply(this,arguments)};

/* swBloq · de l45 */
var _swB45=swBloq;swBloq=function(t){if(t&&t.closest&&t.closest('.leaflet-container,[data-vivo],.mapa,[data-mapa]'))return true;return _swB45.apply(this,arguments)};

/* navAtras · de l52 */
var _navA52=navAtras;navAtras=function(){if(GM){gmCierra();return true}return _navA52.apply(this,arguments)};

/* swBloq · de l82 */
var _swB82=swBloq;swBloq=function(t){if(t&&t.closest&&t.closest('[data-x="antig65"],.lote,[data-sw80]'))return true;return _swB82.apply(this,arguments)};

/* swBloq · de l88 */
var _swB88=swBloq;swBloq=function(t){if(t&&t.closest&&t.closest('[data-x="pnd86"],[data-x="dia80a"],[data-x="tar86"]'))return true;return _swB88.apply(this,arguments)};

/* ---------- ovPon70 (aplanado el 18 nov, antes en l83): una ventana no se vuelve a dibujar si no cambió ---------- */
/* ovPon70 · de l83 */
var _ovP83=ovPon70;ovPon70=function(id,html){var o=document.getElementById(id);if(o&&html&&o._h70===html)return;_ovP83.apply(this,arguments);var n=document.getElementById(id);if(n)n._h70=html};
