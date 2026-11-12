/* 7.6 · l71: macho en 0 (74), fruta madura (65), bodega con 3 números (77), maduración (75), mayoreo (85), ubicaciones y Places (63/64) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
// 74 · primera vez con 1,900 kg de macho
let p=await b.newPage({viewport:{width:400,height:860}});let errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);let ev=(f,a)=>p.evaluate(f,a);
const ck=s=>ev(s=>{var e=[...document.querySelectorAll(s)].pop();if(!e)return false;e.click();return true},s);
const sig=async()=>{await ck('#setov [data-act="supaso"]:last-child');await p.waitForTimeout(120)};
await p.fill('#setov [data-bind="cfg.nombre"]','Prueba');await sig();await sig();await sig();await sig();
await p.click('#setov [data-bind="inv.verdes"]');await p.keyboard.type('400',{delay:20});await sig();
await p.click('#setov [data-bind="inv.kgVerde"]');await p.keyboard.type('1900',{delay:20});await sig();
let r=await ev(()=>[S.inv.kgVerde,S.avPrecio.filter(t=>/Faltaba un número/.test(t)).length]);ok(Number(String(r[0]).replace(/,/g,''))===1900,'el macho verde se queda en 1,900 al pasar de paso',r);ok(r[1]===0,'sin el aviso falso de "faltaba un número"');
ok(errs.length===0,'sin errores (primera vez)',errs);await p.close();
// demo
p=await b.newPage({viewport:{width:400,height:860}});errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1;window.Capacitor={Plugins:{RutaNativa:{
 lugaresGoogle:async(o)=>window.__pl403?{status:403,json:JSON.stringify({error:{status:'PERMISSION_DENIED',message:'Requests to this API are blocked.'}})}:{status:200,json:JSON.stringify({places:[{displayName:{text:'Abarrotes Lupita'},formattedAddress:'Calle 5',location:{latitude:32.51,longitude:-117.03}}]})},
 linkLargo:async(o)=>({url:'https://maps.google.com/?q=Abarrotes+Lupita,+Tijuana&ftid=0x1:0x2'})}}}});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.role='admin';S.tab.admin='bodega';render()});await p.waitForTimeout(200);
let t=await ev(()=>(document.querySelector('[data-x="exist65"]')||{}).innerText||'');ok(/Hay \d[\d,]* cajas de roatán, de las cuales/.test(t)&&/En maduración/.test(t)&&/de los cuales/.test(t),'Bodega: total y verdes / en maduración / maduras');
ok(await ev(()=>{var tot=num(S.inv.verdes)+madBod71('R')+num(S.inv.maduras);return new RegExp('Hay '+n65(tot)+' cajas').test(document.querySelector('[data-x="exist65"]').innerText)}),'el total de roatán suma lo que está madurando');
// 65
r=await ev(()=>{var v=vidaDias();S.madL=[{p:'R',q:10,dia:iso(new Date(TODAY.getTime()-(v+1)*864e5))},{p:'R',q:5,dia:iso(TODAY)}];S.inv.maduras=15;render();var d=document.querySelector('[data-x="antig65"]');return [d.querySelectorAll('[data-act="lt53"]').length,madVence().length]});
ok(r[0]===1&&r[1]===1,'solo el lote pasado de tiempo pide decidir y avisa',r);
r=await ev(()=>{S.lt53={k:0,paso:2,op:'salio',q:''};var m=lt53Aplica();var R=S.madL.filter(z=>z.p==='R');return [m,R.length,R[0].q,S.inv.maduras]});ok(r[1]===1&&r[2]===15&&r[3]===15,'"Salió a la venta": el lote viejo se quita sin cambiar el inventario',r);
// 85
await ev(()=>{S.lt53=null;S.precio.R=260;S.mayMin={R:'270',M:'15'};S.tab.admin='inicio';render()});await ck('[data-act="precioconf"]');await p.waitForTimeout(150);
ok(await ev(()=>!!document.getElementById('may71ov')),'mayoreo más alto que el precio: pide corregirlo antes de confirmar');
await p.fill('#may71R','100');await ck('[data-act="may71ok"]');await p.waitForTimeout(100);ok(await ev(()=>!!document.querySelector('#may71ov .neg')),'mayoreo abajo del costo: no deja guardar');
await ev(()=>{var c=costoCajaAct();document.getElementById('may71R').value=String(Math.ceil(c)+1);document.getElementById('may71R').dispatchEvent(new Event('input',{bubbles:true}))});await p.waitForTimeout(50);await ck('[data-act="may71ok"]');await p.waitForTimeout(150);
r=await ev(()=>[S.mayMin.R,S.precio.conf===iso(TODAY),!!document.getElementById('may71ov')]);ok(r[1]&&!r[2]&&Number(r[0])<=260,'con un mayoreo correcto se guarda y se confirma el precio',r);
// 75
r=await ev(()=>{S.cm={R:0,M:1,kgM:'500',llego:'si',mad:'si',madM:'50',mz:{M:{met:'Carburo',clima:'Nublado',temp:'25',h:'48',hm:true}}};return cmMadHTML()});ok(/¿En cuántas horas los sacas de madurar\?/.test(r)&&/Salen de madurar/.test(r),'meter a madurar: pregunta cuándo salen y dice día y hora');
await ev(()=>{S.cm=null});
// 76
r=await ev(()=>{var c=S.cargas[0];c.lpOk=true;c.lpModo='lphoy';c.lpF=iso(TODAY);return lotePrecioHTML(c)});ok(/en uso/.test(r)&&/Cambiar el precio/.test(r)&&!/data-act="lphoy"/.test(r),'"Usar desde hoy" ya usado: ya no vuelve a salir');
// 63/64
await ev(()=>{S.ub68={t:'cli',id:S.cli[0].id,p:0};render()});await p.waitForTimeout(100);t=await ev(()=>document.getElementById('ub68ov').innerText);ok(!/Uber/.test(t)&&/coordenadas/.test(t),'ubicación: sin "como en Uber" y acepta coordenadas');
await p.fill('#ub68l','https://maps.app.goo.gl/abc');await ck('[data-act="ub68link"]');await p.waitForTimeout(400);r=await ev(()=>[S.ub68.p,S.ub68.q,(S.ub68.res||[]).length]);ok(r[0]===1&&/Abarrotes Lupita/.test(r[1])&&r[2]===1,'link sin coordenadas: busca el lugar por su nombre',r);
await ev(()=>{window.__pl403=1});await ck('[data-act="ub68ir"]');await p.waitForTimeout(300);ok(/Restricciones de API/.test(await ev(()=>S.ub68.err)),'Places bloqueado: dice exactamente qué revisar en la llave');
await ev(()=>{S.ub68={t:'cli',id:S.cli[0].id,p:0};render()});await p.fill('#ub68l','32.5149, -117.0382');await ck('[data-act="ub68link"]');await p.waitForTimeout(100);r=await ev(()=>[S.ub68.p,S.ub68.lat]);ok(r[0]===2&&r[1]===32.5149,'coordenadas pegadas: van directo al mapa',r);
ok(await ev(()=>{var c=ubParse('https://www.google.com/maps/place/X/@19.1,-96.1,17z/data=!3d19.5432!4d-96.9271');return c&&c.lat===19.5432}),'el lector de toda la app entiende los links largos (!3d!4d)');
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
