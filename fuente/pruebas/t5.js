/* 5 (nueva numeración) · el chofer no puede recibir más taras de las que le deben en total: cajas que entrega ahora + las que ya debía.
   "Si entrega 4 y le deben 2, máximo 6"; sin deuda, máximo lo que entrega. Con el +, escribiendo y al guardar. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Danu')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.inv.reparto=20;S.tutVisto={rep:true,admin:true}});
const abre=(i,vac,R)=>ev(([i,vac,R])=>{var c=S.cli[i];c.vac=vac;S.stops=[{c:c.id}];S.cur=0;S.tab.rep='entrega';resetDraft(c);S.d.R=R;S.d.V=R;render();return c.id},[i,vac,R]);
const mas=async n=>{for(let k=0;k<n;k++){await ev(()=>{var b=[...document.querySelectorAll('[data-act="kgd"][data-p="d.V"]')].filter(x=>+x.dataset.d>0)[0];if(b)b.click()});await p.waitForTimeout(30)}};
/* entrega 4 y le deben 2 → máximo 6 */
await abre(0,2,4);await mas(5);r=await ev(()=>({V:S.d.V,toast:(document.querySelector('.toast,#toast')||{}).innerText||S.toast||''}));
ok(r.V===6,'entrega 4 y le deben 2: con el + llega hasta 6 y no más',r);ok(/Máximo 6: 4 que le entregas \+ 2 que debe/.test(r.toast),'se avisa "Máximo 6: 4 que le entregas + 2 que debe"',r);
/* escribiendo */
r=await ev(()=>{var i=document.querySelector('[data-bind="d.V"]');if(!i)return 'sin campo';i.value='10';i.dispatchEvent(new Event('input',{bubbles:true}));return 1});await p.waitForTimeout(80);
r=await ev(()=>({V:S.d.V,campo:(document.querySelector('[data-bind="d.V"]')||{}).value}));ok(r.V===6&&r.campo==='6','escribiendo 10 se queda en 6 (también en el campo)',r);
/* las rotas no pasan de las que devuelve */
r=await ev(()=>{S.d.V=9;S.d.Vr=9;render();return {V:S.d.V,Vr:S.d.Vr}});ok(r.V===6&&r.Vr<=6,'si algo pone 9 (y 9 rotas), al dibujar se queda en 6 y las rotas no pasan de 6',r);
/* sin deuda: máximo lo que entrega */
await abre(1,0,4);await mas(3);r=await ev(()=>S.d.V);ok(r===4,'sin deuda y entrega 4: máximo 4',r);
/* recibir MENOS sigue igual */
r=await ev(()=>{S.d.V=1;render();return S.d.V});ok(r===1,'recibir menos de lo que debe se puede (como siempre)',r);
/* al guardar: lo guardado respeta el tope */
await abre(0,2,4);r=await ev(()=>{S.d.V=6;S.d.pago=String(4*275);render();var c=S.cli[0];return c.id});
r=await ev(()=>{S.d.V=50;var b=document.querySelector('[data-act="guardar"],[data-act="entconf"]');if(!b)return 'sin botón';b.click();return 1});await p.waitForTimeout(200);
for(let i=0;i<6;i++){await ev(()=>{var b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Sí, guardar|Sí|Ya le pedí|Guardar entrega|Revisar y guardar)/.test(x.textContent.trim()))[0];if(b)b.click()});await p.waitForTimeout(150)}
r=await ev(()=>{var l=(S.log||[])[S.log.length-1];return {n:S.log.length,V:l&&l.V,vac:S.cli[0].vac}});
ok(r.n>=1&&r.V<=6&&r.vac===Math.max(0,2+4-r.V),'al guardar nunca queda más de 6 y lo que debe el cliente cuadra (2 + 4 − devueltas)',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
