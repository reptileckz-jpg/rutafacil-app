/* ===================== TEMA · Vehículos (aplanado el 17 nov) =====================
   Antes estaba repartido en envolturas encadenadas en l1, l8, l9, l22, l24, l30, l32, l33, l43, l47, l55, l59, l69, l74,
   l78, l79, l80 y l90. Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo. Se arma AL FINAL, en build.sh.
   Si se cambia algo de vehículos, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - vehHoy, vehLibres: el vehículo del chofer y los que puede escoger (no los que ya trae otro).
   - vehiculos, vehBasic, fiVeh, vForm, plateSVG: la sección, la tarjeta, la ficha, el formulario y la placa dibujada.
   - fuelVeh, vehGastos, tagCruce: combustible y rendimiento, gastos del vehículo, cruces del TAG.
   - inspHTML, inspRepHTML, inspMarca: la revisión del vehículo.
   - encVehHTML: el encargo para el chofer. velAlertaHTML, velBeep: alerta de velocidad.
   - fotoTile, fotoAbrir, fotoZoomable: fotos del vehículo y el visor de fotos.
   Las funciones que usan los pasos (vehUso90, vYaHTML, inspLista, impBig68, lugaresL…) siguen en su capa.
   ============================================================================================ */

/* ---------- el vehículo del chofer y los que puede escoger ---------- */
var _vehHoyBase=vehHoy;
/* l8 · si no tiene vehículo (app recién instalada) se usa uno en blanco, para que nada se rompa */
vehHoy=function(){var v=_vehHoyBase.apply(this,arguments);if(v)return v;if(!window._noVeh){var t=VBLANK();t.id=0;t.n='Sin vehículo';t.pl='';t.comb='Gasolina Magna';t.odo=0;t.capL=60;t.rend0=10;t.precio=0;t.acInt=10000;t.acLast=0;t.hist=[];t.serv=[];t.taller=[];t.equipo=[];t.bit=[];t.anual={};t.foto=VEH_IMGS[0][1]();window._noVeh=t}return window._noVeh};
var _vehLibresBase=vehLibres;
/* l90 · 89 · el que ya salió con otro (y no ha cerrado) no se puede escoger */
vehLibres=function(ch){return _vehLibresBase.apply(this,arguments).filter(function(v){return vehUso90(v.id,ch)==null})};

/* ---------- la sección y la tarjeta de cada vehículo ---------- */
var _vehiculosBase=vehiculos;
/* l47 · al editar: "¿Qué tipo de vehículo es?" (de carga o auto) arriba */
vehiculos=function(){var h=_vehiculosBase.apply(this,arguments);if(S.role!=='admin'||!S.vf||S.vfId==null)return h;var v=vehById(S.vfId);if(!v)return h;if(S.vf.esAuto==null)S.vf.esAuto=!!v.esAuto;
 var c='<div class="card"><b>¿Qué tipo de vehículo es?</b><div class="chips" role="group" aria-label="Tipo de vehículo" style="margin-top:6px"><button data-act="vftipo" data-v="carga" aria-pressed="'+!S.vf.esAuto+'">🚚 De carga</button><button data-act="vftipo" data-v="auto" aria-pressed="'+!!S.vf.esAuto+'">🚗 Auto (no carga)</button></div></div>';
 var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+c+h.slice(i+5):c+h};
var _vehBasicBase=vehBasic;
vehBasic=function(v,warn){var h=_vehBasicBase.apply(this,arguments);
 /* l1 · la placa dibujada en lugar del texto */
 h=h.replace('<span class="lbl">'+esc(v.pl)+(v.color?' · '+esc(v.color):'')+'</span><br>',plateSVG(v,true)+'<span class="lbl">'+(v.color?esc(v.color):'')+'</span><br>');
 /* l9 · con foto, la tarjeta y la foto más grandes */
 if(v&&v.foto)h=h.replace('<button class="vcard popin"','<button class="vcard popin vbg"').replace('width:104px;height:60px','width:124px;height:84px');
 return h};

/* ---------- l43 · la ficha: la placa solo se ve; "Ya se hizo" en cada papel; lo que ya se hizo ---------- */
var _fiVehBase=fiVeh;
fiVeh=function(f){var h=_fiVehBase.apply(this,arguments),v=vehById(f.id);if(!v)return h;try{
 /* placa: solo se ve; se cambia en Editar datos */
 h=h.replace(/<div class="lbl" style="margin-top:6px">Estado<\/div><div class="chips" role="group" style="margin:6px 0">[\s\S]*?<\/div><div class="lbl">Tipo<\/div><div class="chips" role="group" style="margin:6px 0">[\s\S]*?<\/div><div class="lbl">El número se cambia en "Editar datos" y la placa se dibuja sola\.<\/div>/,rw('Estado',esc(plEdo(v)))+rw('Tipo',(v.plTipo||(v.id===2?'carga':'auto'))==='carga'?'Carga':'Automóvil')+'<div class="lbl">Para cambiar la placa usa "Editar datos".</div>');
 if(S.role==='admin'&&!S.encOn)VDOC.forEach(function(d){var row=vDocRow(d[1]==='Tarjeta de circulación / tenencia'?'Tarjeta de circulación':d[1],v[d[0]]);if(h.indexOf(row)>-1)h=h.replace(row,row+'<button class="btn sm sec" style="width:auto;margin:2px 0 6px" data-act="vya" data-id="'+v.id+'" data-k="'+d[0]+'">Ya se hizo</button>')});
 var y=vYaHTML(v);if(y){var i=h.indexOf('<div class="card"><b>Documentos con vencimiento</b>');if(i>-1)h=h.slice(0,i)+y+h.slice(i)}}catch(e){}return h};

/* ---------- el formulario del vehículo ---------- */
var _vFormBase=vForm;
vForm=function(){var h=_vFormBase.apply(this,arguments),f=S.vf;
 /* l22 · marca, modelo, motor, medida de llanta y capacidad */
 ['marca','modelo','motor','llanta','capK'].forEach(function(k){if(f[k]==null)f[k]=''});
 h=h.replace(vff('n','Nombre o modelo'),vff('n','Nombre (como le dicen)','text','ej. La blanca')+vff('marca','Marca','text','ej. Nissan')+vff('modelo','Modelo','text','ej. NP300'));
 h=h.replace(vff('color','Color'),vff('color','Color')+vff('motor','Motor','text','ej. 2.5 L diésel')+vff('llanta','Medida de llanta','text','ej. 195/R15')+(h.indexOf('vf_capC')<0?vff('capC','Capacidad de carga (cajas)','number'):'')+vff('capK','Capacidad de carga (kg)','number'));
 /* l30 · el nombre se arma solo con marca, modelo y año */
 f=S.vf||{};
 h=h.replace(vff('n','Nombre (como le dicen)','text','ej. La blanca')+vff('marca','Marca','text','ej. Nissan')+vff('modelo','Modelo','text','ej. NP300'),vff('marca','Marca','text','ej. Nissan')+vff('modelo','Modelo','text','ej. NP300')+'<div class="lbl" style="margin:-2px 0 6px">Se va a llamar: <b>'+esc(vehNomDe(f)||'Marca Modelo Año')+'</b> (con el año que pongas abajo)</div>');
 /* 105 · "Quitar" en la foto del vehículo (también el dibujo que trae la app) y en las de sus papeles */
 h=h.replace(/(<input id="(?:vffoto|vi_(\w+))" type="file" accept="image\/\*" data-vimg="(\w+)"[^>]*>)/g,function(all,inp,k1,k){return S.vf&&S.vf[k]?inp+quitaFotoBtn105(k):inp});
 return h};
function quitaFotoBtn105(k){return '<button class="btn sm sec" data-act="vfquita" data-k="'+k+'" style="width:auto;margin:6px 0 0;color:var(--danger);border-color:var(--danger)">🗑 Quitar foto</button>'}
var FOTO105={foto:'la foto del vehículo',fotoPol:'la foto de la póliza',fotoTc:'la foto de la tarjeta de circulación',fotoVer:'la foto de la verificación'};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vfquita"],[data-act="vfquitaok"]');if(!b||!S.vf)return;e.preventDefault();e.stopImmediatePropagation();var k=b.dataset.k;
 if(b.dataset.act==='vfquita'){abrirModal('¿Quitar la foto?','Se quita '+(FOTO105[k]||'la foto')+'. Puedes poner otra cuando quieras.',[['Sí, quitarla','vfquitaok',' data-k="'+k+'"']]);return}
 S.vf[k]=null;if(k==='foto')S.vf.sinFoto105=1;S.modal=null;render();toast('Foto quitada. Toca "Guardar" para que quede así.')},true);
/* al guardar: si se quitó la foto del vehículo, se queda sin foto (antes se le ponía un dibujo solo) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="vsave"]');if(!b||!S.vf||!S.vf.sinFoto105)return;var id=S.vfId,n0=S.veh.length;
 setTimeout(function(){try{var v=id!=null?vehById(id):(S.veh.length>n0?S.veh[S.veh.length-1]:null);if(v&&!S.vf){v.foto=null;render()}}catch(er){}},0)},true);

/* ---------- l80 · la placa dice el estado de verdad (solo hay diseño de Veracruz y Guerrero) ---------- */
var _plateSVGBase=plateSVG;
plateSVG=function(v,mini){var h=_plateSVGBase.apply(this,arguments);var e=String(plEdo(v)||'');if(e&&e!=='Veracruz'&&e!=='Guerrero'){var E=esc(e.toUpperCase());h=h.replace('>VERACRUZ</text>','>'+E+'</text>').replace(/<text[^>]*>POR AMOR A<\/text><text[^>]*>VERACRUZ<\/text>/,'')}return h};

/* ---------- combustible, gastos y TAG ---------- */
var _fuelVehBase=fuelVeh;
/* l43 · "Combustible y rendimiento" en su propia tarjeta */
fuelVeh=function(v){return '<div class="card">'+_fuelVehBase.apply(this,arguments).replace('<div class="lbl" style="margin:12px 0 2px"><b>Combustible</b></div>','<b>Combustible y rendimiento</b>')+'</div>'};
var _vehGastosBase=vehGastos;
/* l69 · también los imprevistos del camino (viajes de carga y rutas) */
vehGastos=function(vh,dias){var L=_vehGastosBase.apply(this,arguments);try{var lim=iso(new Date(TODAY.getTime()-(dias||365)*864e5));
  S.cargas.forEach(function(c){if(+c.veh!==+vh.id||String(c.fecha)<lim)return;impBig68(c).forEach(function(x){L.push({f:c.fecha,t:x.c,cat:'Imprevisto del camino',m:num(x.m)})})});
  (S.rutasHist||[]).forEach(function(r){var g=r.res&&r.res.g68;if(!g||r.f<lim||+r.res.veh68!==+vh.id)return;(g.big||[]).forEach(function(x){L.push({f:r.f,t:x.tipo,cat:'Imprevisto del camino',m:num(x.m)})})})}catch(e){}return L};
var _tagCruceBase=tagCruce;
/* l78 · cada cruce del TAG entra como gasto (si no es de un viaje de carga) */
tagCruce=function(v,o){var m=_tagCruceBase.apply(this,arguments);try{if(m&&!m.cid){S.gastos=S.gastos||[];S.gastos.push({t:'Casetas (TAG)',m:num(m.m),n:'TAG de '+v.n+' · '+m.cas+' ('+fmtF(m.f)+(m.h?' '+m.h:'')+')',caja:false,tag76:1,veh:v.id,f:m.f});m.gasto=1}}catch(e){}return m};

/* ---------- la revisión del vehículo ---------- */
var _inspHTMLBase=inspHTML;
/* l74 · si son más puntos que la revisión diaria: un botón que los va pasando uno por uno */
inspHTML=function(o,w,titulo){var L=inspLista(o.tipo),c=inspCfgN();if(L.length<=c.dia.length)return _inspHTMLBase.apply(this,arguments);
 var hechos=L.filter(function(x,i){return o.r[i]}).length,mal=L.filter(function(x,i){return o.r[i]==='mal'}).length,P=inspPartes(o.tipo);
 var sub=['revisión diaria'].concat(P.indexOf('sem')>-1?['la de la semana']:[]).concat(P.indexOf('carga')>-1?['lo del viaje de carga']:[]).concat(P.indexOf('mes')>-1?['documentos del mes']:[]);
 return '<div style="font-size:21px;font-weight:800;margin:6px 0 2px">'+titulo+'</div><div class="lbl" style="margin-bottom:8px">Hoy toca: '+sub.join(', ')+'. Son '+L.length+' puntos: te los voy pasando uno por uno.</div>'
  +'<button class="btn" style="min-height:66px;font-size:20px" data-act="ip74go" data-w="'+w+'">'+(hechos?'Seguir la revisión ('+hechos+' de '+L.length+')':'Empezar la revisión')+'</button>'
  +'<div class="ip74" style="margin-top:8px"><div class="bar"><i style="width:'+Math.round(hechos/L.length*100)+'%"></i></div></div><div class="lbl" style="text-align:center;margin-top:4px">'+hechos+' de '+L.length+' revisados'+(mal?' · <b class="neg">'+mal+' con falla</b>':'')+'</div>'};
var _inspRepHTMLBase=inspRepHTML;
/* l33 · ya hecha: un renglón "Revisión del vehículo lista" que se abre */
inspRepHTML=function(){var r=S.inspR,h=_inspRepHTMLBase.apply(this,arguments);if(!h||!r||!r.ok||r.preg||r.wait||S.inspVer)return h;
 return '<button class="card good" data-act="inspver" style="width:100%;text-align:left;display:flex;align-items:center;gap:10px;border:0;cursor:pointer"><span style="font-size:22px">✓</span><span class="grow"><b>Revisión del vehículo lista</b><br><span class="lbl">'+(inspFallas(r).length?'Con '+inspFallas(r).length+' cosa(s) reportada(s)':'Todo está bien')+'</span></span><span class="lbl">Ver</span></button>'};
var _inspMarcaBase=inspMarca;
/* l79 · cada revisión queda en el historial del vehículo (una por persona al día) */
inspMarca=function(vh,quien,o){var r=_inspMarcaBase.apply(this,arguments);try{if(!vh||!o)return r;var L=inspLista(o.tipo),mal=inspFallas(o),uno=L.filter(function(x,i){return o.r[i]}).length;
  S.inspHist=S.inspHist||[];var hoy=iso(TODAY);if(S.inspHist.some(function(x){return x.vid===vh.id&&x.f===hoy&&x.q===quien}))return r;
  S.inspHist.push({id:Date.now(),vid:vh.id,f:hoy,h:hhmm(),q:quien,tipo:o.tipo||'dia',n:L.length,mal:mal,todo:!!o.todo79,dur:o.t079?Math.round((Date.now()-o.t079)/1000):null});if(S.inspHist.length>400)S.inspHist=S.inspHist.slice(-400)}catch(e){}return r};

/* ---------- el encargo para el chofer ---------- */
var _encVehHTMLBase=encVehHTML;
encVehHTML=function(v){var h=_encVehHTMLBase.apply(this,arguments),f=S.encF;
 /* l43 · ¿a dónde? (lugares guardados o link de Maps) */
 if(f&&f.vid===v.id){var L=lugaresL();
  var c='<div class="lbl" style="margin-top:6px">¿A dónde? (opcional)</div><div class="chips" role="group" aria-label="Lugar" style="margin:6px 0">'+L.map(function(l,i){return '<button data-act="enclug" data-i="'+i+'" aria-pressed="'+(f.lug===i)+'">'+esc(l.n)+'</button>'}).join('')+'<button data-act="enclug" data-i="-1" aria-pressed="'+(f.lug==null||f.lug<0)+'">Que él escoja</button></div>'
   +'<div class="field"><label for="encml">O pega el link de Maps</label><input id="encml" type="text" data-bind="encF.link" value="'+esc(f.link||'')+'" placeholder="https://maps…" style="width:180px;text-align:left"></div>';
  h=h.replace('<div class="field"><label for="encn">Nota</label>',c+'<div class="field"><label for="encn">Nota</label>')}
 /* l55 · en tarjeta de pantalla completa */
 return h.replace('<div class="card" style="padding:10px 12px;margin:6px 0;border:2px solid var(--accent)"><b>Encargo para el chofer</b>','<div class="card fsform" role="dialog" aria-label="Encargo"><b>Encargo para el chofer</b>')};

/* ---------- alerta de velocidad ---------- */
var _velAlertaHTMLBase=velAlertaHTML;
/* l22 · la velocidad de ahorita; se quita sola al bajar (el botón solo si no hay GPS) */
velAlertaHTML=function(){var a=S.velAl;if(!a)return '';var h=_velAlertaHTMLBase.apply(this,arguments),cur=a.cur==null?a.vel:a.cur;
 h=h.replace(/<div style="font-size:56px;font-weight:900;line-height:1\.1;margin:10px 0">[^<]*<\/div>/,'<div style="font-size:56px;font-weight:900;line-height:1.1;margin:10px 0">'+cur+' km/h</div>');
 var sinGps=!DEMO&&a.cur==null&&_velSin>20;
 return h.replace('<button class="btn" style="margin-top:20px;background:#fff;color:#B3261E;min-height:60px;font-size:20px" data-act="velok">Ya bajé la velocidad</button>','<div style="font-size:16px;margin-top:16px;font-weight:700">Se quita solo cuando bajes de '+a.lim+' km/h.</div>'+(sinGps?'<button class="btn sm" style="margin-top:12px;background:#fff;color:#B3261E;width:auto" data-act="velok">Entendido</button>':''))};
var _velBeepBase=velBeep;
/* l22 · además vibra */
velBeep=function(){_velBeepBase.apply(this,arguments);vibrar([300,150,300,150,300])};

/* ---------- fotos ---------- */
var _fotoTileBase=fotoTile;
/* l32 · si la foto es obligatoria y no se pudo: "No pude tomarla" */
fotoTile=function(k,l,g){var h=_fotoTileBase.apply(this,arguments);if(S.role!=='rep'||!FOTOS_OBLIGATORIAS||k==='gas'&&!gasOblig139())return h;/* 134/139: la de la gasolina es opcional si así está en Ajustes */var gg=g||'fotos',f=S.salida[gg]&&S.salida[gg][k];if(f)return h;return h.replace(/<\/div>$/,'<button class="fotono" data-act="fotono" data-g="'+gg+'" data-k="'+k+'" data-l="'+esc(l)+'">No pude tomarla</button></div>')};
var _fotoAbrirBase=fotoAbrir;
fotoAbrir=function(src){
 /* l24 · "Tomar otra para reemplazarla" (se mira qué foto se tocó ANTES de abrirla) */
 var img=_fvImg,r=_fotoAbrirBase.apply(this,arguments);try{var inp=img&&(img.currentSrc||img.src)===src?fvInput(img):null,o=document.getElementById('fotov');
 if(inp&&o){var b=document.createElement('button');b.className='fvx fvotra';b.textContent='📷 Tomar otra para reemplazarla';b.addEventListener('click',function(e){e.stopPropagation();inp.click();o.remove()});o.appendChild(b)}}catch(e){}
 /* l90 · 85 · la foto en grande, encima de todo */
 try{var o2=document.getElementById('fotov');if(o2)o2.style.zIndex='130'}catch(e){}
 return r};
var _fotoZoomableBase=fotoZoomable;
/* l59 · también se pueden abrir en grande las demás fotos de evidencia */
fotoZoomable=function(im){if(_fotoZoomableBase.apply(this,arguments))return true;try{
 if(!im||im.tagName!=='IMG'||im.closest('#fotov,#fgov,#tutov,#pinov,#pncubre,nav,header,label,[data-act],a,.tklogo,.logo,#bienv,#arr,.bv-stage,.gmhole'))return false;
 if(im.classList.contains('tic'))return false;var s=im.getAttribute('src')||'';if(!/^(data:image\/(jpe?g|webp)|blob:|https?:)/i.test(s))return false;
 var r=im.getBoundingClientRect();return r.width>=36&&r.height>=36}catch(e){return false}};

/* 134 · foto opcional del tablero de gasolina (Ricardo, 19 nov: "sí, opcional"). Va en el paso "Gasolina" al salir y al cerrar.
   Se guarda como S.salida.fotos.gas / S.salida.fotosFin.gas y sale en Recibir el cierre, el Cuadre y "Fotos del vehículo". */
function gasTile134(g){return '<div style="max-width:180px;margin-top:8px">'+fotoTile('gas',gasOblig139()?'Tablero de gasolina':'Tablero de gasolina (opcional)',g)+'</div>'}
/* 139 · Ricardo: "la foto del tanque debe ser obligatoria, con la opción de quitarlo desde Ajustes" (para el control del combustible) */
function gasOblig139(){return !!(typeof FOTOS_OBLIGATORIAS!=='undefined'&&FOTOS_OBLIGATORIAS)&&(S.cfg||{}).fotoGas!=='opc'}

