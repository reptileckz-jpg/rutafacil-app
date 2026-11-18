/* ===================== TEMA · Inicio del administrador y sus tarjetas (aplanado el 18 nov) =====================
   Antes estaba repartido en 24 envolturas encadenadas en l14, l22, l27, l31, l35, l37, l41, l42, l43, l44, l47, l48, l52, l56, l57, l59, l60, l62, l66, l68, l70, l82.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con pruebas/comp-inicio.js).
   Se arma justo después de tema-cierre.js (antes de los otros temas).
   Si se cambia algo del Inicio, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - inicio: la pantalla de Inicio (6 pasos).
   - bienvHTML: la bienvenida de arriba (3 pasos).
   - pedidoCard: la tarjeta de pedidos (4 pasos).
   - proveedoresCard: la tarjeta de proveedores (2 pasos).
   - mapaVivoHTML: el mapa en vivo de los choferes (3 pasos).
   - popItems y popHTML: el menú "¿Qué sigue?" (4 y 2 pasos).
   Las funciones que usan los pasos siguen en su capa.
   ============================================================================================ */

/* bienvHTML · de l14 */
var _bvH14=bienvHTML;bienvHTML=function(){var h=_bvH14.apply(this,arguments);if(S.role!=='rep')return h;var vh=vehHoy();if(!vh)return h;
 var k=h.indexOf('<span class="lbl">Tu vehículo</span>');if(k<0)return h;var a=h.lastIndexOf('<div style="display:flex;gap:10px;align-items:center;margin-top:10px">',k);var e=h.indexOf('</span></div>',k);if(a<0||e<0)return h;
 return h.slice(0,a)+vehChofHTML(vh)+h.slice(e+'</span></div>'.length)};

/* bienvHTML · de l22 */
var _bvH22=bienvHTML;bienvHTML=function(){return _bvH22.apply(this,arguments).replace('<div style="text-align:center;padding:16px 4px 8px">','<div class="bvhola" style="text-align:center;padding:24px 4px 8px">')};

/* proveedoresCard · de l27 */
var _pvC27=proveedoresCard;proveedoresCard=function(){return provUbIns(_pvC27.apply(this,arguments))};

/* pedidoCard · de l31 */
var _pc31=pedidoCard;pedidoCard=function(){var p=S.pf=S.pf||{cli:'',R:'',M:'',cuando:'hoy',nota:''},cs=S.cli.filter(function(c){return !c.oculto});if(p.cli!=='__nuevo'&&!cl(+p.cli))p.cli=cs[0]?String(cs[0].id):'__nuevo';
 var h=_pc31.apply(this,arguments),c=cl(+p.cli),sug=p.cli==='__nuevo'?((pedChoferes().filter(function(x){return !esAdm(x)})[0]||pedChoferes()[0]||{}).id):pedSugerido(c);if(p.ch==null||p.chCli!==p.cli){p.ch=sug;p.chCli=p.cli}
 h=h.replace(/(<select id="pfc"[^>]*>)([\s\S]*?)(<\/select>)/,function(m,a,o,z){return a+o.replace(' selected','')+'<option value="__nuevo"'+(p.cli==='__nuevo'?' selected':'')+'>+ Cliente nuevo</option>'+z});
 if(p.cli!=='__nuevo')h=h.replace(/(<option value="[^"]*")(>[^<]*<\/option>)/g,function(m,a,b){return a.replace(/ selected/,'')+(a.indexOf('value="'+p.cli+'"')>-1?' selected':'')+b});
 var extra=(p.cli==='__nuevo'?'<div class="field"><label for="pfnn">Nombre del cliente</label><input id="pfnn" type="text" data-bind="pf.nn" value="'+esc(p.nn||'')+'" style="width:190px;text-align:left"></div><div class="field"><label for="pfnt">Teléfono</label><input id="pfnt" type="tel" data-bind="pf.nt" value="'+esc(p.nt||'')+'" style="width:190px;text-align:left"></div><div class="lbl">El chofer guarda su ubicación cuando le entregue.</div>':'')
  +'<div class="lbl" style="margin-top:8px"><b>¿Quién lo entrega?</b></div><div class="chips" role="group" aria-label="Quién lo entrega" style="margin:4px 0">'+pedChoferes().map(function(ch){var pp=pedPos(ch.id);return '<button data-act="pfch" data-id="'+ch.id+'" aria-pressed="'+(+p.ch===+ch.id)+'">'+esc(esAdm(ch)?chofN(2)+' (tú)':ch.n)+(sug!=null&&+sug===+ch.id?' · le queda cerca':'')+(pp.activo?'':' · sin salir')+'</button>'}).join('')+'</div>'
  +(p.err?'<div class="neg" role="alert" style="font-weight:700;margin:6px 0">'+esc(p.err)+'</div>':'')+(p.ok?'<div style="color:var(--accent);font-weight:700;margin:6px 0">'+esc(p.ok)+'</div>':'');
 return h.replace('<button class="btn" data-act="pedido">Registrar pedido</button>',extra+'<button class="btn" data-act="pedido">Registrar pedido</button>')};

/* inicio · de l35 */
var _ini35=inicio;inicio=function(){var h=_ini35.apply(this,arguments),g=guiaHTML();if(!g)return h;var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+g+h.slice(i+5):g+h};

/* popItems · de l37 */
var _popI37=popItems;popItems=function(){var L=_popI37.apply(this,arguments);if(S.role!=='admin'||S.encOn)return L;try{var ya=L.map(function(x){return x.t+' '+x.m}).join(' | ');
 avisos().filter(function(x){return AV_URG.test(x)}).forEach(function(x){var t=x.replace(/^URGENTE:\s*/,'').replace(/\s*\[pin:[^\]]+\]/,'');if(ya.indexOf(t.slice(0,30))>-1)return;
  L.push({t:'Atiende esto',m:esc(t),b:[['Ir a atenderlo','avgo',' data-k="'+encodeURIComponent(x)+'"']]})})}catch(e){}return L};

/* inicio · de l41 */
var _ini41=inicio;inicio=function(){var h=_ini41.apply(this,arguments),c=bancoCardHTML();if(!c)return h;var i=h.lastIndexOf('</div>');return h+c};

/* popItems · de l42 */
var _pI42=popItems;popItems=function(){var L=_pI42.apply(this,arguments);try{if(S.role==='admin'&&S.precio&&num(S.precio.R)>0&&S.precio.conf!==iso(TODAY)&&(S.precioAyer||'')!==iso(TODAY))
 L.unshift({t:'Precio de hoy',m:'No lo has fijado: se está cobrando el de ayer · roatán '+money(S.precio.R)+' la caja · macho '+money(S.precio.M)+' el kilo.',b:[['Está bien, el de ayer','precioayer'],['Cambiarlo','popgo',' data-t="inicio"']]})}catch(e){}return L};

/* inicio · de l42 */
var _ini42=inicio;inicio=function(){var h=_ini42.apply(this,arguments);return h+resumenCardHTML()+provPideHTML()};

/* inicio · de l43 */
var _ini43=inicio;inicio=function(){var h=_ini43.apply(this,arguments),a=aprendeHTML();return a?h+a:h};

/* pedidoCard · de l44 */
var _pc44=pedidoCard;pedidoCard=function(){if(S.role!=='admin')return _pc44.apply(this,arguments);var pend=S.cli.filter(function(c){return !c.oculto&&c.ped});
 return '<div class="card" data-key="pedidos"><b>Pedidos por WhatsApp</b>'+(pend.length?pend.map(function(c){return rw(esc(c.n),c.ped.R+' cajas · '+c.ped.M+' kg · '+esc(c.ped.cuando))}).join(''):'<div class="lbl">Sin pedidos pendientes.</div>')+'<button class="btn" style="margin-top:8px" data-act="pwabre">+ Registrar un pedido</button>'+(S.pf&&S.pf.ok?'<div style="color:var(--accent);font-weight:700;margin-top:6px">'+esc(S.pf.ok)+'</div>':'')+'</div>'};

/* inicio · de l44 */
var _ini44=inicio;inicio=function(){var h=_ini44.apply(this,arguments);if(S.role!=='admin')return h;var L=tombolaSinAbrir();if(!L.length)return h;
 var c='<div class="card note" data-key="tombola"><b>En la tómbola, sin abrir: '+money(sum(L,function(x){return x.m}))+'</b>'+L.map(function(x){return rw(esc(x.ch)+(x.b?' · bolsa '+esc(x.b):''),money(x.m))}).join('')+'<div class="lbl">Cuando abras la bolsa, cuéntalo en el cierre de cada chofer (sin ver cuánto dijo).</div></div>';var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+c+h.slice(i+5):c+h};

/* proveedoresCard · de l47 */
var _pvC47=proveedoresCard;proveedoresCard=function(){var h=_pvC47.apply(this,arguments);if(S.role!=='admin'||S.encOn)return h;return h.replace('<div class="card" style="padding:4px 14px">','<div class="card" style="padding:4px 14px"><button class="btn sec" style="margin:10px 0" data-act="provalta">+ Agregar proveedor</button>')};

/* bienvHTML · de l48 */
var _bvH48=bienvHTML;bienvHTML=function(){return permAvisoHTML()+_bvH48.apply(this,arguments)};

/* mapaVivoHTML · de l52 */
var _mvH52=mapaVivoHTML;mapaVivoHTML=function(id,data,alto){var h=_mvH52.apply(this,arguments);if(!gmHay())return h;return h+'<button class="btn sm sec gmbtn" data-act="gmabre" data-id="'+esc(id)+'">🗺️ Ver en Google Maps</button>'};

/* inicio · de l56 */
var _ini56=inicio;inicio=function(){var h=_ini56.apply(this,arguments),a=aprendeHTML();if(a)h=h.replace(a,'');var top=hoyTocaHTML()+(a||'');if(!top)return h;var i=h.indexOf('</h1>');return i>-1?h.slice(0,i+5)+top+h.slice(i+5):top+h};

/* mapaVivoHTML · de l57 */
var _mvH57=mapaVivoHTML;mapaVivoHTML=function(id,data,alto){var h=_mvH57.apply(this,arguments);return gmInHay()?h.replace('🗺️ Ver en Google Maps','⤢ Ver más grande'):h};

/* popHTML · de l59 */
var _popH59=popHTML;popHTML=function(){var P=_popPausa;if(P){var casa=S.tab[S.role]===popCasa()&&!document.querySelector('#fiov,#rcov,#wzov,#eqov,#cxov,#ajov,#medov,#cvov');if(!casa)P.salio=true;
  if(casa&&(P.salio||Date.now()-P.t>90000))_popPausa=null;else return ''}return _popH59.apply(this,arguments)};

/* popItems · de l60 */
var _popI60=popItems;popItems=function(){var L=_popI60.apply(this,arguments);try{L.forEach(function(it){var m=String(it.m||''),raw=m.replace(/&#39;/g,"'"),tel=/\[tel:(\d+)\]/.exec(raw),geo=/\[geo:(-?[\d.]+),(-?[\d.]+)\]/.exec(raw);
  it.m=m.replace(/\s*\[(tel|geo|gps|gpsev|pin):[^\]]*\]/g,'');it.t=String(it.t||'').replace(/\s*\[(tel|geo|gps|gpsev|pin):[^\]]*\]/g,'');
  if(it.t==='Atiende esto'&&it.b&&it.b[0]&&it.b[0][1]==='avgo'){it.b[0][0]='Atender';if(geo)it.b.push(['📍 Ver dónde','avgeo',' data-lat="'+geo[1]+'" data-lng="'+geo[2]+'"']);if(tel)it.b.push(['📞 Llamar','avtel',' data-tel="'+tel[1]+'"'])}})}catch(e){}return L};

/* mapaVivoHTML · de l62 */
var _mv62=mapaVivoHTML;mapaVivoHTML=function(id,data,alto){try{if(/^gps\d/.test(String(id))&&data&&data.bod!==false){var P=(data.pts||[]).concat(data.line||[]).filter(function(o){return o&&o.lat!=null});if(P.length&&!P.some(function(o){return gpsDist(o,BOD)<30000}))data.bod=false}}catch(e){}return _mv62.call(this,id,data,alto)};

/* pedidoCard · de l66 */
var _pc66=pedidoCard;pedidoCard=function(){if(S.role!=='admin')return _pc66.apply(this,arguments);var pend=(S.cli||[]).filter(function(c){return !c.oculto&&c.ped});
 return '<div class="card pw40" data-key="pedidos"><div class="hd"><span class="wa">'+WA40+'</span><span><div class="tt">Pedidos por WhatsApp</div><div class="st">Mensajes listos para surtir</div></span>'+(pend.length?'<span class="pend">'+pend.length+' pendiente'+(pend.length>1?'s':'')+'</span>':'')+'</div>'
  +(pend.length?pend.map(function(c){var p=c.ped,R=num(p.R),M=num(p.M);return '<div class="it"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><span class="nm">'+esc(c.n)+(c.apodo?' “'+esc(c.apodo)+'”':'')+'</span><span class="cu">'+esc(p.cuando==='hoy'?'Hoy':(p.cuando==='manana'||p.cuando==='mañana'?'Mañana':String(p.cuando||'')))+'</span></div>'
   +'<div class="pills">'+(R?'<span class="pill pr">🍌 '+R+' caja'+(R>1?'s':'')+' de roatán</span>':'')+(M?'<span class="pill pm">⚖️ '+M+' kg de macho</span>':'')+'</div>'+(p.nota?'<div class="nota">'+esc(p.nota)+'</div>':'')+'</div>'}).join(''):'<div class="vac">Sin pedidos pendientes.</div>')
  +'<button class="btn" data-act="pwabre">＋ Registrar un pedido</button>'+(S.pf&&S.pf.ok?'<div style="color:#6EE7B7;font-weight:700;margin-top:6px">'+esc(S.pf.ok)+'</div>':'')+'</div>'};

/* popHTML · de l68 */
var _popH68=popHTML;popHTML=function(){var h=_popH68.apply(this,arguments);if(!h)return h;try{var L=popItems(),i=S.popI||0,x=L[i];if(!x)return h;
  var raw=(x.b&&x.b[0]&&x.b[0][1]==='avgo')?decodeURIComponent((/data-k="([^"]*)"/.exec(x.b[0][2])||[])[1]||''):'',
   I=raw?avInfo68(raw):avInfo68(String(x.t||'')+': '+String(x.m||'').replace(/<[^>]*>/g,'')),col=raw?I.col:(/vencid|falla|faltante|fuera de servicio|Le debes|Falta el costo/i.test(x.t)?'r':(/Precio de hoy/i.test(x.t)?'o':I.col)),
   tit=raw?I.tit:esc(x.t),msg=raw?esc(I.det):x.m;if(raw)tit=esc(tit);
  var bs=(x.b||[]).map(function(b,j){var lab=j===0&&b[1]==='avgo'?'Atender':b[0];return '<button class="btn'+(j?' sec':' p')+'" data-act="'+b[1]+'"'+b[2]+' data-pop="1">'+lab+(j?'':'<span aria-hidden="true">›</span>')+'</button>'}).join('');
  return '<div style="position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px" class="fadein"><div class="popin pop68" role="dialog" aria-label="Aviso urgente" style="--c68:'+COL68[col]+'">'
   +'<div class="fr">'+'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 21h22zm-1 7h2v6h-2zm0 8h2v2h-2z"/></svg><b>'+NIV68[col]+'</b><span class="n">'+(i+1)+' de '+L.length+'</span></div>'
   +'<div class="cu"><span class="ic">'+ic68(I.ic)+'</span><div><div class="t">'+tit+'</div>'+(msg?'<div class="m">'+msg+'</div>':'')+'</div></div>'
   +'<div class="bt">'+bs+'<button class="btn sec" data-act="popdesp">🕒 Después</button></div></div></div>'}catch(e){console.error('aviso 61',e);return h}};

/* pedidoCard · de l70 */
var _pc70=pedidoCard;pedidoCard=function(){if(S.role!=='admin')return _pc70.apply(this,arguments);var pend=(S.cli||[]).filter(function(c){return !c.oculto&&c.ped});
 var L=pend.map(function(c){return {c:c,e:est57(c)}}),sin=L.filter(function(o){return !o.e.ch}),con=L.filter(function(o){return o.e.ch}),todos=!!S.ped57all;
 var pills=function(p){var R=num(p.R),M=num(p.M);return '<div class="pills">'+(R?'<span class="pill pr">🍌 '+R+' caja'+(R>1?'s':'')+' de roatán</span>':'')+(M?'<span class="pill pm">⚖️ '+M+' kg de macho</span>':'')+'</div>'},
  cu=function(p){return esc(p.cuando==='hoy'?'Hoy':(p.cuando==='manana'||p.cuando==='mañana'?'Mañana':String(p.cuando||'')))},
  stp=function(e){return '<div class="stp"><span class="on">✓ Recibido</span><span class="'+(e.ch?'on':'')+'">'+(e.ch?'✓ '+esc(e.ch.n):'Chofer sin asignar')+'</span><span class="'+(e.salio?'on':'')+'">'+(e.salio?'✓ Salió a reparto':'Salió a reparto')+'</span></div>'},
  nm=function(c){return '<span class="nm">'+esc(c.n)+(c.ap?' “'+esc(c.ap)+'”':'')+'</span>'};
 var h='<div class="card pw40 p57" data-key="pedidos"><div class="hd"><span class="wa">'+WA40+'</span><span><div class="tt">Pedidos por WhatsApp</div><div class="st">Mensajes listos para surtir</div></span>'+(sin.length?'<span class="pend">'+sin.length+' sin chofer</span>':'')+'</div>';
 if(!L.length)h+='<div class="vac">Sin pedidos pendientes.</div>';
 h+=sin.map(function(o){var c=o.c,p=c.ped;return '<div class="it"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline">'+nm(c)+'<span class="cu">'+cu(p)+'</span></div>'+pills(p)+(p.nota?'<div class="nota">'+esc(p.nota)+'</div>':'')+stp(o.e)+(p.cuando==='hoy'?'<button class="asg" data-act="p57asg" data-c="'+c.id+'">🚚 Asignar chofer</button>':'<div class="nota">Es para mañana: entra en la ruta de mañana.</div>')+'</div>'}).join('');
 if(con.length){h+=(todos?con.map(function(o){var c=o.c,p=c.ped;return '<div class="it"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline">'+nm(c)+'<span class="cu">'+cu(p)+'</span></div>'+pills(p)+stp(o.e)+'<button class="tg" data-act="p57asg" data-c="'+c.id+'">Cambiar de chofer</button></div>'}).join(''):con.map(function(o){var c=o.c;return '<div class="it min" role="button" tabindex="0" data-act="p57all"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:16px"><b>'+esc(c.n)+'</b><span style="font-weight:800;color:'+(o.e.salio?'#86EFAC':'#FDE68A')+'">'+esc(o.e.ch.n)+' · '+(o.e.salio?'en reparto':'asignado')+'</span></div></div>'}).join(''))
   +'<button class="tg" data-act="p57all">'+(todos?'Ocultar los ya asignados':'Ver todos ('+con.length+' ya asignado'+(con.length>1?'s':'')+')')+'</button>'}
 h+='<button class="btn" data-act="pwabre">＋ Registrar un pedido</button>'+(S.pf&&S.pf.ok?'<div style="color:#6EE7B7;font-weight:700;margin-top:6px">'+esc(S.pf.ok)+'</div>':'')+'</div>';return h};

/* popItems · de l82 */
var _pI82=popItems;popItems=function(){var L=_pI82.apply(this,arguments);try{if(S.role==='admin'&&sinMov82(iso(TODAY))&&new Date().getHours()>=12){L=L.filter(function(x){return !(x&&x.t==='Precio de hoy')})}}catch(e){}return L};
