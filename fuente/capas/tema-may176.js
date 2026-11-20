/* ===================== TEMA · Mayoreo del macho aparte (20 nov · punto 176) =====================
   Ricardo: "cuando a un cliente le dejas más de 10 cajas de roatán te sale si le quieres dar precio de mayoreo; y si le das mayoreo,
   en automático también le da mayoreo del macho. Ese debe ser aparte".
   - El mayoreo por más de 10 cajas es del ROATÁN. El macho ya no se va solo a mayoreo (cambio en entregaCalc: `myaM`).
   - Si el roatán va a mayoreo y el cliente también lleva macho, sale aparte "¿Y el macho?" con "Normal" ya marcado; el chofer escoge.
     Si el roatán regresa a precio normal (o el administrador no da permiso), el macho también.
   - Los clientes que TÚ marcaste como de mayoreo siguen con mayoreo en los dos (eso lo decidiste tú). El mayoreo "a mano" (escribir
     el precio) ya tenía los dos precios separados.
   Solo cambia el precio del macho en ese caso; lo demás de la entrega sigue igual. Se arma al final.
   ============================================================================================ */
function may176Roatan(c, d) { try { return !!(c && d && !d.may && S.mayP && !c.mayoreo && d.R > 10 && mayAutoOk(c, d)); } catch (e) { return false; } }
function may176HTML(c, d) {
  if (!c || !d || !may176Roatan(c, d) || !(num(d.M) > 0)) return '';
  var nM = num(c.ppM) || num(S.precio.M), mM = num(S.mayP.M), si = d.mayQM === 'may';
  return '<div class="may176" style="border-top:1px solid var(--line);margin-top:8px;padding-top:8px"><b>¿Y el macho? (va aparte)</b>'
    + '<div class="lbl">El roatán va a mayoreo. El macho escógelo por separado.</div>'
    + '<div class="chips" role="group" aria-label="Macho: mayoreo o normal" style="margin:6px 0">'
    + '<button data-act="mayqm" data-v="norm" aria-pressed="' + !si + '">Normal · ' + f2(nM) + ' el kg (' + money(num(d.M) * nM) + ')</button>'
    + '<button data-act="mayqm" data-v="may" aria-pressed="' + si + '">Mayoreo · ' + f2(mM) + ' el kg (' + money(num(d.M) * mM) + ')</button></div></div>';
}
var _mq176 = mayQHTML;
mayQHTML = function (c, d) {
  var h = _mq176.apply(this, arguments);
  try { return h + may176HTML(c, d); } catch (e) { return h; }
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="mayqm"]'); if (!b || !S.d) return;
  e.stopImmediatePropagation();
  S.d.mayQM = b.dataset.v === 'may' ? 'may' : 'norm';
  render();
}, true);
