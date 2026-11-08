const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{window.__c=[];window.Capacitor={Plugins:{RutaNativa:{compartir:o=>{__c.push(o);return Promise.resolve({})}}}};S.cfg.tel='228 555 0000';S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.salida.fotosFin=S.salida.fotosFin||{};FOTOS.forEach(f=>S.salida.fotosFin[f[0]]='data:x');S.salida.fotosFin.odo='data:x';S.cierre.odo=String(num(S.cierre.odoIni)+50);S.cierre.tankOk=true;S.cierre.gxConf=true;S.log.push({c:8,R:5,M:0,V:0,Vr:0,total:1500,pago:1500,abono:0,pr:300,pm:0});S.tab.rep='cierre';S.cierreP=4;render()});await W(200);
let t=await ev(()=>document.querySelector('main').innerText);ok(/¿Cuánto entregas\?/.test(t)&&/Contar por billetes/.test(t),'paso efectivo: cuánto entregas y billetes');
const deb=await ev(()=>num(cierreRes().efectivo));
await ev(()=>{var i=document.getElementById('efent');i.value=String(num(cierreRes().efectivo)-100);i.dispatchEvent(new Event('input',{bubbles:true}))});await W(50);
t=await ev(()=>document.getElementById('efdif').innerText);ok(/Faltan \$100/.test(t),'muestra el faltante',t);
await ev(()=>document.querySelector('.wz-nav [data-act="cipaso"]:last-child').click());await W(100);ok(await ev(()=>S.cierreP===4),'sin motivo no avanza');
await ev(()=>{var i=document.getElementById('efmot');i.value='me faltó cobrar';i.dispatchEvent(new Event('input',{bubbles:true}));var j=document.getElementById('efbol');j.value='A77';j.dispatchEvent(new Event('input',{bubbles:true}))});
/* billetes */
await ev(()=>{var d=document.querySelector('details[data-k="efbilld"]');d.open=true;var i=document.getElementById('efb500');i.value='2';i.dispatchEvent(new Event('input',{bubbles:true}))});await W(50);
ok(await ev(()=>/\$1,000/.test(document.getElementById('efbtot').textContent)&&efEntrega()===1000),'billetes: suma 2 × $500');
await ev(()=>{var i=document.getElementById('efb500');i.value='';i.dispatchEvent(new Event('input',{bubbles:true}));S.cierre.billOn=false;S.cierre.entrega=String(num(cierreRes().efectivo)-100)});
await ev(()=>document.querySelector('.wz-nav [data-act="cipaso"]:last-child').click());await W(150);ok(await ev(()=>S.cierreP===5),'con motivo avanza');
t=await ev(()=>document.querySelector('main').innerText);ok(/Entregas/.test(t)&&/Faltan/.test(t)&&/A77/.test(t),'resumen con lo que entrega y la bolsa');
await ev(()=>{var b=[...document.querySelectorAll('main button')].find(x=>/Enviar cierre|Terminar mi ruta/.test(x.textContent));b.click()});await W(500);
for(let k=0;k<3;k++){await ev(()=>{if(S.cierre.sent)return;var b=[...document.querySelectorAll('button')].filter(x=>x.getClientRects().length&&/^(Sí|Enviar|Confirmar)/.test(x.textContent.trim())&&!x.closest('main'))[0];if(b)b.click()});await W(300)}
const r=await ev(()=>({sent:S.cierre.sent,c:S.cierre.corte,av:S.avPrecio.slice(-3),sh:__c.map(x=>x.tel+':'+x.nombre)}));
ok(r.sent&&r.c&&r.c.dif===-100&&r.c.v&&r.c.v.length===6,'corte guardado con código de verificación',r.c);
ok(r.av.some(x=>/URGENTE: .*entrega .*faltan \$100\): me faltó cobrar/.test(x)),'aviso urgente del faltante',r.av);
ok(r.sh.some(x=>/^2285550000:corte/.test(x)),'foto del corte directo al WhatsApp del negocio',r.sh);
t=await ev(()=>document.querySelector('main').innerText);ok(/(Buenos días|Buenas tardes|Buenas noches), /.test(t)&&/Cierre enviado/.test(t)&&/Listo por hoy/.test(t),'pantalla después del cierre',t.slice(0,200));
ok(await ev(()=>!document.getElementById('pinov')),'no pide el PIN');
/* sin permiso: se reabre solo */
await ev(()=>{S.choferes.find(c=>c.id===1).segPerm=false;render();document.querySelector('[data-act="seguir"][data-k="carga"]').click()});await W(200);
ok(await ev(()=>!S.cierre.sent&&!!document.getElementById('cxov')),'chofer sin permiso: se reabre solo y pide lo que cargó');
await ev(()=>{S.cx=null;render()});
/* pasar la ruta (admin) */
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;nbRSet(3,'stops',[{c:8},{c:9},{c:10}]);var h=document.createElement('button');h.dataset.act='pasar';h.dataset.id='3';document.body.appendChild(h);h.click();h.remove()});await W(100);
ok(await ev(()=>!!document.getElementById('bjov')&&/Pasar la ruta/.test(document.getElementById('bjov').innerText)),'pantalla para pasar la ruta');
await ev(()=>{document.querySelector('[data-act="pasaa"][data-id="1"]').click()});await W(50);await ev(()=>document.querySelector('[data-act="pasasi"]').click());await W(100);
ok(await ev(()=>pendDe(3).length===0&&stopsDe(1).filter(s=>s.apoyo===3).length===3),'clientes pasados a otro chofer (solo hoy)');
/* QR del corte */
const q=await ev(()=>{var d=S.cierre.corte;return corteQR(d).length});ok(q>20,'QR del corte armado');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
