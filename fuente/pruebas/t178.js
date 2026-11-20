/* 178 · "Cliente nuevo" / "Venta rápida" y regresar sin escribir nada (por "Volver a la ruta", la barra o atrás): no se queda como parada.
   Si escribiste algo, se queda. "Cancelar" sigue igual. Las paradas de la ruta no se tocan. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const nueva=async()=>{const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);
 await p.evaluate(()=>{S.tutVisto={rep:true,admin:true};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='ruta';render();window.__n0=S.stops.length;window.__c0=S.cli.length;window.__ids=JSON.stringify(S.stops.map(s=>s.c))});return p};
const toca=(p,sel)=>p.evaluate(sel=>{var e=document.querySelector(sel);if(!e)return false;e.click();return true},sel);
let p,r;
for(const [reg,nom] of [['0','Venta rápida'],['1','Cliente nuevo']]){
 for(const [como,salir] of [['← Volver a la ruta',()=>toca(p,'[data-act="tab"][data-t="ruta"]')],['la barra de abajo (Ruta)',()=>p.evaluate(()=>{var b=document.querySelector('nav.chofer171 [data-tab="ruta"]');if(b)b.click();else{S.tab.rep='ruta';render()}})]]){
  p=await nueva();
  await p.evaluate(reg=>{if(reg==='1'){/* "Cliente nuevo": el alta guarda al cliente y abre su entrega (lo mismo que hace al terminar el asistente) */var c=nuevoCli({n:'Tienda Prueba',tel:'',a:'',dias:[1],chofer:+S.chofHoy});c.nuevo=true;S.cli.push(c);window.__c0=S.cli.length;window.__cid=c.id;var at=curStop();if(at<0)at=S.stops.length;S.stops.splice(at,0,{c:c.id,nuevo72:true});S.cur=at;resetDraft(c);c.nuevo=false;S.d.reg=false;S.tab.rep='entrega';render();return}
   var b=[...document.querySelectorAll('[data-act="calle"]')].filter(x=>x.dataset.reg!=='1')[0];b.click()},reg);
  r=await p.evaluate(()=>({tab:S.tab.rep,n:S.stops.length}));const entro=r.tab==='entrega'&&r.n===await p.evaluate(()=>window.__n0)+1;
  await salir();await p.waitForTimeout(200);
  r=await p.evaluate(()=>({n:S.stops.length,n0:window.__n0,cli:S.cli.length,c0:window.__c0,igual:JSON.stringify(S.stops.map(s=>s.c))===window.__ids,tab:S.tab.rep}));
  ok(entro&&r.n===r.n0&&r.cli===r.c0&&r.igual,nom+' y regresar por '+como+' sin escribir nada: no queda como parada'+(reg==='1'?' (el cliente dado de alta sí se queda)':''),r);await p.close()}}
/* con algo escrito, se queda */
p=await nueva();
await p.evaluate(()=>{document.querySelector('[data-act="calle"]:not([data-reg="1"])').click();S.d.R=3;S.d.rn='Abarrotes Lupita';render()});
await toca(p,'[data-act="tab"][data-t="ruta"]');await p.waitForTimeout(200);
r=await p.evaluate(()=>({n:S.stops.length,n0:window.__n0}));ok(r.n===r.n0+1,'si ya escribiste algo (nombre, cajas), se queda para que la termines',r);await p.close();
/* Cancelar sigue igual */
p=await nueva();
await p.evaluate(()=>{document.querySelector('[data-act="calle"]').click()});await toca(p,'[data-act="cancelcalle"]');await p.waitForTimeout(200);
r=await p.evaluate(()=>({n:S.stops.length,n0:window.__n0,tab:S.tab.rep}));ok(r.n===r.n0&&r.tab==='ruta','"Cancelar" sigue quitándola',r);await p.close();
/* una parada normal de la ruta no se toca al salir de su entrega */
p=await nueva();
await p.evaluate(()=>{S.tab.rep='entrega';render();S.tab.rep='ruta';render()});await p.waitForTimeout(200);
r=await p.evaluate(()=>({n:S.stops.length,n0:window.__n0,igual:JSON.stringify(S.stops.map(s=>s.c))===window.__ids}));ok(r.n===r.n0&&r.igual,'las paradas normales de la ruta no se tocan',r);await p.close();
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
