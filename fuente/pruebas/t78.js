/* 7.8 · puntos 15 al 30 (l78 y l79) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const ctx=await b.newContext({geolocation:{latitude:32.51,longitude:-117.03},permissions:['geolocation'],viewport:{width:400,height:860}});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a);const ck=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);let r;
// 25 · apartados: se abren y se recuerdan al instante
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';S.aj=true;render()});await p.waitForTimeout(150);
r=await ev(()=>{var d=document.querySelector('#ajov details[data-k]');if(!d)return null;var k=d.dataset.k,s=d.querySelector('summary');s.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));var a=[d.open,S.dOpen[k]];render();var d2=document.querySelector('#ajov details[data-k="'+k+'"]');a.push(d2&&d2.open);return a});
ok(r&&r[0]&&r[1]&&r[2],'25 · al tocar el título se abre, se recuerda y sigue abierto aunque se vuelva a dibujar',r);
await ev(()=>{S.aj=false;render()});
// 15 · ubicación del chofer
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk['c:1']=true;S.salida.ok=true;S.inv.reparto=20;var i=curStop();S.cur=i;var c=cl(S.stops[i].c);c.lat=19.5;c.lng=-96.9;c.locConf=iso(TODAY);S.tab.rep='entrega';render()});
ok(await ev(()=>!document.querySelector('[data-x="cfub70"]')),'15 · cliente con ubicación confirmada: ya no sale "Confirmar la ubicación"');
await ev(()=>{var c=cl(S.stops[curStop()].c);c.locConf=null;render()});ok(await ev(()=>!!document.querySelector('[data-x="cfub70"]')),'15 · si es aproximada (link/búsqueda) sí sale');
await ck('[data-x="cfub70"] [data-act="cfub70"]');await p.waitForTimeout(500);ok(await ev(()=>!document.querySelector('[data-x="cfub70"]')&&!!cl(S.stops[curStop()].c).locConf),'15 · al confirmar se quita y ya no vuelve');
await ev(()=>{S.dOpen.entmas=true;render()});ok(await ev(()=>!!document.querySelector('details[data-k="entmas"] [data-x="cf78"]')),'15 · "Corregir la ubicación" queda en Más opciones');
// 15b · alta por pasos pasa sola
await ev(()=>{S.tab.rep='ruta';render();wzAbre('cliCh',{dias:[1],n:'X Prueba'});S.wz.p=wzPasos().findIndex(x=>/¿Dónde está/.test(x.q));render()});await ck('[data-act="wz72gps"]');await p.waitForTimeout(600);await ck('[data-act="ub68si"]');await p.waitForTimeout(200);
ok(await ev(()=>!/¿Dónde está/.test(wzPasos()[S.wz.p].q)),'15 · al guardar la ubicación en el alta, pasa sola al siguiente paso');await ev(()=>{S.wz=null;render()});
// 16 · TAG sin viaje
r=await ev(()=>{S.role='admin';var v=S.veh[0];v.tag76={prov:'IAVE',num:'1',ini:500,min:0,mov:[]};var n=S.gastos.length,c0=cajaEsp();var m=tagCruce(v,{f:'2026-01-02',h:'08:00',cas:'Perote',m:120});var g=S.gastos.slice(n);return [m.cid,g.length,g[0]&&g[0].t,g[0]&&g[0].caja,cajaEsp()-c0]});
ok(!r[0]&&r[1]===1&&r[2]==='Casetas (TAG)'&&r[3]===false&&r[4]===0,'16 · cruce sin viaje: gasto "Casetas (TAG)" del vehículo, sin volver a sacar de la caja',r);
// 18/20/30 · alta de vehículo
await ev(()=>{wzAbre('veh',{plEdo:'Veracruz',tipo:'carga',marca:'Freightliner',modelo:'M2',anio:'2018',pl:'X',comb:'Diésel',capL:'300',capC:'300',odo:'380000'});render()});
r=await ev(()=>wzPasos().map(x=>x.q));ok(r.some(q=>/Usa DEF/.test(q))&&r.some(q=>/Datos del vehículo/.test(q))&&r.some(q=>/imagen le ponemos/.test(q)),'18/20/30 · alta: DEF (si es diésel), VIN/motor/llanta y galería',r.filter(q=>/DEF|Datos del|imagen/.test(q)));
await ev(()=>{S.wz.p=wzPasos().findIndex(x=>/imagen le ponemos/.test(x.q));render()});r=await ev(()=>[...document.querySelectorAll('#wzov [data-act="gal78"]')].map(b=>b.innerText.trim()+(b.getAttribute('aria-pressed')==='true'?'*':'')));
ok(r.length>=2&&/Nissan NP300/.test(r[0])&&/M2\*/.test(r[1])&&!r.some(x=>/dibujo/i.test(x)),'18 · galería: NP300 y M2 (sin dibujos); sugiere el M2 por la marca',r);
await ev(()=>{S.wz.p=wzPasos().findIndex(x=>/Datos del vehículo/.test(x.q));render()});await p.fill('#wz_llanta','2957522.5');ok(await ev(()=>document.getElementById('wz_llanta').value)==='295/75R22.5','20 · la llanta se acomoda sola: 295/75R22.5');
await p.fill('#wz_vin','ABC');await ck('[data-act="wzsig"]:not([data-salta])');await p.waitForTimeout(80);ok(/17 letras/.test(await ev(()=>S.wz.err)),'20 · VIN que no cuadra: avisa');
await ev(()=>{S.wz.d.usaDef='si';S.wz.d.gal78='m2';S.wz.d.img78=1;S.wz.d.acM='nose';S.wz.d.acInt='15000';S.wz.p=wzPasos().length-1;render()});await ck('[data-act="wzfin"]');await p.waitForTimeout(150);
r=await ev(()=>{var v=S.veh[S.veh.length-1];return [v.def,v.llanta,!!v.foto,v.n]});ok(r[0]===true&&r[1]==='295/75R22.5'&&r[2],'30 · el vehículo queda con DEF, llanta e imagen',r);
await ev(()=>{var v=S.veh[S.veh.length-1];v.def=false;v.defPreg78=null;S.tab.admin='vehiculos';S.vehOpen=null;render()});ok(await ev(()=>!!document.querySelector('[data-x="def78"]')),'30 · diésel sin respuesta: pregunta "¿Usa DEF?" una vez');
// 21/22 · bodega
await ev(()=>{S.ub68={t:'bod',id:S.bods[0].id,p:2,lat:32.5,lng:-117,dir78:'Calle 5, Zona Centro, 22000 Tijuana, B.C.'};render()});r=await ev(()=>[document.getElementById('ub78n').value,document.getElementById('ub78d').value]);
await ev(()=>{S.ub68.nm78='';render()});await ck('[data-act="ub68si"]');await p.waitForTimeout(100);r=await ev(()=>[S.bods[0].n,S.bods[0].dir]);ok(/Bodega/.test(r[0])&&r[0]!=='Bodega Banderilla'&&/Zona Centro/.test(r[1]),'21/22 · al guardar la ubicación cambian el nombre y la dirección de la bodega',r);
// 24 · lo que pasó hoy minimizado
r=await ev(()=>{S.rcv={p:0};var h=rcHTML();S.rcv=null;return h});ok(!/data-k="rcact"/.test(r)||/<details class="card" data-k="rcact78"(?! open)/.test(r),'24 · "Lo que pasó hoy en su ruta" sale minimizado');
// 25b · Aprende la app
await ev(()=>{S.tab.admin='inicio';S.aj=false;render()});r=await ev(()=>{var b=document.createElement('button');b.dataset.act='aprendeir';b.dataset.t='clientes';b.innerHTML='<span class="t">Agregar un cliente</span>';document.body.appendChild(b);b.click();b.remove();return S.wz&&S.wz.k});ok(r==='cli','25b · "Agregar un cliente" abre el alta');await ev(()=>{S.wz=null;render()});
// 29 · fruta apartada y disponible
r=await ev(()=>{S.inv.maduras=20;S.cli.forEach(c=>c.ped=null);var a=S.cli[0],b2=S.cli[1];a.ped={R:8,M:0,cuando:'hoy'};b2.ped={R:5,M:0,cuando:'hoy'};var d=dispo79();return [d.R,d.a.R]});ok(r[0]===7&&r[1]===13,'29 · lo apartado para pedidos se descuenta de lo disponible',r);
await ev(()=>{S.tab.admin='bodega';render()});ok(/Apartado para pedidos de hoy: 13 cajas/.test(await ev(()=>document.querySelector('main').innerText)),'29 · Bodega enseña lo apartado');
await ev(()=>{S.tab.admin='inicio';render();S.pw={paso:5,cli:String(S.cli[2].id),R:'10',M:'',nota:'',cuando:'hoy',ch:1};render()});r=await ev(()=>document.getElementById('pwov').innerText);
ok(/No alcanza/.test(r)&&/Cambiar la cantidad/.test(r)&&/Dejarlo para mañana/.test(r),'29 · registrar pedido sin fruta: "No alcanza" con opciones',r.slice(0,120));ok(/Precio especial solo para este pedido/.test(r),'26 · el pedido trae "Precio especial solo para este pedido"');
await ev(()=>{S.pw.paso=0;render()});ok(/¿Cómo te lo pidió\?/.test(await ev(()=>document.getElementById('pwov').innerText))&&await ev(()=>document.querySelector('#pwov b').textContent==='Pedido'),'26 · "¿Cómo te lo pidió?" WhatsApp / llamada / en persona');
await ev(()=>{S.pw.paso=5;S.pw.cuando='mañana';S.pw.R='200';render()});ok(/Mete .* a madurar hoy/.test(await ev(()=>document.getElementById('pwov').innerText)),'29 · para mañana sin fruta: sugiere meter a madurar');
// 26 · permiso del chofer: 5 minutos
r=await ev(()=>{S.pw=null;var c=S.cli[3];S.pePide=[{id:1,c:c.id,ch:1,R:200,M:0,t:Date.now(),f:iso(TODAY),est:'pend'}];S.tab.admin='inicio';render();return !!document.querySelector('[data-x="pe79"] .mayreloj')});ok(r,'26 · al administrador le sale la solicitud con el reloj de 5 minutos');
await ck('[data-act="pe79r"][data-v="1"]');r=await ev(()=>{var c=S.cli[3];return [S.pePide[0].est,c.ppR,!!c.ppUna]});ok(r[0]==='ok'&&r[1]==='200'&&r[2],'26 · "Sí, autorizar": el precio especial queda para esa entrega',r);
r=await ev(()=>{S.pePide=[{id:2,c:S.cli[4].id,ch:1,R:190,M:0,t:Date.now()-6*60000,f:iso(TODAY),est:'pend'}];peVence79();return [S.pePide[0].est,(S.rutaAv[1]||[]).slice(-1)[0]]});ok(r[0]==='tiempo'&&/No se autorizó por ahora/.test(r[1]),'26 · sin respuesta en 5 minutos: "No se autorizó por ahora"',r);
// 17 · historial y entrega
r=await ev(()=>{S.role='rep';var vh=vehHoy();S.inspHist=[];inspMarca(vh,chofN(S.chofHoy),{tipo:'dia',r:{0:'bien',1:'bien',2:'bien',3:'bien'},n:{},f:{},todo79:true,t079:Date.now()-40000});return S.inspHist.length&&S.inspHist[0]});ok(r&&r.todo===true&&r.dur>=39,'17 · la revisión queda en el historial (quién, hora, cuánto tardó, si usó "Todo lo demás bien")',r);
await ev(()=>{S.cierre.sent=false;S.cierre.ev79=null;S.tab.rep='cierre';S.cierreP=5;render()});await p.waitForTimeout(150);ok(/¿Lo entregas en las mismas condiciones\?/.test(await ev(()=>document.querySelector('main').innerText)),'17 · al cierre pregunta si entrega el vehículo igual');
await ck('[data-act="enviar"]');await p.waitForTimeout(150);ok(await ev(()=>!S.cierre.sent),'17 · sin contestar no deja enviar');
await ck('[data-act="ev79"][data-v="1"]');await ck('[data-act="enviar"]');await p.waitForTimeout(300);ok(await ev(()=>{var x=S.inspHist[0];return !!(x.ent&&x.ent.ok===true)}),'17 · "Sí, igual": queda anotado en el historial');
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
