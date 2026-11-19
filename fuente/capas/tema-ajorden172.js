/* ===================== TEMA · Ajustes en orden (19 nov · punto 172) =====================
   Ricardo: "los ajustes están todos desordenados, no hay un orden o lógica; mi nombre (derechos de la app) sale en medio de los ajustes y
   abajo de eso hay más ajustes".
   Cada mejora fue agregando su tarjeta al final, así que "Acerca de" quedó en medio. Aquí, ya armada la pantalla, se acomodan las
   MISMAS tarjetas (no se crea ni se quita ninguna; botones y campos son los mismos) en grupos con su título:
     Este celular · Tu negocio · Ventas y cobranza · Fruta y bodega · Choferes y vehículos · Respaldo y datos · (Otros) · Acerca de (al final).
   Una tarjeta nueva que no esté en la lista cae en "Otros ajustes", antes de "Acerca de".
   Solo orden; no cambia ningún dato. Se arma al final.
   ============================================================================================ */
var AJ172_GRUPOS = [
  ['cel', 'Este celular'],
  ['neg', 'Tu negocio'],
  ['ven', 'Ventas y cobranza'],
  ['fru', 'Fruta y bodega'],
  ['cho', 'Choferes y vehículos'],
  ['dat', 'Respaldo y datos'],
  ['otr', 'Otros ajustes'],
  ['ace', 'Acerca de']
];
/* por data-k */
var AJ172_K = {
  aj171: 'cel', push132: 'cel',
  ajneg: 'neg', logocard: 'neg', ajtarj: 'neg', aj76fac: 'neg', ajqr: 'neg',
  ajcredd: 'ven', ajcob: 'ven', ajef: 'ven', ajped82: 'ven', aj74rep: 'ven', ajextra: 'ven',
  ajmind: 'fru', ajfru: 'fru', aj72tar: 'fru',
  inspcfg: 'cho', mantcfg: 'cho', verifcfg: 'cho', aj139: 'cho', ajgps: 'cho', aj153: 'cho', qcfg: 'cho', pr56: 'cho',
  ajresp: 'dat'
};
/* por cómo empieza el texto (las tarjetas sin data-k) */
var AJ172_TX = [
  [/^Pantalla/, 'cel'], [/^Al tocar/, 'cel'], [/^Ayuda/, 'cel'], [/^Impresora/, 'cel'], [/^🔔/, 'cel'], [/^🔋/, 'cel'], [/^(Entrar con|Huella|Biom)/i, 'cel'],
  [/^Logo/, 'neg'], [/^Ubicación de la bodega/, 'neg'],
  [/^Respaldo/, 'dat'], [/^Fotos diarias/, 'dat'],
  [/^Plátanos Nietos[\s\S]*(Desarrollada|derechos)/, 'ace']
];
var AJ172_TITULOS = /^(Tu negocio|Vehículos y quejas|Acerca de|Configuración|Este celular|Ventas y cobranza|Fruta y bodega|Choferes y vehículos|Respaldo y datos|Otros ajustes)$/;
function aj172Grupo(x) {
  var k = x.getAttribute && (x.getAttribute('data-k') || '');
  if (!k && x.classList && x.classList.contains('logocard')) k = 'logocard';
  if (k && AJ172_K[k]) return AJ172_K[k];
  var t = (x.textContent || '').replace(/\s+/g, ' ').trim();
  for (var i = 0; i < AJ172_TX.length; i++) if (AJ172_TX[i][0].test(t)) return AJ172_TX[i][1];
  return 'otr';
}
/* se acomoda ya dibujada (el Logo y la Ayuda los mete otro código DESPUÉS de armar la pantalla); el campo donde estabas escribiendo
   conserva el foco y el cursor */
function ajOrden172() {
  var ov = document.getElementById('ajov'), c = ov && ov.firstElementChild;
  if (!c || c.children.length < 3) return;
  var ae = document.activeElement, sel = null;
  try { if (ae && c.contains(ae) && ae.setSelectionRange) sel = [ae.selectionStart, ae.selectionEnd]; } catch (e) {}
  var K = Array.prototype.slice.call(c.children), cab = K.shift(), G = {};
  K.forEach(function (x) {
    var tx = (x.textContent || '').replace(/\s+/g, ' ').trim();
    if (x.classList.contains('aj172h') || (x.classList.contains('lbl') && AJ172_TITULOS.test(tx))) { x.parentNode.removeChild(x); return; }   /* los títulos de antes */
    var g = aj172Grupo(x);
    (G[g] = G[g] || []).push(x);
  });
  var fr = document.createDocumentFragment();
  AJ172_GRUPOS.forEach(function (gr) {
    var L = G[gr[0]]; if (!L || !L.length) return;
    var hd = document.createElement('div');
    hd.className = 'lbl aj172h'; hd.setAttribute('data-g172', gr[0]); hd.style.cssText = 'margin:8px 2px -4px';
    hd.innerHTML = '<b>' + gr[1] + '</b>';
    fr.appendChild(hd);
    L.forEach(function (x) { fr.appendChild(x); });
  });
  c.appendChild(fr);
  try { if (ae && c.contains(ae) && document.activeElement !== ae) { ae.focus({ preventScroll: true }); if (sel) ae.setSelectionRange(sel[0], sel[1]); } } catch (e) {}
}
/* se llama desde render (en tema-dibujar1.js, antes de "morph") */
