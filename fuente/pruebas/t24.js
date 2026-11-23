/* 24 · precio de hoy sin fijar: pantalla grande la primera vez del día y tarjeta arriba que destella */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const b=await chromium.launch();const errs=[];
for(const arch of ['prototipo-platanos.html','platanos-primera-vez.html']){
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__pnTest=1;window.__pr24Test=1});await p.goto('file:///mnt/user-data/outputs/'+arch);await p.waitForTimeout(1100);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();if(S.setup&&!S.setup.fin){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Benavides',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();_pin.modo=null}
 try{localStorage.removeItem('pr24')}catch(e){}S.tutVisto={rep:true,admin:true};S.modal=null;S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.precio.conf='2026-11-20';S.popVisto={admin:iso(TODAY)};S.tab.admin='inicio';render()});
r=await ev(()=>{var o=document.getElementById('pr24ov');return {o:o?o.innerText:'',pop:popItems().some(x=>x.t==='Precio de hoy')}});
ok(/Fija el precio de hoy/.test(r.o)&&/Cambiar el precio/.test(r.o)&&/el de ayer/.test(r.o)&&!r.pop,arch+' · al abrir sin precio de hoy sale la pantalla grande "💲 Fija el precio de hoy"',r);
r=await ev(()=>{document.querySelector('[data-act="pr24x"]').click();render();var c=document.querySelector('main [data-x="precio65"]');var m=c.parentElement;var prim=m.querySelector(':scope > .card, :scope > [data-x]');var cs=getComputedStyle(c,'::after');return {ov:!!document.getElementById('pr24ov'),cls:c.className,arriba:prim===c,ring:cs.animationName}});
ok(!r.ov&&/pr24/.test(r.cls)&&r.arriba&&r.ring==='pr24ring',arch+' · "Después": ya no sale ese día; la tarjeta queda hasta arriba, en rojo y destellando',r);
r=await ev(()=>{S.tab.admin='clientes';render();S.tab.admin='inicio';render();var c=document.querySelector('main [data-x="precio65"]');return {b:/pr24b/.test(c.className),ov:!!document.getElementById('pr24ov')}});
ok(r.b&&!r.ov,arch+' · al volver a Inicio la tarjeta brinca (y la pantalla grande no vuelve a salir)',r);
r=await ev(()=>{try{localStorage.removeItem('pr24')}catch(e){}PR24.v=null;render();document.querySelector('[data-act="pr24ayer"]').click();render();var c=document.querySelector('main [data-x="precio65"]');return {conf:S.precio.conf===iso(TODAY),cls:c?c.className:'',ov:!!document.getElementById('pr24ov')}});
ok(r.conf&&!/pr24/.test(r.cls)&&!r.ov,arch+' · "Está bien, el de ayer" lo fija y la tarjeta se calma',r);
r=await ev(()=>{try{localStorage.removeItem('pr24')}catch(e){}PR24.v=null;S.precio.conf='x';render();document.querySelector('[data-act="pr24cam"]').click();return {campo:!!document.querySelector('[data-bind="precio.R"]'),ov:!!document.getElementById('pr24ov')}});
ok(r.campo&&!r.ov,arch+' · "Cambiar el precio" abre para escribirlo',r);
await p.close()}
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
