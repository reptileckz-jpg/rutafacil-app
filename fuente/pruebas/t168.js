/* 168 · Ruta y Entrega del chofer en Bento Glossy 3D: solo estilo (mismos botones, mismo texto y números que sin el tema), la clase se pone
   en Ruta y Entrega del chofer y en ningún otro lado, la entrada no se repite al redibujar, y en oscuro "Te quedan en el camión" se lee. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const os of [false,true]){const p=await (await b.newContext({viewport:{width:390,height:844},colorScheme:os?'dark':'light'})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
 await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.inv.reparto=42;S.inv.repartoKg=85});
 for(const t of ['ruta','entrega']){
  r=await ev(t=>{var foto=function(){var m=document.querySelector('main');return {acts:[...m.querySelectorAll('[data-act]')].map(x=>x.dataset.act).join(','),txt:m.innerText.replace(/\s+/g,' ').trim()}};
   S.tab.rep=t;var _f=ruta168;ruta168=function(){};render();var a=foto();ruta168=_f;S.tab.rep='cierre';render();S.tab.rep=t;render();var m=document.querySelector('main'),c=foto();
   return {a:a,c:c,clase:m.className,html:document.documentElement.classList.contains('rep168'),entrada:m.classList.contains('ruta168in')}},t);
  if(!os){ok(/ruta168/.test(r.clase)&&r.html&&r.entrada,t+': al llegar se pone el estilo 168 (con su entrada)',r.clase);
   ok(r.a.acts===r.c.acts&&r.a.txt===r.c.txt,t+': mismos botones, texto y números que sin el tema')}}
 r=await ev(()=>{render();return document.querySelector('main').classList.contains('ruta168in')});if(!os)ok(r===false,'al volver a dibujar sin cambiar de pantalla, sin animación de entrada');
 if(os){r=await ev(()=>{S.tab.rep='ruta';render();var e=[...document.querySelectorAll('main .card.rep1 *')].filter(x=>!x.closest('svg')&&x.children.length===0&&(x.textContent||'').trim())[0];var c=getComputedStyle(e).color.match(/\d+/g).map(Number);return c});
  ok(r[0]>180&&r[1]>180&&r[2]>180,'modo oscuro: "Te quedan en el camión" con letra clara (se lee)',r)}
 if(!os){r=await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';render();var a=[document.querySelector('main').classList.contains('ruta168'),document.documentElement.classList.contains('rep168')];S.role='rep';S.pinOk[pinKey()]=true;S.tab.rep='cierre';render();a.push(document.querySelector('main').classList.contains('ruta168'));return a});
  ok(r[0]===false&&r[1]===false&&r[2]===false,'no se aplica en el administrador ni en otras pantallas del chofer (Cierre)',r)}
 await p.close()}
/* animaciones en la tarjeta gráfica: la cápsula del chofer se desliza con transform y todas las transiciones de los temas son solo transform */
{const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);
 await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='ruta';render()});await p.waitForTimeout(300);
 /* 171: el chofer ya usa la barra flotante (la de antes queda escondida): se prueba su cápsula */
 await ev(()=>document.querySelector('nav.chofer171 [data-tab="viaje"]').click());await p.waitForTimeout(80);const mid=await ev(()=>new DOMMatrix(getComputedStyle(document.querySelector('nav.chofer171 .active-pill')).transform).m41);await p.waitForTimeout(700);
 let r=await ev(()=>{var g=document.querySelector('nav.chofer171 .active-pill'),a=document.querySelector('nav.chofer171 .nav-item.active'),rg=g.getBoundingClientRect(),ra=a.getBoundingClientRect();return {tp:getComputedStyle(g).transitionProperty,dc:Math.abs((rg.left+rg.width/2)-(ra.left+ra.width/2)),tf:g.style.transform}});
 ok(mid>10&&r.tp==='transform'&&r.dc<2&&r.tf==='translateX(300%)','barra del chofer: la cápsula se DESLIZA con translateX (a medio camino a los 80 ms) y termina bajo el botón',{mid:mid,r:r});
 r=await ev(()=>{var mal=[];[...document.styleSheets].forEach(sh=>{if(!/css16[78]|css166/.test((sh.ownerNode&&sh.ownerNode.id)||''))return;[...sh.cssRules].flatMap(x=>x.cssRules?[...x.cssRules]:[x]).forEach(x=>{var t=x.style&&x.style.transitionProperty;if(t&&!/^(transform|none|opacity)(, ?(transform|opacity))*$/.test(t))mal.push(x.selectorText+' → '+t)})});return mal});
 ok(r.every(x=>/^\.mas166 /.test(x.split(' → ')[0])&&!/bento-card|search|chevron/.test(x))||!r.length,'Inicio, Ruta y Entrega: sus transiciones son solo transform (tarjeta gráfica)',r.slice(0,5));
 await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
