/* 1 (nueva numeración) · el recuadro azul de Android al tocar ya no sale (se salía del botón redondo); y si "Mandar mi cierre de ayer"
   no puede abrir el cierre porque se rompe al dibujarse, en esa misma pantalla sale el error (antes parecía que el botón no hacía nada). */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);
const prep=()=>p.evaluate(()=>{S.tutVisto={rep:true,admin:true};S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.pinOk['c:1']=true;S.salida.ok=true;S.cierre.sent=false;
 if(!(S.log||[]).length)S.log.push({c:S.stops[0].c,R:2,M:0,pr:260,pm:18,total:520,pago:520,abono:0,V:0,t:'10:00'});S.rutaDia80=iso(new Date(TODAY.getTime()-864e5));S.tab.rep='ruta';render()});
await prep();
/* el resaltado azul de Android */
const hl=await p.evaluate(()=>{var L=[...document.querySelectorAll('#dia80 button')];L.push(...[...document.querySelectorAll('main button,main [data-act]')].slice(0,20));return L.map(x=>getComputedStyle(x).webkitTapHighlightColor)});
ok(hl.length&&hl.every(c=>/rgba\(0, 0, 0, 0\)|transparent/.test(c)),'los botones no tienen el recuadro azul de Android al tocar',hl.slice(0,4));
/* sin fallo: abre el cierre y no sale ningún error */
let r=await p.evaluate(()=>{document.querySelector('[data-act="dia80c"]').click();return {tab:S.tab.rep,err:!!document.querySelector('[data-x="err1"]')}});
ok(r.tab==='cierre'&&!r.err,'sin fallo: "Mandar mi cierre de ayer" abre el cierre (sin aviso de error)',r);
/* con un fallo al dibujar el cierre: regresa, pero se ve el error */
await prep();
r=await p.evaluate(()=>{var v=VIEWS.cierre;VIEWS.cierre=function(){throw new Error('prueba t1: dato raro')};var antes=JSON.stringify([S.log,S.cierre.res||null,S.inv]);
 try{document.querySelector('[data-act="dia80c"]').click()}finally{VIEWS.cierre=v}
 var e=document.querySelector('#dia80 [data-x="err1"]');return {tab:S.tab.rep,dia80:!!document.getElementById('dia80'),txt:e?e.innerText:'',igual:antes===JSON.stringify([S.log,S.cierre.res||null,S.inv])}});
ok(r.dia80&&/No se pudo abrir tu cierre/.test(r.txt)&&/prueba t1: dato raro/.test(r.txt),'si el cierre se rompe al dibujarse, en "No mandaste tu cierre" sale el error para mandarlo',r);
ok(r.igual,'el error no cambia ventas, cierre ni inventario');
/* ya arreglado (sin fallo), al volver a tocar abre el cierre */
r=await p.evaluate(()=>{document.querySelector('[data-act="dia80c"]').click();return {tab:S.tab.rep}});
ok(r.tab==='cierre','al volver a tocar (sin fallo) abre el cierre',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
