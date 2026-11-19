/* ===================== v6.3 · Varias bodegas en la nube y celulares del negocio (modo administrado) ===================== */
/* ---------- varias bodegas: en la nube "inv"/"lotes" siempre son la bodega 1; las demás viajan en invBx/lotesBx ---------- */
['invBx','lotesBx'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
var _bodProf=0;
function bodEnvuelve(fn){return function(){var b=+(S.bodSel||1);if(_bodProf||b===1||!S.invB||!S.invB[1]){_bodProf++;try{return fn.apply(this,arguments)}finally{_bodProf--}}
 var selI=S.inv,selL=S.lotes;_bodProf++;S.inv=S.invB[1];S.lotes=(S.lotesB&&S.lotesB[1])||S.lotes;
 try{return fn.apply(this,arguments)}finally{_bodProf--;S.invB[1]=S.inv;S.lotesB=S.lotesB||{};S.lotesB[1]=S.lotes;S.invB[b]=selI;S.lotesB[b]=selL;S.inv=selI;S.lotes=selL}}}
['nbCodifica','nbArma','nbEmpuja','nbAplica','nbPrimera','nbUnidades'].forEach(function(n){if(typeof window[n]==='function')window[n]=bodEnvuelve(window[n])});
/* las otras bodegas: mismo objeto en invB y en invBx (lo que cambia en una, cambia en la otra) */
function bodLiga(){if(!S.invB)return;S.invBx=S.invBx||{};S.lotesBx=S.lotesBx||{};var b=+(S.bodSel||1);
 Object.keys(S.invBx).forEach(function(id){if(+id===1)return;var nube=S.invBx[id];if(S.invB[id]!==nube){S.invB[id]=nube;if(b===+id)S.inv=nube}});
 Object.keys(S.lotesBx).forEach(function(id){if(+id===1)return;var nube=S.lotesBx[id];if(S.lotesB&&S.lotesB[id]!==nube){S.lotesB[id]=nube;if(b===+id)S.lotes=nube}});
 Object.keys(S.invB).forEach(function(id){if(+id===1)return;if(S.invBx[id]!==S.invB[id])S.invBx[id]=S.invB[id];if(S.lotesB&&S.lotesBx[id]!==S.lotesB[id])S.lotesBx[id]=S.lotesB[id]})}
/* render: pasó a tema-dibujar1.js */
/* ---------- 70 · celulares del negocio: si la app es la "dueña" del celular, aquí se limitan ---------- */
function natPl49(){var C=window.Capacitor;return C&&C.Plugins&&C.Plugins.RutaNativa||null}
var CEL_R=[['instalar','No dejar instalar apps'],['desinstalar','No dejar desinstalar apps'],['restablecer','No dejar restablecer de fábrica'],['ubicacion','No dejar apagar la ubicación'],['cuentas','No dejar agregar o quitar cuentas']];
function celCardHTML(){var n=natPl49();if(!n||!n.celEstado)return '';var e=S.celE;
 if(!e)return '<details class="card" data-k="ajcel"'+(S.dOpen.ajcel?' open':'')+'><summary><b>Celular del negocio</b><span class="lbl">limitar apps</span></summary><button class="btn sm sec" style="margin-top:8px" data-act="celrev">Revisar este celular</button></details>';
 if(!e.owner)return '<details class="card" data-k="ajcel"'+(S.dOpen.ajcel?' open':'')+'><summary><b>Celular del negocio</b><span class="lbl">no está limitado</span></summary><div class="lbl" style="margin-top:6px">Para poder limitarlo, la app tiene que ser la administradora del celular. Se hace una sola vez, con el celular recién restablecido y <b>sin cuenta de Google</b>:</div><ol class="lbl" style="margin:6px 0 0 18px;padding:0"><li>Activa "Depuración USB" (Ajustes → Acerca del teléfono → toca 7 veces "Número de compilación" → Opciones de desarrollador).</li><li>Instala Ruta Fácil.</li><li>Conéctalo a la computadora y escribe:<br><code style="font-size:12px;word-break:break-all">adb shell dpm set-device-owner com.rutafacil.app/.RutaAdmin</code></li><li>Abre Ruta Fácil → Ajustes → Celular del negocio.</li></ol></details>';
 var A=S.celApps;
 return '<details class="card" data-k="ajcel"'+(S.dOpen.ajcel?' open':'')+'><summary><b>Celular del negocio</b><span class="lbl">✓ administrado por Ruta Fácil</span></summary>'
  +CEL_R.map(function(r){var on=!!(e.restr||{})[r[0]];return '<div class="row"><span>'+r[1]+'</span><button class="btn sm'+(on?'':' sec')+'" style="width:auto" data-act="celr" data-k="'+r[0]+'" data-v="'+(on?0:1)+'">'+(on?'Sí':'No')+'</button></div>'}).join('')
  +'<div class="lbl" style="margin-top:10px"><b>Apps que se ven en el celular</b></div>'+(A?A.map(function(a){return '<div class="row"><span>'+esc(a.nombre)+'</span><button class="btn sm'+(a.oculta?' sec':'')+'" style="width:auto" data-act="celapp" data-p="'+esc(a.pkg)+'" data-v="'+(a.oculta?0:1)+'">'+(a.oculta?'Escondida':'Se ve')+'</button></div>'}).join(''):'<button class="btn sm sec" style="margin-top:6px" data-act="celapps">Ver las apps</button>')
  +'<button class="link" style="margin-top:10px;color:var(--danger)" data-act="cellibera">Quitar todas las limitaciones (y dejar de administrarlo)</button></details>'}
/* ajHTML: pasó a tema-ajustes.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,n=natPl49();if(!/^cel/.test(a)||!n)return;e.stopImmediatePropagation();
 var rev=function(){n.celEstado().then(function(r){S.celE=r;S.dOpen.ajcel=true;render()},function(er){toast('No se pudo revisar: '+(er&&er.message||''))})};
 if(a==='celrev'){rev();return}
 if(a==='celr'){n.celRestringe({clave:b.dataset.k,on:b.dataset.v==='1'}).then(rev,function(er){toast('No se pudo: '+(er&&er.message||''))});return}
 if(a==='celapps'){n.celApps().then(function(r){S.celApps=r.lista||[];render()},function(){toast('No se pudieron leer las apps')});return}
 if(a==='celapp'){n.celOcultar({pkg:b.dataset.p,oculta:b.dataset.v==='1'}).then(function(){(S.celApps||[]).forEach(function(x){if(x.pkg===b.dataset.p)x.oculta=b.dataset.v==='1'});render()},function(er){toast('No se pudo: '+(er&&er.message||''))});return}
 if(a==='cellibera'){abrirModal('¿Quitar las limitaciones?','El celular vuelve a ser normal: se pueden instalar apps y Ruta Fácil deja de administrarlo. Para volver a limitarlo hay que repetir el paso con la computadora.',[['Sí, quitarlas','celliberasi']]);return}
 if(a==='celliberasi'){S.modal=null;n.celLiberar().then(function(){S.celE=null;S.celApps=null;toast('Listo, el celular ya no está limitado');render()},function(er){toast('No se pudo: '+(er&&er.message||''))});return}},true);
