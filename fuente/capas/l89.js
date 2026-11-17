/* ===================== v8.9 · 79–82 (17 nov)
   80 Ubicación del cliente: si no tiene ubicación pero su dirección ES una coordenada, se toma como su ubicación (ya confirmada) y no
      se vuelve a pedir; al guardar, la coordenada nunca va a la dirección; si se escogió un punto, se guarda aunque no se confirme;
      registro de cada guardado; la tarjeta de abajo no se repite con la de "Guarda la ubicación".
   79 Odómetro inicial (ruta y viaje de carga) = el más alto conocido de ese vehículo; el final se guarda siempre en el vehículo;
      si escriben uno menor, "¿Seguro? El último fue X".
   81 Ruta del chofer: "Te quedan en el camión" ya no se sale de la pantalla; "Hola, Danu · el administrador ve tu ubicación" arriba,
      como texto. · 82 Inicio: el roatán ya no es naranja (azul petróleo). ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.pc.r .hd{background:#0E7490!important}',
 '.rep1 .bx{display:flex!important;flex-wrap:wrap!important;gap:10px!important}.rep1 .bx>.b{flex:1 1 140px!important;min-width:0!important;max-width:100%!important;box-sizing:border-box}',
 '.rep1 .bx>.b svg{flex:0 0 auto;max-width:56px}.rep1{max-width:100%;box-sizing:border-box;overflow:hidden}',
 '.hola89{font-size:15px;color:var(--muted);margin:2px 4px 10px;line-height:1.35}.hola89 b{color:var(--fg);font-size:17px;white-space:nowrap;margin-right:4px}'].join('\n');document.head.appendChild(st)})();
/* que el número grande se encoja si no cabe */
function rep1Fit89(){var c=document.querySelector('main .card.rep1');if(!c)return;Array.prototype.forEach.call(c.querySelectorAll('.bx>.b'),function(b){var sale=function(){var R=b.getBoundingClientRect().right;return [].slice.call(b.querySelectorAll('*')).some(function(x){return x.getBoundingClientRect().right>R+0.5})};var i=0;while(sale()&&i<14){var L=[].slice.call(b.querySelectorAll('*')).filter(function(x){return !x.children.length&&parseFloat(getComputedStyle(x).fontSize)>13});if(!L.length)break;L.forEach(function(x){x.style.fontSize=(parseFloat(getComputedStyle(x).fontSize)*0.92)+'px'});i++}})}

/* ---------- 80 · ubicación ---------- */
function coords89(t){try{var c=coordsDe(String(t||''));if(c&&isFinite(c.lat)&&isFinite(c.lng)&&Math.abs(c.lat)<=90&&Math.abs(c.lng)<=180)return c}catch(e){}var m=/^\s*(-?\d{1,2}\.\d{3,})\s*,\s*(-?\d{1,3}\.\d{3,})\s*$/.exec(String(t||''));return m?{lat:+m[1],lng:+m[2]}:null}
function ubLog89(c,via){try{c.ubLog89=(c.ubLog89||[]).slice(-9);c.ubLog89.push({f:iso(TODAY),h:hhmm(),q:quien(),lat:c.lat,lng:c.lng,via:via})}catch(e){}}
function ubArregla89(){var n=0;(S.cli||[]).forEach(function(c){if(!c||c.oculto)return;if(ubTiene(c))return;var k=coords89(c.a);if(!k)return;c.lat=k.lat;c.lng=k.lng;c.ubAprox=false;c.locConf=iso(TODAY);c.a='';ubLog89(c,'estaba escrita en la dirección');n++});return n}
/* al guardar con la ventana nueva: la coordenada no va a la dirección */
var _u68G89=ub68Guarda;ub68Guarda=function(){var x=S.ub68,o=null;try{o=ub68Obj(x)}catch(e){}var a0=o?o.a:null,lat0=o?o.lat:null;var r=_u68G89.apply(this,arguments);
 try{if(x&&x.t==='cli'&&o){if(coords89(o.a)&&!coords89(a0))o.a=a0||'';var k=coords89(o.a);if(k&&!ubTiene(o)){o.lat=k.lat;o.lng=k.lng;o.a=''}if(ubTiene(o)&&(o.lat!==lat0)){ubLog89(o,'ventana de ubicación');o.locConf=o.locConf||iso(TODAY)}}}catch(e){}return r};
/* ventana vieja (la de "Guardar ubicación aquí" en la entrega): si ya se escogió el punto, se guarda aunque no se tocara "Sí, es aquí" */
var _ubG89=ubGuardar;ubGuardar=function(){var u=S.ub;try{if(u&&u.k==='cli'&&u.lat!=null&&u.lng!=null&&u.est!=='ok'&&u.modo!=='foto'){var c0=cl(u.id);if(c0&&!ubTiene(c0))u.est='ok'}}catch(e){}var c=u&&u.k==='cli'?cl(u.id):null,lat0=c?c.lat:null;var r=_ubG89.apply(this,arguments);try{if(c&&ubTiene(c)&&c.lat!==lat0){ubLog89(c,'Guardar ubicación aquí');c.locConf=c.locConf||iso(TODAY)}}catch(e){}return r};
/* la tarjeta de abajo ("Ubicación de X") no sale si ya está la de "Guarda la ubicación" o si ya tiene ubicación confirmada */
function ubDup89(){var m=document.querySelector('main');if(!m)return;var a=m.querySelector('.ubcard'),b=m.querySelector('[data-x="cfub70"]');if(a&&b)b.remove()}

/* ---------- 79 · odómetro ---------- */
function ultOdo89(vid){var v=vehById(+vid);if(!v)return 0;var mx=num(v.odo);var mira=function(o){try{if(o&&+o.vehHoy===+vid){if(o.cierre&&o.cierre.sent)mx=Math.max(mx,num(o.cierre.odo));if(o.salida&&o.salida.ok)mx=Math.max(mx,num(o.cierre&&o.cierre.odoIni))}}catch(e){}};
 mira(S);Object.keys(S.chSt||{}).forEach(function(id){mira(S.chSt[id])});(S.vws||[]).forEach(function(w){if(w&&+w.veh===+vid){mx=Math.max(mx,num(w.odoFin),num(w.odoIni))}});(S.inspHist||[]).forEach(function(h){if(h&&+h.veh===+vid)mx=Math.max(mx,num(h.odo))});return mx}
function odo89(){try{if(S.role==='rep'&&S.chofHoy!=null&&S.vehHoy!=null&&S.cierre){var L=ultOdo89(S.vehHoy);if(!S.salida.ok&&L>num(S.cierre.odoIni)){S.cierre.odoIni=L;if(num(S.cierre.odo)<L)S.cierre.odo=L}
   var vh=vehById(+S.vehHoy);if(vh&&S.cierre.sent&&num(S.cierre.odo)>num(vh.odo))vh.odo=num(S.cierre.odo)}
  var w=S.vw;if(w&&w.veh!=null){var vv=vehById(+w.veh),L2=ultOdo89(w.veh);if(!w.started&&L2>num(w.odoIni))w.odoIni=String(L2);if(vv&&num(w.odoFin)>num(vv.odo)&&(w.hist||w.fin||w.k==='gracias'))vv.odo=num(w.odoFin)}}catch(e){}}
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset)return;var b=t.dataset.bind||'';if(!/^(cierre\.odoIni|vw\.odoIni|salida\.odoIni)$/.test(b))return;var vid=/^vw/.test(b)?(S.vw&&S.vw.veh):S.vehHoy;if(vid==null)return;var L=ultOdo89(vid),v=num(t.value);if(v&&L&&v<L-0.5)toast('¿Seguro? El último odómetro de este vehículo fue '+Math.round(L).toLocaleString('es-MX')+' km')},true);

/* ---------- 81 · saludo arriba, como texto ---------- */
function hola89(){if(S.role!=='rep'||S.tab.rep!=='ruta')return;var m=document.querySelector('main');if(!m||m.querySelector('.hola89'))return;var h=m.querySelector('.hello'),ub=[].filter.call(m.querySelectorAll('.card.autocard'),function(c){return /el administrador ve tu ubicación/.test(c.textContent)})[0];if(!h&&!ub)return;
 var d=document.createElement('div');d.className='hola89';d.innerHTML='<b>Hola, '+esc(chofN(S.chofHoy))+'</b>'+(ub?'<span>· el administrador ve tu ubicación mientras trabajas</span>':'');if(h)h.remove();if(ub)ub.remove();m.prepend(d)}

var _rd89=render;render=function(){try{ubArregla89();odo89()}catch(e){console.error('l89',e)}var r=_rd89.apply(this,arguments);try{ubDup89();hola89();rep1Fit89()}catch(e){console.error('l89b',e)}return r};
