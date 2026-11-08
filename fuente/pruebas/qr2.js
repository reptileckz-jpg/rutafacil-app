const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
const L=[20,30,40,50,60,70,80,100,120,140,160,200,240,300];
for(const n of L){const d=await p.evaluate(n=>{var t='A'.repeat(n);var q=QR.encode(t);var c=document.createElement('canvas');c.width=c.height=600;QR.canvas(c.getContext('2d'),t,0,0,600);return [q.n,c.toDataURL()]},n);fs.writeFileSync('/tmp/claude-0/-home-claude/0fa80c8a-70b4-519a-be68-4797b9c63231/scratchpad/qq'+n+'.png',Buffer.from(d[1].split(',')[1],'base64'));console.log(n,(d[0]-17)/4)}
await b.close()})();
