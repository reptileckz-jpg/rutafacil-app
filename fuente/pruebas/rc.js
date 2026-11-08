const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
const prep=async()=>{await ev(()=>{S=JSON.parse(window.__snap);S.cierre.salioR=Math.max(sum(S.log,function(l){return l.R}),0)+6;S.cierre.salioM=r2(sum(S.log,function(l){return l.M})+15);S.cierre.gxConf=true;S.cierre.sent=true;S.cierre.res=cierreRes();S.cierre.res.efectivo=1500;S.cierre.res.V=10;S.recep=null;S.cierreReg=null;S.cierreRec='';S.role='admin';S.tab.admin='cierreadm';render();scrollTo(0,0)});await W(200)};
/* 82 */
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.cierre.billOn=true;render()});
let r=await ev(()=>{var h=efPasoHTML();return {mm:(h.match(/data-act="mmmas"/g)||[]).length,mon:/id="efmon"/.test(h)}});ok(r.mm===6&&r.mon,'billetes con + y − (6), monedas escrito',r);
/* 85 todo llegó */
await prep();await ev(()=>document.querySelector('[data-act="rcabre"]').click());await W(150);
r=await ev(()=>document.getElementById('rcov')&&document.getElementById('rcov').innerText);ok(/debe regresar/.test(r)&&/Cajas vacías/.test(r)&&/Kilos de macho/.test(r)&&/Efectivo/.test(r),'tarjeta: lo que debe regresar',r);
await p.screenshot({path:'v50/rc1.png'});
await ev(()=>document.querySelector('[data-act="rctodo"]').click());await W(150);
r=await ev(()=>({p:S.rcv&&S.rcv.p,t:document.getElementById('rcov').innerText}));
if(r.p===2){ok(true,'pide revisar el equipo');await ev(()=>document.querySelector('[data-act="rceqok"]').click());await W(100);ok(await ev(()=>/Falta revisar/.test(document.getElementById('rcov').innerText)),'sin marcar equipo no avanza');
 await ev(()=>{document.querySelectorAll('#rcov [data-act="eqest"][data-v="bien"]').forEach(function(b){b.click()})});await W(100);await p.screenshot({path:'v50/rc2.png'});await ev(()=>document.querySelector('[data-act="rceqok"]').click());await W(100)}
r=await ev(()=>({p:S.rcv&&S.rcv.p,t:document.getElementById('rcov').innerText}));ok(r.p===3&&/Todo cuadra/.test(r.t),'todo cuadra',r);
await ev(()=>document.querySelector('[data-act="rcfin"]').click());await W(200);
r=await ev(()=>({rc:S.rcv,reg:S.cierreReg,recep:S.recep,m:S.modal}));ok(!r.rc&&r.reg&&r.recep&&!r.m&&r.recep.dR===0,'registra efectivo y fruta',r);
/* 85+91 faltante → descontar */
await prep();let f0=await ev(()=>S.faltantes.length);await ev(()=>document.querySelector('[data-act="rcabre"]').click());await W(100);
await ev(()=>document.querySelector('[data-act="rcdif"]').click());await W(100);
await ev(()=>{var i=document.getElementById('rcxE');i.value=String(Math.max(0,S.cierre.res.efectivo-200));i.dispatchEvent(new Event('input',{bubbles:true}))});
await ev(()=>{var b=document.querySelector('[data-act="mmmenos"][data-for="rcxV"]');b.click()});await W(80);
ok(await ev(()=>+S.rcv.V===S.cierre.res.V-1),'el botón − baja una caja');
await ev(()=>document.querySelector('[data-act="rcsig"]').click());await W(100);
if(await ev(()=>S.rcv.p===2)){await ev(()=>{document.querySelectorAll('#rcov [data-act="eqest"][data-v="bien"]').forEach(function(b){b.click()})});await W(80);
 await ev(()=>{var b=document.querySelector('#rcov [data-act="eqest"][data-v="mal"]');b.click()});await W(80);await ev(()=>{var i=document.querySelector('#rcov [data-eqn]');i.value='pantalla estrellada';i.dispatchEvent(new Event('input',{bubbles:true}))});await ev(()=>document.querySelector('[data-act="rceqok"]').click());await W(100)}
r=await ev(()=>document.getElementById('rcov').innerText);ok(/Faltan \$200/.test(r)&&/Descontárselo/.test(r)&&/Ya lo pagó/.test(r)&&/No descontar/.test(r),'faltante: 3 opciones',r);await p.screenshot({path:'v50/rc3.png'});
await ev(()=>document.querySelector('[data-act="rcfin"][data-o="desc"]').click());await W(100);ok(await ev(()=>S.modal&&/Seguro/.test(S.modal.t)),'pregunta ¿Seguro?');
await ev(()=>document.querySelector('[data-act="rcfinsi"]').click());await W(200);
r=await ev(()=>({n:S.faltantes.length,f:S.faltantes.slice(-1)[0],m:S.modal&&S.modal.t,dan:(S.eqDanos||[]).slice(-1)[0],av:S.avPrecio.slice(-2)}));
ok(r.n>=f0+1&&r.f.desc===true&&r.f.pend&&/Faltante del cierre del/.test(r.f.txt||''),'faltante se descuenta de su pago',r.f);
ok(/Faltan/.test(r.m||''),'faltan cajas: pregunta si es faltante o merma',r.m);
if(r.dan)ok(r.dan.nota==='pantalla estrellada'&&r.av.some(function(x){return /URGENTE.*mal estado/.test(x)}),'equipo en mal estado: nota + aviso urgente',r);
/* 91 ya lo pagó */
await prep();await ev(()=>{S.rcv={p:3,R:String(Math.max(0,S.cierre.res.reg)),M:String(Math.max(0,S.cierre.res.regK)),V:String(S.cierre.res.V),E:String(S.cierre.res.efectivo-100),est:{}};render()});
await ev(()=>document.querySelector('[data-act="rcfin"][data-o="pago"]').click());await W(80);await ev(()=>document.querySelector('[data-act="rcfinsi"]').click());await W(150);
r=await ev(()=>({f:S.faltantes.slice(-1)[0],a:(S.aportes||[]).slice(-1)[0]}));ok(r.f.pend===false&&r.f.desc===false&&r.a&&r.a.m===100,'ya lo pagó: entra a caja, no queda pendiente',r);
/* 90 salida */
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;(S.bienes||[]).forEach(function(b){if(b.id===8)b.quien=1});S.eqDia={};render()});
r=await ev(()=>eqDe(1).map(function(x){return x.n}));ok(r.length>=1,'equipo del chofer',r);
await ev(()=>{var b=document.createElement('button');b.dataset.act='iniciar';document.querySelector('main').appendChild(b);b.click()});await W(100);
ok(await ev(()=>!!document.getElementById('eqov')),'antes de salir: revisa el equipo');await p.screenshot({path:'v50/rc4.png'});
await ev(()=>{document.querySelectorAll('#eqov [data-act="eqest"][data-v="bien"]').forEach(function(b){b.click()})});await W(80);await ev(()=>document.querySelector('[data-act="eqok"]').click());await W(150);
ok(await ev(()=>!document.getElementById('eqov')&&!!eqRegDe(1).salida),'equipo recibido y guardado');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
