const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''))};
const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>{window.__pnTest=1;window.__ubTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
const img=require('fs').readFileSync('v50/n0.png');const has=s=>ev(s=>!!document.querySelector(s),s);const click=async s=>{await ev(s=>{var e=document.querySelector(s);if(!e)throw new Error('no '+s);e.click()},s);await W(250)};
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};window.__snap=JSON.stringify(S)});
// ---- admin programa el viaje
await ev(()=>{S.role='admin';S.tab.admin='cargas';vwNuevo(null);S.vw.quien=+S.choferes.filter(c=>c.id!==2)[0].id;var L=vwSteps();S.vw.k='prov';var d=provD(S.vw.par[0].prov);d.lat=null;d.lng=null;render()});await W(300);
let r=await ev(()=>{var o=document.querySelector('#vwbs0');return {nueva:!!(o&&o.querySelector('option[value="__nueva"]')),sin:/Sin ubicación/.test(document.getElementById('vwov').innerText),pega:!!document.querySelector('[data-ubpega^="prov:"]'),pide:!!document.querySelector('[data-act="ubpide"]')}});ok(r.nueva&&r.sin&&r.pega&&r.pide,'admin: báscula nueva, aviso sin ubicación, pegar link y pedir al chofer',r);
await p.fill('[data-ubpega^="prov:"]','https://www.google.com/maps/@19.6123,-96.8811,17z');await ev(()=>document.querySelector('[data-ubpega^="prov:"]').dispatchEvent(new Event('change',{bubbles:true})));await W(200);
r=await ev(()=>{var d=provD(S.vw.par[0].prov);return [d.lat,d.lng]});ok(r[0]===19.6123&&r[1]===-96.8811,'admin: pegar link de Maps guarda la ubicación',r);
await ev(()=>{S.vw.par[0].basId='__nueva';render()});await W(200);ok(await has('#vwnb0'),'admin: báscula nueva pide el nombre');
// ---- chofer: báscula sin ubicación
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.basc[0].lat=null;S.basc[0].lng=null;S.basc[0].foto=null;vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].basId='1';v.started=true;v.ftSal='x';v.k='camino';var d=provD(v.par[0].prov);d.foto=null;render()});await W(300);
ok(/no tienen? ubicación|no tiene ubicación/.test(await ev(()=>document.getElementById('vwov').innerText)),'chofer: aviso de lugares sin ubicación al salir');
await click('#vwov [data-act="vwnext"]');ok(await has('#ubov')&&await ev(()=>S.vw.k==='camino'),'Ya llegué: pide guardar la báscula (no avanza)');
ok(await ev(()=>document.querySelector('[data-act="ubsave"]').disabled),'Guardar desactivado sin GPS');
await click('[data-act="ubgps"]');await W(200);ok(/Seguro que ya estás/.test(await ev(()=>document.getElementById('ubov').innerText)),'pregunta si de verdad está ahí');
await click('[data-act="ubsi"]');await p.setInputFiles('#ubF',{name:'b.png',mimeType:'image/png',buffer:img});await W(700);
await click('[data-act="ubsave"]');await W(300);
r=await ev(()=>({lat:S.basc[0].lat,foto:!!S.basc[0].foto,k:S.vw.k,ov:!!document.getElementById('ubov'),av:S.avPrecio.slice(-1)[0]}));ok(r.lat!=null&&r.foto&&r.k==='b0'&&!r.ov&&/guardó la ubicación/.test(r.av),'guarda báscula con foto, avisa y sigue el viaje',r);
// proveedor con ubicación pero sin foto: sugiere foto, "Ahora no" sigue
await ev(()=>{var v=S.vw;v.par[0].tara=4000;v.k='y0';var d=provD(v.par[0].prov);d.lat=19.6;d.lng=-96.9;d.foto=null;render()});await W(200);
await click('#vwov [data-act="vwnext"]');ok(await ev(()=>!!S.ub&&S.ub.modo==='foto'),'al llegar con el proveedor sin foto: sugiere tomarla');
await click('#ubov [data-act="ubx"]');await W(300);ok(await ev(()=>S.vw.k==='c0'&&!S.ub),'"Ahora no" sigue el viaje',await ev(()=>S.vw.k));
// foto de noche y ahora hay luz
r=await ev(()=>{var d=provD(S.vw.par[0].prov);d.foto='x';var n=new Date();n.setHours(21,0,0,0);d.fotoH=n.getTime();return {sug:ubFotoSug(d),luz:ubHayLuz()}});ok(r.sug===r.luz,'foto de noche: se sugiere actualizar cuando hay luz',r);
// báscula nueva sin nombre: el chofer la nombra
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].basId='__nueva';v.par[0].nbn='';v.started=true;v.ftSal='x';v.k='camino';render()});await W(200);
await click('#vwov [data-act="vwnext"]');await click('[data-act="ubgps"]');await W(200);await click('[data-act="ubsi"]');await click('[data-act="ubsave"]');
ok(await ev(()=>!!S.ub),'báscula nueva: no guarda sin nombre');
await p.fill('#ubn','Báscula El Molo');await click('[data-act="ubsave"]');await W(300);
r=await ev(()=>({n:S.basc.slice(-1)[0].n,bid:S.vw.par[0].basId,id:S.basc.slice(-1)[0].id,k:S.vw.k,txt:document.getElementById('vwov').innerText.slice(0,160)}));ok(r.n==='Báscula El Molo'&&+r.bid===r.id&&r.k==='b0'&&/El Molo/.test(r.txt),'báscula nueva queda registrada y ligada al viaje',r);
// el admin dijo "no pedirla"
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.basc[0].lat=null;vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].basId='1';v.par[0].noUb=true;v.started=true;v.ftSal='x';v.k='camino';S.basc[0].foto='x';render()});await W(200);
await click('#vwov [data-act="vwnext"]');ok(await ev(()=>!S.ub&&S.vw.k==='b0'),'si el admin dijo "no pedirla" no se pide');
// ---- reparto: cliente sin ubicación
await ev(()=>{S=JSON.parse(window.__snap);S.role='rep';S.salida.ok=true;S.inv.reparto=50;S.inv.repartoKg=100;var i=curStop();S.cur=i;var c=cl(S.stops[i].c);c.lat=null;c.lng=null;c.foto=null;c.tel='';resetDraft(c);S.d.R=1;S.tab.rep='entrega';render()});await W(300);
ok(await has('.ubcard [data-act="ubcli"]'),'entrega: tarjeta para guardar la ubicación del cliente');
r=await ev(()=>entValida());ok(r&&/ubicación/.test(r[1]),'no deja registrar la entrega sin ubicación',r);
await click('.ubcard [data-act="ubcli"]');await click('[data-act="ubgps"]');await W(200);await click('[data-act="ubsi"]');await p.fill('#ubtel','228 555 1234');await click('[data-act="ubsave"]');await W(300);
r=await ev(()=>{var c=cl(S.stops[S.cur].c);return {lat:c.lat,tel:c.tel,val:entValida(),card:(document.querySelector('.ubcard')||{}).innerText}});ok(r.lat!=null&&r.tel==='228 555 1234'&&!r.val&&/foto de la fachada/.test(r.card||''),'ubicación guardada: ya deja entregar y pide completar la foto',r);
// cliente nuevo en la calle
await ev(()=>{S.tab.rep='ruta';render()});await W(300);await click('[data-act="calle"][data-reg="1"]');await W(300);
console.log(await ev(()=>({cur:S.cur,c:cl(S.stops[S.cur].c),d:S.d,tab:S.tab.rep,txt:document.querySelector('main').innerText.slice(0,400)})));r=await ev(()=>{S.d.rn='Abarrotes Lupe';S.d.R=1;render();return entValida()});ok(r&&/ubicación/.test(r[1]),'cliente nuevo: la ubicación es obligatoria',r);
await click('[data-act="gps"]');ok(await has('#ubov'),'el botón GPS del cliente nuevo abre la pantalla real');
await click('[data-act="ubgps"]');await W(200);await click('[data-act="ubsi"]');await click('[data-act="ubsave"]');await W(200);
ok(await ev(()=>!entValida()),'con ubicación ya se puede registrar',await ev(()=>entValida()));
await p.screenshot({path:'v50/ub_cli.png'});
r=await ev(()=>{var c=cl(S.stops[curStop()].c);c.n='Abarrotes Lupe';c.rapida=false;c.oculto=false;render();return S.avPrecio.filter(x=>/dio de alta un cliente nuevo: Abarrotes Lupe/.test(x)).length});ok(r===1,'aviso al admin: cliente nuevo del chofer (una sola vez)',r);
r=await ev(()=>{S.role='rep';S.vws=[];S.ub=null;vwNuevo(null);var v=S.vw;v.par=[v.par[0]];v.par[0].basId='__nueva';v.started=true;v.ftSal='x';v.k='camino';render();var a=[...document.querySelectorAll('#vwov a')].find(x=>/Google Maps/.test(x.textContent));return a&&a.href});ok(/maps\/search/.test(r||''),'lugar sin ubicación: Maps busca por nombre',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
