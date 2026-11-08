const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';var n=Object.keys(S.provDir)[0];S.pvEdit=n;var h=fiProv({t:'prov',id:n});var c=S.cli[0];S.tab.admin='clientes';S.openCli=c.id;render();var fi=document.getElementById('fiov');return {n:n,h:h.replace(/<[^>]+>/g,' ').slice(0,600),hasBtn:h.indexOf('pvlisto'),fi:fi&&fi.innerText.slice(0,700),fiattr:fi&&fi.dataset.fi,rwTel:rw('Teléfono','x')}}));await b.close()})();
