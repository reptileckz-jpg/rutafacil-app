/* 7.6 · l74: aceite (66), revisión paso a paso (71), datos que faltan por pasos, mayoreo sí/no y precio especial de una vez (81), desgaste (86) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
let p=await b.newPage({viewport:{width:400,height:860}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);let ev=(f,a)=>p.evaluate(f,a);
const ck=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);let r;
await ev(()=>{S.role='admin';render();wzAbre('veh',{plEdo:'Veracruz',tipo:'carga',marca:'Nissan',modelo:'NP300',anio:'2020',pl:'ABC',comb:'Diésel',capL:'80',capC:'40',odo:'100000'});S.wz.p=wzPasos().findIndex(x=>/Cada cuántos/.test(x.q));render()});
await ck('[data-act="wzop"][data-v="10000"]');await p.waitForTimeout(80);ok(/último cambio de aceite/.test(await ev(()=>document.getElementById('wzov').innerText)),'alta de vehículo: pregunta cada cuánto y cuándo fue el último cambio');
await ck('[data-act="wzop"][data-v="tab"]');await p.waitForTimeout(60);await p.fill('#wz_acX','3600');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);ok(/96,400/.test(await ev(()=>S.wz.err)),'"marcaba 3,600" con 100,000 hoy: pregunta si quiso decir "hace 3,600"');
await ck('[data-act="wzop"][data-v="hace"]');await p.waitForTimeout(60);await p.fill('#wz_acX','3600');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);await ev(()=>{S.wz.p=wzPasos().length-1;render()});await ck('[data-act="wzfin"]');await p.waitForTimeout(150);
r=await ev(()=>{var v=S.veh[S.veh.length-1];return [v.acLast,num(v.acInt),vInfo(v).rem]});ok(r[0]===96400&&r[2]===6400,'"hace 3,600 km": le faltan 6,400 para el siguiente cambio',r);
await ev(()=>{var v=S.veh[0];v.odo=100000;v.acLast=3600;v.acInt=10000;v.acOk74=null;S.tab.admin='vehiculos';render()});ok(await ev(()=>!!document.querySelector('[data-x="ac74"]')),'vehículo con el dato al revés: pregunta si fue "hace 3,600 km"');
await ck('[data-act="ac74fix"]');ok(await ev(()=>S.veh[0].acLast===96400&&!document.querySelector('[data-x="ac74"]')),'"Fue hace 3,600 km" lo corrige');
// 81 datos que faltan
await ev(()=>{S.tab.admin='inicio';var c=S.cli[0];c.hAb='';c.hCi='';c.tel='';S.dfTest=1;S.dfOpen=true;render()});
const i=await ev(()=>dfLista().findIndex(x=>x.go&&x.go.t==='cli'&&x.go.id===S.cli[0].id));await ev(i=>document.querySelector('[data-act="dfgo"][data-i="'+i+'"]').click(),i);await p.waitForTimeout(150);
r=await ev(()=>[S.wz&&S.wz.k,wzPasos().map(x=>x.q)]);ok(r[0]==='cliF'&&r[1].length===3&&/teléfono/.test(r[1][0])&&/abre y cierra/.test(r[1][1]),'"Datos que faltan" de un cliente: por pasos y solo lo que falta',r);
await p.fill('#wz_tel','2281112233');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);await p.selectOption('#wz_hAb','08:00');await p.selectOption('#wz_hCi','17:00');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);await ck('[data-act="wzfin"]');await p.waitForTimeout(100);
ok(await ev(()=>S.cli[0].tel==='2281112233'&&S.cli[0].hAb==='08:00'),'se guardan en el cliente');
// 81 mayoreo y precio especial
await ev(()=>{S.wz=null;S.tab.admin='clientes';S.openCli=S.cli[0].id;render();var t=document.querySelector('[data-act="fitab"][data-v="dat"]');if(t)t.click();var b=document.createElement('button');b.dataset.act='ceedit';b.dataset.id=S.cli[0].id;document.body.appendChild(b);b.click();b.remove()});await p.waitForTimeout(150);
ok(await ev(()=>!document.getElementById('ce_ppR')&&/¿Se le da precio de mayoreo\?/.test(document.querySelector('.ce74').innerText)),'ficha del cliente: "¿Mayoreo? Sí/No" en lugar de precio pactado');
await ck('[data-act="may74"][data-v="1"]');ok(await ev(()=>S.cli[0].mayoreo===true),'"Sí" le da el mayoreo del día');
await ck('[data-act="pe74"]');await p.waitForTimeout(80);await p.fill('#pe74R','240');await ck('[data-act="pe74ok"]');await p.waitForTimeout(80);ok(await ev(()=>S.cli[0].ppR==='240'&&!!S.cli[0].ppUna),'precio especial: queda solo para su próxima compra');
// se usa una vez
await ev(()=>{S.ce=null;S.cliEdit=null;S.role='rep';S.chofHoy=S.cli[0].chofer||1;S.pinOk['c:'+S.chofHoy]=true;S.salida.ok=true;S.inv.reparto=20;S.stops=[{c:S.cli[0].id}];S.cur=0;resetDraft(S.cli[0]);S.d.R=1;S.d.M=0;S.d.V=1;S.d._tar72='no';S.d._deb109='no';S.tab.rep='entrega';render()});
ok(await ev(()=>entregaCalc().pr===240),'en la entrega se cobra el precio especial');
await ck('[data-act="entconf"]');await p.waitForTimeout(200);await ev(()=>{var b=[...document.querySelectorAll('.modal [data-act], [role=dialog] [data-act]')].find(x=>/Sí|Guardar/.test(x.innerText));if(b)b.click()});await p.waitForTimeout(700);
r=await ev(()=>[S.stops[0].done,S.cli[0].ppR,!!S.cli[0].ppUna]);ok(r[0]&&!r[1]&&!r[2],'después de esa compra vuelve al precio del día',r);
// 86 desgaste
r=await ev(()=>{S.rutasHist=[];var o=rep68(30);return [o.est,o.caja>0,o.kgc>0]});ok(r[0]&&r[1]&&r[2],'sin rutas cerradas: repartir se estima con el desgaste de la camioneta',r);
r=await ev(()=>{var c=S.cargas.find(x=>x.vw)||S.cargas[0];c.vw=true;c.est='Recibida';c.dsgM=null;c.cv=null;c.viaje=c.viaje||{veh:S.veh[0].id,fecha:iso(TODAY)};render();return [c.dsgM,c.dsgKm]});ok(r[0]>0&&r[1]>0,'viaje de carga: el desgaste al ir por la fruta se suma solo',r);
r=await ev(()=>{var c=S.cargas.find(x=>x.dsg74);return desg(c,cC(c))});ok(/Desgaste al ir por la fruta/.test(r)&&/Repartirla: desgaste de la camioneta/.test(r),'el desglose enseña el desgaste al ir y al repartir');
await p.close();
// 71 revisión de la semana
p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);ev=(f,a)=>p.evaluate(f,a);
const ck2=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);
await ev(()=>{S.setup=null;S.veh.push({id:1,n:'Nissan NP300',pl:'YKL',plEdo:'Veracruz',comb:'Gasolina Premium',odo:1000});var c=S.choferes[0];S.role='rep';S.chofHoy=c.id;S.vehHoy=1;S.pinOk['c:'+c.id]=true;S.tab.rep='ruta';inspTipoRep=function(){return 'dia+sem+mes'};render()});
await ev(()=>{var b=[...document.querySelectorAll('button')].find(x=>/Iniciar ruta/.test(x.innerText));if(b)b.click()});await p.waitForTimeout(300);
ok(await ev(()=>!!document.querySelector('[data-act="ip74go"]')&&!document.querySelector('.insp-i')),'revisión de la semana: ya no es la lista enorme, se hace paso a paso');
await ck2('[data-act="ip74go"]');await p.waitForTimeout(100);ok(/1 de \d+/.test(await ev(()=>document.getElementById('ip74ov').innerText)),'un punto por pantalla con su avance');
await ck2('[data-act="ip74v"][data-v="bien"]');await ck2('[data-act="ip74v"][data-v="mal"]');await p.waitForTimeout(80);ok(await ev(()=>!!document.getElementById('ip74n')&&!!document.querySelector('#ip74ov [data-inspf]')),'"Mal": pide qué tiene y foto');
await ck2('[data-act="ip74sig"]');await ck2('[data-act="ip74todo"]');await p.waitForTimeout(80);ok(/1 con falla/.test(await ev(()=>document.getElementById('ip74ov').innerText)),'al final: resumen con las fallas');
await ck2('[data-act="ip74fin"]');ok(await ev(()=>inspCompleta(S.inspR)),'la revisión queda completa');
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
