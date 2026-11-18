/* ===================== TEMA · La venta en ruta por pasos (nació como tema, 18 nov · punto 125) =====================
   La pantalla de la entrega medía como 3 pantallas y media (41 botones) y arriba salían varios avisos juntos.
   Ahora es por pasos (Ricardo: "hacerlo ya"; "que se brinque" el de vacías cuando no debe nada):
     1 Qué le dejas (datos del cliente, cajas y kilos, "Más opciones", "No estaba")
     2 Cobro (aviso de lo que debía, "no se le puede fiar" y el cobro)
     3 Cajas vacías y taras (se brinca solo si no debe vacías ni taras; entonces las vacías salen junto con el cobro)
     y al final "Revisar y guardar": la MISMA ventana "¿Guardar la entrega?" con el resumen que ya existía.
   - Arriba siempre: "Parada X de Y" y el nombre; abajo siempre la barra con lo que se cobra (su botón dice "Siguiente" y en el último paso "Revisar y guardar").
   - Las cuentas y el guardado NO cambian: entregaCalc, entValida y "Guardar entrega" (entconf → guardar) son los de siempre.
     Solo se esconde lo que no es del paso. Comprobado con pruebas/comp-venta.js (cada venta guardada igual que antes).
   - Siguiente revisa con entValida lo que es de ese paso (o de uno anterior); si algo es de un paso anterior, regresa a ese paso.
   Si se cambia algo de la venta por pasos, se cambia AQUÍ.
   ============================================================================================ */
var ENT_P125=['Qué le dejas','Cobro','Cajas vacías y taras'];
function entActivo125(){return S.role==='rep'&&S.tab.rep==='entrega'&&!!S.d&&curStop()>=0}
function entCli125(){var i=curStop();return i>=0&&S.stops[i]?String(S.stops[i].c):''}
function entPaso125(){var o=S.entP125;if(!o||o.c!==entCli125())return 0;return Math.max(0,Math.min(2,+o.p||0))}
function entPon125(p){S.entP125={c:entCli125(),p:p}}
/* cada entrega nueva empieza en el paso 1 */
var _rD125=resetDraft;resetDraft=function(){S.entP125=null;return _rD125.apply(this,arguments)};
/* ¿se brinca "Cajas vacías y taras"? solo si no debe vacías ni taras (venta en la calle y cliente nuevo: siempre) */
function entSalta125(){var c=null;try{c=entregaCalc().c}catch(e){}if(!c||c.rapida||c.nuevo)return true;var m=document.querySelector('main');if(m&&m.querySelector('.tb72,[data-x="tar72"]'))return false;return !(num(c.vac)>0)}
/* de qué paso es cada parte de la pantalla */
function entCls125(x){if(!x||!x.classList)return 'fijo';var cl=x.classList,t=(x.textContent||'').trim(),dx=x.dataset||{};
 if(x.tagName==='H1'||cl.contains('autocard')||cl.contains('entbar')||cl.contains('foot')||cl.contains('pnback')||(x.tagName==='BUTTON'&&cl.contains('link')&&/Volver/.test(t))||dx.x==='ent125hd')return 'fijo';
 if(dx.x==='deb109'||cl.contains('entav'))return 1;
 if(dx.x==='tar72'||cl.contains('tb72'))return 2;
 if(dx.x==='cfub70')return 'fin';
 if(/^Cobro/.test(t))return 1;
 if(/^Cajas vacías/.test(t))return 2;
 return 0}
function entPasoDe125(el,skip){var m=document.querySelector('main');if(!el||!m)return null;while(el&&el.parentNode!==m)el=el.parentNode;if(!el)return null;var p=entCls125(el);if(p==='fijo'||p==='fin')return null;return p===2&&skip?1:p}
function entPasos125(){if(!entActivo125())return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="ent125hd"]'))return;var bar=m.querySelector('.entbar');if(!bar)return;
 var skip=entSalta125(),n=skip?2:3,cur=Math.min(entPaso125(),n-1),ult=cur===n-1;
 Array.prototype.slice.call(m.children).forEach(function(x){var p=entCls125(x);if(p==='fijo')return;if(p==='fin'){if(!ult)x.classList.add('wz-hide');return}var ps=p===2&&skip?1:p;if(ps!==cur)x.classList.add('wz-hide')});
 var hd=document.createElement('div');hd.setAttribute('data-x','ent125hd');hd.style.margin='0 2px 8px';
 hd.innerHTML='<div style="display:flex;align-items:center;gap:8px"><b class="lbl" style="flex:1;margin:0">Paso '+(cur+1)+' de '+n+' · '+ENT_P125[cur]+(skip&&ult?' y cajas vacías':'')+'</b>'+(cur>0?'<button class="link" data-act="ent125p" data-v="'+(cur-1)+'">← Atrás</button>':'')+'</div><div class="wz-hd">'+ENT_P125.slice(0,n).map(function(x,i){return '<i class="'+(i<=cur?'on':'')+'"></i>'}).join('')+'</div>';
 var h1=m.querySelector(':scope>h1');(h1?h1.after(hd):m.insertBefore(hd,m.firstChild));
 /* paso 1: primero "¿Qué le dejas?" (lo principal) y después los datos del cliente */
 if(cur===0){var dj=Array.prototype.slice.call(m.children).filter(function(x){return /^¿Qué le dejas\?/.test((x.textContent||'').trim())})[0];if(dj)hd.after(dj)}
 /* los avisos del paso (lo que debía, taras) van debajo del título del paso, no arriba de la parada */
 var tras=hd;Array.prototype.slice.call(m.children).forEach(function(x){var dx=x.dataset||{};if((dx.x==='deb109'||dx.x==='tar72'||(x.classList&&x.classList.contains('tb72')))&&!x.classList.contains('wz-hide')){tras.after(x);tras=x}});
 var bt=bar.querySelector('[data-act="entconf"]'),fa=ult?entFalta125():null;if(bt&&ult&&fa&&fa.p!=null&&fa.p<cur){/* falta algo de un paso anterior: el botón lleva a ese paso (no abre el guardado) */var ir=document.createElement('button');ir.className=bt.className;ir.setAttribute('style',bt.getAttribute('style')||'');ir.dataset.act='ent125ir';ir.dataset.v=String(fa.p);ir.textContent='Revisar y guardar';bt.classList.add('wz-hide');bt.after(ir)}else if(bt){if(ult)bt.textContent='Revisar y guardar';else{var sg=document.createElement('button');sg.className=bt.className;bt.classList.add('wz-hide');sg.setAttribute('style',bt.getAttribute('style')||'');sg.dataset.act='ent125p';sg.dataset.v=String(cur+1);sg.textContent='Siguiente';bt.after(sg)}}}
var _r125=render;render=function(){var r=_r125.apply(this,arguments);try{entPasos125()}catch(e){console.error('ent125',e)}return r};
/* lo que falta (entValida) y de qué paso es */
function entFalta125(){var er=null;try{er=entValida()}catch(e){}if(!er)return null;var sel=String(er[0]).replace(/^CH:/,''),skip=entSalta125(),el=null;try{el=document.querySelector(sel)}catch(e){}
 var p=entPasoDe125(el,skip);if(p==null)p=/^#p(Rm|Mm)$/.test(sel)||/mayq/.test(sel)?0:null;return {er:er,p:p}}
function entAvisa125(er){if(String(er[0]).indexOf('#p')===0&&/Mm|Rm/.test(er[0])){S.dOpen=S.dOpen||{};S.dOpen.entmas=true;render()}window._faltaSel=er[0];toast(er[1].indexOf('Falta')===0?er[1].replace(/^Falta: /,'Escoge '):er[1]);try{vibrar([60,40,60])}catch(e){}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ent125p"]');if(!b)return;e.stopImmediatePropagation();var a=+b.dataset.v,cur=entPaso125();
 if(a>cur){var f=entFalta125();if(f&&(f.p==null||f.p<=cur)){if(f.p!=null&&f.p<cur){entPon125(f.p);render()}entAvisa125(f.er);return}}
 entPon125(a);render();try{window.scrollTo(0,0)}catch(er){}},true);
/* "Revisar y guardar" cuando falta algo de un paso anterior: lleva a ese paso y avisa (no abre el guardado) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ent125ir"]');if(!b)return;e.stopImmediatePropagation();var f=entFalta125();entPon125(+b.dataset.v);render();try{window.scrollTo(0,0)}catch(er){}if(f)entAvisa125(f.er)},true);
