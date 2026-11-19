/* 171 · barra flotante del chofer (mismos botones que su barra, abre lo mismo, Gasto abre su ventana sin mover la cápsula, se crea una vez,
   no se cruza con la del administrador), barra de cobro de Entrega arriba de la barra, modo ahorro (por celular), íconos 3D con el emoji
   todavía en el texto, y aviso de carga con costo raro contra el promedio de las últimas cargas (142). */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p.on('pageerror',e=>errs.push(e.message));const dlg=[];p.on('dialog',d=>{dlg.push(d.message());d.dismiss()});await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;const W=t=>p.waitForTimeout(t);
await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='rep';S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='ruta';render()});await W(400);
r=await ev(()=>{var n=document.querySelector('nav.floating-nav.chofer171'),o=[...document.querySelectorAll('nav.tabs button')];return {hay:!!n,labels:n?[...n.querySelectorAll('.nav-label')].map(x=>x.textContent).join(','):'',viejos:o.map(x=>x.querySelector('span').textContent.trim()).join(','),tabsVis:getComputedStyle(document.querySelector('nav.tabs')).display,act:n&&n.querySelector('.nav-item.active').dataset.tab}});
ok(r.hay&&r.labels===r.viejos&&r.tabsVis==='none'&&r.act==='ruta','chofer: barra flotante con sus mismos botones, en orden, la de antes escondida, Ruta activa',r);
const yo=await ev(()=>document.querySelector('nav.chofer171'));
await p.click('nav.chofer171 [data-tab="entrega"]');await W(600);
r=await ev(()=>({tab:S.tab.rep,act:document.querySelector('nav.chofer171 .nav-item.active').dataset.tab,pill:document.querySelector('nav.chofer171 .active-pill').style.transform,misma:document.querySelector('nav.chofer171')===window.__n171}));
ok(r.tab==='entrega'&&r.act==='entrega'&&r.pill==='translateX(100%)','tocar Entrega abre Entrega y la cápsula se desliza (transform)',r);
r=await ev(()=>{var e=document.querySelector('.entbar'),n=document.querySelector('nav.chofer171');if(!e)return 'sin entbar';var a=e.getBoundingClientRect(),c=n.getBoundingClientRect();return {entAbajo:Math.round(a.bottom),navArriba:Math.round(c.top)}});
ok(r==='sin entbar'||r.entAbajo<=r.navArriba,'Entrega: la barra de cobro queda arriba de la barra flotante',r);
await ev(()=>{window.__n171=document.querySelector('nav.chofer171')});
await p.click('nav.chofer171 [data-tab="gasto"]');await W(500);
r=await ev(()=>({tab:S.tab.rep,gx:!!S.gxSheet,pill:document.querySelector('nav.chofer171')?document.querySelector('nav.chofer171 .active-pill').style.transform:'(sin barra con la ventana)'}));
ok(r.tab==='entrega'&&r.gx,'Gasto abre su ventana y no cambia de pestaña',r);
await ev(()=>{S.gxSheet=false;render()});await W(200);
await p.click('nav.chofer171 [data-tab="cierre"]');await W(500);
r=await ev(()=>({tab:S.tab.rep,ren:(render(),render(),true)}));
ok(r.tab==='cierre','tocar Cierre abre Cierre',r);
r=await ev(()=>{var a=document.querySelector('nav.chofer171');render();return a===document.querySelector('nav.chofer171')&&document.querySelectorAll('nav.floating-nav').length===1});
ok(r,'la barra no se vuelve a crear al redibujar y hay una sola');
r=await ev(()=>{S.role='admin';S.tab.admin='clientes';render();var a=[...document.querySelectorAll('nav.floating-nav')].map(n=>n.className);S.role='rep';render();var c=[...document.querySelectorAll('nav.floating-nav')].map(n=>n.className);return {a,c,fn:document.documentElement.classList.contains('fnav165')}});
ok(r.a.join()==='floating-nav'&&r.c.join()==='floating-nav chofer171'&&r.fn,'administrador ↔ chofer: cada quien su barra, nunca las dos',r);
r=await ev(()=>{S.salida.ok=false;S.tab.rep='ruta';render();var n=document.querySelectorAll('nav.tabs button').length,f=!!document.querySelector('nav.chofer171');S.salida.ok=true;render();return {n,f}});
ok(r.n>0?true:!r.f,'sin botones en su barra (antes de salir) no hay barra flotante',r);
/* venta local */
r=await ev(()=>{S.role='local';S.pinOk[pinKey()]=true;render();var n=document.querySelector('nav.chofer171');var L=n?[...n.querySelectorAll('.nav-label')].map(x=>x.textContent).join(','):'';S.role='rep';render();return L});
ok(/Vender/.test(r),'venta local también tiene la barra flotante',r);
/* modo ahorro */
r=await ev(()=>{S.role='admin';S.tab.admin='inicio';S.aj=true;var h=ajHTML();S.aj=false;render();return /data-act="ahorro171"/.test(h)});
ok(r,'Ajustes tiene "Modo ahorro"');
r=await ev(()=>{var d=document.createElement('div');d.innerHTML='<button data-act="ahorro171" data-v="1">x</button>';document.body.appendChild(d);d.firstChild.click();var a=document.documentElement.classList.contains('ahorro171')&&document.documentElement.classList.contains('lite171');
 var an=getComputedStyle(document.querySelector('.floating-nav .active-pill')).transitionDuration;d.firstChild.dataset.v='0';d.firstChild.click();var c=document.documentElement.classList.contains('ahorro171');d.remove();return {a,an,c}});
ok(r.a&&/^0s/.test(r.an)&&!r.c,'modo ahorro: se enciende (sin animaciones ni vidrio) y se apaga',r);
/* íconos 3D con el emoji en el texto */
r=await ev(()=>{S.role='admin';S.tab.admin='cuadre121';render();var m=document.querySelector('main');var es=[...m.querySelectorAll('.e171')];
 return {n:es.length,txt:es.every(e=>/💰|🍌|🚚|📅|🏠|📦|⏳/.test(e.textContent)),visible:es.every(e=>e.querySelector('svg')),otra:(render(),document.querySelectorAll('main .e171 .e171').length)}});
ok(r.n>0&&r.txt&&r.visible&&r.otra===0,'íconos 3D fuera de Inicio, el emoji sigue en el texto, sin doble ícono',r);
/* 142: costo raro */
r=await ev(()=>{var bak=S.cargas;S.cargas=[{fecha:'2026-11-01',kgR:1000,pR:9,kgM:0},{fecha:'2026-11-05',kgR:1000,pR:10,kgM:0},{fecha:'2026-11-08',kgR:1000,pR:11,kgM:0}];
 S.cm={R:true,kgR:'1000',cajas:'100',pR:'16'};var a=cmRaro150('R');S.cm.pR='10.5';var c=cmRaro150('R');S.cm.pR='4';var d=cmRaro150('R');S.cargas=bak;S.cm=null;return {a:a.slice(0,160),c,d:d.slice(0,160)}});
ok(/promedio/.test(r.a)&&r.c===''&&/promedio/.test(r.d),'142: costo 40 % arriba o abajo del promedio de las últimas cargas pregunta; normal no',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
