/* ===================== v5 · Avisos de Inicio más claros =====================
   El punto rojo que late en "Inicio" ahora lleva DIRECTO a los avisos con un solo toque (antes
   el primer toque solo abría Inicio y había que tocar otra vez). Una vez que los viste, el punto
   deja de latir hasta que aparezca un aviso urgente nuevo. */
(function(){var st=document.createElement('style');st.textContent=[
 'html.av-visto nav.tabs button[data-t="inicio"] .tdot[aria-label="Hay avisos urgentes"]{display:none}'
].join('\n');document.head.appendChild(st)})();
function urgSig(){try{return avisos().filter(function(x){return AV_URG.test(x)}).join('|')}catch(e){return ''}}
function avisosCard(){var a=document.querySelector('main .avl');return a?(a.closest('.card')||a.parentNode):null}
function irAvisos(){var c=avisosCard();if(!c)return;S.avVisto=urgSig();document.documentElement.classList.add('av-visto');
 var r=c.getBoundingClientRect();window.scrollTo({top:Math.max(0,window.scrollY+r.top-70),behavior:'smooth'});c.classList.remove('flashsc');void c.offsetWidth;c.classList.add('flashsc')}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('nav.tabs button[data-act="tab"][data-t="inicio"]');if(!b||S.role!=='admin')return;
 var dot=b.querySelector('.tdot[aria-label="Hay avisos urgentes"]');var vis=dot&&getComputedStyle(dot).display!=='none';
 if(vis)setTimeout(irAvisos,60)},true);
/* render: pasó a tema-dibujar1.js */
