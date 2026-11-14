/* 7.5 · lotes de fruta madura (53), pedidos (57), reportar un problema (56), ubicaciones (58) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await b.newPage({viewport:{width:400,height:860}});await p.addInitScript(()=>{window.__pnTest=1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};S.tutVisto={admin:true};S.cajaAyerSkip=true;S.tab.admin='bodega';var v=vidaDias();(S.madL||[]).forEach(function(x,i){x.dia=iso(new Date(TODAY.getTime()-(v+2+i)*864e5))});render()});
const click=s=>ev(s=>{const e=document.querySelector(s);if(!e)return 'NO '+s;e.click();return 'ok'},s);
/* 53 */
let r=await ev(()=>{var L=[...document.querySelectorAll('[data-x="antig65"] .lote[data-act="lt53"]')];return {n:L.length,madL:(S.madL||[]).length,p:L.map(l=>l.dataset.p)}});
ok(r.n>0&&r.n===r.madL,'cada lote pasado de tiempo se puede tocar',r);
const tot0=await ev(()=>({mad:S.inv.maduras,vac:S.inv.vacias,caja:cajaEsp(),w:cajasDonde().tot,kg:S.inv.kgMaduro}));
r=await ev(()=>{var k=S.madL.findIndex(x=>x.p==='R');var el=document.querySelector('.lote[data-k="'+k+'"]');el.click();return {k,ov:!!document.getElementById('lt53ov'),ops:document.querySelectorAll('#lt53ov [data-act="lt53op"]').length,q:S.madL[k].q}});
ok(r.ov&&r.ops===4,'al tocar: 4 opciones (se tiró, se remató, ya no está, salió a la venta)',r);const kR=r.k,qR=r.q;
await click('#lt53ov [data-act="lt53op"][data-v="tiro"]');await ev(()=>{S.lt53.q='2';render()});await click('#lt53ov [data-act="lt53ok"]');
r=await ev(()=>document.querySelector('#lt53ov').innerText);ok(/¿Seguro\?/.test(r),'pide ¿Seguro? antes de registrar');
await click('#lt53ov [data-act="lt53si"]');
r=await ev(t=>({mad:S.inv.maduras-t.mad,vac:S.inv.vacias-t.vac,w:cajasDonde().tot-t.w,merma:S.mermas[S.mermas.length-1].tipo}),tot0);
ok(r.mad===-2&&r.vac===2&&r.w===0&&r.merma==='Fruta tirada','se tiró 2 cajas: maduras −2, taras vacías +2, el total de taras no cambia; merma',r);
/* remate (roatán) */
await ev(k=>{S.madL[k].dia=iso(new Date(TODAY.getTime()-(vidaDias()+3)*864e5));render();document.querySelector('.lote[data-k="'+k+'"]').click()},kR);await click('#lt53ov [data-act="lt53op"][data-v="remate"]');
await ev(()=>{S.lt53.q='1';S.lt53.kg='20';S.lt53.pr='5';render()});await click('#lt53ov [data-act="lt53ok"]');await click('#lt53ov [data-act="lt53si"]');
r=await ev(t=>({mad:S.inv.maduras-t.mad,caja:Math.round((cajaEsp()-t.caja)*100)/100,w:cajasDonde().tot-t.w}),tot0);
ok(r.mad===-3&&r.caja===100&&r.w===0,'remate de 1 caja (20 kg a $5): maduras −1 más, la caja sube $100, taras cuadran',r);
/* salió a la venta: no cambia ningún número */
const n1=await ev(()=>({mad:S.inv.maduras,caja:cajaEsp(),tot:(S.madL||[]).reduce((a,x)=>a+x.q,0)}));
r=await ev(()=>{var k=S.madL.findIndex(x=>x.p==='R');S.madL[k].dia=iso(new Date(TODAY.getTime()-(vidaDias()+3)*864e5));render();document.querySelector('.lote[data-k="'+k+'"]').click();return S.madL[k].dia},null);
await click('#lt53ov [data-act="lt53op"][data-v="salio"]');await click('#lt53ov [data-act="lt53ok"]');await click('#lt53ov [data-act="lt53si"]');
r=await ev(t=>({mad:S.inv.maduras-t.mad,caja:cajaEsp()-t.caja,tot:(S.madL||[]).reduce((a,x)=>a+x.q,0)-t.tot}),n1);
ok(r.mad===0&&Math.abs(r.caja)<0.001&&r.tot===0,'"salió a la venta": no cambia inventario ni dinero',r);
/* ya no está → no sé (macho) */
r=await ev(()=>{var k=S.madL.findIndex(x=>x.p==='M');if(k<0)return null;var kg0=S.inv.kgMaduro;S.madL[k].dia=iso(new Date(TODAY.getTime()-(vidaDias()+3)*864e5));render();document.querySelector('.lote[data-k="'+k+'"]').click();return {kg0,q:S.madL[k].q}});
if(r){await click('#lt53ov [data-act="lt53op"][data-v="noesta"]');r.txt=await ev(()=>document.querySelector('#lt53ov').innerText);
 await click('#lt53ov [data-act="lt53sub"][data-v="nose"]');await ev(()=>{S.lt53.q='5';render()});await click('#lt53ov [data-act="lt53ok"]');await click('#lt53ov [data-act="lt53si"]');
 const kg1=await ev(()=>S.inv.kgMaduro);ok(Math.abs(kg1-(r.kg0-5))<0.001&&/Se vendió en bodega/.test(r.txt)&&/No sé/.test(r.txt),'"ya no está" pregunta si se vendió; "no sé" descuenta 5 kg',{kg1,kg0:r.kg0})}
r=await ev(()=>{var k=S.madL.findIndex(x=>x.p==='R');S.madL[k].dia=iso(new Date(TODAY.getTime()-(vidaDias()+3)*864e5));render();document.querySelector('.lote[data-k="'+k+'"]').click();S.lt53.op='tiro';S.lt53.paso=1;S.lt53.q='99999';render();document.querySelector('#lt53ov [data-act="lt53ok"]').click();var t=S.toast;S.lt53=null;render();return t});
ok(/solo hay/.test(r),'no deja tirar más de lo que hay',r);
/* 57 */
r=await ev(()=>{S.tab.admin='clientes';var c=S.cli.filter(x=>!x.oculto)[5];c.ped={R:3,M:20,cuando:'hoy',nota:''};S.chSt=S.chSt||{};Object.keys(S.chSt).forEach(id=>{(S.chSt[id].stops||[]).forEach(s=>{if(s.c===c.id)s.done=true})});S.stops.forEach(s=>{if(s.c===c.id)s.done=true});render();
 var card=document.querySelector('.p57');return {cid:c.id,btn:!!card.querySelector('[data-act="p57asg"][data-c="'+c.id+'"]'),txt:card.innerText}});
ok(r.btn&&/Recibido/.test(r.txt)&&/Chofer sin asignar/.test(r.txt),'pedido sin chofer: pasos y botón "Asignar chofer"',r.txt.slice(0,200));const cid=r.cid;
await click('.p57 [data-act="p57asg"][data-c="'+cid+'"]');r=await ev(()=>document.querySelectorAll('#p57ov [data-act="p57ch"]').length);ok(r>0,'sale la lista de choferes',r);
r=await ev(()=>{var b=document.querySelector('#p57ov [data-act="p57ch"]'),id=+b.dataset.id;b.click();var e=est57(cl(S.p57?S.p57.c:0)||{id:0});return id});
r=await ev(c=>{var e=est57(cl(c));return {ch:e.ch&&e.ch.n,av:JSON.stringify(S.rutaAv).indexOf('Pedido para hoy')>-1||JSON.stringify(S.rutaAv).indexOf('parada nueva')>-1,txt:document.querySelector('.p57').innerText}},cid);
ok(!!r.ch&&r.av,'asignado: queda en la ruta del chofer y le llega el aviso',r.ch);
ok(/asignado|en reparto/.test(r.txt)&&/Ver todos/.test(r.txt),'ya asignado: se ve chiquito y "Ver todos"',r.txt.slice(0,200));
/* 56 */
r=await ev(()=>{S.menu=true;render();var b=document.querySelector('.drawer [data-act="rp56"]');if(!b)return 'sin botón';b.click();return {ov:!!document.getElementById('rp56ov'),donde:S.rp56&&S.rp56.donde}});
ok(r.ov&&/Administrador/.test(r.donde),'menú → "Reportar un problema": sabe dónde estás',r);
r=await ev(()=>{document.querySelector('#rp56ov [data-act="rp56ok"]').click();return S.toast});ok(/Escribe qué pasó/.test(r),'pide escribir qué pasó',r);
r=await ev(()=>{S.rp56.txt='El botón no hace nada';S.rp56.g='traba';render();document.querySelector('#rp56ov [data-act="rp56ok"]').click();var p=S.probs.filter(x=>!x.auto).slice(-1)[0];return p&&{n:p.n,donde:p.donde,txt:p.txt,v:p.v!==undefined,q:p.q}});
ok(r&&r.n>=1&&r.txt==='El botón no hace nada','queda anotado con número',r);
r=await ev(()=>{S.help=true;render();return !!document.querySelector('[aria-labelledby="hlpT"] [data-act="rp56"]')});ok(r,'también en el "?"');
r=await ev(()=>{S.help=false;S.aj=true;var h=ajHTML();S.aj=false;return /Problemas reportados/.test(h)&&/Sacar el registro/.test(h)&&pr56Texto().indexOf('El botón no hace nada')>-1});ok(r,'Ajustes → "Problemas reportados" y el registro de texto');
r=await ev(()=>NB_SH.indexOf('probs')>-1);ok(r,'se sube a la nube');
/* 58 */
r=await ev(()=>{S.ub68={t:'bod',id:(bodPrincipal()||{id:1}).id,p:0};render();var o=document.getElementById('ub68ov');return o?[...o.querySelectorAll('[data-act]')].map(b=>b.dataset.act):[]});
ok(r.indexOf('ub68gps')>-1&&r.indexOf('ub68bus')>-1&&r.indexOf('ub68link')>-1,'ubicación: GPS, buscar y link',r);
r=await ev(()=>{S.ub68.link='https://www.google.com/maps/@32.5149,-117.0382,17z';document.querySelector('[data-act="ub68link"]').click();return {p:S.ub68.p,lat:S.ub68.lat,map:!!document.getElementById('ub68map'),t:document.getElementById('ub68ov').innerText}});
ok(r.p===2&&r.lat===32.5149&&r.map&&/¿Seguro que aquí es/.test(r.t),'link → mapa con pin para arrastrar y ¿Seguro?',r);
r=await ev(()=>{S.ub68.nm78='Bodega Otay';document.querySelector('[data-act="ub68si"]').click();var b=bodPrincipal();return {lat:b.lat,BOD:BOD.lat}});ok(r.lat===32.5149&&r.BOD===32.5149,'bodega guardada y los mapas la usan',r);
r=await ev(()=>{S.ub68={t:'bod',id:1,p:1,q:'bodega'};render();document.querySelector('[data-act="ub68ir"]').click();return S.ub68.err});ok(/celular/.test(r),'buscar sin la app del celular: dice por qué',r);
r=await ev(()=>{S.ub68=null;var n=provNames()[0];var h=fiProv({id:n,t:'prov'});S.fiTab=S.fiTab||{};S.fiTab['prov:'+n]='dat';h=fiProv({id:n,t:'prov'});return /data-act="ub68" data-t="prov"/.test(h)});ok(r,'proveedor → Datos: botón de ubicación');
r=await ev(()=>{var c=S.cli[0];S.fiTab['cli:'+c.id]='dat';return /data-act="ub68" data-t="cli"/.test(fiCli({id:c.id,t:'cli'}))});ok(r,'cliente → Datos: botón de ubicación');
r=await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.salida.ok=true;S.tab.rep='entrega';S.cur=0;render();var x=!!document.querySelector('[data-act="cfub70"]');S.role='admin';render();return x});ok(r,'chofer en la entrega: "Confirmar la ubicación aquí"');
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
