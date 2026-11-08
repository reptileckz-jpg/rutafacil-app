// Prueba de números: un día completo de trabajo, revisando caja, deudas, inventario y cajas en cada paso
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});
const errs=[];p.on('pageerror',e=>{errs.push(e.message);console.log('STACK',(e.stack||'').split('\n').slice(0,4).join(' | '))});
let nOK=0,nF=0;const ok=(c,m)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m)};const ev=(f,a)=>p.evaluate(f,a);
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(400);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.cfg.crCh='9999999';S.cfg.crCli='9999999';S.cfg.bD1='99999';S.cfg.bD2='99999';S.cfg.bD3='99999';S.cli.forEach(function(c){c.buro={n:0,ok:0};c.limMan=null;c.limRev=false});
 window.act=function(a,ds){var b=document.createElement('button');b.dataset.act=a;Object.keys(ds||{}).forEach(function(k){b.dataset[k]=ds[k]});b.style.display='none';document.body.appendChild(b);b.click();b.remove();if(S.confirm){var o=document.querySelector('[data-act="confok"]');if(o)o.click()}};
 window.foto=function(){return {caja:Math.round(cajaEsp()*100)/100,deben:Math.round(credTotal()*100)/100,prov:Math.round(sum(provDeb(),function(p){return p.pen})*100)/100,chofer:Math.round(conChofer()*100)/100,inv:JSON.parse(JSON.stringify(S.inv)),cajas:cajasDonde().tot,log:S.log.length,mal:cuentasRevisar().filter(function(x){return !x.ok}).map(function(x){return x.n+(x.det?' ('+x.det+')':'')})}};
 render()});
const F=()=>ev(()=>foto());const W=ms=>p.waitForTimeout(ms);
const cuadra=async(paso)=>{const f=await F();ok(!f.mal.length,paso+': todas las revisiones de cuentas cuadran '+(f.mal.length?JSON.stringify(f.mal):''));return f};
let f0=await cuadra('Inicio del día');
// ---- salida: 30 cajas maduras y 100 kg de macho maduro pasan al camión
await ev(()=>{S.role='rep';S.inv.maduras-=30;S.inv.kgMaduro=r2(S.inv.kgMaduro-100);S.inv.reparto=30;S.inv.repartoKg=100;S.cierre.salioR=30;S.cierre.salioM=100;S.salida.ok=true;S.tab.rep='ruta';render()});
let f1=await F();ok(f1.cajas===f0.cajas,'al salir, el total de cajas no cambia ('+f0.cajas+' = '+f1.cajas+')');
const entrega=(i,cfg)=>ev(([i,cfg])=>{S.cur=i;var st=S.stops[i];resetDraft(cl(st.c));S.tab.rep='entrega';Object.keys(cfg).forEach(function(k){S.d[k]=cfg[k]});var k=entregaCalc();window._k={total:k.total,pago:k.pago,abono:k.abono,ef:k.efectivo,pr:k.pr,pm:k.pm,c:k.c.id,cred0:k.c.cred,vac0:k.c.vac};act('guardar');return window._k},[i,cfg]);
// 1. contado
let c1=await ev(()=>{var c=cl(S.stops[0].c);return {n:c.n,cred:c.cred,vac:c.vac}});
let k1=await entrega(0,{R:4,M:30,V:2,mode:'todo'});await W(80);let f=await F();
ok(Math.abs(k1.total-(4*k1.pr+30*k1.pm))<0.01,'entrega de contado: 4 cajas × '+k1.pr+' + 30 kg × '+k1.pm+' = '+k1.total);
ok(f.caja===f1.caja&&Math.abs(f.chofer-k1.total)<0.01,'el cobro del chofer todavía no entra a la caja; lo trae él ('+f.chofer+')');
ok(await ev(([id])=>cl(id).cred,[k1.c])===c1.cred&&await ev(([id])=>cl(id).vac,[k1.c])===c1.vac+4-2,c1.n+': deuda igual, cajas que debe '+c1.vac+' + 4 − 2');
ok(f.inv.reparto===26&&f.inv.repartoKg===70,'camión: 26 cajas y 70 kg');ok(f.cajas===f1.cajas,'total de cajas igual (las vacías que regresan van en el camión)');await cuadra('Entrega de contado');
// 2. a crédito
let k2=await entrega(1,{R:2,M:0,V:0,mode:'credito'});await W(80);f=await F();
ok(Math.abs(f.deben-(f0.deben+k2.total))<0.01,'a crédito: lo que te deben sube '+k2.total+' ('+f0.deben+' → '+f.deben+')');ok(Math.abs(f.chofer-k1.total)<0.01,'el chofer no trae más dinero');await cuadra('Entrega a crédito');
// 3. pagó una parte
let k3=await entrega(2,{R:3,M:10,V:0,mode:'parte',pago:'300'});await W(80);f=await F();
ok(Math.abs(f.deben-(f0.deben+k2.total+k3.total-300))<0.01,'pagó una parte: queda a deber '+(k3.total-300));ok(await ev(([id])=>!!cl(id).credDesde,[k3.c]),'la deuda nueva tiene fecha de inicio');await cuadra('Pago parcial');
// 4. pagó todo y abonó a lo que debía
let k4=await entrega(3,{R:2,M:0,V:2,mode:'todo',abono:'1000'});await W(80);f=await F();
ok(Math.abs(f.deben-(f0.deben+k2.total+k3.total-300-1000))<0.01,'abono de $1,000 baja su deuda');ok(Math.abs(f.chofer-(k1.total+300+k4.total+1000))<0.01,'el chofer trae '+f.chofer);await cuadra('Abono en la entrega');
// 5. abono más grande que la deuda
let k5=await ev(()=>{var i=S.stops.map(function(s){return s.c}).indexOf(S.stops[4].c);S.cur=4;resetDraft(cl(S.stops[4].c));S.d.R=1;S.d.M=0;S.d.mode='todo';S.d.abono=String(cl(S.stops[4].c).cred+5000);var k=entregaCalc();return {ab:k.abono,deb:cl(S.stops[4].c).cred}});
ok(k5.ab<=k5.deb+0.005,'no deja abonar más de lo que debe (abona '+k5.ab+' de '+k5.deb+')');
// 6. gasto y recarga del chofer
await ev(()=>{S.tab.rep='ruta';S.gx={tipo:'Comida o viáticos',monto:'120',nota:'comida',foto:'data:image/jpeg;base64,AA'};act('gxsave');S.rc={tipo:'',precio:'25.5',litros:'20',total:'',manual:false,foto:'data:image/jpeg;base64,AA'};act('recargar');render()});await W(80);f=await F();
ok(Math.abs(f.chofer-(k1.total+300+k4.total+1000-120-510))<0.01,'el chofer trae lo cobrado − comida $120 − gasolina $510');ok(f.caja===f1.caja,'la caja no cambia: el chofer lo pagó de lo cobrado');await cuadra('Gastos del chofer');
// 7. el chofer corrige la entrega a crédito: eran 3 cajas, no 2
let antes=await F();
await ev(()=>{act('entcorr',{i:'1'})});await W(60);
let mid=await ev(()=>({tab:S.tab.rep,deb:credTotal(),rep:S.inv.reparto,log:S.log.length}));
ok(mid.tab==='entrega'&&Math.abs(mid.deb-(antes.deben-k2.total))<0.01&&mid.rep===antes.inv.reparto+2,'al corregir, primero se deshace la entrega (deuda y camión regresan)');
await ev(()=>{S.d.R=3;S.d.mode='credito';act('guardar')});await W(80);f=await F();
let k2b=await ev(()=>{var l=S.log.filter(function(x){return x.c===S.stops[1].c}).slice(-1)[0];return l.total});
ok(Math.abs(f.deben-(antes.deben-k2.total+k2b))<0.01&&f.log===antes.log,'corrección: la deuda queda con 3 cajas ('+k2b+') y no se duplica la entrega');
ok(await ev(()=>S.avPrecio.some(function(x){return /corrigió la entrega/.test(x)})),'al administrador le llega el aviso de la corrección');await cuadra('Corrección de entrega');
// 7b. corregir y salirse sin guardar deja todo como estaba
antes=await F();await ev(()=>{act('entcorr',{i:'0'})});await W(40);await ev(()=>{act('entvolver');});await W(30);await ev(()=>{var b=document.querySelector('[data-act="corrno"]');if(b)b.click()});await W(60);f=await F();
ok(f.deben===antes.deben&&f.chofer===antes.chofer&&f.inv.reparto===antes.inv.reparto&&f.log===antes.log,'si empieza a corregir y se sale, la entrega se queda como estaba');await cuadra('Corrección cancelada');
// 8. cierre del chofer
let ef=await ev(()=>cierreRes().efectivo);
await ev(()=>{S.cierre.gxConf=true;S.cierre.fotoReg='data:image/png;base64,AA';S.cierreP=5;S.tab.rep='cierre';render();act('enviar')});await W(80);f=await F();
ok(await ev(()=>S.cierre.sent),'cierre enviado');ok(f.caja===f1.caja&&Math.abs(f.chofer-ef)<0.01,'enviado pero no recibido: la caja no cambia, el chofer trae '+ef);
let vr=await ev(()=>sum(S.log,function(l){return l.Vr||0}));ok(f.cajas===f0.cajas-vr,'al cerrar, el total de cajas es el mismo del inicio ('+f.cajas+')');
ok(f.inv.reparto===0&&f.inv.repartoKg===0,'el camión queda vacío');await cuadra('Cierre enviado');
// 9. el administrador recibe $50 menos
await ev(()=>{S.role='admin';S.tab.admin='cierreadm';S.cierreRec=String(Math.round((cierreRes().efectivo-50)*100)/100);render();act('regcierre')});await W(80);f=await F();
ok(Math.abs(f.caja-(f1.caja+ef-50))<0.01,'la caja sube lo que de verdad entregó ('+(ef-50)+'), no lo que debía');ok(await ev(()=>S.faltantes.some(function(x){return Math.abs(x.m-50)<0.01})),'faltante de $50 al chofer');ok(f.chofer===0,'ya no trae nada pendiente');await cuadra('Efectivo recibido');
let cajaR=f.caja;
// 10. segundo cierre: el primero no se pierde
await ev(()=>{S.role='rep';act('seguir',{k:'carga'})});await W(60);f=await F();ok(Math.abs(f.caja-cajaR)<0.01,'al empezar un segundo cierre, el dinero del primero sigue en la caja ('+f.caja+')');await cuadra('Segundo cierre');
// 11. abono que cobra el administrador
await ev(()=>{S.role='admin';S.tab.admin='clientes';render();var i=document.createElement('input');i.id='abc_1';i.value='500';document.body.appendChild(i);act('cobrar',{id:'1'});i.remove()});await W(60);let f11=await F();
ok(Math.abs(f11.caja-(cajaR+500))<0.01&&Math.abs(f11.deben-(f.deben-500))<0.01,'abono de $500: caja +500 y deuda −500');await cuadra('Abono en oficina');
// 12. compra de cajas
await ev(()=>{S.cj={tipo:'compra',n:'10',costo:'350',fis:''};act('cjcompra')});await W(60);f=await F();ok(Math.abs(f.caja-(f11.caja-350))<0.01&&f.cajas===f11.cajas+10,'compra de 10 cajas: caja −350 y 10 cajas más');await cuadra('Compra de cajas');
let f12=f;
// 13. pagar la luz, deshacer el pago (se anula) y volver a pagar
let luz=await ev(()=>{var i=-1;S.fijos.forEach(function(x,k){if(x.n==='Luz')i=k});return [i,num(S.fijos[i].m)]});
await ev(([i])=>act('fijopag',{i:String(i)}),luz);await W(40);f=await F();ok(Math.abs(f.caja-(f12.caja-luz[1]))<0.01,'pagar la luz: caja −'+luz[1]);
await ev(([i])=>{act('fijodespagar',{i:String(i)});act('anmot',{v:'Me equivoqué de monto'});act('anularok')},luz);await W(60);f=await F();
ok(Math.abs(f.caja-f12.caja)<0.01&&await ev(()=>S.anulados.length===1),'deshacer el pago lo anula: la caja regresa y queda registrado');
await ev(([i])=>act('fijopag',{i:String(i)}),luz);await W(40);f=await F();ok(Math.abs(f.caja-(f12.caja-luz[1]))<0.01,'pagarla otra vez: solo se cuenta una vez');await cuadra('Gasto fijo');
// 14. anular un gasto con motivo (nunca se borra)
await ev(()=>{S.gastos.push({t:'Otro',m:200,n:'prueba',f:iso(TODAY),h:'12:00',q:'Ricardo'});render()});let fA=await F();
await ev(()=>{var i=S.gastos.length-1;act('gxdel2',{i:String(i)});act('anularok')});await W(40);ok(await ev(()=>S.gastos.some(function(g){return g.n==='prueba'})),'sin motivo no se anula');
await ev(()=>{act('anmot',{v:'Se registró dos veces'});act('anularok')});await W(40);f=await F();
ok(Math.abs(f.caja-(fA.caja+200))<0.01&&await ev(()=>S.anulados.some(function(x){return x.motivo==='Se registró dos veces'&&x.por})),'gasto anulado: la caja regresa y queda quién y por qué');await cuadra('Anular gasto');
// 15. deuda con proveedor y abono
let fP=await F();await ev(()=>{S.pdF={n:'Roly',m:'5000',c:'Fruta',o:'',f:iso(TODAY),v:{t:'sin'}};act('pdsave')});await W(40);f=await F();ok(Math.abs(f.prov-(fP.prov+5000))<0.01,'deuda nueva con Roly: debes $5,000 más');
await ev(()=>{S.tab.admin='cargas';S.openProv='Roly';render();var i=document.getElementById('abp')||document.createElement('input');i.id='abp';i.value='2000';if(!i.isConnected)document.body.appendChild(i);act('abonoprov',{n:encodeURIComponent('Roly')})});await W(60);let fQ=await F();
ok(Math.abs(fQ.prov-(fP.prov+3000))<0.01&&Math.abs(fQ.caja-(f.caja-2000))<0.01,'abono de $2,000 a Roly: deuda −2,000 y caja −2,000');await cuadra('Proveedor');
// 16. venta local y su corte
await ev(()=>{S.openProv=null;S.role='local';S.tab.local='local';S.vl.lin=[{p:S.vlProd.filter(function(x){return x.inv==='M'})[0].n,kg:'10'}];render();act('vlvender')});await W(60);
let vl=await ev(()=>({n:S.vlVentas.length,tot:sum(S.vlVentas,function(x){return x.tot}),pM:num(S.vlProd.filter(function(x){return x.inv==='M'})[0].p)}));ok(Math.abs(vl.tot-10*vl.pM)<0.01,'venta local: 10 kg × '+vl.pM+' = '+vl.tot);
f=await F();ok(Math.abs(f.caja-fQ.caja)<0.01,'la venta local entra a la caja hasta que se recibe el corte');
await ev(()=>{act('vlcorte');S.role='admin';S.tab.admin='inicio';S.vlCorteRec=String(sum(S.vlVentas,function(x){return x.tot}));render();act('vlcorterec')});await W(60);let fV=await F();
ok(Math.abs(fV.caja-(fQ.caja+vl.tot))<0.01,'al recibir el corte la caja sube '+vl.tot);await cuadra('Venta local');
// 17. la misma ganancia en todas las pantallas
let g=await ev(()=>{S.tab.admin='estadisticas';S.st.sec='resumen';render();document.querySelectorAll('details').forEach(function(d){d.open=true});var t=document.body.innerText,m=function(rx){var x=t.match(rx);return x?x[1]:null};return [m(/Ganancia \(después de gastos, merma y fijos\)\n([^\n]+)/),m(/Utilidad contable\n([^\n]+)/)]});
ok(g[0]&&g[1]&&g[0].replace(/ de .*/,'')===g[1],'ganancia del mes = utilidad contable ('+g.join(' / ')+')');
// 18. la caja que dice Inicio es la misma que pide el cierre de caja
let cc=await ev(()=>{S.tab.admin='inicio';S.finVer=Date.now();S.finOpen='efectivo';render();document.querySelectorAll('details').forEach(function(d){d.open=true});var t=document.body.innerText,a=t.match(/Efectivo en caja hoy: ([^\n]+)/),b=t.match(/Debería haber en caja\n([^\n]+)/);return [a&&a[1],b&&b[1],money(cajaEsp())]});
ok(cc[0]===cc[2]&&cc[1]===cc[2],'Inicio y el cierre de caja dicen lo mismo ('+cc.join(' / ')+')');
// 19. cierre de caja y anular sin PIN no se puede (en la final pide PIN)
await ev(()=>{S.cajaCnt=String(cajaEsp());act('cajacierre')});await W(40);ok(await ev(()=>S.cajaCierres.slice(-1)[0]&&Math.abs(S.cajaCierres.slice(-1)[0].dif)<0.01),'cierre de caja: cuadra al peso');
await cuadra('Fin del día');
console.log('\n'+nOK+' OK · '+nF+' FAIL · errores: '+errs.length);errs.slice(0,5).forEach(e=>console.log('ERR',e));
await b.close()})();
