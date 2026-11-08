const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.open=()=>null});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f)=>p.evaluate(f),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.popVisto={admin:iso(TODAY)};S.tutVisto={rep:true,admin:true};S.tab.admin='clientes';render()});await W(300);await p.screenshot({path:'s63a.png'});
await ev(()=>{var v=S.veh[0];S.tab.admin='vehiculos';S.vehOpen=v.id;S.fiTab['veh:'+v.id]='gas';render();document.querySelector('#fiov .fibody').scrollIntoView()});await W(300);await p.screenshot({path:'s63b.png'});
await ev(()=>{S.vehOpen=null;S.tab.admin='gastos';render();window.scrollTo(0,0)});await W(300);await p.screenshot({path:'s63c.png'});
await ev(()=>{S.tab.admin='inicio';S.bubMin=false;S.dfMin=false;render();window.scrollTo(0,0)});await W(300);await p.screenshot({path:'s63d.png'});
await b.close()})();
