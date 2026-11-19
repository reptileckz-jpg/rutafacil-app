#!/bin/bash
# Arma la app con el armado de Vite (fuente/vite/armar.mjs): las capas en el orden de capas/orden.json y los cambios de texto de
# fuente/vite/parches.mjs sobre base-v38.html. Deja la demo y la real en OUT (por defecto /mnt/user-data/outputs, o dist-vite/ si no
# existe) y la del APK en www/index.html. Es lo mismo que "npm run build" (Vite), sin pasar por Vite.
# Si un cambio de texto no encuentra lo que busca o el script tiene un error de sintaxis, se DETIENE y no cambia nada.
R="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="${OUT:-/mnt/user-data/outputs}"; [ -d "$OUT" ] || OUT="$R/dist-vite"
T="$(mktemp -d)"
if ! node "$R/fuente/vite/armar.mjs" "$T"; then echo "FALLÓ EL ARMADO: no se cambió nada de la salida (revisa el mensaje de arriba)"; rm -rf "$T"; exit 1; fi
mkdir -p "$OUT"
cp "$T/prototipo-platanos.html" "$T/platanos-primera-vez.html" "$OUT/" && cp "$T/www-index.html" "$R/www/index.html" && rm -rf "$T"
echo "SYNTAX OK · $OUT/prototipo-platanos.html · $OUT/platanos-primera-vez.html · www/index.html"
