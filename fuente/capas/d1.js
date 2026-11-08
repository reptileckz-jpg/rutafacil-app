const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(400);
console.log(await p.evaluate(()=>{var o={};var VB=VBLANK();o.veh=S.veh.map(v=>({id:v.id,n:v.n,empty:Object.keys(VB).filter(k=>v[k]==null||v[k]===''),tipo:v.tipo,extra:Object.keys(v).filter(k=>!(k in VB)).join(',')}));
 o.cli=S.cli.filter(c=>!c.oculto).map(c=>[c.id,c.n,['tel','a','tipo','recibe','foto','hA','hC','lat'].filter(k=>c[k]==null||c[k]==='')]).filter(x=>x[2].length);
 o.cliKeys=Object.keys(S.cli[0]).join(',');
 o.prov=provNames().map(n=>[n,Object.keys(provD(n)).join(','),['tel','dir','nota','foto'].filter(k=>!provD(n)[k])]);
 o.vlProdUI=!!document.body.innerHTML.match(/vlProd\./);o.hist=S.hist.slice(0,2);o.cajaCierres=S.cajaCierres;o.plant=S.plantillas.map(x=>x.n);o.basc=(S.basc||[]).map(x=>[x.n,!!x.foto]);
 return JSON.stringify(o,null,1)}));await b.close()})();
