/* ===================== v6.1 · Inicio de ruta: odómetro y tanque confirmados, revisión que se encoge ===================== */
/* la revisión del vehículo, ya terminada, queda chiquita */
/* inspRepHTML: pasó a tema-vehiculos.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="inspver"],[data-act="inspoculta"]');if(!b)return;e.stopImmediatePropagation();S.inspVer=b.dataset.act==='inspver';render()},true);
/* odómetro y tanque: el chofer los tiene que confirmar */
function salConfHTML(){if(S.role!=='rep'||S.salida.ok)return '';var s=S.salida,c=S.cierre||{};
 return '<div class="card note" data-key="salconf" style="padding:10px 12px"><b>Confirma lo que marca el tablero</b>'
  +'<div style="margin-top:8px">'+(s.odoOk?'<span style="color:var(--accent);font-weight:700">✓ Odómetro: '+num(c.odoIni).toLocaleString('es-MX')+' km</span>':'<div class="lbl">Odómetro: viene puesto el último que se registró ('+num(c.odoIni).toLocaleString('es-MX')+' km). Si el tablero marca otro, corrígelo arriba.</div><button class="btn sm" style="margin-top:6px" data-act="salodook">Sí, marca '+num(c.odoIni).toLocaleString('es-MX')+' km</button>')+'</div>'
  +'<div style="margin-top:10px">'+(s.tankOk?'<span style="color:var(--accent);font-weight:700">✓ Tanque: '+esc(c.tankIni||'')+'</span>':'<div class="lbl">Tanque: mueve la aguja a lo que marca el tablero.</div><button class="btn sm" style="margin-top:6px" data-act="saltankok">Sí, el tanque está en '+esc(c.tankIni||'')+'</button>')+'</div></div>'}
/* ruta: pasó a tema-ruta.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='salodook'){e.stopImmediatePropagation();S.salida.odoOk=true;render();return}
 if(a==='saltankok'){e.stopImmediatePropagation();S.salida.tankOk=true;render();return}},true);
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.bind==='cierre.odoIni'&&S.salida)S.salida.odoOk=true},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="iniciar"]');if(!b||S.role!=='rep'||!REAL)return;var s=S.salida,f='';if(!s.odoOk)f='Confirma el odómetro';else if(!s.tankOk)f='Confirma el nivel del tanque';
 if(f){e.stopImmediatePropagation();e.preventDefault();toast(f);try{vibrar([60,40,60])}catch(er){}var el=document.querySelector('[data-key="salconf"]');if(el)el.scrollIntoView({block:'center'})}},true);
