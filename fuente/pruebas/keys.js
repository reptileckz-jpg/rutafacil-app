const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.addInitScript(()=>{window.__pnTest=1});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(600);
const r=await p.evaluate(()=>{var o={};Object.keys(S).forEach(k=>{var v=S[k],t=Array.isArray(v)?'arr'+(v.length&&v[0]&&typeof v[0]==='object'?(v.every(x=>x&&x.id!=null)?'#id':'#obj'):''):(v===null?'null':typeof v);var s=0;try{s=JSON.stringify(v).length}catch(e){s=-1}o[k]=t+':'+s+(AR_K.indexOf(k)>-1?' R':'')});return {o:o,AR:AR_K,TR:PN_TRANS}});
console.log(JSON.stringify(r));await b.close()})();
