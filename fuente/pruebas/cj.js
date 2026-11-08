const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(500);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.inv.vacias=300;if(S.setup&&!S.setup.fin){suAplicar()}S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};render()});
const chk=()=>ev(()=>{var w=cajasDonde();return JSON.stringify({w:w,esp:cajasEsperadas(),t0:S.cajasT0,mal:cuentasRevisar().filter(x=>!x.ok).map(x=>x.n+' '+(x.det||''))})});
console.log('ini',await chk());
// admin asigna viaje y chofer lo inicia
await ev(()=>{S.role='rep';S.chofHoy=S.choferes[S.choferes.length-1].id;S.basc=[{id:1,n:'B',lat:19.6,lng:-96.9}];vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].prov='Pedro';v.vacias=100;v.ftSal='x';v.k='fotos';render();document.querySelector('#vwov [data-act="vwnext"]').click()});await p.waitForTimeout(300);
console.log('salio',await ev(()=>S.vw.k),await chk());
await ev(()=>{S.role='admin';S.vws=[];S.vw=null;render()});await p.waitForTimeout(200);console.log('admin',await chk());
console.log(errs);await b.close()})();
