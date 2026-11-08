const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.addInitScript(()=>{window.__pnTest=1;window.__nubeAd={init(){},onUser(cb){setTimeout(()=>cb(null),10)},get(){return Promise.resolve(null)},set(){return Promise.resolve()},watch(){return()=>{}},del(){},inc(){}}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);await p.screenshot({path:'v50/nb1.png'});await b.close()})();
