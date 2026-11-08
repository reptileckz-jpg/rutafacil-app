const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin.modo=null;S.tutVisto={rep:1,admin:1};S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.dfOpen=true;render()});await p.waitForTimeout(400);
await p.screenshot({path:'v50/df_enc.png'});
console.log(await p.evaluate(()=>[...document.querySelectorAll('#dfov .card')].map(c=>{var cs=getComputedStyle(c),r=c.getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom),cs.marginTop,cs.marginBottom,cs.boxShadow.slice(0,30),cs.border.slice(0,20)].join(' ')}).join('\n')));await b.close()})();
