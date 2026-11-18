/* ===================== TEMA · Viaje de carga al proveedor (aplanado el 18 nov) =====================
   Antes estaba repartido en 27 envolturas encadenadas en l14, l16, l25, l26, l27, l32, l34, l46, l54, l69, l70, l77, l80, l82, l87.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-viaje.js).
   Se arma justo después de tema-nube.js (antes de los otros temas).
   Si se cambia algo del viaje, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - vwBody, vwSideHTML, vwBurbuja, vwNodos, vwTramoHTML, vwMapa, vwPos, vwPend, vwParCfg, vwFotoUna: la pantalla del viaje en curso,
     su burbuja, el mapa, los tramos y las fotos.
   - vwBasc: los pesos de la báscula.
   - fiProv, fiCarga: las fichas del proveedor y de cada carga.
   - recargaCard, provPideHTML, sugCarga, sugCargaHTML: la tarjeta de recargar, lo que pide el proveedor y la sugerencia de cuánto cargar.
   NO están aquí: la última envoltura de vwBurbuja (ya vive en tema-pantallas.js, que se arma después) y "cargas" (va dentro de un bloque).
   La versión completa de sugCarga se rehízo en l82 (antes de su envoltura). l46 sigue usando _vwB16 (la burbuja sin la de "Después").
   ============================================================================================ */

/* recargaCard · de l14 */
var _rcC14=recargaCard;recargaCard=function(){var h=_rcC14.apply(this,arguments),rc=S.rc||{},dis=S.cierre.sent;if(dis)return h;
 var ft=(rc.foto?'<img src="'+rc.foto+'" alt="Ticket de gasolina" style="width:100%;height:110px;object-fit:cover;border-radius:10px;margin-top:6px">':'')+'<label class="btn sm '+(rc.foto?'sec':'')+'" for="rcf" style="display:inline-flex;align-items:center;cursor:pointer;margin-top:6px">'+(rc.foto?'Cambiar foto del ticket':'📷 Foto del ticket')+'</label><input id="rcf" type="file" accept="image/*" capture="environment" data-rcf="1" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">'+(rc.foto?'':'<div class="lbl">Sin foto del ticket no se descuenta hasta que el administrador lo acepte.</div>');
 h=h.replace('<button class="btn" data-act="recargar"',ft+'<button class="btn" data-act="recargar"');return h+gxRevChofer('rc')};

/* vwBurbuja · de l16 */
var _vwB16=vwBurbuja;vwBurbuja=function(){return dfBurbuja()+_vwB16.apply(this,arguments)};

/* vwBasc · de l25 */
var _vb25=vwBasc;vwBasc=function(p){var b=_vb25.apply(this,arguments);if(b||vwPes(p))return b;return {id:null,n:'Báscula',lat:null,lng:null}};

/* vwNodos · de l25 */
var _vn25=vwNodos;vwNodos=function(v){var N=_vn25.apply(this,arguments);
 N.forEach(function(x,i){if(x.lat==null||x.lng==null||isNaN(x.lat)||isNaN(x.lng)){var pr=N.filter(function(y){return y.t==='prov'&&y.i===x.i})[0];x.lat=pr&&pr.lat!=null?pr.lat-.02:BOD.lat+.28;x.lng=pr&&pr.lng!=null?pr.lng-.02:BOD.lng+.28}});return N};

/* vwBurbuja · de l25 */
var _vwB25=vwBurbuja;vwBurbuja=function(){var h=_vwB25.apply(this,arguments),ch=[];
 h=h.replace(/<div class="dfmini"[^>]*>(<button[\s\S]*?<\/button>)<\/div>/,function(m,b){ch.push(b);return ''});
 h=h.replace(/<div style="display:flex;justify-content:flex-end">(<button class="popin[^"]*" data-act="bubmax"[\s\S]*?<\/button>)<\/div>/,function(m,b){ch.push(b);return ''});
 return h+(ch.length?'<div class="mindock">'+ch.join('')+'</div>':'')};

/* vwBasc · de l26 */
var _vb26=vwBasc;vwBasc=function(p){if(p&&!vwPes(p)&&p.basId==='__nueva')return {id:null,n:String(p.nbn||'').trim()||'Báscula nueva',lat:null,lng:null,nueva:true};return _vb26.apply(this,arguments)};

/* vwParCfg · de l26 */
var _pc26=vwParCfg;vwParCfg=function(p,ix){var h=_pc26.apply(this,arguments),v=S.vw;
 if(!vwPes(p)){h=h.replace(/(<select id="vwbs\d+"[\s\S]*?)<\/select>/,function(m,a){return a+'<option value="__nueva"'+(p.basId==='__nueva'?' selected':'')+'>+ Báscula nueva (el chofer la registra)</option></select>'});
  if(p.t==='R')h='<div class="lbl" style="margin-top:6px">El roatán siempre pasa a pesar a la báscula.</div>'+h;
  if(p.basId==='__nueva')h+='<div class="field"><label for="vwnb'+ix+'">¿Cómo se llama la báscula?</label><input id="vwnb'+ix+'" type="text" data-bind="vw.par.'+ix+'.nbn" value="'+esc(p.nbn||'')+'" placeholder="Ej. Báscula El Molo" style="width:170px;text-align:left"></div><div class="lbl">Si no sabes el nombre, déjalo vacío: el chofer lo escribe.</div>'}
 var falta=[];if(!vwPes(p)){var bs=vwBasc(p);if(bs&&!ubTiene(bs))falta.push(['bas',bs])}
 if(p.prov&&p.prov!=='__nuevo'&&!ubTiene(provD(p.prov)))falta.push(['prov',{n:p.prov}]);else if(p.prov==='__nuevo')falta.push(['provn',{n:p.np||'el proveedor nuevo'}]);
 if(!falta.length)return h;
 h+='<div class="card note" style="padding:10px 12px;margin-top:10px"><b>📍 Sin ubicación</b>';
 falta.forEach(function(f){var nm=f[1].n||'';h+='<div style="margin-top:6px">'+(f[0]==='bas'&&f[1].nueva&&!String(p.nbn||'').trim()?'La báscula nueva':esc(nm)+(f[0]==='bas'?' (báscula)':' (proveedor)'))+'</div>';
  if(f[0]==='provn')h+='<div class="field" style="border:0;padding-top:2px"><label for="ubnp'+ix+'" style="font-size:14px">Ubicación aproximada (link de Google Maps o coordenadas)</label><input id="ubnp'+ix+'" type="text" data-bind="vw.par.'+ix+'.nub" value="'+esc(p.nub||'')+'" placeholder="19.5432, -96.9271" style="width:170px;text-align:left"></div>';
  if((f[0]==='bas'&&f[1].id!=null)||f[0]==='prov')h+='<div class="field" style="border:0;padding-top:2px"><label for="ubp'+ix+f[0]+'" style="font-size:14px">Pégala aquí (link de Google Maps o coordenadas)</label><input id="ubp'+ix+f[0]+'" type="text" data-ubpega="'+f[0]+':'+(f[0]==='bas'?f[1].id:esc(nm))+'" placeholder="19.5432, -96.9271" style="width:170px;text-align:left"></div>'});
 var qn=v&&v.quien!==2?chofN(v.quien):'el chofer';
 h+='<div class="chips" role="group" aria-label="Pedirle al chofer" style="margin-top:8px"><button data-act="ubpide" data-i="'+ix+'" data-v="1" aria-pressed="'+!p.noUb+'">Que '+esc(qn)+' la guarde al llegar</button><button data-act="ubpide" data-i="'+ix+'" data-v="0" aria-pressed="'+!!p.noUb+'">No pedirla</button></div>'
  +'<div class="lbl" style="margin-top:4px">Al llegar, la app toma la ubicación del GPS, el nombre y una foto del lugar.</div></div>';return h};

/* vwBody · de l26 */
var _vB26=vwBody;vwBody=function(k){var h=_vB26.apply(this,arguments),v=S.vw;if(!v||(vwEsAdm()&&!vwYo())||['ruta','camino'].indexOf(k)<0)return h;var L=ubFaltanViaje(v);if(!L.length)return h;
 return '<div class="card note ubcard" style="padding:10px 12px;margin-top:8px"><b>📍 Hoy vas a '+(L.length===1?'un lugar que no tiene':'lugares que no tienen')+' ubicación</b><div style="font-size:15px;margin-top:4px">'+esc(L.join(', '))+'</div><div class="lbl" style="margin-top:4px">Cuando llegues y toques "Ya llegué", te pido guardarla: un toque al GPS, el nombre y una foto.</div></div>'+h};

/* vwTramoHTML · de l26 */
var _tr26=vwTramoHTML;vwTramoHTML=function(k){var h=_tr26.apply(this,arguments),v=S.vw;try{var T=vwTramo(v);if(!T)return h;var r=ubDeNodo(v,T.a);if(!r||!r.need)return h;
 var pv=provD((v.par[T.a.i]||{}).prov||''),q=r.k==='bas'?((r.obj&&r.obj.dir)||((r.n||'báscula')+' '+(pv.dir||''))):((r.obj&&r.obj.dir)||r.n);
 h=h.replace(/href="https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=[^"]*"/,'href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)+'"');
 return h.replace('Ir con Google Maps','Buscar en Google Maps')}catch(e){return h}};

/* fiProv · de l27 */
var _fiP27=fiProv;fiProv=function(){return provUbIns(_fiP27.apply(this,arguments))};

/* vwFotoUna · de l32 */
var _vF32=vwFotoUna;vwFotoUna=function(key,l){var h=_vF32.apply(this,arguments);if(vwEsAdm()||!FOTOS_OBLIGATORIAS||S.vw[key])return h;return h+'<button class="fotono" data-act="fotono" data-vw="'+key+'" data-l="'+esc(String(l).replace(/ \((opcional|obligatoria)[^)]*\)/,''))+'">No pude tomarla</button>'};

/* vwMapa · de l34 */
var _vM34=vwMapa;vwMapa=function(v,small){if(!mapaHay())return _vM34.apply(this,arguments);var N=vwNodos(v),pos=vwPos(v),seen={},pts=[];
 N.forEach(function(n,j){if(n.t==='bod'||n.lat==null)return;var k=n.lat.toFixed(4)+','+n.lng.toFixed(4);if(seen[k]){seen[k].t+=' y '+j;return}var o={lat:n.lat,lng:n.lng,t:String(j),n:(n.t==='bas'?'Báscula ':'')+n.n,col:n.t==='bas'?'var(--fg)':'var(--accent)'};seen[k]=o;pts.push(o)});
 var mk=v.started&&['reg','cv','fin','gracias','done'].indexOf(v.k)<0&&pos?[{lat:pos.lat,lng:pos.lng,t:(chofN(v.quien)||'?').slice(0,1),n:chofN(v.quien),col:'#2F6DB5'}]:[];
 return mapaVivoHTML('vw'+S.vws.indexOf(v)+(small?'s':''),{pts:pts,line:N.filter(function(n){return n.lat!=null}).map(function(n){return {lat:n.lat,lng:n.lng}}),marks:mk,bod:false},small?160:220)+'<div class="lbl" style="margin-top:4px">Los números son las paradas del viaje.'+(mk.length?' El punto azul es '+esc(v.quien===2?'tu ubicación':chofN(v.quien))+'.':'')+'</div>'};

/* vwPos · de l34 */
var _vP34=vwPos;vwPos=function(v){var g=v&&v.started?gpsReciente(v.quien,15):null;return g?{lat:g.lat,lng:g.lng}:_vP34.apply(this,arguments)};

/* vwBurbuja · de l46 */
var _vwB46=vwBurbuja;vwBurbuja=function(){var hv=bubVwHay(),nd=bubDfN();if(!(hv&&nd))return _vwB46.apply(this,arguments);
 var abierta=!S.bubMin||!S.dfMin;if(!abierta)return _vwB46.apply(this,arguments);
 var tab=S.bubTab||(!S.bubMin?'vw':'df');if(tab==='vw'&&S.bubMin&&!S.dfMin)tab='df';if(tab==='df'&&S.dfMin&&!S.bubMin)tab='vw';
 var g1=S.bubMin,g2=S.dfMin,cuerpo='';try{if(tab==='vw'){S.bubMin=false;cuerpo=_vwB16.apply(this,arguments).replace(dfBurbuja(),'')}else{S.dfMin=false;cuerpo=dfBurbuja()}}finally{S.bubMin=g1;S.dfMin=g2}
 cuerpo=cuerpo.replace(/<button class="link" style="color:#fff;min-height:30px;font-size:20px" data-act="(bubmin|dfmin)" aria-label="Minimizar">–<\/button>/,'');
 return '<div class="bubpanel"><div class="bubtabs" role="tablist"><button role="tab" data-act="bubtab" data-v="vw" aria-pressed="'+(tab==='vw')+'">🛻 Viaje</button><button role="tab" class="df" data-act="bubtab" data-v="df" aria-pressed="'+(tab==='df')+'">📝 Faltan '+nd+'</button><button class="min" data-act="bubmin2" aria-label="Minimizar">–</button></div>'+cuerpo+'</div>'};

/* vwBody · de l46 */
if(typeof vwBody==='function'){var _vwBo46=vwBody;vwBody=function(){return tarjetear(_vwBo46.apply(this,arguments))}}

/* vwSideHTML · de l46 */
if(typeof vwSideHTML==='function'){var _vwSi46=vwSideHTML;vwSideHTML=function(){return tarjetear(_vwSi46.apply(this,arguments))}}

/* fiCarga · de l54 */
var _fiC54=fiCarga;fiCarga=function(f){var h=_fiC54.apply(this,arguments),c=cargaById(f.id);if(!c||S.role!=='admin'||!c.prog||!c.viaje||c.viaje.ini||c.est!=='Por llegar')return h;
 return h.replace(/<\/div><\/div><\/div>$/,'<button class="btn sec" style="margin-top:14px;color:var(--danger)" data-act="progcancel" data-id="'+c.id+'">Cancelar este viaje</button></div></div></div>')};

/* provPideHTML · de l54 */
var _ppH54=provPideHTML;provPideHTML=function(){var h=_ppH54.apply(this,arguments);if(!h)return h;return h.replace(/href="([^"]*)">📲 ([^<]*)</g,function(m,u,n){var nm=n.replace(/&amp;/g,'&'),t=(S.provDir[nm]||{}).tipo||'Ambos',q=t==='Roatán'?'plátano roatán':(t==='Macho'?'plátano macho':'plátano roatán y macho');
 return 'href="'+u.replace(encodeURIComponent('mandar plátano?'),encodeURIComponent('mandar '+q+'? ¿A cómo el kilo?'))+'">📲 '+n+'<'})};

/* vwBody · de l69 */
var _vwB69=vwBody;vwBody=function(k){var h=_vwB69.apply(this,arguments);try{var v=S.vw;if(!v||k!=='plan'||!h)return h;var on=v.comOk===true?'si':(v.comOk===false?'no':'');
  var c='<div class="card c68" style="margin-top:10px;padding:12px 14px;border:2px solid var(--accent)"><div style="font-size:18px;font-weight:900">¿Tiene autorizado comer en el viaje?</div>'+ch68('vw68','comOk',[['si','Sí'],['no','No']],on)
   +(on==='si'?'<div class="field"><label for="vw68m">¿Máximo cuánto? $</label><input id="vw68m" type="number" inputmode="decimal" min="0" data-bind="vw.comMax" value="'+esc(v.comMax==null?'':v.comMax)+'"></div>':'')+'</div>';
  var i=h.lastIndexOf('<div style="display:flex;gap:8px');return i>-1?h.slice(0,i)+c+h.slice(i):h+c}catch(e){return h}};

/* vwSideHTML · de l69 */
var _vwS69=vwSideHTML;vwSideHTML=function(sd){var h=_vwS69.apply(this,arguments);try{var v=S.vw;if(sd!=='gasto'||!v)return h;
  if(v.comOk===false){h=h.replace(/<button style="min-height:48px" data-act="vwgxt" data-v="Comida"[^>]*>Comida<\/button>/,'');h=h.replace('<div class="field"><label for="vwgxm">','<div class="lbl" style="margin:4px 0">La comida no está autorizada en este viaje.</div><div class="field"><label for="vwgxm">')}
  else if(v.comOk===true&&num(v.comMax)>0){var ya=sum((v.gx||[]).filter(function(x){return x.t==='Comida'}),function(x){return num(x.m)});h=h.replace('<div class="field"><label for="vwgxm">','<div class="lbl" style="margin:4px 0">Comida autorizada: hasta '+money(num(v.comMax))+' (llevas '+money(ya)+').</div><div class="field"><label for="vwgxm">')}
  /* imprevisto: grúa o refacción también */
  h=h.replace('data-v="Reparación" aria-pressed','data-v="Reparación" aria-pressed').replace('>Reparación</button>','>Imprevisto (ponchadura, grúa, refacción)</button>')}catch(e){}return h};

/* fiCarga · de l69 */
var _fiC69=fiCarga;fiCarga=function(f){var h=_fiC69.apply(this,arguments);try{var c=cargaById(f.id);if(!c||S.role!=='admin'||c.est!=='Recibida'||h.indexOf('data-act="cvopen"')>-1)return h;
  var bt='<button class="btn" style="min-height:56px;width:100%" data-act="cvopen" data-id="'+c.id+'">'+(c.cv&&c.cv.ok?'🧾 Corregir el costo del viaje':'🧾 Costo del viaje más exacto (combustible, desgaste, sueldo)')+'</button>';
  var i=h.indexOf('<div class="card" style="display:flex;flex-direction:column;gap:8px">');if(i<0)return h;i+='<div class="card" style="display:flex;flex-direction:column;gap:8px">'.length;return h.slice(0,i)+bt+h.slice(i)}catch(e){return h}};

/* fiProv · de l70 */
var _fiP70=fiProv;fiProv=function(f){var h=_fiP70.apply(this,arguments);try{if(S.role!=='admin'||(S.fiTab||{})['prov:'+f.id]&&(S.fiTab||{})['prov:'+f.id]!=='dat')return h;if(h.indexOf('data-act="provtipo"')<0)return h;var d=provD(f.id),ok=d.lat!=null;
  var c='<div class="card"><b>📍 Ubicación</b><div class="lbl">'+(ok?d.lat+', '+d.lng:'Sin ubicación todavía')+'</div><button class="btn sm" style="width:100%;margin-top:6px;min-height:50px" data-act="ub68" data-t="prov" data-id="'+encodeURIComponent(f.id)+'">'+(ok?'Corregir la ubicación':'Poner la ubicación')+'</button></div>';var i=h.indexOf('<div class="card"><div class="lbl">Qué te vende');return i>-1?h.slice(0,i)+c+h.slice(i):h}catch(e){return h}};

/* vwBurbuja · de l77 */
if(typeof vwBurbuja==='function'){var _vB77=vwBurbuja;vwBurbuja=function(){try{return _vB77.apply(this,arguments)}catch(e){falloAnota77(e,'burbuja del viaje');return ''}}}

/* vwPend · de l77 */
if(typeof vwPend==='function'){var _vP77=vwPend;vwPend=function(){try{return _vP77.apply(this,arguments)}catch(e){return []}}}

/* vwNodos · de l80 */
var _vN80=vwNodos;vwNodos=function(){var N=_vN80.apply(this,arguments);try{var n=bodNom80();N.forEach(function(x){if(x.t==='bod'&&x.n==='Banderilla')x.n=n.charAt(0).toUpperCase()+n.slice(1)})}catch(e){}return N};

/* sugCargaHTML · de l82 */
var _sch82=sugCargaHTML;sugCargaHTML=function(){if(MODO!=='vacio')return _sch82.apply(this,arguments);var s=sugCarga();if(!s.n||!(s.sR||s.sM))return '';
 return '<div class="card note" style="padding:10px 12px;margin:8px 0"><b>Sugerido para hoy: '+(s.sR?s.sR+' cajas':'')+(s.sR&&s.sM?' y ':'')+(s.sM?s.sM+' kg':'')+'</b><div class="lbl">'+s.n+' de tus '+s.tot+' clientes de hoy ya tienen historial o pedido: llevan ~'+(s.R?s.R+' cajas':'')+(s.R&&s.M?' y ':'')+(s.M?s.M+' kg':'')+', más un poco por si acaso.'+(s.n<s.tot?' A los otros '+(s.tot-s.n)+' todavía no se les ha entregado.':'')+'</div><button class="btn sm sec" style="margin-top:6px" data-act="usarsug">Usar lo sugerido</button></div>'};

/* sugCarga · de l87 */
var _sug87=sugCarga;sugCarga=function(){var s=_sug87.apply(this,arguments);try{if(MODO==='vacio'&&s&&s.tot&&s.n>0&&s.n*2<s.tot){s.poco87=1;s.sR=0;s.sM=0}}catch(e){}return s};
