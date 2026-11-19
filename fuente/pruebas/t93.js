/* 93 · pasada la medianoche, el chofer que ya salió sigue con su ruta y manda su cierre sin bloqueo (hasta las 5 a.m.) */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();let ok=0,fail=0;const T=(n,c,x)=>{if(c){ok++;console.log('OK  ',n)}else{fail++;console.log('FAIL',n,x===undefined?'':JSON.stringify(x).slice(0,300))}};
async function prep(hora){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();p._e=[];p.on('pageerror',e=>p._e.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
 await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
 await p.evaluate(h=>{var U=S.setup;U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'C1',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'C2',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
  var ch=S.choferes.find(c=>c.n==='Danu').id;window.CH=ch;S.role='rep';S.chofHoy=ch;S.pinOk['c:'+ch]=true;arLoad(chNuevo(ch));S.salida.ok=true;S.inv.reparto=10;S.tab.rep='ruta';render();
  S.stops[0].done=true;S.log.push({c:S.stops[0].c,R:2,M:0,total:600,pago:600,abono:0,h:'23:10',f:iso(TODAY)});render();
  /* son las 11 de la noche y pasa la medianoche: la app se recarga con el día nuevo */
  window.__hora93=h;var viejo=iso(TODAY);window.AYER=viejo;TODAY=new Date(TODAY.getTime()+864e5);try{_nbDiaOk=true}catch(e){}cambioDeDia(viejo);render()},hora);return p}
async function cierre(p){await p.evaluate(()=>{S.tab.rep='cierre';S.cierreP=0;var c=document.createElement('canvas');c.width=20;c.height=20;var u=c.toDataURL('image/jpeg');S.salida.fotosFin={};FOTOS.concat([['odo','o'],['gas','g']]).forEach(x=>S.salida.fotosFin[x[0]]=u);S.cierre.tankOk=true;/* 153: cuenta su dinero (billetes obligatorios) */S.cierre.bill={mon:String(num(cierreRes().efectivo))};S.cierre.billOn=true;render()});
 for(let i=0;i<5;i++){await p.evaluate(()=>{var b=document.querySelector('.wz-nav [data-act="cipaso"]:last-child');if(b&&/Siguiente/.test(b.textContent))b.click()});await p.waitForTimeout(200)}
 await p.evaluate(()=>{var b=document.querySelector('[data-act="ev79"]');if(b)b.click();var e=document.querySelector('main [data-act="enviar"]');if(e)e.click()});await p.waitForTimeout(300);
 for(let k=0;k<4;k++){const t=await p.evaluate(()=>{var d=[...document.querySelectorAll('[role="dialog"]')].pop();if(!d)return null;var b=[...d.querySelectorAll('button')].filter(b=>/Sí|ya registré|Enviar|Confirmar/i.test(b.textContent)).pop();if(!b)return null;b.click();return 1});if(!t)break;await p.waitForTimeout(300)}}
/* 12:30 a.m. */
let p=await prep(0);
let r=await p.evaluate(()=>({ov:!!document.getElementById('dia80'),d:S.dia80,rd:S.rutaDia80,st:S.stops.length,pend:S.stops.filter(s=>!s.done).length}));
T('12:30 a.m.: no sale "No mandaste tu cierre"; sigue con su ruta de ayer',!r.ov&&!r.d&&r.rd===(await p.evaluate(()=>AYER))&&r.pend===1,r);
r=await p.evaluate(()=>{S.stops[1].done=true;S.log.push({c:S.stops[1].c,R:1,M:0,total:300,pago:300,abono:0,h:'00:20',f:AYER});render();return {ov:!!document.getElementById('dia80'),n:S.log.length}});T('12:30 a.m.: puede seguir entregando',!r.ov&&r.n===2,r);
await cierre(p);r=await p.evaluate(()=>({sent:!!(S.cierre&&S.cierre.sent),rd:S.rutaDia80,ov:!!document.getElementById('dia80')}));T('12:30 a.m.: manda su cierre sin bloqueo (y su ruta sigue siendo la de ayer para que el admin la reciba)',r.sent&&r.rd===(await p.evaluate(()=>AYER))&&!r.ov,r);
r=await p.evaluate(()=>{window.__hora93=6;render();return {rd:S.rutaDia80,hoy:iso(TODAY),st:S.stops.length,sent:!!(S.cierre&&S.cierre.sent),hist:(S.rutasHist||[]).filter(x=>x.f===AYER&&x.enviado).length}});
T('6 a.m.: ya le sale su ruta de hoy y lo de ayer queda en el historial como enviado',r.rd===r.hoy&&!r.sent&&r.hist>=1,r);
T('sin errores (noche)',!p._e.length,p._e);await p.close();
/* 6 a.m. sin haber mandado el cierre: ahora sí se pide */
p=await prep(6);r=await p.evaluate(()=>({ov:!!document.getElementById('dia80'),d:S.dia80}));T('6 a.m. sin cierre: sí sale "No mandaste tu cierre de ayer"',r.ov&&r.d===(await p.evaluate(()=>AYER)),r);await p.close();
/* el administrador: de noche no le sale "Liberar" ni el aviso */
p=await prep(0);r=await p.evaluate(()=>{var ch=CH,pk=arPack();S.role='admin';S.pinOk[pinKey()]=true;S.chSt=S.chSt||{};S.chSt[ch]=pk;S.chofHoy=null;S.avPrecio.push('URGENTE: Danu no envió su cierre de ayer ('+fmtF(AYER)+'). Pídele que lo envíe.');S.tab.admin='rutas';render();var a=porLib86().length,av=S.avPrecio.filter(x=>/no envió su cierre/.test(x)).length;window.__hora93=6;S.avPrecio.push('URGENTE: Danu no envió su cierre de ayer ('+fmtF(AYER)+'). Pídele que lo envíe.');render();return {a,av,b:porLib86().length}});
T('Admin de noche: sin "Liberar" ni "no envió su cierre"; a las 6 a.m. ya sí',r.a===0&&r.av===0&&r.b===1,r);await p.close();
console.log(ok+' OK · '+fail+' FAIL');await b.close()})();
