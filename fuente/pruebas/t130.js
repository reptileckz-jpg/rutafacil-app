/* 130 · el corte del chofer (la imagen que se manda por WhatsApp e imprime) trae las cajas de roatán y los kilos de macho que vendió
   en ese cierre (de las mismas cuentas del cierre que "Vendió") y cuántas entregas; el código de verificación es el mismo de antes. */
const {chromium}=require('playwright');
const corre=async(b,url)=>{const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
 await p.goto('file://'+url);await p.waitForTimeout(900);
 const r=await p.evaluate(()=>{TODAY=new Date('2026-11-18T12:00:00');var U=S.setup;if(window.PN_MODO==='vacio'){U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];
  U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Lupe',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  var D=S.choferes.filter(c=>c.n==='Danu')[0]||S.choferes.filter(c=>esCh(c))[0];S.pinOk[pinKey()]=true;S.pinOk['c:'+D.id]=true;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.vehHoy=S.veh[0].id;var bv=document.querySelector('[data-act="bienvgo"]');if(bv)bv.click();S.salida.ok=true;
  var c=S.cli;S.log.push({c:c[0].id,R:12,M:7.5,V:0,pr:275,pm:20,total:3450,pago:3450,abono:0});S.log.push({c:c[1].id,R:3,M:0,V:0,pr:275,pm:20,total:825,pago:500,abono:0});
  S.log.push({c:c[1].id,R:0,M:0,V:0,pr:275,pm:20,total:0,pago:0,abono:100});
  S.cierre.res=cierreRes();var d=corteDatos(),it=corteItems(d),img='';try{img=corteImg(d)}catch(e){img='ERR '+e.message}
  return {res:[S.cierre.res.R,S.cierre.res.M,S.cierre.res.total],R:d.R,M:d.M,n:d.nEnt,v:d.v,v0:verifCodigo([d.ch,d.f,d.deb,d.ent,d.bolsa,JSON.stringify(d.bill||{}),d.may.length].join('|')),it:it.filter(x=>x.t==='kv').map(x=>x.k+': '+x.v),img:String(img).slice(0,22),viejo:corteItems(Object.assign({},d,{R:undefined,M:undefined,nEnt:undefined})).filter(x=>x.t==='kv').map(x=>x.k)}});
 await p.close();return {r,errs}};
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
 for(const u of ['/mnt/user-data/outputs/platanos-primera-vez.html','/mnt/user-data/outputs/prototipo-platanos.html']){const {r,errs}=await corre(b,u);const k=u.includes('primera')?'real':'demo';
  ok(r.R===15&&r.M===7.5&&r.n===2&&r.R===r.res[0]&&r.M===r.res[1],k+': cajas y kilos vendidos = las cuentas del cierre (el abono solo no es entrega)',[r.R,r.M,r.n,r.res]);
  ok(r.it.includes('Vendió: $4,275'),k+': "Vendió" sale del mismo lugar',r.it);
  ok(r.it.includes('Cajas de roatán vendidas: 15')&&r.it.includes('Kilos de macho vendidos: 7.5 kg')&&r.it.includes('Entregas: 2'),k+': salen en el corte (la imagen de WhatsApp y la impresión)',r.it);
  ok(r.it.indexOf('Cajas de roatán vendidas: 15')<r.it.findIndex(x=>/^Vendió/.test(x)),k+': van antes de "Vendió"');
  ok(r.v===r.v0,k+': el código de verificación es el mismo de antes',[r.v,r.v0]);
  ok(/^data:image\/png/.test(r.img),k+': la imagen del corte se arma',r.img);
  ok(!r.viejo.includes('Cajas de roatán vendidas'),k+': un corte viejo (sin esos datos) se sigue viendo como antes');
  ok(!errs.length,k+': sin errores',errs)}
 console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
