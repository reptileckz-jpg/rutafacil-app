const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
const T=['RF1','Hola mundo','https://rutafacil.app/c/12345','CORTE|Danu|2026-11-07|E:12500|B:1000x3,500x10,200x20|bolsa:A123|v:XYZ123'+'x'.repeat(150),'ñandú café plátano'];
for(let i=0;i<T.length;i++){const d=await p.evaluate(t=>{var c=document.createElement('canvas');c.width=c.height=700;var x=c.getContext('2d');QR.canvas(x,t,0,0,700);return c.toDataURL()},T[i]);fs.writeFileSync('/tmp/claude-0/-home-claude/0fa80c8a-70b4-519a-be68-4797b9c63231/scratchpad/qr'+i+'.png',Buffer.from(d.split(',')[1],'base64'))}
await b.close()})();
