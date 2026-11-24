/* ===================== TEMA · Después de dibujar, parte 1 (aplanado el 19 nov) =====================
   Antes estaba repartido en 113 envolturas de render encadenadas en las capas l1 a l85.
   Aquí están todas juntas, en el MISMO orden, y hacen exactamente lo mismo (comprobado con todas las pruebas de comparación).
   Cada una hace algo DESPUÉS (o antes) de dibujar la pantalla: arreglos, avisos, burbujas, tutoriales, revisar datos…
   Se arma justo antes de tema-rutadia.js (el primer tema que también envuelve render), para que el orden sea el mismo.
   Lo de l86 a l90 está en tema-dibujar2.js (después de l90).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).
   ============================================================================================ */

/* render · de l2 */
var _rFi=render;render=function(){var f=fiCur(),sv={},ov=$('fiov'),sc=ov?ov.scrollTop:0,sg=ov?ov.getAttribute('data-fi'):null;
 if(f)FIK.forEach(function(k){sv[k]=S[k];S[k]=null});
 try{_rFi.apply(this,arguments)}finally{if(f)FIK.forEach(function(k){S[k]=sv[k]})}
 if(f){try{var w=document.createElement('div');w.innerHTML=fichaHTML(f);var el=w.firstElementChild;$('root').appendChild(el);if(sg&&el.getAttribute('data-fi')===sg)el.scrollTop=sc;
   else if(sg&&sg.split(':').slice(0,2).join(':')===String(el.getAttribute('data-fi')).split(':').slice(0,2).join(':')){/* misma ficha, otra pestaña: las pestañas se quedan arriba y la pestaña nueva se ve desde su inicio */
    var tb=el.querySelector('.fitabs'),lim=0;if(tb)lim=tb.offsetTop-(parseFloat(getComputedStyle(tb).top)||0);el.scrollTop=Math.min(sc,Math.max(0,lim))}
   var key=f.t+':'+f.id;if(_fiOpen!==key){if(!_fiOpen)try{history.pushState({fi:1},'')}catch(e){}_fiOpen=key}
   document.documentElement.classList.add('fi-on');try{fechaTxt(el);singTxt(el)}catch(e){}}catch(e){console.error(e)}}
 else{if(_fiOpen){_fiOpen=null}document.documentElement.classList.remove('fi-on')}};

/* render · de l3 */
var _rL3=render;render=function(){_rL3.apply(this,arguments);try{
 cierrePasos();bodegaOrden();vfPasos();
 /* dibujos de fondo */
 Array.prototype.forEach.call(document.querySelectorAll('main .card.deco-pl'),function(c){if(c.getAttribute('data-act')==='tab'&&c.getAttribute('data-t')==='bodega')c.classList.add('dcaja');else c.classList.add('dban')});
 Array.prototype.forEach.call(document.querySelectorAll('img.banic'),function(x){x.remove()});
 /* entrega: foto de fachada solo si no tiene, y "lo mismo que la vez pasada" */
 if(S.role==='rep'&&S.tab.rep==='entrega'){var c=curCli();if(c&&c.foto){var lb=document.querySelector('label[for="fach"]');if(lb)lb.style.display='none'}
  var q=Array.prototype.slice.call(document.querySelectorAll('main .card')).filter(function(x){var b=x.querySelector('b');return b&&/Qué le dejas/.test(b.textContent)})[0],u=c&&ultPedido(c);
  if(q&&u&&(u.R||u.M)&&!q.querySelector('[data-act="entmismo"]')){var bt=document.createElement('button');bt.className='btn sm sec';bt.style.marginTop='8px';bt.dataset.act='entmismo';bt.textContent='Lo mismo que la vez pasada ('+u.R+' cajas · '+u.M+' kg)';q.appendChild(bt)}
  var cv=Array.prototype.slice.call(document.querySelectorAll('main .card')).filter(function(x){var b=x.querySelector('b');return b&&b.textContent.trim()==='Cajas vacías'})[0];if(cv&&c){var lbl=Array.prototype.slice.call(cv.querySelectorAll('.lbl')).filter(function(x){return /^Debe \d+\. Pídeselas/.test(x.textContent)})[0];if(lbl)lbl.textContent='Ya debía '+c.vac+'. Si no las tiene, entrégale de todos modos.'}}
}catch(e){console.error(e)}};

/* render · de l4 */
var _rL4=render;render=function(){_rL4.apply(this,arguments);try{var m=document.querySelector('main');if(!m||m.querySelector('[data-borr]'))return;var h=borrBanner();if(!h)return;if(S.role==='rep'&&S.tab.rep==='entrega')return;var w=document.createElement('div');w.setAttribute('data-borr','1');w.innerHTML=h;m.insertBefore(w.firstElementChild,m.firstElementChild);m.firstElementChild.setAttribute('data-borr','1')}catch(e){}};

/* render · de l5 */
var _rL5=render;render=function(){_rL5.apply(this,arguments);try{var R=cuentasRevisar().filter(function(x){return !x.ok}).map(function(x){return x.n}).join('|');if(R&&R!==_cuMal)setTimeout(function(){toast('⚠ Algo no cuadra: '+R.split('|')[0]+'. Revísalo en Estadísticas.')},10);_cuMal=R;
 var m=document.querySelector('main');if(!m)return;
 if(S.role==='admin'&&S.tab.admin==='estadisticas'&&!m.querySelector('[data-k="cuentas"]')){var h1=m.querySelector('h1'),w=document.createElement('div');w.innerHTML=cuentasHTML();if(h1)h1.after(w.firstElementChild)}
 if(S.role==='cont'&&S.tab.cont==='cres'&&!m.querySelector('[data-k="cuentas"]')){var w2=document.createElement('div');w2.innerHTML=cuentasHTML();var n1=m.querySelector('.card.note');if(n1)n1.after(w2.firstElementChild)}
 if(((S.role==='admin'&&S.tab.admin==='gastos')||(S.role==='cont'&&S.tab.cont==='cgas'))&&!m.querySelector('[data-k="anul"]')&&S.anulados.length){var w3=document.createElement('div');w3.innerHTML=anuladosHTML();var ft=m.querySelector('.foot');if(ft)ft.before(w3.firstElementChild)}
 Array.prototype.forEach.call(m.querySelectorAll('.lbl'),function(x){if(x.textContent==='Toca uno para corregirlo. Deslízalo a un lado para borrarlo.')x.textContent='Toca uno para corregirlo. Deslízalo a un lado para anularlo (queda registrado).'});
 /* "con el chofer" en Finanzas y en el cierre de caja */
 if(S.role==='admin'&&S.tab.admin==='inicio'){var cc=conChofer(),cj=Array.prototype.slice.call(m.querySelectorAll('details[data-k="cajadia"]'))[0];if(cj&&cc>0.5&&!cj.querySelector('[data-conch]')){var rr=document.createElement('div');rr.setAttribute('data-conch','1');rr.className='lbl';rr.style.margin='6px 0';rr.innerHTML='Además, <b>'+money(cc)+'</b> los trae '+esc(chofN(S.chofHoy))+' y todavía no los entrega (no cuentan en la caja).';var sm=cj.querySelector('summary');if(sm)sm.after(rr)}}
 /* botón Corregir en las entregas hechas */
 if(S.role==='rep'&&S.tab.rep==='ruta'&&!S.cierre.sent){Array.prototype.forEach.call(m.querySelectorAll('.stop'),function(row,k){})}
}catch(e){console.error(e)}};

/* render · de l6 */
var _rL6=render;render=function(){if(S.role==='admin'&&S.histVisto[S.adminYo]==null)S.histVisto[S.adminYo]=Math.max(0,S.hist.length-(S._histSeed||0));
 _rL6.apply(this,arguments);try{var root=$('root'),m=document.querySelector('main');
  if(m){var add=function(html,key){if(!html||m.querySelector('[data-x="'+key+'"]'))return;var w=document.createElement('div');w.innerHTML=html;var el=w.firstElementChild;el.setAttribute('data-x',key);m.insertBefore(el,m.firstElementChild)};
   if(S.role==='admin'&&S.tab.admin==='inicio'){var ch=cambiosHTML();if(ch&&!m.querySelector('[data-x="camb"]')){var w0=document.createElement('div');w0.innerHTML=ch;var el0=w0.firstElementChild;el0.setAttribute('data-x','camb');var ref=m.querySelector('.card.deco-pl');if(ref)ref.after(el0);else m.insertBefore(el0,m.firstElementChild)}}
   add(senalBanner(),'sen');
   if(S.role==='admin'&&S.tab.admin==='personal'){Array.prototype.forEach.call(m.querySelectorAll('[data-act="opench"]'),function(bt){var id=+bt.dataset.id;if(!conn(id).on&&!bt.querySelector('.sinsen')){var s=document.createElement('div');s.innerHTML=senalTxt(id);var g=bt.querySelector('.grow');if(g)g.appendChild(s)}})}
  }
  var ca=cajaAyerHTML();if(ca){var w2=document.createElement('div');w2.innerHTML=ca;root.appendChild(w2.firstElementChild)}
  var ph=pinHTML();if(ph){var w3=document.createElement('div');w3.innerHTML=ph;root.appendChild(w3.firstElementChild)}
 }catch(e){console.error(e)}};

/* render · de l6b */
var _rL6b=render;render=function(){_rL6b.apply(this,arguments);try{if(S.role!=='admin')return;offIds().forEach(function(id){var n=chofN(id),c=conn(id),w=document.createTreeWalker($('root'),NodeFilter.SHOW_TEXT,null),x,L=[];while(x=w.nextNode())if(x.nodeValue.indexOf('GPS del teléfono de '+n+' · hace')>-1)L.push(x);L.forEach(function(t){t.nodeValue=t.nodeValue.replace(/GPS del teléfono de ([^·]+)· hace [^·]+/,'Sin señal desde las '+c.desde+' · última ubicación: '+(c.pos||'')+' ')})})}catch(e){}};

/* render · de l7 */
var _rL7=render;render=function(){if(S.tut){var el0=null}_rL7.apply(this,arguments);try{var root=$('root');var su=setupHTML();if(su){var w=document.createElement('div');w.innerHTML=su;root.appendChild(w.firstElementChild)}
 if(S.tut){var t0=TUT[S.tut.k][S.tut.i];if(t0){var tg=null;t0[0].split(',').some(function(sel){var x=document.querySelector(sel.trim());if(x){tg=x;return true}return false});if(tg){var rr=tg.getBoundingClientRect();if(rr.top<0||rr.bottom>window.innerHeight)tg.scrollIntoView({block:'center'})}}
  var th=tutHTML();if(th){var w2=document.createElement('div');w2.innerHTML=th;root.appendChild(w2.firstElementChild)}}
 /* en Ajustes: ver el tutorial otra vez y empezar desde cero */
 var aj=$('ajov');if(aj&&!aj.querySelector('[data-act="tutver"]')){var box=document.createElement('div');box.className='card';box.innerHTML='<b>Ayuda</b><button class="btn sec" style="margin-top:8px" data-act="tutver">Ver el tutorial otra vez</button>'+(typeof pinRow==='function'?pinRow(pinKey()):'');var ac=Array.prototype.slice.call(aj.querySelectorAll('.lbl')).filter(function(x){return /Acerca de/.test(x.textContent)})[0];if(ac)ac.before(box)}
}catch(e){console.error(e)}};

/* render · de l8 */
var _rL8=render;render=function(){ensureS();return _rL8.apply(this,arguments)};

/* render · de l9 */
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

/* render · de l9 */
var _rLg=render;render=function(){_rLg.apply(this,arguments);try{
 /* logo arriba en la app */
 var la=logoApp(),hi=document.querySelector('header.top .logo img');if(hi){var want=la||LOGO_IC;if(hi.getAttribute('src')!==want){hi.setAttribute('src',want);hi.style.objectFit=la?'contain':'cover';hi.style.background=la?'#fff':''}}
 /* logo también en Ajustes */
 var aj=document.getElementById('ajov');if(aj&&!aj.querySelector('.logocard')){var ay=Array.prototype.slice.call(aj.querySelectorAll('.card')).filter(function(c){return /^Ayuda/.test((c.textContent||'').trim())})[0];var w=document.createElement('div');w.innerHTML=logoCardHTML();if(ay)ay.before(w.firstElementChild);else{var sc=aj.querySelector('.sw,.pn,div');(sc||aj).appendChild(w.firstElementChild)}}
 /* bienvenida al abrir por primera vez */
 if(typeof MODO!=='undefined'&&MODO==='vacio'&&S.setup&&!S.setup.fin&&!S.setup.bienv&&S.setup.p===0&&document.getElementById('setov')&&!window.__pnTest)bienvMostrar();
}catch(e){console.error(e)}};

/* render · de l9 */
var _rCampo=render;render=function(){var ae=document.activeElement,edit=esCampo(ae),tap=_campoTap&&Date.now()-_campoTap.t<900?_campoTap:null;
 if((!edit&&!tap)||window.__morphing)return _rCampo.apply(this,arguments);
 var foto=scrollFoto(),k=tap?tap.k:campoKey(ae),ss=null,se=null;try{if(!tap&&ae&&ae.selectionStart!=null){ss=ae.selectionStart;se=ae.selectionEnd}}catch(e){}
 var res=_rCampo.apply(this,arguments);
 try{scrollPon(foto);var n=campoBusca(k);if(n&&document.activeElement!==n){n.focus({preventScroll:true});if(ss!=null)try{n.setSelectionRange(ss,se)}catch(e){}}scrollPon(foto)}catch(e){}
 return res};

/* render · de l9 */
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

/* render · 172: Ajustes en grupos (tema-ajorden172.js). Va AQUÍ, antes de "morph": se ordena la copia nueva, así la pantalla de verdad
   no mueve tarjetas en cada redibujado (moverlas quitaba el foco del campo donde escribes) */
var _rAj172=render;render=function(){var r=_rAj172.apply(this,arguments);try{if(typeof ajOrden172==='function')ajOrden172()}catch(e){console.error('aj172',e)}return r};

/* render · 42 (24 nov): tarjetas de aviso nuevas (tema-alerta42.js). Va AQUÍ, antes de "morph": se arregla la copia nueva y la pantalla no parpadea */
var _rA42=render;render=function(){var r=_rA42.apply(this,arguments);try{if(typeof a42Deco==='function')a42Deco()}catch(e){console.error('a42',e)}return r};

/* render · de l10 */
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

/* render · de l11 */
var _rAv=render;render=function(){var r=_rAv.apply(this,arguments);try{var sg=urgSig();document.documentElement.classList.toggle('av-visto',!!sg&&S.avVisto===sg)}catch(e){}return r};

/* render · de l13 */
var _rCaj13=render;render=function(){
 try{var c=S.cierre;if(c&&c.sent&&c.res&&!c.regMov&&!S.recep&&!S.arOn){var r=c.res;c.regMov=true;c.porContar=true;
   S.inv.maduras-=Math.max(0,r.reg);S.inv.kgMaduro=r2(S.inv.kgMaduro-Math.max(0,r.regK));S.inv.vacias-=r.V}
  var hayReg=!!S.cierreReg;if(hayReg&&_regRegAnt===false&&!S.recep&&c&&c.porContar&&S.role==='admin'){S.toast=(S.toast?S.toast+'. ':'')+'Ahora cuenta las cajas que regresó';setTimeout(function(){var k=document.querySelector('[data-key="recep"]');if(!k)return;var y=k.getBoundingClientRect().top+window.scrollY-70;window.scrollTo({top:Math.max(0,y),behavior:'smooth'});k.classList.remove('flashsc');void k.offsetWidth;k.classList.add('flashsc')},120)}
  _regRegAnt=hayReg}catch(e){}
 return _rCaj13.apply(this,arguments)};

/* render · de l13 */
var _rTut13=render;render=function(){if(S.tut&&S.role&&S.tab&&S.tab[S.role]!==tutTab()){S.tab[S.role]=tutTab()}return _rTut13.apply(this,arguments)};

/* render · de l18 */
var _rCom18=render;render=function(){var r=_rCom18.apply(this,arguments);try{var el=document.querySelector('.compill[data-v]');if(el){var v=num(el.getAttribute('data-v'));if(_comPrev!==null&&v>_comPrev+0.005){var d=r2(v-_comPrev),rc=el.getBoundingClientRect(),f=document.createElement('div');f.className='comfloat';f.textContent='+'+money(d);f.style.left=Math.round(rc.left+rc.width*0.35)+'px';f.style.top=Math.round(Math.max(60,rc.top))+'px';document.body.appendChild(f);setTimeout(function(){f.remove()},1500)}_comPrev=v}}catch(e){}return r};

/* render · de l19 */
var _rBu19=render;render=function(){try{buroSync()}catch(e){}return _rBu19.apply(this,arguments)};

/* render · de l20 */
var _rMay20=render;render=function(){try{maySync()}catch(e){}return _rMay20.apply(this,arguments)};

/* render · de l21 */
var _rG21=render;render=function(){var r=_rG21.apply(this,arguments);guardarLuego();return r};

/* render · de l22 */
var _r22=render;render=function(){var r=_r22.apply(this,arguments);try{hdrMedir()}catch(e){}return r};

/* render · de l22 */
var _rFoot22=render;render=function(){var r=_rFoot22.apply(this,arguments);if(REAL){var f=document.querySelector('main .foot');if(f&&f.style.display!=='none')f.style.display='none'}return r};

/* render · de l22 */
if(REAL){var _rClk22=render;render=function(){S.reloj=relojReal();return _rClk22.apply(this,arguments)};}

/* render · de l22 */
var _rNav22=render;render=function(){var r=_rNav22.apply(this,arguments);try{var k=navLlave();if(_navUlt&&k!==_navUlt&&!_navAtras&&_navUlt.split(':')[0]===S.role){_navPila.push(_navUlt);if(_navPila.length>30)_navPila.shift()}if(_navUlt&&_navUlt.split(':')[0]!==S.role)_navPila=[];_navUlt=k;_navAtras=false}catch(e){}return r};

/* render · de l22 */
var _rTut22=render;render=function(){var r=_rTut22.apply(this,arguments);try{if(REAL&&S.role==='rep'&&!(S.tutVisto&&S.tutVisto.rep)&&!S.tut&&!(_pin&&_pin.modo)&&!(typeof bienvOn==='function'&&bienvOn())&&!document.getElementById('bienv')&&!S.modal&&!_tutRepT){_tutRepT=setTimeout(function(){_tutRepT=null;if(S.role==='rep'&&!S.tut&&!(S.tutVisto&&S.tutVisto.rep)&&!(_pin&&_pin.modo)&&!bienvOn())tutIniciar('rep')},700)}}catch(e){}return r};

/* render · de l25 */
var _r25=render;render=function(){var vo=!!(S.vw&&S.vw.open);document.documentElement.classList.toggle('vwab',vo);return _r25.apply(this,arguments)};

/* render · de l25 */
var _r25b=render;render=function(){var r=_r25b.apply(this,arguments);if(_toastQ.length&&!avisoBloq()){var q=_toastQ.slice();_toastQ=[];setTimeout(function(){q.forEach(function(t,i){setTimeout(function(){toast(t)},i*2400)})},400)}return r};

/* render · de l26 */
var _r26=render;render=function(){try{(S.cli||[]).forEach(function(c){if(c.porCh!=null&&!c.rapida&&!c.oculto&&!c.avAlta){c.avAlta=true;S.avPrecio.push(chofN(c.porCh)+' dio de alta un cliente nuevo: '+c.n+(ubTiene(c)?' (con ubicación)':' (sin ubicación)')+(c.tel?' · tel. '+c.tel:'')+'. Revísalo en Clientes.')}})}catch(e){}return _r26.apply(this,arguments)};

/* render · de l26 */
var _r26c=render;render=function(){cliIdFix();return _r26c.apply(this,arguments)};

/* render · de l27 */
var _r27=render;render=function(){limSync();return _r27.apply(this,arguments)};

/* render · de l27 */
var _r27b=render;render=function(){try{(S.vws||[]).forEach(function(v){(v.par||[]).forEach(function(p){if(p.nub&&p.prov&&p.prov!=='__nuevo'){var c=ubParse(p.nub),d=provD(p.prov);if(c&&!ubTiene(d)){d.lat=c.lat;d.lng=c.lng;d.ubAprox=true}p.nub=''}})});
 (S.cli||[]).forEach(function(c){if(c.porCh!=null&&!c.rapida&&c.tel&&c.telPor==null)c.telPor=c.porCh})}catch(e){}return _r27b.apply(this,arguments)};

/* render · de l28 */
var _r28=render;render=function(){if(NB.on&&NB.listo){try{nbIdsFix();nbForzarRol()}catch(e){}}var r=_r28.apply(this,arguments);nbLuego();try{nbPantalla()}catch(e){}return r};

/* render · de l30 */
var _r30t=render;render=function(){var r=_r30t.apply(this,arguments);var k=S.tut?S.tut.k+':'+S.tut.i:'';if(k&&k!==_tutUlt){setTimeout(function(){tutReacomoda(true)},380)}_tutUlt=k;return r};

/* render · de l32 */
var _r32=render;render=function(){try{if(S.role==='rep'&&S.reab&&S.reab.est==='ok'&&S.cierre&&S.cierre.sent&&!_seguirOk){var k=S.reab.k;S.reab=null;_seguirOk=true;var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k=k;bt.style.display='none';document.body.appendChild(bt);try{bt.click()}finally{bt.remove();_seguirOk=false}S.cierreP=0;S.cx={R:'',M:'',foto:null,k:k};S.avPrecio.push(chofN(S.chofHoy)+' reabrió su ruta con tu permiso')}}catch(e){console.error(e)}return _r32.apply(this,arguments)};

/* render · de l32 */
var _r32b=render;render=function(){var r=_r32b.apply(this,arguments);try{sinDemo()}catch(e){}return r};

/* render · de l34 */
var _r34=render;render=function(){var r=_r34.apply(this,arguments);try{mapaMonta()}catch(e){console.error(e)}return r};

/* render · de l35 */
var _r35=render;render=function(){var r=_r35.apply(this,arguments);try{pintaTarjetas()}catch(e){}return r};

/* render · de l35 */
var _r35b=render;render=function(){if(typeof _toastQ!=='undefined'&&_toastQ.length>1&&!avisoBloq()){var n=_toastQ.length;_toastQ.length=0;setTimeout(function(){toast('Tienes '+n+' avisos nuevos. Míralos en Inicio → Avisos.')},400)}return _r35b.apply(this,arguments)};

/* render · de l36 */
var _r36a=render;render=function(){var r=_r36a.apply(this,arguments);try{if(_pin&&_pin.modo==='entrar'&&bioActiva(_pin.k)&&!document.getElementById('pnov')){var sig=_pin.k+':'+(_pin.bloq||0)+':'+(S.pinF&&S.pinF[_pin.k]?S.pinF[_pin.k].hasta:'');if(sig!==_bioUltK){_bioUltK=sig;setTimeout(bioEntrar,350)}}else if(!_pin||!_pin.modo)_bioUltK=''}catch(e){}return r};

/* render · de l36 */
var _r36b=render;render=function(){var r=_r36b.apply(this,arguments);try{var o=document.getElementById('pxov'),h=pxHTML();if(h){if(!o){o=document.createElement('div');document.body.appendChild(o)}var sig=JSON.stringify([S.px&&S.px.t,S.px&&S.px.err,(S.pinPide||{})[S.px&&S.px.k]]);if(o.dataset.sig!==sig){var v=(o.querySelector('#pxp')||{}).value;o.outerHTML=h;var n=document.getElementById('pxov');n.dataset.sig=sig;if(v&&n.querySelector('#pxp'))n.querySelector('#pxp').value=v}}else if(o)o.remove()}catch(e){console.error(e)}return r};

/* render · de l42 */
var _r42=render;render=function(){try{if(S.role==='admin'){nbRutaIds().forEach(function(id){var c=nbRGet(id,'cierre'),rg=nbRGet(id,'cierreReg');if(!c||!c.sent||!c.corte||!rg||rg.rec==null||c.dobleAv)return;var dif=r2(num(rg.rec)-num(c.corte.ent));
 if(Math.abs(dif)>=0.5){S.avPrecio.push('URGENTE: el efectivo de '+chofN(id)+' no coincide: él dijo '+money(c.corte.ent)+(c.corte.bolsa?' (bolsa '+c.corte.bolsa+')':'')+' y se contaron '+money(rg.rec)+'.')}c.dobleAv=true;if(+id!==+S.chofHoy)nbRSet(id,'cierre',c)})}}catch(er){}return _r42.apply(this,arguments)};

/* render · de l42 */
var _r42b=render;render=function(){try{(S.vws||[]).forEach(function(v){if(!v.hist||v.hist.pvr)return;v.hist.pvr=(v.par||[]).map(function(p){var caj=p.t==='R'||p.u==='cajas',real=caj?num(p.cajas):vwKg(p);return {l:vwParLbl(p)+' en '+p.prov,u:caj?'cajas':'kg',plan:num(p.plan),real:r2(real),pk:num(p.pk)}});
 var dd=v.hist.pvr.filter(function(x){return x.plan>0&&Math.abs(x.real-x.plan)/x.plan>0.05});if(dd.length)S.avPrecio.push('Viaje de '+v.hist.quien+': '+dd.map(function(x){return x.l+' pactado '+x.plan+' '+x.u+', llegó '+x.real+' '+x.u}).join(' · '))})}catch(er){}return _r42b.apply(this,arguments)};

/* render · de l43 */
var _r43t=render;render=function(){var t=S.tut,r;if(t&&S.role&&S.tab&&S.tab[S.role]!==tutTab())S.tab[S.role]=tutTab();window.__tutAct=t;S.tut=null;try{r=_r43t.apply(this,arguments)}finally{S.tut=t;window.__tutAct=null}try{tutPinta()}catch(e){console.error(e)}return r};

/* render · de l43 */
var _r43d=render;render=function(){var r=_r43d.apply(this,arguments);try{if(!window.__pnTest&&REAL&&!S.tut&&!window.__tutAct&&!(_pin&&_pin.modo)&&!S.tutDiasOff&&!document.getElementById('nbov')&&!document.getElementById('setov')&&(S.role==='rep'||S.role==='admin')){var rr=S.role==='rep'?'rep':'admin';
 if(S.tutVisto&&S.tutVisto[rr]){var n=tutDiaNum(rr),k='d:'+rr+':'+n;if(TUT[k]&&!S.tutVisto[k]&&(S.role!=='rep'||(S.salida&&S.salida.ok))){S.tutVisto[k]=true;setTimeout(function(){if(S.tut)return;S.tut={k:k,i:0,prev:{tab:S.tab[S.role]},tab:S.tab[S.role]};render()},900)}}}}catch(e){}return r};

/* render · de l44 */
var _r44=render;render=function(){var r=_r44.apply(this,arguments);try{mjVigila()}catch(e){}return r};

/* render · de l45 */
var _r45a=render;render=function(){var r=_r45a.apply(this,arguments);try{if(Date.now()-_clk45<500){var c=capaArriba(),al=c&&c.querySelector('.neg[role="alert"],[role="alert"].neg,.err[role="alert"]');if(al&&al.getClientRects().length&&FALTA_RE.test(al.textContent.trim())){_clk45=0;var t=primerVacio();if(t)marcaFalta(t);else{al.classList.remove('falta');void al.offsetWidth;al.classList.add('falta');try{vibrar(60)}catch(er){}}}}}catch(e){}return r};

/* render · de l45 */
var _r45b=render;render=function(){var r=_r45b.apply(this,arguments);try{sinRaros(document.getElementById('root')||document.body)}catch(e){}return r};

/* render · de l45 */
var _r45c=render;render=function(){var r=_r45c.apply(this,arguments);try{if(S.role==='rep'&&S.chofHoy!=null){var av=(S.rutaAv||{})[S.chofHoy]||[],k='rutaAvN:'+S.chofHoy+':'+iso(TODAY),ant=+(localStorage.getItem(k)||0);if(av.length>ant){var nuevos=av.slice(ant);localStorage.setItem(k,String(av.length));
 if(ant>0||Date.now()-(window.__ini45||0)>5000){var t=rutaAvTit(nuevos);natNotif(t,nuevos.map(avPedTxt).join(' · '));toast(t)}}else if(av.length<ant)localStorage.setItem(k,String(av.length))}}catch(e){}return r};

/* render · de l45 */
var _r45d=render;render=function(){var r=_r45d.apply(this,arguments);try{Array.prototype.forEach.call(document.querySelectorAll('.leaflet-container,[data-vivo]'),function(el){if(!el.hasAttribute('data-swipe'))el.setAttribute('data-swipe','mapa')})}catch(e){}return r};

/* render · de l45 */
var _r45e=render;render=function(){try{if(typeof NB==='undefined'||!NB.on||NB.listo)migraDemo()}catch(e){}return _r45e.apply(this,arguments)};

/* render · de l45 */
var _r45f=render;render=function(){var r=_r45f.apply(this,arguments);try{if(typeof NB!=='undefined'&&NB.on&&NB.ad&&NB.perfil&&NB.perfil.rol==='admin'&&NB.usuarios){var e=S.enc,hasta=e&&e.hasta?new Date(e.hasta+'T23:59:59').getTime():0,sig=(e?e.ch:'')+':'+hasta;if(sig!==_encSync45){_encSync45=sig;
 Object.keys(NB.usuarios).forEach(function(uid){var p=NB.usuarios[uid];if(!p||p.rol!=='chofer'||!p.activo)return;var quiero=e&&+p.chId===+e.ch?hasta:0;if(num(p.encHasta)!==quiero){p.encHasta=quiero;NB.ad.set('usuarios_app/'+uid,{encHasta:quiero},true).catch(function(){})}})}}}catch(er){}return r};

/* render · de l46 */
var _r46=render;render=function(){var r=_r46.apply(this,arguments);try{sinDemoTxt(document.body)}catch(e){}return r};

/* render · de l48 */
var _r48a=render;render=function(){var r=_r48a.apply(this,arguments);try{if(!window.__pnTest&&document.getElementById('nbov')&&!document.getElementById('bienv')){var vis=false;try{vis=localStorage.getItem('bienvCel')==='1'}catch(e){}if(!vis){try{localStorage.setItem('bienvCel','1')}catch(e){}if(typeof bienvMostrar==='function')setTimeout(bienvMostrar,980)}}}catch(e){}return r};

/* render · de l48 */
var _r48b=render;render=function(){var r=_r48b.apply(this,arguments);try{if(!_permVez&&!window.__pnTest&&natPl48()&&!(_pin&&_pin.modo)&&!document.getElementById('nbov')&&!document.getElementById('setov')&&!document.getElementById('bienv')&&S.role){_permVez=true;var vis=false;try{vis=localStorage.getItem('permVisto')==='1'}catch(e){}
 permRevisa(function(e){if(!e)return;S.permE=e;var faltaImp=e.ubicacion!=='si'||e.camara!=='si';if(!vis){S.perm={e:e};render()}else if(faltaImp&&S.role==='rep')render()})}}catch(er){}return r};

/* render · de l49 */
var _r49=render;render=function(){try{bodLiga()}catch(e){}return _r49.apply(this,arguments)};

/* render · de l50 */
var _rd50=render;render=function(){try{eqAplica()}catch(e){}return _rd50.apply(this,arguments)};

/* render · de l52 */
var _rd52=render;render=function(){try{stopsTRevisa()}catch(e){}var r=_rd52.apply(this,arguments);try{gpsNatRevisa()}catch(e){}return r};

/* render · de l53 */
var _rd53=render;render=function(){var r=_rd53.apply(this,arguments);try{var a=document.querySelector('[data-act="confno"]');if(a&&a.textContent!=='Regresar')a.textContent='Regresar';var o=document.querySelector('[data-act="confok"]');if(o&&o.textContent==='Sí, confirmar')o.textContent='Sí';
 var m=document.querySelector('[data-act="modalx"]');if(m&&m.textContent==='Cancelar')m.textContent='Regresar'}catch(e){}return r};

/* render · de l56 */
var _rd56=render;render=function(){var r=_rd56.apply(this,arguments);try{if(guiaTip()){var h=document.querySelector('header.top .brand');if(h&&!h.querySelector('.qbtn')){var q=document.createElement('button');q.className='qbtn';q.dataset.act='guiaq';q.setAttribute('aria-label','Ayuda de esta pantalla');q.textContent='?';h.appendChild(q)}}
 var o=document.getElementById('guiab');if(o&&o.dataset.k!==S.role+':'+S.tab[S.role])o.remove()}catch(e){}return r};

/* render · de l56 */
var _rd56b=render;render=function(){var r=_rd56b.apply(this,arguments);try{if(_tutVez56||window.__pnTest||(navigator.webdriver&&!window.__guiaTest)||!REAL||!guiaLibre())return r;
 var rr=S.role==='rep'?'rep':(S.role==='admin'&&!S.encOn?'admin':null);if(!rr||!TUT[rr])return r;var n=guiaDia(),k=n<=1?rr:'d:'+rr+':'+n;
 if(n>1&&!guiaGet('tut:'+rr)&&TUT[rr])k=rr;if(!TUT[k]||guiaGet('tut:'+k))return r;if(k.indexOf('d:rep')===0&&!(S.salida&&S.salida.ok))return r;
 _tutVez56=true;setTimeout(function(){if(!guiaLibre()){_tutVez56=false;return}guiaSet('tut:'+k);if(k===rr)tutIniciar(k);else{S.tut={k:k,i:0,prev:{tab:S.tab[S.role]},tab:S.tab[S.role]};render()}},1200)}catch(e){}return r};

/* render · de l57 */
var _rd57=render;render=function(){var r=_rd57.apply(this,arguments);try{gmRevisa()}catch(e){console.error(e)}return r};

/* render · de l58 */
var _rd58=render;render=function(){var r=_rd58.apply(this,arguments);try{if(pnBloqueada())pnQuitaMapas()}catch(e){}return r};

/* render · de l58 */
var _rd58b=render;render=function(){
 try{if(_pin&&_pin.modo==='entrar'&&pnGracia(_pin.k)&&!_pin.bloq){S.pinOk[_pin.k]=true;_pin={v:'',modo:null}}}catch(e){}
 var r=_rd58b.apply(this,arguments);
 try{/* solo cuenta como "ya entró" si pasó por la pantalla del PIN o la huella */var k=pinKey(),m=_pin&&_pin.modo;if(_pinModoAnt==='entrar'&&!m&&S.pinOk&&S.pinOk[_pinKAnt])_pinAuth[_pinKAnt]=Date.now();_pinModoAnt=m;_pinKAnt=_pin&&_pin.k}catch(e){}return r};

/* render · de l58 */
var _rd58c=render;render=function(){var r=_rd58c.apply(this,arguments);try{
 if(pnBloqueada()&&_pin.bloq)_pnBloqEra=true;
 else if(_pnBloqEra&&!(_pin&&_pin.modo)){_pnBloqEra=false;if(pnAMedias())setTimeout(pnMedias,0);else setTimeout(pnIrCasa,0)}}catch(e){console.error(e)}return r};

/* render · de l58 */
var _rd58d=render;render=function(){if(_pnFrio&&typeof _cargado!=='undefined'&&_cargado){_pnFrio=false;try{if(S.role&&S.tab&&!(S.setup&&!S.setup.fin)){var c=pnCasa();if(S.tab[S.role]!==c){if(S.role==='rep'&&/^(entrega|cierre|viaje)$/.test(S.tab.rep)&&pnAMedias())setTimeout(pnMedias,400);else S.tab[S.role]=c}S.aj=false}}catch(e){}}
 return _rd58d.apply(this,arguments)};

/* render · de l58 */
var _rd58e=render;render=function(){var r=_rd58e.apply(this,arguments);try{var aj=document.getElementById('ajov');if(aj&&!esDueno()){
 Array.prototype.forEach.call(aj.querySelectorAll('.logocard,[data-key="ajcred"],[data-key="mincard"],details[data-k="ajcredd"],details[data-k="ajmind"]'),function(c){c.remove()});
 Array.prototype.forEach.call(aj.querySelectorAll('.card,details'),function(c){var t=(c.querySelector('b,summary')||c).textContent.trim();if(/^(Logo del negocio|Aviso de poca fruta|Crédito y mayoreo)/.test(t))c.remove()})}}catch(e){}return r};

/* render · de l58 */
var _rd58f=render;render=function(){var r=_rd58f.apply(this,arguments);try{temaApply();document.body.classList.toggle('big-ui',prefBig());
 var aj=document.getElementById('ajov');if(aj){var t=prefTema(),bg=prefBig();Array.prototype.forEach.call(aj.querySelectorAll('[data-act="tema"]'),function(x){x.setAttribute('aria-pressed',String(x.dataset.v===t))});Array.prototype.forEach.call(aj.querySelectorAll('[data-act="cfgbig"]'),function(x){x.setAttribute('aria-pressed',String((x.dataset.v==='1')===bg))})}}catch(e){}return r};

/* render · de l59 */
var _rd59a=render;render=function(){var r=_rd59a.apply(this,arguments);try{var d=document.querySelector('details[data-k="efbilld"]');if(d&&S.cierre&&S.cierre.billAb!=null&&d.open!==!!S.cierre.billAb)d.open=!!S.cierre.billAb}catch(e){}return r};

/* render · de l59 */
var _rd59b=render;render=function(){var r=_rd59b.apply(this,arguments);try{var h=document.querySelector('header.top .brand');if(h){var q=h.querySelectorAll('.qbtn');Array.prototype.forEach.call(q,function(x){x.remove()})}}catch(e){}return r};

/* render · de l59 */
var _rd59c=render;render=function(){
 try{if(S.tut&&!S.tut._ok&&!pnArranqueListo()){_tutPend59=S.tut;S.tut=null}
  else if(!S.tut&&_tutPend59&&pnArranqueListo()){S.tut=_tutPend59;S.tut._ok=1;_tutPend59=null}
  else if(S.tut&&!S.tut._ok)S.tut._ok=1}catch(e){}
 return _rd59c.apply(this,arguments)};

/* render · de l59 */
var _rd59d=render;render=function(){try{if(_popPausa&&S.tab[S.role]!==popCasa())_popPausa.salio=true}catch(e){}return _rd59d.apply(this,arguments)};

/* render · de l60 */
var _rd60a=render;render=function(){try{avOrdenaLuego();faLimpia();chAvLimpia()}catch(e){console.error(e)}var r=_rd60a.apply(this,arguments);
 try{var fo=document.getElementById('faov');if(fo)fo.remove();var fh=faovHTML();if(fh){var w=document.createElement('div');w.innerHTML=fh;document.body.appendChild(w.firstElementChild)}}catch(e){console.error(e)}
 try{tabBadges()}catch(e){console.error(e)}return r};

/* render · de l61 */
var _rd61a=render;render=function(){try{if(!salPrimera())salPuente()}catch(e){}return _rd61a.apply(this,arguments)};

/* render · de l61 */
var _rd61b=render;render=function(){try{if(Date.now()-_redT>1500){_redT=Date.now();redondea()}}catch(e){}return _rd61b.apply(this,arguments)};

/* render · de l62 */
var _rd62a=render;render=function(){try{bodAplica()}catch(e){}return _rd62a.apply(this,arguments)};

/* render · de l62 */
var _rd62b=render;render=function(){var r=_rd62b.apply(this,arguments);try{var o=document.getElementById('blov');if(o)o.remove();var hh=bodLocHTML();if(hh){var w=document.createElement('div');w.innerHTML=hh;document.body.appendChild(w.firstElementChild);try{mapaMonta()}catch(e){}try{gmRevisa()}catch(e){}}}catch(e){console.error(e)}return r};

/* render · de l62 */
var _rd62c=render;render=function(){try{aprAprende()}catch(e){}return _rd62c.apply(this,arguments)};

/* render · de l63 */
var _rd63a=render;render=function(){try{var P=S.vacPlan;if(P&&S.role==='admin'){var hoy=iso(TODAY);if(hoy>P.hasta&&!S.encOn&&S.adminYo===P.adm){setTimeout(function(){vacTermina(true);render()},0)}
  else if(hoy>=P.desde&&hoy<=P.hasta&&!P.p.precio&&P.pR&&S.precio&&S.precio.conf!==hoy){S.precio.R=P.pR;if(P.pM)S.precio.M=P.pM;S.precio.conf=hoy;S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:'App',x:'Precio base de vacaciones: '+money(P.pR)+' la caja'+(P.pM?' y '+money(P.pM)+' el kilo':'')})}}}catch(e){}return _rd63a.apply(this,arguments)};

/* render · de l63 */
var _rd63b=render;render=function(){var r=_rd63b.apply(this,arguments);try{if(S.role==='rep'&&!chofComida()){Array.prototype.forEach.call(document.querySelectorAll('[data-act="gxt2"][data-t="Comida o viáticos"],[data-act="gxtipo"][data-t="Comida o viáticos"],[data-act="gxtipo"][data-v="Comida o viáticos"]'),function(b){b.remove()});
  if(S.gx&&/^Comida/.test(S.gx.tipo||'')){S.gx.tipo='Caseta'}}
 /* ticket obligatorio: el texto lo dice */
 Array.prototype.forEach.call(document.querySelectorAll('.gxsheet .lbl'),function(l){if(/Sin foto del ticket no se descuenta/.test(l.textContent)&&!(S.gx&&!gxTicketObl(S.gx.tipo)&&!S.gxFuel))l.textContent='La foto del ticket es obligatoria. Guarda el ticket y entrégalo en bodega al cerrar.'})}catch(e){}return r};

/* render · de l65 */
var _rd65=render;render=function(){var r=_rd65.apply(this,arguments);try{var m=document.querySelector('main');if(m&&S.role==='admin'){var t=S.tab.admin;if(t==='inicio')inicio65(m);else if(t==='bodega')bodega65(m)}}catch(e){console.error('diseño 7.3',e)}return r};

/* render · de l66 */
var _rd66a=render;render=function(){var r=_rd66a.apply(this,arguments);try{var o=document.getElementById('pinov');if(o&&_pin&&_pin.modo==='entrar'){var pw=o.querySelector('.pw');
  if(pw&&!pw.querySelector('.ses')){var b=pw.querySelector(':scope>b');if(b){var s=document.createElement('span');s.className='ses';s.innerHTML='<i></i>Sesión activa';b.before(s)}}
  var x=o.querySelector('.kp [data-act="pinx"]');if(x&&typeof bioActiva==='function'&&bioActiva(_pin.k)&&typeof bioPl==='function'&&bioPl()&&!x.classList.contains('bio42')){x.className='bio42';x.dataset.act='biousar';x.setAttribute('aria-label','Entrar con mi huella');x.innerHTML=BIO42}}}catch(e){}return r};

/* render · de l66 */
var _rd66b=render;render=function(){var r=_rd66b.apply(this,arguments);try{if(S.role==='admin'&&S.tab.admin==='vehiculos'){Array.prototype.forEach.call(document.querySelectorAll('main button.vcard[data-act="vehopen"]'),function(bt){if(bt.classList.contains('veh43'))return;var v=(S.veh||[]).filter(function(x){return +x.id===+bt.dataset.id})[0];if(!v)return;
  var pl=bt.querySelector('svg.plate');var html=veh43(v);bt.className='vcard veh43';bt.removeAttribute('style');bt.innerHTML=html;if(pl){pl.classList.add('plate');var an=bt.querySelector('.an');if(an)an.after(pl)}})}}catch(e){console.error('43',e)}return r};

/* render · de l67 */
var _rd67a=render;render=function(){var r=_rd67a.apply(this,arguments);try{var b=document.querySelector('#ajov [data-act="gmswitch"]');if(b){var c=b.closest('.card');if(c)c.remove()}}catch(e){}return r};

/* render · de l68 */
var _rd68m=render;render=function(){var r=_rd68m.apply(this,arguments);mapSw68();return r};

/* render · de l68 */
var _rd68n=render;render=function(){var r=_rd68n.apply(this,arguments);try{
  Array.prototype.forEach.call(document.querySelectorAll('.drawer nav button.btn:not(.sec)'),function(b){b.classList.add('sec')});
  var t=S.role+':'+S.tab[S.role],pin=!!document.getElementById('pinov');
  if(t!==_t68||(_pin68&&!pin)||window.scrollY<=30){navHid=false;document.documentElement.classList.remove('navhid');var nv=document.querySelector('nav.tabs');if(nv)nv.classList.remove('hid')}
  _t68=t;_pin68=pin}catch(e){}return r};

/* render · de l69 */
var _rd69c=render;render=function(){var r=_rd69c.apply(this,arguments);try{if(S.role==='rep'){Array.prototype.forEach.call(document.querySelectorAll('[data-act="gxtipo"][data-t="Caseta"],[data-act="gxt2"][data-t="Caseta"]'),function(b){b.remove()});if(S.gx&&S.gx.tipo==='Caseta')S.gx.tipo='Ponchadura o reparación'}}catch(e){}return r};

/* render · de l69 */
var _rd69d=render;render=function(){var r=_rd69d.apply(this,arguments);desgAuto68();return r};

/* render · de l69 */
var _rd69s=render;render=function(){sano68();return _rd69s.apply(this,arguments)};

/* render · de l69 */
var _rd69q=render;render=function(){var r=_rd69q.apply(this,arguments);try{var mm=document.querySelector('main');if(mm&&S.role==='admin'&&S.tab.admin==='inicio'&&!mm.querySelector('[data-x="cuadra68"]')){var ref=mm.querySelector(':scope > details[data-k="avinfo"]')||Array.prototype.filter.call(mm.querySelectorAll(':scope > .card'),function(c){var b=c.querySelector('.tt');return b&&/^Por atender/.test(b.textContent)})[0]||mm.querySelector('.inv68');if(ref)ref.after(cuadraCard68())}}catch(e){console.error('cuadra68',e)}return r};

/* render · de l70 */
var _rd70u=render;render=function(){var r=_rd70u.apply(this,arguments);try{cfUb70()}catch(e){}return r};

/* render · de l70 */
var _rd70=render;render=function(){var r=_rd70.apply(this,arguments);try{
  ovPon70('lt53ov',lt53HTML());ovPon70('p57ov',p57HTML());ovPon70('rp56ov',rp56HTML());var ub=ub68HTML();ovPon70('ub68ov',ub);if(ub&&S.ub68.p===2)setTimeout(ub68Map,30);
  var nv=document.querySelector('.drawer nav');if(nv&&!nv.querySelector('[data-act="rp56"]')){var bt=document.createElement('button');bt.className='btn sec';bt.style.marginTop='10px';bt.dataset.act='rp56';bt.textContent='🐞 Reportar un problema';var ref=nv.querySelector('[data-act="usrcambia"],[data-act="usrsalir"],.link[data-act="reset"]');if(ref)ref.before(bt);else nv.appendChild(bt)}
  var hp=document.querySelector('[aria-labelledby="hlpT"]');if(hp&&!hp.querySelector('[data-act="rp56"]')){var b2=document.createElement('button');b2.className='btn sec';b2.style.cssText='margin-top:12px;width:100%;min-height:52px';b2.dataset.act='rp56';b2.textContent='🐞 Reportar un problema';hp.appendChild(b2)}
 }catch(e){console.error('ventanas 7.5',e)}return r};

/* render · de l71 */
var _rd71=render;render=function(){var r=_rd71.apply(this,arguments);try{ovPon70('may71ov',may71HTML())}catch(e){console.error('l71 ov',e)}return r};

/* render · de l72 */
var _rd72=render;render=function(){try{vr72Pon()}catch(e){}var r=_rd72.apply(this,arguments);try{stock72();rotas72();tarEnt72();rp72();botones72();cierreFalta72();tarBuro72();ovPon70('tar72ov',tar72HTML());
 /* 108–110 (tema-taras.js, tema-cargarmas.js) */
 if(typeof tar108HTML==='function'){ovPon70('tar108ov',tar108HTML());ovPon70('deb109ov',deb109HTML());debCard109();tarFondoCard108()}if(typeof cm110HTML==='function'){ovPon70('cm110ov',cm110HTML());bodCard110()}}catch(e){console.error('l72',e)}return r};

/* render · de l73 */
var _rd73=render;render=function(){var r=_rd73.apply(this,arguments);try{bioOfrece73()}catch(e){console.error('l73',e)}return r};

/* render · de l74 */
var _rd74=render;render=function(){try{dsgVj74()}catch(e){}var r=_rd74.apply(this,arguments);try{acLbl74();acArregla74();ce74();ovPon70('ip74ov',ip74HTML());ovPon70('pe74ov',pe74HTML())}catch(e){console.error('l74',e)}return r};

/* render · de l75 */
var _rd75=render;render=function(){var r=_rd75.apply(this,arguments);try{suPrep75();suListas75();suListo75();im75Btn();ovPon70('im75ov',im75HTML())}catch(e){console.error('l75',e)}return r};

/* render · de l76 */
var _rd76=render;render=function(){var r=_rd76.apply(this,arguments);try{tagFicha76();tagAviso76();facCli76();ovPon70('tag76ov',tag76HTML());ovPon70('fv76ov',facVen76HTML());ovPon70('fl76ov',facLista76HTML())}catch(e){console.error('l76',e)}return r};

/* render · de l77 */
var _rd77=render;render=function(){if(FALLO77.enRender)return;try{vwVivo77()}catch(x){}
 try{return _rd77.apply(this,arguments)}catch(e){var t=falloAnota77(e,'al dibujar');FALLO77.enRender=true;
  try{falloSeguro77();_rd77.apply(this,arguments);FALLO77.enRender=false;setTimeout(function(){try{toast('Algo falló y se cerró lo que estaba abierto. Ya quedó anotado.')}catch(x){}},60);return}catch(e2){FALLO77.enRender=false;falloPantalla77(falloAnota77(e2,'al dibujar (otra vez)'))}}};

/* render · de l77 */
var _rd77b=render;render=function(){if(DIAG77.paus)return;return _rd77b.apply(this,arguments)};

/* render · de l77 */
var _rd77c=render;render=function(){vwLimpia77();return _rd77c.apply(this,arguments)};

/* render · de l78 */
var _rd78=render;render=function(){try{vr78Pon()}catch(e){}try{if(pedToma78()){}}catch(e){}var r=_rd78.apply(this,arguments);try{cfMas78();defPreg78();thumbs78()}catch(e){console.error('l78',e)}return r};

/* render · de l79 */
var _rd79=render;render=function(){try{carg79()}catch(e){}var r=_rd79.apply(this,arguments);try{ev79Pon();revFicha79();pw79();pedTit79();rp79();peAdm79();peRep79()}catch(e){console.error('l79',e)}return r};

/* render · de l80 */
var _rd80=render;render=function(){try{rutaRenueva80()}catch(e){console.error('l80 ruta',e)}try{lotesReloj80()}catch(e){}try{bod80();clima80()}catch(e){}var r=_rd80.apply(this,arguments);try{ovPon70('dia80',dia80HTML());dia80Adm();cvPon80();lote80Pon();txt80()}catch(e){console.error('l80',e)}return r};

/* render · de l81 */
var _rd81=render;render=function(){var ch=false;try{ch=toma81()}catch(e){console.error('l81 toma',e)}var r=_rd81.apply(this,arguments);try{rtEntrada81();rt81Pon()}catch(e){console.error('l81',e)}return r};

/* render · de l81 */
var _rd81b=render;render=function(){var r=_rd81b.apply(this,arguments);try{help81();aprende81();tutNuevo81()}catch(e){}return r};

/* render · de l82 */
var _rd82=render;render=function(){try{fechas82();gtip82();if(S.role==='admin'||S.role==='cont'||S.encOn)histPon82()}catch(e){console.error('l82 hist',e)}var r=_rd82.apply(this,arguments);try{retiroNota82();cuEntrada82();cu82Pon()}catch(e){console.error('l82',e)}return r};

/* render · de l82 */
var _rdKm82=render;render=function(){try{if(MODO==='vacio'){var b=(S.bods||[])[0];if(b&&b.lat!=null)(S.cli||[]).forEach(function(c){if(c.lat!=null&&!num(c.km)){var k=kmE({lat:+b.lat,lng:+b.lng},c);if(k){c.km=Math.round(k*10)/10;c.min=Math.round(k*2.5)}}})}}catch(e){}return _rdKm82.apply(this,arguments)};

/* render · de l82 */
var _rdF82=render;render=function(){var r=_rdF82.apply(this,arguments);try{fv82Pon()}catch(e){}return r};

/* render · de l82 */
var _rdX82=render;render=function(){try{cliSync82()}catch(e){}var r=_rdX82.apply(this,arguments);try{txtDemo82()}catch(e){}return r};

/* render · de l82 */
var _rdY82=render;render=function(){try{pedQVence82()}catch(e){}var r=_rdY82.apply(this,arguments);try{pedQAdm82();pedQRep82();sueltosPon82();sueltosTxt82()}catch(e){console.error('l82b',e)}return r};

/* render · de l83 */
var _rd83=render;render=function(){try{if(S.chofHoy!=null&&Array.isArray(S.stops)){var vis={},out=[],cur=S.stops[S.cur]&&S.stops[S.cur].c,cambio=false;S.stops.forEach(function(s){var k=+s.c;if(s.done){out.push(s);return}if(vis[k]!=null){cambio=true;return}vis[k]=out.length;out.push(s)});if(cambio){S.stops=out;if(cur!=null){var ni=out.map(function(s){return +s.c}).indexOf(+cur);S.cur=ni>-1?ni:Math.max(0,curStop())}}}}catch(e){}return _rd83.apply(this,arguments)};

/* render · de l83 */
var _rdC83=render;render=function(){try{if(S.role==='rep'&&S.tab.rep==='cierre'&&S.dia80&&S.salida&&!S.salida.ok&&(S.log||[]).length&&!(S.cierre&&S.cierre.sent)){S.salida.ok=true;S.salida.tarde83=1}}catch(e){}return _rdC83.apply(this,arguments)};

/* render · de l85 */
var _rd85=render;render=function(){try{mig85();fallaLimpia85()}catch(e){console.error('l85',e)}var r=_rd85.apply(this,arguments);try{admSw85()}catch(e){console.error('l85b',e)}return r};
