const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f)=>p.evaluate(f);
console.log(await ev(()=>{S.role='rep';S.salida.ok=true;var i=curStop();S.cur=i;resetDraft(cl(S.stops[i].c));S.d.R=2;S.tab.rep='entrega';chofById(S.chofHoy).mayPerm=true;S.d.may=true;S.d.pRm='300';S.dOpen.entmas=true;mayPideL().push({c:curCli().id,ch:+S.chofHoy,f:iso(TODAY),t:Date.now()-400000,est:'pend',R:2,M:0,pR:300,pM:0});mayVencer();render();
 var e=entrega();return JSON.stringify({p:mayPideDe(curCli().id),nota:mayNotaHTML().slice(0,120),d:[S.d.may,S.d.mayQ],a1:e.indexOf('Mayoreo a mano</button></div>'),m:e.indexOf('maynota'),cur:S.tab.rep,main:document.querySelector('main').innerHTML.indexOf('maynota')})}));
await b.close()})();
