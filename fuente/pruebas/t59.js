const {chromium}=require('playwright');
/* l59: 3 billetes · 5 un solo "?" · 6 burbuja · 7 fotos en grande · 14 sin "Comenzar" · 15 orden al abrir · 17 tarjetas urgentes */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);

/* ---- 3 · billetes ---- */
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.salida.fotosFin=S.salida.fotosFin||{};FOTOS.forEach(f=>S.salida.fotosFin[f[0]]='data:x');S.salida.fotosFin.odo='data:x';S.cierre.odo=String(num(S.cierre.odoIni)+50);S.cierre.tankOk=true;S.cierre.gxConf=true;S.log.push({c:8,R:5,M:0,V:0,Vr:0,total:1500,pago:1500,abono:0,pr:300,pm:0});S.tab.rep='cierre';S.cierreP=4;render()});await W(200);
let r=await ev(()=>!!document.querySelector('details[data-k="efbilld"]'));ok(r,'3 · está "Contar por billetes"');
await ev(()=>{const d=document.querySelector('details[data-k="efbilld"]');d.open=true});await W(100);
/* + un billete y luego − (queda en cero): antes se cerraba */
const pon=async v=>{await ev(v=>{const i=document.getElementById('efb500');i.value=v;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))},v);await W(120)};
await pon('1');await pon('0');await pon('2');await pon('0');
r=await ev(()=>{const d=document.querySelector('details[data-k="efbilld"]');return d&&d.open});ok(r===true,'3 · al tocar + y − el desplegable sigue abierto',r);
await ev(()=>{const d=document.querySelector('details[data-k="efbilld"]');d.open=false});await W(80);await ev(()=>render());r=await ev(()=>document.querySelector('details[data-k="efbilld"]').open);ok(r===false,'3 · si el chofer lo cierra, se queda cerrado',r);

/* ---- 5 · un solo "?" ---- */
for(const rol of ['admin','rep']){r=await ev(rol=>{S.role=rol;S.pinOk[pinKey()]=true;S.tab.rep='ruta';S.tab.admin='inicio';render();return [...document.querySelectorAll('header.top button')].filter(x=>x.textContent.trim()==='?').length},rol);ok(r===1,'5 · un solo "?" en el encabezado ('+rol+')',r)}
await ev(()=>{S.role='admin';S.tab.admin='inicio';render();document.querySelector('header.top [data-act="help"]').click()});await W(150);
r=await ev(()=>!!document.getElementById('guiab')||!!S.modal||!!document.querySelector('[role="dialog"]'));ok(r,'5 · el "?" sí hace algo');
await ev(()=>{const o=document.getElementById('guiab');if(o)o.remove();S.modal=null;render()});

/* ---- 6 · burbuja ---- */
r=await ev(()=>{S.role='rep';S.tab.rep='cierre';render();return guiaLibre()});ok(r===false,'6 · la burbuja no sale en el cierre');
r=await ev(()=>{S.role='admin';S.tab.admin='clientes';render();const i=document.createElement('input');document.querySelector('main').appendChild(i);i.focus();return guiaLibre()});ok(r===false,'6 · ni mientras escribe');
await ev(()=>{document.activeElement.blur();S.tab.admin='inicio';render();guiaBurbuja(true)});r=await ev(()=>{const o=document.getElementById('guiab');if(!o)return null;const q=o.getBoundingClientRect();return {top:q.top,bot:q.bottom,h:innerHeight}});
ok(r&&r.bot<r.h/2,'6 · la burbuja sale arriba (no tapa los botones de abajo)',r);await ev(()=>{const o=document.getElementById('guiab');if(o)o.remove()});

/* ---- 7 · fotos ---- */
r=await ev(()=>{const c=document.createElement('canvas');c.width=80;c.height=60;c.getContext('2d').fillRect(0,0,80,60);const u=c.toDataURL('image/jpeg');
 S.tab.admin='inicio';render();const d=document.createElement('div');d.innerHTML=thumb(u);document.querySelector('main').appendChild(d);const im=d.querySelector('img');im.style.width='70px';return fotoZoomable(im)});
ok(r===true,'7 · las miniaturas de las fotos del vehículo (cierre recibido) se abren en grande');
r=await ev(()=>{const im=document.querySelector('header img');return im?fotoZoomable(im):false});ok(r===false,'7 · el logo de arriba no');

/* ---- 14 · sin "Comenzar" ---- */
await ev(()=>{bienvMostrar()});ok(await ev(()=>!document.getElementById('bienv')),'14 · ya no sale la pantalla de "Comenzar"');

/* ---- 15 · el tutorial espera a que se atiendan las urgentes ---- */
await ev(()=>{S.popVisto={};S.popI=0;S.faltantes=S.faltantes||[];S.faltantes.push({ch:1,m:50,fecha:iso(TODAY),pend:true});S.tab.admin='inicio';render()});
r=await ev(()=>!!popHTML());ok(r,'15 · hay tarjeta urgente');
await ev(()=>{S.tut={k:'admin',i:0,prev:{tab:'inicio'}};render()});r=await ev(()=>({tut:!!S.tut,pend:!!_tutPend59}));ok(!r.tut&&r.pend,'15 · el tutorial NO sale encima de las urgentes (espera)',r);

/* ---- 17 · Atender ---- */
r=await ev(()=>popItems().map(x=>x.t+' :: '+x.b.map(b=>b[1]+b[2]).join(',')));console.log(r);
await ev(()=>{const x=[...document.querySelectorAll('[data-pop]')].find(b=>b.dataset.act==='popgo'||b.dataset.act==='avgo');x.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));x.click()});await W(250);
r=await ev(()=>({tab:S.tab.admin,pop:!!document.querySelector('[aria-label="Aviso urgente"]'),i:S.popI||0,vis:(S.popVisto||{}).admin}));
ok(!r.pop,'17 · "Atender" te lleva a donde se resuelve (sin otra tarjeta encima)',r);
await ev(()=>{S.tab.admin='clientes';render();S.tab.admin='inicio';render()});await W(100);r=await ev(()=>({pop:!!document.querySelector('[aria-label="Aviso urgente"]'),n:popItems().length,i:S.popI||0,vis:(S.popVisto||{}).admin===iso(TODAY)}));
ok(r.pop&&r.i===1,'17 · al regresar a Inicio sigue la siguiente (sin brincarse ninguna)',r);
/* al terminar las urgentes, ya sale el tutorial */
await ev(()=>{S.popVisto={admin:iso(TODAY)};render()});await W(1700);r=await ev(()=>({tut:!!S.tut,pend:!!_tutPend59}));ok(r.tut&&!r.pend,'15 · terminadas las urgentes, ya sale el tutorial',r);

ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
