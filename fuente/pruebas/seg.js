const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const act=(a,d)=>ev(([a,d])=>{var b=document.createElement('button');b.dataset.act=a;Object.keys(d||{}).forEach(function(k){b.dataset[k]=d[k]});b.dataset.ok='1';document.body.appendChild(b);b.click();b.remove()},[a,d]);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='rep';S.salida.ok=true;S.inv.maduras-=6;S.inv.reparto+=6;S.cierre.salioR=sum(S.log,function(l){return l.R})+6;S.cierre.salioM=sum(S.log,function(l){return l.M});S.inv.repartoKg=0;S.cierre.gxConf=true;S.cierre.fotoReg='x';render()});
const tot=()=>ev(()=>cajasDonde().tot);let t0=await tot();
await act('enviar');await W(100);ok(await ev(()=>regPend()),'enviado y sin contar');ok(await tot()===t0,'el total de cajas no cambia',[t0,await tot()]);
// caso 1: reabre
await act('seguir');await W(100);await ev(()=>{if(S.reab&&S.reab.est==='pend'){S.reab.est='ok';render();S.cx=null;render()}});await W(100);let r=await ev(()=>({s:S.cierre.sent,pc:S.cierre.porContar,rep:S.inv.reparto}));ok(!r.s&&!r.pc&&r.rep===6&&await tot()===t0,'reabrir: todo vuelve como estaba',r);
// caso 2: recibe dinero sin contar y empieza segundo cierre
await ev(()=>{S.cierre.fotoReg='x'});await act('enviar');await W(100);await ev(()=>{S.role='admin';S.cierreRec=String(S.cierre.res.efectivo);render()});await act('regcierre');await W(100);
await ev(()=>{S.role='rep';render()});await act('seguir',{k:'carga'});await W(150);await ev(()=>{if(S.reab&&S.reab.est==='pend'){S.reab.est='ok';render();S.cx=null;render()}});await W(150);
r=await ev(()=>({rep:S.inv.reparto,sal:S.cierre.salioR,recep:S.recep,av:S.avPrecio.slice(-1)[0]}));ok(r.rep===6&&r.sal===6&&!r.recep&&/siguen en su camión/.test(r.av),'segundo cierre: lo no contado sigue en el camión',r);ok(await tot()===t0,'total igual',[t0,await tot()]);
// caso 3: primero se contó, luego segundo cierre: la recepción empieza de cero
await ev(()=>{S.log=[];S.cierre.fotoReg='x';S.cierre.gxConf=true;render()});await act('enviar');await W(100);await ev(()=>{S.role='admin';S.cierreRec=String(S.cierre.res.efectivo);render()});await act('regcierre');await W(100);
await ev(()=>{S.tab.admin='cierreadm';render();var R=S.cierre.res;document.getElementById('rcR').value=R.reg;document.getElementById('rcM').value=R.regK;document.getElementById('rcV').value=R.V;document.querySelector('[data-act="recep"]').click()});await W(100);
ok(await ev(()=>!!S.recep),'contado');await ev(()=>{S.role='rep';render()});await act('seguir',{k:'carga'});await W(150);await ev(()=>{if(S.reab&&S.reab.est==='pend'){S.reab.est='ok';render();S.cx=null;render()}});await W(150);ok(await ev(()=>S.recep===null),'segundo cierre: la recepción empieza de cero');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
