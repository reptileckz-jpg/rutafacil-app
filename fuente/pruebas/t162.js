/* 162 · cerrar sesión: la pantalla del PIN ya no tapa la de "Entrar" (antes parecía que la sesión no se cerraba). Por los dos caminos:
   "No soy… → Sí, cerrar sesión" y el menú "Cerrar sesión en este celular". */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);
const r=await ev(()=>{var U=S.setup;U.veh=[{n:'C',pl:'A',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 NB.on=true;NB.listo=true;NB.est='listo';NB.neg='pn';NB.user={uid:'U1',email:'r@x.com'};NB.perfil={rol:'admin',activo:true,nombre:'Ricardo Nieto Mejia'};NB.ad=Object.assign({},NB.ad||{},{salir:function(){NB.user=null;NB.perfil=null;NB.listo=false;NB.est='login';nbPantalla();render();return new Promise(function(){})},get:function(){return Promise.resolve(null)},set:function(){return Promise.resolve()}});
 S.role='admin';S.pins=S.pins||{};S.pins[pinKey()]='1234';S.pinOk={};_pin={v:'',modo:'entrar',k:pinKey()};render();
 var arriba=function(){var e=document.elementFromPoint(195,400);return e?(e.closest('#pinov')?'PIN':(e.closest('#nbov')?'ENTRAR':'app')):'?'};var r=['antes: '+arriba()];
 document.querySelector('[data-act="usrcambia"],[data-act="pinotro"]').click();var si=document.querySelector('[data-act="pinotrosi"]');r.push(si?'confirma':'sin confirmar');
 si.click();return new Promise(function(res){setTimeout(function(){r.push(arriba());r.push(((document.getElementById('nbov')||{}).innerText||'').slice(0,60));r.push(!!document.getElementById('pinov'));res(r)},200)})});
ok(r[0]==='antes: PIN'&&r[1]==='confirma','con sesión: pide el PIN y "No soy…" pide confirmar',r);
ok(r[2]==='ENTRAR'&&/Entrar|Quién eres/.test(r[3])&&r[4]===false,'"Sí, cerrar sesión": queda a la vista la pantalla de Entrar (el PIN ya no la tapa)',r);
const r2=await ev(()=>{NB.user={uid:'U1'};NB.perfil={rol:'admin',activo:true};NB.listo=true;NB.est='listo';nbPantalla();S.pinOk={};S.pinOk[pinKey()]=true;_pin={v:'',modo:null};render();var a=!document.getElementById('pinov')&&!document.getElementById('nbov');
 S.modal=null;var bt=document.createElement('button');bt.dataset.act='nbsalirya';document.body.appendChild(bt);bt.click();bt.remove();render();var e=document.elementFromPoint(195,400);return [a,e&&e.closest('#nbov')?'ENTRAR':'otro',!!document.getElementById('pinov')]});
ok(r2[0]===true&&r2[1]==='ENTRAR'&&r2[2]===false,'ya adentro, menú "Cerrar sesión en este celular": queda Entrar a la vista (sin PIN encima)',r2);
const r3=await ev(()=>{NB.user={uid:'U1'};NB.perfil={rol:'admin',activo:true};NB.listo=true;NB.est='listo';nbPantalla();S.pinOk={};_pin={v:'',modo:'entrar',k:pinKey()};render();return [!!document.getElementById('pinov'),!document.getElementById('nbov')]});
ok(r3[0]&&r3[1],'al volver a entrar, el PIN se pide como siempre',r3);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');
await b.close()})();
