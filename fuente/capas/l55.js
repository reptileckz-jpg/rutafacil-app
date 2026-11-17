/* ===================== v6.9 · 92: lo que pide datos o decisiones se abre en tarjeta de pantalla completa ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.gxsheet>.pn{max-width:none!important;max-height:none!important;height:100%;border-radius:0!important;padding-top:calc(16px + var(--sbar,0px))!important}',
 '.fsform{position:fixed!important;inset:0!important;z-index:89!important;margin:0!important;border-radius:0!important;border:0!important;overflow-y:auto;background:var(--bg)!important;padding:calc(18px + var(--sbar,0px)) 18px 40px!important;font-size:17px}',
 '.fsform>b:first-child{display:block;font-size:24px;font-weight:900;margin-bottom:10px}.fsform .btn{min-height:60px!important;font-size:18px}.fsform input,.fsform select{min-height:52px;font-size:18px}'].join('\n');document.head.appendChild(st)})();
/* "Ya se hizo" (vehículo) y encargo al chofer: en pantalla completa */
var _vYa55=vYaHTML;vYaHTML=function(v){var h=_vYa55.apply(this,arguments);return h?h.replace('<div class="card" style="border:2px solid var(--accent)">','<div class="card fsform" role="dialog" aria-label="Ya se hizo">'):h};
/* encVehHTML: pasó a tema-vehiculos.js */
/* abono de un cliente y pago a un proveedor: por pasos */
WZ.abc={tit:'Abono de cliente',fin:'Registrar abono',pasos:[
 {q:function(d){return '¿Cuánto abona '+cl(d.id).n+'?'},a:function(d){return 'Debe '+money(cl(d.id).cred)+'.'},c:[{k:'m',l:'Abono $',t:'number'}],ok:function(d){var m=num(d.m),c=cl(d.id);return !(m>0)?'Escribe cuánto abona':(m>c.cred+0.5?'Debe solo '+money(c.cred):'')},html:function(d){return '<div class="card">'+wzCampo({k:'m',l:'Abono $',t:'number'},d)+'</div><button class="btn sec" style="margin-top:8px" data-act="wzop" data-k="m" data-v="'+cl(d.id).cred+'">Pagó todo ('+money(cl(d.id).cred)+')</button>'}},
 {q:'Revisa',html:function(d){var c=cl(d.id);return '<div class="card good">'+rw('Cliente',esc(c.n))+rw('Abona',money(num(d.m)))+rw('Queda debiendo',money(Math.max(0,c.cred-num(d.m))))+'</div>'}}],
 guardar:function(d){abrirModal('¿Seguro?','Se registra un abono de '+money(num(d.m))+' de '+esc(cl(d.id).n)+'.',[['Sí, registrar','wz55si']]);return ''}};
WZ.abp={tit:'Pago a proveedor',fin:'Registrar pago',pasos:[
 {q:function(d){return '¿Cuánto le pagas a '+d.n+'?'},a:function(d){var p=provDeb().filter(function(x){return x.n===d.n})[0];return 'Le debes '+money(p?p.pen:0)+'. Sale del efectivo en caja ('+money(cajaEsp())+').'},c:[{k:'m',l:'Pago $',t:'number'}],ok:function(d){var m=num(d.m),p=provDeb().filter(function(x){return x.n===d.n})[0];return !(m>0)?'Escribe cuánto le pagas':(p&&m>p.pen+0.5?'Solo le debes '+money(p.pen):'')},html:function(d){var p=provDeb().filter(function(x){return x.n===d.n})[0];return '<div class="card">'+wzCampo({k:'m',l:'Pago $',t:'number'},d)+'</div>'+(p?'<button class="btn sec" style="margin-top:8px" data-act="wzop" data-k="m" data-v="'+r2(p.pen)+'">Liquidar todo ('+money(p.pen)+')</button>':'')}},
 {q:'Revisa',html:function(d){return '<div class="card good">'+rw('Proveedor',esc(d.n))+rw('Le pagas',money(num(d.m)))+'</div>'}}],
 guardar:function(d){abrirModal('¿Seguro?','Se registra un pago de '+money(num(d.m))+' a '+esc(d.n)+'. Sale del efectivo en caja.',[['Sí, registrar','wz55si']]);return ''}};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cobrar"],[data-act="abonoprov"]');if(!b||b.dataset.ok||b.dataset.all||S.wz)return;e.stopImmediatePropagation();e.preventDefault();
 if(b.dataset.act==='cobrar'){var el=document.getElementById('abc_'+b.dataset.id);wzAbre('abc',{id:+b.dataset.id,m:el&&el.value||''})}else{var e2=document.getElementById('abp');wzAbre('abp',{n:decodeURIComponent(b.dataset.n),enc:b.dataset.n,m:e2&&e2.value||''})}},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="wz55si"]');if(!b)return;e.stopImmediatePropagation();S.modal=null;var w=S.wz;if(!w)return;var d=w.d;S.wz=null;render();
 var id=w.k==='abc'?'abc_'+d.id:'abp',i=document.getElementById(id),tmp=null;if(!i){tmp=i=document.createElement('input');i.id=id;i.style.display='none';document.body.appendChild(i)}i.value=String(num(d.m));
 var bb=document.createElement('button');bb.dataset.act=w.k==='abc'?'cobrar':'abonoprov';if(w.k==='abc')bb.dataset.id=String(d.id);else bb.dataset.n=d.enc;bb.dataset.ok='1';bb.style.display='none';document.body.appendChild(bb);try{bb.click()}finally{bb.remove();if(tmp)tmp.remove()}render()},true);
/* pedido del chofer, incidente y corrección de una entrega: también en pantalla completa (con su × para salir) */
function fsDe(h,lbl){return h.replace(/^<div class="card( [a-z]+)?"/,function(m,c){return '<div class="card fsform'+(c||'')+'" role="dialog" aria-label="'+lbl+'"'})}
var _rpF55=rpForm;rpForm=function(){return fsDe(_rpF55.apply(this,arguments),'Pedido')};
var _incF55=incForm;incForm=function(){return fsDe(_incF55.apply(this,arguments),'Incidente')};
var _corF55=corrForm;corrForm=function(){return fsDe(_corF55.apply(this,arguments),'Corrección')};
