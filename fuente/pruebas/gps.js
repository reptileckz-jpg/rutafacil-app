const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1;window.__esc=[];window.Capacitor={isNativePlatform:()=>true,Plugins:{RutaNativa:{escanear:()=>Promise.resolve({texto:'PN|corte|123'}),gpsEstado:()=>Promise.resolve({fondo:false}),gpsFondo:()=>Promise.resolve({ok:true}),permisosEstado:()=>Promise.resolve({ubicacion:'si',camara:'si',notif:'si'})}}}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
/* 84 */
let r=await ev(()=>new Promise(res=>{qrScan(function(t){res(t)},'x');setTimeout(()=>res('nada'),500)}));ok(r==='PN|corte|123','escáner: usa el lector nativo, no el del navegador',r);
r=await ev(()=>new Promise(res=>{window.Capacitor.Plugins.RutaNativa.escanear=()=>Promise.reject(new Error('sin_play'));qrScan(function(){},'x');setTimeout(()=>res(S.toast),100)}));ok(/servicios de Google/.test(r),'sin servicios de Google: aviso, sin cerrar la app',r);
/* 86 análisis */
r=await ev(()=>{var c=S.cli.find(x=>x.lat!=null),t=new Date(iso(TODAY)+'T10:00:00').getTime(),P=[];
 for(var i=0;i<20;i++)P.push({t:t+i*30000,lat:c.lat+0.0001,lng:c.lng,acc:10,ch:'1'});
 for(var i=0;i<10;i++)P.push({t:t+600000+i*60000,lat:c.lat+0.01*i/10,lng:c.lng+0.01,acc:10,ch:'1'});
 for(var i=0;i<40;i++)P.push({t:t+1200000+i*30000,lat:c.lat+0.05,lng:c.lng+0.05,acc:10,ch:'1'});
 var A=gpsAnaliza(P);return {n:A.E.length,cli:A.E[0]&&A.E[0].cli&&A.E[0].cli.n,cn:c.n,raro:A.E.filter(e=>!e.cli&&!e.bod).length,km:A.km,min:A.E[0]&&Math.round((A.E[0].t1-A.E[0].t0)/60000)}});
ok(r.cli===r.cn&&r.min>=9&&r.raro===1&&r.km>0,'recorrido: tiempo en el cliente, parada rara y km',r);
/* 88 alertas */
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};var c=S.choferes[0];c.tel='5512345678';GPS.devs={cel1:{dev:'cel1',ch:String(c.id),nom:'Celular de '+c.n,hb:Date.now()-50*60000,bat:23,ult:JSON.stringify({t:Date.now()-50*60000,lat:19.4,lng:-99.1}),evs:JSON.stringify([{e:'apagado',t:Date.now()-60000}])}};S.gpsAv={};gpsAlertas();S.tab.admin='inicio';render()});await W(150);
r=await ev(()=>({av:S.avPrecio.slice(-2),tel:!!document.querySelector('a[href="tel:5512345678"]'),geo:!!document.querySelector('a[href*="maps?q=19.4"]'),txt:/\[tel:/.test(document.body.innerText)}));
ok(r.av.length===2&&/URGENTE.*no manda su ubicación desde hace 50 min/.test(r.av[0])&&/batería 23%/.test(r.av[0])&&/URGENTE.*apagó el celular/.test(r.av[1]),'45 min sin señal y celular apagado: avisos urgentes',r.av);
ok(r.tel&&r.geo&&!r.txt,'el aviso trae Llamar y Ver dónde',r);
await ev(()=>{gpsAlertas()});ok(await ev(()=>S.avPrecio.filter(x=>/apagó el celular/.test(x)).length)===1,'no repite el mismo aviso');
/* 86 ficha */
await ev(()=>{S.tab.admin='personal';S.openCh=S.choferes[0].id;S.fiTab=S.fiTab||{};S.fiTab['emp:'+S.choferes[0].id]='ruta';render()});await W(200);
r=await ev(()=>{var t=document.body.innerText;return /Su recorrido/.test(t)});ok(r,'Personal → chofer: "Su recorrido" con días');
/* 87 permisos */
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk[pinKey()]=true;S.permFondo=false;S.perm={e:{ubicacion:'si',camara:'si',notif:'si'}};render()});await W(100);
r=await ev(()=>({h:/Ubicación todo el tiempo/.test(document.body.innerText),b:!!document.querySelector('[data-act="permfondo"]')}));ok(r.h&&r.b,'permisos: pide "Permitir todo el tiempo"',r);
await ev(()=>document.querySelector('[data-act="permfondo"]').click());await W(100);ok(await ev(()=>S.permFondo===true),'al darlo queda ✓');
/* ruta: llega/sale */
await ev(()=>{S.perm=null;S.salida.ok=true;S.cierre.sent=false;var st=S.stops.find(x=>!x.done),c=cl(st.c);S.pos={lat:c.lat,lng:c.lng};S.stopsT={};render();window.__c=st.c});
r=await ev(()=>S.stopsT[String(window.__c)]);ok(r&&r.lleg>0,'llegada al cliente marcada (a menos de 100 m)',r);
ok(await ev(()=>!gmHay()),'sin llave de Google Maps: mapa de siempre');
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
