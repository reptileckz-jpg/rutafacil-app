const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=f=>p.evaluate(f);
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};S.tutVisto={rep:true,admin:true};S.salida.ok=true;S.salida.fotosFin={};FOTOS.forEach(f=>S.salida.fotosFin[f[0]]='data:x');S.cierre.sent=true;S.cierre.res=cierreRes();render()});
await ev(()=>{S.tab.rep='cierre';render()});await p.screenshot({path:'d54.png',fullPage:true});
await b.close()})();
