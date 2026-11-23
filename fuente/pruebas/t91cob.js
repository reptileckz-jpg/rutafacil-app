/* Cobranza (tema-cobranza.js): tarjeta de Inicio, pantalla, grupos, plazo propio, estado de cuenta, promesa, abono, chofer */
const {chromium}=require('playwright');const SC=process.argv[2];(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await p.addInitScript(()=>{window.__pnTest=1});
let ok=0,fail=0;const T=(n,c,x)=>{if(c){ok++;console.log('OK  ',n)}else{fail++;console.log('FAIL',n,x===undefined?'':JSON.stringify(x))}};
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);
await p.evaluate(()=>{var U=S.setup;U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];
 U.cli=[{n:'Fruber',a:'x',tel:'6641234567',dias:[0,1,2,3,4,5,6],cred:1200,vac:0,ch:'0'},{n:'Benavides',a:'y',tel:'6640000000',dias:[2],cred:300,vac:0,ch:'0'},{n:'La Güera',a:'z',tel:'6641111111',dias:[3],cred:800,vac:0,ch:'1'},{n:'Sin deuda',a:'w',tel:'1',dias:[1],cred:0,vac:0,ch:'1'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar();
 var d=function(n){return iso(new Date(TODAY.getTime()-n*864e5))};var F=S.cli.find(c=>c.n==='Fruber'),B=S.cli.find(c=>c.n==='Benavides'),G=S.cli.find(c=>c.n==='La Güera');F.credDesde=d(25);B.credDesde=d(2);G.credDesde=d(8);
 S.rutasHist=[{f:d(25),ch:F.chofer,log:[{c:F.id,R:4,M:10,total:1400,pago:200,abono:0}],enviado:true}];
 S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';S.popVisto={admin:iso(TODAY)};render()});
let r=await p.evaluate(()=>{var h=document.querySelector('[data-x="hoy92"]'),f=[...document.querySelectorAll('.finwrap [data-act="finopen"]')].find(x=>/deben/i.test(x.textContent));return {t:(h&&h.textContent)+' '+c30Items().map(o=>o.t).join(' '),tile:!!f,viejo:!!document.querySelector('[data-k="cobrarhoy"],[data-x="cob91c"]')}});
T('Inicio: en "Hoy" sale cobrar a los 2 vencidos ($2,000)',/Cobrar a 2 clientes con plazo vencido \(\$2,000\)/.test(r.t||''),r.t);T('Inicio: "Te deben" está en los números de hoy',r.tile);T('Inicio: ya no salen las tarjetas viejas de cobranza',!r.viejo);
await p.evaluate(()=>{[...document.querySelectorAll('.finwrap [data-act="finopen"]')].find(x=>/deben/i.test(x.textContent)).click()});await p.waitForTimeout(200);
r=await p.evaluate(()=>{var o=document.getElementById('cob91i');var g=[...o.querySelectorAll('.cob91g')].map(x=>x.textContent);var cs=[...o.querySelectorAll('.cob91c')].map(x=>x.querySelector('b').textContent+'|'+x.className);return {g,cs,sw:o.scrollWidth,cw:o.clientWidth,ch:[...o.querySelectorAll('[data-act="cob91ch"]')].length,todos:!!o.querySelector('[data-act="cob91s"]')}});
T('Cobranza: rojo Fruber (25 días), amarillo La Güera (8), verde Benavides (2)',JSON.stringify(r.cs)===JSON.stringify(['Fruber|cob91c ro','La Güera|cob91c am','Benavides|cob91c ']),r.cs);
T('Cobranza: filtro por chofer (Todos + 2)',r.ch===3,r.ch);T('Cobranza: no se sale a lo ancho',r.sw<=r.cw+1,[r.sw,r.cw]);T('Cobranza: mandar a todos los vencidos',r.todos);
await p.screenshot({path:SC+'/cob1.png'});
/* estado de cuenta */
r=await p.evaluate(()=>{var a=document.querySelector('#cob91i .cob91c.ro a[data-act="cob91wa"]');return decodeURIComponent(a.href.split('text=')[1])});
T('Estado de cuenta: desglose de la compra',/4 cajas de roatán y 10 kg de macho por \$1,400, pagó \$200, quedó a crédito \$1,200/.test(r),r);T('Estado de cuenta: saldo',/Saldo pendiente: \*\$1,200\*/.test(r),r);
await p.evaluate(()=>{document.querySelector('#cob91i .cob91c.ro a[data-act="cob91wa"]').addEventListener('click',e=>e.preventDefault());document.querySelector('#cob91i .cob91c.ro a[data-act="cob91wa"]').click()});await p.waitForTimeout(150);
r=await p.evaluate(()=>{var F=S.cli.find(c=>c.n==='Fruber');return {rec:F.recUlt,txt:document.querySelector('#cob91i .cob91c.ro').textContent}});T('Al mandarlo queda "último aviso"',!!r.rec&&/último aviso/.test(r.txt),r);
/* promesa */
await p.click('#cob91i .cob91c.am [data-act="cob91p"]');await p.waitForTimeout(150);await p.click('#cob91i .cob91p [data-act="cob91pf"]');await p.waitForTimeout(100);
await p.fill('#cob91m','500');await p.click('#cob91i [data-act="cob91pg"]');await p.waitForTimeout(150);
r=await p.evaluate(()=>{var G=S.cli.find(c=>c.n==='La Güera');return {pr:G.prom91,man:iso(new Date(TODAY.getTime()+864e5)),txt:document.querySelector('#cob91i .cob91c.am .pr')&&document.querySelector('#cob91i .cob91c.am .pr').textContent}});
T('Promesa guardada: mañana, $500',r.pr&&r.pr.f===r.man&&r.pr.m===500&&r.pr.cred0===800,r);T('Promesa se ve en su tarjeta',/Prometió pagar el .*\$500/.test(r.txt||''),r.txt);
await p.evaluate(()=>{window.scrollTo(0,700)});await p.waitForTimeout(100);await p.screenshot({path:SC+'/cob2.png'});
/* el día de la promesa: aviso al admin; al día siguiente sin pagar: rojo */
r=await p.evaluate(()=>{var G=S.cli.find(c=>c.n==='La Güera');G.prom91.f=iso(TODAY);render();var av=avisos().filter(x=>/prometió/.test(x));var ini=document.querySelector('[data-x="cob91c"]');
 var dd=avDestino(av[0]||'');G.prom91.f=iso(new Date(TODAY.getTime()-864e5));render();return {av,ini:ini&&ini.textContent,dd,no:G.prom91&&G.prom91.no,cls:document.querySelector('#cob91i [data-cid="'+G.id+'"]').className,av2:avisos().filter(x=>/prometió/.test(x))}});
T('El día de la promesa: aviso para el admin',r.av.length===1&&/Hoy .*prometió pagar La Güera: \$500/.test(r.av[0]),r.av);T('"Ir" lleva a la Cobranza de Inicio',r.dd.t==='inicio'&&r.dd.sel==='[data-x="cob91c"]',r.dd);
T('Pasó el día y no pagó: rojo y aviso',r.no===true&&/ro/.test(r.cls)&&r.av2.length===1&&/no pagó su deuda como prometió/.test(r.av2[0]),r);
/* abono por pasos desde Cobranza: queda con fecha y quita la deuda */
await p.click('#cob91i .cob91c.ro [data-act="cobrar"]');await p.waitForTimeout(200);
r=await p.evaluate(()=>({wz:!!document.getElementById('wzov'),z:getComputedStyle(document.getElementById('wzov')).zIndex}));T('Registrar abono abre los pasos encima',r.wz&&+r.z>83,r);
await p.click('#wzov [data-act="wzop"]');await p.waitForTimeout(100);await p.click('#wzov [data-act="wzsig"]');await p.waitForTimeout(150);await p.click('#wzov .pie .btn:last-child');await p.waitForTimeout(150);
await p.click('[data-act="wz55si"]');await p.waitForTimeout(250);
r=await p.evaluate(()=>{var F=S.cli.find(c=>c.n==='Fruber');var cb=S.cobros.filter(x=>x.c===F.id);return {cred:F.cred,cb,ab:document.querySelectorAll('#cob91i .cob91c').length}});
T('Abono registrado: Fruber ya no debe',r.cred===0,r);T('El abono queda con fecha',r.cb.length===1&&r.cb[0].f===await p.evaluate(()=>iso(TODAY)),r.cb);T('Fruber sale de la lista',r.ab===2,r.ab);
/* promesa cumplida (pagó) se quita sola */
r=await p.evaluate(()=>{var G=S.cli.find(c=>c.n==='La Güera');G.cred=0;render();return {pr:G.prom91,h:G.promH91}});T('Pagó todo: la promesa se quita y queda en su historial',r.pr===null&&r.h&&r.h.length>=1,r);
/* plazo propio */
r=await p.evaluate(()=>{var B=S.cli.find(c=>c.n==='Benavides');S.crCli=B.id;render();var bt=[...document.querySelectorAll('#crov [data-act="cob91pl"]')].map(x=>x.textContent);document.querySelector('#crov [data-act="cob91pl"][data-v="15"]').click();var p15=plazo91(B);B.credDesde=iso(new Date(TODAY.getTime()-10*864e5));var e1=est91(B);document.querySelector('#crov [data-act="cob91pl"][data-v=""]').click();return {bt,p15,e1,e2:est91(B),pg:plazo91(B)}});
T('Plazo propio en la pantalla de su crédito',r.bt.length===4&&r.p15===15,r);T('Con plazo de 15, 10 días todavía está al corriente',r.e1==='ve',r);T('Regresa al general: vencido',r.e2==='am'&&r.pg===5,r);
/* atrás cierra la Cobranza */
r=await p.evaluate(()=>{S.crCli=null;render();var ok1=navAtras();return {ok1,abierto:!!document.getElementById('cob91i'),st:S.cob91}});T('Atrás cierra la Cobranza',r.ok1&&!r.abierto&&!r.st,r);
/* chofer: le sale la promesa en su ruta y en la entrega */
r=await p.evaluate(()=>{var B=S.cli.find(c=>c.n==='Benavides');B.prom91={f:iso(TODAY),m:300,cred0:300};var ch=B.chofer;S.role='rep';S.chofHoy=ch;S.pinOk['c:'+ch]=true;arLoad(chNuevo(ch));S.stops=[{c:B.id}];S.salida.ok=true;S.tab.rep='ruta';render();
 var a=document.querySelector('[data-x="cob91r"]');var ta=a&&a.textContent;S.tab.rep='entrega';S.cur=0;render();var e=document.querySelector('[data-x="cob91r"]');return {ta,te:e&&e.textContent}});
T('Chofer: "Hoy te prometieron pagar" en su ruta',/Hoy te prometieron pagar:.*Benavides \$300/.test(r.ta||''),r.ta);T('Chofer: en la entrega',/Benavides prometió pagar hoy \$300/.test(r.te||''),r.te);
await p.screenshot({path:SC+'/cob3.png'});
T('Sin errores en la página',!errs.length,errs);
console.log(ok+' OK · '+fail+' FAIL');await b.close()})();
