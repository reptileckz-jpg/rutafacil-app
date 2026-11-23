/* ===================== TEMA · Fotos de los cierres pasados completas (23 nov · punto 26 de la nueva numeración) =====================
   Ricardo: "como administrador al ver cierres pasados no se mira la foto del tanque de gasolina, tampoco las fotos del cierre y de lo que
   regresó o cargó; las de los 4 lados y odómetro sí se miran".
   Causa: el historial de cada cierre (fotos121) guardaba solo las fotos del vehículo (4 lados, odómetro, gasolina si se tomó) y los tickets.
   Ahora también guarda y enseña en "📷 Fotos del cierre":
     - "Lo que regresó" (la foto de lo que regresa al cerrar, cierre.fotoReg);
     - "Cargó en ruta" (cada "Cargar más" con su foto; desde hoy cada carga queda marcada con su chofer y día).
     - Si el chofer no tomó la del tablero de gasolina, sale "Gasolina · no la tomó" (para que se note que falta y no que no carga).
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
var _fr26 = fotosRuta121;
fotosRuta121 = function (r) {
  var o = _fr26.apply(this, arguments);
  try {
    o.otras = [];
    var c = r && r.cierre, f = fotoRef121(c && c.fotoReg); if (f) o.otras.push({ t: 'Lo que regresó', f: f });
    if (r === S) {
      var dia = S.rutaDia80 || iso(TODAY);
      (S.extras || []).forEach(function (x) { if (!x || !x.foto || +x.ch !== +S.chofHoy || x.f !== dia) return; var g = fotoRef121(x.foto); if (g) o.otras.push({ t: 'Cargó en ruta' + (x.h ? ' ' + x.h : '') + ' · ' + num(x.R) + ' cajas' + (num(x.M) ? ' ' + num(x.M) + ' kg' : ''), f: g }); });
    }
  } catch (e) {}
  return o;
};
var _fh26 = fotosHTML121;
fotosHTML121 = function (F) {
  var h = _fh26.apply(this, arguments);
  try {
    if (!F) return h;
    var tile = function (ref, l) { var s = fotoSrc121(ref); return '<button data-act="foto121" data-ref="' + esc(ref) + '" data-l="' + esc(l) + '" style="padding:0;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--bg);width:31%;min-height:70px;display:flex;flex-direction:column;align-items:stretch">' + (s ? '<img src="' + s + '" alt="' + esc(l) + '" style="width:100%;height:64px;object-fit:cover;display:block">' : '<span class="lbl" style="height:64px;display:flex;align-items:center;justify-content:center">cargando…</span>') + '<span style="font-size:12px;padding:3px 6px;text-align:left">' + esc(l) + '</span></button>'; };
    var x = '';
    if ((F.otras || []).length) x += '<div class="lbl" style="margin-top:6px"><b>Carga y regreso</b></div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">' + F.otras.map(function (o) { return tile(o.f, o.t); }).join('') + '</div>';
    if (Object.keys(F.fin || {}).length && !(F.fin || {}).gas) x += '<div class="lbl" style="margin-top:6px">⛽ Gasolina al llegar · no la tomó</div>';
    if (!x) return h;
    if (/Sin fotos\.<\/div>$/.test(h) && !Object.keys(F.ini || {}).length && !Object.keys(F.fin || {}).length && !(F.tk || []).length) return x;
    return h + x;
  } catch (e) { return h; }
};
/* cada carga en ruta queda con su chofer y día (para saber de quién es la foto) */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="cxsave"]'); if (!b || S.role !== 'rep') return;
  var n0 = (S.extras || []).length;
  setTimeout(function () { try { var L = S.extras || []; if (L.length > n0) { var x = L[L.length - 1]; x.ch = +S.chofHoy; x.f = S.rutaDia80 || iso(TODAY); } } catch (er) {} }, 0);
}, true);
