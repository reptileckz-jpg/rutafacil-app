/* 35 · "💰 Mi sueldo": entrevista por pasos → sueldo sugerido (lo menor + colchón), se acepta el primer día aunque sea más; queda como
   gasto fijo de sueldo del dueño; revisión cada quincena (rojo 2 veces → sugiere bajar); carro particular; privacidad. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'NP',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'C1',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();_pin.modo=null}
 S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.tutVisto={admin:true,rep:true};S.popVisto={admin:iso(TODAY)};S.cajaAyerSkip=true;S.tab.admin='inicio';render()});
r=await ev(()=>{var c=document.querySelector('main [data-x="suel35"]');return c?c.innerText:''});ok(/Cuánto te conviene pagarte/.test(r),'después de la configuración, en Inicio se le ofrece la entrevista "💰 Mi sueldo"',r);
await clic('suel35ab');
r=await ev(()=>{var o=document.getElementById('wzov');return o?o.innerText:''});ok(/Mi sueldo/.test(r)&&/Paso 1 de/.test(r),'la entrevista va por pasos',r.slice(0,120));
/* llenar: casa 25,000 al mes; el negocio deja ~4,153/semana → 18,000 al mes */
r=await ev(()=>{var d=S.wz.d;Object.assign(d,{pers:'4',desp:'8000',fuera:'2000',serv:'3000',renta:'5000',carro:'si',cgas:'2000',cseg:'6000',cserv:'6000',salud:'1000',deuda:'2000',ahorro:'1000',ganSem:'4153.846',frec:'quincenal'});var P=wzPasos();S.wz.p=P.length-1;render();return document.getElementById('wzov').innerText});
ok(/Lo que necesita tu casa/.test(r)&&/\$25,000 al mes/.test(r)&&/\$18,000 al mes/.test(r)&&/Te sugiero \$7,200 cada quincena/.test(r),'resultado: necesita $25,000, el negocio deja $18,000, puede pagar $14,400 (20% de colchón) → te sugiero $7,200 cada quincena',r.slice(0,500));
r=await ev(()=>{S.wz.d.elige='nec';render();return document.getElementById('wzov').innerText});
ok(/pierde ~\$7,000 al mes/.test(r),'si escoge "lo que necesito" ($25,000) se acepta, pero le dice que el negocio pierde ~$7,000 al mes',r.slice(-300));
await clic('wzfin');
r=await ev(()=>{var f=S.fijos.filter(f=>f.s35)[0];return {f:f&&{m:f.m,frec:f.frec,ret:f.retiro,n:f.n},det:!!S.suel35,nube:NB_SH.indexOf('suel35')}});
ok(r.f&&r.f.m==='12500'&&r.f.frec==='quincenal'&&r.f.ret===true&&r.det,'queda como gasto fijo "Sueldo de … (dueño)" de $12,500 cada quincena, marcado como sueldo del dueño',r);
ok(r.nube===-1,'el detalle de sus gastos no va en los datos compartidos (solo dueño y desarrollador)',r);
/* revisión de quincena: ganancia real 18,000 al mes y se paga 25,000 → rojo; la segunda vez en rojo sugiere bajar */
r=await ev(()=>{var keep=TODAY;TODAY=new Date('2026-12-15T12:00:00');_g35.k='';var gk=suel35Ganancia;suel35Ganancia=function(){return {mes:18000,dias:20}};S.tab.admin='inicio';render();var c=document.querySelector('main [data-x="suel35q"]');var t1=c?c.innerText:'';
 var bb=c&&c.querySelector('[data-act="suel35ok"]');if(bb)bb.click();TODAY=new Date('2026-12-30T12:00:00');render();var c2=document.querySelector('main [data-x="suel35q"]');var t2=c2?c2.innerText:'';suel35Ganancia=gk;TODAY=keep;return {t1,t2}});
ok(/Te estás comiendo el capital/.test(r.t1)&&!/Te recomiendo bajarlo/.test(r.t1),'primera quincena en rojo: le avisa, sin sugerir todavía',r.t1.slice(0,200));
ok(/Te recomiendo bajarlo a \$7,200 cada quincena/.test(r.t2)&&/cobrar a los que deben/.test(r.t2),'segunda quincena seguida en rojo: sugiere bajarlo (y otras salidas)',r.t2.slice(0,300));
/* carro particular */
r=await ev(()=>GTIP.some(x=>x[0]==='Mi carro (para el negocio)'));ok(r,'en Gastos existe "Mi carro (para el negocio)"',r);
/* Más → Mi sueldo */
r=await ev(()=>{S.tab.admin='mas';render();return !!document.querySelector('[data-x="mas92-sueldo"]')});ok(r,'en Más está "💰 Mi sueldo"',r);
/* un administrador que no es dueño ni desarrollador no la ve */
r=await ev(()=>{var keep=window.NB;window.NB={on:true,listo:true,perfil:{rol:'admin'}};var v=suel35Puede();window.NB.perfil={rol:'admin',dev:true};var v2=suel35Puede();window.NB=keep;return {v,v2}});
ok(r.v===false&&r.v2===true,'otro administrador no ve "Mi sueldo"; el desarrollador sí',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
