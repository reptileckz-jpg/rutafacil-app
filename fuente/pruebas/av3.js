const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:800}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(500);
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__s=JSON.stringify(S)});
for(const [role,tab] of [['cont',null],['local',null]]){
const n0=await p.evaluate(()=>{S=JSON.parse(__s);S.role='admin';S.tab.admin='inicio';render();return [...document.querySelectorAll('main [data-act]')].filter(x=>x.closest('.card')&&/avgo|popgo|avver|avmas|avisos/.test(x.dataset.act)).length});

await p.evaluate(([r,t])=>{window.ROLE=r;window.TAB=t||tabsDe(r)[0][0]},[role,tab]);console.log('==',role);const all=await p.evaluate(()=>{S=JSON.parse(__s);S.role=ROLE;S.tab[ROLE]=TAB;if(ROLE==='rep')S.salida.ok=true;render();return [...document.querySelectorAll('main [data-act]')].map((x,i)=>({i,a:x.dataset.act,t:(x.innerText||'').trim().replace(/\s+/g,' ').slice(0,70),inAv:!!x.closest('.avl,.avisos,[data-k="avisos"]')})).filter(x=>!/^(tab|role|reset|chofsel|adminyo)$/.test(x.a))});
for(const it of all){
 const r=await p.evaluate(it=>{S=JSON.parse(__s);S.role=ROLE;S.tab[ROLE]=TAB;if(ROLE==='rep')S.salida.ok=true;render();scrollTo(0,0);var x=[...document.querySelectorAll('main [data-act]')][it.i];if(!x)return 'no';x.scrollIntoView({block:'center'});var y0=scrollY,sig=JSON.stringify([S.tab[S.role],S.cur,S.d&&S.d.mode,S.vehOpen,S.openCh,S.openCli,S.openProv,S.openCarga,S.gsec,S.bienOpen,!!S.modal,!!S.confirm,S.aj,S.menu,S.sheet,S.posp]);var h0=document.querySelector('main').innerHTML.length;x.click();
  return new Promise(res=>setTimeout(()=>{var sig2=JSON.stringify([S.tab[S.role],S.cur,S.d&&S.d.mode,S.vehOpen,S.openCh,S.openCli,S.openProv,S.openCarga,S.gsec,S.bienOpen,!!S.modal,!!S.confirm,S.aj,S.menu,S.sheet,S.posp]);var h1=document.querySelector('main').innerHTML.length;res((sig!==sig2?'CAMBIA ':'')+(Math.abs(scrollY-y0)>50?'SCROLL ':'')+(h0!==h1?'CONTENIDO ':'')+(sig===sig2&&Math.abs(scrollY-y0)<=50&&h0===h1?'NADA':''))},300))},it);
 if(/NADA/.test(r))console.log(role,'NADA',it.a.padEnd(10),it.t)}}
await b.close()})();
