/* Migración · tema "Vehículos": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-vehiculos.js ANTES.html NUEVO.html   (se corre con la demo y con la real) */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.addInitScript(()=>{window.__pnTest=1});await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};
  var limpia=function(x){return JSON.parse(JSON.stringify(x===undefined?null:x,function(k,v){if(k==='id'&&typeof v==='number'&&v>1e12)return 0;if(k==='h'||k==='dur'||k==='t0'||k==='ts')return 0;return v}))};
  window.vibrar=function(){window.__vib=(window.__vib||0)+1};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.yo='Dueño Uno';U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000},{n:'Camión Uno',pl:'CC1',plEdo:'Veracruz',comb:'Diésel',img:2,odo:5000}];
   U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Chofer Dos',puesto:'chofer',tel:'2'}];U.cli=[{n:'Cliente Uno',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar()}
  S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};
  var V=S.veh.filter(function(v){return !v.baja}),chs=S.choferes.filter(function(c){return esCh(c)});
  try{if(V[0])V[0].plEdo='Baja California';if(V[1])V[1].plEdo='Guerrero'}catch(e){}
  var snap=JSON.stringify(S);
  T('nuevoVeh',function(){return limpia([nuevoVeh({n:'X',pl:'1',odo:10}),nuevoVeh({n:'Y',camion:true,odo:5,afDue:'2027-01-01'})].map(function(v){delete v.foto;return v}))});
  T('nuevoCli',function(){var c=nuevoCli({n:'Z',vac:3});S=JSON.parse(snap);return limpia(c)});
  S=JSON.parse(snap);T('vehHoy',function(){return [vehHoy()&&vehHoy().id,(function(){var x=S.veh;S.veh=[];var v=vehHoy();S.veh=x;return v&&[v.id,v.n,v.capL]})()]});
  S=JSON.parse(snap);T('vehLibres',function(){var r=[vehLibres(chs[0]&&chs[0].id).map(function(v){return v.id})];S.chSt={};if(chs[1]&&V[0]){var o=chNuevo(chs[1].id);o.vehHoy=V[0].id;o.salida.ok=true;o.rutaDia80=iso(TODAY);S.chSt[chs[1].id]=o}r.push(vehLibres(chs[0]&&chs[0].id).map(function(v){return v.id}));return r});
  S=JSON.parse(snap);V.forEach(function(v,i){T('vehBasic-'+i,function(){return vehBasic(v)});T('vehBasic-sinfoto-'+i,function(){var f=v.foto;v.foto=null;var h=vehBasic(v,true);v.foto=f;return h});
   T('plate-'+i,function(){return [plateSVG(v),plateSVG(v,true)]});T('fiVeh-'+i,function(){return fiVeh({id:v.id})});T('fiVeh-enc-'+i,function(){S.encOn=true;var h=fiVeh({id:v.id});S.encOn=false;return h});
   T('fuel-'+i,function(){return fuelVeh(v)});T('gastos-'+i,function(){return limpia(vehGastos(v,365))});T('enc-'+i,function(){var a=encVehHTML(v);S.encF={vid:v.id,lug:null,link:''};var b2=encVehHTML(v);S.encF=null;return [a,b2]})});
  ['Veracruz','Guerrero','Jalisco',''].forEach(function(e){T('plate-edo-'+e,function(){var v=JSON.parse(JSON.stringify(V[0]));v.plEdo=e;return plateSVG(v,true)})});
  S=JSON.parse(snap);T('vForm-nuevo',function(){S.vf=VBLANK();S.vfId=null;return vForm()});T('vForm-editar',function(){S.vfId=V[0].id;S.vf=Object.assign(VBLANK(),{n:V[0].n,marca:'Nissan',modelo:'NP300',anio:'2022'});return vForm()});
  T('vehiculos-editar',function(){return vehiculos()});S.vf=null;S.vfId=null;T('vehiculos',function(){return vehiculos()});
  S=JSON.parse(snap);T('tag',function(){var r=[];try{r.push(limpia(tagCruce(V[0],{m:85,cas:'Otay',f:iso(TODAY),h:'10:00'})))}catch(e){r.push('ERR '+e.message)}return [r,limpia(S.gastos.slice(-2))]});
  S=JSON.parse(snap);['dia','lunes','carga','dia+sem+mes'].forEach(function(t){T('insp-'+t,function(){var o={tipo:t,r:{0:'ok',1:'mal'},n:{},f:{}};return inspHTML(o,'x','Revisión')})});
  T('inspRep',function(){var a=[];S.inspR=null;a.push(inspRepHTML());S.inspR={ok:true,r:{0:'ok'},n:{},f:{},tipo:'dia'};a.push(inspRepHTML());S.inspVer=true;a.push(inspRepHTML());S.inspVer=false;S.inspR={ok:true,r:{0:'mal'},n:{0:'Llanta baja'},f:{},tipo:'dia'};a.push(inspRepHTML());return a});
  T('inspMarca',function(){S.inspHist=[];var o={tipo:'dia',r:{0:'ok',1:'mal'},n:{},f:{}};var a=inspMarca(V[0],'Danu',o);inspMarca(V[0],'Danu',o);inspMarca(V[0],'Beto',o);return [limpia(a),limpia(S.inspHist)]});
  S=JSON.parse(snap);T('vel',function(){var a=[];S.velAl=null;a.push(velAlertaHTML());S.velAl={vel:131,lim:120,cur:125};a.push(velAlertaHTML());S.velAl={vel:131,lim:120,cur:null};a.push(velAlertaHTML());window.__vib=0;try{velBeep()}catch(e){}a.push(window.__vib);return a});
  /* chofer: fotos y su vehículo */
  S=JSON.parse(snap);S.role='rep';if(chs[0]){S.chofHoy=chs[0].id;S.pinOk['c:'+chs[0].id]=true}S.vehHoy=V[0]&&V[0].id;
  T('fotoTile',function(){var a=[fotoTile('frente','Frente'),fotoTile('atras','Atrás')];S.salida.fotos=S.salida.fotos||{};S.salida.fotos.frente='data:image/jpeg;base64,xx';a.push(fotoTile('frente','Frente'));return a});
  ['ruta'].forEach(function(t){T('rep-'+t,function(){S.tab.rep=t;render();return document.querySelector('main').innerHTML})});
  T('rep-salida',function(){S.salida.ok=false;S.tab.rep='ruta';S.inspR=null;render();var b=document.querySelector('[data-act="iniciar"]');if(b)b.click();return (document.querySelector('main')||{}).innerHTML||''});
  /* admin: la sección y la ficha de cada vehículo */
  S=JSON.parse(snap);S.role='admin';S.tab.admin='vehiculos';T('adm-vehiculos',function(){render();return document.querySelector('main').innerHTML});
  V.forEach(function(v,i){T('adm-ficha-'+i,function(){S.vehOpen=v.id;render();var o=document.querySelector('#fiov')||document.querySelector('main');return o.innerHTML})});
  /* visor de fotos */
  T('fotoAbrir',function(){S.vehOpen=null;render();var im=document.createElement('img');im.src='data:image/jpeg;base64,/9j/4AAQ';document.body.appendChild(im);try{_fvImg=im}catch(e){}fotoAbrir(im.src);var o=document.getElementById('fotov');var r=o?[o.style.zIndex,o.querySelectorAll('.fvotra').length,o.innerHTML.length]:null;if(o)o.remove();im.remove();return r});
  T('fotoZoomable',function(){var a=[];[['data:image/jpeg;base64,xx',60],['data:image/png;base64,xx',60],['data:image/jpeg;base64,xx',20]].forEach(function(c){var im=document.createElement('img');im.src=c[0];im.style.width=c[1]+'px';im.style.height=c[1]+'px';document.body.appendChild(im);a.push(fotoZoomable(im));im.remove()});a.push(fotoZoomable(null));return a});
  return out});
 out.errores=errs;await p.close();return out}
(async()=>{const b=await chromium.launch();const a=await corre(b,process.argv[2]),n=await corre(b,process.argv[3]);
 let d=0;for(const k of Object.keys(a)){const x=JSON.stringify(a[k]),y=JSON.stringify(n[k]);if(x!==y){d++;console.log("DIFERENTE",k,"\n A:",x.slice(0,600),"\n N:",y.slice(0,600))}else console.log('igual',k,x.slice(0,130))}
 for(const k of Object.keys(n))if(!(k in a)){d++;console.log('SOLO EN NUEVO',k)}
 console.log(Object.keys(a).length+' casos · '+(d?'HAY DIFERENCIAS':'TODO IGUAL'));await b.close()})();
