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
