/* ============================================================================================
   TEMA · Ruta y Entrega del chofer en estilo Bento Glossy 3D (punto 168) — base: "Vista Previa Refinada Bento Glossy 3D - Ruta y Entrega"
   ============================================================================================
   Ricardo: "aquí tengo el de la ruta y entrega, analízalos, úsalo, pero sin corromper lo que ya tenemos ni afectar los datos; solo estamos
   mejorando la interfaz gráfica".
   El diseño trae sus propias clases (earnings-banner, quick-bento-btn, cargo-bento, traffic-box, hero-stop-card, stop-row-item,
   stop-pill-banner, step-progress, counter-row/btn-minus/btn-plus/val-readout, collection-dock, floating-dock). Aquí su CSS se pasó a
   los elementos REALES de la app (no se cambia el HTML de la app, ni un botón, ni una acción, ni un dato):
     #gan117 (lo ganado hoy) → earnings-banner          .cn72 .nv / .vr (Cliente nuevo / Venta rápida) → quick-bento jade / ámbar
     .card.rep1 (Te quedan en el camión) → cargo-bento   .card.rgcard (Ordenar con tráfico) → traffic-box
     .card.next (Siguiente parada) → hero-stop-card + .comtip → commission-callout     .stop (paradas) → stop-row-item
     .autocard (Parada 1 de 5…) → stop-pill-banner       ent125hd (Paso N de 3) → step-progress    .field .step → stepper
     .entbar (A cobrar) → collection-dock                nav.tabs del chofer → floating-dock (los mismos botones, incluido "Gasto")
   - Se aplica DESPUÉS de dibujar: clase .ruta168 en <main> (chofer en Ruta o Entrega) y .rep168 en <html> (para lo que va fijo).
   - La entrada de las tarjetas sale solo al llegar a la pantalla (la app recrea las tarjetas en cada redibujado: si no, parpadeaba).
   - Colores claro/oscuro: los del diseño, con el modo oscuro de la app.
   Solo aspecto; no cambia ningún dato ni ninguna cuenta. Se arma al final.
   ============================================================================================ */
var RUTA168_CSS = `
html.rep168 {
  --card-bg: #ffffff;
  --card-soft: #f8fafc;
  --card-border: rgba(203, 213, 225, 0.72);
  --card-shadow: 0 10px 24px -10px rgba(15, 23, 42, 0.14), 0 1px 3px rgba(15, 23, 42, 0.04);
  --ink-primary: #0f172a;
  --ink-secondary: #64748b;
  --jade: #0f766e;
  --jade-soft: rgba(13, 148, 136, 0.12);
  --crimson: #be123c;
  --crimson-soft: rgba(225, 29, 72, 0.12);
  --cobalt: #2563eb;
  --dock-surface: rgba(255, 255, 255, 0.86);
  --dock-border: rgba(255, 255, 255, 0.92);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]).rep168 {
    --card-bg: #131c31; --card-soft: #19243d; --card-border: rgba(51, 65, 85, 0.72);
    --card-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.5); --ink-primary: #f1f5f9; --ink-secondary: #94a3b8;
    --jade: #2dd4bf; --jade-soft: rgba(45, 212, 191, 0.14); --crimson: #fb7185; --crimson-soft: rgba(251, 113, 133, 0.14); --cobalt: #60a5fa;
    --dock-surface: rgba(19, 28, 49, 0.86); --dock-border: rgba(255, 255, 255, 0.09);
  }
}
:root[data-theme="dark"].rep168 {
  --card-bg: #131c31; --card-soft: #19243d; --card-border: rgba(51, 65, 85, 0.72);
  --card-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.5); --ink-primary: #f1f5f9; --ink-secondary: #94a3b8;
  --jade: #2dd4bf; --jade-soft: rgba(45, 212, 191, 0.14); --crimson: #fb7185; --crimson-soft: rgba(251, 113, 133, 0.14); --cobalt: #60a5fa;
  --dock-surface: rgba(19, 28, 49, 0.86); --dock-border: rgba(255, 255, 255, 0.09);
}

/* ---------- tarjetas Bento (las de primer nivel) ---------- */
main.ruta168 > .card {
  background: var(--card-bg) !important;
  border: 1px solid var(--card-border) !important;
  border-radius: 24px !important;
  box-shadow: var(--card-shadow) !important;
  transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, border-color 0.3s ease;
}
main.ruta168.ruta168in > .card, main.ruta168.ruta168in > .cn72 { animation: rutaUp168 0.46s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
main.ruta168.ruta168in > :nth-child(2) { animation-delay: 0.03s; }
main.ruta168.ruta168in > :nth-child(3) { animation-delay: 0.07s; }
main.ruta168.ruta168in > :nth-child(4) { animation-delay: 0.11s; }
main.ruta168.ruta168in > :nth-child(5) { animation-delay: 0.15s; }
main.ruta168.ruta168in > :nth-child(6) { animation-delay: 0.19s; }
@keyframes rutaUp168 { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }

/* ---------- lo ganado hoy → earnings-banner ---------- */
html.rep168 #gan117 {
  background: linear-gradient(135deg, #14532d 0%, #115e59 100%) !important;
  border-radius: 22px !important;
  color: #ffffff !important;
  box-shadow: 0 12px 24px -8px rgba(17, 94, 89, 0.48), inset 0 1px 1px rgba(255, 255, 255, 0.24) !important;
  border: 0 !important;
}
html.rep168 #gan117 .m { font-weight: 800; letter-spacing: -0.025em; }
html.rep168 #gan117 .t { color: #ccfbf1 !important; font-weight: 700; }
html.rep168 #gan117 .x { background: rgba(255, 255, 255, 0.16) !important; color: #fff !important; border-radius: 999px !important; border: 0 !important; }
html.rep168 #gan117 .bar { background: rgba(255, 255, 255, 0.16) !important; border-radius: 999px !important; height: 6px !important; overflow: hidden; }
html.rep168 #gan117 .bar i { background: linear-gradient(90deg, #a7f3d0, #2dd4bf) !important; border-radius: 999px; }

/* ---------- Cliente nuevo / Venta rápida → quick-bento jade / ámbar ---------- */
main.ruta168 .cn72 { display: grid !important; grid-template-columns: 1fr 1fr; gap: 11px !important; }
main.ruta168 .cn72 > button {
  border-radius: 24px !important;
  padding: 15px 12px !important;
  color: #ffffff !important;
  text-align: center;
  display: flex !important; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  box-shadow: 0 12px 24px -8px rgba(15, 23, 42, 0.24), inset 0 1.5px 2px rgba(255, 255, 255, 0.28) !important;
  font-size: 14.5px !important; font-weight: 800 !important; letter-spacing: -0.015em;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}
main.ruta168 .cn72 > button:active { transform: scale(0.95); }
main.ruta168 .cn72 > .nv { background: linear-gradient(145deg, #0f766e 0%, #14532d 100%) !important; }
main.ruta168 .cn72 > .vr { background: linear-gradient(145deg, #d97706 0%, #9a3412 100%) !important; }
main.ruta168 .cn72 > button small { font-size: 11px !important; font-weight: 600; color: rgba(255, 255, 255, 0.88) !important; }
main.ruta168 .cn72 > button .e { display: inline-block; font-size: 26px; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25)); animation: float168 3.4s ease-in-out infinite; }
main.ruta168 .cn72 > .vr .e { animation-name: spark168; animation-duration: 2.2s; }
@keyframes float168 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes spark168 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }

/* ---------- Te quedan en el camión → cargo-bento ---------- */
main.ruta168 > .card.rep1 {
  background: linear-gradient(145deg, rgba(13, 148, 136, 0.11) 0%, var(--card-bg) 72%) !important;
  border-color: rgba(13, 148, 136, 0.28) !important;
}
main.ruta168 .card.rep1 .bx > * {
  background: var(--card-soft);
  border: 1px solid var(--card-border);
  border-radius: 18px;
}
main.ruta168 .card.rep1 .ft { background: var(--jade-soft) !important; color: var(--jade) !important; border-radius: 14px !important; font-weight: 700; }
/* modo oscuro: las letras de esta tarjeta traen un color fijo casi negro (pensado para fondo claro) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) main.ruta168 .card.rep1 *:not(svg):not(svg *) { color: var(--ink-primary) !important; }
  :root:not([data-theme="light"]) main.ruta168 .card.rep1 .ft, :root:not([data-theme="light"]) main.ruta168 .card.rep1 .ft *:not(svg):not(svg *) { color: var(--jade) !important; }
}
:root[data-theme="dark"] main.ruta168 .card.rep1 *:not(svg):not(svg *) { color: var(--ink-primary) !important; }
:root[data-theme="dark"] main.ruta168 .card.rep1 .ft, :root[data-theme="dark"] main.ruta168 .card.rep1 .ft *:not(svg):not(svg *) { color: var(--jade) !important; }

/* ---------- Ordenar con tráfico → traffic-box ---------- */
main.ruta168 .card.rgcard .btn.sec {
  border-radius: 15px !important;
  border: 1px solid var(--card-border) !important;
  background: var(--card-soft) !important;
  color: var(--ink-primary) !important;
  font-weight: 800 !important;
}

/* ---------- Siguiente parada → hero-stop-card ---------- */
main.ruta168 > .card.next {
  background: linear-gradient(155deg, #14532d 0%, #115e59 100%) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  border-radius: 26px !important;
  box-shadow: 0 16px 32px -10px rgba(17, 94, 89, 0.52), inset 0 1.5px 2px rgba(255, 255, 255, 0.22) !important;
}
main.ruta168 > .card.next .lbl { color: #ccfbf1 !important; }
main.ruta168 > .card.next > .lbl:first-child { color: #99f6e4 !important; font-weight: 700; }
main.ruta168 > .card.next img { border-radius: 18px; }
main.ruta168 > .card.next .comtip {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%) !important;
  color: #78350f !important;
  font-weight: 800 !important;
  border-radius: 14px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
}
main.ruta168 > .card.next .btn.sec, main.ruta168 > .card.next .btn.sm.sec {
  background: #ffffff !important; color: #0f172a !important; border: 0 !important; border-radius: 16px !important; font-weight: 800 !important;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.16) !important;
}
main.ruta168 > .card.next .btn:not(.sec) {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important; color: #ffffff !important; border: 0 !important; border-radius: 16px !important;
  font-weight: 800 !important; box-shadow: 0 8px 18px rgba(180, 83, 9, 0.42), inset 0 1px 1px rgba(255, 255, 255, 0.35) !important;
}
main.ruta168 > .card.next a { color: #ffffff; }

/* ---------- paradas → stop-row-item ---------- */
main.ruta168 .stop { border-bottom: 1px solid var(--card-border) !important; padding: 12px 0 !important; }
main.ruta168 .stop:last-child { border-bottom: 0 !important; }
main.ruta168 .stop .num {
  background: linear-gradient(145deg, #15803d 0%, #0f766e 100%) !important; color: #ffffff !important; border: 0 !important;
  box-shadow: 0 4px 10px rgba(15, 118, 110, 0.32), inset 0 1px 1px rgba(255, 255, 255, 0.3);
}
main.ruta168 .stop .btn.sm:not(.sec) {
  background: linear-gradient(135deg, #15803d 0%, #0f766e 100%) !important; color: #fff !important; border: 0 !important; border-radius: 14px !important;
  font-weight: 800 !important; box-shadow: 0 6px 14px rgba(15, 118, 110, 0.34) !important;
}
main.ruta168 .stop .btn.sm.sec { border-radius: 14px !important; background: var(--card-soft) !important; border: 1px solid var(--card-border) !important; font-weight: 800 !important; }

/* ---------- botones sueltos → secondary-action ---------- */
main.ruta168 > .btn.sec, main.ruta168 > div > .btn.sec, main.ruta168 > details.card {
  border-radius: 18px !important;
  border: 1px solid var(--card-border) !important;
  background: var(--card-bg) !important;
  font-weight: 800 !important;
  box-shadow: var(--card-shadow) !important;
}
main.ruta168 .btn:active, main.ruta168 .step button:active { transform: scale(0.95); }

/* ---------- Entrega ---------- */
main.ruta168 > .link[data-act="entvolver"] { color: var(--cobalt) !important; font-weight: 800 !important; text-decoration: none !important; }
main.ruta168 > .card.autocard {
  border-radius: 999px !important; padding: 10px 16px !important; text-align: center;
}
main.ruta168 > .card.autocard .lbl { font-weight: 700; color: var(--ink-secondary); }
main.ruta168 [data-x="ent125hd"] .wz-hd i { height: 6px !important; border-radius: 999px !important; background: rgba(148, 163, 184, 0.25) !important; }
main.ruta168 [data-x="ent125hd"] .wz-hd i.on { background: linear-gradient(90deg, #15803d, #0d9488) !important; }
main.ruta168 .field .step button {
  width: 38px !important; height: 38px !important; min-height: 38px !important; border-radius: 13px !important;
  border: 1px solid var(--card-border) !important; background: var(--card-soft) !important; color: var(--ink-primary) !important; font-weight: 800 !important;
  transition: transform 0.18s ease;
}
main.ruta168 .field .step button.plus {
  border: 0 !important; background: linear-gradient(135deg, #15803d 0%, #0f766e 100%) !important; color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.34) !important;
}
main.ruta168 .field .step input { border-radius: 13px !important; font-weight: 800 !important; border: 1px solid var(--card-border) !important; background: var(--card-bg) !important; }
main.ruta168 .entbar {
  background: var(--card-bg) !important;
  border: 2px solid #15803d !important;
  border-radius: 24px !important;
  box-shadow: 0 16px 34px -8px rgba(15, 23, 42, 0.24) !important;
}
main.ruta168 .entbar .btn:not(.sec) {
  background: linear-gradient(135deg, #15803d 0%, #0f766e 100%) !important; color: #ffffff !important; border: 0 !important; border-radius: 17px !important;
  font-weight: 800 !important; box-shadow: 0 8px 18px rgba(15, 118, 110, 0.4) !important;
}

/* ---------- barra del chofer → floating-dock (los mismos botones) ---------- */
html.rep168 nav.tabs {
  background: var(--dock-surface) !important;
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  backdrop-filter: blur(22px) saturate(180%);
  border: 1px solid var(--dock-border) !important;
  border-radius: 9999px !important;
  box-shadow: 0 16px 36px -8px rgba(15, 23, 42, 0.16), 0 4px 12px -2px rgba(15, 23, 42, 0.06) !important;
  padding: 5px !important;
}
html.rep168 nav.tabs button { border-radius: 9999px !important; border-top: 0 !important; transition: background 0.3s ease, color 0.28s ease, transform 0.15s ease; }
html.rep168 nav.tabs button:active { transform: scale(0.92); }
html.rep168 nav.tabs button[aria-pressed="true"] {
  background: linear-gradient(135deg, #1b7a38 0%, #248a41 55%, #15662d 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 8px 20px -4px rgba(15, 118, 110, 0.48), inset 0 1.5px 2px rgba(255, 255, 255, 0.35);
}
html.rep168 nav.tabs button[aria-pressed="true"] svg { color: #ffffff !important; }
`;

(function () {
  if (document.getElementById('css168')) return;
  var st = document.createElement('style');
  st.id = 'css168';
  st.textContent = RUTA168_CSS;
  document.head.appendChild(st);
})();

var _ruta168Ult = '';
function ruta168() {
  try {
    var m = document.querySelector('main'), h = document.documentElement;
    var es = S.role === 'rep' && S.tab && (S.tab.rep === 'ruta' || S.tab.rep === 'entrega');
    var vista = S.role + ':' + (S.tab && S.tab[S.role]) + ':' + (S.tab && S.tab.rep === 'entrega' ? (S.cur != null ? S.cur : '') : '');
    var llega = vista !== _ruta168Ult;
    _ruta168Ult = vista;
    if (S.role === 'rep') h.classList.add('rep168'); else h.classList.remove('rep168');
    if (!m) return;
    if (es) {
      m.classList.add('ruta168');
      if (llega) { m.classList.add('ruta168in'); setTimeout(function () { var x = document.querySelector('main.ruta168in'); if (x) x.classList.remove('ruta168in'); }, 900); }
      else m.classList.remove('ruta168in');
    } else {
      m.classList.remove('ruta168', 'ruta168in');
    }
  } catch (e) { console.error('ruta168', e); }
}
var _rd168 = render;
render = function () { var r = _rd168.apply(this, arguments); ruta168(); return r; };
