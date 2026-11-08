const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f)=>p.evaluate(f);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='rep';S.salida.ok=true;S.cierre.salioR=sum(S.log,function(l){return l.R})+5;S.cierre.salioM=r2(sum(S.log,function(l){return l.M})+12);S.cierre.gxConf=true;S.tab.rep='cierre';S.cierreP=3;S.cierre.fotoReg='data:image/png;base64,AA';render()});
console.log(await ev(()=>{var e=document.querySelectorAll('[data-act="enviar"]');return e.length+' '+[...e].map(x=>x.outerHTML.slice(0,150)).join(' | ')}));
console.log("mad0",await ev(()=>S.inv.maduras));await ev(()=>document.querySelector('[data-act="enviar"]').click());await p.waitForTimeout(300);
console.log(await ev(()=>JSON.stringify({m:S.modal&&S.modal.t,t:S.toast,sent:S.cierre.sent,c:window._pnConf||null})));
await ev(()=>document.querySelector('[data-act="confok"]').click());await p.waitForTimeout(300);console.log(await ev(()=>JSON.stringify({m:S.modal&&S.modal.t,t:S.toast,sent:S.cierre.sent,pc:S.cierre.porContar,k:Object.keys(S.cierre).join(),mad:S.inv.maduras,recep:S.recep,ar:S.arOn,ea:window._envAntes})));
await b.close()})();
