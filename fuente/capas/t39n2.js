const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});
const errs=[];p.on('pageerror',e=>{errs.push(e.message);console.log('STACK',(e.stack||'').split('\n').slice(0,4).join(' | '))});
let nOK=0,nF=0;const ok=(c,m)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m)};const ev=(f,a)=>p.evaluate(f,a);const W=ms=>p.waitForTimeout(ms);
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await W(400);
await ev(()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);S.role='admin';
 window.act=function(a,ds){var b=document.createElement('button');b.dataset.act=a;Object.keys(ds||{}).forEach(function(k){b.dataset[k]=ds[k]});b.style.display='none';document.body.appendChild(b);b.click();b.remove();if(S.confirm){var o=document.querySelector('[data-act="confok"]');if(o)o.click()}};
 window.llenas=function(){return S.inv.verdes+madR()+S.inv.maduras+S.inv.reparto};window.mal=function(){return cuentasRevisar().filter(function(x){return !x.ok}).map(function(x){return x.n+(x.det?' ('+x.det+')':'')})};render()});
const cuadra=async(m)=>{const x=await ev(()=>mal());ok(!x.length,m+': las cuentas cuadran '+(x.length?JSON.stringify(x):''))};
// 1 maduración
let a=await ev(()=>({ll:llenas(),v:S.inv.verdes,cj:cajasDonde().tot}));
await ev(()=>{S.tab.admin='bodega';S.lf.prod='R';S.lf.q='10';render();act('addlote')});await W(40);
let b1=await ev(()=>({ll:llenas(),v:S.inv.verdes,cj:cajasDonde().tot}));ok(b1.v===a.v-10&&b1.ll===a.ll&&b1.cj===a.cj,'meter 10 cajas a madurar: verdes −10, total de llenas y de cajas igual');
await ev(()=>{var l=S.lotes[S.lotes.length-1];act('sacar',{id:String(l.id)})});await W(40);
let b2=await ev(()=>({ll:llenas(),m:S.inv.maduras,cj:cajasDonde().tot}));ok(b2.ll===a.ll&&b2.cj===a.cj,'sacarlas maduras: el total no cambia');await cuadra('Maduración');
// 2 merma
let m0=await ev(()=>({ll:llenas(),cj:cajasDonde().tot,n:S.tiradas.length}));
await ev(()=>{S.tf={R:2,M:'',mot:'Podrido',foto:null};act('tirar')});await W(40);
let m1=await ev(()=>({ll:llenas(),cj:cajasDonde().tot,t:S.tiradas.slice(-1)[0],c:costoCajaAct()}));
ok(m1.ll===m0.ll-2&&Math.abs(m1.t.valor-2*m1.c)<0.01,'tirar 2 cajas: llenas −2 y la merma vale 2 × costo de la caja ('+Math.round(m1.t.valor)+')');ok(m1.t.quien&&!/Administrador/.test(m1.t.quien),'la merma dice quién la tiró ('+m1.t.quien+')');
ok(m1.cj===m0.cj-2||m1.cj===m0.cj,'cajas: '+m0.cj+' → '+m1.cj+' (las cajas de la fruta tirada '+(m1.cj===m0.cj?'regresan vacías':'se pierden')+')');await cuadra('Merma');
// 3 sueldo con adelanto
let s0=await ev(()=>{var c=S.choferes.filter(function(x){return x.id===1})[0];return {caja:cajaEsp(),k:szCalc(c)}});
await ev(()=>{S.tab.admin='gastos';S.gsec='sueldos';render();var i=document.getElementById('adl_1')||document.createElement('input');i.id='adl_1';i.value='500';if(!i.isConnected)document.body.appendChild(i);act('adelanto',{id:'1'})});await W(40);
let s1=await ev(()=>{var c=S.choferes.filter(function(x){return x.id===1})[0];return {caja:cajaEsp(),k:szCalc(c)}});ok(Math.abs(s1.caja-(s0.caja-500))<0.01,'adelanto de $500: sale de la caja');ok(Math.abs(s1.k.pagar-(s0.k.pagar-500))<0.01,'lo que falta pagarle baja $500 ('+s0.k.pagar+' → '+s1.k.pagar+')');
await ev(()=>act('pagarsz',{id:'1'}));await W(40);let s2=await ev(()=>({caja:cajaEsp()}));
ok(Math.abs((s0.caja-s2.caja)-s0.k.pagar)<0.01,'sueldo completo: en total salió de la caja '+(s0.caja-s2.caja)+' = lo que le tocaba ('+s0.k.pagar+')');await cuadra('Sueldos');
// 4 cobrar cajas que no devuelven
let c0=await ev(()=>{var c=S.cli.filter(function(x){return x.vac>0&&!(x.cred>0)&&!x.oculto})[0];return c?{id:c.id,n:c.n,vac:c.vac,deb:credTotal(),cj:cajasDonde().tot,p:num(S.cajaCfg.precio)}:null});
if(c0){await ev(([id])=>act('cobrarcajas',{id:String(id)}),[c0.id]);await W(40);let c1=await ev(([id])=>{var c=cl(id);return {cred:c.cred,vac:c.vac,desde:c.credDesde,deb:credTotal(),cj:cajasDonde().tot}},[c0.id]);
 ok(c1.vac===0&&Math.abs(c1.cred-c0.vac*c0.p)<0.01&&c1.desde,c0.n+': '+c0.vac+' caja(s) a su deuda a '+c0.p+' y con fecha');ok(c1.cj===c0.cj-c0.vac,'esas cajas salen del total de cajas');await cuadra('Cobrar cajas')}
// 5 recibir una carga
let r0=await ev(()=>{var c=S.cargas.filter(function(x){return x.est==='Por llegar'&&x.cajas>0})[0];return c?{id:c.id,cj:cajasDonde().tot,v:S.inv.verdes,kg:S.inv.kgVerde,cajas:c.cajas,kgM:c.kgM,env:c.vacEnv||0}:null});
if(r0){await ev(([id])=>{S.tab.admin='cargas';act('recibir',{id:String(id)})},[r0.id]);await W(40);let r1=await ev(()=>({cj:cajasDonde().tot,v:S.inv.verdes,kg:S.inv.kgVerde}));
 ok(r1.v===r0.v+r0.cajas&&Math.abs(r1.kg-(r0.kg+r0.kgM))<0.01,'recibir carga: +'+r0.cajas+' cajas verdes y +'+r0.kgM+' kg de macho');ok(r1.cj===r0.cj-r0.env+r0.cajas||r1.cj===r0.cj,'cajas: '+r0.cj+' → '+r1.cj+' (las '+r0.env+' que llevó el camión regresan llenas)');await cuadra('Recibir carga')}
// 6 abono a una carga con saldo pendiente
let k0=await ev(()=>{var c=S.cargas.filter(function(x){return x.est==='Recibida'})[0];c.pag=r2(c.pag-1000);c.pagBase=r2(c.pagBase-1000);return {id:c.id,prov:c.provR||c.prov,pend:cC(c).pend,caja:cajaEsp(),ps:sum(provDeb(),function(p){return p.pen})}});
ok(Math.abs(k0.pend-1000)<0.01,'carga con $1,000 pendiente');
await ev(([id])=>{var i=document.getElementById('ab_'+id)||document.createElement('input');i.id='ab_'+id;i.value='600';if(!i.isConnected)document.body.appendChild(i);act('abonar',{id:String(id)})},[k0.id]);await W(40);
let k1=await ev(([id])=>{var c=cargaById(id);return {pend:cC(c).pend,caja:cajaEsp(),ps:sum(provDeb(),function(p){return p.pen})}},[k0.id]);
ok(Math.abs(k1.pend-400)<0.01&&Math.abs(k1.caja-(k0.caja-600))<0.01,'abono de $600 a la carga: queda $400 y la caja −600');ok(Math.abs(k1.ps-(k0.ps-600))<0.01,'lo que le debes al proveedor también baja $600 ('+k0.ps+' → '+k1.ps+')');await cuadra('Abono a carga');
// 7 venta rápida en la calle
let v0=await ev(()=>({deb:credTotal(),cajas:cajasDonde().tot}));
await ev(()=>{S.role='rep';S.salida.ok=true;S.inv.maduras-=5;S.inv.reparto=5;S.cierre.salioR=5;act('calle',{reg:'0'});S.d.R=2;S.d.M=0;S.d.V=0;S.d.mode='todo';act('guardar')});await W(60);
let v1=await ev(()=>({deb:credTotal(),ch:conChofer(),cajas:cajasDonde().tot,l:S.log.slice(-1)[0]}));ok(v1.deb===v0.deb&&Math.abs(v1.ch-v1.l.total)<0.01,'venta rápida de contado: no deja deuda y el chofer trae '+v1.l.total);await cuadra('Venta rápida');
console.log('\n'+nOK+' OK · '+nF+' FAIL · errores: '+errs.length);await b.close()})();
