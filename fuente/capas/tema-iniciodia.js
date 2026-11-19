/* ===================== TEMA · Iniciar el día por pasos (nació como tema, 18 nov · punto 124) =====================
   Antes "Iniciar el día" era una sola pantalla larga y la inspección salía ANTES de escoger el vehículo
   (y como la inspección va pegada al vehículo, si el chofer cambiaba de vehículo se borraba y tenía que repetirla).
   Ahora es como el cierre: un paso por pantalla, con "Paso X de 7", Atrás y Siguiente. Orden de Ricardo (18 nov):
   primero lo de AFUERA (se recibe el vehículo estacionado) y después lo de ADENTRO:
     1 Vehículo (y al seguir: "¿Cómo recibes tu equipo?") → 2 Inspección (de ESE vehículo) → 3 Fotos de los 4 lados
     → 4 Odómetro → 5 Gasolina → 6 Carga → 7 Revisar e "Iniciar reparto".
   - No avanza sin lo de cada paso (lo mismo que ya pedía "Iniciar reparto"; nada nuevo obligatorio).
   - Vehículo asignado: "¿Hoy usas este?" y puede escoger otro de los libres; al iniciar se le avisa al administrador.
     El equipo se pregunta DESPUÉS de escoger el vehículo, con las llaves del vehículo que se lleva.
   - Cuando reparte el administrador (S.arOn) también es por pasos. SOLO él puede omitir las fotos ("Omitir las fotos")
     y saltar la inspección (como ya podía); los choferes no.
   - Las cuentas no cambian: el inventario y la carga se registran igual, con el mismo botón "Iniciar reparto" y sus revisiones.
   Se dibuja encima de lo que ya arma la pantalla (como cierrePasos de l32): solo esconde lo que no es del paso.
   Si se cambia algo del inicio del día, se cambia AQUÍ.
   ============================================================================================ */
var SAL_P124=['Vehículo','Inspección','Fotos','Odómetro','Gasolina','Carga','Revisar'];
/* la tarjeta "¿Cuánto cargas hoy?" no tiene relleno propio (solo el título, los números y la franja de abajo): los avisos
   "Todavía no hay datos suficientes" / "no hay con qué calcularlo" se pegaban a la orilla y la última línea se cortaba con la esquina */
(function(){try{var st=document.createElement('style');st.textContent='.card.rep1>:not(.h):not(.bx):not(.ft){padding-left:16px!important;padding-right:16px!important;box-sizing:border-box;overflow-wrap:anywhere}.card.rep1>:last-child:not(.ft):not(.bx){padding-bottom:16px!important}';document.head.appendChild(st)}catch(e){}})();
function salActivo124(){return S.role==='rep'&&S.tab.rep==='ruta'&&S.salida&&!S.salida.ok&&S.chofHoy!=null}
function salAdm124(){return !!S.arOn}
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
/* el equipo: las llaves son las del vehículo que se llevó HOY, no las del asignado (al salir y al regresar, en cualquier celular).
   De dónde se sabe, en este orden:
   1) lo que el chofer registró al recibir su equipo hoy (S.eqDia, va en la nube): la llave "v<id>" que se llevó;
   2) si es la ruta que está abierta en este celular (S.chofHoy) y ya tiene vehículo: ese (S.vehHoy; también si l90 le dio otro por estar ocupado);
   3) si no, el asignado (como antes). Solo cambia si el chofer TIENE vehículo asignado (si no, no hay llaves en su equipo). */
function eqVehDia124(ch){try{var sa=(eqRegDe(ch)||{}).salida,est=sa&&sa.est;if(est){var k=Object.keys(est).filter(function(x){return /^v\d+$/.test(x)})[0];if(k&&vehById(+k.slice(1)))return +k.slice(1)}}catch(e){}
 try{if(+ch===+S.chofHoy&&S.vehHoy!=null&&vehById(+S.vehHoy))return +S.vehHoy}catch(e){}return null}
if(typeof eqDe==='function'){var _eqDe124=eqDe;eqDe=function(ch){var L=_eqDe124.apply(this,arguments);try{var i=-1;L.forEach(function(it,j){if(it.vid!=null)i=j});if(i<0)return L;var vid=eqVehDia124(ch);if(vid==null||+vid===+L[i].vid)return L;var v=vehById(+vid);L=L.slice();L[i]={k:'v'+v.id,n:'Llaves de '+v.n,vid:v.id}}catch(e){}return L}}
/* el equipo se pregunta al seguir del paso Vehículo (antes salía al tocar "Iniciar ruta", sin vehículo escogido); lo usa l50 */
function salEqTarde124(b){return !!(b&&b.dataset&&b.dataset.act==='bienvgo'&&S.role==='rep'&&S.salida&&!S.salida.ok)}
function salEqFalta124(){try{var ch=+S.chofHoy;return eqDe(ch).length>0&&!eqRegDe(ch).salida}catch(e){return false}}
/* qué parte de la tarjeta "Iniciar el día" va en cada paso (por lo que dice; el orden en que la arma la base no cambia) */
var SAL_K124={veh:0,ins:1,fot:2,odo:3,tan:4,car:5,fin:6};
function salClasifica124(card){var K=Array.prototype.slice.call(card.children),R=[],fase='cab',vio=false;
 K.forEach(function(el,i){var t=el.textContent||'';
  if(el.dataset&&el.dataset.key==='salconf'){R.push('conf');return}
  if(i<2&&fase==='cab'){R.push('cab');return}
  if(/Vas en|Te lo asignó|No tienes vehículo asignado|No hay vehículos disponibles|Escoge el vehículo que vas a usar/.test(t)||el.querySelector&&el.querySelector('[data-act="vehpick"],[data-act="veh124otro"],[data-act="veh124asig"]')||(el.dataset&&/veh124/.test(el.dataset.act||''))){fase='veh';vio=true;R.push(SAL_K124.veh);return}
  if(el.classList.contains('field')&&/Odómetro inicial/.test(t)){fase='odo';R.push(SAL_K124.odo);return}
  if(/^Nivel del tanque/.test(t.trim())){fase='tan';R.push(SAL_K124.tan);return}
  if(/^Fotos del vehículo/.test(t.trim())){fase='fot';R.push(SAL_K124.fot);return}
  if(/que cargas/.test(t)){fase='car';R.push(SAL_K124.car);return}
  if(/^En bodega hay/.test(t.trim())){R.push(SAL_K124.car);fase='fin';return}
  if(fase==='cab'||(fase==='veh'&&!vio)){fase='ins';R.push(SAL_K124.ins);return}
  if(fase==='veh'){R.push(SAL_K124.car);return}/* lo que sale entre el vehículo y el odómetro: la sugerencia de carga */
  R.push(SAL_K124[fase]!=null?SAL_K124[fase]:SAL_K124.fin)});
 return {K:K,R:R}}
function salFotosFaltan124(){var sl=S.salida;return FOTOS.filter(function(f){return !(sl.fotos||{})[f[0]]})}
function salFalta124(p){var sl=S.salida,c=S.cierre||{},r=S.inspR;
 if(p===0){if(!vehHoy())return 'Escoge el vehículo';/* si está ocupado, al iniciar l90 le da otro libre (como antes) */}
 if(p===1){if(!r||!r.ok||r.veh!==String(S.vehHoy))return r&&r.wait?'Espera el ok del administrador por la falla del vehículo':'Termina la inspección del vehículo'}
 if(p===2&&FOTOS_OBLIGATORIAS&&!(salAdm124()&&sl.fotoSkip124)){var nf=salFotosFaltan124();if(nf.length)return 'Faltan fotos: '+nf.map(function(f){return f[1].toLowerCase()}).join(', ')+(salAdm124()?' (o toca "Omitir las fotos")':'')}
 if(p===3){if(!(num(c.odoIni)>0))return 'Escribe el odómetro';if(typeof REAL!=='undefined'&&REAL&&!sl.odoOk)return 'Confirma el odómetro'}
 if(p===4){if(typeof REAL!=='undefined'&&REAL&&!sl.tankOk)return 'Confirma el nivel del tanque';if(gasOblig139()&&!(salAdm124()&&sl.fotoSkip124)&&!(sl.fotos&&sl.fotos.gas))return 'Toma la foto del tablero de gasolina'/* 139 */}
 if(p===5){if(num(sl.R)<=0&&num(sl.M)<=0)return 'Agrega las cajas de roatán o los kilos de macho que cargas';if(num(sl.R)>num(S.inv.maduras))return 'Solo hay '+S.inv.maduras+' cajas maduras en bodega'}
 return ''}
function salPasos124(){if(!salActivo124())return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="sal124hd"]'))return;
 var card=Array.prototype.slice.call(m.children).filter(function(x){return x.classList&&x.classList.contains('card')&&/^Iniciar el día/.test((x.firstElementChild&&x.firstElementChild.textContent)||'')})[0];if(!card)return;
 var cur=salPaso124(),C=salClasifica124(card),rep1=null,adm=salAdm124(),sl=S.salida;
 C.K.forEach(function(el,i){var p=C.R[i];if(p==='cab'){el.classList.add('wz-hide');return}
  if(p==='conf'){if(cur!==SAL_K124.odo&&cur!==SAL_K124.tan){el.classList.add('wz-hide');return}var d=el.children;/* [título, odómetro, tanque] */if(d.length>=3){d[cur===SAL_K124.odo?2:1].classList.add('wz-hide')}return}
  if(p!==cur)el.classList.add('wz-hide')});
 /* lo demás de la pantalla (lo que sigue, aprende, clientes de hoy…) solo en el último paso; "¿Cuánto cargas hoy?" en Carga */
 Array.prototype.slice.call(m.children).forEach(function(x){if(x===card||x.tagName==='H1'||!x.classList)return;var cl=x.classList;if(cl.contains('foot')||cl.contains('hola89')||cl.contains('alert')||cl.contains('pnback')||cl.contains('ar90b'))return;
  if(cl.contains('ahora')||cl.contains('aprende')){x.classList.add('wz-hide');return}if(cl.contains('rep1')){if(cur!==SAL_K124.car)x.classList.add('wz-hide');else rep1=x;return}if(cur!==SAL_K124.fin)x.classList.add('wz-hide')});
 var hd=document.createElement('div');hd.setAttribute('data-x','sal124hd');hd.innerHTML='<b style="font-size:18px">Iniciar el día</b><div class="lbl" style="margin:2px 0 0"><b>Paso '+(cur+1)+' de 7 · '+SAL_P124[cur]+'</b></div><div class="wz-hd">'+SAL_P124.map(function(x,i){return '<i class="'+(i<=cur?'on':'')+'"></i>'}).join('')+'</div>';card.insertBefore(hd,card.firstChild);
 var nota=['¿Con qué vehículo sales hoy? Primero el vehículo, después lo revisas por fuera y luego por dentro.','Revísalo por fuera, como lo recibes.','Frente, atrás y los dos lados, solo con la cámara.'+(adm?' Tú puedes omitirlas.':''),'Ya adentro: escribe lo que marca el tablero y tómale foto.','Mueve la aguja a lo que marca el tablero.','Lo que de verdad llevas en el vehículo.',''][cur];
 var nt=null;if(nota){nt=document.createElement('div');nt.className='lbl';nt.style.margin='6px 0';nt.textContent=nota;hd.after(nt)}var tras=nt||hd;
 if(rep1){rep1.style.margin='8px 0';tras.after(rep1)}
 if(cur===SAL_K124.fot&&adm){var sk=document.createElement('div');sk.innerHTML=sl.fotoSkip124?'<div class="lbl" style="margin:8px 0"><b>Fotos omitidas</b> (eres administrador) · <button class="link" data-act="sal124fotono">Mejor sí las tomo</button></div>':'<button class="btn sec" style="margin:8px 0" data-act="sal124fskip">Omitir las fotos (eres administrador)</button>';tras.after(sk)}
 if(cur===SAL_K124.fin){var c=S.cierre||{},v=vehHoy(),ff=4-salFotosFaltan124().length,rs=document.createElement('div');rs.className='card good';rs.style.margin='8px 0';
  rs.innerHTML='<b>Revisa antes de salir</b>'+rw('Vehículo',esc(v?v.n:'—'))+rw('Inspección',S.inspR&&S.inspR.ok?(S.inspR.skip?'saltada (administrador)':'✓ lista'):'falta')+rw('Fotos',ff<4&&adm&&sl.fotoSkip124?'omitidas (administrador)':ff+' de 4')+rw('Odómetro',num(c.odoIni).toLocaleString('es-MX')+' km')+rw('Tanque',esc(c.tankIni||''))+rw('Cajas de roatán',num(sl.R))+rw('Kilos de macho',num(sl.M));
  tras.after(rs)}
 var nav=document.createElement('div');nav.className='wz-nav';nav.innerHTML=(cur>0?'<button class="btn sec" data-act="sal124p" data-v="'+(cur-1)+'">Atrás</button>':'')+(cur<6?'<button class="btn" data-act="sal124p" data-v="'+(cur+1)+'">Siguiente</button>':'');card.appendChild(nav)}
var _r124=render;render=function(){var r=_r124.apply(this,arguments);try{salPasos124()}catch(e){console.error('sal124',e)}try{salAvisa124()}catch(e){}return r};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="sal124p"]');if(!b)return;e.stopImmediatePropagation();var a=+b.dataset.v,cur=salPaso124();
 if(a>cur){for(var p=cur;p<a;p++){var f=salFalta124(p);if(f){toast(f);try{vibrar([60,40,60])}catch(er){}if(p!==cur){salPon124(p);render()}return}
   /* al seguir del vehículo: "¿Cómo recibes tu equipo?" (l50 vuelve a tocar Siguiente al terminar) */
   if(p===SAL_K124.veh&&S.role==='rep'&&salEqFalta124()){if(!S.eqov)S.eqov={est:{},sig:'sal124p'};render();return}}}
 salPon124(a);render();try{window.scrollTo(0,0)}catch(er){}},true);
/* el administrador puede omitir las fotos (los choferes no) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="sal124fskip"],[data-act="sal124fotono"]');if(!b)return;e.stopImmediatePropagation();if(!salAdm124())return;
 if(b.dataset.act==='sal124fskip'){S.salida.fotoSkip124=true;salPon124(SAL_K124.odo);toast('Fotos omitidas')}else{S.salida.fotoSkip124=false}render();try{window.scrollTo(0,0)}catch(er){}},true);
/* si "Iniciar reparto" no deja salir por algo de un paso anterior, regresa a ese paso */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="iniciar"]');if(!b||!salActivo124())return;for(var p=0;p<6;p++){if(salFalta124(p)){e.stopImmediatePropagation();e.preventDefault();toast(salFalta124(p));salPon124(p);render();return}}},true);
/* el administrador se entera si el chofer salió en otro vehículo que el asignado */
function salAvisa124(){var o=S.vehOtro124;if(!o||o.avisado||!S.salida||!S.salida.ok||+o.ch!==+S.chofHoy||o.d!==iso(TODAY))return;var v=vehHoy(),de=o.de!=null?vehById(o.de):null;o.avisado=1;
 if(v&&(!de||+de.id!==+v.id))S.avPrecio.push(chofN(S.chofHoy)+' salió en '+v.n+(de?' en lugar de '+de.n+' (el que tiene asignado)':'')+'.')}
