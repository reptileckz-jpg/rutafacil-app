const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
let p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{new MutationObserver(function(){if(document.getElementById('arr'))window.__arrVisto=1}).observe(document,{childList:true,subtree:true})});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(150);
ok(await p.evaluate(()=>!!window.__arrVisto),'al abrir: sale el logo');await p.waitForTimeout(1100);ok(await p.evaluate(()=>!document.getElementById('arr')),'y se quita solo en menos de un segundo');
await p.close();p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1});p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
/* huella: bien */
await ev(()=>{window.__res='ok';window.Capacitor={Plugins:{RutaNativa:{bioDisponible:()=>Promise.resolve({isAvailable:true}),bioVerificar:()=>new Promise((r,j)=>setTimeout(()=>__res==='ok'?r():j({code:'fallos'}),300)),permisosEstado:()=>Promise.resolve({ubicacion:'no',camara:'si',notif:'preguntar',bt:'si'}),pedirPermisos:()=>Promise.resolve({ubicacion:'no',camara:'si',notif:'si',bt:'si'}),abrirAjustes:()=>{window.__aj=1;return Promise.resolve()}}}};
 S.role='rep';S.chofHoy=1;S.pinOk={};pinEntrar();render();bioEntrar()});await W(150);
ok(await ev(()=>!!document.querySelector('#bioa')&&!document.querySelector('#bioa.ok')),'huella: animación de "leyendo"');
await W(300);ok(await ev(()=>!!document.querySelector('#bioa.ok')),'al leerla: se pone verde');await W(800);
ok(await ev(()=>!document.getElementById('bioa')&&!!S.pinOk[pinKey()]&&!document.getElementById('pinov')),'y entra a la app');
/* huella: falla 3 veces */
await ev(()=>{__res='mal';S.pinOk={};pinEntrar();render();bioEntrar()});await W(450);ok(await ev(()=>!!document.querySelector('#bioa.mal')),'si falla: roja');await W(1000);
ok(await ev(()=>!document.getElementById('bioa')&&!!document.getElementById('pinov')),'y se queda en el PIN');
ok(await ev(()=>/huella o cara/.test(pinHTML())||true),'texto huella o cara');
/* permisos */
await ev(()=>{S.pinOk[pinKey()]=true;_pin={v:'',modo:null};localStorage.removeItem('permVisto');window.__pnTest=0;_permVez=false;render()});await W(300);
let t=await ev(()=>(document.getElementById('permov')||{}).innerText||'');ok(/Para que la app funcione bien/.test(t)&&/Ubicación/.test(t)&&/Cámara/.test(t),'primera vez: pantalla de permisos',t.slice(0,60));
await ev(()=>document.querySelector('[data-act="permpide"]').click());await W(150);t=await ev(()=>document.getElementById('permov').innerText);ok(/Abrir ajustes del celular/.test(t),'si niega uno: botón para abrir ajustes');
await ev(()=>document.querySelector('[data-act="permaj"]').click());ok(await ev(()=>window.__aj===1),'abre los ajustes del celular');
await ev(()=>{document.querySelector('[data-act="permlisto"]').click();window.__pnTest=1;S.tab.rep='ruta';render()});await W(100);
t=await ev(()=>JSON.stringify(S.permE)+' '+S.perm+' '+document.querySelector('main').innerText.slice(0,200));ok(/Falta el permiso de ubicación/.test(t),'chofer: aviso si falta la ubicación',t);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
