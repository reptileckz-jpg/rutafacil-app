#!/bin/bash
# mide el avance de la migración: cuántas envolturas ("var _x=f; f=function") quedan en las capas viejas
cd "$(dirname "$0")"
T=$(grep -ohE "var _[A-Za-z0-9]+=([A-Za-z0-9_]+);\1=function" l*.js | wc -l)
echo "Envolturas que quedan en capas viejas: $T (al empezar: 568)"
echo "Avance: $(( (568-T)*100/568 ))%"
for f in render ajHTML setupHTML ruta avisos avDestino inicio entrega fresh nbAplica toast; do printf "  %-10s %s\n" $f $(grep -ohE "var _[A-Za-z0-9]+=$f;$f=function" l*.js | wc -l); done
