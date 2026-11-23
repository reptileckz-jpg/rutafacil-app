/* ===================== TEMA · El PIN también con el teclado (23 nov · punto 29 de la nueva numeración) =====================
   Ricardo (versión web): "al escribir el PIN solo se puede hacer con el mouse, no con el teclado directamente".
   Ahora, con la pantalla del PIN abierta: los números (arriba o del teclado numérico) escriben, ⌫ (Retroceso/Supr) borra y Esc cancela
   (cuando hay "Cancelar"). Es lo mismo que tocar los botones. No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
document.addEventListener('keydown', function (e) {
  var ov = document.getElementById('pinov'); if (!ov || e.ctrlKey || e.metaKey || e.altKey) return;
  var t = e.target; if (t && t !== document.body && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !ov.contains(t)) return;
  var sel = null;
  if (/^[0-9]$/.test(e.key)) sel = '[data-act="pind"][data-v="' + e.key + '"]';
  else if (e.key === 'Backspace' || e.key === 'Delete') sel = '[data-act="pinb"]';
  else if (e.key === 'Escape') sel = '[data-act="pinx"]';
  if (!sel) return;
  var b = ov.querySelector(sel); if (!b) return;
  e.preventDefault(); e.stopPropagation(); b.click();
}, true);
/* el bloqueo de toques mientras está el PIN (l58, pnBloqueada) también se comía las teclas: el teclado sí pasa cuando está el PIN */
try {
  var _pnB29 = pnBloqueada;
  pnBloqueada = function () { try { var ev = window.event; if (ev && ev.type === 'keydown' && document.getElementById('pinov')) return false; } catch (e) {} return _pnB29.apply(this, arguments); };
} catch (e) {}
