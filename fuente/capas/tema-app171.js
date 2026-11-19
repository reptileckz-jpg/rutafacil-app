/* ===================== TEMA · Chofer con barra flotante, modo Ahorro, íconos 3D en toda la app, aviso de costo raro (19 nov · punto 171) =====================
   Ricardo: "sí, también para el chofer, haz lo que sugieres, arma y publica".
   1) Barra flotante del CHOFER (y de venta local): la misma de la 165 (cápsula verde que se desliza con transform, íconos duotone con su
      micro-animación, vidrio, puntos de pendientes). Se arma con los MISMOS botones que ya tiene su barra (Ruta, Entrega, Gasto, Viaje,
      Cierre… o Vender/Corte), en el mismo orden; al tocar uno se toca el de antes (que queda escondido), así abre exactamente lo mismo.
      "Gasto" abre su ventana y la cápsula se queda donde estaba. Si el chofer aún no sale (su barra está vacía), no hay barra.
      Se crea una vez y solo se vuelve a armar si cambian los botones.
   2) Celular sencillo (≤ 4 núcleos o ≤ 3 GB): sin vidrio (backdrop-filter, lo más pesado); todo lo demás igual.
      Modo Ahorro (Ajustes → "🔋 Modo ahorro", de ESTE celular): además, sin animaciones ni transiciones.
   3) Íconos 3D en toda la app (antes solo Inicio): el emoji SE QUEDA en el texto, escondido a la vista (lo siguen leyendo el lector de
      pantalla, las búsquedas y comparaciones), y el ícono 3D se pone al lado solo como dibujo. Quietos (sin flotar) fuera de Inicio.
   4) 142 · Carga con costo raro: si el precio por kilo de roatán o macho es 40 % mayor o menor que el promedio de las últimas 5
      cargas, pregunta antes de guardar (mismo aviso de la 150: Aceptar = está bien así · Cancelar = lo corrijo).
   Solo apariencia/navegación y un aviso; no cambia ningún dato. Se arma al final.
   ============================================================================================ */

/* ---------- 1) barra del chofer ---------- */
var CH171_SVG = {
  gasto: '<svg class="nav-svg anim-rcpt171" viewBox="0 0 24 24"><path class="duotone-fill" d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z"/><path class="stroke-main" d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z"/><path class="stroke-main rc171" d="M13.8 8.2c-.4-.6-1.1-.9-1.9-.9-1.1 0-1.9.6-1.9 1.4 0 1.9 3.9 1 3.9 3 0 .8-.9 1.5-2 1.5-.9 0-1.6-.4-2-1M12 6.3v1M12 13.2v1"/></svg>',
  cierre: '<svg class="nav-svg anim-clip171" viewBox="0 0 24 24"><rect class="duotone-fill" x="5" y="4.5" width="14" height="16" rx="2.2"/><rect class="stroke-main" x="5" y="4.5" width="14" height="16" rx="2.2"/><path class="stroke-main" d="M9 4.5V3.6c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v.9"/><path class="stroke-main chk171" d="M8.8 12.8l2.2 2.2 4.2-4.6"/></svg>',
  local: '<svg class="nav-svg anim-bag171" viewBox="0 0 24 24"><path class="duotone-fill" d="M5.5 8h13l-1 12.5h-11z"/><path class="stroke-main" d="M5.5 8h13l-1 12.5h-11z"/><path class="stroke-main" d="M9 10V6.8a3 3 0 0 1 6 0V10"/></svg>',
  corte: '<svg class="nav-svg anim-cash171" viewBox="0 0 24 24"><rect class="duotone-fill" x="3" y="6.5" width="18" height="11" rx="2"/><rect class="stroke-main" x="3" y="6.5" width="18" height="11" rx="2"/><circle class="stroke-main" cx="12" cy="12" r="2.6"/><path class="stroke-main" d="M6.3 9.5v.01M17.7 14.5v.01"/></svg>'
};
/* de la barra del administrador: Ruta = pin, Entrega = caja, Viaje = camión */
var CH171_DE = { ruta: 'rutas', entrega: 'bodega', viaje: 'cargas' };
function ch171Icono(k, viejo) {
  try {
    if (CH171_SVG[k]) return CH171_SVG[k];
    if (CH171_DE[k]) {
      var w = document.createElement('div'); w.innerHTML = BARRA165_HTML;
      var s = w.querySelector('[data-tab="' + CH171_DE[k] + '"] svg');
      if (s) return s.outerHTML;
    }
    var o = viejo && viejo.querySelector('svg');
    if (o) { var c = o.cloneNode(true); c.setAttribute('class', 'nav-svg'); return c.outerHTML; }
  } catch (e) {}
  return '';
}
var CH171_CSS = [
 'nav.floating-nav.chofer171{grid-template-columns:repeat(var(--n171,5),1fr)}',
 'nav.floating-nav.chofer171 .active-pill{width:calc((100% - 10px) / var(--n171,5))}',
 'nav.floating-nav.chofer171 .active-pill.fuera171{opacity:0}',
 '@keyframes rcpt171{0%{transform:none}35%{transform:translateY(-3px) rotate(-6deg)}70%{transform:translateY(1px) rotate(3deg)}100%{transform:none}}',
 '@keyframes chk171{0%{transform:scale(.4);opacity:0}60%{transform:scale(1.2);opacity:1}100%{transform:none}}',
 '@keyframes bag171{0%{transform:none}40%{transform:translateY(-3px) scale(1.06)}100%{transform:none}}',
 '@keyframes cash171{0%{transform:none}40%{transform:rotate(-8deg) scale(1.06)}75%{transform:rotate(4deg)}100%{transform:none}}',
 '.nav-item.is-animating .anim-rcpt171{animation:rcpt171 .55s cubic-bezier(.34,1.56,.64,1);transform-origin:12px 20px}',
 '.nav-item.is-animating .chk171{animation:chk171 .5s cubic-bezier(.34,1.56,.64,1);transform-origin:12px 13px}',
 '.nav-item.is-animating .anim-bag171{animation:bag171 .5s cubic-bezier(.34,1.56,.64,1);transform-origin:12px 20px}',
 '.nav-item.is-animating .anim-cash171{animation:cash171 .55s cubic-bezier(.34,1.56,.64,1);transform-origin:12px 12px}',
 /* con barra flotante (68 px + 16 px abajo): la barra de cobro de Entrega y los avisos van arriba de ella, no debajo */
 'html.fnav165 .entbar{bottom:calc(92px + env(safe-area-inset-bottom,0px))!important}',
 'html.fnav165 .toast{bottom:calc(96px + env(safe-area-inset-bottom,0px))!important}',
 /* 2) celular sencillo / ahorro: sin vidrio */
 'html.lite171 *,html.lite171 *::before,html.lite171 *::after{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}',
 'html.lite171 .floating-nav{background:var(--nav-surface,#fff)!important}',
 'html.ahorro171 *,html.ahorro171 *::before,html.ahorro171 *::after{animation:none!important;transition:none!important}',
 /* 3) íconos 3D en el texto: el emoji queda para leerse, escondido a la vista */
 /* nada de bloque ni posición absoluta adentro: si no, el texto que se copia/lee ("💰 Cuadre") tendría un salto de línea */
 '.e171{display:inline-block;width:1.2em;height:1.2em;vertical-align:-.22em;line-height:0;white-space:nowrap}',
 '.e171 .e171t{font-size:0;line-height:0;color:transparent}',
 '.e171 .ic3d167{width:100%!important;height:100%!important;display:inline-block!important;vertical-align:top}',
 '.e171 .ic3d167,.e171 .ic3d167 *{animation:none!important}',
 '.e171 svg{width:100%;height:100%;display:inline-block;vertical-align:top}'
].join('\n');
(function () {
  if (document.getElementById('css171')) return;
  var st = document.createElement('style'); st.id = 'css171'; st.textContent = CH171_CSS; document.head.appendChild(st);
})();

function ch171Activa() { return S.role !== 'admin'; }
function ch171Viejos() { return Array.prototype.slice.call(document.querySelectorAll('nav.tabs button')); }
function ch171Llave(b) { return b.dataset.t || (b.dataset.act === 'gxsheet' ? 'gasto' : (b.dataset.act || 'x')); }
function ch171Toca(el) {
  try {
    var n = el.closest('nav.chofer171'), i = +el.dataset.index, viejo = ch171Viejos()[i];
    var esTab = el.dataset.tab171 === '1';
    if (esTab) {
      var p = n.querySelector('.active-pill');
      p.classList.remove('fuera171');
      p.style.transform = 'translateX(' + (i * 100) + '%)';
      n._i = i;
      Array.prototype.forEach.call(n.querySelectorAll('.nav-item'), function (it) { it.classList.remove('active', 'is-animating'); });
      el.classList.add('active');
    } else el.classList.remove('is-animating');
    void el.offsetWidth;
    el.classList.add('is-animating');
    if (viejo) viejo.click();
  } catch (e) { console.error('chofer171', e); }
}
window.ch171Toca = ch171Toca;
function chofer171() {
  try {
    var n = document.querySelector('nav.floating-nav.chofer171'), h = document.documentElement;
    var V = ch171Activa() ? ch171Viejos() : [];
    if (!V.length) {
      if (n) n.parentNode.removeChild(n);
      if (!document.querySelector('nav.floating-nav:not(.chofer171)')) h.classList.remove('fnav165');
      return;
    }
    var firma = V.map(ch171Llave).join(',');
    if (!n || n._firma !== firma) {
      if (n) n.parentNode.removeChild(n);
      var html = '<nav class="floating-nav chofer171" aria-label="Navegación del chofer" style="--n171:' + V.length + '"><div class="active-pill"></div>'
        + V.map(function (b, i) {
          var k = ch171Llave(b), lb = (b.querySelector('span') || b).textContent.trim();
          return '<button class="nav-item" data-index="' + i + '" data-tab="' + esc(k) + '" data-tab171="' + (b.dataset.t ? 1 : 0) + '" onclick="ch171Toca(this)">'
            + '<div class="icon-wrap"><span class="badge-dot badge-red" hidden></span><span class="badge-dot badge-slate" hidden></span>' + ch171Icono(k, b) + '</div>'
            + '<span class="nav-label">' + esc(lb) + '</span></button>';
        }).join('') + '</nav>';
      var w = document.createElement('div'); w.innerHTML = html; n = w.firstChild;
      n._firma = firma; n._i = -2;
      n.addEventListener('click', function (e) { e.stopPropagation(); });
      document.body.appendChild(n);
    }
    h.classList.add('fnav165');
    /* la pestaña de ahora */
    var t = S.tab && S.tab[S.role], i = -1;
    V.forEach(function (b, j) { if (b.dataset.t && b.dataset.t === t) i = j; });
    if (n._i !== i) {
      var p = n.querySelector('.active-pill');
      if (i < 0) p.classList.add('fuera171');
      else {
        if (n._i === -2) { p.style.transition = 'none'; p.style.transform = 'translateX(' + (i * 100) + '%)'; void p.offsetWidth; p.style.transition = ''; }
        else p.style.transform = 'translateX(' + (i * 100) + '%)';
        p.classList.remove('fuera171');
      }
      n._i = i;
      Array.prototype.forEach.call(n.querySelectorAll('.nav-item'), function (it) { if (+it.dataset.index === i) it.classList.add('active'); else it.classList.remove('active', 'is-animating'); });
    }
    /* puntos: los mismos pendientes que la barra de antes */
    Array.prototype.forEach.call(n.querySelectorAll('.nav-item'), function (it) {
      var ob = V[+it.dataset.index], bs = ob ? ob.querySelectorAll('.tbadge,.tdot') : [];
      var urg = Array.prototype.some.call(bs, function (x) { return x.classList.contains('tdot') || !x.classList.contains('suave'); }), hay = bs.length > 0;
      var tb = ob && ob.querySelector('.tbadge'), nm = tb ? tb.getAttribute('aria-label') : '';
      var r = it.querySelector('.badge-red'), s = it.querySelector('.badge-slate');
      r.hidden = !urg; s.hidden = !hay || urg;
      it.setAttribute('aria-label', it.querySelector('.nav-label').textContent + (nm ? ' · ' + nm : ''));
    });
  } catch (e) { console.error('chofer171', e); }
}

/* los tutoriales que señalan el botón "Gasto" de la barra de antes (escondida) señalan el de la barra flotante */
var _tb171 = tutBlanco;
tutBlanco = function (st) {
  try { if (st && st[0] && document.querySelector('nav.chofer171')) st = [String(st[0]).replace(/\[data-act="gxsheet"\]/g, 'nav.chofer171 [data-tab="gasto"]')].concat(st.slice(1)); } catch (e) {}
  return _tb171.call(this, st);
};

/* ---------- 2) celular sencillo y modo ahorro ---------- */
function ahorro171() { try { return localStorage.getItem('ahorro171') === '1'; } catch (e) { return false; } }
function lite171Aplica() {
  var h = document.documentElement, nv = navigator || {};
  var sencillo = (nv.deviceMemory && nv.deviceMemory <= 3) || (nv.hardwareConcurrency && nv.hardwareConcurrency <= 4);
  var ah = ahorro171();
  h.classList.toggle('lite171', !!(sencillo || ah));
  h.classList.toggle('ahorro171', !!ah);
}
lite171Aplica();
var _aj171 = ajHTML;
ajHTML = function () {
  var h = _aj171.apply(this, arguments);
  try {
    if (!h) return h;
    var on = ahorro171();
    var x = '<div class="card" data-k="aj171"><b>🔋 Modo ahorro</b><div class="lbl" style="margin-top:4px">Solo en este celular. Quita las animaciones y el efecto de vidrio: útil con poca batería o si el celular va lento. No cambia ningún dato.</div>'
      + '<div class="chips" role="group" aria-label="Modo ahorro" style="margin-top:6px"><button data-act="ahorro171" data-v="1" aria-pressed="' + on + '">Encendido</button><button data-act="ahorro171" data-v="0" aria-pressed="' + !on + '">Apagado</button></div></div>';
    var i = h.lastIndexOf('</div></div>');
    return i > -1 ? h.slice(0, i) + x + h.slice(i) : h + x;
  } catch (e) { return h; }
};
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('[data-act="ahorro171"]'); if (!b) return;
  e.stopImmediatePropagation();
  try { localStorage.setItem('ahorro171', b.dataset.v === '1' ? '1' : '0'); } catch (err) {}
  lite171Aplica();
  toast(b.dataset.v === '1' ? 'Modo ahorro encendido' : 'Modo ahorro apagado');
  render();
}, true);

/* ---------- 3) íconos 3D en toda la app (el emoji se queda en el texto) ---------- */
function e171Pon(raiz) {
  if (!raiz || typeof INI167_RE === 'undefined') return;
  var tw = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      if (!INI167_RE.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
      var p = n.parentNode;
      if (!p || /^(SCRIPT|STYLE|TEXTAREA|OPTION|INPUT|SELECT|TITLE)$/.test(p.nodeName) || p.closest('svg,.ic3d167,.e171,[contenteditable],.floating-nav,nav.tabs')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  var L = [];
  while (tw.nextNode()) L.push(tw.currentNode);
  if (!L.length) return;
  ini167Sprite();
  L.forEach(function (n) {
    var partes = n.nodeValue.split(/(💰|🍌|🚚|📅|🏠|📦|⏳)/), fr = document.createDocumentFragment();
    partes.forEach(function (t) {
      if (!t) return;
      var k = INI167_EMOJI[t];
      if (!k || !INI167_ICONS[k]) { fr.appendChild(document.createTextNode(t)); return; }
      var w = document.createElement('span');
      w.className = 'e171';
      w.innerHTML = '<span class="e171t">' + t + '</span>' + INI167_ICONS[k].replace('<span class="ic3d167', '<span aria-hidden="true" class="ic3d167');
      fr.appendChild(w);
    });
    n.parentNode.replaceChild(fr, n);
  });
}
function e171() {
  try {
    var m = document.querySelector('main');
    if (m && !m.classList.contains('ini167')) e171Pon(m);
    Array.prototype.forEach.call(document.querySelectorAll(OV170), function (o) { e171Pon(o); });
  } catch (e) { console.error('e171', e); }
}

/* ---------- 4) 142 · carga con costo raro ---------- */
function prom171(k) {
  var L = (S.cargas || []).filter(function (c) { return k === 'R' ? (num(c.kgR) > 0 && num(c.pR) > 0) : (num(c.kgM) > 0 && num(c.pM) > 0); })
    .sort(function (a, b) { return String(b.fecha || '').localeCompare(String(a.fecha || '')); }).slice(0, 5);
  if (L.length < 2) return 0;
  return r2(L.reduce(function (s, c) { return s + num(k === 'R' ? c.pR : c.pM); }, 0) / L.length);
}
var _cmRaro171 = cmRaro150;
cmRaro150 = function (k) {
  var msg = _cmRaro171.apply(this, arguments);
  if (msg) return msg;
  try {
    var m = S.cm; if (!m) return '';
    var p = num(k === 'R' ? m.pR : m.pM), pr = prom171(k), nom = k === 'R' ? 'roatán' : 'macho';
    if (!(p > 0 && pr > 0)) return '';
    if (p > pr * 1.4 || p < pr * 0.6)
      return 'Revisa el precio del ' + nom + ': pusiste ' + money(p) + ' el kilo y en tus últimas cargas lo pagaste en promedio a ' + money(pr) + ' (' + (p > pr ? 'es ' + Math.round((p / pr - 1) * 100) + '% más caro' : 'es ' + Math.round((1 - p / pr) * 100) + '% más barato') + ').\n\nUn costo mal puesto hace que la ganancia del día salga mal.\n\nAceptar = sí, está bien así · Cancelar = lo corrijo';
  } catch (e) {}
  return '';
};

var _rd171 = render;
render = function () { var r = _rd171.apply(this, arguments); chofer171(); e171(); return r; };
