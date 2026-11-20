/* 2 (nueva numeración) · las taras de una ruta guardada aparte ("📥 Cierre atrasado", S.atras93) siguen contando en "dónde están las cajas"
   hasta recibirla (antes: "Las taras no cuadran: faltan 12" aunque las cajas seguían en el camión). Sin contar dos veces. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=9});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(800);
const r=await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();
 if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camioneta Dos',pl:'BBB2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:2000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:10,ch:'0'},{n:'Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:8,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.tutVisto={rep:true,admin:true};var out={};
 var chs=S.choferes.filter(c=>esCh(c)&&+c.id!==+S.chofHoy);var D=chs[0];var id=+D.id,ay=iso(new Date(TODAY.getTime()-864e5));
 /* la ruta de ayer de ese chofer, en el celular del admin: salió con 12 cajas que siguen en el camión, recogió 5 vacías (1 rota), sin cierre */
 var c0=S.cli.filter(c=>!c.oculto)[0];S.chSt=S.chSt||{};var o=chNuevo(id);o.rutaDia80=ay;o.salida.ok=true;o.invR=12;o.cierre.salioR=15;o.log=[{c:c0.id,R:3,M:0,pr:275,total:825,pago:825,abono:0,V:5,Vr:1,id:'x1'}];o.cierre.sent=false;S.chSt[id]=o;
 /* las vacías que recogió salen de lo que debe el cliente, como en la entrega real */
 c0.vac=num(c0.vac)-5;
 /* que el punto de partida cuadre (lo que haya de antes no es de esta prueba) */
 S.cajasT0=S.cajasT0+(cajasDonde().tot-cajasEsperadas());out.antes=tarasDif86();
 /* se guarda aparte (liberar la ruta) */
 libera86(id);out.guardado=Object.keys(S.atras93||{}).filter(k=>!S.atras93[k].hecho).length;out.ruta=(S.chSt[id]||{}).rutaDia80===iso(TODAY);out.despues=tarasDif86();out.cam=cajasDonde().atras2;
 /* mientras se recibe (ya está cargada como la ruta del celular), no se cuenta dos veces */
 var k=Object.keys(S.atras93)[0];atrasAbre93(k);out.recibiendo=tarasDif86();out.recAtras=cajasDonde().atras2||0;out.recSin=(function(){var g=atrasCuenta2;atrasCuenta2=function(){return []};try{return tarasDif86()}finally{atrasCuenta2=g}})();atrasSale93(false);out.salio=tarasDif86();
 /* dos administradores: la misma llave no se cuenta doble */
 S.atras93[k+'']=S.atras93[k];out.dos=tarasDif86();
 /* ya recibido: no se cuenta (sus cajas ya están en la bodega por la recepción) */
 var e=S.atras93[k];e.hecho=1;out.hecho=cajasDonde().atras2||0;
 /* un cierre MANDADO y sin recibir (porContar): cuentan las que regresan y las vacías del cierre */
 var o2=chNuevo(id);o2.rutaDia80=ay;o2.cierre.sent=true;o2.cierre.porContar=true;o2.cierre.res={reg:4,V:6,efectivo:100};o2.invR=0;S.atras93['z|'+ay]={id:id,f:ay,env:true,pack:o2};out.enviado=cajasDonde().atras2;
 /* si la ruta sigue viva con la misma fecha, no se cuenta (ya la cuenta la ruta) */
 var o3=chNuevo(id);o3.rutaDia80=ay;S.chSt[id]=o3;out.viva=cajasDonde().atras2||0;
 return out});
ok(r.antes===0,arch+' · antes de guardarla aparte, las taras cuadran',r);
ok(r.guardado===1&&r.ruta,arch+' · la ruta se guarda aparte para recibirla y el chofer tiene su ruta de hoy',r);
ok(r.despues===0&&r.cam===16,arch+' · guardada aparte, sus 12 cajas en el camión y 4 vacías (5 − 1 rota) siguen contando: no sale descuadre',r);
ok(r.recAtras===0&&r.recibiendo===r.recSin&&r.salio===0,arch+' · mientras el admin la recibe no se cuenta dos veces (igual que sin este cambio), y al salir sin recibirla vuelve a cuadrar',r);
ok(r.dos===0,arch+' · con dos administradores (misma llave) no se cuenta doble',r);
ok(r.hecho===0,arch+' · ya recibida, deja de contarse aparte',r);
ok(r.enviado===10,arch+' · cierre mandado y sin recibir: cuentan las 4 que regresan y las 6 vacías',r);
ok(r.viva===0,arch+' · si la misma ruta sigue cargada, no se cuenta otra vez',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
