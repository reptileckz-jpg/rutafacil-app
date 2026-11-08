const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(500);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{if(S.setup&&!S.setup.fin){suAplicar()}S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};render()});
console.log(await ev(()=>JSON.stringify({basc:S.basc,prov:Object.keys(S.provs||S.prov||{}),ch:S.choferes.map(c=>c.id+c.n)})));
for(const nb of [0,1]){
const r=await ev((nb)=>{S.vws=[];S.vw=null;if(!nb)S.basc=[];else if(!S.basc.length)S.basc=[{id:1,n:'Báscula X'}];S.role='rep';S.chofHoy=S.choferes[S.choferes.length-1].id;vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].prov='Pedro';v.par[0].tara=4000;v.started=true;v.ftSal='x';var L=vwSteps();v.k='b0';v.ftB0='x';render();var o=document.getElementById('vwov');var t=document.querySelector('#vwov [data-act="vwnext"]');var bt=o.innerText.slice(0,120);t&&t.click();return new Promise(res=>setTimeout(()=>{var o=document.getElementById('vwov');res({L:L.join(','),b:bt,k:S.vw.k,txt:o&&o.innerText.slice(0,250),paso:vwPasoTxt()})},500))},nb);
console.log(nb,JSON.stringify(r,null,1));await p.screenshot({path:'v50/vb5_'+nb+'.png'})}
console.log(errs);await b.close()})();
