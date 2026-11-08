const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f)=>p.evaluate(f);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.bienv=true;render()});
await p.fill('#setov [data-bind="setup.pinA"]','48a62');await p.waitForTimeout(100);
console.log(await ev(()=>JSON.stringify({st:S.setup.pinA,dom:document.querySelector('#setov [data-bind="setup.pinA"]').value})));
await p.fill('#setov [data-bind="setup.pinA"]','4862');await p.waitForTimeout(100);
console.log(await ev(()=>JSON.stringify({st:S.setup.pinA,dom:document.querySelector('#setov [data-bind="setup.pinA"]').value})));
await b.close()})();
