/* ===================== v6.3 · Diseño: todo en tarjetas (automático), campos que se ven, burbujas como pestañas,
   filtros de clientes en cuadrícula, sin textos de demo ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* campos para escribir: borde marcado y fondo distinto al de la tarjeta */
 '.field input,.field select,.field textarea,input.full,select.full,textarea.full{border:1.5px solid color-mix(in srgb,var(--fg) 32%,transparent)!important;background:var(--surface2)!important}',
 '.field input:focus,.field select:focus,.field textarea:focus,input.full:focus{border-color:var(--accent)!important;outline:2px solid color-mix(in srgb,var(--accent) 35%,transparent);outline-offset:1px}',
 '.card .card .field input{background:var(--surface)!important}',
 /* tarjetas automáticas */
 '.autocard{margin-top:12px}',
 /* burbujas como pestañas */
 '.bubpanel{display:flex;flex-direction:column;gap:6px}.bubtabs{display:flex;gap:6px;align-items:center;justify-content:flex-end}.bubtabs button{border:0;border-radius:999px;padding:8px 14px;font-weight:800;font-size:14px;min-height:38px;background:color-mix(in srgb,#16200F 55%,transparent);color:#fff;box-shadow:0 4px 10px rgba(0,0,0,.2)}.bubtabs button[aria-pressed="true"]{background:#16200F}.bubtabs button.df[aria-pressed="true"]{background:#3A2A08}.bubtabs .min{background:#fff;color:#16200F;width:38px;padding:0;font-size:20px}',
 /* filtros de clientes: cuadrícula que se ve completa */
 '.cligrid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px}.cligrid button{min-height:58px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface2);color:var(--fg);font-size:14px;font-weight:700;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px}.cligrid button b{font-size:18px}.cligrid button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}',
 '.cliag{display:flex;align-items:center;gap:8px;margin-top:8px}.cliag .btn{flex:1}'].join('\n');document.head.appendChild(st)})();
/* ---------- 64/72/73 · lo que esté suelto sobre el fondo se mete en su tarjeta (siempre igual, sin parpadeo) ---------- */
var TJ_KEEP=/(^|\s)(card|fihero|fivh|hello|wz-hd|wz-nav|entbar|mindock|foot|cligrid|bubpanel|tabs|fihd|fitabs|chips scroll|slideup|vbub|dfbub|guia|aprende|poscierre|cienv|toast|spacer|sticky|map|mapa|leaflet)(\s|$)/;
function tjSuelto(n){if(n.nodeType===3)return /\S/.test(n.nodeValue);if(n.nodeType!==1)return false;var t=n.tagName;if(/^(H1|H2|H3|NAV|SCRIPT|STYLE|DETAILS|HR|BR|IMG|SVG|CANVAS|DIALOG|FORM)$/.test(t))return false;
 if(t==='BUTTON'||t==='A')return false;if(t==='LABEL'&&/\bbtn\b/.test(n.className))return false;if(t==='INPUT'&&n.type==='file')return false;
 var c=n.className&&n.className.baseVal==null?String(n.className):'';if(TJ_KEEP.test(c))return false;if(n.id&&/ov$/.test(n.id))return false;if(n.hasAttribute('data-vivo')||n.hasAttribute('role')&&/dialog|status|alert/.test(n.getAttribute('role'))&&/card|note|alert|good/.test(c))return false;
 /* un contenedor que solo agrupa tarjetas no se toca */
 if(n.children.length&&[].every.call(n.children,function(k){return /\bcard\b/.test(k.className||'')||/^(BUTTON|DETAILS|H1|H2)$/.test(k.tagName)}))return false;
 if(/display:\s*flex/.test(n.getAttribute('style')||'')&&n.querySelector('.btn')&&!n.querySelector('.lbl,.row,.field'))return false;
 return !!(n.textContent||'').trim()||!!n.querySelector('input,select,textarea')}
function tjAgrupa(C){if(!C)return;var kids=[].slice.call(C.childNodes),grupo=[];var cierra=function(){var hay=grupo.some(function(n){return n.nodeType===1});if(hay){var w=document.createElement('div');w.className='card autocard';grupo[0].parentNode.insertBefore(w,grupo[0]);grupo.forEach(function(n){w.appendChild(n)})}grupo=[]};
 kids.forEach(function(n){if(n.nodeType===3&&!/\S/.test(n.nodeValue)){if(grupo.length)grupo.push(n);return}if(n.nodeType===1&&n.tagName==='DETAILS'&&!/\bcard\b/.test(n.className)){cierra();n.classList.add('card');return}if(tjSuelto(n))grupo.push(n);else cierra()});cierra()}
function tarjetear(h,donde){if(!h||typeof h!=='string')return h;try{var t=document.createElement('template');t.innerHTML=h;var f=t.content;
 if(!donde)tjAgrupa(f);else [].forEach.call(f.querySelectorAll(donde),function(C){tjAgrupa(C)});return t.innerHTML}catch(e){return h}}
['inicio','clientes','bodega','cargas','gastos','vehiculos','personal','bienes','sugerencias','ruta','entrega','cierre','viaje','estadisticas'].forEach(function(n){if(typeof window[n]!=='function')return;var f=window[n];window[n]=function(){return tarjetear(f.apply(this,arguments))}});
/* fichas: el contenido de la pestaña */
var _fH46=fichaHTML;fichaHTML=function(f){var h=_fH46.apply(this,arguments);return tarjetear(h,'.fibody')};
/* pantallas encima (viaje, ubicación, carga extra, pasos…) */
var _suH46=setupHTML;setupHTML=function(){var h=_suH46.apply(this,arguments);return h?tarjetear(h,'[role="dialog"] > .w, [role="dialog"] > .fiw, .vwbody, .vwsec'):h};
/* ---------- 57 · sin textos de demo, prueba (salvo los dos botones), web ni navegador ---------- */
var TXT_DEMO=[[/Haz una ruta de prueba/g,'Haz tu primera ruta'],[/✓?\s*Impresora de prueba conectada/g,''],[/\s*\(solo demo\)/g,''],[/\s*En la demo puedes seguir\./g,''],[/En la app final no te dejará seguir sin esto\.\s*/g,'Llénalo para seguir. '],[/Las fotos y los datos son de ejemplo\.[^<]*/g,''],[/Datos de ejemplo hasta ayer\.\s*/g,''],[/\s*\(en la demo son opcionales\)/g,''],[/Entra a la vista de administrador para verlo en Inicio\./g,'El administrador ya lo puede ver.'],[/Prototipo:[^<]*/g,''],[/Reiniciar demo/g,''],[/\bde la demo\b/g,''],[/\ben la demo\b/gi,''],[/\bdemo\b/gi,''],[/Control de reparto · v[\d.]+/g,'Control de reparto']];
function sinDemoTxt(root){if(typeof MODO==='undefined'||MODO!=='vacio'||!root)return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,L=[];while(n=w.nextNode()){if(n.parentElement&&/SCRIPT|STYLE/.test(n.parentElement.tagName))continue;if(/demo|ejemplo|Prototipo|navegador|\bweb\b|ruta de prueba|Impresora de prueba/i.test(n.nodeValue))L.push(n)}
 L.forEach(function(t){var v=t.nodeValue;TXT_DEMO.forEach(function(r){v=v.replace(r[0],r[1])});if(v!==t.nodeValue)t.nodeValue=v});
 [].forEach.call(root.querySelectorAll('[data-act="demoreset"],[data-act*="demo"],.foot'),function(el){if(/demo|Prototipo/i.test(el.textContent)||/demo/.test(el.dataset.act||''))el.style.display='none'})}
var _r46=render;render=function(){var r=_r46.apply(this,arguments);try{sinDemoTxt(document.body)}catch(e){}return r};
var _toast46=toast;toast=function(t){if(typeof MODO!=='undefined'&&MODO==='vacio'&&typeof t==='string'){TXT_DEMO.forEach(function(r){t=t.replace(r[0],r[1])})}return _toast46.call(this,t)};
var _aM46=abrirModal;abrirModal=function(t,m,b){if(typeof MODO!=='undefined'&&MODO==='vacio'){var f=function(s){s=String(s||'');TXT_DEMO.forEach(function(r){s=s.replace(r[0],r[1])});return s};t=f(t);m=f(m);b=(b||[]).filter(function(x){return x[1]!=='wzforce'}).map(function(x){return [f(x[0])].concat(x.slice(1))})}return _aM46.call(this,t,m,b)};
/* ---------- 59 · burbujas: abiertas se ven como pestañas [Viaje] [Faltan N] ---------- */
function bubVwHay(){try{var L=vwList().filter(function(x){return x.k!=='done'});if(!L.length)return false;var v=L.indexOf(S.vw)>-1?S.vw:L[0];return !v.open}catch(e){return false}}
function bubDfN(){try{return dfOn()?dfLista().length:0}catch(e){return 0}}
var _vwB46=vwBurbuja;vwBurbuja=function(){var hv=bubVwHay(),nd=bubDfN();if(!(hv&&nd))return _vwB46.apply(this,arguments);
 var abierta=!S.bubMin||!S.dfMin;if(!abierta)return _vwB46.apply(this,arguments);
 var tab=S.bubTab||(!S.bubMin?'vw':'df');if(tab==='vw'&&S.bubMin&&!S.dfMin)tab='df';if(tab==='df'&&S.dfMin&&!S.bubMin)tab='vw';
 var g1=S.bubMin,g2=S.dfMin,cuerpo='';try{if(tab==='vw'){S.bubMin=false;cuerpo=_vwB16.apply(this,arguments).replace(dfBurbuja(),'')}else{S.dfMin=false;cuerpo=dfBurbuja()}}finally{S.bubMin=g1;S.dfMin=g2}
 cuerpo=cuerpo.replace(/<button class="link" style="color:#fff;min-height:30px;font-size:20px" data-act="(bubmin|dfmin)" aria-label="Minimizar">–<\/button>/,'');
 return '<div class="bubpanel"><div class="bubtabs" role="tablist"><button role="tab" data-act="bubtab" data-v="vw" aria-pressed="'+(tab==='vw')+'">🛻 Viaje</button><button role="tab" class="df" data-act="bubtab" data-v="df" aria-pressed="'+(tab==='df')+'">📝 Faltan '+nd+'</button><button class="min" data-act="bubmin2" aria-label="Minimizar">–</button></div>'+cuerpo+'</div>'};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="bubtab"],[data-act="bubmin2"],[data-act="bubmax"],[data-act="dfmax"]');if(!b)return;var a=b.dataset.act;
 if(a==='bubmax'||a==='dfmax'){S.bubTab=a==='bubmax'?'vw':'df';if(bubVwHay()&&bubDfN()){e.stopImmediatePropagation();S.bubMin=a!=='bubmax';S.dfMin=a!=='dfmax';render()}return}
 e.stopImmediatePropagation();if(a==='bubmin2'){S.bubMin=true;S.dfMin=true;render();return}S.bubTab=b.dataset.v;S.bubMin=S.bubTab!=='vw';S.dfMin=S.bubTab!=='df';render()},true);
/* ---------- 62 · filtros de clientes en cuadrícula, con cuántos hay en cada uno ---------- */
function cliCuenta(f){var g=S.cliF,q=S.cliQ,c=S.cliCh;S.cliF=f;S.cliQ='';S.cliCh='';try{var L=cliLista();return L.filter(function(x,i){return L.indexOf(x)===i}).length}catch(e){return 0}finally{S.cliF=g;S.cliQ=q;S.cliCh=c}}
var _cT46=cliTools;cliTools=function(){var h=_cT46.apply(this,arguments),fl=S.cliF||'todos';
 var grid='<div class="cligrid" role="group" aria-label="Filtro">'+[['todos','Todos'],['hoy','Les toca hoy'],['morosos','Morosos'],['deben','Me deben'],['cajas','Deben cajas'],['nuevos','Nuevos']].map(function(x){return '<button data-act="clif" data-v="'+x[0]+'" aria-pressed="'+(fl===x[0])+'"><b>'+cliCuenta(x[0])+'</b>'+x[1]+'</button>'}).join('')+'</div>'
  +'<div class="field"><label for="clichs">Chofer</label><select id="clichs" data-clich="1" style="width:170px"><option value="">Todos</option>'+choferesL().filter(function(c){return c.id!==2&&!c.baja}).map(function(c){return '<option value="'+c.id+'"'+(fl==='chofer'&&String(S.cliCh||'')===String(c.id)?' selected':'')+'>'+esc(c.n)+'</option>'}).join('')+'</select></div>';
 h=h.replace(/<div class="chips scroll" role="group" aria-label="Filtro"[\s\S]*?<\/div>/,grid);
 h=h.replace(/<div class="chips" style="margin-top:6px"><button data-act="clich"[\s\S]*?<\/div>/,'');
 if(S.role==='admin'&&!S.encOn)h=h.replace('<div class="card cli-tools span" style="padding:10px 12px">','<div class="card cli-tools span" style="padding:10px 12px"><button class="btn" style="margin-bottom:8px" data-act="clialta">+ Agregar cliente</button>');
 return h};
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.clich)return;S.cliCh=t.value;S.cliF=t.value?'chofer':'todos';render()},true);
/* el viaje de carga y la pantalla de ubicación también van en tarjetas */
if(typeof vwBody==='function'){var _vwBo46=vwBody;vwBody=function(){return tarjetear(_vwBo46.apply(this,arguments))}}
if(typeof vwSideHTML==='function'){var _vwSi46=vwSideHTML;vwSideHTML=function(){return tarjetear(_vwSi46.apply(this,arguments))}}
if(typeof ubHTML==='function'){var _ubH46=ubHTML;ubHTML=function(){var h=_ubH46.apply(this,arguments);return h?tarjetear(h,'#ubov > div, #ubov .w, #ubov .fiw'):h}}
