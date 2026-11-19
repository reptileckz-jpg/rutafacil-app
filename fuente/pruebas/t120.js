/* 120 · varios cierres el mismo día: ninguno se borra; ingresos, caja, estadísticas e historial cuadran; se recupera el que se perdió */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:500,vac:0,ch:'0'},{n:'Toño',a:'z',tel:'6640000003',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Danu')[0].id;window.__D=id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true});
/* un cierre: se manda, el admin lo recibe y el chofer empieza otro */
const cierra=(rec,seguir)=>ev(([rec,seguir])=>{S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:rec,f:null};if(seguir){var b=document.createElement('button');b.dataset.act='seguir';b.dataset.k='';document.body.appendChild(b);b.click();b.remove()}return S.log.length},[rec,seguir]);
const ent=(i,R,pago,abono)=>ev(([i,R,pago,abono])=>{S.log.push({c:S.cli[i].id,R:R,M:0,pr:275,pm:20,total:R*275,pago:pago,abono:abono||0,h:'10:00'});S.salida.ok=true},[i,R,pago,abono]);
await ent(0,10,2750);await ent(1,4,1100);r=await cierra(3850,true);
ok(r===0,'120 · al empezar el cierre 2 la ruta queda vacía para lo nuevo',r);r=await ev(()=>(S.avPrecio||[]).filter(x=>/empezó su cierre/.test(x)));ok(r.length===1&&/empezó su cierre 2 de hoy/.test(r[0]),'120 · el aviso dice el número de cierre (antes siempre "segundo")',r);
await ent(2,2,550,200);r=await cierra(750,true);
await ent(0,4,1100);
r=await ev(()=>{var hoy=iso(TODAY);return {parts:(S.rutasHist||[]).filter(e=>e.parcial120).map(e=>({n:e.n120,log:e.log.length,rec:e.cierreReg82&&e.cierreReg82.rec,corte:!!e.corte120})),dia:rutasDia120(hoy).map(x=>({ch:x.ch,n:x.n,cob:cobPart120(x)})),prev:(S.cierresPrev||[]).map(x=>({ch:x.ch,f:x.f,n:x.n120,rec:x.rec}))}});
ok(r.parts.length===2&&r.parts[0].n===1&&r.parts[0].log===2&&r.parts[1].n===2&&r.parts[1].log===1&&r.parts[0].corte,'120 · los cierres 1 y 2 quedan guardados completos (con sus entregas y su corte)',r.parts);
ok(r.dia.length===3&&r.dia.map(x=>x.n).join()==='1,2,3'&&r.dia.map(x=>x.cob).join()==='3850,750,1100','120 · el día tiene los 3 cierres: $3,850, $750 (con abono) y $1,100 de la ruta abierta',r.dia);
ok(r.prev.every(x=>x.ch>0&&/^\d{4}-\d\d-\d\d$/.test(x.f))&&r.prev.map(x=>x.n).join()==='1,2','120 · cada cierre recibido sabe de qué chofer, qué día y qué número es',r.prev);
r=await ev(()=>{var hoy=iso(TODAY);return {ventas:(hist82().filter(x=>x.d===hoy)[0]||{}).ing,ing:ingDia120(hoy).tot,caja:cajaEsp(),gas:gasDia120(hoy).tot}});
ok(r.ventas===5500,'120 · Estadísticas: ventas de hoy $5,500 (los 3 cierres; antes solo el último)',r);
ok(r.ing===5700,'120 · Ingresos de hoy $5,700 = lo cobrado en los 3 cierres (antes $9,800 de la demo + solo la ruta abierta)',r);
ok(r.caja===4600&&r.gas===0,'120 · Efectivo en caja $4,600 = lo recibido de los cierres 1 y 2; gastos $0',r);
// el admin
r=await ev(()=>{S.role='admin';S.tab.admin='inicio';S.finVer=Date.now();S.finOpen='ingresos';render();var t=document.querySelector('main').innerText;return t});
ok(/Danu · cierre 1\s*\$3,850/.test(r)&&/Danu · cierre 2\s*\$750/.test(r)&&/Danu · cierre 3\s*\$1,100/.test(r)&&/Esta semana \(desde el lunes\)\s*\$5,700/.test(r)&&/Este mes\s*\$5,700/.test(r),'120 · el panel de Ingresos: cada cierre, la semana y el mes',(r.match(/Ingresos[\s\S]{0,400}/)||[''])[0]);
ok(!/9,800|1,850|7,300|29,800|15,290/.test(r),'120 · en Inicio ya no sale ningún número de la demo');
ok(/Cuadre de hoy/.test(r)&&!/Cierre \d+ de .* entregado/.test(r),'120 · Inicio: "💰 Cuadre de hoy" (antes "Cierre N de … entregado" para siempre)');
r=await ev(()=>{document.querySelector('[data-act="cie120ver"]').click();var t=document.querySelector('main').innerText;return t});
ok(/💰 Cuadre/.test(r)&&/Cierre 1/.test(r)&&/Cierre 2/.test(r)&&/Cierre 3/.test(r)&&/Recibiste\s*\$3,850/.test(r)&&/Código del corte/.test(r),'120 · el Cuadre trae cada cierre con su corte y lo recibido (antes "Historial de cierres")',r.slice(0,500));
// se manda y recibe el 3 y cambia el día: nada se pierde
r=await ev(()=>{S.role='rep';S.chofHoy=window.__D;S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:1100,f:null};var a=cajaEsp(),viejo=iso(TODAY);TODAY=new Date(TODAY.getTime()+864e5);cambioDeDia(viejo);try{render()}catch(e){}
 return {antes:a,despues:cajaEsp(),dia:rutasDia120(viejo).map(x=>x.n+':'+cobPart120(x)),ventas:(hist82().filter(x=>x.d===viejo)[0]||{}).ing,ingAyer:ingDia120(viejo).tot}});
ok(r.antes===5700&&r.despues===5700,'120 · al cambiar de día el efectivo recibido SIGUE en la caja (antes se perdía)',r);
ok(r.dia.join()==='1:3850,2:750,3:1100'&&r.ventas===5500&&r.ingAyer===5700,'120 · y el día de ayer sigue con sus 3 cierres en Estadísticas e Ingresos',r);
// recuperar un cierre que se perdió antes del arreglo
r=await ev(()=>{S.role='admin';S.tab.admin='inicio';var a=cajaEsp();S.cierresPrev.push({n:9,res:{R:10,M:0,vR:2750,vM:0,total:2750,cred:0,ab:0,efectivo:2750},rec:2750});S.actDia=(S.actDia||[]).concat([{f:iso(TODAY),h:'13:30',ch:window.__D,x:'Danu empezó un segundo cierre'}]);render();var c=document.querySelector('[data-x="perd120"]'),i=S.cierresPrev.length-1;return {a,b:cajaEsp(),t:c&&c.innerText,sug:(document.getElementById('pch120_'+i)||{}).value===String(window.__D)&&(document.getElementById('pf120_'+i)||{}).value===iso(TODAY)}});
ok(/Según lo que pasó ese día: Danu empezó otro cierre/.test(r.t||'')&&r.sug,'120 · el aviso sugiere el chofer y el día con lo que la app sí anotó ese día',r.t&&r.t.slice(0,300));
ok(/Cierres que no salían en las cuentas/.test(r.t||'')&&/Vendió\s*\$2,750/.test(r.t)&&r.b===r.a+2750,'120 · un cierre perdido sale para recuperarlo (su efectivo ya estaba en la caja)',r);
r=await ev(()=>{var hoy=iso(TODAY),i=S.cierresPrev.length-1;document.getElementById('pch120_'+i).value=String(window.__D);document.getElementById('pf120_'+i).value=hoy;var c0=cajaEsp();document.querySelector('[data-act="resc120"]').click();return {ing:ingDia120(hoy).tot,ventas:(hist82().filter(x=>x.d===hoy)[0]||{}).ing,caja:cajaEsp(),c0,card:!!document.querySelector('[data-x="perd120"]'),hist:rutasDia120(hoy).map(x=>x.n+(x.resc?'r':''))}});
ok(r.ing===2750&&r.ventas===2750&&r.caja===r.c0&&!r.card&&r.hist.join()==='1r','120 · "Sumarlo a las cuentas": entra a Ingresos y Estadísticas del día, sin contar dos veces el efectivo',r);
r=await ev(()=>{S.tab.admin='cuadre121';S.cu121p='dia';S.cu121d=iso(TODAY);render();return document.querySelector('main').innerText});ok(/Falta el costo de la caja o el kilo/.test(r),'121 · sin costo de la caja, el Cuadre avisa (no hace como si todo fuera ganancia)');
// estadísticas: ninguna sección truena
r=await ev(()=>{var bad=[];S.tab.admin='estadisticas';['resumen','ventas','ganancias','gastos','compras','merma'].forEach(function(s){['dia','semana','mes','anio'].forEach(function(pp){var n0=(S.probs||[]).length;try{S.st.sec=s;S.st.per=pp;render();estSec()}catch(e){bad.push(s+'/'+pp+': '+e.message)}if((S.probs||[]).length>n0)bad.push(s+'/'+pp+' anotó un error')})});return bad});
ok(!r.length,'120 · Estadísticas: ninguna sección ni periodo truena (antes Ganancias y Compras)',r);
// verificación: ya no $493
r=await ev(()=>{var v=S.veh[0];v.anual=v.anual||{};v.anual.verif='';var n0=S.gastos.length;window.prompt=function(){return '650'};var b=document.createElement('button');b.dataset.act='verok';b.dataset.id=v.id;document.body.appendChild(b);b.click();b.remove();var ok=document.querySelector('[data-act="confok"]');if(ok)ok.click();var g=S.gastos.slice(n0);return g.map(x=>x.m)});
ok(r.length===1&&r[0]===650,'120 · verificación: se pregunta cuánto costó (antes siempre $493)',r);
// el celular del chofer ya no toca los Ajustes
r=await ev(()=>{S.role='rep';var a=JSON.stringify(S.cfg);S.cfg.crCh='';var c=crCfg();var b2=JSON.stringify(S.cfg);NB.perfil={rol:'chofer'};var x=[nbSoloAdm120({k:'cfg'}),nbSoloAdm120({k:'admins'}),nbSoloAdm120({k:'log',ruta:1}),nbSoloAdm120({k:'rutasHist'})];NB.perfil={rol:'admin'};x.push(nbSoloAdm120({k:'cfg'}));S.role='admin';return {crCh:c.crCh,cambio:S.cfg.crCh,x}});
ok(r.crCh==='5000'&&r.cambio===''&&JSON.stringify(r.x)==='[true,true,false,false,false]','120 · en el celular del chofer los límites se leen sin cambiar los Ajustes ni mandarlos a la nube',r);
// el admin que reparte: su ruta guardada aparte (arSt) también cuenta, con sus cierres
r=await ev(()=>{var hoy=iso(TODAY);S.role='admin';S.arSt={chofHoy:2,log:[{c:S.cli[2].id,R:3,M:0,pr:275,total:825,pago:825,abono:0}],cierre:{sent:true,res:{total:825,efectivo:825}},cierreReg:{rec:825},salida:{ok:true},stops:[]};var c0=cajaEsp();var L=rutasDia120(hoy).filter(x=>x.ch===2);var a={n:L.length,cob:L[0]&&cobPart120(L[0]),ing:ingDia120(hoy).partes.filter(p=>p.ch===2).length};S.arSt=null;a.c=c0-cajaEsp();return a});
ok(r.n===1&&r.cob===825&&r.ing===1&&r.c===825,'120 · la ruta del administrador que reparte también entra a Ingresos, Estadísticas y caja',r);
// taras: un número vacío ya no rompe la suma
r=await ev(()=>{S.cli[0].vac=undefined;var w=cajasDonde();return {tot:w.tot,ok:isFinite(w.tot)}});ok(r.ok,'120 · taras: un número vacío ya no rompe el total ("Total —")',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
