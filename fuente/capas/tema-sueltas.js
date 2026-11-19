/* ===================== TEMA · Piezas sueltas (recibir cierre, reportes, menú, tipos de gasto, pantalla de falla, lo que falta, revisión de cuentas) (aplanado el 19 nov) =====================
   Antes estaba repartido en 15 envolturas encadenadas en l22, l25, l29, l31, l55, l60, l63, l69, l77, l78, l80.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de l90.js (antes de tema-ruta.js), así queda antes de todos los temas que también las envuelven.
   - rcHTML: recibir el cierre (lo que pasó hoy, tickets, actividad). rpForm: el formulario de reportes del chofer.
   - menuHTML: el menú (cambiar de usuario, nube). gxTipos: los tipos de gasto del chofer.
   - falloPantalla77: la pantalla de "algo falló". dfLista: lo que falta por hacer. cuentasRevisar: la revisión de que las cuentas cuadren.
   - rt81HTML NO se movió: l84 la vuelve a definir completa (moverla cambiaría lo que hace).
   ============================================================================================ */

/* menuHTML · de l22 */
var _menu22=menuHTML;menuHTML=function(r){var h=_menu22.apply(this,arguments);if(!REAL)return h;
 h=h.replace(/<div class="lbl" style="margin-top:6px">Demo: ¿qué chofer\?<\/div><div class="chips" style="margin:4px 0">[\s\S]*?<\/div>/,'');
 h=h.replace(/<div class="lbl" style="margin-top:8px"><b>Ver como \(solo en la demo\)<\/b><\/div><div class="chips" style="margin-top:4px">[\s\S]*?<\/div>/,'');
 h=h.replace(/<div class="lbl" style="margin-top:6px">Demo: ¿quién eres\?<\/div><div class="chips" style="margin:4px 0">[\s\S]*?<\/div>/,'');
 h=h.replace(/<div class="lbl" style="margin-top:8px">Miércoles 28 de octubre · datos de ejemplo\. Prototipo: lo que haces se guarda solo mientras la página está abierta\.<\/div><button class="link" data-act="reset">Reiniciar demo<\/button>/,'');
 var yo=r==='admin'?adminNom(S.adminYo)+' (Administrador)':(r==='rep'?chofN(S.chofHoy)+' (Chofer)':(r==='local'?'Venta local':'Contador'));
 h=h.replace(/Entraste como: <b>[^<]*<\/b>/,'Entraste como: <b>'+esc(yo)+'</b>');
 return h.replace('</nav></div>','<button class="btn sec" style="margin-top:12px" data-act="usrcambia">Cambiar de usuario</button><button class="btn sec" style="margin-top:8px" data-act="usrsalir">Cerrar sesión</button><div class="lbl" style="margin-top:10px;text-align:center">'+esc(S.cfg.nombre||'')+' · Ruta Fácil</div></nav></div>')};

/* dfLista · de l22 */
var _dfL22=dfLista;dfLista=function(){return _dfL22.apply(this,arguments).filter(function(x){return !/PIN propio/.test(x.txt)})};

/* dfLista · de l22 */
var _dfL22b=dfLista;dfLista=function(){var L=_dfL22b.apply(this,arguments);try{S.veh.forEach(function(v){if(v.baja)return;var g={t:'veh',id:v.id,p:0};var fl=[];if(!v.marca)fl.push('marca');if(!v.modelo)fl.push('modelo');if(!v.anio)fl.push('año');if(!v.color)fl.push('color');if(fl.length)L.push({pr:3,txt:'Datos de '+v.n+': '+fl.join(', '),go:g});var f2=[];if(!v.vin)f2.push('número de serie');if(!v.capC&&!v.capK)f2.push('capacidad');if(!v.motor)f2.push('motor');if(!v.llanta)f2.push('medida de llanta');if(f2.length)L.push({pr:4,txt:'Más datos de '+v.n+': '+f2.join(', '),go:g})})}catch(e){}L.sort(function(a,b){return a.pr-b.pr});return L};

/* cuentasRevisar · de l25 */
var _cr25=cuentasRevisar;cuentasRevisar=function(){var R=_cr25.apply(this,arguments);R.forEach(function(x){if(x.n==='Ninguna caja se pierde sin registrarse'){x.n='Todas las cajas están contadas';if(!x.ok){var m=/hay (-?\d+) y deberían ser (-?\d+)/.exec(x.det||'');if(m){var d=+m[2]-+m[1];x.det=(d>0?'Faltan '+d:'Sobran '+(-d))+' cajas: deberían ser '+m[2]+' y la app cuenta '+m[1]}}}});return R};

/* menuHTML · de l29 */
var _menu29=menuHTML;menuHTML=function(r){var h=_menu29.apply(this,arguments);if(!NB.on||!NB.listo)return h;var add='<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:10px"><div id="nbind" class="lbl">'+nbEstadoTxt()+'</div><div class="lbl">'+esc(NB.user&&NB.user.email&&!/@rutafacil\.app$/.test(NB.user.email)?NB.user.email:(NB.perfil&&NB.perfil.usuario?'Usuario: '+NB.perfil.usuario:''))+'</div><button class="link" data-act="nbsalir">Cerrar sesión en este celular</button></div>';
 var i=h.lastIndexOf('</nav>');return i<0?h+add:h.slice(0,i)+add+h.slice(i)};

/* rpForm · de l31 */
var _rpF31=rpForm;rpForm=function(){var p=S.rp,cs=S.cli.filter(function(c){return !c.oculto});if(p.cli!=='__nuevo'&&!cl(+p.cli))p.cli=cs[0]?String(cs[0].id):'__nuevo';var h=_rpF31.apply(this,arguments);
 h=h.replace(/(<select id="rpc"[^>]*>)([\s\S]*?)(<\/select>)/,function(m,a,o,z){return a+o+'<option value="__nuevo"'+(p.cli==='__nuevo'?' selected':'')+'>+ Cliente nuevo</option>'+z});
 var extra=(p.cli==='__nuevo'?'<div class="field"><label for="rpnn">Nombre del cliente</label><input id="rpnn" type="text" data-bind="rp.nn" value="'+esc(p.nn||'')+'" style="width:190px;text-align:left"></div><div class="field"><label for="rpnt">Teléfono</label><input id="rpnt" type="tel" data-bind="rp.nt" value="'+esc(p.nt||'')+'" style="width:190px;text-align:left"></div>':'')+(p.err?'<div class="neg" role="alert" style="font-weight:700;margin:6px 0">'+esc(p.err)+'</div>':'');
 return h.replace('<div style="display:flex;gap:8px"><button class="btn" style="flex:2" data-act="rpsave">',extra+'<div style="display:flex;gap:8px"><button class="btn" style="flex:2" data-act="rpsave">')};

/* rpForm · de l55 */
var _rpF55=rpForm;rpForm=function(){return fsDe(_rpF55.apply(this,arguments),'Pedido')};

/* rcHTML · de l60 */
var _rcH60=rcHTML;rcHTML=function(){var h=_rcH60.apply(this,arguments);try{if(!h||!S.rcv||S.rcv.p!==0)return h;var a=actCierreHTML141(iso(TODAY),+S.chofHoy);if(!a)return h;
 var i=h.indexOf('<div style="margin-top:auto');return i>-1?h.slice(0,i)+'<div class="card" data-k="rcact">'+a+'</div>'+h.slice(i):h}catch(e){return h}};

/* gxTipos · de l63 */
var _gxT63=gxTipos;gxTipos=function(){var h=_gxT63.apply(this,arguments);if(chofComida())return h;return h.replace(/<button data-act="gxt2" data-t="Comida o viáticos"[^>]*>[^<]*<\/button>/,'')+'<div class="lbl">La comida solo se registra si el administrador te la autorizó.</div>'};

/* rcHTML · de l63 */
var _rcH63=rcHTML;rcHTML=function(){var h=_rcH63.apply(this,arguments);try{if(!h||!S.rcv||S.rcv.p!==0)return h;var n=tkCuantos();if(!n)return h;var on=!!S.rcv.tk;
 var c='<div class="card"><div class="row"><span><b>Entregó sus '+n+' ticket'+(n>1?'s':'')+'</b><br><span class="lbl">Gasolina, casetas y demás gastos (en papel).</span></span><button class="btn sm'+(on?'':' sec')+'" style="width:auto" data-act="rctk" aria-pressed="'+on+'">'+(on?'✓ Sí':'No')+'</button></div></div>';
 var i=h.indexOf('<div style="margin-top:auto');return i>-1?h.slice(0,i)+c+h.slice(i):h}catch(e){return h}};

/* gxTipos · de l69 */
var _gxT69=gxTipos;gxTipos=function(){return _gxT69.apply(this,arguments).replace(/<button data-act="gxt2" data-t="Caseta"[^>]*>[^<]*<\/button>/,'')};

/* cuentasRevisar · de l69 */
var _cr69=cuentasRevisar;cuentasRevisar=function(){var R=_cr69.apply(this,arguments);try{R.forEach(function(x){var m=CU68[x.n];if(!m)return;x.n0=x.n;x.n=m[0];x.app=!!m[1];if(x.ok)return;var d=String(x.det||'');
   if(x.n0==='Los números se pueden calcular'){d='Algún número del inventario, la caja o las deudas quedó vacío'}
   else if(x.n0==='Todas las cajas están contadas'||x.n0==='Ningún caja se pierde sin registrarse'){var w=cajasDonde(),es=cajasEsperadas(),df=Math.round(es-w.tot);d=isFinite(w.tot)&&isFinite(es)?('La app cuenta '+Math.round(w.tot).toLocaleString('es-MX')+' taras y deberían ser '+Math.round(es).toLocaleString('es-MX')+': '+(df>0?'faltan '+df:'sobran '+(-df))+'. Cuéntalas en Bodega → Taras'):'Un número de las taras quedó vacío'}
   else if(x.n0==='Las cajas cuadran con dónde están'){var w2=cajasDonde();d='Total '+Math.round(w2.tot)+': vacías en bodega '+num(w2.vac)+', llenas '+num(w2.llenas)+', en camión '+num(w2.cam)+', con clientes '+num(w2.cli)+', con proveedores '+num(w2.pv)}
   else if(x.n0==='Inventario sin números negativos'){d=d.replace(/cajas vacías/g,'taras vacías')+'. Corrige el conteo en Bodega'}
   x.det=d+(x.app?'. Es un error de la app, no tuyo; ya quedó anotado':'');if(x.app)apErr('no cuadra',x.n+': '+d,'cuentas')})}catch(e){}return R};

/* falloPantalla77 · de l77 */
var _fP77b=falloPantalla77;falloPantalla77=function(t){try{falloPausa77();var txt=String(t||'')+'\n\n— Diagnóstico —\n'+diagTxt77();FALLO77.ult=txt;try{localStorage.setItem('pnFallo',txt)}catch(x){}
 var o=document.getElementById('fallo77');if(o)o.remove();var f=document.createElement('iframe');f.id='fallo77';f.setAttribute('style','position:fixed;inset:0;width:100%;height:100%;border:0;z-index:2147483000;background:#F6F1E3');
 var es=function(s){return String(s).replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c]})},bt='display:block;width:100%;min-height:56px;margin-top:10px;border-radius:16px;font-size:18px;font-weight:800;font-family:inherit';
 f.srcdoc='<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#F6F1E3;color:#1E2A1A;font-family:system-ui,sans-serif}pre{white-space:pre-wrap;word-break:break-word;font-size:12px;background:#fff;border-radius:10px;padding:10px;user-select:text;-webkit-user-select:text}</style></head><body><div style="max-width:480px;margin:0 auto;padding:22px 16px 40px">'
  +'<div style="font-size:40px;text-align:center">🛠️</div><h1 style="font-size:23px;text-align:center;margin:6px 0">La app encontró un problema</h1><p style="font-size:16px;text-align:center;margin:6px 0">No se perdió nada del negocio. Manda este error para arreglarlo.</p>'
  +'<button id="wa" style="'+bt+';border:0;background:#25D366;color:#fff">📲 Mandar el error por WhatsApp</button><button id="cp" style="'+bt+';border:2px solid #2F7D32;background:#fff;color:#2F7D32">📋 Copiar el error</button>'
  +'<button id="re" style="'+bt+';border:0;background:#2F7D32;color:#fff">Reintentar</button><button id="nube" style="'+bt+';border:2px solid #B45309;background:#fff;color:#B45309;font-size:16px">☁️ Volver a bajar los datos de la nube</button>'
  +'<div style="font-size:14px;font-weight:700;margin-top:16px">El error:</div><pre id="tx">'+es(txt)+'</pre></div></body></html>';
 document.body.appendChild(f);
 f.onload=function(){try{var d=f.contentDocument,P=window,g=function(id){return d.getElementById(id)};
  g('re').onclick=function(){P.location.reload()};
  g('wa').onclick=function(){var u='https://wa.me/?text='+encodeURIComponent(txt.slice(0,3500));try{P.open(u,'_blank')||(P.location.href=u)}catch(x){P.location.href=u}};
  g('cp').onclick=function(){var ok=function(){g('cp').textContent='✓ Copiado'};try{(f.contentWindow.navigator.clipboard||P.navigator.clipboard).writeText(txt).then(ok,function(){var r=d.createRange();r.selectNodeContents(g('tx'));var s=f.contentWindow.getSelection();s.removeAllRanges();s.addRange(r);try{d.execCommand('copy');ok()}catch(x){}})}catch(x){}};
  g('nube').onclick=function(){if(!f.contentWindow.confirm('¿Seguro? Se borra lo guardado en este celular y se vuelve a bajar todo de la nube.'))return;var fin=function(){try{localStorage.setItem('pnFalloNube','1')}catch(x){}P.location.reload()};var listo=false,f2=function(){if(listo)return;listo=true;fin()};try{P._noGuardar77=1;idbAbrir(function(db){if(!db)return f2();try{var tx=db.transaction('kv','readwrite');tx.objectStore('kv').delete('S');tx.oncomplete=f2;tx.onerror=f2}catch(x){f2()}});setTimeout(f2,3000)}catch(x){f2()}}}catch(x){}}}catch(x){try{_fP77b(t)}catch(y){}}};

/* rcHTML · de l78 */
var _rc78=rcHTML;rcHTML=function(){var h=_rc78.apply(this,arguments);try{if(!h||h.indexOf('data-k="rcact"')<0)return h;var n=0;try{n=actDe(+S.chofHoy,iso(TODAY)).length}catch(e){}
  return h.replace(/<div class="card" data-k="rcact"><div style="margin-top:8px"><b>Lo que pasó hoy en su ruta<\/b>/,'<details class="card" data-k="rcact78"'+(S.dOpen.rcact78?' open':'')+'><summary><b>Lo que pasó hoy en su ruta</b><span class="lbl">'+n+' cosa'+(n===1?'':'s')+' · toca para ver</span></summary><div style="margin-top:8px">').replace(/(data-k="rcact78"[\s\S]*?<\/div>)<\/div>(<div style="margin-top:auto)/,'$1</details>$2')}catch(e){return h}};

/* falloPantalla77 · de l80 */
var _fP80=falloPantalla77;falloPantalla77=function(t){_fP80.apply(this,arguments);try{var f=document.getElementById('fallo77');if(!f||f.tagName!=='IFRAME')return;var pon=function(){try{var d=f.contentDocument;if(!d||d.getElementById('rep80'))return;var re=d.getElementById('re');if(!re)return;var b=d.createElement('button');b.id='rep80';b.textContent='🔧 Reparar la conexión con la nube';b.setAttribute('style',re.getAttribute('style').replace('#2F7D32','#1D4ED8'));re.after(b);b.onclick=function(){repara80('botón')}}catch(e){}};if(f.contentDocument&&f.contentDocument.readyState==='complete')pon();f.addEventListener('load',pon)}catch(e){}};
