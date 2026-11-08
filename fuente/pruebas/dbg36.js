const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>console.log('LOG',m.text()));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pins['c:'+S.chofHoy]='4821';S.pinOk={};pinEntrar();render()});await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{document.querySelector('[data-act="pinolv"]').click();return JSON.stringify(S.px)+' '+!!document.getElementById('pxov')+' '+(pxHTML()||'').length}));
await b.close()})();
