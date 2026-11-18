/* 127 · El cobro de un cliente con deudas (Ricardo, 18 nov): si ya debe, de contado (sin botones de fiar);
   el paso Cobro en orden: esta entrega → lo que ya debía y el abono → cómo paga → total → ¿Cómo pagó? → ¿Con cuánto te pagó? (cambio);
   sin la comisión del chofer; y en "Cajas vacías y taras", si ya debe taras, el recordatorio "Prestar taras es una facilidad…".
   Uso: node t127.js [archivo.html]   (por defecto la versión real) */
const {chromium}=require('playwright');
const URL=process.argv[2]||'/mnt/user-data/outputs/platanos-primera-vez.html';
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
 const p=await (await b.newContext({viewport:{width:360,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11});await p.goto('file://'+URL);await p.waitForTimeout(900);
 const r=await p.evaluate(()=>{if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'}];
   U.cli=[{n:'Cliente Debe',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:1000,vac:2,ch:'0'},{n:'Cliente Limpio',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  var ch=S.choferes.filter(c=>esCh(c)&&!esAdm(c))[0];S.role='rep';S.chofHoy=ch.id;S.pinOk[pinKey()]=true;S.tutVisto={rep:true};S.salida.ok=true;S.inv.reparto=30;S.inv.repartoKg=50;S.cfg.comCobra=true;
  var c=S.cli[0];c.credOk=true;c.lim=5000;c.credDesde=iso(new Date(TODAY.getTime()-4*864e5));c.vacDesde=c.credDesde;S.stops=S.cli.map(x=>({c:x.id}));S.cur=0;resetDraft(c);S.d.R=5;S.d.M=10;S.tab.rep='entrega';
  entPon125(1);render();var m=document.querySelector('main'),t=m.innerText,pos=function(re){var i=t.search(re);return i};
  var o={contado:/De contado: ya debe \$1,000 de antes/.test(t),botones:!![].slice.call(m.querySelectorAll('[data-act="mode"]')).filter(x=>x.getClientRects().length).length,comision:/ganas \$/.test(t)&&!![].slice.call(m.querySelectorAll('*')).filter(x=>x.children.length<2&&/ganas \$/.test(x.textContent)&&x.getClientRects().length).length,
   orden:[pos(/Esta entrega:/),pos(/Lo que ya debía/),pos(/De contado:/),pos(/\nA cobrar/),pos(/¿Cómo pagó\?/),pos(/¿Con cuánto te pagó\?/)]};
  entPon125(2);render();t=m.innerText;o.taras=/Ya te debe 2 taras\. Prestar taras es una facilidad, como el crédito: entre menos, mejor/.test(t);
  S.cur=1;resetDraft(S.cli[1]);S.d.R=2;S.d.M=0;entPon125(1);render();t=m.innerText;o.limpio={botones:!![].slice.call(m.querySelectorAll('[data-act="mode"]')).filter(x=>x.getClientRects().length).length,pregunta:/¿Cómo paga esta entrega\?/.test(t),contado:/De contado:/.test(t),taras:/Prestar taras/.test(t)};
  return o});
 ok(r.contado&&!r.botones,'ya debe: "De contado: ya debe $1,000 de antes" y sin botones de fiar',r);
 ok(r.orden.every((x,i,a)=>x>-1&&(i===0||x>a[i-1])),'orden: esta entrega → lo que ya debía → de contado → a cobrar → ¿Cómo pagó? → ¿Con cuánto te pagó?',r.orden);
 ok(!r.comision,'no sale la comisión del chofer en la venta',r);
 ok(r.taras,'en vacías y taras: "Ya te debe 2 taras. Prestar taras es una facilidad…"',r);
 ok(r.limpio.botones&&r.limpio.pregunta&&!r.limpio.contado&&!r.limpio.taras,'cliente al corriente: "¿Cómo paga esta entrega?" con sus opciones (se le puede fiar)',r.limpio);
 ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
