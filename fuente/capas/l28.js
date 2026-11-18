/* ===================== v6.0 · La nube (Firebase): todos ven lo mismo =====================
   Cómo funciona:
   - El estado de la app (S) se parte en "unidades": una por cada dato del negocio (clientes, cargas, inventario…)
     y una por cada parte de la ruta de cada chofer. Cada unidad es un documento en Firestore.
   - Dentro de cada documento se guarda campo por campo (cliente por cliente, y dentro, dato por dato). Así, si el
     chofer cambia el teléfono de un cliente y el admin su límite al mismo tiempo, no se pisan.
   - El inventario se guarda con sumas y restas (no con el número final), para que dos celulares que venden a la
     vez no se borren las ventas.
   - Las fotos van aparte (una por documento). Las de evidencia (tickets, fruta, medidores) se borran de la nube
     a los 30 días; las de lugares, fachadas, personal y vehículos se quedan.
   - Sin señal: todo sigue funcionando y se sube cuando regresa.
   El acceso real a Firebase está en firebase.js (se arma en GitHub). Aquí solo se usa "NB.ad" (adaptador). */
window.PN_FB=window.PN_FB||{apiKey:"AIzaSyBmg4BokpgRkvhP2v2JA-Z3qw3Vk8rP0Eo",authDomain:"platanos-nietos.firebaseapp.com",projectId:"platanos-nietos",storageBucket:"platanos-nietos.firebasestorage.app",messagingSenderId:"96431747909",appId:"1:96431747909:web:257fef8d5d2b0631f1442c"};
var NB={on:false,ad:null,user:null,perfil:null,est:'off',err:'',C:{},Cdocs:{},pend:0,listo:false,fotos:{},subidas:{},faltan:{},neg:'pn',dia0:null,usuarios:{},nuevo:null,vaciaNube:false};
var NB_SH=['cli','veh','adelantos','admins','anulados','aportes','arch','avPrecio','basc','bienes','bienv','bods','bonos','cajaCfg','cajaCierres','cajasMov','cajasT0','cambios','cancels','cargas','cfg','choferes','cierresPrev','cobros','corrs','entCorr','excesos','extras','faltantes','fijos','fondoPer','gastos','gchRev','hist','histVisto','incid','inspCfg','inv','loteCierres','lotes','madL','mantCfg','mayMin','mayP','mayPide','mermas','metaMes','notasN','novs','otrosInv','otrosPend','pagosSueldo','pendCh','permOk','permisos','pins','plantillas','porPagar','precio','precioProx','prestamos','prov','provDir','provPag','quejas','racha','reportes','rutaAcep','rutaAdd','rutaAv','rutaQuit','rutasHist','setup','sinTrabajo','tarasProv','tiradas','vehAsig','ventasPend','vjEfeBack','vjEfeOut','vjHist','vlProd','vlVentas','vlCorte','vlCorteRec','vws','diaNube','dfTot','arStops'];
var NB_CONT={inv:1,vjEfeBack:1,vjEfeOut:1};          /* se suman/restan */
var NB_PERM={cli:1,provDir:1,basc:1,choferes:1,veh:1,admins:1,cfg:1,bienes:1,bods:1,setup:1}; /* fotos que no se borran */
var NB_RLOC={d:1,chofHoy:1};                          /* de la ruta pero solo de este celular */
var FOTO_MARCA='⟦f:',FOTO_BORRADA='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160"><rect width="320" height="160" fill="#E8E4D8"/><text x="160" y="76" text-anchor="middle" font-family="Arial" font-size="16" fill="#6B6B60">Foto borrada de la nube</text><text x="160" y="100" text-anchor="middle" font-family="Arial" font-size="13" fill="#8B8B80">(más de 30 días)</text></svg>');
function nbP(p){return 'n/'+NB.neg+'/'+p}
/* ---------- claves ---------- */
function nbEk(s){s=String(s);return s===''?'%00':s.replace(/[%.|~*\/\[\]`#=]/g,function(c){return '%'+('0'+c.charCodeAt(0).toString(16).toUpperCase()).slice(-2)})}
function nbDk(s){return s==='%00'?'':s.replace(/%([0-9A-F]{2})/g,function(m,h){return String.fromCharCode(parseInt(h,16))})}
function nbHash(s){var h=2166136261;for(var i=0;i<s.length;i+=(s.length>4000?Math.ceil(s.length/4000):1)){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return (h>>>0).toString(36)+'_'+s.length.toString(36)}
function nbEsObj(x){return x!==null&&typeof x==='object'&&!Array.isArray(x)}
/* ---------- fotos ---------- */
var _nbPerm=false;
function nbFotoMarca(x){var id=NB._fid[x];if(!id){id=Date.now().toString(36)+'-'+nbHash(x);NB._fid[x]=id}NB.fotos[id]=x;if(!NB.subidas[id])nbSubirFoto(id,x,_nbPerm);return FOTO_MARCA+id+'⟧'}
NB._fid={};
function nbJ(v){return JSON.stringify(v===undefined?null:v,function(k,x){return typeof x==='string'&&x.length>2000&&x.slice(0,11)==='data:image/'?nbFotoMarca(x):x})}
function nbParse(s){return JSON.parse(s,function(k,x){if(typeof x==='string'&&x.slice(0,3)===FOTO_MARCA){var id=x.slice(3,-1);if(NB.fotos[id])return NB.fotos[id];NB.faltan[id]=1}return x})}
function nbSubirFoto(id,d,perm){NB.subidas[id]=1;nbGuardaSubidas();var o={d:d,t:Date.now()};if(!perm)o.pe=Date.now();nbW(nbP('f/'+id),o,false)}
function nbGuardaSubidas(){try{localStorage.setItem('nbSub',JSON.stringify(Object.keys(NB.subidas).slice(-3000)))}catch(e){}}
try{(JSON.parse(localStorage.getItem('nbSub')||'[]')||[]).forEach(function(i){NB.subidas[i]=1})}catch(e){}
function nbTraerFotos(){var L=Object.keys(NB.faltan);if(!L.length||!NB.ad)return;L.slice(0,20).forEach(function(id){delete NB.faltan[id];if(NB._trayendo&&NB._trayendo[id])return;NB._trayendo=NB._trayendo||{};NB._trayendo[id]=1;
 NB.ad.get(nbP('f/'+id)).then(function(d){delete NB._trayendo[id];var url=d&&d.d;if(!url){var t=parseInt(id.split('-')[0],36);if(t&&Date.now()-t>59*864e5)url=FOTO_BORRADA;else return}NB.fotos[id]=url;nbPonFoto(FOTO_MARCA+id+'⟧',url)}).catch(function(){delete NB._trayendo[id]})})}
function nbPonFoto(m,url){var cambio=false;(function rec(o){if(!o||typeof o!=='object')return;for(var k in o){var x=o[k];if(x===m){o[k]=url;cambio=true}else if(x&&typeof x==='object')rec(x)}})(S);if(cambio)nbRender()}
/* ---------- unidades ---------- */
function nbRutaIds(){var L=[];(S.choferes||[]).forEach(function(c){if(c&&!c.baja&&esCh(c))L.push(+c.id)});Object.keys(S.chSt||{}).forEach(function(i){if(L.indexOf(+i)<0)L.push(+i)});if(S.chofHoy!=null&&L.indexOf(+S.chofHoy)<0)L.push(+S.chofHoy);return L}
function nbRutaKeys(){return AR_K.filter(function(k){return !NB_RLOC[k]}).concat(['invR','invM'])}
function nbUnidades(){var U=[];NB_SH.forEach(function(k){U.push({id:'s~'+k,k:k,perm:!!NB_PERM[k],cont:!!NB_CONT[k],get:function(){return S[k]},set:function(v){S[k]=v}})});
 nbRutaIds().forEach(function(id){nbRutaKeys().forEach(function(k){U.push({id:'r~'+id+'~'+k,k:k,ruta:id,get:function(){return nbRGet(id,k)},set:function(v){nbRSet(id,k,v)}})})});return U}
function nbRGet(id,k){if(+S.chofHoy===+id){if(k==='invR')return S.inv?S.inv.reparto:undefined;if(k==='invM')return S.inv?S.inv.repartoKg:undefined;return S[k]}var o=S.chSt&&S.chSt[id];return o?o[k]:undefined}
function nbRSet(id,k,v){if(+S.chofHoy===+id){if(k==='invR'){S.inv.reparto=num(v);return}if(k==='invM'){S.inv.repartoKg=num(v);return}S[k]=v;return}S.chSt=S.chSt||{};if(!S.chSt[id]){try{S.chSt[id]=chNuevo(+id)}catch(e){S.chSt[id]={}}}S.chSt[id][k]=v}
/* ---------- codificar: valor → campos planos ---------- */
function nbElKey(u,el,i,seen){if(nbEsObj(el)){if(u.k==='rutasHist'&&el.f&&el.ch!=null)return 'r'+nbEk(el.f+'_'+el.ch+(el.parcial120?'_p'+(el.id120||el.n120):''));/* 122 · cada cierre del día con su propia llave (antes uno por chofer por día: el 2º pisaba al 1º en la nube) */if(el.id!=null&&!seen['i'+el.id]){seen['i'+el.id]=1;return 'i'+nbEk(el.id)}if(!el._k)el._k=Math.random().toString(36).slice(2,10);return 'k'+nbEk(el._k)}
 var h='h'+nbHash(nbJ(el)),n=0;while(seen[h+'_'+n])n++;seen[h+'_'+n]=1;return h+'_'+n}
function nbCodifica(u,v){var F={};_nbPerm=u.perm;if(v===undefined)return null;
 if(u.cont){F.k=nbEsObj(v)?'c':'n';if(F.k==='n'){F['c:']=num(v);return F}Object.keys(v).forEach(function(p){if(u.k==='inv'&&(p==='reparto'||p==='repartoKg'))return;var x=v[p];if(typeof x==='number')F['c:'+nbEk(p)]=x;else F['e:'+nbEk(p)+'|=']=nbJ(x)});return F}
 if(Array.isArray(v)){F.k='a';var seen={};v.forEach(function(el,i){var K=nbElKey(u,el,i,seen);F['o:'+K]=i;if(nbEsObj(el)){F['e:'+K+'|#']='o';Object.keys(el).forEach(function(p){if(el[p]!==undefined)F['e:'+K+'|'+nbEk(p)]=nbJ(el[p])})}else F['e:'+K+'|=']=nbJ(el)});return F}
 if(nbEsObj(v)){F.k='m';Object.keys(v).forEach(function(p){var x=v[p],K=nbEk(p);if(x===undefined)return;if(nbEsObj(x)){F['e:'+K+'|#']='o';Object.keys(x).forEach(function(q){if(x[q]!==undefined)F['e:'+K+'|'+nbEk(q)]=nbJ(x[q])})}else F['e:'+K+'|=']=nbJ(x)});return F}
 F.k='r';F.r=nbJ(v);return F}
/* documento de Firestore ↔ campos planos */
function nbDocAPlano(d){var F={};if(!d)return F;F.k=d.k;if(d.r!==undefined)F.r=d.r;['e','o','c'].forEach(function(s){var m=d[s];if(m)Object.keys(m).forEach(function(x){F[s+':'+x]=m[x]})});return F}
/* ---------- armar el valor desde campos planos (respetando los objetos que ya existen) ---------- */
function nbArma(u,F,viejo){if(!F||!F.k)return undefined;
 if(F.k==='r')return F.r===undefined?null:nbParse(F.r);
 if(F.k==='n')return num(F['c:']);
 var G={},ord={};Object.keys(F).forEach(function(f){if(f[0]==='e'&&f[1]===':'){var r=f.slice(2),i=r.indexOf('|'),K=r.slice(0,i),p=r.slice(i+1);(G[K]=G[K]||{})[p]=F[f]}else if(f[0]==='o'&&f[1]===':')ord[f.slice(2)]=F[f]});
 if(F.k==='c'){var o=nbEsObj(viejo)?viejo:{};Object.keys(F).forEach(function(f){if(f.slice(0,2)==='c:')o[nbDk(f.slice(2))]=num(F[f])});Object.keys(G).forEach(function(K){if(G[K]['='])o[nbDk(K)]=nbParse(G[K]['='])});return o}
 var arma=function(K,g,old){if(g['=']!==undefined&&g['#']===undefined)return nbParse(g['=']);var o=nbEsObj(old)?old:{},vis={};Object.keys(g).forEach(function(p){if(p==='#')return;var key=nbDk(p);vis[key]=1;var nv=nbParse(g[p]);if(JSON.stringify(o[key])!==g[p]||typeof nv!=='object')o[key]=nv});Object.keys(o).forEach(function(key){if(!vis[key])delete o[key]});return o};
 if(F.k==='a'){var arr=Array.isArray(viejo)?viejo:[],porK={},seen={};arr.forEach(function(el,i){porK[nbElKey(u,el,i,seen)]=el});
  var Ks=Object.keys(G).sort(function(a,b){var x=ord[a]==null?1e9:ord[a],y=ord[b]==null?1e9:ord[b];return x-y||(a<b?-1:a>b?1:0)}),nuevo=Ks.map(function(K){return arma(K,G[K],porK[K])});arr.length=0;nuevo.forEach(function(x){arr.push(x)});return arr}
 var m=nbEsObj(viejo)?viejo:{},vis2={};Object.keys(G).forEach(function(K){var key=nbDk(K);vis2[key]=1;m[key]=arma(K,G[K],m[key])});Object.keys(m).forEach(function(key){if(!vis2[key])delete m[key]});return m}
/* ---------- empujar lo local a la nube ---------- */
function nbW(path,obj,merge){if(!NB.ad)return;NB.pend++;nbIndicador();return NB.ad.set(path,obj,merge!==false).then(function(){NB.pend--;nbIndicador()},function(e){NB.pend--;NB.err=String(e&&e.message||e);console.error('nube',path,e);nbIndicador()})}
function nbEmpuja(){if(!NB.on||!NB.listo||!NB.ad)return;var DEL=NB.ad.del(),U=nbUnidades();
 U.forEach(function(u){/* 120 · lo que solo el admin puede guardar: el celular del chofer no lo intenta */if(typeof nbSoloAdm120==='function'&&nbSoloAdm120(u))return;var v;try{v=u.get()}catch(e){return}if(v===undefined)return;var L=nbCodifica(u,v),C=NB.C[u.id]||{},w={},hay=false;if(!L)return;
  if(L.k!==C.k){w.k=L.k;hay=true}
  Object.keys(L).forEach(function(f){if(f==='k')return;if(f==='r'){if(L.r!==C.r){w.r=L.r;hay=true}return}var s=f[0],key=f.slice(2);
   if(s==='c'){var d=num(L[f])-num(C[f]);if(Math.abs(d)>1e-9){w.c=w.c||{};if(key==='')w.c['']=undefined;w.c[key===''?'_':key]=NB.ad.inc(d);hay=true}return}
   if(L[f]!==C[f]){(w[s]=w[s]||{})[key]=L[f];hay=true}});
  Object.keys(C).forEach(function(f){if(f==='k'||f==='r'||f[0]==='c')return;if(!(f in L)){(w[f[0]]=w[f[0]]||{})[f.slice(2)]=DEL;hay=true}});
  if(w.c&&w.c['']===undefined)delete w.c[''];
  if(!hay)return;var Cn={};Object.keys(L).forEach(function(f){Cn[f]=L[f]});NB.C[u.id]=Cn;
  var fly=NB.fly[u.id]=NB.fly[u.id]||{},seq=++NB.seq,mios=[];['e','o'].forEach(function(s){if(w[s])Object.keys(w[s]).forEach(function(k){var f=s+':'+k;fly[f]=seq;mios.push(f)})});if('r' in w){fly.r=seq;mios.push('r')}
  var pr=nbW(nbP('d/'+u.id),w,true);if(pr&&pr.then)pr.then(function(){mios.forEach(function(f){if(fly[f]===seq)delete fly[f]})})})}
NB.fly={};NB.seq=0;
/* el contador sin campos (número suelto) se guarda en c._ */
/* nbDocAPlano: pasó a tema-nube.js */
/* ---------- aplicar lo que llega de la nube ---------- */
function nbAplica(docs,primera){var U={},cambio=false;nbUnidades().forEach(function(u){U[u.id]=u});
 docs.forEach(function(x){var id=x.id,D=nbDocAPlano(x.data);var u=U[id];if(!u){var m=/^r~(-?\d+)~(.+)$/.exec(id);if(m&&nbRutaKeys().indexOf(m[2])>-1){var rid=+m[1],rk=m[2];u={id:id,k:rk,ruta:rid,get:function(){return nbRGet(rid,rk)},set:function(v){nbRSet(rid,rk,v)}}}else{NB.C[id]=D;return}}
  if(x.removed){NB.C[id]={};return}
  var C=NB.C[id]||{},v0;try{v0=u.get()}catch(e){v0=undefined}var L=primera||v0===undefined?null:nbCodifica(u,v0),R={};
  if(!L)R=D;else{var todos={};[D,L,C].forEach(function(o){Object.keys(o).forEach(function(f){todos[f]=1})});
   var fly=NB.fly[id]||{};Object.keys(todos).forEach(function(f){if(f==='k'){R.k=L.k===C.k?D.k:L.k;return}var pend=f[0]==='c'?false:(L[f]!==C[f]||fly[f]!=null);
    if(f[0]==='c'){var loc=num(L[f])-num(C[f]);if(f in D||f in L)R[f]=num(D[f])+loc;return}
    if(pend){if(f in L)R[f]=L[f]}else if(f in D)R[f]=D[f]})}
  NB.C[id]=D;var Lj=L?JSON.stringify(L):null,Rj=JSON.stringify(R);if(Lj===Rj)return;
  var nv=nbArma(u,R,v0);try{u.set(nv)}catch(e){console.error('nube aplicar',id,e)}cambio=true});
 if(cambio){nbRealias();nbTraerFotos()}return cambio}
function nbRealias(){try{var b=S.bodSel||1;S.invB=S.invB||{};S.lotesB=S.lotesB||{};S.invB[b]=S.inv;S.lotesB[b]=S.lotes;if(S.vws&&S.vwI!=null&&S.vw&&S.vws.indexOf(S.vw)<0)S.vw=S.vws[S.vwI]||null}catch(e){}}
/* ---------- ids sin choques entre celulares ---------- */
function nbIdsFix(){var B=num(NB.perfil&&NB.perfil.idBase);if(!B)return;var mx=B;['cli','cargas','veh','choferes','lotes','basc','bods','bienes'].forEach(function(k){(S[k]||[]).forEach(function(x){var i=+(x&&x.id);if(i>=B&&i<B+100000&&i>=mx)mx=i})});
 Object.keys(S).forEach(function(k){if(/^next[A-Z]/.test(k)&&typeof S[k]==='number'&&(S[k]<B||S[k]>=B+100000||S[k]<=mx))S[k]=Math.max(mx+1,B+1)})}
/* ---------- render: después de cada cambio, subir (con pausa corta) ---------- */
var _nbT=null;function nbLuego(){if(!NB.on||!NB.listo)return;clearTimeout(_nbT);_nbT=setTimeout(function(){try{nbEmpuja()}catch(e){console.error('nube empujar',e)}},window.__nbFast?30:900)}
var _nbRendering=false;function nbRender(){if(_nbRendering)return;_nbRendering=true;try{render()}finally{_nbRendering=false}}
var _r28=render;render=function(){if(NB.on&&NB.listo){try{nbIdsFix();nbForzarRol()}catch(e){}}var r=_r28.apply(this,arguments);nbLuego();try{nbPantalla()}catch(e){}return r};
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden'&&NB.on&&NB.listo){clearTimeout(_nbT);try{nbEmpuja()}catch(e){}}});
/* ---------- arranque ---------- */
function nbPuede(){return typeof REAL!=='undefined'&&REAL&&!!(window.__nubeAd||window.NUBE_AD)}
function nbIniciar(){if(NB.on||!nbPuede())return;NB.on=true;NB.ad=window.__nubeAd||window.NUBE_AD;NB.est='auth';try{NB.ad.init(window.PN_FB)}catch(e){NB.est='login';NB.err='No se pudo abrir la nube: '+e.message}
 NB.ad.onUser(function(u){NB.user=u;if(NB.creando)return;if(!u){NB.perfil=null;NB.listo=false;NB.est='login';NB.duenioHay=null;NB.ad.get('meta/duenio').then(function(d){NB.duenioHay=!!d;NB.revErr='';nbPantalla()},function(e){NB.duenioHay=null;NB.revErr=String((e&&(e.code||e.message))||e);nbPantalla()});nbPantalla();return}
  NB.est='perfil';nbPantalla();NB.ad.get('usuarios_app/'+u.uid).then(function(p){if(!p||p.activo!==true){NB.perfil=p||null;NB.est='sinacceso';nbPantalla();return}NB.perfil=p;nbEmpezarSync()},function(e){NB.est='sinacceso';NB.err=String(e.message||e);nbPantalla()})})}
function nbEmpezarSync(){NB.est='cargando';nbPantalla();var esperar=function(){if(typeof _cargado!=='undefined'&&!_cargado){setTimeout(esperar,120);return}
 var primera=true,acum=[];if(NB._unw)NB._unw();NB._unw=NB.ad.watch(nbP('d'),function(docs,cache){if(primera){acum=acum.concat(docs);if(cache&&!acum.length){NB.est='conectando';nbPantalla();return}primera=false;nbPrimera(acum);acum=null;return}if(nbAplica(docs,false))nbRender()});
 if(NB.perfil.rol==='admin')NB.ad.watch('usuarios_app',function(docs){docs.forEach(function(x){if(x.removed)delete NB.usuarios[x.id];else NB.usuarios[x.id]=x.data});nbRender()})};esperar()}
function nbPrimera(docs){NB.vaciaNube=!docs.filter(function(x){return !x.removed}).length;
 if(NB.vaciaNube){if(NB.perfil.rol==='admin'&&NB.perfil.duenio){var hay=(S.cli||[]).length||(S.log||[]).length||(S.cargas||[]).length;if(hay&&!NB.decide){NB.est='decide';nbPantalla();NB._docs0=docs;return}NB.listo=true;NB.est='listo';S.diaNube=iso(TODAY);nbForzarRol();nbRender();nbEmpuja();return}
  NB.est='espera';nbPantalla();return}
 /* la nube manda: lo que hay en la nube reemplaza lo que había en este celular */
 nbAplica(docs,true);NB.listo=true;NB.est='listo';nbForzarRol();
 var viejo=S.diaNube;if(viejo&&viejo!==iso(TODAY)){try{_nbDiaOk=true;cambioDeDia(viejo)}catch(e){console.error(e)}}S.diaNube=iso(TODAY);
 nbForzarRol();S.pinOk={};if(!(S.setup&&!S.setup.fin))pinEntrar();nbRender();nbEmpuja()}
/* el cambio de día lo decide la nube (si no, cada celular reiniciaba las rutas por su cuenta) */
var _nbDiaOk=false,_cdd28=cambioDeDia;cambioDeDia=function(){if(NB.on&&!_nbDiaOk)return;_nbDiaOk=false;return _cdd28.apply(this,arguments)};
/* cada celular es de quien entró: el chofer solo ve su ruta */
function nbForzarRol(){var p=NB.perfil;if(!p||!NB.listo)return;if(p.rol==='chofer'){S.role='rep';if(+S.chofHoy!==+p.chId){try{chCambiar(+p.chId)}catch(e){S.chofHoy=+p.chId}}}else if(p.rol==='admin'&&p.adm&&S.adminYo!==p.adm&&!(S.admins||[]).every(function(a){return a.k!==p.adm}))S.adminYo=p.adm}
var _pe28=personasEntrar;personasEntrar=function(){var L=_pe28.apply(this,arguments),p=NB.perfil;if(!NB.on||!p)return L;if(p.rol==='chofer')return L.filter(function(x){return x.go&&x.go.role==='rep'&&+x.go.ch===+p.chId});return L.filter(function(x){return !(x.go&&x.go.role==='admin'&&x.go.adm!==p.adm)})};
/* ---------- cajas: también cuentan las que van en los camiones de las otras rutas ---------- */
function rutasOtras(){var L=[];Object.keys(S.chSt||{}).forEach(function(id){if(+id!==+S.chofHoy&&S.chSt[id])L.push(S.chSt[id])});return L}
var _cd28=cajasDonde;cajasDonde=function(){var w=_cd28.apply(this,arguments);try{rutasOtras().forEach(function(o){var cam=num(o.invR),v=0,ll=0,vv=0,c=o.cierre;if(c&&!c.sent)v=sum(o.log||[],function(l){return num(l.V)-num(l.Vr)});
 if(c&&c.sent&&c.res&&!o.recep&&c.porContar){ll=Math.max(0,num(c.res.reg));vv=Math.max(0,num(c.res.V))}w.cam+=cam+ll;w.camV=(w.camV||0)+v+vv;w.tot+=cam+v+ll+vv})}catch(e){}return w};
var _ce28=cajasEsperadas;cajasEsperadas=function(){var x=_ce28.apply(this,arguments);try{rutasOtras().forEach(function(o){if(o.cierre&&!o.cierre.sent)x-=sum(o.log||[],function(l){return num(l.Vr)})})}catch(e){}return x};
/* ---------- fotos de evidencia: se borran de la nube a los 60 días (antes 30; lo hace el celular del admin, una vez al día) ---------- */
function nbLimpiaFotos(){if(!NB.on||!NB.listo||!NB.perfil||NB.perfil.rol!=='admin'||!NB.ad.viejas)return;var hoy=iso(TODAY);try{if(localStorage.getItem('nbLimp')===hoy)return;localStorage.setItem('nbLimp',hoy)}catch(e){}
 NB.ad.viejas(nbP('f'),'pe',Date.now()-60*864e5,300)/* 122 · 60 días, igual que el detalle de las rutas (decisión de Ricardo) */.then(function(ids){ids.forEach(function(id){NB.ad.borrar(nbP('f/'+id)).catch(function(){})});if(ids.length)console.log('nube: '+ids.length+' fotos viejas borradas')},function(e){console.error('nube limpiar',e)})}
setInterval(function(){try{nbLimpiaFotos()}catch(e){}},60000);
