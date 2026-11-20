/* 6 (nueva numeración) · parte 1: el cierre atrasado enseña TODO lo de esa ruta (dinero, taras, kilos, gasolina, vehículo) con la misma cuenta
   del cierre; y las rutas que nadie recibió salen en Rutas con "Recibir lo que traía" (sin duplicar, sin mover nada más). */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();
 if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.tutVisto={rep:true,admin:true};var out={};var D=S.choferes.filter(c=>esCh(c)&&+c.id!==+S.chofHoy)[0],id=+D.id,ay=iso(new Date(TODAY.getTime()-864e5));var c0=S.cli.filter(c=>!c.oculto)[0];
 var antes=JSON.stringify([S.log,S.cierre,S.inv,S.recs,S.gch]);
 var o=chNuevo(id);o.rutaDia80=ay;o.salida.ok=true;o.invR=12;o.invM=20;o.cierre.salioR=15;o.cierre.salioM=30;o.cierre.odoIni=48000;o.cierre.odo=48090;o.cierre.tankIni='Lleno';o.cierre.tank='1/2';
 o.log=[{c:c0.id,R:3,M:10,pr:275,pm:20,total:1025,pago:825,abono:100,V:5,Vr:1,id:'x1'}];o.recs=[{tipo:'Gasolina',litros:20,total:480}];o.gch=[{tipo:'Comida',m:120,nota:'',}];o.cierre.sent=false;S.chSt=S.chSt||{};S.chSt[id]=o;
 var rr=conRuta6(o,()=>cierreRes());out.mismo=JSON.stringify([S.log,S.cierre,S.inv,S.recs,S.gch])===antes;
 libera86(id);var k=Object.keys(S.atras93)[0];var d=rutaDet6(S.atras93[k].pack);out.d=d;out.ef=rr.efectivo;
 S.tab.admin='rutas';render();var cd=document.querySelector('[data-x="atr93c"]');out.txt=cd?cd.innerText:'';
 /* ruta que nadie recibió */
 var ay2=iso(new Date(TODAY.getTime()-2*864e5));S.rutasHist.push({f:ay2,ch:id,log:[{c:c0.id,R:2,M:0,pr:275,total:550,pago:550,abono:0,V:2}],res:null,enviado:false});
 render();out.h=!!document.querySelector('[data-x="huerf6"]');out.htxt=(document.querySelector('[data-x="huerf6"]')||{}).innerText||'';
 document.querySelector('[data-act="huerf6"]').click();out.atras=Object.keys(S.atras93).length;out.h2=huerf6().length;
 var e2=S.atras93[id+'|'+ay2];out.ef2=e2&&e2.ef;
 /* no se duplica al tocar otra vez */
 out.dup=huerfRecibir6(id+'|'+ay2);
 /* ya recibida o con cierre mandado: no sale */
 S.rutasHist.push({f:ay2,ch:+S.choferes.filter(c=>esCh(c))[1].id,log:[{c:c0.id,R:1,total:275,pago:275}],enviado:true});out.h3=huerf6().length;
 return out});
ok(r.mismo,arch+' · ver el detalle no cambia nada de la ruta cargada',r.mismo);
ok(r.d.n===1&&r.d.total===1025&&r.d.cobrado===925&&r.d.gasolina===480&&r.d.gastos===120&&r.d.efectivo===r.ef,arch+' · dinero: vendido, cobrado, gastos y el efectivo a entregar = la cuenta del cierre',{d:r.d,ef:r.ef});
ok(r.d.salioR===15&&r.d.R===3&&r.d.camR===12&&r.d.V===4&&r.d.Vr===1,arch+' · taras: salió 15, vendió 3, 12 en camión, 4 vacías + 1 rota',r.d);
ok(r.d.salioM===30&&r.d.M===10&&r.d.camM===20,arch+' · kilos: salió 30, vendió 10, regresan 20',r.d);
ok(r.d.km===90&&r.d.tank==='1/2'&&!!r.d.veh,arch+' · vehículo: cuál, 90 km, tanque',r.d);
ok(/Todo lo de esta ruta/.test(r.txt)&&/Efectivo que debe entregar/.test(r.txt)&&/Gasolina/.test(r.txt)&&/Vehículo/.test(r.txt),arch+' · en Rutas, el cierre atrasado enseña todo',r.txt.slice(0,300));
ok(r.h&&/nadie la recibió/.test(r.htxt)&&/Cobró \$550/.test(r.htxt),arch+' · una ruta que nadie recibió sale en Rutas con lo que cobró',r.htxt.slice(0,200));
ok(r.atras===2&&r.h2===0&&r.ef2===550,arch+' · "Recibir lo que traía" la pasa a cierre atrasado ($550) y deja de salir como perdida',r);
ok(r.dup===false,arch+' · no se duplica',r.dup);
ok(r.h3===0,arch+' · una ruta con cierre mandado no sale como perdida',r.h3);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
