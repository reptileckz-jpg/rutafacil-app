const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const img=require('fs').readFileSync('v50/n0.png');
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pinOk[pinKey()]=true;S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;S.salida.ok=true;S.inv.maduras=50;S.tutVisto={rep:true,admin:true};S.inv.kgMaduro=100;S.tab.rep='cierre';S.cierreP=0;render()});
const txt=()=>ev(()=>document.querySelector('main').innerText);const next=async()=>{await ev(()=>{var b=document.querySelector('.wz-nav [data-act="cipaso"]:last-child');b.click()});await W(150)};
ok(/Paso 1 de 6 · Odómetro/.test(await txt())&&!/Nivel del tanque/.test(await txt()),'paso 1: solo el odómetro');
await next();ok(/Paso 1 de 6/.test(await txt()),'sin foto del odómetro no avanza');
ok(await ev(()=>!!document.querySelector('[data-act="fotono"][data-k="odo"]')),'hay "No pude tomarla"');
await p.setInputFiles('#foto_fotosFinodo',{name:'o.png',mimeType:'image/png',buffer:img}).catch(async()=>{await ev(()=>{S.salida.fotosFin=S.salida.fotosFin||{};S.salida.fotosFin.odo='data:x'})});await W(600);
await next();ok(/Paso 2 de 6 · Gasolina/.test(await txt())&&/Nivel del tanque/.test(await txt())&&!/Odómetro final/.test(await txt()),'paso 2: solo la gasolina',(await txt()).slice(0,120));
await next();ok(/Paso 2 de 6/.test(await txt()),'sin confirmar el tanque no avanza');
await ev(()=>document.querySelector('[data-act="citankok"]').click());await W(100);await next();ok(/Paso 3 de 6 · Fotos/.test(await txt()),'paso 3: fotos');
await next();ok(/Paso 3 de 6/.test(await txt()),'sin las 4 fotos no avanza');
// "No pude tomarla" en una foto
await ev(()=>document.querySelector('[data-act="fotono"]').click());await W(100);ok(await ev(()=>!!document.getElementById('fnov')),'pantalla de "¿por qué no pudiste?"');
await ev(()=>document.querySelector('[data-act="fnm"]').click());await ev(()=>document.querySelector('[data-act="fnsave"]').click());await W(100);
await ev(()=>{FOTOS.forEach(function(f){if(!S.salida.fotosFin[f[0]])S.salida.fotosFin[f[0]]='data:x'});render()});
var r=await ev(()=>S.avPrecio.slice(-1)[0]);ok(/no tomó la foto/.test(r),'aviso al admin por la foto que no tomó',r);
await next();ok(/Paso 4 de 6 · Cajas/.test(await txt()),'paso 4: cajas');await next();ok(/Paso 5 de 6 · Efectivo/.test(await txt()),'paso 5: efectivo');await next();
ok(/Paso 6 de 6 · Enviar/.test(await txt())&&/Revisa antes de enviar/.test(await txt()),'paso 6: resumen y enviar');
console.log('BTN',await ev(()=>{var b=[...document.querySelectorAll('main button')].find(x=>/Enviar cierre|Terminar mi ruta/.test(x.textContent));return b.outerHTML.slice(0,200)}));await ev(()=>{var b=[...document.querySelectorAll('main button')].find(x=>/Enviar cierre|Terminar mi ruta/.test(x.textContent));b.click()});await W(400);
await ev(()=>{var d=[...document.querySelectorAll('[role=dialog]')].find(x=>/gastos/.test(x.innerText));if(d){var bs=[...d.querySelectorAll('button[data-act]')];console.log('GXBTNS '+bs.map(x=>x.dataset.act+':'+x.textContent.trim()).join(','));var b=bs.find(x=>/enviar|Sí|Ya|listo/i.test(x.textContent));if(b)b.click()}});await W(400);
for(let k=0;k<3;k++){const cl2=await ev(()=>{if(S.cierre.sent)return 'sent';var bs=[...document.querySelectorAll('button')].filter(x=>x.getClientRects().length&&/^(Sí|Si,|Sí,|Enviar|Confirmar)/.test(x.textContent.trim())&&!x.closest('main'));var b=bs[0];if(b){b.click();return b.dataset.act+':'+b.textContent.trim()}return null});console.log('CLICK',cl2);await W(400)}
r=await ev(()=>({sent:S.cierre.sent,tab:S.tab.rep,t:document.querySelector('main').innerText.slice(0,200),conf:!!S.confirm}));
if(!r.sent&&r.conf){await ev(()=>{var b=document.querySelector('[data-act="confok"],[data-act="conf"],#confirm [data-act]');console.log(b&&b.dataset.act);});}
console.log(JSON.stringify(r).slice(0,100),await ev(()=>JSON.stringify({t:S.toast,m:S.modal,c:S.confirm,err:S.err,falta:S.falta,gp:S.gxPopR,gc:S.cierre.gxConf,dlg:[...document.querySelectorAll('[role=dialog]')].map(x=>x.id+':'+x.innerText.slice(0,80))})));
ok(r.sent&&r.tab==='ruta'&&/Cierre enviado/.test(r.t),'al enviar: regresa a "Hola" con "Cierre enviado"',r);
// pedir seguir (chofer con permiso)
await ev(()=>{S.choferes.find(c=>c.id===+S.chofHoy).segPerm=true;render()});
await ev(()=>{var b=document.querySelector('[data-act="seguir"][data-k="carga"]');b.click()});await W(150);
r=await ev(()=>({reab:S.reab,sent:S.cierre.sent,t:document.querySelector('main').innerText}));ok(r.reab&&r.reab.est==='pend'&&/Esperando permiso/.test(r.t)&&r.sent===true,'pedir seguir: queda esperando permiso (no se reabre solo)',r.reab);
// el admin autoriza
await ev(()=>{S.reab.est='ok';render()});await W(200);
r=await ev(()=>({sent:S.cierre.sent,cx:!!document.getElementById('cxov'),p:S.cierreP}));ok(!r.sent&&r.cx&&r.p===0,'autorizado: se reabre y sale "¿Cuánto cargaste?"',r);
await ev(()=>document.querySelector('[data-act="cxsave"]').click());await W(100);ok(/cuántas cajas/.test(await ev(()=>S.cx.err)),'sin cantidades: avisa');
await ev(()=>{S.cx.R='5';render();document.querySelector('[data-act="cxsave"]').click()});await W(100);ok(/foto/.test(await ev(()=>S.cx.err)),'sin foto: avisa');
await p.setInputFiles('#cxF',{name:'c.png',mimeType:'image/png',buffer:img});await W(700);
const rep0=await ev(()=>S.inv.reparto);await ev(()=>document.querySelector('[data-act="cxsave"]').click());await W(150);
r=await ev(()=>({rep:S.inv.reparto,mad:S.inv.maduras,cx:!!S.cx,foto:!!(S.extras.slice(-1)[0]||{}).foto}));ok(r.rep===rep0+5&&r.mad===45&&!r.cx&&r.foto,'carga extra: suma al camión, resta de bodega, con foto',r);
// PIN sin saltar
r=await ev(()=>{S.pins[pinKey()]='4821';S.pinOk={};pinEntrar();render();var o=document.getElementById('pinov');return o.innerText});ok(!/Saltar|demo/.test(r),'PIN: sin "saltar" ni "demo"');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
