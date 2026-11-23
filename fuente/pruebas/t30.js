/* 30 · centro de pendientes: Inicio "Hoy" con los 3 más importantes y "Atender los N pendientes"; pantalla por secciones; uno por uno con
   Resolver / Recordarme mañana / Listo. Y crédito: sin la pregunta de las 5 compras; al pedir fiar, sus compras de la semana y el mes. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
await ev(()=>{S.role='admin';S.encOn=false;S.popVisto={admin:iso(TODAY)};S.tutVisto={admin:true,rep:true};S.pinOk[pinKey()]=true;S.precio.conf=iso(TODAY);S.tab.admin='inicio';render()});
r=await ev(()=>{var c=document.querySelector('[data-x="hoy92"]');return {n:c30Items().length,t:c.innerText,filas:c.querySelectorAll('[data-act="avgo"],.it92 .go').length,bt:!!c.querySelector('[data-act="c30abre"]')}});
ok(r.n>3&&r.filas>=3&&r.bt&&new RegExp('Atender los '+r.n+' pendientes').test(r.t),'Inicio "Hoy": solo 3 y "🔔 Atender los N pendientes"',r);
await clic('c30abre');
r=await ev(()=>{var o=document.getElementById('c30ov');return {t:o.innerText,sec:[...o.querySelectorAll('[data-act="c30sec"]')].map(b=>b.dataset.v)}});
ok(r.sec.length>=3&&/Pendientes/.test(r.t),'la pantalla "🔔 Pendientes" muestra las secciones con su número',r.sec);
const sec=r.sec[0];await clic('c30sec',{v:sec});
r=await ev(()=>{var o=document.getElementById('c30ov');return {t:o.innerText,n:c30Grupos()[S.c30.sec].length}});
ok(/1 de \d+/.test(r.t)&&/Resolver/.test(r.t)&&/Recordarme mañana/.test(r.t)&&/Listo/.test(r.t),'dentro de una sección: tarjeta grande "1 de N" con Resolver / Recordarme mañana / ✓ Listo',r.t.slice(0,250));
const n0=r.n;
r=await ev(()=>{var id=document.querySelector('#c30ov [data-act="c30man"]').dataset.id;document.querySelector('#c30ov [data-act="c30man"]').click();return {id,n:(c30Grupos()[S.c30&&S.c30.sec]||[]).length,ov:!!document.getElementById('c30ov'),sigue:c30Items().some(o=>o.id===id)}});
ok(r.n===n0-1&&r.ov&&!r.sigue,'"Recordarme mañana": se quita por hoy y sigue con la siguiente',r);
r=await ev(()=>{var b=document.querySelector('#c30ov [data-act="c30ok"]');if(!b)return {sinMas:true};var id=b.dataset.id;b.click();return {sigue:c30Items().some(o=>o.id===id)}});
ok(r.sinMas||!r.sigue,'"✓ Listo": ya no sale',r);
r=await ev(()=>{S.c30={sec:null,i:0};render();var b=document.querySelector('#c30ov [data-act="c30sec"]');b.click();var ir=[...document.querySelectorAll('#c30ov .btn[data-act]')].find(x=>!/^c30/.test(x.dataset.act));var tab0=S.tab.admin;ir.click();return {ov:!!document.getElementById('c30ov'),tab:S.tab.admin}});
ok(!r.ov,'"Resolver" cierra la pantalla y te lleva a donde se resuelve',r);
/* crédito */
r=await ev(()=>{var c=S.cli.filter(x=>!x.oculto)[0];S.avPrecio.push(c.n+' ya lleva 5 compras pagadas: ¿le das crédito?');var hay=avisos().some(x=>/5 compras pagadas/.test(x));
 S.rutasHist=S.rutasHist||[];S.rutasHist.push({f:iso(new Date(TODAY.getTime()-2*864e5)),ch:1,log:[{c:c.id,R:3,M:0,total:900,pago:900,abono:0,h:'10:00'}]},{f:iso(new Date(TODAY.getTime()-20*864e5)),ch:1,log:[{c:c.id,R:2,M:0,total:600,pago:300,abono:0,h:'11:00'}]});
 S.permisos=[{c:c.id,ch:1,est:'pend',f:iso(TODAY)}];S.tab.admin='inicio';render();var s=comp30(c.id,7),m=comp30(c.id,30);return {hay,s,m,cid:c.id,html:permsHTML()}});
ok(!r.hay,'ya no sale "¿le das crédito? ya lleva 5 compras"',r.hay);
ok(r.s.n>=1&&r.s.total>=900&&r.m.total>=r.s.total+600&&r.m.fiado>=300,'compras de la semana y del mes (con lo fiado)',{s:r.s,m:r.m});
ok(/Semana: \d+ compra/.test(r.html)&&/data-act="cmp30"/.test(r.html),'"Piden permiso para fiar": resumen corto y "📊 Ver sus compras"',r.html.slice(0,300));
await clic('cmp30',{id:String(r.cid)});
r=await ev(()=>{var o=document.getElementById('cmp30ov');return o?o.innerText:''});
ok(/Últimos 7 días/.test(r)&&/Últimos 30 días/.test(r)&&/Debe/.test(r)&&/Sí, que le fíe hoy/.test(r),'"Ver sus compras": semana, mes, lo que debe y los botones de siempre',r.slice(0,300));
await ev(()=>document.querySelector('#cmp30ov [data-act="permno"]').click());r=await ev(()=>({ov:!!document.getElementById('cmp30ov'),p:S.permisos[0].est}));
ok(!r.ov&&r.p!=='pend','contestar desde ahí funciona y cierra la pantalla',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
