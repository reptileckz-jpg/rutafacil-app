/* ===================== v7.6 · huella y cámara (12 nov)
   67 la huella ya no se ofrece en la pantalla del PIN (ni queda trabada al volver a abrir): se ofrece ya dentro de la app;
      si dices "Ahora no", se vuelve a sugerir en 3 días (dos veces como mucho) y siempre está en Ajustes
   69 cámara propia: siempre abre la trasera (el Z Fold abría la frontal), con botón para voltear y para escoger de la galería
   70 las fotos llevan fecha y quién la tomó (y la placa en las del vehículo) ===================== */
function quienFoto73(){try{if(S.role==='rep')return chofN(S.chofHoy);return quien()}catch(e){return ''}}

/* ---------- 67 · huella ---------- */
try{if(S.px&&S.px.t==='bio')S.px=null}catch(e){}
function bioEst73(k){try{return JSON.parse(localStorage.getItem('bio73:'+k)||'{}')||{}}catch(e){return {}}}
function bioPon73(k,o){try{localStorage.setItem('bio73:'+k,JSON.stringify(o))}catch(e){}}
function bioToca73(k){if(!k||bioActiva(k))return false;var no=false;try{no=localStorage.getItem(bioLlave(k)+':no')==='1'}catch(e){}var o=bioEst73(k);if(num(o.n)>=2)return false;if(o.next&&o.next>iso(new Date()))return false;if(no&&!o.n)return true;return true}
/* pxHTML: pasó a tema-piezas.js */
/* después de crear el PIN y la pista ya no se ofrece ahí */
pxSigue=function(k){S.px=null;render()};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="biono"]');if(!b||!S.px||S.px.t!=='bio')return;e.stopImmediatePropagation();var k=S.px.k,o=bioEst73(k);o.n=num(o.n)+1;var d=new Date();d.setDate(d.getDate()+3);o.next=iso(d);bioPon73(k,o);S.px=null;render()},true);
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="bioactiva"]');if(!b||!S.px||S.px.t!=='bio')return;e.stopImmediatePropagation();var k=S.px.k,pl=bioPl();if(!pl){S.px=null;render();return}
 var listo=false,fin=function(ok){if(listo)return;listo=true;S.px=null;if(ok){try{localStorage.setItem(bioLlave(k),'1');localStorage.removeItem(bioLlave(k)+':no')}catch(er){}toast('Listo: la próxima vez entras con tu huella')}else{var o=bioEst73(k),d=new Date();d.setDate(d.getDate()+3);o.next=iso(d);bioPon73(k,o);toast('No se activó la huella. Puedes hacerlo en Ajustes → Huella.')}render()};
 setTimeout(function(){fin(false)},30000);
 try{pl.verifyIdentity({reason:'Para activar la huella en Ruta Fácil',title:'Pon tu huella',negativeButtonText:'Cancelar'}).then(function(){fin(true)},function(){fin(false)})}catch(er){fin(false)}},true);
/* en Ajustes siempre se puede (aunque se haya dicho que no) */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="bioon"]');if(!b)return;e.stopImmediatePropagation();S.px={t:'bio',k:pinKey(),dentro:true,aj:1};render()},true);
/* se ofrece ya dentro de la app, nunca encima del PIN */
var _bioHay73=null;
function bioOfrece73(){if(S.px||!bioPl()||window.__pnTest&&!window.__bio73Test)return;if(document.getElementById('pinov')||document.getElementById('setov')||document.getElementById('wzov')||S.modal)return;var k;try{k=pinKey()}catch(e){return}if(!k||!(S.pinOk&&S.pinOk[k]))return;if(!bioToca73(k))return;
 if(_bioHay73===null){_bioHay73='?';bioHay(function(si){_bioHay73=!!si;if(si)setTimeout(function(){render()},1500)});return}if(_bioHay73!==true)return;
 if(window._bio73Ya)return;window._bio73Ya=1;setTimeout(function(){if(!S.px&&!document.getElementById('pinov')){S.px={t:'bio',k:k,dentro:true};render()}},1200)}

/* ---------- 69 · cámara propia ---------- */
(function(){var st=document.createElement('style');st.textContent=[
 '#cam73{position:fixed;inset:0;z-index:120;background:#000}',
 '#cam73 video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000}',
 '#cam73 .ctop73{position:absolute;top:calc(10px + var(--sbar,0px));left:10px;right:10px;display:flex;justify-content:space-between;align-items:center;color:#fff;font-weight:800;font-size:16px;text-shadow:0 1px 3px #000;background:transparent!important;box-shadow:none!important;border:0!important;padding:0!important;z-index:2}',
 '#cam73 .ctop73 button{width:52px;height:52px;border-radius:50%;border:0;background:rgba(0,0,0,.55);color:#fff;font-size:26px}',
 '#cam73 .cbar73{position:absolute;left:0;right:0;bottom:0;z-index:2;display:flex;align-items:center;justify-content:space-around;padding:18px 10px calc(26px + env(safe-area-inset-bottom,0px));background:linear-gradient(transparent,rgba(0,0,0,.75) 35%)}',
 '#cam73 .cbar73 button{border:0;background:rgba(255,255,255,.18);color:#fff;border-radius:16px;min-width:80px;min-height:60px;font-size:14px;font-weight:800;line-height:1.3}',
 '#cam73 .cbar73 .tiro{width:80px;height:80px;min-width:0;min-height:0;border-radius:50%;background:#fff;border:5px solid #000;box-shadow:0 0 0 4px #fff}',
 '#cam73 .msg{position:absolute;left:16px;right:16px;top:40%;text-align:center;color:#fff;font-size:17px;font-weight:700;z-index:2}'].join('\n');document.head.appendChild(st)})();
var CAM73={inp:null,stream:null,cara:'environment'};
function cam73Cierra(){try{if(CAM73.stream)CAM73.stream.getTracks().forEach(function(t){t.stop()})}catch(e){}CAM73.stream=null;var o=document.getElementById('cam73');if(o)o.remove();CAM73.inp=null}
function cam73Prende(){var v=document.querySelector('#cam73 video'),m=document.querySelector('#cam73 .msg');if(!v)return;try{if(CAM73.stream)CAM73.stream.getTracks().forEach(function(t){t.stop()})}catch(e){}
 var pide=function(c){return navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:c,width:{ideal:1920},height:{ideal:1080}}})};
 var c1=CAM73.cara==='environment'?{exact:'environment'}:'user';
 pide(c1).catch(function(){return pide({ideal:CAM73.cara})}).then(function(s){CAM73.stream=s;v.srcObject=s;v.play().catch(function(){});if(m)m.textContent=''}).catch(function(er){if(m)m.innerHTML='No se pudo abrir la cámara.<br><span style="font-weight:400;font-size:15px">Revisa el permiso de cámara de la app, o usa "Galería".</span>'})}
function cam73Abre(inp){cam73Cierra();CAM73.inp=inp;CAM73.cara='environment';var d=document.createElement('div');d.id='cam73';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cámara');
 /* 113 · sin el ícono gris de "reproducir" que Android pone mientras arranca la cámara: imagen vacía y fondo negro */
 d.innerHTML='<video playsinline autoplay muted poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="background:#000"></video><div class="msg">Abriendo la cámara…</div><div class="ctop73"><button data-cam="x" aria-label="Cerrar">×</button><span>📷 Toma la foto</span><span style="width:48px"></span></div><div class="cbar73"><button data-cam="gal">🖼️<br>Galería</button><button class="tiro" data-cam="tiro" aria-label="Tomar foto"></button><button data-cam="voltea">🔄<br>Voltear</button></div>';
 document.body.appendChild(d);cam73Prende()}
function cam73Sello(cx,w,h){var t=new Date().toLocaleString('es-MX')+(quienFoto73()?' · '+quienFoto73():''),hh=Math.max(22,Math.round(w*22/480));cx.fillStyle='rgba(0,0,0,.55)';cx.fillRect(0,h-hh,w,hh);cx.fillStyle='#fff';cx.font=Math.round(hh*0.6)+'px sans-serif';cx.textBaseline='middle';cx.fillText(t,Math.round(hh*0.3),h-hh/2)}
/* 106 · si mientras la cámara estaba abierta la pantalla se volvió a dibujar, la casilla que se recordó ya no está en pantalla:
   la foto se entrega a la que está ahora (la del mismo id). Antes se perdía sin avisar (pasaba con la del odómetro). */
function cam73Destino(inp){if(!inp)return inp;if(inp.isConnected)return inp;var x=inp.id&&document.getElementById(inp.id);return x||inp}
function cam73Tira(){var v=document.querySelector('#cam73 video'),inp=cam73Destino(CAM73.inp);if(!v||!inp||!v.videoWidth){toast('La cámara todavía no está lista');return}
 var r=Math.min(1,1600/Math.max(v.videoWidth,v.videoHeight)),w=Math.round(v.videoWidth*r),h=Math.round(v.videoHeight*r),cv=document.createElement('canvas');cv.width=w;cv.height=h;var cx=cv.getContext('2d');
 if(CAM73.cara==='user'){cx.translate(w,0);cx.scale(-1,1)}cx.drawImage(v,0,0,w,h);cx.setTransform(1,0,0,1,0,0);cam73Sello(cx,w,h);
 cv.toBlob(function(bl){if(!bl){toast('No se pudo tomar la foto');return}try{var f=new File([bl],'foto-'+Date.now()+'.jpg',{type:'image/jpeg'}),dt=new DataTransfer();dt.items.add(f);inp=cam73Destino(inp);inp.files=dt.files;cam73Cierra();inp.dispatchEvent(new Event('change',{bubbles:true}));inp.dispatchEvent(new Event('input',{bubbles:true}))}catch(er){console.error('cam73',er);cam73Cierra();toast('No se pudo pasar la foto. Usa la galería.')}},'image/jpeg',0.85)}
function cam73Galeria(){var inp=cam73Destino(CAM73.inp);cam73Cierra();if(!inp)return;
 /* 106 · si al escoger la foto la casilla ya no está en pantalla, se pasa a la que está ahora */
 if(!inp._cam73fw){inp._cam73fw=1;inp.addEventListener('change',function(){if(inp.isConnected)return;var x=cam73Destino(inp);if(x&&x!==inp&&inp.files&&inp.files.length){try{x.files=inp.files;x.dispatchEvent(new Event('change',{bubbles:true}))}catch(e){}}})}var cap=inp.getAttribute('capture');inp.removeAttribute('capture');inp._cam73skip=1;try{inp.click()}catch(e){}setTimeout(function(){inp._cam73skip=0;if(cap!=null)inp.setAttribute('capture',cap)},1500)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#cam73 [data-cam]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();var a=b.dataset.cam;
 if(a==='x'){cam73Cierra();return}if(a==='tiro'){cam73Tira();return}if(a==='gal'){cam73Galeria();return}if(a==='voltea'){CAM73.cara=CAM73.cara==='environment'?'user':'environment';cam73Prende();return}},true);
/* 113 · al tomar una foto, si al volver (de la cámara del celular o de la galería) la pantalla ya se volvió a dibujar, la casilla de
   donde se pidió ya no está en pantalla: la foto se pasa a la que está ahora (la del mismo id). Antes se perdía sin avisar. */
window.addEventListener('click',function(e){var t=e.target,inp=null;if(!t||!t.closest)return;if(t.matches&&t.matches('input[type=file]'))inp=t;else{var lb=t.closest('label[for]');if(lb){var x=document.getElementById(lb.htmlFor);if(x&&x.matches&&x.matches('input[type=file]'))inp=x}}
 if(!inp||inp._fw113)return;inp._fw113=1;inp.addEventListener('change',function(){if(inp.isConnected)return;var y=inp.id&&document.getElementById(inp.id);if(y&&y!==inp&&inp.files&&inp.files.length){try{y.files=inp.files;y.dispatchEvent(new Event('change',{bubbles:true}))}catch(er){}}})},true);
window.addEventListener('click',function(e){if(window.__pnTest&&!window.__cam73Test)return;if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia))return;var t=e.target,inp=null;if(!t||!t.closest)return;
 if(t.matches&&t.matches('input[type=file]'))inp=t;else{var lb=t.closest('label[for]');if(lb){var x=document.getElementById(lb.htmlFor);if(x&&x.matches('input[type=file]'))inp=x}}
 if(!inp||inp._cam73skip||!inp.hasAttribute('capture')||!/image/.test(inp.getAttribute('accept')||'image'))return;e.preventDefault();e.stopImmediatePropagation();cam73Abre(inp)},true);
/* el botón "atrás" de Android cierra la cámara */
document.addEventListener('backbutton',function(){if(document.getElementById('cam73'))cam73Cierra()},false);

/* render: pasó a tema-dibujar1.js */
