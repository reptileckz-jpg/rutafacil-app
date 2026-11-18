/* ===================== v5.1 · Guardar ubicaciones: básculas, proveedores y clientes =====================
   - El admin, al programar el viaje, puede elegir "Báscula nueva" y poner la ubicación (link de Maps o coordenadas)
     o pedirle al chofer que la guarde.
   - Al llegar a una báscula o proveedor sin ubicación ("Ya llegué"), el chofer la guarda con el GPS (obligatorio,
     con confirmación "¿seguro que ya estás ahí?"), el nombre y una foto (recomendada).
   - Si la foto se tomó de noche y ahora hay luz, se le sugiere actualizarla.
   - En reparto: cada cliente sin ubicación la pide (obligatoria) al entregarle; luego se le piden foto de la
     fachada y teléfono hasta que esté completo. Los clientes nuevos que da de alta el chofer le avisan al admin. */
(function(){var st=document.createElement('style');st.textContent=[
 '#ubov{position:fixed;inset:0;z-index:90;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}',
 '#ubov .ubw{max-width:520px;margin:0 auto;padding:calc(14px + var(--sbar,0px)) 16px 40px}',
 '#ubov .ubgps{width:100%;min-height:64px;font-size:18px}',
 '#ubov .ubfoto{display:flex;align-items:center;justify-content:center;gap:8px;min-height:120px;border:2px dashed var(--line);border-radius:14px;cursor:pointer;color:var(--muted);text-align:center;padding:10px;position:relative;overflow:hidden}',
 '#ubov .ubfoto img{width:100%;max-height:220px;object-fit:cover;border-radius:10px;display:block}',
 '.ubcard .btn{margin-top:8px}'
].join('\n');document.head.appendChild(st)})();
function ubTiene(o){return !!(o&&o.lat!=null&&o.lng!=null&&o.lat!==''&&!isNaN(+o.lat)&&!isNaN(+o.lng))}
function ubNoche(ts){if(!ts)return false;var h=new Date(ts).getHours();return h<7||h>=19}
function ubHayLuz(){var h=new Date().getHours();return h>=8&&h<18}
function ubFotoSug(o){return !!o&&(!o.foto||(ubNoche(o.fotoH)&&ubHayLuz()))}
var UB_LEGADO=function(){return !!window.__pnTest&&!window.__ubTest};
/* ---- báscula nueva elegida por el admin ---- */
var _vb26=vwBasc;vwBasc=function(p){if(p&&!vwPes(p)&&p.basId==='__nueva')return {id:null,n:String(p.nbn||'').trim()||'Báscula nueva',lat:null,lng:null,nueva:true};return _vb26.apply(this,arguments)};
/* coordenadas a partir de un link de Google Maps o de "19.54, -96.92" */
function ubParse(s){s=String(s||'');var m=/@(-?\d+\.\d+),(-?\d+\.\d+)/.exec(s)||/[?&](?:q|query|destination|ll)=(-?\d+\.\d+)(?:,|%2C)\s*(-?\d+\.\d+)/.exec(s)||/(-?\d{1,2}\.\d{3,})\s*,\s*(-?\d{1,3}\.\d{3,})/.exec(s);if(!m)return null;var la=+m[1],ln=+m[2];if(Math.abs(la)>90||Math.abs(ln)>180)return null;return {lat:la,lng:ln}}
/* ---- lo que ve el admin al programar el viaje ---- */
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
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.ubpega)return;var pr=t.dataset.ubpega.split(':'),c=ubParse(t.value);
 if(!c){toast(/goo\.gl|maps\.app/.test(t.value)?'Ese link corto no trae la ubicación. En Google Maps deja presionado el lugar y copia los números':'No encontré la ubicación en ese texto');return}
 var o=pr[0]==='bas'?S.basc.filter(function(b){return b.id===+pr[1]})[0]:provD(pr.slice(1).join(':'));if(!o)return;o.lat=c.lat;o.lng=c.lng;o.ubAprox=true;o.ubPor='';toast('Ubicación guardada');render()},true);
/* ---- qué lugar del viaje toca y si le falta algo ---- */
function ubDeNodo(v,a){if(!a||a.t==='bod')return null;var p=v.par[a.i]||{};
 if(a.t==='bas'){var bs=a.bid!=null?S.basc.filter(function(b){return b.id===a.bid})[0]:null;return {k:'bas',bid:bs?bs.id:null,pi:a.i,n:bs?bs.n:String(p.nbn||'').trim(),key:'b'+(bs?bs.id:'n'+a.i),need:!bs||!ubTiene(bs),obj:bs,noUb:!!p.noUb}}
 var d=provD(a.n);return {k:'prov',n:a.n,pi:a.i,key:'p'+a.n,need:!ubTiene(d)||!!d.ubAprox,aprox:ubTiene(d)&&!!d.ubAprox,obj:d,noUb:!!p.noUb&&!d.ubAprox}}
function ubFaltanViaje(v){var N=vwNodos(v),L=[],vis={};N.forEach(function(a){var r=ubDeNodo(v,a);if(r&&r.need&&!r.noUb&&!vis[r.key]){vis[r.key]=1;L.push(r.n||'la báscula nueva')}});return L}
/* aviso al empezar el viaje */
var _vB26=vwBody;vwBody=function(k){var h=_vB26.apply(this,arguments),v=S.vw;if(!v||(vwEsAdm()&&!vwYo())||['ruta','camino'].indexOf(k)<0)return h;var L=ubFaltanViaje(v);if(!L.length)return h;
 return '<div class="card note ubcard" style="padding:10px 12px;margin-top:8px"><b>📍 Hoy vas a '+(L.length===1?'un lugar que no tiene':'lugares que no tienen')+' ubicación</b><div style="font-size:15px;margin-top:4px">'+esc(L.join(', '))+'</div><div class="lbl" style="margin-top:4px">Cuando llegues y toques "Ya llegué", te pido guardarla: un toque al GPS, el nombre y una foto.</div></div>'+h};
/* ---- la pantalla para guardar el lugar ---- */
function ubAbrir(r,o){o=o||{};var obj=r.obj||{};
 S.ub={k:r.k,bid:r.bid,pi:r.pi,id:r.id,n:r.n||'',key:r.key,modo:o.modo||'gps',sigue:!!o.sigue,est:'',fallos:0,lat:null,lng:null,acc:null,foto:null,fotoH:null,tel:r.k==='cli'?(obj.tel||''):'',recibe:r.k==='cli'?(obj.recibe||''):'',fotoVieja:obj.foto||null,fotoViejaH:obj.fotoH||null,gpsYa:ubTiene(obj)};
 if(S.vw&&r.key){S.vw.ubFoto=S.vw.ubFoto||{};S.vw.ubFoto[r.key]=1}render();var ov=document.getElementById('ubov');if(ov)ov.scrollTop=0}
function ubNom(){var u=S.ub;return u.k==='cli'?(u.n||'este cliente'):(u.n||(u.k==='bas'?'la báscula':'el proveedor'))}
function ubHTML(){var u=S.ub;if(!u)return '';var foto=u.modo==='foto',datos=u.modo==='datos',nm=esc(ubNom());
 var tit=foto?'Foto de '+nm:(datos?'Datos de '+nm:(u.k==='bas'?'Guarda esta báscula':(u.k==='prov'?'Guarda este proveedor':'Guarda la ubicación del cliente')));
 var sub=foto?(u.fotoVieja&&ubNoche(u.fotoViejaH)&&ubHayLuz()?'La foto que hay se tomó de noche. Ya hay luz: tómala otra vez para que se vea bien.':'Todavía no tiene foto. Ayuda a que el siguiente chofer reconozca el lugar.'):(datos?'Faltan algunos datos. Llena los que puedas.':'Así se van planeando las rutas. Hazlo estando ya en el lugar.');
 var h='<div id="ubov" role="dialog" aria-label="'+tit+'"><div class="ubw"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:20px">'+tit+'</b><div class="lbl">'+sub+'</div></span><button class="helpb" style="margin:0" data-act="ubx" aria-label="Cerrar">×</button></div>';
 if(!foto&&!datos&&u.k==='bas')h+='<div class="field"><label for="ubn">¿Cómo se llama?</label><input id="ubn" type="text" data-bind="ub.n" value="'+esc(u.n)+'" placeholder="Ej. Báscula El Molo" style="width:180px;text-align:left"></div>';
 else if(!foto&&!datos)h+='<div class="card" style="padding:10px 12px;margin-top:10px"><b>'+nm+'</b></div>';
 if(!foto&&!datos){h+='<div class="card" style="padding:12px;margin-top:10px"><b>Ubicación (obligatoria)</b>';
  if(u.est===''||u.est==='err')h+=(u.est==='err'?'<div class="neg" style="margin-top:6px">'+esc(u.err||'No se pudo tomar la ubicación')+'</div>':'')+'<button class="btn ubgps" style="margin-top:8px" data-act="ubgps">📍 '+(u.est==='err'?'Intentar otra vez':'Tomar mi ubicación aquí')+'</button>'+(u.est==='err'&&u.fallos>=2?'<button class="btn sm sec" style="margin-top:8px" data-act="ubskip">Seguir sin ubicación (le aviso al administrador)</button>':'')+'<div class="lbl" style="margin-top:6px">Usa el GPS del teléfono. Si te pide permiso de ubicación, dale "Permitir".</div>';
  else if(u.est==='buscando')h+='<div style="font-size:17px;margin-top:8px">Buscando tu ubicación…</div><div class="lbl">Sal a cielo abierto si tarda.</div>';
  else if(u.est==='conf')h+='<div style="font-size:17px;margin-top:8px"><b>¿Seguro que ya estás en '+nm+'?</b></div><div class="lbl">Guárdala solo si de verdad estás ahí. Precisión: ±'+Math.round(u.acc||0)+' m</div>'+(u.acc>100?'<div class="neg" style="font-size:14px;margin-top:4px">La señal está débil. Si puedes, espera unos segundos y vuelve a tomarla.</div>':'')+'<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" style="flex:2" data-act="ubsi">Sí, estoy aquí</button><button class="btn sec" style="flex:1" data-act="ubotra">Todavía no</button></div>';
  else if(u.est==='ok')h+='<div style="font-size:17px;margin-top:8px;color:var(--accent)"><b>✓ Ubicación lista</b></div><div class="lbl">±'+Math.round(u.acc||0)+' m · <button class="link" data-act="ubotra">Volver a tomarla</button></div>';
  h+='</div>'}
 var ft=u.foto;h+='<div class="card" style="padding:12px;margin-top:10px"><b>'+(u.k==='cli'?'Foto de la fachada':'Foto del lugar')+(foto?'':' (recomendada)')+'</b><label class="ubfoto" for="ubF" style="margin-top:8px">'+(ft?'<img src="'+ft+'" alt="Foto del lugar">':'📷 Tomar foto')+'</label><input id="ubF" type="file" accept="image/*" capture="environment" data-ubf="1" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">'+(ft&&ubNoche(u.fotoH)?'<div class="lbl" style="margin-top:6px">Está oscuro: cuando vuelvas de día te pido actualizarla.</div>':'')+'</div>';
 if(u.k==='cli'&&!foto)h+='<div class="card" style="padding:4px 12px;margin-top:10px"><div class="field"><label for="ubtel">Teléfono</label><input id="ubtel" type="tel" data-bind="ub.tel" value="'+esc(u.tel)+'" placeholder="228 000 0000" style="width:170px;text-align:left"></div><div class="field"><label for="ubrec">¿Quién recibe?</label><input id="ubrec" type="text" data-bind="ub.recibe" value="'+esc(u.recibe)+'" style="width:170px;text-align:left"></div></div>';
 var listo=foto?!!u.foto:(datos?true:u.est==='ok');
 h+='<button class="btn" style="margin-top:14px;min-height:56px" data-act="ubsave"'+(listo?'':' disabled')+'>'+(foto?'Guardar foto':'Guardar')+'</button>'+(foto?'<button class="btn sec" style="margin-top:8px" data-act="ubx">Ahora no</button>':'');
 return h+'</div></div>'}
/* setupHTML: pasó a tema-ajustes.js */
/* GPS: en la demo (o en pruebas) se simula */
function ubGps(){var u=S.ub;if(!u)return;u.est='buscando';render();
 var ok=function(la,ln,ac){if(!S.ub)return;S.ub.lat=+la.toFixed(6);S.ub.lng=+ln.toFixed(6);S.ub.acc=ac;vibrarSi();if(S.ub.modo==='act'){S.ub.est='ok';ubGuardar();return}S.ub.est='conf';render()},
  mal=function(m){if(!S.ub)return;S.ub.fallos++;S.ub.est='err';S.ub.err=m;render()};
 if(!REAL||window.__pnTest){setTimeout(function(){var b=u.k==='cli'?{lat:BOD.lat+.02,lng:BOD.lng+.02}:{lat:BOD.lat+.3,lng:BOD.lng+.3};ok(b.lat+(Math.random()-.5)*.02,b.lng+(Math.random()-.5)*.02,12)},window.__pnTest?50:700);return}
 if(!navigator.geolocation){mal('Este teléfono no deja usar el GPS');return}
 navigator.geolocation.getCurrentPosition(function(p){ok(p.coords.latitude,p.coords.longitude,p.coords.accuracy)},function(er){mal(er&&er.code===1?'No diste permiso de ubicación. Actívalo en Ajustes del teléfono → Apps → Ruta Fácil → Permisos → Ubicación':(er&&er.code===3?'Tardó mucho en encontrarte. Intenta otra vez a cielo abierto':'No se pudo tomar la ubicación. Revisa que el GPS esté prendido'))},{enableHighAccuracy:true,timeout:20000,maximumAge:0})}
function vibrarSi(){try{if(typeof vibrar==='function')vibrar(30)}catch(e){}}
function ubQuien(){return S.role==='admin'?'Tú':chofN(+S.chofHoy)}
function ubGuardar(){var u=S.ub;if(!u)return;var o=null,nm=ubNom();
 if(u.k==='bas'){var p=S.vw&&S.vw.par[u.pi];if(u.modo!=='foto'&&!String(u.n||'').trim()){toast('Escribe cómo se llama la báscula');return false}
  o=u.bid!=null?S.basc.filter(function(b){return b.id===u.bid})[0]:null;
  if(!o){var id=S.basc.reduce(function(m,b){return Math.max(m,+b.id||0)},0)+1;o={id:id,n:String(u.n).trim(),cobro:'',dir:'',ab:'',ci:'',nota:'',nuevaPor:ubQuien()};S.basc.push(o);if(p){p.basId=String(id);if(p.prov)provD(p.prov).bas=id}S.avPrecio.push(ubQuien()+' registró una báscula nueva: '+o.n+'. Ponle cuánto cobra en Proveedores → Básculas.')}
  else if(u.modo!=='foto'&&String(u.n||'').trim())o.n=String(u.n).trim();nm=o.n}
 else if(u.k==='prov')o=provD(u.n);
 else if(u.k==='cli'){o=cl(u.id);if(!o)return;if(u.modo!=='foto'){o.tel=u.tel||o.tel||'';o.recibe=u.recibe||o.recibe||'';if(o.rapida&&S.d){S.d.rtel=S.d.rtel||u.tel;S.d.gps=true}}}
 if(!o)return;
 if(u.est==='ok'){o.lat=u.lat;o.lng=u.lng;o.ubAprox=false;o.ubPor=ubQuien();o.ubF=iso(TODAY);if(u.k!=='cli'||!o.rapida)S.avPrecio.push(ubQuien()+' guardó la ubicación de '+nm+(u.foto?' (con foto)':''))}
 if(u.foto){o.foto=u.foto;o.fotoH=u.fotoH||Date.now()}
 var sigue=u.sigue;S.ub=null;toast(u.modo==='foto'?'Foto guardada':'Guardado: '+nm);render();if(sigue)ubSeguir();return true}
var _ubPasa=false;
function ubSeguir(){setTimeout(function(){var b=document.querySelector('#vwov [data-act="vwnext"]');if(b){_ubPasa=true;b.click();_ubPasa=false}},60)}
/* ---- al tocar "Ya llegué" en el viaje ---- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vwnext"]');if(!b||!b.closest('#vwov')||_ubPasa||UB_LEGADO())return;var v=S.vw;if(!v||v.side||(vwEsAdm()&&!vwYo()))return;
 var T=vwTramo(v);if(!T)return;var r=ubDeNodo(v,T.a);if(!r)return;v.ubSkip=v.ubSkip||{};v.ubFoto=v.ubFoto||{};
 if(r.need){if(r.noUb||v.ubSkip[r.key])return;e.preventDefault();e.stopImmediatePropagation();ubAbrir(r,{sigue:true,modo:r.aprox?'act':'gps'});return}
 if(!v.ubFoto[r.key]&&ubFotoSug(r.obj)){e.preventDefault();e.stopImmediatePropagation();ubAbrir(r,{sigue:true,modo:'foto'})}},true);
/* ---- botones ---- */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='ubpide'){e.stopImmediatePropagation();var p=S.vw&&S.vw.par[+b.dataset.i];if(p){p.noUb=b.dataset.v==='0';render()}return}
 if(a==='ubcli'){e.stopImmediatePropagation();var c=cl(+b.dataset.id);if(!c)return;if(c.rapida)c.porCh=+S.chofHoy;var nm=c.rapida?String((S.d&&S.d.rn)||'').trim():c.n;ubAbrir({k:'cli',id:c.id,n:nm,key:'c'+c.id,obj:c},{modo:b.dataset.m||'gps'});return}
 if(a==='gps'&&S.role==='rep'||a==='gps'&&S.role==='admin'){var k=entregaCalc();if(k&&k.c){e.stopImmediatePropagation();var c2=k.c;if(c2.rapida)c2.porCh=+S.chofHoy;ubAbrir({k:'cli',id:c2.id,n:c2.rapida?String(S.d.rn||'').trim():c2.n,key:'c'+c2.id,obj:c2},{});return}}
 if(!S.ub)return;
 if(a==='ubgps'){e.stopImmediatePropagation();ubGps();return}
 if(a==='ubsi'){e.stopImmediatePropagation();S.ub.est='ok';render();return}
 if(a==='ubotra'){e.stopImmediatePropagation();S.ub.est='';S.ub.lat=S.ub.lng=null;render();return}
 if(a==='ubsave'){e.stopImmediatePropagation();ubGuardar();return}
 if(a==='ubskip'){e.stopImmediatePropagation();var u=S.ub,nm2=ubNom();if(u.k==='cli'){var c3=cl(u.id);if(c3)c3.ubSkip=iso(TODAY)}else if(S.vw){S.vw.ubSkip=S.vw.ubSkip||{};S.vw.ubSkip[u.key]=1}
  S.avPrecio.push(ubQuien()+' no pudo guardar la ubicación de '+nm2+' (el GPS no funcionó)');var sg=u.sigue;S.ub=null;render();if(sg)ubSeguir();return}
 if(a==='ubx'){e.stopImmediatePropagation();var sg2=S.ub.sigue&&S.ub.modo==='foto';S.ub=null;render();if(sg2)ubSeguir();return}},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||t.dataset.ubf!=='1'||!t.files||!t.files[0]||!S.ub)return;fotoLeer(t.files[0],function(u){if(!S.ub)return;S.ub.foto=u;S.ub.fotoH=Date.now();render()})},true);
var _navA26=navAtras;navAtras=function(){if(S.ub&&!document.getElementById('fotov')){var sg=S.ub.sigue&&S.ub.modo==='foto';S.ub=null;render();if(sg)ubSeguir();return true}return _navA26.apply(this,arguments)};
/* ---- reparto: la ubicación del cliente es obligatoria; luego se completan sus datos ---- */
function ubCliAplica(c){return !!c&&!(c.rapida&&!(S.d&&S.d.reg))&&!UB_LEGADO()}
function ubCliFalta(c){var f=[];if(!c.foto)f.push('foto de la fachada');if(!String(c.tel||'').trim()&&!(c.rapida&&S.d&&String(S.d.rtel||'').trim()))f.push('teléfono');return f}
/* entValida: pasó a tema-ruta.js */
/* entrega: pasó a tema-ruta.js */
if(typeof VIEWS!=='undefined'&&VIEWS.entrega)VIEWS.entrega=entrega;
/* el botón de GPS del cliente nuevo dice si ya se guardó de verdad */
/* entrega: pasó a tema-ruta.js */
if(typeof VIEWS!=='undefined'&&VIEWS.entrega)VIEWS.entrega=entrega;
/* aviso al admin: cliente nuevo dado de alta por el chofer */
var _r26=render;render=function(){try{(S.cli||[]).forEach(function(c){if(c.porCh!=null&&!c.rapida&&!c.oculto&&!c.avAlta){c.avAlta=true;S.avPrecio.push(chofN(c.porCh)+' dio de alta un cliente nuevo: '+c.n+(ubTiene(c)?' (con ubicación)':' (sin ubicación)')+(c.tel?' · tel. '+c.tel:'')+'. Revísalo en Clientes.')}})}catch(e){}return _r26.apply(this,arguments)};
/* el número del siguiente cliente nunca repite uno que ya existe (en la demo se repetía y el cliente nuevo tomaba los datos de otro) */
function cliIdFix(){try{var mx=(S.cli||[]).reduce(function(m,c){return Math.max(m,+c.id||0)},0);if(!(+S.nextCli>mx))S.nextCli=mx+1}catch(e){}}
cliIdFix();var _r26c=render;render=function(){cliIdFix();return _r26c.apply(this,arguments)};

/* "Ir con Google Maps" a un lugar sin ubicación: busca por nombre y dirección en vez de mandar a un punto inventado */
var _tr26=vwTramoHTML;vwTramoHTML=function(k){var h=_tr26.apply(this,arguments),v=S.vw;try{var T=vwTramo(v);if(!T)return h;var r=ubDeNodo(v,T.a);if(!r||!r.need)return h;
 var pv=provD((v.par[T.a.i]||{}).prov||''),q=r.k==='bas'?((r.obj&&r.obj.dir)||((r.n||'báscula')+' '+(pv.dir||''))):((r.obj&&r.obj.dir)||r.n);
 h=h.replace(/href="https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=[^"]*"/,'href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)+'"');
 return h.replace('Ir con Google Maps','Buscar en Google Maps')}catch(e){return h}};
