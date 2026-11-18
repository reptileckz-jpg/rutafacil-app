/* ===================== v6.1 · Diseño: separación, tarjetas pintadas, menú que se desliza, Ajustes ordenado,
   fotos de personal (cámara o galería, frente y reverso), guía para empezar y avisos juntos ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* una sola animación al abrir (antes eran dos y parpadeaba) */
 'details.opening>*:not(summary){animation:none!important}',
 /* separación entre tarjetas en toda la app */
 'html body .card+.card,html body .card+details.card,html body details.card+.card,html body details.card+details.card,html body .card+button.card,html body button.card+.card{margin-top:12px}',
 '#dfov .fiw>.card,#crov .fiw>.card,#ubov .card,#cxov .card,#fnov .card{margin-top:12px}',
 /* avisos y encargado: pintados completos */
 '.avl{border-left:0!important;background:color-mix(in srgb, var(--info) 13%, var(--surface))!important}.avl.r{background:color-mix(in srgb, var(--danger) 13%, var(--surface))!important}.avl.o{background:color-mix(in srgb, var(--orange) 14%, var(--surface))!important}.enc{border-left:0!important;background:color-mix(in srgb, var(--muted) 12%, var(--surface))!important}',
 /* menú de la izquierda: entra y sale deslizándose */
 '@keyframes drIn{from{transform:translateX(-104%)}to{transform:none}}@keyframes drOut{from{transform:none}to{transform:translateX(-104%)}}@keyframes drBgIn{from{background-color:rgba(0,0,0,0)}}@keyframes drBgOut{to{background-color:rgba(0,0,0,0)}}',
 '.drawer>nav{animation:drIn .26s cubic-bezier(.2,.8,.2,1) both}.drawer{animation:drBgIn .26s ease both}',
 '.drawer.cerrando>nav{animation:drOut .22s ease both}.drawer.cerrando{animation:drBgOut .22s ease both;pointer-events:none}',
 /* Ajustes: tarjetas compactas */
 '#ajov details[data-k="ajcredd"] .field,#ajov details[data-k="ajmind"] .field{padding:6px 0}#ajov details[data-k="ajcredd"] .field label,#ajov details[data-k="ajmind"] .field label{font-size:14px;line-height:1.25}',
 '#ajov details[data-k="ajcredd"] input,#ajov details[data-k="ajmind"] input{width:96px}',
 /* fotos de personal */
 '.chfotos{flex-wrap:wrap}.chfotos>div{flex:1 1 30%;min-width:96px}.chfbtn{display:flex;gap:4px;margin-top:4px}.chfbtn label{flex:1;font-size:12px!important;padding:0 4px!important;min-height:36px}',
 /* guía para empezar */
 '.guia .paso{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--line);padding:10px 0;color:inherit;font-size:16px;cursor:pointer}.guia .paso:first-of-type{border-top:0}.guia .ck{width:28px;height:28px;border-radius:50%;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;font-weight:800}.guia .paso.hecho .ck{background:var(--accent);border-color:var(--accent);color:#fff}.guia .paso.hecho .t{text-decoration:line-through;color:var(--muted)}'
].join('\n');document.head.appendChild(st)})();
/* ---------- tarjetas pintadas completas (en vez de la orilla de color) ---------- */
function pintaTarjetas(){Array.prototype.forEach.call(document.querySelectorAll('[style*="border-left:"]'),function(el){var s=el.getAttribute('style')||'',m=/border-left:\s*([3-8])px solid ([^;"]+)/.exec(s);if(!m||el.dataset.pint===s)return;var col=m[2].trim();
 el.style.borderLeft='0';el.style.background='color-mix(in srgb, '+col+' 14%, var(--surface))';el.dataset.pint=el.getAttribute('style')})}
var _r35=render;render=function(){var r=_r35.apply(this,arguments);try{pintaTarjetas()}catch(e){}return r};
/* ---------- menú: se mete deslizándose al cerrarlo ---------- */
var _drCerrando=false;
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="menux"],[data-act="usrx"]');if(!b||_drCerrando)return;var d=b.closest('.drawer')||document.querySelector('.drawer');if(!d)return;if(b.classList.contains('drawer')&&e.target.closest('nav'))return;
 e.stopImmediatePropagation();e.preventDefault();_drCerrando=true;d.classList.add('cerrando');setTimeout(function(){_drCerrando=false;if(b.dataset.act==='usrx')S.usrSel=false;else S.menu=false;render()},210)},true);
/* ---------- Ajustes: crédito y "poca fruta" se abren como las demás secciones ---------- */
function ajPliega(h,key,k,tit,sub){var w=document.createElement('div');w.innerHTML=h;var c=w.querySelector('[data-key="'+key+'"]');if(!c)return h;var d=document.createElement('details');d.className='card';d.setAttribute('data-k',k);if(S.dOpen[k])d.setAttribute('open','');
 var sm=document.createElement('summary');sm.innerHTML='<b>'+tit+'</b><span class="lbl">'+sub+'</span>';d.appendChild(sm);var b0=c.querySelector(':scope > b');if(b0)b0.remove();while(c.firstChild)d.appendChild(c.firstChild);c.replaceWith(d);return w.innerHTML}
/* ajHTML: pasó a tema-ajustes.js */
/* ---------- fotos de personal: tomar o subir, y frente/reverso de INE y licencia ---------- */
var _chI35=chImg;chImg=function(c,k,l){var h=_chI35.apply(this,arguments),id='chi_'+c.id+k;
 return h.replace(/<label class="btn sec sm" for="chi_[^"]*"[^>]*>[^<]*<\/label>/,'<div class="chfbtn"><label class="btn sec sm" for="'+id+'c" style="display:flex;align-items:center;justify-content:center;cursor:pointer">📷 Tomar</label><label class="btn sec sm" for="'+id+'" style="display:flex;align-items:center;justify-content:center;cursor:pointer">🖼️ Galería</label></div>')
  .replace(/<\/div>$/,'<input id="'+id+'c" type="file" accept="image/*" capture="environment" data-chimg="'+c.id+':'+k+'" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none"></div>')};
/* fiEmp: pasó a tema-fichas.js */
/* ---------- guía para empezar (admin con la app casi vacía) ---------- */
function guiaPasos(){var hayCh=(S.choferes||[]).some(function(c){return !c.baja&&!esAdm(c)});var acc=typeof NB!=='undefined'&&NB.on?Object.keys(NB.usuarios||{}).some(function(u){var p=NB.usuarios[u];return p&&p.activo&&p.rol==='chofer'}):hayCh;
 return [['Agrega tus clientes','Con su dirección y el día que se les visita','clientes',(S.cli||[]).some(function(c){return !c.oculto&&!c.rapida})],
  ['Agrega a tus proveedores','A quién le compras la fruta','cargas',Object.keys(S.provDir||{}).length>0],
  ['Dale acceso a tu chofer','En Personal → "Accesos a la app"','personal',acc],
  ['Registra tu primera carga','La fruta que compraste','cargas',(S.cargas||[]).length>0],
  ['Pon el precio de hoy','Lo que cobras por caja y por kilo','inicio',!!(S.precio&&num(S.precio.R)>0)],
  ['Haz una ruta de prueba','Entra como chofer y registra una entrega','ruta',(S.rutasHist||[]).length>0||(S.log||[]).length>0]]}
function guiaHTML(){if(S.role!=='admin'||S.guiaOff||!REAL)return '';var P=guiaPasos(),n=P.filter(function(x){return x[3]}).length;if(n===P.length)return '';
 return '<div class="card guia" data-key="guia"><div style="display:flex;align-items:center;gap:8px"><b class="grow" style="font-size:18px">Para empezar</b><span class="pill">'+n+' de '+P.length+'</span></div><div class="lbl">Ve llenando esto y la app empieza a ayudarte con los números, las rutas y los avisos.</div>'
  +P.map(function(x){return '<button class="paso'+(x[3]?' hecho':'')+'" data-act="'+(x[2]==='ruta'?'guiaruta':'tab')+'" data-t="'+x[2]+'"><span class="ck">'+(x[3]?'✓':'')+'</span><span class="grow"><span class="t">'+x[0]+'</span><br><span class="lbl">'+x[1]+'</span></span><span class="lbl">›</span></button>'}).join('')
  +'<button class="link" style="margin-top:6px" data-act="guiaoff">Ya no mostrar</button></div>'}
/* inicio: pasó a tema-inicio.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="guiaoff"],[data-act="guiaruta"]');if(!b)return;e.stopImmediatePropagation();if(b.dataset.act==='guiaoff'){S.guiaOff=true;render();return}S.menu=false;S.usrSel=true;render()},true);
/* ---------- avisos al abrir: uno solo que te lleva a Avisos ---------- */
var _r35b=render;render=function(){if(typeof _toastQ!=='undefined'&&_toastQ.length>1&&!avisoBloq()){var n=_toastQ.length;_toastQ.length=0;setTimeout(function(){toast('Tienes '+n+' avisos nuevos. Míralos en Inicio → Avisos.')},400)}return _r35b.apply(this,arguments)};
