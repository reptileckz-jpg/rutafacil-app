// Pruebas de la v4.0: lo que encontró Ricardo
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();fs.mkdirSync('v40/shots',{recursive:true});
let nOK=0,nF=0;const ok=(c,m)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m)};
const abrir=async(test,url)=>{const p=await b.newPage({viewport:{width:400,height:880}});if(test)await p.addInitScript(()=>{window.__pnTest=1});p._errs=[];p.on('pageerror',e=>{p._errs.push(e.message);console.log('STACK',(e.stack||'').split('\n').slice(0,3).join(' | '))});await p.goto('file://'+(url||'/mnt/user-data/outputs/prototipo-platanos.html'));await p.waitForTimeout(400);return p};
let p=await abrir(true);const ev=(f,a)=>p.evaluate(f,a);const W=ms=>p.waitForTimeout(ms);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S);
 window.act=function(a,ds){var b=document.createElement('button');b.dataset.act=a;Object.keys(ds||{}).forEach(function(k){b.dataset[k]=ds[k]});b.style.display='none';document.body.appendChild(b);b.click();b.remove();if(S.confirm){var o=document.querySelector('[data-act="confok"]');if(o)o.click()}}});
const fresh=async(js)=>{await ev((js)=>{S=JSON.parse(window.__snap);eval(js);render();window.scrollTo(0,0)},js||'');await W(120)};

// 1. vehículos: lista y ficha
await fresh('S.role="admin";S.tab.admin="vehiculos"');await W(600);
let r=await ev(()=>{var c=document.querySelector('.vcard[data-id="1"]');var im=c.querySelector('img'),pl=c.querySelector('svg.plate');return [im.getBoundingClientRect().width,pl.getBoundingClientRect().width,c.classList.contains('vbg'),!!c.style.getPropertyValue('--vbg')]});
ok(r[0]>r[1]+20,'lista: la foto ('+Math.round(r[0])+' px) es más grande que la placa ('+Math.round(r[1])+' px)');ok(r[2]&&r[3],'lista: la foto va borrosa de fondo en la tarjeta');
await p.click('[data-act="vehopen"][data-id="1"]');await W(200);
r=await ev(()=>{var o=document.querySelector('#fiov');var im=o.querySelector('.fiimg'),pl=o.querySelector('svg.plate');var a=im.getBoundingClientRect(),c=pl.getBoundingClientRect();return [a.width,a.height,c.width,c.height]});
ok(r[1]>=200&&r[2]<=130&&r[0]*r[1]>4*r[2]*r[3],'ficha: foto grande arriba ('+Math.round(r[0])+'×'+Math.round(r[1])+') y placa chica ('+Math.round(r[2])+'×'+Math.round(r[3])+')');
// 5 pestañas a la vista
const vc=await ev(()=>{var v=S.veh.filter(function(x){return x.cred&&!x.baja})[0];return v?v.id:null});
await fresh('S.role="admin";S.tab.admin="vehiculos";S.vehOpen='+vc);
r=await ev(()=>[...document.querySelectorAll('#fiov .fitabs button')].map(b=>{var x=b.getBoundingClientRect();return [b.textContent,Math.round(x.left),Math.round(x.right)]}));
ok(r.length===5&&r.every(x=>x[1]>=0&&x[2]<=400),'vehículo con crédito: las 5 pestañas se ven completas '+JSON.stringify(r.map(x=>x[0]+':'+x[2])));
await p.screenshot({path:'v40/shots/t-5tabs.png'});
// cambiar de pestaña no regresa hasta arriba, en todas las fichas
const fichas=[['vehículo','S.tab.admin="vehiculos";S.vehOpen='+vc],['empleado','S.tab.admin="personal";S.openCh=3'],['cliente','S.tab.admin="clientes";S.openCli=S.cli[0].id'],['carga','S.tab.admin="cargas";S.openCarga=S.cargas[0].id'],['proveedor','S.tab.admin="cargas";S.fiLast="openProv";S.openProv=provNames()[0]']];
for(const [n,js] of fichas){await fresh('S.role="admin";'+js);
 r=await ev(()=>{var o=document.querySelector('#fiov');var T=[...o.querySelectorAll('[data-act="fitab"]')].map(x=>x.dataset.v);var res=[];
  T.forEach(function(v){var o=document.querySelector('#fiov');o.scrollTop=o.scrollHeight;var s0=o.scrollTop;o.querySelector('[data-act="fitab"][data-v="'+v+'"]').click();var o2=document.querySelector('#fiov'),tb=o2.querySelector('.fitabs'),hd=o2.querySelector('.fihd');var top=tb.getBoundingClientRect().top,st=parseFloat(getComputedStyle(tb).top);res.push({v:v,s0:s0,s1:o2.scrollTop,pegadas:Math.abs(top-st)<3||o2.scrollTop===s0})});return res});
 const malas=r.filter(x=>x.s0>150&&x.s1<20);
 ok(!malas.length&&r.length>1,'ficha de '+n+': al cambiar de pestaña no se regresa hasta arriba '+(malas.length?JSON.stringify(malas):''));
 ok(r.every(x=>x.s0<150||x.pegadas),'ficha de '+n+': las pestañas se quedan pegadas arriba');}
// llantas y frenos aproximados
await fresh('S.role="admin";S.tab.admin="vehiculos";S.vehOpen=1;S.fiTab["veh:1"]="tal"');
let t=await ev(()=>document.querySelector('#fiov').innerText);
ok(/Llantas\s*Faltan unos [\d,]+ km · como \d+ (meses|semanas|días)|Llantas\s*Faltan unos [\d,]+ km · como un/.test(t)&&/Frenos\s*Faltan unos/.test(t)&&!/km restantes/.test(t),'llantas y frenos: km aproximados y tiempo ('+(t.match(/Llantas[^\n]*\n?[^\n]*/)||[''])[0].replace(/\n/g,' ')+')');
ok(await ev(()=>kmAprox(12345,{kmMes:3000})==='Faltan unos 12,000 km · como 4 meses'&&kmAprox(430,{kmMes:3000})==='Faltan unos 400 km · como 4 días'&&kmAprox(0,{})==='Ya toca'&&kmAprox(-800,{})==='Ya toca (se pasó unos 800 km)'),'cálculo: 12,345 → unos 12,000 · 4 meses; 430 → unos 400 · 4 días; 0 → ya toca');

// 2. foto en grande
await fresh('S.role="admin";S.tab.admin="vehiculos";S.vehOpen=1');
await p.click('#fiov .fiimg');await W(200);ok(await ev(()=>!!document.querySelector('#fotov img')),'tocar la foto del vehículo la abre en grande');await p.screenshot({path:'v40/shots/t-foto.png'});
// doble toque acerca
const cx=200,cy=440;await p.mouse.click(cx,cy);await W(60);await p.mouse.click(cx,cy);await W(300);
ok(await ev(()=>/scale\(2\.5\)/.test(document.querySelector('#fotov img').style.transform)),'doble toque acerca la foto');
await p.mouse.click(cx,cy);await W(60);await p.mouse.click(cx,cy);await W(300);
ok(await ev(()=>/scale\(1\)/.test(document.querySelector('#fotov img').style.transform)),'otro doble toque la regresa');
await p.click('#fotov .fvx');await W(100);ok(await ev(()=>!document.querySelector('#fotov')&&!!document.querySelector('#fiov')),'la ✕ cierra la foto y sigues en la ficha');
await p.click('#fiov .fiimg');await W(150);await p.mouse.move(200,400);await p.mouse.down();for(let y=400;y<=600;y+=20)await p.mouse.move(200,y);await p.mouse.up();await W(150);
ok(await ev(()=>!document.querySelector('#fotov')),'deslizar hacia abajo cierra la foto');
// documentos y fachadas también
await fresh('S.role="admin";S.tab.admin="vehiculos";S.vehOpen=1;S.fiTab["veh:1"]="pap"');
r=await ev(()=>[...document.querySelectorAll('#fiov img')].map(i=>i.classList.contains('zoomable')+':'+i.alt));ok(r.filter(x=>x.startsWith('true')).length>=4,'en Papeles las fotos de documentos se pueden abrir en grande '+JSON.stringify(r));
await fresh('S.role="admin";S.tab.admin="clientes";S.openCli=S.cli[0].id;S.fiTab["cli:"+S.cli[0].id]="dat"');
r=await ev(()=>[...document.querySelectorAll('#fiov img')].map(i=>i.classList.contains('zoomable')+':'+i.alt));ok(r.some(x=>x.startsWith('true')),'la fachada del cliente se abre en grande '+JSON.stringify(r));
// la lista no abre la foto: abre la ficha
await fresh('S.role="admin";S.tab.admin="vehiculos"');await p.click('.vcard[data-id="1"] img');await W(150);ok(await ev(()=>!document.querySelector('#fotov')&&!!document.querySelector('#fiov')),'en la lista, tocar la foto abre la ficha (no la foto)');

// 3. barra de abajo: no parpadea al tocar Mostrar
await fresh('S.role="admin";S.tab.admin="inicio"');
await ev(()=>{var b=document.querySelector('button.finver');window.scrollTo(0,b.getBoundingClientRect().top+scrollY-300)});await W(700);
r=await ev(()=>getComputedStyle(document.querySelector('nav.tabs')).opacity);ok(+r<0.05,'al bajar, la barra se esconde');
await ev(()=>{window.__op=[];var t0=performance.now();var f=function(){var n=document.querySelector('nav.tabs');window.__op.push(+getComputedStyle(n).opacity);if(performance.now()-t0<700)requestAnimationFrame(f)};requestAnimationFrame(f)});
const fb=await ev(()=>{var b=document.querySelector('button.finver').getBoundingClientRect();return [b.x+b.width/2,b.y+b.height/2]});await p.mouse.click(fb[0],fb[1]);await W(800);
r=await ev(()=>window.__op);ok(Math.max(...r)<0.05&&await ev(()=>finVis()),'al tocar Mostrar la barra se queda escondida, sin aparecer y desaparecer (máx. '+Math.max(...r).toFixed(2)+')');
await p.mouse.wheel(0,-200);await W(500);ok(+(await ev(()=>getComputedStyle(document.querySelector('nav.tabs')).opacity))>0.95,'al subir, la barra vuelve a salir');

// 4. dibujos junto al título, nítidos
await fresh('S.role="admin";S.tab.admin="inicio"');
r=await ev(()=>{var a=document.querySelector('.card.deco-pl b.tt .tic'),c=document.querySelector('.card.deco-pl.dcaja .tic');return [!!a,!!c,a&&a.naturalWidth,c&&c.naturalWidth,getComputedStyle(document.querySelector('.card.deco-pl.dcaja'),'::after').display]});
ok(r[0]&&r[1],'Inicio: plátano junto a "Precio de hoy" y caja junto a "cajas llenas"');ok(r[2]>=240&&r[3]>=240,'los dibujos tienen buena resolución ('+r[2]+' y '+r[3]+' px)');ok(r[4]==='none','ya no van de fondo');
r=await ev(()=>{var x=document.querySelector('.fin.k-caja');if(!x)return null;var u=getComputedStyle(x).getPropertyValue('--ico');return u.length});ok(r>20000,'Finanzas: los dibujos también se volvieron a sacar con más resolución');
await fresh('S.role="admin";S.tab.admin="bodega"');
r=await ev(()=>[!!document.querySelector('.card.dcaja>b .tic'),!!document.querySelector('.card.dban .lbl .tic')]);ok(r[0]&&r[1],'Bodega: caja junto a "Cajas" y plátano junto a "Existencias"');

// 5. ticket con el logo
await fresh('S.role="rep";S.salida.ok=true;S.inv.reparto=30;S.inv.repartoKg=50;S.tab.rep="ruta"');
await ev(()=>{var i=S.stops.findIndex(s=>!s.done);S.cur=i;resetDraft(cl(S.stops[i].c));S.tab.rep='entrega';S.d.R=2;S.d.mode='todo';act('guardar')});await W(200);
r=await ev(()=>{var h=notaBlock();return [h.indexOf('tklogo')>-1,h.indexOf(IMG.tk)>-1,/PLÁTANOS NIETOS<\/div>/.test(h)]});ok(r[0]&&r[1]&&!r[2],'ticket: lleva el logo nuevo y no repite el nombre');
r=await ev(()=>notaTxt(S.nota));ok(/PLÁTANOS NIETOS/.test(r),'el texto para WhatsApp sí lleva el nombre');
r=await ev(()=>new Promise(res=>{var u=notaImg(S.nota);var i=new Image();i.onload=()=>res([u.slice(0,15),i.width,i.height]);i.src=u}));ok(r[0]==='data:image/png;'&&r[2]>500,'ticket como imagen con el logo ('+r[1]+'×'+r[2]+')');
await ev(()=>{S.tab.rep='nota';render()});await W(200);await p.screenshot({path:'v40/shots/t-ticket.png',fullPage:true});
r=await ev(()=>!!document.querySelector('main .pnback'));ok(r,'pantalla de la nota: tiene botón para volver a la ruta');

// 6. avisos que ahora sí llevan a su lugar
const casos=[['Falta pagar Luz','gastos',()=>S.gsec==='fijos'],['Mensualidad de','vehiculos',()=>!!S.vehOpen&&S.fiTab['veh:'+S.vehOpen]==='cre'],['Le toca verificar','vehiculos',()=>S.vehOpen===1&&S.fiTab['veh:1']==='pap'],['cambio de aceite','vehiculos',()=>S.vehOpen===1&&S.fiTab['veh:1']==='tal'],['Toca calibrar','bienes',()=>!!S.bienOpen],['Vence Extintor','bienes',()=>!!S.bienOpen],['Licencia de Rafa','personal',()=>S.openCh===3],['sin señal','personal',()=>S.openCh===3]];
for(const [txt,tab,chk] of casos){await fresh('S.role="admin";S.tab.admin="inicio"');
 r=await ev(([txt,tab,chk])=>{var x=[...document.querySelectorAll('[data-act="avgo"]')].filter(e=>e.innerText.indexOf(txt)>-1)[0];if(!x)return 'no está el aviso';x.click();return S.tab.admin===tab&&eval('('+chk+')')()},[txt,tab,chk.toString()]);
 ok(r===true,'aviso "'+txt+'" lleva a '+tab+' '+(r!==true?r:''));}
await fresh('S.role="admin";S.tab.admin="inicio"');
r=await ev(()=>{var x=[...document.querySelectorAll('[data-act="avgo"]')].filter(e=>e.innerText.indexOf('Licencia de Rafa')>-1)[0];x.click();return /Licencia/.test(document.querySelector('#fiov').innerText)});ok(r,'en la ficha de Rafa se ve lo de la licencia');
// Qué hacer hoy → Cuadrar la caja baja hasta la caja
await fresh('S.role="admin";S.tab.admin="inicio"');
await ev(()=>{var b=[...document.querySelectorAll('[data-act="hoyok"][data-k="cj"]')][0].closest('.row').querySelector('[data-act="popgo"]');b.scrollIntoView({block:'center'});b.click()});await W(900);
r=await ev(()=>{var d=document.querySelector('details[data-k="cajadia"]');var x=d.getBoundingClientRect();return [scrollY,d.open,x.top>-50&&x.top<880]});console.log('DBG',JSON.stringify(r));ok(r[0]>200&&r[1]&&r[2],'"Cuadrar la caja → Ir" baja hasta la caja del día y la abre (no se sube hasta arriba)');
// empleado: Editar datos no sube hasta arriba
await fresh('S.role="admin";S.tab.admin="personal";S.openCh=3');
r=await ev(()=>{var o=document.querySelector('#fiov');var b=o.querySelector('[data-act="chedit"]');if(!b)return 'sin botón';b.scrollIntoView({block:'center'});var s0=o.scrollTop;b.click();var o2=document.querySelector('#fiov');return [s0,o2.scrollTop,o2.dataset.fi.split(':')[2]]});ok(Array.isArray(r)&&r[2]==='edit'&&/^Editar/.test(await ev(()=>document.querySelector('#fiov .fihd b').textContent)),'empleado: "Editar datos" abre su propia pantalla de edición (empieza arriba, como pantalla nueva)');

// 7. botones para regresar
await fresh('S.role="rep";S.salida.ok=true;S.tab.rep="cierre"');ok(await ev(()=>!!document.querySelector('main .pnback')),'cierre del chofer: tiene "← Volver a la ruta"');
await p.click('main .pnback');await W(150);ok(await ev(()=>S.tab.rep==='ruta'),'el botón regresa a la ruta');
await fresh('S.role="admin";S.tab.admin="cierreadm"');ok(await ev(()=>!!document.querySelector('main .pnback')),'recibir efectivo (admin): tiene "← Volver a Inicio"');
ok(!p._errs.length,'sin errores '+p._errs.slice(0,3).join(' | '));await p.close();

// 8. tutorial desde otra pantalla y recordatorio de deslizar (sin modo de prueba)
p=await abrir(false);
for(const d of '1234')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(500);
ok(await p.evaluate(()=>!!document.getElementById('cajov')&&!document.getElementById('swhint')),'si sale el cierre de caja de ayer, el recordatorio espera (no se encima)');
await p.click('[data-act="cajaayerskip"]');await p.waitForTimeout(300);
if(await p.evaluate(()=>!!document.querySelector('[aria-label="Aviso urgente"]')))await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};render()});await p.waitForTimeout(800);
ok(await p.evaluate(()=>!!document.getElementById('swhint')),'al cerrar lo que estaba encima, sale el recordatorio de deslizar');
r=await p.evaluate(()=>{var x=document.getElementById('swhint').getBoundingClientRect();return [x.left,x.right]});ok(r[0]>=8&&r[1]<=392,'el recordatorio cabe en la pantalla');await p.screenshot({path:'v40/shots/t-swhint.png'});
await p.waitForTimeout(3200);ok(await p.evaluate(()=>!document.getElementById('swhint')),'el recordatorio se quita solo');
await p.evaluate(()=>{S.cajaAyerSkip=true;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.tab.admin='clientes';S.openCli=S.cli[0].id;render()});await p.waitForTimeout(150);
await p.evaluate(()=>{var b=document.createElement('button');b.dataset.act='tutver';document.body.appendChild(b);b.click();b.remove()});await p.waitForTimeout(1300);
r=await p.evaluate(()=>{var h=document.querySelector('#tutov .hole').getBoundingClientRect(),c=document.querySelector('.card.deco-pl, .card.pfix').getBoundingClientRect();return [S.tab.admin,!document.querySelector('#fiov'),Math.abs(h.top-c.top)<12&&Math.abs(h.left-c.left)<12]});
ok(r[0]==='inicio'&&r[1]&&r[2],'el tutorial se va a Inicio y marca la tarjeta del precio aunque estuvieras en otra pantalla');await p.screenshot({path:'v40/shots/t-tut.png'});
await p.evaluate(()=>{var b=document.querySelector('[data-act="tutsig"]');b.click()});await p.waitForTimeout(200);
r=await p.evaluate(()=>{var n=document.querySelector('nav.tabs');return +getComputedStyle(n).opacity});ok(r>0.95,'en el paso de la barra, la barra se ve');
await p.evaluate(()=>{document.querySelector('[data-act="tutfin"]').click()});await p.waitForTimeout(200);ok(await p.evaluate(()=>S.tab.admin==='clientes'&&!!document.querySelector('#fiov')&&!S.tut),'al terminar el tutorial regresas a donde estabas');
// desbloqueo por no usarla: no sale el recordatorio
await p.evaluate(()=>{_pinAct=Date.now()-6*60000});await p.mouse.click(200,300);await p.waitForTimeout(150);for(const d of '1234')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(400);
ok(await p.evaluate(()=>!document.getElementById('swhint')),'al desbloquear después de no usarla no sale el recordatorio');
ok(!p._errs.length,'sin errores (PIN y tutorial) '+p._errs.slice(0,3).join(' | '));await p.close();

// 9. primera vez
p=await abrir(true,'/mnt/user-data/outputs/platanos-primera-vez.html');await p.evaluate(()=>{suAplicar&&suAplicar();render()});await p.waitForTimeout(200);
await p.evaluate(()=>{S.tab.admin='vehiculos';render()});await p.waitForTimeout(300);ok(!p._errs.length,'primera vez: sin errores '+p._errs.slice(0,3).join(' | '));await p.close();
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
