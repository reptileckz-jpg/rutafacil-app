#!/bin/bash
# 164 · Arma la versión web en web-publica/ (lo mismo que hace el flujo "Publicar la web" de GitHub antes de subirla a Firebase Hosting).
# Uso: bash fuente/web.sh [versión]   (necesita npm install hecho)
set -e
R="$(cd "$(dirname "$0")/.." && pwd)"; cd "$R"; V="${1:-local}"
npm run build >/dev/null
rm -rf web-publica && mkdir -p web-publica/leaflet
cp dist-vite/web-index.html web-publica/index.html
cp -r web-extra/. web-publica/
npx esbuild nube/entrada.js --bundle --minify --format=iife --target=es2020 --outfile=web-publica/firebase.js --log-level=warning
npx esbuild nube/mapas.js --bundle --minify --format=iife --target=es2020 --outfile=web-publica/mapas.js --log-level=warning
echo "window.PN_GMAPS=false" > web-publica/mapas-cfg.js
cp node_modules/leaflet/dist/leaflet.js node_modules/leaflet/dist/leaflet.css web-publica/leaflet/
sed -i "s/__VER__/$V/" web-publica/sw.js
echo "web-publica/ lista (versión $V):"; ls web-publica
