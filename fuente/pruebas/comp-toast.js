/* Migración · tema "Avisos que salen abajo" (tema-toast.js): compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-toast.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: cada tipo de aviso (sin señal, volvió la señal, mayoreo que no se le puede dar, "no cuadra" para cada papel, aviso bloqueante
   en cola, cajas en palabras claras, lo que falta, valores raros, "Algo no cuadra", modo "a repartir") en admin, chofer y contador. */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(async()=>{var out={};var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM').replace(/\s+/g,' ')};
  var real=window.PN_MODO==='vacio';
  if(real){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar();U.fin=true;S.setup=null}
  S.tutVisto={rep:true,admin:true};S.pinOk[pinKey()]=true;
  var M=['Sin señal: lo que captures se guarda en este celular','Volvió la señal · ya se subió todo','A Cliente Uno no se le da mayoreo (lo decidió el administrador)',
   '⚠ Algo no cuadra: Todas las cajas están contadas. Revísalo en Estadísticas.','⚠ Algo no cuadra: Efectivo en caja. Revísalo en Estadísticas.','El efectivo no cuadra por $50',
   'Escribe kilos, cajas y precio del roatán','Falta la foto del odómetro','Escribe cuánto fue de combustible','Ese valor se ve raro: revisa','Listo','Guardado',
   'Se le pidió permiso al administrador','Pedido nuevo para la ruta','Entrega guardada','Toca qué cargaste',null,'',12];
  var wait=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
  var toastTxt=function(){var t=document.querySelector('.toast,#toast');return t?limpio(t.innerText)+'|'+(t.className||''):'(nada)'};
  var roles=[['admin',false],['rep',false],['cont',false],['rep',true]];
  for(var ri=0;ri<roles.length;ri++){var ro=roles[ri];S.role=ro[0];S.arOn=ro[1];try{render()}catch(e){}
   for(var i=0;i<M.length;i++){var k=ro[0]+(ro[1]?'·ar':'')+'·'+i;var nR=0,_r=render;
    try{window._faltaSel=null;var q0=JSON.stringify(typeof _toastQ!=='undefined'?_toastQ:null);var res=toast(M[i]);await wait(60);
     out[k]=JSON.stringify([res===undefined?'u':res,toastTxt(),typeof _toastQ!=='undefined'?_toastQ:null,window._faltaSel||null]).replace(/\d{1,2}:\d\d/g,'HH:MM')}catch(e){out[k]='ERR '+e.message}
    try{if(typeof _toastQ!=='undefined')_toastQ.length=0}catch(e){}}}
  S.arOn=false;return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(process.env.V)console.log(k,String(y).slice(0,200));if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
