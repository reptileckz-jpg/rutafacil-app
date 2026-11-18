/* Migración · tema "Fichas del personal y de clientes": compara la app de ANTES con la NUEVA (mismos casos = idéntico).
   Uso: node comp-fichas.js ANTES.html NUEVO.html   (se corre con la demo y con la real) */
const {chromium}=require('playwright');
async function corre(b,url){const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('dialog',d=>d.accept());
 await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12;Math.random=(function(){var x=7;return function(){x=(x*16807)%2147483647;return (x-1)/2147483646}})();Date.now=(function(){var t=1794979200000;return function(){return t+=1000}})()});
 await p.goto('file://'+url);await p.waitForTimeout(1000);
 const out=await p.evaluate(()=>{var out={};var T=function(k,f){try{out[k]=f()}catch(e){out[k]='ERR '+e.message}};var plano=function(h){var d=document.createElement('div');d.innerHTML=h||'';return d.innerText.replace(/\d{1,2}:\d\d/g,'HH:MM')+' |#'+d.querySelectorAll('[data-act]').length};
  if(window.PN_MODO==='vacio'){var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Chofer Uno',puesto:'chofer',tel:'1'},{n:'Bodeguero',puesto:'bodega',tel:'2'}];
   U.cli=[{n:'Cliente Uno',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'},{n:'Cliente Dos',a:'y',tel:'6640000002',dias:[1,3],cred:900,vac:3,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar()}
  S.role='admin';S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};var ch1=S.choferes.filter(function(c){return esCh(c)&&!esAdm(c)})[0];
  /* un permiso pendiente de fiar y uno de mayoreo */
  S.permisos=(S.permisos||[]).concat([{c:S.cli[0].id,ch:ch1.id,est:'pend',t:'fiar',m:500,f:iso(TODAY),h:'10:00'},{c:S.cli[1].id,ch:ch1.id,est:'pend',t:'may',f:iso(TODAY),h:'10:05'}]);
  var TABS=['dat','pap','ref','ruta','sue','his','cre','pag','gas','res','bie','cta','mas','vis','det'];
  S.choferes.forEach(function(c){TABS.forEach(function(tb){S.fiTab['emp:'+c.id]=tb;T('emp·'+c.id+'·'+tb,function(){return plano(fiEmp({t:'emp',key:'openCh',id:c.id}))})})});
  S.cli.slice(0,8).forEach(function(c){TABS.forEach(function(tb){S.fiTab['cli:'+c.id]=tb;T('cli·'+c.id+'·'+tb,function(){return plano(fiCli({t:'cli',key:'openCli',id:c.id}))})});T('may·'+c.id,function(){return plano(mayHistHTML(c))})});
  T('permisos',function(){return plano(permsHTML())});
  /* las pantallas completas */
  S.tab.admin='inicio';render();T('inicio',function(){return document.querySelector('main').innerText.replace(/\d{1,2}:\d\d/g,'HH:MM')});
  S.tab.admin='personal';S.openCh=ch1.id;render();T('pantalla·emp',function(){var o=document.getElementById('fiov');return o?o.innerText:''});S.openCh=null;
  S.tab.admin='clientes';S.openCli=S.cli[1].id;render();T('pantalla·cli',function(){var o=document.getElementById('fiov');return o?o.innerText:''});S.openCli=null;
  return out});
 await p.close();return {out,errs}}
(async()=>{const [A,N]=process.argv.slice(2);const b=await chromium.launch();const a=await corre(b,A),n=await corre(b,N);await b.close();
 const K=[...new Set(Object.keys(a.out).concat(Object.keys(n.out)))];let dif=0;
 for(const k of K){const x=JSON.stringify(a.out[k]),y=JSON.stringify(n.out[k]);if(x!==y){dif++;if(dif<=8)console.log('DIF',k,'\n antes:',String(x).slice(0,300),'\n nuevo:',String(y).slice(0,300))}}
 console.log(K.length+' casos · '+dif+' diferencias · errores antes '+a.errs.length+' / nuevo '+n.errs.length+(n.errs.length?' '+n.errs.slice(0,2).join(' | '):''));
 console.log(dif===0&&n.errs.length<=a.errs.length?'IDÉNTICO':'DISTINTO')})();
