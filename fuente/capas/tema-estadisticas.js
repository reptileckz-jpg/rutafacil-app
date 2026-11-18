/* ===================== TEMA · Estadísticas, rankings, cuadre del día archivado, gastos fijos y desgaste por ruta (aplanado el 18 nov) =====================
   Antes estaba repartido en 7 envolturas encadenadas en l8, l74, l82.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-rutas.js. TOCA NÚMEROS (gastos fijos, desgaste): solo se movió, las cuentas son las mismas (pruebas/comp-estad.js).
   - estadisticas: sin historial lo dice; en la real sin "datos de ejemplo".
   - rankingHTML: en la real, lo que de verdad compró cada cliente en 30 días.
   - cuadre82: el día sin movimientos no pide cuadre.
   - fijoMes: los gastos fijos del mes sin el "retiro del dueño".
   - rep68 / desg: el desgaste del vehículo por ruta (estimado con km si no hay rutas).
   ============================================================================================ */

/* estadisticas · de l8 */
var _estL8=estadisticas;estadisticas=function(){if(HIST.length)return _estL8.apply(this,arguments);return '<h1>Estadísticas</h1><div class="card"><b>Todavía no hay historial</b><div class="lbl" style="margin-top:6px">Las ventas, ganancias, gastos y rankings aparecen aquí cuando empiecen a registrarse días de trabajo. En la app final se guardan día con día.</div></div>'+cuentasHTML()};

/* rep68 · de l74 */
var _rep74=rep68;rep68=function(dias){var o=_rep74.apply(this,arguments);if(o.rutas)return o;try{var vh=vehRep74(),km=num(S.cfg.kmRuta)||40,cj=num(S.cfg.cajRuta)||num(vh&&vh.capC)||40,kg=num(S.cfg.kgRuta)||150,d=km*tasa68(vh),kc=o.kc||20,wR=cj*kc,wM=kg,w=wR+wM;
  o.est=true;o.desg=d;o.estKm=km;o.caja=w?d*wR/w/cj:0;o.kgc=w?d*wM/w/kg:0}catch(e){}return o};

/* desg · de l74 */
var _desg74=desg;desg=function(c,k){var h=_desg74.apply(this,arguments);if(typeof h!=='string')return h;var rp=rep68(30);
 h=h.replace(/Desgaste del vehículo \(/g,'Desgaste al ir por la fruta (');
 if(rp.est){h=h.replace('+ Repartirla <span class="lbl">(sin rutas cerradas todavía)</span>','+ Repartirla: desgaste de la camioneta <span class="lbl">(estimado: '+rp.estKm+' km de ruta; sale real al cerrar rutas)</span>').replace('>+ Repartirlo<','>+ Repartirlo: desgaste de la camioneta <span class="lbl">(estimado)</span><')}
 else h=h.replace('>+ Repartirla<','>+ Repartirla <span class="lbl">(combustible, gastos, desgaste y sueldo de las rutas)</span><');return h};

/* estadisticas · de l82 */
var _est82=estadisticas;estadisticas=function(){var h=_est82.apply(this,arguments);if(MODO==='vacio')h=String(h).replace('Datos de ejemplo hasta ayer. Lo de hoy se suma al cerrar el día.','Con lo que se registra en la app (rutas, venta en bodega, gastos y mermas). Lo de hoy se va sumando.');if(MODO==='vacio')h=String(h).replace(' En la app final se guardan día con día.',' Se guardan solos, día con día.');return h};

/* rankingHTML · de l82 */
var _rk82=rankingHTML;rankingHTML=function(){if(MODO!=='vacio')return _rk82.apply(this,arguments);var d0=iso(new Date(TODAY.getTime()-30*864e5)),T={},keep={};
 Object.keys(HIST.reduce(function(o,r){o[r.d]=1;return o},{})).forEach(function(d){if(d<d0)return;rutasDia82(d).forEach(function(r){(r.log||[]).forEach(function(l){if(l&&!l.anul)T[l.c]=(T[l.c]||0)+num(l.total)})})});
 S.cli.forEach(function(c){keep[c.id]=c.c30;c.c30=Math.round(T[c.id]||0)});try{return _rk82.apply(this,arguments)}finally{S.cli.forEach(function(c){c.c30=keep[c.id]})}};

/* fijoMes · de l82 */
var _fm82=fijoMes;fijoMes=function(){var keep=S.fijos;try{S.fijos=(keep||[]).filter(function(f){return !f.retiro});return _fm82.apply(this,arguments)}finally{S.fijos=keep}};

/* cuadre82 · de l82 */
var _cu82=cuadre82;cuadre82=function(d){var F=_cu82.apply(this,arguments);try{if(sinMov82(d))F.forEach(function(o){o.e='ok';o.L=['Día sin movimientos.']})}catch(e){}return F};
