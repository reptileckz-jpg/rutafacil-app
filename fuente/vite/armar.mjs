/* ===================== Armado de la app en Node (lo usa Vite) =====================
   Hace lo mismo que el armado viejo (capas/build.sh + patch39.py + ql.py + mapa.py + www.sh), sin Python:
   1. Junta las capas en el orden de capas/orden.json (cada una con su marca //@@capa) y pone las imágenes de capas/imgs.json.
   2. Le hace a la base (base-v38.html) los cambios de parches.mjs; en ["LIB"] mete la librería. Si un cambio no encuentra su texto
      (o lo encuentra otro número de veces), se DETIENE con el mensaje (como "FALLÓ EL ARMADO").
   3. Revisa que el script se pueda leer (sintaxis).
   4. Saca cuatro versiones: demo (prototipo-platanos.html), real (platanos-primera-vez.html, PN_MODO="vacio"), la del APK (www/index.html,
      la real con Leaflet, Firebase y Google Maps) y la web (web-index.html: la del APK + manifiesto e íconos para instalarla en la computadora). A cada una le anota el mapa de errores (en qué renglón empieza cada capa).
   Uso directo: node fuente/vite/armar.mjs [carpeta]  → escribe las tres versiones (sin carpeta: dist-vite/). */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import parches from './parches.mjs';

export const AQUI = path.dirname(fileURLToPath(import.meta.url));
export const FUENTE = path.resolve(AQUI, '..');
export const CAPAS = path.join(FUENTE, 'capas');

function lee(p) { return fs.readFileSync(p, 'utf8'); }
function cuenta(s, x) { let n = 0, i = 0; while ((i = s.indexOf(x, i)) !== -1) { n++; i += x.length; } return n; }

export function libreria(capas = CAPAS) {
  const orden = JSON.parse(lee(path.join(capas, 'orden.json')));
  const im = JSON.parse(lee(path.join(capas, 'imgs.json')));
  let src = '';
  for (const f of orden) src += '//@@capa ' + f + '\n' + lee(path.join(capas, f)) + '\n';
  for (const k of Object.keys(im)) src = src.split('__IMG_' + k + '__').join(im[k]);
  return src;
}

export function mapa(s) {
  const L = [];
  s.split('\n').forEach((x, i) => { const m = /^\/\/@@capa (\S+)$/.exec(x); if (m) L.push([i + 1, m[1]]); });
  const t = 'var CAPAS77=' + JSON.stringify(L) + ';/*@@MAPA*/';
  let n = 0;
  const s2 = s.replace(/var CAPAS77=\[[^\n]*?\];\/\*@@MAPA\*\//g, () => { n++; return t; });
  if (n !== 1) throw new Error('FALLÓ EL ARMADO: sin lugar para el mapa de errores (' + n + ')');
  return s2;
}

export function armar(op = {}) {
  let s = lee(op.base || path.join(FUENTE, 'base-v38.html'));
  const lib = libreria(op.capas || CAPAS);
  for (const p0 of (op.parches || parches)) {
    // (no se cambia la lista de parches: en el servidor de prueba se vuelve a armar cada vez que cambia una capa)
    const p = p0[0] === 'LIB' ? ['R', '/* ---------- Estructura ---------- */', lib + '\n/* ---------- Estructura ---------- */', 1] : p0;
    const [, viejo, nuevo, cnt] = p;
    const n = cuenta(s, viejo);
    if (n !== cnt) throw new Error('FALLÓ EL ARMADO: el cambio esperaba ' + cnt + ' y encontró ' + n + ' en: ' + viejo.slice(0, 160));
    s = s.split(viejo).join(nuevo);
  }
  // el script grande se tiene que poder leer
  const scripts = [...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const grande = scripts.reduce((a, b) => (b.length > a.length ? b : a), '');
  try { new vm.Script(grande, {filename: 'app.js'}); } catch (e) { throw new Error('FALLÓ EL ARMADO: el script tiene un error de sintaxis: ' + e.message); }
  const demo = s;
  const t0 = '<title>Prototipo Plátanos</title>';
  if (cuenta(demo, t0) < 1) throw new Error('FALLÓ EL ARMADO: no está el título');
  const real = demo.replace(t0, '<title>Plátanos · primera vez</title>\n<script>window.PN_MODO="vacio"</script>');
  const a = '<script>window.PN_MODO="vacio"</script>';
  const www = real.replace(a, a + '\n<link rel="stylesheet" href="leaflet/leaflet.css">\n<script src="leaflet/leaflet.js"></script>\n<script src="firebase.js"></script>\n<script src="mapas-cfg.js"></script>\n<script src="mapas.js"></script>');
  // 164 · la versión web (para la computadora, se instala desde Chrome o Edge): la del APK + manifiesto, íconos y el trabajador que la deja abrir sin internet
  const tw = '<title>Plátanos · primera vez</title>';
  if (cuenta(www, tw) !== 1) throw new Error('FALLÓ EL ARMADO: no está el título de la versión real');
  const web = www.replace(tw, '<title>Plátanos Nietos · Ruta Fácil</title>\n<link rel="manifest" href="manifest.webmanifest">\n<meta name="theme-color" content="#2F7D32">\n<link rel="icon" type="image/png" href="favicon.png">\n<link rel="apple-touch-icon" href="iconos/apple-touch-icon.png">\n<script>window.PN_WEB=true;if(\'serviceWorker\' in navigator)window.addEventListener(\'load\',function(){navigator.serviceWorker.register(\'sw.js\').catch(function(){})})</script>');
  return {demo: mapa(demo), real: mapa(real), www: mapa(www), web: mapa(web)};
}

export const SALIDAS = {demo: 'prototipo-platanos.html', real: 'platanos-primera-vez.html', www: 'www-index.html', web: 'web-index.html'};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = path.resolve(process.argv[2] || path.join(FUENTE, '..', 'dist-vite'));
  fs.mkdirSync(dir, {recursive: true});
  const r = armar();
  for (const k of Object.keys(SALIDAS)) fs.writeFileSync(path.join(dir, SALIDAS[k]), r[k]);
  console.log('OK · ' + Object.values(SALIDAS).map(f => path.join(dir, f)).join(' · '));
}
