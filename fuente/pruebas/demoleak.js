const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{var out=[];var M=/Roly|Josue|Danu|Fruver|Freightliner|Pedro Mota|Rafa\b|Lupita|2026-10-[0-3]\d|2026-09|2025-/;
 function walk(o,path,d){if(d>6||o==null)return;if(typeof o==='string'){if(M.test(o)&&!/^data:/.test(o))out.push(path+' = '+o.slice(0,80));return}if(typeof o!=='object')return;
  if(Array.isArray(o)){if(o.length&&path.split('.').length<3)out.push(path+' : array['+o.length+']');o.forEach(function(x,i){walk(x,path+'['+i+']',d+1)});return}
  Object.keys(o).forEach(function(k){if(M.test(k))out.push(path+'.'+k+' (llave)');walk(o[k],path+'.'+k,d+1)})}
 walk(S,'S',0);var g=[];Object.keys(S).forEach(function(k){var v=S[k];if(v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length&&['cfg','inv','salida','cierre','tab','dOpen','precio','setup','fiTab','pinOk','pins','invB','lotesB','cajaCfg','cj','rm','pf','rev','tutVisto','popVisto','rp','d'].indexOf(k)<0)g.push(k+':'+JSON.stringify(v).slice(0,60))});
 return out.concat(['--- objetos con datos:'],g)});
console.log(r.join('\n'));console.log(await p.evaluate(()=>JSON.stringify({admins:S.admins,bods:S.bods,vlProd:S.vlProd,lc:S.loteCierres,clima:S.clima})));await b.close()})();
