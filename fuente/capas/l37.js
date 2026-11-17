/* ===================== v6.2 · Avisos: cada uno te lleva a donde se atiende · ventana de urgentes "1 de N" ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '@keyframes avFoco{0%,100%{box-shadow:0 0 0 0 rgba(0,0,0,0)}30%,70%{box-shadow:0 0 0 4px var(--accent)}}',
 '.avfoco{animation:avFoco 1.6s ease 2;border-radius:12px}'].join('\n');document.head.appendChild(st)})();
function avChofDe(x){return S.choferes.filter(function(c){var n=chofN(c.id);return n&&new RegExp('(^|[^A-Za-zÁÉÍÓÚáéíóúñÑ])'+reEsc(n)+'([^A-Za-zÁÉÍÓÚáéíóúñÑ]|$)').test(x)})[0]||null}
/* a dónde lleva cada aviso y qué resalta al llegar */
/* avDestino: pasó a tema-avisos.js */
/* al llegar: baja hasta el lugar y lo resalta */
function avFoco(sel){if(!sel)return;var n=0,f=function(){var el=document.querySelector(sel);if(!el){if(++n<8)setTimeout(f,120);return}var c=el.closest('.card')||el;try{c.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}c.classList.remove('avfoco');void c.offsetWidth;c.classList.add('avfoco');setTimeout(function(){c.classList.remove('avfoco')},3400)};setTimeout(f,150)}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="avgo"]');if(!b||e.target.closest('[data-act="avpos"],[data-act="atiende"]'))return;e.stopImmediatePropagation();
 if(b.dataset.pop)try{popSig()}catch(er){}var x=decodeURIComponent(b.dataset.k||''),d=avDestino(x);S.menu=false;S.tab[S.role]=d.t;if(d.cli)S.openCli=d.cli;render();if(d.sel)avFoco(d.sel);else window.scrollTo(0,0)},true);
/* ventana de urgentes al abrir la app (una vez al día): ahora también trae los avisos URGENTES, uno por uno */
var _popI37=popItems;popItems=function(){var L=_popI37.apply(this,arguments);if(S.role!=='admin'||S.encOn)return L;try{var ya=L.map(function(x){return x.t+' '+x.m}).join(' | ');
 avisos().filter(function(x){return AV_URG.test(x)}).forEach(function(x){var t=x.replace(/^URGENTE:\s*/,'').replace(/\s*\[pin:[^\]]+\]/,'');if(ya.indexOf(t.slice(0,30))>-1)return;
  L.push({t:'Atiende esto',m:esc(t),b:[['Ir a atenderlo','avgo',' data-k="'+encodeURIComponent(x)+'"']]})})}catch(e){}return L};
/* el texto del aviso no enseña la marca [pin:…] */
/* avRow: pasó a tema-avisos.js */
/* al reiniciar el PIN, se quita la petición y su aviso */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pinreset"]');if(!b)return;var k=b.dataset.k;if(S.pinPide)delete S.pinPide[k];if(S.pinPista)delete S.pinPista[k];S.avPrecio=(S.avPrecio||[]).filter(function(x){return x.indexOf('[pin:'+k+']')<0})},true);
