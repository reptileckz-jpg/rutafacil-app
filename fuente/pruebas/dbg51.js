const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('PE',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.precio.conf=iso(TODAY);S.tab.admin='cargas';render();wzAbre('sim',{provs:[]});try{var hh=wzHTML();var su=setupHTML()}catch(e){return e.stack.slice(0,300)}var b=document.querySelector('[data-act="svnuevoab"]');var r1=!!b;b&&b.click();return JSON.stringify({su:su,r1,d:S.wz&&S.wz.d,ov:!!document.getElementById('wzov'),inp:!!document.getElementById('wz_nnp')})}));await b.close()})();
