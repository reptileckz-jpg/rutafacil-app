/* ===================== TEMA · 60 días de detalle y resúmenes para siempre (nació como tema, 18 nov · punto 122) =====================
   Ricardo: "mientras se guarden los totales de ventas, gastos y netos por mes y año está bien; las rutas se pueden borrar después de
   uno o dos meses; con 60 días de rutas es suficiente". Y la nube no acepta documentos de más de 1 MB (el historial de rutas va en uno).
   Cómo queda (blindaje de los números):
   - Solo el celular del ADMIN, una vez al día, hace esto (el chofer nunca borra nada; antes cualquier celular recortaba a 400 rutas).
   - 1º se guarda el RESUMEN de cada día (S.resDia[día]: la fila de Estadísticas y el Cuadre en números) — para siempre.
     Los días de los últimos 60 se recalculan cada día (por si llegó algo tarde); los de antes no se vuelven a tocar.
   - 2º se quita el detalle de más de 60 días (rutas, cierres recibidos, gastos, abonos en bodega, venta en bodega, mermas) y,
     EN LA MISMA LISTA (mismo documento de la nube = se guarda todo junto o nada), se agrega un registro "arrastre" con lo que
     ese detalle sumaba a la caja. Así el efectivo en caja NO cambia ni un centavo. El arrastre tiene una llave fija por día y lista:
     si dos celulares de admin lo hacen el mismo día, queda uno solo (no se cuenta doble).
   - Los gastos del vehículo se quedan 400 días (el desgaste real se calcula con 12 meses).
   - Estadísticas, el Cuadre (día, semana, mes, año) y los totales por mes y año usan el resumen guardado en los días sin detalle.
   Si se cambia algo de esto, se cambia AQUÍ.
   ============================================================================================ */
var RET122=60,RETV122=400;
try{if(typeof NB_SH!=='undefined'&&NB_SH.indexOf('resDia')<0)NB_SH.push('resDia')}catch(e){}
function resD122(){if(!S.resDia||typeof S.resDia!=='object'||Array.isArray(S.resDia))S.resDia={};return S.resDia}
function hasta122(){var h=S.resDia&&S.resDia._hasta;return /^\d{4}-\d\d-\d\d$/.test(h||'')?h:''}
function corte122(n){return addD121(iso(TODAY),-(n||RET122))}
function fGasto122(g){return g&&(g.f||g.f82)}
function esVeh122(g){return !!(g&&(g.veh!=null||MANT121.test(String(g.t||''))||/^verificaci|mensualidad de veh|abono a capital de veh|casetas \(tag\)/i.test(String(g.t||''))))}
/* ---------- el resumen de un día (solo números) ---------- */
var _cuR122=cuadreDia121,_h82R122=hist82;
function resumen122(d){var row=null;try{row=_h82R122().filter(function(r){return r.d===d})[0]||null}catch(e){}var T=null;try{T=_cuR122(d)}catch(e){T=null}if(!row&&!T)return null;
 var cu=T?{venta:T.venta,contado:T.contado,cred:T.cred,ab:T.ab,abB:T.abB,R:T.R,M:T.M,gan:T.gan,op:T.op,mant:T.mant,desg:T.desg,km:T.km,suT:T.suT,comT:T.comT,merma:T.merma,neto:T.neto,deb:T.deb,ent:T.ent,rec:T.rec,cierres:T.cierres,cat:T.cat,loc:T.loc,sinCosto:!!T.sinCosto,
  ch:T.ch.map(function(o){return {ch:o.ch,n:o.n,venta:r2(o.venta),cred:r2(o.cred),ab:r2(o.ab),R:o.R,M:r2(o.M),gan:r2(o.gan),gasT:r2(o.gasT),desg:r2(o.desg),km:o.km,sueldo:r2(o.sueldo||0),com:r2(o.com||0),neto:r2(o.neto),deb:r2(o.deb),ent:r2(o.ent),rec:r2(o.rec),cierres:o.partes.filter(function(p){return p.sent||p.parcial}).length}}),
  su:T.su.map(function(s){return {ch:s.ch,n:s.n,s:s.s,com:s.com,vac:!!s.vac}})}:null;
 return {v:1,t:Date.now(),h:row,cu:cu}}
function hayDatos122(T){return T&&(T.venta||T.op||T.suT||T.cierres||T.merma||T.ab||T.mant)}
/* el Cuadre de un día sin detalle sale de su resumen */
cuadreDia121=function(d){var h=hasta122(),st=S.resDia&&S.resDia[d];if(h&&d<=h&&st&&st.cu)return cuExpande122(st.cu,d);return _cuR122(d)};
function cuExpande122(c,d){var T=JSON.parse(JSON.stringify(c));T.d=d;T.resumen=true;T.caja=[];T.loc=T.loc||{venta:0,gan:0,n:0};T.cat=T.cat||{};T.su=T.su||[];T.ch=(T.ch||[]).map(function(o){o.partes=[];o.creditos=[];o.abonos=[];o.taras=[];o.gastos=[];o.veh={};return o});return T}
/* Estadísticas: los días sin detalle usan su fila guardada */
hist82=function(){var L=_h82R122(),h=hasta122(),R=S.resDia||{};if(!h)return L;var out=L.filter(function(r){return !(r.d<=h&&R[r.d]&&R[r.d].h)}),ya={};out.forEach(function(r){ya[r.d]=1});
 Object.keys(R).forEach(function(d){if(d<=h&&R[d]&&R[d].h&&!ya[d])out.push(R[d].h)});return out.sort(function(a,b){return a.d<b.d?-1:1})};

/* ---------- lo que se quita y su arrastre (en la misma lista) ---------- */
function arr122(L,id,o){if(!L.some(function(x){return x&&x.id===id})){o.id=id;o.arr122=1;L.push(o)}}
function poda122(){var hoy=iso(TODAY),cut=corte122(),cutV=corte122(RETV122),R=resD122(),dias={};
 var marca=function(d){if(/^\d{4}-\d\d-\d\d$/.test(d||'')&&d<hoy)dias[d]=1};
 (S.rutasHist||[]).forEach(function(e){marca(e&&e.f)});(S.gastos||[]).forEach(function(g){marca(fGasto122(g))});(S.cobros||[]).forEach(function(x){marca(x&&x.f)});(S.vlVentas||[]).forEach(function(v){marca(v&&v.f82)});(S.mermas||[]).forEach(function(m){marca(m&&m.fecha)});(S.cierresPrev||[]).forEach(function(x){marca(x&&x.f)});
 var D=Object.keys(dias).sort();
 /* 1 · los resúmenes: los últimos 60 días se recalculan; los de antes solo si no existen (nunca con menos datos) */
 D.forEach(function(d){if(d<cut&&R[d]&&R[d].cu)return;var x=resumen122(d);if(x)R[d]=x});
 /* 2 · el detalle de más de 60 días se quita, con su arrastre a la caja en la misma lista */
 var viejos=D.filter(function(d){return d<cut&&R[d]});if(!viejos.length)return 0;var n=0;
 viejos.forEach(function(d){
  /* rutas: la caja contaba lo recibido del cierre final de cada chofer (las partes y los atrasados van en cierresPrev) */
  var RH=S.rutasHist||[],vis={},rec=0;RH.forEach(function(e){if(!e||e.f!==d||e.parcial120||e.recibido94||!e.cierreReg82)return;if(vis[e.ch])return;vis[e.ch]=1;rec+=num(e.cierreReg82.rec)});
  var antes=RH.length;S.rutasHist=RH.filter(function(e){return !(e&&e.f===d)});if(S.rutasHist.length<antes){n+=antes-S.rutasHist.length;if(rec)arr122(S.rutasHist,'arr122r_'+d,{rec:r2(rec),fa:d})}
  /* cierres recibidos (los que no se han recuperado se quedan) */
  var CP=S.cierresPrev||[],q=CP.filter(function(x){return x&&x.f===d&&x.ch!=null&&!x.arr122});if(q.length){var rc=r2(sum(q,function(x){return num(x.rec)}));S.cierresPrev=CP.filter(function(x){return q.indexOf(x)<0});n+=q.length;if(rc)arr122(S.cierresPrev,'arr122c_'+d,{rec:rc,ch:0,fa:d})}
  /* gastos (los del vehículo se quedan 400 días) */
  var G=S.gastos||[],qg=G.filter(function(g){return g&&!g.arr122&&fGasto122(g)===d&&(!esVeh122(g)||d<cutV)});if(qg.length){var mg=r2(sum(qg.filter(function(g){return g.caja!==false}),function(g){return num(g.m)}));S.gastos=G.filter(function(g){return qg.indexOf(g)<0});n+=qg.length;if(mg)arr122(S.gastos,'arr122g_'+d,{t:'Saldo de gastos anteriores',m:mg,caja:true,f:'arr',n:'Gastos del '+d+' (resumidos)',fa:d})}
  /* abonos cobrados en bodega */
  var C=S.cobros||[],qc=C.filter(function(x){return x&&!x.arr122&&x.f===d});if(qc.length){var mc=r2(sum(qc,function(x){return num(x.m)}));S.cobros=C.filter(function(x){return qc.indexOf(x)<0});n+=qc.length;if(mc)arr122(S.cobros,'arr122b_'+d,{c:-1,m:mc,f:'arr',n:'Abonos del '+d+' (resumidos)',fa:d})}
  /* venta en bodega y mermas: no mueven la caja (la venta entra con su corte en los abonos) */
  var nv=(S.vlVentas||[]).length;S.vlVentas=(S.vlVentas||[]).filter(function(v){return !(v&&v.f82===d)});n+=nv-S.vlVentas.length;
  var nm=(S.mermas||[]).length;S.mermas=(S.mermas||[]).filter(function(m){return !(m&&m.fecha===d)});n+=nm-S.mermas.length});
 var h0=hasta122(),hn=addD121(cut,-1);if(!h0||hn>h0)R._hasta=hn;
 /* la bitácora no tiene fecha de verdad: se quedan los últimos 3,000 renglones */
 if((S.hist||[]).length>3000){n+=S.hist.length-3000;S.hist=S.hist.slice(-3000)}
 return n}
function ret122(){try{if(S.role!=='admin'||S.encOn)return;if(typeof NB!=='undefined'&&NB.on&&!NB.listo)return;var hoy=iso(TODAY);if(S._ret122===hoy)return;S._ret122=hoy;var n=poda122();if(n)S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:'La app',x:'Se guardó el resumen de los días de hace más de '+RET122+' días y se quitó su detalle ('+n+' renglones). La caja y los totales no cambian.'})}catch(e){console.error('ret122',e)}}
var _r122=render;render=function(){ret122();return _r122.apply(this,arguments)};
/* la caja cuenta también los arrastres de las rutas que ya se quitaron */
var _cC122=cierresCaja;cierresCaja=function(){return r2(_cC122.apply(this,arguments)+sum((S.rutasHist||[]).filter(function(e){return e&&e.arr122}),function(e){return num(e.rec)}))};

/* ---------- 122 · cada venta guarda el nombre del cliente de ese momento y su propio número (registro con id único) ---------- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="guardar"]');if(!b||S.role!=='rep')return;var n0=(S.log||[]).length;
 setTimeout(function(){try{if((S.log||[]).length<=n0)return;var l=S.log[S.log.length-1];if(!l)return;var c=cl(l.c);if(c&&l.cn==null)l.cn=c.n;if(l.id==null)l.id='e'+Date.now().toString(36)+'_'+S.chofHoy+'_'+Math.random().toString(36).slice(2,6)}catch(er){}},0)},true);
