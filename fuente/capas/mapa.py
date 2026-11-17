# mapa de errores: anota en el HTML armado en qué renglón empieza cada capa (marcas //@@capa lNN.js)
import re,sys
for P in sys.argv[1:]:
    s=open(P,encoding='utf-8').read()
    L=[[i+1,m.group(1)] for i,x in enumerate(s.split('\n')) for m in [re.match(r'//@@capa (\S+)$',x)] if m]
    t='var CAPAS77='+repr(L).replace("'",'"').replace(' ','')+';/*@@MAPA*/'
    s2,n=re.subn(r'var CAPAS77=\[[^\n]*?\];/\*@@MAPA\*/',lambda m:t,s)
    assert n==1,('sin lugar para el mapa',P,n)
    open(P,'w',encoding='utf-8').write(s2);print('mapa',P,len(L),'capas')
