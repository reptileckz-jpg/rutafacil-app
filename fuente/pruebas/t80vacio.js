/* 8.0 · la app real (primera vez) no trae nada de la demo */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const p=await (await b.newContext({viewport:{width:400,height:860}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1000);
let r=await p.evaluate(()=>[S.precio.R,S.precio.M,S.cfg.tel]);ok(!r[0]&&!r[1]&&!r[2],'antes del asistente: sin precios ni teléfono de ejemplo',r);
r=await p.evaluate(()=>{var U=S.setup;U.yo='Dueño';U.veh=[{n:'Camioneta A',pl:'ABC1',plEdo:'Baja California',comb:'Diésel',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];U.cli=[{n:'Cliente Uno',a:'Calle 1',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var demo=/Banderilla|Xalapa|Coatepec|Mejía(?! *\.| Todos)|Pedro Mota|228 1\d\d|\(demo\)|Trigal|Fruver|La Güera|Perote|Simular llamada|quedé sin señal|VERACRUZ/,out={};
 var roles=[['admin',['inicio','cargas','clientes','ruta','personal','vehiculos','dinero','mas','bodega']],['rep',['ruta','entrega','viaje','cierre','gastos','mas']],['cont',['cres','cgas','cmas']]];
 roles.forEach(function(R){S.role=R[0];if(R[0]==='rep'){S.chofHoy=S.choferes.filter(c=>c.n==='Chofer Uno')[0].id;S.pinOk['c:'+S.chofHoy]=true}else S.pinOk[pinKey()]=true;
  R[1].forEach(function(t){S.tab[R[0]]=t;S.aj=false;render();document.querySelectorAll('details').forEach(d=>d.open=true);var L=document.body.innerText.split('\n').filter(l=>demo.test(l)&&!/Ricardo Nieto Mejía/.test(l));if(L.length)out[R[0]+':'+t]=L.slice(0,5)})});
 S.role='admin';S.aj=true;render();var L=document.body.innerText.split('\n').filter(l=>demo.test(l)&&!/Ricardo Nieto Mejía/.test(l));if(L.length)out.ajustes=L;S.aj=false;
 return {out,adm:S.admins.map(a=>a.n),mes:S.choferes.map(c=>c.mes.ven),pl:plateSVG(S.veh[0]).indexOf('BAJA CALIFORNIA')>-1}});
ok(!Object.keys(r.out).length,'ninguna pantalla muestra datos de la demo',r.out);ok(r.adm.indexOf('Ricardo Mejía')<0,'sin el administrador de ejemplo',r.adm);ok(r.mes.every(x=>!x),'sin ventas del mes inventadas',r.mes);ok(r.pl,'la placa dice el estado de verdad');
r=await p.evaluate(()=>{var c=S.cli[0];resetDraft(c);return [S.d.R,S.d.M]});ok(r[0]===0&&r[1]===0,'la entrega empieza en ceros (no 4 cajas y 30 kg)',r);
r=await p.evaluate(()=>{S.lotes=[{id:1,prod:'R',q:10,h:0,est:30}];render();return !!S.lotes[0].t0a});ok(r,'maduración de antes sin hora: pregunta cuántas horas lleva');
ok(errs.length===0,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
