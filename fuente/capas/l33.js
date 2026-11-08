/* ===================== v6.1 · Inicio de ruta: odómetro y tanque confirmados, revisión que se encoge ===================== */
/* la revisión del vehículo, ya terminada, queda chiquita */
var _iR33=inspRepHTML;inspRepHTML=function(){var r=S.inspR,h=_iR33.apply(this,arguments);if(!h||!r||!r.ok||r.preg||r.wait||S.inspVer)return h;
 return '<button class="card good" data-act="inspver" style="width:100%;text-align:left;display:flex;align-items:center;gap:10px;border:0;cursor:pointer"><span style="font-size:22px">✓</span><span class="grow"><b>Revisión del vehículo lista</b><br><span class="lbl">'+(inspFallas(r).length?'Con '+inspFallas(r).length+' cosa(s) reportada(s)':'Todo está bien')+'</span></span><span class="lbl">Ver</span></button>'};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="inspver"],[data-act="inspoculta"]');if(!b)return;e.stopImmediatePropagation();S.inspVer=b.dataset.act==='inspver';render()},true);
/* odómetro y tanque: el chofer los tiene que confirmar */
function salConfHTML(){if(S.role!=='rep'||S.salida.ok)return '';var s=S.salida,c=S.cierre||{};
 return '<div class="card note" data-key="salconf" style="padding:10px 12px"><b>Confirma lo que marca el tablero</b>'
  +'<div style="margin-top:8px">'+(s.odoOk?'<span style="color:var(--accent);font-weight:700">✓ Odómetro: '+num(c.odoIni).toLocaleString('es-MX')+' km</span>':'<div class="lbl">Odómetro: viene puesto el último que se registró ('+num(c.odoIni).toLocaleString('es-MX')+' km). Si el tablero marca otro, corrígelo arriba.</div><button class="btn sm" style="margin-top:6px" data-act="salodook">Sí, marca '+num(c.odoIni).toLocaleString('es-MX')+' km</button>')+'</div>'
  +'<div style="margin-top:10px">'+(s.tankOk?'<span style="color:var(--accent);font-weight:700">✓ Tanque: '+esc(c.tankIni||'')+'</span>':'<div class="lbl">Tanque: mueve la aguja a lo que marca el tablero.</div><button class="btn sm" style="margin-top:6px" data-act="saltankok">Sí, el tanque está en '+esc(c.tankIni||'')+'</button>')+'</div></div>'}
var _ru33=ruta;ruta=function(){var h=_ru33.apply(this,arguments);if(S.role!=='rep'||S.salida.ok)return h;var x=salConfHTML(),i=h.indexOf('<div class="lbl" style="margin:10px 0 6px">Nivel del tanque al salir');
 if(i<0){i=h.indexOf('Fotos del vehículo (');if(i>-1)i=h.lastIndexOf('<div',i)}return i>-1?h.slice(0,i)+x+h.slice(i):h.replace('data-act="iniciar"','data-act="iniciar"')+x};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='salodook'){e.stopImmediatePropagation();S.salida.odoOk=true;render();return}
 if(a==='saltankok'){e.stopImmediatePropagation();S.salida.tankOk=true;render();return}},true);
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.bind==='cierre.odoIni'&&S.salida)S.salida.odoOk=true},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="iniciar"]');if(!b||S.role!=='rep'||!REAL)return;var s=S.salida,f='';if(!s.odoOk)f='Confirma el odómetro';else if(!s.tankOk)f='Confirma el nivel del tanque';
 if(f){e.stopImmediatePropagation();e.preventDefault();toast(f);try{vibrar([60,40,60])}catch(er){}var el=document.querySelector('[data-key="salconf"]');if(el)el.scrollIntoView({block:'center'})}},true);
