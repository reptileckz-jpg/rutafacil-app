/* 134 · foto opcional del tablero de gasolina: sale en el paso "Gasolina" al salir (inicio por pasos) y al cerrar; no es obligatoria;
   se guarda en fotos.gas / fotosFin.gas y sale al recibir el cierre, en el Cuadre y en "Fotos del vehículo" del administrador. */
const {chromium}=require('playwright');
const _lim=setTimeout(()=>{console.log('TIEMPO AGOTADO');process.exit(1)},120000);
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';S.inv.maduras=50;S.inv.kgMaduro=100;S.tutVisto={rep:true,admin:true};S.dia80=1;var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();render()});
for(let k=0;k<2;k++){await ev(()=>{var x=[].slice.call(document.querySelectorAll('main button')).filter(b=>/Iniciar ruta/.test(b.textContent))[0];if(x)x.click()});await W(250)}
/* al salir: el paso Gasolina */
console.log('· paso gasolina');r=await ev(()=>{salPon124(4);render();var m=document.querySelector('main');var vis=function(el){return !!(el&&el.getClientRects().length&&!el.closest('.wz-hide'))};var g=m.querySelector('#foto_fotosgas'),lab=m.querySelector('label[for="foto_fotosgas"]');
 var paso=(m.querySelector('.wz-hd')&&m.innerText.match(/Paso \d+ de \d+ · [^\n]+/)||[''])[0];return {paso:paso,hay:!!g,vis:vis(lab),txt:lab?lab.textContent:'',nopude:!!m.querySelector('[data-act="fotono"][data-k="gas"]')}});
ok(r.hay&&/Tablero de gasolina/.test(r.txt)&&!/opcional/.test(r.txt),'al salir: casilla "Tablero de gasolina" (139: obligatoria por defecto)',r);
ok(r.nopude,'obligatoria: trae "No pude tomarla" como las demás');
r=await ev(()=>{var v=[];for(var i=0;i<7;i++){salPon124(i);render();var lab=document.querySelector('main label[for="foto_fotosgas"]');if(lab&&lab.getClientRects().length&&!lab.closest('.wz-hide'))v.push(i)}return v});
ok(r.length===1,'sale en un solo paso del inicio (el de Gasolina)',r);
console.log('· tomar la foto');/* tomar la foto */
r=await ev(()=>{var cv=document.createElement('canvas');cv.width=320;cv.height=240;cv.getContext('2d').fillRect(0,0,320,240);return new Promise(function(res){cv.toBlob(function(bl){var f=new File([bl],'foto-1795000000001.jpg',{type:'image/jpeg'}),inp=document.querySelector('#foto_fotosgas');if(!inp){res(false);return}var dt=new DataTransfer();dt.items.add(f);inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}));setTimeout(function(){res(!!S.salida.fotos.gas)},600)},'image/jpeg')})});
ok(r,'la foto de la gasolina se guarda (fotos.gas)');
console.log('· cierre');/* al cerrar: el paso Gasolina del cierre */
r=await ev(()=>{S.salida.ok=true;S.log.push({c:S.cli[0].id,R:2,M:0,V:0,pr:275,pm:20,total:550,pago:550,abono:0});S.cierre.odoIni=1000;S.cierre.odo=1040;S.tab.rep='cierre';var v=[];for(var i=0;i<6;i++){S.cierreP=i;render();var lab=document.querySelector('main label[for="foto_fotosFingas"]');if(lab&&lab.getClientRects().length&&!lab.closest('.wz-hide'))v.push(i)}return v});
ok(r.length===1&&r[0]===1,'al cerrar: sale en el paso 2 (Gasolina)',r);
/* se ve al recibir el cierre, en el Cuadre y en Fotos del vehículo */
r=await ev(()=>{S.salida.fotosFin.gas=S.salida.fotos.gas.replace('data:image/jpeg','data:image/jpeg');['frente','atras','izq','der','odo'].forEach(function(k){S.salida.fotos[k]=S.salida.fotos[k]||S.salida.fotos.gas;S.salida.fotosFin[k]=S.salida.fotosFin[k]||S.salida.fotos.gas});
 S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='cierreadm';S.dOpen.fotoscierre=true;render();var d=document.querySelector('details[data-k="fotoscierre"]');var a=d?d.innerText:'';
 S.tab.admin='cuadre121';S.cu121p='dia';S.cu121d=iso(TODAY);S.dOpen['cu121c'+window.__D+'f1']=true;render();var c=document.querySelector('main').innerText;var i=c.indexOf('Fotos del cierre');return {adm:a.replace(/\s+/g,' '),cu:c.slice(i,i+300).replace(/\s+/g,' ')}});
ok((r.adm.match(/Gasolina/g)||[]).length===2,'Recibir el cierre: la foto de la gasolina al salir y al regresar',r.adm);
ok((r.cu.match(/Gasolina/g)||[]).length===2,'Cuadre: también',r.cu);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');clearTimeout(_lim);await Promise.race([b.close(),new Promise(r=>setTimeout(r,5000))]);process.exit(0)})();
