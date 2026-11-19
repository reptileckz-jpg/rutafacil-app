/* 136 · si el cliente tiene pedido: al abrir su entrega empieza con lo que pidió (antes, en la versión real, se cambiaba por la última compra),
   "📦 Pidió N cajas y M kg" arriba de "¿Qué le dejas?", y se puede dejar otra cantidad (dice cuánto de más o de menos y "Poner lo que pidió"). */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];
 U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var ch=S.choferes.filter(c=>c.n==='Danu')[0];S.chofHoy=ch.id;S.stops=S.cli.map(c=>({c:c.id}));S.role='rep';S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.salida.ok=true;S.rutaDia80=iso(TODAY);S.inv.reparto=60;S.inv.repartoKg=80;S.cierre.salioR=60;S.cierre.salioM=80;S.cfg.tarCh116='500';
 var c=S.cli;c[0].uR=3;c[0].uM=2;c[1].uR=6;c[1].uM=0;/* la última vez compraron otra cosa */c[0].ped={R:10,M:5,f:iso(TODAY),nota:'Para el lunes, bien maduro',via:'WhatsApp'}});
const abre=(i)=>ev((i)=>{S.cur=i;resetDraft(cl(S.stops[i].c));S.tab.rep='entrega';S.entP125=null;render();var m=document.querySelector('main');var x=m.querySelector('[data-key="ped136"]');return {R:S.d.R,M:S.d.M,box:x?x.innerText.replace(/\s+/g,' '):null,orden:x?m.innerText.indexOf('Pidió')<m.innerText.indexOf('Cajas de roatán'):null}},i);
r=await abre(0);
ok(r.R===10&&r.M===5,'con pedido: empieza con lo que pidió (10 cajas, 5 kg), no con la última compra (3 y 2)',r);
ok(r.box&&/📦 Pidió 10 cajas de roatán y 5 kg de macho/.test(r.box)&&/Para el lunes, bien maduro/.test(r.box)&&/Pedido por WhatsApp/.test(r.box)&&/Ya está puesto lo que pidió/.test(r.box),'dice de cuánto era el pedido, su nota y por dónde llegó',r.box);
ok(r.orden,'sale dentro de "¿Qué le dejas?", antes de las cantidades');
r=await ev(()=>{S.d.R=12;S.d.M=3;render();var x=document.querySelector('main [data-key="ped136"]');return x?x.innerText.replace(/\s+/g,' '):''});
ok(/Le dejas 2 cajas más y 2 kg menos de lo que pidió/.test(r)&&/Poner lo que pidió/.test(r),'si deja otra cantidad, dice cuánto de más o de menos',r);
r=await ev(()=>{document.querySelector('main [data-act="ped136"]').click();return [S.d.R,S.d.M]});ok(r[0]===10&&r[1]===5,'"Poner lo que pidió" regresa a 10 y 5',r);
/* guardar con otra cantidad */
await ev(()=>{S.d.R=12;S.d.M=5;render()});
for(let k=0;k<4;k++){const hay=await ev(()=>{var x=document.querySelector('.entbar [data-act="ent125p"]');if(!x||x.classList.contains('wz-hide'))return false;x.click();return true});if(!hay)break;await W(80)}
await ev(()=>{var x=document.querySelector('[data-act="entconf"]');if(x)x.click()});await W(150);
for(let k=0;k<5;k++){const t=await ev(()=>{var y=[].slice.call(document.querySelectorAll('button')).filter(x=>x.getClientRects().length&&!x.closest('main')&&/^(Sí, guardar|Ya le pedí|Sí|Guardar)/.test(x.textContent.trim()))[0];if(!y)return null;var t=y.textContent.trim();y.click();return t});if(!t)break;await W(150)}
r=await ev(()=>{var l=S.log[S.log.length-1];return {n:S.log.length,R:l&&l.R,M:l&&l.M,ped:S.cli[0].ped}});
ok(r.n===1&&r.R===12&&r.M===5&&!r.ped,'se guarda lo que de verdad le dejó (12 cajas) y el pedido queda entregado',r);
/* sin pedido: como antes (la última compra) y sin el letrero */
r=await abre(1);ok(r.R===6&&r.M===0&&r.box===null,'sin pedido: empieza con la última compra, sin letrero',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
