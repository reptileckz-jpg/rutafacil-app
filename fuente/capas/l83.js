/* ===================== v8.3 · Rutas más fácil (16 nov, Ricardo: "es muy confuso, se traba, a veces marca dos veces")
   - Marcas clientes y abajo salen DIRECTO los choferes: un toque y listo (solo hoy, o "para siempre" con un interruptor).
   - "Deshacer" unos segundos después de cada cambio.
   - Marcar un cliente ya no vuelve a dibujar toda la app (solo la casilla y la barra): no se traba ni se pierden toques.
   - Un aviso de cambio que llega dos veces ya no mete otra vez a un cliente (aunque ya se le haya entregado). ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#rt81 .bar81 .q83{font-size:17px;font-weight:800;margin-bottom:8px}',
 '#rt81 .bar81 .chs83{display:flex;flex-wrap:wrap;gap:8px}#rt81 .bar81 .chs83 button{flex:1 1 40%;min-height:56px;font-size:17px;font-weight:800;border-radius:14px;border:2px solid var(--line);background:var(--surface);color:var(--fg);display:flex;align-items:center;justify-content:center;gap:8px}',
 '#rt81 .bar81 .chs83 button i{width:12px;height:12px;border-radius:50%;display:inline-block}',
 '#rt81 .bar81 .sw83{display:flex;gap:6px;margin-top:10px}#rt81 .bar81 .sw83 button{flex:1;min-height:42px;border-radius:12px;border:2px solid var(--line);background:var(--bg);font-weight:700;color:var(--fg)}#rt81 .bar81 .sw83 button[aria-pressed="true"]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,var(--surface))}',
 '#rt81 .bar81 .mn83{display:flex;gap:8px;margin-top:8px}#rt81 .bar81 .mn83 button{flex:1;min-height:40px;background:none;border:0;color:var(--muted);text-decoration:underline;font-weight:700}',
 '#rt81 .bar81.ok83{border-top-color:#16A34A}#rt81 .bar81.ok83 .row{align-items:center}'].join('\n');document.head.appendChild(st)})();

/* ---------- la barra de abajo ---------- */
var UNDO83=null;
function bar83(){var R=S.rt81;if(!R)return '';var ks=Object.keys(R.sel||{}),n=ks.length,hoy=R.dia==='hoy';
 if(!n){if(UNDO83&&Date.now()-UNDO83.t<9000&&UNDO83.dia===R.dia)return '<div class="bar81 ok83" id="rt81bar"><div class="row"><span style="flex:1"><b>✓ '+esc(UNDO83.txt)+'</b></span><button class="btn sm sec" data-act="rt83u">Deshacer</button></div></div>';return ''}
 var src=ks.map(function(k){return +k.split('|')[1]}).filter(function(x,i,a){return a.indexOf(x)===i}),CH=chs81().filter(function(c){return !(src.length===1&&src[0]===+c.id)});
 var camino=hoy?chs81().filter(function(c){return salio81(+c.id)}).map(function(c){return chofN(c.id)}):[],m=R.m83==='siempre';
 return '<div class="bar81" id="rt81bar"><div class="q83">'+n+' cliente'+(n===1?'':'s')+' · ¿A quién se '+(n===1?'lo':'los')+' pasas?</div><div class="chs83">'+CH.map(function(c){return '<button data-act="rt83p" data-id="'+c.id+'"><i style="background:'+chCol81(c.id)+'"></i>'+esc(chofN(c.id))+'</button>'}).join('')+'</div>'
  +'<div class="sw83" role="group"><button data-act="rt83m" data-v="dia" aria-pressed="'+!m+'">Solo '+(hoy?'hoy':'mañana')+'</button><button data-act="rt83m" data-v="siempre" aria-pressed="'+m+'">Para siempre</button></div>'
  +(m?'<div class="lbl" style="margin-top:6px">"Para siempre" le cambia su chofer fijo.</div>':'')+(camino.length?'<div class="lbl" style="margin-top:6px">🚚 '+esc(camino.join(' y '))+' ya va'+(camino.length>1?'n':'')+' en camino: le llega un aviso con el cambio.</div>':'')
  +'<div class="mn83"><button data-act="rt81no">'+(hoy?'Hoy no se visita':'Mañana no se visita')+'</button><button data-act="rt83l">Quitar marcas</button></div></div>'}
/* rt81HTML: aquí había una envoltura que no se usaba (l84 rehace rt81HTML completa al cargar); se quitó el 19 nov */
try{if(TUT['n:rt81']&&TUT['n:rt81'][1])TUT['n:rt81'][1][2]='Marca uno o varios clientes y abajo toca el chofer al que se los pasas. Por defecto es solo hoy; si te equivocas, "Deshacer".'}catch(e){}
/* poner la barra sin volver a dibujar toda la app */
function barPon83(){var o=document.getElementById('rt81');if(!o)return;var w=o.querySelector('.w');if(!w)return;var v=document.getElementById('rt81bar'),h=bar83();if(v)v.remove();if(h){var d=document.createElement('div');d.innerHTML=h;w.appendChild(d.firstElementChild)}try{o._h=rt81HTML()}catch(e){}}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#rt81 [data-act="rt81s"]');if(!b||!S.rt81)return;e.preventDefault();e.stopImmediatePropagation();var R=S.rt81,k=b.dataset.k;R.sel=R.sel||{};
 if(R.sel[k])delete R.sel[k];else{Object.keys(R.sel).forEach(function(x){if(x.split('|')[0]===k.split('|')[0])delete R.sel[x]});R.sel[k]=1}UNDO83=null;
 Array.prototype.forEach.call(document.querySelectorAll('#rt81 [data-act="rt81s"]'),function(x){var on=!!R.sel[x.dataset.k];x.setAttribute('aria-pressed',String(on));var c=x.querySelector('.ck');if(c)c.textContent=on?'✓':''});barPon83()},true);
/* pasar, deshacer, interruptor */
function aplica83(dest){var R=S.rt81,f=R.dia==='hoy'?hoy81():man81(),ks=Object.keys(R.sel),prev={},pOv={},o0=Object.keys(((S.rq81||{})[f])||{});
 ks.forEach(function(k){var cid=+k.split('|')[0],c=cl(cid);if(!c)return;prev[cid]=c.chofer;var ov=((S.rutaOv81||{})[f]||{})[cid];pOv[cid]=ov?JSON.parse(JSON.stringify(ov)):null});
 var modo=R.m83==='siempre'?'siempre':'dia',n=ks.length,nom=ks.map(function(k){var c=cl(+k.split('|')[0]);return c?c.n:''}).filter(Boolean);var t0=toast;toast=function(){};try{aplica81(dest,modo)}finally{toast=t0}
 var o1=Object.keys(((S.rq81||{})[f])||{}).filter(function(k){return o0.indexOf(k)<0});
 UNDO83={t:Date.now(),dia:R.dia,f:f,prev:prev,pOv:pOv,ops:o1,dest:dest,txt:(n===1?nom[0]+' pasó':n+' clientes pasaron')+' con '+chofN(dest)+(modo==='siempre'?' (para siempre)':' ('+(R.dia==='hoy'?'solo hoy':'solo mañana')+')')};
 setTimeout(function(){if(UNDO83&&Date.now()-UNDO83.t>=9000){try{barPon83()}catch(e){}}},9100)}
function deshacer83(){var U=UNDO83;if(!U)return;UNDO83=null;var f=U.f,Q=((S.rq81||{})[f])||{};
 Object.keys(U.prev).forEach(function(cid){var c=cl(+cid);if(c)c.chofer=U.prev[cid];S.rutaOv81=S.rutaOv81||{};S.rutaOv81[f]=S.rutaOv81[f]||{};if(U.pOv[cid])S.rutaOv81[f][cid]=U.pOv[cid];else ovPon81(f,+cid,null)});
 U.ops.forEach(function(k){var o=Q[k];if(!o)return;if(!o.hecho){o.hecho=1;o.x83=1}else op81(o.ch,o.op==='add'?'quit':'add',o.c)});
 S.hist.push({t:fmtF(hoy81())+' '+hhmm(),q:quien(),x:'Rutas: deshizo "'+U.txt+'"'});toast('Se deshizo el cambio')}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#rt81 [data-act^="rt83"]');if(!b||!S.rt81)return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act,R=S.rt81;
 if(a==='rt83m'){R.m83=b.dataset.v;barPon83();return}
 if(a==='rt83l'){R.sel={};Array.prototype.forEach.call(document.querySelectorAll('#rt81 [data-act="rt81s"][aria-pressed="true"]'),function(x){x.setAttribute('aria-pressed','false');var c=x.querySelector('.ck');if(c)c.textContent=''});barPon83();return}
 if(a==='rt83p'){if(!Object.keys(R.sel||{}).length)return;aplica83(+b.dataset.id);render();return}
 if(a==='rt83u'){deshacer83();render();return}},true);

/* ---------- el chofer: un aviso repetido ya no mete dos veces al mismo cliente ---------- */
function loc83(){try{return JSON.parse(localStorage.getItem('rq83')||'{}')}catch(e){return {}}}
function locPon83(o){try{var ks=Object.keys(o);if(ks.length>600){ks.slice(0,ks.length-600).forEach(function(k){delete o[k]})}localStorage.setItem('rq83',JSON.stringify(o))}catch(e){}}
/* toma81: pasó a tema-reparte.js */
/* dos paradas PENDIENTES del mismo cliente se juntan en una (las ya entregadas no se tocan: un cliente sí puede pedir dos veces) */
/* render: pasó a tema-dibujar1.js */

/* ---------- 61 · el chofer trabado en "No mandaste tu cierre" (16 nov) ----------
   (1) las pantallas completas se volvían a crear en cada redibujo (con la nube, cada pocos segundos): el botón desaparecía bajo el
       dedo y el toque se perdía. Ahora solo se vuelven a crear si cambió algo.
   (2) si ese día hubo entregas pero nunca se tocó "Iniciar", el cierre te regresaba a "Iniciar el día": ahora deja hacer el cierre.
   (3) salida de emergencia: "Pedir que liberen mi ruta" (le llega URGENTE al administrador).
   (4) "del Antier sábado" → "del sábado". */
/* ovPon70: pasó a tema-navega.js */
/* render: pasó a tema-dibujar1.js */
del80=function(f){if(f===ayer80())return 'de ayer';var t=String(fmtF(f)).replace(/^(Hoy|Ayer|Antier|Antes de ayer)\s+/i,'');return 'del '+t};
/* → movido (tema-rutadia.js) */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="lib83"]');if(!b)return;e.stopImmediatePropagation();S.libPide83=iso(TODAY);(S.avPrecio=S.avPrecio||[]).push('URGENTE: '+chofN(S.chofHoy)+' no puede mandar su cierre '+del80(S.dia80||ayer80())+' y no le sale su ruta de hoy. En Inicio toca "Liberar su ruta de hoy".');
 try{S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Pidió que liberen su ruta de hoy (no pudo mandar su cierre '+del80(S.dia80||ayer80())+')'})}catch(er){}toast('Listo: se le avisó al administrador');render()},true);
