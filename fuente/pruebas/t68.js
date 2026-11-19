/* 7.5 · inventario (49), avisos (50), Finanzas sin brinco (51), PIN oscuro (52), mapa chico (59), aviso urgente (61), menú/barra/numerito (62) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const ctx=await b.newContext({viewport:{width:400,height:860},hasTouch:true});const p=await ctx.newPage();await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tutVisto={admin:true};S.cajaAyerSkip=true;S.tab.admin='inicio';render()});
/* 49 */
let r=await ev(()=>{var w=document.querySelector('.inv68');if(!w)return null;var R=w.querySelector('.pc.r'),M=w.querySelector('.pc.m');return {ban:/Toca para ver la bodega/.test(w.innerText),r:!!R,m:!!M,rbg:getComputedStyle(R.querySelector('.hd')).backgroundColor,mbg:getComputedStyle(M.querySelector('.hd')).backgroundColor,pct:/%/.test(w.innerText),alta:/Alta disponibilidad/.test(w.innerText),taras:/taras vacías/.test(R.innerText),tarM:/taras/.test(M.innerText),alc:[...w.querySelectorAll('.alc')].map(a=>a.className),bar:w.querySelectorAll('.bar').length,tiles:w.querySelectorAll('.mi').length}});
ok(r&&r.ban&&r.r&&r.m,'49: renglón "Inventario de bodega" + dos tarjetas',r);
ok(r&&r.rbg==='rgb(14, 116, 144)'&&r.mbg==='rgb(21, 128, 61)','49: encabezados de color sólido (azul petróleo y verde)',r&&[r.rbg,r.mbg]);
ok(r&&!r.pct&&!r.alta&&r.taras&&!r.tarM&&r.bar===2&&r.tiles===8,'49: sin %, sin "Alta disponibilidad", taras solo en roatán, barra y 4 cuadritos');
r=await ev(()=>{var o=[];[[6,'v'],[3,'a'],[1,'r'],[100,'v']].forEach(function(x){o.push(alc68(x[0],'roatán').indexOf('alc '+x[1])>-1)});return o});ok(r.every(Boolean),'49: aviso de días con color (verde 5+, amarillo 2–4, rojo <2)',r);
r=await ev(()=>{S.tab.admin='inicio';render();var c=document.querySelector('[data-x="invM"]');c.click();var t=S.tab.admin;S.tab.admin='inicio';render();return t});ok(r==='bodega','49: tocar una tarjeta lleva a Bodega',r);
/* 50 */
r=await ev(()=>{var A=[...document.querySelectorAll('.av[data-c68]')];return {n:A.length,ic:A.every(a=>a.querySelector('.ic68 svg')),pos:A.every(a=>a.querySelector('.pos68')),col:A.map(a=>a.style.getPropertyValue('--c68')).slice(0,6)}});
ok(r.n>0&&r.ic&&r.pos,'50: avisos en tarjeta con ícono y "Posponer" abajo',r);
r=await ev(()=>[avInfo68('60 cajas de roatán maduro ya se pasaron de tiempo: revisar o rematar').col,avInfo68('215 kg de macho maduro ya se pasaron de tiempo: revisar o rematar').col,avInfo68('DEF bajo en Freightliner M2 2015 (Ricardo): 1 cuadrito').col,avInfo68('Registraste una báscula nueva: Molo. Ponle cuánto cobra').col,avInfo68('Nissan NP300 2023: afinación mayor en 30 días').col]);
ok(r[0]==='r'&&r[1]==='r'&&r[2]==='v'&&r[3]==='g'&&r[4]==='n','50: color según urgencia (fruta pasada roja en las dos, vehículo azul, dato verde, falta mucho gris)',r);
r=await ev(()=>parseFloat(getComputedStyle(document.querySelector('main')).paddingBottom));ok(r>=150,'50: espacio abajo para que el + no tape',r);
/* 61 */
r=await ev(()=>{S.popVisto={};S.popI=0;render();var o=document.querySelector('.pop68');if(!o)return null;var t=o.innerText;S.popVisto={admin:iso(TODAY)};render();return {t,x:/×/.test(t),chk:/✓/.test(t)}});
ok(r&&!r.x&&/Después/.test(r.t)&&/1 de/.test(r.t),'61: ventana nueva sin ×, con "N de M" y "Después"',r);
r=await ev(()=>{var x='URGENTE: no cuadra · Las taras no cuadran (La app cuenta 10 taras y deberían ser 12: faltan 2)';var I=avInfo68(x);return [I.tit,I.det,I.col,I.ic]});ok(r[0]==='Las taras no cuadran'&&/faltan 2/.test(r[1])&&r[2]==='r'&&r[3]==='cuadre','61: título claro + detalle + ícono según el aviso',r);
/* 51 */
r=await ev(()=>getComputedStyle(document.documentElement).overflowAnchor);ok(r==='none','51: la pantalla no brinca al mostrar Finanzas',r);
/* 52 */
r=await ev(()=>{S.cfg.tema='dark';S.pinOk={};pinEntrar();render();var o=document.getElementById('pinov'),bg=getComputedStyle(o).backgroundImage,k=getComputedStyle(o.querySelector('.kp button')).backgroundColor;S.cfg.tema='light';S.pinOk[pinKey()]=true;_pin={v:'',modo:null};render();return {bg,k}});
ok(/rgb\(11, 42, 30\)|rgb\(15, 23, 42\)/.test(r.bg)&&r.k==='rgb(30, 41, 59)','52: PIN en modo oscuro (fondo y teclas oscuras)',r);
/* 59 */
r=await ev(()=>{var d=document.createElement('div');d.className='leaflet-container';d.setAttribute('data-swipe','mapa');document.querySelector('main').appendChild(d);render();var x=document.querySelector('main .leaflet-container');return x?[x.getAttribute('data-swipe'),x.getAttribute('data-noswipe')]:['quitado','']});
ok(r[0]===null||r[0]==='quitado','59: el mapa ya no tiene el gesto de "posponer" (no se corre el cuadro)',r);
/* 62 */
r=await ev(()=>{S.menu=true;render();var c=document.querySelector('.drawer [data-act="sugopen"]').className;S.menu=false;render();return c});ok(/sec/.test(r),'62a: "Sugerencias" ya no se ve seleccionado',r);
r=await ev(()=>{S.tab.admin='sugerencias';render();navHid=true;document.documentElement.classList.add('navhid');S.pinOk={};pinEntrar();render();S.tab.admin='inicio';S.pinOk[pinKey()]=true;_pin={v:'',modo:null};render();return document.documentElement.classList.contains('navhid')});ok(r===false,'62b: al desbloquear la barra de abajo vuelve a salir');
const tap=async s=>{const q=await ev(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]},s);if(q){await p.touchscreen.tap(q[0],q[1]);await W(500)}};
/* 165: la barra flotante se toca directo (en este simulador la página sale a 980 px y el dedo no atina a lo que va pegado a la pantalla) */
const tapB=async t=>{await ev(t=>document.querySelector('nav.floating-nav [data-tab="'+t+'"]').click(),t);await W(500)};
await ev(()=>{scrollTo(0,0)});await tapB('bodega');r=await ev(()=>S.tab.admin);ok(r==='bodega','62c: 1er toque va a la sección',r);
await tapB('bodega');await W(900);r=await ev(()=>({foco:!!document.querySelector('.avfoco'),lt:!!S.lt53}));ok(r.foco||r.lt,'62c: 2º toque marca el pendiente exacto (o abre el lote)',r);
await ev(()=>{S.lt53=null;render()});
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
