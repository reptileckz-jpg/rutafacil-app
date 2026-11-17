/* ===================== v4.0 · Lo que encontró Ricardo en la v3.9 ===================== */
(function(){var css=[
 /* ficha del vehículo: foto grande arriba y placa chica junto al nombre */
 '#fiov .fihero.fivh{padding:0;overflow:hidden;gap:0;align-items:stretch;text-align:left}',
 '#fiov .fihero.fivh .fiimg.big{max-height:none;height:220px;border-radius:0;cursor:zoom-in}',
 '#fiov .fivrow{display:flex;gap:12px;align-items:center;padding:12px 14px}',
 '#fiov .fivrow .plate.mini{width:120px;max-width:120px;flex:none;margin:0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.18))}',
 '#fiov .fivh>div:last-child:not(.fivrow){padding:0 14px 12px}',
 /* las 5 pestañas caben a la vista */
 '#fiov .fitabs{overflow:visible;gap:5px}',
 '#fiov .fitabs button{flex:1 1 0;min-width:0;padding:4px 3px;font-size:13px;line-height:1.15;white-space:normal}',
 /* lista de vehículos: foto más grande, placa más chica, foto borrosa de fondo */
 '.vcard .plate.mini{max-width:84px}',
 '.vcard.vbg{position:relative;overflow:hidden;isolation:isolate}.vcard.vbg::before{content:"";position:absolute;top:0;right:0;bottom:0;width:64%;background:var(--vbg,none) center/cover no-repeat;-webkit-mask-image:linear-gradient(90deg,transparent 0%,rgba(0,0,0,.55) 45%,#000 100%);mask-image:linear-gradient(90deg,transparent 0%,rgba(0,0,0,.55) 45%,#000 100%);opacity:.5;z-index:-1;pointer-events:none}',
 'html[data-theme="dark"] .vcard.vbg::before{opacity:.38}',
 '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .vcard.vbg::before{opacity:.38}}',
 /* la barra de abajo: si está escondida, se crea ya escondida (antes aparecía y se volvía a esconder) */
 'html.navhid nav.tabs{transform:translateY(calc(100% + 40px));opacity:0;pointer-events:none}',
 '@media (min-width:1000px){html:not(.as-phone).navhid nav.tabs{transform:none!important;opacity:1!important;pointer-events:auto!important}}',
 /* dibujos junto a su título */
 '.tic{height:34px;width:auto;vertical-align:middle;margin-right:8px;display:inline-block;flex:none}',
 'b.tt{display:inline-flex;align-items:center}',
 '.tic.sm{height:26px;margin-right:6px}.tic.lg{height:42px;margin-right:10px;vertical-align:-10px}',
 /* fotos en grande */
 '#fiov img.zoomable,main img.zoomable,.modal img.zoomable{cursor:zoom-in}',
 '#fotov{position:fixed;inset:0;z-index:96;background:#000;display:flex;align-items:center;justify-content:center;touch-action:none;overflow:hidden;animation:fvIn .18s ease}',
 '@keyframes fvIn{from{opacity:0}to{opacity:1}}',
 '#fotov img{max-width:100%;max-height:100%;transform-origin:0 0;user-select:none;-webkit-user-drag:none;will-change:transform}',
 '#fotov .fvx{position:absolute;top:calc(12px + env(safe-area-inset-top));right:12px;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.2);color:#fff;font-size:26px;border:0;z-index:2}',
 '#fotov .fvh{position:absolute;bottom:calc(16px + env(safe-area-inset-bottom));left:0;right:0;text-align:center;color:rgba(255,255,255,.75);font-size:13px;pointer-events:none}',
 /* logo del ticket */
 '.tklogo{width:150px;display:block;margin:0 auto 8px;background:#fff;border-radius:10px;padding:6px}',
 /* recordatorio de deslizar */
 '#swhint{position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:60;background:rgba(22,32,15,.92);color:#fff;border-radius:999px;padding:10px 18px 10px 12px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.25);pointer-events:none;animation:shIn .25s ease;max-width:calc(100% - 32px);width:max-content;line-height:1.25}',
 '#swhint svg{width:30px;height:30px;flex:none;animation:shSwipe 1.1s ease-in-out infinite}',
 '@keyframes shSwipe{0%,100%{transform:translateX(-5px) rotate(-8deg)}50%{transform:translateX(7px) rotate(8deg)}}',
 '#swhint.out{opacity:0;transition:opacity .3s}',
 '@keyframes shIn{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}',
 '.pnback{align-self:flex-start;min-height:44px;font-weight:700;font-size:16px;margin-bottom:4px}',
 '.flashsc{animation:flashsc 1.4s ease}@keyframes flashsc{0%,60%{box-shadow:0 0 0 3px var(--banana)}100%{box-shadow:var(--sh)}}'
];var st=document.createElement('style');st.textContent=css.join('\n');document.head.appendChild(st)})();
IMG.plw="__IMG_platanos_w__";

/* ---- Llantas y frenos: aproximado y en tiempo ---- */
function kmDiaV(v){var h=(v&&v.hist||[]).filter(function(x){return num(x.km)>0&&x.d}).slice(-30);
 if(h.length>=5){var d0=new Date(h[0].d+'T12:00:00'),d1=new Date(h[h.length-1].d+'T12:00:00'),dias=Math.max(1,Math.round((d1-d0)/864e5)+1);return sum(h,function(x){return num(x.km)})/dias}
 var m=num(v&&v.kmMes);return m>0?m/30:0}
function kmRed(k){k=Math.abs(k);var r=k<1000?100:(k<10000?500:1000);return Math.max(r,Math.round(k/r)*r).toLocaleString('es-MX')}
function tiempoAprox(d){if(!(d>0))return '';if(d<1.5)return 'como un día';if(d<7)return 'como '+Math.round(d)+' días';
 if(d<30){var w=Math.round(d/7);return w<=1?'como una semana':'como '+w+' semanas'}
 if(d<548){var m=Math.round(d/30);return m<=1?'como un mes':'como '+m+' meses'}var y=Math.round(d/365);return y<=1?'como un año':'como '+y+' años'}
function kmAprox(km,v){km=Math.round(num(km));if(km<=0)return km<-50?'Ya toca (se pasó unos '+kmRed(km)+' km)':'Ya toca';var t=tiempoAprox(km/(kmDiaV(v)||0));return 'Faltan unos '+kmRed(km)+' km'+(t?' · '+t:'')}

/* ---- Lista de vehículos: foto más grande y de fondo ---- */
var _vbgC={};
function vbgMini(v){if(!v||!v.foto)return null;var k=v.id+':'+v.foto.length;if(_vbgC[k]!==undefined)return _vbgC[k];_vbgC[k]=null;
 var im=new Image();im.onload=function(){try{var cv=document.createElement('canvas');var CW=420,CH=Math.round(420*im.height/im.width);cv.width=CW;cv.height=CH;var cx=cv.getContext('2d');try{cx.filter='blur(1.5px)'}catch(e){}cx.drawImage(im,0,0,CW,CH);_vbgC[k]=cv.toDataURL('image/jpeg',.8);vbgPon()}catch(e){_vbgC[k]=v.foto;vbgPon()}};im.src=v.foto;return null}
function vbgPon(){Array.prototype.forEach.call(document.querySelectorAll('.vcard.vbg[data-id]'),function(el){var v=S.veh.filter(function(x){return x.id===+el.dataset.id})[0];var u=vbgMini(v);if(u)el.style.setProperty('--vbg','url('+u+')')})}
/* vehBasic: pasó a tema-vehiculos.js */

/* ---- Barra de abajo sin parpadeo ---- */
/* 104 · solo se toca la clase si de verdad cambia: escribirla en cada movimiento hacía que celulares lentos repintaran toda la pantalla (destello con la burbuja de arriba) */
function navSync(){try{if(S.tut)navHid=false;var de=document.documentElement,on=!!navHid;if(de.classList.contains('navhid')!==on)de.classList.toggle('navhid',on)}catch(e){}}
window.addEventListener('scroll',navSync,{passive:true});
document.addEventListener('click',function(){setTimeout(navSync,0)},true);

/* ---- Fotos en grande: tocar una foto la abre en pantalla completa ---- */
function fotoZoomable(im){if(!im||im.tagName!=='IMG'||im.closest('#fotov,#tutov,#pinov,nav,header,label,[data-act],a,.tklogo'))return false;if(im.classList.contains('tic'))return false;
 if(!im.getAttribute('alt'))return false;var r=im.getBoundingClientRect();return r.width>=56&&r.height>=40}
function fotoAbrir(src){var o=document.getElementById('fotov');if(o)o.remove();o=document.createElement('div');o.id='fotov';o.setAttribute('role','dialog');o.setAttribute('aria-label','Foto en grande');
 o.innerHTML='<img alt="" src="'+src+'"><button class="fvx" aria-label="Cerrar">✕</button><div class="fvh">Pellizca para acercar · desliza hacia abajo para cerrar</div>';document.body.appendChild(o);
 var img=o.querySelector('img'),z={s:1,x:0,y:0},P={},p0=null,dy=0,lastTap=0,base=null;
 function pon(an){img.style.transition=an?'transform .2s ease':'none';img.style.transform='translate('+z.x+'px,'+z.y+'px) scale('+z.s+')';o.style.background=z.s===1&&dy?'rgba(0,0,0,'+Math.max(.3,1-Math.abs(dy)/400)+')':'#000'}
 function medir(){var r=img.getBoundingClientRect();base={l:r.left-z.x,t:r.top-z.y,w:r.width/z.s,h:r.height/z.s}}
 function limitar(){if(z.s<=1){z.s=1;z.x=0;z.y=0;return}var W=window.innerWidth,H=window.innerHeight,w=base.w*z.s,h=base.h*z.s;
  var minX=Math.min(0,W-(base.l+w)),maxX=Math.max(0,-base.l);if(w<=W){minX=maxX=(W-w)/2-base.l}z.x=Math.max(minX,Math.min(maxX,z.x));
  var minY=Math.min(0,H-(base.t+h)),maxY=Math.max(0,-base.t);if(h<=H){minY=maxY=(H-h)/2-base.t}z.y=Math.max(minY,Math.min(maxY,z.y))}
 function zoomEn(s,cx,cy){if(!base)medir();var ix=(cx-base.l-z.x)/z.s,iy=(cy-base.t-z.y)/z.s;z.s=Math.max(1,Math.min(5,s));z.x=cx-base.l-ix*z.s;z.y=cy-base.t-iy*z.s}
 function cerrar(){o.remove();document.removeEventListener('keydown',tecla,true)}
 function tecla(e){if(e.key==='Escape'){e.stopPropagation();cerrar()}}
 document.addEventListener('keydown',tecla,true);
 img.onload=function(){z={s:1,x:0,y:0};pon();medir()};if(img.complete)setTimeout(medir,0);
 o.querySelector('.fvx').addEventListener('click',function(e){e.stopPropagation();cerrar()});
 o.addEventListener('pointerdown',function(e){if(e.target.closest('.fvx'))return;e.stopPropagation();try{o.setPointerCapture(e.pointerId)}catch(x){}P[e.pointerId]={x:e.clientX,y:e.clientY};if(!base)medir();
  var k=Object.keys(P);if(k.length===2){var a=P[k[0]],b=P[k[1]];p0={d:Math.hypot(a.x-b.x,a.y-b.y),s:z.s,mx:(a.x+b.x)/2,my:(a.y+b.y)/2,x:z.x,y:z.y}}else p0={x0:e.clientX,y0:e.clientY,x:z.x,y:z.y}});
 o.addEventListener('pointermove',function(e){if(!P[e.pointerId])return;e.stopPropagation();P[e.pointerId]={x:e.clientX,y:e.clientY};var k=Object.keys(P);
  if(k.length>=2&&p0&&p0.d){var a=P[k[0]],b=P[k[1]],d=Math.hypot(a.x-b.x,a.y-b.y),mx=(a.x+b.x)/2,my=(a.y+b.y)/2;z.s=p0.s;z.x=p0.x;z.y=p0.y;zoomEn(p0.s*d/p0.d,p0.mx,p0.my);z.x+=mx-p0.mx;z.y+=my-p0.my;pon()}
  else if(k.length===1&&p0&&p0.x0!=null){if(z.s>1){z.x=p0.x+e.clientX-p0.x0;z.y=p0.y+e.clientY-p0.y0;pon()}else{dy=e.clientY-p0.y0;img.style.transition='none';img.style.transform='translateY('+dy+'px)';pon_bg()}}});
 function pon_bg(){o.style.background='rgba(0,0,0,'+Math.max(.3,1-Math.abs(dy)/400)+')'}
 function fin(e){if(!P[e.pointerId])return;e.stopPropagation();var tap=p0&&p0.x0!=null&&Math.abs(e.clientX-p0.x0)<10&&Math.abs(e.clientY-p0.y0)<10;delete P[e.pointerId];
  if(Object.keys(P).length)return;
  if(z.s===1&&Math.abs(dy)>110){cerrar();return}
  if(tap){var t=Date.now();if(t-lastTap<320){if(z.s>1){z={s:1,x:0,y:0}}else zoomEn(2.5,e.clientX,e.clientY);limitar();dy=0;pon(true);lastTap=0;return}lastTap=t}
  dy=0;limitar();pon(true);o.style.background='#000';p0=null}
 o.addEventListener('pointerup',fin);o.addEventListener('pointercancel',fin);
 ['touchstart','touchmove','touchend','click','wheel'].forEach(function(t){o.addEventListener(t,function(e){if(t!=='click'||!e.target.closest('.fvx'))e.stopPropagation();if(t==='wheel'){e.preventDefault();if(!base)medir();zoomEn(z.s*(e.deltaY<0?1.15:1/1.15),e.clientX,e.clientY);limitar();pon()}},{passive:false})});
 return o}
document.addEventListener('click',function(e){var im=e.target;if(!fotoZoomable(im))return;e.preventDefault();e.stopImmediatePropagation();fotoAbrir(im.currentSrc||im.src)},true);

/* ---- Ticket con el logo ---- */
var TK_IMG=new Image();TK_IMG.src=IMG.tk;
function tkSinNombre(){return /pl[aá]tanos\s+nietos/i.test(String(S.cfg.nombre||''))}
var _nbL9=notaBlock;notaBlock=function(){var h=_nbL9.apply(this,arguments);if(!h)return h;
 h=h.replace('<img src="'+LOGO+'" alt="" style="width:90px;display:block;margin:0 auto 6px">','<img src="'+IMG.tk+'" alt="Plátanos Nietos" class="tklogo">');
 if(tkSinNombre())h=h.replace('<div style="text-align:center;font-weight:700;font-size:16px">'+esc(String(S.cfg.nombre).toUpperCase())+'</div>','');return h};
notaImg=function(n){var it=notaItems(n);if(tkSinNombre()&&it[0]&&it[0].t==='c'&&it[0].s===String(S.cfg.nombre).toUpperCase())it=it.slice(1);
 var W=440,LW=170,LH=Math.round(LW*666/640),y0=LH+40,H=y0+it.length*28+10,cv=document.createElement('canvas');cv.width=W;cv.height=H;var cx=cv.getContext('2d');
 cx.fillStyle='#fff';cx.fillRect(0,0,W,H);try{if(TK_IMG.complete&&TK_IMG.naturalWidth)cx.drawImage(TK_IMG,W/2-LW/2,12,LW,LH)}catch(e){}cx.fillStyle='#111';var y=y0;
 it.forEach(function(x){cx.font=(x.b?'bold ':'')+'15px monospace';
  if(x.t==='hr'){cx.fillRect(20,y-12,W-40,1)}
  else if(x.t==='c'){cx.textAlign='center';cx.font=(x.b?'bold 19px':'15px')+' monospace';cx.fillText(x.s,W/2,y)}
  else{cx.fillStyle=x.c==='neg'?'#B3261E':(x.c==='ok'?'#2F7D32':'#111');cx.textAlign='left';cx.fillText(x.k,20,y);cx.textAlign='right';cx.fillText(x.v,W-20,y);cx.fillStyle='#111'}
  y+=28});
 return cv.toDataURL('image/png')};

/* ---- Cada aviso lleva a su lugar (antes algunos solo subían hasta arriba de Inicio) ---- */
function reEsc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
/* avDestino: pasó a tema-avisos.js */
/* "Qué hacer hoy": si la tarea está en la misma pantalla, baja hasta ella en lugar de subir hasta arriba */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="popgo"]');if(!b)return;var D=b.dataset;
 if(D.t!==S.tab[S.role]||D.x||D.p||D.s||D.c||D.h||D.pop)return;e.stopImmediatePropagation();
 var row=b.closest('.row'),hk=row&&row.querySelector('[data-act="hoyok"]'),k=hk?hk.dataset.k:'',tg=null;
 if(k==='cj'){S.dOpen.cajadia=true;render();tg=document.querySelector('main details[data-k="cajadia"]')}
 else if(/^pp/.test(k)){tg=Array.prototype.slice.call(document.querySelectorAll('main .card')).filter(function(c){return /^Pagos por hacer/.test((c.textContent||'').trim())})[0]}
 if(tg){tg.scrollIntoView({block:'start'});window.scrollBy(0,-12);tg.classList.remove('flashsc');void tg.offsetWidth;tg.classList.add('flashsc')}},true);

/* ---- Pantallas sin barra de abajo: siempre un botón para regresar ---- */
function pnBackHTML(){var r=S.role,t=S.tab[r];if(S.vf)return '';
 if(r==='rep'&&(t==='cierre'||t==='nota'))return '<button class="link pnback" data-act="tab" data-t="ruta">← Volver a la ruta</button>';
 if(r==='admin'&&t==='cierreadm')return '<button class="link pnback" data-act="tab" data-t="inicio">← Volver a Inicio</button>';return ''}

/* ---- Al entrar con el PIN: recordatorio de que se puede deslizar entre pantallas ---- */
var _swhT=null,_swhN=0;
function swHintTapado(){return !!(document.querySelector('#cajov,#pinov,#setov,#tutov,#fotov,[aria-label="Aviso urgente"],.sheet')||S.modal||S.confirm||S.menu||S.aj)}
function swHint(re){if(window.__pnTest&&!window.__pnHint)return;if(!re)_swhN=0;if(_pin&&_pin.modo||S.tut||document.getElementById('setov')||document.documentElement.classList.contains('onecol'))return;
 if(swHintTapado()){if(++_swhN<120)setTimeout(function(){swHint(true)},500);return}
 var o=document.getElementById('swhint');if(o)o.remove();o=document.createElement('div');o.id='swhint';o.setAttribute('role','status');
 o.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 22V8a3 3 0 0 1 6 0v12l2-1a3 3 0 0 1 4 1l1 2 1-.5a3 3 0 0 1 4 1.5l.6 1.4a3 3 0 0 1 4 2L42 34c0 7-5 12-12 12h-3c-4 0-7-2-9-5l-7-10a3 3 0 0 1 5-3z" fill="#fff" stroke="#1E2A1A" stroke-width="2.2" stroke-linejoin="round"/></svg><span>Desliza ← → para cambiar de pantalla</span>';
 document.body.appendChild(o);clearTimeout(_swhT);_swhT=setTimeout(swHintQuita,2600)}
function swHintQuita(){var o=document.getElementById('swhint');if(!o)return;o.classList.add('out');setTimeout(function(){if(o.parentNode)o.remove()},320)}
document.addEventListener('pointerdown',function(){if(document.getElementById('swhint')){clearTimeout(_swhT);swHintQuita()}},true);

/* ---- render: todo lo de arriba ---- */
var _rL9=render;render=function(){navSync();_rL9.apply(this,arguments);try{navSync();var m=document.querySelector('main');
 vbgPon();
 /* dibujos junto a su título */
 if(m){var pt=m.querySelector('.card.deco-pl b.tt');if(pt&&!pt.querySelector('.tic')&&/Precio de hoy/.test(pt.textContent)){var pc=pt.closest('.card');pt.insertAdjacentHTML('afterbegin','<img class="tic" alt="" src="'+(pc&&pc.classList.contains('pfix')?IMG.plw:IMG.pl)+'">')}
  var cj=m.querySelector('.card.deco-pl.dcaja .big');if(cj&&!cj.parentNode.querySelector('.tic'))cj.insertAdjacentHTML('beforebegin','<img class="tic lg" alt="" src="'+IMG.caja+'">');
  Array.prototype.forEach.call(m.querySelectorAll('.card.dcaja:not(.deco-pl)>b:first-child'),function(b){if(!b.querySelector('.tic')&&/^Cajas/.test(b.textContent))b.insertAdjacentHTML('afterbegin','<img class="tic" alt="" src="'+IMG.caja+'">')});
  Array.prototype.forEach.call(m.querySelectorAll('.card.dban:not(.deco-pl)>.lbl:first-child'),function(b){if(!b.querySelector('.tic')&&/^Existencias/.test(b.textContent))b.insertAdjacentHTML('afterbegin','<img class="tic sm" alt="" src="'+IMG.pl+'">')});
  /* botón para regresar */
  var bk=pnBackHTML();if(bk&&!m.querySelector('.pnback'))m.insertAdjacentHTML('afterbegin',bk)}
 /* cantidades con comas también en las ventanas que se ponen encima (cierre de caja de ayer, asistente, fichas) */
 try{fmtInputs()}catch(e){}
 /* las fotos que se pueden ver en grande */
 Array.prototype.forEach.call(document.querySelectorAll('#fiov img,main img,.modal img'),function(im){if(!im.classList.contains('zoomable')&&fotoZoomable(im))im.classList.add('zoomable')});
}catch(e){console.error(e)}};

/* ===================== v4.0 · Logo del negocio, bienvenida animada ===================== */
(function(){var css=[
 '.logocard .lgs{display:flex;gap:10px;margin-top:8px}',
 '.logocard .lg{flex:1;min-width:0;text-align:center;display:flex;flex-direction:column;gap:6px}',
 '.logocard .lgv{height:92px;border-radius:12px;border:1.5px dashed var(--line);display:flex;align-items:center;justify-content:center;background:#fff;overflow:hidden;font-size:12px;color:#6b7280}',
 '.logocard .lgv img{max-width:100%;max-height:100%;object-fit:contain}',
 '#bienv{position:fixed;inset:0;z-index:82;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center;cursor:pointer}',
 '#bienv .bv-scene{position:relative;width:min(420px,92vw);aspect-ratio:1970/830;overflow:visible}',
 '#bienv .bv-cam{position:absolute;left:27.1%;top:4.3%;width:71%;animation:bvIn 1.5s cubic-bezier(.2,.8,.25,1) both}',
 '#bienv .bv-caj{position:absolute;left:1.2%;top:37.8%;width:25.4%;animation:bvDrop .55s cubic-bezier(.3,1.35,.5,1) 1.45s both}',
 '#bienv .bv-road{position:absolute;left:0;right:0;bottom:2.5%;height:3px;border-radius:3px;background:#1E5631;animation:bvFade .4s ease both}',
 '@keyframes bvIn{from{transform:translateX(-140%)}70%{transform:translateX(2%)}to{transform:translateX(0)}}',
   '#bienv .bv-w{transform-box:fill-box;transform-origin:center;animation:bvSpin .35s linear 4}',
 '@keyframes bvSpin{to{transform:rotate(360deg)}}',
 '#bienv .bv-c{transform-box:fill-box;animation:bvDrop .5s cubic-bezier(.3,1.4,.5,1) both}',
 '@keyframes bvDrop{from{transform:translateY(-70px);opacity:0}to{transform:none;opacity:1}}',
 '#bienv h1{margin:6px 0 0;font-size:26px;animation:bvFade .5s ease 1.7s both}',
 '#bienv p{margin:0;max-width:320px;font-size:16px;color:var(--muted,#55604f);animation:bvFade .5s ease 2.1s both}',
 '#bienv{cursor:default}',
 '#bienv .bv-go{margin-top:18px;min-height:64px;width:min(320px,86vw);font-size:22px;font-weight:900;border-radius:999px;box-shadow:0 10px 24px rgba(47,125,50,.35);animation:bvFade .5s ease 2.4s both,bvBrinca 1.6s ease-in-out 3s infinite}',
 '@keyframes bvBrinca{0%,100%{transform:translateY(0)}45%{transform:translateY(-9px)}60%{transform:translateY(0)}72%{transform:translateY(-3px)}}',
 '#bienv .bv-pl{position:absolute;left:8%;bottom:3%;width:13%;opacity:0;pointer-events:none}',
 '#bienv .bv-pl svg{width:100%;height:auto;display:block}',
 '#bienv{background:#F1EDE5}',
 '#bienv .bv-stage{position:relative;width:min(420px,92vw);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center}',
 '#bienv .bv-stage .bv-scene{width:100%}',
 '#bienv .bv-vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .45s ease;-webkit-mask-image:radial-gradient(ellipse 70% 72% at 50% 50%,#000 72%,transparent 100%);mask-image:radial-gradient(ellipse 70% 72% at 50% 50%,#000 72%,transparent 100%);pointer-events:none}',
 '#bienv.tumba .bv-vid{opacity:1}',
 '#bienv.tumba .bv-scene{opacity:0;transition:opacity .45s ease}',
 '@keyframes bvTumba{0%{transform:none}25%{transform:rotate(6deg)}100%{transform:translate(-14%,4%) rotate(-82deg)}}',
 '#bienv.tumba .bv-pl{animation:bvRueda 1.3s cubic-bezier(.25,.6,.35,1) calc(.75s + var(--dl)) forwards}',
 '@keyframes bvRueda{0%{opacity:1;transform:translate(0,-160%) rotate(0)}55%{opacity:1;transform:translate(calc(var(--px)*.6),10%) rotate(calc(var(--rt)*.6))}75%{transform:translate(calc(var(--px)*.85),-25%) rotate(calc(var(--rt)*.85))}100%{opacity:1;transform:translate(var(--px),0) rotate(var(--rt))}}',
 '@media (prefers-reduced-motion:reduce){#bienv .bv-go{animation:none}}',
 '.fin span{display:block;font-size:15px!important;font-weight:800;opacity:1!important;letter-spacing:.15px;text-shadow:0 1px 2px rgba(0,0,0,.28)}',
 '.fin span::first-letter{text-transform:uppercase}',
 '#bienv small{position:absolute;bottom:calc(28px + env(safe-area-inset-bottom));color:var(--muted,#55604f);animation:bvFade .5s ease 2.6s both}',
 '@keyframes bvFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
 '#bienv.out{opacity:0;transition:opacity .35s}',
 '@media (prefers-reduced-motion:reduce){#bienv *{animation:none!important}}'
];var st=document.createElement('style');st.textContent=css.join('\n');document.head.appendChild(st)})();

/* logo: uno para la app y otro para el ticket; si solo hay uno, sirve para los dos; el ticket puede ir sin logo */
function logoApp(){return S.cfg.logoApp||S.cfg.logoTk||null}
function logoTkSrc(){if(S.cfg.tkLogo===false)return null;return S.cfg.logoTk||S.cfg.logoApp||IMG.tk}
function logoCardHTML(){var a=S.cfg.logoApp,t=S.cfg.logoTk,on=S.cfg.tkLogo!==false;
 function slot(k,tit,v){return '<div class="lg"><b style="font-size:14px">'+tit+'</b><div class="lgv">'+(v?'<img src="'+v+'" alt="'+tit+'">':'Sin logo')+'</div><label class="btn sec sm" for="lg_'+k+'" style="display:flex;align-items:center;justify-content:center;cursor:pointer">'+(v?'Cambiar':'Subir')+'</label><input id="lg_'+k+'" type="file" accept="image/*" data-logo="'+k+'" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">'+(v?'<button class="link" data-act="logoquita" data-k="'+k+'">Quitar</button>':'')+'</div>'}
 return '<div class="card logocard"><b>Logo del negocio</b> <span class="lbl">(opcional)</span><div class="lbl" style="margin-top:4px">Puedes poner uno para la app y otro para el ticket. Si solo pones uno, se usa para los dos.</div><div class="lgs">'+slot('logoApp','Para la app',a)+slot('logoTk','Para el ticket',t)+'</div>'
  +'<div class="lbl" style="margin-top:10px">¿Poner logo en el ticket?</div><div class="chips" role="group" style="margin-top:4px"><button data-act="logotk" data-v="1" aria-pressed="'+on+'">Sí</button><button data-act="logotk" data-v="0" aria-pressed="'+(!on)+'">No, sin logo</button></div></div>'}
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.logo)return;var k=t.dataset.logo,f=t.files&&t.files[0];if(!f)return;var fr=new FileReader();
 fr.onload=function(){var im=new Image();im.onload=function(){var r=Math.min(1,512/Math.max(im.width,im.height)),w=Math.round(im.width*r),h=Math.round(im.height*r),cv=document.createElement('canvas');cv.width=w;cv.height=h;cv.getContext('2d').drawImage(im,0,0,w,h);S.cfg[k]=cv.toDataURL('image/png');toast('Logo guardado');renderQuieto()};im.src=fr.result};fr.readAsDataURL(f)},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="logoquita"],[data-act="logotk"]');if(!b)return;e.stopImmediatePropagation();
 if(b.dataset.act==='logoquita')S.cfg[b.dataset.k]=null;else S.cfg.tkLogo=b.dataset.v==='1';renderQuieto()},true);
/* en Ajustes la tarjeta del logo se agrega después: guardar dónde ibas para que no se mueva */
function renderQuieto(){var o=document.getElementById('ajov')||document.getElementById('setov'),y=o?o.scrollTop:0,wy=window.scrollY;render();var o2=document.getElementById('ajov')||document.getElementById('setov');if(o2)o2.scrollTop=y;window.scrollTo(0,wy)}
/* el ticket usa el logo que toque (o ninguno) */
var _nbLg=notaBlock;notaBlock=function(){var h=_nbLg.apply(this,arguments);if(!h)return h;var src=logoTkSrc();
 if(src!==IMG.tk){var tag='<img src="'+IMG.tk+'" alt="Plátanos Nietos" class="tklogo">';h=h.replace(tag,src?'<img src="'+src+'" alt="Logo" class="tklogo">':'');
  if(tkSinNombre()&&h.indexOf('font-weight:700;font-size:16px">'+esc(String(S.cfg.nombre).toUpperCase())+'</div>')<0){var i=h.indexOf('class="tklogo">');var nm='<div style="text-align:center;font-weight:700;font-size:16px">'+esc(String(S.cfg.nombre).toUpperCase())+'</div>';h=i>-1?h.slice(0,i+15)+nm+h.slice(i+15):h.replace(/(<div[^>]*>)/,'$1'+nm)}}
 return h};
var _tkImgs={};function tkImg(src){if(!src)return null;if(!_tkImgs[src]){var i=new Image();i.src=src;_tkImgs[src]=i}return _tkImgs[src]}
var _niLg=notaImg;notaImg=function(n){var src=logoTkSrc();if(src===IMG.tk)return _niLg.apply(this,arguments);
 var it=notaItems(n),im=tkImg(src),LW=0,LH=0;if(im&&im.complete&&im.naturalWidth){LW=Math.min(170,im.naturalWidth);LH=Math.round(LW*im.naturalHeight/im.naturalWidth);if(LH>170){LH=170;LW=Math.round(170*im.naturalWidth/im.naturalHeight)}}
 var W=440,y0=(LH?LH+40:34),H=y0+it.length*28+10,cv=document.createElement('canvas');cv.width=W;cv.height=H;var cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,W,H);if(LH)try{cx.drawImage(im,W/2-LW/2,12,LW,LH)}catch(e){}
 cx.fillStyle='#111';var y=y0;it.forEach(function(x){cx.font=(x.b?'bold ':'')+'15px monospace';if(x.t==='hr'){cx.fillRect(20,y-12,W-40,1)}else if(x.t==='c'){cx.textAlign='center';cx.font=(x.b?'bold 19px':'15px')+' monospace';cx.fillText(x.s,W/2,y)}else{cx.fillStyle=x.c==='neg'?'#B3261E':(x.c==='ok'?'#2F7D32':'#111');cx.textAlign='left';cx.fillText(x.k,20,y);cx.textAlign='right';cx.fillText(x.v,W-20,y);cx.fillStyle='#111'}y+=28});return cv.toDataURL('image/png')};

/* bienvenida animada (primera vez): llega el camión, se acomodan las cajas y dice para qué es la app */
IMG.bvCam="__IMG_bv_camion__";IMG.bvVid="__IMG_bv_video__";IMG.bvCaj="__IMG_bv_cajas__";
function bienvSVG(){return '<div class="bv-scene" role="img" aria-label="Camión de reparto con cajas de plátano"><img class="bv-cam" alt="" src="'+IMG.bvCam+'"><img class="bv-caj" alt="" src="'+IMG.bvCaj+'"><i class="bv-road"></i></div>'}
function bienvMostrar(){if(document.getElementById('bienv'))return;var o=document.createElement('div');o.id='bienv';o.setAttribute('role','dialog');o.setAttribute('aria-label','Bienvenida');
 var plat='';
 o.innerHTML='<div class="bv-stage">'+bienvSVG()+'<video class="bv-vid" muted playsinline preload="auto" aria-hidden="true"></video></div>'+'<h1>'+esc(String(S.cfg.nombre||'').trim()||'Control de reparto')+'</h1><p>Tus cajas, entregas, cobros y lo que te deben, en tu celular.</p><button class="btn bv-go" type="button">Comenzar</button>';
 document.body.appendChild(o);
 /* si se queda mucho tiempo aquí, las cajas se caen y tiran los plátanos */
 var vd=o.querySelector('.bv-vid');try{var b64=IMG.bvVid.split(',')[1],bin=atob(b64),u8=new Uint8Array(bin.length);for(var q=0;q<bin.length;q++)u8[q]=bin.charCodeAt(q);vd.src=URL.createObjectURL(new Blob([u8],{type:'video/mp4'}))}catch(e){}
 var tc=setTimeout(function(){o.classList.add('tumba');try{vd.currentTime=0;var pr=vd.play();if(pr&&pr.catch)pr.catch(function(){})}catch(e){}},9000);
 o.querySelector('.bv-go').addEventListener('click',function(e){e.stopPropagation();clearTimeout(tc);if(S.setup)S.setup.bienv=true;o.classList.add('out');setTimeout(function(){if(o.parentNode)o.remove()},360)})}

var _rLg=render;render=function(){_rLg.apply(this,arguments);try{
 /* logo arriba en la app */
 var la=logoApp(),hi=document.querySelector('header.top .logo img');if(hi){var want=la||LOGO_IC;if(hi.getAttribute('src')!==want){hi.setAttribute('src',want);hi.style.objectFit=la?'contain':'cover';hi.style.background=la?'#fff':''}}
 /* logo también en Ajustes */
 var aj=document.getElementById('ajov');if(aj&&!aj.querySelector('.logocard')){var ay=Array.prototype.slice.call(aj.querySelectorAll('.card')).filter(function(c){return /^Ayuda/.test((c.textContent||'').trim())})[0];var w=document.createElement('div');w.innerHTML=logoCardHTML();if(ay)ay.before(w.firstElementChild);else{var sc=aj.querySelector('.sw,.pn,div');(sc||aj).appendChild(w.firstElementChild)}}
 /* bienvenida al abrir por primera vez */
 if(typeof MODO!=='undefined'&&MODO==='vacio'&&S.setup&&!S.setup.fin&&!S.setup.bienv&&S.setup.p===0&&document.getElementById('setov')&&!window.__pnTest)bienvMostrar();
}catch(e){console.error(e)}};

/* ===================== v4.0 · Escribir sin que la pantalla brinque =====================
   Al pasar de un campo a otro la app se vuelve a dibujar (para recalcular totales). Antes eso
   mandaba la pantalla hacia arriba y el cursor se perdía. Ahora: se guarda dónde ibas y a qué
   campo tocaste, y después de redibujar se regresa exactamente ahí. Solo si el teclado tapa
   el campo, la pantalla sube lo justo y suave. */
function campoKey(x){if(!x||!x.getAttribute)return null;return x.getAttribute('data-bind')?'b:'+x.getAttribute('data-bind'):(x.id?'i:'+x.id:(x.name?'n:'+x.name:(x.getAttribute('aria-label')?'a:'+x.getAttribute('aria-label'):null)))}
function campoBusca(k){if(!k)return null;var t=k.slice(0,2),v=k.slice(2),L;try{if(t==='i:')return document.getElementById(v);var at=t==='b:'?'data-bind':(t==='n:'?'name':'aria-label');L=document.querySelectorAll('['+at+'="'+v.replace(/"/g,'\\"')+'"]')}catch(e){return null}return L&&L.length?L[L.length-1]:null}
function esCampo(x){return !!(x&&x.tagName&&/^(INPUT|TEXTAREA|SELECT)$/.test(x.tagName)&&!/^(checkbox|radio|file|button|submit|range)$/i.test(x.type||''))}
var _campoTap=null;
document.addEventListener('pointerdown',function(e){var t=e.target&&e.target.closest&&e.target.closest('input,textarea,select,label');if(t&&t.tagName==='LABEL'){var f=t.htmlFor?document.getElementById(t.htmlFor):t.querySelector('input,select,textarea');t=f}_campoTap=esCampo(t)?{k:campoKey(t),t:Date.now()}:null},true);
var SCROLLERS='#setov,#fiov,#ajov,#cmov,#vwov,#cvov,#arqov,#cajov,.gxsheet .pn,.drawer nav';
function scrollFoto(){var r={w:window.scrollY,o:{}};Array.prototype.forEach.call(document.querySelectorAll(SCROLLERS),function(el){var k=el.id||el.className;r.o[k]=el.scrollTop});return r}
function scrollPon(r){Array.prototype.forEach.call(document.querySelectorAll(SCROLLERS),function(el){var k=el.id||el.className;if(r.o[k]!=null&&Math.abs(el.scrollTop-r.o[k])>1)el.scrollTop=r.o[k]});if(Math.abs(window.scrollY-r.w)>1)window.scrollTo(0,r.w)}
var _rCampo=render;render=function(){var ae=document.activeElement,edit=esCampo(ae),tap=_campoTap&&Date.now()-_campoTap.t<900?_campoTap:null;
 if((!edit&&!tap)||window.__morphing)return _rCampo.apply(this,arguments);
 var foto=scrollFoto(),k=tap?tap.k:campoKey(ae),ss=null,se=null;try{if(!tap&&ae&&ae.selectionStart!=null){ss=ae.selectionStart;se=ae.selectionEnd}}catch(e){}
 var res=_rCampo.apply(this,arguments);
 try{scrollPon(foto);var n=campoBusca(k);if(n&&document.activeElement!==n){n.focus({preventScroll:true});if(ss!=null)try{n.setSelectionRange(ss,se)}catch(e){}}scrollPon(foto)}catch(e){}
 return res};
/* si el teclado tapa el campo, subir solo lo necesario y suave */
document.addEventListener('focusin',function(e){var x=e.target;if(!esCampo(x))return;setTimeout(function(){if(document.activeElement!==x)return;var vv=window.visualViewport,h=vv?vv.height+vv.offsetTop:window.innerHeight,r=x.getBoundingClientRect();
 var falta=r.bottom-(h-16);if(falta>0){var sc=x.closest(SCROLLERS);try{if(sc&&sc.scrollHeight>sc.clientHeight)sc.scrollBy({top:falta,behavior:'smooth'});else window.scrollBy({top:falta,behavior:'smooth'})}catch(er){}}
 else if(r.top<56){var sc2=x.closest(SCROLLERS);var sub=r.top-72;try{if(sc2&&sc2.scrollHeight>sc2.clientHeight)sc2.scrollBy({top:sub,behavior:'smooth'});else window.scrollBy({top:sub,behavior:'smooth'})}catch(er){}}},380)},true);

/* la animación roja de "falta llenar" se repite cada vez que tocas Siguiente */
var _faL9=faltaAplica;faltaAplica=function(nuevo){if(nuevo)Array.prototype.forEach.call(document.querySelectorAll('.falta'),function(x){x.classList.remove('falta');x.style.animation='';void x.offsetWidth});return _faL9.apply(this,arguments)};

/* ===================== v4.0 · Transiciones suaves =====================
   Las ventanas (ficha, registrar carga, viaje, ajustes, asistente…) entran deslizándose suave;
   al cambiar de pantalla o de paso el contenido entra con un desvanecido corto; los menús que se
   despliegan se abren suave. Nada se anima cuando solo se actualiza lo que ya estabas viendo. */
(function(){var css=[
 '@keyframes ovIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}',
 '@keyframes ovInR{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}',
 '@keyframes ovFade{from{opacity:0}to{opacity:1}}',
 '.ov-in{animation:ovIn .28s cubic-bezier(.2,.8,.3,1) both}',
 '.ov-fade{animation:ovFade .22s ease both}',
 '@media (min-width:1000px){html:not(.as-phone) #fiov.ov-in{animation-name:ovInR}}',
 '@keyframes scrIn{from{opacity:0;transform:translateX(var(--dx,0px))}to{opacity:1;transform:none}}',
 '@keyframes scrFade{from{opacity:.0}to{opacity:1}}',
 '.scr-in{animation:scrIn .24s ease both}',
 'main.scr-in{animation:scrFade .2s ease both}',
 '@keyframes dIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}',
 '.d-in{animation:dIn .22s ease both}',
 '@media (prefers-reduced-motion:reduce){.ov-in,.ov-fade,.scr-in,.d-in,main.scr-in{animation:none!important}}'
];var st=document.createElement('style');st.textContent=css.join('\n');document.head.appendChild(st)})();
var OV_ANIM=[['#fiov','ov-in'],['#cmov','ov-in'],['#vwov','ov-in'],['#cvov','ov-in'],['#ajov','ov-in'],['#arqov','ov-in'],['#setov','ov-fade'],['#cajov','ov-fade'],['.drawer','ov-fade'],['.gxsheet','ov-in']];
function pantallaFirma(){var f=null;try{f=fiCur()}catch(e){}return [S.role,S.tab&&S.tab[S.role],f?f.t+':'+f.id:'',f?(S.fiTab||{})[f.t+':'+f.id]:'',S.cm&&S.cm.paso,S.vfP,S.cierreP,S.setup&&!S.setup.fin?S.setup.p:'',S.vf?1:0].join('|')}
var _pfAnt=null,_tabAnt=null;
var _rTr=render;render=function(){var antes={};OV_ANIM.forEach(function(x){antes[x[0]]=!!document.querySelector(x[0])});var f0=_pfAnt,fz=null,fA=null;try{fA=pantallaFirma();fz=scrollFoto()}catch(e){}
 var res=_rTr.apply(this,arguments);
 /* si sigues en la misma pantalla (solo tocaste una opción o cambió un número), todo se queda donde estaba */
 try{if(fz&&fA===pantallaFirma())scrollPon(fz)}catch(e){}
 try{if(window.__pnTest&&!window.__pnAnim){_pfAnt=pantallaFirma();return res}
  var nueva=false;OV_ANIM.forEach(function(x){var el=document.querySelector(x[0]);if(el&&!antes[x[0]]){el.classList.add(x[1]);nueva=true}});
  var f1=pantallaFirma();
  if(!nueva&&f0!==null&&f1!==f0){var a=f0.split('|'),b=f1.split('|'),tg=null,dx=0;
   if(a[0]!==b[0]||a[1]!==b[1]){if(!document.querySelector('#fiov,#cmov,#vwov,#cvov,#setov')){tg=document.querySelector('main');try{var T=tabsDe(S.role).map(function(t){return t[0]}),i0=T.indexOf(a[1]),i1=T.indexOf(b[1]);dx=i0>-1&&i1>-1?(i1>i0?18:-18):0}catch(e){}}}
   else if(a[2]===b[2]&&a[3]!==b[3])tg=document.querySelector('#fiov .fibody');
   else if(a[4]!==b[4])tg=document.querySelector('#cmov')&&(document.querySelector('#cmov .cmb')||document.querySelector('#cmov').firstElementChild);
   else if(a[7]!==b[7])tg=document.querySelector('#setov .sw');
   else if(a[5]!==b[5]||a[6]!==b[6])tg=document.querySelector('main');
   if(tg){tg.style.setProperty('--dx',dx+'px');tg.classList.remove('scr-in');void tg.offsetWidth;tg.classList.add('scr-in')}}
  _pfAnt=f1}catch(e){}
 return res};
/* menús que se despliegan: se abren suave (solo cuando tú los abres) */
var _sumT=0;document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('summary'))_sumT=Date.now()},true);
document.addEventListener('toggle',function(e){var d=e.target;if(!d||d.tagName!=='DETAILS'||!d.open||Date.now()-_sumT>600)return;/* con animate() no se toca la clase: así el motor de pantalla no la quita y no parpadea */Array.prototype.forEach.call(d.children,function(c){if(c.tagName!=='SUMMARY'&&c.animate){try{c.animate([{opacity:0,transform:'translateY(-6px)'},{opacity:1,transform:'none'}],{duration:220,easing:'ease'})}catch(er){}}})},true);
