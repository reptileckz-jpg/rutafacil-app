/* ===================== v7.2 · parte 5: mapas y rutas
   8 "Su recorrido": dónde está ahora, paradas tocables y puntos por hora · 10 ubicación de la bodega editable; el recorrido se acerca a sus puntos
   11 "Ordenar con tráfico" (Google Routes, una llamada) con hora estimada por cliente · 12 la app aprende sus tiempos y pide menos a Google ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.gpsahora{background:var(--bg);border-radius:12px;padding:10px;margin:8px 0}.gpsahora b{font-size:16px}',
 '.gpsst[data-act="gpsir"]{cursor:pointer;border-radius:8px;padding:6px 4px}.gpsst[data-act="gpsir"]:active{background:var(--line)}',
 '.gpsh summary{min-height:44px;display:flex;align-items:center;gap:8px}.gpsh .chips{flex-wrap:wrap;gap:6px}.gpsh .chips button{min-height:38px;padding:0 10px;font-size:14px}',
 '#blov{position:fixed;inset:0;z-index:93;background:var(--bg);overflow:auto;padding:calc(14px + var(--sbar,0px)) 16px 24px;display:flex;flex-direction:column;gap:10px}#blov .q{font-size:22px;font-weight:900}#blov .btn{min-height:58px;font-size:18px}',
 '.rgcard .btn{min-height:52px}'].join('\n');document.head.appendChild(st)})();

/* ---------- centrar un mapa (Google o el de antes) en un punto ---------- */
function mapaCentra(id,lat,lng){var el=document.querySelector('[data-vivo="'+id+'"]')||document.querySelector('[data-gvivo="'+id+'"]');if(!el)return;try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}
 try{if(el._gm&&el._gm.m){el._gm.m.setCamera({coordinate:{lat:lat,lng:lng},zoom:17,animate:true});return}}catch(e){}
 try{if(el._m){el._m.setView([lat,lng],17);if(el._pnt)el._m.removeLayer(el._pnt);el._pnt=L.circleMarker([lat,lng],{radius:10,color:'#C0392B',weight:3}).addTo(el._m)}}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gpsir"]');if(!b||e.target.closest('a'))return;e.stopImmediatePropagation();mapaCentra(b.dataset.map,+b.dataset.lat,+b.dataset.lng)},true);

/* ---------- 8 · "Su recorrido" con historial navegable ---------- */
function gpsAhora(ch){var best=null;try{Object.keys(GPS.devs||{}).forEach(function(dev){var d=GPS.devs[dev];if(+d.ch!==+ch)return;var u=gpsUlt(d);if(u.lat==null)return;if(!best||num(u.t)>num(best.u.t))best={u:u,d:d}})}catch(e){}return best}
function haceTxt62(t){var m=Math.max(0,Math.round((Date.now()-t)/60000));return m<1?'ahorita':(m<60?'hace '+m+' min':'hace '+minTxt(m*60000))}
function irLink(lat,lng){return 'https://www.google.com/maps/dir/?api=1&destination='+lat+','+lng}
/* gpsRutaHTML: pasó a tema-ubica.js */
/* 10 b · el mapa del recorrido se acerca a los puntos del día (no mete la bodega si está lejos) */
/* mapaVivoHTML: pasó a tema-inicio.js */

/* ---------- 10 · ubicación de cada bodega (la principal mueve todos los mapas, km y rutas) ---------- */
function bodPrincipal(){return (S.bods||[])[0]||null}
function bodAplica(){var b=bodPrincipal();if(b&&b.lat!=null&&b.lng!=null){BOD.lat=+b.lat;BOD.lng=+b.lng}}
var _rd62a=render;render=function(){try{bodAplica()}catch(e){}return _rd62a.apply(this,arguments)};
function coordsDe(txt){var s=String(txt||'').trim(),m;
 if((m=/!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/.exec(s))||(m=/@(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/.exec(s))||(m=/[?&](?:q|query|ll|destination|center)=(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/.exec(s))||(m=/^(-?\d{1,2}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)$/.exec(s))||(m=/(-?\d{1,2}\.\d{3,})\s*,\s*(-?\d{1,3}\.\d{3,})/.exec(s))){
  var la=+m[1],ln=+m[2];if(Math.abs(la)<=90&&Math.abs(ln)<=180)return {lat:+la.toFixed(6),lng:+ln.toFixed(6)}}return null}
function bodLocHTML(){var x=S.blov;if(!x)return '';var b=(S.bods||[]).filter(function(z){return +z.id===+x.id})[0];if(!b)return '';var h='<div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:18px">Ubicación de '+esc(b.n)+'</b><div class="lbl">Paso '+(x.p+1)+' de 2</div></span><button class="helpb" style="margin:0" data-act="blx" aria-label="Cerrar">×</button></div>';
 if(x.p===0)h+='<div class="q">¿Cómo la guardamos?</div>'+(b.lat!=null?'<div class="lbl">Ahora: '+b.lat+', '+b.lng+'</div>':'')
  +'<button class="btn big" data-act="blaqui">📍 Estoy en la bodega: guardar donde estoy</button><div class="lbl">Párate dentro de la bodega con la ubicación prendida.</div>'
  +'<div class="field" style="margin-top:10px;display:block"><label for="bllink">O pega el link de Google Maps (o las coordenadas)</label><textarea id="bllink" rows="3" style="width:100%" placeholder="https://www.google.com/maps/@19.58,-96.93,17z">'+esc(x.link||'')+'</textarea></div><button class="btn sec big" data-act="bllink">Usar el link</button>'
  +(x.err?'<div class="neg" role="alert" style="font-weight:700">'+esc(x.err)+'</div>':'');
 if(x.p===1)h+='<div class="q">¿Seguro que aquí es la bodega?</div>'+mapaVivoHTML('blmap',{pts:[{lat:x.lat,lng:x.lng,t:'B',n:b.n,col:'#1E2A1A'}],line:[],marks:[],bod:false,refit:true},240)+'<div class="lbl">'+x.lat+', '+x.lng+'</div><div class="lbl">Todos los mapas, los kilómetros y las rutas van a usar este punto.</div>'
  +'<button class="btn big" data-act="blsi">Sí, guardar</button><button class="btn sec big" data-act="blatras">Regresar</button>';
 return '<div id="blov" role="dialog" aria-label="Ubicación de la bodega">'+h+'</div>'}
document.addEventListener('input',function(e){if(e.target&&e.target.id==='bllink'&&S.blov)S.blov.link=e.target.value},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='bodloc'){e.stopImmediatePropagation();if(!(S.role==='admin'&&!S.encOn)){toast('La ubicación de la bodega solo la cambia el administrador.');return}S.blov={id:+b.dataset.id||((bodPrincipal()||{}).id),p:0};render();return}
 if(!S.blov||!/^bl(x|aqui|link|si|atras)$/.test(a))return;e.stopImmediatePropagation();var x=S.blov;
 if(a==='blx'){S.blov=null;render();return}if(a==='blatras'){x.p=0;render();return}
 if(a==='bllink'){var c=coordsDe(x.link);if(!c){x.err=/goo\.gl|maps\.app/.test(x.link||'')?'Ese link es corto y no trae el punto. En Google Maps mantén el dedo sobre la bodega, copia los números que salen arriba (ej. 19.5885, -96.9395) y pégalos aquí.':'No encontré el punto en ese texto. Pega el link completo o las coordenadas.';render();return}x.err='';x.lat=c.lat;x.lng=c.lng;x.p=1;render();return}
 if(a==='blaqui'){x.err='';toast('Buscando tu ubicación…');var ok=function(la,ln){x.lat=+(+la).toFixed(6);x.lng=+(+ln).toFixed(6);x.p=1;render()},mal=function(){x.err='No se pudo leer el GPS. Prende la ubicación o usa el link.';render()};
  try{navigator.geolocation.getCurrentPosition(function(p){ok(p.coords.latitude,p.coords.longitude)},mal,{enableHighAccuracy:true,timeout:15000,maximumAge:0})}catch(er){mal()}return}
 if(a==='blsi'){var bd=(S.bods||[]).filter(function(z){return +z.id===+x.id})[0];if(bd){bd.lat=x.lat;bd.lng=x.lng;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Guardó la ubicación de '+bd.n+' ('+x.lat+', '+x.lng+')'});bodAplica()}S.blov=null;toast('✓ Ubicación guardada');render();return}},true);
var _rd62b=render;render=function(){var r=_rd62b.apply(this,arguments);try{var o=document.getElementById('blov');if(o)o.remove();var hh=bodLocHTML();if(hh){var w=document.createElement('div');w.innerHTML=hh;document.body.appendChild(w.firstElementChild);try{mapaMonta()}catch(e){}try{gmRevisa()}catch(e){}}}catch(e){console.error(e)}return r};
/* botón en la tarjeta de Bodegas y en Ajustes */
/* bodegasCard: pasó a tema-bodega.js */
/* ajHTML: pasó a tema-ajustes.js */

/* ---------- 12 · la app aprende de sus rutas ---------- */
try{['aprT','aprA'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});if(AR_K.indexOf('planDia')<0)AR_K.push('planDia')}catch(e){}
function franja(t){var h=new Date(+t).getHours();return h<9?'m1':h<12?'m2':h<15?'t1':h<18?'t2':'n'}
function aprPon(M,k,v){var x=M[k]||[0,0];x=[num(x[0])+1,x[0]?Math.round((num(x[1])*0.7+v*0.3)*10)/10:Math.round(v*10)/10];M[k]=x}
function aprTramo(a,b,t){var M=S.aprT||{},x=M[a+'>'+b+'|'+franja(t||Date.now())]||M[a+'>'+b+'|*'];return x&&x[0]>=3?x[1]:null}
function aprAten(c){var x=(S.aprA||{})[c];return x&&x[0]>=3?x[1]:null}
var _salTs=null;
function aprAprende(){if(S.role!=='rep'||!S.salida||!S.salida.ok)return false;var T=S.stopsT||{},cam=false;S.aprT=S.aprT||{};S.aprA=S.aprA||{};
 if(!S.salidaTs)S.salidaTs=Date.now();
 var L=Object.keys(T).map(function(k){return {c:k,x:T[k]}}).filter(function(o){return o.x&&o.x.lleg}).sort(function(a,b){return a.x.lleg-b.x.lleg});
 L.forEach(function(o,i){var x=o.x;
  if(!x.aprT){var prev=i>0?L[i-1]:null,de=prev?prev.c:'B',t0=prev?prev.x.sal:S.salidaTs;if(t0&&x.lleg>t0){var mi=(x.lleg-t0)/60000;if(mi>=1&&mi<=180){aprPon(S.aprT,de+'>'+o.c+'|'+franja(t0),mi);aprPon(S.aprT,de+'>'+o.c+'|*',mi)}x.aprT=1;cam=true}}
  if(!x.aprA&&x.sal&&x.sal>x.lleg){var ma=(x.sal-x.lleg)/60000;if(ma>=0.5&&ma<=120)aprPon(S.aprA,o.c,ma);x.aprA=1;cam=true}});return cam}
var _rd62c=render;render=function(){try{aprAprende()}catch(e){}return _rd62c.apply(this,arguments)};
/* hora estimada = manejo (aprendido, o lo de Google, o el cálculo de siempre) + tiempo de atención de cada cliente */
/* etas: pasó a tema-rutas.js */

/* ---------- 11 · Ordenar con tráfico (Google) ---------- */
function rgNat(){var n=natPl&&natPl();return n&&n.rutasGoogle?n:null}
function rgPend(){return (S.stops||[]).filter(function(s){if(s.done)return false;var c=cl(s.c);return c&&c.lat!=null})}
/* 126 · la tarjeta ya no desaparece: sale arriba de la ruta (también antes de salir) y si faltan ubicaciones lo dice (Ricardo, 18 nov) */
function rgCardHTML(){if(S.role!=='rep'||!S.salida||(S.cierre&&S.cierre.sent))return '';var T=(S.stops||[]).filter(function(s){return !s.done&&cl(s.c)}),P=rgPend();if(T.length<2)return '';var sin=T.length-P.length,rg=S.rg&&S.rg.f===iso(TODAY)?S.rg:null;
 if(P.length<2)return '<div class="card rgcard" data-key="rgcard"><b>🚦 Ordenar mi ruta con tráfico</b><div class="lbl">Para que Google la ordene se necesitan al menos 2 clientes con ubicación. '+(sin===1?'A 1 cliente le falta':'A '+sin+' clientes les falta')+' la ubicación: se guarda sola al entregarles, o confírmala en su ficha.</div></div>';
 return '<div class="card rgcard" data-key="rgcard"><b>🚦 Ordenar mi ruta con tráfico</b><div class="lbl">Google acomoda tus '+P.length+' clientes en el mejor orden con el tráfico de ahorita y te dice a qué hora llegas a cada uno.'+(sin>0?' '+(sin===1?'1 cliente sin ubicación se queda':sin+' clientes sin ubicación se quedan')+' al final.':'')+'</div>'+rgResHTML133()
  +'<button class="btn sec" style="margin-top:8px" data-act="rgordena">'+(rg||S.rgRes&&S.rgRes.f===iso(TODAY)?'Volver a calcular':'Ordenar con tráfico')+'</button>'
  +(S.rgAnt&&S.rgAnt.f===iso(TODAY)&&rgPendIds133().length?'<button class="btn sec" style="margin-top:8px" data-act="rgdeshaz">↩ Regresar al orden de antes</button>':'')+'</div>'}
/* 133 · lo que te ahorró el último orden (antes → ahora), o que ya lo deshiciste */
function rgResHTML133(){var x=S.rgRes;if(!x||x.f!==iso(TODAY))return '';var h='<div class="card note" style="padding:8px 10px;margin:8px 0 0">';
 if(x.deshecho)return h+'<b>Regresaste al orden de antes</b><div class="lbl">'+hmDe(x.deshecho)+'. Toca "Volver a calcular" si lo quieres ordenar otra vez.</div></div>';
 var a=rgAhorro133(x),q=function(o){return o?[o.min!=null?rgMin133(o.min):'',o.km!=null?rgKm133(o.km):''].filter(Boolean).join(' · '):'—'};
 h+='<b>Último orden · '+hmDe(x.t)+(x.fuente==='app'?' (con lo que la app aprendió)':' (con Google y el tráfico)')+'</b>';
 if(!a)return h+'<div class="lbl">Ahora: '+q(x.ahora)+'. No se pudo comparar con tu orden de antes.</div></div>';
 h+='<div class="row" style="min-height:32px"><span>Como lo tenías</span><b>'+q(x.antes)+'</b></div><div class="row" style="min-height:32px"><span>Ordenada</span><b>'+q(x.ahora)+'</b></div>';
 var bien=a.min>=1||(a.km!=null&&a.km>=0.5);
 return h+'<div style="font-weight:800;margin-top:4px;color:'+(bien?'var(--accent)':'inherit')+'">'+(bien?'Te ahorra ~'+[a.min>=1?rgMin133(a.min):'',a.km!=null&&a.km>=0.5?rgKm133(a.km):''].filter(Boolean).join(' y '):'Tu orden ya era el mejor: no ahorra nada')+'</div></div>'}
/* ruta: pasó a tema-ruta.js */
function rgCuerpo(o,P){var ll=function(p){return {location:{latLng:{latitude:+p.lat,longitude:+p.lng}}}};
 return {origin:ll(o),destination:ll(BOD),intermediates:P.map(function(s){var c=cl(s.c);return ll(c)}),travelMode:'DRIVE',routingPreference:'TRAFFIC_AWARE',optimizeWaypointOrder:true,languageCode:'es-MX',units:'METRIC'}}
function rgSeg(d){var m=/^(\d+(?:\.\d+)?)s$/.exec(String(d||''));return m?+m[1]/60:null}
/* si ya se sabe el tiempo de todos los tramos, la app ordena sola (sin pedir a Google) */
function rgSola(P){var ahora=Date.now(),de=null;(S.stops||[]).forEach(function(s){if(s.done)de=String(s.c)});de=de||'B';var ids=P.map(function(s){return String(s.c)}),todos=[de].concat(ids);
 for(var i=0;i<todos.length;i++)for(var j=0;j<ids.length;j++){if(todos[i]===ids[j])continue;if(aprTramo(todos[i],ids[j],ahora)==null)return null}
 var orden=[],quedan=ids.slice(),cur=de;while(quedan.length){var mejor=null,mt=1e9;quedan.forEach(function(x){var t=aprTramo(cur,x,ahora);if(t<mt){mt=t;mejor=x}});orden.push(mejor);quedan.splice(quedan.indexOf(mejor),1);cur=mejor}return orden}
function rgReordena(orden){var hechos=S.stops.filter(function(s){return s.done}),pend=S.stops.filter(function(s){return !s.done}),porC={};pend.forEach(function(s){porC[String(s.c)]=s});
 var nuevo=orden.map(function(k){return porC[k]}).filter(Boolean),resto=pend.filter(function(s){return nuevo.indexOf(s)<0});S.stops=hechos.concat(nuevo,resto)}
function rgPlan(){var E=etas(),hoy=new Date();hoy.setHours(0,0,0,0);var plan={f:iso(TODAY),c:{}};S.stops.forEach(function(s,i){if(E[i])plan.c[String(s.c)]=hoy.getTime()+E[i].eta*60000});S.planDia=plan;return E}
/* 133 · Ricardo: "no hay manera de deshacerlo, tampoco te dice cuánto tiempo o km te ahorró".
   Antes de reordenar se guarda el orden de antes (S.rgAnt) para "Regresar al orden de antes". Con Google se piden DOS rutas al mismo
   tiempo: la tuya como estaba y la ordenada, con el mismo tráfico, y se compara tiempo y km (S.rgRes). Si la app ordenó sola (con lo que
   aprendió), compara el tiempo con su misma cuenta. */
function rgMin133(m){m=Math.round(num(m));return m<60?m+' min':Math.floor(m/60)+' h'+(m%60?' '+(m%60)+' min':'')}
function rgKm133(k){return (Math.round(num(k)*10)/10).toLocaleString('es-MX')+' km'}
function rgPendIds133(){return (S.stops||[]).filter(function(s){return !s.done}).map(function(s){return String(s.c)})}
function rgGuardaAnt133(){S.rgAnt={f:iso(TODAY),t:Date.now(),orden:rgPendIds133()}}
function rgAhorro133(x){if(!x||!x.antes||!x.ahora)return null;var m=r2(num(x.antes.min)-num(x.ahora.min)),k=x.antes.km!=null&&x.ahora.km!=null?r2(num(x.antes.km)-num(x.ahora.km)):null;return {min:m,km:k}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="rgordena"]');if(!b)return;e.stopImmediatePropagation();var P=rgPend();if(P.length<2){toast('Necesitas al menos 2 clientes con ubicación.');return}
 var sola=rgSola(P);if(sola){var E0=etas();rgGuardaAnt133();rgReordena(sola);var E1=rgPlan();S.rgRes={f:iso(TODAY),t:Date.now(),fuente:'app',antes:{min:num(E0.fin)-(S.salida.ok?S.reloj:480),km:null},ahora:{min:num(E1.fin)-(S.salida.ok?S.reloj:480),km:null}};
  var a0=rgAhorro133(S.rgRes);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Ordenó su ruta con lo que la app aprendió'+(a0&&a0.min>=1?' (ahorra ~'+rgMin133(a0.min)+')':'')});
  toast('Ruta ordenada con lo que la app ya aprendió (sin gastar en Google).'+(a0&&a0.min>=1?' Te ahorra ~'+rgMin133(a0.min)+'.':'')+' Regresas ~'+hm(E1.fin));render();return}
 var n=rgNat();if(!n){toast('Esto funciona en la app instalada en el celular del negocio.');return}
 if(!navigator.onLine){toast('Sin señal: se queda el orden de siempre.');return}
 var usa=P.slice(0,25),o=S.pos&&S.pos.lat!=null?S.pos:BOD;b.disabled=true;b.textContent='Calculando…';
 var cAnt=rgCuerpo(o,usa);cAnt.optimizeWaypointOrder=false;/* tu orden como estaba, con el mismo tráfico */
 var pAnt=n.rutasGoogle({cuerpo:JSON.stringify(cAnt),campos:'routes.duration,routes.distanceMeters'}).then(function(r){try{var j=JSON.parse(r.json||'{}');var R=r.status===200&&j.routes&&j.routes[0];return R?{min:rgSeg(R.duration),km:R.distanceMeters?Math.round(R.distanceMeters/100)/10:null}:null}catch(er){return null}},function(){return null});
 n.rutasGoogle({cuerpo:JSON.stringify(rgCuerpo(o,usa))}).then(function(r){var j={};try{j=JSON.parse(r.json||'{}')}catch(er){}
  if(r.status!==200||!j.routes||!j.routes[0]){var msg=j.error&&j.error.message||('error '+r.status);toast(/not authorized|API_KEY|PERMISSION|disabled|not been used/i.test(msg)?'Google no dejó usar las rutas: falta habilitar "Routes API" en la llave. Se queda el orden de siempre.':'No se pudo ordenar ('+msg+'). Se queda el orden de siempre.');render();return}
  pAnt.then(function(ant){
  var R=j.routes[0],idx=R.optimizedIntermediateWaypointIndex||usa.map(function(x,i){return i}),orden=idx.map(function(i){return String(usa[i].c)}),legs={},prev='yo';
  (R.legs||[]).forEach(function(lg,i){var to=i<orden.length?orden[i]:'B',m=rgSeg(lg.duration);if(m!=null)legs[prev+'>'+to]=Math.round(m*10)/10;prev=to});
  rgGuardaAnt133();rgReordena(orden);S.rg={f:iso(TODAY),t:Date.now(),legs:legs,min:rgSeg(R.duration),km:R.distanceMeters?Math.round(R.distanceMeters/100)/10:null};var E=rgPlan();
  S.rgRes={f:iso(TODAY),t:Date.now(),fuente:'google',antes:ant,ahora:{min:S.rg.min,km:S.rg.km}};var a=rgAhorro133(S.rgRes);
  var tx=a?(a.min>=1||a.km>=0.5?'te ahorra ~'+[a.min>=1?rgMin133(a.min):'',a.km>=0.5?rgKm133(a.km):''].filter(Boolean).join(' y '):'tu orden ya era el mejor'):'';
  S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Ordenó su ruta con tráfico ('+orden.length+' clientes)'+(tx?': '+tx:'')});toast('✓ Ruta ordenada con tráfico'+(tx?': '+tx:'')+'. Regresas a bodega ~'+hm(E.fin));render()})},
  function(er){toast('Sin conexión con Google: se queda el orden de siempre.');render()})},true);
/* deshacer: regresa al orden que tenías antes de ordenar (los ya entregados no se mueven) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="rgdeshaz"]');if(!b)return;e.stopImmediatePropagation();var A=S.rgAnt;if(!A||A.f!==iso(TODAY)){toast('Ya no hay un orden anterior para regresar.');return}
 rgReordena(A.orden);S.rgAnt=null;if(S.rgRes)S.rgRes.deshecho=Date.now();try{rgPlan()}catch(er){}S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Regresó su ruta al orden de antes'});toast('Listo: tu ruta regresó al orden de antes');render()},true);
/* el admin ve "estimado contra real" en la ficha del chofer */
function planVsRealHTML(ch,dia,G){var P=nbRGet(ch,'planDia');if(!P||P.f!==dia||!P.c)return '';var real={};try{if(G&&G.est==='ok'&&G.pts.length)gpsAnaliza(G.pts).E.forEach(function(e){if(e.cli&&!real[e.cli.id])real[String(e.cli.id)]=e.t0})}catch(e){}
 var ks=Object.keys(P.c);if(!ks.length)return '';var dif=[];var rows=ks.map(function(k){var c=cl(+k),es=P.c[k],re=real[k];if(re)dif.push((re-es)/60000);return '<div class="row"><span>'+esc(c?c.n:'Cliente')+'</span><b>'+hmDe(es)+' → '+(re?hmDe(re)+' <span class="lbl">('+(re>=es?'+':'−')+minTxt(Math.abs(re-es))+')</span>':'—')+'</b></div>'}).join('');
 var pro=dif.length?Math.round(dif.reduce(function(s,x){return s+x},0)/dif.length):null;
 return '<details class="card" style="margin-top:8px"><summary><b>Estimado contra real</b><span class="lbl">'+(pro==null?'aún sin llegadas':'en promedio '+(pro>=0?'llegó '+pro+' min después':'llegó '+(-pro)+' min antes'))+'</span></summary>'+rows+'</details>'}
