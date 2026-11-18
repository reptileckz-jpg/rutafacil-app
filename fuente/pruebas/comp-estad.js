/* Migración · temas "Estadísticas" (tema-estadisticas.js), "Rutas" (tema-rutas.js), "Guía" (tema-guia.js), el mapa grande (final de
   tema-ubica.js) y ovPon70 (final de tema-navega.js): compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-estad.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: Estadísticas y rankings (sin y con ventas de 30 días), cuadre de los últimos 12 días (con y sin movimientos), gastos fijos del
   mes con y sin retiro del dueño, desgaste por ruta de 7 y 30 días, el desglose de cada carga (desg); paradas de cada chofer, asignar
   pedidos (antes y después de que cierre), horas de llegada; tutoriales, "Aprende la app", "Hoy te toca", la burbuja de guía;
   el mapa grande; cada pantalla del administrador completa. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM').replace(/\s+/g,' ')};
  var plano=function(h){if(h==null)return '(null)';var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],input').length};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x))};
  var real=window.PN_MODO==='vacio';
  if(real){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Chofer Dos',puesto:'chofer',tel:'4'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3,5],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar();U.fin=true;S.setup=null}
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;
  var chs=S.choferes.filter(function(c){return esCh(c)});var ch=chs[0];
  /* estadísticas, rankings */
  T('est·1',function(){return plano(estadisticas())});
  T('rank·1',function(){return plano(rankingHTML())});
  /* ventas de hoy y de días pasados (ruta abierta + historial) */
  S.chofHoy=ch.id;S.salida.ok=true;
  S.log.push({c:S.cli[0].id,R:5,M:2,V:0,Vr:0,total:1540,pago:1540,abono:0,pr:300,pm:20,id:'t1'});S.log.push({c:S.cli[1].id,R:3,M:0,V:0,Vr:0,total:825.5,pago:500,abono:0,pr:275.17,pm:0,id:'t2'});
  for(var d=1;d<=5;d++){var f=iso(new Date(TODAY.getTime()-d*864e5));(S.rutasHist=S.rutasHist||[]).push({f:f,ch:ch.id,log:[{c:S.cli[d%2].id,R:d,M:d*3,V:0,Vr:0,total:d*300+d*60,pago:d*300,abono:0,pr:300,pm:20}],salida:{ok:true},cierre:{sent:true,res:{}}})}
  T('est·2',function(){return plano(estadisticas())});
  T('rank·2',function(){return plano(rankingHTML())});
  T('rank·c30',function(){return J(S.cli.map(function(c){return c.c30}))});
  /* cuadre de los últimos días */
  for(var i=0;i<12;i++){(function(i){var f=iso(new Date(TODAY.getTime()-i*864e5));T('cuadre·'+i,function(){return J(cuadre82(f))})})(i)}
  T('sinTrabajo',function(){return J(S.sinTrabajo||null)});
  /* gastos fijos */
  T('fijo·1',function(){return J(fijoMes())});
  S.fijos=(S.fijos||[]).concat([{n:'Renta',m:5000,dia:5},{n:'Retiro del dueño',m:8000,retiro:true,dia:15},{n:'Luz',m:'640.5',dia:20}]);
  T('fijo·2',function(){return J(fijoMes())});
  T('fijo·fijos',function(){return J(S.fijos.length)});
  /* desgaste */
  T('rep·7',function(){return J(rep68(7))});T('rep·30',function(){return J(rep68(30))});
  S.cfg.kmRuta=55;T('rep·30km',function(){return J(rep68(30))});
  (S.cargas||[]).slice(0,6).forEach(function(o){T('desg·'+o.id,function(){return plano(desg(o,cC(o)))})});
  var oc={id:9999,prov:'Proveedor Uno',fecha:iso(TODAY),est:'Recibida',kgR:1000,pR:9.5,kgM:300,pM:7,cajas:50,trMode:'kilos',t:{diesel:2500,comida:300,casetas:850.5,extra:0},extras:[],pag:0,mg:30,vCaja:300,vKgM:20,otros:[]};
  T('desg·nueva',function(){return plano(desg(oc,cC(oc)))});
  /* rutas: paradas, pedidos, horas */
  chs.forEach(function(c){T('stops·'+c.id,function(){var s=p57Stops(c.id);return J(Array.isArray(s)?s.length:Object.keys(s))})});
  T('etas',function(){S.stops=S.stops&&S.stops.length?S.stops:S.cli.map(function(c){return {c:c.id,done:false}});return J(etas())});
  var cp=S.cli[1];cp.ped={R:4,M:0,f:iso(TODAY)};
  chs.slice(0,2).forEach(function(c,i){T('asigna·'+i,function(){var r=p57Asigna(cp,c.id);return J([r,cp.ped,S.pedAsig||null,(S.avPrecio||[]).length])})});
  /* guía y tutoriales */
  T('aprende',function(){return J(aprendeItems())});
  T('hoy',function(){return J(hoyItems())});
  T('guiaLibre',function(){return J(guiaLibre())});
  ['admin','rep'].forEach(function(k){T('tut·'+k,function(){S.tut=null;S.tutVisto={};tutIniciar(k);var h=plano(tutHTML(true));var r=J([S.tut,S.tutVisto])+h;S.tut=null;S.tutVisto={rep:true,admin:true};return r})});
  T('tut·nada',function(){S.tut=null;return plano(tutHTML())});
  T('guiaMuestra',function(){S.tab.admin='inicio';render();var r;try{r=guiaMuestra('#noexiste, .tampoco')}catch(e){r='ERR '+e.message}var t=document.querySelector('.toast,#toast');return J(r)+(t?limpio(t.innerText):'')});
  /* mapa grande y ventanas */
  T('gm',function(){return J([gmHay(),gmInHay()])});
  T('ov',function(){var d=document.createElement('div');d.id='ovp1';document.body.appendChild(d);ovPon70('ovp1','<b>uno</b>');var a=d.innerHTML;ovPon70('ovp1','<b>uno</b>');ovPon70('ovp1','<b>dos</b>');var r=J([a,d.innerHTML,d._h70]);d.remove();return r});
  /* cada pantalla del administrador */
  var tabs=Array.prototype.map.call(document.querySelectorAll('nav.tabs button[data-t]'),function(b){return b.dataset.t});
  ['inicio','estadisticas','estad','finanzas','gastos','rutas','mas'].concat(tabs).filter(function(x,i,a){return a.indexOf(x)===i}).forEach(function(t){T('pant·'+t,function(){S.tab.admin=t;render();var m=document.querySelector('main');return m?limpio(m.innerText).slice(0,4000):''})});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(process.env.V)console.log(k,String(y).slice(0,200));if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
