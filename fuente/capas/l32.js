/* ===================== v6.1 · Cierre por pasos, reabrir con permiso, carga extra, fotos obligatorias, PIN ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 /* la barra de Total ya no tapa lo de abajo */
 'main:has(.entbar){padding-bottom:calc(150px + env(safe-area-inset-bottom,0px))}',
 '#cxov,#fnov{position:fixed;inset:0;z-index:92;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}',
 '#cxov .w,#fnov .w{max-width:520px;margin:0 auto;padding:calc(14px + var(--sbar,0px)) 16px 40px}',
 '.fotono{display:block;margin:6px auto 0;font-size:13px;color:var(--muted);background:none;border:0;text-decoration:underline;min-height:32px}',
 '.cienv{text-align:center}.cienv .big{font-size:44px;line-height:1}'
].join('\n');document.head.appendChild(st)})();
if(typeof REAL!=='undefined'&&REAL)FOTOS_OBLIGATORIAS=true;
['reab','gps'].forEach(function(k){if(AR_K.indexOf(k)<0)AR_K.push(k)});
/* ---------- 1. Cierre: un paso por pantalla ---------- */
var CI_P=['Odómetro','Gasolina','Fotos','Cajas','Efectivo','Enviar'];
cierrePasos=function(){if(S.role!=='rep'||S.tab.rep!=='cierre'||!S.cierre||S.cierre.sent)return;var m=document.querySelector('main');if(!m||m.querySelector('.wz-hd'))return;
 var K=Array.prototype.slice.call(m.children).filter(function(x){return !x.classList.contains('foot')&&x.tagName!=='H1'&&!x.classList.contains('pnback')}),cur=Math.max(0,Math.min(5,S.cierreP||0));
 var paso=function(el){var t=el.textContent||'';if(/Odómetro final/.test(t))return 'veh';if(/Combustible del día/.test(t))return 1;if(/Fotos del vehículo/.test(t))return 2;if(/Cajas que salieron|sin visitar|pasaron a la ruta|Cajas vacías que regresan|Cajas llenas que regresan/.test(t))return 3;if(/Otros gastos de la ruta|Efectivo a entregar/.test(t))return 4;if(el.tagName==='BUTTON'&&/Enviar cierre|Terminar mi ruta/.test(t))return 5;return -1};
 K.forEach(function(el){var p=paso(el);if(p==='veh'){if(cur!==0&&cur!==1){el.classList.add('wz-hide');return}var ks=Array.prototype.slice.call(el.children),corte=-1;ks.forEach(function(k,i){if(corte<0&&/Nivel del tanque/.test(k.textContent||'')&&k.classList.contains('lbl'))corte=i});ks.forEach(function(k,i){var tanque=corte>-1&&i>=corte;if((cur===0&&tanque)||(cur===1&&!tanque))k.classList.add('wz-hide')});return}if(p>=0&&p!==cur)el.classList.add('wz-hide')});
 var hd=document.createElement('div');hd.innerHTML='<div class="lbl" style="margin:0 2px"><b>Paso '+(cur+1)+' de 6 · '+CI_P[cur]+'</b></div><div class="wz-hd">'+CI_P.map(function(x,i){return '<i class="'+(i<=cur?'on':'')+'"></i>'}).join('')+'</div>';var h1=m.querySelector('h1');if(h1)h1.after(hd);
 if(cur===1){var tk=document.createElement('div');tk.className='card';tk.innerHTML=S.cierre.tankOk?'<div style="color:var(--accent);font-weight:700">✓ Tanque confirmado: '+esc(S.cierre.tank||S.cierre.tankIni||'')+'</div>':'<button class="btn" data-act="citankok">Sí, el tanque está en '+esc(S.cierre.tank||S.cierre.tankIni||'')+'</button><div class="lbl" style="margin-top:4px">Primero mueve la aguja al nivel que marca el tablero.</div>';var vc=K.filter(function(x){return paso(x)==='veh'})[0];(vc?vc.after(tk):hd.after(tk))}
 if(cur===0){var nt=document.createElement('div');nt.className='card note';nt.innerHTML='<b>Escribe lo que marca el tablero</b><div style="font-size:14px">Y tómale foto al odómetro.</div>';hd.after(nt)}
 if(cur===5){var r=cierreRes(),c=S.cierre,res=document.createElement('div');res.className='card good';res.innerHTML='<b>Revisa antes de enviar</b>'+rw('Odómetro',num(c.odo).toLocaleString('es-MX')+' km ('+Math.max(0,r.km)+' km)')+rw('Tanque',esc(c.tank||c.tankIni||''))+rw('Vendiste',money(r.total))+rw('Debes entregar',money(r.efectivo))+rw('Cajas entregadas',r.R)+rw('Cajas llenas que regresan',r.reg)+rw('Cajas vacías recibidas',r.V)+'<div class="lbl" style="margin-top:6px">Al enviarlo ya no lo puedes cambiar. Si te equivocaste, el administrador te lo puede reabrir.</div>';var bt=K.filter(function(x){return paso(x)===5})[0];if(bt)bt.before(res);else hd.after(res)}
 var nav=document.createElement('div');nav.className='wz-nav';nav.innerHTML=(cur>0?'<button class="btn sec" data-act="cipaso" data-v="'+(cur-1)+'">Atrás</button>':'')+(cur<5?'<button class="btn" data-act="cipaso" data-v="'+(cur+1)+'">Siguiente</button>':'');var foot=m.querySelector('.foot');if(nav.innerHTML)(foot?foot.before(nav):m.appendChild(nav))};
/* no avanza sin lo de cada paso */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cipaso"]');if(!b||!S.cierre)return;var a=+b.dataset.v,cur=S.cierreP||0,c=S.cierre,falta='';if(a<=cur)return;
 if(cur===0){if(!(num(c.odo)>0))falta='Escribe el odómetro';else if(num(c.odo)<num(c.odoIni))falta='El odómetro no puede ser menor al de la salida ('+num(c.odoIni).toLocaleString('es-MX')+' km)';else if(FOTOS_OBLIGATORIAS&&!(S.salida.fotosFin&&S.salida.fotosFin.odo))falta='Toma la foto del odómetro'}
 if(cur===1&&!c.tankOk)falta='Confirma el nivel del tanque';
 if(cur===2&&FOTOS_OBLIGATORIAS){var ff=S.salida.fotosFin||{},fl=FOTOS.filter(function(x){return !ff[x[0]]});if(fl.length)falta='Faltan fotos: '+fl.map(function(x){return x[1].toLowerCase()}).join(', ')}
 if(falta){e.stopImmediatePropagation();toast(falta);try{vibrar([60,40,60])}catch(er){}}},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="citankok"]');if(!b||!S.cierre)return;e.stopImmediatePropagation();S.cierre.tankOk=true;render()},true);
/* al enviar: regresa a "Hola, Danu" con el cierre confirmado */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="enviar"]');if(!b||S.role!=='rep')return;var c=S.cierre;setTimeout(function(){if(c&&c.sent){S.cierreP=0;S.tab.rep='ruta';S.ciEnvH=hhmm();render();window.scrollTo(0,0)}},30)},true);
/* ---------- 2. Seguir trabajando después del cierre: con permiso del administrador ---------- */
function reabDe(id){return nbRGet(id,'reab')||null}
var _seguirOk=false;
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="seguir"]');if(!b||_seguirOk||S.role!=='rep')return;e.stopImmediatePropagation();var r=S.reab;
 if(r&&r.est==='pend'){toast('Ya le pediste permiso al administrador. Espera su respuesta');return}
 S.reab={k:b.dataset.k||'carga',est:'pend',t:Date.now(),h:hhmm()};S.avPrecio.push('URGENTE: '+chofN(S.chofHoy)+' pide reabrir su ruta para '+(S.reab.k==='carga'?'cargar más':'dar otra vuelta')+'. Autorízalo en Inicio.');render()},true);
/* lo que ve el chofer mientras espera */
var _ru32=ruta;ruta=function(){var h=_ru32.apply(this,arguments);if(S.role!=='rep'||!S.cierre||!S.cierre.sent)return h;var r=S.reab,top='';
 top='<div class="card good cienv"><div class="big">✓</div><b style="font-size:20px">Cierre enviado</b><div class="lbl">'+(S.ciEnvH?'A las '+esc(S.ciEnvH)+'. ':'')+'Entrega '+money((S.cierre.res||{}).efectivo||0)+' en efectivo al administrador.</div></div>';
 if(r&&r.est==='pend')top+='<div class="card note"><b>Esperando permiso del administrador…</b><div class="lbl">Pediste '+(r.k==='carga'?'cargar más':'dar otra vuelta')+' a las '+esc(r.h||'')+'. Cuando te autorice, aquí te sale para seguir.</div></div>';
 else if(r&&r.est==='no')top+='<div class="card alert"><b>El administrador no autorizó seguir</b><div class="lbl">Si necesitas algo, llámale.</div></div>';
 h=h.replace(/(<div class="hello">[\s\S]*?<\/div>)/,'$1'+top);
 return h.replace(/<button class="btn" style="flex:1" data-act="seguir" data-k="carga">Cargar más<\/button>/,'<button class="btn" style="flex:1" data-act="seguir" data-k="carga">Pedir permiso: cargar más</button>').replace(/<button class="btn sec" style="flex:1" data-act="seguir" data-k="vuelta">Otra vuelta<\/button>/,'<button class="btn sec" style="flex:1" data-act="seguir" data-k="vuelta">Pedir permiso: otra vuelta</button>').replace('Como aún no entregas el efectivo, se reabre tu cierre.','Para seguir, el administrador tiene que autorizarlo.').replace('Como ya entregaste el efectivo, se abre un segundo cierre.','Para seguir, el administrador tiene que autorizarlo.')};
/* cuando el admin autoriza, en el celular del chofer se reabre y se abre la pantalla de carga */
var _r32=render;render=function(){try{if(S.role==='rep'&&S.reab&&S.reab.est==='ok'&&S.cierre&&S.cierre.sent&&!_seguirOk){var k=S.reab.k;S.reab=null;_seguirOk=true;var bt=document.createElement('button');bt.dataset.act='seguir';bt.dataset.k=k;bt.style.display='none';document.body.appendChild(bt);try{bt.click()}finally{bt.remove();_seguirOk=false}S.cierreP=0;S.cx={R:'',M:'',foto:null,k:k};S.avPrecio.push(chofN(S.chofHoy)+' reabrió su ruta con tu permiso')}}catch(e){console.error(e)}return _r32.apply(this,arguments)};
/* en Inicio del admin: autorizar */
var _cT32=cierreTop;cierreTop=function(){var h=_cT32.apply(this,arguments);if(S.role!=='admin')return h;
 nbRutaIds().forEach(function(id){var r=reabDe(id);if(!r||r.est!=='pend')return;h='<div class="card alert" data-key="reab'+id+'"><b style="font-size:17px">'+esc(chofN(id))+' quiere seguir trabajando</b><div class="lbl">Ya mandó su cierre y pide '+(r.k==='carga'?'cargar más fruta':'dar otra vuelta')+' ('+esc(r.h||'')+'). Si lo autorizas, se reabre su ruta y registra lo que carga.</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:2" data-act="reabsi" data-id="'+id+'">Autorizar</button><button class="btn sec" style="flex:1" data-act="reabno" data-id="'+id+'">No</button></div></div>'+h});return h};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="reabsi"],[data-act="reabno"]');if(!b)return;e.stopImmediatePropagation();var id=+b.dataset.id,r=reabDe(id);if(!r)return;var n=JSON.parse(JSON.stringify(r));n.est=b.dataset.act==='reabsi'?'ok':'no';n.por=quien();nbRSet(id,'reab',n);
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:(n.est==='ok'?'Autorizó':'No autorizó')+' que '+chofN(id)+' siga trabajando'});toast(n.est==='ok'?'Autorizado: ya le salió para seguir':'Le avisamos que no');render()},true);
/* ---------- 3. Carga extra: su propia pantalla (cajas, kilos y foto) ---------- */
function cxHTML(){var x=S.cx;if(!x||S.role!=='rep')return '';var f=x.foto;
 return '<div id="cxov" role="dialog" aria-label="Lo que cargaste"><div class="w"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:20px">¿Cuánto cargaste?</b><div class="lbl">'+(x.k==='vuelta'?'Para tu otra vuelta. ':'')+'Ya traes '+S.inv.reparto+' cajas y '+S.inv.repartoKg+' kg en el camión.</div></span><button class="helpb" style="margin:0" data-act="cxx" aria-label="Cerrar">×</button></div>'
  +'<div class="card">'+numStep('cx.R','Cajas de roatán que cargaste',x.R,'cxR')+kgStep('cx.M','Kilos de macho que cargaste',x.M,'cxM')+'<div class="lbl">En bodega hay '+S.inv.maduras+' cajas maduras y '+S.inv.kgMaduro+' kg de macho maduro.</div></div>'
  +'<div class="card"><b>Foto de lo que cargaste (obligatoria)</b><label class="ubfoto" for="cxF" style="display:flex;align-items:center;justify-content:center;min-height:120px;border:2px dashed var(--line);border-radius:14px;margin-top:8px;cursor:pointer;overflow:hidden">'+(f?'<img src="'+f+'" alt="Lo que cargaste" style="width:100%;max-height:220px;object-fit:cover">':'📷 Tomar foto')+'</label><input id="cxF" type="file" accept="image/*" capture="environment" data-cxf="1" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">'+(f?'':'<button class="fotono" data-act="fotono" data-cx="1">No pude tomarla</button>')+'</div>'
  +(x.err?'<div class="neg" role="alert" style="font-weight:700;margin:8px 0">'+esc(x.err)+'</div>':'')+'<button class="btn" style="margin-top:12px;min-height:56px" data-act="cxsave">Guardar lo que cargué</button></div></div>'}
var _suH32=setupHTML;setupHTML=function(){return fnHTML()||cxHTML()||_suH32.apply(this,arguments)};
/* la tarjeta "Cargar más mercancía" ahora abre esa pantalla */
extraCard=function(){return '<button class="btn sec" style="width:100%;margin:8px 0" data-act="cxabre">📦 Cargar más mercancía'+(S.extras&&S.extras.length?' · '+S.extras.length+' carga'+(S.extras.length>1?'s':'')+' extra':'')+'</button>'};
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||t.dataset.cxf!=='1'||!t.files||!t.files[0]||!S.cx)return;fotoLeer(t.files[0],function(u){if(S.cx){S.cx.foto=u;render()}})},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='cxabre'){e.stopImmediatePropagation();S.cx={R:'',M:'',foto:null,k:'carga'};render();return}
 if(a==='cxx'){e.stopImmediatePropagation();S.cx=null;render();return}
 if(a==='cxsave'){e.stopImmediatePropagation();var x=S.cx,R=Math.round(num(x.R)),M=r2(num(x.M));x.err='';
  if(R<=0&&M<=0)x.err='Escribe cuántas cajas o kilos cargaste';else if(R>S.inv.maduras)x.err='En bodega solo hay '+S.inv.maduras+' cajas maduras';else if(M>S.inv.kgMaduro)x.err='En bodega solo hay '+S.inv.kgMaduro+' kg de macho maduro';else if(FOTOS_OBLIGATORIAS&&!x.foto)x.err='Toma la foto de lo que cargaste';
  if(x.err){render();return}
  S.rm={R:String(R),M:String(M)};var n0=S.extras.length,bt=document.createElement('button');bt.dataset.act='extracarga';bt.style.display='none';document.body.appendChild(bt);bt.click();bt.remove();if(S.extras.length>n0)S.extras[S.extras.length-1].foto=x.foto;S.cx=null;render();window.scrollTo(0,0);return}},true);
/* ---------- 4. Fotos obligatorias, con "No pude tomarla" ---------- */
function sinFotoURL(mot){var t=String(mot||'').slice(0,60).replace(/[<&>]/g,'');return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160"><rect width="320" height="160" fill="#F3E3C3"/><text x="160" y="66" text-anchor="middle" font-family="Arial" font-size="17" font-weight="700" fill="#6B4A10">Sin foto</text><text x="160" y="96" text-anchor="middle" font-family="Arial" font-size="13" fill="#6B4A10">'+t+'</text></svg>')}
function fnHTML(){var x=S.fotoNo;if(!x)return '';return '<div id="fnov" role="dialog" aria-label="No pude tomar la foto"><div class="w"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:20px">¿Por qué no pudiste tomarla?</b><div class="lbl">'+esc(x.l||'')+'. Se le avisa al administrador.</div></span><button class="helpb" style="margin:0" data-act="fnx" aria-label="Cerrar">×</button></div>'
 +'<div class="chips" role="group" style="margin:10px 0">'+['No prende la cámara','Está muy oscuro','No tengo el celular a la mano','Otro'].map(function(m){return '<button data-act="fnm" data-v="'+m+'" aria-pressed="'+(x.m===m)+'">'+m+'</button>'}).join('')+'</div>'
 +(x.m==='Otro'?'<div class="field"><label for="fnt">Escribe el motivo</label><input id="fnt" type="text" data-bind="fotoNo.t" value="'+esc(x.t||'')+'" style="width:190px;text-align:left"></div>':'')+(x.err?'<div class="neg" style="font-weight:700">'+esc(x.err)+'</div>':'')+'<button class="btn" style="margin-top:12px" data-act="fnsave">Seguir sin foto</button></div></div>'}
/* fotoTile: pasó a tema-vehiculos.js */
var _vF32=vwFotoUna;vwFotoUna=function(key,l){var h=_vF32.apply(this,arguments);if(vwEsAdm()||!FOTOS_OBLIGATORIAS||S.vw[key])return h;return h+'<button class="fotono" data-act="fotono" data-vw="'+key+'" data-l="'+esc(String(l).replace(/ \((opcional|obligatoria)[^)]*\)/,''))+'">No pude tomarla</button>'};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='fotono'){e.stopImmediatePropagation();e.preventDefault();S.fotoNo={g:b.dataset.g,k:b.dataset.k,vw:b.dataset.vw,cx:b.dataset.cx,l:b.dataset.l||'Foto',m:'',t:''};render();return}
 if(a==='fnx'){e.stopImmediatePropagation();S.fotoNo=null;render();return}
 if(a==='fnm'){e.stopImmediatePropagation();S.fotoNo.m=b.dataset.v;S.fotoNo.err='';render();return}
 if(a==='fnsave'){e.stopImmediatePropagation();var x=S.fotoNo,mot=x.m==='Otro'?String(x.t||'').trim():x.m;if(!mot){x.err='Escoge o escribe el motivo';render();return}var u=sinFotoURL(mot);
  if(x.vw&&S.vw)S.vw[x.vw]=u;else if(x.cx&&S.cx)S.cx.foto=u;else if(x.k){S.salida[x.g]=S.salida[x.g]||{};S.salida[x.g][x.k]=u}
  S.avPrecio.push(chofN(S.chofHoy)+' no tomó la foto "'+(x.l||'')+'": '+mot);S.fotoNo=null;render();return}},true);
/* ---------- 5. PIN: nada de "saltar" en la versión real ---------- */
var _pH32=pinHTML;pinHTML=function(){var h=_pH32.apply(this,arguments);if(!REAL||!h)return h;return h.replace(/<div[^>]*>En la demo el PIN de todos es 1234\.?<\/div>/,'').replace(/<button[^>]*data-act="pinskip"[^>]*>[^<]*<\/button>/,'')};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pinskip"]');if(b&&REAL){e.stopImmediatePropagation();e.preventDefault()}},true);
/* ---------- 6. Versión real: fuera textos y botones "de la demo" ---------- */
var DEMO_RX=/\s*\((?:opcional )?en la demo[^)]*\)|\s*\(demo\)|\s*\(solo en la demo\)/g;
function sinDemo(){if(!REAL)return;var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n,L=[];while((n=w.nextNode()))if(/demo/i.test(n.nodeValue))L.push(n);
 L.forEach(function(n){var p=n.parentElement;if(!p||p.closest('script,style'))return;var v=n.nodeValue;
  if(/Herramientas de la demo|Ver como|Saltar|Simular|Avanzar el reloj|Probar aviso|En la demo el PIN/i.test(v)){var box=p.closest('details,button')||p;box.style.display='none';return}
  var nv=v.replace(DEMO_RX,'');if(nv!==v)n.nodeValue=nv})}
var _r32b=render;render=function(){var r=_r32b.apply(this,arguments);try{sinDemo()}catch(e){}return r};
