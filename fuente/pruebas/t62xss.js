const {chromium}=require('playwright');
/* 33 · textos peligrosos: ningún texto libre se ejecuta ni rompe la pantalla */
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const errs=[];const p=await b.newPage({viewport:{width:400,height:860}});p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>{errs.push('dialog '+d.message());d.dismiss()});
await p.addInitScript(()=>{window.__pnTest=1;window.__xss=0});await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);
await ev(()=>{const X=i=>'Ñandú "'+i+'" <img src=x onerror="window.__xss++"><svg onload="window.__xss++"></svg>\'";</script><b>'+i+'</b> & < > ´';
 window.__X=X;S.role='admin';S.encOn=false;S.pinOk[pinKey()]=true;S.popVisto={admin:iso(TODAY)};
 S.cli.slice(0,4).forEach((c,i)=>{c.n=X('cli'+i);c.apodo=X('apodo'+i);c.dir=X('dir'+i);c.nota=X('nota'+i);c.notas=X('notas'+i);c.ref=X('ref'+i)});
 S.choferes.forEach((c,i)=>{c.n=X('chofer'+i)});S.veh.forEach((v,i)=>{v.n=X('veh'+i)});
 S.cargas.slice(0,3).forEach((c,i)=>{c.prov=X('prov'+i)});(S.basc||[]).forEach((x,i)=>{x.n=X('basc'+i)});
 S.gastos.slice(0,3).forEach((g,i)=>{g.n=X('gasto'+i);g.t=X('tipo'+i)});
 S.avPrecio.push(X('aviso'));S.avPrecio.push('URGENTE: '+X('urg'));S.cfg.nombre=X('negocio');S.cfg.dir=X('dirneg');
 S.notasN=S.notasN||[];S.notasN.push({id:999,t:'gen',x:X('notadueño'),q:'todos'});
 S.cancels=S.cancels||[];S.cancels.push({c:S.cli[0].id,mot:X('motivo'),f:iso(TODAY)});
 S.hist.push({t:'hoy',q:X('quien'),x:X('hist')});
 S.actDia=[{f:iso(TODAY),h:'10:00',ch:1,x:X('actividad')}];render()});
await ev(()=>{const d=document.createElement('div');d.id='san';d.innerHTML=__X('sanity');document.body.appendChild(d)});await W(200);ok(await ev(()=>window.__xss>0),'la prueba sí detecta un texto que se ejecuta');await ev(()=>{document.getElementById('san').remove();window.__xss=0;render()});
const vis=await ev(()=>{S.role='admin';S.tab.admin='clientes';render();return document.body.textContent.indexOf('<b>cli0</b>')>-1});ok(vis,'el texto se ve tal cual (escapado), no se pierde');
const pant={admin:['inicio','bodega','cargas','clientes','gastos','vehiculos','personal','estadisticas','bienes','asi','cierreadm','mas','sugerencias'],rep:['ruta','entrega','cierre','viaje'],cont:['cres','cgas','cdeu','cexp'],local:['local','corte']};
const malas=[];
for(const rol of Object.keys(pant)){for(const t of pant[rol]){const r=await ev(([rol,t])=>{try{S.role=rol;S.encOn=false;S.pinOk[pinKey()]=true;S.tab[rol]=t;render();}catch(e){return {err:e.message}}
  const html=document.body.innerHTML;return {x:window.__xss,raw:/<img src="x" onerror|<svg onload/.test(html),vis:/<b>cli0<\/b>|&lt;b&gt;/.test(document.body.innerHTML)}},[rol,t]);
  await W(60);const x=await ev(()=>window.__xss);if(x||r.raw||r.err)malas.push(rol+':'+t+' '+JSON.stringify(r))}}
/* fichas */
const fichas=await ev(()=>{const out=[];const prueba=(k,f)=>{try{f();render()}catch(e){out.push(k+' ERR '+e.message)}if(window.__xss||/<img src="x" onerror/.test(document.body.innerHTML))out.push(k)};
 S.role='admin';S.tab.admin='clientes';S.cli.slice(0,4).forEach(c=>prueba('ficha cliente '+c.id,()=>{S.openCli=c.id}));S.openCli=null;
 S.tab.admin='personal';S.choferes.forEach(c=>prueba('ficha chofer '+c.id,()=>{S.openCh=c.id;S.fiTab['emp:'+c.id]='ruta'}));S.openCh=null;
 S.tab.admin='inicio';prueba('ajustes',()=>{S.aj=true});S.aj=false;prueba('menu',()=>{S.menu=true});S.menu=false;
 prueba('tarjetas urgentes',()=>{S.popVisto={};S.popI=0});S.popVisto={admin:iso(TODAY)};render();return out});
await W(200);const xf=await ev(()=>window.__xss);
ok(!malas.length,'33 · ninguna pantalla ejecuta texto (clientes, choferes, proveedores, básculas, gastos, avisos, notas, motivos)',malas);
ok(!fichas.length&&!xf,'33 · fichas, Ajustes, menú y tarjetas urgentes tampoco',{fichas,xf});
ok(!errs.length,'33 · ninguna pantalla se rompe',errs.slice(0,5));
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
