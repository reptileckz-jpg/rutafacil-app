/* 120 · app real en blanco: en NINGUNA pantalla (admin, contador, chofer, Finanzas, Estadísticas) sale un monto que no se haya registrado ni nada de la demo */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.dismiss());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.finVer=Date.now()});
const r=await ev(()=>{var out=[],DEMO=/9,800|1,850|7,300|29,800|15,290|\$493\b|Tienda Don Beto|Fruver Lupita|Mercado Jáuregui|Panadería El Trigal|Abarrotes La Güera|Frutería San José|Fruver Sol|Chava Morales|Nissan NP300|Freightliner|Bodega Banderilla|Roly(?! )|Xalapa|Banderilla|Datos de ejemplo|de ejemplo|demo\b|prueba/i;
 var mira=function(donde){var m=document.querySelector('main');if(!m){out.push({donde:donde,sinMain:1});return}var t=m.innerText;var ms=(t.match(/\$\s?[\d,]+(\.\d+)?/g)||[]).filter(function(x){var v=+x.replace(/[^\d.]/g,'');return v>0&&v!==275&&v!==20});var dm=t.match(DEMO);if(ms.length||dm)out.push({donde:donde,montos:[...new Set(ms)].slice(0,8),demo:dm&&dm[0],ctx:dm?t.slice(Math.max(0,t.search(DEMO)-60),t.search(DEMO)+60):''})};
 S.role='admin';Object.keys(VIEWS).forEach(function(k){try{S.tab.admin=k;S.finOpen=null;render();mira('admin/'+k)}catch(e){out.push({donde:'admin/'+k,err:e.message})}});
 S.tab.admin='inicio';['efectivo','ingresos','gastos','prov','cli'].forEach(function(k){S.finOpen=k;render();mira('admin/inicio/fin:'+k)});S.finOpen=null;
 S.tab.admin='estadisticas';['resumen','ventas','ganancias','gastos','compras','merma'].forEach(function(s){['dia','semana','mes','anio'].forEach(function(pp){try{S.st.sec=s;S.st.per=pp;render();mira('est/'+s+'/'+pp)}catch(e){out.push({donde:'est/'+s,err:e.message})}})});
 S.tab.admin='personal';S.per92='sue';S.szOpen=S.choferes[S.choferes.length-1].id;render();mira('personal/sueldos');S.per92='';
 S.tab.admin='gastos';['gastos','fijos','sueldos','caja','banco','mes'].forEach(function(g){try{S.gsec=g;render();mira('gastos/'+g)}catch(e){}});
 S.role='cont';['cres','cgas','cven','ccaja'].forEach(function(k){try{S.tab.cont=k;render();mira('cont/'+k)}catch(e){out.push({donde:'cont/'+k,err:e.message})}});
 S.role='rep';var id=S.choferes.filter(c=>c.n==='Danu')[0].id;S.pinOk['c:'+id]=true;S.chofHoy=id;chCambiar(id);['ruta','entrega','gasto','viaje','cierre'].forEach(function(k){try{S.tab.rep=k;render();mira('chofer/'+k)}catch(e){out.push({donde:'chofer/'+k,err:e.message})}});
 return out});
ok(!r.length,'120 · app real en blanco: ninguna pantalla trae montos ni nombres de la demo (revisadas todas las de admin, contador, chofer, Finanzas y Estadísticas)',r);
// un gasto de hoy y un retiro del dueño
const g=await ev(()=>{S.role='admin';S.gastos.push({t:'Otro',m:300,n:'escoba',f:iso(TODAY)});S.gastos.push({t:'Retiro del dueño',m:5000,n:'',f:iso(TODAY)});S.gastos.push({t:'Otro',m:80,n:'ayer',f:iso(new Date(TODAY.getTime()-864e5))});var k=gasDia120(iso(TODAY));S.tab.admin='inicio';S.finOpen='gastos';render();return {hoy:k.tot,t:document.querySelector('main').innerText.match(/Gastos\n[\s\S]{0,300}/)[0]}});
ok(g.hoy===300&&/escoba\s*\$300/.test(g.t)&&!/1,850|7,300|29,800/.test(g.t),'120 · gastos de hoy $300 (sin el retiro del dueño y sin los $1,850 de la demo); semana y mes de verdad',g);
ok(!errs.length,'sin errores de página',errs.slice(0,3));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
