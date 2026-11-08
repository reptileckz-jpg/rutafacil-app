const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:880}});await p.addInitScript(()=>{window.__pnTest=1});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' | '+(e.stack||'').split('\n').slice(1,3).join(' ')));
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(400);
console.log(await p.evaluate(async()=>{S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.precio.conf=iso(TODAY);var W=ms=>new Promise(r=>setTimeout(r,ms));
 window.act=function(a,ds){var b=document.createElement('button');b.dataset.act=a;Object.keys(ds||{}).forEach(function(k){b.dataset[k]=ds[k]});document.body.appendChild(b);b.click();b.remove()};
 var o=[];
 // abono admin
 S.role='admin';S.tab.admin='clientes';render();var c=cl(1),c0=c.cred,k0=cajaEsp();var i=document.createElement('input');i.id='abc_1';i.value='500';document.body.appendChild(i);o.push('abc in DOM:'+document.querySelectorAll('#abc_1').length);act('cobrar',{id:'1'});i.remove();await W(50);o.push(['cobrar',c0,cl(1).cred,k0,cajaEsp(),S.toast]);
 // proveedor
 S.pdF={n:'Roly',m:'5000',c:'Fruta',o:'',f:iso(TODAY),v:{t:'sin'}};act('pdsave');await W(30);var pv0=provSaldo('Roly'),k1=cajaEsp();S.tab.admin='cargas';S.openProv='Roly';render();var e=document.getElementById('abp');o.push('abp existe '+!!e+' en fiov '+!!(e&&e.closest('#fiov')));if(!e){e=document.createElement('input');e.id='abp';document.body.appendChild(e)}e.value='2000';act('abonoprov',{n:encodeURIComponent('Roly')});await W(50);o.push(['prov',pv0,provSaldo('Roly'),k1,cajaEsp(),S.toast]);
 // cierre
 S.role='rep';S.salida.ok=true;S.inv.reparto=30;S.cierre.salioR=30;S.cur=0;resetDraft(cl(S.stops[0].c));S.tab.rep='entrega';act('guardar');await W(60);S.cierre.gxConf=true;S.cierreP=3;S.tab.rep='cierre';render();var bt=document.querySelector('[data-act="enviar"]');o.push('enviar btn '+!!bt+' '+(bt&&bt.className)+' disabled '+(bt&&bt.disabled));act('enviar');await W(60);o.push(['sent',S.cierre.sent,S.modal&&S.modal.t,S.gxPopR,JSON.stringify(S.borr)]);
 return JSON.stringify(o,null,1)}));console.log(errs);await b.close()})();
