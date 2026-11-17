/* 8.9 · 79–82: ubicación escrita en la dirección, odómetro, pantalla del chofer, color del roatán */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:100000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Benavides',a:'32.544337,-116.930885',tel:'6641112233',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();window.DANU=S.choferes.find(c=>c.n==='Danu').id});
// 80
r=await ev(()=>{var c=S.cli.find(x=>x.n==='Benavides');c.lat=null;c.lng=null;c.a='32.544337,-116.930885';S.role='rep';S.chofHoy=DANU;S.pinOk['c:'+DANU]=true;arLoad(chNuevo(DANU));S.salida.ok=true;S.inv.reparto=70;S.inv.repartoKg=800;S.cur=0;resetDraft(c);S.tab.rep='entrega';render();var t=document.querySelector('main').innerText;return {lat:c.lat,lng:c.lng,a:c.a,conf:!!c.locConf,guarda:/Guarda la ubicación/.test(t),abajo:/Todavía no tiene ubicación/.test(t),log:(c.ubLog89||[]).length}});
ok(r.lat===32.544337&&r.lng===-116.930885&&!r.guarda&&!r.abajo&&r.conf&&r.log===1,'80 · cliente con la coordenada en la dirección: se toma como su ubicación y ya no la pide (ni arriba ni abajo)',r);
r=await ev(()=>{var c=S.cli.find(x=>x.n==='Benavides');c.lat=null;c.lng=null;c.a='Calle 5';S.ub={k:'cli',id:c.id,n:c.n,key:'c'+c.id,obj:c,lat:32.5,lng:-117,est:''};ubGuardar();return {lat:c.lat,log:(c.ubLog89||[]).slice(-1)[0]}});
ok(r.lat===32.5&&r.log&&/Guardar ubicación aquí/.test(r.log.via),'80 · si ya se escogió el punto, se guarda aunque no se confirmara, y queda registrado',r);
// 79
r=await ev(()=>{var v=S.veh[0];v.odo=100000;S.vws=[{veh:v.id,odoIni:'100100',odoFin:'100400'}];arLoad(chNuevo(DANU));S.salida.ok=false;S.tab.rep='ruta';render();var a=num(S.cierre.odoIni);S.salida.ok=true;S.cierre.odo=100520;S.cierre.sent=true;render();return {ini:a,vodo:v.odo}});
ok(r.ini===100400&&r.vodo===100520,'79 · odómetro inicial = el último del vehículo (viaje de carga: 100,400); al mandar el cierre se guarda el final (100,520)',r);
// 81
r=await ev(()=>{arLoad(chNuevo(DANU));S.salida.ok=true;S.inv.reparto=70;S.inv.repartoKg=800;S.tab.rep='ruta';render();var c=document.querySelector('main .card.rep1');var m=document.querySelector('main');return {sobra:c?c.scrollWidth-c.clientWidth:null,primero:m.firstElementChild&&m.firstElementChild.className,txt:(m.querySelector('.hola89')||{}).textContent,tarjeta:[...m.querySelectorAll('.card.autocard')].some(x=>/administrador ve tu ubicación/.test(x.textContent))}});
ok(r.sobra!==null&&r.sobra<=1,'81 · "Te quedan en el camión" ya no se sale de la pantalla',r);ok(r.primero==='hola89'&&/Hola, Danu/.test(r.txt)&&/ve tu ubicación/.test(r.txt)&&!r.tarjeta,'81 · "Hola, Danu · el administrador ve tu ubicación" arriba como texto, sin tarjeta',r);
// 82
r=await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.chofHoy=null;S.tab.admin='inicio';render();var h=document.querySelector('.pc.r .hd');return h?getComputedStyle(h).backgroundColor:null});ok(r==='rgb(14, 116, 144)','82 · el roatán ya no es naranja',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
