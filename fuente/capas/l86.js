/* ===================== v8.6 · 67–70 (17 nov) lo que encontró Ricardo con la 1.0.35
   67 El chofer seguía trabado en "No mandaste tu cierre del sábado":
      - la pantalla se quedaba aunque la ruta ya fuera la de hoy (p. ej. después de liberarla): ahora se quita sola;
      - el admin no veía "Liberar su ruta de hoy" cuando su celular tenía cargada la ruta de ese chofer (así funciona la recepción
        del efectivo): ahora también sale, y libera esa ruta;
      - "Pedir que liberen mi ruta" ahora sale ARRIBA en Inicio del admin, en rojo, con el botón para liberarla.
   68 Taras "no cuadran": las taras que un cliente YA debía al darlo de alta o importarlo se sumaban a lo que hay sin registrarse
      (el archivo de prueba trae 104). Ahora cuentan como saldo inicial; y en Bodega sale la explicación con un botón para corregir.
   69 Numeritos de la barra (Clientes 6, Cargas 4, Más 6): arriba de cada sección sale QUÉ pendientes son, cada uno tocable;
      en "Más", también de qué sección es cada uno. ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.pnd86{border:2px solid #FCA5A5;background:color-mix(in srgb,#DC2626 5%,var(--surface))}.pnd86 .it{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:10px 12px;margin-top:8px;min-height:56px;color:inherit;font:inherit}',
 '.pnd86 .it .tx{flex:1;min-width:0}.pnd86 .it b{display:block;font-size:16px}.pnd86 .it .lbl{display:block}.pnd86 .it .sec{display:inline-block;font-size:12px;font-weight:800;background:#E0E7FF;color:#312E81;border-radius:8px;padding:1px 8px;margin-bottom:2px}',
 '.sos86{border:2px solid #DC2626;background:color-mix(in srgb,#DC2626 8%,var(--surface))}'].join('\n');document.head.appendChild(st)})();
try{if(NB_SH.indexOf('libPide86')<0)NB_SH.push('libPide86')}catch(e){}

/* ---------- 67 · la pantalla se quita sola cuando la ruta ya es la de hoy ---------- */
/* render: pasó a tema-dibujar2.js */
/* el chofer pide que lo liberen: también queda en un dato propio (para la tarjeta roja del admin) */
function libSync86(){if(S.role!=='rep'||S.chofHoy==null||(S.libPide83||'')!==iso(TODAY))return;var P=S.libPide86=S.libPide86||{},o=P[S.chofHoy];if(o&&o.f===iso(TODAY))return;P[S.chofHoy]={f:iso(TODAY),de:S.dia80||S.rutaDia80||''}}
/* rutas que el admin puede liberar: las de otros choferes Y la que tiene cargada en su celular */
/* → movido (tema-rutadia.js) */
/* → libera86 movido a tema-rutadia.js (95: lo que traía se guarda para recibirlo) */
/* la tarjeta del admin (reemplaza a la de la 8.0, que no veía la ruta cargada en su celular) */
/* → movido (tema-rutadia.js) */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="lib86"],[data-act="lib86s"]');if(!b)return;e.stopImmediatePropagation();var id=+b.dataset.id;
 if(b.dataset.act==='lib86'){window._lb86=id;abrirModal('¿Liberar su ruta de hoy?','A '+esc(chofN(id))+' se le arma ya su ruta de hoy. Lo que quedó sin cerrar se guarda en el historial para que lo cuadren.',[['Sí, liberarla','lib86s',' data-id="'+id+'"']]);return}
 S.modal=null;libera86(id);render()},true);
/* "Recordarle" también para la ruta cargada en el celular del admin */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="dia80r"]');if(!b)return;var id=+b.dataset.id;if(+id!==+S.chofHoy||(S.chSt||{})[id])return;e.stopImmediatePropagation();S.rutaAv=S.rutaAv||{};S.rutaAv[id]=(S.rutaAv[id]||[]).concat(['Manda tu cierre '+del80(S.rutaDia80)+' para que te salga tu ruta de hoy.']);toast('Se le avisó a '+chofN(id));render()},true);

/* ---------- 68 · taras que un cliente ya debía = saldo inicial (no "aparecen de la nada") ---------- */
/* nuevoCli: pasó a tema-piezas.js */
function tarasDif86(){try{if(S.cajasT0==null||(S.setup&&!S.setup.fin))return 0;return Math.round(cajasDonde().tot-cajasEsperadas())}catch(e){return 0}}
function tarasCard86(){if(S.role!=='admin'||S.encOn||S.tab.admin!=='bodega')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="tar86"]'))return;var d0=tarasDif86();if(!d0)return;var w=cajasDonde(),esp=Math.round(cajasEsperadas()),cliT=sum(S.cli.filter(function(c){return !c.oculto}),function(c){return num(c.vac)});
 var d=document.createElement('div');d.dataset.x='tar86';d.className='card alert';d.style.padding='12px 14px';
 d.innerHTML='<b style="font-size:18px">Las taras no cuadran: '+(d0>0?'sobran ':'faltan ')+Math.abs(d0)+'</b><div style="font-size:15px;margin-top:4px">Por lugares la app cuenta <b>'+Math.round(w.tot)+'</b> (bodega, camiones y las que deben los clientes: <b>'+cliT+'</b>). Con los movimientos registrados deberían ser <b>'+esp+'</b>.</div>'
  +'<div class="lbl" style="margin-top:6px">Lo más común: al importar o dar de alta clientes con "taras que debe", esas taras no se habían registrado como saldo inicial. Si ya contaste la bodega y lo que deben los clientes está bien, toca el botón.</div>'
  +'<button class="btn" style="margin-top:10px;min-height:54px" data-act="tar86">Lo de ahora está bien: registrar '+(d0>0?'+':'')+d0+' como saldo inicial</button>'
  +'<div class="lbl" style="margin-top:6px">Si no, revisa: Bodega → Taras → "Conteo" (las vacías), y la ficha de cada cliente (las que debe).</div>';m.prepend(d)}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tar86"]');if(!b)return;e.stopImmediatePropagation();var d0=tarasDif86();if(!d0)return;
 S.cajasMov=S.cajasMov||[];S.cajasMov.push({t:'Saldo inicial de taras (taras que ya debían clientes / ajuste)',f:iso(TODAY),n:d0,ini86:1});S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Registró '+(d0>0?'+':'')+d0+' taras como saldo inicial (ya cuadran)'});toast('Listo: las taras ya cuadran');render()},true);

/* ---------- 69 · numeritos: qué pendientes son ---------- */
var SEC86={inicio:'Inicio',bodega:'Bodega',cargas:'Cargas',clientes:'Clientes',gastos:'Gastos',vehiculos:'Vehículos',personal:'Personal',estadisticas:'Estadísticas',bienes:'Bienes',mas:'Más'};
function pend86(t){var nv=document.querySelector('nav.tabs'),enBarra={};if(nv)Array.prototype.forEach.call(nv.querySelectorAll('button[data-t]'),function(b){enBarra[b.dataset.t]=1});
 return avSinEfecto(function(){var A=[];try{A=avisos().filter(function(x){return typeof x==='string'&&!(S.avPos||{})[x]})}catch(e){}
  return A.map(function(x){var d=null;try{d=avDestino(x)}catch(e){}return {x:x,t:(d&&d.t)||'inicio',u:AV_URG.test(x)||(typeof AV_ROJO!=='undefined'&&AV_ROJO.test(x))}}).filter(function(o){return t==='mas'?!enBarra[o.t]&&o.t!=='inicio':o.t===t})})}
function pendCard86(){if(S.role!=='admin'||S.encOn)return;var t=S.tab.admin;if(!t||t==='inicio'||S.rt81||S.cu82)return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="pnd86"]'))return;var L=[];try{L=pend86(t)}catch(e){return}if(!L.length)return;
 L.sort(function(a,b){return (b.u?1:0)-(a.u?1:0)});
 var d=document.createElement('div');d.dataset.x='pnd86';d.className='card pnd86';d.style.padding='12px 14px';
 d.innerHTML='<b style="font-size:18px">🔔 '+L.length+' pendiente'+(L.length===1?'':'s')+(t==='mas'?' en otras secciones':' en '+(SEC86[t]||t))+'</b><div class="lbl">Es el numerito de la barra de abajo. Toca uno para ir a resolverlo.</div>'
  +L.map(function(o){var I={tit:o.x};try{I=avInfo68(o.x)}catch(e){}var tx=String(o.x).replace(/^URGENTE:\s*/i,'').replace(/\s*\[(tel|geo|gps|gpsev|pin):[^\]]*\]/g,'');
   return '<button class="it" data-act="avgo" data-k="'+encodeURIComponent(o.x)+'"><span style="font-size:20px">'+(o.u?'🔴':'🟡')+'</span><span class="tx">'+(t==='mas'?'<span class="sec">'+esc(SEC86[o.t]||o.t)+'</span>':'')+'<b>'+esc(I.tit||tx)+'</b>'+(I.tit&&I.tit!==tx?'<span class="lbl">'+esc(tx.length>110?tx.slice(0,108)+'…':tx)+'</span>':'')+'</span><span class="lbl" style="font-size:20px">›</span></button>'}).join('');
 m.prepend(d)}

/* render: pasó a tema-dibujar2.js */
