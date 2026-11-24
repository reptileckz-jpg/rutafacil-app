/* 43 · arreglos de los reportes #1–#6 de Ricardo y las 3 notas del precio */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:412,height:900}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__pr24Test=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.cajaAyerSkip=true;S.precio.conf=iso(TODAY);try{localStorage.removeItem('pr24')}catch(e){}});
/* #1 arranque */
r=await ev(()=>{S.arr33={ini:iso(TODAY),fin:iso(new Date(TODAY.getTime()+13*864e5))};S.tab.admin='bodega';render();var m=document.querySelector('main'),a=m.querySelector('[data-x="arr33"]'),t=m.querySelector('.t65'),h=m.querySelector('h1'),ch=t&&t.querySelector('.bod65,button,[data-act]');var ra=a.getBoundingClientRect(),rh=h.getBoundingClientRect(),rc=ch?ch.getBoundingClientRect():rh;return {abajo:ra.top>=Math.max(rh.bottom,rc.bottom)-1,ancho:Math.round(ra.width),mw:Math.round(m.getBoundingClientRect().width)}});
ok(r.abajo&&r.ancho>=r.mw-40,'#1 la tarjeta del arranque va debajo del encabezado completo (no entre el título y su renglón)',r);
/* #1/#2 señalar encima del reporte */
r=await ev(async()=>{S.tab.admin='inicio';render();var c=document.createElement('canvas');c.width=200;c.height=300;c.getContext('2d').fillRect(0,0,50,50);S.rp56={donde:'x',txt:'',g:'',foto:c.toDataURL('image/jpeg')};render();var b=document.createElement('button');b.dataset.act='dib37';document.body.appendChild(b);b.click();b.remove();await new Promise(r=>setTimeout(r,300));var e=document.elementFromPoint(206,450);return {arriba:!!(e&&e.closest('#dib37ov'))}});
ok(r.arriba,'#1/#2 "Señalar" sale ENCIMA del reporte (antes quedaba detrás)',r);
await clic('dib37x');await ev(()=>{S.rp56=null;render()});
/* #4 sacudir dentro de una pantalla de pasos */
r=await ev(()=>{wzAbre('prest39',{ch:S.choferes.filter(c=>esCh(c))[0].id});S.sk37={t:1};render();var e=document.elementFromPoint(206,450);var o={wz:!!document.getElementById('wzov'),arriba:!!(e&&e.closest('#sk37ov'))};S.sk37=null;S.wz=null;render();return o});
ok(r.wz&&r.arriba,'#4 "¿Reportar un problema?" sale encima de una pantalla de pasos',r);
/* captura sin partes negras */
r=await ev(()=>a37Fondo());ok(!/rgba\(0, 0, 0, 0\)|transparent/.test(r),'la captura usa el fondo de la app (sin partes negras)',r);
/* #2/#5 Ir de Cargas */
r=await ev(()=>{var c=S.cargas.filter(x=>x.prov)[0];var x='Pagar a '+c.prov+' $1,000 · Ya cargó';S.openCarga=null;S.tab.admin='cargas';render();var b=document.createElement('button');b.dataset.act='avgo';b.dataset.k=encodeURIComponent(x);document.body.appendChild(b);b.click();b.remove();var f=fiCur();return {oc:S.openCarga,id:c.id,f:f&&f.t}});
ok(r.oc!=null&&r.f==='carga','#2/#5 "Ir ›" de "Pagar a …" estando en Cargas abre esa carga',r);
await ev(()=>{S.openCarga=null;render()});
/* #6 cancelar el viaje correcto, con dos botones */
r=await ev(()=>{var base=JSON.parse(JSON.stringify(S.cargas.filter(x=>x.prov)[0]));var A=Object.assign({},base,{id:9901,est:'Recibida',prov:'Roly',fecha:iso(new Date(TODAY.getTime()-7*864e5))});var B=Object.assign({},base,{id:9901,est:'Por llegar',prov:'Roly',fecha:A.fecha,viaje:null,pagos:[]});S.cargas.push(A,B);window.__B=B;
 var ok1=c173Cancelable(B);var b=document.createElement('button');b.dataset.act='c173can';b.dataset.id='9901';document.body.appendChild(b);b.click();b.remove();var m=S.modal&&{t:S.modal.t,b:S.modal.b.map(x=>x[0])};return {ok1,m}});
ok(r.ok1&&r.m&&/Cancelar el viaje a Roly/.test(r.m.t)&&r.m.b[0]==='Sí, cancelar el viaje','#6 con dos cargas con el mismo número, usa la que sí se puede cancelar y pregunta "Sí, cancelar el viaje"',r);
await clic('c43si');r=await ev(()=>({est:__B.est,modal:!!S.modal}));ok(r.est==='Cancelada'&&!r.modal,'"Sí, cancelar el viaje" la cancela',r);
/* #4 "Tu ruta: entregas…" */
r=await ev(()=>{S.avPrecio=(S.avPrecio||[]).concat(['Tu ruta: entregas $6,570 en efectivo. Tu comisión de hoy solo se anota.']);S.arOn=false;render();return S.avPrecio.filter(x=>/^Tu ruta/.test(x)).length});
ok(r===0,'#4 "Tu ruta: entregas…" ya no se queda en pendientes sin ruta tuya abierta',r);
/* #3 destello una vez */
r=await ev(()=>{var d=document.createElement('div');d.className='pnd86 pnd27';document.body.appendChild(d);var c=getComputedStyle(d);var o=[c.animationIterationCount,c.animationName];d.remove();return o});
ok(r[0]==='1','#3 el destello de "N pendientes en …" es una sola vez (antes 2: parecía que se abría otra vez)',r);
/* precio: pantalla grande en cualquier sección, "Después" 1 hora */
r=await ev(()=>{S.precio.conf='';S.tab.admin='clientes';render();var o=document.getElementById('pr24ov');return {ov:!!o,z:o&&getComputedStyle(o).zIndex}});
ok(r.ov&&+r.z>=120,'precio: la pantalla grande sale aunque la app abra en otra sección, encima de las demás ventanas',r);
await clic('pr24x');await p.waitForTimeout(50);
r=await ev(()=>{render();var a=!!document.getElementById('pr24ov');var n=Date.now;Date.now=()=>n()+61*60e3;render();var b2=!!document.getElementById('pr24ov');Date.now=n;return {a,b2}});
ok(!r.a&&r.b2,'"Después" la esconde 1 hora y luego vuelve a salir (hasta que se fije el precio)',r);
await clic('pr24x');
/* tarjeta que brilla */
r=await ev(()=>{S.tab.admin='inicio';render();var c=document.querySelector('main [data-x="precio65"]');var a=getComputedStyle(c,'::after'),cs=getComputedStyle(c);return {pr:c.classList.contains('pr24'),ring:a.animationName,sh:cs.boxShadow}});
ok(r.pr&&/pr(24|43)ring/.test(r.ring)&&/225, 29, 72/.test(r.sh),'la tarjeta "Precio de hoy" brilla en rojo con su aro que late',r);
/* web: sin barra horizontal */
const w=await ctx.newPage();await w.setViewportSize({width:1280,height:900});await w.addInitScript(()=>{window.__pnTest=1});await w.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await w.waitForTimeout(1100);
r=await w.evaluate(async()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.precio.conf='';S.tab.admin='inicio';render();var mx=0;for(var i=0;i<12;i++){await new Promise(r=>setTimeout(r,140));mx=Math.max(mx,document.documentElement.scrollWidth-innerWidth)}return mx});
ok(r<=0,'web: el aro que late ya no hace crecer la página (sin barra horizontal)',r);
r=await ev(async()=>{S.precio.conf='';S.tab.admin='inicio';render();var mx=0;for(var i=0;i<12;i++){await new Promise(r=>setTimeout(r,140));mx=Math.max(mx,document.documentElement.scrollWidth-innerWidth)}return mx});
ok(r<=0,'celular: tampoco hay barra horizontal',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
