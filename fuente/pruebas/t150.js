/* 150 · carga con un precio raro (la caja cuesta más de lo que se vende) pregunta antes de seguir · 153 · billetes obligatorios en el cierre ·
   154 · odómetro contra la ruta · 155 · "Hoy toca recordarle a N" · 157 · merma alta por proveedor · Ajustes → "🛡️ Controles". */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
let resp=true,dlg=[];p.on('dialog',d=>{dlg.push(d.message());if(d.type()==='confirm'&&!resp)d.dismiss();else d.accept()});
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=18;try{localStorage.clear()}catch(e){}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];
 U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Toño',a:'y',tel:'6640000002',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[{n:'Roly',tel:'3'}];S.precio.R=275;S.precio.M=20;suAplicar();
 S.role='admin';S.pinOk[pinKey()]=true;S.tutVisto={rep:true,admin:true}});

/* ---------- 150 ---------- */
const sig=()=>ev(()=>{var b=document.querySelector('#cmov [data-act="cmsig"]');b.click();return S.cm.paso});
r=await ev(()=>{cmNuevo();var m=S.cm;m.R=true;m.quien='prov';m.provR=provNames()[0];m.kgR='2000';m.cajas='100';m.pR='200';var P=cmPasos();m.paso=P.indexOf('R');render();return m.paso});
resp=false;dlg=[];let p0=r,p1=await sig();
ok(p1===p0&&dlg.length===1&&/con \$200 el kilo, cada caja \(20 kg\) te cuesta \$4,000 y la vendes en \$275/.test(dlg[0])&&/precio por KILO/.test(dlg[0]),'150 · precio de la caja escrito como precio del kilo: pregunta UNA vez y no sigue si dices que no',[p0,p1,dlg]);
await ev(()=>{S.cm.pR='10';render()});dlg=[];p1=await sig();ok(p1===p0+1&&dlg.length===0,'con el precio bien (caja a $200, se vende a $275) sigue sin preguntar',[p0,p1,dlg]);
await ev(()=>{S.cm.paso--;S.cm.pR='14';render()});resp=true;dlg=[];p1=await sig();ok(p1===p0+1&&dlg.length===1,'si la caja cuesta más de lo que se vende ($280) y dices "sí, está bien", sigue',[p1,dlg.length]);
await ev(()=>{S.cm.paso--;render()});dlg=[];p1=await sig();ok(p1===p0+1&&dlg.length===0,'con los mismos números ya no vuelve a preguntar',[p1,dlg.length]);
await ev(()=>{S.cm=null;render()});

/* ---------- 153 ---------- */
await ev(()=>{var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;S.role='rep';S.chofHoy=D.id;chCambiar(D.id);S.pinOk[pinKey()]=true;S.salida.ok=true;
 S.log.push({c:S.cli[0].id,R:4,M:0,V:0,pr:275,pm:20,total:1100,pago:1100,abono:0});S.stops=[{c:S.cli[0].id,done:true}];S.tab.rep='cierre';S.cierreP=4;render()});
r=await ev(()=>{var m=document.querySelector('main [data-key="efpaso"]');return {t:m?m.innerText:'',ent:!!document.getElementById('efent'),open:!!(m&&m.querySelector('details[data-k="efbilld"][open]'))}});
ok(/Cuenta tus billetes/.test(r.t)&&!r.ent&&r.open,'153 · en "¿Cuánto entregas?" sale abierto "Cuenta tus billetes" (ya no el "Entrego $")',r);
const paso5=()=>ev(()=>{var x=document.createElement('button');x.dataset.act='cipaso';x.dataset.v='5';document.querySelector('main').appendChild(x);x.click();x.remove();return S.cierreP});
r=await paso5();ok(r===4,'sin contar los billetes no puede seguir',r);
r=await ev(()=>{var i=document.getElementById('efb500');i.value='2';i.dispatchEvent(new Event('input',{bubbles:true}));var j=document.getElementById('efb100');j.value='1';j.dispatchEvent(new Event('input',{bubbles:true}));return [efEntrega(S.cierre),document.getElementById('efbtot').textContent]});
ok(r[0]===1100&&/1,100/.test(r[1]),'la app suma lo contado (2 de $500 + 1 de $100 = $1,100)',r);
r=await paso5();ok(r===5,'ya contados, sigue',r);
r=await ev(()=>{S.cfg.bill153='opc';S.cierreP=4;S.cierre.bill=null;S.cierre.billOn=false;render();var x=!!document.getElementById('efent');var y=document.createElement('button');y.dataset.act='cipaso';y.dataset.v='5';document.querySelector('main').appendChild(y);y.click();y.remove();S.cfg.bill153='';return [x,S.cierreP]});
ok(r[0]&&r[1]===5,'con "Opcional" en Ajustes es como antes ("Entrego $" y puede seguir)',r);

/* ---------- 154 ---------- */
r=await ev(()=>{S.cierre.odoIni=1000;S.cierre.odo=1300;S.rgRes={f:S.rutaDia80||iso(TODAY),fuente:'google',completo180:true,ahora:{km:120,min:200},antes:{km:130,min:220}};/* 180: Google ordenado desde la bodega antes de entregar */S.cierreP=0;render();var x=document.querySelector('main [data-k="km154"]');return [km154(),x?x.innerText:'']});
ok(r[0]&&r[0].t==='mas'&&r[0].rec===300&&r[0].esp===120&&r[0].src==='Google'&&/Recorriste 300 km y la ruta era de ~120 km \(según Google\): 180 km de más/.test(r[1]),'154 · el chofer ve que recorrió 180 km de más (según Google)',r);
r=await ev(()=>{S.cierre.odo=1130;render();return [km154().t,!!document.querySelector('main [data-k="km154"]')]});ok(r[0]===''&&!r[1],'si cuadra, no sale nada',r);
r=await ev(()=>{S.cierre.odo=1040;return km154().t});ok(r==='menos','si recorrió la mitad o menos: "revisa que el odómetro esté bien escrito"',r);
r=await ev(()=>{S.cierre.odo=1300;var d=corteDatos();return d.km154});ok(r&&r.rec===300&&r.esp===120,'va en el corte del cierre',r);
r=await ev(()=>{S.cierre.corte=corteDatos();S.role='admin';S.rcv={p:0};var h='';try{h=rcHTML()}catch(e){h='ERR '+e.message}S.rcv=null;var d=document.createElement('div');d.innerHTML=h;var x=d.querySelector('[data-k="km154a"]');return x?x.innerText:h.slice(0,200)});
ok(/Kilometraje de más/.test(r)&&/Recorrió 300 km/.test(r),'al recibir el cierre, el administrador ve el aviso',r);

/* ---------- 155 ---------- */
await ev(()=>{S.role='admin';S.pinOk[pinKey()]=true;var c=S.cli[1];c.cred=800;c.credDesde=iso(new Date(TODAY.getTime()-20*864e5));c.recF91=null;S.tab.admin='inicio';render()});
r=await ev(()=>{var k=document.querySelector('main [data-x="hoy92"] [data-k="cb"]'),it=k&&k.closest('.it92');return [toca155().length,it?it.textContent:'']});
ok(r[0]===1&&/Cobrar a 1 clientes? con plazo vencido \(\$800\) · 📲 hoy toca recordarle a 1/.test(r[1])&&/Ir ›/.test(r[1]),'155 · en "Hoy" (Inicio): "Cobrar a 1 cliente… · 📲 hoy toca recordarle a 1" · Ir ›',r);
r=await ev(()=>{document.querySelector('main [data-x="hoy92"] [data-k="cb"]').closest('.it92').querySelector('[data-act="cli92"]').click();return [S.tab.admin,S.cob91&&S.cob91.seq,document.querySelector('main').innerText.match(/Mandando a los vencidos: 1 de 1/)!=null]});
ok(r[0]==='clientes'&&r[1].length===1&&r[2],'lo toca y empieza a mandar uno por uno',r);
r=await ev(()=>{S.cli[1].recF91=iso(new Date(TODAY.getTime()-3*864e5));S.cob91=null;S.tab.admin='inicio';render();return [toca155().length,/hoy toca recordarle/i.test((document.querySelector('main [data-x="hoy92"]')||{}).textContent||'')]});
ok(r[0]===0&&!r[1],'si ya se le recordó hace 3 días (cada 7), hoy no toca',r);

/* ---------- 157 ---------- */
r=await ev(()=>{S.cargas.push({id:S.nextCarga++,fecha:iso(TODAY),prov:'Roly',kgR:1000,pR:10,cajas:50,kgM:0,pM:0,t:{diesel:0,comida:0,casetas:0,extra:0},extras:[],pag:0,est:'Recibida',vCaja:0,vKgM:0,mg:30,pagBase:0,trBase:0,otros:[],trMode:'kilos'});
 S.mermas.push({tipo:'Fruta tirada',fecha:iso(TODAY),R:3,M:0,valor:800,txt:'x'});var s=merma157(7);render();var x=document.querySelector('main [data-k="merma157"]');return {s:s,t:x?x.textContent:''}});
ok(r.s.pct===8&&/Merma alta esta semana: 8%/.test(r.t)&&/Roly/.test(r.t)&&/tu límite: 5%/.test(r.t),'157 · merma de la semana 8% (límite 5%): sale el aviso con cada proveedor',r);
r=await ev(()=>{S.cfg.merma157='10';render();return !!document.querySelector('main [data-k="merma157"]')});ok(!r,'con el límite en 10% no sale');

/* ---------- Ajustes ---------- */
r=await ev(()=>{S.aj=true;var h=ajHTML();S.aj=false;var d=document.createElement('div');d.innerHTML=h;var x=d.querySelector('[data-k="aj153"]');return x?x.innerText:''});
ok(/Controles/.test(r)&&/Contar billetes en el cierre/.test(r)&&/merma de la semana/.test(r)&&/Recordarle a un cliente/.test(r),'Ajustes → "🛡️ Controles": billetes, merma y recordatorios',r.slice(0,200));
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
