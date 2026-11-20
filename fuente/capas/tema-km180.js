/* ===================== TEMA · Kilómetros de la ruta: un solo cálculo (20 nov · punto 180) =====================
   Ricardo (captura del cierre): "aquí en el kilometraje se contradice la aplicación": arriba "la ruta era de ~30 km (según Google)" y
   abajo "ya viene puesto según tu ruta (~239 km)".
   Eran dos cálculos distintos:
     · el de Google (154) es el de cuando ordenas la ruta con tráfico, pero Google la calcula DESDE DONDE ESTABAS: si la ordenaste ya en
       camino, solo cuenta lo que faltaba (30 km);
     · el de la app (rutaKmEst) sumaba la distancia de cada cliente como si fueras y volvieras por cada uno (239 km).
   Ahora uno solo para todo (aviso del cierre, número que viene puesto en el odómetro, revisión del odómetro):
     1) Google, solo si ordenaste la ruta desde la bodega y antes de empezar a entregar (entonces es el día completo);
     2) si no, de parada en parada con la ubicación de tus clientes: bodega → clientes en su orden → bodega (con lo que se alarga por
        las calles);
     3) si casi ningún cliente tiene ubicación, el cálculo de antes.
   Solo cambia el número de kilómetros esperados; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
var _rutaKmEstViejo = rutaKmEst;
function km180Bod() { return (typeof BOD !== 'undefined' && BOD && BOD.lat != null) ? BOD : null; }
/* ¿Google cubrió el día completo? se decide en el momento en que se ordenó la ruta */
function km180Marca() {
  try {
    var g = S.rgRes;
    if (!g || g.fuente !== 'google' || g.completo180 != null) return;
    var nada = !(S.stops || []).some(function (s) { return s && s.done; }), b = km180Bod(), p = S.pos;
    var cerca = !p || p.lat == null || !b || (kmE(p, b) != null && kmE(p, b) <= 2.5);
    g.completo180 = !!(nada && cerca);
  } catch (e) {}
}
function km180Geo() {
  var b = km180Bod(), L = (S.stops || []).map(function (s) { return s ? cl(s.c) : null; }).filter(function (c) { return c && !c.rapida; });
  if (!b || !L.length) return null;
  var conLL = L.filter(function (c) { return c.lat != null && c.lng != null && !isNaN(+c.lat) && !isNaN(+c.lng); });
  if (conLL.length < Math.max(1, Math.ceil(L.length / 2))) return null;
  var km = 0, prev = b;
  conLL.forEach(function (c) { var d = kmE(prev, { lat: +c.lat, lng: +c.lng }); if (d != null) km += d; prev = { lat: +c.lat, lng: +c.lng }; });
  var v = kmE(prev, b); if (v != null) km += v;
  /* los que no tienen ubicación: lo de antes, solo para ellos */
  var sin = L.length - conLL.length; if (sin > 0) km += sum(L.filter(function (c) { return conLL.indexOf(c) < 0; }), function (c) { return num(c.km); });
  return km > 0 ? km : null;
}
function kmRuta180() {
  try {
    var g = S.rgRes;
    if (g && g.fuente === 'google' && g.completo180 && g.f === (S.rutaDia80 || iso(TODAY)) && !g.deshecho && g.ahora && num(g.ahora.km) > 0)
      return { km: Math.round(num(g.ahora.km)), src: 'Google' };
    var geo = km180Geo();
    if (geo) return { km: Math.max(5, Math.round(geo)), src: 'el mapa de tus clientes' };
  } catch (e) {}
  return { km: _rutaKmEstViejo(), src: 'la app' };
}
rutaKmEst = function () { return kmRuta180().km; };
kmEsp154 = function () { try { var x = kmRuta180(); return { km: x.km, src: x.src }; } catch (e) { return { km: 0, src: '' }; } };
var _rd180 = render;
render = function () { km180Marca(); return _rd180.apply(this, arguments); };
