/* ===================== v6.7 · 98: todo "falta…" te lleva al campo (rojo y se sacude) · 99: "¿Estás seguro?" en lo que no se puede deshacer ===================== */
/* también los avisos de un dato mal escrito marcan el campo donde estabas escribiendo */
var VALOR_RE=/^(Agrega al menos|Cada fruta necesita|Captura |El PIN debe|Las cajas de roatán son un número|Las rotas no pueden|Lo pagado al proveedor no puede|No traes suficiente|No hay tanto|Ya no hay tanto|Debe quedar al menos|Primero escribe|Revisa las fechas|Revisa los pesos|Revisa todos los puntos|Ya hay un vehículo con esas placas|Corrige lo que)/;
var _ultIn53=null;document.addEventListener('focusin',function(e){var t=e.target;if(t&&/INPUT|SELECT|TEXTAREA/.test(t.tagName))_ultIn53=t},true);
var _toast53=toast;toast=function(t){var r=_toast53.apply(this,arguments);try{var s=String(t||'');if(VALOR_RE.test(s)&&!FALTA_RE.test(s))setTimeout(function(){var el=window._faltaSel?document.querySelector(window._faltaSel):null;window._faltaSel=null;
 if(!el&&_ultIn53&&document.body.contains(_ultIn53)&&_ultIn53.getClientRects().length)el=_ultIn53;if(!el)el=primerVacio();if(el)marcaFalta(el)},40)}catch(e){}return r};
/* las ventanas de "¿Seguro?" siempre arriba de las tarjetas de pantalla completa */
(function(){var st=document.createElement('style');st.textContent='div[style*="z-index:88"][style*="inset:0"],div[style*="z-index:87"][style*="inset:0"]{z-index:150!important}';document.head.appendChild(st)})();
/* 99 · antes de algo que no se puede deshacer: "¿Estás seguro?" con Sí / Regresar */
var CONF53={enccancel:'Se cancela el encargo.',encquitar:'Se quita el encargo.',fijopag:'Se registra el pago y sale de la caja.',nbaccquita:'Ya no podrá entrar a la app.',nbcorte:'Se le cierra la sesión en todos sus celulares.',
 progviaje:'Se programa el viaje y se le avisa al chofer.',rquitar:'Se quita al cliente de la ruta de hoy.',tirar:'Se registra como merma y sale del inventario.',vlvender:'Se registra la venta.',vtliq:'Se registra el efectivo del viaje.',
 permok:'Se le autoriza fiarle hoy.',sacar:'El lote pasa a maduro.',vwpesdel:'Se borra esa pesada.',asidel:'Se quita esa nota.'};
setTimeout(function(){Object.keys(CONF53).forEach(function(k){CONF[k]=1})},0);
var _cfTxt53='';window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(b&&CONF53[b.dataset.act])_cfTxt53=(b.textContent||'').replace(/\s+/g,' ').trim()},true);
var _confMsg53=confMsg;confMsg=function(D){var r=_confMsg53.apply(this,arguments);if(r||!CONF53[D.act])return r;return {t:'¿Estás seguro?',m:(_cfTxt53?'«'+_cfTxt53+'». ':'')+CONF53[D.act]}};
/* y "Deshacer" en lo nuevo */
setTimeout(function(){['rcfin','rcfinsi','flt','eqok'].forEach(function(k){UNDO[k]=1})},0);
(function(){var st=document.createElement('style');st.textContent='[data-act="confno"],[data-act="confok"]{min-height:60px!important;font-size:18px!important}';document.head.appendChild(st)})();
var _rd53=render;render=function(){var r=_rd53.apply(this,arguments);try{var a=document.querySelector('[data-act="confno"]');if(a&&a.textContent!=='Regresar')a.textContent='Regresar';var o=document.querySelector('[data-act="confok"]');if(o&&o.textContent==='Sí, confirmar')o.textContent='Sí';
 var m=document.querySelector('[data-act="modalx"]');if(m&&m.textContent==='Cancelar')m.textContent='Regresar'}catch(e){}return r};
