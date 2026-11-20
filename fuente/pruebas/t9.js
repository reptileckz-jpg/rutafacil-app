/* 9 (nueva numeración) · la app recuerda pagar los sueldos: el sábado (día de pago) sale en "Hoy" de Inicio, uno por empleado con su monto
   (el mismo de su ficha) y "Ir ›" abre su Sueldo; si ya pasó y no se pagó, "Falta pagarle…"; al recibir el cierre de un chofer el día de pago,
   "Ya recibiste el cierre de … · toca pagarle". Al pagarle se quita. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY)};
 window.__CH=(S.choferes||[]).filter(c=>esCh(c)&&!esAdm(c))[0];var c=window.__CH;c.sz={tipo:'semana',monto:'2600'};c.ing='2026-01-01';c.pagoHasta118='2026-11-14';c.baja=false;
 (S.choferes||[]).forEach(x=>{if(x!==c&&!esAdm(x))x.sz={tipo:'ninguno'}})});
const dia=(f)=>ev(f=>{TODAY=new Date(f+'T12:00:00');S.modal=null;S.tab.admin='inicio';render();return document.querySelector('main').innerText},f);
/* un viernes: todavía no */
r=await dia('2026-11-20');ok(!/toca pagarle su semana/.test(r),arch+' · el viernes todavía no sale',r.slice(0,80));
/* el sábado: sale en "Hoy" con el monto de su ficha */
r=await dia('2026-11-21');const k=await ev(()=>{var k=szCalc(window.__CH);return {pagar:k.pagar,n:window.__CH.n}});
ok(r.indexOf('Hoy toca pagarle su semana a '+k.n)>-1&&r.indexOf(money0(k.pagar))>-1,arch+' · el sábado sale "💵 Hoy toca pagarle su semana a … : $" (el mismo monto de su ficha)',{k,t:r.slice(0,300)});
function money0(n){return '$'+Number(n).toLocaleString('en-US',{maximumFractionDigits:2})}
r=await ev(()=>{var b=[...document.querySelectorAll('main [data-act="popgo"]')].filter(x=>/^sz9:/.test(x.dataset.t))[0];if(!b)return 'sin Ir';b.click();var ov=document.getElementById('fiov');return {tab:S.tab.admin,ch:S.openCh,pest:(S.fiTab||{})['emp:'+S.openCh],sueldo:ov?/Total a pagarle/.test(ov.innerText):false}});
ok(r.tab==='personal'&&r.pest==='sue'&&r.sueldo,arch+' · "Ir ›" abre su ficha en Sueldo',r);
/* si ya pasó el sábado y no se le pagó */
r=await dia('2026-11-23');ok(/Falta pagarle a .* la semana del/.test(r),arch+' · el lunes, si no se le pagó: "Falta pagarle a … la semana del …"',r.slice(0,200));
/* al recibir el cierre de ese chofer el día de pago */
r=await ev(()=>{TODAY=new Date('2026-11-21T12:00:00');S.openCh=null;S.sz9av={};S.chofHoy=window.__CH.id;S.cierreReg={rec:100,f:null};S.modal=null;S.tab.admin='inicio';render();var m=S.modal;return {t:m&&m.t,txt:m&&m.m,b:m&&m.b.map(x=>x[1])}});
ok(/Ya recibiste el cierre de/.test(r.t||'')&&/día de pago/.test(r.txt||'')&&(r.b||[]).indexOf('sz9go')>-1,arch+' · al recibir su cierre el sábado: "Ya recibiste el cierre de … · toca pagarle" con "Pagarle ahora"',r);
r=await ev(()=>{S.modal=null;render();return !!S.modal});ok(r===false,arch+' · sale una sola vez por semana',r);
/* al pagarle, se quita */
r=await ev(()=>{var c=window.__CH;var k=szCalc(c);c.pagoHasta118=k.hasta;S.cierreReg=null;S.tab.admin='inicio';render();return document.querySelector('main').innerText});
ok(!/toca pagarle su semana/.test(r)&&!/Falta pagarle/.test(r),arch+' · ya pagado: el aviso se quita',r.slice(0,120));
/* sin sueldo configurado o dado de baja: no sale */
r=await ev(()=>{var c=window.__CH;c.pagoHasta118='2026-11-14';c.sz={tipo:'ninguno'};render();var a=/toca pagarle/.test(document.querySelector('main').innerText);c.sz={tipo:'semana',monto:'2600'};c.baja=true;render();var b2=/toca pagarle/.test(document.querySelector('main').innerText);c.baja=false;return [a,b2]});
ok(!r[0]&&!r[1],arch+' · sin sueldo o dado de baja: no sale',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
