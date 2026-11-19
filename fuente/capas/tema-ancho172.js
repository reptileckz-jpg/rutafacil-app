/* ===================== TEMA · Pantalla ancha sin huecos (19 nov · punto 172) =====================
   Ricardo (web en el celular acostado y Fold abierto): "quedan espacios vacíos; hay que llenarlos o ampliar la información" (Más, Clientes,
   Rutas con el mapa).
   La pantalla ancha (600 px o más) acomoda las tarjetas en columnas tipo periódico. Una tarjeta muy larga (el mosaico de Más, la lista
   de clientes, el mapa) no se parte: se quedaba en una columna y la otra vacía.
   - Después de dibujar se MIDE cómo quedaron las columnas: si una quedó mucho más corta (más de 200 px), la tarjeta más alta de la
     columna larga pasa a ocupar todo el ancho (hasta 3 veces). Lo de antes y lo de después se vuelve a repartir en columnas.
   - Un mapa/dibujo que crece con el ancho (SVG o Leaflet) dentro de una tarjeta a todo lo ancho: alto máximo 55 % de la pantalla (480 px).
   - Más: el mosaico pone las tarjetas que quepan a lo ancho (de ~210 px).
   - La lista de clientes (164) ya se acomoda en cuadrícula desde 600 px (antes desde 900).
   Solo acomoda; no cambia ningún dato. En el celular normal (una columna) no hace nada. Se arma al final.
   ============================================================================================ */
(function () {
  if (document.getElementById('css172')) return;
  var st = document.createElement('style'); st.id = 'css172';
  st.textContent = [
    '@media (min-width:600px){',
    ' html:not(.as-phone):not(.onecol) main>.span172{column-span:all}',
    /* un mapa o dibujo que crece con el ancho: a todo lo ancho no debe quedar altísimo */
    ' html:not(.as-phone):not(.onecol) main>.span172 svg:not(.nav-svg),html:not(.as-phone):not(.onecol) main>.span172 .leaflet-container{max-height:min(55vh,480px)}',
    ' html:not(.as-phone):not(.onecol) .mas166 .mas92.bento-grid-container{grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}',
    '}'
  ].join('\n');
  document.head.appendChild(st);
})();
function ancho172() {
  try {
    if (window.innerWidth < 600) return;
    var h = document.documentElement;
    if (h.classList.contains('as-phone') || h.classList.contains('onecol')) return;
    var m = document.querySelector('main'); if (!m) return;
    if ((parseInt(getComputedStyle(m).columnCount, 10) || 1) < 2) return;
    for (var vuelta = 0; vuelta < 3; vuelta++) {
      /* las columnas de cada tramo (entre tarjetas que van a todo lo ancho) */
      var tramos = [[]];
      Array.prototype.forEach.call(m.children, function (c) {
        var cs = getComputedStyle(c);
        if (cs.display === 'none' || cs.position === 'fixed' || cs.position === 'absolute') return;
        if (cs.columnSpan === 'all') { tramos.push([]); return; }
        tramos[tramos.length - 1].push(c);
      });
      var cambio = false;
      tramos.forEach(function (T) {
        if (T.length < 1 || cambio) return;
        var col = {};
        T.forEach(function (c) {
          var r = c.getBoundingClientRect(); if (!r.height) return;
          var k = Math.round(r.left / 40);
          if (!col[k]) col[k] = { top: r.top, bot: r.bottom, els: [] };
          col[k].top = Math.min(col[k].top, r.top); col[k].bot = Math.max(col[k].bot, r.bottom); col[k].els.push(c);
        });
        var C = Object.keys(col).map(function (k) { return col[k]; });
        var nCols = parseInt(getComputedStyle(m).columnCount, 10) || 2;
        var alto = function (x) { return x.bot - x.top; };
        var largo = C.slice().sort(function (a, b) { return alto(b) - alto(a); })[0];
        if (!largo) return;
        var corto = C.length < nCols ? 0 : Math.min.apply(null, C.map(alto));
        if (alto(largo) - corto <= 200) return;
        /* la más alta de la columna larga va a todo lo ancho */
        var g = largo.els.slice().sort(function (a, b) { return b.getBoundingClientRect().height - a.getBoundingClientRect().height; })[0];
        if (g && !g.classList.contains('span172')) { g.classList.add('span172'); cambio = true; }
      });
      if (!cambio) break;
    }
  } catch (e) { console.error('ancho172', e); }
}
var _rd172 = render;
render = function () { var r = _rd172.apply(this, arguments); ancho172(); return r; };
