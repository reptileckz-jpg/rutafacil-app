/* ===================== v5 · Motor: solo se actualiza lo que cambió =====================
   Antes, cada vez que algo cambiaba se borraba toda la pantalla y se volvía a crear: por eso
   brincaba, se perdía el cursor y las ventanas se volvían a armar. Ahora la pantalla nueva se
   arma aparte (fuera de la vista), se compara con la que ves y solo se cambian las diferencias.
   Lo que no cambió se queda tal cual: con su scroll, su cursor, lo que escribías y su animación. */
var MORPH_ON=true;
function mAttrs(a,b){var i,n;for(i=a.attributes.length-1;i>=0;i--){n=a.attributes[i].name;if(!b.hasAttribute(n))a.removeAttribute(n)}
 for(i=0;i<b.attributes.length;i++){n=b.attributes[i];if(a.getAttribute(n.name)!==n.value)a.setAttribute(n.name,n.value)}}
function mKey(n){if(n.nodeType!==1)return null;return n.id?'#'+n.id:(n.getAttribute('data-key')?'k:'+n.getAttribute('data-key'):null)}
function mSame(a,b){if(a.nodeType!==b.nodeType)return false;if(a.nodeType!==1)return true;if(a.tagName!==b.tagName)return false;var ka=mKey(a),kb=mKey(b);if(ka||kb)return ka===kb;
 if(a.tagName==='INPUT'&&a.type!==b.type)return false;return true}
function mNode(a,b){
 if(a.nodeType===3||a.nodeType===8){if(a.nodeValue!==b.nodeValue)a.nodeValue=b.nodeValue;return}
 /* los mapas reales (Leaflet) se manejan solos: no se tocan */
 if(a.nodeType===1&&a.getAttribute('data-vivo')&&a.getAttribute('data-vivo')===b.getAttribute('data-vivo'))return;
 if(a.nodeType!==1)return;
 var act=document.activeElement===a;
 mAttrs(a,b);
 var t=a.tagName;
 if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT'){
  if(t==='SELECT'){mKids(a,b);if(!act&&a.value!==b.value)a.value=b.value;return}
  if(t==='INPUT'&&(a.type==='checkbox'||a.type==='radio')){if(a.checked!==b.checked)a.checked=b.checked;return}
  if(t==='INPUT'&&a.type==='file')return;
  if(!act&&a.value!==b.value)a.value=b.value;if(t==='TEXTAREA'&&!act&&a.value!==b.value)a.value=b.value;return}
 if(t==='DETAILS'&&a.open!==b.open)a.open=b.open;
 mKids(a,b)}
function mKids(A,B){
 var keyed={},c;for(c=A.firstChild;c;c=c.nextSibling){var k=mKey(c);if(k)keyed[k]=c}
 var cur=A.firstChild,nb=B.firstChild;
 while(nb){var next=nb.nextSibling,kb=mKey(nb),use=null;
  if(kb&&keyed[kb]&&keyed[kb].parentNode===A&&mSame(keyed[kb],nb))use=keyed[kb];
  else if(cur&&!mKey(cur)&&!kb&&mSame(cur,nb))use=cur;
  else if(cur&&!kb){/* buscar adelante uno igual sin llave (evita recrear al insertar algo arriba) */var s=cur.nextSibling,lim=3;while(s&&lim--){if(!mKey(s)&&mSame(s,nb)&&mLook(s,nb)){use=s;break}s=s.nextSibling}}
  if(use){if(use!==cur)A.insertBefore(use,cur);mNode(use,nb);cur=use.nextSibling}
  else{A.insertBefore(nb,cur)}/* nuevo: se mueve el de la copia, con sus clases de animación */
  nb=next}
 while(cur){var nx=cur.nextSibling;A.removeChild(cur);cur=nx}}
function mLook(a,b){/* parecido suficiente para reutilizarlo */if(a.nodeType!==1)return a.nodeValue===b.nodeValue;return (a.className||'')===(b.className||'')}

var _rMorph=render;render=function(){
 var live=document.getElementById('root');
 if(!MORPH_ON||!live||!live.firstChild||window.__noMorph||(S&&S.tut))return _rMorph.apply(this,arguments);
 var y=window.scrollY,ae=document.activeElement,aeIn=ae&&live.contains(ae)?ae:null;
 var copy=document.createElement('div');copy.id='root';copy.setAttribute('aria-hidden','true');
 copy.style.cssText='position:fixed;left:-30000px;top:0;width:'+(live.offsetWidth||window.innerWidth)+'px;pointer-events:none;visibility:hidden';
 live.parentNode.insertBefore(copy,live);
 window.__morphing=true;var res,err=null;
 try{res=_rMorph.apply(this,arguments)}catch(e){err=e}
 window.__morphing=false;
 /* lo que la copia tenía enfocado (por ejemplo un campo que se abre solo) */
 var cae=document.activeElement,cKey=cae&&copy.contains(cae)&&typeof campoKey==='function'?campoKey(cae):null;
 copy.removeAttribute('style');copy.removeAttribute('aria-hidden');
 try{mKids(live,copy);mAttrs(live,copy);live.id='root'}catch(e){console.error('morph',e);live.innerHTML='';while(copy.firstChild)live.appendChild(copy.firstChild)}
 copy.remove();
 if(Math.abs(window.scrollY-y)>1&&!window.__scrollPedido)window.scrollTo(0,y);
 try{if(aeIn&&live.contains(aeIn)&&document.activeElement!==aeIn)aeIn.focus({preventScroll:true});else if(cKey){var n=campoBusca(cKey);if(n&&live.contains(n))n.focus({preventScroll:true})}}catch(e){}
 if(err)throw err;
 return res};
