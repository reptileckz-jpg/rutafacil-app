/* 131 · Recibir el cierre → Vehículo: fotos de la salida y del regreso por separado (4 lados + odómetro), con kilometraje y tanque;
   se tocan para verlas en grande; las que vienen de la nube (marca) se bajan solas; sin fotos lo dice. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{window.__mk=function(c){var cv=document.createElement('canvas');cv.width=8;cv.height=8;var x=cv.getContext('2d');x.fillStyle=c;x.fillRect(0,0,8,8);return cv.toDataURL()};
 var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.salida.ok=true;
 S.log.push({c:S.cli[0].id,R:3,M:0,V:0,pr:275,pm:20,total:825,pago:825,abono:0});S.cierre.odoIni=1000;S.cierre.odo=1050;S.cierre.tankIni='Lleno';S.cierre.tank='1/2';S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();
 S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='cierreadm';S.dOpen.fotoscierre=true});
const ver=()=>ev(()=>{render();var d=document.querySelector('details[data-k="fotoscierre"]');return d?{t:d.innerText.replace(/\s+/g,' '),img:d.querySelectorAll('img').length,btn:d.querySelectorAll('[data-act="foto121"]').length,sin:(d.innerText.match(/Sin foto/g)||[]).length}:null});
r=await ver();ok(r&&/no se tomaron las fotos del vehículo/.test(r.t),'sin fotos: lo dice',r&&r.t);
await ev(()=>{['frente','atras','izq','der','odo'].forEach(function(k,i){S.salida.fotos[k]=__mk('#'+(i+1)+'00');S.salida.fotosFin[k]=__mk('#0'+(i+1)+'0')})});
r=await ver();
ok(/🚚 Al salir/.test(r.t)&&/🏁 Al regresar/.test(r.t)&&r.t.indexOf('Al salir')<r.t.indexOf('Al regresar'),'salida y regreso por separado',r.t.slice(0,200));
ok(/Al salir odómetro 1,000 km · tanque Lleno/.test(r.t)&&/Al regresar odómetro 1,050 km · tanque 1\/2/.test(r.t),'cada uno con su odómetro y tanque');
ok(r.img===10&&r.btn===10&&(r.t.match(/Odómetro/g)||[]).length===2&&(r.t.match(/Lado izquierdo/g)||[]).length===2,'10 fotos: 4 lados + odómetro, al salir y al regresar',r);
ok(/Recorrió 50 km/.test(r.t),'dice cuánto recorrió');
/* tocar una foto: se ve en grande */
r=await ev(()=>{var bs=document.querySelectorAll('details[data-k="fotoscierre"] [data-act="foto121"]');bs[9].click();var o=document.getElementById('foto121ov');return o?{t:o.innerText.replace(/\s+/g,' ').slice(0,60),img:!!o.querySelector('img')}:null});
ok(r&&r.img&&/Odómetro/.test(r.t),'al tocar el odómetro del regreso se ve en grande',r);
await ev(()=>{var x=document.querySelector('[data-act="foto121x"]');if(x)x.click()});
/* falta una foto */
await ev(()=>{delete S.salida.fotosFin.izq});r=await ver();ok(r.sin===1&&r.img===9,'si falta una, dice "Sin foto" en su lugar',r);
/* fotos de la nube (marca): se bajan solas */
r=await ev(()=>{if(typeof FOTO_MARCA==='undefined')return 'sin FOTO_MARCA';S.salida.fotos.frente=FOTO_MARCA+'abc123⟧';FOTOS121['abc123']=__mk('#00f');render();var d=document.querySelector('details[data-k="fotoscierre"]');var im=d.querySelector('[data-ref="f121:abc123"] img');return !!im});
ok(r===true,'una foto que viene de la nube se muestra',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
