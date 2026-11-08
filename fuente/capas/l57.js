/* ===================== v7.1 · Google Maps DENTRO de cada pantalla (ruta, viaje, mapa en vivo, fichas, recorrido)
   El mapa de Google se dibuja "debajo" de la app: la app deja un hueco transparente donde va el mapa.
   Si algo falla (o en Ajustes se apaga), se usa el mapa de antes (Leaflet). ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 'html.gmin,html.gmin body{background:transparent!important}',
 '.gmhole{position:fixed;inset:0;z-index:-1;background:var(--bg);pointer-events:none}',
 '.mapviv.gnat{background:transparent!important}.mapviv.gnat capacitor-google-map{display:block;width:100%;height:100%;background:transparent}'].join('\n');document.head.appendChild(st)})();
function gmInHay(){if(!gmHay())return false;try{if(localStorage.getItem('gmapsNo')==='1')return false}catch(e){}return true}
var GMI=[];/* {el,id,m,host,ids:{mk:[],pl:[]},j,anc:[[el,bg]]} */
var _gmSeq=0;
function gmHost(el){var p=el.parentElement;while(p&&p!==document.body){var cs=getComputedStyle(p);if(cs.position==='fixed')return p;p=p.parentElement}return document.body}
function gmTr(p){p._gmN=(p._gmN||0)+1;if(p._gmN===1){p._gmOrig=p.style.background;p.style.background='transparent'}}
function gmTransparente(x){var p=x.el.parentElement;while(p&&p!==x.host){x.anc.push(p);gmTr(p);p=p.parentElement}
 if(x.host!==document.body){x.anc.push(x.host);gmTr(x.host)}else{document.documentElement.classList.add('gmin')}}
function gmRestaura(x){x.anc.forEach(function(p){try{p._gmN=Math.max(0,(p._gmN||1)-1);if(!p._gmN)p.style.background=p._gmOrig||''}catch(e){}});x.anc=[]}
function gmCapa(host){var c=host===document.body?document.querySelector('body>.gmhole'):host.querySelector(':scope>.gmhole');if(!c){c=document.createElement('div');c.className='gmhole';c.setAttribute('aria-hidden','true');if(host===document.body)document.body.appendChild(c);else host.insertBefore(c,host.firstChild)}return c}
/* el hueco: toda la pantalla de color de fondo, menos donde van los mapas */
function gmHuecos(){var hosts=[];GMI.forEach(function(x){if(hosts.indexOf(x.host)<0)hosts.push(x.host)});
 Array.prototype.forEach.call(document.querySelectorAll('.gmhole'),function(c){var h=c.parentElement;if(hosts.indexOf(h)<0)c.remove()});
 if(!GMI.length)document.documentElement.classList.remove('gmin');
 hosts.forEach(function(h){var c=gmCapa(h),W=window.innerWidth,H=window.innerHeight,d='M0 0H'+W+'V'+H+'H0Z';
  GMI.forEach(function(x){if(x.host!==h||!x.m)return;var r=x.el.getBoundingClientRect();if(r.width<2||r.height<2||r.bottom<0||r.top>H)return;d+=' M'+r.left+' '+r.top+'H'+r.right+'V'+r.bottom+'H'+r.left+'Z'});
  c.style.clipPath="path(evenodd,'"+d+"')"})}
function gmBounds(x){var r=x.el.getBoundingClientRect();return {x:r.left,y:r.top,width:r.width,height:r.height}}
function gmMueve(){GMI.forEach(function(x){if(!x.m)return;try{var b=gmBounds(x);var k=[b.x,b.y,b.width,b.height].map(Math.round).join(',');if(k===x.bk)return;x.bk=k;
 if(typeof x.m.updateMapBounds==='function')x.m.updateMapBounds();else if(window.GMAPA_PL&&window.GMAPA_PL.onScroll)window.GMAPA_PL.onScroll({id:x.id,mapBounds:b})}catch(e){}});gmHuecos()}
var _gmRaf=0;function gmPinta(){if(_gmRaf)return;_gmRaf=requestAnimationFrame(function(){_gmRaf=0;gmMueve()})}
document.addEventListener('scroll',gmPinta,true);window.addEventListener('resize',gmPinta);
function gmColor(c){var h=String(mapCol(c)).replace('#','');if(!/^[0-9a-f]{6}$/i.test(h))return null;return {r:parseInt(h.slice(0,2),16),g:parseInt(h.slice(2,4),16),b:parseInt(h.slice(4,6),16),a:1}}
function gmDatos(x,d){var m=x.m;if(!m)return;var p=[];try{if(x.ids.mk.length)p.push(m.removeMarkers(x.ids.mk))}catch(e){}try{if(x.ids.pl.length)p.push(m.removePolylines(x.ids.pl))}catch(e){}x.ids={mk:[],pl:[]};
 Promise.all(p).catch(function(){}).then(function(){var mk=[],B=[];if(d.bod!==false){mk.push({coordinate:{lat:BOD.lat,lng:BOD.lng},title:'Bodega',tintColor:{r:30,g:42,b:26,a:1}});B.push(BOD)}
  (d.pts||[]).forEach(function(o){if(o.lat==null)return;var t={coordinate:{lat:o.lat,lng:o.lng},title:String(o.n||o.t||''),snippet:o.n&&o.t&&o.n!==o.t?'Parada '+o.t:''};var c=gmColor(o.col);if(c)t.tintColor=c;mk.push(t);B.push(o)});
  (d.marks||[]).forEach(function(o){if(o.lat==null)return;mk.push({coordinate:{lat:o.lat,lng:o.lng},title:String(o.n||o.t||''),snippet:o.hace||'',tintColor:gmColor(o.col||'#2F6DB5')||{r:47,g:109,b:181,a:1}});B.push(o)});
  var q=[];if(mk.length)q.push(m.addMarkers(mk).then(function(ids){x.ids.mk=ids||[]}));
  if(d.line&&d.line.length>1)q.push(m.addPolylines([{path:d.line.map(function(o){return {lat:o.lat,lng:o.lng}}),strokeColor:'#2F7D32',strokeWidth:5,geodesic:false}]).then(function(ids){x.ids.pl=ids||[]}));
  if(!x.fit||d.refit){x.fit=true;var v=gmVista(B);try{q.push(m.setCamera({coordinate:v.c,zoom:v.z,animate:false}))}catch(e){}}
  return Promise.all(q)}).catch(function(e){console.error('gm datos',e)})}
function gmMonta(el){var id='gm'+(++_gmSeq),dd=document.querySelector('[data-mapdata="'+el.getAttribute('data-vivo')+'"]');if(!dd)return;var j=dd.getAttribute('data-j'),d;try{d=JSON.parse(j)}catch(e){return}
 if(el._m){try{el._m.remove()}catch(e){}el._m=null;el._g=null;el._j=null;el.innerHTML=''}
 var x={el:el,id:id,m:null,host:gmHost(el),ids:{mk:[],pl:[]},j:j,anc:[],fit:false};GMI.push(x);el._gm=x;el.classList.add('gnat');
 var c=document.createElement('capacitor-google-map');c.id=id;el.appendChild(c);gmTransparente(x);
 var v=gmVista([BOD].concat((d.pts||[]).concat(d.marks||[]).filter(function(o){return o.lat!=null})));
 window.GMAPA.create({id:id,element:c,apiKey:'nativo',forceCreate:true,config:{center:v.c,zoom:v.z}}).then(function(m){if(GMI.indexOf(x)<0){try{m.destroy()}catch(e){}return}x.m=m;gmDatos(x,d);gmPinta();try{m.enableCurrentLocation(S.role==='rep').catch(function(){})}catch(e){}},
  function(er){console.error('gm',er);gmQuita(x);el._gmFail=true;el.classList.remove('gnat');try{mapaMonta()}catch(e){}})}
function gmQuita(x){var i=GMI.indexOf(x);if(i>-1)GMI.splice(i,1);gmRestaura(x);try{var c=document.getElementById(x.id);if(c)c.remove()}catch(e){}if(x.el)x.el._gm=null;if(x.m)try{x.m.destroy()}catch(e){}gmHuecos()}
function gmRevisa(){if(!window.GMAPA)return;
 GMI.slice().forEach(function(x){if(!document.body.contains(x.el)||!gmInHay())gmQuita(x)});if(!gmInHay())return;
 Array.prototype.forEach.call(document.querySelectorAll('[data-vivo]'),function(el){if(el._gmFail)return;var r=el.getBoundingClientRect();if(r.width<10||r.height<10)return;
  if(!el._gm){gmMonta(el);return}var x=el._gm,dd=document.querySelector('[data-mapdata="'+el.getAttribute('data-vivo')+'"]'),j=dd&&dd.getAttribute('data-j');if(j&&j!==x.j){x.j=j;try{gmDatos(x,JSON.parse(j))}catch(e){}}});gmPinta()}
/* el montaje de Leaflet se salta los mapas que ya son de Google */
var _mM57=mapaMonta;mapaMonta=function(){var L=gmInHay()?Array.prototype.filter.call(document.querySelectorAll('[data-vivo]'),function(el){return !el._gmFail}):[];
 L.forEach(function(el){el.setAttribute('data-gvivo',el.getAttribute('data-vivo'));el.removeAttribute('data-vivo')});try{return _mM57.apply(this,arguments)}finally{L.forEach(function(el){el.setAttribute('data-vivo',el.getAttribute('data-gvivo'));el.removeAttribute('data-gvivo')})}};
var _rd57=render;render=function(){var r=_rd57.apply(this,arguments);try{gmRevisa()}catch(e){console.error(e)}return r};
setInterval(function(){try{gmRevisa()}catch(e){}},1500);
/* con el mapa dentro ya no hace falta el botón de pantalla completa… salvo como "ampliar" */
var _mvH57=mapaVivoHTML;mapaVivoHTML=function(id,data,alto){var h=_mvH57.apply(this,arguments);return gmInHay()?h.replace('🗺️ Ver en Google Maps','⤢ Ver más grande'):h};
/* Ajustes: interruptor (por celular) */
var _aj57=ajHTML;ajHTML=function(){var h=_aj57.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||!gmHay())return h;var no=false;try{no=localStorage.getItem('gmapsNo')==='1'}catch(e){}
 var c='<div class="card"><div class="row"><span><b>Mapas de Google</b><br><span class="lbl">Si algún mapa se ve mal en este celular, apágalo y se usa el mapa de antes.</span></span><button class="btn sm'+(no?' sec':'')+'" style="width:auto" data-act="gmswitch">'+(no?'No':'Sí')+'</button></div></div>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gmswitch"]');if(!b)return;e.stopImmediatePropagation();var no=false;try{no=localStorage.getItem('gmapsNo')==='1';localStorage.setItem('gmapsNo',no?'0':'1')}catch(er){}
 GMI.slice().forEach(gmQuita);Array.prototype.forEach.call(document.querySelectorAll('[data-vivo]'),function(el){if(el._m){try{el._m.remove()}catch(er){}el._m=null;el.innerHTML=''}el._gmFail=false});toast(no?'Mapas de Google prendidos':'Se usa el mapa de antes');render()},true);
