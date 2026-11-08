const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.__ubTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const click=async s=>{await ev(s=>{var e=document.querySelector(s);if(!e)throw new Error('no '+s);e.click()},s);await W(250)};
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};window.__snap=JSON.stringify(S)});
// ---- proveedor con ubicación aproximada: el chofer la actualiza con un toque
await ev(()=>{S.role='rep';S.basc[0].foto='x';vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].basId='1';v.par[0].tara=4000;v.started=true;v.ftSal='x';v.k='y0';var d=provD(v.par[0].prov);d.lat=19.7;d.lng=-96.8;d.ubAprox=true;d.foto='x';render()});await W(200);
await click('#vwov [data-act="vwnext"]');let r=await ev(()=>({m:S.ub&&S.ub.modo,txt:(document.getElementById('ubov')||{}).innerText}));ok(r.m==='act'&&/Actualiza la ubicación/.test(r.txt),'aproximada: al llegar sale "Actualizar ubicación"',r.m);
await click('[data-act="ubgps"]');await W(300);
r=await ev(()=>{var d=provD(S.vw.par[0].prov);return {lat:d.lat,ap:d.ubAprox,por:d.ubPor,k:S.vw.k,ub:!!S.ub}});ok(r.lat!==19.7&&r.ap===false&&r.k==='c0'&&!r.ub,'un toque: guarda la exacta y sigue el viaje',r);
// siguiente viaje: ya no pide nada
await ev(()=>{S.vws=[];vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].basId='1';v.par[0].tara=4000;v.started=true;v.ftSal='x';v.k='y0';render()});await W(200);
await click('#vwov [data-act="vwnext"]');ok(await ev(()=>!S.ub&&S.vw.k==='c0'),'ya exacta: el chofer no la puede cambiar ni se la vuelve a pedir');
// admin: ficha del proveedor muestra el estado y deja pegar
r=await ev(()=>{S.role='admin';S.vws=[];S.vw=null;var n=Object.keys(S.provDir)[0];S.pvEdit=n;S.fiTab=S.fiTab||{};S.fiTab['prov:'+n]='dat';var h=fiProv({t:'prov',id:n});return {pega:/data-ubpega="prov:/.test(h),txt:/Ubicación/.test(h)}});ok(r.pega&&r.txt,'admin: ficha del proveedor con ubicación y campo para pegarla',r);
// ---- cliente: el chofer agrega, no cambia
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.inv.reparto=50;var i=curStop();S.cur=i;var c=cl(S.stops[i].c);c.tel='228 111 2222';c.recibe='';c.foto=null;resetDraft(c);S.tab.rep='entrega';render()});await W(200);
await click('.ubcard [data-act="ubcli"]');r=await ev(()=>({tel:!!document.getElementById('ubtel'),rec:!!document.getElementById('ubrec')}));ok(!r.tel&&r.rec,'chofer: el teléfono que ya hay no se puede cambiar; lo vacío sí se llena',r);
await p.fill('#ubrec','Don Pepe');await click('[data-act="ubsave"]');r=await ev(()=>{var c=cl(S.stops[S.cur].c);return [c.tel,c.recibe]});ok(r[0]==='228 111 2222'&&r[1]==='Don Pepe','guardó lo nuevo sin tocar lo que había',r);
// chofer agrega teléfono → aviso
await ev(()=>{var c=cl(S.stops[S.cur].c);c.tel='';render()});await click('.ubcard [data-act="ubcli"]');await p.fill('#ubtel','228 999 0000');await click('[data-act="ubsave"]');
r=await ev(()=>{var c=cl(S.stops[S.cur].c);return {por:c.telPor,av:S.avPrecio.slice(-1)[0]}});ok(r.por!=null&&/agregó el teléfono/.test(r.av),'chofer agrega teléfono: queda "sin confirmar" y le avisa al admin',r);
// ---- admin confirma el número
await ev(()=>{S.role='admin';var c=cl(S.stops[S.cur].c);S.tab.admin='clientes';S.openCli=c.id;S.fiTab=S.fiTab||{};S.fiTab['cli:'+c.id]='dat';render()});await W(300);
r=await ev(()=>{var t=(document.getElementById('fiov')||{}).innerText||'';return {sin:/Sin confirmar/.test(t),btn:!!document.querySelector('[data-act="telconf"]')}});ok(r.sin&&r.btn,'ficha del cliente: "Sin confirmar" y botón Confirmar número',r);
await click('[data-act="telconf"]');r=await ev(()=>(document.getElementById('fiov')||{}).innerText||'');ok(/Número confirmado hace un momento/.test(r),'confirmado: dice hace cuánto');
r=await ev(()=>{var c=cl(S.stops[S.cur].c);c.telConf.t=Date.now()-3*864e5;render();return /confirmado hace 3 días/.test(document.getElementById('fiov').innerText)});ok(r,'"Número confirmado hace 3 días"');
// número del chofer
r=await ev(()=>{var c=cl(S.stops[S.cur].c),ch=S.choferes.filter(x=>x.id===3)[0];ch.tel='228 777 6666';c.tel='2287776666';render();return /Es el teléfono de/.test(document.getElementById('fiov').innerText)});ok(r,'avisa si el teléfono es el de un chofer');
// ---- crédito por chofer
await ev(()=>{S=JSON.parse(window.__snap);S.role='admin';S.tab.admin='personal';S.openCh=3;render()});await W(300);
ok(await ev(()=>!!document.querySelector('[data-chcr="3:crCli"]')&&!!document.querySelector('[data-chcr="3:crMax"]')),'ficha del chofer: máximo por cliente y tope total');
await p.fill('[data-chcr="3:crCli"]','2500');await ev(()=>document.querySelector('[data-chcr="3:crCli"]').dispatchEvent(new Event('change',{bubbles:true})));await W(200);
r=await ev(()=>{var c=S.cli.filter(x=>String(x.chofer)==='3'&&!x.oculto&&x.limMan==null)[0];buroDe(c).n=0;render();var o=S.cli.filter(x=>String(x.chofer)!=='3'&&!x.oculto&&x.limMan==null)[0];buroDe(o).n=0;render();return {c:limEf(c),lim:c.lim,o:limBase(o),cf:crCfg().crCli}});ok(r.c===2500&&r.lim===2500&&r.o===+r.cf,'sus clientes: $2,500 en todos lados; los de otros choferes no cambian',r);
await p.fill('[data-chcr="3:crMax"]','8000');await ev(()=>document.querySelector('[data-chcr="3:crMax"]').dispatchEvent(new Event('change',{bubbles:true})));await W(200);
r=await ev(()=>chTope(S.choferes.filter(x=>x.id===3)[0]));ok(r===8000,'tope total cambiado',r);
await click('[data-act="chcrdef"]');r=await ev(()=>{var ch=S.choferes.filter(x=>x.id===3)[0];return [ch.crCli,ch.crMax]});ok(r[0]==null&&r[1]==null,'"Usar los de Ajustes" regresa los dos',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
