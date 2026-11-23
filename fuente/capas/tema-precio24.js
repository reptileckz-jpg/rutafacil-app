/* ===================== TEMA · Precio de hoy: pantalla grande al abrir y tarjeta que destella (23 nov · punto 24 de la nueva numeración) =====================
   Ricardo: "antes al abrir la app el administrador por primera vez se abría una pantalla grande que le pedía fijar el precio de hoy;
   ahora solo lo hace en la tarjeta y la tarjeta no tiene animaciones … que brinque o destelle, por si omite el precio de hoy".
   Causa: el aviso grande salía dentro de la ventanita "¿Qué sigue?" junto con otros avisos y, después de las 12 sin movimiento, se quitaba;
   la tarjeta tenía un contorno rojo muy leve.
   Ahora, mientras el precio de hoy no esté fijado (administrador):
     - La primera vez del día que abre la app (en ese celular) sale una pantalla grande "💲 Fija el precio de hoy" con el precio de ayer y
       "Cambiar el precio" / "Está bien, el de ayer" / "Después". Sale a cualquier hora.
     - En Inicio la tarjeta "Precio de hoy" sube hasta arriba, en rojo, con un destello que late (solo transform/opacity, GPU) y da un
       brinquito al entrar a Inicio. Al fijarlo, vuelve a su lugar y se calma.
   No cambia ninguna cuenta (los botones son los mismos de siempre). Se arma al final.
   ============================================================================================ */
var PR24 = { k: 'pr24' };
function pr24Falta() { try { return S.role === 'admin' && !S.encOn && S.precio && num(S.precio.R) > 0 && S.precio.conf !== iso(TODAY); } catch (e) { return false; } }
function pr24Visto() { try { return localStorage.getItem(PR24.k) === iso(TODAY); } catch (e) { return PR24.v === iso(TODAY); } }
function pr24Marca() { PR24.v = iso(TODAY); try { localStorage.setItem(PR24.k, iso(TODAY)); } catch (e) {} }
(function () {
  var st = document.createElement('style'); st.id = 'pr24css';
  st.textContent = [
    '[data-x="precio65"].pr24{position:relative;border:3px solid #DC2626!important;background:color-mix(in srgb,#DC2626 7%,var(--surface))!important;animation:none!important;overflow:visible}',
    '[data-x="precio65"].pr24::after{content:"";position:absolute;inset:-3px;border-radius:inherit;border:3px solid #DC2626;pointer-events:none;will-change:transform,opacity;animation:pr24ring 1.6s ease-out infinite}',
    '[data-x="precio65"].pr24.pr24b{animation:pr24brinco .9s ease-in-out 2!important}',
    '@keyframes pr24ring{0%{transform:scale(1);opacity:.85}100%{transform:scale(1.06);opacity:0}}',
    '@keyframes pr24brinco{0%,100%{transform:translateY(0)}25%{transform:translateY(-8px)}50%{transform:translateY(0)}70%{transform:translateY(-4px)}}',
    '#pr24ov{position:fixed;inset:0;z-index:75;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px}',
    '#pr24ov .w{background:var(--surface);border-radius:22px;padding:20px;max-width:440px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.3)}',
    '#pr24ov .pp{display:flex;gap:10px;margin:12px 0}#pr24ov .pp>div{flex:1;border:1px solid var(--line);border-radius:14px;padding:10px 12px}#pr24ov .pp b{display:block;font-size:26px}',
    '#pr24ov .btn{width:100%;min-height:56px;margin-top:8px;font-size:18px}'
  ].join('');
  document.head.appendChild(st);
})();
function pr24Pantalla() {
  var ov = document.getElementById('pr24ov');
  var ver = !(window.__pnTest && !window.__pr24Test) && pr24Falta() && !pr24Visto() && S.tab.admin === 'inicio' && !S.menu && !(S.vac || {})[S.adminYo] && !(typeof _pin !== 'undefined' && _pin && _pin.modo) && !(S.setup && !S.setup.fin) && !document.getElementById('bienv') && !S.modal;
  if (!ver) { if (ov) ov.remove(); return; }
  if (ov) return;
  var P = S.precio || {};
  ov = document.createElement('div'); ov.id = 'pr24ov'; ov.className = 'fadein';
  ov.innerHTML = '<div class="w popin" role="dialog" aria-label="Precio de hoy"><div style="font-size:24px;font-weight:900">💲 Fija el precio de hoy</div>'
    + '<div class="lbl" style="font-size:15px;margin-top:4px">Todavía no lo fijas. Mientras, los choferes cobran con el de ayer:</div>'
    + '<div class="pp"><div><span class="lbl">Caja de roatán</span><b>' + money(num(P.R)) + '</b></div><div><span class="lbl">Kilo de macho</span><b>' + money(num(P.M)) + '</b></div></div>'
    + '<button class="btn" data-act="pr24cam">Cambiar el precio</button><button class="btn sec" data-act="pr24ayer">Está bien, el de ayer</button>'
    + '<button class="link" style="width:100%;min-height:48px;margin-top:6px" data-act="pr24x">Después</button></div>';
  document.body.appendChild(ov);
}
function pr24Tarjeta() {
  var c = document.querySelector('main [data-x="precio65"]'); if (!c) return;
  if (S.role !== 'admin' || S.tab.admin !== 'inicio' || !pr24Falta()) { c.classList.remove('pr24', 'pr24b'); return; }
  if (!c.classList.contains('pr24')) c.classList.add('pr24');
  var m = c.parentElement, primero = m && m.querySelector(':scope > .card, :scope > [data-x]');
  if (m && primero && primero !== c) m.insertBefore(c, primero);
  if (PR24.vista !== 'inicio') { c.classList.remove('pr24b'); void c.offsetWidth; c.classList.add('pr24b'); setTimeout(function () { c.classList.remove('pr24b'); }, 1900); }
}
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="pr24cam"],[data-act="pr24ayer"],[data-act="pr24x"]'); if (!b) return;
  e.preventDefault(); e.stopImmediatePropagation(); pr24Marca();
  var ov = document.getElementById('pr24ov'); if (ov) ov.remove();
  var a = b.dataset.act;
  if (a === 'pr24ayer') { var y = document.createElement('button'); y.dataset.act = 'precioayer'; y.style.display = 'none'; document.body.appendChild(y); y.click(); y.remove(); return; }
  if (a === 'pr24cam') { render(); var ed = document.querySelector('main [data-x="precio65"] [data-act="precioed"]'); if (ed) ed.click(); else { var c = document.querySelector('main [data-x="precio65"]'); if (c) c.scrollIntoView({ block: 'center' }); } return; }
  render();
}, true);
/* el aviso "Precio de hoy" de la ventanita "¿Qué sigue?" lo hace ahora la pantalla grande */
var _pI24 = popItems;
popItems = function () { var L = _pI24.apply(this, arguments); try { L = L.filter(function (x) { return !(x && x.t === 'Precio de hoy'); }); } catch (e) {} return L; };
var _rd24 = render;
render = function () {
  var r = _rd24.apply(this, arguments);
  try { pr24Tarjeta(); pr24Pantalla(); } catch (e) { console.error('pr24', e); }
  try { PR24.vista = S.role === 'admin' ? S.tab.admin : ''; } catch (e) {}
  return r;
};
/* 24b · al tocar "Ir" en un aviso urgente que lleva a otra pantalla (p. ej. "Mensualidad por vencer" → Vehículos), el tutorial que esperaba
   a que se terminaran los urgentes arrancaba en ese momento y regresaba a Inicio. Ahora sigue esperando mientras queden urgentes por ver. */
var _pal24 = pnArranqueListo;
pnArranqueListo = function () {
  if (!_pal24.apply(this, arguments)) return false;
  try {
    if (typeof _popPausa !== 'undefined' && _popPausa && (S.popVisto || {})[S.role] !== iso(TODAY) && (S.popI || 0) < popItems().length) return false;
  } catch (e) {}
  return true;
};
