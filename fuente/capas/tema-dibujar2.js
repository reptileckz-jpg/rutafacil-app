/* ===================== TEMA · Después de dibujar, parte 2 (aplanado el 19 nov) =====================
   Antes estaba repartido en 6 envolturas de render encadenadas en las capas l86 a l90 (después de tema-rutadia.js).
   Aquí están todas juntas, en el MISMO orden, y hacen exactamente lo mismo. Se arma justo después de l90.js.
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).
   ============================================================================================ */

/* render · de l86 */
var _rdA86=render;render=function(){try{libSync86()}catch(e){}try{if(S.dia80&&S.role==='rep'&&(!S.rutaDia80||S.rutaDia80===iso(TODAY)||(S.cierre&&S.cierre.sent)))S.dia80=null}catch(e){}return _rdA86.apply(this,arguments)};

/* render · de l86 */
var _rdB86=render;render=function(){var y0=window.scrollY,t0=Date.now(),tb=S.role+'|'+(S.tab&&S.tab[S.role]);var r=_rdB86.apply(this,arguments);try{tarasCard86();pendCard86()}catch(e){console.error('l86',e)}
 try{if(S.role+'|'+(S.tab&&S.tab[S.role])===tb&&!(typeof ANC82!=='undefined'&&ANC82.t>=t0)&&y0>0&&Math.abs(window.scrollY-y0)>2){var k=ANC82.t;window.scrollTo(0,y0);ANC82.t=k}}catch(e){}return r};

/* render · de l87 */
var _rd87=render;render=function(){try{avChofer87();limpiaCierre87()}catch(e){console.error('l87',e)}var r=_rd87.apply(this,arguments);try{cierreAdm87()}catch(e){console.error('l87b',e)}return r};

/* render · de l88 */
var _rd88=render;render=function(){try{ordena88()}catch(e){console.error('l88',e)}var r=_rd88.apply(this,arguments);try{fichaFalla88()}catch(e){console.error('l88b',e)}return r};

/* render · de l89 */
var _rd89=render;render=function(){try{ubArregla89();odo89()}catch(e){console.error('l89',e)}var r=_rd89.apply(this,arguments);try{ubDup89();hola89();rep1Fit89()}catch(e){console.error('l89b',e)}return r};

/* render · de l90 */
var _rd90=render;render=function(){try{vehIds90();vehAuto90();arStToma90();arCuenta90();arTut90()}catch(e){console.error('l90',e)}var r=_rd90.apply(this,arguments);
 try{arArriba90();arLimpia90();vehOcupados90();vehSel90();ovPon70('av90',av90HTML())}catch(e){console.error('l90b',e)}return r};
