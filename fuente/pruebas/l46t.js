const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin={v:'',modo:null};S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tutVisto={rep:true,admin:true};S.tab.admin='clientes';render()});await W(200);
let t=await ev(()=>document.body.innerText);ok(!/\bdemo\b|Prototipo|de ejemplo/i.test(t),'versión real: sin "demo", "Prototipo" ni "de ejemplo" en pantalla',(t.match(/.{0,30}(demo|Prototipo|de ejemplo).{0,30}/i)||[''])[0]);
ok(await ev(()=>document.querySelectorAll('.cligrid button').length===6&&!!document.querySelector('[data-act="clialta"]')),'clientes: cuadrícula de filtros y "+ Agregar cliente"');
await ev(()=>{abrirModal('Falta llenar','Marca. En la app final no te dejará seguir sin esto. En la demo puedes seguir.',[['Seguir sin llenarlo (solo demo)','wzforce']])});await W(100);
t=await ev(()=>document.body.innerText);ok(!/demo/i.test(t)&&!/Seguir sin llenarlo/.test(t),'alerta de vehículo: sin "demo" y sin seguir sin llenar',(t.match(/Falta llenar[\s\S]{0,120}/)||[''])[0]);
await ev(()=>{S.modal=null;render()});
/* tarjetas: nada suelto en las fichas de vehículo */
ok(await ev(()=>{S.tab.admin='vehiculos';var v=S.veh[0];S.vehOpen=v.id;S.fiTab['veh:'+v.id]='gas';render();return [...document.querySelectorAll('#fiov .fibody > *')].every(x=>/\bcard\b/.test(x.className)||/^(H1|H2|BUTTON)$/.test(x.tagName))}),'ficha del vehículo → Gastos: todo en tarjetas');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
