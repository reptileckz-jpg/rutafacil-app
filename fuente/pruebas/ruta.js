const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms),click=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);
const img=require('fs').readFileSync('v50/n0.png');
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
// --- entrega guardada y luego cancelada con motivo
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.inv.reparto=20;S.inv.repartoKg=50;S.cierre.salioR=20;S.cierre.salioM=50;var i=curStop();S.cur=i;resetDraft(cl(S.stops[i].c));S.d.R=3;S.d.M=0;S.d.V=0;S.tab.rep='entrega';render()});
await click('[data-act="entconf"]');await W(150);await click('[data-act="guardar"]');await W(300);
let r=await ev(()=>({log:S.log.length,rep:S.inv.reparto}));ok(r.rep===17,'entrega guardada',r);
await ev(()=>{S.tab.rep='ruta';render()});await W(150);
await click('[data-act="cancelent"]');await W(150);
r=await ev(()=>({m:S.modal&&S.modal.t,ta:!!document.getElementById('cmot'),conf:!!S.confirm}));ok(r.m&&/Por qué/.test(r.m)&&r.ta&&!r.conf,'al cancelar se abre la ventana para escribir por qué',r);
await p.screenshot({path:'v50/r1.png'});
await click('.modal [data-act="cancelent"], [data-act="cancelent"][data-ok="1"]');await W(150);
r=await ev(()=>({t:S.toast,rep:S.inv.reparto,m:!!S.modal}));ok(/Escribe por qué/.test(r.t)&&r.rep===17&&r.m,'sin motivo no cancela',r);
await p.fill('#cmot','me equivoqué de cliente');await click('[data-act="cancelent"][data-ok="1"]');await W(200);
r=await ev(()=>({rep:S.inv.reparto,c:S.cancels,av:(S.avPrecio.slice(-1)[0]||'')+' | '+(((S.actDia||[]).slice(-1)[0]||{}).x||''),m:!!S.modal}));ok(r.rep===20&&r.c&&r.c.length===1&&r.c[0].mot==='me equivoqué de cliente'&&/motivo: me equivoqué/.test(r.av)&&!r.m,'cancelada: las cajas regresan al camión y el motivo se guarda',{rep:r.rep,av:r.av});
await ev(()=>{S.tab.rep='cierre';S.cierreP=3;render()});await W(150);
r=await ev(()=>{var c=document.querySelector('[data-key="cancels"]');return c&&c.offsetParent!==null?c.innerText:null});ok(r&&/me equivoqué/.test(r),'sale en el cierre del chofer (paso Cajas)',r);
// --- gasto sin ticket (flujo de antes; desde la 7.2 el ticket es obligatorio: ver t63.js)
await ev(()=>{window.__ticketLibre=1;const c=(S.choferes||[]).filter(x=>+x.id===+S.chofHoy)[0];if(c)c.comida=true;S.gx={tipo:'Comida o viáticos',monto:'150',nota:'',foto:null};render();var b=document.createElement('button');b.dataset.act='gxsave';document.body.appendChild(b);b.click();b.remove()});await W(150);
r=await ev(()=>({gch:S.gch.length,rev:(S.gchRev||[]).length,tot:gchTot(),t:S.toast}));ok(r.gch===0&&r.rev===1&&r.tot===0&&/por revisar/.test(r.t),'gasto sin ticket: queda por revisar y no se descuenta',r);
// gasto con ticket
await ev(()=>{S.gx={tipo:'Caseta',monto:'80',nota:'',foto:'data:image/jpeg;base64,AA'};var b=document.createElement('button');b.dataset.act='gxsave';document.body.appendChild(b);b.click();b.remove()});await W(150);
r=await ev(()=>({gch:S.gch.length,tot:gchTot()}));ok(r.gch===1&&r.tot===80,'gasto con ticket: se descuenta normal',r);
// gasolina sin ticket y con ticket
await ev(()=>{S.rc={tipo:'',precio:'24',litros:'20',total:'',manual:false};var b=document.createElement('button');b.dataset.act='recargar';document.body.appendChild(b);b.click();b.remove()});await W(150);
r=await ev(()=>({recs:S.recs.length,rev:S.gchRev.length,tot:recTot(),l:recL()}));ok(r.recs===0&&r.rev===2&&r.tot===0&&r.l===20,'gasolina sin ticket: por revisar, pero los litros cuentan para el rendimiento',r);
await ev(()=>{S.tab.rep='ruta';S.gxSheet=true;S.gxFuel=true;render()});await W(150);ok(await ev(()=>!!document.getElementById('rcf')),'la recarga tiene botón de foto del ticket');
await p.setInputFiles('#rcf',{name:'t.png',mimeType:'image/png',buffer:img});await W(700);
await ev(()=>{S.rc.precio='24';S.rc.litros='10';var b=document.createElement('button');b.dataset.act='recargar';document.body.appendChild(b);b.click();b.remove()});await W(150);
r=await ev(()=>({recs:S.recs.length,foto:!!(S.recs[0]&&S.recs[0].foto),tot:recTot()}));ok(r.recs===1&&r.foto&&r.tot===240,'gasolina con ticket: se descuenta y guarda la foto',r);
// admin acepta uno el mismo día y rechaza otro
await ev(()=>{S.role='admin';S.tab.admin='inicio';render()});await W(150);
r=await ev(()=>document.querySelectorAll('[data-act="gxrevok"]').length);ok(r===2,'al admin le salen los 2 gastos sin ticket en Inicio',r);
await p.screenshot({path:'v50/r2.png'});
await click('[data-act="gxrevok"][data-i="0"]');await W(100);await click('[data-act="gxrevno"][data-i="1"]');await W(100);
r=await ev(()=>({gt:gchTot(),rt:recTot(),est:S.gchRev.map(function(x){return x.est})}));ok(r.gt===230&&r.rt===240&&r.est.join()==='ok,no','aceptado se descuenta; rechazado no',r);
// aceptar después del cierre: se quita del faltante
await ev(()=>{S.gchRev.push({k:'gx',tipo:'Comida o viáticos',m:100,h:'13:00',ch:+S.chofHoy,f:iso(TODAY),est:'pend'});S.cierre.sent=true;S.faltantes.push({ch:+S.chofHoy,m:300,fecha:iso(TODAY),desc:true,pend:true});render()});
await click('[data-act="gxrevok"]');await W(100);r=await ev(()=>({f:S.faltantes.slice(-1)[0].m,t:S.toast}));ok(r.f===200,'aceptado después del cierre: se le quita del faltante',r);
// --- cambio sin foto
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.inv.reparto=20;var i=curStop();S.cur=i;resetDraft(cl(S.stops[i].c));S.tab.rep='entrega';S.dOpen.entmas=true;S.dOpen.cambio=true;S.cbx={R:2,M:'',foto:null};render()});await W(150);
r=await ev(()=>{var l=document.querySelector('label[for="cbF"]');return l?l.innerText:null});ok(/obligatoria/.test(r),'cambio: dice que la foto es obligatoria',r);
await click('[data-act="cambio"]');await W(100);r=await ev(()=>({c:S.cambios.length,t:S.toast}));ok(r.c===0&&/foto/.test(r.t),'sin foto no se registra el cambio',r);
await ev(()=>{S.cbx.foto='data:image/jpeg;base64,AA';render()});await click('[data-act="cambio"]');await W(150);
r=await ev(()=>({c:S.cambios.length,av:(S.avPrecio.slice(-1)[0]||'')+' | '+(((S.actDia||[]).slice(-1)[0]||{}).x||'')}));ok(r.c===1&&/cambió fruta/.test(r.av),'con foto se registra y le llega aviso al admin',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
