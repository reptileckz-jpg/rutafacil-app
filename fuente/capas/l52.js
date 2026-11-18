/* ===================== v6.6 · Escáner nativo (ya no se cierra la app), ubicación siempre prendida del celular del negocio,
   alertas al administrador, recorrido del día con tiempo en cada parada, y Google Maps en pantalla completa ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 'html.gmon,html.gmon body{background:transparent!important}html.gmon body>*:not(#gmov){visibility:hidden!important}',
 '#gmov{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;background:transparent}#gmov .gmh{background:var(--bg);padding:calc(8px + var(--sbar,0px)) 12px 8px;display:flex;align-items:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.2)}#gmov .gmel{flex:1;background:transparent}',
 '.gmbtn{display:block;margin:6px 0 0 auto;min-height:40px;font-size:14px;width:auto}',
 '.gpsst{border-top:1px solid var(--line);padding:8px 0;font-size:16px}.gpsst:first-child{border-top:0}.gpsst.raro{color:var(--danger);font-weight:700}'].join('\n');document.head.appendChild(st)})();
function natPl52(){var C=window.Capacitor;return C&&C.Plugins&&C.Plugins.RutaNativa||null}
function esNativo52(){var C=window.Capacitor;try{return !!(C&&C.isNativePlatform&&C.isNativePlatform())}catch(e){return false}}
['gpsAv'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
if(AR_K.indexOf('stopsT')<0)AR_K.push('stopsT');

/* ---------- 84 · escanear QR con el escáner de Google (el del navegador cerraba la app) ---------- */
var _qrScan52=qrScan;qrScan=function(cb,titulo){var n=natPl52();
 if(esNativo52()){if(!n||!n.escanear){toast('Actualiza la app para poder leer códigos QR.');return}
  n.escanear().then(function(r){if(r&&r.texto)cb(r.texto);else if(!(r&&r.cancelado))toast('No se leyó el código. Intenta otra vez.')},function(er){var m=String(er&&er.message||er||'');
   toast(/sin_play/.test(m)?'Este celular no tiene los servicios de Google para leer QR. Escribe o busca a mano.':'No se pudo abrir el lector de QR. Intenta otra vez.')});return}
 return _qrScan52.apply(this,arguments)};

/* ---------- 87/88 · la ubicación del celular del negocio, siempre (también sin sesión) ---------- */
var _gpsCfgK='';
function gpsChofId(){try{if(NB&&NB.perfil&&NB.perfil.rol==='chofer')return +NB.perfil.chId}catch(e){}return S.role==='rep'?+S.chofHoy:null}
function gpsEnRuta(){if(S.role!=='rep')return false;var ruta=S.salida&&S.salida.ok&&!(S.cierre&&S.cierre.sent);var viaje=(S.vws||[]).some(function(x){return x.quien===+S.chofHoy&&x.started&&['done','fin','gracias','cv'].indexOf(x.k)<0});return !!(ruta||viaje)}
function gpsNatRevisa(){var n=natPl52();if(!n||!n.gpsConfig||typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.ad.token||!NB.perfil||NB.perfil.rol!=='chofer')return;
 var ch=gpsChofId(),tk=NB.ad.token();if(!tk||ch==null)return;var nom='Celular de '+chofN(ch),k=tk.refresh+'|'+ch;
 if(_gpsCfgK!==k){_gpsCfgK=k;n.gpsConfig({refresh:tk.refresh,apiKey:tk.apiKey,proyecto:tk.proyecto,base:'n/'+NB.neg,nom:nom,ch:String(ch)}).then(function(r){S.gpsDev=r&&r.dev},function(){_gpsCfgK=''})}
 var ru=gpsEnRuta();if(S._gpsRu!==ru){S._gpsRu=ru;try{n.gpsModo({ruta:ru,ch:String(ch),nom:nom})}catch(e){}}}
setInterval(function(){try{gpsNatRevisa()}catch(e){}},20000);
/* si cierra su sesión con la ruta abierta: aviso urgente (lo manda el celular aunque ya no haya sesión) */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pinotrosi"],[data-act="nbsalirya"],[data-act="salir"]');if(!b||S.role!=='rep'||!gpsEnRuta())return;
 S.avPrecio.push('URGENTE: '+chofN(S.chofHoy)+' cerró su sesión con la ruta abierta ('+hhmm()+')');try{guardarYa()}catch(er){}var n=natPl52();if(n&&n.gpsEvento)try{n.gpsEvento({e:'sesion_ruta'})}catch(er){}},true);

/* ---------- 86 · a qué hora llegó y se fue de cada cliente (lo marca el celular) ---------- */
function stopsTRevisa(){if(S.role!=='rep'||!S.salida||!S.salida.ok||(S.cierre&&S.cierre.sent))return;var T=S.stopsT=S.stopsT||{},ahora=Date.now(),cam=false,p=S.pos;
 (S.stops||[]).forEach(function(st){var c=cl(st.c);if(!c)return;var k=String(st.c),x=T[k]=T[k]||{};
  if(p&&c.lat!=null){var d=gpsDist(p,{lat:c.lat,lng:c.lng});if(d<=100&&!x.lleg){x.lleg=ahora;cam=true}if(x.lleg&&!x.sal&&d>200){x.sal=ahora;cam=true}}
  if(st.done&&!x.sal){if(!x.lleg)x.lleg=ahora;x.sal=ahora;cam=true}});return cam}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b||S.role!=='rep')return;var a=b.dataset.act;if(a!=='entregar')return;var bi=b.dataset.i;
 setTimeout(function(){try{var i=bi!=null?+bi:(typeof curStop==='function'?curStop():null),st=i!=null?S.stops[i]:null;if(!st)return;var T=S.stopsT=S.stopsT||{},x=T[String(st.c)]=T[String(st.c)]||{};if(!x.lleg)x.lleg=Date.now()}catch(er){}},0)},true);
var _rd52=render;render=function(){try{stopsTRevisa()}catch(e){}var r=_rd52.apply(this,arguments);try{gpsNatRevisa()}catch(e){}return r};

/* ---------- 88 · administrador: celulares sin señal, apagados, ubicación apagada ---------- */
var GPS={devs:{},w:false,dia:{}};
function gpsAdmEscucha(){if(GPS.w||typeof NB==='undefined'||!NB.on||!NB.listo||!NB.ad||!NB.perfil||NB.perfil.rol!=='admin')return;GPS.w=true;
 NB.ad.watch(nbP('gps'),function(docs){docs.forEach(function(x){if(x.removed)delete GPS.devs[x.id];else GPS.devs[x.id]=x.data});gpsAlertas()})}
function gpsUlt(d){var u={};try{u=JSON.parse(d.ult||'{}')}catch(e){}return u}
function gpsCfgMin(){return {a:Math.max(5,num((S.cfg||{}).gpsA1)||15),b:Math.max(10,num((S.cfg||{}).gpsA2)||45)}}
function chTel(ch){var c=(S.choferes||[]).filter(function(x){return x.id===+ch})[0];return c&&c.tel?String(c.tel).replace(/\D/g,''):''}
var GPS_EV={apagado:'apagó el celular',encendido:'prendió el celular',ubicacion_off:'apagó la ubicación del celular',sin_permiso:'le quitó el permiso de ubicación a la app',sesion_ruta:'cerró su sesión con la ruta abierta',no_arranco:'tiene la ubicación detenida'};
function gpsAlertas(){if(S.role!=='admin')return;var A=S.gpsAv=S.gpsAv||{},ahora=Date.now(),M=gpsCfgMin(),cam=false;
 Object.keys(GPS.devs).forEach(function(dev){var d=GPS.devs[dev],u=gpsUlt(d),ch=d.ch,nm=d.ch?chofN(+d.ch):(d.nom||'Un celular'),ult=Math.max(num(d.hb),num(u.t)),min=ult?Math.round((ahora-ult)/60000):0,tel=chTel(ch);
  var donde=u.lat!=null?' [geo:'+u.lat+','+u.lng+']':'',bat=num(d.bat)>=0&&d.bat!=null?' · batería '+d.bat+'%':'';
  if(ult&&min>=M.a){var k=dev+'|'+ult+'|'+(min>=M.b?'b':'a');if(!A[k]){A[k]=ahora;cam=true;
    S.avPrecio.push((min>=M.b?'URGENTE: ':'')+'El celular de '+nm+' no manda su ubicación desde hace '+min+' min (última: '+hmDe(ult)+bat+')'+donde+(tel&&min>=M.b?' [tel:'+tel+']':''))}}
  var evs=[];try{evs=JSON.parse(d.evs||'[]')}catch(e){}evs.forEach(function(v){if(v.e==='encendido'||!GPS_EV[v.e]||ahora-num(v.t)>864e5)return;var k=dev+'|ev|'+v.e+'|'+v.t;if(A[k])return;A[k]=ahora;cam=true;
   S.avPrecio.push('URGENTE: '+nm+' '+GPS_EV[v.e]+' ('+hmDe(v.t)+bat+')'+donde+(tel?' [tel:'+tel+']':''))})});
 Object.keys(A).forEach(function(k){if(ahora-A[k]>3*864e5){delete A[k];cam=true}});if(cam)render()}
function hmDe(t){var d=new Date(+t);return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
setInterval(function(){try{gpsAdmEscucha();gpsAlertas();gpsLimpia()}catch(e){}},60000);setTimeout(function(){try{gpsAdmEscucha()}catch(e){}},5000);
/* los avisos con [tel:…] y [geo:…] muestran botones de Llamar y Ver dónde */
/* avRow: pasó a tema-avisos.js */
window.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-noav]'))e.stopPropagation()},true);
/* borrar puntos de más de 30 días (una vez al día) */
function pad13(n){return ('0000000000000'+Math.max(0,Math.round(n))).slice(-13)}
function gpsLimpia(){if(!GPS.w||!NB.ad.rango)return;var hoy=iso(TODAY);try{if(localStorage.getItem('gpsLimp')===hoy)return;localStorage.setItem('gpsLimp',hoy)}catch(e){}
 Object.keys(GPS.devs).forEach(function(dev){NB.ad.rango(nbP('gpsp'),dev+'_0',dev+'_'+pad13(Date.now()-30*864e5),300).then(function(L){L.forEach(function(x){NB.ad.borrar(nbP('gpsp/'+x.id)).catch(function(){})})},function(){})})}

/* ---------- 86 · Personal → chofer → su recorrido del día ---------- */
function gpsDiaCarga(ch,dia){var k=ch+'|'+dia,G=GPS.dia[k];if(G)return G;G=GPS.dia[k]={est:'cargando',pts:[]};
 if(typeof NB==='undefined'||!NB.on||!NB.ad||!NB.ad.rango){G.est='sin';return G}
 var t0=new Date(dia+'T00:00:00').getTime(),t1=t0+864e5,devs=Object.keys(GPS.devs);if(!devs.length){G.est='ok';return G}
 Promise.all(devs.map(function(dev){return NB.ad.rango(nbP('gpsp'),dev+'_'+pad13(t0-36e5),dev+'_'+pad13(t1),500).catch(function(){return []})})).then(function(R){var P=[];
  R.forEach(function(L){L.forEach(function(x){try{JSON.parse(x.data.v||'[]').forEach(function(p){if(String(p.ch)===String(ch)&&p.t>=t0&&p.t<t1)P.push(p)})}catch(e){}})});
  P.sort(function(a,b){return a.t-b.t});G.pts=P;G.est='ok';render()},function(){G.est='err';render()});return G}
function gpsAnaliza(P){var buenos=P.filter(function(p){return p.lat!=null&&(p.acc==null||p.acc<=150)}),km=0,E=[];
 for(var i=1;i<buenos.length;i++){var d=gpsDist(buenos[i-1],buenos[i]);if(d<5000)km+=d}
 var i0=0;while(i0<buenos.length){var c={lat:buenos[i0].lat,lng:buenos[i0].lng},j=i0+1;while(j<buenos.length&&gpsDist(c,buenos[j])<=90)j++;var t0=buenos[i0].t,t1=buenos[j-1].t;
  if(t1-t0>=3*60000){var cli=null,bm=121;(S.cli||[]).forEach(function(x){if(x.lat==null)return;var dd=gpsDist(c,{lat:x.lat,lng:x.lng});if(dd<bm){bm=dd;cli=x}});var bod=gpsDist(c,BOD)<=150;E.push({lat:c.lat,lng:c.lng,t0:t0,t1:t1,cli:cli,bod:bod})}i0=j}
 return {km:Math.round(km/100)/10,E:E,t0:buenos.length?buenos[0].t:null,t1:buenos.length?buenos[buenos.length-1].t:null,line:buenos.map(function(p){return {lat:p.lat,lng:p.lng}})}}
function minTxt(ms){var m=Math.round(ms/60000);return m<60?m+' min':Math.floor(m/60)+' h '+(m%60)+' min'}
function gpsRutaHTML(c){if(!esCh(c)||esAdm(c))return '';var V=S.gpsVer=S.gpsVer||{},dia=V[c.id]||iso(TODAY),dias=[];for(var i=0;i<7;i++)dias.push(iso(new Date(TODAY.getTime()-i*864e5)));
 var h='<div class="card" data-k="gpsruta'+c.id+'" style="margin-top:10px"><b style="font-size:17px">Su recorrido</b><div class="lbl">Por el GPS de su celular: a qué hora llegó a cada cliente y cuánto tardó.</div>'
  +'<div class="chips" role="group" aria-label="Día" style="margin:8px 0;flex-wrap:wrap">'+dias.map(function(d,i){return '<button data-act="gpsdia" data-id="'+c.id+'" data-d="'+d+'" aria-pressed="'+(d===dia)+'">'+(i===0?'Hoy':(i===1?'Ayer':fCorta(d)))+'</button>'}).join('')
  +'<input type="date" aria-label="Otro día" data-gpsd="'+c.id+'" value="'+dia+'" min="'+iso(new Date(TODAY.getTime()-30*864e5))+'" max="'+iso(TODAY)+'" style="width:150px"></div>';
 if(!REAL||typeof NB==='undefined'||!NB.on)return h+'<div class="lbl">Se ve en la app instalada en los celulares del negocio.</div></div>';
 var G=gpsDiaCarga(c.id,dia);if(G.est==='cargando')return h+'<div class="lbl">Cargando…</div></div>';if(G.est==='err')return h+'<div class="lbl neg">No se pudo cargar. Revisa la señal.</div></div>';
 if(!G.pts.length)return h+'<div class="lbl">Ese día no hay ubicaciones de '+esc(c.n)+'.</div></div>';
 var A=gpsAnaliza(G.pts),cs=A.E.filter(function(e){return e.cli}),raras=A.E.filter(function(e){return !e.cli&&!e.bod&&e.t1-e.t0>=15*60000});
 h+=mapaVivoHTML('gps'+c.id+dia.replace(/-/g,''),{pts:A.E.filter(function(e){return e.cli||(!e.bod&&e.t1-e.t0>=15*60000)}).map(function(e,i){return {lat:e.lat,lng:e.lng,t:String(i+1),n:e.cli?e.cli.n:'Parada sin cliente',col:e.cli?'var(--accent)':'var(--danger)'}}),line:A.line,marks:[]},240);
 h+='<div class="row"><span>Tiempo en la calle</span><b>'+(A.t0?hmDe(A.t0)+' a '+hmDe(A.t1)+' · '+minTxt(A.t1-A.t0):'—')+'</b></div><div class="row"><span>Recorrió</span><b>'+A.km+' km</b></div>'
  +(cs.length?'<div class="row"><span>Promedio por cliente</span><b>'+minTxt(cs.reduce(function(s,e){return s+(e.t1-e.t0)},0)/cs.length)+'</b></div>':'');
 var VE=A.E.filter(function(e){return e.cli||e.bod||e.t1-e.t0>=15*60000});h+='<div style="margin-top:8px">'+VE.map(function(e,ix){var raro=!e.cli&&!e.bod,man=ix>0?'<div class="lbl" style="padding:2px 0 0 12px">🚚 manejó '+minTxt(e.t0-VE[ix-1].t1)+'</div>':'';return man+'<div class="gpsst'+(raro?' raro':'')+'">'+(raro?'⚠️ Parada sin cliente':(e.bod?'Bodega':esc(e.cli.n)))+' · '+hmDe(e.t0)+' a '+hmDe(e.t1)+' · <b>'+minTxt(e.t1-e.t0)+'</b>'+(raro?' <a class="link" href="https://www.google.com/maps?q='+e.lat+','+e.lng+'" target="_blank" rel="noopener">Ver dónde</a>':'')+'</div>'}).join('')+'</div>';
 if(raras.length)h+='<div class="lbl neg" style="margin-top:6px">'+raras.length+' parada'+(raras.length>1?'s':'')+' de más de 15 min donde no hay cliente.</div>';
 return h+'</div>'}
/* personal: pasó a tema-personal.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gpsdia"]');if(!b)return;e.stopImmediatePropagation();S.gpsVer=S.gpsVer||{};S.gpsVer[b.dataset.id]=b.dataset.d;render()},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.gpsd||!t.value)return;S.gpsVer=S.gpsVer||{};S.gpsVer[t.dataset.gpsd]=t.value;render()},true);

/* ---------- 87 · "Permitir todo el tiempo" en la pantalla de permisos (solo celulares de chofer) ---------- */
var _permH52=permHTML;permHTML=function(){var h=_permH52.apply(this,arguments);if(!h||S.role!=='rep')return h;var f=S.permFondo;
 var it='<div class="pr"><span class="ic">🛰️</span><span class="grow"><b>Ubicación todo el tiempo</b><div class="lbl">Es celular del negocio: la ubicación se manda siempre. En la pantalla que se abre escoge <b>"Permitir todo el tiempo"</b>.</div>'+(f?'':'<button class="btn sm" style="width:auto;margin-top:6px" data-act="permfondo">Dar este permiso</button>')+'</div><span class="st" style="color:'+(f?'var(--accent)':'var(--muted)')+'">'+(f?'✓':'•')+'</span></div>';
 var m='<div class="pr"><span class="ic">🖨️</span>';return h.replace(m,it+m)};
function permFondoRev(){var n=natPl52();if(!n||!n.gpsEstado)return;n.gpsEstado().then(function(r){var f=!!(r&&r.fondo);if(S.permFondo!==f){S.permFondo=f;render()}},function(){})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="permfondo"]');if(!b)return;e.stopImmediatePropagation();var n=natPl52();if(!n||!n.gpsFondo)return;
 n.gpsFondo().then(function(r){if(r&&r.ok){S.permFondo=true;render();return}var vuelve=function(){if(document.visibilityState==='visible'){document.removeEventListener('visibilitychange',vuelve);permFondoRev()}};document.addEventListener('visibilitychange',vuelve)},function(){})},true);
setTimeout(function(){try{permFondoRev()}catch(e){}},4000);
/* al chofer: si falta "todo el tiempo", aviso arriba de su ruta */
/* ruta: pasó a tema-ruta.js */
/* celular administrado: la ubicación queda fija y no se puede quitar el permiso */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="celrev"],[data-act="celr"]');if(!b)return;var n=natPl52();if(!n||!n.celGpsFijo)return;setTimeout(function(){if(S.celE&&S.celE.owner)n.celGpsFijo().catch(function(){})},1500)},true);
/* Ajustes: a los cuántos minutos avisar */
/* ajHTML: pasó a tema-ajustes.js */
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.gpscfg)return;S.cfg[t.dataset.gpscfg]=String(Math.max(5,Math.round(num(t.value))));toast('✓ Guardado');render()},true);

/* ---------- 100 · Google Maps en pantalla completa (si la app trae la llave) ---------- */
function gmHay(){return esNativo52()&&window.PN_GMAPS===true&&!!window.GMAPA&&(S.cfg||{}).gmapsNo!==true}
/* mapaVivoHTML: pasó a tema-inicio.js */
var GM=null;
function gmCierra(){var g=GM;GM=null;document.documentElement.classList.remove('gmon');var o=document.getElementById('gmov');if(o)o.remove();if(g&&g.m)try{g.m.destroy()}catch(e){}}
function gmVista(B){if(!B.length)return {c:{lat:BOD.lat,lng:BOD.lng},z:13};var a=Math.min.apply(null,B.map(function(p){return p.lat})),b=Math.max.apply(null,B.map(function(p){return p.lat})),c=Math.min.apply(null,B.map(function(p){return p.lng})),d=Math.max.apply(null,B.map(function(p){return p.lng}));
 var sp=Math.max(d-c,(b-a)*1.6,0.003),z=Math.max(3,Math.min(16,Math.floor(Math.log(300/sp)/Math.LN2)));return {c:{lat:(a+b)/2,lng:(c+d)/2},z:z}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gmabre"],[data-act="gmx"]');if(!b)return;e.stopImmediatePropagation();
 if(b.dataset.act==='gmx'){gmCierra();return}
 var dd=document.querySelector('[data-mapdata="'+b.dataset.id+'"]'),d;try{d=JSON.parse(dd.getAttribute('data-j'))}catch(er){return}
 gmCierra();var ov=document.createElement('div');ov.id='gmov';ov.innerHTML='<div class="gmh"><b class="grow" style="font-size:18px">Mapa</b><button class="btn sm" style="width:auto" data-act="gmx">Cerrar</button></div><div class="gmel" id="gmel"></div>';document.body.appendChild(ov);document.documentElement.classList.add('gmon');
 var B=[];var mk=[];if(d.bod!==false){mk.push({coordinate:{lat:BOD.lat,lng:BOD.lng},title:'Bodega'});B.push(BOD)}
 (d.pts||[]).concat(d.marks||[]).forEach(function(o){if(o.lat==null)return;mk.push({coordinate:{lat:o.lat,lng:o.lng},title:String(o.n||o.t||''),snippet:o.hace||''});B.push(o)});
 var v=gmVista(B),el=document.getElementById('gmel');GM={};
 setTimeout(function(){try{window.GMAPA.create({id:'pn-gm',element:el,apiKey:'nativo',forceCreate:true,config:{center:v.c,zoom:v.z}}).then(function(m){if(!GM){try{m.destroy()}catch(er){}return}GM.m=m;
   var p=[];if(mk.length)p.push(m.addMarkers(mk));if(d.line&&d.line.length>1)p.push(m.addPolylines([{path:d.line.map(function(o){return {lat:o.lat,lng:o.lng}}),strokeColor:'#2F7D32',strokeWidth:6}]));
   try{p.push(m.enableCurrentLocation(true))}catch(er){}Promise.all(p).catch(function(){})},function(er){gmCierra();toast('No abrió Google Maps; se queda el mapa de siempre.')})}catch(er){gmCierra();toast('No abrió Google Maps; se queda el mapa de siempre.')}},80)},true);
/* navAtras: pasó a tema-navega.js */
/* en la ficha del chofer, pestaña "Ruta y metas": su recorrido por GPS */
/* fiEmp: pasó a tema-fichas.js */
