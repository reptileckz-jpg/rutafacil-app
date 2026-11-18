/* ===================== v3.9 · 6. PIN, cierre de caja obligatorio, sin señal, dos administradores ===================== */
(function(){var css=[
 '#pinov{position:fixed;inset:0;z-index:90;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:16px}',
 '#pinov .pw{max-width:340px;width:100%;text-align:center;display:flex;flex-direction:column;gap:12px;align-items:center}',
 '#pinov .dots{display:flex;gap:14px;justify-content:center;margin:6px 0}#pinov .dots i{width:16px;height:16px;border-radius:50%;border:2px solid var(--fg)}#pinov .dots i.on{background:var(--fg)}',
 '#pinov .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%}#pinov .kp button{min-height:64px;border-radius:18px;border:1px solid var(--line);background:var(--surface);font-size:26px;font-weight:800;color:var(--fg)}',
 'body:has(#pinov) .toast{display:none!important}',
 '#pinov.err .dots{animation:pnShake .35s}@keyframes pnShake{0%,100%{transform:none}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}',
 '#cajov{position:fixed;inset:0;z-index:85;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px}#cajov .pn{background:var(--surface);border-radius:22px;padding:18px;max-width:420px;width:100%;max-height:90vh;overflow:auto}',
 '.sinsen{display:inline-block;font-size:11px;font-weight:800;padding:1px 7px;border-radius:99px;background:var(--danger);color:#fff}'
];var st=document.createElement('style');st.textContent=css.join('\n');document.head.appendChild(st)})();

/* ---- 6.1 PIN de 4 números por persona ---- */
S.pins=S.pins||{};S.pinOk=S.pinOk||{};
function pinKey(){if(S.role==='admin')return S.encOn?'c:'+S.chofHoy:'a:'+S.adminYo;if(S.role==='rep')return 'c:'+S.chofHoy;return S.role}
function pinNom(k){if(/^a:/.test(k))return adminNom(k.slice(2));if(/^c:/.test(k))return chofN(+k.slice(2));return k==='local'?'Venta local':(k==='cont'?'Contador':k)}
function pinDe(k){return S.pins[k]||'1234'}
var _pin={v:'',modo:null,cb:null,k:null};
function pinHTML(){if(!_pin.modo)return '';var k=_pin.k,ent=_pin.modo==='entrar';
 return '<div id="pinov" role="dialog" aria-label="PIN"><div class="pw">'+(ent?'<img src="'+LOGO_IC+'" alt="" style="width:64px;height:64px;border-radius:18px">':'')+'<b style="font-size:20px">'+(ent?'Hola, '+esc(pinNom(k)):esc(_pin.motivo||'Confirma con tu PIN'))+'</b><div class="lbl">'+(ent?(_pin.bloq?'Pasaron '+_pin.bloq+' minutos sin usar la app. Escribe tu PIN para seguir donde ibas.':'Escribe tu PIN para entrar'):'Escribe tu PIN')+'</div>'
  +'<div class="dots">'+[0,1,2,3].map(function(i){return '<i class="'+(i<_pin.v.length?'on':'')+'"></i>'}).join('')+'</div>'
  +'<div class="kp">'+[1,2,3,4,5,6,7,8,9].map(function(n){return '<button data-act="pind" data-v="'+n+'">'+n+'</button>'}).join('')+'<button data-act="pinx" aria-label="Cancelar" style="font-size:16px">'+(ent?'':'Cancelar')+'</button><button data-act="pind" data-v="0">0</button><button data-act="pinb" aria-label="Borrar" style="font-size:20px">⌫</button></div>'
  +(DEMO?'<div class="lbl">En la demo el PIN de todos es <b>1234</b>.</div><button class="link" data-act="pinskip">Saltar (solo en la demo)</button>':'')+'</div></div>'}
function pinEntrar(){var k=pinKey();if(S.pinOk[k])return false;_pin={v:'',modo:'entrar',cb:null,k:k};return true}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='pind'){e.stopImmediatePropagation();if(_pin.v.length<4)_pin.v+=b.dataset.v;if(_pin.v.length===4){if(_pin.v===pinDe(_pin.k)){var cb=_pin.cb,m=_pin.modo,blq=_pin.bloq;S.pinOk[_pin.k]=true;if(m==='entrar'&&!blq)setTimeout(swHint,250);_pinAct=Date.now();_pin={v:'',modo:null};render();if(m!=='entrar'&&cb)setTimeout(cb,0)}else{_pin.v='';render();var o=$('pinov');if(o)o.classList.add('err');try{fxErr&&fxErr()}catch(x){}}}else render();return}
 if(a==='pinb'){e.stopImmediatePropagation();_pin.v=_pin.v.slice(0,-1);render();return}
 if(a==='pinx'){e.stopImmediatePropagation();if(_pin.modo!=='entrar'){_pin={v:'',modo:null};render()}return}
 if(a==='pinskip'){e.stopImmediatePropagation();var cb2=_pin.cb,m2=_pin.modo,blq2=_pin.bloq;S.pinOk[_pin.k]=true;if(m2==='entrar'&&!blq2)setTimeout(swHint,250);_pinAct=Date.now();_pin={v:'',modo:null};render();if(m2!=='entrar'&&cb2)setTimeout(cb2,0);return}},true);
/* al cambiar de persona se pide su PIN */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;if(/^(role|chofsel|adminyo|encentrar)$/.test(b.dataset.act))setTimeout(function(){if(pinEntrar())render()},0)},true);
function pinRow(k){return '<div class="row"><span>PIN para entrar<br><span class="lbl">4 números · '+(S.pins[k]?'personalizado':'el de inicio (1234)')+' · se vuelve a pedir después de '+pinLimMin(k)+' minutos sin usar la app</span></span><button class="btn sm sec" style="width:auto" data-act="pincambia" data-k="'+k+'">Cambiar</button></div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pincambia"]');if(!b)return;e.stopImmediatePropagation();var k=b.dataset.k;S.pinNuevo={k:k,v:''};abrirModal('PIN de '+esc(pinNom(k)),'<div class="field"><label for="pinn">PIN nuevo (4 números)</label><input id="pinn" type="password" inputmode="numeric" maxlength="4" data-bind="pinNuevo.v" style="width:120px;text-align:center;letter-spacing:6px"></div>',[['Guardar PIN','pinguarda']])},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pinguarda"]');if(!b)return;e.stopImmediatePropagation();var p=S.pinNuevo;if(!p||!/^\d{4}$/.test(String(p.v))){toast('El PIN debe ser de 4 números');return}S.pins[p.k]=String(p.v);S.modal=null;S.pinNuevo=null;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Cambió el PIN de '+pinNom(p.k)});toast('PIN guardado');render()},true);

/* ---- 6.2 Cierre de caja obligatorio: si ayer no se cerró, hoy lo pide primero ---- */
function ayerIso(){return iso(new Date(TODAY.getTime()-864e5))}
function cajaAyerPend(){if(S.role!=='admin'||S.encOn||S.primerDia||S.cajaAyerSkip)return false;var y=ayerIso();return !S.cajaCierres.some(function(x){return x.f===y||x.ayer===y})&&!(S.sinTrabajo||[]).some(function(d){return d===y})}
function cajaAyerHTML(){if(!cajaAyerPend()||_pin.modo)return '';var e=cajaEsp(),dif=S.cajaAyerCnt===''||S.cajaAyerCnt==null?null:num(S.cajaAyerCnt)-e;
 return '<div id="cajov" role="dialog" aria-label="Cierre de caja de ayer"><div class="pn"><b style="font-size:19px">Antes de empezar: cierra la caja de ayer</b><div class="lbl" style="margin-top:6px">Ayer ('+fmtF(ayerIso())+') no se hizo el cierre de caja. Cuenta el efectivo que hay ahorita, antes de cualquier movimiento de hoy.</div>'
  +rw('Debería haber',money(e))+'<div class="field"><label for="cjay">Efectivo que contaste $</label><input id="cjay" type="number" inputmode="decimal" step="any" min="0" data-bind="cajaAyerCnt" value="'+esc(S.cajaAyerCnt==null?'':S.cajaAyerCnt)+'"></div>'
  +(dif!=null?'<div class="'+(Math.abs(dif)<0.005?'':'neg')+'" style="font-weight:700;margin:6px 0">'+(Math.abs(dif)<0.005?'✓ Cuadra':(dif<0?'Faltan '+money(-dif):'Sobran '+money(dif)))+'</div>':'')
  +'<button class="btn" style="margin-top:8px" data-act="cajaayerok">Registrar cierre de ayer</button><button class="btn sec" style="margin-top:8px" data-act="cajaayerno">Ayer no se trabajó</button>'+(DEMO?'<button class="link" style="margin-top:8px" data-act="cajaayerskip">Saltar (solo en la demo)</button>':'')+'</div></div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='cajaayerok'){e.stopImmediatePropagation();if(S.cajaAyerCnt===''||S.cajaAyerCnt==null){toast('Escribe el efectivo que contaste');return}var ce=cajaEsp(),cc=num(S.cajaAyerCnt);S.cajaCierres.push({f:ayerIso(),ayer:ayerIso(),h:hhmm(),esp:ce,cnt:cc,dif:cc-ce,q:quien()});S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Cierre de caja de ayer: '+(Math.abs(cc-ce)<0.005?'cuadró':(cc<ce?'faltaron '+money(ce-cc):'sobraron '+money(cc-ce)))});S.cajaAyerCnt='';toast('Cierre de ayer registrado');render();return}
 if(a==='cajaayerno'){e.stopImmediatePropagation();S.sinTrabajo=(S.sinTrabajo||[]).concat([ayerIso()]);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Marcó que ayer no se trabajó'});render();return}
 if(a==='cajaayerskip'){e.stopImmediatePropagation();S.cajaAyerSkip=true;render();return}},true);

/* ---- 6.3 Sin señal ---- */
S.conn=S.conn||{};S.pendCh=S.pendCh||{};S.colaEnv=S.colaEnv||0;
function conn(id){return S.conn[id]||{on:true}}
function sinSenMin(id){var c=conn(id);if(c.on||!c.desde)return 0;var p=c.desde.split(':'),m=+p[0]*60+(+p[1]);return Math.max(0,horaAhora()-m)}
function horaAhora(){return typeof S.reloj==='number'?Math.max(S.reloj,11*60+50):11*60+50}
function sinDurTxt(m){var h=Math.floor(m/60),r=m%60;return (h?h+' h ':'')+r+' min'}
function rutaSig(id){try{return JSON.stringify([S.cli.filter(function(c){return c.chofer===id}).map(function(c){return [c.id,c.dias,c.extra,c.ped]}),S.rutaAdd,S.rutaQuit,(S.chSt||{})[id]?S.chSt[id].stops.map(function(x){return x.c}):null,+S.chofHoy===id?S.stops.map(function(x){return [x.c,x.done]}):null,S.cargas.filter(function(c){return c.viaje&&String(c.viaje.chofer)===String(id)}).map(function(c){return c.id})])}catch(e){return ''}}
var _sigs=null;
function offIds(){return Object.keys(S.conn).filter(function(k){return S.conn[k]&&!S.conn[k].on}).map(Number)}
function sigTomar(){if(S.role!=='admin')return;_sigs={};offIds().forEach(function(id){_sigs[id]=rutaSig(id)})}
function sigRevisar(qu){if(!_sigs)return;var s=_sigs;_sigs=null;Object.keys(s).forEach(function(k){var id=+k;if(rutaSig(id)!==s[k]){S.pendCh[id]=(S.pendCh[id]||[]).concat([{h:hm(horaAhora()),x:qu||'Cambio de ruta o de clientes'}])}})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b||S.role!=='admin'||!offIds().length)return;sigTomar();var t=b.textContent.trim().slice(0,40);setTimeout(function(){var p0=JSON.stringify(S.pendCh);sigRevisar('Cambio: '+t);if(JSON.stringify(S.pendCh)!==p0)render()},0)},true);
document.addEventListener('focusin',function(){if(S.role==='admin'&&offIds().length)sigTomar()},true);
document.addEventListener('change',function(e){if(S.role!=='admin'||!offIds().length)return;setTimeout(function(){var p0=JSON.stringify(S.pendCh);sigRevisar('Cambio de ruta o de clientes');if(JSON.stringify(S.pendCh)!==p0)render()},0)});
function senalTxt(id){var c=conn(id);if(c.on)return '';var m=sinSenMin(id),p=(S.pendCh[id]||[]).length;return '<span class="sinsen">Sin señal</span> <span class="lbl">desde las '+esc(c.desde)+' ('+sinDurTxt(m)+')'+(p?' · '+p+' cambio'+(p>1?'s':'')+' pendiente'+(p>1?'s':'')+' de llegarle':'')+'</span>'}
/* avisos: pasó a tema-avisos.js */
/* avDestino: pasó a tema-avisos.js */
/* lado del chofer */
function senalDemoBtn(){var id=+S.chofHoy,c=conn(id);return '<button class="btn sec" style="margin-top:8px" data-act="senal">'+(c.on?'Simular que me quedé sin señal':'Volvió la señal')+'</button>'}
function colaCuenta(a){return /^(guardar|gxsave|recargar|enviar|cobrar|calle|cambio|infsave)$/.test(a)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='senal'){e.stopImmediatePropagation();var id=+S.chofHoy,c=conn(id);if(c.on){S.conn[id]={on:false,desde:hm(horaAhora()),pos:'cerca de '+((curCli()||{}).n||'su ruta')};toast('Sin señal: lo que captures se guarda en tu teléfono')}else{var n=S.colaEnv,p=(S.pendCh[id]||[]).length;S.conn[id]={on:true};S.colaEnv=0;if(p){S.rutaAv[id]=(S.rutaAv[id]||[]).concat((S.pendCh[id]||[]).map(function(x){return 'Mientras no tenías señal: '+x.x+' ('+x.h+')'}));S.pendCh[id]=[]}toast('Volvió la señal'+(n?': se mandaron '+n+' movimiento'+(n>1?'s':''):'')+(p?' y te llegaron '+p+' cambio'+(p>1?'s':''):''))}render();return}
 if(S.role==='rep'&&!conn(+S.chofHoy).on&&colaCuenta(a))setTimeout(function(){S.colaEnv++;render()},40)},true);
function senalBanner(){if(S.role!=='rep')return '';var id=+S.chofHoy,c=conn(id);if(c.on)return '';return '<div class="card alert" role="status"><b class="neg">Sin señal desde las '+esc(c.desde)+'</b><div style="font-size:14px">Lo que captures se guarda en tu teléfono y se manda solo cuando vuelva la señal.'+(S.colaEnv?' Pendientes de mandar: <b>'+S.colaEnv+'</b>.':'')+'</div></div>'}

/* ---- 6.4 Dos administradores: gana el último cambio y al otro le llega aviso ---- */
S.histVisto=S.histVisto||{};
function cambiosOtro(){if(S.role!=='admin'||S.encOn)return [];var yo=adminNom(),v=S.histVisto[S.adminYo]||0,otros=S.admins.filter(function(a){return a.k!==S.adminYo}).map(function(a){return a.n});return S.hist.slice(v).filter(function(h){return otros.indexOf(h.q)>-1})}
function cambiosHTML(){var L=cambiosOtro();if(!L.length)return '';return '<div class="card" style="border-left:5px solid var(--info)"><b>Cambios de '+esc(L[0].q)+' desde tu última vez</b>'+L.slice(-4).reverse().map(function(h){return '<div style="font-size:14px;margin-top:4px">'+esc(h.x)+' <span class="lbl">· '+esc(h.t)+'</span></div>'}).join('')+(L.length>4?'<div class="lbl">y '+(L.length-4)+' más en el historial</div>':'')+'<button class="btn sm sec" style="margin-top:8px" data-act="cambok">Entendido</button></div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cambok"]');if(!b)return;e.stopImmediatePropagation();S.histVisto[S.adminYo]=S.hist.length;render()},true);
/* registrar en el historial los cambios importantes */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b||S.role!=='admin')return;var a=b.dataset.act,pr0=JSON.stringify([S.precio.R,S.precio.M]);
 if(/^(precioconf|precioguarda|preciosave|precioapl|precioint|preciousar)$/.test(a)||/precio/.test(a))setTimeout(function(){var p1=JSON.stringify([S.precio.R,S.precio.M]);if(p1!==pr0)S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Cambió el precio de hoy: '+money(S.precio.R)+' la caja y '+money(S.precio.M)+' el kilo'})},0);
 if(a==='cesave'){var c0=cl(S.cliEdit);setTimeout(function(){if(c0)S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Cambió los datos de '+c0.n})},0)}
 if(a==='vsave'){var n0=S.vf&&S.vf.n;setTimeout(function(){if(!S.vf)S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Guardó el vehículo '+(n0||'')})},0)}},true);
/* entrar como el otro admin marca su historial como visto la primera vez */
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

setTimeout(function(){try{if(window.CONF){delete CONF.gxdel}}catch(e){}},0);

/* el cierre de caja también se confirma antes de guardarse (cobros y pagos: solo confirmar, sin PIN) */
setTimeout(function(){try{if(window.CONF)CONF.cajacierre=1}catch(e){}},0);
/* confMsg: pasó a tema-cierre.js */
