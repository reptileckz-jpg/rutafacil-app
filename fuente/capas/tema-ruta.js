/* ===================== TEMA · Ruta y entrega del chofer (aplanado el 18 nov) =====================
   Antes estaba repartido en 28 envolturas encadenadas en l13, l18, l19, l20, l23, l26, l32, l33, l40, l41, l43, l44, l45, l48, l52, l56, l62, l74.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-ruta.js).
   Se arma justo después de l90 (antes de los otros temas: tema-taras envuelve entValida después).
   Si se cambia algo de la ruta o la entrega, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - ruta: la pantalla de la ruta del chofer (13 pasos).
   - entrega: la pantalla de la entrega (7 pasos).
   - entValida: lo que se revisa antes de guardar una entrega (4 pasos).
   - entregaCalc: las cuentas de la entrega (2 pasos).
   - credBloq: cuándo no se le puede fiar a un cliente (2 pasos).
   Las funciones que usan los pasos siguen en su capa.
   ============================================================================================ */

/* entValida · de l13 */
var _entV13=entValida;entValida=function(){var k=entregaCalc(),d=S.d;if(k.c&&d){var c=k.c;
  if(d.may&&c.mayNo)return ['CH:[data-act="may"][data-v="0"]','A '+c.n+' no se le da mayoreo (lo decidió el administrador)'];
  if(mayNecesitaPerm(c,d)){mayVencer();var p=mayPideDe(c.id);if(!p||p.est!=='ok'){S.dOpen.entmas=true;return ['CH:[data-act="maypide"]',p&&p.est==='pend'?'Espera el permiso del administrador o cambia a precio normal':'Pide permiso para el mayoreo o cambia a precio normal']}}}
 return _entV13.apply(this,arguments)};

/* entrega · de l13 */
var _ent13=entrega;entrega=function(){var h=_ent13.apply(this,arguments),x=mayNotaHTML();if(!x)return h;
 if(/Mínimo permitido:[^<]*<\/div>/.test(h))return h.replace(/(Mínimo permitido:[^<]*<\/div>)/,'$1'+x);return h.replace(/(Mayoreo a mano<\/button><\/div>)/,'$1'+x)};

/* entrega · de l18 */
var _ent18=entrega;entrega=function(){var h=_ent18.apply(this,arguments);if(!comOn())return h;var c=curCli();if(!c||!(c.cred>0))return h;var p=comPct(chofHoyObj());
 return h.replace(/(<input id="abono"[^>]*><\/div>)/,'$1<div class="lbl" style="color:var(--accent);font-weight:700">Si te paga toda su deuda ('+money(c.cred)+'), ganas '+money(r2(c.cred*p))+'</div>')};

/* credBloq · de l19 */
var _cb19=credBloq;credBloq=function(c){var r=_cb19.apply(this,arguments);if(r)return r;if(!c||(c.rapida&&!S.d.reg))return r;var b=buroDe(c);if((S.permOk||{})[c.id]===iso(TODAY))return '';
 if(b.n===3)return 'está bloqueado en el buró: debe desde hace '+credAge(c)+' días';if(limEf(c)<=0)return 'no tiene crédito';return ''};

/* entValida · de l19 */
var _ev19=entValida;entValida=function(){var r=_ev19.apply(this,arguments);if(r)return r;var k=entregaCalc();if(!k.c||!(k.quedaEntrega>0.005))return null;var c=k.c;
 if(k.deuda>limEf(c)+0.5)return [document.getElementById('pago')?'#pago':'CH:[data-act="mode"][data-m="todo"]','Su límite es '+money(limEf(c))+' ('+BURO[buroDe(c).n][1]+'): cóbrale más de contado'];
 var tot=chDeuda(S.chofHoy,c.id)+k.deuda,mx=num(crCfg().crCh);if(tot>mx+0.5)return [document.getElementById('pago')?'#pago':'CH:[data-act="mode"][data-m="todo"]','Tus clientes ya te deben '+money(chDeuda(S.chofHoy,c.id)+c.cred)+'. Tu tope es '+money(mx)+': cobra antes de fiar'];
 return null};

/* entrega · de l19 */
var _ent19=entrega;entrega=function(){var h=_ent19.apply(this,arguments),c=curCli();if(!c||(c.rapida&&!S.d.reg))return h;/* 115 · el buró se ve al fiar (una parte o a crédito) */if(S.d&&S.d.mode==='todo')return h;var mx=num(crCfg().crCh),dch=chDeuda(S.chofHoy,null),lim=limEf(c);
 var x='<div class="lbl" style="margin:6px 0;line-height:1.6">Buró: '+buroPill(c)+' · límite '+money(lim)+(c.cred>0?' · debe '+money(c.cred):'')+'<br>Tus clientes te deben <b>'+money(dch)+'</b> de '+money(mx)+(dch>=mx?' · <b class="neg">ya no puedes fiar</b>':'')+'</div>';
 return h.replace('<div id="calc"',x+'<div id="calc"')};

/* entValida · de l20 */
var _ev20=entValida;entValida=function(){var k=entregaCalc();var ch=chofHoyObj(),keep=S.cfg.crCh;if(ch&&ch.crMax!=null&&ch.crMax!=='')S.cfg.crCh=String(chTope(ch));try{return _ev20.apply(this,arguments)}finally{S.cfg.crCh=keep}};

/* entrega · de l20 */
var _ent20=entrega;entrega=function(){var ch=chofHoyObj(),keep=S.cfg.crCh;if(ch&&ch.crMax!=null&&ch.crMax!=='')S.cfg.crCh=String(chTope(ch));try{return _ent20.apply(this,arguments)}finally{S.cfg.crCh=keep}};

/* credBloq · de l23 */
var _cb23=credBloq;credBloq=function(c){if(c&&c.credFrz&&!((S.permOk||{})[c.id]===iso(TODAY)))return 'tiene el crédito congelado';return _cb23.apply(this,arguments)};

/* entValida · de l26 */
var _ev26=entValida;entValida=function(){var r=_ev26.apply(this,arguments);if(r)return r;var k=entregaCalc(),c=k&&k.c;if(!ubCliAplica(c)||ubTiene(c)||c.ubSkip===iso(TODAY))return null;
 return ['CH:[data-act="ubcli"]','Primero guarda la ubicación de '+(c.rapida?'este cliente':c.n)+' (botón 📍)']};

/* entrega · de l26 */
var _ent26=entrega;entrega=function(){var h=_ent26.apply(this,arguments);try{var k=entregaCalc(),c=k&&k.c;if(!ubCliAplica(c))return h;var nm=c.rapida?'este cliente':esc(c.n),card='';
 if(!ubTiene(c)&&c.ubSkip!==iso(TODAY))card='<div class="card alert ubcard"><b>📍 Guarda la ubicación de '+nm+'</b><div class="lbl">Es obligatorio la primera vez: así se van planeando las rutas. Hazlo ya estando en su negocio.</div><button class="btn" data-act="ubcli" data-id="'+c.id+'">📍 Guardar ubicación aquí</button></div>';
 else if(!c.rapida){var f=ubCliFalta(c),noche=c.foto&&ubNoche(c.fotoH)&&ubHayLuz();if(noche)card='<div class="card note ubcard"><b>Ya hay luz: actualiza la foto de la fachada</b><div class="lbl">La que hay se tomó de noche.</div><button class="btn sm sec" data-act="ubcli" data-id="'+c.id+'" data-m="foto">📷 Tomar otra foto</button></div>';
  else if(f.length)card='<div class="card note ubcard"><b>Completa los datos de '+nm+'</b><div class="lbl">Falta: '+esc(f.join(' y '))+'.</div><button class="btn sm sec" data-act="ubcli" data-id="'+c.id+'" data-m="datos">Completar ahora</button></div>'}
 if(!card)return h;var an='<div class="card" style="padding:10px 14px"><b style="font-size:18px">¿Qué le dejas?</b>';return h.indexOf(an)>-1?h.replace(an,card+an):card+h}catch(er){return h}};

/* entrega · de l26 */
var _ent26b=entrega;entrega=function(){var h=_ent26b.apply(this,arguments);try{var k=entregaCalc(),c=k&&k.c;if(c&&c.rapida)h=h.replace(/<button class="btn sm sec" data-act="gps"([^>]*)>(Ubicación guardada|Guardar ubicación GPS aquí)<\/button>/,'<button class="btn sm sec" data-act="gps"$1>'+(ubTiene(c)?'✓ Ubicación guardada':'📍 Guardar ubicación GPS aquí (obligatorio)')+'</button>')}catch(er){}return h};

/* ruta · de l32 */
var _ru32=ruta;ruta=function(){var h=_ru32.apply(this,arguments);if(S.role!=='rep'||!S.cierre||!S.cierre.sent)return h;var r=S.reab,top='';
 top='<div class="card good cienv"><div class="big">✓</div><b style="font-size:20px">Cierre enviado</b><div class="lbl">'+(S.ciEnvH?'A las '+esc(S.ciEnvH)+'. ':'')+'Entrega '+money((S.cierre.res||{}).efectivo||0)+' en efectivo al administrador.</div></div>';
 if(r&&r.est==='pend')top+='<div class="card note"><b>Esperando permiso del administrador…</b><div class="lbl">Pediste '+(r.k==='carga'?'cargar más':'dar otra vuelta')+' a las '+esc(r.h||'')+'. Cuando te autorice, aquí te sale para seguir.</div></div>';
 else if(r&&r.est==='no')top+='<div class="card alert"><b>El administrador no autorizó seguir</b><div class="lbl">Si necesitas algo, llámale.</div></div>';
 h=h.replace(/(<div class="hello">[\s\S]*?<\/div>)/,'$1'+top);
 return h.replace(/<button class="btn" style="flex:1" data-act="seguir" data-k="carga">Cargar más<\/button>/,'<button class="btn" style="flex:1" data-act="seguir" data-k="carga">Pedir permiso: cargar más</button>').replace(/<button class="btn sec" style="flex:1" data-act="seguir" data-k="vuelta">Otra vuelta<\/button>/,'<button class="btn sec" style="flex:1" data-act="seguir" data-k="vuelta">Pedir permiso: otra vuelta</button>').replace('Como aún no entregas el efectivo, se reabre tu cierre.','Para seguir, el administrador tiene que autorizarlo.').replace('Como ya entregaste el efectivo, se abre un segundo cierre.','Para seguir, el administrador tiene que autorizarlo.')};

/* ruta · de l33 */
var _ru33=ruta;ruta=function(){var h=_ru33.apply(this,arguments);if(S.role!=='rep'||S.salida.ok)return h;var x=salConfHTML(),i=h.indexOf('<div class="lbl" style="margin:10px 0 6px">Nivel del tanque al salir');
 if(i<0){i=h.indexOf('Fotos del vehículo (');if(i>-1)i=h.lastIndexOf('<div',i)}return i>-1?h.slice(0,i)+x+h.slice(i):h.replace('data-act="iniciar"','data-act="iniciar"')+x};

/* ruta · de l40 */
var _ru40=ruta;ruta=function(){var h=_ru40.apply(this,arguments);if(S.role!=='rep'||!S.cierre||!S.cierre.sent||S.cx)return h;var c=S.cierre,d=c.corte||{},r=S.reab,nm=chofN(S.chofHoy).split(' ')[0];
 var recibido=!!S.cierreReg,enc=encList().filter(function(x){return x.ch===+S.chofHoy&&x.est==='pend'}),pide=chPideSeguir(S.chofHoy);
 var o='<div class="poscierre"><div class="saludo">'+saludoHora()+', '+esc(nm)+'</div>'
  +'<div class="card good cienv"><div class="big">✓</div><b style="font-size:20px">Cierre enviado</b><div class="lbl">'+(S.ciEnvH?'A las '+esc(S.ciEnvH)+'. ':'')+(recibido?'El administrador ya recibió tu efectivo.':'Entrega '+money(d.ent!=null?d.ent:(c.res||{}).efectivo||0)+(d.dest==='tómbola'?' en la tómbola':' al administrador')+'.')+'</div>'
  +(S.corteUlt?'<button class="btn sm sec" style="margin-top:8px" data-act="corteotra">📲 Mandar otra vez la foto del corte</button>':'')+'</div>'
  +(r&&r.est==='pend'?'<div class="card note"><b>Esperando permiso del administrador…</b><div class="lbl">Pediste '+(r.k==='carga'?'cargar más':'dar otra vuelta')+' a las '+esc(r.h||'')+'.</div></div>':'')
  +(r&&r.est==='no'?'<div class="card alert"><b>El administrador no autorizó seguir</b><div class="lbl">Si necesitas algo, llámale.</div></div>':'')
  +(enc.length?'<div class="card note"><b>Ya no tienes pedidos por entregar, pero te queda:</b></div>'+encRutaHTML(false):'<div class="card"><div class="nada">Nada más por hoy ✓</div><div class="lbl">Gracias por tu trabajo.</div></div>')
  +'<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" style="flex:1" data-act="seguir" data-k="carga">'+(pide?'Pedir permiso: cargar más':'Cargar más')+'</button><button class="btn sec" style="flex:1" data-act="seguir" data-k="vuelta">'+(pide?'Pedir permiso: otra vuelta':'Otra vuelta')+'</button></div>'
  +(S.inv.reparto>0||S.inv.repartoKg>0||true?'<button class="btn sec" style="margin-top:8px" data-act="apoyoofrece">🤝 Puedo apoyar a otro chofer</button>':'')+apoyoMioHTML()
  +'<button class="btn sec" style="margin-top:8px" data-act="listohoy">Listo por hoy</button></div>';
 return o};

/* ruta · de l40 */
var _ru40b=ruta;ruta=function(){var h=_ru40b.apply(this,arguments),a=apoyoParaMiHTML();if(!a)return h;var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+a+h.slice(i+5):a+h};

/* entregaCalc · de l41 */
var _eC41=entregaCalc;entregaCalc=function(){var k=_eC41.apply(this,arguments);if(!k||!k.c)return k;var d=S.d||{},fo=d.forma||'efe',cob=r2(num(k.pago)+num(k.abono)),no=0;
 if(fo==='tarj'||fo==='trans')no=cob;else if(fo==='mixto')no=Math.min(cob,Math.max(0,num(d.mixM)));
 k.forma=fo;k.tarj=fo==='tarj'||(fo==='mixto'&&d.mixT!=='trans')?r2(no):0;k.trans=fo==='trans'||(fo==='mixto'&&d.mixT==='trans')?r2(no):0;k.efectivo=r2(cob-no);
 k.comCli=k.tarj>0&&comCobra()?r2(k.tarj*tarjPct()/(100-tarjPct())):0;return k};

/* entrega · de l41 */
var _ent41=entrega;entrega=function(){var h=_ent41.apply(this,arguments);try{var k=entregaCalc(),c=k&&k.c;if(!c)return h;
 /* forma de pago, debajo del cálculo */
 h=h.replace('<div id="calc" style="margin-top:6px">','<div id="pforma">'+pagoFormaHTML()+'</div><div id="calc" style="margin-top:6px">');
 /* "No estaba" a la vista */
 if(!(c.rapida&&!S.d.reg))h=h.replace(/(<div class="card" style="padding:10px 14px"><b style="font-size:18px">¿Qué le dejas\?<\/b>)/,'<button class="btn sec" style="margin:6px 0" data-act="noestaba">🚪 No estaba / no se pudo entregar</button>$1');
 /* buró: el chofer solo lo ve si el cliente tiene crédito */
 if(S.role==='rep'&&!credActivo(c))h=h.replace(/<div class="lbl" style="margin:6px 0;line-height:1\.6">Buró: [\s\S]*?<\/div>/,'');
}catch(e){console.error(e)}return h};

/* ruta · de l43 */
var _ru43=ruta;ruta=function(){var h=_ru43.apply(this,arguments);if(S.role!=='rep'||(S.cierre&&S.cierre.sent))return h;var a=aprendeHTML();return a?h+a:h};

/* ruta · de l44 */
var _ru44=ruta;ruta=function(){var h=_ru44.apply(this,arguments);if(S.role!=='rep'||!qrOn()||!S.salida||!S.salida.ok||(S.cierre&&S.cierre.sent))return h;var b='<button class="btn sec" style="margin:6px 0" data-act="qrscan">📷 Escanear QR del cliente</button>';var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+b+h.slice(i+5):b+h};

/* ruta · de l44 */
var _ru44b=ruta;ruta=function(){var h=_ru44b.apply(this,arguments),x=mjLlegaHTML();if(!x)return h;var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+x+h.slice(i+5):x+h};

/* ruta · de l45 */
var _ru45=ruta;ruta=function(){var h=_ru45.apply(this,arguments);if(S.role!=='rep')return h;var p=pedCargaHTML();
 if(S.cierre&&S.cierre.sent){if(!p)return h;var i=h.indexOf('<div class="card good cienv">');return i>-1?h.slice(0,i)+p+h.slice(i):p+h}
 if(p&&S.salida&&S.salida.ok){var n=pedNecesita();if(n.R>n.trR||n.M>n.trM){var j=h.indexOf('<h1>Ruta de hoy</h1>');return j>-1?h.slice(0,j)+p+h.slice(j):p+h}}return h};

/* ruta · de l48 */
var _ru48=ruta;ruta=function(){var h=_ru48.apply(this,arguments),e=S.permE;if(S.role!=='rep'||!e||S.perm)return h;var f=[];if(e.ubicacion==='no')f.push('ubicación');if(e.camara==='no')f.push('cámara');if(!f.length)return h;
 var c='<div class="card alert"><b>Falta el permiso de '+f.join(' y ')+'</b><div class="lbl">Sin eso no se guardan las fotos o la ubicación de tus entregas.</div><button class="btn" style="margin-top:8px" data-act="permaj">Abrir ajustes del celular</button></div>';return c+h};

/* ruta · de l52 */
var _ru52=ruta;ruta=function(){var h=_ru52.apply(this,arguments);if(S.role!=='rep'||S.permFondo!==false||!natPl52()||S.perm)return h;
 return '<div class="card alert"><b>Falta: ubicación todo el tiempo</b><div class="lbl">Es celular del negocio. Toca el botón y escoge "Permitir todo el tiempo".</div><button class="btn" style="margin-top:8px" data-act="permfondo">Dar el permiso</button></div>'+h};

/* ruta · de l56 */
var _ru56=ruta;ruta=function(){var h=_ru56.apply(this,arguments),a=ahoraSigue();if(!a)return h;var c='<div class="card ahora" data-key="ahora"><span class="lbl">Ahora sigue</span><div class="q">'+esc(a[0])+'</div><div class="lbl">'+esc(a[1])+'</div><button class="btn sm sec" style="width:auto;margin-top:8px" data-act="ahorami">Muéstrame dónde</button></div>';
 var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+c+h.slice(i+5):c+h};

/* ruta · de l56 */
var _ru56b=ruta;ruta=function(){var h=_ru56b.apply(this,arguments),a=aprendeHTML();if(!a||h.indexOf(a)<0)return h;h=h.replace(a,'');var k=h.indexOf('data-key="ahora"');if(k<0){var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+a+h.slice(i+5):a+h}var j=h.indexOf('</div>',h.indexOf('data-act="ahorami"'));return h.slice(0,j+6)+a+h.slice(j+6)};

/* ruta · de l62 */
var _ru62=ruta;ruta=function(){var h=_ru62.apply(this,arguments);try{var c=rgCardHTML();if(!c)return h;var i=h.lastIndexOf('</div>');return h+c}catch(e){return h}};
/* 126 · la tarjeta de "Ordenar con tráfico" va arriba de la ruta (debajo de "Ahora sigue"), no hasta el final de la lista */
var _r126=render;render=function(){var r=_r126.apply(this,arguments);try{if(S.role==='rep'&&S.tab.rep==='ruta'){var m=document.querySelector('main'),c=m&&m.querySelector(':scope>.rgcard');if(c){var a=m.querySelector(':scope>.ahora')||m.querySelector(':scope>h1');if(a&&a.nextElementSibling!==c)a.after(c)}}}catch(e){}return r};

/* entregaCalc · de l74 */
var _eC74=entregaCalc;entregaCalc=function(){var i=curStop(),c=i>=0&&S.stops[i]?cl(S.stops[i].c):null;if(c&&c.ppUna&&c.mayoreo&&(num(c.ppR)||num(c.ppM))){c.mayoreo=false;try{return _eC74.apply(this,arguments)}finally{c.mayoreo=true}}return _eC74.apply(this,arguments)};

/* credBloq · 127 (Ricardo, 18 nov: "si ya debe y no ha pagado, la venta debe ser de contado") */
/* si el cliente ya debe algo de antes, esta venta es de contado (sin "Pagó una parte" ni "A crédito"). El permiso del administrador para fiar ese día se respeta. */
var _cb127=credBloq;credBloq=function(c){var r=_cb127.apply(this,arguments);if(r)return r;if(!c||(c.rapida&&!(S.d&&S.d.reg)))return r;if((S.permOk||{})[c.id]===iso(TODAY))return '';if(num(c.cred)>0.005)return 'ya debe '+money(num(c.cred))+' de antes';return ''};
