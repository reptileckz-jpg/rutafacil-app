const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.PN_GMAPS=true;window.Capacitor={isNativePlatform:()=>true,Plugins:{}};window.GMAPA={create:()=>Promise.resolve({})}});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);
let r=await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';render();const a=document.querySelector('nav.tabs .tbadge.blink');render();render();const b2=document.querySelector('nav.tabs .tbadge.blink');
 S.tab.admin='personal';render();return {mismo:a===b2&&!!a,gm:GMI.length,sel:getComputedStyle(document.body).userSelect,inp:(()=>{const i=document.createElement('input');document.body.appendChild(i);const v=getComputedStyle(i).userSelect;i.remove();return v})()}});
console.log(JSON.stringify(r));if(r.gm!==0||r.sel!=='none'||r.inp!=='text')console.log('FAIL l67');
r=await p.evaluate(()=>{S.tab.admin='inicio';render();const bt=document.querySelector('nav.tabs button[data-t="clientes"]');bt.click();const t1=S.tab.admin;render();const sc0=window.scrollY;document.querySelector('nav.tabs button[data-t="clientes"]').click();return {t1,t2:S.tab.admin,openCli:S.openCli,fi:!!document.getElementById('fiov')}});
await p.waitForTimeout(400);console.log(JSON.stringify(r),await p.evaluate(()=>!!document.querySelector('.avfoco')));
r=await p.evaluate(()=>{S.tab.admin='mas';render();document.querySelector('nav.tabs button[data-t="mas"]').click();return S.tab.admin});console.log('mas→',r,errs);await b.close()})();
