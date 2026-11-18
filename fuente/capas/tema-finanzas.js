/* ===================== TEMA · Finanzas de verdad: nada de la demo (nació como tema, 18 nov · punto 120) =====================
   En la versión real se habían quedado números fijos de la demo dentro de las cuentas:
   ingresos de hoy +$9,800 (también en la semana y el mes), gastos de hoy +$1,850, gastos de la semana +$7,300 y del mes +$29,800,
   y la verificación siempre $493. Además "ingresos de hoy" solo veía la ruta abierta del celular del admin y los abonos de siempre.
   Ahora todo sale de lo que se registra, por día:
   - Ingresos (dinero que entró) = lo cobrado en TODAS las rutas del día (cada chofer y cada cierre: contado + abonos)
     + abonos cobrados en bodega (S.cobros con fecha) + venta local del día.
   - Gastos = los gastos del día (S.gastos con fecha; sin "Retiro del dueño") + lo que los choferes gastaron en su ruta y no han cerrado.
   - Semana (desde el lunes) y mes: la suma de cada día.
   También: el celular del chofer ya no intenta cambiar los Ajustes (la nube no lo deja y salía "Missing or insufficient permissions").
   Si se cambia algo de esto, se cambia AQUÍ y en las líneas 120 de ql.py.
   ============================================================================================ */
function d120(d){return /^\d{4}-\d\d-\d\d$/.test(String(d||''))}
/* los abonos cobrados en bodega llevan fecha desde hoy (los de antes no tenían; quedan "sin fecha") */
function cobFechas120(){if(typeof NB!=='undefined'&&NB.on&&!NB.listo)return;var h=iso(TODAY),v1=!S.f120ini;(S.cobros||[]).forEach(function(x){if(x&&!x.f)x.f=v1?'?':h});if(v1)S.f120ini=h}
function ingDia120(d){var P=[],ruta=0;try{rutasDia120(d).forEach(function(x){var m=cobPart120(x);if(m>0.005||x.sent||x.parcial)P.push({ch:x.ch,n:x.n,m:m,resc:x.resc});ruta+=m})}catch(e){console.error('ing120',e)}
 var bod=r2(sum((S.cobros||[]).filter(function(x){return x&&x.f===d&&+x.c!==0&&x.n!=='viaje'&&x.n!=='Venta local'}),function(x){return num(x.m)})),
  loc=r2(sum((S.vlVentas||[]).filter(function(v){return v&&v.f82===d}),function(v){return num(v.tot)}));
 ruta=r2(ruta);return {d:d,ruta:ruta,partes:P,bod:bod,loc:loc,tot:r2(ruta+bod+loc)}}
function gasDia120(d){var G=(S.gastos||[]).filter(function(g){return g&&(g.f||g.f82)===d&&!/^Retiro del due/i.test(String(g.t||''))}),t=sum(G,function(g){return num(g.m)}),ab=0;
 /* lo que gastan los choferes en su ruta y todavía no cierran (al cerrar pasa a S.gastos) */
 if(d===iso(TODAY)){try{rutaIds120().forEach(function(id){var r=rutaViva120(id);if(!r||(r.cierre&&r.cierre.sent)||(r.rutaDia80&&r.rutaDia80!==d))return;ab+=sum(r.gch||[],function(g){return num(g.m)})+sum(r.recs||[],function(x){return num(x.total)})})}catch(e){}}
 return {d:d,G:G,abiertas:r2(ab),tot:r2(t+ab)}}
function diasDesde120(d0){var L=[],h=iso(TODAY),d=d0,i=0;while(d<=h&&i<400){L.push(d);var x=dOf(d);x.setDate(x.getDate()+1);d=iso(x);i++}return L}
function sumaDias120(f,d0){return r2(sum(diasDesde120(d0),function(d){return f(d).tot}))}
function ingPanel120(){var hoy=iso(TODAY),k=ingDia120(hoy);
 return '<b>Ingresos</b><div class="lbl">El dinero que entró: lo cobrado en las rutas (contado y abonos), los abonos en bodega y la venta local.</div>'
  +rw('<b>Hoy</b>','<b>'+money(k.tot)+'</b>')
  +k.partes.map(function(p){return rw('&nbsp;&nbsp;'+esc(chofN(p.ch))+' · cierre '+p.n+(p.resc?' (recuperado)':''),money(p.m))}).join('')
  +(k.partes.length?'':rw('&nbsp;&nbsp;Cobrado en ruta',money(0)))
  +rw('&nbsp;&nbsp;Abonos cobrados en bodega',money(k.bod))+rw('&nbsp;&nbsp;Venta local',money(k.loc))
  +rw('Esta semana (desde el lunes)',money(sumaDias120(ingDia120,mondayIso(TODAY))))+rw('Este mes',money(sumaDias120(ingDia120,hoy.slice(0,8)+'01')))
  +'<button class="btn sm sec" style="margin-top:8px" data-act="cie120ver">📋 Ver los cierres de hoy</button>'}
function gasPanel120(){var hoy=iso(TODAY),k=gasDia120(hoy);
 return '<b>Gastos</b>'+rw('<b>Hoy</b>','<b>'+money(k.tot)+'</b>')+gasFilas120(k)
  +rw('Esta semana (desde el lunes)',money(sumaDias120(gasDia120,mondayIso(TODAY))))+rw('Este mes',money(sumaDias120(gasDia120,hoy.slice(0,8)+'01')))}
function gasFilas120(k){return k.G.map(function(g){return rw('&nbsp;&nbsp;'+esc(g.t||'Gasto')+(g.n?' · '+esc(g.n):''),money(num(g.m)))}).join('')+(k.abiertas?rw('&nbsp;&nbsp;Gastos de ruta sin cerrar',money(k.abiertas)):'')+(!k.G.length&&!k.abiertas?'<div class="lbl">Sin gastos.</div>':'')}
function gasLista120(d){var k=gasDia120(d);return gasFilas120(k)+rw('<b>Total</b>','<b>'+money(k.tot)+'</b>')}
/* verificación: lo que dice el vehículo (lo que pagas al año) o se pregunta; antes siempre $493 */
function verifCosto120(v){var a=num(v&&v.anual&&v.anual.verif);if(a>0)return a;var r=null;try{r=prompt('¿Cuánto costó la verificación de '+(v?v.n:'')+'? $','')}catch(e){r=null}if(r==null){toast('Verificación registrada sin gasto');return null}var m=num(String(r).replace(/[^\d.]/g,''));return m>0?m:null}
var _r120f=render;render=function(){try{cobFechas120()}catch(e){}return _r120f.apply(this,arguments)};

/* ---------- el celular del chofer ya no cambia los Ajustes ---------- */
/* crCfg() rellenaba en S.cfg los límites vacíos (y la nube rechazaba el cambio): en un celular que no es del admin regresa una copia */
var _crCfg120=crCfg;crCfg=function(){if(S.role==='admin'||S.role==='cont')return _crCfg120.apply(this,arguments);var c=S.cfg||{},o={};Object.keys(c).forEach(function(k){o[k]=c[k]});Object.keys(CR_DEF).forEach(function(k){if(o[k]==null||o[k]==='')o[k]=CR_DEF[k]});return o};
if(typeof crCfg2==='function'){var _crCfg2120=crCfg2;crCfg2=function(){if(S.role==='admin'||S.role==='cont')return _crCfg2120.apply(this,arguments);var o=crCfg();if(o.mayBaja==null||o.mayBaja==='')o.mayBaja='30';return o}}
/* lo que solo el administrador puede guardar en la nube (firestore.rules): el celular del chofer no lo intenta */
var SOLO_ADM120=['precio','cfg','pagosSueldo','adelantos','bonos','fijos','metaMes','mesCerr','reglas','vehAsig','admins','bods','mayP','mayMin','cajaBase','aportes','porPagar','pagoPide','enc','vac','bienes','fijosPag','cliBase','vacPlan','fac76'];
function nbSoloAdm120(u){try{if(!u||u.ruta!=null||SOLO_ADM120.indexOf(u.k)<0)return false;var p=NB.perfil||{};if(p.rol==='admin'||p.rol==='cont')return false;return !(num(p.encHasta)>Date.now())}catch(e){return false}}

/* ---------- 120 · estimaciones con datos reales (antes: $1,500 de combustible, $150 por parada, $300 extra, 150 km al proveedor, $24 el litro) ---------- */
/* el efectivo que se le da al chofer para el viaje: combustible con el rendimiento real + lo que se ha gastado en viajes reales (casetas, comida, otros) */
function vjPromGastos120(){var L=(S.cargas||[]).filter(function(c){return c&&c.t&&(num(c.t.diesel)||num(c.t.comida)||num(c.t.casetas)||num(c.t.extra))}).slice(-5);if(!L.length)return {comb:0,otros:0,n:0};
 return {comb:sum(L,function(c){return num(c.t.diesel)})/L.length,otros:sum(L,function(c){return num(c.t.comida)+num(c.t.casetas)+num(c.t.extra)})/L.length,n:L.length}}
vwGastoEst=function(){var v=S.vw||{},vh=S.veh.filter(function(x){return x.id===+v.veh})[0]||vehHoy(),ri=rendInfo(vh),km=vwKmEst(v),P=vjPromGastos120();
 var comb=ri.rend&&num(vh&&vh.precio)>0&&km>0?km/ri.rend*num(vh.precio):P.comb;return Math.round(comb+P.otros)};
/* km al proveedor: si no se sabe, se pregunta (no se inventan 150 km) */
if(typeof kmProvs68==='function')kmProvs68=function(P){var km=0,falta=false;(P||[]).forEach(function(p){var d=null;try{d=provD(p)}catch(e){}if(!(num(d&&d.km)>0))falta=true;km=Math.max(km,num(d&&d.km))});return falta||!km?'':Math.round(km*2+40*Math.max(0,(P||[]).length-1))};
var _cN120=combNormal;combNormal=function(provs,vh){var P=(provs||[]).filter(function(x,i,a){return x&&a.indexOf(x)===i}),key=P.slice().sort().join('|'),pr=num(vh&&vh.precio),
  L=(S.vjHist||[]).filter(function(x){return provsDe(x.par)===key&&(!vh||x.veh===vh.n)&&(num(x.lit)||(pr&&num(x.comb)))}).slice(0,3);
 if(L.length)return{lit:Math.round(sum(L,function(x){return num(x.lit)||num(x.comb)/pr})/L.length),n:L.length,pr:pr,P:P};
 var ri=vh?rendInfo(vh):{rend:0},km=0,falta=false;P.forEach(function(p){var k=num(provD(p).km);if(!(k>0))falta=true;km=Math.max(km,k)});if(falta||!km)return{lit:0,n:0,pr:pr,km:0,P:P};
 km=km*2+40*Math.max(0,P.length-1);return{lit:ri.rend?Math.round(km/ri.rend):0,n:0,pr:pr,km:km,P:P}};
/* simulador de vehículos: en la app real empieza vacío (antes traía $525,000, $20,000 de anticipo, "NP300 nueva"…) */
if(typeof simNuevo==='function'){var _simN120=simNuevo;simNuevo=function(vid){var r=_simN120.apply(this,arguments);try{if(window.PN_MODO==='vacio'&&S.sim){var s=S.sim;['nuevo','inst','carrN','eng','tasa','plazo','prest','abono','anios','carrAnt','nomN'].forEach(function(k){s[k]=''})}}catch(e){}return r}}

/* ---------- 120 · errores de "Problemas reportados" ---------- */
/* listas que llegaban vacías de la nube ("Cannot read properties of undefined (reading 'forEach')") */
var LISTAS120=(function(){var L=[];try{Object.keys(S).forEach(function(k){if(Array.isArray(S[k]))L.push(k)})}catch(e){}return L})();
function listas120(){try{LISTAS120.forEach(function(k){if(S[k]==null)S[k]=[]});Object.keys(S.chSt||{}).forEach(function(id){var o=S.chSt[id];if(o){['stops','log','gch','recs'].forEach(function(k){if(o[k]==null)o[k]=[]})}});if(!S.lotes)S.lotes=[]}catch(e){}}
var _r120l=render;render=function(){listas120();return _r120l.apply(this,arguments)};
