/* Vite para Ruta Fácil.
   - npm run dev    → servidor de prueba: http://localhost:5173/ (demo), /primera-vez.html (real), /www.html (la del APK).
                      Al guardar cualquier capa (fuente/capas) o la base, la página se vuelve a armar y se recarga sola.
   - npm run build  → dist-vite/: prototipo-platanos.html, platanos-primera-vez.html, www-index.html; y copia la del APK a www/index.html.
   La app se arma con fuente/vite/armar.mjs (mismas capas, mismo orden, mismos cambios que el armado viejo; sale idéntica byte por byte).
   Las capas siguen siendo scripts clásicos (no módulos): Vite no las parte ni las reescribe. */
import {defineConfig} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import {armar, AQUI, FUENTE, SALIDAS} from './armar.mjs';

const RAIZ = path.resolve(FUENTE, '..');
const SALIDA = path.join(RAIZ, 'dist-vite');

function rutaFacil() {
  let cache = null;
  const arma = () => (cache = cache || armar());
  return {
    name: 'ruta-facil',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const m = /<!-- ruta-facil:(demo|real|www)/.exec(html);
        if (!m) return html;
        let h = arma()[m[1]];
        // solo en el servidor de prueba: la base no trae <head> propio y Vite mete su cliente de recarga en el primer <head> que ve
        // (que está dentro de un texto del código). Se le pone uno real al principio. El armado final (npm run build) no cambia.
        if (ctx && ctx.server) {
          const ih = h.search(/<head[\s>]/i), is = h.search(/<script[\s>]/i);
          if (ih === -1 || (is > -1 && is < ih)) h = '<head>' + h;
        }
        return h;
      }
    },
    configureServer(server) {
      const ver = [path.join(FUENTE, 'capas'), path.join(FUENTE, 'base-v38.html'), path.join(AQUI, 'parches.mjs')];
      server.watcher.add(ver);
      server.watcher.on('all', (ev, f) => { if (process.env.RF_DEBUG) console.log('[rf]', ev, f);
        if (ver.some((v) => f.startsWith(v))) { cache = null; server.ws.send({type: 'full-reload'}); }
      });
    },
    // en vite build: la salida es exactamente lo que da armar() (Vite no le toca nada), con los nombres de siempre
    generateBundle(_o, bundle) {
      const r = arma();
      for (const k of Object.keys(bundle)) delete bundle[k];
      for (const k of Object.keys(SALIDAS)) this.emitFile({type: 'asset', fileName: SALIDAS[k], source: r[k]});
    },
    closeBundle() {
      for (const f of ['index.html', 'primera-vez.html', 'www.html']) fs.rmSync(path.join(SALIDA, f), {force: true});
      const w = path.join(SALIDA, SALIDAS.www);
      if (fs.existsSync(w)) fs.copyFileSync(w, path.join(RAIZ, 'www', 'index.html'));
    }
  };
}

export default defineConfig({
  root: AQUI,
  plugins: [rutaFacil()],
  logLevel: 'error', // los avisos de "can't be bundled" son esperados: Leaflet, Firebase y Mapas se cargan como scripts clásicos
  build: {
    outDir: SALIDA,
    emptyOutDir: true,
    rollupOptions: {input: {demo: path.join(AQUI, 'index.html'), real: path.join(AQUI, 'primera-vez.html'), www: path.join(AQUI, 'www.html')}}
  },
  server: {port: 5173, strictPort: false}
});
