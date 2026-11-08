const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const q=()=>ev(()=>(document.querySelector('#wzov .q')||{}).innerText||'');const sig=()=>ev(()=>document.querySelector('#wzov [data-act="wzsig"]:not([data-salta]),#wzov [data-act="wzfin"]').click()).then(()=>W(80));
const pon=(k,v)=>ev(([k,v])=>{var i=document.getElementById('wz_'+k);i.value=v;i.dispatchEvent(new Event(i.tagName==='SELECT'?'change':'input',{bubbles:true}))},[k,v]).then(()=>W(60));
const op=(k,v)=>ev(([k,v])=>document.querySelector('#wzov [data-act="wzop"][data-k="'+k+'"][data-v="'+v+'"]').click(),[k,v]).then(()=>W(80));
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};S.tutVisto={rep:true,admin:true};S.tab.admin='vehiculos';render()});
/* vehículo auto */
await ev(()=>{var b=document.createElement('button');b.dataset.act='vnew';document.querySelector('main').appendChild(b);b.click()});await W(150);
ok(await ev(()=>!!document.getElementById('wzov')),'vehículo nuevo: pantalla completa por pasos');
await sig();ok(await ev(()=>/Escoge si es de carga o auto/.test(S.wz.err)&&!!document.querySelector('#wzov .falta')),'sin escoger: dice qué falta y se marca');
await op('tipo','auto');ok(/marca/i.test(await q()),'escoger tipo avanza solo',await q());
await pon('marca','Toyota');await sig();await pon('modelo','Corolla');await sig();await pon('anio','2019');await sig();await sig();
await pon('pl','ABC-123');await sig();await op('comb','Magna');await sig();await pon('capL','50');await sig();
let t=await q();ok(/kilómetros marca/.test(t),'auto: se salta "¿Cuánto le cabe?"',t);
await pon('odo','80000');await sig();await sig();await sig();
t=await ev(()=>document.getElementById('wzov').innerText);ok(/Revisa y guarda/.test(t)&&/Toyota Corolla\s*2019/.test(t),"revisar",t.slice(0,200));
const n0=await ev(()=>S.veh.length);await ev(()=>document.querySelector('[data-act="wzfin"]').click());await W(200);
let r=await ev(()=>{var v=S.veh[S.veh.length-1];return {n:S.veh.length,nom:v.n,auto:v.esAuto,capC:v.capC,pl:v.pl}});ok(r.n===n0+1&&r.auto&&!r.capC&&r.nom==='Toyota Corolla 2019','auto guardado sin capacidad de carga',r);
/* cliente */
await ev(()=>{S.tab.admin='clientes';render();document.querySelector('[data-act="clialta"]').click()});await W(150);
await pon('n','Abarrotes Prueba Uno');await sig();await pon('tel','228 111 2222');await sig();await sig();
await ev(()=>document.querySelectorAll('[data-act="wzdia"]')[1].click());await W(50);await sig();
await ev(()=>{var s=document.getElementById('wz_chofer');s.value=s.options[1].value;s.dispatchEvent(new Event('change',{bubbles:true}))});await W(80);await sig();
await op('cred','si');await sig();await pon('lim','2500');await sig();await ev(()=>document.querySelector('[data-act="wzfin"]').click());await W(150);
r=await ev(()=>{var c=S.cli.find(x=>x.n==='Abarrotes Prueba Uno');return c&&{tel:c.tel,dias:c.dias,lim:c.lim,cred:c.credOk}});ok(r&&r.tel==='2281112222'&&r.dias[0]===1&&r.lim===2500&&r.cred,'cliente agregado por el admin',r);
/* proveedor */
await ev(()=>{S.openCli=null;S.tab.admin='cargas';render();var b=document.querySelector('[data-act="provalta"]');b.click()});await W(150);
await pon('n','Don Chuy');await sig();await op('tipo','Macho');await pon('tel','2289998877');await sig();await pon('link','https://www.google.com/maps/@19.6,-96.8,15z');await sig();await ev(()=>document.querySelector('[data-act="wzfin"]').click());await W(150);
r=await ev(()=>S.provDir['Don Chuy']);ok(r&&r.tipo==='Macho'&&r.tel==='2289998877','proveedor agregado',r);
/* simulador */
await ev(()=>{render();document.querySelector('[data-act="simabre"]').click()});await W(150);
await ev(()=>{var n=provNames().find(n=>svPunto(n));window._pv=n;document.querySelector('[data-act="svprov"][data-v="'+n+'"]').click()});await W(80);await sig();
await op('basc','no');await sig();await ev(()=>{var s=document.getElementById('wz_veh');s.value=s.options[1].value;s.dispatchEvent(new Event('change',{bubbles:true}))});await W(80);await sig();
r=await ev(()=>({km:document.getElementById('wz_km').value,a:document.querySelector('#wzov .ayuda').innerText}));ok(+r.km>0&&/Calculado por la app/.test(r.a),'simulador: km calculados solos con el recorrido',r);
await sig();await ev(()=>{var R=provVende(window._pv,'R');var a=document.getElementById(R?'wz_c0':'wz_k0'),b=document.getElementById(R?'wz_pr0':'wz_pm0');a.value='300';a.dispatchEvent(new Event('input',{bubbles:true}));b.value='9';b.dispatchEvent(new Event('input',{bubbles:true}))});await sig();await pon('dias','1');await sig();
t=await ev(()=>document.getElementById('wzov').innerText);ok(/Este viaje deja/.test(t),'simulador: resultado',(t.match(/Este viaje deja[^\n]*/)||[''])[0]);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
