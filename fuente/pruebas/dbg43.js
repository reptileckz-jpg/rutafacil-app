const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
console.log(await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};var v=S.veh[0];S.tab.admin='vehiculos';S.vehOpen=v.id;S.fiTab['veh:'+v.id]='pap';render();var h=document.body.innerHTML;var i=h.indexOf('<b>Placa</b>');return h.slice(i,i+900)}));
await b.close()})();
