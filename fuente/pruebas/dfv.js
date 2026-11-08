const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();for(const [w,h,n] of [[390,844,'tel'],[904,1100,'fold']]){const p=await b.newPage({viewport:{width:w,height:h}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.dfTest=1;var c=S.choferes[0];c.lic=null;S.role='admin';S.tab.admin='cargas';render()});await p.waitForTimeout(500);
console.log(n,await p.evaluate(()=>{var b=document.querySelector('.dfbub');if(!b)return 'none';var r=b.getBoundingClientRect(),hd=document.querySelector('header').getBoundingClientRect(),cs=getComputedStyle(b),par=b.parentElement;return {b:[r.top,r.height,r.width],hd:[hd.top,hd.bottom],pos:cs.position,par:par.className+' '+getComputedStyle(par).position+' '+getComputedStyle(par).overflow+' h'+par.getBoundingClientRect().height}}));
await p.screenshot({path:'v50/dfv_'+n+'.png'});}await b.close()})();
