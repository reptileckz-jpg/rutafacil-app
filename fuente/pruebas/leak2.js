const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{var M=/Roly|Josue|Danu|Fruver|Freightliner|Pedro Mota|2026-10-[0-3]\d|2026-09/;var out=[];(function w(o,pa,d){if(d>6||o==null)return;if(typeof o==='string'){if(M.test(o)&&!/^data:/.test(o))out.push(pa+'='+o.slice(0,50));return}if(typeof o!=='object')return;Object.keys(o).forEach(function(k){if(M.test(k))out.push(pa+'.'+k);w(o[k],pa+'.'+k,d+1)})})(S,'S',0);return out});
console.log(r.length?'FAIL quedan datos de la demo: '+r.join(' | '):'OK   versión real sin datos de la demo');await b.close()})();
