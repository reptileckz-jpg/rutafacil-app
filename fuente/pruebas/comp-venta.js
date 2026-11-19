/* 125 · La venta en ruta por pasos: cada venta guardada queda IGUAL que antes (blindaje de números).
   Uso: node comp-venta.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   En ANTES se toca "Guardar entrega" directo; en NUEVO se va paso por paso (Siguiente…) y luego "Revisar y guardar".
   En los dos se contestan las mismas ventanas ("Antes de terminar" → "Ya le pedí", "¿Guardar la entrega?" → "Sí, guardar").
   Se compara lo que queda guardado: la venta (S.log), el inventario, la deuda, vacías y taras del cliente, abonos, paradas, avisos.
   Casos: contado, abono, vacías, rotas, sin nada (no guarda), más cajas de las que trae (no guarda), fiado, pago en parte,
   pago mayor al total (no guarda), mayoreo, mayoreo sin precio (no guarda), centavos, otros clientes, venta en la calle. */
const {chromium}=require('playwright');
const CASOS=[
 ['contado',0,'{}'],['abono',0,'{"abono":500}'],['vacias',0,'{"V":4}'],['rotas',0,'{"V":2,"Vr":1}'],
 ['sin-nada',0,'{"R":0,"M":0,"abono":0}'],['de-mas',0,'{"R":45}'],
 ['fiado',0,'{"mode":"credito","R":1,"M":0}'],['parte',0,'{"mode":"parte","pago":300,"R":2,"M":0}'],['fiado-con-deuda',1,'{"mode":"credito","R":1,"M":0}','regla127'],['parte-con-deuda',1,'{"mode":"parte","pago":300,"R":2,"M":0}','regla127'],['parte-de-mas',1,'{"mode":"parte","pago":99999,"_lim":0}'],
 ['fiado-pasa-limite',1,'{"mode":"credito","R":20,"M":0}','regla127'],
 ['mayoreo',1,'{"may":true,"R":12,"M":0,"pRm":"240","pMm":"","V":12}'],['mayoreo-sin-precio',1,'{"may":true,"R":12,"M":0,"pRm":"","pMm":""}'],
 ['centavos',2,'{"R":1,"M":7.5}'],['cliente3',3,'{}'],['cliente4-vacias',4,'{"V":1,"abono":120.5}'],['tope-vacias',2,'{"R":6,"V":0,"_tope":"1"}'],['calle',-1,'{"R":2,"M":0}']];
async function corre(b,url,nuevo){const out={};
 for(const [nom,i,mod,regla] of CASOS){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
  await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
  await p.goto('file://'+url);await p.waitForTimeout(800);
  const ok=await p.evaluate(([i,mod])=>{if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
    U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:900,vac:3,ch:'0'},{n:'Cliente Tres',a:'z',tel:'6640000003',dias:[0,1,2,3,4,5,6],cred:0,vac:5,ch:'0'},{n:'Cliente Cuatro',a:'w',tel:'6640000004',dias:[0,1,2,3,4,5,6],cred:250,vac:0,ch:'0'},{n:'Cliente Cinco',a:'v',tel:'6640000005',dias:[0,1,2,3,4,5,6],cred:0,vac:2,ch:'0'}];
    U.prov=[];S.precio.R=275;S.precio.M=20.5;suAplicar();var ch=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.chofHoy=ch.id;S.stops=S.cli.map(c=>({c:c.id}))}
   S.role='rep';if(S.chofHoy==null)S.chofHoy=1;S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.salida.ok=true;S.rutaDia80=iso(TODAY);S.inv.reparto=30;S.inv.repartoKg=50;S.cierre.salioR=30;
   if(i<0){S.tab.rep='ruta';render();var b=document.createElement('button');b.dataset.act='calle';document.body.appendChild(b);b.click();b.remove()}
   else{if(!S.stops[i])return false;S.cur=i;resetDraft(cl(S.stops[i].c));S.tab.rep='entrega'}
   var m=JSON.parse(mod);S.cfg.tarCh116=m._tope!=null?m._tope:'500';var k0=entregaCalc().c;if(m._lim!=null&&k0)k0.lim=m._lim;
   /* la versión real empieza en 0 cajas (sin números de la demo): todas las ventas llevan 4 cajas y 3 kg salvo que el caso diga otra cosa */
   S.d.R=4;S.d.M=3;Object.keys(m).forEach(function(k){if(k[0]!=='_')S.d[k]=m[k]});render();return true},[i,mod]);
  if(!ok){out[nom]='(sin cliente '+i+')';await p.close();continue}
  if(nuevo){for(let k=0;k<4;k++){const hay=await p.evaluate(()=>{var x=document.querySelector('.entbar [data-act="ent125p"]');if(!x||x.classList.contains('wz-hide'))return false;x.click();return true});if(!hay)break;await p.waitForTimeout(80)}}
  await p.evaluate(()=>{var x=document.querySelector('[data-act="entconf"]');if(x)x.click()});await p.waitForTimeout(150);
  for(let k=0;k<5;k++){const t=await p.evaluate(()=>{var y=[].slice.call(document.querySelectorAll('button')).filter(x=>x.getClientRects().length&&!x.closest('main')&&/^(Sí, guardar|Ya le pedí|Sí|Guardar)/.test(x.textContent.trim()))[0];if(!y)return null;var t=y.textContent.trim();y.click();return t});if(!t)break;await p.waitForTimeout(150)}
  out[nom]=await p.evaluate(()=>{var L=(S.log||[]).slice(-1)[0]||null,c=null;/* el id de la venta sale de la hora (es único, no tiene que ser igual): se revisa que exista */if(L){L=JSON.parse(JSON.stringify(L));L.id=L.id?'(id)':'(SIN ID)';/* 135: la marca del tipo de precio (tR/tM) es nueva a propósito; no cambia ninguna cuenta: se quita para comparar */delete L.tR;delete L.tM}try{var cc=L&&cl(L.c);c=cc&&{cred:cc.cred,vac:cc.vac,tar:cc.tar72||cc.taras||null,saldo:cc.saldo}}catch(e){}
   return JSON.stringify({n:(S.log||[]).length,venta:L,cli:c,inv:S.inv,cobros:(S.cobros||[]).length,done:(S.stops||[]).filter(s=>s.done).length,stops:(S.stops||[]).length,cajas:(S.cajasMov||[]).length,av:(S.avPrecio||[]).slice(-2)})});
  out[nom+'·err']=errs.length;await p.close()}
 return out}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A,false),n=await corre(b,N,true);await b.close();
 const K=[...new Set(Object.keys(a).concat(Object.keys(n)))];let dif=0,guard=0;
 const REGLA={};CASOS.forEach(c=>{if(c[3])REGLA[c[0]]=1});let regla=0,reglaMal=0;
 /* 127: si el cliente ya debe, la venta es de contado. Esos casos cambian A PROPÓSITO: en NUEVO tiene que quedar pagada completa */
 for(const k of Object.keys(REGLA)){let o=null;try{o=JSON.parse(n[k])}catch(e){}const bien=o&&o.venta&&Math.abs(o.venta.pago-o.venta.total)<0.005&&o.venta.total>0;regla++;if(!bien)reglaMal++;console.log('  '+k.padEnd(20)+(bien?'OK de contado (regla 127): total '+o.venta.total+' · pagó '+o.venta.pago:'MAL: '+String(n[k]).slice(0,200)))}
 for(const k of K){if(REGLA[k])continue;const x=JSON.stringify(a[k]),y=JSON.stringify(n[k]);if(!/·err$/.test(k)&&/"n\\":(\d+)/.test(x)){}
  if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,400),'\n nuevo:',String(y).slice(0,400))}}
 CASOS.forEach(([nom])=>{try{const o=JSON.parse(a[nom]);console.log('  '+nom.padEnd(20)+(o.venta?'guardó '+o.n+' ventas · total '+o.venta.total+' · pagó '+o.venta.pago+' · abono '+o.venta.abono:'no guardó ('+o.n+' ventas)'))}catch(e){console.log('  '+nom+' '+a[nom])}});
 console.log(CASOS.length+' ventas · '+dif+' diferencias · regla 127: '+(regla-reglaMal)+' de '+regla+' de contado');console.log(dif===0&&reglaMal===0?'IDÉNTICO':'DISTINTO')})();
