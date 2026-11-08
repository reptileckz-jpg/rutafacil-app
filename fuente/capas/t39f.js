const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();fs.mkdirSync('v39/shots',{recursive:true});
let nOK=0,nF=0;const ok=(c,m)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m)};
const abrir=async(test,url)=>{const p=await b.newPage({viewport:{width:400,height:880}});if(test)await p.addInitScript(()=>{window.__pnTest=1});p._errs=[];p.on('pageerror',e=>{p._errs.push(e.message);console.log('STACK',(e.stack||'').split('\n').slice(0,4).join(' | '))});await p.goto('file://'+(url||'/mnt/user-data/outputs/prototipo-platanos.html'));await p.waitForTimeout(400);return p};
let p=await abrir(true);const ev=(f,a)=>p.evaluate(f,a);const W=ms=>p.waitForTimeout(ms);const txt=()=>ev(()=>document.body.innerText);
const shot=async(n,h)=>{if(h)await p.setViewportSize({width:400,height:h});await W(350);await p.screenshot({path:'v39/shots/'+n+'.png'});if(h)await p.setViewportSize({width:400,height:880})};
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);window.__snap=JSON.stringify(S)});
const fresh=async(js)=>{await ev((js)=>{S=JSON.parse(window.__snap);eval(js);render();window.scrollTo(0,0)},js||'');await W(120)};
// ---- fichas
await fresh('S.role="admin";S.tab.admin="vehiculos"');
await p.click('[data-act="vehopen"][data-id="1"]');await W(150);
let r=await ev(()=>{var o=document.querySelector('#fiov');return o?[o.querySelectorAll('.fitabs button').length,!!o.querySelector('svg.plate'),o.innerText.indexOf('VERACRUZ')>-1||o.innerHTML.indexOf('VERACRUZ')>-1,!!o.querySelector('.fitabs .dot')]:null});
ok(r&&r[0]>=4&&r[1]&&r[2],'vehículo: se abre en su pantalla con pestañas y la placa de Veracruz dibujada');ok(r&&r[3],'la pestaña con algo pendiente tiene punto rojo');await shot('f01-veh-resumen');
for(const t of ['pap','tal','gas']){await p.click('#fiov [data-act="fitab"][data-v="'+t+'"]');await W(120);await shot('f01-veh-'+t);if(t==='tal')ok(await ev(()=>!!document.querySelector('#fiov [data-act="mfopen"]')),'pestaña Taller con su botón de registrar servicio');if(t==='pap')ok(await ev(()=>/Documentos con vencimiento/.test(document.querySelector('#fiov').innerText)),'pestaña Papeles con los documentos')}
await p.click('#fiov [data-act="fix"]');await W(120);ok(await ev(()=>!document.querySelector('#fiov')&&S.vehOpen==null),'la flecha ← regresa a la lista');
await fresh('S.role="admin";S.tab.admin="vehiculos";S.vehOpen=2');ok(await ev(()=>document.querySelector('#fiov').innerHTML.indexOf('GUERRERO')>-1&&/DE CARGA/.test(document.querySelector('#fiov').innerHTML)),'el Freightliner M2 tiene placa de Guerrero de carga');await shot('f02-m2');
await ev(()=>{document.querySelector('[data-act="fitab"][data-v="pap"]').click()});await W(100);await ev(()=>{document.querySelector('[data-act="pledo"][data-v="Veracruz"]').click()});await W(80);
ok(await ev(()=>S.veh.filter(v=>v.id===2)[0].plEdo==='Veracruz'&&document.querySelector('#fiov').innerHTML.indexOf('VERACRUZ')>-1),'cambiar el estado de la placa la vuelve a dibujar');
// editar el número de placa: se ve en la placa
await fresh('S.role="admin";S.tab.admin="vehiculos";S.vehOpen=1');await ev(()=>document.querySelector('#fiov [data-act="vedit"]').click());await W(120);
ok(await ev(()=>!document.querySelector('#fiov')&&!!document.querySelector('.wz-hd')&&/Paso 1 de 4/.test(document.body.innerText)),'editar vehículo: formulario por pasos (1 de 4)');
await p.fill('[data-bind="vf.pl"]','ABC-123-Z');await W(80);ok(await ev(()=>document.getElementById('vfplate').innerHTML.indexOf('ABC-123-Z')>-1),'al escribir la placa, el dibujo cambia al momento');await shot('f03-vform',1300);
await ev(()=>document.querySelector('[data-act="vfpaso"][data-v="1"]').click());await W(80);ok(await ev(()=>/Paso 2 de 4/.test(document.body.innerText)),'siguiente paso');
await ev(()=>{var b=Array.from(document.querySelectorAll('[data-act="vsave"]')).pop();b.click()});await W(120);
ok(await ev(()=>S.veh.filter(v=>v.id===1)[0].pl==='ABC-123-Z'&&!S.vf),'guardar desde cualquier paso guarda la placa nueva');
// empleado
await fresh('S.role="admin";S.tab.admin="personal"');await p.click('[data-act="opench"][data-id="1"]');await W(150);
r=await ev(()=>{var o=document.querySelector('#fiov');return o?Array.from(o.querySelectorAll('.fitabs button')).map(b=>b.textContent.trim()):null});ok(r&&r.join(',').indexOf('Referencias')>-1&&r.join(',').indexOf('Sueldo')>-1,'empleado: pestañas '+(r||[]).join(', '));
await ev(()=>document.querySelector('[data-act="fitab"][data-v="ref"]').click());await W(100);let t=await ev(()=>document.querySelector('#fiov').innerText);ok(/María Hernández/.test(t)&&/Mamá/.test(t)&&/Lucía Ramos/.test(t),'referencias con parentesco y contacto de emergencia');await shot('f04-emp-ref');
await ev(()=>document.querySelector('[data-act="fitab"][data-v="sue"]').click());await W(100);ok(await ev(()=>/A pagar/.test(document.querySelector('#fiov').innerText)),'pestaña Sueldo con lo que se le paga');
// cliente
await fresh('S.role="admin";S.tab.admin="clientes"');await p.click('[data-act="opencli"][data-id="4"]');await W(150);t=await ev(()=>document.querySelector('#fiov').innerText);
ok(/Te debe/.test(t)&&/Registrar abono/.test(t)&&/Cuenta/.test(t),'cliente: su cuenta primero (Panadería El Trigal)');await shot('f05-cli');
await ev(()=>{document.getElementById('abc_4').value='800';document.querySelector('#fiov [data-act="cobrar"]').click()});await W(80);await ev(()=>{var o=document.querySelector('[data-act="confok"]');if(o)o.click()});await W(120);
ok(await ev(()=>cl(4).cred===5000),'abono desde la ficha: la deuda baja de $5,800 a $5,000 (el monto no se pierde al confirmar)');
// proveedor y carga
await fresh('S.role="admin";S.tab.admin="cargas"');await p.click('[data-act="openprov"]');await W(150);ok(await ev(()=>!!document.querySelector('#fiov')&&/Cuenta/.test(document.querySelector('#fiov .fitabs').innerText)),'proveedor en su pantalla');
await p.click('#fiov [data-act="fix"]');await W(100);await p.click('[data-act="opencarga"]');await W(150);r=await ev(()=>Array.from(document.querySelectorAll('#fiov .fitabs button')).map(b=>b.textContent.trim()).join(','));ok(/Resumen,Detalle,Pagos,Más/.test(r),'carga en su pantalla: '+r);await shot('f06-carga');
// ---- borradores
await fresh('S.role="rep";S.salida.ok=true;S.inv.reparto=40;S.inv.repartoKg=100;S.tab.rep="ruta"');
await ev(()=>{S.cur=0;resetDraft(cl(S.stops[0].c));S.tab.rep='entrega';render();S.d.R=7;render()});await ev(()=>document.querySelector('[data-act="entvolver"]').click());await W(80);
t=await txt();ok(/Dejas esto a medio llenar/.test(t)&&/Guardar para seguir después/.test(t)&&/Borrar lo que llené/.test(t)&&/Seguir llenando/.test(t),'al salir a medio llenar pregunta: guardar, borrar o seguir');
await ev(()=>document.querySelector('[data-act="borrkeep"]').click());await W(80);t=await txt();ok(/Sin terminar/.test(t)&&/Entrega a Tienda Don Beto/.test(t)&&await ev(()=>S.tab.rep==='ruta'&&S.log.length===0),'guardado para después: sale arriba y no cuenta en nada');
await ev(()=>document.querySelector('[data-act="borrir"]').click());await W(80);ok(await ev(()=>S.tab.rep==='entrega'&&S.d.R===7),'Continuar regresa con lo que habías llenado (7 cajas)');
await ev(()=>{document.querySelector('[data-act="entvolver"]').click()});await W(60);await ev(()=>document.querySelector('[data-act="borrdel"]').click());await W(60);ok(await ev(()=>/Borrar lo que llenaste/.test(document.body.innerText)),'borrar pide confirmar');
await ev(()=>document.querySelector('[data-act="borrdel"][data-ok="1"]').click());await W(60);ok(await ev(()=>!S.borr.ent&&S.tab.rep==='ruta'),'borrado de verdad');
// gasto a medio llenar y cambiar de pestaña
await ev(()=>{S.gxSheet=true;S.gx={tipo:'Caseta',monto:'85',nota:'',foto:null};render();document.querySelector('[data-act="gxsx"]').click()});await W(60);ok(await ev(()=>/Gasto de Caseta/.test(document.body.innerText)),'el gasto a medio llenar también pregunta');
await ev(()=>document.querySelector('[data-act="borrkeep"]').click());await W(60);ok(await ev(()=>gchTot()===0&&S.borr.gx),'el gasto guardado para después no se descuenta todavía');
await ev(()=>{S.cierreP=5;S.cierre.gxConf=true;S.tab.rep='cierre';render();document.querySelector('[data-act="enviar"]').click()});await W(60);await ev(()=>{var o=document.querySelector('[data-act="confok"]');if(o)o.click()});await W(60);
ok(await ev(()=>/Tienes cosas sin terminar/.test(document.body.innerText)&&!S.cierre.sent),'al mandar el cierre avisa que hay algo sin terminar');await shot('f07-borr-cierre');
// ---- cierre por pasos
await fresh('S.role="rep";S.salida.ok=true;S.tab.rep="cierre";S.cierreP=0');t=await txt();ok(/Paso 1 de 4/.test(t)&&/Odómetro final/.test(t)&&!/Fotos del vehículo al terminar/.test(await ev(()=>Array.from(document.querySelectorAll('main > *:not(.wz-hide)')).map(x=>x.innerText).join(' '))),'cierre del chofer en 4 pasos');
await ev(()=>{S.cierreP=5;render()});t=await txt();ok(/Revisa antes de enviar/.test(t)&&/Debes entregar/.test(t),'último paso: resumen antes de enviar');await shot('f08-cierre-resumen',1400);
// ---- ruta del chofer limpia
await fresh('S.role="rep";S.salida.ok=true;S.tab.rep="ruta"');t=await txt();ok(!/Registrar un gasto\n/.test(t)&&/Herramientas de la demo/.test(t),'ruta del chofer sin repetidos y lo de la demo hasta abajo');
// ---- venta local con botones
await fresh('S.role="local";S.tab.local="local"');ok(await ev(()=>document.querySelectorAll('.vlprod button').length>=2&&!document.querySelector('main select')),'venta local: productos con botones grandes');
// ---- bodega ordenada
await fresh('S.role="admin";S.tab.admin="bodega"');ok(await ev(()=>!!document.querySelector('details[data-k="bzmad"]')&&!!document.querySelector('details[data-k="bzcnt"]')&&!!document.querySelector('details[data-k="bzcj"]')),'bodega: madurar, contar y comprar cajas en su apartado');
// ---- colores de la barra
r=await ev(()=>{function L(h){var c=[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255).map(x=>x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4));return .2126*c[0]+.7152*c[1]+.0722*c[2]}return Object.keys(TCOL).map(k=>[k,Math.round((1.05/(L(TCOL[k])+.05))*10)/10]).filter(x=>x[1]<4.5)});ok(!r.length,'todos los colores de la barra se leen con letra blanca (4.5 o más) '+JSON.stringify(r));
// ---- avisos por nivel
await fresh('S.role="admin";S.tab.admin="inicio"');r=await ev(()=>({r:document.querySelectorAll('.avl.r').length,o:document.querySelectorAll('.avl.o').length,b:document.querySelectorAll('.avl.b').length,rosa:Array.from(document.querySelectorAll('.card.alert')).filter(x=>/^Avisos/.test(x.innerText)).length}));ok(r.r>0&&r.o>0&&r.rosa===0,'avisos con color según su nivel (urgente '+r.r+', pronto '+r.o+', info '+r.b+') y la tarjeta ya no es rosa');await shot('f09-inicio',2400);
// ---- imágenes
r=await ev(()=>{var a=document.querySelector('.card.dban'),c=document.querySelector('.dcaja');var f=document.querySelector('.fin.k-caja');return [!!a&&getComputedStyle(a,'::after').backgroundImage.indexOf('webp')>-1,!!c,!!f&&getComputedStyle(f).backgroundImage.indexOf('webp')>-1]});ok(r.every(Boolean),'dibujos de plátanos, caja y finanzas en sus tarjetas '+JSON.stringify(r));
// ---- dos admins
ok(/Cambios de Ricardo Mejía desde tu última vez/.test(await txt()),'el otro administrador ve lo que cambió Ricardo Mejía');await ev(()=>document.querySelector('[data-act="cambok"]').click());await W(60);ok(!/Cambios de Ricardo Mejía/.test(await txt()),'"Entendido" lo quita');
// ---- sin señal
t=await txt();ok(/Rafa lleva .* sin señal/.test(t),'aviso: Rafa lleva más de una hora sin señal');
await ev(()=>{var c=S.cli.filter(x=>x.chofer===3)[0];S.tab.admin='clientes';S.openCli=c.id;S.fiTab['cli:'+c.id]='vis';render()});await ev(()=>{var b=document.querySelector('#fiov [data-act="diavisita"]:not([aria-pressed="true"])');b.click()});await W(80);
ok(await ev(()=>(S.pendCh[3]||[]).length>0),'cambiarle algo a un cliente de Rafa queda pendiente de llegarle');
await fresh('S.role="admin";S.tab.admin="personal"');ok(/Sin señal/.test(await txt()),'en Personal sale "Sin señal" junto a Rafa');
await fresh('S.role="rep";S.chofHoy=1;S.salida.ok=true;S.tab.rep="ruta";S.dOpen.demor=true');await ev(()=>document.querySelector('[data-act="senal"]').click());await W(60);ok(/Sin señal desde/.test(await txt()),'el chofer ve que no tiene señal');
await ev(()=>{S.cur=0;resetDraft(cl(S.stops[0].c));S.tab.rep='entrega';act=function(a){var b=document.createElement('button');b.dataset.act=a;document.body.appendChild(b);b.click();b.remove()};act('guardar')});await W(80);ok(await ev(()=>S.colaEnv===1),'lo que captura sin señal queda pendiente de mandar');
await ev(()=>{S.tab.rep='ruta';render();document.querySelector('[data-act="senal"]').click()});await W(60);ok(await ev(()=>S.colaEnv===0&&/se mandaron 1 movimiento/.test(S.toast||'')),'al volver la señal se manda solo');
// ---- Walmart
await fresh('S.role="admin";S.tab.admin="clientes"');ok(/Walmart Xalapa/.test(await txt()),'Walmart en la lista de clientes');ok(await ev(()=>!rutaManana().some(x=>/Walmart/.test(x.c.n))&&!S.stops.some(s=>/Walmart/.test(cl(s.c).n))),'Walmart no entra a ninguna ruta');
// ---- datos completos
await fresh('S.role="admin";S.tab.admin="vehiculos";S.vehOpen=3;S.fiTab["veh:3"]="pap"');ok(!/sin registrar/.test(await ev(()=>document.querySelector('#fiov').innerText)),'vehículo con todos sus papeles');
await fresh('S.role="admin";S.tab.admin="personal";S.openCh=3;S.fiTab["emp:3"]="ref"');ok(!/sin registrar/.test(await ev(()=>document.querySelector('#fiov').innerText)),'Rafa con sus referencias completas');
// ---- viaje: avance por etapa
await fresh('S.role="admin";S.tab.admin="cargas";vwNuevo(null)');ok(/Antes de salir · paso 1 de/.test(await txt()),'viaje: el avance dice la etapa ("Antes de salir · paso 1 de …")');
ok(!p._errs.length,'sin errores en la demo con datos '+p._errs.slice(0,3).join(' | '));await p.close();

// ---- PIN y cierre de caja obligatorio (sin modo de prueba)
p=await abrir(false);t=await p.evaluate(()=>document.body.innerText);ok(/Escribe tu PIN para entrar/.test(t)&&/1234/.test(t),'al abrir pide el PIN (en la demo dice que es 1234)');await p.screenshot({path:'v39/shots/f10-pin.png'});
for(const d of '1111')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(80);ok(await p.evaluate(()=>!!document.querySelector('#pinov')),'PIN equivocado: no entra');
for(const d of '1234')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(120);ok(await p.evaluate(()=>!document.querySelector('#pinov')),'PIN correcto: entra');
ok(/Antes de empezar: cierra la caja de ayer/.test(await p.evaluate(()=>document.body.innerText)),'si ayer no se cerró la caja, lo pide antes de todo');await p.screenshot({path:'v39/shots/f11-caja-ayer.png'});
await p.fill('#cjay',String(await p.evaluate(()=>cajaEsp())));await p.click('[data-act="cajaayerok"]');await p.waitForTimeout(120);ok(await p.evaluate(()=>S.cajaCierres.some(x=>x.ayer)&&!document.querySelector('#cajov')&&!document.querySelector('#pinov')),'cierre de ayer registrado sin volver a pedir el PIN');
await p.evaluate(()=>{S.gastos.push({t:'Otro',m:100,n:'x',f:iso(TODAY)});S.tab.admin='gastos';render();anularPide('g',S.gastos.length-1,'el gasto x');render()});await p.click('[data-act="anmot"][data-v="No se hizo"]');await p.click('[data-act="anularok"]');await p.waitForTimeout(120);
ok(await p.evaluate(()=>!document.querySelector('#pinov')&&S.anulados.some(x=>x.desc==='el gasto x')),'anular ya no pide PIN (solo el motivo)');
// cobros y pagos: solo confirmar
await p.evaluate(()=>{S.tab.admin='inicio';S.cajaCnt=String(cajaEsp());render();document.querySelector('[data-act="cajacierre"]').click()});await p.waitForTimeout(80);
ok(await p.evaluate(()=>!!S.confirm&&/cuadra/.test(S.confirm.m)&&!document.querySelector('#pinov')),'el cierre de caja pide confirmar (sin PIN)');
let nc=await p.evaluate(()=>S.cajaCierres.length);await p.click('[data-act="confok"]');await p.waitForTimeout(120);ok(await p.evaluate(n=>S.cajaCierres.length===n+1,nc),'al confirmar se registra el cierre de caja');
// candado por no usar la app: admin 5 min
await p.evaluate(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.tab.admin='inicio';render();_pinAct=Date.now()-4*60000});await p.click('nav.tabs [data-act="tab"][data-t="gastos"]');await p.waitForTimeout(120);
ok(await p.evaluate(()=>!document.querySelector('#pinov')&&S.tab.admin==='gastos'),'admin: a los 4 minutos sin usarla no la bloquea');
await p.evaluate(()=>{_pinAct=Date.now()-6*60000});await p.click('nav.tabs [data-act="tab"][data-t="inicio"]');await p.waitForTimeout(150);
t=await p.evaluate(()=>document.body.innerText);ok(/Pasaron 5 minutos/.test(t)&&await p.evaluate(()=>S.tab.admin==='gastos'),'admin: a los 6 minutos se bloquea y ese toque no hace nada más');await p.screenshot({path:'v39/shots/f10b-candado.png'});
for(const d of '1234')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(150);ok(await p.evaluate(()=>!document.querySelector('#pinov')&&S.tab.admin==='gastos'),'con el PIN sigue donde iba');
// chofer 30 min
await p.evaluate(()=>{S.role='rep';S.chofHoy=1;S.pinOk['c:1']=true;render();_pinAct=Date.now()-20*60000});await p.mouse.click(200,300);await p.waitForTimeout(120);
ok(await p.evaluate(()=>!document.querySelector('#pinov')),'chofer: a los 20 minutos sin usarla no la bloquea');
await p.evaluate(()=>{_pinAct=Date.now()-31*60000});await p.mouse.click(200,300);await p.waitForTimeout(150);ok(/Pasaron 30 minutos/.test(await p.evaluate(()=>document.body.innerText)),'chofer: a los 31 minutos se bloquea');
await p.evaluate(()=>{_pinAct=Date.now()-31*60000});
ok(!p._errs.length,'sin errores (PIN) '+p._errs.slice(0,3).join(' | '));await p.close();

// ---- demo de primera vez
p=await abrir(false,'/mnt/user-data/outputs/platanos-primera-vez.html');t=await p.evaluate(()=>document.body.innerText);ok(/Bienvenido/.test(t)&&/Paso 1 de 8/.test(t),'primera vez: sale el asistente');await p.screenshot({path:'v39/shots/f12-setup1.png'});
const sig=async()=>{await p.click('#setov [data-act="supaso"]:last-child');await p.waitForTimeout(120)};
await sig();await p.fill('#setov [data-bind="inv.vacias"]','200');await p.fill('#setov [data-bind="inv.verdes"]','80');await p.fill('#setov [data-bind="inv.maduras"]','25');await p.fill('#setov [data-bind="setup.mad.R"]','15');await p.fill('#setov [data-bind="inv.kgVerde"]','300');await p.fill('#setov [data-bind="inv.kgMaduro"]','120');await p.screenshot({path:'v39/shots/f12-setup2.png',fullPage:true});
await sig();ok(/Tus vehículos/.test(await p.evaluate(()=>document.body.innerText)),'paso de vehículos');
await sig();ok(/Falta llenar/.test(await p.evaluate(()=>document.body.innerText))&&/solo demo/.test(await p.evaluate(()=>document.body.innerText)),'si falta un vehículo avisa, y en la demo se puede seguir');await p.click('[data-act="borrseguir"], [data-act="confno"], .modal [data-act]:not([data-act="wzforce"])').catch(()=>{});await p.evaluate(()=>{S.modal=null;render()});
await p.fill('#setov [data-bind="setup.vf.n"]','Nissan NP300 2024');await p.fill('#setov [data-bind="setup.vf.pl"]','YKL-204-B');await p.waitForTimeout(80);ok(await p.evaluate(()=>document.getElementById('suplate').innerHTML.indexOf('YKL-204-B')>-1),'la placa se dibuja mientras escribes');
await p.click('#setov [data-act="suset"][data-k="comb"][data-v="Gasolina Premium"]');await p.click('#setov [data-act="suadd"][data-k="veh"]');await p.waitForTimeout(80);await p.screenshot({path:'v39/shots/f12-setup3.png',fullPage:true});
await sig();await p.fill('#setov [data-bind="setup.ef.n"]','Pepe López');await p.click('#setov [data-act="suadd"][data-k="per"]');await p.fill('#setov [data-bind="setup.ef.n"]','Lalo');await p.click('#setov [data-act="sueset"][data-v="bodega"]');await p.click('#setov [data-act="suadd"][data-k="per"]');
await sig();await p.fill('#setov [data-bind="setup.cf.n"]','Tienda La Fe');await p.click('#setov [data-act="sudia"][data-d="1"]');await p.fill('#setov [data-bind="setup.cf.cred"]','1500');await p.fill('#setov [data-bind="setup.cf.vac"]','4');await p.click('#setov [data-act="suadd"][data-k="cli"]');
await sig();await p.fill('#setov [data-bind="setup.pf.n"]','Don Chucho');await p.fill('#setov [data-bind="setup.pf.deb"]','8000');await p.click('#setov [data-act="suadd"][data-k="prov"]');
await sig();await p.fill('#setov [data-bind="cajaBase"]','5000');await p.fill('#setov [data-bind="precio.R"]','250');await p.fill('#setov [data-bind="precio.M"]','17');await p.fill('#setov [data-bind="setup.vlM"]','14');
await sig();await p.screenshot({path:'v39/shots/f12-setup8.png',fullPage:true});await p.click('#setov [data-act="sufin"]');await p.waitForTimeout(600);
r=await p.evaluate(()=>({caja:cajaEsp(),deb:credTotal(),prov:sum(provDeb(),function(x){return x.pen}),veh:S.veh.length,ch:choferesL().filter(c=>c.id!==2).length,emp:S.choferes.length,cli:S.cli.length,inv:S.inv,lotes:S.lotes.length,cajas:cajasDonde().tot,mal:cuentasRevisar().filter(x=>!x.ok).map(x=>x.n),vlM:S.vlProd.filter(x=>x.inv==='M')[0].p,tut:!!document.querySelector('#tutov')}));
ok(r.caja===5000&&r.deb===1500&&r.prov===8000,'arranca con caja $5,000, te deben $1,500 y debes $8,000');ok(r.veh===1&&r.ch===1&&r.emp===3&&r.cli===1,'1 vehículo, 1 chofer, 1 de bodega y 1 cliente');
ok(r.inv.vacias===200&&r.inv.verdes===80&&r.inv.maduras===25&&r.lotes===1&&r.cajas===200+80+25+15+4,'inventario de inicio y cajas en total: '+r.cajas);ok(!r.mal.length,'las cuentas cuadran desde el primer día '+JSON.stringify(r.mal));ok(r.vlM==='14','precio de venta local propio ($14 el kilo de macho)');
ok(r.tut,'empieza el tutorial animado');await p.screenshot({path:'v39/shots/f13-tutorial.png'});
for(let i=0;i<5;i++){await p.click('#tutov [data-act="tutsig"]').catch(()=>{});await p.waitForTimeout(250);if(i===1)await p.screenshot({path:'v39/shots/f13-tutorial2.png'})}
ok(await p.evaluate(()=>!document.querySelector('#tutov')),'el tutorial termina');
await p.evaluate(()=>{S.menu=true;render()});await p.click('.drawer [data-act="role"][data-r="rep"]');await p.waitForTimeout(500);
if(await p.evaluate(()=>!!document.querySelector('#pinov')))for(const d of '1234')await p.click('#pinov [data-act="pind"][data-v="'+d+'"]');await p.waitForTimeout(400);
ok(await p.evaluate(()=>!!document.querySelector('#tutov')||S.tutVisto.rep),'al entrar como chofer la primera vez, también hay tutorial');await p.screenshot({path:'v39/shots/f14-tut-chofer.png'});
ok(!p._errs.length,'sin errores en la demo de primera vez '+p._errs.slice(0,3).join(' | '));
console.log('\n'+nOK+' OK · '+nF+' FAIL');await b.close()})();
