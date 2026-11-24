/* 33 · periodo de arranque (2 semanas): bodega aproximada; la diferencia al contar es "ajuste de arranque" (valor $0, no merma), sin
   volver a contar; el ajuste de taras trae el motivo puesto; Ajustes: ver y terminar; al terminar todo cuenta normal. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'NP',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'C1',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';render()});
r=await ev(()=>({a:S.arr33,act:arr33Activo()}));
ok(r.act&&r.a&&r.a.ini===await ev(()=>iso(TODAY)),'al terminar la configuración inicial empieza el periodo de arranque (2 semanas)',r.a);
r=await ev(()=>{costoCajaAct=function(){return 200};S.inv.maduras=50;S.tab.admin='bodega';render();var c=document.querySelector('main [data-x="arr33"]');return c?c.innerText:''});
ok(/Periodo de arranque/.test(r)&&/ajuste de arranque/.test(r),'en Bodega sale el aviso del periodo de arranque',r);
/* contar: diferencia grande (50 → 30) no pide volver a contar y no es merma */
r=await ev(()=>{var n0=(S.mermas||[]).length;S.cnt.ra='30';render();document.querySelector('[data-act="registrarcnt"]').click();return n0});
await p.waitForTimeout(200);
r=await ev(n0=>{var m=(S.mermas||[]).slice(n0);return {n:m.length,inv:S.inv.maduras,valor:m[0]&&m[0].valor,aj:m[0]&&m[0].aj33,mot:m[0]&&m[0].mot82}},r);
ok(r.n===1&&r.inv===30,'contar con una diferencia grande: no pide volver a contar y la bodega queda con lo contado',r);
ok(r.valor===0&&r.aj&&r.aj.valor>0&&/Ajuste de arranque/.test(r.mot||''),'la diferencia es "ajuste de arranque": valor $0 (no es merma) y queda el valor que habría sido',r);
/* 24 nov: el macho siempre es merma, también en el arranque */
r=await ev(()=>{costoKgMAct=function(){return 10};var n0=(S.mermas||[]).length;S.inv.maduras=30;S.inv.kgMaduro=100;['rv','ra','mv','ma'].forEach(k=>S.cnt[k]='');S.cnt.ra='28';S.cnt.ma='90';S.cnt82={};S.tab.admin='bodega';render();var k=Object.keys(S.cnt);document.querySelector('[data-act="registrarcnt"]').click();return n0});
await p.waitForTimeout(200);
r=await ev(n0=>{var m=(S.mermas||[]).slice(n0)[0];return m&&{M:m.M,R:m.R,valor:m.valor,aj:m.aj33,txt:m.txt}},r);
ok(r&&r.M===10&&r.valor===100&&r.R===0&&r.aj&&r.aj.R===2,'en el arranque: las cajas son ajuste, pero los kilos de macho que faltan SÍ son merma',r);
r=await ev(()=>{var t=TODAY;TODAY=new Date(new Date(S.arr33.fin+'T12:00:00').getTime()-2*864e5);var x=hoyTareas().filter(x=>x.k==='arr33q').map(x=>x.t);S.tab.admin='bodega';render();var c=(document.querySelector('main [data-x="arr33"]')||{}).innerText||'';TODAY=t;return {x,c}});
ok(r.x.length===1&&/Quedan 3 días/.test(r.x[0])&&/te quedan 3 días/.test(r.c)&&/macho/.test(r.c)&&/merma/.test(r.c),'los últimos días: "Quedan N días" en Hoy y en Bodega, y explica que después es merma',r);
/* terminar */
r=await ev(()=>{S.aj={};var b=document.createElement('button');b.dataset.act='arr33fin';document.body.appendChild(b);b.click();b.remove();return {act:arr33Activo(),term:S.arr33.term}});
ok(!r.act&&r.term,'"Ya está todo contado: terminar el arranque" lo termina',r);
r=await ev(()=>{var n0=(S.mermas||[]).length;S.inv.maduras=30;['rv','ra','mv','ma'].forEach(k=>S.cnt[k]='');S.cnt.ra='29';S.cnt82={mot:'Se echó a perder'};S.tab.admin='bodega';render();document.querySelector('[data-act="registrarcnt"]').click();return n0});
await p.waitForTimeout(200);
r=await ev(n0=>{var m=(S.mermas||[]).slice(n0)[0];return {valor:m&&m.valor,aj:m&&m.aj33}},r);
ok(r.valor>0&&!r.aj,'ya terminado, la diferencia sí cuenta como merma (normal)',r);
/* la demo no empieza sola */
const p2=await (await b.newContext()).newPage();await p2.addInitScript(()=>{window.__pnTest=1});await p2.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p2.waitForTimeout(900);
r=await p2.evaluate(()=>{S.role='admin';render();return !!S.arr33});ok(!r,'en la demo no empieza solo',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
