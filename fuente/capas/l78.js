/* ===================== v7.8 · lista nueva, puntos 15 al 30 (12 nov)
   25 los apartados que se abren y cierran ya no se cruzan con el redibujo (Moto Z)  · 25b "Aprende la app" lleva a cada cosa
   15 ubicación: la tarjeta del chofer solo si falta o es aproximada; en el alta pasa sola al siguiente paso
   16 TAG: cruce sin viaje de carga = gasto general del vehículo "Casetas (TAG)" (sin volver a salir de la caja)
   18 galería de imágenes (Nissan NP300, M2 y fotos de tus vehículos) · 20 VIN, motor y llanta (295/75R22.5) · 30 DEF
   19 el rebote al final de la lista ya no esconde/enseña la barra ni rehace cosas; fotos ligeras en las tarjetas
   21/22 nombre y dirección de la bodega (sin "Banderilla" de la demo) · 23 cámara: la principal y "Cambiar lente"
   24 "Lo que pasó hoy en su ruta" minimizado · 27 el pedido asignado le llega al chofer al momento · 28 una sola carga ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.gal78{display:grid;grid-template-columns:1fr 1fr;gap:10px}.gal78 button{border:3px solid var(--line);border-radius:16px;background:var(--surface);padding:6px;color:inherit;font-weight:800;font-size:14px}',
 '.gal78 button[aria-pressed="true"]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,var(--surface))}.gal78 img{width:100%;height:96px;object-fit:cover;border-radius:10px;display:block;margin-bottom:4px}',
 'img{decoding:async}'].join('\n');document.head.appendChild(st)})();

/* ---------- 25 · abrir/cerrar apartados: la app lo cambia y lo recuerda al instante ---------- */
window.addEventListener('click',function(e){var sm=e.target.closest&&e.target.closest('summary');if(!sm)return;var d=sm.parentElement;if(!d||d.tagName!=='DETAILS')return;var it=e.target.closest('button,a,input,select,label');if(it&&sm.contains(it))return;
 e.preventDefault();var ab=!d.open;d.open=ab;var k=d.dataset&&d.dataset.k;if(k&&S.dOpen)S.dOpen[k]=ab;if(ab){d.classList.add('opening');setTimeout(function(){d.classList.remove('opening')},300)}},true);

/* ---------- 15 · ubicación ---------- */
/* (a) entrega del chofer: solo si no tiene ubicación o si es aproximada (de link, búsqueda o Excel, sin confirmar en el lugar) */
function ubAprox78(c){return !!c&&c.lat!=null&&!c.locConf}
/* cfUb70: pasó a tema-ubica.js */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cfub70"]');if(!b)return;e.stopImmediatePropagation();var c=cl(+b.dataset.id);if(!c)return;
 toast('Buscando tu ubicación…');try{navigator.geolocation.getCurrentPosition(function(p){var la=+p.coords.latitude.toFixed(6),ln=+p.coords.longitude.toFixed(6),tenia=c.lat!=null;
   c.lat=la;c.lng=ln;c.locConf=iso(TODAY);c.locBy=chofN(S.chofHoy);c.locF=iso(TODAY);S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Confirmó la ubicación de '+c.n+' estando ahí'});
   try{if(tenia)(S.avPrecio=S.avPrecio||[]).push(chofN(S.chofHoy)+' confirmó la ubicación de '+c.n+' estando ahí')}catch(er){}S.dOpen.entmas=false;toast('✓ Ubicación confirmada');render()},
  function(){toast('No se pudo leer el GPS. Prende la ubicación.')},{enableHighAccuracy:true,timeout:15000,maximumAge:0})}catch(er){toast('No se pudo leer el GPS.')}},true);
/* "Corregir la ubicación" queda dentro de "Más opciones" */
function cfMas78(){if(S.role!=='rep'||S.tab.rep!=='entrega')return;var st=S.stops&&S.stops[S.cur],c=st?cl(st.c):null;if(!c||c.lat==null||ubAprox78(c))return;var m=document.querySelector('details[data-k="entmas"]');if(!m||m.querySelector('[data-x="cf78"]'))return;
 var b=document.createElement('button');b.className='btn sm sec';b.dataset.x='cf78';b.dataset.act='cfub70';b.dataset.id=c.id;b.style.cssText='width:100%;margin-top:8px;min-height:48px';b.textContent='📍 Corregir la ubicación (estoy aquí)';m.appendChild(b)}
/* (b) en las altas por pasos: al guardar la ubicación pasa solo al siguiente paso */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ub68si"]');if(!b||!S.ub68||S.ub68.t!=='wz')return;setTimeout(function(){try{if(!S.wz)return;var P=wzPasos(),p=P[S.wz.p];if(p&&/¿Dónde está/.test(p.q)&&S.wz.d.lat!=null&&S.wz.p<P.length-1){S.wz.p++;S.wz.err='';render()}}catch(er){}},30)},true);
/* lo que se pone con link, búsqueda o Excel queda como aproximado hasta que el chofer lo confirme */
/* ub68Guarda: pasó a tema-ubica.js */

/* ---------- 21/22 · bodega: nombre y dirección de verdad ---------- */
function bodNomSug78(dir){var p=String(dir||'').split(',').map(function(s){return s.trim()}).filter(Boolean);if(!p.length)return '';var z=p.length>2?p[p.length-3]:p[0];z=z.replace(/^\d{5}\s*/,'').replace(/^(Col\.?|Colonia)\s*/i,'');return z?'Bodega '+z:''}
(function(){try{if(MODO!=='vacio')return;var b=(S.bods||[])[0];if(b&&!b.dem78&&b.n==='Bodega Banderilla'&&b.dir==='Banderilla, Veracruz'){b.n='Bodega';b.dir='';b.dem78=1}if(S.cfg&&S.cfg.dir==='Banderilla, Veracruz')S.cfg.dir=''}catch(e){}})();
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ub68sel"]');if(!b||!S.ub68)return;var r=(S.ub68.res||[])[+b.dataset.i];if(r){S.ub68.dir78=r.d||'';if(S.ub68.t==='bod'&&!String(S.ub68.nm78||'').trim())S.ub68.nm78=bodNomSug78(r.d)}},true);
/* ub68HTML: pasó a tema-ubica.js */

/* ---------- 16 · TAG: el cruce sin viaje de carga va a Gastos del vehículo ---------- */
/* tagCruce: pasó a tema-vehiculos.js */

/* ---------- 24 · "Lo que pasó hoy en su ruta" minimizado ---------- */
/* rcHTML: pasó a tema-sueltas.js */

/* ---------- 25b · "Aprende la app": cada renglón lleva a lo suyo ---------- */
function marca78(sel,msg){setTimeout(function(){var el=null;try{el=typeof sel==='string'?document.querySelector(String(sel).replace(/^CH:/,'')):sel}catch(e){el=null}if(!el){if(msg)toast(msg);return}try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}try{marcaFalta(el)}catch(e){}},250)}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="aprendeir"]');if(!b)return;e.stopImmediatePropagation();var t=(b.querySelector('.t')||b).textContent.trim(),r=S.role;
 var ir=function(tab){S.tab[r]=tab;render();window.scrollTo(0,0)};
 if(r==='admin'){
  if(/precio de hoy/i.test(t)){ir('inicio');S.dOpen.preciodia=true;render();var pb=document.querySelector('[data-act="precioed"]');if(pb&&!document.querySelector('[data-bind="precio.R"]'))pb.click();marca78('[data-bind="precio.R"]','Toca "Cambiar" en Precio de hoy');return}
  if(/efectivo de un chofer/i.test(t)){ir('inicio');var rb=document.querySelector('[data-act="recibir"],[data-act="rcabre"],[data-act="vercierre"]');if(rb)marca78(rb);else toast('Todavía no hay cierres que recibir. Cuando un chofer mande el suyo, te sale aquí en Inicio.');return}
  if(/resumen del día/i.test(t)){ir('inicio');var sb=document.querySelector('[data-act="resdia"]');if(sb)sb.click();else toast('El resumen sale al final del día en Inicio.');return}
  if(/Programar un viaje/i.test(t)){ir('cargas');var vb=document.querySelector('[data-act="vwnew"]');if(vb)vb.click();else marca78('main .card','Aquí en Cargas: "Viaje de carga"');return}
  if(/simulador/i.test(t)){ir('cargas');var sm=document.querySelector('[data-act="simabre"]');if(sm)sm.click();else toast('El simulador está en Cargas.');return}
  if(/Agregar un cliente/i.test(t)){ir('clientes');wzAbre('cli',{dias:[]});return}
  if(/respaldo/i.test(t)){S.aj=true;S.dOpen.ajresp=true;render();marca78('[data-k="ajresp"]');return}}
 else{var hay=curStop()>=0;
  if(/Entregar|Fiar|No estaba|tarjeta/i.test(t)){if(!hay){toast('Hoy no tienes clientes por visitar.');ir('ruta');return}ir('entrega');marca78(/No estaba/.test(t)?'[data-act="noestaba"]':(/tarjeta/i.test(t)?'[data-act="pforma"][data-v="tarjeta"],[data-act="pforma"]':(/Fiar/.test(t)?'[data-act="mode"],[data-act="pforma"]':'[data-act="entconf"]')));return}
  if(/gasto/i.test(t)){var g=document.querySelector('[data-act="gxsheet"]');if(g)g.click();else ir('ruta');return}
  if(/cierre|billetes/i.test(t)){ir('cierre');if(/billetes/.test(t)){S.cierreP=4;render()}return}}
 ir(b.dataset.t)},true);

/* ---------- 27 · el pedido asignado le llega al chofer al momento ---------- */
/* el administrador lo deja en la nube (pedAsig) y el celular del chofer lo mete a su ruta en cuanto lo recibe */
try{if(typeof NB_SH!=='undefined')['pedAsig','pePide'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)})}catch(e){}
/* p57Stops: pasó a tema-rutas.js */
function pedToma78(){if(S.role!=='rep'||S.chofHoy==null)return false;var L=(S.pedAsig||{})[S.chofHoy];if(!L||!L.length)return false;var ch=false;
 L.forEach(function(cid){if(!(S.stops||[]).some(function(s){return +s.c===+cid&&!s.done})){S.stops.push({c:+cid,ped:true});ch=true}});S.pedAsig[S.chofHoy]=[];if(ch&&S.cierre&&S.cierre.sent){try{S.tab.rep='ruta'}catch(e){}}return ch}
/* al volver de segundo plano también se revisa */
document.addEventListener('visibilitychange',function(){if(!document.hidden){try{render()}catch(e){}}});

/* ---------- 28 · una sola carga para todos los pedidos ---------- */
var R28='<div style="font-weight:800;color:var(--danger);margin-top:4px">No te alcanza para los pedidos: regresa a la bodega a cargar más.</div><button class="btn sm" style="margin-top:6px" data-act="abrirextra">Cargar más mercancía</button>';
function vrFix78(h){if(typeof h!=='string')return h;if(h.indexOf('data-act="pedcarga"')>-1&&h.indexOf(R28)>-1)h=h.replace(R28,'');return h}

/* ---------- 18 · galería de imágenes del vehículo ---------- */
function galeria78(){var L=[{k:'np',n:'Nissan NP300',src:VEH_IMGS[0][1](),img:0},{k:'m2',n:'Freightliner M2',src:VEH_IMGS[1][1](),img:1}],ya={};
 (S.veh||[]).forEach(function(v){if(v.foto&&String(v.foto).indexOf('data:')===0&&!ya[v.foto.length]){ya[v.foto.length]=1;L.push({k:'v'+v.id,n:v.n,src:v.foto})}});
 ((S.setup&&S.setup.veh)||[]).forEach(function(v,i){if(v.fotoMia&&!ya[v.fotoMia.length]){ya[v.fotoMia.length]=1;L.push({k:'s'+i,n:v.n,src:v.fotoMia})}});return L}
function galSug78(d){var t=(d.marca||'')+' '+(d.modelo||'');if(/nissan/i.test(t))return 'np';if(/freightliner|international|hino|kenworth|isuzu|m2/i.test(t))return 'm2';return d.tipo==='auto'?'np':''}
function galHTML78(d){var L=galeria78();if(!d.gal78&&!d.foto){var s=galSug78(d);if(s)d.gal78=s}
 return '<div class="card"><div class="gal78">'+L.map(function(g){return '<button data-act="gal78" data-k="'+g.k+'" aria-pressed="'+(d.gal78===g.k)+'"><img src="'+g.src+'" alt="">'+esc(g.n)+'</button>'}).join('')+'</div>'
  +'<div style="display:flex;gap:8px;margin-top:10px"><label class="btn sec" style="flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer;min-height:52px" for="gal78f">📷 Tomar foto</label><label class="btn sec" style="flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer;min-height:52px" for="gal78g">🖼️ Galería</label></div>'
  +'<input id="gal78f" type="file" accept="image/*" capture="environment" data-gal78="1" style="position:absolute;opacity:0;width:1px;height:1px"><input id="gal78g" type="file" accept="image/*" data-gal78="1" style="position:absolute;opacity:0;width:1px;height:1px">'
  +(d.foto&&!d.gal78?'<div class="card good" style="margin-top:8px;padding:8px"><img src="'+d.foto+'" alt="" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px"></div>':'')+'</div>'}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="gal78"]');if(!b||!S.wz)return;e.stopImmediatePropagation();var d=S.wz.d,g=galeria78().filter(function(x){return x.k===b.dataset.k})[0];if(!g)return;d.gal78=g.k;d.foto=g.img!=null?null:g.src;d.img78=g.img;render()},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.gal78||!S.wz)return;var f=t.files&&t.files[0];if(!f)return;var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var r=Math.min(1,FOTO_PX119/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*r);cv.height=Math.round(im.height*r);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);S.wz.d.foto=cv.toDataURL('image/jpeg',FOTO_Q119);S.wz.d.gal78=null;S.wz.d.img78=null;render()};im.src=fr.result};fr.readAsDataURL(f)},true);
/* el paso de foto de las altas de vehículo es la galería */
[WZ.veh,WZ.suVeh].forEach(function(W){if(!W)return;W.pasos.forEach(function(p){if(/Foto del vehículo/.test(p.q)){p.q='¿Qué imagen le ponemos?';p.a='Escoge una de la app, la de un vehículo igual que ya tengas, o tómale una foto.';delete p.c;p.html=function(d){return galHTML78(d)}}})});
/* en la primera vez, la imagen escogida de la app se respeta */
var _sVg78=WZ.suVeh.guardar;WZ.suVeh.guardar=function(d){var r=_sVg78.apply(this,arguments);try{var x=S.setup.veh[S.setup.veh.length-1];if(d.img78!=null){x.img=d.img78;x.fotoMia=null}else if(d.foto){x.fotoMia=d.foto}x.ex75=x.ex75||{};['vin','motor','llanta'].forEach(function(k){if(d[k])x.ex75[k]=String(d[k]).trim()});if(d.usaDef)x.ex75.def=d.usaDef==='si'}catch(e){}return r};
var _vG78=WZ.veh.guardar;WZ.veh.guardar=function(d){if(d.img78!=null&&!d.foto)d.foto=VEH_IMGS[d.img78][1]();if(d.usaDef)d.usaDef=d.usaDef==='si'?'si':'';var r=_vG78.apply(this,arguments);try{if(r===true){var v=S.veh[S.veh.length-1];if(d.usaDef==='si')v.def=true;else if(d.comb==='Diésel')v.def=false;['vin','motor','llanta'].forEach(function(k){if(d[k])v[k]=String(d[k]).trim()})}}catch(e){}return r};

/* ---------- 20 · VIN, motor y llanta · 30 · DEF ---------- */
function llanta78(s){var t=String(s||'').toUpperCase().replace(/[^0-9.]/g,'');if(!t)return '';var a=t.slice(0,3),b=t.slice(3,5),c=t.slice(5);return a+(t.length>3?'/'+b:'')+(t.length>5?'R'+c:'')}
[WZ.veh,WZ.suVeh].forEach(function(W){if(!W)return;var P=W.pasos,i=-1;P.forEach(function(p,k){if(/combustible usa/.test(p.q))i=k});
 if(i>-1)P.splice(i+1,0,{q:'¿Usa DEF (AdBlue)?',a:'El líquido de los camiones a diésel. Si lo usa, la app pregunta su nivel en cada viaje.',si:function(d){return d.comb==='Diésel'},c:[{k:'usaDef',t:'opc',o:[['si','Sí, usa DEF'],['no','No']],falta:'Escoge si usa DEF'}],auto:true});
 var j=-1;P.forEach(function(p,k){if(/kilómetros marca hoy/.test(p.q))j=k});
 if(j>-1)P.splice(j+1,0,{q:'Datos del vehículo',a:'Opcionales. Si no los tienes a la mano, toca "Saltar".',saltar:true,c:[{k:'vin',l:'Número de serie (VIN)',ph:'17 letras y números',opc:true},{k:'motor',l:'Motor',ph:'Ej. 2.5 L 4 cilindros',opc:true},{k:'llanta',l:'Medida de llanta',ph:'Ej. 295/75R22.5',opc:true}],
  ok:function(d){var v=String(d.vin||'').toUpperCase().replace(/\s/g,'');d.vin=v;if(v&&!/^[A-HJ-NPR-Z0-9]{17}$/.test(v)&&!(d._vin78===v&&Date.now()-d._vinT78>700)){if(d._vin78!==v){d._vin78=v;d._vinT78=Date.now()}return 'Revisa el número de serie: son 17 letras y números, sin I, O ni Q. Si así viene, toca "Siguiente" otra vez.'}return ''}})});
document.addEventListener('input',function(e){var t=e.target;if(!t||!(t.id==='wz_llanta'||t.id==='vf_llanta'))return;var f=llanta78(t.value);if(f!==t.value){t.value=f;if(t.id==='wz_llanta'&&S.wz)S.wz.d.llanta=f;if(t.id==='vf_llanta'&&S.vf)S.vf.llanta=f}},true);
function defPreg78(){if(!(S.role==='admin'&&!S.encOn)||S.tab.admin!=='vehiculos')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="def78"]'))return;var L=(S.veh||[]).filter(function(v){return !v.baja&&/Di[ée]sel/.test(v.comb||'')&&!v.def&&!v.defPreg78});if(!L.length)return;
 var d=document.createElement('div');d.dataset.x='def78';d.innerHTML=L.map(function(v){return '<div class="card note" style="padding:12px 14px"><b>¿'+esc(v.n)+' usa DEF (AdBlue)?</b><div class="lbl">Si lo usa, en cada viaje se pregunta su nivel.</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:1" data-act="def78" data-id="'+v.id+'" data-v="1">Sí</button><button class="btn sec" style="flex:1" data-act="def78" data-id="'+v.id+'" data-v="0">No</button></div></div>'}).join('');m.prepend(d)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="def78"]');if(!b)return;e.stopImmediatePropagation();var v=vehById(+b.dataset.id);if(!v)return;v.def=b.dataset.v==='1';v.defPreg78=1;toast(v.def?'✓ '+v.n+' usa DEF':'Listo');render()},true);

/* ---------- 19 · el rebote al final de la lista ---------- */
window.addEventListener('scroll',function(e){var de=document.documentElement,y=window.scrollY,max=de.scrollHeight-window.innerHeight;if(y<0||y>max-2)e.stopImmediatePropagation()},true);
var TH78={};
function thumbs78(){var m=document.querySelector('main');if(!m)return;Array.prototype.forEach.call(m.querySelectorAll('img[src^="data:"]'),function(im){var s=im.getAttribute('src');if(!s||s.length<120000||im.dataset.th78)return;var k=s.length+':'+s.slice(-48);im.dataset.th78=1;if(TH78[k]){im.src=TH78[k];return}
 var o=new Image();o.onload=function(){try{var r=Math.min(1,560/Math.max(o.width,o.height)),cv=document.createElement('canvas');cv.width=Math.round(o.width*r);cv.height=Math.round(o.height*r);cv.getContext('2d').drawImage(o,0,0,cv.width,cv.height);TH78[k]=cv.toDataURL('image/jpeg',0.8);Array.prototype.forEach.call(document.querySelectorAll('main img[data-th78]'),function(x){if(x.getAttribute('src')===s)x.src=TH78[k]})}catch(er){}};o.src=s})}

/* ---------- 23 · cámara: la principal y "Cambiar lente" ---------- */
var CAM78={L:[],i:0};
function camLentes78(){return navigator.mediaDevices.enumerateDevices().then(function(D){var V=D.filter(function(d){return d.kind==='videoinput'}),atras=V.filter(function(d){return /back|rear|trasera|environment|facing back/i.test(d.label)});if(!atras.length)atras=V.slice(V.length>1?1:0);
 var num=function(d){var m=/camera2?\s*(\d+)/i.exec(d.label);return m?+m[1]:99};var malo=function(d){return /mono|tele|wide|ultra|depth|macro|gran angular/i.test(d.label)?1:0};
 atras.sort(function(a,b){return malo(a)-malo(b)||num(a)-num(b)});CAM78.L=atras;return atras})}
function camAbre78(id){var v=document.querySelector('#cam73 video'),m=document.querySelector('#cam73 .msg');if(!v)return;try{if(CAM73.stream)CAM73.stream.getTracks().forEach(function(t){t.stop()})}catch(e){}
 navigator.mediaDevices.getUserMedia({audio:false,video:{deviceId:{exact:id},width:{ideal:1920},height:{ideal:1080}}}).then(function(s){CAM73.stream=s;v.srcObject=s;v.play().catch(function(){});if(m)m.textContent=''}).catch(function(){toast('Ese lente no se pudo abrir')})}
/* cam73Prende: pasó a tema-camara.js */
function camBtn78(){var bar=document.querySelector('#cam73 .cbar73');if(!bar||bar.querySelector('[data-cam="lente"]')||CAM78.L.length<2)return;var b=document.createElement('button');b.dataset.cam='lente';b.innerHTML='🔁<br>Lente';var g=bar.querySelector('[data-cam="gal"]');bar.insertBefore(b,g.nextSibling)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#cam73 [data-cam="lente"]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();if(!CAM78.L.length)return;CAM78.i=(CAM78.i+1)%CAM78.L.length;var d=CAM78.L[CAM78.i];try{localStorage.setItem('cam78',d.deviceId)}catch(er){}camAbre78(d.deviceId);toast('Lente '+(CAM78.i+1)+' de '+CAM78.L.length)},true);

/* ---------- la pantalla del chofer: lo nuevo se acomoda al armarla ---------- */
var _vr78=null;function vr78Pon(){if(_vr78||typeof VIEWS==='undefined'||!VIEWS.ruta)return;_vr78=VIEWS.ruta;VIEWS.ruta=function(){return vrFix78(_vr78.apply(this,arguments))}}

/* render: pasó a tema-dibujar1.js */
/* el estado del pedido reconoce lo asignado por la nube */
var _e57_78=est57;est57=function(c){var r=_e57_78.apply(this,arguments);try{if(!r.ch&&c&&c.ped){var id=c.ped.asig78;chofsDia57().forEach(function(ch){if(r.ch)return;if(((S.pedAsig||{})[ch.id]||[]).some(function(x){return +x===+c.id})||(id!=null&&+id===+ch.id))r.ch=ch})}}catch(e){}return r};
/* p57Asigna: pasó a tema-rutas.js */
