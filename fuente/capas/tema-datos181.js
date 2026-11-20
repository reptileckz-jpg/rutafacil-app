/* ===================== TEMA · "Mandar mi cierre de ayer" no hacía nada (20 nov · punto 181, URGENTE) =====================
   Ricardo: "sigue el error de no poder mandar el cierre cuando la ruta se queda abierta y no se mandó". Al tocar "Mandar mi cierre de
   ayer" NO PASABA NADA.
   Causa: la pantalla del cierre (o la de la ruta) TRONABA al dibujarse con datos de ayer; la red de seguridad (77) regresaba a la Ruta y,
   como el cierre seguía sin mandarse, volvía a salir "No mandaste tu cierre de ayer". Se ve como que el botón no hace nada.
   Los tres casos de la vida real que la hacían tronar:
     1) No quedó anotado el odómetro con el que salió → "Salió con … km" tronaba (c.odoIni vacío).
        Ahora en el cierre sale el campo "Odómetro con el que SALIÓ (km)" para escribirlo (y se queda mientras lo escribes).
     2) Una parada de la ruta cuyo cliente ya no existe (cliente borrado, o la venta rápida que se quitó) → tronaban el cálculo del
        tiempo de la ruta (estimar: …km) y la pantalla de la ruta (…lat).
        Ahora, antes de dibujar, esas paradas sin cliente se quitan de la ruta (las ENTREGAS y el dinero no se tocan: viven aparte).
   Solo limpia esas paradas rotas y marca el odómetro que falta; no cambia ninguna venta, cobro ni cuenta. Se arma al final.
   ============================================================================================ */
function datos181(){
  try {
    var limpia = function (L) {
      if (!Array.isArray(L)) return L;
      var ok = L.filter(function (s) { return s && s.c != null && !!cl(s.c); });
      return ok.length === L.length ? L : ok;
    };
    if (Array.isArray(S.stops)) {
      var n0 = S.stops.length, cur = S.stops[S.cur] && S.stops[S.cur].c, L = limpia(S.stops);
      if (L !== S.stops) {
        S.stops = L;
        var ni = cur != null ? L.map(function (s) { return +s.c; }).indexOf(+cur) : -1;
        S.cur = ni > -1 ? ni : Math.max(0, Math.min(S.cur || 0, L.length - 1));
        try { falloAnota77(new Error('paradas sin cliente quitadas (' + (n0 - L.length) + ')'), 'datos181'); } catch (e) {}
      }
    }
    if (S.chSt) Object.keys(S.chSt).forEach(function (id) { var o = S.chSt[id]; if (o && Array.isArray(o.stops)) { var L2 = limpia(o.stops); if (L2 !== o.stops) o.stops = L2; } });
    /* el odómetro de salida que no se anotó: el campo se queda en el cierre hasta mandarlo */
    var c = S.cierre;
    if (c && !c.sent && (c.odoIni == null || c.odoIni === '')) c.odoFalta181 = true;
    if (c && c.sent && c.odoFalta181) delete c.odoFalta181;
  } catch (e) { console.error('datos181', e); }
}
var _rd181 = render;
render = function () { datos181(); return _rd181.apply(this, arguments); };
