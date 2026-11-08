const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.open=function(){return null}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.inv.reparto=30;S.cierre.salioR=30;S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.tab.rep='entrega';var i=curStop();var c=cl(S.stops[i].c);c.lat=c.lat||19.5;c.lng=c.lng||-96.9;c.foto=c.foto||'data:x';c.tel=c.tel||'2281112222';c.hCi='18:00';c.hAb='08:00';S.cur=i;resetDraft(c);S.d.V=0;S.d.M=0;S.d.R=2;S.d.mode='todo';render()});await W(200);
let t=await ev(()=>document.querySelector('main').innerText);ok(/¿Cómo pagó\?/.test(t)&&/Efectivo/.test(t)&&/Tarjeta/.test(t),'entrega: ¿cómo pagó?');
ok(/No estaba/.test(t),'botón "No estaba" a la vista');
const tot=await ev(()=>entregaCalc().total);
await ev(()=>document.querySelector('[data-act="pforma"][data-v="tarj"]').click());await W(100);
let k=await ev(()=>{var k=entregaCalc();return {e:k.efectivo,t:k.tarj}});ok(k.e===0&&k.t===tot,'tarjeta: nada en efectivo',k);
t=await ev(()=>document.querySelector('main').innerText);ok(/Cóbrale en la terminal/.test(t),'dice cuánto cobrar en la terminal');
await ev(()=>{S.cfg.comCobra=true;render()});await W(50);k=await ev(()=>entregaCalc().comCli);ok(Math.abs(k-tot*4.06/95.94)<0.02,'cobrándole la comisión al cliente',k);await ev(()=>{S.cfg.comCobra=false});
/* mixto */
await ev(()=>{document.querySelector('[data-act="pforma"][data-v="otros"]').click()});await W(50);await ev(()=>document.querySelector('[data-act="pforma"][data-v="mixto"]').click());await W(50);
await ev(()=>{S.d.mixM='100';render()});k=await ev(()=>{var k=entregaCalc();return {e:k.efectivo,t:k.tarj}});ok(k.t===100&&Math.abs(k.e-(tot-100))<0.01,'mixto: parte tarjeta y parte efectivo',k);
/* guardar con tarjeta */
await ev(()=>{S.d.forma='tarj';render()});const n0=await ev(()=>S.log.length);const g0=await ev(()=>S.gastos.length);
await ev(()=>{document.querySelector('[data-act="entconf"]').click()});await W(200);console.log('DBG',await ev(()=>JSON.stringify({err:S.err,m:S.modal&&S.modal.t,toast:S.toast,falta:window._faltaSel})));await ev(()=>{var b=document.querySelector('[data-act="guardar"]');if(b)b.click()});await W(400);
for(let i=0;i<3;i++){await ev(()=>{var b=[...document.querySelectorAll('[data-act="guardar"],[data-act="tknowa"]')].filter(x=>x.getClientRects().length)[0];if(b)b.click()});await W(200)}
const L=await ev(()=>({n:S.log.length,l:S.log[S.log.length-1],banco:bancoSaldo(),g:S.gastos.slice(-1)[0],ef:cierreRes().efectivo,tot:cierreRes().total}));
ok(L.n===n0+1&&L.l.tarj===tot,'la entrega queda con tarjeta',L.l);
ok(Math.abs(L.banco-(tot-tot*0.0406))<0.02,'al banco va lo cobrado menos la comisión',L.banco);
ok(L.g&&L.g.t==='Comisión de tarjeta'&&L.g.caja===false,'comisión como gasto (no sale de caja)',L.g);
ok(await ev(()=>{var r=cierreRes();return r.tarj>0}),'el cierre separa lo de tarjeta');
/* retiro del banco a la caja */
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tab.admin='inicio';S.popVisto={admin:iso(TODAY)};render()});await W(200);
const c0=await ev(()=>cajaEsp());await ev(()=>{S.bret={m:'50'};S.dOpen.banco=true;render();document.querySelector('[data-act="bretsi"]').click()});await W(100);
const c1=await ev(()=>cajaEsp());ok(Math.abs(c1-c0-50)<0.01,'retirar del banco suma a la caja',[c0,c1]);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
