const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const ctx=await b.newContext({viewport:{width:390,height:844}});const errs=[];
const abrir=async(w)=>{const p=await ctx.newPage();if(w)await p.setViewportSize(w);p.on('pageerror',e=>errs.push(e.message));await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1300);return p};
let p=await abrir();
// configurar rápido: admin con PIN, un chofer sin PIN, un vehículo
await p.evaluate(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.bienv=true;S.setup.fin=true;S.pins['a:'+S.adminYo]='4862';var c=nuevoEmp({n:'Danu',puesto:'chofer',tel:'2281112233'});S.choferes.push(c);window.__ch=c.id;S.veh.push({id:77,n:'La blanca',pl:'ABC-123',comb:'Diésel',odo:1000,capL:80,hist:[],foto:null});S.pinOk={};S.pinOk['a:'+S.adminYo]=true;S.role='admin';S.tab.admin='inicio';render()});await p.waitForTimeout(1200);
// 2. ajustes no se cuela
let r=await p.evaluate(()=>({card:!!document.querySelector('[data-key="ajcred"]'),nav:!!document.querySelector('nav.tabs')}));ok(!r.card,'"Control de crédito" ya no sale fuera de Ajustes',r);
await p.evaluate(()=>{S.aj=true;render()});r=await p.evaluate(()=>!!document.querySelector('#ajov [data-key="ajcred"],#ajov [data-k="ajcredd"]'));ok(r,'sí sale dentro de Ajustes');await p.evaluate(()=>{S.aj=false;render()});
// 6. menú sin demo
await p.evaluate(()=>{S.menu=true;render()});await p.waitForTimeout(200);
r=await p.evaluate(()=>{var t=(document.querySelector('.drawer')||{}).innerText||'';return {demo:/demo|Prototipo|ejemplo/i.test(t),cambia:/Cambiar de usuario/.test(t),salir:/Cerrar sesión/.test(t),who:(t.match(/Entraste como: [^\n]*/)||[''])[0]}});ok(!r.demo&&r.cambia&&r.salir,'menú de versión real: sin demo, con Cambiar de usuario y Cerrar sesión',r);
await p.screenshot({path:'v50/f_menu.png'});
r=await p.evaluate(()=>{var f=document.querySelector('main .foot');return f?getComputedStyle(f).display:'no'});ok(r==='none'||r==='no','sin pie de "Prototipo"',r);
// cambiar de usuario → chofer crea su PIN
await p.evaluate(()=>document.querySelector('[data-act="usrcambia"]').click());await p.waitForTimeout(200);
await p.evaluate(()=>{var b=[...document.querySelectorAll('[data-act="usrpick"]')].find(x=>/Danu/.test(x.innerText));b.click()});await p.waitForTimeout(250);
r=await p.evaluate(()=>({role:S.role,ch:S.chofHoy,crea:/Crea tu PIN/.test((document.getElementById('pinov')||{}).innerText||'')}));ok(r.role==='rep'&&r.crea,'al cambiar a Danu (sin PIN) le pide crear su PIN',r);
await p.screenshot({path:'v50/f_crea.png'});
const tecla=async(s,act)=>{for(const d of s){await p.evaluate(([d,act])=>{document.querySelector('[data-act="'+act+'"][data-v="'+d+'"]').click()},[d,act]);await p.waitForTimeout(40)}};
await tecla('1234','pnd');await p.waitForTimeout(100);ok(/muy fácil/.test(await p.evaluate(()=>document.getElementById('pinov').innerText)),'no acepta 1234');
await tecla('2580','pnd');await tecla('2581','pnd');ok(/No fue el mismo PIN/.test(await p.evaluate(()=>document.getElementById('pinov').innerText)),'si no coincide, vuelve a pedirlo');
await tecla('2580','pnd');await tecla('2580','pnd');await p.waitForTimeout(150);
r=await p.evaluate(()=>({pin:S.pins['c:'+window.__ch],ok:S.pinOk['c:'+window.__ch],ov:!!document.getElementById('pinov')}));ok(r.pin==='2580'&&r.ok&&!r.ov,'PIN creado y entra',r);
// 3. cerrar desde multitarea → pide PIN al abrir
await p.waitForTimeout(1000);await p.close();p=await abrir();
r=await p.evaluate(()=>({ov:!!document.getElementById('pinov'),k:_pin.k,t:(document.getElementById('pinov')||{}).innerText}));ok(r.ov&&/Escribe tu PIN/.test(r.t),'al volver a abrir la app pide el PIN',{k:r.k});
// 5 intentos malos
for(let i=0;i<5;i++){await tecla('1111','pind');await p.waitForTimeout(60)}
r=await p.evaluate(()=>({bl:pinBloqueo(_pin.k),av:S.avPrecio.slice(-1)[0],t:document.getElementById('pinov').innerText}));ok(r.bl&&/escribió mal 5 veces/.test(r.av)&&/Espera/.test(r.t),'5 intentos malos: bloqueo de 1 min y aviso al admin',{bl:r.bl,av:r.av});
await tecla('2580','pind');ok(await p.evaluate(()=>!!document.getElementById('pinov')),'bloqueado, ni con el PIN correcto entra');
await p.evaluate(()=>{S.pinF[_pin.k].hasta=0});await tecla('2580','pind');await p.waitForTimeout(150);ok(await p.evaluate(()=>!document.getElementById('pinov')),'pasado el tiempo, entra');
// admin reinicia PIN del chofer
await p.evaluate(()=>{S.role='admin';S.pinOk['a:'+S.adminYo]=true;S.tab.admin='personal';S.openCh=window.__ch;S.chEdit=null;render()});await p.waitForTimeout(300);
await p.evaluate(()=>{var t=document.querySelector('#fiov [data-act="fitab"][data-v="dat"]');if(t)t.click()});await p.waitForTimeout(200);r=await p.evaluate(()=>!!document.querySelector('[data-act="pinreset"]'));ok(r,'el admin tiene "Reiniciar" en el PIN del chofer');
if(r){await p.evaluate(()=>document.querySelector('[data-act="pinreset"]').click());ok(await p.evaluate(()=>!S.pins['c:'+window.__ch]),'reiniciado: lo crea de nuevo al entrar')}
// vehículo
await p.evaluate(()=>{S.openCh=null;S.tab.admin='vehiculos';render();var b=document.createElement('button');b.dataset.act='vedit';b.dataset.id='77';document.body.appendChild(b);b.click();b.remove()});await p.waitForTimeout(300);
r=await p.evaluate(()=>['marca','modelo','anio','color','vin','motor','llanta','capC','capK'].filter(function(k){return !document.getElementById('vf_'+k)}));ok(r.length===0,'al editar el vehículo pide marca, modelo, año, color, serie, motor, llanta y capacidad',r);
if(!r.length){await p.fill('#vf_marca','Nissan');await p.fill('#vf_modelo','NP300');await p.fill('#vf_motor','2.5 L');await p.evaluate(()=>{S.vf.comb=S.vf.comb||'Diésel';document.querySelector('[data-act="vsave"]').click()});await p.waitForTimeout(300);r=await p.evaluate(()=>{var v=vehById(77);return [v.marca,v.modelo,v.motor]});ok(r.join()==='Nissan,NP300,2.5 L','se guardan',r)}
// 1. burbuja pegada bajo el encabezado al hacer scroll
await p.evaluate(()=>{S.vf=null;S.dfMin=false;S.tab.admin='inicio';render();window.scrollTo(0,300)});await p.waitForTimeout(300);
r=await p.evaluate(()=>{var b=document.querySelector('.dfbub'),h=document.querySelector('header');if(!b)return 'sin burbuja';return {b:Math.round(b.getBoundingClientRect().top),h:Math.round(h.getBoundingClientRect().bottom)}});ok(r.b>=r.h,'la burbuja nunca queda detrás del encabezado',r);
await p.screenshot({path:'v50/f_bub.png'});
// FAB y bodega en pantalla ancha
const q=await abrir({width:904,height:1100});await q.evaluate(()=>{S.pinOk={};S.pinOk['a:'+S.adminYo]=true;_pin={v:'',modo:null};S.role='admin';S.tab.admin='inicio';render()});await q.waitForTimeout(600);var fabR=await q.evaluate(()=>{var f=document.querySelector('.fab');return f?Math.round(innerWidth-f.getBoundingClientRect().right):null});await q.evaluate(()=>{S.tab.admin='bodega';render()});await q.waitForTimeout(400);
r=await q.evaluate(()=>{var f=document.querySelector('.fab'),c=document.querySelector('[data-x="exist65"]')||document.querySelector('.card.exist');return {fab:f?Math.round(innerWidth-f.getBoundingClientRect().right):null,exist:c?Math.round(c.getBoundingClientRect().width):null,w:innerWidth}});r.fab=fabR;ok(r.fab!==null&&r.fab<=30,'el "+" va pegado a la orilla en pantalla ancha',r);ok(r.exist>r.w*0.8,'Existencias usa todo el ancho',r);
await q.screenshot({path:'v50/f_bod.png'});
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
