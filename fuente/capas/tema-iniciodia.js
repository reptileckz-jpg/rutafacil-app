/* ===================== TEMA · Iniciar el día por pasos (nació como tema, 18 nov · punto 124) =====================
   Antes "Iniciar el día" era una sola pantalla larga y la inspección salía ANTES de escoger el vehículo
   (y como la inspección va pegada al vehículo, si el chofer cambiaba de vehículo se borraba y tenía que repetirla).
   Ahora es como el cierre: un paso por pantalla, con "Paso X de 7", Atrás y Siguiente:
     1 Vehículo → 2 Inspección (de ESE vehículo) → 3 Odómetro → 4 Gasolina → 5 Fotos → 6 Carga → 7 Revisar e "Iniciar reparto".
   - No avanza sin lo de cada paso (lo mismo que ya pedía "Iniciar reparto"; nada nuevo obligatorio).
   - Vehículo asignado: "¿Hoy usas la X?" y puede escoger otro de los libres; al iniciar se le avisa al administrador.
   - Las cuentas no cambian: el inventario y la carga se registran igual, con el mismo botón "Iniciar reparto" y sus revisiones.
   - Cuando reparte el administrador (S.arOn) la pantalla se queda como estaba (para él todo es opcional).
   Se dibuja encima de lo que ya arma la pantalla (como cierrePasos de l32): solo esconde lo que no es del paso.
   Si se cambia algo del inicio del día, se cambia AQUÍ.
   ============================================================================================ */
var SAL_P124=['Vehículo','Inspección','Odómetro','Gasolina','Fotos','Carga','Revisar'];
/* la tarjeta "¿Cuánto cargas hoy?" no tiene relleno propio (solo el título, los números y la franja de abajo): los avisos
   "Todavía no hay datos suficientes" / "no hay con qué calcularlo" se pegaban a la orilla y la última línea se cortaba con la esquina */
(function(){try{var st=document.createElement('style');st.textContent='.card.rep1>:not(.h):not(.bx):not(.ft){padding-left:16px!important;padding-right:16px!important;box-sizing:border-box;overflow-wrap:anywhere}.card.rep1>:last-child:not(.ft):not(.bx){padding-bottom:16px!important}';document.head.appendChild(st)}catch(e){}})();
function salActivo124(){return S.role==='rep'&&S.tab.rep==='ruta'&&S.salida&&!S.salida.ok&&!S.arOn&&S.chofHoy!=null}
function salPaso124(){var o=S.salP124;if(!o||+o.ch!==+S.chofHoy||o.d!==iso(TODAY))return 0;return Math.max(0,Math.min(6,+o.p||0))}
function salPon124(p){S.salP124={ch:+S.chofHoy,d:iso(TODAY),p:p}}
/* el vehículo asignado se puede cambiar por otro libre (solo hoy y solo este chofer) */
function vehOtro124(){var o=S.vehOtro124;return !!(o&&+o.ch===+S.chofHoy&&o.d===iso(TODAY))}
var _vehRep124=vehRepHTML;vehRepHTML=function(){if(S.role!=='rep'||!S.salida||S.salida.ok||S.arOn)return _vehRep124.apply(this,arguments);
 var ch=+S.chofHoy,A=S.vehAsig||{},asig=A[ch]!=null&&A[ch]!==''?A[ch]:null,h;
 if(asig!=null&&vehOtro124()){delete A[ch];try{h=_vehRep124.apply(this,arguments)}finally{A[ch]=asig}
  return h.replace('No tienes vehículo asignado: escoge uno de los disponibles.','Escoge el vehículo que vas a usar hoy.')+'<button class="link" style="margin-top:6px" data-act="veh124asig">Volver al que me asignaron</button>'}
 h=_vehRep124.apply(this,arguments);
 if(asig!=null)h=h.replace('Te lo asignó el administrador. Si falla, llámale para que te dé otro.','Te lo asignó el administrador. ¿Hoy usas este?</div><button class="btn sm sec" style="margin-top:6px" data-act="veh124otro">Usar otro vehículo</button><div>');
 return h};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="veh124otro"],[data-act="veh124asig"]');if(!b)return;e.stopImmediatePropagation();
 if(b.dataset.act==='veh124otro')S.vehOtro124={ch:+S.chofHoy,d:iso(TODAY),de:(S.vehAsig||{})[+S.chofHoy]};else S.vehOtro124=null;render()},true);
/* qué parte de la tarjeta "Iniciar el día" va en cada paso */
function salClasifica124(card){var K=Array.prototype.slice.call(card.children),R=[],fase='cab',vio=false;
 K.forEach(function(el,i){var t=el.textContent||'',p=-1;
  if(el.dataset&&el.dataset.key==='salconf'){R.push('conf');return}
  if(i<2&&fase==='cab'){R.push('cab');return}
  if(/Vas en|Te lo asignó|No tienes vehículo asignado|No hay vehículos disponibles|Escoge el vehículo que vas a usar/.test(t)||el.querySelector&&el.querySelector('[data-act="vehpick"],[data-act="veh124otro"],[data-act="veh124asig"]')||(el.dataset&&/veh124/.test(el.dataset.act||''))){fase='veh';vio=true;R.push(0);return}
  if(el.classList.contains('field')&&/Odómetro inicial/.test(t)){fase='odo';R.push(2);return}
  if(/^Nivel del tanque/.test(t.trim())){fase='tan';R.push(3);return}
  if(/^Fotos del vehículo/.test(t.trim())){fase='fot';R.push(4);return}
  if(/que cargas/.test(t)){fase='car';R.push(5);return}
  if(/^En bodega hay/.test(t.trim())){R.push(5);fase='fin';return}
  if(fase==='cab'||(fase==='veh'&&!vio)){fase='ins';R.push(1);return}
  if(fase==='ins')R.push(1);
  else if(fase==='veh')R.push(5);/* lo que sale entre el vehículo y el odómetro: la sugerencia de carga */
  else if(fase==='odo')R.push(2);else if(fase==='tan')R.push(3);else if(fase==='fot')R.push(4);else if(fase==='car')R.push(5);else R.push(6)});
 return {K:K,R:R}}
function salFalta124(p){var sl=S.salida,c=S.cierre||{},r=S.inspR;
 if(p===0){if(!vehHoy())return 'Escoge el vehículo';/* si está ocupado, al iniciar l90 le da otro libre (como antes) */}
 if(p===1){if(!r||!r.ok||r.veh!==String(S.vehHoy))return r&&r.wait?'Espera el ok del administrador por la falla del vehículo':'Termina la inspección del vehículo'}
 if(p===2){if(!(num(c.odoIni)>0))return 'Escribe el odómetro';if(typeof REAL!=='undefined'&&REAL&&!sl.odoOk)return 'Confirma el odómetro'}
 if(p===3){if(typeof REAL!=='undefined'&&REAL&&!sl.tankOk)return 'Confirma el nivel del tanque'}
 if(p===4&&FOTOS_OBLIGATORIAS){var nf=FOTOS.filter(function(f){return !(sl.fotos||{})[f[0]]});if(nf.length)return 'Faltan fotos: '+nf.map(function(f){return f[1].toLowerCase()}).join(', ')}
 if(p===5){if(num(sl.R)<=0&&num(sl.M)<=0)return 'Agrega las cajas de roatán o los kilos de macho que cargas';if(num(sl.R)>num(S.inv.maduras))return 'Solo hay '+S.inv.maduras+' cajas maduras en bodega'}
 return ''}
function salPasos124(){if(!salActivo124())return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="sal124hd"]'))return;
 var card=Array.prototype.slice.call(m.children).filter(function(x){return x.classList&&x.classList.contains('card')&&/^Iniciar el día/.test((x.firstElementChild&&x.firstElementChild.textContent)||'')})[0];if(!card)return;
 var cur=salPaso124(),C=salClasifica124(card),hay={},rep1=null;C.R.forEach(function(p){hay[p]=1});
 C.K.forEach(function(el,i){var p=C.R[i];if(p==='cab'){el.classList.add('wz-hide');return}
  if(p==='conf'){if(cur!==2&&cur!==3){el.classList.add('wz-hide');return}var d=el.children;/* [título, odómetro, tanque] */if(d.length>=3){d[cur===2?2:1].classList.add('wz-hide')}return}
  if(p!==cur)el.classList.add('wz-hide')});
 /* lo demás de la pantalla (lo que sigue, aprende, clientes de hoy…) solo en el último paso; "¿Cuánto cargas hoy?" en Carga */
 Array.prototype.slice.call(m.children).forEach(function(x){if(x===card||x.tagName==='H1'||!x.classList)return;var cl=x.classList;if(cl.contains('foot')||cl.contains('hola89')||cl.contains('alert')||cl.contains('pnback'))return;
  if(cl.contains('ahora')||cl.contains('aprende')){x.classList.add('wz-hide');return}if(cl.contains('rep1')){if(cur!==5)x.classList.add('wz-hide');else rep1=x;return}if(cur!==6)x.classList.add('wz-hide')});
 var hd=document.createElement('div');hd.setAttribute('data-x','sal124hd');hd.innerHTML='<b style="font-size:18px">Iniciar el día</b><div class="lbl" style="margin:2px 0 0"><b>Paso '+(cur+1)+' de 7 · '+SAL_P124[cur]+'</b></div><div class="wz-hd">'+SAL_P124.map(function(x,i){return '<i class="'+(i<=cur?'on':'')+'"></i>'}).join('')+'</div>';card.insertBefore(hd,card.firstChild);
 var nota={0:'¿Con qué vehículo sales hoy? Primero el vehículo y después su revisión.',2:'Escribe lo que marca el tablero y tómale foto.',3:'Mueve la aguja a lo que marca el tablero.',4:'Frente, atrás y los dos lados, solo con la cámara.',5:'Lo que de verdad llevas en el vehículo.'}[cur];
 if(nota){var nt=document.createElement('div');nt.className='lbl';nt.style.margin='6px 0';nt.textContent=nota;hd.after(nt)}
 if(rep1){rep1.style.margin='8px 0';var n1=hd.nextSibling;(n1&&n1.classList&&n1.classList.contains('lbl')?n1:hd).after(rep1)}
 if(cur===6){var sl=S.salida,c=S.cierre||{},v=vehHoy(),ff=FOTOS.filter(function(f){return (sl.fotos||{})[f[0]]}).length,rs=document.createElement('div');rs.className='card good';rs.style.margin='8px 0';
  rs.innerHTML='<b>Revisa antes de salir</b>'+rw('Vehículo',esc(v?v.n:'—'))+rw('Inspección',S.inspR&&S.inspR.ok?'✓ lista':'falta')+rw('Odómetro',num(c.odoIni).toLocaleString('es-MX')+' km')+rw('Tanque',esc(c.tankIni||''))+rw('Fotos',ff+' de 4')+rw('Cajas de roatán',num(sl.R))+rw('Kilos de macho',num(sl.M));
  var nt2=hd.nextSibling;(nt2&&nt2.classList&&nt2.classList.contains('lbl')?nt2:hd).after(rs)}
 var nav=document.createElement('div');nav.className='wz-nav';nav.innerHTML=(cur>0?'<button class="btn sec" data-act="sal124p" data-v="'+(cur-1)+'">Atrás</button>':'')+(cur<6?'<button class="btn" data-act="sal124p" data-v="'+(cur+1)+'">Siguiente</button>':'');card.appendChild(nav)}
var _r124=render;render=function(){var r=_r124.apply(this,arguments);try{salPasos124()}catch(e){console.error('sal124',e)}try{salAvisa124()}catch(e){}return r};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="sal124p"]');if(!b)return;e.stopImmediatePropagation();var a=+b.dataset.v,cur=salPaso124();
 if(a>cur){for(var p=cur;p<a;p++){var f=salFalta124(p);if(f){toast(f);try{vibrar([60,40,60])}catch(er){}if(p!==cur){salPon124(p);render()}return}}}
 salPon124(a);render();try{window.scrollTo(0,0)}catch(er){}},true);
/* si "Iniciar reparto" no deja salir por algo de un paso anterior, regresa a ese paso */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="iniciar"]');if(!b||!salActivo124())return;for(var p=0;p<6;p++){if(salFalta124(p)){e.stopImmediatePropagation();e.preventDefault();toast(salFalta124(p));salPon124(p);render();return}}},true);
/* el administrador se entera si el chofer salió en otro vehículo que el asignado */
function salAvisa124(){var o=S.vehOtro124;if(!o||o.avisado||!S.salida||!S.salida.ok||+o.ch!==+S.chofHoy||o.d!==iso(TODAY))return;var v=vehHoy(),de=o.de!=null?vehById(o.de):null;o.avisado=1;
 if(v&&(!de||+de.id!==+v.id))S.avPrecio.push(chofN(S.chofHoy)+' salió en '+v.n+(de?' en lugar de '+de.n+' (el que tiene asignado)':'')+'.')}
