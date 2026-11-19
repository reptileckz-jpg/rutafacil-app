/* 170 · Bento Glossy 3D en toda la app: solo apariencia. Mismo texto y botones con y sin el tema; las tarjetas de alerta/nota/bien
   conservan su color; no cambian espacios (padding) de tarjetas ni botones; la entrada escalonada solo al llegar a una pantalla
   (no al redibujar) y no en Inicio/Ruta/Entrega/Más (tienen la suya); las ventanas animan solo al abrirse; animaciones de 170
   solo con transform/opacity; en oscuro las tarjetas del Cuadre ya no quedan blancas. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const os of [false,true]){const p=await (await b.newContext({viewport:{width:390,height:844},colorScheme:os?'dark':'light'})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;const M=os?'oscuro: ':'claro: ';
 await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)}});
 ok(await ev(()=>document.documentElement.classList.contains('app170')&&!!document.getElementById('css170')),M+'el tema está puesto');
 /* mismo contenido con y sin el tema, y mismos espacios */
 r=await ev(()=>{var out=[];var vistas=[['admin','clientes'],['admin','bodega'],['admin','cargas'],['admin','gastos'],['admin','personal'],['admin','cuadre121'],['rep','cierre'],['rep','nota'],['rep','viaje']];
  var foto=function(){var m=document.querySelector('main');return {acts:[...m.querySelectorAll('[data-act]')].map(x=>x.dataset.act).join(','),txt:m.innerText.replace(/\s+/g,' ').trim(),
   pad:[...m.querySelectorAll('.card,.btn')].map(x=>getComputedStyle(x).padding).join('|')}};
  vistas.forEach(function(v){S.role=v[0];S.pinOk[pinKey()]=true;if(v[0]==='rep')S.salida.ok=true;S.tab[v[0]]=v[1];try{render()}catch(e){}var a=foto();
   document.documentElement.classList.remove('app170');var b=foto();document.documentElement.classList.add('app170');
   if(a.acts!==b.acts||a.txt!==b.txt||a.pad!==b.pad)out.push(v[1]+(a.acts!==b.acts?' botones':'')+(a.txt!==b.txt?' texto':'')+(a.pad!==b.pad?' espacios':''))});return out});
 ok(!r.length,M+'9 pantallas: mismos botones, texto y espacios con y sin el tema',r);
 /* colores con significado */
 r=await ev(()=>{S.role='admin';S.tab.admin='clientes';render();var m=document.querySelector('main');var out=[];
  ['alert','note','good'].forEach(function(k){var d=document.createElement('div');d.className='card '+k;d.textContent='x';m.appendChild(d);var c1=getComputedStyle(d).backgroundColor+getComputedStyle(d).borderTopColor;
   document.documentElement.classList.remove('app170');var c2=getComputedStyle(d).backgroundColor+getComputedStyle(d).borderTopColor;document.documentElement.classList.add('app170');
   if(c1!==c2)out.push(k);if(getComputedStyle(d).borderTopLeftRadius!=='24px')out.push(k+' radio');d.remove()});return out});
 ok(!r.length,M+'alerta, nota y bien conservan su color y toman la forma nueva',r);
 /* entrada solo al llegar */
 r=await ev(()=>{S.role='admin';S.tab.admin='gastos';render();S.tab.admin='clientes';render();var a=document.querySelector('main').classList.contains('in170');render();var b=document.querySelector('main').classList.contains('in170');
  S.tab.admin='bodega';render();var c=document.querySelector('main').classList.contains('in170');
  S.tab.admin='inicio';render();var d=document.querySelector('main').classList.contains('in170');
  S.tab.admin='mas';render();var e=document.querySelector('main').classList.contains('in170');
  S.role='rep';S.tab.rep='ruta';render();var f=document.querySelector('main').classList.contains('in170');
  return [a,b,c,d,e,f]});
 ok(JSON.stringify(r)==='[true,false,true,false,false,false]',M+'entrada al llegar sí, al redibujar no, en Inicio/Más/Ruta no',r);
 /* ventanas: solo al abrirse */
 r=await ev(async()=>{S.role='admin';S.tab.admin='inicio';S.sheet=false;render();await new Promise(r=>setTimeout(r,50));S.sheet=true;render();await new Promise(r=>setTimeout(r,20));
  var a=!!document.querySelector('.sheet.ab170');render();await new Promise(r=>setTimeout(r,20));var b=!!document.querySelector('.sheet.ab170');S.sheet=false;render();
  await new Promise(r=>setTimeout(r,20));S.sheet=true;render();await new Promise(r=>setTimeout(r,20));var c=!!document.querySelector('.sheet.ab170');S.sheet=false;render();return [a,b,c]});
 ok(JSON.stringify(r)==='[true,false,true]',M+'la ventana anima al abrirse, no al redibujarse, y otra vez al volver a abrirse',r);
 /* 170 anima solo con transform/opacity */
 r=await ev(()=>{var css=document.getElementById('css170').sheet,mal=[];[...css.cssRules].forEach(function(x){if(x.type===7){[...x.cssRules].forEach(function(k){[...k.style].forEach(function(pr){if(!/^(transform|opacity)$/.test(pr))mal.push(x.name+':'+pr)})})}
  else if(x.style){var t=x.style.transitionProperty;if(t&&!/^(transform|opacity)(, ?(transform|opacity))*$/.test(t))mal.push(x.selectorText+' → '+t)}});return mal});
 ok(!r.length,M+'las animaciones del tema son solo transform/opacity (tarjeta gráfica)',r);
 r=await ev(()=>{var c=getComputedStyle(document.querySelector('.btn')||document.body);return c.transitionProperty});
 ok(/^transform$/.test(r),M+'los botones solo animan transform',r);
 if(os){r=await ev(()=>{S.role='admin';S.tab.admin='cuadre121';render();return [...document.querySelectorAll('.k5card2,.k5grp,.k5sub')].map(x=>getComputedStyle(x).backgroundColor).filter(x=>/255, 255, 255/.test(x))});
  ok(!r.length,M+'Cuadre: ninguna tarjeta blanca en oscuro',r)}
 await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
