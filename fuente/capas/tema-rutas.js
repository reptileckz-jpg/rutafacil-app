/* ===================== TEMA · Rutas de los choferes: asignar pedidos, paradas, aplicar los cambios de Rutas, horas de llegada (aplanado el 18 nov) =====================
   Antes estaba repartido en 6 envolturas encadenadas en l62, l78, l81, l82, l85.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-camara.js. (rt81HTML NO se movió: l84 la rehace completa y sus envolturas de l81–l83 no se usan; pedAsigna va dentro de un bloque.)
   - p57Asigna: asignar un pedido a un chofer (queda anotado; si ya cerró, queda para mañana).
   - p57Stops: las paradas de un chofer (la de otro chofer va por la nube).
   - aplica81 / aplica83: aplicar los cambios de la pantalla Rutas (días fijos).
   - etas: a qué hora llega a cada cliente (con lo aprendido de cada tramo).
   ============================================================================================ */

/* etas · de l62 */
var _etas62=etas;etas=function(){var t=S.salida.ok?S.reloj:480,p=S.pos||BOD,out={},prev=null,rg=S.rg&&S.rg.f===iso(TODAY)?S.rg:null;
 (S.stops||[]).forEach(function(st){if(st.done)prev=String(st.c)});var ahora=Date.now();
 S.stops.forEach(function(st,i){if(st.done)return;var c=cl(st.c);if(!c)return;var k=String(st.c),man=null;
  if(prev)man=aprTramo(prev,k,ahora);if(man==null&&rg&&rg.legs)man=rg.legs[(prev||'yo')+'>'+k];if(man==null)man=tMin(p,c);t+=Math.round(man);
  var ci=hmin(c.hCi);out[i]={eta:t,late:!!(ci&&t>ci&&!c.conf)};var at=aprAten(k);t+=at!=null?Math.round(at):10;if(c.lat!=null)p=c;prev=k});
 var vb=prev?aprTramo(prev,'B',ahora):null;if(vb==null&&rg&&rg.legs&&prev)vb=rg.legs[prev+'>B'];out.fin=t+(vb!=null?Math.round(vb):0);return out};

/* p57Stops · de l78 */
var _p57S78=p57Stops;p57Stops=function(id){if(+id===+S.chofHoy&&!S.arOn&&S.role==='rep')return S.stops;/* desde el celular del administrador, siempre por la nube */var o=(S.chSt||{})[id];if(o)return o.stops=o.stops||[];
 /* la ruta de otro chofer: va a la nube y él la toma */
 return {_asig78:id,some:function(f){return (S.pedAsig&&S.pedAsig[id]||[]).some(function(c){return f({c:c,done:false})})},push:function(s){S.pedAsig=S.pedAsig||{};S.pedAsig[id]=(S.pedAsig[id]||[]).filter(function(x){return +x!==+s.c}).concat([s.c])},length:0,splice:function(){}}};

/* p57Asigna · de l78 */
var _pA78=p57Asigna;p57Asigna=function(c,id){var r=_pA78.apply(this,arguments);try{if(c&&c.ped)c.ped.asig78=+id}catch(e){}return r};

/* aplica81 · de l81 */
var _ap81=aplica81;aplica81=function(){S.rt81Ya=1;return _ap81.apply(this,arguments)};

/* p57Asigna · de l82 */
var _p57A82=p57Asigna;p57Asigna=function(c,id){if(MODO!=='vacio'||!cerro82(id)||S.p57&&S.p57.fz82===+id)return _p57A82.apply(this,arguments);
 if(tarde82()){pedManana82(c,id,'ya cerró y pasa de la hora límite');return 'Ya es tarde: '+chofN(id)+' cerró, así que el pedido de '+c.n+' queda para mañana'}
 /* buena hora: se le pregunta al chofer */ S.pedQ82=S.pedQ82||[];S.pedQ82.push({id:Date.now(),c:c.id,ch:+id,t:Date.now(),f:iso(TODAY),est:'pend'});S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Le preguntó a '+chofN(id)+' si puede llevar el pedido de '+c.n+' (ya cerró)'});return 'Se le preguntó a '+chofN(id)+' si puede llevarlo (ya cerró). Si no contesta en 5 min, queda para mañana.'};

/* aplica83 · de l85 */
var _ap85=aplica83;aplica83=function(dest){try{var R=S.rt81,D=(R.dias85||[]).slice().sort();if(D.length)sinD85().forEach(function(c){c.dias=D.slice();c.chofer=+dest;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Le puso días a '+c.n+' ('+D.map(function(x){return DSEM[x]}).join(', ')+') con '+chofN(dest)})});R.dias85=[]}catch(e){}return _ap85.apply(this,arguments)};
