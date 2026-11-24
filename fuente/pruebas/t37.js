/* 37 · reportar sacudiendo: confirmar, captura automática, dibujar, WhatsApp al número de Ajustes, aviso al desarrollador; pantalla de desarrollador */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);
await p.addScriptTag({path:require('path').join(__dirname,'../../node_modules/html2canvas-pro/dist/html2canvas-pro.min.js')});
const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.cajaAyerSkip=true;S.tab.admin='inicio';render()});
/* sacudir */
r=await ev(()=>{var f=(x)=>window.dispatchEvent(Object.assign(new Event('devicemotion'),{accelerationIncludingGravity:{x:x,y:0,z:9.8}}));f(30);f(-30);f(30);var tres=!!S.sk37;f(-30);return {tres,sk:!!S.sk37,ov:!!document.getElementById('sk37ov'),t:(document.getElementById('sk37ov')||{}).innerText||''}});
ok(!r.tres&&r.sk&&r.ov&&/Reportar un problema/.test(r.t),'al sacudir 4 veces (3 ya no basta) pregunta "¿Reportar un problema?"',r);
await clic('sk37no');r=await ev(()=>({sk:S.sk37,ov:!!document.getElementById('sk37ov'),rp:!!S.rp56}));
ok(!r.sk&&!r.ov&&!r.rp,'"No" cierra sin abrir el reporte',r);
r=await ev(()=>{S.sk37=null;var f=(x)=>window.dispatchEvent(Object.assign(new Event('devicemotion'),{accelerationIncludingGravity:{x:x,y:0,z:9.8}}));f(15);f(-15);f(15);f(-15);return !!S.sk37});
ok(!r,'un movimiento normal (aunque sea fuerte, como al caminar o en el carro) no pregunta nada',r);
/* abrir: captura automática */
await ev(()=>{R37.ult=0;S.sk37={t:1};render()});await clic('sk37si');await p.waitForTimeout(2500);
r=await ev(()=>({rp:!!S.rp56,foto:S.rp56&&String(S.rp56.foto||'').slice(0,15),auto:S.rp56&&S.rp56.auto37,t:(document.getElementById('rp56ov')||{}).innerText||''}));
ok(r.rp&&/^data:image/.test(r.foto)&&r.auto,'"Sí, reportar": abre el reporte con la captura ya tomada',r);
ok(/Señalar dónde está el problema/.test(r.t)&&/Grabar un audio/.test(r.t),'el reporte tiene "Señalar" (dibujar) y "Grabar un audio"',r.t.slice(0,300));
/* dibujar */
await clic('dib37');await p.waitForTimeout(400);
r=await ev(()=>{var cv=document.getElementById('dib37c');return {ov:!!document.getElementById('dib37ov'),w:cv&&cv.width}});
ok(r.ov&&r.w>0,'"Señalar": se abre la captura para rayar con el dedo',r);
const bx=await p.locator('#dib37c').boundingBox();await p.mouse.move(bx.x+20,bx.y+20);await p.mouse.down();await p.mouse.move(bx.x+120,bx.y+90,{steps:5});await p.mouse.up();
r=await ev(()=>{var f0=S.rp56.foto;var b=document.createElement('button');b.dataset.act='dib37ok';document.body.appendChild(b);b.click();b.remove();return {cambio:S.rp56.foto!==f0,ov:!!document.getElementById('dib37ov'),tr:1}});
ok(r.cambio&&!r.ov,'"Listo": la captura queda con lo que se rayó',r);
/* mandar: se guarda, aviso al desarrollador y WhatsApp */
r=await ev(async()=>{S.cfg=S.cfg||{};S.cfg.wa37='2281234567';var pushes=[];window.push37=function(a,b){pushes.push([a,b])};var n0=(S.probs||[]).length;S.rp56.txt='No me deja guardar la entrega';S.rp56.g=S.rp56.g||'media';
 var b=document.createElement('button');b.dataset.act='rp56ok';document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,200));
 return {n:(S.probs||[]).length-n0,ult:(S.probs||[]).slice(-1)[0],wa:!!S.wa37x,ov:(document.getElementById('wa37ov')||{}).innerText||'',pushes}});
ok(r.n===1&&/No me deja guardar/.test(r.ult.txt),'"Mandar": queda guardado en "Problemas reportados"',{n:r.n});
ok(r.wa&&/Mandar la captura/.test(r.ov),'después sale "Mandar la captura" por WhatsApp (número de Ajustes)',r.ov);
ok(r.pushes.length===1&&/Reporte/.test(r.pushes[0][0]),'se avisa al celular del desarrollador',r.pushes);
await clic('wa37x');
/* Ajustes */
r=await ev(()=>{S.tab.admin='mas';S.aj='ajustes';render();var h=ajHTML();return {wa:/WhatsApp para los reportes/.test(h),dev:/Pantalla de desarrollador/.test(h)}});
ok(r.wa&&r.dev,'en Ajustes: "WhatsApp para los reportes" y (sin nube, el admin) "Pantalla de desarrollador"',r);
/* pantalla de desarrollador */
await ev(()=>{apErr('no cuadra','Taras: no cuadra con Juan Pérez','prueba');(S.cli||[])[0]&&(S.cli[0].n='Doña Prueba Rara')});
await clic('dev37ab');await p.waitForTimeout(200);
r=await ev(()=>({tab:S.tab.admin,t:(document.querySelector('main')||{}).innerText||'',img:!!document.querySelector('main img[alt="Captura del reporte"]')}));
ok(r.tab==='dev37'&&/Desarrollador/.test(r.t)&&/No me deja guardar/.test(r.t)&&r.img,'la pantalla de desarrollador muestra los reportes con su captura',r.t.slice(0,200));
await clic('dev37v',{v:'aut'});r=await ev(()=>(document.querySelector('main')||{}).innerText||'');
ok(/Errores automáticos/.test(r),'pestaña de errores automáticos',r.slice(0,200));
r=await ev(()=>{S.probs.push({id:'zz',n:99,f:iso(TODAY),txt:'Falla con Doña Prueba Rara',donde:'x',g:'media'});return dev37Paquete()});
ok(!/Doña Prueba Rara/.test(r)&&/cliente #/.test(r),'"Mandar todo a Claude": sin nombres de clientes',r.slice(-200));
await clic('dev37v',{v:'rep'});
r=await ev(()=>{var p=S.probs.filter(x=>!x.auto&&!x.res)[0];var b=document.createElement('button');b.dataset.act='pr56res';b.dataset.id=p.id;document.body.appendChild(b);b.click();b.remove();return {res:!!S.probs.find(x=>x.id===p.id).res}});
ok(r.res,'"✓ Arreglado" marca el reporte',r);
await clic('dev37v',{v:'cel'});r=await ev(()=>(document.querySelector('main')||{}).innerText||'');
ok(/celular/i.test(r),'pestaña de celulares',r.slice(0,200));
/* compartir o guardar: una imagen por reporte */
r=await ev(async()=>{S.probs.filter(x=>!x.auto).forEach(x=>x.res=null);S.probs.push({id:'f2',n:7,f:iso(TODAY),txt:'Otro reporte con captura',donde:'x',g:'media',foto:S.probs.find(x=>x.foto&&String(x.foto).slice(0,5)==='data:').foto});
 S.dev37={v:'rep'};S.tab.admin='dev37';render();var top=(document.querySelector('main [data-act="dev37guarda"]:not([data-id])')||{}).textContent;var por=document.querySelectorAll('main [data-act="dev37comp"][data-id]').length;
 var llam=[],guard=[];window.natCompartir=function(img,nom,o){llam.push({img:img.slice(0,23),nom,o});return Promise.resolve(true)};window.natGuardar=function(b64,nom,mime){guard.push([nom,mime,b64.length]);return Promise.resolve('Descargas')};
 var b=document.createElement('button');b.dataset.act='dev37comp';b.dataset.id='f2';document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,800));
 b=document.createElement('button');b.dataset.act='dev37guarda';document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,2500));
 var img=await dev37Hoja([S.probs.find(x=>x.id==='f2')],0,1);var im=new Image();await new Promise(r=>{im.onload=r;im.src=img});return {top,por,man:dev37ConCaptura().filter(x=>!x.auto).length,n:dev37ConCaptura().length,llam,guard,w:im.width,h:im.height}});
ok(/Guardar todas en el celular \(\d+\)/.test(r.top)&&r.por===r.man,'arriba "💾 Guardar todas en el celular (N)" y cada reporte con su "📤 Compartir" y "💾 Guardar"',r);
ok(r.llam.length===1&&r.llam[0].nom==='reporte-7.jpg'&&r.llam[0].o.wa===false,'"Compartir" de un reporte manda SOLO ese (una imagen), por el menú Compartir',r.llam);
ok(r.guard.length===r.n&&r.guard.every(g=>g[1]==='image/jpeg'),'"Guardar todas" deja una imagen por reporte en Descargas ('+r.guard.length+')',r.guard);
ok(r.w===800&&r.h>400&&r.h<2200,'la imagen de un reporte es de tamaño normal (texto + su captura), no una tira larga',{w:r.w,h:r.h});
/* en camino no pregunta (chofer moviéndose) */
r=await ev(async()=>{S.role='rep';R37.ult=0;S.sk37=null;S.rp56=null;navigator.geolocation.getCurrentPosition=function(ok){ok({coords:{speed:12}})};var f=(x)=>window.dispatchEvent(Object.assign(new Event('devicemotion'),{accelerationIncludingGravity:{x:x,y:0,z:9.8}}));f(30);f(-30);f(30);f(-30);await new Promise(r=>setTimeout(r,100));return !!S.sk37});
ok(!r,'si el chofer va manejando, sacudir no pregunta nada',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
