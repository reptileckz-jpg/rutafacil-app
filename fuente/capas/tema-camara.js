/* ===================== TEMA · Cámara de la app (abrir, prender, galería) (aplanado el 18 nov) =====================
   Antes estaba repartido en 4 envolturas encadenadas en l78, l82.
   Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo (comprobado con su prueba de comparación).
   Si se cambia algo de esto, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   Se arma justo después de tema-cajas.js. La cámara base está en l73.
   - cam73Prende: abre la cámara una sola vez, reintenta si tarda, avisa si falta el permiso (l78); avisa si la foto solo se toma con la cámara (l82).
   - cam73Abre / cam73Galeria: fotos que solo se pueden tomar con la cámara, no de la galería (l82).
   ============================================================================================ */

/* cam73Prende · de l78 */
var _cP78=cam73Prende;cam73Prende=function(){if(CAM73.cara!=='environment')return _cP78.apply(this,arguments);var v=document.querySelector('#cam73 video'),m=document.querySelector('#cam73 .msg');if(!v)return;
 /* 113 · antes se abría dos veces (una para el permiso y otra con el lente guardado): tardaba, a veces decía "falta permiso" y en el Moto X
    cambiaba al lente blanco y negro. Ahora: una sola vez, el lente principal; "Lente" cambia a mano solo para esa foto. */
 try{if(CAM73.stream)CAM73.stream.getTracks().forEach(function(t){t.stop()})}catch(e){}try{localStorage.removeItem('cam78')}catch(e){}CAM78.i=0;var intento=0;
 var abre=function(){navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}}).then(function(s){if(!document.getElementById('cam73')){try{s.getTracks().forEach(function(t){t.stop()})}catch(e){}return}
   CAM73.stream=s;v.srcObject=s;v.play().catch(function(){});if(m)m.textContent='';camLentes78().then(function(){camBtn78()}).catch(function(){})})
  .catch(function(er){var n=er&&er.name,perm=n==='NotAllowedError'||n==='SecurityError';if(!document.getElementById('cam73'))return;
   if(!perm&&intento<3){intento++;if(m)m.textContent='Abriendo la cámara…';setTimeout(abre,700);return}
   if(m)m.innerHTML=perm?'No se pudo abrir la cámara.<br><span style="font-weight:400;font-size:15px">Dale permiso de cámara a la app: Ajustes del celular → Apps → Ruta Fácil → Permisos → Cámara.</span>':'No se pudo abrir la cámara.<br><span style="font-weight:400;font-size:15px">Ciérrala y vuelve a intentar.</span>'})};
 abre()};

/* cam73Abre · de l82 */
var _ca82=cam73Abre;cam73Abre=function(inp){var r=_ca82.apply(this,arguments);try{if(soloCam82(inp)){var g=document.querySelector('#cam73 [data-cam="gal"]');if(g){var s=document.createElement('span');s.setAttribute('style','width:64px;font-size:12px;text-align:center;color:#fff;opacity:.8');s.textContent='Solo cámara';g.replaceWith(s)}CAM73.solo82=1}else CAM73.solo82=0}catch(e){}return r};

/* cam73Galeria · de l82 */
var _cg82=cam73Galeria;cam73Galeria=function(){if(CAM73.solo82){toast('Esta foto solo se puede tomar con la cámara');return}return _cg82.apply(this,arguments)};

/* cam73Prende · de l82 */
var _cp82=cam73Prende;cam73Prende=function(){var r=_cp82.apply(this,arguments);if(CAM73.solo82)setTimeout(function(){var m=document.querySelector('#cam73 .msg');if(m&&/Galer/.test(m.innerHTML))m.innerHTML='No se pudo abrir la cámara.<br><span style="font-weight:400;font-size:15px">Dale permiso de cámara a la app: Ajustes del celular → Apps → Ruta Fácil → Permisos → Cámara.</span>'},1500);return r};
