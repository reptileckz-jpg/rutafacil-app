/* Migración · tema "Inicio del administrador y sus tarjetas": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-inicio.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: Inicio completo en cada papel (admin, contador, chofer) y a distintas horas (mañana, tarde, noche, madrugada),
   la bienvenida, la tarjeta de pedidos (sin y con pedidos), proveedores, el mapa en vivo y cada aviso de "¿Qué sigue?". */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var main=function(){var m=document.querySelector('main');return m?limpio(m.innerText)+' |#'+m.querySelectorAll('[data-act]').length:''};
  var plano=function(h){var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act]').length};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3],cred:900,vac:3,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar()}
  S.tutVisto={rep:true,admin:true,cont:true};
  var RO=['admin','cont','rep'];
  var foto=function(et){RO.forEach(function(ro){S.role=ro;S.pinOk[pinKey()]=true;S.tab[ro]=ro==='rep'?'ruta':'inicio';
   T(et+'·'+ro+'·pantalla',function(){render();return main()});
   T(et+'·'+ro+'·inicio',function(){return plano(inicio())});
   T(et+'·'+ro+'·bienv',function(){return plano(bienvHTML())});
   T(et+'·'+ro+'·pedidos',function(){return plano(pedidoCard())});
   T(et+'·'+ro+'·prov',function(){return plano(proveedoresCard())});
   T(et+'·'+ro+'·popItems',function(){return limpio(JSON.stringify(popItems()))});
   if(ro!=='rep'){S.popVisto={};var L=[];try{L=popItems()}catch(e){}for(var i=0;i<Math.min(L.length,12);i++){S.popI=i;T(et+'·'+ro+'·pop'+i,function(){return plano(popHTML())})}S.popI=0;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)}}})};
  foto('base');
  [7,15,21,3].forEach(function(h){window.__hora93=h;foto('h'+h)});window.__hora93=12;
  /* con pedidos */
  S.cli.slice(0,2).forEach(function(c,i){c.ped={R:3+i,M:i,f:iso(TODAY),h:'09:0'+i}});foto('ped');
  /* mapa en vivo */
  T('mapa·vacio',function(){return String(mapaVivoHTML('t0',{pts:[],line:[],marks:[]},200))});
  T('mapa·pts',function(){return String(mapaVivoHTML('t1',{pts:[{lat:21.1,lng:-89.6,t:'1',n:'Uno'},{lat:21.2,lng:-89.5,t:'2',n:'Dos'}],line:[{lat:21.1,lng:-89.6},{lat:21.2,lng:-89.5}],marks:[],bod:false},220))});
  T('mapa·bod',function(){return String(mapaVivoHTML('blmap',{pts:[{lat:21.1,lng:-89.6,t:'B',n:'Bodega',col:'#1E2A1A'}],line:[],marks:[],bod:false,refit:true},240))});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
