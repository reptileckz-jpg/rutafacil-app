/* ===================== v7.6 · (12 nov) prueba de la 7.5 desde cero
   74/82 la revisión de números leía "1,900" (con coma de miles) como vacío y lo ponía en 0 → ahora lee igual que el resto de la app
         y no revisa mientras se llena la primera vez
   65 fruta madura: los lotes se descuentan solos con las ventas; solo pregunta el lote que se pasó de días; "Salió a la venta" lo quita
   77 Bodega: total + verdes / en maduración / maduras
   75 registrar carga → meter a madurar: pregunta clara de cuándo se sacan, con día y hora
   76 "Usar desde hoy": ya usado, ya no vuelve a salir (se ve "✓ En uso" con "Cambiar")
   85 mayoreo del día: mayor que el costo y no mayor que el precio; ya no se cuela el $220 de la demo ===================== */

/* ---------- 74 · revisión de números ---------- */
function num71(v){if(typeof v==='number')return isFinite(v)?v:NaN;var s=String(v==null?'':v).trim();if(!s)return NaN;if(!/^-?[\d,]*\.?\d*$/.test(s)||!/\d/.test(s))return NaN;return num(s)}
function setupAbierto71(){return !!document.getElementById('setov')||!!(S.setup&&!S.setup.fin&&S.setup.p!=null&&typeof U!=='undefined'&&U&&!U.fin)}
sano68=function(){if(setupAbierto71())return;var malos=[];try{var I=S.inv||{};['verdes','maduras','kgVerde','kgMaduro','reparto','repartoKg','vacias'].forEach(function(k){var v=I[k];if(typeof v==='number'&&isFinite(v))return;if(v===''||v==null){I[k]=0;return}var n=num71(v);if(!isFinite(n)){malos.push('Bodega: '+k);I[k]=0}else I[k]=n});
  (S.cli||[]).forEach(function(c){['vac','cred'].forEach(function(k){var v=c[k];if(typeof v==='number'&&isFinite(v))return;if(v===undefined||v===null||v===''){c[k]=0;return}var n=num71(v);if(!isFinite(n)){malos.push((k==='vac'?'Taras de ':'Saldo de ')+(c.n||'un cliente'));c[k]=0}else c[k]=n})});
  ['cajasT0'].forEach(function(k){if(S[k]==null||S[k]==='')return;var n=num71(S[k]);if(!isFinite(n)){malos.push('Total de taras inicial');S[k]=0}else S[k]=n});
  (S.cajasMov||[]).forEach(function(m){var n=num71(m.n);if(!isFinite(n)){malos.push('Movimiento de taras: '+(m.t||''));m.n=0}else m.n=n})}catch(e){}
 if(malos.length){apErr('número vacío','Faltaba un número y se puso en 0: '+malos.join(', '),S.tab&&S.tab[S.role]);try{(S.avPrecio=S.avPrecio||[]).push('Faltaba un número y la app lo puso en 0: '+malos.join(', ')+'. Revísalo; es un error de la app, ya quedó anotado.')}catch(e){}}};
/* si ya había salido el aviso falso de la primera vez, se quita */
(function(){try{if(S.avPrecio)S.avPrecio=S.avPrecio.filter(function(t){return !/Faltaba un número y la app lo puso en 0: Bodega: (kgVerde|kgMaduro|verdes|maduras|vacias)/.test(String(t))||false})}catch(e){}})();

/* ---------- 65 · lotes de fruta madura ---------- */
madVence=function(){var v=vidaDias(),o=[];(S.madL||[]).forEach(function(x){if(!(num(x.q)>0))return;var q=v-madEdad(x);if(q<=0)o.push((x.p==='R'?n65(x.q)+' cajas de roatán maduro':n65(x.q)+' kg de macho maduro')+' ya se pasaron de tiempo: revisar o rematar')});return o};
var _ant71=antig65;antig65=function(){var d=_ant71.apply(this,arguments);if(!d)return d;var v=3;try{v=vidaDias()}catch(e){}
 try{var st=d.querySelector('.hd .st');if(st)st.textContent='Sale primero la más vieja · se descuenta sola con las ventas';
  Array.prototype.forEach.call(d.querySelectorAll('.lote[data-act="lt53"]'),function(el){var x=(S.madL||[])[+el.dataset.k];if(!x)return;var mal=v-madEdad(x)<=0;if(mal){var t=el.querySelector('.tq53');if(t)t.textContent='Se pasó de tiempo: toca para decir qué pasó ›';return}
   el.removeAttribute('data-act');el.removeAttribute('role');el.removeAttribute('tabindex');el.style.cursor='default';var t2=el.querySelector('.tq53');if(t2)t2.remove()})}catch(e){}return d};
var _ltA71=lt53Aplica;lt53Aplica=function(){var t=S.lt53,x=lt53Lote();if(!t||!x||t.op!=='salio')return _ltA71.apply(this,arguments);
 var R=x.p==='R',hoy=iso(TODAY),otros=(S.madL||[]).filter(function(z){return z!==x&&z.p===x.p&&num(z.q)>0}).sort(function(a,b){return String(a.dia).localeCompare(String(b.dia))}),nuevo=otros[otros.length-1],nom=R?n65(x.q)+' cajas de roatán':n65(x.q)+' kg de macho',dv=x.dia;
 /* lo que queda en bodega es fruta más nueva: el lote viejo se junta con el más nuevo (o queda con fecha de hoy) y su tarjeta se quita */
 if(nuevo&&nuevo.dia>=x.dia){nuevo.q=R?num(nuevo.q)+num(x.q):r2(num(nuevo.q)+num(x.q));x.q=0;S.madL=(S.madL||[]).filter(function(z){return num(z.q)>0.001})}else x.dia=hoy;
 S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Lote de fruta madura ('+nom+', del '+fmtF(dv)+') salió a la venta: ya no es fruta vieja (no cambia el inventario)'});return 'Listo: ese lote ya no sale como fruta vieja'};

/* ---------- 77 · Bodega: total + verdes / en maduración / maduras ---------- */
function madBod71(p){var b=+(S.bodSel||1);return sum((S.lotes||[]).filter(function(l){return l.prod===p&&(l.bod==null||+l.bod===b)}),function(l){return num(l.q)})}
var _ex71=exist65;exist65=function(old){var d=_ex71.apply(this,arguments);try{var I=S.inv||{},b=(S.bods||[]).filter(function(x){return +x.id===+(S.bodSel||1)})[0]||{n:'Bodega'},mR=madBod71('R'),mM=madBod71('M');
  var t=function(k,v,u,col,bg){return '<div class="tile" style="background:'+bg+'"><div class="k" style="color:'+col+'"><span class="dot" style="background:'+col+'"></span>'+k+'</div><div><span class="big">'+n65(v)+'</span><span class="u">'+u+'</span></div></div>'},
   fila=function(nom,col,tot,u,vv,mm,ma,uu){return '<div class="lab71" style="margin:12px 2px 6px;font-size:16px;font-weight:800;color:var(--fg)">Hay <b style="font-size:20px;color:'+col+'">'+n65(tot)+'</b> '+u+' de '+nom+', de '+(u==='kg'?'los cuales':'las cuales')+':</div>'
    +'<div class="g3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+t('Verdes',vv,uu,'#15803D','color-mix(in srgb,#16A34A 7%,var(--surface))')+t('En maduración',mm,uu,'#D97706','color-mix(in srgb,#F59E0B 7%,var(--surface))')+t('Maduras',ma,uu,'#B45309','color-mix(in srgb,#CA8A04 10%,var(--surface))')+'</div>'};
  d.innerHTML='<div class="hd"><span class="ic" style="background:#FFEDD5;color:#EA580C">'+IC65.caja+'</span><span class="grow"><div class="tt">Existencias en bodega</div><div class="st">'+esc(b.n)+' (solo consulta)</div></span></div>'
   +fila('roatán','#C2410C',num(I.verdes)+mR+num(I.maduras),'cajas',I.verdes,mR,I.maduras,'cajas')
   +fila('macho','#15803D',num(I.kgVerde)+mM+num(I.kgMaduro),'kg',I.kgVerde,mM,I.kgMaduro,'kg')
   +'<div class="lbl" style="margin-top:8px">Lo que va en los camiones no cuenta aquí: ya salió de la bodega.</div>'}catch(e){console.error('exist71',e)}return d};
(function(){var st=document.createElement('style');st.textContent='.n65 .g3 .tile{padding:10px 8px}.n65 .g3 .big{font-size:22px}.n65 .g3 .k{font-size:12px}';document.head.appendChild(st)})();

/* ---------- 75 · registrar carga → meter a madurar: ¿cuándo se sacan? ---------- */
function salida71(h){var d=new Date(Date.now()+num(h)*3600e3),dias=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];var hoy=new Date(),man=new Date(hoy.getTime()+864e5),mismo=function(a,b){return a.toDateString()===b.toDateString()};
 return (mismo(d,hoy)?'hoy':mismo(d,man)?'mañana':'el '+dias[d.getDay()]+' '+d.getDate())+' a las '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
var _cmMad71=cmMadHTML;cmMadHTML=function(){var h=_cmMad71.apply(this,arguments),m=S.cm;try{if(m.mad!=='si')return h;
  h=h.replace(/<label for="cm_mz\.(R|M)\.h">Horas para madurar<\/label>/g,function(a,p){return '<label for="cm_mz.'+p+'.h" style="font-weight:800;font-size:17px">¿En cuántas horas los sacas de madurar?</label>'});
  ['R','M'].forEach(function(p){var z=m.mz&&m.mz[p];if(!z||!m[p])return;var id='cmmzh'+p,i=h.indexOf('<div class="lbl" id="'+id+'">');if(i<0)return;
   h=h.slice(0,i)+'<div class="card note" style="padding:8px 12px;margin-top:6px;font-size:16px" id="cmsal71'+p+'">⏰ Salen de madurar <b>'+(num(z.h)>0?salida71(z.h):'—')+'</b></div>'+h.slice(i)})}catch(e){}return h};
document.addEventListener('input',function(e){var t=e.target;if(!t||!S.cm||!/^cm_mz\.(R|M)\.h$/.test(t.id||''))return;var p=t.id.charAt(6),el=document.getElementById('cmsal71'+p);if(el)el.innerHTML='⏰ Salen de madurar <b>'+(num(t.value)>0?salida71(t.value):'—')+'</b>'},true);
var _cmV71=cmValida;cmValida=function(k){var e=_cmV71.apply(this,arguments);if(e||k!=='madurar')return e;var m=S.cm;if(m.mad==='si'){var f=['R','M'].filter(function(p){return m[p]&&num(m['mad'+p])>0&&!(num((m.mz&&m.mz[p]||{}).h)>0)});if(f.length)return 'Escribe en cuántas horas los sacas de madurar'}return ''};

/* ---------- 76 · precio de la carga: "Usar desde hoy" ya usado ---------- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="lphoy"],[data-act="lpdesp"],[data-act="lpinter"]');if(!b)return;var c=cargaById(+b.dataset.id);if(c){c.lpModo=b.dataset.act;c.lpF=iso(TODAY)}S.lp71=null},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cmpv"]');if(!b||!S.cm)return;var n0=S.cargas.length,v=b.dataset.v;setTimeout(function(){try{var c=S.cargas[S.cargas.length-1];if(c&&S.cargas.length>n0){c.lpModo={hoy:'lphoy',desp:'lpdesp',inter:'lpinter'}[v]||c.lpModo;c.lpF=iso(TODAY);c.lpOk=true}}catch(er){}},0)},true);
var _lpH71=lotePrecioHTML;lotePrecioHTML=function(c){if(!c)return '';var ed=S.lp71===c.id;if(!c.lpOk||ed||!c.lpModo)return _lpH71.apply(this,arguments);
 var txt=c.lpModo==='lphoy'?'Se usa desde el '+fmtF(c.lpF||iso(TODAY)):(c.lpModo==='lpinter'?'Precio intermedio mientras se acaba el lote anterior':'Se usará cuando se acabe el lote anterior');
 return '<div class="card good" style="padding:12px 14px"><b style="font-size:18px">✓ Precio de esta carga en uso</b>'+(c.cajas?rw('Caja de roatán',money(num(c.vCaja))):'')+(c.kgM?rw('Kilo de macho',money(num(c.vKgM))):'')+'<div class="lbl">'+esc(txt)+'</div><button class="btn sec" style="margin-top:8px;min-height:50px;width:100%" data-act="lp71cam" data-id="'+c.id+'">Cambiar el precio</button></div>'};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="lp71cam"]');if(!b)return;e.stopImmediatePropagation();S.lp71=+b.dataset.id;S.lp=null;render()},true);

/* ---------- 85 · mayoreo del día ---------- */
(function(){try{if(MODO==='vacio'){var m=S.mayMin||{};if(String(m.R)==='220'&&String(m.M)==='15'&&!S.mayMin71){S.mayMin={R:'',M:''}}}}catch(e){}})();
function may71Mal(R,M){var P=S.precio||{},cR=0,cM=0,o=[];try{cR=costoCajaAct()}catch(e){}try{cM=costoKgMAct()}catch(e){}
 var chk=function(nom,may,pr,c,u){may=num(may);pr=num(pr);if(!(may>0))return o.push('Falta el mayoreo de '+nom);if(pr>0&&may>pr)o.push('El mayoreo de '+nom+' ('+money(may)+') no puede ser más alto que el precio normal ('+money(pr)+')');if(c>0&&may<=c)o.push('El mayoreo de '+nom+' ('+money(may)+') queda abajo del costo ('+money(c)+' '+u+'): perderías')};
 chk('la caja de roatán',R,P.R,cR,'por caja');chk('el kilo de macho',M,P.M,cM,'por kilo');return o}
function may71HTML(){var x=S.may71;if(!x)return '';var P=S.precio||{},cR=0,cM=0;try{cR=costoCajaAct()}catch(e){}try{cM=costoKgMAct()}catch(e){}var mal=may71Mal(x.R,x.M);
 var f=function(id,b,v,l,pr,c){return '<div class="card" style="padding:12px 14px;margin-top:10px"><b style="font-size:18px">'+l+'</b>'+rw('Precio normal',money(num(pr)))+rw('Te cuesta',c?money(c):'—')+'<div class="field"><label for="'+id+'">Mayoreo mínimo $</label><input id="'+id+'" type="number" inputmode="decimal" step="any" min="0" data-bind="'+b+'" value="'+esc(v)+'"></div></div>'};
 return ovW70('may71ov','Mayoreo de hoy','<div class="q">¿A cuánto es el mayoreo hoy?</div><div class="lbl">Es lo mínimo que puede cobrar un chofer por mayoreo. Debe quedar arriba del costo y no más alto que el precio normal.</div>'
  +f('may71R','may71.R',x.R,'Caja de roatán',P.R,cR)+f('may71M','may71.M',x.M,'Kilo de macho',P.M,cM)
  +(x.err&&mal.length?'<div class="neg" role="alert" style="font-weight:700;margin-top:10px">'+mal.map(esc).join('<br>')+'</div>':'')
  +'<button class="btn big" data-act="may71ok">Guardar mayoreo</button>','may71x')}
function may71Abre(sig){var m=S.mayMin||{};S.may71={R:String(m.R==null?'':m.R),M:String(m.M==null?'':m.M),sig:sig||null};render()}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="precioconf"]');if(!b||S.may71)return;var m=S.mayMin||{};if(!may71Mal(m.R,m.M).length)return;e.preventDefault();e.stopImmediatePropagation();may71Abre('precioconf')},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="lphoy"],[data-act="cmpv"][data-v="hoy"]');if(!b)return;setTimeout(function(){var m=S.mayMin||{};if(S.precio&&S.precio.conf===iso(TODAY)&&may71Mal(m.R,m.M).length&&!S.may71)may71Abre(null)},50)},false);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="may71ok"],[data-act="may71x"]');if(!b)return;e.stopImmediatePropagation();var x=S.may71;if(!x)return;
 if(b.dataset.act==='may71x'){S.may71=null;render();return}
 if(may71Mal(x.R,x.M).length){x.err=true;render();return}
 S.mayMin={R:String(num(x.R)),M:String(num(x.M))};S.mayMin71=iso(TODAY);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Mayoreo de hoy: '+money(num(x.R))+' la caja y '+money(num(x.M))+' el kilo'});var sig=x.sig;S.may71=null;toast('✓ Mayoreo guardado');render();
 if(sig==='precioconf')setTimeout(function(){var c=document.querySelector('[data-act="precioconf"]');if(c)c.click()},60)},true);

/* ---------- las ventanas de esta capa ---------- */
var _rd71=render;render=function(){var r=_rd71.apply(this,arguments);try{ovPon70('may71ov',may71HTML())}catch(e){console.error('l71 ov',e)}return r};

/* =============== 63/64 · ubicaciones: el mensaje real de Google, links que sí sirven en toda la app =============== */
/* el lector de coordenadas de toda la app entiende los mismos formatos que la ventana nueva */
ubParse=function(s){return coordsDe(s)};
function linkMaps71(s){return /^https?:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google\.[a-z.]+|(www\.)?google\.[a-z.]+\/maps)/i.test(String(s||'').trim())}
/* el nombre del lugar que trae un link sin coordenadas (…/maps/place/Nombre/… o ?q=Nombre) */
function nomDeLink71(u){u=String(u||'');var m=/\/maps\/place\/([^/@?]+)/.exec(u)||/[?&](?:q|query)=([^&]+)/.exec(u);if(!m)return '';try{return decodeURIComponent(m[1].replace(/\+/g,' ')).trim()}catch(e){return m[1].replace(/\+/g,' ')}}
function linkAbre71(lk){var nl=natPl&&natPl();return new Promise(function(ok,no){var c=coordsDe(lk);if(c)return ok({c:c,url:lk});if(!(nl&&nl.linkLargo&&/^https:\/\//.test(lk)))return ok({c:null,url:lk});nl.linkLargo({url:lk}).then(function(r){var u=r&&r.url||lk;ok({c:coordsDe(u),url:u})},function(e){no(e)})})}
function placesMsg71(r,j){var g=(j&&j.error)||{},m=String(g.message||''),st=g.status||'';
 if(/API_KEY_SERVICE_BLOCKED|blocked|not authorized to use this API|are blocked/i.test(m+st))return 'Google dice que la llave no tiene permiso para "Places API (New)". En Google Cloud → Credenciales → la llave de la app → Restricciones de API, márcala y guarda (tarda unos minutos).';
 if(/has not been used|is disabled|SERVICE_DISABLED/i.test(m+st))return 'Google dice que "Places API (New)" no está habilitada en el proyecto. Google Cloud → Biblioteca → Places API (New) → Habilitar.';
 if(/android|X-Android|app restrictions|requests from this android client/i.test(m))return 'Google no reconoce esta app con la llave (huella del APK). Revisa en la llave: Restricciones de aplicaciones → Android → paquete com.rutafacil.app y la huella SHA-1.';
 if(/billing/i.test(m))return 'Google pide revisar la facturación del proyecto (Google Cloud → Facturación).';
 return 'Google no dejó buscar ('+(r&&r.status)+')'+(m?': '+m:'')}
ub68Busca=function(){var x=S.ub68,n=natPl&&natPl();if(!String(x.q||'').trim()){toast('Escribe qué buscar');return}
 if(!n||!n.lugaresGoogle){x.err='El buscador funciona en la app del celular. Aquí pega el link o las coordenadas, o usa el GPS.';render();return}
 x.busy=true;x.err='';x.res=[];render();var b=bodPrincipal&&bodPrincipal(),cuerpo={textQuery:String(x.q).trim(),languageCode:'es',regionCode:'MX',maxResultCount:8};
 try{var cen=b&&b.lat!=null?b:null;if(cen)cuerpo.locationBias={circle:{center:{latitude:+cen.lat,longitude:+cen.lng},radius:50000}}}catch(e){}
 n.lugaresGoogle({cuerpo:JSON.stringify(cuerpo)}).then(function(r){var j={};try{j=JSON.parse(r.json||'{}')}catch(er){}x.busy=false;
  if(r.status>=400){x.err=placesMsg71(r,j);try{apErr('places',x.err,'ubicaciones')}catch(er){}render();return}
  x.res=(j.places||[]).filter(function(p){return p.location}).map(function(p){return {n:(p.displayName&&p.displayName.text)||'Lugar',d:p.formattedAddress||'',lat:p.location.latitude,lng:p.location.longitude}});if(!x.res.length)x.err='No encontré ese lugar. Prueba con otras palabras o con la dirección.';render()})
 .catch(function(er){x.busy=false;x.err='Sin conexión con Google. Revisa el internet.';render()})};
var _ubH71=ub68HTML;ub68HTML=function(){var h=_ubH71.apply(this,arguments);if(!h)return h;
 return h.replace('<small>Como en Uber: escribe el nombre o la dirección</small>','<small>Escribe el nombre del lugar o la dirección</small>')
  .replace('<b>🔗 Pegar el link de Google Maps</b>','<b>🔗 Pegar el link de Google Maps o las coordenadas</b><div class="lbl">Sirve el link que sale en Google Maps con "Compartir", o los números como 32.5149, -117.0382</div>')
  .replace('>Usar el link</button>','>Usar el link o las coordenadas</button>')};
/* "Usar el link": si el link no trae el punto, se busca el lugar por su nombre */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ub68link"]');if(!b||!S.ub68)return;e.stopImmediatePropagation();e.preventDefault();var x=S.ub68,lk=String(x.link||'').trim();
 if(!lk){x.err='Pega el link de Google Maps o las coordenadas.';render();return}
 var c=coordsDe(lk);if(c){x.lat=c.lat;x.lng=c.lng;x.p=2;x.err='';render();return}
 if(!linkMaps71(lk)){x.err='Eso no parece un link de Google Maps ni coordenadas. Ejemplo de coordenadas: 32.5149, -117.0382';render();return}
 toast('Abriendo el link…');linkAbre71(lk).then(function(r){if(r.c){x.lat=r.c.lat;x.lng=r.c.lng;x.p=2;x.err='';render();return}
   var nom=nomDeLink71(r.url);if(nom){x.q=nom;x.p=1;x.err='';render();toast('Ese link no trae el punto: lo busco por su nombre');ub68Busca();return}
   x.err='Ese link no trae el punto ni el nombre del lugar. En Google Maps mantén el dedo sobre el lugar y copia los números que salen arriba, o usa "Buscar el lugar".';render()},
  function(){x.err=natPl&&natPl()&&natPl().linkLargo?'No se pudo abrir el link (¿hay internet?).':'Aquí no se pueden abrir los links cortos. Pega las coordenadas o el link largo.';render()})},true);
/* en cualquier otro campo donde se pega un link corto de Google Maps: se abre y se cambia por las coordenadas */
document.addEventListener('change',function(e){var t=e.target;if(!t||!(t.tagName==='INPUT'||t.tagName==='TEXTAREA')||t.id==='ub68l')return;var v=String(t.value||'').trim();if(!linkMaps71(v)||coordsDe(v))return;var nl=natPl&&natPl();if(!(nl&&nl.linkLargo))return;
 toast('Abriendo el link…');linkAbre71(v).then(function(r){if(!r.c){toast('Ese link no trae el punto. Mejor usa "Buscar el lugar" o pega las coordenadas.');return}t.value=r.c.lat+', '+r.c.lng;t.dispatchEvent(new Event('input',{bubbles:true}));t.dispatchEvent(new Event('change',{bubbles:true}));toast('✓ Ubicación leída del link')},function(){toast('No se pudo abrir el link (¿hay internet?).')})},true);
