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

/* 163 · Ricardo: "en la lista de verificación del vehículo, cada que pongo una opción (llantas, luces…) la pantalla se sube sola; pareciera que
   se redibuja, como que brinca". Las ventanas que van encima de la app (revisión del vehículo y otras) se vuelven a crear cuando cambia algo:
   el desplazamiento regresaba hasta arriba y lo que estaba abierto se cerraba. Ahora, al volver a crearla, se queda donde ibas (la ventana y lo
   que se desplaza adentro) y lo abierto sigue abierto. Si la ventana cambia de página (otra cosa adentro), igual se queda en su lugar. */
var _ovP163=ovPon70;ovPon70=function(id,html){var o=document.getElementById(id),sv=null;
 try{if(o&&html&&o._h70!==html){sv={t:o.scrollTop,inner:[],det:[]};var A=o.querySelectorAll('*');for(var i=0;i<A.length;i++){if(A[i].scrollTop>0)sv.inner.push([i,A[i].scrollTop])}
  Array.prototype.forEach.call(o.querySelectorAll('details'),function(d){sv.det.push(d.open)})}}catch(e){sv=null}
 var r=_ovP163.apply(this,arguments);
 try{var n=document.getElementById(id);if(n&&sv&&n!==o){var B=n.querySelectorAll('*');sv.inner.forEach(function(q){if(B[q[0]])B[q[0]].scrollTop=q[1]});n.scrollTop=sv.t;
  var D=n.querySelectorAll('details');sv.det.forEach(function(op,i){if(op&&D[i]&&!D[i].hasAttribute('data-k'))D[i].open=true})}}catch(e){}
 return r};
