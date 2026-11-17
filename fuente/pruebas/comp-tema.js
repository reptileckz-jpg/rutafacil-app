const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext()).newPage();await p.addInitScript(()=>{window.__pnTest=1});await p.goto(url);await p.waitForTimeout(800);
return await p.evaluate(()=>{var out={};function prep(){var U=S.setup;U.veh=[{n:'NP300',pl:'A1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'},{n:'Beto',puesto:'chofer',tel:'2'}];
 U.cli=[{n:'C1',a:'x',tel:'1',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'C2',a:'y',tel:'2',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'1'}];U.prov=[];S.precio.R=300;S.precio.M=20;suAplicar()}
 prep();var snap0=JSON.stringify(S);var ayer=iso(new Date(TODAY.getTime()-864e5));
 function limpia(o){return JSON.parse(JSON.stringify(o,function(k,v){if(k==='h'||k==='t'&&typeof v==='string'&&/\d:\d/.test(v)||k==='id'&&typeof v==='string')return 0;return v}))}
 function pick(){return limpia({stops:(S.stops||[]).map(s=>s.c),dia80:S.dia80,rd:S.rutaDia80,hist:S.rutasHist,av:S.avPrecio,chSt:Object.keys(S.chSt||{}).map(k=>[k,S.chSt[k].rutaDia80,(S.chSt[k].stops||[]).length]),tab:S.tab,html:dia80HTML(),lib:porLib86(),pend:typeof PEND81!=='undefined'?PEND81:null,mes:(S.cli||[]).map(c=>[c.mesR,c.mesM])})}
 var chs=S.choferes.filter(c=>esCh(c)).map(c=>c.id);
 [['salio',true,false,[1]],['nosalio',false,false,[1]],['nosalio-sinlog',false,false,[]],['envio',true,true,[1]]].forEach(function(cs){S=JSON.parse(snap0);var ch=chs[0];S.role='rep';S.chofHoy=ch;arLoad(chNuevo(ch));S.rutaDia80=ayer;S.salida.ok=cs[1];S.cierre.sent=cs[2];S.log=cs[3].map(x=>({c:x,R:1}));var r=rutaRenueva80();out['ren-'+cs[0]]=[r,pick()]});
 S=JSON.parse(snap0);S.role='admin';S.chofHoy=chs[0];arLoad(chNuevo(chs[0]));S.chSt={};S.chSt[chs[1]]=chNuevo(chs[1]);S.chSt[chs[1]].rutaDia80=ayer;S.chSt[chs[1]].salida.ok=true;S.chSt[chs[1]].log=[{c:1,R:2}];S.rutaDia80=ayer;S.cli.forEach(c=>{c.mesR=5});
 try{_nbDiaOk=true}catch(e){}cambioDeDia('2026-10-31');out.cdd=pick();out.cddHTML=(function(){S.tab.admin='inicio';render();var d=document.querySelector('[data-x="dia80a"]');return d&&d.textContent})();
 S=JSON.parse(snap0);S.role='admin';cambioDeDia(iso(TODAY));out.cddHoy=pick();
 return out})}
(async()=>{const b=await chromium.launch();const a=await corre(b,'file://'+process.argv[2]),n=await corre(b,'file://'+process.argv[3]);
let d=0;for(const k of Object.keys(a)){const x=JSON.stringify(a[k]),y=JSON.stringify(n[k]);if(x!==y){d++;console.log('DIFERENTE',k,'\n A:',x.slice(0,600),'\n N:',y.slice(0,600))}else console.log("igual",k,x.slice(0,260))}console.log(d?'HAY DIFERENCIAS':'TODO IGUAL');await b.close()})();
