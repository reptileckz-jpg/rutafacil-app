/* ===================== TEMA · Las fotos se quedan guardadas en el celular (20 nov · punto 13 de la nueva numeración) =====================
   Ricardo: "las fotos no se conservan ya descargadas o listas en memoria. Al entrar a ver los vehículos de ruta o seleccionar uno, tardan unos
   segundos en aparecer. Implementar caché local o precarga para que carguen de forma instantánea".
   Causa: las fotos vivían solo en la memoria mientras la app estaba abierta (NB.fotos). Cada vez que se abre la app, la nube manda los datos
   con "aquí va una foto" (⟦f:…⟧) y el celular las volvía a bajar TODAS de internet, de 20 en 20, aunque ya las hubiera bajado ayer
   (eso además alimentaba el parpadeo del punto 8).
   Ahora:
     1) Cada foto que baja de la nube (o que se toma en este celular) se guarda en el celular (IndexedDB, llave "f13:<id>"). La próxima vez
        sale de ahí al instante, sin internet; solo se baja de la nube la que no está guardada.
     2) Se guardan hasta 400 fotos; si hay más, se quitan las que hace más tiempo no se usan (se pueden volver a bajar de la nube).
     3) Las fotos de los vehículos se dejan listas (precargadas y decodificadas) en cuanto están, para que al entrar o escoger uno salgan ya.
   No cambia ninguna foto ni ningún dato del negocio; "Volver a bajar los datos de la nube" no las borra (no hace falta). Se arma al final.
   ============================================================================================ */
var FC13 = { max: 400, idx: {} };
try { FC13.idx = JSON.parse(localStorage.getItem('fc13') || '{}') || {}; } catch (e) { FC13.idx = {}; }
function fc13GuardaIdx() { try { localStorage.setItem('fc13', JSON.stringify(FC13.idx)); } catch (e) {} }
function fc13Del(k) { try { idbAbrir(function (db) { if (!db) return; try { db.transaction('kv', 'readwrite').objectStore('kv').delete(k); } catch (e) {} }); } catch (e) {} }
function fc13Usa(id) { FC13.idx[id] = Date.now(); }
function fc13Pon(id, url) {
  if (!id || typeof url !== 'string' || url.slice(0, 5) !== 'data:' || url === FOTO_BORRADA) return;
  try {
    idbPut('f13:' + id, url); fc13Usa(id);
    var L = Object.keys(FC13.idx);
    if (L.length > FC13.max) { L.sort(function (a, b) { return FC13.idx[a] - FC13.idx[b]; }).slice(0, L.length - FC13.max).forEach(function (x) { delete FC13.idx[x]; fc13Del('f13:' + x); }); }
    fc13GuardaIdx();
  } catch (e) {}
}
/* las fotos que faltan: primero las guardadas en el celular (al instante), y solo las demás se bajan de la nube (20 a la vez, como antes) */
var _nbTF13 = nbTraerFotos;
nbTraerFotos = function () {
  var L = Object.keys(NB.faltan || {}); if (!L.length) return;
  var locales = L.filter(function (id) { return FC13.idx[id] != null && !(NB._trayendo && NB._trayendo[id]); });
  if (!locales.length) return _nbTF13.apply(this, arguments);
  var pend = locales.length, sigue = function () { if (--pend <= 0) {
    /* las del celular se ponen ya (sin esperar la tanda de 0.4 s del punto 8) */
    try { if (typeof FOTOS8 !== 'undefined' && FOTOS8.t) { clearTimeout(FOTOS8.t); fotos8Suelta(); } } catch (e) {}
    try { _nbTF13(); } catch (e) {} fc13GuardaIdx(); } };
  locales.forEach(function (id) {
    delete NB.faltan[id]; NB._trayendo = NB._trayendo || {}; NB._trayendo[id] = 1;
    idbGet('f13:' + id, function (url) {
      delete NB._trayendo[id];
      if (url) { NB.fotos[id] = url; fc13Usa(id); nbPonFoto(FOTO_MARCA + id + '⟧', url); }
      else { delete FC13.idx[id]; NB.faltan[id] = 1; }
      sigue();
    });
  });
};
/* lo que baja de la nube se guarda (el original de l28 pone NB.fotos[id] y llama nbPonFoto) */
var _nbPF13 = nbPonFoto;
nbPonFoto = function (m, url) {
  try { var id = String(m).slice(FOTO_MARCA.length, -1); if (id && FC13.idx[id] == null) fc13Pon(id, url); } catch (e) {}
  return _nbPF13.apply(this, arguments);
};
/* lo que se toma en este celular también se guarda */
var _nbFM13 = nbFotoMarca;
nbFotoMarca = function (x) {
  var r = _nbFM13.apply(this, arguments);
  try { var id = String(r).slice(FOTO_MARCA.length, -1); if (id && FC13.idx[id] == null) fc13Pon(id, x); } catch (e) {}
  return r;
};
/* 3) las fotos de los vehículos, listas (decodificadas) para que salgan al instante */
var PRE13 = { hechas: {}, im: [], t: 0 };
function pre13Vehiculos() {
  if (Date.now() - PRE13.t < 3000) return; PRE13.t = Date.now();
  try {
    (S.veh || []).forEach(function (v) {
      var f = v && v.foto; if (typeof f !== 'string' || f.slice(0, 5) !== 'data:') return;
      var k = v.id + '|' + f.length + '|' + f.slice(-24); if (PRE13.hechas[k]) return; PRE13.hechas[k] = 1;
      var im = new Image(); im.decoding = 'async'; im.src = f; if (im.decode) im.decode().catch(function () {}); PRE13.im.push(im);
      if (PRE13.im.length > 40) PRE13.im.shift();
    });
  } catch (e) {}
}
var _rd13 = render;
render = function () { var r = _rd13.apply(this, arguments); try { pre13Vehiculos(); } catch (e) {} return r; };
