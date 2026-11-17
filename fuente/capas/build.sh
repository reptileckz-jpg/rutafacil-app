cd /tmp/claude-0/-home-claude/0fa80c8a-70b4-519a-be68-4797b9c63231/scratchpad/v40src
python3 - <<'PY'
import json
D='./'
im=json.load(open(D+'imgs.json'))
src=''
for f in ['l1.js','l2.js','l3.js','l4.js','l5.js','l6.js','l6b.js','l7.js','l8.js','l9.js','l10.js','l11.js','l12.js','l13.js','l14.js','l15.js','l16.js','l17.js','l18.js','l19.js','l20.js','l21.js','l22.js','l23.js','l24.js','l25.js','l26.js','l27.js','l28.js','l29.js','l30.js','l31.js','l32.js','l33.js','l34.js','l35.js','l36.js','l37.js','l38.js','l39.js','l40.js','l41.js','l42.js','l43.js','l44.js','l45.js','l46.js','l47.js','l48.js','l49.js','l50.js','l51.js','l52.js','l53.js','l54.js','l55.js','l56.js','l57.js','l58.js','l59.js','l60.js','l61.js','l62.js','l63.js','l64.js','l65.js','l66.js','l67.js','l68.js','l69.js','l70.js','l71.js','l72.js','l73.js','l74.js','l75.js','l76.js','l77.js','l78.js','l79.js','l80.js','l81.js','l82.js','l83.js','l84.js','l85.js','l86.js']:src+=open(D+f,encoding='utf-8').read()+'\n'
for k,v in im.items():src=src.replace('__IMG_'+k+'__',v)
open(D+'libl.js','w',encoding='utf-8').write(src)
PY
python3 patch39.py ql.py && python3 -c "
import re;s=open('/mnt/user-data/outputs/prototipo-platanos.html',encoding='utf-8').read()
sc=re.findall(r'<script>(.*?)</script>',s,re.S);open('x.js','w').write(max(sc,key=len))" && node --check x.js && echo SYNTAX OK
python3 - <<'PY'
s=open('/mnt/user-data/outputs/prototipo-platanos.html',encoding='utf-8').read()
s=s.replace('<title>Prototipo Plátanos</title>','<title>Plátanos · primera vez</title>\n<script>window.PN_MODO="vacio"</script>',1)
open('/mnt/user-data/outputs/platanos-primera-vez.html','w',encoding='utf-8').write(s)
PY
