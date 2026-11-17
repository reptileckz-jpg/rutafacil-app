/* Migración · tema "Quién reparte": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-reparte.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Revisa: chs81, chofsDia57, pedChoferes, choferes75, sinCh81 (hoy y mañana), arTiene, con "¿Repartes hoy?" prendido y apagado,
   y toma81 (cambios de Rutas al chofer en camino y al administrador en su ruta: agregar, quitar, quitar al que está entregando). */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var ids=function(L){return (L||[]).map(function(c){return c&&(c.id!=null?c.id:c.ref!=null?c.ref:c.n)})};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.yo='Ricardo';U.veh=[{n:'Nissan NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Auto',pl:'A2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:10}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];
   U.cli=[{n:'Fruber',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Tienda Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'1'},{n:'Abarrotes Lupita',a:'z',tel:'3',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:''},{n:'Frutería Sol',a:'w',tel:'4',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'1'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar()}
  S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';S.popVisto={admin:iso(TODAY)};
  /* clientes del administrador (para "Sin chofer") y un vehículo que no es de reparto asignado a un chofer */
  try{S.cli.forEach(function(c,i){if(i%3===2)c.chofer=ADM85})}catch(e){}
  try{if(S.veh[1]){S.veh[1].esAuto=true;var chs=S.choferes.filter(function(c){return esCh(c)});if(chs[1]){S.vehAsig=S.vehAsig||{};S.vehAsig[chs[1].id]=S.veh[1].id}}}catch(e){}
  var snap=JSON.stringify(S),hoy=hoy81(),man=man81();
  [false,true].forEach(function(on){S=JSON.parse(snap);S.admRep85=on?hoy:'';var k=on?'on-':'off-';
   try{out[k+'chs81']=ids(chs81())}catch(e){out[k+'chs81']='ERR '+e.message}
   try{out[k+'chofsDia57']=ids(chofsDia57())}catch(e){out[k+'chofsDia57']='ERR '+e.message}
   try{out[k+'pedChoferes']=ids(pedChoferes())}catch(e){out[k+'pedChoferes']='ERR '+e.message}
   try{out[k+'choferes75']=[choferes75('su'),choferes75(),choferes75('x')]}catch(e){out[k+'choferes75']='ERR '+e.message}
   try{out[k+'sinCh81']=[ids(sinCh81(hoy)),ids(sinCh81(man))]}catch(e){out[k+'sinCh81']='ERR '+e.message}
   [[0,0,null],[1,0,null],[0,1,null],[0,0,[1]]].forEach(function(cs,i){S.arOn=!!cs[0];S.arSt=cs[1]?{stops:[]}:null;S.arStops=cs[2];try{out[k+'arTiene'+i]=arTiene()}catch(e){out[k+'arTiene'+i]='ERR '+e.message}});
   S.arOn=false;S.arSt=null;try{S.tab.admin='rutas';render();out[k+'rutasHTML']=(document.querySelector('main')||{}).innerHTML}catch(e){out[k+'rutasHTML']='ERR '+e.message}});
  /* toma81: un chofer en camino */
  var C=S.cli.filter(function(c){return !c.oculto}).map(function(c){return c.id});
  function caso(nom,prep){S=JSON.parse(snap);try{localStorage.removeItem('rq83')}catch(e){}var ch=S.choferes.filter(function(c){return esCh(c)})[0].id;
   S.role='rep';S.chofHoy=ch;S.rutaDia80=hoy;S.stops=C.slice(0,3).map(function(c){return {c:c}});S.cur=0;S.tab.rep='ruta';S.rq81={};S.rq81[hoy]={};S.av90=null;
   var rq=function(op,c,t){S.rq81[hoy]['k'+t]={ch:+ch,op:op,c:+c,t:t}};prep(rq,ch);var r;try{r=toma81()}catch(e){r='ERR '+e.message}
   var r2;try{r2=toma81()}catch(e){r2='ERR '+e.message}
   out['toma-'+nom]=[r,r2,S.stops,S.cur,S.tab.rep,S.arOn,S.av90&&{L:S.av90.L,era:S.av90.era,ent:S.av90.ent,sig:S.av90.sig},S.rq81,(function(){try{return localStorage.getItem('rq83')}catch(e){return null}})()]}
  caso('quitar',function(rq){rq('del',C[1],1)});
  caso('quitar-siguiente',function(rq){rq('del',C[0],1)});
  caso('quitar-entregando',function(rq){S.tab.rep='entrega';rq('del',C[0],1)});
  caso('agregar',function(rq){rq('add',C[3]||C[0],1)});
  caso('agregar-ya-esta',function(rq){rq('add',C[0],1)});
  caso('agregar-y-quitar',function(rq){rq('add',C[3]||C[0],1);rq('del',C[2],2)});
  caso('ya-tomado-local',function(rq){rq('del',C[1],1);localStorage.setItem('rq83',JSON.stringify({k1:1}))});
  caso('otro-dia',function(rq){S.rutaDia80='2000-01-01';rq('del',C[1],1)});
  caso('otro-chofer',function(rq,ch){S.rq81[hoy].k1={ch:ch+99,op:'del',c:C[1],t:1}});
  caso('admin-en-su-ruta',function(rq){S.arOn=true;S.role='rep';rq('del',C[1],1)});
  caso('admin-no-en-ruta',function(rq){S.arOn=true;S.role='admin';rq('del',C[1],1)});
  caso('sin-chofer',function(rq){S.chofHoy=null;rq('del',C[1],1)});
  return out});
 out.errores=errs;await p.close();return out}
(async()=>{const b=await chromium.launch();const a=await corre(b,process.argv[2]),n=await corre(b,process.argv[3]);
 let d=0;for(const k of Object.keys(a)){const x=JSON.stringify(a[k]),y=JSON.stringify(n[k]);if(x!==y){d++;console.log('DIFERENTE',k,'\n A:',x.slice(0,700),'\n N:',y.slice(0,700))}else console.log('igual',k,x.slice(0,160))}
 for(const k of Object.keys(n))if(!(k in a)){d++;console.log('SOLO EN NUEVO',k)}
 console.log(Object.keys(a).length+' casos · '+(d?'HAY DIFERENCIAS':'TODO IGUAL'));await b.close()})();
