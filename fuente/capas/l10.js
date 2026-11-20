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
 /* 175: el campo donde estás escribiendo: la parte que lo tiene adentro solo se reaprovecha para SU mismo lugar en el dibujo nuevo
    (antes, al buscar y hacerse más corta la lista, esa caja se reusaba para otra cosa y el campo salía de la pantalla: se cerraba el teclado) */
 var fa=document.activeElement,fsel=null,liveF=null;
 if(fa&&fa!==document.body&&A.contains(fa)&&/^(INPUT|TEXTAREA|SELECT)$/.test(fa.tagName)){
  fsel=fa.id?'#'+(window.CSS&&CSS.escape?CSS.escape(fa.id):fa.id):(fa.getAttribute('data-bind')?'[data-bind="'+fa.getAttribute('data-bind')+'"]':(fa.name?fa.tagName.toLowerCase()+'[name="'+fa.name+'"]':null));
  for(c=A.firstChild;c;c=c.nextSibling)if(c.contains&&c.contains(fa)){liveF=c;break}}
 var tieneF=function(n){if(!fsel||n.nodeType!==1)return false;try{return n.matches(fsel)||!!n.querySelector(fsel)}catch(e){return false}};
 while(nb){var next=nb.nextSibling,kb=mKey(nb),use=null;
  if(kb&&keyed[kb]&&keyed[kb].parentNode===A&&mSame(keyed[kb],nb))use=keyed[kb];
  else if(cur&&!mKey(cur)&&!kb&&mSame(cur,nb))use=cur;
  else if(cur&&!kb){/* buscar adelante uno igual sin llave (evita recrear al insertar algo arriba) */var s=cur.nextSibling,lim=3;while(s&&lim--){if(!mKey(s)&&mSame(s,nb)&&mLook(s,nb)){use=s;break}s=s.nextSibling}}
  if(liveF&&liveF.parentNode===A){if(tieneF(nb))use=mSame(liveF,nb)?liveF:use;else if(use===liveF)use=null}
  if(use){if(use!==cur){
    /* 175: si lo que hay que mover tiene adentro el campo donde estás escribiendo, NO se mueve: se mueven los de en medio detrás de él
       (queda el mismo orden). Mover el campo le quitaba el foco y en el celular se cerraba el teclado (al escribir en Buscar, etc.) */
    if(fa&&fa!==document.body&&use.contains(fa)){var an=use,x=cur;while(x&&x!==use){var nx=x.nextSibling;A.insertBefore(x,an.nextSibling);an=x;x=nx}}
    else A.insertBefore(use,cur)}
   mNode(use,nb);cur=use.nextSibling}
  else{A.insertBefore(nb,cur)}/* nuevo: se mueve el de la copia, con sus clases de animación */
  nb=next}
 while(cur){var nx=cur.nextSibling;A.removeChild(cur);cur=nx}}
function mLook(a,b){/* parecido suficiente para reutilizarlo */if(a.nodeType!==1)return a.nodeValue===b.nodeValue;return (a.className||'')===(b.className||'')}

/* render: pasó a tema-dibujar1.js */
