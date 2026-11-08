const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{var h=document.querySelector('header'),m=document.querySelector('main');var ch=getComputedStyle(h),cm=getComputedStyle(m);var ps=[];var x=h;while(x){var s=getComputedStyle(x);ps.push((x.tagName+'.'+x.className).slice(0,30)+' '+s.position+' top:'+s.top+' pt:'+s.paddingTop);x=x.parentElement}return {hdr:ch.position+' '+ch.top+' pt '+ch.paddingTop+' mt '+ch.marginTop,main:cm.paddingTop+' '+cm.marginTop,chain:ps}}));
await b.close()})();
