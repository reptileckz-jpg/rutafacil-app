/* 113 · al cerrar la ruta: la pantalla ya no parpadea cada segundo y la foto del odómetro se guarda */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var id=S.choferes.filter(c=>c.n==='Chofer Uno')[0].id;S.pinOk[pinKey()]=true;S.pinOk['c:'+id]=true;S.role='rep';S.chofHoy=id;chCambiar(id);S.vehHoy=S.veh[0].id;S.tab.rep='ruta';render();var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;S.tab.rep='cierre';render()});
// un tutorial puesto y otro esperando: ya no redibuja sin fin
r=await ev(async()=>{S.tut={k:'rep',i:0,_ok:1};_tutPend59={k:'n:rt81rep',i:0};render();var n=0,r0=render;render=function(){n++;return r0.apply(this,arguments)};await new Promise(r=>setTimeout(r,4600));render=r0;S.tut=null;_tutPend59=null;render();return n});
ok(r===0,'113 · con un tutorial en pantalla y otro esperando, la pantalla ya no se redibuja cada 1.5 s',r);
// dibujar varias veces seguidas ya no reescribe la clase de la página completa
r=await ev(async()=>{render();var n=0,mo=new MutationObserver(function(L){L.forEach(function(m){if(m.target===document.documentElement)n++})});mo.observe(document.documentElement,{attributes:true});for(var i=0;i<5;i++)render();await new Promise(r=>setTimeout(r,100));mo.disconnect();return {n,cls:document.documentElement.className}});
ok(r.n===0&&/\breal\b/.test(r.cls),'113 · dibujar 5 veces seguidas ya no repinta toda la página (antes, en cada dibujo)',r);
r=await ev(()=>{var cl=document.documentElement.classList;cl.toggle('x113',true);var a=cl.contains('x113');cl.toggle('x113',false);var b2=cl.contains('x113');cl.add('y113');cl.remove('y113');return [a,b2,cl.contains('y113')]});
ok(r[0]===true&&r[1]===false&&r[2]===false,'113 · las clases se siguen poniendo y quitando bien',r);
// alerta de velocidad sin GPS: un solo dibujo, no cada segundo
r=await ev(async()=>{var D0=DEMO;DEMO=false;_velW=1;S.velAl={vel:131,lim:120,cur:null};_velSin=25;var n=0,r0=render;render=function(){n++;return r0.apply(this,arguments)};await new Promise(r=>setTimeout(r,3200));render=r0;S.velAl=null;DEMO=D0;render();return n});
ok(r<=1,'113 · alerta de velocidad sin GPS: ya no redibuja cada segundo',r);
// la foto del odómetro del cierre se guarda aunque la casilla se reemplace con la cámara abierta
r=await ev(async()=>{S.tab.rep='cierre';render();var old=[...document.querySelectorAll('input[type=file]')].filter(x=>/odo/.test(x.id))[0];if(!old)return {hay:false};var g=old.dataset.grp,k=old.dataset.foto;
 var cv=document.createElement('canvas');cv.width=64;cv.height=48;cv.getContext('2d').fillRect(0,0,64,48);cv.videoWidth=64;cv.videoHeight=48;var qs=document.querySelector.bind(document);
 CAM73.inp=old;var nu=old.cloneNode(true);old.parentNode.replaceChild(nu,old);document.querySelector=function(s){return s==='#cam73 video'?cv:qs(s)};try{cam73Tira()}finally{document.querySelector=qs}
 await new Promise(r=>setTimeout(r,900));return {hay:true,id:old.id,g,ok:!!(S.salida[g]&&S.salida[g][k])}});
ok(r.hay&&r.ok,'113 · al cerrar la ruta, la foto del odómetro se guarda',r);
// la foto que regresa de la CÁMARA DEL CELULAR (o galería) llega aunque la pantalla se haya redibujado
r=await ev(async()=>{S.tab.rep='cierre';S.salida.fotosFin={frente:null,atras:null,izq:null,der:null};render();var old=[...document.querySelectorAll('input[type=file]')].filter(x=>/odo/.test(x.id))[0];if(!old)return {hay:false};var g=old.dataset.grp,k=old.dataset.foto;
 old._cam73skip=1;old.click();old._cam73skip=0;var nu=old.cloneNode(true);old.parentNode.replaceChild(nu,old);
 var blob=await (await fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAP0lEQVR4nO3OMQ0AAAjAMPybhmMhOxRB0z0y12F5mDdfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwBn1mBAEzOD0XAAAAAElFTkSuQmCC')).blob();
 var dt=new DataTransfer();dt.items.add(new File([blob],'o.jpg',{type:'image/jpeg'}));old.files=dt.files;old.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,900));return {hay:true,ok:!!(S.salida[g]&&S.salida[g][k])}});
ok(r.hay&&r.ok,'113 · la foto que regresa de la cámara del celular se guarda aunque la pantalla se haya redibujado',r);
// la cámara de la app: una sola vez, lente principal, reintenta sola, permiso solo si falta
r=await ev(async()=>{window.__cam73Test=1;var md=navigator.mediaDevices,g0=md.getUserMedia,llam=[],falla=['NotReadableError'];
 md.getUserMedia=function(c){llam.push(JSON.stringify(c.video));var f=falla.shift();if(f){var e=new Error('x');e.name=f;return Promise.reject(e)}var cv=document.createElement('canvas');return Promise.resolve(cv.captureStream())};
 var inp=document.createElement('input');inp.type='file';inp.setAttribute('capture','environment');inp.accept='image/*';document.body.appendChild(inp);try{localStorage.setItem('cam78','lente-bn')}catch(e){}
 cam73Abre(inp);await new Promise(r=>setTimeout(r,1500));var m=(document.querySelector('#cam73 .msg')||{}).textContent,a={llam:llam.slice(),msg:m,stream:!!CAM73.stream,guardado:localStorage.getItem('cam78')};cam73Cierra();
 llam.length=0;falla=['NotAllowedError'];cam73Abre(inp);await new Promise(r=>setTimeout(r,800));a.perm=(document.querySelector('#cam73 .msg')||{}).textContent;a.llam2=llam.length;cam73Cierra();md.getUserMedia=g0;inp.remove();window.__cam73Test=0;return a});
ok(r.stream&&r.llam.length===2&&r.llam.every(x=>!/deviceId/.test(x))&&!/permiso/i.test(r.msg),'113 · la cámara se abre con el lente principal (sin cambiar a otro lente) y si tarda reintenta sola, sin decir "falta permiso"',r);
ok(r.guardado===null,'113 · ya no recuerda un lente escogido antes (el blanco y negro del Moto X)',r.guardado);
ok(/permiso de cámara/.test(r.perm||'')&&r.llam2===1,'113 · el aviso de permiso solo sale si de verdad falta el permiso',r);
r=await ev(()=>{var inp=document.createElement('input');inp.type='file';document.body.appendChild(inp);cam73Abre(inp);var v=document.querySelector('#cam73 video');var a={poster:v&&v.getAttribute('poster'),bg:v&&v.style.background};cam73Cierra();inp.remove();return a});
ok(/^data:image\/gif/.test(r.poster||'')&&/0, 0, 0|#000|black/.test(r.bg||''),'113 · al abrir la cámara ya no sale el ícono gris de "reproducir" (fondo negro)',r);
// si se cierra la cámara mientras todavía arranca, no se queda prendida en el fondo (bloqueaba las siguientes fotos)
r=await ev(async()=>{window.__cam73Test=1;var md=navigator.mediaDevices,g0=md.getUserMedia,res=null,parada=0;
 md.getUserMedia=function(){return new Promise(function(ok){res=ok})};
 var inp=document.createElement('input');inp.type='file';inp.setAttribute('capture','environment');document.body.appendChild(inp);
 cam73Abre(inp);await new Promise(r=>setTimeout(r,50));cam73Cierra();
 var cv=document.createElement('canvas'),st=cv.captureStream();st.getTracks().forEach(function(t){var s0=t.stop.bind(t);t.stop=function(){parada++;s0()}});res(st);await new Promise(r=>setTimeout(r,100));
 md.getUserMedia=g0;inp.remove();window.__cam73Test=0;return {parada,stream:!!CAM73.stream}});
ok(r.parada>0&&!r.stream,'113 · si se cierra la cámara mientras arranca, se apaga y no se queda ocupada',r);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
