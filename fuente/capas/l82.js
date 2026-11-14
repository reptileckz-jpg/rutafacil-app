/* ===================== v8.2 · (14 nov) lo que encontró Copilot + Ricardo
   40 ESTADÍSTICAS DE VERDAD: en la app real nunca se llenaban (solo la demo tenía días); ahora salen de las rutas de cada día,
      la venta local, los gastos, las mermas y las cargas. Rankings de clientes con lo que de verdad compraron.
   41 Retiro del dueño: baja la caja pero NO la ganancia (tampoco el "sueldo del dueño" en gastos fijos). Lo que se compra para
      un vehículo es gasto: categoría "Para un vehículo".
   42 "¿Cuadran las cuentas?": una pantalla con dinero, cajas, kilos, taras, bodega y caja (verde / amarillo / rojo) y a dónde ir.
   43 Contar bodega: si la diferencia es grande pide volver a contar; toda diferencia pide el motivo.
   44 Fruta madura por antigüedad: la tarjeta solo sale cuando hay fruta pasada de tiempo; sin deslizar (cambiaba de página). ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '#cu82 .rw82{display:flex;gap:12px;align-items:flex-start;width:100%;text-align:left;background:var(--surface);border:2px solid var(--line);border-radius:16px;padding:14px;margin:10px 0;color:inherit;font:inherit}',
 '#cu82 .rw82 .s{font-size:26px;line-height:1}#cu82 .rw82.ok{border-color:#86EFAC}#cu82 .rw82.rev{border-color:#FCD34D}#cu82 .rw82.mal{border-color:#FCA5A5;background:color-mix(in srgb,#DC2626 6%,var(--surface))}',
 '#cu82 .rw82 ul{margin:6px 0 0;padding-left:18px}#cu82 .rw82 li{margin:2px 0}'].join('\n');document.head.appendChild(st)})();

/* ---------- 40 · estadísticas de verdad ---------- */
function costoEn82(d){var c=(S.cargas||[]).filter(function(x){return (x.fecha||'')<=d&&num(x.kgR)>0&&num(x.pR)>0&&num(x.cajas)>0}).sort(function(a,b){return String(a.fecha).localeCompare(String(b.fecha))||a.id-b.id}).pop(),m=(S.cargas||[]).filter(function(x){return (x.fecha||'')<=d&&num(x.kgM)>0&&num(x.pM)>0}).sort(function(a,b){return String(a.fecha).localeCompare(String(b.fecha))||a.id-b.id}).pop();
 var cR=0,cM=0;try{cR=c?cC(c).costoCaja:costoCajaAct()}catch(e){}try{cM=m?cC(m).costoKgM:costoKgMAct()}catch(e){}return {R:num(cR),M:num(cM)}}
/* las rutas de un día: las archivadas y las que siguen abiertas */
function rutasDia82(d){var hoy=iso(TODAY),o={};(S.rutasHist||[]).forEach(function(e){if(e&&e.f===d)o[e.ch]={ch:+e.ch,log:e.log||[],res:e.res,sent:!!e.enviado,reg:e.cierreReg82,recep:e.recep82,arch:1}});
 var vivo=function(id,r){if(!r||rutaVacia(r))return;var f=r.rutaDia80||hoy;if(f!==d)return;o[id]={ch:+id,log:r.log||[],res:r.cierre&&r.cierre.res,sent:!!(r.cierre&&r.cierre.sent),reg:r.cierreReg,recep:r.recep,r:r}};
 Object.keys(S.chSt||{}).forEach(function(id){vivo(id,S.chSt[id])});if(S.chofHoy!=null)vivo(S.chofHoy,S);return Object.keys(o).map(function(k){return o[k]})}
function gCat82(g){var t=String(g.t||''),n=String(g.n||'');if(/^Retiro del due/i.test(t))return null;if(/combustible/i.test(t))return 'gc';if(/caseta/i.test(t))return 'gk';if(/comida|vi[aá]tico/i.test(t)||/Gasto de ruta/.test(t)&&/comida|vi[aá]tico/i.test(n))return 'gv';
 if(/veh[ií]culo|ponchadura|reparaci|verificaci|mensualidad|abono a capital|aceite|llanta|taller|mantenimiento/i.test(t))return 'gm';return 'go'}
function vlInv82(p){var x=(S.vlProd||[]).filter(function(y){return y.n===p})[0];return x&&x.inv==='M'?'M':'R'}
function hist82(){var hoy=iso(TODAY),D={};var add=function(d){if(d&&d<=hoy)D[d]=1};
 (S.rutasHist||[]).forEach(function(e){add(e&&e.f)});add(hoy);(S.gastos||[]).forEach(function(g){add(g.f||g.f82)});(S.mermas||[]).forEach(function(m){add(m.fecha)});(S.vlVentas||[]).forEach(function(v){add(v.f82)});
 var out=[],kgC=20;try{kgC=num(vlKgCaja())||20}catch(e){}
 Object.keys(D).sort().forEach(function(d){var c=costoEn82(d),L=[];rutasDia82(d).forEach(function(r){L=L.concat(r.log||[])});L=L.filter(function(l){return l&&!l.anul});
  var R=sum(L,function(l){return num(l.R)}),M=r2(sum(L,function(l){return num(l.M)})),iR=sum(L,function(l){return num(l.R)*num(l.pr||S.precio.R)}),iM=sum(L,function(l){return num(l.M)*num(l.pm||S.precio.M)}),cvR=R*c.R,cvM=M*c.M;
  (S.vlVentas||[]).filter(function(v){return v.f82===d}).forEach(function(v){(v.lin||[]).forEach(function(l){var t=num(l.kg)*num(l.pk);if(vlInv82(l.p)==='M'){iM+=t;cvM+=num(l.kg)*c.M}else{iR+=t;cvR+=num(l.kg)*c.R/kgC}})});
  var g={gc:0,gk:0,gv:0,gm:0,go:0};(S.gastos||[]).forEach(function(x){if((x.f||x.f82)!==d)return;var k=gCat82(x);if(k)g[k]+=num(x.m)});
  var mm=(S.mermas||[]).filter(function(x){return x.fecha===d}),mR=sum(mm,function(x){return num(x.R)}),mM=sum(mm,function(x){return num(x.M)}),mv=sum(mm,function(x){return num(x.valor)});
  var row={d:d,R:R,M:M,iR:Math.round(iR),iM:Math.round(iM),gR:Math.round(iR-cvR),gM:Math.round(iM-cvM),gc:Math.round(g.gc),gk:Math.round(g.gk),gv:Math.round(g.gv),gm:Math.round(g.gm),go:Math.round(g.go),mR:mR,mM:mM,mv:Math.round(mv),
   cr:Math.round(sum(L,function(l){return Math.max(0,num(l.total)-num(l.pago))})),ab:Math.round(sum(L,function(l){return num(l.abono)})),pp:0};
  row.ing=row.iR+row.iM;row.gan=row.gR+row.gM;row.gt=row.gc+row.gk+row.gv+row.gm+row.go;if(row.ing||row.gt||row.mv||R||M)out.push(row)});return out}
function histPon82(){if(MODO!=='vacio'||typeof HIST==='undefined')return;var L=hist82();HIST.length=0;L.forEach(function(r){HIST.push(r)});
 if(typeof COMPRAS!=='undefined'&&Array.isArray(COMPRAS)){COMPRAS.length=0;(S.cargas||[]).filter(function(c){return c.fecha&&(num(c.pR)||num(c.pM))}).sort(function(a,b){return String(a.fecha).localeCompare(String(b.fecha))}).forEach(function(c){COMPRAS.push({d:c.fecha,pR:num(c.pR),pM:num(c.pM)})})}}
/* fechas que faltaban: venta local y gastos sin día */
function fechas82(){var h=iso(TODAY);(S.vlVentas||[]).forEach(function(v){if(v&&!v.f82)v.f82=h});(S.gastos||[]).forEach(function(g){if(g&&!g.f&&!g.f82)g.f82=h})}
var _est82=estadisticas;estadisticas=function(){var h=_est82.apply(this,arguments);if(MODO==='vacio')h=String(h).replace('Datos de ejemplo hasta ayer. Lo de hoy se suma al cerrar el día.','Con lo que se registra en la app (rutas, venta en bodega, gastos y mermas). Lo de hoy se va sumando.');if(MODO==='vacio')h=String(h).replace(' En la app final se guardan día con día.',' Se guardan solos, día con día.');return h};
/* rankings: lo que de verdad compró cada cliente en 30 días */
var _rk82=rankingHTML;rankingHTML=function(){if(MODO!=='vacio')return _rk82.apply(this,arguments);var d0=iso(new Date(TODAY.getTime()-30*864e5)),T={},keep={};
 Object.keys(HIST.reduce(function(o,r){o[r.d]=1;return o},{})).forEach(function(d){if(d<d0)return;rutasDia82(d).forEach(function(r){(r.log||[]).forEach(function(l){if(l&&!l.anul)T[l.c]=(T[l.c]||0)+num(l.total)})})});
 S.cli.forEach(function(c){keep[c.id]=c.c30;c.c30=Math.round(T[c.id]||0)});try{return _rk82.apply(this,arguments)}finally{S.cli.forEach(function(c){c.c30=keep[c.id]})}};
/* el día archivado guarda también lo que se recibió y se contó (para "¿Cuadran las cuentas?") */
var _cdd82=cambioDeDia;cambioDeDia=function(viejo){var snap={};try{if(viejo&&viejo!==iso(TODAY)){Object.keys(S.chSt||{}).forEach(function(id){var r=S.chSt[id];if(r)snap[id]={reg:r.cierreReg,recep:r.recep}});if(S.chofHoy!=null)snap[S.chofHoy]={reg:S.cierreReg,recep:S.recep}}}catch(e){}
 var r=_cdd82.apply(this,arguments);try{(S.rutasHist||[]).forEach(function(e){var s=snap[e.ch];if(e.f===viejo&&s&&e.recep82===undefined){e.cierreReg82=s.reg||null;e.recep82=s.recep||null}})}catch(e){}return r};
if(typeof rutaRenueva80==='function'){var _rr82=rutaRenueva80;rutaRenueva80=function(){var s={reg:S.cierreReg,recep:S.recep},n=(S.rutasHist||[]).length,r=_rr82.apply(this,arguments);try{(S.rutasHist||[]).slice(n).forEach(function(e){if(e.recep82===undefined){e.cierreReg82=s.reg||null;e.recep82=s.recep||null}})}catch(e){}return r}}

/* ---------- 41 · retiro del dueño ---------- */
var _fm82=fijoMes;fijoMes=function(){var keep=S.fijos;try{S.fijos=(keep||[]).filter(function(f){return !f.retiro});return _fm82.apply(this,arguments)}finally{S.fijos=keep}};
function gtip82(){try{if(GTIP._82)return;var i=GTIP.map(function(x){return x[0]}).indexOf('Retiro del dueño');GTIP.splice(i<0?GTIP.length-1:i,0,['Para un vehículo','ruta','#2F6DB5']);GTIP._82=1}catch(e){}}
function retiroNota82(){var b=[].filter.call(document.querySelectorAll('button[aria-pressed="true"]'),function(x){return /^\s*Retiro del dueño\s*$/.test(x.textContent)})[0];if(!b)return;var g=b.closest('.chips')||b.parentElement;if(!g||(g.nextElementSibling&&g.nextElementSibling.dataset&&g.nextElementSibling.dataset.x==='ret82'))return;
 var d=document.createElement('div');d.dataset.x='ret82';d.className='lbl';d.style.margin='6px 0';d.innerHTML='💡 El retiro baja la caja pero <b>no cuenta como gasto</b> del negocio (no baja la ganancia). Si es para comprarle algo a un vehículo, escoge <b>"Para un vehículo"</b>.';g.after(d)}

/* ---------- 42 · ¿Cuadran las cuentas? ---------- */
function e82(o){return o==='ok'?'🟢':(o==='mal'?'🔴':'🟡')}
function peor82(L){return L.indexOf('mal')>-1?'mal':(L.indexOf('rev')>-1?'rev':'ok')}
function cuadre82(d){var hoy=d===iso(TODAY),RT=rutasDia82(d),F=[];
 var din={k:'din',t:'💵 Dinero de los choferes',L:[],s:[]},caj={k:'caj',t:'📦 Cajas de roatán',L:[],s:[]},kil={k:'kil',t:'⚖️ Kilos de macho',L:[],s:[]},tar={k:'tar',t:'🧺 Taras (cajas vacías)',L:[],s:[]};
 RT.forEach(function(r){var n=chofN(r.ch),res=r.res;
  if(!r.sent){din.s.push('rev');din.L.push(n+(hoy?' todavía no manda su cierre.':' no mandó su cierre.'));caj.s.push('rev');kil.s.push('rev');tar.s.push('rev');return}
  if(!res){din.s.push('rev');din.L.push(n+': su cierre no trae el resumen.');return}
  var esp=r2(num(res.efectivo));if(!r.reg){din.s.push('rev');din.L.push('Falta recibir el efectivo de '+n+' ('+money(esp)+').')}else{var dif=r2(num(r.reg.rec)-esp);if(Math.abs(dif)<1){din.s.push('ok');din.L.push(n+': entregó '+money(r.reg.rec)+'. Cuadra.')}else{din.s.push('mal');din.L.push(n+': entregó '+money(r.reg.rec)+' y debía '+money(esp)+' ('+(dif<0?'faltan ':'sobran ')+money(Math.abs(dif))+').')}}
  var salR=num(res.R)+num(res.cbR)+Math.max(0,num(res.reg)),salM=r2(num(res.M)+num(res.cbM)+Math.max(0,num(res.regK))),rc=r.recep;
  var lin=function(o,tot,ven,cb,reg,dif,u){if(!tot&&!reg){return}var tx=n+': salieron '+tot+' '+u+' → vendió '+ven+(cb?', cambios '+cb:'')+', regresan '+Math.max(0,reg)+'.';if(reg<0){o.s.push('mal');o.L.push(tx+' Vendió más de lo que salió ('+(-reg)+' '+u+' de más).');return}
   if(!rc){if(reg>0){o.s.push('rev');o.L.push(tx+' Falta contar lo que regresó.')}else{o.s.push('ok');o.L.push(tx+' Cuadra.')}return}if(Math.abs(num(dif))>0.01){o.s.push('mal');o.L.push(tx+' Al contar '+(dif>0?'faltaron ':'sobraron ')+Math.abs(dif)+' '+u+'.')}else{o.s.push('ok');o.L.push(tx+' Cuadra.')}};
  lin(caj,salR,num(res.R),num(res.cbR),num(res.reg),rc&&rc.dR,'cajas');lin(kil,salM,num(res.M),num(res.cbM),r2(num(res.regK)),rc&&rc.dM,'kg');
  var V=num(res.V);if(V||rc&&num(rc.dV)){if(rc&&Math.abs(num(rc.dV))>0){tar.s.push('mal');tar.L.push(n+': trae '+V+' taras; al contar '+(rc.dV>0?'faltaron ':'sobraron ')+Math.abs(rc.dV)+'.')}else if(!rc&&V>0){tar.s.push('rev');tar.L.push(n+': trae '+V+' taras. Falta contarlas.')}else{tar.s.push('ok');tar.L.push(n+': '+V+' taras. Cuadra.')}}});
 (S.faltantes||[]).filter(function(f){return f.fecha===d&&f.pend}).forEach(function(f){din.s.push('mal');din.L.push('Faltante pendiente de '+chofN(f.ch)+': '+money(Math.abs(num(f.m)))+'.')});
 [din,caj,kil,tar].forEach(function(o){if(!o.L.length){o.s.push('ok');o.L.push(RT.length?'Sin movimientos.':(hoy?'Todavía no hay rutas con movimientos hoy.':'No hubo rutas ese día.'))}});
 var cn=(S.mermas||[]).filter(function(m){return m.fecha===d&&/^(Día|Semana|Mes)$/.test(m.tipo)}),bod={k:'bod',t:'🏠 Bodega (conteo)',L:[],s:[]};
 if(!cn.length){bod.s.push('rev');bod.L.push(hoy?'No se ha contado la bodega hoy.':'No se contó la bodega ese día.')}else cn.forEach(function(m){var mal=num(m.valor)>0;bod.s.push(mal?'mal':'ok');bod.L.push((mal?'Faltó fruta al contar: ':'Se contó: ')+(m.txt||'')+(mal?' ('+money(m.valor)+')':'')+(m.mot82?' · Motivo: '+m.mot82:''))});
 var cc=(S.cajaCierres||[]).filter(function(x){return x.f===d}),caja={k:'caja',t:'💰 Caja del negocio',L:[],s:[]};
 if(!cc.length){caja.s.push('rev');caja.L.push(hoy?'Todavía no se hace el cierre de caja de hoy.':'No se hizo el cierre de caja ese día.')}else cc.forEach(function(x){var df=r2(num(x.dif));caja.s.push(Math.abs(df)<1?'ok':'mal');caja.L.push('Se contaron '+money(x.cnt)+(Math.abs(df)<1?'. Cuadra.':' y debía haber '+money(x.esp)+' ('+(df<0?'faltan ':'sobran ')+money(Math.abs(df))+').'))});
 F=[din,caj,kil,tar,bod,caja];F.forEach(function(o){o.e=peor82(o.s)});return F}
function cu82HTML(){var C=S.cu82;if(!C||S.role!=='admin')return '';var d=C.dia==='ayer'?iso(new Date(TODAY.getTime()-864e5)):iso(TODAY),F=cuadre82(d),mal=F.filter(function(o){return o.e==='mal'}).length,rev=F.filter(function(o){return o.e==='rev'}).length;
 var h='<div class="chips" role="group" style="margin:4px 0 8px"><button data-act="cu82d" data-v="hoy" aria-pressed="'+(C.dia!=='ayer')+'">Hoy</button><button data-act="cu82d" data-v="ayer" aria-pressed="'+(C.dia==='ayer')+'">Ayer</button></div>'
  +'<div class="card '+(mal?'alert':(rev?'note':'good'))+'" style="padding:12px 14px"><b style="font-size:19px">'+(mal?'🔴 '+mal+' cosa'+(mal===1?'':'s')+' no cuadra'+(mal===1?'':'n'):(rev?'🟡 '+rev+' cosa'+(rev===1?'':'s')+' por revisar':'🟢 Todo cuadra'))+'</b><div class="lbl">Verde: cuadra · Amarillo: falta hacer algo · Rojo: hay una diferencia. Toca un renglón para ir a resolverlo.</div></div>';
 F.forEach(function(o){h+='<button class="rw82 '+o.e+'" data-act="cu82ir" data-k="'+o.k+'"><span class="s">'+e82(o.e)+'</span><span style="flex:1"><b style="font-size:17px">'+o.t+'</b><ul>'+o.L.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></span><span class="lbl">›</span></button>'});
 return ovW70('cu82','¿Cuadran las cuentas?',h,'cu82x')}
function cu82Pon(){var o=document.getElementById('cu82'),y=o?o.scrollTop:0,h=cu82HTML();if(!h){if(o)o.remove();return}if(o&&o._h===h)return;ovPon70('cu82',h);var n=document.getElementById('cu82');if(n){n._h=h;n.scrollTop=y}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act^="cu82"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act;
 if(a==='cu82open'){S.cu82={dia:'hoy'};render();return}if(!S.cu82)return;if(a==='cu82x'){S.cu82=null;render();return}if(a==='cu82d'){S.cu82.dia=b.dataset.v;render();return}
 if(a==='cu82ir'){var k=b.dataset.k;S.cu82=null;if(k==='bod'){S.tab.admin='bodega';render();window.scrollTo(0,0);try{marca78('[data-act="registrarcnt"]','Baja a "Contar bodega y merma"')}catch(er){}return}
  S.tab.admin='inicio';render();window.scrollTo(0,0);var sel=k==='caja'?'[data-act="cajacierre"],[data-act="cierrecaja"],[data-x="caja"]':(k==='din'?'[data-act="recibir"],[data-act="rcabre"],[data-act="vercierre"]':'[data-act="contarreg"],[data-act="recep"],[data-act="recibir"],[data-act="rcabre"]');
  var el=document.querySelector(sel);if(el){try{marca78(el)}catch(er){}}else toast(k==='caja'?'El cierre de caja está en Inicio.':'Lo que falta está en Inicio, en "Por atender".')}},true);
function cuEntrada82(){if(S.role!=='admin'||S.encOn||S.cu82||S.rt81||S.tab.admin!=='inicio')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="cu82e"]'))return;var F=cuadre82(iso(TODAY)),mal=F.filter(function(o){return o.e==='mal'}).length,rev=F.filter(function(o){return o.e==='rev'}).length;
 var d=document.createElement('div');d.dataset.x='cu82e';d.className='card '+(mal?'alert':'');d.style.padding='12px 14px';
 d.innerHTML='<div class="row"><span><b style="font-size:18px">'+(mal?'🔴':(rev?'🟡':'🟢'))+' ¿Cuadran las cuentas?</b><br><span class="lbl">'+(mal?mal+' no cuadra'+(mal===1?'':'n'):(rev?rev+' por revisar':'Todo cuadra'))+' · dinero, cajas, kilos, taras, bodega y caja</span></span><button class="btn sm" data-act="cu82open">Ver</button></div>';
 var ref=m.querySelector('[data-x="rt81e"]')||m.querySelector('[data-x="dia80a"]');if(ref)ref.after(d);else m.prepend(d)}

/* ---------- 43 · contar bodega: volver a contar y motivo ---------- */
var MOT82=['Se echó a perder (merma)','Venta que no se registró','Error al registrar la carga','Está en un vehículo','Otro'];
function cntGrande82(r){return r.d.some(function(x){return x.u==='cajas'?Math.abs(x.dif)>2:Math.abs(x.dif)>20})}
var _cc82=cntCard;cntCard=function(){var h=_cc82.apply(this,arguments),X=S.cnt82||{},r=null;try{r=cntCalc()}catch(e){}if(!r)return h;var hay=r.d.some(function(x){return Math.abs(x.dif)>0.001});var add='';
 if(X.re)add+='<div class="card note" style="margin:8px 0;padding:10px 12px"><b>Vuelve a contar</b><div class="lbl">La diferencia es grande. Cuenta otra vez lo marcado: '+esc(X.re)+'. Si sale igual, se registra.</div></div>';
 if(hay)add+='<div style="margin-top:8px"><b>¿Por qué no cuadra?</b><div class="chips" role="group" style="margin:6px 0;flex-wrap:wrap">'+MOT82.map(function(m){return '<button data-act="cnt82m" data-v="'+esc(m)+'" aria-pressed="'+(X.mot===m)+'">'+esc(m)+'</button>'}).join('')+'</div>'+(X.mot==='Otro'?'<div class="field"><label for="cnt82o">Explica qué pasó</label><input id="cnt82o" type="text" data-bind="cnt82.otro" value="'+esc(X.otro||'')+'" style="width:100%;text-align:left"></div>':'')+'</div>';
 return add?h.replace('<button class="btn" style="margin-top:8px" data-act="registrarcnt">',add+'<button class="btn" style="margin-top:8px" data-act="registrarcnt">'):h};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cnt82m"]');if(b){e.stopImmediatePropagation();S.cnt82=S.cnt82||{};S.cnt82.mot=b.dataset.v;render();return}
 b=e.target.closest&&e.target.closest('[data-act="registrarcnt"]');if(!b)return;var r=null;try{r=cntCalc()}catch(er){}if(!r||!r.d.length)return;var X=S.cnt82=S.cnt82||{},hay=r.d.some(function(x){return Math.abs(x.dif)>0.001});
 if(hay&&cntGrande82(r)){var firma=JSON.stringify(r.d.map(function(x){return [x.k,x.fis]}));if(X.firma!==firma){if(X.firma&&X.re){/* segundo conteo distinto: se vuelve a pedir */}X.firma=firma;X.re=r.d.filter(function(x){return Math.abs(x.dif)>0.001}).map(function(x){return x.n}).join(', ');
  e.preventDefault();e.stopImmediatePropagation();r.d.forEach(function(x){if(Math.abs(x.dif)>0.001)S.cnt[x.k]=''});toast('La diferencia es grande: vuelve a contar');render();return}}
 if(hay&&!X.mot){e.preventDefault();e.stopImmediatePropagation();toast('Escoge por qué no cuadra');render();try{marca78('[data-act="cnt82m"]')}catch(er){}return}
 if(hay&&X.mot==='Otro'&&!String(X.otro||'').trim()){e.preventDefault();e.stopImmediatePropagation();toast('Explica qué pasó');return}
 var mot=hay?(X.mot==='Otro'?'Otro: '+String(X.otro).trim():X.mot):'',n0=(S.mermas||[]).length;setTimeout(function(){try{var m=(S.mermas||[])[n0];if(m&&mot){m.mot82=mot;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Contó la bodega: '+(m.txt||'')+' · Motivo: '+mot})}S.cnt82=null;render()}catch(er){}},0)},true);
/* el segundo conteo: si vuelve a dar lo mismo se registra */
document.addEventListener('input',function(e){var t=e.target;if(!t||!/^cnt_/.test(t.id||'')||!S.cnt82||!S.cnt82.re)return;setTimeout(function(){try{var r=cntCalc(),firma=JSON.stringify(r.d.map(function(x){return [x.k,x.fis]}));if(S.cnt82&&firma===S.cnt82.firma){S.cnt82.re=null}}catch(er){}},0)},true);

/* ---------- 44 · fruta madura: solo lo pasado de tiempo, sin deslizar ---------- */
var _an82=antig65;antig65=function(){var d=_an82.apply(this,arguments);if(!d)return d;var v=3;try{v=vidaDias()}catch(e){}var mal=(S.madL||[]).filter(function(x){var e=0;try{e=madEdad(x)}catch(er){}return num(x.q)>0&&v-e<=0});if(!mal.length)return null;
 try{delete d.dataset.sw80;d.style.transform='';Array.prototype.forEach.call(d.querySelectorAll('.lote'),function(el){var x=(S.madL||[])[+el.dataset.k];if(!x||v-madEdad(x)>0)el.remove()});var tt=d.querySelector('.hd .tt');if(tt)tt.textContent='Fruta madura pasada de tiempo';
  var st=d.querySelector('.hd .st');if(st)st.textContent='Toca cada una para decir qué pasó (se tiró, se remató o salió a la venta)';var al=d.querySelector('.alc');if(al)al.remove()}catch(e){}return d};
var _swB82=swBloq;swBloq=function(t){if(t&&t.closest&&t.closest('[data-x="antig65"],.lote,[data-sw80]'))return true;return _swB82.apply(this,arguments)};

var _rd82=render;render=function(){try{fechas82();gtip82();if(S.role==='admin'||S.role==='cont'||S.encOn)histPon82()}catch(e){console.error('l82 hist',e)}var r=_rd82.apply(this,arguments);try{retiroNota82();cuEntrada82();cu82Pon()}catch(e){console.error('l82',e)}return r};

/* ---------- 45 · la pantalla ya no brinca sola al tocar algo ----------
   Al abrir un apartado se cerraban otros de más arriba (la página se acortaba y lo que tocaste se iba para arriba), y en la entrega
   del chofer la pantalla se redibujaba un instante más corta y el teléfono la subía. Ahora lo que tocas se queda donde estaba. */
var ANC82={t:0};(function(){var sv=Element.prototype.scrollIntoView;Element.prototype.scrollIntoView=function(){ANC82.t=Date.now();return sv.apply(this,arguments)}})();(function(){var st=window.scrollTo;window.scrollTo=function(x,y){var o=x&&typeof x==='object'?x:null,top=o?o.top:y;
 /* "ir hasta arriba" o un salto suave a algo = a propósito; regresar a donde estaba al redibujar = no */ if(num(top)===0||o&&o.behavior==='smooth')ANC82.t=Date.now();return st.apply(window,arguments)}})();
function ancHalla82(a){if(a.el&&document.body.contains(a.el))return a.el;var L=document.querySelectorAll(a.tag);for(var i=0;i<L.length;i++){var x=L[i];if((x.getAttribute('data-act')||'')===a.act&&(x.getAttribute('data-k')||'')===a.k&&(x.getAttribute('data-v')||'')===a.v&&(x.textContent||'').trim().slice(0,40)===a.tx)return x}return null}
var PD82=null;window.addEventListener('pointerdown',function(e){PD82={x:e.clientX,y:e.clientY}},true);
window.addEventListener('pointerup',function(e){if(PD82&&(Math.abs(e.clientX-PD82.x)>10||Math.abs(e.clientY-PD82.y)>10))return;var el=e.target.closest&&e.target.closest('summary,button,[role="tab"],label');if(!el||el.closest('input,textarea,select'))return;if(!el.closest('main'))return;
 var a={el:el,tag:el.tagName.toLowerCase(),act:el.getAttribute('data-act')||'',k:el.getAttribute('data-k')||'',v:el.getAttribute('data-v')||'',tx:(el.textContent||'').trim().slice(0,40),top:el.getBoundingClientRect().top,role:S.role,tab:S.tab&&S.tab[S.role],t0:Date.now()};
 var fija=function(){try{if(S.role!==a.role||(S.tab&&S.tab[S.role])!==a.tab)return;if(ANC82.t>=a.t0)return;if(document.querySelector('.ov70,#wzov,#fiov,#vwov,#setov,#dia80,#pinov:not([hidden])'))return;
  var ae=document.activeElement;if(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)&&ae!==a.el)return;var x=ancHalla82(a);if(!x)return;var d=x.getBoundingClientRect().top-a.top;if(Math.abs(d)>12){var t=ANC82.t;window.scrollBy(0,d);ANC82.t=t}}catch(er){}};
 setTimeout(fija,30);setTimeout(fija,150);setTimeout(fija,450)},true);
/* el aviso "Lote de roatán (20 cajas) pasó su tiempo" es de MADURACIÓN: lleva a ese lote (botón "Sacar"), no a la fruta madura por antigüedad */
var _avD82=avDestino;avDestino=function(x){var r=_avD82.apply(this,arguments);try{var m=/^Lote de (roatán|macho) \(([\d.]+) (cajas|kg)\) pasó su tiempo/i.exec(String(x||''));if(m&&r){var pr=/roat/i.test(m[1])?'R':'M',q=num(m[2]),l=(S.lotes||[]).filter(function(o){return o.prod===pr&&num(o.q)===q})[0]||(S.lotes||[]).filter(function(o){return o.prod===pr})[0];
 r.t='bodega';r.sel=l?'[data-act="sacar"][data-id="'+l.id+'"]':'[data-act="sacar"]';delete r.lote68}}catch(e){}return r};
