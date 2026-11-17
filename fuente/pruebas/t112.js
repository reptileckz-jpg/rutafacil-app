/* 112 · en la ruta del chofer, los clientes ya visitados van al final, juntos y minimizados */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[];for(var i=1;i<=8;i++)U.cli.push({n:'Cliente '+i,a:'x',tel:'664000000'+i,dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'});U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Danu')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.inv.reparto=20;
 S.stops=S.cli.map(c=>({c:c.id}));S.stops.forEach((s,i)=>{if(i<6){s.done=true;s.logI=i}});S.log=S.stops.slice(0,6).map(s=>({c:s.c,R:1,M:0,V:0,total:300,pago:300,abono:0}));S.cur=6;S.dOpen.vis112=false;render();
 var st=[...document.querySelectorAll('main .stop')],vis=document.querySelector('main [data-k="vis112"]');
 return {orden:st.map(x=>x.querySelector('.num').classList.contains('done')?'v':'p').join(''),primero:st[0].innerText.split('\n')[1],det:vis&&vis.querySelector('summary').innerText,abierto:vis&&vis.open,dentro:vis?vis.querySelectorAll('.stop').length:0,botones:vis?vis.querySelectorAll('[data-act="corrnew"],[data-act="cancelent"]').length:0}});
ok(r.orden==='ppvvvvvv'&&r.primero==='Cliente 7','112 · arriba los que faltan (Cliente 7, 8) y al final los visitados',r);
ok(/✓ Ya visitados \(6\)/.test(r.det||'')&&r.abierto===false&&r.dentro===6,'112 · los 6 visitados juntos en "✓ Ya visitados (6)", minimizados',r);
ok(r.botones===12,'112 · adentro siguen "Corregir" y "Cancelar" de cada uno',r.botones);
r=await ev(()=>{var s=document.querySelector('main [data-k="vis112"] summary');s.click();render();var v=document.querySelector('main [data-k="vis112"]');return v&&v.open});
ok(r===true,'112 · al tocarlo se abre (y se queda abierto)',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
