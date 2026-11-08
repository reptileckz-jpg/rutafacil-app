const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.tutVisto={rep:1,admin:1};S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.aj=true;render();
 window.__log=[];var d=document.querySelector('#ajov details[data-k="ajneg"]');window.__d=d;new MutationObserver(function(ms){ms.forEach(function(m){window.__log.push(m.type+':'+(m.attributeName||'')+':'+(m.target.tagName)+':'+(m.target===window.__d?'D':'')+':'+performance.now().toFixed(0)+':'+m.oldValue+'->'+m.target.getAttribute(m.attributeName))})}).observe(document.getElementById('ajov'),{attributes:true,subtree:true,childList:true,attributeFilter:['open','class','style'],attributeOldValue:true});});
await p.click('#ajov details[data-k="ajneg"] summary');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{var d=document.querySelector('#ajov details[data-k="ajneg"]');return JSON.stringify({same:d===window.__d,open:d.open,log:window.__log.slice(0,40)})}));await b.close()})();
