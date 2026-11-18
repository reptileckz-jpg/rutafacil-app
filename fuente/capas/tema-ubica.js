/* ===================== TEMA · Ubicaciones y mapas (aplanado el 18 nov) =====================
   Antes estaba repartido en 21 envolturas encadenadas en l27, l34, l41, l46, l57, l60, l62, l71, l72, l78, l80, l89.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-ubica.js).
   Se arma justo después de tema-viaje.js (antes de los otros temas).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - ubHTML, ubGuardar, ubCliFalta, ubDeNodo: la ventana para guardar el lugar de un cliente, bodega o proveedor (GPS, foto de la fachada, datos).
   - ub68HTML, ub68Guarda, ub68Obj, ub68Nom: corregir la ubicación en el mapa (cliente, bodega, proveedor y la del asistente).
   - cfUb70: el aviso para confirmar la ubicación en la entrega.
   - mapaVivo, mapaSVG, mapaMonta, gpsRutaHTML: el mapa de choferes y clientes, el dibujo sin internet y el recorrido GPS de cada chofer.
   Las funciones que usan los pasos siguen en su capa.
   ============================================================================================ */

/* ubHTML · de l27 */
var _ubH27=ubHTML;ubHTML=function(){var u=S.ub;if(!u)return '';
 if(u.modo==='act'){var nm=esc(ubNom());return '<div id="ubov" role="dialog" aria-label="Actualizar ubicación"><div class="ubw"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:20px">Actualiza la ubicación de '+nm+'</b><div class="lbl">La que hay es aproximada. Ya estás con '+(u.k==='bas'?'la báscula':'él')+': la app guarda la exacta sola.</div></span></div>'
  +(u.est==='buscando'?'<div class="card" style="padding:14px;margin-top:12px;font-size:17px">Buscando tu ubicación…</div>':(u.est==='err'?'<div class="neg" style="margin-top:10px">'+esc(u.err||'')+'</div>':'')+'<button class="btn ubgps" style="margin-top:14px" data-act="ubgps">📍 Estoy con '+nm+': actualizar ubicación</button>'+(u.est==='err'&&u.fallos>=2?'<button class="btn sm sec" style="margin-top:8px" data-act="ubskip">Seguir sin actualizar (le aviso al administrador)</button>':''))
  +'</div></div>'}
 var h=_ubH27();if(u.k==='cli'&&S.role!=='admin'){var c=cl(u.id);if(c){
  if(String(c.tel||'').trim())h=h.replace(/<input id="ubtel"[^>]*>/,'<b style="font-size:16px">'+esc(c.tel)+'</b>');
  if(String(c.recibe||'').trim())h=h.replace(/<input id="ubrec"[^>]*>/,'<b style="font-size:16px">'+esc(c.recibe)+'</b>')}}
 return h};

/* ubGuardar · de l27 */
var _ubG27=ubGuardar;ubGuardar=function(){var u=S.ub;if(!u)return;var c=u.k==='cli'?cl(u.id):null,telAntes=c?String(c.tel||'').trim():'';
 if(c&&S.role!=='admin'){if(telAntes)u.tel=c.tel;if(String(c.recibe||'').trim())u.recibe=c.recibe;if(ubTiene(c)&&u.modo!=='foto'){u.est=u.est==='ok'?'':u.est}}
 var nm=ubNom(),act=u.modo==='act',r=_ubG27.apply(this,arguments);
 if(c&&!telAntes&&String(c.tel||'').trim()&&S.role!=='admin'){c.telPor=+S.chofHoy;c.telConf=null;if(!c.rapida)S.avPrecio.push(chofN(+S.chofHoy)+' agregó el teléfono de '+c.n+': '+c.tel+'. Confírmalo en su ficha.')}
 if(act&&r!==false)toast('Ubicación de '+nm+' actualizada');return r};

/* ubDeNodo · de l27 */
var _ubN27=ubDeNodo;ubDeNodo=function(v,a){var r=_ubN27.apply(this,arguments);if(r&&r.k==='bas'&&r.obj&&ubTiene(r.obj)&&r.obj.ubAprox){r.need=true;r.aprox=true;r.noUb=false}return r};

/* mapaSVG · de l34 */
var _mS34=mapaSVG;mapaSVG=function(pts,line,marks,lbl){if(!mapaHay())return _mS34.apply(this,arguments);var id='m'+nbHash(String(lbl||'').replace(/\d+/g,''));
 var mk=(marks||[]).map(function(o){return {lat:o.lat,lng:o.lng,t:o.t,yo:o.t==='Tú'}});if(lbl==='Mapa de choferes y clientes')mk=gpsMarcas();
 return mapaVivoHTML(id,{pts:pts,line:line,marks:mk},lbl==='Mapa de choferes y clientes'?260:220)};

/* mapaVivo · de l34 */
var _mV34=mapaVivo;mapaVivo=function(){var h=_mV34.apply(this,arguments);try{choferesL().forEach(function(ch){var g=gpsReciente(ch.id,30);if(!g)return;var nm=esc(ch.n);h=h.replace(new RegExp('(<i class="dot"[^>]*></i>'+nm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'</span><span class="lbl" style="text-align:right">)([^<]*)'),function(m,a,b){return a+'📍 '+haceTxt(g.t)+' · '+b})})}catch(e){}return h.replace('En el APK la posición se actualiza en vivo con el GPS del teléfono.','La ubicación de cada chofer se actualiza sola cada 2 minutos mientras trabaja.')};

/* ubCliFalta · de l41 */
var _ucf41=ubCliFalta;ubCliFalta=function(c){var f=_ucf41.apply(this,arguments);if(c&&!c.rapida&&!c.hCi)f.push('horario');return f};

/* ubHTML · de l41 */
var _ubH41=ubHTML;ubHTML=function(){var h=_ubH41.apply(this,arguments),u=S.ub;if(!h||!u||u.k!=='cli'||u.modo!=='datos')return h;var c=cl(u.id);if(!c)return h;
 var hor=c.hCi?'<div class="row"><span>Horario</span><b>'+esc(horRango117(c))+'</b></div>':'<div class="field"><label for="ubab">Abre a las</label><input id="ubab" type="time" data-bind="ub.hAb" value="'+esc(u.hAb||'')+'"></div><div class="field"><label for="ubci">Cierra a las</label><input id="ubci" type="time" data-bind="ub.hCi" value="'+esc(u.hCi||'')+'"></div>';
 var D=['D','L','M','M','J','V','S'],da=c.diasAbre||u.diasAbre||[];var dias=c.diasAbre?'<div class="lbl">Abre: '+c.diasAbre.map(function(i){return ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'][i]}).join(', ')+'</div>':'<div class="lbl" style="margin-top:6px">¿Qué días abre?</div><div class="chips" role="group" aria-label="Días que abre">'+D.map(function(x,i){return '<button data-act="ubdia" data-v="'+i+'" aria-pressed="'+(da.indexOf(i)>-1)+'">'+x+'</button>'}).join('')+'</div>';
 var card='<div class="card" style="padding:8px 12px;margin-top:10px"><b>Horario del negocio</b>'+hor+dias+'</div>';
 /* lo que ya tiene no se cambia: el teléfono y quién recibe se enseñan fijos */
 if(String(c.tel||'').trim())h=h.replace(/<div class="field"><label for="ubtel">Teléfono<\/label>[\s\S]*?<\/div>/,'<div class="row"><span>Teléfono</span><b>'+esc(c.tel)+'</b></div>');
 if(String(c.recibe||'').trim())h=h.replace(/<div class="field"><label for="ubrec">¿Quién recibe\?<\/label>[\s\S]*?<\/div>/,'<div class="row"><span>Quién recibe</span><b>'+esc(c.recibe)+'</b></div>');
 var i=h.indexOf('<button class="btn" style="margin-top:14px;min-height:56px" data-act="ubsave"');return i<0?h:h.slice(0,i)+card+h.slice(i)};

/* ubHTML · de l46 */
if(typeof ubHTML==='function'){var _ubH46=ubHTML;ubHTML=function(){var h=_ubH46.apply(this,arguments);return h?tarjetear(h,'#ubov > div, #ubov .w, #ubov .fiw'):h}}

/* mapaMonta · de l57 */
var _mM57=mapaMonta;mapaMonta=function(){var L=gmInHay()?Array.prototype.filter.call(document.querySelectorAll('[data-vivo]'),function(el){return !el._gmFail}):[];
 L.forEach(function(el){el.setAttribute('data-gvivo',el.getAttribute('data-vivo'));el.removeAttribute('data-vivo')});try{return _mM57.apply(this,arguments)}finally{L.forEach(function(el){el.setAttribute('data-vivo',el.getAttribute('data-gvivo'));el.removeAttribute('data-gvivo')})}};

/* gpsRutaHTML · de l60 */
var _gpsR60=gpsRutaHTML;gpsRutaHTML=function(c){var h=_gpsR60.apply(this,arguments);try{if(!h)return h;var dia=(S.gpsVer||{})[c.id]||iso(TODAY),a=actDiaHTML(dia,c.id,'Lo que pasó ese día');if(!a)return h;var i=h.lastIndexOf('</div>');return i>-1?h.slice(0,i)+a+h.slice(i):h}catch(e){return h}};

/* gpsRutaHTML · de l62 */
var _gpsR62=gpsRutaHTML;gpsRutaHTML=function(c){var h=_gpsR62.apply(this,arguments);try{if(!h||!esCh(c)||esAdm(c))return h;var dia=(S.gpsVer||{})[c.id]||iso(TODAY),mid='gps'+c.id+dia.replace(/-/g,''),extra='';
 /* a) dónde está ahora */
 var A0=gpsAhora(c.id);if(A0&&dia===iso(TODAY)){var u=A0.u,bat=A0.d.bat!=null&&num(A0.d.bat)>=0?' · batería '+A0.d.bat+'%':'';
  extra+='<div class="gpsahora"><b>📍 Dónde está ahora</b><div class="lbl">Última ubicación: '+hmDe(u.t)+' ('+haceTxt62(num(u.t))+')'+bat+'</div><div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">'
   +'<button class="btn sm sec" style="width:auto" data-act="gpsir" data-map="'+mid+'" data-lat="'+u.lat+'" data-lng="'+u.lng+'">Ver en el mapa</button><a class="btn sm" style="width:auto;display:inline-flex;align-items:center" href="'+irLink(u.lat,u.lng)+'" target="_blank" rel="noopener">🚗 Cómo llegar</a></div></div>'}
 var G=GPS.dia&&GPS.dia[c.id+'|'+dia];if(G&&G.est==='ok'&&G.pts.length){var An=gpsAnaliza(G.pts),VE=An.E.filter(function(e){return e.cli||e.bod||e.t1-e.t0>=15*60000}),k=0;
  /* b) cada parada se puede tocar: centra el mapa; con botón "Ir" */
  h=h.replace(/<div class="gpsst( raro)?">/g,function(m,raro){var e=VE[k++];if(!e)return m;return '<div class="gpsst'+(raro||'')+'" data-act="gpsir" data-map="'+mid+'" data-lat="'+e.lat+'" data-lng="'+e.lng+'" role="button" tabindex="0">'});
  h=h.replace(/(<div class="gpsst[^>]*data-lat="(-?[\d.]+)" data-lng="(-?[\d.]+)"[^>]*>)([\s\S]*?)(<\/div>)/g,function(m,a,lat,lng,body,cierra){return a+body+(/>Ir</.test(body)?'':' <a class="link" href="'+irLink(lat,lng)+'" target="_blank" rel="noopener">Ir</a>')+cierra});
  /* c) puntos por hora: dónde estuvo a tal hora */
  var H={};G.pts.forEach(function(p){if(p.lat==null)return;var d=new Date(+p.t),hh=d.getHours(),mm=('0'+d.getMinutes()).slice(-2),key=hh+':'+mm;(H[hh]=H[hh]||{});if(!H[hh][key])H[hh][key]=p});
  var hs=Object.keys(H).map(Number).sort(function(a,b){return a-b});
  if(hs.length)extra+='<div style="margin-top:10px"><b>¿Dónde estuvo a tal hora?</b><div class="lbl">Toca una hora y luego el minuto: el mapa se va a ese punto.</div>'+hs.map(function(hh){var M=H[hh],ks=Object.keys(M);return '<details class="gpsh"><summary><b>'+('0'+hh).slice(-2)+':00 a '+('0'+hh).slice(-2)+':59</b><span class="lbl">'+ks.length+' puntos</span></summary><div class="chips" role="group">'
   +ks.map(function(kk){var p=M[kk];return '<button data-act="gpsir" data-map="'+mid+'" data-lat="'+p.lat+'" data-lng="'+p.lng+'">'+('0'+kk).slice(-5)+'</button>'}).join('')+'</div></details>'}).join('')+'</div>'}
 /* 12 · estimado contra real */
 extra+=planVsRealHTML(c.id,dia,G);
 if(!extra)return h;var i=h.indexOf('<div class="mapviv"');if(i<0)i=h.lastIndexOf('</div>');var ah=extra.split('<div style="margin-top:10px"><b>¿Dónde')[0],resto=extra.slice(ah.length);
 h=h.slice(0,i)+ah+h.slice(i);var j=h.lastIndexOf('</div>');return h.slice(0,j)+resto+h.slice(j)}catch(e){console.error(e);return h}};

/* ub68HTML · de l71 */
var _ubH71=ub68HTML;ub68HTML=function(){var h=_ubH71.apply(this,arguments);if(!h)return h;
 return h.replace('<small>Como en Uber: escribe el nombre o la dirección</small>','<small>Escribe el nombre del lugar o la dirección</small>')
  .replace('<b>🔗 Pegar el link de Google Maps</b>','<b>🔗 Pegar el link de Google Maps o las coordenadas</b><div class="lbl">Sirve el link que sale en Google Maps con "Compartir", o los números como 32.5149, -117.0382</div>')
  .replace('>Usar el link</button>','>Usar el link o las coordenadas</button>')};

/* ub68Obj · de l72 */
var _ubO72=ub68Obj;ub68Obj=function(x){if(x&&x.t==='wz')return S.wz&&S.wz.d||null;return _ubO72.apply(this,arguments)};

/* ub68Nom · de l72 */
var _ubN72=ub68Nom;ub68Nom=function(x){if(x&&x.t==='wz'){var d=S.wz&&S.wz.d||{};return String(d.n||'').trim()||'el cliente'}return _ubN72.apply(this,arguments)};

/* ubCliFalta · de l72 */
var _ucf72=ubCliFalta;ubCliFalta=function(c){var f=_ucf72.apply(this,arguments);if(!c)return f;return f.filter(function(x){if(x==='teléfono'&&c.telNo)return false;if(x==='foto de la fachada'&&c.fotoSkip===iso(TODAY))return false;return true})};

/* cfUb70 · de l78 */
var _cf78=cfUb70;cfUb70=function(){if(S.role!=='rep'||S.tab.rep!=='entrega')return;var st=S.stops&&S.stops[S.cur],c=st?cl(st.c):null;if(!c)return;if(c.lat!=null&&!ubAprox78(c))return;_cf78.apply(this,arguments);
 var d=document.querySelector('[data-x="cfub70"]');if(d&&c.lat!=null){var l=d.querySelector('.lbl');if(l)l.textContent='La que tiene es aproximada (de un link o la búsqueda). Si estás en el negocio, confírmala aquí.'}};

/* ub68Guarda · de l78 */
var _ubG78=ub68Guarda;ub68Guarda=function(){var x=S.ub68,o=null;try{o=ub68Obj(x)}catch(e){}var r=_ubG78.apply(this,arguments);try{if(x&&x.t==='cli'&&o){o.locConf=null}
 if(x&&x.t==='bod'&&o){if(x.dir78)o.dir=x.dir78;if(String(x.nm78||'').trim())o.n=String(x.nm78).trim();else if(!o.n||o.n==='Bodega'||o.n==='Bodega Banderilla')o.n=bodNomSug78(x.dir78)||o.n||'Bodega';o.dem78=1}
 if(x&&x.t==='cli'&&o&&x.dir78&&!String(o.a||'').trim())o.a=x.dir78}catch(e){}return r};

/* ub68HTML · de l78 */
var _ubH78=ub68HTML;ub68HTML=function(){var h=_ubH78.apply(this,arguments),x=S.ub68;if(!h||!x||x.p!==2||x.t!=='bod')return h;var o=ub68Obj(x)||{};if(x.nm78==null)x.nm78=o.n&&o.n!=='Bodega'&&o.n!=='Bodega Banderilla'?o.n:'';if(x.dir78==null)x.dir78=o.dem78?(o.dir||''):'';
 var f='<div class="card" style="margin-top:10px"><div class="field"><label for="ub78n">Nombre de la bodega</label><input id="ub78n" type="text" data-bind="ub68.nm78" value="'+esc(x.nm78)+'" placeholder="Ej. Bodega Centro" style="width:100%;text-align:left"></div><div class="field"><label for="ub78d">Dirección</label><input id="ub78d" type="text" data-bind="ub68.dir78" value="'+esc(x.dir78)+'" placeholder="Calle, colonia y ciudad" style="width:100%;text-align:left"></div></div>';
 var i=h.indexOf('<button class="btn big" data-act="ub68si"');return i<0?h:h.slice(0,i)+f+h.slice(i)};

/* ub68HTML · de l80 */
var _ubH80=ub68HTML;ub68HTML=function(){var x=S.ub68;if(x&&x.p===2&&x.t==='bod'&&x.gps80&&!x.busca80)setTimeout(function(){bodDirGps80(x)},0);var h=_ubH80.apply(this,arguments);if(!h||!x||x.p!==2||x.t!=='bod')return h;
 if(x.busca80===1)h=h.replace('<label for="ub78n">Nombre de la bodega</label>','<label for="ub78n">Nombre de la bodega <span class="lbl">(buscando la colonia…)</span></label>');return h};

/* ub68Guarda · de l89 */
var _u68G89=ub68Guarda;ub68Guarda=function(){var x=S.ub68,o=null;try{o=ub68Obj(x)}catch(e){}var a0=o?o.a:null,lat0=o?o.lat:null;var r=_u68G89.apply(this,arguments);
 try{if(x&&x.t==='cli'&&o){if(coords89(o.a)&&!coords89(a0))o.a=a0||'';var k=coords89(o.a);if(k&&!ubTiene(o)){o.lat=k.lat;o.lng=k.lng;o.a=''}if(ubTiene(o)&&(o.lat!==lat0)){ubLog89(o,'ventana de ubicación');o.locConf=o.locConf||iso(TODAY)}}}catch(e){}return r};

/* ubGuardar · de l89 */
var _ubG89=ubGuardar;ubGuardar=function(){var u=S.ub;try{if(u&&u.k==='cli'&&u.lat!=null&&u.lng!=null&&u.est!=='ok'&&u.modo!=='foto'){var c0=cl(u.id);if(c0&&!ubTiene(c0))u.est='ok'}}catch(e){}var c=u&&u.k==='cli'?cl(u.id):null,lat0=c?c.lat:null;var r=_ubG89.apply(this,arguments);try{if(c&&ubTiene(c)&&c.lat!==lat0){ubLog89(c,'Guardar ubicación aquí');c.locConf=c.locConf||iso(TODAY)}}catch(e){}return r};
