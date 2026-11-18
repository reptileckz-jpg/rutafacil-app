/* ===================== v5 · Buró del chofer =====================
   Cada chofer tiene su propio tope (lo que pueden deberle todos sus clientes). Si tarda en cobrar, la app
   te SUGIERE bajarlo; si cobra bien y usa casi todo su tope, te sugiere subirlo poco a poco. Tú decides. */
function chTope(ch){return ch&&ch.crMax!=null&&ch.crMax!==''?num(ch.crMax):num(crCfg().crCh)}
/* entValida: pasó a tema-ruta.js */
/* entrega: pasó a tema-ruta.js */
/* cómo cobra: cuánto de lo que le deben está atrasado */
function chBuro(ch){var L=S.cli.filter(function(c){return !c.oculto&&+c.chofer===+ch.id&&c.cred>0.5}),tot=sum(L,function(c){return c.cred}),cf=crCfg();
 var atr=sum(L.filter(function(c){return credAge(c)>num(cf.bD2)}),function(c){return c.cred}),viejo=L.reduce(function(m,c){return Math.max(m,credAge(c))},0),tope=chTope(ch);
 var pct=tot>0?atr/tot:0,uso=tope>0?tot/tope:0,n=pct>0.5||viejo>num(cf.bD3)?2:(pct>0.2?1:0);
 var sug=null;if(n>=1){var nv=Math.max(1000,Math.round(tope*(n===2?0.6:0.8)/500)*500);if(nv<tope)sug={t:'bajar',v:nv,por:money(atr)+' de '+money(tot)+' tiene más de '+cf.bD2+' días sin cobrarse'}}
 else if(uso>=0.8&&viejo<=num(cf.bD1)){var nv2=Math.round(tope*1.2/500)*500;if(nv2>tope)sug={t:'subir',v:nv2,por:'cobra a tiempo y ya usa el '+Math.round(uso*100)+'% de su tope'}}
 return {n:n,tot:tot,atr:atr,viejo:viejo,tope:tope,uso:uso,sug:sug}}
function chBuroHTML(){if(S.role!=='admin')return '';var h='';S.choferes.forEach(function(ch){if(ch.baja||(typeof esAdm==='function'&&esAdm(ch))||(ch.puesto||'chofer')!=='chofer')return;var b=chBuro(ch);if(!b.sug)return;var k=ch.id+':'+b.sug.t+':'+b.sug.v;if((S.chBuroNo||{})[k])return;
 h+='<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+esc(ch.n)+'</b> · tope '+money(b.tope)+' <span class="pill '+(b.sug.t==='bajar'?'warn':'')+'">'+['🟢 Cobra bien','🟡 Se atrasa','🟠 Cobra mal'][b.n]+'</span><div class="lbl">'+esc(b.sug.por)+'.</div>'
  +'<div style="font-size:14px;margin-top:4px">Sugerencia: <b>'+(b.sug.t==='bajar'?'bajarlo':'subirlo')+' a '+money(b.sug.v)+'</b></div>'
  +'<div class="lbl" style="margin-top:2px">'+(b.sug.t==='subir'?'Precaución: súbelo poco a poco y revisa que sus tickets de crédito sí se mandaron a los clientes.':'Mientras esté bajo, solo podrá fiar hasta ese tope; lo que ya deben no cambia.')+'</div>'
  +'<div style="display:flex;gap:6px;margin-top:6px"><button class="btn sm" style="flex:1" data-act="chburook" data-id="'+ch.id+'" data-v="'+b.sug.v+'">'+(b.sug.t==='bajar'?'Bajarlo':'Subirlo')+' a '+money(b.sug.v)+'</button><button class="btn sm sec" style="flex:1" data-act="chburono" data-k="'+k+'">Dejarlo igual</button></div></div>'});
 return h?'<div class="card note" data-key="chburo" style="padding:10px 12px"><b>Tope de crédito de los choferes</b>'+h+'</div>':''}
/* permsHTML: pasó a tema-fichas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='chburook'){e.stopImmediatePropagation();var ch=S.choferes.filter(function(x){return x.id===+b.dataset.id})[0];var ant=chTope(ch);ch.crMax=String(num(b.dataset.v));S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Cambió el tope de crédito de '+ch.n+': '+money(ant)+' → '+money(num(ch.crMax))});toast('Tope de '+ch.n+': '+money(num(ch.crMax)));render();return}
 if(a==='chburono'){e.stopImmediatePropagation();S.chBuroNo=S.chBuroNo||{};S.chBuroNo[b.dataset.k]=iso(TODAY);render();return}
 if(a==='chtope'){e.stopImmediatePropagation();return}},true);
/* en la ficha del chofer (Sueldos): su tope editable y cómo cobra */
/* sueldos: pasó a tema-personal.js */
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.crmax){var ch=S.choferes.filter(function(x){return x.id===+t.dataset.crmax})[0];if(ch)ch.crMax=t.value}},true);

/* ===================== v5 · Mayoreo autorizado que baja su consumo =====================
   Cuando haces a un cliente "de mayoreo" se guarda cuánto compraba. Si su compra de 30 días baja más
   del porcentaje de Ajustes (30% al empezar), regresa a precio normal solo y te avisa (puedes mantenérselo). */
function crCfg2(){crCfg();if(S.cfg.mayBaja==null||S.cfg.mayBaja==='')S.cfg.mayBaja='30';return S.cfg}
function mayBaseFijar(c){c.mayBase=num(c.c30);c.mayBaseF=iso(TODAY)}
function maySync(){var cf=crCfg2();S.cli.forEach(function(c){if(!c.mayoreo){return}if(c.mayBase==null){mayBaseFijar(c);return}
 if(c.mayBase>0&&num(c.c30)<c.mayBase*(1-num(cf.mayBaja)/100)&&!c.mayMant){c.mayoreo=false;c.mayBajo={antes:c.mayBase,ahora:num(c.c30),f:iso(TODAY)};
  S.avPrecio.push(c.n+' bajó su consumo (de '+money(c.mayBase)+' a '+money(num(c.c30))+' en 30 días): regresó a precio normal')}})}
var _rMay20=render;render=function(){try{maySync()}catch(e){}return _rMay20.apply(this,arguments)};
/* cuando le das mayoreo (cualquier botón), se guarda su consumo de ese momento */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;if(!/^(mayfijo|mayrevsi|climay|climay2|maymant)$/.test(a))return;var id=+b.dataset.id;
 if(a==='maymant'){e.stopImmediatePropagation();var c=cl(id);c.mayoreo=true;c.mayMant=true;c.mayBajo=null;mayBaseFijar(c);toast(c.n+' se queda con mayoreo');render();return}
 setTimeout(function(){var c=cl(id);if(c&&c.mayoreo){mayBaseFijar(c);c.mayMant=false;c.mayBajo=null}},0)},true);
function mayBajoHTML(){var L=S.cli.filter(function(c){return c.mayBajo&&!c.mayoreo&&!c.oculto&&c.mayBajo.f===iso(TODAY)});if(!L.length||S.role!=='admin')return '';
 return '<div class="card note" data-key="maybajo" style="padding:10px 12px"><b>Regresaron a precio normal</b>'+L.map(function(c){return '<div style="border-top:1px solid var(--line);padding:8px 0">'+esc(c.n)+'<div class="lbl">Compraba '+money(c.mayBajo.antes)+' en 30 días; ahora '+money(c.mayBajo.ahora)+'.</div><button class="btn sm sec" style="margin-top:6px" data-act="maymant" data-id="'+c.id+'">Mantenerle mayoreo</button></div>'}).join('')+'</div>'}
/* permsHTML: pasó a tema-fichas.js */
/* ajHTML: pasó a tema-ajustes.js */
