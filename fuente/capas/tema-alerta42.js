/* ===================== TEMA · Tarjetas de aviso nuevas: Bento 3D (24 nov · punto 42 de la nueva numeración) =====================
   Ricardo mandó un diseño ("Rediseño de Tarjetas de Alerta") y escogió: Opción 1 (Bento 3D: tarjeta blanca, ícono cuadrado con relieve
   y degradado, título + etiqueta + explicación + números en pastillas, botones táctiles) para todos los avisos, y Opción 3 (tarjeta
   oscura) SOLO para lo que "no cuadra". Quitar el molde genérico (fondo rosa pálido + franja gruesa a la izquierda) en toda la app, y
   que no diga dos veces "Urgente". Las tarjetas que ya tienen otro diseño se quedan.
   Qué cambia (sin tocar datos ni cuentas):
   1) Los renglones de "Hoy" (.av[data-c68]): ícono 3D, título, etiqueta (una sola vez), explicación, números en pastillas
      ("Hay 770 · Deben ser 1,070 · −300") y botones "Posponer" / "Lo atiendo yo" de verdad (no links), y "›" en cuadro oscuro.
   2) Las tarjetas .card.alert / .card.good / .card.note: blancas con borde fino y sombra; si empiezan con un título con emoji,
      el emoji se cambia por el ícono 3D del nivel.
   3) Las tarjetas con franja gruesa a la izquierda (estilo en línea o .avl/.cob91c/.cv80): borde fino + puntito de color.
   4) El Centro de pendientes (tema-centro30.js) usa el mismo diseño.
   Se aplica ANTES del morph (gancho en tema-dibujar1.js), así la pantalla no parpadea; lo que está fuera de #root (ventanas) después.
   Letra y botones grandes (para el dueño). Animación solo en lo urgente y quieta con "Modo ahorro" o "reducir movimiento".
   ============================================================================================ */
(function () {
  var st = document.createElement('style');
  st.textContent = [
    ':root{--a42sh:0 10px 28px -8px rgba(15,23,42,.10),0 2px 6px -1px rgba(15,23,42,.05)}',
    '.a42-r{--a42:#E11D48;--a42g:linear-gradient(145deg,#FB7185,#E11D48);--a42s:0 8px 18px -4px rgba(225,29,72,.45)}',
    '.a42-o{--a42:#D97706;--a42g:linear-gradient(145deg,#FBBF24,#D97706);--a42s:0 8px 18px -4px rgba(217,119,6,.42)}',
    '.a42-g{--a42:#059669;--a42g:linear-gradient(145deg,#34D399,#059669);--a42s:0 8px 18px -4px rgba(5,150,105,.42)}',
    '.a42-b{--a42:#2563EB;--a42g:linear-gradient(145deg,#60A5FA,#2563EB);--a42s:0 8px 18px -4px rgba(37,99,235,.42)}',
    '.a42-n{--a42:#475569;--a42g:linear-gradient(145deg,#94A3B8,#475569);--a42s:0 8px 18px -4px rgba(71,85,105,.40)}',
    /* el ícono 3D */
    '.a42i{flex:none;width:48px;height:48px;border-radius:15px;background:var(--a42g);color:#fff!important;display:flex;align-items:center;justify-content:center;box-shadow:var(--a42s),inset 0 1.5px 1.5px rgba(255,255,255,.55),inset 0 -2px 4px rgba(0,0,0,.15)}',
    '.a42i.a42e{background:color-mix(in srgb,var(--a42) 13%,var(--surface));box-shadow:inset 0 1.5px 1.5px rgba(255,255,255,.55),0 4px 10px -4px color-mix(in srgb,var(--a42) 45%,transparent);font-size:26px;white-space:pre}',
    '.a42i svg{width:26px!important;height:26px!important;color:#fff!important;fill:currentColor}',
    '@keyframes a42flota{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}',
    '.a42-r>.a42i,.a42row.a42-r .a42i{animation:a42flota 3s ease-in-out infinite}',
    'html.ahorro171 .a42i{animation:none!important}@media (prefers-reduced-motion:reduce){.a42i{animation:none!important}}',
    /* la etiqueta y las pastillas */
    '.a42g{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.03em;text-transform:uppercase;padding:3px 10px;border-radius:999px;background:color-mix(in srgb,var(--a42) 14%,transparent);color:var(--a42);vertical-align:middle;white-space:nowrap}',
    '.a42m{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.a42m>span{display:inline-flex;gap:4px;align-items:center;font-size:14px;padding:4px 10px;border-radius:10px;background:color-mix(in srgb,var(--fg) 5%,var(--surface));border:1px solid var(--line);color:var(--muted)}',
    '.a42m>span b{color:var(--fg)}.a42m>span.d{background:color-mix(in srgb,var(--a42) 14%,transparent);border-color:transparent;color:var(--a42);font-weight:800}',
    /* 1) renglones de "Hoy" */
    '.av.a42row[data-c68]{background:var(--surface)!important;border:1px solid var(--line)!important;border-radius:20px!important;box-shadow:var(--a42sh)!important;padding:14px!important;gap:12px!important;align-items:flex-start!important;font-size:16px!important}',
    '.av.a42row .ic68{display:none!important}.a42row .a42b{flex:1;min-width:0}.a42row .a42h{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px}',
    '.a42row .a42t{font-size:17px;font-weight:800;line-height:1.3;color:var(--fg)}.a42row .a42d{font-size:15px;line-height:1.35;color:var(--muted);margin-top:3px}',
    '.av.a42row[data-c68]{flex-wrap:wrap!important}.a42row>.a42a{flex-basis:100%;padding-left:60px;margin-top:0!important}',
    '.a42row .a42a{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.a42row .a42a .link,.a42row .a42a .btn{width:auto!important;min-height:44px!important;padding:0 14px!important;border-radius:13px!important;font-size:14px!important;font-weight:700!important;text-decoration:none!important;color:var(--fg)!important;background:color-mix(in srgb,var(--fg) 7%,var(--surface))!important;border:0!important;margin:0!important;display:inline-flex;align-items:center}',
    '.av.a42row>.a42go,.av.a42row>.lbl[aria-hidden]{flex:none;width:44px;height:44px;border-radius:13px;background:#0F172A!important;color:#fff!important;font-size:24px!important;font-weight:800;display:flex;align-items:center;justify-content:center;align-self:center;line-height:1;padding:0!important}',
    '[data-theme="dark"] .av.a42row:not(.a42k)>.a42go,[data-theme="dark"] .av.a42row:not(.a42k)>.lbl[aria-hidden]{background:#E2E8F0!important;color:#0F172A!important}',
    '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .av.a42row:not(.a42k)>.a42go,:root:not([data-theme="light"]) .av.a42row:not(.a42k)>.lbl[aria-hidden]{background:#E2E8F0!important;color:#0F172A!important}}',
    /* oscura: "no cuadra" */
    '.a42k{background:#18181B!important;border:1px solid #27272A!important;box-shadow:0 16px 36px -10px rgba(9,9,11,.35),inset 0 1px 0 rgba(255,255,255,.08)!important;color:#fff!important;--a42:#FB7185}',
    '.a42k .a42i{background:rgba(244,63,94,.16)!important;color:#FB7185!important;border:1px solid rgba(244,63,94,.35);box-shadow:none!important}.a42k .a42i svg{color:#FB7185!important}',
    '.a42k .a42t,.a42k b{color:#fff!important}.a42k .a42d,.a42k .lbl{color:#A1A1AA!important}.a42k .a42m>span{background:#09090B;border-color:#27272A;color:#A1A1AA}.a42k .a42m>span b{color:#F4F4F5}',
    '.a42k .a42m>span.d{background:rgba(244,63,94,.16);border:1px solid rgba(244,63,94,.35);color:#FB7185}.a42k .a42a .link,.a42k .a42a .btn{background:#27272A!important;color:#D4D4D8!important}',
    '.av.a42row.a42k>.a42go,.av.a42row.a42k>.lbl[aria-hidden]{background:#FB7185!important;color:#09090B!important}',
    /* 2) tarjetas de aviso de toda la app */
    '.card.a42c{background:var(--surface)!important;border:1px solid var(--line)!important;border-radius:20px!important;box-shadow:var(--a42sh)!important}',
    '.card.a42c>.a42i{float:left;margin:0 12px 6px 0}.card.a42c::after{content:"";display:table;clear:both}',
    '.card.a42c.a42k{background:#18181B!important;border-color:#27272A!important}',
    /* 3) sin franja gruesa: borde fino y un puntito de color */
    '.a42f{border-left-width:1px!important;border-left-color:var(--line)!important;position:relative}',
    '.a42f::before{content:"";position:absolute;top:14px;right:14px;width:10px;height:10px;border-radius:50%;background:var(--a42f,#94A3B8);box-shadow:0 0 0 3px color-mix(in srgb,var(--a42f,#94A3B8) 22%,transparent)}',
    '.avl{background:var(--surface)!important}.cob91c{border-left-width:1px!important}.cob91c{position:relative}.cob91c::before{content:"";position:absolute;top:16px;right:14px;width:10px;height:10px;border-radius:50%;background:#16A34A}.cob91c.am::before{background:#F59E0B}.cob91c.ro::before{background:#DC2626}',
    '.cob91c .cb91h{padding-right:18px}',
    /* la oscura le gana al blanco de los renglones */
    '.av.a42row.a42k[data-c68]{background:#18181B!important;border-color:#27272A!important;box-shadow:0 16px 36px -10px rgba(9,9,11,.35),inset 0 1px 0 rgba(255,255,255,.08)!important}',
    /* "Precio de hoy" sin fijar: blanca, con el aro rojo que late (punto 24), sin fondo rosa */
    '[data-x="precio65"].pr24,[data-x="precio65"].sinfijar92{background:var(--surface)!important;border:2px solid #E11D48!important}',
    /* la tarjeta de pendientes de cada sección (era fondo durazno) */
    '.pnd86{background:var(--surface)!important;border:1px solid var(--line)!important;border-radius:20px!important;box-shadow:var(--a42sh)!important}.pnd86.c92>.hd92{background:transparent!important}'
  ].join('\n');
  document.head.appendChild(st);
})();
var A42 = {
  ic: {
    r: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    o: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    g: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    b: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  },
  nivDe68: { r: 'r', o: 'o', v: 'b', g: 'o', n: 'n' },
  noCuadra: /no cuadra|descuadr/i,
  emoji: /^\s*(?:\p{Extended_Pictographic}|[☀-➿])(?:️|‍(?:\p{Extended_Pictographic}|[☀-➿])️?)*\s*/u
};
function a42Num(s) { return parseFloat(String(s).replace(/,/g, '')); }
function a42Fmt(n) { try { return n.toLocaleString('es-MX'); } catch (e) { return String(n); } }
/* separa el texto de un aviso: título, explicación y números */
function a42Partes(t) {
  t = String(t || '').replace(/^\s*URGENTE:\s*/i, '').replace(/\s+/g, ' ').trim();
  var met = null, m = /\(?\s*hay\s+([\d.,]+)\s+y\s+deber[ií]a(?:n)?\s+ser\s+([\d.,]+)\s*\)?/i.exec(t);
  if (m) { var a = a42Num(m[1]), b = a42Num(m[2]); met = [['Hay', a42Fmt(a)], ['Deben ser', a42Fmt(b)], [(a - b > 0 ? '+' : '−') + a42Fmt(Math.abs(a - b)), '']]; t = t.replace(m[0], '').replace(/\s+([:,.])/g, '$1').replace(/\s*·\s*$/, '').trim(); }
  var tit = t, desc = '', i = t.indexOf(' · ');
  if (i > 0 && i < 70) { tit = t.slice(0, i); desc = t.slice(i + 3); }
  else { var j = t.indexOf(': '); if (j > 0 && j < 50) { tit = t.slice(0, j); desc = t.slice(j + 2); } }
  tit = tit.charAt(0).toUpperCase() + tit.slice(1);
  if (desc) desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  return { tit: tit, desc: desc, met: met };
}
function a42MetHTML(met) {
  if (!met) return '';
  return '<span class="a42m">' + met.map(function (x, k) { return k === met.length - 1 ? '<span class="d">' + esc(x[0]) + '</span>' : '<span>' + esc(x[0]) + ': <b>' + esc(x[1]) + '</b></span>'; }).join('') + '</span>';
}
/* 1) un renglón de "Hoy" */
function a42Row(row) {
  if (!row || row.classList.contains('a42row')) return;
  var c = row.getAttribute('data-c68') || 'n', niv = A42.nivDe68[c] || 'n', grow = row.querySelector(':scope > .grow'); if (!grow) return;
  var botones = Array.prototype.slice.call(grow.querySelectorAll('button,a')), resto = Array.prototype.slice.call(row.querySelectorAll(':scope > button, :scope > a, :scope > span:not(.grow):not(.ic68):not([aria-hidden])'));
  var txt = ''; grow.childNodes.forEach(function (n) { if (n.nodeType === 3) txt += n.textContent; else if (n.tagName === 'B' || n.tagName === 'SPAN' && !n.querySelector('button,a')) txt += n.textContent; });
  var P = a42Partes(txt), dark = A42.noCuadra.test(txt), lab = (typeof NIV68 !== 'undefined' && NIV68[c]) || '';
  if (dark) lab = 'No cuadra';
  row.classList.add('a42row', 'a42-' + niv); if (dark) row.classList.add('a42k');
  var ic = row.querySelector(':scope > .ic68'), svg = dark || !ic ? A42.ic[niv] || A42.ic.b : ic.innerHTML;
  var i = document.createElement('span'); i.className = 'a42i'; i.setAttribute('aria-hidden', 'true'); i.innerHTML = svg;
  var b = document.createElement('span'); b.className = 'a42b';
  b.innerHTML = '<span class="a42h"><b class="a42t">' + esc(P.tit) + '</b>' + (lab && !new RegExp('^' + lab, 'i').test(P.tit) ? '<span class="a42g">' + esc(lab) + '</span>' : '') + '</span>' + (P.desc ? '<span class="a42d" style="display:block">' + esc(P.desc) + '</span>' : '') + a42MetHTML(P.met);
  var acc = document.createElement('span'); acc.className = 'a42a';
  botones.concat(resto).forEach(function (x) { if (x.parentNode) acc.appendChild(x); });
  /* el texto completo de antes, escondido: otras partes de la app reconocen el aviso por su texto */
  var h0 = document.createElement('span'); h0.hidden = true; h0.textContent = txt; b.appendChild(h0);
  grow.replaceWith(b); row.insertBefore(i, b);
  var go = row.querySelector(':scope > .lbl[aria-hidden]'); if (go) { go.classList.add('a42go'); row.appendChild(go); }
  /* los botones en su propio renglón, abajo (no caben junto al ícono) */
  if (acc.children.length) row.appendChild(acc);
}
/* 2) una tarjeta de aviso */
function a42Card(el) {
  if (!el || el.classList.contains('a42c') || el.closest('.a42row')) return;
  var niv = el.classList.contains('alert') ? 'r' : (el.classList.contains('good') ? 'g' : 'o');
  var f = el.firstElementChild, tx = f ? f.textContent : '';
  el.classList.add('a42c', 'a42-' + niv);
  if (niv === 'r' && f && /^(B|STRONG)$/.test(f.tagName) && A42.noCuadra.test(tx)) el.classList.add('a42k');
  if (f && /^(B|STRONG)$/.test(f.tagName) && A42.emoji.test(tx)) {
    /* el emoji dice de qué se trata (📦, 💵…): se queda, dentro del cuadro del ícono */
    var tn = f.firstChild; while (tn && tn.nodeType !== 3) tn = tn.firstChild; var em = '';
    if (tn && A42.emoji.test(tn.textContent)) { em = tn.textContent.match(A42.emoji)[0]; tn.textContent = tn.textContent.replace(A42.emoji, ''); }
    var i = document.createElement('span'); i.className = 'a42i a42e'; i.setAttribute('aria-hidden', 'true'); i.textContent = em ? em.trim() + ' ' : ''; if (!em) { i.classList.remove('a42e'); i.innerHTML = A42.ic[niv]; } el.insertBefore(i, f);
  }
}
/* 3) franja gruesa a la izquierda */
function a42Franja(el) {
  if (!el || el.classList.contains('a42f') || el.classList.contains('a42row')) return;
  var s = el.getAttribute('style') || '', m = /border-left\s*:\s*([3-9])px\s+solid\s+([^;!]+)/i.exec(s); if (!m) return;
  el.classList.add('a42f'); el.style.setProperty('--a42f', m[2].trim());
}
function a42Deco(raiz) {
  raiz = raiz || document.getElementById('root'); if (!raiz) return;
  try {
    Array.prototype.forEach.call(raiz.querySelectorAll('.av[data-c68]'), a42Row);
    Array.prototype.forEach.call(raiz.querySelectorAll('.card.alert,.card.good,.card.note'), a42Card);
    Array.prototype.forEach.call(raiz.querySelectorAll('[style*="border-left:"],[style*="border-left: "]'), a42Franja);
    /* avisos sueltos sin color (por ejemplo, el del aceite en Vehículos): mismo diseño, en azul */
    Array.prototype.forEach.call(raiz.querySelectorAll('.av:not([data-c68])'), function (r) { if (r.querySelector(':scope > .grow')) { r.setAttribute('data-c68', 'v'); a42Row(r); } });
    /* tarjetas teñidas de color completo (maduración en Bodega): blancas; el color se queda en su barra */
    Array.prototype.forEach.call(raiz.querySelectorAll('.card[style*="-soft)"]'), function (c) { if (c.classList.contains('a42c')) return; var s = c.getAttribute('style') || ''; if (!/background:\s*var\(--(danger|banana|ok|info|orange)-soft\)/.test(s)) return; c.style.background = ''; c.style.borderColor = ''; c.classList.add('a42c'); });
  } catch (e) { console.error('a42', e); }
}
/* después de dibujar: las ventanas (fuera de #root) y lo que otras capas agregan después del morph */
var _rd42 = render;
render = function () {
  var r = _rd42.apply(this, arguments);
  /* también #root: algunas tarjetas (como "Hoy") se ponen después del morph */
  try { Array.prototype.forEach.call(document.body.children, function (n) { if (n.nodeType === 1 && n.tagName !== 'SCRIPT') a42Deco(n); }); } catch (e) {}
  return r;
};
