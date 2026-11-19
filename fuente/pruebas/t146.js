/* 146/147 · "Jornada finalizada" (diseño de Ricardo) después de mandar el cierre, sin "Listo por hoy" (que hacía el ciclo con el PIN);
   "Cerrar sesión (cambiar de chofer)" y "Cambiar de usuario" en el celular de un chofer llevan a "¿Cambiar de usuario?" (ya no regresan al PIN). */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=21});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
r=await ev(()=>{var U=S.setup;U.veh=[{n:'C',pl:'A',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=245;S.precio.M=20;suAplicar();
 var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;D.sz={tipo:'base',monto:'',porDia:'',base:'1500',comC:'5',comK:'0.5',dias:0,cv:0,kv:0};D.ing='2026-01-05';S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.pinOk[pinKey()]=true;S.salida.ok=true;S.rutaDia80=iso(TODAY);S.tutVisto={rep:true};
 S.log.push({c:S.cli[0].id,R:10,M:0,V:0,pr:245,pm:20,total:2450,pago:2450,abono:0});S.stops=[{c:S.cli[0].id,done:true}];S.cierre.res=cierreRes();S.cierre.sent=true;S.cierre.corte=corteDatos();S.ciEnvH='21:09';S.corteUlt='data:x';S.tab.rep='ruta';render();
 var m=document.querySelector('main');return {t:m.innerText,listo:!!m.querySelector('[data-act="listohoy"]'),salir:!!m.querySelector('[data-act="jor146salir"]'),seguir:m.querySelectorAll('.j6x [data-act="seguir"]').length,apoyo:!!m.querySelector('.j6x [data-act="apoyoofrece"]')}});
ok(/JORNADA FINALIZADA/.test(r.t)&&/¡Buen trabajo, Danu!/.test(r.t)&&/Tu ganancia hoy/i.test(r.t)&&/Acumulado semana/i.test(r.t),'"Jornada finalizada": ¡Buen trabajo!, ganancia de hoy y de la semana',r.t.slice(0,200));
ok(/Cierre enviado a las 21:09/.test(r.t)&&/\$2,450\.00/.test(r.t)&&/Pendiente de recibir/.test(r.t)&&/Folio:/.test(r.t)&&/Reenviar ticket por WhatsApp/.test(r.t),'el cierre: hora, efectivo, pendiente, folio y reenviar');
ok(/Todo listo por hoy/.test(r.t)&&r.seguir===2&&r.apoyo,'"Todo listo por hoy" y los imprevistos plegados (cargar más, otra vuelta, apoyar)',r);
ok(!r.listo&&r.salir,'ya no está "Listo por hoy" (el ciclo); está "Cerrar sesión (cambiar de chofer)"',r);
r=await ev(()=>{S.cierreReg={rec:2450};render();return /Recibido por el admin ✓/.test(document.querySelector('main').innerText)});ok(r,'cuando el admin recibe: "Recibido por el admin ✓"');
r=await ev(()=>{document.querySelector('[data-act="jor146salir"]').click();var x=document.getElementById('pxov');var t=x?x.innerText:'';S.px=null;render();return t});ok(/¿Cambiar de usuario\?/.test(r)&&/Sí, cerrar sesión de Danu/.test(r),'"Cerrar sesión" pide confirmar y cierra la sesión de la cuenta',r);
/* 147: en el celular de un chofer (solo puede entrar él) "Cambiar de usuario" ya no regresa a su PIN */
r=await ev(()=>{NB.on=true;NB.listo=true;NB.perfil={rol:'chofer',chId:window.__D};var n=personasEntrar().length;var b=document.createElement('button');b.dataset.act='usrcambia';document.body.appendChild(b);b.click();b.remove();var x=document.getElementById('pxov');return {n:n,usrSel:!!S.usrSel,px:x?x.innerText.slice(0,60):''}});
ok(r.n===1&&!r.usrSel&&/¿Cambiar de usuario\?/.test(r.px),'147 · celular de chofer: "Cambiar de usuario" lleva a cerrar la sesión (antes: la lista solo con él → su PIN otra vez)',r);
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
