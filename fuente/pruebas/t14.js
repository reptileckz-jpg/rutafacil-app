/* 14 (nueva numeración) · el aviso "Solo traes 0 cajas" se quita en cuanto carga más (antes se quedaba con el número viejo ~1–2 min,
   en esa entrega y en las siguientes, aunque las cajas sí estaban registradas). Si todavía no alcanza, dice el número de ahora. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1200);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 var D=S.choferes.filter(c=>esCh(c))[0];S.chofHoy=+D.id;try{chCambiar(+D.id)}catch(e){}S.role='rep';S.tutVisto={rep:true,admin:true};S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.salida.ok=true;S.salida.f7=iso(TODAY);S.rutaDia80=iso(TODAY);S.cierre.sent=false;
 var c=S.cli.filter(x=>!x.oculto).slice(0,2);S.stops=c.map(x=>({c:x.id}));var bn=document.querySelector('[data-act="bienvgo"]');if(bn)bn.click()});
const msgs=()=>ev(()=>[...document.querySelectorAll('.falta-msg')].map(x=>x.innerText));
r=await ev(async()=>{S.inv.reparto=0;S.inv.repartoKg=0;S.cur=0;S.tab.rep='entrega';resetDraft(cl(S.stops[0].c));S.d.R=3;S.d.M=0;render();await new Promise(r=>setTimeout(r,300));return [...document.querySelectorAll('.falta-msg')].map(x=>x.innerText)});
ok(r.some(x=>/Solo traes 0 cajas/.test(x)),arch+' · con 0 cajas y pidiendo 3: sale "Solo traes 0 cajas" (correcto)',r);
r=await ev(async()=>{S.inv.maduras=Math.max(num(S.inv.maduras),50);S.inv.kgMaduro=Math.max(num(S.inv.kgMaduro),50);S.inv.reparto+=12;S.inv.repartoKg+=20;S.tab.rep='ruta';render();await new Promise(r=>setTimeout(r,200));S.tab.rep='entrega';render();await new Promise(r=>setTimeout(r,300));return {m:[...document.querySelectorAll('.falta-msg')].map(x=>x.innerText),falta:S.falta}});
ok(!r.m.length&&!r.falta,arch+' · cargó 12 y regresa a la misma entrega: el aviso viejo ya no sale',r);
r=await ev(async()=>{S.cur=1;resetDraft(cl(S.stops[1].c));S.d.R=2;S.d.M=0;render();await new Promise(r=>setTimeout(r,300));return [...document.querySelectorAll('.falta-msg')].map(x=>x.innerText)});
ok(!r.length,arch+' · en la siguiente entrega tampoco',r);
const antes=await ev(()=>JSON.stringify([S.inv,S.extras,S.log]));
r=await ev(async()=>{S.d.R=15;render();await new Promise(r=>setTimeout(r,300));return [...document.querySelectorAll('.falta-msg')].map(x=>x.innerText)});
ok(r.some(x=>/Solo traes 12 cajas/.test(x)),arch+' · si pide más de lo que trae, el aviso dice el número de AHORA (12)',r);
r=await ev(a=>{S.d.R=2;render();return JSON.stringify([S.inv,S.extras,S.log])===a},antes);
ok(r,arch+' · el aviso no cambia inventario, cargas ni ventas',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
