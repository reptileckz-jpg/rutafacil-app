/* ===================== TEMA · Avisos que salen abajo (toast) (aplanado el 19 nov) =====================
   Antes estaba repartido en 9 envolturas encadenadas en l13, l19, l25, l45, l46, l53, l69, l90.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma al final (antes de tema-version.js).
   - Sin señal / volvió la señal; mayoreo que no se le puede dar; "no cuadra" solo para admin y contador y en cola si hay un aviso
     bloqueante; el aviso de cajas en palabras claras; marcar lo que falta; textos de la demo; valores raros; "Algo no cuadra" con su
     explicación; textos del modo "a repartir".
   ============================================================================================ */

/* toast · de l13 */
var _toast13=toast;toast=function(t){if(typeof t==='string'){if(/^Sin señal: lo que captures/.test(t)){render();return}else if(/^Volvió la señal/.test(t))t='Volvió la conexión · ya se mandó todo'}return _toast13.call(this,t)};

/* toast · de l19 */
var _tst19=toast;toast=function(t){if(typeof t==='string'&&/no se le da mayoreo \(lo decidió el administrador\)/.test(t)){var c=curCli();if(c&&c.mayRev)t='A '+c.n+' no se le puede dar mayoreo: está en revisión del administrador'}return _tst19.call(this,t)};

/* toast · de l25 */
var _t25=toast;toast=function(t){if(/no cuadra/.test(t||'')&&['admin','cont'].indexOf(S.role)<0)return;if(avisoBloq(t)){if(t&&_toastQ.indexOf(t)<0)_toastQ.push(t);return}return _t25.apply(this,arguments)};

/* toast · de l25 */
var _tq25=toast;toast=function(t){var m=/^⚠ Algo no cuadra: Todas las cajas están contadas/.test(t||'');if(m){try{var x=cuentasRevisar().filter(function(y){return y.n==='Todas las cajas están contadas'})[0];if(x&&x.det)t='⚠ Las cajas no cuadran. '+x.det+'. Revísalo en Estadísticas.'}catch(e){}}return _tq25.call(this,t)};

/* toast · de l45 */
var _toast45=toast;toast=function(t){var r=_toast45.apply(this,arguments);try{if(FALTA_RE.test(String(t||'')))setTimeout(function(){marcaFalta(primerVacio())},40)}catch(e){}return r};

/* toast · de l46 */
var _toast46=toast;toast=function(t){if(typeof MODO!=='undefined'&&MODO==='vacio'&&typeof t==='string'){TXT_DEMO.forEach(function(r){t=t.replace(r[0],r[1])})}return _toast46.call(this,t)};

/* toast · de l53 */
var _toast53=toast;toast=function(t){var r=_toast53.apply(this,arguments);try{var s=String(t||'');if(VALOR_RE.test(s)&&!FALTA_RE.test(s))setTimeout(function(){var el=window._faltaSel?document.querySelector(window._faltaSel):null;window._faltaSel=null;
 if(!el&&_ultIn53&&document.body.contains(_ultIn53)&&_ultIn53.getClientRects().length)el=_ultIn53;if(!el)el=primerVacio();if(el)marcaFalta(el)},40)}catch(e){}return r};

/* toast · de l69 */
var _tq69=toast;toast=function(t){try{var m=/^⚠ Algo no cuadra: ([^.]+)\. Revísalo en Estadísticas\.$/.exec(t||'');if(m){var x=cuentasRevisar().filter(function(y){return !y.ok&&y.n===m[1]})[0];if(x&&x.det)t='⚠ '+x.n+'. '+x.det+'.'}}catch(e){}return _tq69.call(this,t)};

/* toast · de l90 */
var _toast90=toast;toast=function(t){try{if(S.arOn&&S.role==='rep'&&typeof t==='string')t=arTxt90(t)}catch(e){}return _toast90.apply(this,[t].concat([].slice.call(arguments,1)))};
