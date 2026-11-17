/* Migración · tema "Avisos y pendientes": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-avisos.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Revisa: avisos(), avDestino() (destino y lo que cambia en S), avRow(), avisosHTML(), numeritos de la barra,
   "🔔 N pendientes" (Ir / Listo) en cada sección, y la pantalla de Inicio. */
const {chromium}=require('playwright');
const CASOS=[ /* un texto por cada regla de avDestino/avRow, con nombres que existen (se cambian {ch} {cli} {veh} {bien}) */
 'URGENTE: falta recibir el cierre del 16 nov de {ch} ($600)','{ch} lleva 2 h sin señal · última ubicación: Otay','Pendiente de llegar a {ch} (sin señal): 2 cambios',
 'Cambio de aceite de {veh} en 300 km','Mensualidad de {veh}','Verificación de {veh} vence pronto','Falta pagar luz','Mañana toca pagar agua','Hay que calibrar {bien}','Vence {bien} el 3 dic',
 'Licencia de {ch} vence pronto','{ch} olvidó su PIN [pin:c:1]','PIN de {ch}','{ch} pide reabrir su ruta','{ch} no envió su cierre de ayer','Cierre con faltante de {ch}','{ch} cargó combustible SIN ticket',
 '{ch} registró un gasto de comida','{ch} registró una báscula nueva: Báscula Otay','Consumo alto en {veh}','Pagar a El Rosca $5,000','Salió con una falla: {veh} no frena','URGENTE: Salió con una falla {veh}',
 'Pedido para {cli} mañana','{ch} no tomó la foto de la entrega','{ch} anuló una venta','Revisa el número: {ch} capturó el WhatsApp de {cli} (6641234567) en la entrega','{cli} pasó su límite de crédito',
 'Cliente nuevo {cli} [tel:6641234567] [geo:32.5,-117.0]','{ch} guardó la ubicación de {cli} [geo:32.51,-117.02]','{ch} no manda su ubicación [gps:{id}]','{ch} apagó el celular [gpsev:1]',
 'el efectivo de {ch} no coincide: faltan $100','Faltaron $50 en el cierre de {ch}','{ch} no ha entregado su equipo','Lote de roatán (12 cajas) pasó su tiempo','Lote de macho (40 kg) pasó su tiempo',
 'Las maduras de roatán se pasan mañana','URGENTE: no cuadra · taras (faltan 3)','URGENTE: no cuadra · dinero','Pago vencido: {cli} no pagó su deuda como prometió (14 nov): debe $500',
 '🤝 Hoy (17 nov) prometió pagar {cli}: $300','El desgaste de {veh} cambió de $1.2 a $1.5 por km','{ch} apagó el GPS','Llegó la carga de El Rosca','Se acabó el lote de roatán','Merma por aprobar',
 'Registraste un pago','Danu necesita permiso para algo raro','URGENTE: lleva 5 días sin respaldo','Gasto fijo: renta','',null];
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.addInitScript(()=>{window.__pnTest=1});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate((CASOS)=>{var out={};var limpia=function(h){return String(h||'').replace(/animation-delay:[^;"]*;?/g,'').replace(/data-t0="\d+"/g,'')};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.yo='Ricardo';U.veh=[{n:'Nissan NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];
   U.cli=[{n:'Fruber',a:'x',tel:'6641234567',dias:[0,1,2,3,4,5,6],cred:900,vac:0,ch:'0'},{n:'Tienda Don Beto',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'1'}];U.prov=[{n:'El Rosca',tipo:'Macho',tel:''}];S.precio.R=300;S.precio.M=20;suAplicar()}
  S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='inicio';S.popVisto={admin:iso(TODAY)};
  var ch=(S.choferes.filter(function(c){return esCh(c)})[0])||S.choferes[0],cli=S.cli.filter(function(c){return !c.oculto})[0],veh=S.veh[0],bien=(S.bienes||[])[0];
  var X=CASOS.map(function(x){return x==null?x:x.replace(/\{ch\}/g,chofN(ch.id)).replace(/\{id\}/g,ch.id).replace(/\{cli\}/g,cli?cli.n:'X').replace(/\{veh\}/g,veh?veh.n:'V').replace(/\{bien\}/g,bien?bien.n:'B')});
  /* que haya de todo: promesas, lotes, avisos sueltos */
  try{if(cli){cli.cred=500;cli.prom91={f:iso(TODAY),m:300,cred0:500}}}catch(e){}
  S.avPrecio=(S.avPrecio||[]).concat(X.filter(function(x){return typeof x==='string'&&x}));
  var snap=JSON.stringify(S);
  /* avisos() en varios roles */
  ['admin','cont','rep'].forEach(function(r){S=JSON.parse(snap);S.role=r;try{out['avisos-'+r]=avisos()}catch(e){out['avisos-'+r]='ERR '+e.message}out['avisos-'+r+'-S']=JSON.stringify(S).length});
  S=JSON.parse(snap);S.encOn=true;try{out['avisos-enc']=avisos()}catch(e){out['avisos-enc']='ERR '+e.message}
  S=JSON.parse(snap);S.avOk88={};S.avOk88[X[3]]=1;S.avLater88={};S.avLater88[X[4]]='2099-01-01';try{out['avisos-ok88']=avisos()}catch(e){out['avisos-ok88']='ERR '+e.message}
  /* avDestino: destino y lo que cambia en S */
  var todos=X.concat((function(){S=JSON.parse(snap);try{return avisos()}catch(e){return []}})());
  todos.forEach(function(x,i){S=JSON.parse(snap);var r;try{r=avDestino(x)}catch(e){r='ERR '+e.message}
   out['dest-'+i+'-'+String(x).slice(0,40)]=[r,S.openCh,S.fiTab,S.vehOpen,S.gsec,S.bienOpen,S.faov,S.st&&S.st.sec,S.chofHoy]});
  /* avRow y avisosHTML */
  S=JSON.parse(snap);todos.forEach(function(x,i){if(typeof x!=='string')return;try{out['row-'+i]=[avRow(x),avRow(x,true)]}catch(e){out['row-'+i]='ERR '+e.message}});
  try{out.avHTML=avisosHTML(todos.filter(function(x){return typeof x==='string'}))}catch(e){out.avHTML='ERR '+e.message}
  try{out.avHTML0=avisosHTML([])}catch(e){out.avHTML0='ERR '+e.message}
  /* pantallas: barra (numeritos) y "🔔 N pendientes" en cada sección, cerrado y abierto */
  S=JSON.parse(snap);['inicio','rutas','clientes','bodega','cargas','mas','gastos','vehiculos','personal','estadisticas','bienes'].forEach(function(t){
   S.tab.admin=t;S.pnd92='';try{render()}catch(e){}var nv=document.querySelector('nav.tabs'),pc=document.querySelector('[data-x="pnd86"]');
   out['scr-'+t]=[limpia(nv&&nv.innerHTML),limpia(pc&&pc.outerHTML)];
   S.pnd92=t;try{render()}catch(e){}pc=document.querySelector('[data-x="pnd86"]');out['scr-'+t+'-abierto']=limpia(pc&&pc.outerHTML);
   if(t==='inicio'){var m=document.querySelector('main');out['scr-inicio-main']=limpia(m&&m.innerHTML).length}});
  out.actDia=(S.actDia||[]).map(function(a){return a.x});
  return out},CASOS);
 out.errores=errs;await p.close();return out}
(async()=>{const b=await chromium.launch();const a=await corre(b,process.argv[2]),n=await corre(b,process.argv[3]);
 let d=0;for(const k of Object.keys(a)){const x=JSON.stringify(a[k]),y=JSON.stringify(n[k]);if(x!==y){d++;console.log('DIFERENTE',k,'\n A:',x.slice(0,700),'\n N:',y.slice(0,700))}else console.log('igual',k,x.slice(0,140))}
 for(const k of Object.keys(n))if(!(k in a)){d++;console.log('SOLO EN NUEVO',k)}
 console.log(Object.keys(a).length+' casos · '+(d?'HAY DIFERENCIAS':'TODO IGUAL'));await b.close()})();
