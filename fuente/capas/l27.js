/* ===================== v5.1 · Ubicación aproximada → exacta, datos que el chofer no puede cambiar,
   teléfono confirmado y crédito por chofer =====================
   - El admin pone una ubicación aproximada del proveedor (o báscula). El chofer, al llegar, solo toca
     "Actualizar ubicación" y la app guarda la exacta. Ya exacta, el chofer no la puede cambiar.
   - El chofer puede AGREGAR datos del cliente (ubicación, teléfono, quién recibe, foto) pero no cambiarlos.
   - El admin confirma el teléfono del cliente desde su ficha ("Confirmado hace 3 días").
   - En la ficha del chofer (Personal) se cambian el máximo por cliente y el tope total de sus clientes. */
function hace(t){var m=Math.max(0,Math.round((Date.now()-t)/60000));if(m<1)return 'hace un momento';if(m<60)return 'hace '+m+' min';var h=Math.round(m/60);if(h<24)return 'hace '+h+' h';var d=Math.round(h/24);if(d<31)return 'hace '+d+' día'+(d>1?'s':'');var me=Math.round(d/30);return 'hace '+me+' mes'+(me>1?'es':'')}
function digs(t){return String(t||'').replace(/\D/g,'').slice(-10)}
/* ---------- crédito por chofer ---------- */
function chCredDe(c){var ch=c&&S.choferes.filter(function(x){return String(x.id)===String(c.chofer)})[0];return ch&&esCh(ch)&&!esAdm(ch)?ch:null}
function limDefDe(c){var ch=chCredDe(c);return ch&&ch.crCli!=null&&ch.crCli!==''?num(ch.crCli):num(crCfg().crCli)}
function chCredCard(ch){var cf=crCfg(),bb=chBuro(ch),mine=S.cli.filter(function(c){return !c.oculto&&String(c.chofer)===String(ch.id)}),pc=ch.crCli!=null&&ch.crCli!=='',pt=ch.crMax!=null&&ch.crMax!=='',pv=ch.tarMax116!=null&&ch.tarMax116!=='';
 return '<div class="card" data-k="chcred"><b>Crédito de sus clientes</b><div class="field"><label for="chcc'+ch.id+'">Máximo que le puede deber cada cliente $</label><input id="chcc'+ch.id+'" type="number" inputmode="decimal" min="0" data-chcr="'+ch.id+':crCli" value="'+esc(pc?ch.crCli:cf.crCli)+'"></div>'
  +'<div class="field"><label for="chct'+ch.id+'">Tope de todos sus clientes juntos $</label><input id="chct'+ch.id+'" type="number" inputmode="decimal" min="0" data-chcr="'+ch.id+':crMax" value="'+esc(pt?ch.crMax:cf.crCh)+'"></div>'
  +'<div class="lbl" style="margin-top:4px">Sus '+mine.length+' clientes le deben '+money(bb.tot)+' de '+money(chTope(ch))+(bb.atr>0?' · '+money(bb.atr)+' atrasado':'')+' · '+['🟢 cobra bien','🟡 se atrasa','🟠 cobra mal'][bb.n]+'</div>'
  +tarCampo116(ch)+(pc||pt||pv?'<button class="link" style="margin-top:4px" data-act="chcrdef" data-id="'+ch.id+'">Usar los de Ajustes ('+money(num(cf.crCli))+' y '+money(num(cf.crCh))+')</button>':'<div class="lbl">Son los mismos de Ajustes. Si los cambias aquí, solo cambian para '+esc(ch.n)+'.</div>')+'</div>'}
/* fiEmp: pasó a tema-fichas.js */
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.chcr)return;var pr=t.dataset.chcr.split(':'),ch=S.choferes.filter(function(x){return x.id===+pr[0]})[0];if(!ch)return;var k=pr[1],cf=crCfg(),def=num(k==='crCli'?cf.crCli:cf.crCh),ant=k==='crCli'?(ch.crCli!=null&&ch.crCli!==''?num(ch.crCli):def):chTope(ch),v=Math.max(0,num(t.value));
 ch[k]=v===def?null:String(v);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:(k==='crCli'?'Cambió el máximo por cliente de ':'Cambió el tope total de ')+ch.n+': '+money(ant)+' → '+money(v)});
 toast((k==='crCli'?'Cada cliente de ':'Todos los clientes de ')+ch.n+': hasta '+money(v));render()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="chcrdef"]');if(!b)return;e.stopImmediatePropagation();var ch=S.choferes.filter(function(x){return x.id===+b.dataset.id})[0];if(!ch)return;ch.crCli=null;ch.crMax=null;ch.tarMax116=null;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Regresó el crédito de '+ch.n+' a lo de Ajustes'});toast('Crédito de '+ch.n+': igual que Ajustes');render()},true);
/* el límite que se ve en todos lados (c.lim) es el de verdad; si el admin lo cambia en "Editar datos", queda como excepción */
function limSync(){(S.cli||[]).forEach(function(c){try{if(c._limS!=null&&c.lim!==c._limS&&c.lim!==''&&c.lim!=null){var d=limDefDe(c);c.limMan=num(c.lim)===d?null:num(c.lim)}var v=limEf(c);c.lim=v;c._limS=v}catch(e){}})}
var _r27=render;render=function(){limSync();return _r27.apply(this,arguments)};
/* ---------- ficha del cliente: teléfono confirmado y límite real ---------- */
function telConfOk(c){return !!(c.tel&&c.telConf&&digs(c.telConf.tel)===digs(c.tel))}
function telDeChofer(c){var d=digs(c.tel);if(d.length<10)return null;return S.choferes.filter(function(x){return digs(x.tel)===d})[0]||null}
/* fiCli: pasó a tema-fichas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="telconf"]');if(!b)return;e.stopImmediatePropagation();var c=cl(+b.dataset.id);if(!c||!c.tel)return;
 var dc=telDeChofer(c);if(dc&&!b.dataset.ya){abrirModal('Ese es el teléfono de '+dc.n,'El número '+c.tel+' es el de '+dc.n+'. ¿De verdad es el del cliente? Mejor llámale para confirmarlo.',[['Sí, es del cliente','telconfya:'+c.id]]);return}
 c.telConf={tel:c.tel,t:Date.now(),q:quien()};S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Confirmó el teléfono de '+c.n+': '+c.tel});toast('Número confirmado');render()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act||'';if(a.indexOf('telconfya:')!==0)return;e.stopImmediatePropagation();var c=cl(+a.split(':')[1]);S.modal=null;if(c&&c.tel){c.telConf={tel:c.tel,t:Date.now(),q:quien()};S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Confirmó el teléfono de '+c.n+': '+c.tel});toast('Número confirmado')}render()},true);
/* ---------- el chofer agrega datos, no los cambia ---------- */
var _ubH27=ubHTML;ubHTML=function(){var u=S.ub;if(!u)return '';
 if(u.modo==='act'){var nm=esc(ubNom());return '<div id="ubov" role="dialog" aria-label="Actualizar ubicación"><div class="ubw"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:20px">Actualiza la ubicación de '+nm+'</b><div class="lbl">La que hay es aproximada. Ya estás con '+(u.k==='bas'?'la báscula':'él')+': la app guarda la exacta sola.</div></span></div>'
  +(u.est==='buscando'?'<div class="card" style="padding:14px;margin-top:12px;font-size:17px">Buscando tu ubicación…</div>':(u.est==='err'?'<div class="neg" style="margin-top:10px">'+esc(u.err||'')+'</div>':'')+'<button class="btn ubgps" style="margin-top:14px" data-act="ubgps">📍 Estoy con '+nm+': actualizar ubicación</button>'+(u.est==='err'&&u.fallos>=2?'<button class="btn sm sec" style="margin-top:8px" data-act="ubskip">Seguir sin actualizar (le aviso al administrador)</button>':''))
  +'</div></div>'}
 var h=_ubH27();if(u.k==='cli'&&S.role!=='admin'){var c=cl(u.id);if(c){
  if(String(c.tel||'').trim())h=h.replace(/<input id="ubtel"[^>]*>/,'<b style="font-size:16px">'+esc(c.tel)+'</b>');
  if(String(c.recibe||'').trim())h=h.replace(/<input id="ubrec"[^>]*>/,'<b style="font-size:16px">'+esc(c.recibe)+'</b>')}}
 return h};
var _ubG27=ubGuardar;ubGuardar=function(){var u=S.ub;if(!u)return;var c=u.k==='cli'?cl(u.id):null,telAntes=c?String(c.tel||'').trim():'';
 if(c&&S.role!=='admin'){if(telAntes)u.tel=c.tel;if(String(c.recibe||'').trim())u.recibe=c.recibe;if(ubTiene(c)&&u.modo!=='foto'){u.est=u.est==='ok'?'':u.est}}
 var nm=ubNom(),act=u.modo==='act',r=_ubG27.apply(this,arguments);
 if(c&&!telAntes&&String(c.tel||'').trim()&&S.role!=='admin'){c.telPor=+S.chofHoy;c.telConf=null;if(!c.rapida)S.avPrecio.push(chofN(+S.chofHoy)+' agregó el teléfono de '+c.n+': '+c.tel+'. Confírmalo en su ficha.')}
 if(act&&r!==false)toast('Ubicación de '+nm+' actualizada');return r};
/* básculas con ubicación aproximada también se actualizan */
var _ubN27=ubDeNodo;ubDeNodo=function(v,a){var r=_ubN27.apply(this,arguments);if(r&&r.k==='bas'&&r.obj&&ubTiene(r.obj)&&r.obj.ubAprox){r.need=true;r.aprox=true;r.noUb=false}return r};
/* proveedor nuevo del viaje: su ubicación aproximada */
var _r27b=render;render=function(){try{(S.vws||[]).forEach(function(v){(v.par||[]).forEach(function(p){if(p.nub&&p.prov&&p.prov!=='__nuevo'){var c=ubParse(p.nub),d=provD(p.prov);if(c&&!ubTiene(d)){d.lat=c.lat;d.lng=c.lng;d.ubAprox=true}p.nub=''}})});
 (S.cli||[]).forEach(function(c){if(c.porCh!=null&&!c.rapida&&c.tel&&c.telPor==null)c.telPor=c.porCh})}catch(e){}return _r27b.apply(this,arguments)};
/* ---------- ficha del proveedor: ubicación (aproximada o exacta) ---------- */
function provUbTxt(d){if(!ubTiene(d))return 'sin ubicación';if(d.ubAprox)return 'aproximada · el chofer la pone exacta cuando vaya';return 'exacta'+(d.ubPor?' · la guardó '+esc(d.ubPor)+(d.ubF?' el '+fmtF(d.ubF):''):'')}
function provUbPega(n){var d=provD(n);return '<div class="field"><label for="pvub">'+(ubTiene(d)&&!d.ubAprox?'Ubicación (ya es exacta; solo cámbiala si está mal)':'Ubicación aproximada (link de Google Maps o coordenadas)')+'</label><input id="pvub" type="text" data-ubpega="prov:'+esc(n)+'" placeholder="19.5432, -96.9271" style="width:190px;text-align:left"></div><div class="lbl">Ahora: '+provUbTxt(d)+'</div>'}
function provUbIns(h){h=h.replace(/<button class="btn sm sec" style="margin:6px 0" data-act="pvedit" data-n="([^"]*)">/g,function(m,enc){var n;try{n=decodeURIComponent(enc)}catch(e){n=enc}return rw('Ubicación',provUbTxt(provD(n)))+m});
 if(S.pvEdit!=null)h=h.replace('<button class="btn sm" style="margin:6px 0" data-act="pvlisto">',provUbPega(S.pvEdit)+'<button class="btn sm" style="margin:6px 0" data-act="pvlisto">');return h}
/* fiProv: pasó a tema-viaje.js */
/* proveedoresCard: pasó a tema-inicio.js */
