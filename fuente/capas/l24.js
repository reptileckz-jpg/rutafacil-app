/* ===================== v5.1 · Ver la foto antes de reemplazarla =====================
   Antes, al tocar una foto ya tomada (ticket, fachada, licencia, fruta mala, carga…) se abría la cámara otra vez.
   Ahora se abre la foto en grande (se puede acercar con dos dedos) con "Tomar otra para reemplazarla". */
(function(){var st=document.createElement('style');st.textContent='#fotov .fvx.fvotra{position:absolute!important;top:auto!important;right:auto!important;width:auto!important;height:auto!important;left:50%!important;transform:translateX(-50%);bottom:calc(64px + env(safe-area-inset-bottom,0px));z-index:3;min-height:52px;padding:0 22px;border-radius:999px;border:0;background:#2F7D32;color:#fff;font-weight:800;font-size:16px;box-shadow:0 6px 18px rgba(0,0,0,.35)}';document.head.appendChild(st)})();
var _fvImg=null;
window.addEventListener('pointerdown',function(e){if(e.target&&e.target.tagName==='IMG')_fvImg=e.target},true);
function fvInput(img){if(!img)return null;var lb=img.closest('label[for]');if(lb){var i=document.getElementById(lb.getAttribute('for'));if(i&&i.type==='file')return i}
 var box=img.parentElement;for(var n=0;n<4&&box;n++){var q=box.querySelector('input[type="file"]');if(q)return q;box=box.parentElement}return null}
var _fa24=fotoAbrir;fotoAbrir=function(src){var img=_fvImg,r=_fa24.apply(this,arguments);try{var inp=img&&(img.currentSrc||img.src)===src?fvInput(img):null,o=document.getElementById('fotov');
 if(inp&&o){var b=document.createElement('button');b.className='fvx fvotra';b.textContent='📷 Tomar otra para reemplazarla';b.addEventListener('click',function(e){e.stopPropagation();inp.click();o.remove()});o.appendChild(b)}}catch(e){}return r};
/* fotos dentro de la etiqueta de "tomar foto": antes abrían la cámara; ahora se ven */
document.addEventListener('click',function(e){var t=e.target;if(!t||t.tagName!=='IMG')return;var lb=t.closest('label[for]');if(!lb)return;var i=document.getElementById(lb.getAttribute('for'));if(!i||i.type!=='file')return;
 var src=t.currentSrc||t.getAttribute('src')||'';if(!src)return;e.preventDefault();e.stopImmediatePropagation();_fvImg=t;fotoAbrir(src)},true);
/* atrás cierra la foto */
var _navA24=navAtras;navAtras=function(){var o=document.getElementById('fotov');if(o){o.remove();return true}return _navA24.apply(this,arguments)};
