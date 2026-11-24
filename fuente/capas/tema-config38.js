/* ===================== TEMA · Configuración inicial: que la haga el dueño solo, con ayuda a distancia (24 nov · punto 38 de la nueva numeración) =====================
   Plan del 30 nov (fuente/PLAN-ARRANQUE-30NOV.md): el papá hace la configuración inicial solo, por pasos; Ricardo lo apoya desde Tijuana
   CON SU PROPIO USUARIO (agregar clientes, etc.). Si dos están en la configuración a la vez, la app avisa.
   Antes, todo lo de la configuración era UN dato compartido. Problemas que arregla esta capa:
   - El paso en el que va cada quien (y lo que está escribiendo) se compartía: si uno tocaba "Siguiente", al otro le cambiaba la pantalla.
     Ahora el paso, la parte y los formularios a medio llenar son de cada celular (no se suben a la nube).
   - Si los dos agregaban (clientes, personal, vehículos, proveedores) casi al mismo tiempo, la lista de uno borraba lo del otro.
     Ahora cada cosa lleva su marca (_i38) y las listas se juntan. Lo que uno quita, no regresa.
   - Aviso "👥 … también está en la configuración (paso N)" cuando hay otra persona ahí (señal cada 20 s).
   - Cada paso tiene "❓ ¿Qué hago aquí?" en palabras sencillas y "📲 Pedir ayuda por WhatsApp" (al número de quien ayuda).
   - Solo el dueño toca "Empezar" al final (quien ayuda ve que el dueño lo termina en su celular).
   No cambia ninguna cuenta. Se arma al final (antes de tema-quieto-fin.js).
   ============================================================================================ */
var C38 = { loc: ['p', 'sub75', 'vf', 'ef', 'cf', 'pf'], listas: ['veh', 'per', 'cli', 'prov'], nuevos: {}, borr: {}, cada: 20000, vivo: 90000 };
function su38Id() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function su38Marca() {
  var U = S.setup; if (!U || U.fin) return;
  C38.listas.forEach(function (k) { (U[k] || []).forEach(function (x) { if (x && typeof x === 'object' && !x._i38) { x._i38 = su38Id(); C38.nuevos[x._i38] = 1; } }); });
}
/* la nube: el paso y los formularios son de cada celular; las listas se juntan */
function su38Remoto(k) {
  try { var C = (NB.C || {})['s~setup'] || {}, s = C['e:' + nbEk(k) + '|=']; return s ? nbParse(s) : null; } catch (e) { return null; }
}
function su38Mezcla(v) {
  if (!v || typeof v !== 'object') return v;
  var L = S.setup && typeof S.setup === 'object' ? S.setup : null;
  C38.loc.forEach(function (k) { if (L && k in L) v[k] = L[k]; else if (k === 'p') v.p = num(v.p); });
  C38.listas.forEach(function (k) {
    if (!Array.isArray(v[k])) return;
    var out = v[k], ids = {}; out.forEach(function (x) { if (x && x._i38) ids[x._i38] = 1; });
    var R = su38Remoto(k) || [];
    R.forEach(function (x) { if (x && x._i38) { delete C38.nuevos[x._i38]; if (!ids[x._i38] && !C38.borr[x._i38]) { out.push(x); ids[x._i38] = 1; } } });
    ((L && L[k]) || []).forEach(function (x) { if (x && x._i38 && C38.nuevos[x._i38] && !ids[x._i38] && !C38.borr[x._i38]) { out.push(x); ids[x._i38] = 1; } });
    for (var i = out.length - 1; i >= 0; i--) if (out[i] && C38.borr[out[i]._i38]) out.splice(i, 1);
  });
  return v;
}
if (typeof nbUnidades === 'function') {
  var _nu38 = nbUnidades;
  nbUnidades = function () {
    var U = _nu38.apply(this, arguments);
    try {
      U.forEach(function (u) {
        if (u.k !== 'setup') return;
        var g0 = u.get, s0 = u.set;
        u.get = function () { var v = g0.apply(this, arguments); if (!v || typeof v !== 'object' || Array.isArray(v)) return v; var c = {}; Object.keys(v).forEach(function (k) { if (C38.loc.indexOf(k) < 0) c[k] = v[k]; }); return c; };
        u.set = function (v) { try { v = su38Mezcla(v); } catch (e) { console.error('su38', e); } return s0.call(this, v); };
      });
    } catch (e) {}
    return U;
  };
}
/* lo que uno quita no regresa */
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="suquita"]'); if (!b || !S.setup) return;
  try { var x = (S.setup[b.dataset.k] || [])[+b.dataset.i]; if (x && x._i38) { C38.borr[x._i38] = 1; delete C38.nuevos[x._i38]; } } catch (er) {}
}, true);
/* quién más está en la configuración */
function su38Abierta() { return !!(S.setup && !S.setup.fin && document.getElementById('setov')); }
function su38Yo() { try { return (NB && NB.on && NB.user && NB.user.uid) || null; } catch (e) { return null; } }
function su38Late() {
  var u = su38Yo(); if (!u || !su38Abierta()) return;
  S.setup.en38 = S.setup.en38 || {}; S.setup.en38[u] = { q: quien(), t: Date.now(), p: num(S.setup.p) };
  try { nbLuego(); } catch (e) {}
}
setInterval(function () { try { var a = su38Otros().length; su38Late(); if (su38Otros().length !== a || a) { if (su38Abierta()) render(); } } catch (e) {} }, C38.cada);
function su38Otros() {
  var u = su38Yo(), E = (S.setup && S.setup.en38) || {}, ahora = Date.now();
  return Object.keys(E).filter(function (k) { return k !== u && E[k] && ahora - num(E[k].t) < C38.vivo; }).map(function (k) { return E[k]; });
}
function su38Duenio() { try { if (typeof NB === 'undefined' || !NB.on || !NB.perfil) return true; return !!NB.perfil.duenio; } catch (e) { return true; } }
/* ayuda de cada paso, en palabras sencillas */
var AYU38 = [
  ['Escribe el nombre del negocio y tu nombre.', 'Si tienes logo, súbelo. Si no, déjalo así.', 'Si alguien te ayuda por WhatsApp, pon aquí su número.', 'Toca "Siguiente".'],
  ['Escribe lo que hay HOY en la bodega: cajas vacías, roatán y macho.', 'No tiene que ser exacto: las primeras 2 semanas los números se van corrigiendo cuando cuentes.', 'Si algo no tienes, déjalo vacío.'],
  ['Toca "Agregar un vehículo" y contesta las preguntas.', 'Repite por cada camioneta o camión.', 'Cuando estén todos, toca "Siguiente".'],
  ['Agrega a cada chofer y ayudante, con su teléfono.', 'Tiene que haber por lo menos un chofer.'],
  ['Agrega los clientes que tengas a la mano: nombre, días que los visitas, cuánto te deben y cuántas cajas vacías te deben.', 'No tienen que ser todos: los demás los agrega el chofer en la ruta, o quien te ayuda desde su celular.'],
  ['Agrega a quién le compras la fruta, y si le debes algo.'],
  ['Escribe todo el efectivo del negocio que tienes ahorita, aunque una parte esté en tu casa.', 'Luego el precio de hoy y cuánto te cuesta la caja y el kilo.'],
  ['Revisa que todo esté bien. Si algo está mal, toca "Corregir".', 'Cuando esté bien, toca "Empezar".']
];
var _su38 = setupHTML;
setupHTML = function () {
  var h = _su38.apply(this, arguments);
  try {
    if (!h || h.indexOf('id="setov"') < 0 || !S.setup || S.setup.fin) return h;
    su38Marca();
    var p = num(S.setup.p), otros = su38Otros(), tel = String((S.cfg || {}).wa37 || '').replace(/\D/g, '');
    var x = '';
    if (otros.length) x += '<div data-x="su38otros" role="status" style="margin:8px 0;padding:10px 12px;border-radius:14px;border:2px solid #2563EB;background:color-mix(in srgb,#2563EB 9%,var(--surface));font-size:15px"><b>👥 ' + otros.map(function (o) { return esc(o.q || 'Otra persona') + ' (paso ' + (num(o.p) + 1) + ')'; }).join(', ') + ' también está' + (otros.length > 1 ? 'n' : '') + ' en la configuración.</b><div style="margin-top:3px">Pueden trabajar al mismo tiempo: lo que agregue cada quien se junta. Solo no cambien la misma cosa a la vez.</div></div>';
    var A = AYU38[p] || [];
    x += '<div data-x="su38ayu" style="display:flex;gap:8px;margin:6px 0 2px"><button class="btn sec sm" style="flex:1;min-height:46px" data-act="su38ayu" aria-expanded="' + !!S.ayu38 + '">❓ ¿Qué hago aquí?</button>' + (tel ? '<button class="btn sec sm" style="flex:1;min-height:46px" data-act="su38wa">📲 Pedir ayuda</button>' : '') + '</div>'
      + (S.ayu38 && A.length ? '<div data-x="su38txt" style="padding:10px 12px;border-radius:14px;background:var(--surface);border:1px solid var(--line);font-size:16px;line-height:1.45">' + A.map(function (t, i) { return '<div>' + (i + 1) + '. ' + esc(t) + '</div>'; }).join('') + '</div>' : '');
    h = h.replace(/(<div class="wz-hd">(?:<i[^>]*><\/i>)*<\/div>)/, '$1' + x);
    if (p === 0 && h.indexOf('su38tel') < 0) {
      var c = '<div class="field" data-x="su38tel"><label for="su38tel">WhatsApp de quien te ayuda (si alguien te ayuda a distancia; si no, déjalo vacío)</label><input id="su38tel" type="tel" inputmode="tel" data-bind="cfg.wa37" value="' + esc((S.cfg || {}).wa37 || '') + '"></div>';
      h = h.replace(/(data-bind="setup\.yo"[^>]*>(?:<\/div>)?)/, function (m) { return /<\/div>$/.test(m) ? m + c : m; });
    }
    if (!su38Duenio()) h = h.replace(/<button class="btn"[^>]*data-act="sufin"[^>]*>[^<]*<\/button>/, '<div class="lbl" data-x="su38fin" style="flex:2;align-self:center;font-weight:800">El dueño toca "Empezar" en su celular cuando todo esté listo.</div>');
  } catch (e) { console.error('su38', e); }
  return h;
};
window.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="su38ayu"],[data-act="su38wa"],[data-act="sufin"]'); if (!b || !S.setup) return;
  var a = b.dataset.act;
  if (a === 'sufin') { if (!su38Duenio()) { e.preventDefault(); e.stopImmediatePropagation(); toast('El dueño toca "Empezar" en su celular'); } return; }
  e.preventDefault(); e.stopImmediatePropagation();
  if (a === 'su38ayu') { S.ayu38 = !S.ayu38; render(); return; }
  var tel = String((S.cfg || {}).wa37 || ''), P = ['Bienvenida', 'Bodega', 'Vehículos', 'Personal', 'Clientes', 'Proveedores', 'Dinero y precios', 'Listo'], p = num(S.setup.p);
  var tx = 'Hola, necesito ayuda con la configuración de la app. Voy en el paso ' + (p + 1) + ' de 8 (' + (P[p] || '') + ').';
  try { window.open('https://wa.me/52' + telDiez(tel) + '?text=' + encodeURIComponent(tx), '_blank'); } catch (er) {}
}, true);
/* la señal de "estoy aquí" sale en cuanto se abre */
var _rd38 = render;
render = function () {
  var antes = su38Abierta(), r = _rd38.apply(this, arguments);
  try { if (!antes && su38Abierta()) setTimeout(su38Late, 50); } catch (e) {}
  return r;
};
