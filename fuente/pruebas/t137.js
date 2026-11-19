/* 137/138 · fotos del vehículo: una sola marca de agua (arriba); la del regreso no puede ser la misma que la de la salida; al empezar otra
   vuelta las del regreso pasan a ser "al salir" y se piden nuevas; al reabrir el cierre se piden nuevas. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='rep';S.salida.ok=true;S.pinOk[pinKey()]=true;S.tutVisto={rep:true,admin:true};
 window.__file=function(nombre,color){var cv=document.createElement('canvas');cv.width=640;cv.height=480;var x=cv.getContext('2d');x.fillStyle=color||'#fff';x.fillRect(0,0,640,480);return new Promise(function(res){cv.toBlob(function(bl){res(new File([bl],nombre,{type:'image/jpeg'}))},'image/jpeg',0.9)})};
 window.__toma=function(nombre,g,k,color){return __file(nombre,color).then(function(f){var inp=document.createElement('input');inp.type='file';inp.dataset.foto=k;inp.dataset.grp=g;var dt=new DataTransfer();dt.items.add(f);inp.files=dt.files;var antes=S.salida[g][k];fotoTomada(inp);
  return new Promise(function(res){var n=0,t=setInterval(function(){n++;if(S.salida[g][k]!==antes||n>40){clearInterval(t);res(S.salida[g][k]!==antes)}},50)})})};
 /* qué tan oscura es una franja de la foto (la marca es negra) */
 window.__osc=function(u){return new Promise(function(res){var im=new Image();im.onload=function(){var cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;var x=cv.getContext('2d');x.drawImage(im,0,0);var f=function(y){var d=x.getImageData(0,y,im.width,1).data,s=0;for(var i=0;i<d.length;i+=4)s+=d[i]+d[i+1]+d[i+2];return Math.round(s/(d.length/4)/3)};res({arriba:f(3),medio:f(Math.round(im.height/2)),abajo:f(im.height-3)})};im.src=u})}});
/* 138: foto de la cámara del celular (sin marca): se le pone UNA, arriba */
r=await ev(()=>__toma('IMG_2024.jpg','fotos','frente').then(function(){return __osc(S.salida.fotos.frente)}));
ok(r.arriba<120&&r.abajo>200&&r.medio>200,'foto del celular: una sola marca, arriba (abajo ya no)',r);
/* foto de la cámara de la app (ya trae su marca arriba): no se le pone otra */
r=await ev(()=>__toma('foto-1795000000000.jpg','fotos','atras').then(function(){return __osc(S.salida.fotos.atras)}));
ok(r.arriba>200&&r.abajo>200,'foto de la cámara de la app: no se le pone otra marca (ya trae la suya arriba)',r);
/* 137: la del regreso no puede ser la misma de la salida */
r=await ev(()=>{S.salida.fotosFin={frente:null,atras:null,izq:null,der:null};return __toma('foto-1795000000000.jpg','fotosFin','atras').then(function(cambio){return {cambio:cambio,fin:S.salida.fotosFin.atras,toast:S.toast}})});
ok(!r.cambio&&!r.fin&&/misma foto de la salida/.test(r.toast),'la misma foto de la salida no se acepta al regresar',r.toast);
r=await ev(()=>__toma('foto-1795000099999.jpg','fotosFin','atras','#ddd').then(function(c){return c}));ok(r,'una foto nueva sí se acepta');
/* otra vuelta: las del regreso pasan a "al salir" y se piden nuevas */
r=await ev(()=>{['frente','atras','izq','der','odo'].forEach(function(k,i){S.salida.fotos[k]='data:image/jpeg;base64,SAL'+i;S.salida.fotosFin[k]='data:image/jpeg;base64,FIN'+i});
 S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.cierreReg={rec:100,f:null};S.tab.rep='cierre';render();var b=document.createElement('button');b.dataset.act='seguir';document.body.appendChild(b);b.click();b.remove();
 return new Promise(function(res){setTimeout(function(){res({sent:S.cierre.sent,fotos:S.salida.fotos,fin:S.salida.fotosFin,hist:(S.rutasHist||[]).slice(-1)[0]})},100)})});
ok(r.sent===false&&r.fotos.frente==='data:image/jpeg;base64,FIN0'&&r.fotos.odo==='data:image/jpeg;base64,FIN4','otra vuelta: "al salir" son las fotos con que regresó',r.fotos);
ok(Object.keys(r.fin).every(k=>!r.fin[k]),'otra vuelta: las del regreso se vacían (hay que tomar nuevas)',r.fin);
ok(r.hist&&r.hist.fotos121&&r.hist.fotos121.fin&&r.hist.fotos121.fin.frente==='data:image/jpeg;base64,FIN0'&&r.hist.fotos121.ini.frente==='data:image/jpeg;base64,SAL0','las fotos del cierre anterior quedan guardadas en su historial',r.hist&&r.hist.fotos121);
r=await ev(()=>{var d=document.createElement('div');d.innerHTML=fotoTile('atras','Atrás','fotosFin')+fotoTile('atras','Atrás','fotos');return d.innerText.replace(/\s+/g,' ')});
ok(/Tomar: Atrás.*Retomar: Atrás/.test(r),'en el siguiente cierre la foto del regreso está vacía ("Tomar") y la de salida ya está ("Retomar")',r);
/* reabrir el cierre (sin recibir): las del regreso se vacían */
r=await ev(()=>{['frente','atras','izq','der'].forEach(function(k,i){S.salida.fotosFin[k]='data:image/jpeg;base64,R'+i});var f0=JSON.stringify(S.salida.fotos);S.log.push({c:S.cli[0].id,R:1,M:0,V:0,pr:275,pm:20,total:275,pago:275,abono:0});S.cierre.res=cierreRes();S.cierre.sent=true;S.cierreReg=null;
 var b=document.createElement('button');b.dataset.act='seguir';document.body.appendChild(b);b.click();b.remove();return new Promise(function(res){setTimeout(function(){res({sent:S.cierre.sent,fin:S.salida.fotosFin,igual:JSON.stringify(S.salida.fotos)===f0})},100)})});
ok(r.sent===false&&Object.keys(r.fin).every(k=>!r.fin[k])&&r.igual,'reabrir el cierre: las del regreso se vacían y las de la salida se quedan',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
