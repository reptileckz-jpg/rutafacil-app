/* 139 · (1) al abrir el cierre, las fotos del regreso que ya se usaron en un cierre anterior de hoy (o la de la salida) se quitan y hay que
   tomar nuevas, aunque la ruta se haya reabierto por cualquier camino (o con una versión anterior); (2) la foto del tablero de gasolina es
   obligatoria (al salir y al cerrar) salvo que en Ajustes se ponga opcional. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.salida.ok=true;S.rutaDia80=iso(TODAY);S.tutVisto={rep:true}});
/* como pasó con la versión anterior: el primer cierre quedó en el historial y la ruta se reabrió SIN vaciar las fotos del regreso */
r=await ev(()=>{var f=hoy120();['frente','atras','izq','der','odo','gas'].forEach(function(k,i){S.salida.fotos[k]='data:image/jpeg;base64,S'+i;S.salida.fotosFin[k]='data:image/jpeg;base64,F'+i});
 S.rutasHist=(S.rutasHist||[]).concat([{f:f,ch:window.__D,parcial120:1,h120:'12:00',log:[],fotos121:fotosRuta121(S)}]);
 S.log.push({c:S.cli[0].id,R:1,M:0,V:0,pr:275,pm:20,total:275,pago:275,abono:0});S.cierre.sent=false;S.cierre.odoIni=1000;S.cierre.odo=1050;S.tab.rep='cierre';S.cierreP=0;render();
 return {fin:S.salida.fotosFin,txt:document.querySelector('main').innerText}});
ok(['frente','atras','izq','der','odo','gas'].every(k=>!r.fin[k]),'al abrir el cierre se quitan las fotos del regreso que ya se habían usado',r.fin);
ok(/Toma fotos nuevas del vehículo/.test(r.txt),'y le dice que tome fotos nuevas');
/* una foto nueva sí se queda */
r=await ev(()=>{S.salida.fotosFin.frente='data:image/jpeg;base64,NUEVA';render();return S.salida.fotosFin.frente});ok(r==='data:image/jpeg;base64,NUEVA','una foto nueva sí se queda');
/* el paso de las fotos no avanza sin las 4 */
r=await ev(()=>{S.cierreP=2;render();var x=[].slice.call(document.querySelectorAll('[data-act="cipaso"]')).filter(function(b){return +b.dataset.v>S.cierreP})[0];if(x)x.click();return [S.cierreP,S.toast]});ok(r[0]===2&&/Faltan fotos/.test(r[1]),'sin las 4 fotos nuevas no avanza',r);
/* gasolina obligatoria al cerrar */
r=await ev(()=>{S.cierreP=1;S.cierre.tankOk=true;render();var x=[].slice.call(document.querySelectorAll('[data-act="cipaso"]')).filter(function(b){return +b.dataset.v>S.cierreP})[0];if(x)x.click();return [S.cierreP,S.toast]});ok(r[0]===1&&/tablero de gasolina/.test(r[1]),'cierre: sin la foto de la gasolina no avanza (obligatoria)',r);
r=await ev(()=>{S.salida.fotosFin.gas='data:image/jpeg;base64,GASNUEVA';S.cierreP=1;render();var x=[].slice.call(document.querySelectorAll('[data-act="cipaso"]')).filter(function(b){return +b.dataset.v>S.cierreP})[0];if(x)x.click();return S.cierreP});ok(r===2,'con la foto de la gasolina avanza',r);
/* opcional desde Ajustes */
r=await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.aj=true;render();var b=document.querySelector('[data-act="fotogas139"][data-v="opc"]');var hay=!!b;if(b)b.click();S.aj=false;var v=S.cfg.fotoGas;S.role='rep';S.salida.fotosFin.gas=null;S.cierreP=1;S.tab.rep='cierre';render();var x=[].slice.call(document.querySelectorAll('[data-act="cipaso"]')).filter(function(b){return +b.dataset.v>S.cierreP})[0];if(x)x.click();
 var lab=document.querySelector('label[for="foto_fotosFingas"]');return {hay:hay,v:v,paso:S.cierreP,lab:lab?lab.textContent:''}});
ok(r.hay&&r.v==='opc'&&r.paso===2&&/opcional/.test(r.lab),'Ajustes → "Opcional": ya no la pide y dice (opcional)',r);
/* al salir: el paso Gasolina la pide si es obligatoria */
r=await ev(()=>{S.cfg.fotoGas='';S.salida.ok=false;S.salida.tankOk=true;S.salida.fotos.gas=null;S.cierre.odoIni=1000;return salFalta124(4)});ok(/tablero de gasolina/.test(r||''),'al salir: el paso Gasolina pide la foto (obligatoria)',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
