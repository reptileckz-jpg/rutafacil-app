const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:760}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(500);
await p.evaluate(()=>{S.setup.bienv=true;var o=document.getElementById('bienv');if(o)o.remove();S.setup.p=2;render()});
await p.evaluate(()=>{var o=document.getElementById('setov');var a=document.querySelector('[data-bind="setup.vf.pl"]');o.scrollTop+=a.getBoundingClientRect().top-200});
const ra=await p.evaluate(()=>{var r=document.querySelector('[data-bind="setup.vf.pl"]').getBoundingClientRect();return [r.x+20,r.y+r.height/2]});
await p.mouse.click(...ra);await p.keyboard.type('7');await p.waitForTimeout(100);
const info=await p.evaluate(()=>{var b=document.querySelector('[data-bind="setup.vf.odo"]');var r=b.getBoundingClientRect();var e=document.elementFromPoint(r.x+20,r.y+r.height/2);return {r:[r.x,r.y,r.width,r.height],vh:innerHeight,hit:e&&e.outerHTML.slice(0,120),st:document.getElementById('setov').scrollTop}});console.log(JSON.stringify(info));
await b.close()})();
