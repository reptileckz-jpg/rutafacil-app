/* 9.6 · 100: la versión real ya no trae valores de la demo en los números · 98: proveedores y básculas con la coordenada escrita en la dirección */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const abre=async(f)=>{const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p._errs=[];p.on('pageerror',e=>p._errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/'+f);await p.waitForTimeout(1000);return p};
const SETUP=(costo)=>{var U=S.setup;U.yo='Dueño Uno';U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000,capL:'75',acLast:'900'},{n:'Camión Uno',pl:'CC1',plEdo:'Baja California',comb:'Diésel',img:2,odo:5000}];
 U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[{n:'Cliente Uno',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Proveedor Uno',tipo:'Roatán',tel:''}];S.precio.R=300;S.precio.M=20;
 if(costo){S.cfg.costoIniR='210';S.cfg.costoIniM='13'}suAplicar();S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.dfTest=1};
let p=await abre('platanos-primera-vez.html'),r;
// ---- instalación nueva, sin costo
r=await p.evaluate((SETUP)=>{eval('('+SETUP+')')(false);var v=S.veh[0],t=S.veh[1];
 return {an:v.anual,sm:v.sueldoMes,pv:v.parteVentas,pr:v.precio,rd:v.rend0,cap:[v.capV,v.capVK,v.capRC,v.capRK,v.capC],capL:v.capL,acLast:v.acLast,tan:t.anual,tval:t.valor,tkm:t.kmMes,tcap:[t.capV,t.capC],tL:t.capL,cR:costoCajaAct(),cM:costoKgMAct(),cli:[S.cli[0].lim,S.cli[0].pc]}},SETUP.toString());
ok(JSON.stringify(r.an)==='{}'&&r.sm===undefined&&r.pv===undefined&&r.pr===''&&r.rd===''&&r.cap.every(x=>x===''),'100c · vehículo del asistente sin seguro, sueldo, gasolina, rendimiento ni capacidades de la demo',r);
ok(r.capL===75&&r.acLast===900,'100c · lo que sí escribiste en el asistente (tanque, último aceite) se queda',[r.capL,r.acLast]);
ok(JSON.stringify(r.tan)==='{}'&&r.tval===''&&r.tkm===''&&r.tcap.every(x=>x===''),'100c · el camión tampoco trae el valor, km ni costos del de la demo',r);
ok(r.cR===0&&r.cM===0,'100b · sin cargas y sin costo puesto: costo $0 (ya no $190 / $14 de la demo)',[r.cR,r.cM]);
ok(r.cli[0]===1500&&r.cli[1]===null,'100d · cliente nuevo: límite de crédito $1,500 (el de Ajustes, no $3,000) y sin "70% de contado" inventado',r.cli);
r=await p.evaluate(()=>{S.precio.conf=iso(TODAY);S.tab.admin='inicio';render();var t=document.querySelector('main').innerText;return {t:(t.match(/cuesta[^\n]*/g)||[]).join(' | '),df:dfLista().map(x=>x.txt)}});
ok(/cuesta — /.test(r.t)&&!/\$190|\$14\b/.test(r.t),'100b · Inicio dice "cuesta —" mientras no hay costo',r.t);
ok(r.df.some(x=>/Cuánto te cuesta la caja/.test(x)),'100b · "Datos que faltan" pide cuánto te cuesta',r.df.filter(x=>/cuesta|Rendimiento|al año/.test(x)));
ok(r.df.some(x=>/Rendimiento de Camioneta Uno/.test(x))&&r.df.some(x=>/al año por Camioneta Uno/.test(x)),'100c · "Datos que faltan" pide rendimiento y lo que pagas al año del vehículo');
// tarjeta paso a paso desde "Datos que faltan"
r=await p.evaluate(()=>{var x=dfLista().filter(o=>/Cuánto te cuesta/.test(o.txt))[0];dfIr(x);var w=S.wz&&S.wz.k,tx=document.body.innerText;tx=tx.slice(Math.max(0,tx.indexOf('¿Cuánto te cuesta')-40),tx.indexOf('¿Cuánto te cuesta')+300);
 S.wz.d.R='205';S.wz.d.M='12.5';var g=WZ.costo96.guardar(S.wz.d);S.wz=null;render();return {w,tx,g,cfg:[S.cfg.costoIniR,S.cfg.costoIniM],cR:costoCajaAct(),cM:costoKgMAct(),df:dfLista().some(o=>/Cuánto te cuesta/.test(o.txt)),t:(document.querySelector('main').innerText.match(/cuesta[^\n]*/g)||[]).join(' | ')}});
ok(r.w==='costo96'&&/¿Cuánto te cuesta la caja de roatán\?/.test(r.tx),'100b · "Datos que faltan" abre la tarjeta paso a paso "¿Cuánto te cuesta?"',r.tx.slice(0,120));
ok(r.g===true&&r.cR===205&&r.cM===12.5&&!r.df,'100b · al guardarla: costo $205 la caja y $12.50 el kilo, y ya no sale en "Datos que faltan"',r);
ok(/cuesta \$205/.test(r.t),'100b · Inicio muestra el costo que pusiste',r.t);
// ---- odómetro: la ruta del chofer empieza con el de su vehículo
r=await p.evaluate(()=>{var id=S.choferes.filter(c=>c.n==='Chofer Uno')[0].id;S.role='rep';S.chofHoy=id;S.pinOk['c:'+id]=true;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();return [S.cierre.odoIni,S.cierre.odo]});
ok(Number(r[0])===1000,'100a · la ruta nueva del chofer empieza con el odómetro de su camioneta (1,000), no con 48,262 de la demo',r);
await p.close();
// ---- con costo en el asistente
p=await abre('platanos-primera-vez.html');
r=await p.evaluate((SETUP)=>{S.setup.p=6;window.__pnTest=0;var hh='';try{hh=setupHTML()}finally{window.__pnTest=1}var h=/data-bind="cfg.costoIniR"/.test(hh)&&/data-bind="cfg.costoIniM"/.test(hh)&&/¿Cuánto te cuesta\?/.test(hh);eval('('+SETUP+')')(true);return {h,cR:costoCajaAct(),cM:costoKgMAct(),df:dfLista().some(o=>/Cuánto te cuesta/.test(o.txt))}},SETUP.toString());
ok(r.h&&r.cR===210&&r.cM===13&&!r.df,'100b · el asistente (Dinero y precios) pregunta cuánto te cuesta y se usa hasta la primera carga',r);
await p.close();
// ---- datos que ya estaban guardados (celulares de Ricardo): se limpian una vez
p=await abre('platanos-primera-vez.html');
r=await p.evaluate((SETUP)=>{eval('('+SETUP+')')(false);var T=tpl().veh;var v=S.veh[0];Object.assign(v,JSON.parse(JSON.stringify({anual:T[0].anual,sueldoMes:T[0].sueldoMes,parteVentas:T[0].parteVentas,precio:T[0].precio,rend0:T[0].rend0,capV:T[0].capV,capVK:T[0].capVK,capRC:T[0].capRC,capRK:T[0].capRK,capC:T[0].capC})));
 var w=S.veh[1];w.anual={seguro:15000,tenencia:2000,verif:700,placas:900};w.rend0=4.2;w.capC=300;
 S.cli[0].pc=70;S.cli[0].dp=null;S.limpDemo=2;
 var id=S.choferes.filter(c=>c.n==='Chofer Uno')[0].id;S.chSt={};
 render();var a={an:v.anual,sm:v.sueldoMes,pv:v.parteVentas,pr:v.precio,rd:v.rend0,cap:[v.capV,v.capC],w:[w.anual.seguro,w.rend0,w.capC],pc:S.cli[0].pc,ld:S.limpDemo};
 S.role='rep';S.chofHoy=id;S.pinOk['c:'+id]=true;S.vehHoy=v.id;S.salida.ok=false;S.cierre.odoIni=48262;S.cierre.odo=48282;S.tab.rep='ruta';render();a.odo=[S.cierre.odoIni,S.cierre.odo];
 S.salida.ok=true;S.cierre.odoIni=48262;render();a.odoSalio=S.cierre.odoIni;return a},SETUP.toString());
ok(JSON.stringify(r.an)==='{}'&&r.sm===undefined&&r.pv===undefined&&r.pr===''&&r.rd===''&&r.cap.every(x=>x==='')&&r.ld===3,'100 · vehículo ya guardado con los datos de la demo: se le quitan (una sola vez)',r);
ok(r.w[0]===15000&&r.w[1]===4.2&&r.w[2]===300,'100 · lo que el usuario cambió no se toca',r.w);
ok(r.pc===null,'100d · cliente ya guardado con "70% de contado" inventado: se quita',r.pc);
ok(Number(r.odo[0])===1000&&Number(r.odo[1])>=1000&&Number(r.odo[1])<2000,'100a · ruta ya armada con el odómetro de la demo (y sin salir): toma el de su camioneta (el de regreso, más los km estimados de la ruta)',r.odo);
ok(r.odoSalio===48262,'100a · si ya salió, el odómetro que confirmó no se cambia',r.odoSalio);
await p.close();
// ---- 98 · Roly y la báscula Tecate
p=await abre('platanos-primera-vez.html');
r=await p.evaluate((SETUP)=>{eval('('+SETUP+')')(false);var R=provD('Roly');R.tipo='Roatán';R.dir='19.8123, -96.8456';R.lat=null;R.lng=null;
 S.basc=[{id:1,n:'Báscula Tecate',cobro:'50',dir:'32.5762,-116.6270',ab:'',ci:'',nota:''},{id:2,n:'Báscula Otay',cobro:'40',dir:'Carretera libre km 3',ab:'',ci:'',nota:''}];
 var P=provD('Proveedor Uno');P.dir='https://www.google.com/maps?q=32.51,-117.02';
 S.tab.admin='cargas';render();var t=S.basc[0],o=S.basc[1];
 return {R:[R.lat,R.lng,R.dir,R.ubAprox,ubTiene(R)],T:[t.lat,t.lng,t.dir,ubTiene(t)],O:[ubTiene(o),o.dir],P:[ubTiene(P),P.ubAprox],log:(R.ubLog89||[]).length}},SETUP.toString());
ok(r.R[0]===19.8123&&r.R[1]===-96.8456&&r.R[2]===''&&r.R[3]===false&&r.R[4],'98 · proveedor (Roly) con la coordenada escrita en la dirección: queda como su ubicación, ya confirmada',r.R);
ok(r.T[0]===32.5762&&r.T[1]===-116.627&&r.T[2]===''&&r.T[3],'98 · báscula (Tecate) con la coordenada escrita en la dirección: queda como su ubicación',r.T);
ok(!r.O[0]&&r.O[1]==='Carretera libre km 3','98 · una dirección normal (sin coordenada) no se toca',r.O);
ok(r.P[0]&&r.P[1]===false,'98 · también un link de Google Maps escrito en la dirección',r.P);
// el viaje de carga ya no las pide
r=await p.evaluate(()=>{var need=[];try{var bs=S.basc[0],d=provD('Roly');need=[!bs||!ubTiene(bs),!ubTiene(d)||!!d.ubAprox]}catch(e){need=['ERR '+e.message]}return need});
ok(r[0]===false&&r[1]===false,'98 · al ir a cargar ya no pide la ubicación de Roly ni de la báscula Tecate',r);
ok(!p._errs.length,'sin errores de página',p._errs);await p.close();
// ---- la demo no cambia
p=await abre('prototipo-platanos.html');
r=await p.evaluate(()=>{var c=nuevoCli({n:'Z'}),v=nuevoVeh({n:'X',odo:1});return {cR:costoIni96('R'),cM:costoIni96('M'),lim:c.lim,pc:c.pc,an:v.anual,sm:v.sueldoMes}});
ok(r.cR===190&&r.cM===14&&r.lim===3000&&r.pc===70&&r.an&&r.an.seguro===9800&&r.sm===9000,'la demo sigue con sus datos de ejemplo',r);
await p.close();
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
