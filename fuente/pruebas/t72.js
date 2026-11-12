/* 7.6 · l72: el chofer (68 carga sin base, 72 cliente nuevo por pasos, 73 rotas, 78 taras, 79 más opciones, 80 pedido, 83 cierre, 84 botones) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const ctx=await b.newContext({geolocation:{latitude:32.51,longitude:-117.03},permissions:['geolocation'],viewport:{width:400,height:860}});
// 68 · primera vez sin pedidos
let p=await ctx.newPage();let errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);let ev=(f,a)=>p.evaluate(f,a);
ok(await ev(()=>!(num(S.salida.R)===26&&num(S.salida.M)===80)),'la carga de 26 cajas y 80 kg de la demo ya no se cuela');
await ev(()=>{S.setup=null;S.veh.push({id:1,n:'Nissan NP300',pl:'YKL',plEdo:'Veracruz',comb:'Gasolina Premium',odo:1000});var c=S.choferes[0];S.role='rep';S.chofHoy=c.id;S.vehHoy=1;S.pinOk['c:'+c.id]=true;S.tab.rep='ruta';render()});
await ev(()=>{var b=[...document.querySelectorAll('button')].find(x=>/Iniciar ruta/.test(x.innerText));if(b)b.click()});await p.waitForTimeout(300);
ok(/Todavía no hay con qué calcularlo/.test(await ev(()=>document.querySelector('main').innerText)),'sin pedidos ni días anteriores: no inventa cuánto cargar');await p.close();
// demo
p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(800);ev=(f,a)=>p.evaluate(f,a);
const ck=s=>ev(s=>{var e=document.querySelector(s);if(!e)return false;e.click();return true},s);
await ev(()=>{S.role='rep';S.chofHoy=1;S.pinOk['c:1']=true;S.salida.ok=true;S.inv.reparto=20;S.inv.repartoKg=50;S.tab.rep='ruta';render()});await p.waitForTimeout(200);
ok(await ev(()=>{var g=document.querySelector('main .cn72');return !!g&&g.querySelectorAll('[data-act=calle]').length===2&&document.querySelectorAll('main [data-act=calle]').length===2}),'"Cliente nuevo" y "Venta rápida" arriba, grandes, sin repetirse');
await ck('.cn72 .nv');await p.waitForTimeout(150);ok(await ev(()=>S.wz&&S.wz.k==='cliCh'),'cliente nuevo: abre el alta por pasos');
await p.fill('#wz_n','Abarrotes Prueba');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);await ck('[data-act="wzsig"][data-salta]');await p.waitForTimeout(60);
await ck('[data-act="wzsig"]');await p.waitForTimeout(60);ok(/10 dígitos/.test(await ev(()=>S.wz.err)),'pide el teléfono (o "No quiso dar")');await p.fill('#wz_tel','6641234567');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);
await ck('[data-act="wzsig"]');await p.waitForTimeout(60);ok(/ubicación/.test(await ev(()=>S.wz.err)),'la ubicación es obligatoria');
await ck('[data-act="wz72gps"]');await p.waitForTimeout(600);await ck('[data-act="ub68si"]');await p.waitForTimeout(150);ok(await ev(()=>S.wz.d.lat===32.51),'"Estoy aquí" guarda el punto en el alta');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);
await ck('[data-act="wzsig"][data-salta]');await p.waitForTimeout(60);await ck('[data-act="wzsig"]');await p.waitForTimeout(60);ok(/hora/.test(await ev(()=>S.wz.err)),'pide el horario');
await p.selectOption('#wz_hAb','08:00');await p.selectOption('#wz_hCi','18:00');await ck('[data-act="wzsig"]');await p.waitForTimeout(60);await ck('[data-act="wzsig"]');await p.waitForTimeout(60);await ck('[data-act="wzsig"][data-salta]');await p.waitForTimeout(60);await ck('[data-act="wzfin"]');await p.waitForTimeout(250);
let r=await ev(()=>{var c=S.cli.find(x=>x.n==='Abarrotes Prueba');var t=document.querySelector('main').innerText;return [S.tab.rep,c.tel,c.hAb,c.hCi,c.lat,c.credOk,/Completa los datos/.test(t),/Datos del cliente nuevo/.test(t),/Guarda la ubicación/.test(t),/vienen rotas/.test(t)]});
ok(r[0]==='entrega'&&r[1]==='6641234567'&&r[2]==='08:00'&&r[4]===32.51&&r[5]===false,'se guarda con todo y pasa directo a la entrega (de contado)',r);ok(!r[6]&&!r[7]&&!r[8],'en la entrega ya no vuelve a pedir datos',r);ok(!r[9],'sin la pregunta de cajas rotas');
await ev(()=>{S.d.R=4;S.d.M=0;S.d.V=0;render()});await ck('[data-act="entconf"]');await p.waitForTimeout(200);
ok(/se queda debiendo 4 taras/.test(await ev(()=>(document.getElementById('tar72ov')||{}).innerText||'')),'al dejar taras prestadas: aviso con lo que pasa si no las regresa');
await ck('[data-act="tar72pedi"]');await p.waitForTimeout(400);ok(await ev(()=>S.cli.find(x=>x.n==='Abarrotes Prueba').vacPidio===iso(TODAY)),'"Ya le pedí las vacías" queda anotado');
r=await ev(()=>{S.modal=null;var c=S.cli[0];c.vac=3;c.vacDesde=iso(new Date(TODAY.getTime()-31*864e5));c.tarDesc72=null;c.tarAv72=null;S.role='admin';S.encOn=false;S.tarRev72=null;var n0=S.faltantes.length;render();var f=S.faltantes.slice(n0);return [f.length,f[0]&&f[0].ch===c.chofer,f[0]&&f[0].m,f[0]&&f[0].desc,S.avPrecio.some(t=>/se descontaron/i.test(t))]});
ok(r[0]===1&&r[1]&&r[3]&&r[4],'buró de taras: a los 30 días se descuenta del sueldo del chofer y se avisa',r);
r=await ev(()=>{var n=S.faltantes.length;S.tarRev72=null;render();return S.faltantes.length-n});ok(r===0,'el descuento se hace una sola vez por deuda');
await ev(()=>{S.role='rep';S.dOpen.entmas=true;var i=curStop();resetDraft(cl(S.stops[i].c))});ok(await ev(()=>!S.dOpen.entmas),'"Más opciones" se cierra al pasar a otro cliente');
await ev(()=>{S.tab.rep='ruta';render();document.querySelector('[data-act="rpnew"]').click()});await p.waitForTimeout(150);
ok(await ev(()=>document.getElementById('rpR').parentElement.classList.contains('step')&&!!document.querySelector('.rp72')),'pedido de un cliente: + y − en las cajas y en su tarjeta');
await ck('[data-act=kgd][data-p="rp.R"][data-d="1"]');ok(await ev(()=>num(S.rp.R)===1),'el + de las cajas suma');
await ev(()=>{S.rp=null;S.inv.reparto=10;S.cierre.salioR=20;S.tab.rep='cierre';S.cierreP=5;render()});await p.waitForTimeout(150);await ck('[data-act="enviar"]');await p.waitForTimeout(300);
ok(await ev(()=>{var e=document.getElementById('regFb');return S.cierreP!==5&&e&&e.offsetParent!==null}),'cierre: si falta la foto de lo que regresa, lleva al paso de esa foto');
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
