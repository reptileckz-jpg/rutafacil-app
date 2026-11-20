/* 10 (nueva numeración) · "Cargar más" solo ARRIBA de la Ruta cuando ya no trae mercancía (0 cajas y 0 kg) y le quedan clientes; ya no abajo. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 var D=S.choferes.filter(c=>esCh(c))[0];S.chofHoy=+D.id;try{chCambiar(+D.id)}catch(e){}S.role='rep';S.tutVisto={rep:true,admin:true};S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;S.bod110=null;
 var c=S.cli.filter(x=>!x.oculto).slice(0,2);S.stops=c.map(x=>({c:x.id}));S.stops[0].done=true;S.tab.rep='ruta';var bn=document.querySelector('[data-act="bienvgo"]');if(bn)bn.click()});
const ve=(R,M,todos)=>ev(([R,M,todos])=>{S.inv.reparto=R;S.inv.repartoKg=M;S.stops.forEach((s,i)=>s.done=todos?true:i===0);S.tab.rep='ruta';render();var m=document.querySelector('main'),c=m.querySelector('[data-x="cargar10"]');var bts=[...m.querySelectorAll('[data-act="cxabre"]')];
 return {card:!!c,txt:c?c.innerText:'',arriba:c?[...m.children].indexOf(c.closest('main>*')||c)<=2:null,botones:bts.length}},[R,M,todos]);
r=await ve(5,10,false);ok(!r.card&&r.botones===0,arch+' · con mercancía en la camioneta: no sale "Cargar más" (ni arriba ni abajo)',r);
r=await ve(0,0,false);ok(r.card&&r.arriba&&/Ya no traes mercancía/.test(r.txt)&&/1 cliente/.test(r.txt)&&r.botones===1,arch+' · sin mercancía y con clientes pendientes: sale ARRIBA "Ya no traes mercancía · te falta 1 cliente" con "Cargar más"',r);
r=await ve(0,4,false);ok(!r.card,arch+' · si todavía trae kilos de macho, no sale',r);
r=await ve(0,0,true);ok(!r.card,arch+' · sin mercancía pero ya atendió a todos: no sale',r);
r=await ev(()=>{S.inv.reparto=0;S.inv.repartoKg=0;S.stops.forEach((s,i)=>s.done=i===0);render();document.querySelector('[data-x="cargar10"] [data-act="cxabre"]').click();return {cm:!!S.cm110,ov:!!document.getElementById('cm110ov')}});
ok(r.cm&&r.ov,arch+' · el botón abre "¿Vas a la bodega por más?" (como siempre)',r);
r=await ev(()=>{S.cm110=null;S.bod110={f:iso(TODAY),h:'10:00',n0:(S.extras||[]).length};render();return {c:!!document.querySelector('[data-x="cargar10"]'),bod:!!document.querySelector('[data-x="bod110"]')}});
ok(!r.c&&r.bod,arch+' · si ya va a la bodega, sale su tarjeta "🏭 Bodega" y no se repite',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
