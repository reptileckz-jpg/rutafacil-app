/* 180 · Cierre: el aviso de kilometraje y el "ya viene puesto según tu ruta" dicen los MISMOS km esperados.
   Google solo cuenta si se ordenó desde la bodega antes de entregar; si no, de parada en parada con la ubicación de los clientes. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
const lee=()=>ev(()=>{S.tab.rep='cierre';render();var t=document.querySelector('main').innerText;var a=(t.match(/la ruta era de ~(\d[\d,]*) km/)||[])[1],b=(t.match(/según tu ruta \(~(\d[\d,]*) km\)/)||[])[1];return {aviso:a?+a.replace(/,/g,''):null,puesto:b?+b.replace(/,/g,''):null,esp:kmEsp154(),est:rutaKmEst(),txt:(t.match(/la ruta era de[^\n]*/)||[''])[0].slice(0,120)}});
await ev(()=>{S.tutVisto={rep:true,admin:true};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='ruta';render();
 /* clientes de la ruta con ubicación (cerca de la bodega) */
 S.stops.forEach(function(s,i){var c=cl(s.c);if(c){c.lat=BOD.lat+0.03*(i+1);c.lng=BOD.lng+0.02*((i%2)?1:-1)}});
 /* Google ordenó la ruta YA EN CAMINO (con entregas hechas): solo cuenta lo que faltaba */
 S.stops[0].done=true;S.pos={lat:BOD.lat+0.2,lng:BOD.lng+0.2};S.rgRes={f:iso(TODAY),t:Date.now(),fuente:'google',antes:null,ahora:{min:40,km:30}};render();
 S.cierre.odoIni=50090;S.cierre.odo=50180});
r=await lee();
ok(r.aviso!=null&&r.puesto!=null&&r.aviso===r.puesto,'el aviso de kilometraje y "ya viene puesto según tu ruta" dicen lo mismo',r);
ok(r.esp.src!=='Google'&&r.esp.km!==30,'Google ordenado a media ruta (30 km de lo que faltaba) ya no cuenta como la ruta completa',r);
r=await ev(()=>{var g=km180Geo();return {geo:Math.round(g),est:rutaKmEst()}});
ok(r.geo>0&&Math.abs(r.geo-r.est)<=1,'la ruta se calcula de parada en parada con la ubicación de los clientes',r);
/* Google desde la bodega y antes de entregar: sí cuenta, y los dos avisos dicen lo de Google */
await ev(()=>{S.stops.forEach(function(s){s.done=false});S.pos=null;S.rgRes={f:iso(TODAY),t:Date.now(),fuente:'google',antes:null,ahora:{min:120,km:84}};render()});
r=await lee();
ok(r.esp.src==='Google'&&r.esp.km===84&&r.est===84,'Google ordenado desde la bodega antes de entregar: se usa el de Google en todo',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
