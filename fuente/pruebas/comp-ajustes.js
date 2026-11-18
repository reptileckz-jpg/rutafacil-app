/* Migración · tema "Ajustes y asistente de la primera vez": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-ajustes.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: la ventana de Ajustes para cada papel (admin, admin encargado, contador, chofer, bodega = local) y con opciones distintas
   (tema, impresora, vibración); el asistente de la versión real en cada paso (0 a 7), vacío y ya lleno; y las pantallas completas. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var plano=function(h){var d=document.createElement('div');d.innerHTML=h||'';return limpio(d.innerText)+' |#'+d.querySelectorAll('[data-act],[data-bind],input,select').length};
  /* 1 · el asistente (solo existe en la versión real; con __pnTest no sale, así que se apaga mientras se mira) */
  if(window.PN_MODO==='vacio'&&S.setup){var U=S.setup;
   var paso=function(et){for(var p=0;p<=7;p++){U.p=p;T('setup·'+et+'·'+p,function(){window.__pnTest=0;try{return plano(setupHTML())}finally{window.__pnTest=1}})}};
   paso('vacio');
   U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3],cred:900,vac:3,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];
   paso('lleno');U.p=0;
   T('setup·aplicar',function(){S.precio.R=275;S.precio.M=20;suAplicar();return limpio(JSON.stringify({veh:S.veh.length,ch:S.choferes.length,cli:S.cli.length,fin:!!U.fin}))});
   T('setup·fin',function(){window.__pnTest=0;try{return plano(setupHTML())}finally{window.__pnTest=1}})}
  /* 2 · Ajustes */
  S.tutVisto={rep:true,admin:true,cont:true,bodega:true};
  var aj=function(et){[['admin',false],['admin',true],['cont',false],['rep',false],['local',false]].forEach(function(x){S.role=x[0];S.encOn=x[1];S.pinOk[pinKey()]=true;S.aj=true;
   T('aj·'+et+'·'+x[0]+(x[1]?'·enc':''),function(){return plano(ajHTML())});
   /* el modo encargado sin S.enc no existe en la app: de ese solo se compara la ventana */
   if(!x[1])T('aj·'+et+'·'+x[0]+'·pantalla',function(){render();var b=document.body.cloneNode(true);[].slice.call(b.querySelectorAll('script,style')).forEach(function(x){x.remove()});var t=limpio(b.textContent);return t.length+' · '+t.slice(0,3000)})});S.encOn=false;S.aj=false};
  aj('base');
  S.cfg.tema='oscuro';S.impr={papel:'80',auto:true};try{prefS('vib','0');prefS('snd','1');prefS('forma','grande')}catch(e){}aj('opciones');
  S.aj=false;T('aj·cerrado',function(){return plano(ajHTML())});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
