/* 106 · la foto del odómetro al iniciar la ruta se guarda aunque la pantalla se vuelva a dibujar con la cámara abierta */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
const r=await p.evaluate(async()=>{var out={};var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[{n:'Cliente Uno',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Chofer Uno')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';S.salida.ok=false;render();
 var ini=[...document.querySelectorAll('button')].filter(x=>/^Iniciar ruta$/.test((x.textContent||'').trim()))[0];if(ini)ini.click();await new Promise(r=>setTimeout(r,300));
 /* una "cámara" de prueba: un lienzo con imagen en lugar del video */
 var cv=document.createElement('canvas');cv.width=64;cv.height=48;cv.getContext('2d').fillRect(0,0,64,48);cv.videoWidth=64;cv.videoHeight=48;var qs=document.querySelector.bind(document);
 var toma=async function(k,cambia){var old=document.getElementById('foto_fotos'+k);CAM73.inp=old;CAM73.cara='environment';
  if(cambia){var nu=old.cloneNode(true);old.parentNode.replaceChild(nu,old)}   /* la pantalla se redibujó mientras la cámara estaba abierta */
  document.querySelector=function(s){return s==='#cam73 video'?cv:qs(s)};try{cam73Tira()}finally{document.querySelector=qs}
  await new Promise(r=>setTimeout(r,900));return {ya:!!S.salida.fotos[k],seguia:old.isConnected}};
 out.odo=await toma('odo',true);out.frente=await toma('frente',false);
 out.pantalla=!!(document.getElementById('foto_fotosodo')&&document.getElementById('foto_fotosodo').parentElement.querySelector('img'));
 return out});
ok(r.odo.seguia===false&&r.odo.ya,'106 · la pantalla se redibujó con la cámara abierta: la foto del odómetro SÍ se guarda',r.odo);
ok(r.frente.ya,'106 · las de los lados se siguen guardando',r.frente);
ok(r.pantalla,'106 · la foto del odómetro se ve en su casilla');
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
