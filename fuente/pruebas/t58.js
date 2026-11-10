const {chromium}=require('playwright');
/* l58: 37 bloqueo · 36 Ajustes por puesto · 4/9 colores de campos · 1/2 Google Maps en fichas · 24 regresar a Inicio · 18 huella una vez */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const errs=[];
const nueva=async(o)=>{const p=await b.newPage(Object.assign({viewport:{width:400,height:860}},o||{}));p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__pnTest=1;window.PN_GMAPS=true;window.__gm={made:0,destroyed:0,touch:{}};window.Capacitor={isNativePlatform:()=>true,Plugins:{}};
  window.GMAPA={create:o=>(window.__gm.made++,Promise.resolve({addMarkers:L=>Promise.resolve(L.map((x,i)=>String(i))),addPolylines:L=>Promise.resolve(['p']),removeMarkers:()=>Promise.resolve(),removePolylines:()=>Promise.resolve(),setCamera:()=>Promise.resolve(),enableCurrentLocation:()=>Promise.resolve(),updateMapBounds:()=>{},destroy:()=>{window.__gm.destroyed++;return Promise.resolve()}}))};
  window.GMAPA_PL={destroy:o=>{window.__gm.destroyed++;return Promise.resolve()},enableTouch:o=>{window.__gm.touch[o.id]=true;return Promise.resolve()},disableTouch:o=>{window.__gm.touch[o.id]=false;return Promise.resolve()}};
  window.L={map:function(){return {remove(){},invalidateSize(){},fitBounds(){},setView(){}}},layerGroup:()=>({addTo(){return this},clearLayers(){},addLayer(){}}),tileLayer:()=>({on(){},addTo(){}}),marker:()=>({bindTooltip(){return this}}),polyline:()=>({}),divIcon:()=>({})}});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);return p};
let p=await nueva();const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const pixel=async(pg,sel)=>{const r2=await pg.evaluate(s=>{const m=document.querySelector(s);if(!m)return null;const q=m.getBoundingClientRect();return {x:Math.round(q.left+q.width/2),y:Math.round(q.top+q.height/2)}},sel);if(!r2)return null;
 const buf=await pg.screenshot({omitBackground:true,clip:{x:r2.x,y:r2.y,width:1,height:1}});
 return pg.evaluate(async(b64)=>{const im=new Image();im.src='data:image/png;base64,'+b64;await im.decode();const c=document.createElement('canvas');c.width=1;c.height=1;const x=c.getContext('2d');x.drawImage(im,0,0);return [...x.getImageData(0,0,1,1).data]},buf.toString('base64'))};

/* ---- 1 · mapa de Google dentro de una ficha encima: se ve el hueco (no blanco) ---- */
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';render();
 const o=document.createElement('div');o.id='fake';o.style.cssText='position:fixed;inset:0;z-index:92;background:var(--bg);overflow:auto';o.innerHTML='<div class="card" style="margin-top:100px">'+mapaVivoHTML('zz',{pts:[{lat:19.58,lng:-96.94,t:'1',n:'x'}],line:[],marks:[]},240)+'</div>';document.getElementById('root').appendChild(o);gmRevisa()});
await W(900);let px=await pixel(p,'#fake .mapviv');ok(px&&px[3]===0,'1 · mapa de Google dentro de una ficha: se ve el mapa (no sale blanco)',px);
ok(await ev(()=>__gm.touch[GMI[0].id]===true),'2 · el mapa visible sí recibe toques');
/* otra ventana encima del mapa: el mapa deja de recibir toques (para que se pueda deslizar) */
await ev(()=>{const o=document.createElement('div');o.id='tapa';o.style.cssText='position:fixed;inset:0;z-index:99;background:#fff';document.body.appendChild(o);gmToques()});await W(100);
ok(await ev(()=>__gm.touch[GMI[0].id]===false),'2 · mapa tapado por otra ventana: no agarra los toques');
await ev(()=>{document.getElementById('tapa').remove();document.getElementById('fake').remove();gmRevisa()});await W(300);
ok(await ev(()=>GMI.length===0&&!document.querySelector('.gmoc')&&!document.documentElement.classList.contains('gmin')),'1 · al cerrar la ficha la app vuelve a la normalidad');
/* mapa que se pidió pero quedó perdido: se destruye solo */
await ev(()=>{GMTODOS['gm999']=Date.now()-60000;__gm.destroyed=0;gmBarre()});ok(await ev(()=>__gm.destroyed===1&&!GMTODOS.gm999),'2 · un mapa perdido se destruye solo');

/* ---- 37 · bloqueo hasta arriba ---- */
await ev(()=>{S.tab.admin='clientes';render();const o=document.createElement('div');o.id='wzov';o.style.cssText='position:fixed;inset:0;z-index:92;background:red';o.innerHTML='<button id="bx" data-act="nada">x</button>';document.body.appendChild(o);
 window.__clicx=0;document.getElementById('bx').addEventListener('click',()=>window.__clicx++);
 S.pinOk={};_pin={v:'',modo:'entrar',cb:null,k:pinKey(),bloq:5};render()});await W(200);
let r=await ev(()=>{const a=getComputedStyle(document.getElementById('pinov')).zIndex;const top=document.elementFromPoint(200,100);return {z:+a,top:top.closest('#pinov')?'pinov':top.id}});
ok(r.z>2000000000&&r.top==='pinov','37 · la pantalla del PIN queda encima de todo (también de las tarjetas paso a paso)',r);
await ev(()=>{document.getElementById('bx').click();document.getElementById('bx').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});
ok(await ev(()=>window.__clicx===0),'37 · bloqueada: ningún toque llega a lo de abajo');
/* mapa de Google en pantalla completa: se cierra al bloquear */
await ev(()=>{GM={m:{destroy(){__gm.destroyed++}}};document.documentElement.classList.add('gmon');render()});
ok(await ev(()=>!GM&&!document.documentElement.classList.contains('gmon')),'37 · al bloquear se cierra el mapa de Google');
/* al desbloquear (no había nada escrito): regresa a Inicio */
await ev(()=>{document.getElementById('wzov').remove();S.tab.admin='clientes';render()});
for(const d of '1234'){await ev(d=>{const x=document.createElement('button');x.dataset.act='pind';x.dataset.v=d;x.dataset.kp='1';x.style.display='none';document.body.appendChild(x);x.click();x.remove()},d)}
await W(300);r=await ev(()=>({t:S.tab.admin,pin:!!document.getElementById('pinov')}));ok(!r.pin&&r.t==='inicio','24 · al desbloquear regresa a Inicio',r);
/* con algo a medias: pregunta */
await ev(()=>{S.tab.admin='clientes';render();S.modal={t:'x',h:'<input id="mx" value="hola">',b:[]};render();S.pinOk={};_pin={v:'',modo:'entrar',cb:null,k:pinKey(),bloq:5};render()});
for(const d of '1234'){await ev(d=>{const x=document.createElement('button');x.dataset.act='pind';x.dataset.v=d;x.dataset.kp='1';x.style.display='none';document.body.appendChild(x);x.click();x.remove()},d)}
await W(300);ok(await ev(()=>!!document.getElementById('medov')),'24 · si tenía algo a medias: "Seguir donde iba / Ir a Inicio"');
await ev(()=>document.querySelector('[data-act="medcasa"]').click());await W(200);r=await ev(()=>({t:S.tab.admin,m:!!S.modal,o:!!document.getElementById('medov')}));ok(r.t==='inicio'&&!r.m&&!r.o,'24 · "Ir a Inicio" cierra lo abierto',r);

/* ---- 18 · al cargar lo guardado ya no vuelve a pedir la huella ---- */
await ev(()=>{window.__pnGracia=1;_pinAuth={};_pnCarga=Date.now();S.pinOk={};_pin={v:'',modo:'entrar',cb:null,k:pinKey()};render()});
for(const d of '1234'){await ev(d=>{const x=document.createElement('button');x.dataset.act='pind';x.dataset.v=d;x.dataset.kp='1';x.style.display='none';document.body.appendChild(x);x.click();x.remove()},d)}
await W(100);await ev(()=>{S.pinOk={};pinEntrar();render()});ok(await ev(()=>!document.getElementById('pinov')&&!!S.pinOk[pinKey()]),'18 · después de entrar, al terminar de cargar no la vuelve a pedir');
await ev(()=>{document.querySelector('body').insertAdjacentHTML('beforeend','<button id="sal" data-act="usrsalir">s</button>');window.__pnGracia=1});await ev(()=>{const x=document.getElementById('sal');x.click();x.remove()});
await ev(()=>{S.pinOk={};pinEntrar();render()});ok(await ev(()=>!!document.getElementById('pinov')),'18 · si sale de la app, sí la vuelve a pedir');
await ev(()=>{window.__pnGracia=0;S.pinOk[pinKey()]=true;_pin={v:'',modo:null};render()});

/* ---- 36 · Ajustes según el puesto ---- */
for(const rol of ['rep','cont','local','enc']){r=await ev(rol=>{if(rol==='enc'){S.role='admin';S.encOn=true;S.enc=S.enc||{ch:S.chofHoy,hasta:iso(TODAY),desde:iso(TODAY),p:{}}}else{S.role=rol;S.encOn=false}S.pinOk[pinKey()]=true;S.aj=true;render();const a=document.getElementById('ajov');
  return {logo:!!(a&&a.querySelector('.logocard')),txt:a?/Logo del negocio|Crédito y mayoreo|Aviso de poca fruta/.test(a.innerText):null}},rol);ok(r.logo===false&&r.txt===false,'36 · Ajustes de '+rol+': sin logo ni ajustes del negocio',r)}
await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.aj=true;render()});ok(await ev(()=>!!document.querySelector('#ajov .logocard')),'36 · el administrador sí ve el logo');
/* tema por celular */
await ev(()=>{const c0=S.cfg.tema;window.__c0=c0;document.querySelector('#ajov [data-act="tema"][data-v="dark"]').click()});
r=await ev(()=>({t:document.documentElement.getAttribute('data-theme'),cfg:S.cfg.tema===window.__c0,ls:localStorage.getItem('pTema')}));ok(r.t==='dark'&&r.cfg&&r.ls==='dark','tema oscuro solo en este celular (no cambia el de todos)',r);
await ev(()=>{localStorage.removeItem('pTema');S.aj=false;render()});

/* ---- 4 y 9 · celular en oscuro y app en claro: campos claros y legibles ---- */
const q=await nueva({colorScheme:'dark'});
await q.evaluate(()=>{localStorage.setItem('pTema','light');S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';render();
 document.getElementById('root').insertAdjacentHTML('beforeend','<input id="tin" value="12"><input id="tdt" type="date" value="2026-11-10">')});
r=await q.evaluate(()=>{const a=getComputedStyle(document.getElementById('tin')),d=getComputedStyle(document.getElementById('tdt'));return {bg:a.backgroundColor,c:a.color,cs:document.documentElement.style.colorScheme,dbg:d.backgroundColor}});
const lum=s=>{const m=s.match(/\d+/g).map(Number);return (m[0]*299+m[1]*587+m[2]*114)/1000};
ok(lum(r.bg)>180&&lum(r.c)<110&&r.cs==='light'&&lum(r.dbg)>180,'4/9 · celular oscuro + app clara: cuadritos de número y fecha claros con letra oscura',r);
await q.evaluate(()=>{localStorage.setItem('pTema','dark');render();if(!document.getElementById('tin'))document.getElementById('root').insertAdjacentHTML('beforeend','<input id="tin" value="12">')});r=await q.evaluate(()=>{const a=getComputedStyle(document.getElementById('tin'));return {bg:a.backgroundColor,c:a.color,cs:document.documentElement.style.colorScheme}});
ok(lum(r.bg)<120&&lum(r.c)>150&&r.cs==='dark','4/9 · app en oscuro: campos oscuros con letra clara',r);await q.close();

ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
