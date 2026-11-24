/* 42 · tarjetas de aviso nuevas (Bento 3D; oscura si no cuadra; "Urgente" una sola vez; sin fondo rosa ni franja gruesa) */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';render();
 var R=[...document.querySelectorAll('main [data-x="hoy92"] .av')],x=R[0],cs=x&&getComputedStyle(x);
 return {n:R.length,a42:R.filter(e=>e.classList.contains('a42row')).length,ic:!!(x&&x.querySelector('.a42i')),tit:x&&(x.querySelector('.a42t')||{}).textContent,bg:cs&&cs.backgroundColor,bl:cs&&cs.borderLeftWidth,
  bts:x&&[...x.querySelectorAll('.a42a button')].map(b=>[b.textContent,b.getBoundingClientRect().height]),urg:R.map(e=>(e.innerText.match(/urgente/gi)||[]).length)}});
ok(r.n>0&&r.a42===r.n&&r.ic&&r.tit,'"Hoy": todos los renglones con el diseño nuevo (ícono 3D y título)',r);
ok(r.bg==='rgb(255, 255, 255)'&&r.bl==='1px','tarjeta blanca con borde fino (sin fondo rosa ni franja gruesa)',{bg:r.bg,bl:r.bl});
ok(r.bts&&r.bts.length>=1&&r.bts.every(b=>b[1]>=44),'"Posponer" y "Lo atiendo yo" son botones grandes (44 px o más)',r.bts);
ok(r.urg.every(n=>n<=1),'"Urgente" no se repite en ningún renglón',r.urg);
/* no cuadra: oscura, con números en pastillas */
r=await ev(()=>{var m=document.querySelector('main');var d=document.createElement('div');d.innerHTML=avRow('URGENTE: no cuadra · Ninguna caja se pierde sin registrarse (hay 770 y deberían ser 1070)',true);var x=d.firstElementChild;x.setAttribute('data-c68','r');m.prepend(x);a42Deco(document.getElementById('root'));
 var cs=getComputedStyle(x);return {k:x.classList.contains('a42k'),bg:cs.backgroundColor,tit:x.querySelector('.a42t').textContent,desc:(x.querySelector('.a42d')||{}).textContent,met:[...x.querySelectorAll('.a42m>span')].map(s=>s.textContent),vis:x.innerText,full:x.textContent}});
ok(r.k&&r.bg==='rgb(24, 24, 27)','"no cuadra": tarjeta oscura',r.bg);
ok(r.tit==='No cuadra'&&r.desc==='Ninguna caja se pierde sin registrarse'&&!/URGENTE/.test(r.vis),'título "No cuadra" + explicación, sin "URGENTE:" repetido',r);
ok(JSON.stringify(r.met)===JSON.stringify(['Hay: 770','Deben ser: 1,070','−300']),'los números en pastillas: Hay 770 · Deben ser 1,070 · −300',r.met);
ok(/hay 770 y deberían ser 1070/.test(r.full),'el texto original sigue (escondido) para que la app reconozca el aviso',r.full.slice(-120));
/* tarjetas de aviso de toda la app */
r=await ev(()=>{var m=document.querySelector('main');var d=document.createElement('div');d.className='card alert';d.innerHTML='<b>⚠️ Danu todavía debe $1,200</b><div class="lbl">Puedes prestarle.</div>';m.appendChild(d);
 var f=document.createElement('div');f.className='card';f.setAttribute('style','border-left:5px solid #b45309;padding:12px');f.textContent='Cliente lejos de su ruta';m.appendChild(f);a42Deco(document.getElementById('root'));
 var cs=getComputedStyle(d),fs=getComputedStyle(f);return {c:d.classList.contains('a42c'),bg:cs.backgroundColor,ic:(d.querySelector('.a42i')||{}).textContent,b:d.querySelector('b').textContent,fl:fs.borderLeftWidth,dot:f.classList.contains('a42f')}});
ok(r.c&&r.bg==='rgb(255, 255, 255)'&&/⚠/.test(r.ic)&&r.b==='Danu todavía debe $1,200','"card alert": blanca, el emoji pasa al cuadro del ícono',r);
ok(r.fl==='1px'&&r.dot,'tarjeta con franja gruesa: borde fino y puntito de color',r);
/* centro de pendientes */
r=await ev(()=>{var G=c30Grupos(),k=Object.keys(G)[0];S.c30={sec:k,i:0};render();var c=document.querySelector('#c30ov .a42c');return {c:!!c,ic:!!(c&&c.querySelector('.a42i')),g:c&&(c.querySelector('.a42g')||{}).textContent,t:c&&c.innerText}});
ok(r.c&&r.ic&&/Urgente|Pendiente|No cuadra/.test(r.g)&&!/🔴 URGENTE|🟡 PENDIENTE/.test(r.t),'Centro de pendientes: el mismo diseño (ícono 3D, etiqueta una vez)',r);
/* con "Modo ahorro" el ícono no se mueve */
r=await ev(()=>{S.c30=null;document.documentElement.classList.add('ahorro171');render();var i=document.querySelector('main .a42-r .a42i');return i?getComputedStyle(i).animationName:'none'});
ok(r==='none','con "Modo ahorro", el ícono no se mueve',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
