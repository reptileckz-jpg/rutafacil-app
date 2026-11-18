/* ===================== TEMA · Cajas y caja de dinero: dónde están las cajas, cuántas debería haber, efectivo esperado (aplanado el 18 nov) =====================
   Antes estaba repartido en 7 envolturas encadenadas en l5, l13, l28, l41, l76, l82.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-navega.js. TOCA MERCANCÍA Y DINERO: solo se movió de lugar, las cuentas son las mismas (pruebas/comp-cajas.js).
   - cajasDonde: dónde están las cajas (bodega, camión, vacías en el camión, cierres sin contar, otras rutas).
   - cajasEsperadas: cuántas debería haber (también resta las rotas de las otras rutas).
   - cajaEsp: el efectivo que debería haber en caja (movimientos del banco, recargas de TAG).
   - cajaAyerPend: si falta contar la caja de ayer.
   Ojo: S.cajasT0 se fija al cargar en l5 con cajasDonde(); eso pasa ANTES de todas estas envolturas, igual que antes.
   ============================================================================================ */

/* cajasDonde · de l5 */
var _cdK=cajasDonde;cajasDonde=function(){var w=_cdK.apply(this,arguments),v=S.cierre&&!S.cierre.sent?sum(S.log,function(l){return num(l.V)-num(l.Vr)})+sum((S.cambios||[]).filter(function(x){return !x.dev}),function(x){return num(x.R)}):0;w.camV=v;w.tot+=v;return w};

/* cajasDonde · de l13 */
var _cdD13=cajasDonde;cajasDonde=function(){var w=_cdD13.apply(this,arguments);if(regPend()){var r=S.cierre.res,ll=Math.max(0,num(r.reg)),vv=Math.max(0,num(r.V));/* 121 · sin el dato ya no da NaN ("Total NaN") */w.cam+=ll;w.camV=(w.camV||0)+vv;w.tot+=ll+vv;w.sinC=ll+vv}return w};

/* cajasDonde · de l28 */
var _cd28=cajasDonde;cajasDonde=function(){var w=_cd28.apply(this,arguments);try{rutasOtras().forEach(function(o){var cam=num(o.invR),v=0,ll=0,vv=0,c=o.cierre;if(c&&!c.sent)v=sum(o.log||[],function(l){return num(l.V)-num(l.Vr)});
 if(c&&c.sent&&c.res&&!o.recep&&c.porContar){ll=Math.max(0,num(c.res.reg));vv=Math.max(0,num(c.res.V))}w.cam+=cam+ll;w.camV=(w.camV||0)+v+vv;w.tot+=cam+v+ll+vv})}catch(e){}return w};

/* cajasEsperadas · de l28 */
var _ce28=cajasEsperadas;cajasEsperadas=function(){var x=_ce28.apply(this,arguments);try{rutasOtras().forEach(function(o){if(o.cierre&&!o.cierre.sent)x-=sum(o.log||[],function(l){return num(l.Vr)})})}catch(e){}return x};

/* cajaEsp · de l41 */
var _cE41=cajaEsp;cajaEsp=function(){return _cE41.apply(this,arguments)+sum((S.bancoMov||[]).filter(function(x){return x.t==='Retiro a la caja'}),function(x){return -num(x.m)})};

/* cajaEsp · de l76 */
var _cE76=cajaEsp;cajaEsp=function(){return _cE76.apply(this,arguments)-tagRecCaja()};

/* cajaAyerPend · de l82 */
var _cAP82=cajaAyerPend;cajaAyerPend=function(){if(_cAP82.apply(this,arguments)===false)return false;try{var y=ayerIso();if(sinMov82(y)){S.sinTrabajo=(S.sinTrabajo||[]).concat([y]).filter(function(x,i,a){return a.indexOf(x)===i});S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:'App',x:'El '+fmtF(y)+' no hubo movimientos: no se pide cierre de caja'});return false}}catch(e){}return true};
