/* 174 · Auditoría de botones: (1) "Ir ›" de "Cuadrar la caja" en Inicio abre el cierre de caja y baja hasta él (antes no hacía nada);
   (2) sin "toque fantasma": un doble toque ya no confirma "Dar de baja", no marca el tanque en el cierre ni avanza dos pasos en el viaje;
   tocar rápido el MISMO botón (+$50) sigue sumando cada toque. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const nueva=async()=>{const p=await (await b.newContext({viewport:{width:390,height:844},hasTouch:true})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);await p.evaluate(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)}});return p};
const punto=(p,sel,txt)=>p.evaluate(([sel,txt])=>{var e=[...document.querySelectorAll(sel)].filter(x=>!txt||new RegExp(txt).test(x.textContent))[0];if(!e)return null;e.scrollIntoView({block:'center',behavior:'instant'});var r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}},[sel,txt]);
const doble=async(p,pt)=>{await p.touchscreen.tap(pt.x,pt.y);await p.waitForTimeout(250);await p.touchscreen.tap(pt.x,pt.y);await p.waitForTimeout(500)};
let p,r,pt;
/* (1) Ir › de Cuadrar la caja */
p=await nueva();await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';render();scrollTo(0,0)});
/* 30: se atiende desde el centro de pendientes */await p.evaluate(()=>{var o=c30Items().find(o=>o.tarea&&o.tarea.go==='inicio');c30Ver(o.id)});await p.waitForTimeout(200);
pt=await punto(p,'#c30ov [data-act="popgo"][data-t="inicio"]');await p.touchscreen.tap(pt.x,pt.y);await p.waitForTimeout(600);
r=await p.evaluate(()=>{var t=document.querySelector('main details[data-k="cajadia"]');return {abierta:!!(t&&t.open),visible:t?t.getBoundingClientRect().top<innerHeight&&t.getBoundingClientRect().bottom>0:false,y:scrollY}});
ok(r.abierta&&r.visible&&r.y>0,'Inicio › "Cuadrar la caja · Ir ›" abre el cierre de caja y baja hasta él',r);await p.close();
/* (2a) Dar de baja con doble toque: solo pide confirmar */
p=await nueva();await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='vehiculos';S.vehOpen=S.veh[0].id;render()});
pt=await punto(p,'[data-act="vbaja"]');await doble(p,pt);
r=await p.evaluate(()=>({baja:!!S.veh[0].baja,pregunta:S.vbaja}));
ok(!r.baja,'Vehículos › "Dar de baja" con doble toque: no se da de baja sin confirmar',r);await p.close();
/* (2b) Cierre del chofer: doble toque en Siguiente no marca el tanque */
p=await nueva();await p.evaluate(()=>{S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='cierre';render()});
const t0=await p.evaluate(()=>S.cierre.tank);pt=await punto(p,'[data-act="cipaso"]','Siguiente');await doble(p,pt);
r=await p.evaluate(()=>S.cierre.tank);ok(r===t0,'Cierre › "Siguiente" con doble toque: el nivel del tanque no cambia solo',{antes:t0,despues:r});await p.close();
/* (2c) Viaje de carga: doble toque en Siguiente avanza un paso */
p=await nueva();await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='cargas';render();document.querySelector('[data-act="vwnew"]').click()});await p.waitForTimeout(300);
const k1=await p.evaluate(()=>{var b=document.querySelector('[data-act="vwnext"]');b.click();return S.vw&&S.vw.k});await p.waitForTimeout(300);
pt=await punto(p,'[data-act="vwnext"]');const k2=await p.evaluate(()=>S.vw&&S.vw.k);await doble(p,pt);
r=await p.evaluate(()=>S.vw&&S.vw.k);const pasos=await p.evaluate(()=>vwSteps());
ok(pasos.indexOf(r)-pasos.indexOf(k2)<=1,'Viaje de carga › "Siguiente" con doble toque: avanza un solo paso',{de:k2,a:r,pasos});await p.close();
/* (2d) el mismo botón rápido sigue contando cada toque */
p=await nueva();await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='gastos';render();var b=document.querySelector('[data-act="gsopen"]');if(b)b.click()});await p.waitForTimeout(300);
pt=await punto(p,'[data-act="gsmas"]','50');
if(pt){const m0=await p.evaluate(()=>num(S.gsheet&&S.gsheet.monto));await doble(p,pt);r=await p.evaluate(()=>num(S.gsheet&&S.gsheet.monto));ok(r-m0===100,'tocar rápido "+$50" dos veces sigue sumando $100',{antes:m0,despues:r})}
else ok(false,'no se encontró "+$50"');
await p.close();
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
