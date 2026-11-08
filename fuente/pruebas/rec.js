const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
const prep=async()=>{await ev(()=>{S=JSON.parse(window.__snap);S.cierre.salioR=Math.max(sum(S.log,function(l){return l.R}),0)+6;S.cierre.salioM=r2(sum(S.log,function(l){return l.M})+15);S.cierre.gxConf=true;S.cierre.sent=true;S.cierre.res=cierreRes();S.recep=null;S.role='admin';S.tab.admin='cierreadm';render();scrollTo(0,0)});await W(200)};
await prep();
let r=await ev(()=>{var t=document.querySelector('main').innerText;return {res:[S.cierre.res.reg,S.cierre.res.regK,S.cierre.res.V],reg:/regresan/.test(t),vals:['rcR','rcM','rcV'].map(function(i){var e=document.getElementById(i);return e?e.value:'X'}),vac:/se cuentan abajo/.test(t)}});
ok(!r.reg&&r.vac,'arriba no se ve cuánto regresa ni las vacías',r);ok(r.vals.join('')==='','los campos vienen vacíos',r.vals);
await p.screenshot({path:'v50/rec1.png',fullPage:true});
// confirmar sin contar
await ev(()=>{document.getElementById('rcR').value='6';document.querySelector('[data-act="recep"]').click()});await W(150);
r=await ev(()=>({t:S.toast,rec:S.recep}));ok(!r.rec&&/Falta contar/.test(r.t),'sin contar todo no deja confirmar',r.t);
// todo cuadra
await ev(()=>{var R=S.cierre.res;document.getElementById('rcR').value=R.reg;document.getElementById('rcM').value=R.regK;document.getElementById('rcV').value=R.V;document.querySelector('[data-act="recep"]').click()});await W(150);
r=await ev(()=>({t:S.toast,rec:S.recep,m:!!S.modal}));ok(r.rec&&!r.m&&/cuadra/.test(r.t),'si cuadra se confirma directo',r.t);
// faltante → chofer
await prep();let f0=await ev(()=>S.faltantes.length),inv0=await ev(()=>[S.inv.maduras,S.inv.vacias]);
await ev(()=>{var R=S.cierre.res;document.getElementById('rcR').value=R.reg-2;document.getElementById('rcM').value=R.regK;document.getElementById('rcV').value=R.V-1;document.querySelector('[data-act="recep"]').click()});await W(200);
r=await ev(()=>({m:S.modal&&S.modal.t,b:S.modal&&S.modal.b.map(function(x){return x[0]})}));ok(r.m&&/2 cajas de roatán/.test(r.m)&&/1 caja vacía/.test(r.m)&&r.b.length===2,'si falta, pregunta qué fue',r);
await p.screenshot({path:'v50/rec2.png'});
await ev(()=>{document.querySelector('[data-act="recfal"][data-m="chofer"]').click()});await W(200);
r=await ev(()=>({f:S.faltantes.slice(-1)[0],n:S.faltantes.length,rec:S.recep,inv:[S.inv.maduras,S.inv.vacias],esp:2*num(S.precio.R)+num(S.cfg.cajaVal)}));
ok(r.n===f0+1&&Math.abs(r.f.m-r.esp)<0.01&&r.f.ch===+1||r.f.ch>0,'faltante del chofer a precio de venta',{m:r.f.m,esp:r.esp,txt:r.f.txt});
var R0=await ev(()=>S.cierre.res);ok(r.inv[0]===inv0[0]+R0.reg-2&&r.inv[1]===inv0[1]+R0.V-1,'la bodega queda con lo que de verdad se contó',{antes:inv0,despues:r.inv});
let t=await ev(()=>document.querySelector('main').innerText);ok(/la app esperaba/.test(t)&&/faltante de/.test(t),'ya confirmada: se ve lo esperado y que fue faltante');
await p.screenshot({path:'v50/rec3.png',fullPage:true});
// faltante → merma
await prep();let m0=await ev(()=>S.mermas.length);f0=await ev(()=>S.faltantes.length);
await ev(()=>{var R=S.cierre.res;document.getElementById('rcR').value=R.reg-1;document.getElementById('rcM').value=R.regK;document.getElementById('rcV').value=R.V;document.querySelector('[data-act="recep"]').click()});await W(150);
await ev(()=>{document.querySelector('[data-act="recfal"][data-m="merma"]').click()});await W(150);
r=await ev(()=>({m:S.mermas.length,f:S.faltantes.length,l:S.mermas.slice(-1)[0]}));ok(r.m===m0+1&&r.f===f0,'o como merma, sin cobrarle al chofer',r.l&&r.l.tipo);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
