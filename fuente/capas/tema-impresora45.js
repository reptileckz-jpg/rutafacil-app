/* ===================== TEMA · Impresora de tickets lista (26 nov · punto 45 de la nueva numeración) =====================
   Ricardo: "en la impresora de tickets dice muy pronto, ya hay que quitar eso, ya el módulo debe estar listo para añadir una".
   El módulo ya existía (APK: buscar impresoras Bluetooth emparejadas e imprimir ESC/POS, punto v6.2 / l39.js), pero en Ajustes salían
   DOS tarjetas: la vieja ("Se activa en la app final", botón deshabilitado "· muy pronto") y la buena al final. Además
   "Imprimir después de cada entrega" se guardaba y nunca se usaba.
   Ahora:
   - Una sola tarjeta "🖨️ Impresora de tickets": estado (✓ nombre / sin conectar), pasos para emparejarla, "Buscar impresoras",
     escoger, papel 58/80 mm, "Imprimir después de cada entrega", "Imprimir prueba" y "Quitar impresora".
     En la página web: dice que se conecta desde la app del celular. En la demo: se puede simular.
   - "Imprimir después de cada entrega" (Sí): al guardar la entrega se imprime el ticket solo; si luego se manda por WhatsApp, ya no
     se imprime otra vez.
   La impresora es de cada celular (S.impr no se sube a la nube). No cambia ninguna cuenta.
   ============================================================================================ */
function imp45HTML() {
  var im = S.impr || {}, nat = typeof natPl39 === 'function' && natPl39(), L = S.imprLista, real = typeof REAL !== 'undefined' && REAL;
  var est = im.mac ? '<span style="display:inline-block;margin-left:6px;padding:2px 10px;border-radius:999px;font-size:13px;font-weight:800;background:#DCFCE7;color:#166534">✓ ' + esc(im.nom || 'Conectada') + '</span>'
    : '<span style="display:inline-block;margin-left:6px;padding:2px 10px;border-radius:999px;font-size:13px;font-weight:700;background:#F1F5F9;color:#475569">Sin conectar</span>';
  var h = '<div class="card" data-k="imp45"><b>🖨️ Impresora de tickets</b>' + est
    + '<div class="lbl" style="margin-top:6px">Imprime el mismo ticket que se manda por WhatsApp, en una impresora térmica por Bluetooth.</div>';
  if (nat) {
    h += '<ol style="margin:8px 0 0 18px;padding:0;font-size:15px;line-height:1.5"><li>Prende la impresora.</li><li>En el <b>Bluetooth del celular</b>, emparéjala (la clave casi siempre es <b>0000</b> o <b>1234</b>).</li><li>Aquí toca <b>"Buscar impresoras"</b> y escógela.</li></ol>'
      + '<button class="btn sec" style="margin-top:10px;min-height:50px" data-act="imprbusca">🔎 Buscar impresoras</button>'
      + (L && L.length ? L.map(function (d) { return '<button class="btn sm' + (im.mac === d.mac ? '' : ' sec') + '" style="margin-top:6px;min-height:46px" data-act="imprpon" data-mac="' + esc(d.mac) + '" data-nom="' + esc(d.nombre || '') + '">' + (im.mac === d.mac ? '✓ ' : '') + esc(d.nombre || d.mac) + '</button>'; }).join('')
        : (L ? '<div class="lbl" style="margin-top:6px">No hay aparatos emparejados: primero emparéjala en el Bluetooth del celular.</div>' : ''));
  } else if (real) {
    h += '<div class="lbl" style="margin-top:8px"><b>La impresora se conecta desde la app del celular</b> (no desde la página web).</div>';
  } else {
    h += '<button class="btn sm ' + (imprOk() ? '' : 'sec') + '" style="margin-top:8px" data-act="imprdemo">' + (imprOk() ? '✓ Impresora de prueba conectada' : 'Simular impresora conectada (demo)') + '</button>';
  }
  if (nat || !real) {
    h += '<div class="field"><span>Papel</span><span class="chips" style="width:150px"><button data-act="ajpapel" data-v="58" aria-pressed="' + ((im.papel || '58') === '58') + '">58 mm</button><button data-act="ajpapel" data-v="80" aria-pressed="' + (im.papel === '80') + '">80 mm</button></span></div>'
      + '<div class="field"><span>Imprimir después de cada entrega</span><span class="chips" style="width:150px"><button data-act="ajimpa" data-v="0" aria-pressed="' + (!im.auto) + '">No</button><button data-act="ajimpa" data-v="1" aria-pressed="' + (!!im.auto) + '">Sí</button></span></div>';
    if (nat && im.mac) h += '<button class="btn sm sec" style="margin-top:8px;min-height:46px" data-act="imprprueba">Imprimir prueba</button><button class="link" style="margin-top:6px;min-height:44px" data-act="imprquita">Quitar impresora</button>';
  }
  return h + '</div>';
}
var _ajImp45 = ajHTML;
ajHTML = function () {
  var h = _ajImp45.apply(this, arguments);
  try {
    if (!h) return h;
    /* la tarjeta vieja ("Se activa en la app final" / "muy pronto") → la nueva; y fuera la tarjeta repetida del final */
    h = h.replace(/<details class="card" data-k="ajimpr"[\s\S]*?<\/details>/, '');
    h = h.replace(/<div class="card"><b>Impresora de tickets<\/b> <span class="pill wait">Se activa en la app final<\/span>[\s\S]*?Imprimir prueba<\/button><\/div>/g, function () { return imp45HTML(); });
    /* el chofer también: él es quien imprime en la ruta (la impresora es de cada celular) */
    if (h.indexOf('data-k="imp45"') < 0 && h.indexOf('id="ajov"') > -1) {
      var x = imp45HTML(), j = h.indexOf('<div class="card" data-k="aj171"');
      if (j < 0) j = h.lastIndexOf('</div></div>');
      h = j < 0 ? h + x : h.slice(0, j) + x + h.slice(j);
    }
  } catch (e) { console.error('imp45', e); }
  return h;
};
/* imprimir solo al guardar la entrega (si está en "Sí"), y no otra vez al mandar el WhatsApp */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="guardar"]'); if (!b || S.role !== 'rep') return;
  var im = S.impr || {}; if (!im.auto || !imprOk()) return; var n0 = S.log.length;
  setTimeout(function () {
    try { if (S.log.length > n0 && S.nota && !S.nota.prOk) { tkImprimir(S.nota); S.nota.prAuto45 = 1; toast('Ticket impreso'); render(); } } catch (er) {}
  }, 120);
}, true);
var _tkImp45 = tkImprimir;
tkImprimir = function (n) {
  if (n && n.prAuto45) return; /* ya salió solo al guardar: el WhatsApp no lo vuelve a imprimir */
  return _tkImp45.apply(this, arguments);
};
/* "Imprimir" a propósito (otra copia) sí imprime aunque ya haya salido solo */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="tkprint"]'); if (b && S.nota) S.nota.prAuto45 = 0;
}, true);
