import re,sys
P='/mnt/user-data/outputs/prototipo-platanos.html'
D='/tmp/claude-0/-home-claude/0fa80c8a-70b4-519a-be68-4797b9c63231/scratchpad/v40src/'
s=open(D+'../v38.bak.html',encoding='utf-8').read()
def R(old,new,cnt=1):
    global s
    n=s.count(old)
    if n!=cnt:
        print('COUNT',n,'!=',cnt,'for:',old[:160]);sys.exit(1)
    s=s.replace(old,new)
def F(name):
    global s
    i=s.index('\nfunction '+name+'(')
    m=re.compile(r'\n(function |var |/\*)').search(s,i+1)
    s=s[:i+1]+s[m.start()+1:]
def FR(name,old,new):
    global s
    i=s.index('\nfunction '+name+'(')
    m=re.compile(r'\n(function |var |/\*)').search(s,i+1)
    body=s[i:m.start()]
    if old not in body:
        print('FR miss',name);sys.exit(1)
    s=s[:i]+body.replace(old,new)+s[m.start():]
def LIB(fn):
    R("/* ---------- Estructura ---------- */",open(D+fn,encoding='utf-8').read()+"\n/* ---------- Estructura ---------- */")
R('Control de reparto · v3.8',"Control de reparto · v'+APP_VER+'")
for part in sys.argv[1:]:
    exec(open(D+part,encoding='utf-8').read())
open(P,'w',encoding='utf-8').write(s)
print('OK',len(s))
