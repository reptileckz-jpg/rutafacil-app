// Pruebas v4.0 (2): primera vez, logo, maduración, fotos de vehículos, comas
const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();let n=0,f=0;const ok=(x,m)=>{x?n++:f++;console.log((x?'OK   ':'FAIL ')+m)};
const c=await b.newContext({...devices['iPhone 13']});let p=await c.newPage();let errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
ok(await p.evaluate(()=>!!document.getElementById('bienv')),'primera vez: sale la bienvenida animada');await p.screenshot({path:'v40/shots/b-bienv1.png'});
await p.waitForTimeout(1800);await p.screenshot({path:'v40/shots/b-bienv2.png'});
ok(/Tus cajas, entregas, cobros/.test(await p.evaluate(()=>document.getElementById('bienv').innerText)),'dice muy breve para qué es la app');
await p.waitForTimeout(2600);ok(await p.evaluate(()=>!!document.getElementById('bienv')),'no avanza sola: sigue mostrando el camión');
let an=await p.evaluate(()=>getComputedStyle(document.querySelector('#bienv .bv-go')).animationName);ok(/bvBrinca/.test(an),'el botón Comenzar es grande y brinca suave ('+an+')');
await p.waitForTimeout(4200);ok(await p.evaluate(()=>document.getElementById('bienv').classList.contains('tumba')),'si tardas, las cajas se caen y tiran los plátanos');await p.waitForTimeout(3500);await p.screenshot({path:'v40/shots/b-tumba.png'});console.log('VIDEO',await p.evaluate(()=>{var v=document.querySelector('#bienv .bv-vid');return JSON.stringify({src:!!v.src,err:v.error&&v.error.code,t:v.currentTime,rs:v.readyState,canMp4:v.canPlayType('video/mp4; codecs="avc1.42E01E"')})}));
await p.click('#bienv .bv-go',{force:true});await p.waitForTimeout(500);ok(await p.evaluate(()=>!document.getElementById('bienv')),'con Comenzar se pasa al asistente');
await p.evaluate(()=>render());await p.waitForTimeout(200);ok(await p.evaluate(()=>!document.getElementById('bienv')),'no vuelve a salir');
// logo
ok(await p.evaluate(()=>!!document.querySelector('#setov .logocard')),'paso 1: se puede poner logo');
await p.setInputFiles('[data-logo="logoApp"]','v40/logo-prueba.png');await p.waitForTimeout(500);
let r=await p.evaluate(()=>[!!S.cfg.logoApp,document.querySelector('header.top .logo img').getAttribute('src')===S.cfg.logoApp,logoTkSrc()===S.cfg.logoApp]);ok(r[0]&&r[1]&&r[2],'un solo logo: se usa arriba en la app y en el ticket '+JSON.stringify(r));
await p.screenshot({path:'v40/shots/b-logo.png'});
await p.click('[data-act="logotk"][data-v="0"]');ok(await p.evaluate(()=>logoTkSrc()===null&&notaBlock&&true),'se puede quitar el logo del ticket');
await p.click('[data-act="logotk"][data-v="1"]');
// bodega: maduración
await p.evaluate(()=>{S.setup.p=1;render()});await p.waitForTimeout(150);
ok(await p.evaluate(()=>document.querySelectorAll('[data-act="madcuando"]').length===4),'bodega: pregunta cuándo se sacan, para roatán y para macho');
await p.fill('[data-bind="setup.mad.R"]','20');await p.fill('[data-bind="setup.mad.RH"]','18');
await p.click('[data-act="madcuando"][data-k="M"][data-v="f"]');await p.waitForTimeout(100);
await p.fill('[data-bind="setup.mad.M"]','300');
const man=await p.evaluate(()=>{var d=new Date(Date.now()+864e5);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')});
await p.fill('[data-bind="setup.mad.MF"]',man);await p.fill('[data-bind="setup.mad.MT"]','10:00');await p.screenshot({path:'v40/shots/b-mad.png',fullPage:true});
// vehículos
await p.evaluate(()=>{S.setup.p=2;render()});await p.waitForTimeout(150);
r=await p.evaluate(()=>[...document.querySelectorAll('#setov .vfimgs button')].map(x=>x.getAttribute('aria-label')));ok(r[0]==='Nissan NP300 (foto)'&&r[1]==='Freightliner M2 (foto)'&&r.length===4,'vehículos: primero tus fotos de la NP300 y el M2, luego los dibujos '+JSON.stringify(r));
await p.screenshot({path:'v40/shots/b-veh.png',fullPage:true});
await p.fill('[data-bind="setup.vf.marca"]','Freightliner');await p.click('[data-act="suset"][data-k="img"][data-v="1"]');
ok(await p.evaluate(()=>S.setup.vf.plTipo==='carga'&&S.setup.vf.comb==='Diésel'),'al escoger el M2: placa de carga y diésel');
await p.click('[data-act="suadd"][data-k="veh"]');
await p.fill('[data-bind="setup.vf.marca"]','Nissan');await p.fill('[data-bind="setup.vf.modelo"]','NP300');await p.click('[data-act="suset"][data-k="comb"][data-v="Gasolina Magna"]');await p.setInputFiles('[data-sufoto]','v40/logo-prueba.png');await p.waitForTimeout(500);
ok(await p.evaluate(()=>!!S.setup.vf.fotoMia),'se puede tomar o subir una foto propia');await p.click('[data-act="suadd"][data-k="veh"]');
// terminar
r=await p.evaluate(()=>{S.setup.per=[{n:'Danu',puesto:'chofer',tel:''}];S.precio.R=260;S.precio.M=18;suAplicar();S.setup.fin=true;render();var L=S.lotes;return {lotes:L.map(l=>l.prod+':'+l.q+':'+l.h+'/'+l.est),veh:S.veh.map(v=>v.n+':'+(v.foto===FOTO_FL?'M2':(v.foto.slice(0,14)))+':'+v.plTipo)}});
const lr=r.lotes.find(x=>x.startsWith('R:')),lm=r.lotes.find(x=>x.startsWith('M:'));
ok(lr==='R:20:12/30','roatán: se sacan en 18 h → lote con 18 h restantes ('+lr+')');
ok(lm&&(()=>{var q=lm.split(':')[2].split('/');var rest=+q[1]-+q[0];return rest>=1&&rest<=40})(),'macho: día y hora de mañana → lote con las horas que faltan ('+lm+')');
ok(r.veh[0].indexOf(':M2:carga')>-1&&r.veh[1].indexOf('data:image/jpe')>-1,'vehículos guardados con su foto '+JSON.stringify(r.veh));
// ticket con logo propio
await p.evaluate(()=>{S.role='rep';S.salida.ok=true;S.inv.reparto=5;S.tab.rep='ruta';render()});
ok(errs.length===0,'sin errores '+errs.join('|'));await p.close();
// comas en el cierre de caja de ayer (sin modo prueba, como la app instalada)
p=await c.newPage();errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(500);
for(const d of '1234')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(300);
await p.click('#cjay');await p.keyboard.type('15290.5');await p.waitForTimeout(100);
r=await p.evaluate(()=>[document.getElementById('cjay').value,S.cajaAyerCnt]);ok(r[0]==='15,290.5'&&parseFloat(String(r[1]).replace(/,/g,''))===15290.5,'cierre de caja de ayer: la cantidad sale con comas mientras escribes '+JSON.stringify(r));
await p.screenshot({path:'v40/shots/b-comas.png'});
await p.click('[data-act="cajaayerok"]');await p.waitForTimeout(200);r=await p.evaluate(()=>{var x=S.cajaCierres.filter(c=>c.ayer)[0];return x&&(x.cnt||x.rec||x.c)});
ok(await p.evaluate(()=>{var x=S.cajaCierres.filter(c=>c.ayer)[0];return !!x&&JSON.stringify(x).indexOf('15290.5')>-1}),'se guarda el número correcto (15290.5) '+JSON.stringify(await p.evaluate(()=>S.cajaCierres.filter(c=>c.ayer)[0])));
ok(errs.length===0,'sin errores '+errs.join('|'));
console.log(n+' OK · '+f+' FAIL');await b.close()})();
