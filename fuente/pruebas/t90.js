/* 9.0 · 85–90: foto en grande, aviso al quitar clientes, tutorial y ruta del administrador, vehículo ocupado, textos del cierre */
const {chromium}=require('playwright');const SC=process.argv[2]||'/tmp';(async()=>{const b=await chromium.launch();
let ok=0,fail=0;const T=(n,c,x)=>{if(c){ok++;console.log('OK  ',n)}else{fail++;console.log('FAIL',n,x===undefined?'':JSON.stringify(x))}};
async function nueva(){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p._e=[];p.on('pageerror',e=>p._e.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
 await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
 await p.evaluate(()=>{var U=S.setup;U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Tornado',pl:'B2',plEdo:'Baja California',comb:'Gasolina',img:0,odo:5000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];
  U.cli=[{n:'C1',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'C2',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'C3',a:'z',tel:'3',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar()});return p}
/* 85 */
let p=await nueva();
let r=await p.evaluate(()=>{var ch=S.choferes.find(c=>c.n==='Danu').id;S.chofHoy=ch;arLoad(chNuevo(ch));var c=document.createElement('canvas');c.width=40;c.height=30;var src=c.toDataURL('image/jpeg');S.salida.fotos={};FOTOS.forEach(x=>S.salida.fotos[x[0]]=src);S.salida.ok=true;
 S.role='admin';S.pinOk[pinKey()]=true;S.fv82=ch;render();return document.querySelectorAll('#fv82 img').length});
await p.click('#fv82 img');await p.waitForTimeout(250);
r=await p.evaluate(()=>{var o=document.getElementById('fotov'),r=o.getBoundingClientRect(),el=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {z:+getComputedStyle(o).zIndex,arriba:o.contains(el)}});
T('85 La foto del vehículo se abre encima de la ventana de fotos',r.z>99&&r.arriba,r);await p.close();
/* 86 */
p=await nueva();
r=await p.evaluate(()=>{var ch=S.choferes.find(c=>c.n==='Danu').id,B=S.choferes.find(c=>c.n==='Beto').id;S.role='rep';S.chofHoy=ch;S.pinOk['c:'+ch]=true;arLoad(chNuevo(ch));var C=S.cli.slice(0,3).map(c=>c.id);S.stops=C.map(c=>({c}));S.cur=0;S.salida.ok=true;S.tab.rep='entrega';render();
 /* el admin le pasa C1 (su siguiente) a Beto */
 ovPon81(hoy81(),C[0],B);op81(ch,'quit',C[0]);render();var o=document.getElementById('av90');return {txt:o&&o.textContent,tab:S.tab.rep,stops:S.stops.map(s=>s.c),C,sig:cl(S.stops[curStop()].c).n}});
T('86 Le sale "Ya no vayas con C1 · lo lleva Beto"',/Ya no vayas con C1/.test(r.txt||'')&&/lo lleva Beto/.test(r.txt||''),r.txt);T('86 Su siguiente parada ahora es C2',/siguiente parada ahora es C2/.test(r.txt||'')&&r.sig==='C2',r);
T('86 Estaba en la entrega de C1: sale de la entrega y C1 ya no está',r.tab==='ruta'&&r.stops.indexOf(r.C[0])<0&&/se canceló/.test(r.txt||''),r);
await p.click('[data-act="av90x"]');await p.waitForTimeout(150);r=await p.evaluate(()=>({av:!!document.getElementById('av90'),s:S.av90}));T('86 "Entendido" la cierra',!r.av&&!r.s,r);
r=await p.evaluate(()=>{var ch=S.chofHoy;op81(ch,'quit',S.stops[1].c);ovPon81(hoy81(),S.stops[1].c,0);render();var o=document.getElementById('av90');return o&&o.textContent});T('86 Quitar uno que no es el siguiente: también avisa ("hoy no se visita")',/Ya no vayas con C3/.test(r||'')&&/hoy no se visita/.test(r||'')&&/siguiente parada es C2/.test(r||''),r);
await p.screenshot({path:SC+'/t90av.png'});await p.close();
/* 88 / 87 / 90 */
p=await nueva();
r=await p.evaluate(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';S.popVisto={admin:iso(TODAY)};S.admRep85=iso(TODAY);var D=S.choferes.find(c=>c.n==='Danu').id;S.rt81={dia:'hoy',sel:{}};S.rt81.sel[S.cli[0].id+'|'+D]=1;aplica83(ADM85);S.rt81=null;render();
 var m=document.querySelector('main'),b=m.querySelector('[data-act="arentrar"]'),k=[...m.children].indexOf(b),a=[...m.children].indexOf(m.querySelector('[data-x="adm85"]'));return {t:b&&b.textContent,k,a}});
T('88 "Mi ruta de hoy" cuenta 1 cliente sin entrar',/1 cliente/.test(r.t||''),r.t);T('88 "Mi ruta de hoy" sale justo debajo de "¿Repartes hoy?"',r.k===r.a+1,r);
await p.click('[data-act="arentrar"]');await p.waitForTimeout(300);
r=await p.evaluate(()=>({q:!!S.arQ,on:S.arOn,role:S.role,stops:S.stops.map(s=>s.c),bar:!!document.querySelector('[data-x="ar90b"]')}));T('88 Ya no pregunta otra vez "¿Vas a salir a repartir?"',!r.q&&r.on&&r.role==='rep'&&r.stops.length===1,r);T('88 Barra "Estás repartiendo · Volver a administrador"',r.bar);
r=await p.evaluate(()=>{var t=document.querySelector('main').textContent;return {ub:/administrador ve tu ubicación/.test(t),no:/¿No eres/.test(t)}});T('90 Sin "el administrador ve tu ubicación" ni "¿No eres…?"',!r.ub&&!r.no,r);
/* se pasa otro cliente estando ya en su ruta */
r=await p.evaluate(()=>{var D=S.chSt&&Object.keys(S.chSt)[0];ovPon81(hoy81(),S.cli[1].id,ADM85);op81(ADM85,'add',S.cli[1].id);render();return S.stops.map(s=>s.c).length});T('88 Lo que se pasa en Rutas le llega aunque ya esté en su ruta',r===2,r);
/* tutorial */
r=await p.evaluate(()=>{S.tut={k:'rep',i:0,prev:{tab:'ruta'}};render();var k=S.tut&&S.tut.k;var ok=[];if(S.tut)TUT[k].forEach(function(st,i){S.tut.i=i;render();ok.push(!!tutBlanco(st))});S.tut=null;render();return {k,ok}});
T('87 En su ruta le sale su propio tutorial (no el del chofer)',r.k==='ar90',r);T('87 Todos sus pasos señalan algo que sí está',r.ok.length===3&&r.ok.every(x=>x),r);
await p.screenshot({path:SC+'/t90ar.png'});
/* cierre */
r=await p.evaluate(()=>{S.salida.ok=true;S.tab.rep='cierre';var txt='';for(var i=0;i<7;i++){S.cierreP=i;render();txt+=document.querySelector('main').textContent+' '}return {adm:(txt.match(/[^.]{0,40}administrador[^.]{0,40}/g)||[]),entregar:/Debes entregar|Efectivo a entregar/.test(txt)}});
T('90 El cierre ya no dice entregar al administrador',!r.entregar&&!r.adm.some(x=>/entreg|Enviar cierre al/.test(x)),r);
await p.click('[data-act="arsalir"]');await p.waitForTimeout(200);r=await p.evaluate(()=>({role:S.role,on:S.arOn}));T('88 "Volver a administrador" regresa',r.role==='admin'&&!r.on,r);
T('Sin errores (admin)',!p._e.length,p._e);await p.close();
/* 89 */
p=await nueva();
r=await p.evaluate(()=>{var D=S.choferes.find(c=>c.n==='Danu').id,B=S.choferes.find(c=>c.n==='Beto').id,np=S.veh.find(v=>v.n==='NP300').id;
 S.chSt=S.chSt||{};S.chSt[B]=chNuevo(B);S.chSt[B].vehHoy=np;S.chSt[B].salida.ok=true;
 S.role='rep';S.chofHoy=D;S.pinOk['c:'+D]=true;arLoad(chNuevo(D));S.vehHoy=np;S.salida.ok=false;S.tab.rep='ruta';render();
 var libres=vehLibres(D).map(v=>v.n);var oc=document.querySelector('[data-x="veh90"]');return {libres,oc:oc&&oc.textContent,veh:vehHoy().n}});
T('89 NP300 (ya salió con Beto) no está entre los libres',r.libres.indexOf('NP300')<0&&r.libres.indexOf('Tornado')>-1,r);T('89 Le sale "NP300 · ocupado: lo trae Beto"',/NP300 · ocupado: lo trae Beto/.test(r.oc||''),r.oc);T('89 Le cambia solo a uno libre',r.veh==='Tornado',r);
r=await p.evaluate(()=>{var np=S.veh.find(v=>v.n==='NP300').id;S.vehHoy=np;var hit=false;var b=document.createElement('button');b.dataset.act='iniciar';document.body.appendChild(b);b.click();b.remove();return {ok:S.salida.ok,veh:vehHoy().n}});T('89 No deja iniciar con un vehículo ocupado',!r.ok&&r.veh==='Tornado',r);
r=await p.evaluate(()=>{var B=S.choferes.find(c=>c.n==='Beto').id;S.chSt[B].cierre.sent=true;return vehLibres(S.chofHoy).map(v=>v.n)});T('89 Cuando el otro cierra, se libera',r.indexOf('NP300')>-1,r);
r=await p.evaluate(()=>{var ids=S.veh.map(v=>v.id);S.veh[1].id=S.veh[0].id;S.role='admin';render();var ids2=S.veh.map(v=>v.id);return {ids,ids2,av:S.avPrecio.filter(x=>/número interno/.test(x))}});
T('89b Al darlos de alta, cada vehículo tiene su propio número',r.ids[0]!==r.ids[1],r);T('89b Los que ya estaban repetidos se arreglan solos y avisa',r.ids2[0]!==r.ids2[1]&&r.av.length===1,r);
r=await p.evaluate(()=>{var B=S.choferes.find(c=>c.n==='Beto').id,np=S.veh.find(v=>v.n==='NP300');S.chSt[B].cierre.sent=false;S.chSt[B].vehHoy=np.id;S.role='rep';S.tab.rep='ruta';render();var sel=document.createElement('select');sel.id='ivtest';S.veh.forEach(v=>{var o=document.createElement('option');o.value=v.id;o.textContent=v.n;sel.appendChild(o)});document.body.appendChild(sel);vehSel90();var r=[...sel.options].map(o=>o.textContent+'|'+o.disabled);sel.remove();return r});
T('89 En la revisión, el ocupado no se puede escoger',r.some(x=>/NP300 \(ocupado: Beto\)\|true/.test(x))&&r.some(x=>/Tornado\|false/.test(x)),r);
await p.close();
console.log(ok+' OK · '+fail+' FAIL');await b.close()})();
