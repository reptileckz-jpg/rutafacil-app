const {chromium}=require('playwright');
/* l63: 13 tarjetas por pasos · 23 notas · 26 vacaciones · 31 gastos del chofer · 19 tutorial · 29 respaldo diario */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{window.__t=[];const t0=toast;toast=function(m){__t.push(m);return t0.apply(this,arguments)};window.clk=(act,ds)=>{const b=document.createElement('button');b.dataset.act=act;Object.assign(b.dataset,ds||{});document.body.appendChild(b);b.click();b.remove()}});
const sigue=async()=>{await ev(()=>{const b=document.querySelector('#wzov [data-act="wzfin"],#wzov [data-act="wzsig"]:not([data-salta])');b.click()});await W(60)};
const op=async(k,v)=>{await ev(([k,v])=>document.querySelector('#wzov [data-act="wzop"][data-k="'+k+'"][data-v="'+v+'"]').click(),[k,v]);await W(60)};
const seguro=async()=>{const t=await ev(()=>S.modal&&/Seguro/.test(JSON.stringify(S.modal)));await ev(()=>{const b=document.querySelector('[data-act="wz63si"]');if(b)b.click()});await W(80);return t};

/* ---- 13 · No estaba ---- */
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='entrega';render()});
let r=await ev(()=>{const i=curStop();window.__i=i;clk('noestaba');return {wz:S.wz&&S.wz.k,i:i}});ok(r.wz==='noest','13 · "No estaba" abre tarjeta de pantalla completa',r);
await op('m','Cerrado');r=await ev(()=>document.getElementById('wzov').innerText);ok(/ruta de mañana/.test(r),'13 · dice qué pasa (Cerrado → mañana)');await sigue();
r=await seguro();ok(r,'13 · pide "¿Seguro?"');r=await ev(()=>{const s=S.stops[__i];return {done:s.done,nov:s.nov}});ok(r.done&&r.nov==='Cerrado','13 · se registra "No estaba" con su motivo',r);
/* ---- 13 · pedir permiso para fiar ---- */
await ev(()=>{clk('permpide',{id:String(S.cli[0].id)})});r=await ev(()=>S.wz&&S.wz.k);ok(r==='fiar','13 · pedir permiso para fiar: tarjeta',r);await sigue();await seguro();
r=await ev(()=>(S.avPrecio||[]).some(x=>/permiso para fiarle/.test(x)));ok(r,'13 · y le llega el aviso al administrador');
/* ---- 13 · cerrar el mes ---- */
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tab.admin='gastos';render();const prev=new Date(TODAY.getFullYear(),TODAY.getMonth()-1,15);window.__m=mesDe(iso(prev));clk('mescierra',{m:__m})});
r=await ev(()=>S.wz&&S.wz.k);ok(r==='mes','13 · cerrar el mes: tarjeta por pasos',r);await sigue();await sigue();await seguro();r=await ev(()=>mesCerrado(__m+'-15'));ok(r,'13 · el mes queda cerrado',r);

/* ---- 23 · notas ---- */
await ev(()=>{S.tab.admin='asi';render()});r=await ev(()=>({btn:!!document.querySelector('[data-act="notanueva"]'),sel:!!document.getElementById('asik')}));ok(r.btn&&!r.sel,'23 · "Así se hace": botón "+ Nueva nota" (ya no la lista larguísima de temas)',r);
await ev(()=>clk('notanueva'));await op('tipo','cli');r=await ev(()=>({q:!!document.querySelector('#wzov [data-wzq]'),n:document.querySelectorAll('#wzov .wzlista button').length}));ok(r.q&&r.n>3,'23 · escoger cliente con buscador',r);
await ev(()=>{const i=document.querySelector('#wzov [data-wzq]');i.value=S.cli[1].n.slice(0,5);i.dispatchEvent(new Event('input',{bubbles:true}))});r=await ev(()=>[...document.querySelectorAll('#wzov .wzlista button')].filter(b=>b.style.display!=='none').length);ok(r>=1&&r<5,'23 · el buscador filtra',r);
await ev(()=>{document.querySelector('#wzov .wzlista button[data-v="cli:'+S.cli[1].id+'"]').click()});await sigue();
await ev(()=>{const t=document.getElementById('wz_txt');t.value='Le gusta la fruta pintona';t.dispatchEvent(new Event('input',{bubbles:true}))});await sigue();await op('v','ch');await sigue();await seguro();
r=await ev(()=>{const n=S.notasN[S.notasN.length-1];return n});ok(r&&r.k==='cli:'+(await ev(()=>S.cli[1].id))&&r.v==='ch'&&/pintona/.test(r.txt),'23 · nota guardada con su tema y quién la ve',r);
r=await ev(()=>{const k='cli:'+S.cli[1].id;S.role='rep';const a=/pintona/.test(notasDe(k));S.role='admin';S.encOn=true;S.enc=S.enc||{ch:1,desde:iso(TODAY),hasta:iso(TODAY)};const e2=/pintona/.test(notasDe(k));S.encOn=false;return {ch:a,enc:e2}});ok(r.ch&&!r.enc,'23 · la nota "para choferes" la ve el chofer y no el encargado',r);
await ev(()=>{S.tab.admin='asi';render()});r=await ev(()=>document.querySelectorAll('main details.card').length);ok(r>=1,'23 · notas agrupadas por tema (plegadas)',r);

/* ---- 26 · vacaciones ---- */
await ev(()=>{S.tab.admin='inicio';S.vac={};render();clk('vacsw')});r=await ev(()=>S.wz&&S.wz.k);ok(r==='vac','26 · "Me voy de vacaciones" abre la tarjeta por pasos',r);
await sigue();await ev(()=>{const b=document.querySelector('#wzov .wzlista button');b.click()});await sigue();
await op('p_pagos','1');await sigue();await ev(()=>{const i=document.getElementById('wz_pR');i.value='250';i.dispatchEvent(new Event('input',{bubbles:true}))});await sigue();await op('manda','res');
r=await ev(()=>document.getElementById('wzov').innerText);ok(/A cargo/.test(r)&&/Pagos hasta/.test(r),'26 · al final enseña el resumen',r.slice(0,200));await sigue();r=await seguro();ok(r,'26 · pide "¿Seguro?"');
r=await ev(()=>({vac:S.vac[S.adminYo],p:S.enc&&S.enc.p,plan:S.vacPlan&&S.vacPlan.pR,av:Object.values(S.rutaAv||{}).flat().some(x=>/encargado del/.test(x))}));ok(r.vac&&r.p&&r.p.pagos&&r.p.cierres&&!r.p.precio&&r.plan===250&&r.av,'26 · se guarda: fechas, encargado, permisos, precio base y aviso al encargado',r);
r=await ev(()=>{window.__vacTest=1;S.encOn=true;S.enc.ch=S.vacPlan.ch;const n=__t.length;clk('precioconf');S.encOn=false;return __t.slice(n).join(' ')});ok(/no te dejó fijar el precio/.test(r),'26 · el encargado no puede lo que no le diste (y la app dice por qué)',r);
await ev(()=>{S.vacPlan.desde=iso(new Date(TODAY.getTime()-864e5));S.precio.conf='';render()});r=await ev(()=>({R:S.precio.R,conf:S.precio.conf===iso(TODAY)}));ok(r.R===250&&r.conf,'26 · en vacaciones se usa el precio base que dejó',r);
await ev(()=>clk('vacsw'));await seguro();r=await ev(()=>({vac:S.vac[S.adminYo],plan:S.vacPlan,m:JSON.stringify(S.modal||'')}));ok(!r.vac&&!r.plan&&/Mientras no estabas/.test(r.m),'26 · "Ya regresé": quita permisos y enseña lo que pasó',r);await ev(()=>{S.modal=null;render()});

/* ---- 31 · gastos del chofer ---- */
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;const c=S.choferes.filter(x=>x.id===1)[0];c.comida=false;S.tab.rep='ruta';S.gxSheet=true;S.gxFuel=false;S.gx={tipo:'Caseta',monto:'',nota:'',foto:null};render()});
r=await ev(()=>({com:!!document.querySelector('[data-t="Comida o viáticos"],[data-v="Comida o viáticos"]'),txt:/obligatoria/.test(document.body.innerText)}));ok(!r.com&&r.txt,'31 · sin acuerdo no sale "Comida"; el ticket dice que es obligatorio',r);
r=await ev(()=>{const n=S.gch.length;S.gx={tipo:'Caseta',monto:'60',nota:'',foto:null};clk('gxsave');return {n:S.gch.length-n,t:__t.slice(-1)[0]}});ok(r.n===0&&/obligatoria/.test(r.t),'31 · caseta sin foto del ticket: no se guarda',r);
r=await ev(()=>{const n=S.gch.length;S.gx={tipo:'Caseta',monto:'60',nota:'',foto:'data:image/jpeg;base64,AA'};clk('gxsave');return S.gch.length-n});ok(r===1,'31 · con foto sí se guarda',r);
r=await ev(()=>{const n=(S.recs||[]).length;S.rc={tipo:'',precio:'24',litros:'20',total:'480',manual:false};clk('recargar');return (S.recs||[]).length-n});ok(r===0,'31 · gasolina sin foto del ticket: no se guarda',r);
await ev(()=>{S.role='admin';S.encOn=false;S.tab.admin='personal';S.openCh=1;S.fiTab['emp:1']='dat';render()});r=await ev(()=>!!document.querySelector('[data-act="chcomida"]'));ok(r,'31 · en la ficha del chofer: "Puede agregar comida"');
await ev(()=>{document.querySelector('[data-act="chcomida"]').click()});r=await ev(()=>{S.openCh=null;S.role='rep';S.gxSheet=true;S.gx={tipo:'Caseta',monto:'',nota:'',foto:null};render();return !!document.querySelector('[data-t="Comida o viáticos"]')});ok(r,'31 · con acuerdo ya le sale "Comida"',r);
r=await ev(()=>{S.gxSheet=false;S.role='admin';S.rcv={p:0};return /Entregó sus \d+ ticket/.test(rcHTML())});ok(r,'31 · al recibir el cierre: "Entregó sus N tickets"');await ev(()=>{S.rcv=null;render()});

/* ---- 19 · tutorial ---- */
r=await ev(()=>JSON.stringify(TUT));ok(!/Cuéntalo sin ver cuánto debía/.test(r)&&/solo confirmas/.test(r)&&/\+ y −/.test(r),'19 · textos del tutorial al día (recepción, billetes, gastos, vacaciones, respaldo)');

/* ---- 29 · respaldo diario ---- */
r=await ev(async()=>{window.__respTest=1;window.__rg=[];window.Capacitor={Plugins:{RutaNativa:{respaldoGuardar:o=>{__rg.push(o.nombre);return Promise.resolve({donde:'Descargas/Ruta Facil/Respaldos/'+o.nombre})},respaldoLimpia:o=>{window.__q=o.quedan;return Promise.resolve({borrados:0,lista:[]})}}}};
 localStorage.removeItem('respUlt');S.role='admin';S.encOn=false;const a1=avisos().some(x=>/sin respaldo/.test(x));await respHaz(false);await new Promise(r=>setTimeout(r,50));return {a1,g:__rg,ult:localStorage.getItem('respUlt'),q:(window.__q||[]).length,a2:avisos().some(x=>/sin respaldo/.test(x))}});
ok(r.g.length===1&&/^respaldo-\d{4}-\d\d-\d\d\.json$/.test(r.g[0])&&r.ult&&r.q===30,'29 · respaldo del día en Descargas/Ruta Facil/Respaldos y solo se quedan 30 días',r);ok(r.a1&&!r.a2,'29 · aviso si lleva más de 2 días sin respaldo (y se quita al respaldar)',r);
await ev(()=>{S.aj=true;render()});r=await ev(()=>{const t=document.getElementById('ajov').innerText;return /Respaldo automático/.test(t)&&/Respaldar ahora/.test(t)&&/Restaurar/.test(t)});ok(r,'29 · en Ajustes: último respaldo, dónde, "Respaldar ahora" y "Restaurar"');

ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
