/* ===================== TEMA · La pantalla ya no parpadea mientras baja la nube (20 nov · punto 8 de la nueva numeración) =====================
   Ricardo: "en el apartado de empleados, al ingresar a la tarjeta de uno, ésta se actualiza a cada rato, haciendo que la pantalla parpadee
   mucho … la dejé abierta sin tocarla unos 2 o 3 minutos y el parpadeo se detuvo. Revisa que en ningún apartado de toda la app pase esto".
   Causa (en TODA la app, no solo en Empleados): al abrir, el celular baja de la nube todas las fotos guardadas (cierres, entregas, vehículos,
   documentos), de 20 en 20, y POR CADA FOTO que llegaba recorría todos los datos del negocio y volvía a dibujar la pantalla completa
   (nbPonFoto → nbRender). Con cientos de fotos: cientos de redibujos seguidos durante 2–3 minutos = parpadeo (medido: 100 fotos → 100
   redibujos). Lo mismo, en menor grado, con cada paquete de datos que manda la nube.
   Ahora:
     1) Las fotos que van llegando se juntan y se ponen todas de una vez (un solo recorrido de los datos y UN redibujo por tanda).
     2) Lo que llega de la nube redibuja como mucho una vez cada 0.5 s: el primer cambio se ve al instante y el último nunca se pierde
        (se dibuja al terminar la espera). Lo que TÚ tocas se dibuja igual que siempre, al momento.
   No cambia ningún dato ni ninguna cuenta: solo cuántas veces se vuelve a dibujar la pantalla. Se arma al final.
   ============================================================================================ */
/* 1) fotos: en tandas */
var FOTOS8 = { q: {}, n: 0, t: null };
function fotos8Suelta() {
  FOTOS8.t = null;
  var Q = FOTOS8.q; FOTOS8.q = {}; FOTOS8.n = 0;
  var cambio = false;
  try {
    (function rec(o) {
      if (!o || typeof o !== 'object') return;
      for (var k in o) {
        var x = o[k];
        if (typeof x === 'string') { if (x.length < 80 && Q[x] !== undefined) { o[k] = Q[x]; cambio = true; } }
        else if (x && typeof x === 'object') rec(x);
      }
    })(S);
  } catch (e) { console.error('fotos8', e); }
  if (cambio) nbRender();
}
nbPonFoto = function (m, url) {
  FOTOS8.q[m] = url; FOTOS8.n++;
  if (!FOTOS8.t) FOTOS8.t = setTimeout(fotos8Suelta, 400);
};
/* 2) lo que llega de la nube: como mucho un redibujo cada 0.5 s (el primero al instante, el último nunca se pierde) */
var NBR8 = { ult: 0, t: null, ms: 500 };
var _nbR8 = nbRender;
nbRender = function () {
  var ahora = Date.now(), falta = NBR8.ult + NBR8.ms - ahora;
  if (falta <= 0 && !NBR8.t) { NBR8.ult = ahora; return _nbR8.apply(this, arguments); }
  if (!NBR8.t) NBR8.t = setTimeout(function () { NBR8.t = null; NBR8.ult = Date.now(); try { _nbR8(); } catch (e) { console.error('nbRender8', e); } }, Math.max(30, falta));
};
