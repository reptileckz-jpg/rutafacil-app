/* ===================== v6.1 · Mapas reales (OpenStreetMap) y ubicación en vivo de los choferes =====================
   - En el APK viene Leaflet (mapas de OpenStreetMap, gratis). Si no está (página de prueba), se queda el dibujo de antes.
   - El celular del chofer manda su ubicación cada 2 minutos (o si se movió más de 200 m) mientras reparte o va de viaje.
   - El admin ve a cada chofer en el mapa en vivo, con "hace X min". */
(function(){var st=document.createElement('style');st.textContent=[
 '.mapviv{width:100%;background:#E8EEE4;position:relative;z-index:0}',
 '.mk{min-width:24px;height:24px;padding:0 4px;border-radius:12px;border:2px solid #fff;color:#fff;font:700 12px/20px Arial;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.4);box-sizing:border-box;white-space:nowrap}',
 '.mk.bod{border-radius:6px;background:#1E2A1A}.mk.yo{background:#2F6DB5;border-radius:50%;width:28px;height:28px;line-height:24px;font-size:13px}',
 '.mk.ch{background:#C0392B;border-radius:50%;width:30px;height:30px;line-height:26px;font-size:14px}',
 '.leaflet-container{font:inherit}.leaflet-control-attribution{font-size:9px}'
].join('\n');document.head.appendChild(st)})();
function mapaHay(){return !!(window.L&&window.L.map)}
var MAP_COL={'var(--accent)':'#2F7D32','var(--muted)':'#8A8F86','var(--orange)':'#E07B1A','var(--danger)':'#C0392B','var(--fg)':'#1E2A1A'};
function mapCol(c){return MAP_COL[c]||c||'#2F7D32'}
function mapaVivoHTML(id,data,alto){return '<div class="mapviv" data-vivo="'+id+'" data-key="map-'+id+'" style="height:'+(alto||220)+'px" role="img" aria-label="Mapa"></div><div hidden data-mapdata="'+id+'" data-j="'+esc(JSON.stringify(data))+'"></div>'}
function mapaMonta(){if(!mapaHay())return;Array.prototype.forEach.call(document.querySelectorAll('[data-vivo]'),function(el){var id=el.getAttribute('data-vivo'),dd=document.querySelector('[data-mapdata="'+id+'"]');if(!dd)return;var j=dd.getAttribute('data-j');
 if(!el._m){try{var m=L.map(el,{zoomControl:true,attributionControl:true,scrollWheelZoom:false,tap:true});mapaCapa(m,el);el._m=m;el._g=L.layerGroup().addTo(m);el._j=null;el._fit=false}catch(e){console.error('mapa',e);return}}
 if(el._j===j){el._m.invalidateSize();return}el._j=j;var d;try{d=JSON.parse(j)}catch(e){return}var g=el._g;g.clearLayers();var B=[];
 var ic=function(html,cls,w){return L.divIcon({html:html,className:'',iconSize:null,iconAnchor:[(w||24)/2,(w||24)/2]})};
 if(d.bod!==false){g.addLayer(L.marker([BOD.lat,BOD.lng],{icon:ic('<div class="mk bod">B</div>')}));B.push([BOD.lat,BOD.lng])}
 if(d.line&&d.line.length>1)g.addLayer(L.polyline(d.line.map(function(o){return [o.lat,o.lng]}),{color:'#2F7D32',weight:4,opacity:.8,dashArray:'8 6'}));
 (d.pts||[]).forEach(function(o){if(o.lat==null)return;var r=Math.max(18,(o.r||8)*2.4);g.addLayer(L.marker([o.lat,o.lng],{icon:ic('<div class="mk" style="background:'+mapCol(o.col)+';opacity:'+(o.op==null?1:o.op)+';min-width:'+r+'px;height:'+r+'px;line-height:'+(r-4)+'px">'+esc(o.t||'')+'</div>','',r)}).bindTooltip(esc(o.n||o.t||''),{direction:'top'}));B.push([o.lat,o.lng])});
 (d.marks||[]).forEach(function(o){if(o.lat==null)return;g.addLayer(L.marker([o.lat,o.lng],{zIndexOffset:1000,icon:ic('<div class="mk '+(o.yo?'yo':'ch')+'"'+(o.col?' style="background:'+mapCol(o.col)+'"':'')+'>'+esc(o.t||'')+'</div>','',30)}).bindTooltip(esc(o.n||o.t||'')+(o.hace?' · '+o.hace:''),{direction:'top'}));B.push([o.lat,o.lng])});
 if(!el._fit||d.refit){if(B.length>1)el._m.fitBounds(B,{padding:[28,28],maxZoom:15});else if(B.length)el._m.setView(B[0],14);el._fit=true}setTimeout(function(){try{el._m.invalidateSize()}catch(e){}},60)})}
var _r34=render;render=function(){var r=_r34.apply(this,arguments);try{mapaMonta()}catch(e){console.error(e)}return r};
/* el dibujo de siempre → mapa real */
var _mS34=mapaSVG;mapaSVG=function(pts,line,marks,lbl){if(!mapaHay())return _mS34.apply(this,arguments);var id='m'+nbHash(String(lbl||'').replace(/\d+/g,''));
 var mk=(marks||[]).map(function(o){return {lat:o.lat,lng:o.lng,t:o.t,yo:o.t==='Tú'}});if(lbl==='Mapa de choferes y clientes')mk=gpsMarcas();
 return mapaVivoHTML(id,{pts:pts,line:line,marks:mk},lbl==='Mapa de choferes y clientes'?260:220)};
/* vwMapa: pasó a tema-viaje.js */
/* ---------- ubicación real ---------- */
function gpsReciente(id,min){var g=nbRGet(id,'gps');if(!g||g.lat==null)return null;return Date.now()-num(g.t)<(min||20)*60000?g:null}
function haceTxt(t){var m=Math.round((Date.now()-t)/60000);return m<1?'ahora':'hace '+m+' min'}
function gpsMarcas(){var L=[];nbRutaIds().forEach(function(id,i){var g=gpsReciente(id,30);if(!g)return;L.push({lat:g.lat,lng:g.lng,t:(chofN(id)||'?').slice(0,1),n:chofN(id),hace:haceTxt(g.t),col:['#C0392B','#2F6DB5','#8E44AD','#E07B1A'][i%4]})});return L}
/* el viaje usa la ubicación real del chofer si es reciente */
/* vwPos: pasó a tema-viaje.js */
/* el admin: en "Mapa en vivo" cada chofer dice dónde está */
var _mV34=mapaVivo;mapaVivo=function(){var h=_mV34.apply(this,arguments);try{choferesL().forEach(function(ch){var g=gpsReciente(ch.id,30);if(!g)return;var nm=esc(ch.n);h=h.replace(new RegExp('(<i class="dot"[^>]*></i>'+nm.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'</span><span class="lbl" style="text-align:right">)([^<]*)'),function(m,a,b){return a+'📍 '+haceTxt(g.t)+' · '+b})})}catch(e){}return h.replace('En el APK la posición se actualiza en vivo con el GPS del teléfono.','La ubicación de cada chofer se actualiza sola cada 2 minutos mientras trabaja.')};
/* el celular del chofer manda su ubicación */
var _gpsW=null,_gpsU=0,_gpsL=null;
function gpsDebe(){if(!REAL||S.role!=='rep'||!navigator.geolocation)return false;var ruta=S.salida&&S.salida.ok&&!(S.cierre&&S.cierre.sent);var viaje=(S.vws||[]).some(function(x){return x.quien===+S.chofHoy&&x.started&&['done','fin','gracias','cv'].indexOf(x.k)<0});return ruta||viaje}
function gpsDist(a,b){var R=6371000,t=Math.PI/180,dl=(b.lat-a.lat)*t,dn=(b.lng-a.lng)*t,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a.lat*t)*Math.cos(b.lat*t)*Math.sin(dn/2)*Math.sin(dn/2);return 2*R*Math.asin(Math.sqrt(x))}
function gpsRevisa(){var debe=gpsDebe();if(debe&&_gpsW==null){try{_gpsW=navigator.geolocation.watchPosition(function(p){var o={lat:+p.coords.latitude.toFixed(6),lng:+p.coords.longitude.toFixed(6),t:Date.now(),acc:Math.round(p.coords.accuracy||0)};S.pos={lat:o.lat,lng:o.lng};
  if(!_gpsL||Date.now()-_gpsU>120000||gpsDist(_gpsL,o)>200){_gpsU=Date.now();_gpsL=o;S.gps=o;try{render()}catch(e){}}},function(){},{enableHighAccuracy:true,maximumAge:30000,timeout:60000})}catch(e){}}
 else if(!debe&&_gpsW!=null){try{navigator.geolocation.clearWatch(_gpsW)}catch(e){}_gpsW=null}}
setInterval(function(){try{gpsRevisa()}catch(e){}},15000);setTimeout(function(){try{gpsRevisa()}catch(e){}},3000);

/* ---------- mapa de calles sin llave (antes CARTO pedía "API key"): Esri y, si falla, OpenStreetMap ---------- */
var MAPA_CAPAS=[['https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'© Esri · © OpenStreetMap'}],
 ['https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}]];
function mapaCapa(m,el,i){try{mapaCapa0(m,el,i)}catch(e){console.error("capa",e)}}
function mapaCapa0(m,el,i){i=i||0;var c=MAPA_CAPAS[i];if(!c){mapaSinCalles(el);return}var bien=0,mal=0,t=L.tileLayer(c[0],c[1]);
 t.on('tileload',function(){bien++;var a=el.querySelector('.mapafalla');if(a)a.remove()});
 t.on('tileerror',function(){mal++;if(!bien&&mal>=4&&!t._cambio){t._cambio=true;m.removeLayer(t);mapaCapa(m,el,i+1)}});t.addTo(m);el._capa=t}
function mapaSinCalles(el){if(el.querySelector('.mapafalla'))return;var d=document.createElement('div');d.className='mapafalla';d.style.cssText='position:absolute;left:8px;right:8px;top:8px;z-index:500;background:var(--surface);border-radius:10px;padding:8px 10px;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,.2)';d.textContent='No cargaron las calles (¿sin internet?). Los puntos sí están; cuando haya señal se ven las calles.';el.appendChild(d)}
