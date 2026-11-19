/* ===================== v8.0 · puntos 32 al 36 (14 nov)
   35 la ruta de hoy: cada ruta sabe de qué día es; al cambiar de día se arma la nueva de cada chofer (abra el celular que abra);
      si falta el cierre de ayer, el chofer ve "manda tu cierre de ayer" y al mandarlo se le arma sola la de hoy; el admin puede liberarla
   36 la copia de la nube dañada se repara sola (y plan B en memoria); fotos más ligeras; "pendientes de subir" a la vista
   34 nombre de la bodega con GPS: Google dice qué hay en ese punto (colonia); si no, el nombre es obligatorio; la nube ya no regresa "Banderilla"
   33 "Fruta madura por antigüedad" se desliza para quitarla · 32 cuentas del viaje de carga en vivo ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#dia80{position:fixed;inset:0;z-index:98;background:var(--bg);overflow:auto}#dia80 .w{max-width:480px;margin:0 auto;padding:28px 18px 40px}',
 '.cv80{border-left:5px solid var(--accent)}.cv80 .debe{font-size:22px;font-weight:900}',
 '.pend80{position:fixed;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:60;max-width:440px;margin:0 auto;background:#7C2D12;color:#fff;border-radius:14px;padding:10px 14px;font-weight:700;font-size:14px;box-shadow:0 8px 20px rgba(0,0,0,.25)}'].join('\n');document.head.appendChild(st)})();
function ayer80(){return iso(new Date(TODAY.getTime()-864e5))}
function del80(f){return f===ayer80()?'de ayer':'del '+fmtF(f)}

/* ---------- 35 · cada ruta sabe de qué día es ---------- */
try{if(AR_K.indexOf('rutaDia80')<0)AR_K.push('rutaDia80')}catch(e){}
/* → movido (tema-rutadia.js) */
function cliHoy80(id){var d=TODAY.getDay();return (S.cli||[]).filter(function(c){return !c.oculto&&+c.chofer===+id&&c.dias&&c.dias.indexOf(d)>-1})}
/* al cambiar de día: las rutas sin fecha quedan con la del día que se cierra, y a cada chofer cerrado se le arma la nueva */
/* → movido (tema-rutadia.js) */
/* el celular del chofer revisa si su ruta es vieja */
/* → movido (tema-rutadia.js) */
/* → movido (tema-rutadia.js) */
/* → movido (tema-rutadia.js) */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="dia80c"]');if(!b)return;e.stopImmediatePropagation();S.tab.rep='cierre';S.cierreP=0;render();window.scrollTo(0,0)},true);
/* el administrador: liberar la ruta de hoy de un chofer que no mandó su cierre */
/* → movido (tema-rutadia.js) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="dia80r"]');if(!b)return;e.stopImmediatePropagation();var id=+b.dataset.id,o=(S.chSt||{})[id];if(!o)return;
 if(b.dataset.act==='dia80r'){S.rutaAv=S.rutaAv||{};S.rutaAv[id]=(S.rutaAv[id]||[]).concat(['Manda tu cierre '+del80(o.rutaDia80)+' para que te salga tu ruta de hoy.']);toast('Se le avisó a '+chofN(id));render();return}},true);

/* ---------- 36 · la copia de la nube dañada se repara sola ---------- */
var REP80=/Failed to read large IndexedDB value|INTERNAL ASSERTION FAILED|IndexedDB.*(corrupt|failed)|internal error opening backing store/i,_rep80=false;
function repara80(por){if(_rep80)return;var A=window.NUBE_AD;if(!A||!A.reparar)return;_rep80=true;var k='fsRep',hoy=iso(new Date()),n=0;try{var o=JSON.parse(localStorage.getItem(k)||'{}');n=o.f===hoy?num(o.n):0;localStorage.setItem(k,JSON.stringify({f:hoy,n:n+1}));if(n+1>=2)localStorage.setItem('fsMem','1')}catch(e){}
 try{falloAnota77(new Error('Copia de la nube dañada en este celular: se repara ('+por+')'),'al reparar')}catch(e){}try{var d=document.createElement('div');d.setAttribute('style','position:fixed;inset:0;z-index:2147483001;background:#F6F1E3;display:flex;align-items:center;justify-content:center;font:700 19px system-ui;color:#1E2A1A;text-align:center;padding:20px');d.textContent='Reparando la conexión con la nube… (los datos del negocio están a salvo)';document.body.appendChild(d)}catch(e){}
 A.reparar().then(function(){location.reload()},function(){location.reload()});setTimeout(function(){location.reload()},8000)}
(function(){var ce=console.error;console.error=function(){try{var t=[].slice.call(arguments).map(function(x){return x&&x.message?x.message:String(x)}).join(' ');if(REP80.test(t))setTimeout(function(){repara80(t.slice(0,80))},300)}catch(e){}return ce.apply(console,arguments)}})();
window.addEventListener('error',function(ev){try{if(ev&&REP80.test(String(ev.message||'')))repara80('error')}catch(e){}});
window.addEventListener('unhandledrejection',function(ev){try{var t=String(ev&&ev.reason&&(ev.reason.message||ev.reason)||'');if(REP80.test(t))repara80('promesa')}catch(e){}});
/* en la pantalla de rescate, un botón para repararla a mano */
/* falloPantalla77: pasó a tema-sueltas.js */
/* fotos más ligeras: la cámara de la app guarda a 1000 px */
if(typeof cam73Tira==='function'){cam73Tira=function(){var v=document.querySelector('#cam73 video'),inp=cam73Destino(CAM73.inp);/* 106 · a la casilla que está en pantalla */if(!v||!inp||!v.videoWidth){toast('La cámara todavía no está lista');return}
 var r=Math.min(1,1600/Math.max(v.videoWidth,v.videoHeight)),w=Math.round(v.videoWidth*r),h=Math.round(v.videoHeight*r),cv=document.createElement('canvas');cv.width=w;cv.height=h;var cx=cv.getContext('2d');
 if(CAM73.cara==='user'){cx.translate(w,0);cx.scale(-1,1)}cx.drawImage(v,0,0,w,h);cx.setTransform(1,0,0,1,0,0);cam73Sello(cx,w,h);
 cv.toBlob(function(bl){if(!bl){toast('No se pudo tomar la foto');return}try{var f=new File([bl],'foto-'+Date.now()+'.jpg',{type:'image/jpeg'}),dt=new DataTransfer();dt.items.add(f);inp=cam73Destino(inp);inp.files=dt.files;cam73Cierra();inp.dispatchEvent(new Event('change',{bubbles:true}));inp.dispatchEvent(new Event('input',{bubbles:true}))}catch(er){cam73Cierra();toast('No se pudo pasar la foto. Usa la galería.')}},'image/jpeg',0.72)}}
/* "pendientes de subir": a la vista del chofer cuando tarda */
var _p80t=0;function pend80(){var el=document.getElementById('pend80'),n=0;try{n=typeof NB!=='undefined'&&NB.on?num(NB.pend):0}catch(e){}if(!n){_p80t=0;if(el)el.remove();return}if(!_p80t)_p80t=Date.now();if(Date.now()-_p80t<20000){if(el)el.remove();return}
 if(!el){el=document.createElement('div');el.id='pend80';el.className='pend80';document.body.appendChild(el)}el.textContent='☁️ '+n+' cambio'+(n===1?'':'s')+' sin subir. No borres datos ni apagues el celular hasta que se suban (busca señal).'}
setInterval(function(){try{pend80()}catch(e){}},3000);

/* ---------- 34 · nombre de la bodega con GPS ---------- */
function bodDirGps80(x){var n=natPl&&natPl();if(!n||!n.lugaresGoogle||x.lat==null)return;x.busca80=1;var cuerpo={locationRestriction:{circle:{center:{latitude:+x.lat,longitude:+x.lng},radius:60}},maxResultCount:1,languageCode:'es',regionCode:'MX'};
 n.lugaresGoogle({cuerpo:JSON.stringify(cuerpo),modo:'cerca'}).then(function(r){var j={};try{j=JSON.parse(r.json||'{}')}catch(e){}var p=(j.places||[])[0];x.busca80=2;if(p&&p.formattedAddress){x.dir78=x.dir78||p.formattedAddress;try{if(S.cfg&&!String(S.cfg.dir||'').trim())S.cfg.dir=p.formattedAddress}catch(e){}if(!String(x.nm78||'').trim())x.nm78=bodNomSug78(p.formattedAddress)}render()},function(){x.busca80=2;render()})}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ub68gps"]');if(!b||!S.ub68)return;var x=S.ub68;x.gps80=1;x.busca80=0},true);
/* ub68HTML: pasó a tema-ubica.js */
/* sin nombre no se guarda (si no, se quedaba el viejo) */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ub68si"]');if(!b||!S.ub68||S.ub68.t!=='bod')return;var x=S.ub68,nm=String(x.nm78||'').trim();if(!nm&&!bodNomSug78(x.dir78||'')){e.preventDefault();e.stopImmediatePropagation();toast('Escribe el nombre de la bodega (ej. "Bodega Otay")');var i=document.getElementById('ub78n');if(i){try{marcaFalta(i)}catch(er){}try{i.focus()}catch(er){}}}},true);
/* el nombre de la demo también se limpia después de bajar la nube (y se sube corregido) */
function bodDemo80(){try{if(MODO!=='vacio')return false;var b=(S.bods||[])[0],ch=false;if(b&&b.n==='Bodega Banderilla'&&!b.dem78&&(b.dir==='Banderilla, Veracruz'||!b.dir)){b.n='Bodega';if(b.dir==='Banderilla, Veracruz')b.dir='';b.dem78=1;ch=true}if(S.cfg&&S.cfg.dir==='Banderilla, Veracruz'){S.cfg.dir='';ch=true}return ch}catch(e){return false}}
if(typeof nbAplica==='function'){var _nbA80=nbAplica;nbAplica=function(){var r=_nbA80.apply(this,arguments);if(bodDemo80()){try{setTimeout(function(){try{nbEmpuja()}catch(e){}},500)}catch(e){}r=true}return r}}

/* ---------- 33 · la tarjeta de fruta madura se desliza para quitarla ---------- */
function antigFirma80(){var v=3;try{v=vidaDias()}catch(e){}return (S.madL||[]).filter(function(x){return num(x.q)>0}).map(function(x){var e=0;try{e=madEdad(x)}catch(er){}return x.p+x.dia+(v-e<=1?'!':'')}).sort().join(',')}
/* antig65: pasó a tema-bodega.js */
(function(){var x0=null,y0=null,el=null;document.addEventListener('touchstart',function(e){var t=e.target.closest&&e.target.closest('[data-sw80]');if(!t){el=null;return}el=t;x0=e.touches[0].clientX;y0=e.touches[0].clientY;el.style.transition='none'},{passive:true});
 document.addEventListener('touchmove',function(e){if(!el)return;var dx=e.touches[0].clientX-x0,dy=e.touches[0].clientY-y0;if(Math.abs(dy)>Math.abs(dx)){return}el.style.transform='translateX('+dx+'px)';el.style.opacity=String(Math.max(.3,1-Math.abs(dx)/300))},{passive:true});
 document.addEventListener('touchend',function(e){if(!el)return;var dx=(e.changedTouches[0].clientX-x0);el.style.transition='transform .2s,opacity .2s';if(Math.abs(dx)>110){el.style.transform='translateX('+(dx>0?500:-500)+'px)';el.style.opacity='0';S.antigOff80=antigFirma80();setTimeout(function(){render();toast('Listo. Vuelve sola si entra fruta de otro día o algo está por pasarse.')},200)}else{el.style.transform='';el.style.opacity=''}el=null},{passive:true})})();

/* ---------- 32 · cuentas del viaje de carga en vivo ---------- */
function cv80(v){if(!v||!Array.isArray(v.par))return null;var keep=S.vw;S.vw=v;var g=0;try{g=vwGastos()}catch(e){}S.vw=keep;var efe=num(v.efe),prov=sum(v.par.filter(function(p){return (p.forma||'Efectivo')==='Efectivo'}),function(p){return num(p.pago)}),comb=sum(v.recs||[],function(x){return num(x.total)}),otros=sum(v.gx||[],function(x){return num(x.m)});
 if(g<comb)comb=g;otros=r2(g-comb);return {efe:efe,prov:prov,comb:comb,otros:otros,g:g,debe:r2(efe-g)}}
function cv80HTML(v,tit){var k=cv80(v);if(!k||!k.efe&&!k.g)return '';return '<div class="card cv80" data-x="cv80"><b>💵 '+(tit||'Cómo van las cuentas del viaje')+'</b>'+rw('Le dieron para gastos',money(k.efe))+(k.comb?rw('Combustible','−'+money(k.comb)):'')+(k.otros?rw('Otros gastos','−'+money(k.otros)):'')
 +'<div class="row" style="min-height:48px"><b>Debe regresar</b><span class="debe">'+money(k.debe)+'</span></div><div class="lbl">Se va llenando solo con lo que se registra en el camino.</div></div>'}
function cvPon80(){var v=S.vw,o=document.getElementById('vwov');if(!v||!v.open||!v.started||v.side||!o||o.querySelector('[data-x="cv80"]'))return;var k='';try{k=vwKey()}catch(e){}if(/^(ruta|veh|insp|tanque|comb|lista|fotos|reg|gracias|fin)$/.test(k))return;
 var h=cv80HTML(v,vwEsAdm()?'Cómo van las cuentas de '+esc(chofN(v.quien)):'Cómo van tus cuentas');if(!h)return;var d=document.createElement('div');d.innerHTML=h;var w=o.firstElementChild;if(w)w.appendChild(d.firstElementChild)}

var _rd80=render;render=function(){try{rutaRenueva80()}catch(e){console.error('l80 ruta',e)}try{lotesReloj80()}catch(e){}try{bod80();clima80()}catch(e){}var r=_rd80.apply(this,arguments);try{ovPon70('dia80',dia80HTML());dia80Adm();cvPon80();lote80Pon();txt80()}catch(e){console.error('l80',e)}return r};

/* ---------- 37 · la maduración cuenta el tiempo de verdad (antes solo avanzaba con el botón de la demo) ---------- */
var _clk80=0;document.addEventListener('click',function(){_clk80=Date.now()},true);
function lotesReloj80(){var now=Date.now(),hoy=iso(TODAY);(S.lotes||[]).forEach(function(l){if(!l.t0){l.t0=now-num(l.h)*36e5;if(!num(l.h)&&MODO==='vacio'&&now-_clk80>4000)l.t0a=hoy}var h=Math.max(0,Math.floor((now-l.t0)/36e5));if(h>num(l.h))l.h=h})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="avanzar"]');if(!b)return;setTimeout(function(){(S.lotes||[]).forEach(function(l){if(l.t0)l.t0-=6*36e5})},0)},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="lote80h"]');if(!b)return;e.stopImmediatePropagation();var l=(S.lotes||[]).filter(function(x){return +x.id===+b.dataset.id})[0],i=document.getElementById('lote80i'+b.dataset.id);if(!l||!i)return;var h=num(i.value);if(!(h>=0)||String(i.value).trim()===''){toast('Escribe cuántas horas lleva');return}
 l.t0=Date.now()-h*36e5;l.h=Math.floor(h);delete l.t0a;toast('Listo: lleva '+l.h+' h');render()},true);
function lote80Pon(){var m=document.querySelector('main');if(!m)return;(S.lotes||[]).forEach(function(l){if(!l.t0a)return;var bt=m.querySelector('[data-act="sacar"][data-id="'+l.id+'"]');if(!bt||m.querySelector('#lote80i'+l.id))return;var d=document.createElement('div');d.className='card note';d.style.cssText='margin:8px 0 0;padding:10px 12px';
 d.innerHTML='<b>¿Cuántas horas lleva madurando?</b><div class="lbl">Antes la app no contaba el tiempo. Escríbelo una vez y de aquí en adelante cuenta sola.</div><div style="display:flex;gap:8px;margin-top:6px"><input id="lote80i'+l.id+'" type="number" inputmode="numeric" min="0" placeholder="horas" style="flex:1"><button class="btn sm" data-act="lote80h" data-id="'+l.id+'">Guardar</button></div>';bt.before(d)})}

/* ---------- 38 · nada de la demo en la app real (lo que se coló a la versión de verdad) ---------- */
function limpia80(s){if(!s||MODO!=='vacio')return false;var ch=false;try{
 /* el administrador de ejemplo */ if(Array.isArray(s.admins)&&s.adminYo!=='rm'){var n0=s.admins.length;s.admins=s.admins.filter(function(a){return !(a.k==='rm'&&a.n==='Ricardo Mejía')});if(s.admins.length!==n0)ch=true}
 /* ventas del mes inventadas */ (s.choferes||[]).forEach(function(c){var m=c.mes;if(m&&num(m.ven)===15200&&num(m.R)===50&&num(m.M)===260){c.mes={ven:0,R:0,M:0,cob:0,cred:0};ch=true}if(c.lic&&String(c.lic).indexOf('DEMO')>-1){c.lic=null;ch=true}});
 /* teléfono de ejemplo */ if(s.cfg&&s.cfg.tel==='228 100 0000'){s.cfg.tel='';ch=true}
 /* placas: el estado de ejemplo */ (s.veh||[]).forEach(function(v){if(!v.plEdo){v.plEdo='Baja California';ch=true}});
 /* precios de ejemplo antes de terminar el asistente */ if(s.setup&&!s.setup.fin&&s.precio&&!s.precio.conf){if(num(s.precio.R)===260&&num(s.precio.M)===18){s.precio.R=0;s.precio.M=0}if(s.mayP&&num(s.mayP.R)===240&&num(s.mayP.M)===16)s.mayP={R:'',M:''};(s.vlProd||[]).forEach(function(p){if(p.p==='12'&&p.inv==='R'||p.p==='16'&&p.inv==='M')p.p=''})}
}catch(e){}return ch}
if(MODO==='vacio'){var _fr80=fresh;fresh=function(){var s=_fr80.apply(this,arguments);limpia80(s);return s};limpia80(S);
 if(typeof nbAplica==='function'){var _nbA80b=nbAplica;nbAplica=function(){var r=_nbA80b.apply(this,arguments);if(limpia80(S)){try{setTimeout(function(){try{nbEmpuja()}catch(e){}},700)}catch(e){}r=true}return r}}}
/* la placa dice el estado de verdad (antes siempre "VERACRUZ") */
/* plateSVG: pasó a tema-vehiculos.js */
/* la entrega ya no empieza con 4 cajas y 30 kg inventados: lo de la vez pasada, o en ceros */
if(MODO==='vacio'){var _rD80=resetDraft;resetDraft=function(c){var r=_rD80.apply(this,arguments);try{/* 136: si tiene pedido, se queda lo que pidió (antes se cambiaba por la última compra) */if(c&&!c.rapida&&!c.ped){var u=ultPedido(c);S.d.R=u?num(u.R):0;S.d.M=u?num(u.M):0}}catch(e){}return r}}
/* la bodega sin ubicación: los mapas ya no usan Banderilla; mientras, se centran en tus clientes */
function bod80(){if(MODO!=='vacio')return;var b=null;try{b=bodPrincipal()}catch(e){}if(b&&b.lat!=null)return;var L=(S.cli||[]).filter(function(c){return !c.oculto&&c.lat!=null&&!isNaN(+c.lat)});if(!L.length)return;BOD.lat=r2c80(sum(L,function(c){return +c.lat})/L.length);BOD.lng=r2c80(sum(L,function(c){return +c.lng})/L.length);BOD.aprox80=1}
function r2c80(x){return Math.round(x*1e5)/1e5}
/* vwNodos: pasó a tema-viaje.js */
/* los nombres de lugar salen de la ubicación de TU bodega (antes decían Banderilla / Veracruz siempre) */
var EDO80=[['Aguascalientes','Ags'],['Baja California Sur','B\\.? ?C\\.? ?S'],['Baja California','B\\.? ?C'],['Campeche','Camp'],['Chiapas','Chis'],['Chihuahua','Chih'],['Ciudad de México','CDMX|Cd\\.? de M[ée]x'],['Coahuila','Coah'],['Colima','Col'],['Durango','Dgo'],['Guanajuato','Gto'],['Guerrero','Gro'],['Hidalgo','Hgo'],['Jalisco','Jal'],['Estado de México','Edo\\.? ?M[ée]x|M[ée]x'],['Michoacán','Mich'],['Morelos','Mor'],['Nayarit','Nay'],['Nuevo León','N\\.? ?L'],['Oaxaca','Oax'],['Puebla','Pue'],['Querétaro','Qro'],['Quintana Roo','Q\\.? ?R(oo)?'],['San Luis Potosí','S\\.? ?L\\.? ?P'],['Sinaloa','Sin'],['Sonora','Son'],['Tabasco','Tab'],['Tamaulipas','Tamps'],['Tlaxcala','Tlax'],['Veracruz','Ver'],['Yucatán','Yuc'],['Zacatecas','Zac']];
function edoDe80(dir){var p=String(dir||'').split(',').map(function(x){return x.trim().replace(/\.$/,'')}).filter(function(x){return x&&!/^(México|Mexico|MX)$/i.test(x)});for(var k=p.length-1;k>=0&&k>=p.length-3;k--){var t=p[k].replace(/^\d{5}\s*/,'');for(var i=0;i<EDO80.length;i++){var e=EDO80[i],n=e[0].normalize('NFD').replace(/[̀-ͯ]/g,''),tn=t.normalize('NFD').replace(/[̀-ͯ]/g,'');if(new RegExp('^('+n+'|'+e[1]+')\\.?$','i').test(tn)||new RegExp('(^|\\s)'+n+'$','i').test(tn))return e[0]}}return ''}
function bodDir80(){try{var b=bodPrincipal();return b&&b.dir||S.cfg&&S.cfg.dir||''}catch(e){return ''}}
function edoDef80(){return edoDe80(bodDir80())||(typeof MODO!=='undefined'&&MODO==='vacio'?'Baja California':'Veracruz')}
function edos80(){var L=[edoDef80(),'Baja California','Veracruz','Guerrero'];try{(S.veh||[]).forEach(function(v){if(v.plEdo)L.push(v.plEdo)})}catch(e){}return L.filter(function(x,i){return x&&L.indexOf(x)===i})}
function bodNom80(){try{var b=bodPrincipal(),n=b&&String(b.n||'').trim();if(n&&n!=='Bodega'&&n!=='Bodega Banderilla')return n;var sg=bodNomSug78(b&&b.dir||'');return sg||'la bodega'}catch(e){return 'la bodega'}}
function txt80(){if(MODO!=='vacio')return;var m=document.body;if(!m)return;var bn=bodNom80(),b=null;try{b=bodPrincipal()}catch(e){}var w=document.createTreeWalker(m,NodeFilter.SHOW_TEXT),t,R=[[/Banderilla \(la de inicio\)/g,b&&b.dir?'en '+String(b.dir).split(',').slice(0,2).join(',')+' (falta el punto exacto: ponlo con el GPS)':'sin ubicación (ponla con el GPS para que los mapas y los km salgan bien)'],[/Llegas a Banderilla/g,'Llegas a '+bn],[/^Banderilla$/,bn]];var cl=!(S.clima&&S.clima.real80);if(cl)R.push([/\(automático\)/g,'(no se pudo saber: elige el clima)']);while(t=w.nextNode()){var v=t.nodeValue;if(v.indexOf('Banderilla')<0&&!(cl&&v.indexOf('(automático)')>-1))continue;R.forEach(function(r){v=v.replace(r[0],r[1])});if(v!==t.nodeValue)t.nodeValue=v}
 Array.prototype.forEach.call(m.querySelectorAll('[data-act="avanzar"]'),function(x){x.remove()});Array.prototype.forEach.call(m.querySelectorAll('input[placeholder*="Banderilla"]'),function(x){x.placeholder=x.placeholder.replace(/ ?Banderilla/,'')})}

/* el clima de verdad (antes siempre 24 °C nublado) */
var CL80={t:0};function clima80(){if(MODO!=='vacio'||Date.now()-CL80.t<30*60000)return;var la=BOD.lat,ln=BOD.lng;try{var b=bodPrincipal();if(b&&b.lat!=null){la=+b.lat;ln=+b.lng}else if(!BOD.aprox80)return}catch(e){return}CL80.t=Date.now();
 if(!window.fetch)return;fetch('https://api.open-meteo.com/v1/forecast?latitude='+la+'&longitude='+ln+'&current=temperature_2m,weather_code&timezone=auto').then(function(r){return r.json()}).then(function(j){var c=j&&j.current;if(!c||c.temperature_2m==null)return;var w=+c.weather_code,t=Math.round(+c.temperature_2m);
  var tx=w>=51&&w<=67||w>=80?'Lluvia':(t<=12?'Frío':(w<=1?'Soleado':'Nublado'));S.clima={t:t,txt:tx,real80:1};if(S.lf&&!S.lf.temp)S.lf.clima=tx;render()}).catch(function(){CL80.t=Date.now()-25*60000})}
/* "Bodega + colonia": sin contar país ni estado al final de la dirección de Google */
bodNomSug78=function(dir){var p=String(dir||'').split(',').map(function(s){return s.trim()}).filter(Boolean);while(p.length>1&&(/^(México|Mexico|MX)$/i.test(p[p.length-1])||edoDe80(p[p.length-1])))p.pop();if(!p.length)return '';
 var z=p.length>=3?p[p.length-2]:p[p.length-1];z=z.replace(/^\d{5}\s*/,'').replace(/^(Col\.?|Colonia|Fracc\.?|Fraccionamiento)\s*/i,'').trim();return z?'Bodega '+z:''};
