/* 126 · "🚦 Ordenar con tráfico" ya no desaparece (Ricardo, 18 nov: "el botón para organizar con Google Maps desapareció"):
   sale ARRIBA de la ruta (debajo de "Ahora sigue"), también antes de salir (en "Revisar" del inicio por pasos),
   y si faltan ubicaciones lo dice en lugar de esconderse. Después del cierre o con menos de 2 clientes pendientes no sale.
   Uso: node t126.js [archivo.html]   (por defecto la versión real) */
const {chromium}=require('playwright');
const URL=process.argv[2]||'/mnt/user-data/outputs/platanos-primera-vez.html';
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
 const p=await (await b.newContext({viewport:{width:360,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});await p.goto('file://'+URL);await p.waitForTimeout(900);
 await p.evaluate(()=>{if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
   U.cli=[{n:'Cliente A',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente B',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente C',a:'z',tel:'6640000003',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  var ch=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.role='rep';S.chofHoy=ch.id;S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.tab.rep='ruta';S.rutaDia80=iso(TODAY);S.dia80=1;
  S.stops=S.cli.slice(0,3).map(c=>({c:c.id}));window.ponUb=function(n){S.cli.slice(0,3).forEach(function(c,i){if(i<n){c.lat=21.1+i/100;c.lng=-89.6+i/100}else{c.lat=null;c.lng=null}})}});
 const mira=()=>p.evaluate(()=>{render();var m=document.querySelector('main'),c=m.querySelector('.rgcard'),vis=!!(c&&c.getClientRects().length),ah=m.querySelector(':scope>.ahora')||m.querySelector(':scope>h1');
  var L=[].slice.call(m.children),ic=L.indexOf(c),ia=L.indexOf(ah),cli=L.findIndex(x=>x.classList&&x.classList.contains('next'));
  return {hay:!!c,vis:vis,btn:!!(c&&c.querySelector('[data-act="rgordena"]')),t:c?c.innerText.replace(/\n/g,' '):'',arriba:ic>-1&&(ia<0||ic===ia+1)&&(cli<0||ic<cli)}});
 /* en ruta, los 3 con ubicación */
 await p.evaluate(()=>{S.salida.ok=true;ponUb(3)});let r=await mira();
 ok(r.vis&&r.btn&&r.arriba&&/tus 3 clientes/.test(r.t),'en ruta: arriba (debajo de "Ahora sigue", antes de los clientes) con el botón',r);
 /* a uno le falta */
 await p.evaluate(()=>ponUb(2));r=await mira();ok(r.vis&&r.btn&&/1 cliente sin ubicación se queda al final/.test(r.t),'a 1 le falta la ubicación: sigue el botón y lo avisa',r);
 /* solo uno con ubicación: no se esconde, dice qué falta */
 await p.evaluate(()=>ponUb(1));r=await mira();ok(r.vis&&!r.btn&&/A 2 clientes les falta la ubicación/.test(r.t),'solo 1 con ubicación: ya no desaparece, dice que a 2 les falta',r);
 await p.evaluate(()=>ponUb(0));r=await mira();ok(r.vis&&!r.btn&&/A 3 clientes les falta/.test(r.t),'ninguno con ubicación: lo dice',r);
 /* antes de salir: en el último paso del inicio del día */
 await p.evaluate(()=>{ponUb(3);S.salida.ok=false;render()});for(let k=0;k<2;k++){await p.evaluate(()=>{var x=[].slice.call(document.querySelectorAll('main button')).filter(b=>/Iniciar ruta/.test(b.textContent))[0];if(x)x.click()});await p.waitForTimeout(200)}
 await p.evaluate(()=>{if(typeof salPon124==='function')salPon124(6)});r=await mira();ok(r.vis&&r.btn,'antes de salir (paso Revisar): ya se puede ordenar la ruta',r);
 await p.evaluate(()=>{if(typeof salPon124==='function')salPon124(0)});r=await mira();ok(!r.vis,'en los otros pasos del inicio no estorba',r);
 /* menos de 2 pendientes o ya mandó el cierre: no sale */
 await p.evaluate(()=>{S.salida.ok=true;S.stops[0].done=true;S.stops[1].done=true});r=await mira();ok(!r.hay,'con 1 cliente pendiente no sale',r);
 await p.evaluate(()=>{S.stops.forEach(s=>s.done=false);S.cierre.sent=true});r=await mira();ok(!r.hay,'ya con el cierre mandado no sale',r);
 ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
