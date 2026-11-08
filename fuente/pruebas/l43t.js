const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();suAplicar();_pin={v:'',modo:null};S.role='rep';S.chofHoy=S.choferes.filter(c=>!esAdm(c))[0].id;S.pinOk[pinKey()]=true;S.bienv=S.bienv||{};S.bienv[S.chofHoy]=1;S.tutVisto={rep:true,admin:true,'d:rep:2':true};S.tab.rep='ruta';render();S.tut={k:'rep',i:0,prev:{tab:'ruta'}};render()});await W(700);
const n1=await ev(()=>{var o=document.getElementById('tutov');window.__o=o;return !!o});
await ev(()=>{render();render();render()});await W(500);
ok(n1&&await ev(()=>document.getElementById('tutov')===window.__o),'tutorial: al redibujar no se vuelve a crear (no parpadea)');
const hs=[];for(let i=0;i<4;i++){hs.push(await ev(()=>document.querySelector('#tutov .hole').getAttribute('style')));await ev(()=>render());await W(150)}
ok(new Set(hs).size===1,'el hueco no se mueve entre redibujos');
/* fondo bloqueado */
const t0=await ev(()=>S.tab.rep);await ev(()=>{var b=document.querySelector('nav.tabs button[data-t="cierre"]');b.click()});await W(100);ok(await ev(()=>S.tab.rep)===t0,'lo de atrás no responde durante el tutorial');
/* pasos */
await ev(()=>{S.tut.i=4;render()});await W(500);
const sw=await ev(()=>{var h=document.querySelector('#tutov .hole'),b=document.querySelector('#tutov .bub');return {sin:h.classList.contains('sinhueco'),txt:b.innerText,hand:!!document.querySelector('#tutov .hand')}});ok(sw.sin&&/sobre la pantalla/.test(sw.txt)&&sw.hand,'deslizar: manita al centro, sin hueco en la barra',sw);
await ev(()=>{S.tut.i=2;render()});await W(600);const g=await ev(()=>({tab:S.tab.rep,gx:!!document.querySelector('[data-act="gxsheet"]'),t:document.querySelector('#tutov .bub').innerText.slice(0,40)}));ok(/Gastos/.test(g.t),'paso Gastos',g);
await ev(()=>{S.tut=null;render()});await W(100);ok(await ev(()=>!document.documentElement.classList.contains('tuton')),'al terminar se quita');
/* aprende la app */
let t=await ev(()=>{S.tab.rep='ruta';render();return document.querySelector('main').innerText});ok(/Aprende la app/.test(t),'chofer: "Aprende la app"');
/* tutorial por días */
await ev(()=>{S.tutVisto={rep:true,admin:true};S.tutD={rep:['2026-01-01']};S.salida.ok=true;render()});await W(1300);
ok(await ev(()=>S.tut&&S.tut.k==='d:rep:2'),'día 2: sale el consejo del día',await ev(()=>S.tut));await ev(()=>{S.tut=null;render()});
/* vehículos */
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};if(!S.veh.length)S.veh.push({id:1,n:'Nissan NP300 2023',pl:'XX-123',hist:[],bit:[]});var v=S.veh[0];S.tab.admin='vehiculos';S.vehOpen=v.id;S.fiTab=S.fiTab||{};S.fiTab['veh:'+v.id]='pap';window._v=v.id;render()});await W(200);
t=await ev(()=>document.body.innerText);ok(!(await ev(()=>!!document.querySelector('[data-act="pledo"]')))&&/Para cambiar la placa usa/.test(t),'placa fija en Papeles');
const ya=await ev(()=>!!document.querySelector('[data-act="vya"][data-k="verVence"]'));ok(ya,'"Ya se hizo" en verificación');
if(ya){await ev(()=>document.querySelector('[data-act="vya"][data-k="verVence"]').click());await W(100);await ev(()=>{S.vya.c='650';document.querySelector('[data-act="vyasi"]').click()});await W(100);
 ok(await ev(()=>{var v=vehById(_v);return v.verVence>iso(TODAY)&&S.gastos.some(g=>g.t==='Verificación'&&g.m===650)}),'verificación registrada: vence en 6 meses y gasto')}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
