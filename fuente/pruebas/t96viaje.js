/* 96 · viaje de carga que empieza de noche y termina al otro día: el cambio de día no lo afecta (comparado contra el mismo viaje sin cambiar de día) */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();let ok=0,fail=0;const T=(n,c,x)=>{if(c){ok++;console.log('OK  ',n)}else{fail++;console.log('FAIL',n,x===undefined?'':JSON.stringify(x).slice(0,400))}};
async function corre(cruza){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));await p.addInitScript(()=>{window.__pnTest=1});
 await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);
 return await p.evaluate(cruza=>{var out={};var v=S.vws.filter(x=>x.started&&['done','gracias','fin'].indexOf(x.k)<0)[0];if(!v)return {err:'sin viaje en curso en la demo'};var ch=v.quien,vid=v.veh;
  out.k0=v.k;out.cajas0=JSON.stringify(S.inv);
  if(cruza){var viejo=iso(TODAY);window.__hora93=1;TODAY=new Date(TODAY.getTime()+864e5);try{_nbDiaOk=true}catch(e){}S.role='admin';S.pinOk[pinKey()]=true;cambioDeDia(viejo);render();
   /* también en el celular del chofer */
   S.role='rep';S.chofHoy=ch;S.pinOk['c:'+ch]=true;cambioDeDia(viejo);render()}
  var v2=S.vws.filter(x=>x===v||x.cid===v.cid)[0];out.sigue=!!v2&&v2.k===out.k0&&v2.started;out.ocupado=(function(){try{return vehUso90(vid,-99)!=null}catch(e){return null}})();
  out.atras=Object.values(S.atras93||{}).filter(e=>+e.id===+ch).length;
  S.role='rep';S.chofHoy=ch;S.pinOk['c:'+ch]=true;S.tab.rep='ruta';render();out.bloqueoViaje=!!(document.querySelector('main')||{textContent:''}).textContent.match(/viaje/i);out.dia80=!!document.getElementById('dia80');
  /* avanzar el viaje lo más que se pueda, igual en los dos casos */
  S.role='admin';S.pinOk[pinKey()]=true;S.vw=v2;S.vwI=S.vws.indexOf(v2);var seq=[];for(var i=0;i<25;i++){var k=S.vw.k;try{vwAvanzar()}catch(e){seq.push('ERR '+e.message);break}seq.push(k+'>'+S.vw.k);if(S.vw.k===k)break}out.seq=seq;
  return out},cruza).then(r=>{r.errs=errs;return p.close().then(()=>r)})}
const A=await corre(false),B=await corre(true);
T('la demo trae un viaje en curso',!A.err&&!B.err,A.err||B.err);
T('pasa la medianoche y el viaje sigue igual (mismo paso, iniciado)',B.sigue,B);
T('el vehículo del viaje sigue ocupado',B.ocupado===true,B.ocupado);
T('no se confunde con una ruta: no se guarda como "falta recibir" ni se bloquea con "No mandaste tu cierre"',B.atras===0&&!B.dia80,B);
T('el viaje avanza paso a paso igual que sin cambiar de día',JSON.stringify(A.seq)===JSON.stringify(B.seq),{sin:A.seq,con:B.seq});
T('sin errores',!A.errs.length&&!B.errs.length,A.errs.concat(B.errs).slice(0,3));
console.log(ok+' OK · '+fail+' FAIL');await b.close()})();
