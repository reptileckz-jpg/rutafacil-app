#!/bin/bash
# copia la versión "primera vez" a la app de Android con Leaflet y Firebase
python3 - <<'P'
s=open('/mnt/user-data/outputs/platanos-primera-vez.html').read()
a='<script>window.PN_MODO="vacio"</script>'
assert a in s
s=s.replace(a,a+'\n<link rel="stylesheet" href="leaflet/leaflet.css">\n<script src="leaflet/leaflet.js"></script>\n<script src="firebase.js"></script>\n<script src="mapas-cfg.js"></script>\n<script src="mapas.js"></script>',1)
open('/home/claude/rutafacil-app/www/index.html','w').write(s)
P
python3 /tmp/claude-0/-home-claude/0fa80c8a-70b4-519a-be68-4797b9c63231/scratchpad/v40src/mapa.py /home/claude/rutafacil-app/www/index.html
