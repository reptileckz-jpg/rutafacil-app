/* ============================================================================================
   TEMA · Pantalla "Inicio" en estilo Bento Glossy 3D (punto 167) — base: el código que mandó Ricardo
   ============================================================================================
   Alineado con tema-mas.js (.mas166) y la barra flotante (tema-barra.js).
   - No modifica ningún cálculo, dato de Firebase, data-act ni selector usado por pruebas.
   - Sprite de degradados 3D (una sola vez en la página), ilustraciones vectoriales 3D Glossy en lugar de los emojis, animaciones GPU.
   Cambios contra el código base (para que funcione y no se corrompa nada):
   - inicio() NO se llama por su nombre al dibujar (la app la guarda desde el arranque): envolverla no cambiaba la pantalla. En su lugar,
     DESPUÉS de dibujar, a la pantalla de Inicio del administrador (<main>) se le pone la clase .ini167. Así también alcanza las tarjetas
     que se agregan después de dibujar (Hoy, Cobranza, avisos…) y no se envuelve nada (los selectores "main > .card" siguen igual).
   - Los emojis se cambian SOLO en el texto que se ve (nunca dentro de atributos, campos o botones de escribir): sin riesgo de romper HTML.
   - La app vuelve a crear las tarjetas en cada redibujado: la animación de entrada sale SOLO al llegar a Inicio (clase .ini167in un
     momento), no con cada toque (si no, parpadeaba). Lo mismo para el mosaico de "Más" (.mas166).
   - El estilo de tarjeta Bento va en las tarjetas de primer nivel de la pantalla (main.ini167 > .card), no en las que van dentro de otra.
   Solo aspecto; no cambia ningún dato ni ninguna cuenta. Se arma al final.
   ============================================================================================ */

/* --------------------------------------------------------------------------------------------
   1. ILUSTRACIONES VECTORIALES 3D GLOSSY / CLAY (DEGRADADOS + ICONOS) — tal cual
   -------------------------------------------------------------------------------------------- */
var INI167_DEFS = '<svg width="0" height="0" style="position:absolute;pointer-events:none" aria-hidden="true" id="defs167">' +
  '<defs>' +
    '<linearGradient id="g167-gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fde047"/><stop offset="45%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/></linearGradient>' +
    '<linearGradient id="g167-ban-r" x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stop-color="#fef08a"/><stop offset="40%" stop-color="#facc15"/><stop offset="100%" stop-color="#ca8a04"/></linearGradient>' +
    '<linearGradient id="g167-ban-m" x1="15%" y1="0%" x2="85%" y2="100%"><stop offset="0%" stop-color="#bef264"/><stop offset="45%" stop-color="#65a30d"/><stop offset="100%" stop-color="#3f6212"/></linearGradient>' +
    '<linearGradient id="g167-em" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6ee7b7"/><stop offset="50%" stop-color="#10b981"/><stop offset="100%" stop-color="#047857"/></linearGradient>' +
    '<linearGradient id="g167-bl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#93c5fd"/><stop offset="50%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#1d4ed8"/></linearGradient>' +
    '<linearGradient id="g167-tl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5eead4"/><stop offset="50%" stop-color="#14b8a6"/><stop offset="100%" stop-color="#0f766e"/></linearGradient>' +
    '<linearGradient id="g167-wood" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fed7aa"/><stop offset="50%" stop-color="#fb923c"/><stop offset="100%" stop-color="#c2410c"/></linearGradient>' +
    '<radialGradient id="g167-shine" cx="30%" cy="25%" r="65%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
  '</defs>' +
'</svg>';

var INI167_ICONS = {
  bolsa: '<span class="ic3d167 float3d167"><svg viewBox="0 0 48 48" fill="none">' +
    '<ellipse cx="24" cy="42" rx="14" ry="3.5" fill="#b45309" opacity="0.22"/>' +
    '<path d="M17 11h14l-2.5 5.5h-9L17 11z" fill="url(#g167-gold)"/>' +
    '<path d="M14.5 16.5h19c4.5 4 7 9.5 6.4 15.5-.6 5.8-5.2 10-11 10H19.1c-5.8 0-10.4-4.2-11-10-.6-6 1.9-11.5 6.4-15.5z" fill="url(#g167-gold)"/>' +
    '<ellipse cx="20" cy="24" rx="5.5" ry="7.5" transform="rotate(-18 20 24)" fill="url(#g167-shine)"/>' +
    '<rect x="16.5" y="15.2" width="15" height="3.2" rx="1.6" fill="#dc2626"/>' +
    '<path d="M24 23v12M27.2 25.5c0-1.5-1.4-2.4-3.2-2.4s-3.2.9-3.2 2.4c0 1.6 1.4 2.2 3.2 2.7 1.8.5 3.2 1.1 3.2 2.7 0 1.5-1.4 2.4-3.2 2.4s-3.2-.9-3.2-2.4" stroke="#78350f" stroke-width="2.6" stroke-linecap="round"/>' +
    '<circle class="spark3d167" cx="38" cy="12" r="4.5" fill="url(#g167-gold)" stroke="#fef08a" stroke-width="1.2"/>' +
  '</svg></span>',

  bananos: '<span class="ic3d167 sway3d167"><svg viewBox="0 0 48 48" fill="none">' +
    '<ellipse cx="24" cy="42" rx="14" ry="3.2" fill="#ca8a04" opacity="0.2"/>' +
    '<path d="M11 33c7 5 20 3 27-8 2.5-3.8 3.2-8.5 1.8-12-1.8 4.2-5.2 7.5-10.5 9.2-6 2-13 1.8-18.3 10.8z" fill="url(#g167-ban-r)"/>' +
    '<path d="M16 36c6.5 3.8 18 1.8 24-7.8 2-3.2 2.6-7.2 1.4-10.2-1.5 3.6-4.4 6.4-9 7.8-5.2 1.6-11.2 1.4-16.4 10.2z" fill="url(#g167-gold)"/>' +
    '<path d="M38 11.5l3.5-2.5 1.5 2-3 2.8z" fill="#713f12"/>' +
    '<ellipse cx="26" cy="27" rx="7" ry="2.2" transform="rotate(-24 26 27)" fill="url(#g167-shine)"/>' +
  '</svg></span>',

  camion: '<span class="ic3d167 drive3d167"><svg viewBox="0 0 48 48" fill="none">' +
    '<ellipse cx="24" cy="41" rx="17" ry="3" fill="#1d4ed8" opacity="0.2"/>' +
    '<rect x="5" y="13" width="23" height="19" rx="4.5" fill="url(#g167-em)"/>' +
    '<ellipse cx="14" cy="18" rx="6" ry="3" fill="url(#g167-shine)"/>' +
    '<path d="M28 18h7.5c1.5 0 2.8.8 3.5 2.1l3.5 6.2V32H28V18z" fill="url(#g167-bl)"/>' +
    '<path d="M30.5 20.5h4.2c.8 0 1.5.4 1.9 1.1l2.1 3.9h-8.2v-5z" fill="#dbeafe"/>' +
    '<circle cx="14" cy="34" r="4.8" fill="#1e293b"/><circle cx="14" cy="34" r="2" fill="#94a3b8"/>' +
    '<circle cx="35" cy="34" r="4.8" fill="#1e293b"/><circle cx="35" cy="34" r="2" fill="#94a3b8"/>' +
  '</svg></span>',

  calendario: '<span class="ic3d167"><svg viewBox="0 0 48 48" fill="none">' +
    '<rect x="7" y="10" width="34" height="31" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>' +
    '<path d="M7 18a8 8 0 0 1 8-8h18a8 8 0 0 1 8 8v3H7v-3z" fill="url(#g167-em)"/>' +
    '<rect x="15" y="6" width="3.5" height="7" rx="1.75" fill="#047857"/>' +
    '<rect x="29.5" y="6" width="3.5" height="7" rx="1.75" fill="#047857"/>' +
    '<path d="M17 30l4.8 4.8L31.5 25" stroke="url(#g167-em)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>' +
  '</svg></span>',

  bodega: '<span class="ic3d167 float3d167"><svg viewBox="0 0 48 48" fill="none">' +
    '<ellipse cx="24" cy="42" rx="14" ry="3" fill="#0f766e" opacity="0.2"/>' +
    '<path d="M24 6l16 8.8v18.4L24 42 8 33.2V14.8L24 6z" fill="url(#g167-wood)"/>' +
    '<path d="M24 6l16 8.8-16 8.8-16-8.8L24 6z" fill="#fed7aa"/>' +
    '<path d="M24 23.6l16-8.8v18.4L24 42V23.6z" fill="#ea580c" opacity="0.85"/>' +
    '<path d="M15.5 10.6l16 8.8" stroke="#fff7ed" stroke-width="2.6" stroke-linecap="round"/>' +
  '</svg></span>',

  reloj: '<span class="ic3d167"><svg viewBox="0 0 24 24" fill="none">' +
    '<path d="M6 3h12M6 21h12" stroke="#0f766e" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M7.5 3.5h9v3.8c0 1.8-.9 3.4-2.4 4.3L12 12.8l-2.1-1.2A5 5 0 0 1 7.5 7.3V3.5z" fill="url(#g167-tl)" opacity="0.35"/>' +
    '<path d="M7.5 20.5h9v-3.8c0-1.8-.9-3.4-2.4-4.3L12 11.2l-2.1 1.2a5 5 0 0 0-2.4 4.3v3.8z" fill="url(#g167-gold)"/>' +
  '</svg></span>'
};

/* --------------------------------------------------------------------------------------------
   2. HOJA DE ESTILOS ENCAPSULADA (.ini167) — la del código base, con dos cambios:
      tarjetas de primer nivel (> .card) y la entrada solo con .ini167in.
   -------------------------------------------------------------------------------------------- */
var INI167_CSS = `
.ini167 {
  --surface-card: #ffffff;
  --surface-soft: #f8fafc;
  --border-card: rgba(226, 232, 240, 0.94);
  --shadow-card: 0 6px 20px -6px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.03);
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --pill-em-bg: rgba(16, 185, 129, 0.13);
  --pill-em-fg: #059669;
  --pill-am-bg: rgba(245, 158, 11, 0.15);
  --pill-am-fg: #b45309;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .ini167 {
    --surface-card: #151f32;
    --surface-soft: #1b273e;
    --border-card: rgba(51, 65, 85, 0.78);
    --shadow-card: 0 10px 26px -6px rgba(0, 0, 0, 0.48);
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --pill-em-fg: #34d399;
    --pill-am-fg: #fbbf24;
  }
}
:root[data-theme="dark"] .ini167 {
  --surface-card: #151f32;
  --surface-soft: #1b273e;
  --border-card: rgba(51, 65, 85, 0.78);
  --shadow-card: 0 10px 26px -6px rgba(0, 0, 0, 0.48);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --pill-em-fg: #34d399;
  --pill-am-fg: #fbbf24;
}

/* Tarjetas Bento unificadas (las de primer nivel de Inicio) */
.ini167 > .card {
  background: var(--surface-card) !important;
  border: 1px solid var(--border-card) !important;
  border-radius: 24px !important;
  padding: 16px !important;
  margin-bottom: 12px !important;
  box-shadow: var(--shadow-card) !important;
  transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease;
}
/* la entrada escalonada: solo al llegar a Inicio */
.ini167.ini167in > .card { animation: iniFadeUp167 0.46s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.ini167.ini167in > .card:nth-of-type(1) { animation-delay: 0.02s; }
.ini167.ini167in > .card:nth-of-type(2) { animation-delay: 0.06s; }
.ini167.ini167in > .card:nth-of-type(3) { animation-delay: 0.10s; }
.ini167.ini167in > .card:nth-of-type(4) { animation-delay: 0.14s; }
.ini167.ini167in > .card:nth-of-type(5) { animation-delay: 0.18s; }
.ini167.ini167in > .card:nth-of-type(6) { animation-delay: 0.22s; }
.ini167.ini167in > .card:nth-of-type(7) { animation-delay: 0.26s; }

@keyframes iniFadeUp167 {
  from { opacity: 0; transform: translateY(13px) scale(0.975); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Tarjetas destacadas por categoría */
.ini167 > .card[data-key="cuadre"],
.ini167 > .card[data-key="tombola"] {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.10) 0%, var(--surface-card) 62%) !important;
  border-color: rgba(245, 158, 11, 0.36) !important;
}
.ini167 > .card.pw40 {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.09) 0%, var(--surface-card) 60%) !important;
  border-color: rgba(16, 185, 129, 0.30) !important;
}
.ini167 > .card.pw40 .it {
  background: var(--surface-soft);
  border: 1px solid var(--border-card);
  border-radius: 18px;
  padding: 12px;
  margin-top: 8px;
}

/* Botones táctiles con respuesta elástica */
.ini167 .btn {
  border-radius: 15px !important;
  font-weight: 800 !important;
  letter-spacing: -0.01em;
  transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease !important;
}
.ini167 .btn:active {
  transform: scale(0.95) !important;
}

/* Ilustraciones 3D Glossy inline */
.ini167 .ic3d167 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  vertical-align: middle;
  margin-right: 4px;
  flex-shrink: 0;
}
.ini167 .ic3d167 svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Micro-animaciones suaves aceleradas por GPU */
.ini167 .float3d167 { animation: iniFloat167 3.2s ease-in-out infinite; }
.ini167 .sway3d167  { animation: iniSway167 3.6s ease-in-out infinite; transform-origin: 80% 20%; }
.ini167 .drive3d167 { animation: iniDrive167 2.8s ease-in-out infinite; }
.ini167 .spark3d167 { animation: iniSpark167 2s ease-in-out infinite; transform-origin: center; }

@keyframes iniFloat167 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2.5px); }
}
@keyframes iniSway167 {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-5deg); }
}
@keyframes iniDrive167 {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(2px); }
}
@keyframes iniSpark167 {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.25); opacity: 0.65; }
}

/* Tarjetas de Números de Hoy y Bodega */
.ini167 [data-key="numeros"] > div,
.ini167 .kpi-grid > div {
  border-radius: 20px !important;
  box-shadow: 0 8px 18px -6px rgba(15, 23, 42, 0.2) !important;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ini167 [data-key="numeros"] > div:active,
.ini167 .kpi-grid > div:active {
  transform: scale(0.96);
}

/* Modal de aviso urgente pop68 con acabado cristalino */
.pop68 {
  border-radius: 26px !important;
  overflow: hidden;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.45) !important;
  animation: popSpring167 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes popSpring167 {
  from { opacity: 0; transform: scale(0.9) translateY(16px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* "Más" (166): la entrada escalonada de su mosaico, solo al llegar (no en cada redibujado) */
.mas166.quieto167 .bento-card { animation: none !important; }
`;

/* --------------------------------------------------------------------------------------------
   3. CSS, SPRITE Y CONEXIÓN (después de dibujar; no envuelve inicio())
   -------------------------------------------------------------------------------------------- */
(function () {
  if (!document.getElementById('css167')) {
    var st = document.createElement('style');
    st.id = 'css167';
    st.textContent = INI167_CSS;
    document.head.appendChild(st);
  }
})();
function ini167Sprite() {
  if (document.getElementById('defs167') || !document.body) return;
  var w = document.createElement('div');
  w.innerHTML = INI167_DEFS;
  document.body.appendChild(w.firstChild);
}

/* los emojis → ilustraciones, SOLO en el texto que se ve (no en atributos ni en campos donde se escribe) */
var INI167_EMOJI = { '💰': 'bolsa', '🍌': 'bananos', '🚚': 'camion', '📅': 'calendario', '🏠': 'bodega', '📦': 'bodega', '⏳': 'reloj' };
var INI167_RE = /💰|🍌|🚚|📅|🏠|📦|⏳/;
function ini167GlossyEmojis(raiz) {
  var tw = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      if (!INI167_RE.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
      var p = n.parentNode;
      if (!p || /^(SCRIPT|STYLE|TEXTAREA|OPTION|INPUT|SELECT)$/.test(p.nodeName) || p.closest('svg,.ic3d167,[contenteditable]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  var L = [];
  while (tw.nextNode()) L.push(tw.currentNode);
  L.forEach(function (n) {
    var partes = n.nodeValue.split(/(💰|🍌|🚚|📅|🏠|📦|⏳)/), fr = document.createDocumentFragment();
    partes.forEach(function (t) {
      if (!t) return;
      var k = INI167_EMOJI[t];
      if (!k) { fr.appendChild(document.createTextNode(t)); return; }
      var w = document.createElement('span');
      w.innerHTML = k === 'reloj'
        ? '<span class="ic3d167" style="width:18px;height:18px">' + INI167_ICONS.reloj.replace(/^<span[^>]*>|<\/span>$/g, '') + '</span>'
        : INI167_ICONS[k];
      var ic = w.firstChild;
      ic.setAttribute('role', 'img');
      ic.setAttribute('aria-label', t);   /* para lectores de pantalla y para quien busque el emoji */
      fr.appendChild(ic);
    });
    n.parentNode.replaceChild(fr, n);
  });
}

var _ini167Ult = '';
function ini167() {
  try {
    var m = document.querySelector('main');
    var vista = S.role + ':' + (S.tab && S.tab[S.role]);
    var llega = vista !== _ini167Ult;
    _ini167Ult = vista;
    if (!m) return;
    if (S.role === 'admin' && S.tab.admin === 'inicio') {
      ini167Sprite();
      m.classList.add('ini167');
      if (llega) { m.classList.add('ini167in'); setTimeout(function () { var x = document.querySelector('main.ini167in'); if (x) x.classList.remove('ini167in'); }, 900); }
      else m.classList.remove('ini167in');
      ini167GlossyEmojis(m);
    } else {
      m.classList.remove('ini167', 'ini167in');
    }
    var mas = document.querySelector('.mas166');
    if (mas && !llega) mas.classList.add('quieto167');
  } catch (e) { console.error('ini167', e); }
}
var _rd167 = render;
render = function () { var r = _rd167.apply(this, arguments); ini167(); return r; };
