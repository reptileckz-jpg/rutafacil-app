#!/bin/bash
# La versión del APK (www/index.html) ya la deja el armado (capas/build.sh o "npm run build"). Se queda por costumbre.
exec bash "$(dirname "$0")/capas/build.sh"
