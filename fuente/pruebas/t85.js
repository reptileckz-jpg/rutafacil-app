/* 8.5 · 64–66: el administrador no reparte salvo que lo diga, días fijos al pasar un cliente sin días, no visitados con regla */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.yo='Ricardo';U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();S.role='admin';S.pinOk[pinKey()]=true;S.chofHoy=null;S.chSt={};window.DANU=S.choferes.find(c=>c.n==='Danu').id});const DANU=await ev(()=>window.DANU);
// 64 · importar sin chofer: ya no se los da al administrador
r=await ev(()=>{var L=choferes75('');return {primero:L[0]&&L[0].n,adm:L.some(x=>+x.ref===2)}});ok(r.primero==='Danu','64 · importar con "Chofer" vacío: el primero es Danu, no el administrador',r);
// 64 · clientes que tenía el administrador pasan a Danu (una vez)
r=await ev(()=>{var d=TODAY.getDay();for(var i=0;i<3;i++){var c=nuevoCli({n:'Adm '+i,a:'x',dias:[d],chofer:2});S.cli.push(c)}S.mig85=null;S.tab.admin='inicio';render();return {ch:S.cli.filter(c=>/^Adm /.test(c.n)).map(c=>c.chofer),mig:!!S.mig85,av:(S.avPrecio||[]).some(x=>/pasaron a Danu/.test(x))}});
r=await ev(()=>({ch:S.cli.filter(c=>/^Adm /.test(c.n)).every(c=>+c.chofer===DANU),mig:!!S.mig85,av:(S.avPrecio||[]).some(x=>/pasaron a Danu/.test(x))}));ok(r.ch&&r.mig&&r.av,'64 · los clientes fijos del administrador pasan a Danu y te avisa',r);
// 64 · apagado: no sale en Rutas ni en pedidos; su ruta vacía
r=await ev(()=>{S.admRep85='';render();return {rutas:chs81().map(c=>c.n),ped:pedChoferes().map(c=>c.n),sw:!!document.querySelector('[data-x="adm85"]'),ruta:chNuevo(2).stops.length,ar:arTiene()}});
ok(!r.rutas.some(n=>/Ricardo/.test(n))&&!r.ped.some(n=>/Ricardo/.test(n))&&r.sw&&r.ruta===0&&!r.ar,'64 · sin prender "¿Repartes hoy?": no sales en Rutas ni en pedidos, ni se te arma ruta',r);
// 64 · prendido: sale en Rutas con ruta vacía; se pasa clientes; "Mi ruta de hoy"
r=await ev(()=>{document.querySelector('[data-act="adm85"]').click();var a=chs81().map(c=>c.n);S.rt81={dia:'hoy',sel:{}};var c=S.cli.find(x=>/^Adm 0/.test(x.n));S.rt81.sel[c.id+'|'+DANU]=1;S.rt81.dest84=2;aplica83(2);S.rt81=null;render();return {a,on:admRep85(),mio:lista81(2,iso(TODAY)).L.length,ar:arTiene()}});
ok(r.on&&r.a.some(n=>/Ricardo/.test(n))&&r.mio===1&&r.ar,'64 · "Sí, hoy reparto": sales en Rutas, te pasas un cliente y aparece "Mi ruta de hoy"',r);
r=await ev(()=>{document.querySelector('[data-act="adm85"]').click();return {on:admRep85(),sel:S.rt81?Object.keys(S.rt81.sel).length:0}});ok(r.on&&r.sel===1,'64 · para apagarlo con clientes te pide pasarlos primero (los deja marcados en Rutas)',r);
// 65 · sin días: al pasarlo se preguntan sus días
r=await ev(()=>{S.admRep85='';S.rt81=null;var c=nuevoCli({n:'Sin Días',a:'x',dias:[]});S.cli.push(c);S.rt81={dia:'hoy',sel:{},e84:'sd'};render();document.querySelector('#rt81 [data-k="'+c.id+'|0"]').click();document.querySelector('#rt81 [data-act="rt84t"][data-id="'+DANU+'"]').click();
 var dis=document.querySelector('#rt81 [data-act="rt84ok"]').disabled,pide=!!document.querySelector('#rt81 [data-act="rt85d"]');document.querySelector('#rt81 [data-act="rt85d"][data-v="3"]').click();document.querySelector('#rt81 [data-act="rt85d"][data-v="5"]').click();var dis2=document.querySelector('#rt81 [data-act="rt84ok"]').disabled;document.querySelector('#rt81 [data-act="rt84ok"]').click();
 return {pide,dis,dis2,dias:c.dias,ch:c.chofer,sd:sinDias81().some(x=>x.id===c.id)}});
ok(r.pide&&r.dis&&!r.dis2&&JSON.stringify(r.dias)==='[3,5]'&&!r.sd,'65 · cliente sin días: pide sus días, quedan fijos con ese chofer y se quita el aviso',r);
// 66 · no visitados
r=await ev(()=>{var d=TODAY.getDay(),mk=(n,dias)=>{var c=nuevoCli({n:n,a:'x',dias:dias,chofer:DANU});S.cli.push(c);return c};
 var a=mk('Mañana le toca',[(d+1)%7]),b=mk('Le toca en 3',[(d+3)%7]),f=mk('Ya falló 2',[(d+1)%7]);f.falla85={n:2,f:'2026-01-01'};
 var r0={salida:{ok:true},log:[{c:1}],stops:[{c:a.id},{c:b.id},{c:f.id}],cierre:{sent:true},pendManana:[a.id,b.id,f.id]};var L=pendDe81(r0);return {a:L.indexOf(a.id)>-1,b:L.indexOf(b.id)>-1,f:L.indexOf(f.id)>-1}});
ok(!r.a&&r.b&&r.f,'66 · no visitado: si le toca mañana espera; si le toca en 2+ días o ya falló 2, va hoy',r);
r=await ev(()=>{var c=S.cli.find(x=>x.n==='Le toca en 3');c.falla85=null;var r0={salida:{ok:true},log:[{c:1}],stops:[{c:c.id}],cierre:{sent:true},pendManana:[c.id],rutaDia80:'2026-11-15'};var n0=(S.avPrecio||[]).length;fallas85(r0,'2026-11-15');fallas85(r0,'2026-11-15');return {n:c.falla85&&c.falla85.n,av:(S.avPrecio||[]).slice(n0).some(x=>/se está quedando sin visita/.test(x))}});
ok(r.n===1&&r.av,'66 · cuenta la falla una sola vez por día y avisa "se está quedando sin visita"',r);
ok(errs.length===0,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
