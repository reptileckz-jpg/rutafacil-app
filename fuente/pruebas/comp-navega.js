/* Migración · "Atrás y deslizar" (tema-navega.js) y "lo del asistente pasa a la app" (suAplicar, al final de tema-ajustes.js):
   compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-navega.js ANTES.html NUEVO.html   (se corre con la demo y con la real)
   Casos: suAplicar con un asistente lleno (vehículos con seguro, marca, capacidad, extras y repetidos; personal con licencia,
   sueldo y PIN; clientes con apodo, horario, límite y ubicación; proveedores con dirección y ubicación; PIN del admin) y
   lo que queda en S; navAtras con la foto abierta, la ventana de ubicación, el mapa grande y la pila de pantallas;
   swBloq sobre cada tipo de elemento (mapas, antigüedad, lotes, pendientes, días, taras, fuera de la pantalla). */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpio=function(t){return String(t||'').replace(/\d{1,2}:\d\d(:\d\d)?/g,'HH:MM')};
  var J=function(x){return limpio(JSON.stringify(x===undefined?'(undef)':x))};
  /* asistente lleno */
  var U=S.setup=S.setup||{};U.p=7;U.pinA='4826';
  U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000,aseg:'GNP',segVence:'2027-01-05',tcVence:'2027-03-01',capL:'80',acLast:'900',marca:' Nissan ',modelo:'NP300',anio:2023,capC:'120',capK:'1500',ex75:{acInt:'10000',capC:'130',color:'Blanco'}},
   {n:'Camión Dos',pl:'BBB2',plEdo:'Veracruz',comb:'Diésel',img:1,odo:50000,verVence:'2026-12-31',vin:'3N1',llanta:'235/75',ex75:{acLast:'48000'}}];
  U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1',licV:'2028-02-02',sueldo:'2700',pin:'5555'},{n:'Chofer Dos',puesto:'chofer',tel:'4',pin:'1234'},{n:'Bodeguero',puesto:'bodega',tel:'2',sueldo:'2100.5'}];
  U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0',ap:'Don Uno',hAb:'07:00',hCi:'14:00',recibe:'Su hijo',lim:'3000',ex75:{lat:'32.5',lng:'-117.0'}},
   {n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3,5],cred:0,vac:0,ch:'0',ex75:{lat:'',hAb:'08:00',hCi:'12:00'}}];
  U.prov=[{n:'Proveedor Uno',tel:'3',dir:'Calle 1',ex75:{lat:'19.5',lng:'-96.9'}},{n:'Proveedor Dos',tel:'5'}];
  S.precio.R=275;S.precio.M=20;
  var nV=S.veh.length,nC=S.choferes.length,nCl=S.cli.length;
  T('su·r',function(){return J(suAplicar())});
  T('su·veh',function(){return J(S.veh)});
  T('su·vehHoy',function(){return J(S.vehHoy)});
  T('su·choferes',function(){return J(S.choferes.slice(nC).map(function(c){return [c.n,c.licV,c.sz,c.puesto]}))});
  T('su·pins',function(){return J(S.pins)});
  T('su·cli',function(){return J(S.cli.slice(nCl))});
  T('su·prov',function(){return J([provD('Proveedor Uno'),provD('Proveedor Dos')])});
  T('su·cuentas',function(){return J([S.veh.length-nV,S.choferes.length-nC,S.cli.length-nCl])});
  /* swBloq */
  S.tutVisto={rep:true,admin:true};S.role='admin';S.pinOk[pinKey()]=true;S.setup=null;render();
  var m=document.querySelector('main')||document.body;
  ['div.leaflet-container','div[data-vivo]','div.mapa','div[data-mapa]','div[data-x="antig65"]','div.lote','div[data-sw80]','div[data-x="pnd86"]','div[data-x="dia80a"]','div[data-x="tar86"]','div.card','button.btn','div[data-x="otro"]'].forEach(function(sel){
   T('sw·'+sel,function(){var mm=sel.match(/^(\w+)(?:\.([\w-]+))?(?:\[([\w-]+)(?:="([^"]*)")?\])?$/),e=document.createElement(mm[1]);if(mm[2])e.className=mm[2];if(mm[3])e.setAttribute(mm[3],mm[4]||'1');var s=document.createElement('span');e.appendChild(s);m.appendChild(e);var r=[swBloq(s),swBloq(e)];e.remove();return J(r)})});
  T('sw·fuera',function(){var e=document.createElement('div');document.body.appendChild(e);var r=swBloq(e);e.remove();return J([r,swBloq(null),swBloq({})])});
  /* navAtras */
  var st=function(){return J([S.role,S.tab[S.role],!!S.ub,!!GM,!!document.getElementById('fotov'),S.modal,S.aj,S.menu])};
  T('na·foto',function(){var f=document.createElement('div');f.id='fotov';document.body.appendChild(f);var r=navAtras();var q=!!document.getElementById('fotov');if(q)f.remove();return J([r,q])+st()});
  T('na·ub',function(){S.ub={modo:'foto',sigue:false,id:(S.cli[0]||{}).id};var r=navAtras();return J(r)+st()});
  T('na·ubSigue',function(){S.ub={modo:'foto',sigue:true,id:(S.cli[0]||{}).id};var r=navAtras();var u=S.ub;S.ub=null;return J([r,u])+st()});
  T('na·gm',function(){GM={};var r;try{r=navAtras()}catch(e){r='ERR '+e.message}GM=null;return J(r)+st()});
  ['clientes','rutas','mas','personal'].forEach(function(t){T('na·tab·'+t,function(){S.tab.admin=t;render();var a=navAtras();var b=navAtras();return J([a,b])+st()})});
  T('na·rep',function(){S.role='rep';S.chofHoy=(S.choferes[0]||{}).id;S.pinOk[pinKey()]=true;S.tab.rep='cierre';render();var a=navAtras();return J(a)+st()});
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0,err=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(/^"ERR/.test(y))err++;if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · casos con ERR '+err+' · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
