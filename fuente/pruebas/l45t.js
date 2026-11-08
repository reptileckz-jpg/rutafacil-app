const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
/* 54 */
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.salida.fotosFin={};FOTOS.forEach(f=>S.salida.fotosFin[f[0]]='data:image/png;base64,iVBORw0KGgo=');S.cierre.sent=true;S.cierre.res=cierreRes();S.tab.rep='cierre';render()});await W(150);
let r=await ev(()=>({files:document.querySelectorAll('main input[type=file]').length,env:!!document.querySelector('main [data-act="enviar"]'),t:document.querySelector('main').innerText.slice(0,200)}));
ok(r.files===0&&!r.env&&/Ya no se puede cambiar/.test(r.t),'cierre mandado: solo se ve, sin retomar fotos ni reenviar',r);
/* 65/66/67 */
await ev(()=>{S.inv.reparto=0;S.inv.repartoKg=0;var c=S.cli[3];c.ped={R:10,M:100,cuando:'hoy'};S.stops.push({c:c.id,ped:true});S.rutaAv[1]=['Pedido para hoy: '+c.n+' (10 cajas, 100 kg)'];S.tab.rep='ruta';render()});await W(150);
r=await ev(()=>document.querySelector('main').innerText);ok(/Se te asignó una nueva entrega/.test(r)&&/Regresa a la bodega a cargar (10|\\d+) cajas de roatán y 100 kg de macho/.test(r)&&/por si sale otro pedido/.test(r),'chofer con cierre mandado: le llega el pedido y qué cargar',r.slice(0,300));
await ev(()=>document.querySelector('[data-act="pedcarga"]').click());await W(200);
r=await ev(()=>({sent:S.cierre.sent,cx:S.cx,reab:S.reab}));ok(!r.sent&&r.cx&&+r.cx.R>=13&&+r.cx.M>=120,'"Ir a cargar": reabre sin permiso con cantidades + extra',r);
await ev(()=>{S.cx=null;render()});
/* 67 título */
ok(await ev(()=>rutaAvTit(['Pedido para hoy: X','Pedido para hoy: Y'])==='Se te asignaron 2 entregas nuevas'),'título del aviso: "Se te asignaron 2 entregas nuevas"');
/* 63 */
ok(await ev(()=>tiempoAprox(Infinity)==='')&&await ev(()=>!/Infinity/.test(kmAprox(10000,{hist:[]}))),'sin "Infinity"',await ev(()=>kmAprox(10000,{hist:[]})));
/* 58 */
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};var n=provNames()[0];provD(n).tel='';var L=dfLista();var x=L.find(x=>/Teléfono de .* \(proveedor\)/.test(x.txt));dfIr(x)});await W(900);
r=await ev(()=>{var a=document.activeElement;return {fi:!!document.getElementById('fiov'),foc:a&&a.dataset&&a.dataset.pv}});ok(r.fi&&/\|tel$/.test(r.foc||''),'datos que faltan → teléfono del proveedor: abre el campo',r);
/* 71 */
await ev(()=>{S.openProv=null;S.pvEdit=null;S.tab.admin='inicio';render();S.ub={k:'bas',modo:'nueva',n:'',pi:0};render()});await W(150);
const hayUb=await ev(()=>!!document.getElementById('ubov'));
if(hayUb){await ev(()=>{toast('Escribe cómo se llama la báscula')});await W(150);ok(await ev(()=>!!document.querySelector('#ubov .falta')),'falta el nombre: el campo se pone rojo y se sacude')}
else{await ev(()=>{S.ub=null;S.gsheet={i:null,tipo:'Papelería',monto:'',nota:'',pago:'Efectivo de caja',foto:null,ref:''};render();toast('Escribe el monto')});await W(150);ok(await ev(()=>!!document.querySelector('.falta')),'falta un dato: el campo se pone rojo y se sacude')}
/* 68 */
ok(await ev(()=>{var d=document.createElement('div');d.className='leaflet-container';document.querySelector('main').appendChild(d);var r=swBloq(d);d.remove();return r}),'deslizar sobre el mapa no cambia de sección');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
