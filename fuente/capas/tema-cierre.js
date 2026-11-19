/* ===================== TEMA · Cierre del chofer y recibir el cierre (aplanado el 18 nov) =====================
   Antes estaba repartido en 20 envolturas encadenadas en l6, l12, l13, l14, l21, l32, l40, l41, l42, l44, l45, l50, l53, l69.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-cierre.js).
   Se arma justo después de tema-fichas.js (antes de los otros temas).
   Si se cambia algo del cierre, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - cierre: la pantalla de cierre del chofer (pendientes, cancelaciones, resumen ya enviado) (4 pasos).
   - cierrePasos: el cierre paso por paso (efectivo y enviar) (2 pasos; la versión base se rehízo completa en l32).
   - cierreRes: las cuentas del cierre (tarjeta, transferencia, extras) (2 pasos).
   - cierreTop: los avisos de arriba en Inicio (cierres por recibir, reabrir, pagos pedidos) (6 pasos).
   - cierreAdm: la pantalla donde el admin recibe el cierre (4 pasos).
   - confMsg: las preguntas de "¿Estás seguro?" (caja del cierre, enviar, cancelar entrega…) (4 pasos).
   Las funciones que usan los pasos siguen en su capa.
   ============================================================================================ */

/* confMsg · de l6 */
var _cmL6=confMsg;confMsg=function(D){if(D.act==='cajacierre'){if(S.cajaCnt===''||S.cajaCnt==null)return null;var ce=cajaEsp(),cc=num(S.cajaCnt),df=cc-ce;return{t:'Cierre de caja',m:'¿Registrar que contaste '+money(cc)+'? La app esperaba '+money(ce)+(Math.abs(df)<0.5?' y cuadra.':(df<0?': faltan '+money(-df)+'.':': sobran '+money(df)+'.'))}}return _cmL6.apply(this,arguments)};

/* cierreAdm · de l12 */
var _cAdmR=cierreAdm;cierreAdm=function(){var h=_cAdmR.apply(this,arguments);if(S.recep||!S.cierre.res)return h;
 return h.replace(/ · regresan -?[\d.]+/g,'').replace(/(Cajas vacías recibidas<\/span><b[^>]*>)[^<]*/,'$1se cuentan abajo')};

/* cierre · de l13 */
var _cierreF=cierre;cierre=function(){var h=_cierreF.apply(this,arguments),c=S.cierre;if(c.sent)return h;var r=cierreRes();if(!regAlgo(r))return h;
 var ft=c.fotoReg,blk='<div style="border-top:1px solid var(--line);margin-top:8px;padding:10px 0 6px"><b>Foto de lo que regresas</b><div class="lbl">Toma una foto donde se vean las cajas llenas y las vacías que traes en el camión. Es obligatoria para enviar el cierre.</div>'
  +(ft?'<img src="'+ft+'" alt="Foto de lo que regresa" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin-top:8px">':'')
  +'<label for="regF" class="btn '+(ft?'sec ':'')+'sm" id="regFb" style="display:flex;align-items:center;justify-content:center;cursor:pointer;margin-top:8px">'+(ft?'Cambiar foto':'📷 Tomar foto')+'</label><input id="regF" type="file" accept="image/*" capture="environment" data-regf="1" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none"></div>';
 return h.replace(/(Cajas vacías recibidas<\/span><b>-?[\d.]+<\/b><\/div>)(<\/div>)/,'$1'+blk+'$2')};

/* cierreTop · de l13 */
var _cTop13=cierreTop;cierreTop=function(){var h=_cTop13.apply(this,arguments);if(regPend()&&!cierrePend()){var r=S.cierre.res;
 h+='<button class="card alert" data-act="vercierre" style="text-align:left;width:100%;color:inherit;display:flex;gap:12px;align-items:center;border-width:2px"><span class="ic" style="background:var(--danger);color:#fff">'+icon('caja',20)+'</span><span class="grow"><b style="font-size:17px">Cajas sin contar de '+esc(chofN(S.chofHoy))+'</b><br><span class="lbl">Regresó del reparto. Cuéntalas para que entren a bodega.</span></span><span style="font-size:22px">›</span></button>'}return h};

/* confMsg · de l13 */
var _confM13=confMsg;confMsg=function(D){if(D&&D.act==='enviar'&&S.role==='rep'&&S.cierre&&!S.cierre.sent&&!S.cierre.fotoReg&&regAlgo(cierreRes()))return null;return _confM13.apply(this,arguments)};

/* confMsg · de l14 */
var _confM14=confMsg;confMsg=function(D){if(D&&D.act==='cancelent')return null;return _confM14.apply(this,arguments)};

/* cierreAdm · de l14 */
var _cAdm14=cierreAdm;cierreAdm=function(){var h=_cAdm14.apply(this,arguments);if(!S.cierre.res)return h;var x=cancelsHTML(true)+gxRevHTML(true);if(!x)return h;var i=h.indexOf('<details class="card" data-k="fotoscierre"');return i>-1?h.slice(0,i)+x+h.slice(i):h+x};

/* cierre · de l14 */
var _cier14=cierre;cierre=function(){var h=_cier14.apply(this,arguments),x=cancelsHTML(false);if(!x||S.cierre.sent)return h;
 /* va en el paso "Cajas": dentro de la tarjeta de cajas */
 return h.replace(/(<div class="card" style="padding:4px 14px"><div class="row"><span>Cajas que salieron)/,x.replace('<div class="card" data-key="cancels">','<div class="card" data-key="cancels"><span class="lbl" style="display:none">sin visitar</span>')+'$1')};

/* cierreAdm · de l21 */
var _cA21=cierreAdm;cierreAdm=function(){return rutaSelHTML()+_cA21.apply(this,arguments)};

/* cierreTop · de l21 */
var _cT21=cierreTop;cierreTop=function(){var h=_cT21.apply(this,arguments);if(S.role!=='admin')return h;
 Object.keys(S.chSt||{}).forEach(function(id){if(+id===+S.chofHoy)return;var o=S.chSt[id];if(!(o&&o.cierre&&o.cierre.sent&&!o.cierreReg))return;var r=o.cierre.res||{};
  h+='<button class="card alert" data-act="verruta" data-id="'+id+'" data-ir="cierreadm" style="text-align:left;width:100%;color:inherit;display:flex;gap:12px;align-items:center;border-width:2px"><span class="ic" style="background:var(--danger);color:#fff">'+icon('cierre',20)+'</span><span class="grow"><b style="font-size:17px">'+esc(chofN(+id))+' mandó su cierre</b><br><span class="lbl">Debe entregar '+money(r.efectivo||0)+'. Recíbelo.</span></span><span style="font-size:22px">›</span></button>'});return h};

/* cierreTop · de l32 */
var _cT32=cierreTop;cierreTop=function(){var h=_cT32.apply(this,arguments);if(S.role!=='admin')return h;
 nbRutaIds().forEach(function(id){var r=reabDe(id);if(!r||r.est!=='pend')return;h='<div class="card alert" data-key="reab'+id+'"><b style="font-size:17px">'+esc(chofN(id))+' quiere seguir trabajando</b><div class="lbl">Ya mandó su cierre y pide '+(r.k==='carga'?'cargar más fruta':'dar otra vuelta')+' ('+esc(r.h||'')+'). Si lo autorizas, se reabre su ruta y registra lo que carga.</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:2" data-act="reabsi" data-id="'+id+'">Autorizar</button><button class="btn sec" style="flex:1" data-act="reabno" data-id="'+id+'">No</button></div></div>'+h});return h};

/* cierrePasos · de l40 */
var _cP40=cierrePasos;cierrePasos=function(){var r=_cP40.apply(this,arguments);try{if(S.role!=='rep'||!S.cierre||S.cierre.sent||(S.cierreP||0)!==4)return r;var m=document.querySelector('main');if(!m||m.querySelector('[data-key="efpaso"]'))return r;
 if(!tombolaHay())S.cierre.dest='adm';var d=document.createElement('div');d.innerHTML=efPasoHTML();var nav=m.querySelector('.wz-nav');(nav?nav.before(d.firstChild):m.appendChild(d.firstChild))}catch(e){console.error(e)}return r};

/* cierrePasos · de l40 */
var _cP40b=cierrePasos;cierrePasos=function(){var r=_cP40b.apply(this,arguments);try{if(S.role!=='rep'||!S.cierre||S.cierre.sent||(S.cierreP||0)!==5)return r;var g=document.querySelector('main .card.good');if(!g||g.querySelector('[data-k="efr"]'))return r;var c=S.cierre,deb=num(cierreRes().efectivo),ent=efEntrega(c),dif=r2(ent-deb);
 var x=document.createElement('div');x.setAttribute('data-k','efr');x.innerHTML=rw('Entregas',money(ent))+(Math.abs(dif)>=0.5?rw(dif<0?'Faltan':'Sobran',money(Math.abs(dif)),'neg'):'')+rw('Dinero',c.dest==='tom'?'a la tómbola':'al administrador')+(c.bolsa?rw('Bolsa',esc(c.bolsa)):'');g.querySelector('b').after(x)}catch(e){}return r};

/* cierreRes · de l41 */
var _cR41=cierreRes;cierreRes=function(){var r=_cR41.apply(this,arguments);if(!r)return r;var tj=r2(sum(S.log||[],function(l){return num(l.tarj)})),tr=r2(sum(S.log||[],function(l){return num(l.trans)}));r.tarj=tj;r.trans=tr;if(!r._noEfe){r.efectivo=r2(num(r.efectivo)-tj-tr);r._noEfe=true}return r};

/* cierreTop · de l42 */
var _cT42=cierreTop;cierreTop=function(){return pagoPideHTML()+_cT42.apply(this,arguments)};

/* cierreTop · de l44 */
var _cT44=cierreTop;cierreTop=function(){var h=_cT44.apply(this,arguments);if(S.role!=='admin')return h;var hay=nbRutaIds().some(function(id){var c=nbRGet(id,'cierre');return c&&c.sent&&c.corte});return hay?h+cierreAdmScanHTML():h};

/* cierre · de l45 */
var _cie45=cierre;cierre=function(){if(S.role!=='rep'||!S.cierre||!S.cierre.sent)return _cie45.apply(this,arguments);var c=S.cierre,d=c.corte||{},r=c.res||{},ff=(S.salida&&S.salida.fotosFin)||{};
 return '<h1>Cierre del día</h1>'
  +'<div class="card good"><b style="font-size:18px">✓ Cierre enviado'+(S.ciEnvH?' a las '+esc(S.ciEnvH):'')+'</b><div class="lbl">Ya no se puede cambiar. Si algo está mal, avísale al administrador.</div></div>'
  +'<div class="card"><b>Efectivo</b>'+rw('Debías entregar',money(d.deb!=null?d.deb:num(r.efectivo)))+rw('Entregas',money(d.ent!=null?d.ent:num(r.efectivo)))+(d.dif&&Math.abs(d.dif)>=0.5?rw(d.dif<0?'Faltan':'Sobran',money(Math.abs(d.dif)),'neg')+rw('Motivo',esc(d.mot||'')):'')+(d.bolsa?rw('Bolsa',esc(d.bolsa)):'')+(d.dest?rw('Dinero',d.dest==='tómbola'?'a la tómbola':'al administrador'):'')+(d.v?rw('Código del corte',esc(d.v)):'')+'</div>'
  +'<div class="card"><b>Vehículo</b>'+(c.odo?rw('Odómetro final',num(c.odo).toLocaleString('es-MX')+' km'):'')+'<div class="cifoto">'+FOTOS.map(function(f){return fotoMini(ff[f[0]],f[1])}).join('')+(ff.odo?fotoMini(ff.odo,'Odómetro'):'')+'</div></div>'};

/* cierreAdm · de l50 */
var _cAdm50=cierreAdm;cierreAdm=function(){var h=_cAdm50.apply(this,arguments);if(!S.cierre||!S.cierre.res||!S.cierre.sent||(S.cierreReg&&S.recep))return h;
 return '<button class="btn big" data-act="rcabre" style="margin:4px 0 10px">📥 Recibir el cierre de '+esc(chofN(S.chofHoy))+'</button>'+h};

/* confMsg · de l53 */
var _confMsg53=confMsg;confMsg=function(D){var r=_confMsg53.apply(this,arguments);if(r||!CONF53[D.act])return r;return {t:'¿Estás seguro?',m:(_cfTxt53?'«'+_cfTxt53+'». ':'')+CONF53[D.act]}};

/* cierreRes · de l69 */
var _cR69=cierreRes;cierreRes=function(){var r=_cR69.apply(this,arguments);return r?cierreExtra68(r):r};

/* ---------- 131 · Recibir el cierre → Vehículo: las fotos de la SALIDA y del REGRESO por separado, con el odómetro y el tanque ----------
   Antes: solo los 4 lados en parejas chiquitas, sin decir cuál era de la salida y cuál del regreso, y sin la foto del odómetro.
   Ahora: "🚚 Al salir" y "🏁 Al regresar", cada uno con su kilometraje, el nivel del tanque y sus fotos (4 lados + odómetro, y la
   de la gasolina si hay). Cada foto se toca para verla en grande (las de la nube se bajan solas). Reemplaza la compFotos de la base
   (y el cambio de texto que le hacía l82). */
var FOTOS131=[['frente','Frente'],['atras','Atrás'],['izq','Lado izquierdo'],['der','Lado derecho'],['odo','Odómetro'],['gas','Gasolina']];
function fotosVeh131(s){var F=fotosRuta121({salida:s||{}});return {ini:F.ini,fin:F.fin}}
compFotos=function(){var s=S.salida||{},c=S.cierre||{},F=fotosVeh131(s),hay=Object.keys(F.ini).length+Object.keys(F.fin).length;
 if(!hay)return '<div class="lbl" style="margin-top:6px">Este día no se tomaron las fotos del vehículo.</div>';
 var tile=function(ref,l){var src=ref?fotoSrc121(ref):'';return ref?'<button data-act="foto121" data-ref="'+esc(ref)+'" data-l="'+esc(l)+'" style="padding:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--bg);display:flex;flex-direction:column;align-items:stretch;min-height:44px">'+(src?'<img src="'+src+'" alt="'+esc(l)+'" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block">':'<span class="lbl" style="aspect-ratio:4/3;display:flex;align-items:center;justify-content:center">cargando…</span>')+'<span style="font-size:12px;padding:3px 6px;text-align:left">'+esc(l)+'</span></button>'
   :'<div style="border:1px dashed var(--line);border-radius:10px;display:flex;flex-direction:column"><span class="lbl" style="aspect-ratio:4/3;display:flex;align-items:center;justify-content:center">Sin foto</span><span style="font-size:12px;padding:3px 6px">'+esc(l)+'</span></div>'};
 var km=function(v){return num(v)>0?num(v).toLocaleString('es-MX')+' km':''};
 var bloque=function(tit,G,odo,tan){var L=FOTOS131.filter(function(x){return x[0]!=='gas'||G.gas});
  return '<div style="margin-top:10px"><b>'+tit+'</b><div class="lbl">'+[odo?'odómetro '+odo:'',tan?'tanque '+esc(tan):''].filter(Boolean).join(' · ')+'</div>'
   +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px">'+L.map(function(x){return tile(G[x[0]],x[1])}).join('')+'</div></div>'};
 var rec=num(c.odo)>num(c.odoIni)&&num(c.odoIni)>0?'<div class="lbl" style="margin-top:8px">Recorrió '+(num(c.odo)-num(c.odoIni)).toLocaleString('es-MX')+' km. Compara las fotos de la salida con las del regreso para ver si hubo golpes o daños. Toca una foto para verla en grande.</div>':'<div class="lbl" style="margin-top:8px">Toca una foto para verla en grande.</div>';
 return bloque('🚚 Al salir',F.ini,km(c.odoIni),c.tankIni)+bloque('🏁 Al regresar',F.fin,km(c.odo),c.tank||'')+rec};

/* ---------- 135 · Recibir el cierre: a qué cliente le dio precio especial (el mayoreo ya sale en "Precios de mayoreo del día") ---------- */
function espHTML135(){var L=[];(S.log||[]).forEach(function(l){preciosLog135(l).forEach(function(x){if(x.t==='esp'){var c0=cl(l.c);L.push({n:c0?c0.n:'Cliente',x:x})}})});if(!L.length)return '';
 var tot=r2(L.reduce(function(a,y){return a+y.x.dif},0));
 return '<div class="card" data-key="esp135"><b>⭐ Precio especial</b><div class="lbl">Clientes a los que se les dio su precio especial en esta ruta.</div>'
  +L.map(function(y){return '<div class="row" style="align-items:flex-start"><span>'+esc(y.n)+'<br><span class="lbl">'+precioTxt135(y.x)+'</span></span><b class="'+(y.x.dif<0?'neg':'')+'" style="white-space:nowrap">'+(y.x.dif?(y.x.dif<0?'−':'+')+money(Math.abs(y.x.dif)):'')+'</b></div>'}).join('')
  +(L.length>1&&tot?'<div class="row"><b>Total</b><b class="'+(tot<0?'neg':'')+'">'+(tot<0?'−':'+')+money(Math.abs(tot))+'</b></div>':'')+'</div>'}
var _cAdm135=cierreAdm;cierreAdm=function(){var h=_cAdm135.apply(this,arguments);try{if(!S.cierre||!S.cierre.res)return h;var x=espHTML135();if(!x)return h;var i=h.indexOf('<details class="card" data-key="fotoscierre"');if(i<0)i=h.indexOf('<details class="card" data-k="fotoscierre"');return i>-1?h.slice(0,i)+x+h.slice(i):h+x}catch(e){return h}};


/* ---------- 139 · Ricardo: "al finalizar el cierre las fotos de los 4 lados ya venían precargadas con las que ya había mandado antes; me dejó avanzar"
   (la ruta se había reabierto con la versión anterior, que no las vaciaba). A prueba de cualquier camino: al abrir el cierre, una foto del
   regreso que ya se usó en un cierre anterior de hoy (o que es la de la salida) se quita y hay que tomar una nueva. ---------- */
function fotosUsadas139(){var U={},f=typeof hoy120==='function'?hoy120():iso(TODAY),pon=function(v){if(!v||typeof v!=='string')return;U[v]=1;try{var r=fotoRef121(v);if(r)U[r]=1}catch(e){}};
 var s=S.salida||{};Object.keys(s.fotos||{}).forEach(function(k){pon(s.fotos[k])});
 (S.rutasHist||[]).forEach(function(r){if(!r||r.f!==f||+r.ch!==+S.chofHoy||!r.fotos121)return;['ini','fin'].forEach(function(g){var G=r.fotos121[g]||{};Object.keys(G).forEach(function(k){pon(G[k])})})});return U}
function fotosViejas139(){if(S.role!=='rep'||!S.cierre||S.cierre.sent||!S.salida||!S.salida.fotosFin)return 0;var F=S.salida.fotosFin,U=fotosUsadas139(),n=0;
 Object.keys(F).forEach(function(k){var v=F[k];if(!v||v==='data:x')return;var r=null;try{r=fotoRef121(v)}catch(e){}if(U[v]||(r&&U[r])){F[k]=null;n++}});
 if(n)S.fv139=n;return n}
var _cie139=cierre;cierre=function(){try{var n139=fotosViejas139();if(!n139&&S.fv139&&(!S.cierre||S.cierre.sent||FOTOS.every(function(x){return S.salida.fotosFin&&S.salida.fotosFin[x[0]]})))S.fv139=0}catch(e){}var h=_cie139.apply(this,arguments);try{if(S.fv139&&S.role==='rep'&&S.cierre&&!S.cierre.sent){h=h.replace(/<\/h1>/,'</h1><div class="card note" data-k="fv139"><b>📷 Toma fotos nuevas del vehículo</b><div class="lbl">Las que había eran de un cierre anterior. Para cada cierre se toman fotos nuevas al regresar.</div></div>')}}catch(e){}return h};
