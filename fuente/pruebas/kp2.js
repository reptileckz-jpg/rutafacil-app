const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.on('console',m=>console.log('C',m.text()));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.fin=true;S.setup.bienv=true;S.pins['a:'+S.adminYo]='4862';S.role='admin';S.pinOk={};pinEntrar();render();
 ['pointerdown','click'].forEach(function(t){window.addEventListener(t,function(e){var b=e.target.closest&&e.target.closest('[data-act]');console.log(t,b&&b.dataset.act,b&&b.dataset.v,e.target.dataset&&e.target.dataset.kp,'v='+_pin.v)},true)})});await p.waitForTimeout(300);
for(const d of '48'){await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(50)}
await p.waitForTimeout(300);console.log(await p.evaluate(()=>_pin.v));await b.close()})();
