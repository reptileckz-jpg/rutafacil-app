/* 27 · al entrar a una sección con pendientes, la lista de pendientes se abre sola (antes era una barrita cerrada que no se notaba) */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.role='admin';S.encOn=false;S.popVisto={admin:iso(TODAY)};S.tutVisto={admin:true,rep:true};S.pinOk[pinKey()]=true;S.pnd92=null;S.tab.admin='mas';render()});
await ev(()=>document.querySelector('main [data-x="mas92-personal"]').click());await p.waitForTimeout(700);
r=await ev(()=>{var c=document.querySelector('main [data-x="pnd86"]');return {tab:S.tab.admin,abierta:c&&!c.classList.contains('cerr92'),flash:c&&c.classList.contains('pnd27'),t:c&&c.innerText}});
ok(r.tab==='personal'&&r.abierta&&r.flash&&/Licencia de Rafa/.test(r.t),'desde "Más" → Personal: los pendientes salen abiertos, destellan y dicen cuáles son',r);
r=await ev(()=>{document.querySelector('[data-act="pnd92"]').click();render();var c=document.querySelector('main [data-x="pnd86"]');return c.classList.contains('cerr92')});
ok(r,'"cerrar ▲" la cierra y no se vuelve a abrir sola mientras sigues ahí',r);
r=await ev(()=>{S.tab.admin='mas';render();S.tab.admin='personal';render();var c=document.querySelector('main [data-x="pnd86"]');return !c.classList.contains('cerr92')});
ok(r,'al volver a entrar, se abre otra vez',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
