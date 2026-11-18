/* 125 · La venta en ruta por pasos: 1 Qué le dejas → 2 Cobro → 3 Cajas vacías y taras (se brinca si no debe) → "Revisar y guardar".
   Que cada venta se guarda igual que antes lo revisa pruebas/comp-venta.js. Aquí: los pasos, sus avisos y que no avance sin lo suyo.
   Uso: node t125.js [archivo.html]   (por defecto la versión real) */
const {chromium}=require('playwright');
const URL=process.argv[2]||'/mnt/user-data/outputs/platanos-primera-vez.html';
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
 const p=await (await b.newContext({viewport:{width:360,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});await p.goto('file://'+URL);await p.waitForTimeout(900);
 await p.evaluate(()=>{window.__t=[];var _tt=toast;toast=function(m){__t.push(String(m));return _tt.apply(this,arguments)};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
   U.cli=[{n:'Cliente Debe',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:900,vac:3,ch:'0'},{n:'Cliente Limpio',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  var ch=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.role='rep';S.chofHoy=ch.id;S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.salida.ok=true;S.rutaDia80=iso(TODAY);S.inv.reparto=30;S.inv.repartoKg=50;S.cierre.salioR=30;S.cfg.tarCh116='500';
  S.stops=S.cli.map(c=>({c:c.id}));S.cur=0;resetDraft(cl(S.stops[0].c));S.tab.rep='entrega';render()});
 const est=()=>p.evaluate(()=>{var m=document.querySelector('main'),vis=function(sel){var e=m.querySelector(sel);return !!(e&&e.getClientRects().length)},txt=m.innerText;
  return {paso:(txt.match(/Paso (\d) de (\d) · [^\n←]*/)||[''])[0].trim(),deja:/¿Qué le dejas\?/.test(txt),cobro:/\nCobro\n/.test('\n'+txt+'\n')||vis('[data-x="deb109"]'),vacias:/Cajas vacías que devuelve/.test(txt),bar:vis('.entbar'),guardar:vis('.entbar [data-act="entconf"]'),guardarTxt:(m.querySelector('.entbar [data-act="entconf"]')||{}).textContent,siguiente:vis('.entbar [data-act="ent125p"]'),noEstaba:/No estaba/.test(txt),parada:/Parada \d+ de/.test(txt),toast:__t.slice(-1)[0]||''}});
 const sig=async()=>{await p.evaluate(()=>{var x=document.querySelector('.entbar [data-act="ent125p"]');x&&x.click()});await p.waitForTimeout(120)};
 /* cliente que debe dinero y vacías: 3 pasos */
 let r=await est();ok(/Paso 1 de 3 · Qué le dejas/.test(r.paso)&&r.deja&&!r.vacias&&r.noEstaba&&r.parada&&r.bar&&r.siguiente&&!r.guardar,'paso 1: qué le dejas, "No estaba", la parada y la barra con Siguiente',r);
 await p.evaluate(()=>{S.d.R=0;S.d.M=0;S.d.abono=0;render()});await sig();r=await est();
 ok(/Paso 1 de 3/.test(r.paso)&&/Agrega cajas, kilos o un abono/.test(r.toast),'sin cajas, kilos ni abono no avanza',r);
 await p.evaluate(()=>{S.d.R=4;S.d.M=3;render()});await sig();r=await est();
 ok(/Paso 2 de 3 · Cobro/.test(r.paso)&&!r.deja&&!r.vacias&&r.bar,'paso 2: el cobro',r);
 ok(await p.evaluate(()=>{var m=document.querySelector('main'),hd=m.querySelector('[data-x="ent125hd"]'),av=m.querySelector('.entav');return !!(hd&&(!av||hd.compareDocumentPosition(av)&Node.DOCUMENT_POSITION_FOLLOWING))}),'los avisos del cobro van debajo del título del paso');
 await sig();r=await est();ok(/Paso 3 de 3 · Cajas vacías y taras/.test(r.paso)&&r.vacias&&r.guardar&&r.guardarTxt==='Revisar y guardar'&&!r.siguiente,'paso 3: vacías y "Revisar y guardar"',r);
 await p.evaluate(()=>{var x=document.querySelector('[data-act="ent125p"].link');x&&x.click()});await p.waitForTimeout(120);r=await est();ok(/Paso 2 de 3/.test(r.paso),'← Atrás regresa al cobro',r);
 /* desde el paso 3, algo del paso 1: regresa ahí */
 await p.evaluate(()=>{S.entP125={c:String(S.stops[0].c),p:2};S.d.R=99;render();var x=document.querySelector('.entbar [data-act="ent125ir"]');x&&x.click()});await p.waitForTimeout(200);r=await est();
 ok(/Paso 1 de 3/.test(r.paso)&&/Solo traes 30 cajas/.test(r.toast),'"Revisar y guardar" con más cajas de las que trae: regresa al paso 1 y avisa',r);
 /* guardar de verdad */
 await p.evaluate(()=>{S.d.R=4;S.d.M=3;S.d.V=3;S.entP125={c:String(S.stops[0].c),p:2};render();document.querySelector('[data-act="entconf"]').click()});await p.waitForTimeout(200);
 for(let k=0;k<4;k++){await p.evaluate(()=>{var y=[].slice.call(document.querySelectorAll('button')).filter(x=>x.getClientRects().length&&!x.closest('main')&&/^(Sí, guardar|Ya le pedí|Sí|Guardar)/.test(x.textContent.trim()))[0];if(y)y.click()});await p.waitForTimeout(150)}
 r=await p.evaluate(()=>({n:S.log.length,inv:S.inv.reparto,cur:curStop(),cli:(cl(S.stops[curStop()].c)||{}).n}));ok(r.n===1&&r.inv===26,'se guarda con la ventana de siempre; quedan 26 cajas',r);
 /* siguiente cliente: no debe vacías ni taras → 2 pasos y las vacías van junto con el cobro */
 await p.evaluate(()=>{S.tab.rep='entrega';S.d.R=2;S.d.M=0;render()});r=await est();ok(/Paso 1 de 2 · Qué le dejas/.test(r.paso),'cliente sin deuda de vacías ni taras: empieza en el paso 1 de 2',r);
 await sig();r=await est();ok(/Paso 2 de 2 · Cobro y cajas vacías/.test(r.paso)&&r.vacias&&r.guardarTxt==='Revisar y guardar','el paso de vacías se brinca: las vacías salen con el cobro',r);
 /* venta en la calle: 2 pasos */
 await p.evaluate(()=>{S.tab.rep='ruta';render();var x=document.createElement('button');x.dataset.act='calle';document.body.appendChild(x);x.click();x.remove()});await p.waitForTimeout(150);r=await est();
 ok(/Paso 1 de 2 · Qué le dejas/.test(r.paso)&&/Venta rápida/.test(await p.evaluate(()=>document.querySelector('main').innerText)),'venta en la calle: paso 1 de 2 con sus datos',r);
 ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
