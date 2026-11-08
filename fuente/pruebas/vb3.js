const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a);
for(const vw of [0,1]){
await ev((vw)=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.tab.rep='ruta';if(vw){vwNuevo(null);var v=S.vw;v.started=true;v.ftSal='x';v.k='b0'}render()},vw);await p.waitForTimeout(800);
console.log(vw,JSON.stringify(await ev(()=>{var n=document.querySelector('nav.tabs');if(!n)return {nonav:document.documentElement.className};var cs=getComputedStyle(n),r=n.getBoundingClientRect();var a=[];for(var e=n.parentElement;e;e=e.parentElement){var c=getComputedStyle(e);a.push(e.tagName+'#'+e.id+'.'+e.className+' pos='+c.position+' tf='+c.transform+' filter='+c.filter+' contain='+c.contain+' h='+e.getBoundingClientRect().height)}return {pos:cs.position,top:cs.top,bottom:cs.bottom,r:[r.top,r.bottom],chain:a,html:document.documentElement.className,sy:scrollY,ih:innerHeight}}),null,1))}
await b.close()})();
