/* ===================== TEMA · Pendientes de cada sección a la vista (23 nov · punto 27 de la nueva numeración) =====================
   Ricardo: "tengo 5 pendientes en empleados, le doy click y no me lleva a ningún lado; entro al apartado de empleados y tampoco me dice de qué
   son los pendientes … sí lo hizo, pero hasta que el tutorial me lo indicó" (versión web).
   Causa: los pendientes de cada sección salen arriba en una barrita CERRADA ("🔔 5 pendientes en Personal · ver ›") que casi no se nota.
   Ahora, al entrar a una sección (barra de abajo, "Más" o "Ir") que tiene pendientes, la lista se abre sola y destella una vez
   (solo opacity/transform, GPU); se puede cerrar con "cerrar ▲" y no se vuelve a abrir sola hasta que entres otra vez.
   No cambia ninguna cuenta. Se arma al final.
   ============================================================================================ */
(function () {
  var st = document.createElement('style');
  st.textContent = '@keyframes pnd27{0%{opacity:.35;transform:scale(.985)}40%{opacity:1;transform:scale(1.01)}100%{opacity:1;transform:scale(1)}}'
    + '.pnd86.pnd27{animation:pnd27 .7s ease-out 2;will-change:transform,opacity}';
  document.head.appendChild(st);
})();
var PND27 = { t: null };
var _rd27 = render;
render = function () {
  var antes = PND27.t;
  try {
    var t = S.role === 'admin' && !S.encOn ? S.tab.admin : null;
    if (t && t !== 'inicio' && t !== 'mas' && t !== antes) {
      var n = 0; try { n = pend86(t).length; } catch (e) {}
      if (n) { S.pnd92 = t; PND27.flash = t; }
    }
    PND27.t = t;
  } catch (e) {}
  var r = _rd27.apply(this, arguments);
  try {
    if (PND27.flash && PND27.flash === S.tab.admin) {
      var c = document.querySelector('main [data-x="pnd86"]');
      if (c) { c.classList.remove('pnd27'); void c.offsetWidth; c.classList.add('pnd27'); PND27.flash = null; setTimeout(function () { c.classList.remove('pnd27'); }, 1500); }
    }
  } catch (e) {}
  return r;
};
