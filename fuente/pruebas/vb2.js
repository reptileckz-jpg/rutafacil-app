const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.tab.rep='ruta';render();vwNuevo(null);var v=S.vw;v.started=true;v.ftSal='x';v.k='b0';render()});
for(const t of [50,200,600,1500]){await p.waitForTimeout(t);console.log(t,JSON.stringify(await ev(()=>{var o=document.getElementById('vwov'),a=[];for(var e=o.parentElement;e;e=e.parentElement){var cs=getComputedStyle(e);a.push(e.tagName+'.'+e.className+' tf='+cs.transform+' an='+cs.animationName+'/'+cs.animationFillMode)}var n=document.querySelector('nav.tabs'),cs2=getComputedStyle(n);return {chain:a,nav:{top:n.getBoundingClientRect().top,tf:cs2.transform,an:cs2.animationName,par:n.parentElement.tagName+'.'+n.parentElement.className}}})))}
await b.close()})();
