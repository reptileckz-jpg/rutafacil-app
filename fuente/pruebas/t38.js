/* 38 · configuración inicial: ayuda por paso, WhatsApp de quien ayuda, el paso es de cada celular, las listas se juntan, aviso de dos personas, solo el dueño toca Empezar */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,350):''))};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:412,height:900}})).newPage();p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(1100);
const ev=(f,a)=>p.evaluate(f,a);let r;
const clic=(act,extra)=>ev(([act,extra])=>{var d=document.createElement('button');d.dataset.act=act;Object.assign(d.dataset,extra||{});document.body.appendChild(d);d.click();d.remove()},[act,extra]);
r=await ev(()=>{var bv=document.getElementById('bienv');if(bv)bv.remove();S.setup.p=0;S.setup.sub75=0;render();var o=document.getElementById('setov');return {o:!!o,t:o?o.innerText:'',tel:!!document.querySelector('#setov [data-x="su38tel"]')}});
ok(r.o&&/¿Qué hago aquí\?/.test(r.t),'en cada paso sale "❓ ¿Qué hago aquí?"',r.t.slice(0,200));
ok(r.tel,'en la Bienvenida se puede poner el WhatsApp de quien ayuda');
await clic('su38ayu');r=await ev(()=>(document.querySelector('#setov [data-x="su38txt"]')||{}).innerText||'');
ok(/nombre del negocio/.test(r),'"¿Qué hago aquí?" explica el paso en palabras sencillas',r);
r=await ev(()=>{S.cfg.wa37='2281234567';S.setup.p=4;render();return {wa:!!document.querySelector('#setov [data-act="su38wa"]'),t:(document.querySelector('#setov [data-x="su38txt"]')||{}).innerText||''}});
ok(r.wa&&/clientes/.test(r.t),'con número: "📲 Pedir ayuda"; la ayuda cambia según el paso',r);
/* el paso y los formularios son de cada celular */
r=await ev(()=>{var u=nbUnidades().filter(x=>x.k==='setup')[0];var g=u.get();S.setup.cf={n:'Escribiendo…',dias:[]};var v=JSON.parse(JSON.stringify(g));v.p=1;v.cf={n:'otro'};u.set(v);return {getP:'p' in g,getCf:'cf' in g,p:S.setup.p,cf:S.setup.cf.n}});
ok(!r.getP&&!r.getCf,'el paso y los formularios a medio llenar no se suben a la nube',r);
ok(r.p===4&&r.cf==='Escribiendo…','si llega lo de otro celular, no te cambia el paso ni lo que escribes',r);
/* las listas se juntan */
r=await ev(()=>{S.setup.cli=[];S.setup.cli.push({n:'Tienda Mía',dias:[1]});render();var mio=S.setup.cli[0]._i38;
 var remoto=[{n:'Tienda de Ricardo',dias:[2],_i38:'zzz1'}];NB.C['s~setup']=NB.C['s~setup']||{};NB.C['s~setup']['e:cli|=']=nbJ(remoto);
 var u=nbUnidades().filter(x=>x.k==='setup')[0];var v=JSON.parse(JSON.stringify(u.get()));v.cli=remoto.slice();u.set(v);
 return {mio:!!mio,n:S.setup.cli.map(x=>x.n)}});
ok(r.mio&&r.n.indexOf('Tienda Mía')>-1&&r.n.indexOf('Tienda de Ricardo')>-1,'si los dos agregan clientes a la vez, se juntan (antes uno borraba lo del otro)',r);
r=await ev(()=>{render();var i=S.setup.cli.findIndex(x=>x.n==='Tienda de Ricardo');var b=document.createElement('button');b.dataset.act='suquita';b.dataset.k='cli';b.dataset.i=String(i);document.body.appendChild(b);b.click();b.remove();
 var u=nbUnidades().filter(x=>x.k==='setup')[0];var v=JSON.parse(JSON.stringify(u.get()));v.cli=[{n:'Tienda de Ricardo',dias:[2],_i38:'zzz1'}];u.set(v);return S.setup.cli.map(x=>x.n)});
ok(r.indexOf('Tienda de Ricardo')<0,'lo que uno quita no regresa con la nube',r);
/* dos personas a la vez */
r=await ev(()=>{S.setup.en38={otro:{q:'Ricardo',t:Date.now(),p:4}};render();return (document.querySelector('#setov [data-x="su38otros"]')||{}).innerText||''});
ok(/Ricardo \(paso 5\)/.test(r)&&/también está en la configuración/.test(r),'aviso: "👥 Ricardo (paso 5) también está en la configuración"',r);
r=await ev(()=>{S.setup.en38={otro:{q:'Ricardo',t:Date.now()-5*60000,p:4}};render();return !!document.querySelector('#setov [data-x="su38otros"]')});
ok(!r,'si ya se salió (sin señal hace más de 1.5 min), ya no avisa',r);
/* solo el dueño toca Empezar */
r=await ev(()=>{var on=NB.on,pf=NB.perfil;NB.perfil={duenio:false,rol:'admin'};NB.on=true;S.setup.p=7;render();var o=document.getElementById('setov');var t=o?o.innerText:'';var bt=!!document.querySelector('#setov [data-act="sufin"]');NB.on=on;NB.perfil=pf;render();var bt2=!!document.querySelector('#setov [data-act="sufin"]');return {t:t.slice(-200),bt,bt2}});
ok(!r.bt&&/El dueño toca "Empezar"/.test(r.t),'quien ayuda no ve "Empezar": lo termina el dueño en su celular',r);
ok(r.bt2,'el dueño sí ve "Empezar"',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
