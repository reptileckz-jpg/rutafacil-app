/* ===================== TEMA · El aviso "Solo traes 0 cajas" se quita en cuanto cargas más (21 nov · punto 14 de la nueva numeración) =====================
   Ricardo: "no tenía cajas en el camión, fui a la bodega a cargar más y ahora en cada entrega me sigue saliendo que tengo 0; sí me deja
   continuar, pero dice que no tengo cajas; tarda unos dos minutos y ya desaparece".
   Causa: al pedir en una entrega más de lo que trae, la app guarda el aviso "Solo traes 0 cajas" (S.falta) CON EL NÚMERO DE ESE MOMENTO y lo
   vuelve a enseñar en cada redibujo hasta que pasa su tiempo (faltaAplica: 60 s desde la última vez). Nadie lo quitaba cuando el problema ya
   se había resuelto: después de cargar 12 cajas seguía diciendo "Solo traes 0 cajas" en esa entrega y en las siguientes.
   Las cajas SÍ estaban bien (S.inv.reparto = 12, comprobado); solo era el aviso viejo.
   Ahora: antes de cada redibujo, si el aviso es de "Solo traes …" y lo que pide la entrega ya alcanza con lo que trae (o ya no está en una
   entrega), el aviso se quita; si todavía no alcanza, se vuelve a armar con el número de AHORA.
   Solo cambia el aviso; no cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
function falta14Revisa() {
  var f = S.falta; if (!f || !/^(Falta: )?Solo traes/.test(String(f.msg || ''))) return;
  var d = S.d, enEnt = S.role === 'rep' && S.tab && S.tab.rep === 'entrega' && d;
  var falta = enEnt && (num(d.R) > num(S.inv.reparto) || num(d.M) > num(S.inv.repartoKg));
  if (!falta) { faltaQuita(); return; }
  /* sigue sin alcanzar: el número que dice debe ser el de ahora */
  var msg = num(d.R) > num(S.inv.reparto) ? 'Solo traes ' + S.inv.reparto + ' cajas' : 'Solo traes ' + S.inv.repartoKg + ' kg de macho';
  if (String(f.msg).replace(/^Falta: /, '').indexOf(msg) !== 0) { faltaQuita(); }
}
var _rd14 = render;
render = function () { try { falta14Revisa(); } catch (e) {} return _rd14.apply(this, arguments); };
