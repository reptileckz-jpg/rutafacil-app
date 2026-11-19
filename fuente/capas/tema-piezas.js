/* ===================== TEMA · Piezas de pantalla (tarjetas, formularios, precio, cierre, impresora, recepción, ventanas) (aplanado el 19 nov) =====================
   Antes estaba repartido en 40 envolturas encadenadas en l3, l5, l9, l13, l14, l15, l18, l22, l35, l39, l41, l42, l43, l45, l46, l50, l52, l55, l60, l69, l73, l82, l85, l86.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-sueltas.js (antes de tema-ruta.js y de los temas que también envuelven efPasoHTML y metaCard).
   Una envoltura o dos por pieza: tarjetas de Inicio (metaCard, sigCard, cntCard, gchCard, cambioCard, recepCard), formularios
   (corrForm, incForm, vYaHTML, cliTools, nuevoCli), el precio de la entrega (precioCard, bigPrecio, mayAutoOk), el cierre (efPasoHTML,
   efeDesgloseHTML, recL, recFaltaTxt, chipsTank, cvDef, cvPasoHTML, trCost), la impresora (imprOk, tkImprimir), ventanas (abrirModal,
   pxHTML, sheet84, gSheetHTML, permHTML, encRutaHTML), lo que falta (dfBurbuja, dfIr, faltaAplica), tiempos y km (tiempoAprox, kmAprox),
   avisos del celular (natNotif), escáner (qrScan), fotos del chofer (chImg), notas (npF), "ya pasó" (sw2Hecho).
   ============================================================================================ */

/* chipsTank · de l3 */
var _ctL=chipsTank;chipsTank=function(a,v,d){var h=_ctL.apply(this,arguments),i=h.indexOf('<div class="chips" role="group" aria-label="Nivel del tanque">');if(i<0)return h;return h.slice(0,i)+'<details style="margin-top:6px"><summary class="lbl">Escoger el nivel con botones</summary>'+h.slice(i)+'</details>'};

/* sw2Hecho · de l5 */
var _swHK=sw2Hecho;sw2Hecho=function(t,k){if(t==='g'){var x=S.gastos[+k];if(x){anularPide('g',+k,'el gasto '+x.t+' de '+money(x.m));render()}return}if(t==='ch'){var y=S.gch[+k];if(y){anularPide('ch',+k,'el gasto '+y.tipo+' de '+money(y.m));render()}return}return _swHK.apply(this,arguments)};

/* faltaAplica · de l9 */
var _faL9=faltaAplica;faltaAplica=function(nuevo){if(nuevo)Array.prototype.forEach.call(document.querySelectorAll('.falta'),function(x){x.classList.remove('falta');x.style.animation='';void x.offsetWidth});return _faL9.apply(this,arguments)};

/* recepCard · de l13 */
var _recC13=recepCard;recepCard=function(r){var h=_recC13.apply(this,arguments),ft=S.cierre.fotoReg;if(!ft)return h;
 var img='<details style="margin-top:8px"><summary class="lbl" style="cursor:pointer">Ver la foto que tomó '+esc(chofN(S.chofHoy))+'</summary><img src="'+ft+'" alt="Foto de lo que regresó" style="width:100%;border-radius:12px;margin-top:6px" data-act="fotover"></details>';
 return h.replace(/<\/div>$/,img+'</div>')};

/* mayAutoOk · de l13 */
var _mayAuto13=mayAutoOk;mayAutoOk=function(c,d){if(c&&c.mayNo){if(d)d.mayQ='norm';return false}return _mayAuto13.apply(this,arguments)};

/* precioCard · de l13 */
var _prC13=precioCard;precioCard=function(){var h=_prC13.apply(this,arguments),x=mayNotaHTML();return x?h.replace(/<\/div>$/,x+'</div>'):h};

/* gchCard · de l14 */
var _gchC14=gchCard;gchCard=function(){var h=_gchC14.apply(this,arguments);h=h.replace('Foto del ticket (opcional)','📷 Foto del ticket').replace('<button class="btn" style="margin-top:8px" data-act="gxsave">',(S.gx&&S.gx.foto?'':'<div class="lbl" style="margin-top:4px">Sin foto del ticket no se descuenta hasta que el administrador lo acepte.</div>')+'<button class="btn" style="margin-top:8px" data-act="gxsave">');return h.replace(/<\/details>$/,gxRevChofer('gx')+'</details>')};

/* recL · de l14 */
var _recL14=recL;recL=function(){return _recL14.apply(this,arguments)+sum(gxRevL().filter(function(x){return x.k==='rc'&&x.est!=='ok'&&x.ch===+S.chofHoy&&x.f===iso(TODAY)}),function(x){return x.litros})};

/* cambioCard · de l14 */
var _cbC14=cambioCard;cambioCard=function(c){return _cbC14.apply(this,arguments).replace('Foto (opcional)','📷 Foto de la fruta mala (obligatoria)').replace('Cambiar foto','Cambiar foto de la fruta mala')};

/* npF · de l15 */
var _npF15=npF;npF=function(k,l,t,ph){if(/^(r1p|r2p|emp)$/.test(k))return parHTML('np:'+k);return _npF15.apply(this,arguments)};

/* metaCard · de l18 */
var _meta18=metaCard;metaCard=function(){var h=_meta18.apply(this,arguments);if(!comOn()||!S.salida.ok)return h;return comCardHTML()};

/* sigCard · de l18 */
var _sig18=sigCard;sigCard=function(i,E){var h=_sig18.apply(this,arguments);if(!comOn())return h;var c=cl(S.stops[i].c),p=comPct(chofHoyObj()),x=(comEstimado(c)>0.5?'<span class="comtip" data-x="tedeja">💵 Esta entrega te deja ~'+money(comEstimado(c))+'</span>':'')+(c.cred>0.5?' <span class="comtip deu" style="background:rgba(242,194,48,.18);color:#8A6A00">Si le cobras su deuda hoy, ganas '+money(r2(c.cred*p))+'</span>':'');
 return h.replace('<div style="display:flex;gap:14px;margin:8px 0;font-size:14px">',x+'<div style="display:flex;gap:14px;margin:8px 0;font-size:14px">')};

/* dfBurbuja · de l22 */
var _dfB22=dfBurbuja;dfBurbuja=function(){return _dfB22.apply(this,arguments).replace('<div style="display:flex;justify-content:flex-end;margin-bottom:8px">','<div class="dfmini" style="display:flex;justify-content:flex-end;margin-bottom:8px">')};

/* chImg · de l35 */
var _chI35=chImg;chImg=function(c,k,l){var h=_chI35.apply(this,arguments),id='chi_'+c.id+k;
 return h.replace(/<label class="btn sec sm" for="chi_[^"]*"[^>]*>[^<]*<\/label>/,'<div class="chfbtn"><label class="btn sec sm" for="'+id+'c" style="display:flex;align-items:center;justify-content:center;cursor:pointer">📷 Tomar</label><label class="btn sec sm" for="'+id+'" style="display:flex;align-items:center;justify-content:center;cursor:pointer">🖼️ Galería</label></div>')
  .replace(/<\/div>$/,'<input id="'+id+'c" type="file" accept="image/*" capture="environment" data-chimg="'+c.id+':'+k+'" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none"></div>')};

/* imprOk · de l39 */
var _imprOk39=imprOk;imprOk=function(){return !!(S.impr&&S.impr.mac)||_imprOk39.apply(this,arguments)};

/* tkImprimir · de l39 */
var _tkI39=tkImprimir;tkImprimir=function(n){var r=_tkI39.apply(this,arguments);if(S.impr&&S.impr.mac)imprimirItems(notaItems(n)).then(function(){toast('Ticket impreso')},function(e){n.prOk=false;toast('No se pudo imprimir: revisa que la impresora esté prendida');render()});return r};

/* efeDesgloseHTML · de l41 */
var _efD41=efeDesgloseHTML;efeDesgloseHTML=function(r){var h=_efD41.apply(this,arguments);if(!(r.tarj||r.trans))return h;
 var x=(r.tarj?rw('Cobrado con tarjeta (va al banco)','− '+money(r.tarj),'neg'):'')+(r.trans?rw('Transferencias (van al banco)','− '+money(r.trans),'neg'):'');return h.replace('<div class="row" style="min-height:56px;border-top:2px solid var(--fg)"><b>Debes entregar</b>',x+'<div class="row" style="min-height:56px;border-top:2px solid var(--fg)"><b>Debes entregar</b>')};

/* gSheetHTML · de l42 */
var _gS42=gSheetHTML;gSheetHTML=function(){var h=_gS42.apply(this,arguments),f=S.gsheet;if(!h||!f)return h;var c='<div class="chips" role="group" aria-label="Factura" style="margin:8px 0"><button data-act="gfac" data-v="1" aria-pressed="'+!!f.fac+'">🧾 Tiene factura</button><button data-act="gfac" data-v="0" aria-pressed="'+!f.fac+'">Sin factura</button></div>';
 return h.replace('<div class="field"><label for="gsn">Concepto</label>',c+'<div class="field"><label for="gsn">Concepto</label>')};

/* encRutaHTML · de l43 */
var _erh43=encRutaHTML;encRutaHTML=function(cierre){var h=_erh43.apply(this,arguments);try{encList().filter(function(x){return x.ch===+S.chofHoy&&x.est==='pend'&&x.lugar}).forEach(function(x){var v=vehById(x.vid)||{n:''},l=x.lugar,href=l.lat!=null?'https://www.google.com/maps/dir/?api=1&destination='+l.lat+','+l.lng:(l.link||'');if(!href)return;
 var key=esc(x.tipo)+' · '+esc(v.n);var i=h.indexOf(key);if(i<0)return;var j=h.indexOf('</span>',i);if(j<0)return;h=h.slice(0,j)+'<br><a class="link" target="_blank" rel="noopener" href="'+href+'">📍 '+(l.n?esc(l.n):'Ir')+' · Google Maps</a>'+h.slice(j)})}catch(e){}
 /* al decir "Sí, ya": dónde lo hizo */
 var r=S.encR;if(r&&r.p==='si'){var x2=encList().filter(function(y){return y.id===r.id})[0];if(x2&&!x2.lugar){var L=lugaresL();h=h.replace('<div class="field"><label for="encc">','<div class="field"><label for="encw">¿Dónde lo hiciste?</label><input id="encw" type="text" list="lugdl" data-bind="encR.donde" value="'+esc(r.donde||'')+'" placeholder="ej. Verificentro Lázaro" style="width:180px;text-align:left"></div><datalist id="lugdl">'+L.map(function(l){return '<option value="'+esc(l.n)+'">'}).join('')+'</datalist><div class="lbl">Se guarda el lugar con tu ubicación para la próxima.</div><div class="field"><label for="encc">')}}
 return h};

/* dfIr · de l45 */
var _dfIr45=dfIr;dfIr=function(x){var g=x&&x.go;if(!g||g.t!=='prov')return _dfIr45.apply(this,arguments);S.dfOpen=false;S.menu=false;S.tab.admin='cargas';S.fiLast='openProv';S.openProv=g.n;S.pvEdit=g.n;S.fiTab=S.fiTab||{};S.fiTab['prov:'+g.n]='dat';render();
 var k=/Teléfono/.test(x.txt)?'tel':(/Dirección/.test(x.txt)?'dir':'nota');setTimeout(function(){var el=document.querySelector('[data-pv="'+encodeURIComponent(g.n)+'|'+k+'"]');if(el){marcaFalta(el)}},280)};

/* tiempoAprox · de l45 */
var _tA45=tiempoAprox;tiempoAprox=function(d){if(!isFinite(d))return '';return _tA45.apply(this,arguments)};

/* kmAprox · de l45 */
var _kA45=kmAprox;kmAprox=function(km,v){var h=_kA45.apply(this,arguments);if(!(kmDiaV(v)>0)&&num(km)>0)h=String(h).replace(/\s*\(\s*\)|,\s*$/,'')+' (cuando haya unos días de rutas te digo en cuánto tiempo)';return h};

/* abrirModal · de l46 */
var _aM46=abrirModal;abrirModal=function(t,m,b){if(typeof MODO!=='undefined'&&MODO==='vacio'){var f=function(s){s=String(s||'');TXT_DEMO.forEach(function(r){s=s.replace(r[0],r[1])});return s};t=f(t);m=f(m);b=(b||[]).filter(function(x){return x[1]!=='wzforce'}).map(function(x){return [f(x[0])].concat(x.slice(1))})}return _aM46.call(this,t,m,b)};

/* cliTools · de l46 */
var _cT46=cliTools;cliTools=function(){var h=_cT46.apply(this,arguments),fl=S.cliF||'todos';
 var grid='<div class="cligrid" role="group" aria-label="Filtro">'+[['todos','Todos'],['hoy','Les toca hoy'],['morosos','Morosos'],['deben','Me deben'],['cajas','Deben cajas'],['nuevos','Nuevos']].map(function(x){return '<button data-act="clif" data-v="'+x[0]+'" aria-pressed="'+(fl===x[0])+'"><b>'+cliCuenta(x[0])+'</b>'+x[1]+'</button>'}).join('')+'</div>'
  +'<div class="field"><label for="clichs">Chofer</label><select id="clichs" data-clich="1" style="width:170px"><option value="">Todos</option>'+choferesL().filter(function(c){return c.id!==2&&!c.baja}).map(function(c){return '<option value="'+c.id+'"'+(fl==='chofer'&&String(S.cliCh||'')===String(c.id)?' selected':'')+'>'+esc(c.n)+'</option>'}).join('')+'</select></div>';
 h=h.replace(/<div class="chips scroll" role="group" aria-label="Filtro"[\s\S]*?<\/div>/,grid);
 h=h.replace(/<div class="chips" style="margin-top:6px"><button data-act="clich"[\s\S]*?<\/div>/,'');
 if(S.role==='admin'&&!S.encOn)h=h.replace('<div class="card cli-tools span" style="padding:10px 12px">','<div class="card cli-tools span" style="padding:10px 12px"><button class="btn" style="margin-bottom:8px" data-act="clialta">+ Agregar cliente</button>');
 return h};

/* efPasoHTML · de l50 */
var _efP50=efPasoHTML;efPasoHTML=function(){var h=_efP50.apply(this,arguments),b=(S.cierre&&S.cierre.bill)||{};
 BILLETES.forEach(function(d){h=h.replace(new RegExp('<input id="efb'+d+'" type="number" inputmode="numeric" min="0" data-ef="b'+d+'" value="[^"]*" placeholder="0">'),mmHTML('efb'+d,'data-ef="b'+d+'"',b['b'+d]||''))});return h};

/* qrScan · de l52 */
var _qrScan52=qrScan;qrScan=function(cb,titulo){var n=natPl52();
 if(esNativo52()){if(!n||!n.escanear){toast('Actualiza la app para poder leer códigos QR.');return}
  n.escanear().then(function(r){if(r&&r.texto)cb(r.texto);else if(!(r&&r.cancelado))toast('No se leyó el código. Intenta otra vez.')},function(er){var m=String(er&&er.message||er||'');
   toast(/sin_play/.test(m)?'Este celular no tiene los servicios de Google para leer QR. Escribe o busca a mano.':'No se pudo abrir el lector de QR. Intenta otra vez.')});return}
 return _qrScan52.apply(this,arguments)};

/* permHTML · de l52 */
var _permH52=permHTML;permHTML=function(){var h=_permH52.apply(this,arguments);if(!h||S.role!=='rep')return h;var f=S.permFondo;
 var it='<div class="pr"><span class="ic">🛰️</span><span class="grow"><b>Ubicación todo el tiempo</b><div class="lbl">Es celular del negocio: la ubicación se manda siempre. En la pantalla que se abre escoge <b>"Permitir todo el tiempo"</b>.</div>'+(f?'':'<button class="btn sm" style="width:auto;margin-top:6px" data-act="permfondo">Dar este permiso</button>')+'</div><span class="st" style="color:'+(f?'var(--accent)':'var(--muted)')+'">'+(f?'✓':'•')+'</span></div>';
 var m='<div class="pr"><span class="ic">🖨️</span>';return h.replace(m,it+m)};

/* vYaHTML · de l55 */
var _vYa55=vYaHTML;vYaHTML=function(v){var h=_vYa55.apply(this,arguments);return h?h.replace('<div class="card" style="border:2px solid var(--accent)">','<div class="card fsform" role="dialog" aria-label="Ya se hizo">'):h};

/* incForm · de l55 */
var _incF55=incForm;incForm=function(){return fsDe(_incF55.apply(this,arguments),'Incidente')};

/* corrForm · de l55 */
var _corF55=corrForm;corrForm=function(){return fsDe(_corF55.apply(this,arguments),'Corrección')};

/* natNotif · de l60 */
var _natN60=natNotif;natNotif=function(t,x){return _natN60.call(this,avLimpio(t),avLimpio(x))};

/* trCost · de l69 */
var _trC69=trCost;trCost=function(c){var r=_trC69.apply(this,arguments);try{if(!(c.cv&&c.cv.ok))r+=num(c.dsgM)+num(c.suelM);r-=sum(impBig68(c),function(x){return num(x.m)})}catch(e){}return r};

/* cvDef · de l69 */
var _cvD69=cvDef;cvDef=function(c){var D=_cvD69.apply(this,arguments);try{if(c.dsgOn===false)D.desgKm=0;if(c.suelOn===false){D.sueldo=0;D.com=0}else if(c.suelOn===true){D.sueldo=num(c.suelM);D.com=0}}catch(e){}return D};

/* cvPasoHTML · de l69 */
var _cvP69=cvPasoHTML;cvPasoHTML=function(c,P,wiz){var h=_cvP69.apply(this,arguments);
 /* 111 · en "La fruta": ¿sí se cargó la fruta planeada sin precio? (tema-cargas.js) */
 if(P==='fruta'){try{var fh=fant111HTML(c);if(fh){var j=h.indexOf('<div class="card"');h=j>-1?h.slice(0,j)+fh+h.slice(j):fh+h}}catch(e){}return h}
 if(P!=='costo')return h;try{var D=cvDef(c),vh=D.vh||{n:'el vehículo'},km=Math.round(num(cvCalc(c).km)),tasa=tasa68(vh),z=suelDia68(D.ch),sd=c.suelM!=null&&c.suelM!==''?c.suelM:String(z.s+z.c||''),nom=D.ch&&D.ch.id!==2?D.ch.n:'Tú';
  var dOn=c.dsgOn===true?'si':(c.dsgOn===false?'no':''),sOn=c.suelOn===true?'si':(c.suelOn===false?'no':''),at=' data-id="'+c.id+'"';
  h+='<div class="card c68" style="padding:12px 14px;margin-top:12px;border:2px solid var(--accent)"><div style="font-size:19px;font-weight:900">¿Sumar el desgaste del vehículo?</div><div class="row"><span>'+esc(vh.n)+'</span><b>'+km.toLocaleString('es-MX')+' km × '+f2(tasa)+' = '+money(Math.round(km*tasa))+'</b></div>'+ch68('cv68','dOn',[['si','Sí, súmalo'],['no','No']],dOn,at)+suma103(dOn,Math.round(km*tasa),caja103(c),'No se suma el desgaste.')+'</div>'
   +'<div class="card c68" style="padding:12px 14px;margin-top:10px;border:2px solid var(--accent)"><div style="font-size:19px;font-weight:900">¿Se le asignó un sueldo por este viaje?</div><div class="lbl">Fue: <b>'+esc(nom)+'</b></div>'+ch68('cv68','sOn',[['si','Sí'],['no','No']],sOn,at)
   +(sOn==='si'?'<div class="field"><label for="cv68s">¿Cuánto por este viaje? $</label><input id="cv68s" type="number" inputmode="decimal" step="any" min="0" data-cf="'+c.id+':suelM" value="'+esc(sd)+'"></div>':'')+suma103(sOn,sd,caja103(c),'No se suma sueldo.')+'</div>'}catch(e){console.error('cv69',e)}return h};

/* bigPrecio · de l69 */
var _bP69=bigPrecio;bigPrecio=function(tit,cost,key,step,unit,mg){if(key==='M'&&mg!=null){var c=S.cargas.filter(function(x){return S.cvOpen&&x.id===+S.cvOpen})[0];if(c)mg=mgM68(c)}return _bP69.call(this,tit,cost,key,step,unit,mg)};

/* pxHTML · de l73 */
var _pxH73=pxHTML;pxHTML=function(){var x=S.px;if(x&&x.t==='bio'&&!x.dentro){S.px=null;return ''}
 var h=_pxH73.apply(this,arguments);if(!x||x.t!=='bio')return h;
 return h.replace('<button class="btn sec" style="margin-top:8px" data-act="biono">Ahora no</button>','<button class="btn sec" style="margin-top:8px" data-act="biono">Ahora no</button><div class="lbl" style="margin-top:8px;text-align:center">'+(num(bioEst73(x.k).n)>=1?'Ya no te lo vuelvo a preguntar. Está en Ajustes → Huella.':'Te lo vuelvo a sugerir en 3 días. También está en Ajustes → Huella.')+'</div>')};

/* cntCard · de l82 */
var _cc82=cntCard;cntCard=function(){var h=_cc82.apply(this,arguments),X=S.cnt82||{},r=null;try{r=cntCalc()}catch(e){}if(!r)return h;var hay=r.d.some(function(x){return Math.abs(x.dif)>0.001});var add='';
 if(X.re)add+='<div class="card note" style="margin:8px 0;padding:10px 12px"><b>Vuelve a contar</b><div class="lbl">La diferencia es grande. Cuenta otra vez lo marcado: '+esc(X.re)+'. Si sale igual, se registra.</div></div>';
 if(hay)add+='<div style="margin-top:8px"><b>¿Por qué no cuadra?</b><div class="chips" role="group" style="margin:6px 0;flex-wrap:wrap">'+MOT82.map(function(m){return '<button data-act="cnt82m" data-v="'+esc(m)+'" aria-pressed="'+(X.mot===m)+'">'+esc(m)+'</button>'}).join('')+'</div>'+(X.mot==='Otro'?'<div class="field"><label for="cnt82o">Explica qué pasó</label><input id="cnt82o" type="text" data-bind="cnt82.otro" value="'+esc(X.otro||'')+'" style="width:100%;text-align:left"></div>':'')+'</div>';
 return add?h.replace('<button class="btn" style="margin-top:8px" data-act="registrarcnt">',add+'<button class="btn" style="margin-top:8px" data-act="registrarcnt">'):h};

/* recFaltaTxt · de l82 */
var _rT82=recFaltaTxt;recFaltaTxt=function(d){var t=_rT82.apply(this,arguments);return t.replace(/caja(s?) vacía(s?)/,'tara$1')};

/* sheet84 · de l85 */
var _sh85=sheet84;sheet84=function(){var h=_sh85.apply(this,arguments),L=sinD85();if(!h||!L.length||h.indexOf('data-act="rt84ok"')<0)return h;var R=S.rt81,D=R.dias85||[];
 var blk='<div class="vg84" style="margin-top:4px">¿Qué días le tocan'+(L.length===1?' a '+esc(L[0].n):' ('+L.length+' sin días)')+'?</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:6px">'+DS85.map(function(x){var on=D.indexOf(x[0])>-1;return '<button data-act="rt85d" data-v="'+x[0]+'" aria-pressed="'+on+'" style="min-height:48px;border-radius:12px;font-weight:900;font-size:15px;border:2px solid '+(on?'var(--accent)':'var(--line)')+';background:'+(on?'var(--accent)':'var(--surface)')+';color:'+(on?'#fff':'var(--fg)')+'">'+x[1]+'</button>'}).join('')+'</div><div class="lbl" style="margin-bottom:10px">Quedan fijos con el chofer que escojas; el aviso de "sin días" se quita.</div>';
 h=h.replace('<div class="vg84">Vigencia del cambio</div>',blk+'<div class="vg84">Vigencia del cambio</div>');if(!D.length)h=h.replace('<button class="si" data-act="rt84ok">','<button class="si" data-act="rt84ok" disabled>');return h};

/* nuevoCli · de l86 */
var _nc86=nuevoCli;nuevoCli=function(o){var c=_nc86.apply(this,arguments);try{if(S.setup&&S.setup.fin&&num(c.vac)>0){S.cajasMov=S.cajasMov||[];S.cajasMov.push({t:'Taras que ya debía '+c.n+' (al darlo de alta)',f:iso(TODAY),n:Math.round(num(c.vac)),ini86:1})}}catch(e){}return c};
