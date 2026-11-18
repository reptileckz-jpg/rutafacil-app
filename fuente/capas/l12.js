/* ===================== v5 · Recepción a ciegas =====================
   Antes, al recibir lo que regresó del reparto, los campos ya venían llenos con lo que "debería"
   regresar: con solo tocar Confirmar salía "todo cuadra" sin contar nada. Ahora quien recibe cuenta
   sin ver el número de la app (tampoco se ve arriba en "Fruta"). Al confirmar, si falta algo, la app
   pregunta cada vez: ¿es faltante del chofer (se le anota a precio de venta) o fue merma? */
function recCnt(){var g=function(id){var e=document.getElementById(id);return e&&String(e.value).trim()!==''?num(e.value):null};return {R:g('rcR'),M:g('rcM'),V:g('rcV')}}
function recDifs(r,c){return {dR:Math.round(c.R)-Math.max(0,r.reg),dM:r2(c.M-Math.max(0,r.regK)),dV:Math.round(c.V)-r.V}}
function recFaltaTxt(d){var p=[];if(d.dR<0)p.push(-d.dR+' caja'+(d.dR<-1?'s':'')+' de roatán');if(d.dM<0)p.push(r2(-d.dM)+' kg de macho');if(d.dV<0)p.push(-d.dV+' caja'+(d.dV<-1?'s':'')+' vacía'+(d.dV<-1?'s':''));return p.join(', ')}
function recFaltaMonto(d){return r2(Math.max(0,-d.dR)*num(S.precio.R)+Math.max(0,-d.dM)*num(S.precio.M)+Math.max(0,-d.dV)*num(S.cfg.cajaVal||45))}
/* aplica la recepción: como antes, pero el faltante va a donde dijiste */
function recAplicar(c,modo){var r=S.cierre.res,d=recDifs(r,c);
 /* si lo que regresó quedó "sin contar" (no entró a bodega al enviar el cierre), entra completo lo contado */
 if(S.cierre.porContar){S.inv.maduras+=Math.round(c.R);S.inv.kgMaduro=r2(S.inv.kgMaduro+c.M);S.inv.vacias+=Math.round(c.V);S.cierre.porContar=false}
 else{S.inv.maduras+=d.dR;S.inv.kgMaduro=r2(S.inv.kgMaduro+d.dM);S.inv.vacias+=d.dV}
 S.recep={R:Math.round(c.R),M:r2(c.M),V:Math.round(c.V),dR:d.dR,dM:d.dM,dV:d.dV,como:modo||''};
 var fal=d.dR<0||d.dM<0||d.dV<0,txt=recFaltaTxt(d);
 if(fal&&modo==='chofer'){var m=recFaltaMonto(d);S.faltantes.push({ch:+S.chofHoy,m:m,fecha:iso(TODAY),desc:true,pend:true,rec:1,txt:'Faltó al regresar: '+txt});S.recep.fi=S.faltantes.length-1;
  S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Recepción: faltante de '+chofN(S.chofHoy)+' por '+txt+' ('+money(m)+')'});toast('Faltante de '+money(m)+' anotado a '+chofN(S.chofHoy))}
 else if(fal){if(d.dR<0||d.dM<0)S.mermas.push({tipo:'Faltante al regresar',fecha:iso(TODAY),R:Math.max(0,-d.dR),M:Math.max(0,-d.dM),valor:Math.max(0,-d.dR)*costoCajaAct()+Math.max(0,-d.dM)*costoKgMAct(),txt:chofN(S.chofHoy)});
  if(d.dV<0)S.cajasMov.push({t:'Faltaron vacías al regresar ('+chofN(S.chofHoy)+')',f:iso(TODAY),n:d.dV});
  S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Recepción: '+txt+' como merma'});toast('Anotado como merma: '+txt)}
 else toast(d.dR||d.dM||d.dV?'Recepción confirmada: sobró algo, ya se sumó a bodega':'Recepción confirmada: todo cuadra')}
recepCard=function(r){var R=S.recep;
 if(R){var fa=R.fi!=null?S.faltantes[R.fi]:null;
  return '<div class="card'+(R.dR||R.dM||R.dV?' alert':' good')+'"><b>Recepción en bodega confirmada</b>'
   +rw('Cajas llenas de roatán',R.R+' · la app esperaba '+Math.max(0,r.reg)+(R.dR?' ('+(R.dR>0?'+':'')+R.dR+')':''),R.dR<0?'neg':'')
   +rw('Kilos de macho',R.M+' · esperaba '+Math.max(0,r.regK)+(R.dM?' ('+(R.dM>0?'+':'')+R.dM+')':''),R.dM<0?'neg':'')
   +rw('Cajas vacías',R.V+' · esperaba '+r.V+(R.dV?' ('+(R.dV>0?'+':'')+R.dV+')':''),R.dV<0?'neg':'')
   +(R.dR<0||R.dM<0||R.dV<0?'<div class="lbl" style="margin-top:4px">'+(R.como==='chofer'?'Se anotó como faltante de '+esc(chofN(S.chofHoy))+(fa?' ('+money(fa.m)+')':'')+'.':'Se anotó como merma del negocio.')+'</div>':'')+'</div>'}
 var f=function(k,l){return '<div class="field"><label for="rc'+k+'">'+l+'</label><input id="rc'+k+'" type="number" inputmode="decimal" step="any" min="0" value="" placeholder="Cuéntalas"></div>'};
 return '<div class="card" data-key="recep"><b>Cuenta lo que regresó a bodega</b><div class="lbl">Cuenta sin ver lo que dice la app. Al confirmar te digo si cuadra.</div>'
  +f('R','Cajas llenas de roatán')+f('M','Kilos de macho')+f('V','Cajas vacías')+'<button class="btn" style="margin-top:8px" data-act="recep">Confirmar recepción</button></div>'};
/* que no se vea arriba lo que "regresa" mientras no se cuente */
/* cierreAdm: pasó a tema-cierre.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,D=b.dataset;
 if(a==='recep'){e.stopImmediatePropagation();if(S.recep||!S.cierre.res)return;var c=recCnt(),fl=[['R','#rcR'],['M','#rcM'],['V','#rcV']].filter(function(x){return c[x[0]]===null});
  if(fl.length){window._faltaSel=fl[0][1];toast('Falta contar: '+fl.map(function(x){return {R:'cajas de roatán',M:'kilos de macho',V:'cajas vacías'}[x[0]]}).join(', ')+' (si no hay, escribe 0)');render();return}
  var d=recDifs(S.cierre.res,c);
  if(d.dR<0||d.dM<0||d.dV<0){S._recC=c;var m=recFaltaMonto(d);
   abrirModal('Faltan '+recFaltaTxt(d),'Según la app debían regresar <b>'+Math.max(0,S.cierre.res.reg)+' cajas, '+Math.max(0,S.cierre.res.regK)+' kg y '+S.cierre.res.V+' vacías</b>.<br>¿Qué fue?',
    [['Faltante de '+esc(chofN(S.chofHoy))+' ('+money(m)+')','recfal',' data-m="chofer"'],['Merma (se maltrató o se tiró)','recfal',' data-m="merma"',' sec']]);return}
  recAplicar(c,'');render();return}
 if(a==='recfal'){e.stopImmediatePropagation();var c2=S._recC;S.modal=null;S._recC=null;if(c2&&!S.recep)recAplicar(c2,D.m);render();return}
},true);
