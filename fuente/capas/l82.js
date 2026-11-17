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
/* la primera vez (ya con los datos de la nube) lo viejo sin fecha queda como "sin fecha" ('?') y no se cuenta; de ahí en adelante lo nuevo recibe el día */
function fechas82(){if(typeof NB!=='undefined'&&NB.on&&!NB.listo)return;var h=iso(TODAY),v1=!S.f82ini;(S.vlVentas||[]).forEach(function(v){if(v&&!v.f82)v.f82=v1?'?':h});(S.gastos||[]).forEach(function(g){if(g&&!g.f&&!g.f82)g.f82=v1?'?':h});if(v1)S.f82ini=h}
var _est82=estadisticas;estadisticas=function(){var h=_est82.apply(this,arguments);if(MODO==='vacio')h=String(h).replace('Datos de ejemplo hasta ayer. Lo de hoy se suma al cerrar el día.','Con lo que se registra en la app (rutas, venta en bodega, gastos y mermas). Lo de hoy se va sumando.');if(MODO==='vacio')h=String(h).replace(' En la app final se guardan día con día.',' Se guardan solos, día con día.');return h};
/* rankings: lo que de verdad compró cada cliente en 30 días */
var _rk82=rankingHTML;rankingHTML=function(){if(MODO!=='vacio')return _rk82.apply(this,arguments);var d0=iso(new Date(TODAY.getTime()-30*864e5)),T={},keep={};
 Object.keys(HIST.reduce(function(o,r){o[r.d]=1;return o},{})).forEach(function(d){if(d<d0)return;rutasDia82(d).forEach(function(r){(r.log||[]).forEach(function(l){if(l&&!l.anul)T[l.c]=(T[l.c]||0)+num(l.total)})})});
 S.cli.forEach(function(c){keep[c.id]=c.c30;c.c30=Math.round(T[c.id]||0)});try{return _rk82.apply(this,arguments)}finally{S.cli.forEach(function(c){c.c30=keep[c.id]})}};
/* el día archivado guarda también lo que se recibió y se contó (para "¿Cuadran las cuentas?") */
/* → movido (tema-rutadia.js) */
/* → movido (tema-rutadia.js) */

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
function ancHalla82(a){if(a.el&&document.body.contains(a.el))return a.el;var L=document.querySelectorAll(a.tag);for(var i=0;i<L.length;i++){var x=L[i];if((x.getAttribute('data-act')||'')===a.act&&(x.getAttribute('data-k')||'')===a.k&&(x.getAttribute('data-v')||'')===a.v&&(x.getAttribute('data-p')||'')===(a.p||'')&&(x.textContent||'').trim().slice(0,40)===a.tx)return x}return null}
var PD82=null;window.addEventListener('pointerdown',function(e){PD82={x:e.clientX,y:e.clientY}},true);
window.addEventListener('pointerup',function(e){if(PD82&&(Math.abs(e.clientX-PD82.x)>10||Math.abs(e.clientY-PD82.y)>10))return;var el=e.target.closest&&e.target.closest('summary,button,[role="tab"],label');if(!el||el.closest('input,textarea,select'))return;if(!el.closest('main'))return;
 var a={el:el,tag:el.tagName.toLowerCase(),act:el.getAttribute('data-act')||'',k:el.getAttribute('data-k')||'',v:el.getAttribute('data-v')||'',p:el.getAttribute('data-p')||'',tx:(el.textContent||'').trim().slice(0,40),top:el.getBoundingClientRect().top,role:S.role,tab:S.tab&&S.tab[S.role],t0:Date.now()};
 var fija=function(){try{if(S.role!==a.role||(S.tab&&S.tab[S.role])!==a.tab)return;if(ANC82.t>=a.t0)return;if(document.querySelector('.ov70,#wzov,#fiov,#vwov,#setov,#dia80,#pinov:not([hidden])'))return;
  var ae=document.activeElement;if(ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)&&ae!==a.el)return;var x=ancHalla82(a);if(!x)return;var d=x.getBoundingClientRect().top-a.top;if(Math.abs(d)>12){var t=ANC82.t;window.scrollBy(0,d);ANC82.t=t}}catch(er){}};
 setTimeout(fija,30);setTimeout(fija,150);setTimeout(fija,450)},true);
/* el aviso "Lote de roatán (20 cajas) pasó su tiempo" es de MADURACIÓN: lleva a ese lote (botón "Sacar"), no a la fruta madura por antigüedad */
var _avD82=avDestino;avDestino=function(x){var r=_avD82.apply(this,arguments);try{var m=/^Lote de (roatán|macho) \(([\d.]+) (cajas|kg)\) pasó su tiempo/i.exec(String(x||''));if(m&&r){var pr=/roat/i.test(m[1])?'R':'M',q=num(m[2]),l=(S.lotes||[]).filter(function(o){return o.prod===pr&&num(o.q)===q})[0]||(S.lotes||[]).filter(function(o){return o.prod===pr})[0];
 r.t='bodega';r.sel=l?'[data-act="sacar"][data-id="'+l.id+'"]':'[data-act="sacar"]';delete r.lote68}}catch(e){}return r};

/* ---------- 46 · lo que carga el chofer: un solo cálculo, con lo que de verdad se ha entregado ----------
   Antes: arriba decía "no hay con qué calcularlo" y abajo "Tus 5 clientes suelen llevar ~8 cajas y 60 kg": ese "suelen llevar"
   era el 4 cajas / 30 kg que cada cliente nuevo copiaba de un cliente de la demo. */
var PROM82={k:'',m:{}};
function prom82(){var k=(S.rutasHist||[]).length+'|'+(S.log||[]).length;if(PROM82.k===k)return PROM82.m;var L={};var mete=function(l){if(!l||l.anul||l.c==null)return;(L[l.c]=L[l.c]||[]).push({R:num(l.R),M:num(l.M)})};
 (S.rutasHist||[]).slice().sort(function(a,b){return String(a.f).localeCompare(String(b.f))}).forEach(function(e){(e.log||[]).forEach(mete)});(S.log||[]).forEach(mete);
 var m={};Object.keys(L).forEach(function(c){var u=L[c].slice(-4);m[c]={R:Math.round(sum(u,function(x){return x.R})/u.length),M:Math.round(sum(u,function(x){return x.M})/u.length),n:u.length}});PROM82={k:k,m:m};return m}
sugCarga=function(){var P=MODO==='vacio'?prom82():null,L=(S.stops||[]).filter(function(x){return !x.done}).map(function(x){return cl(x.c)}).filter(Boolean),con=0;
 var R=sum(L,function(c){var p=pedHoy(c);if(p){con++;return num(p.R)}if(!P)return num(c.pR);var h=P[c.id];if(h)con++;return h?h.R:0}),M=sum(L,function(c){var p=pedHoy(c);if(p)return num(p.M);if(!P)return num(c.pM);var h=P[c.id];return h?h.M:0});
 if(P)return {R:R,M:M,sR:R?R+Math.max(2,Math.ceil(R*0.1)):0,sM:M?M+Math.max(5,Math.ceil(M*0.1)):0,n:con,tot:L.length};
 return {R:R,M:M,sR:R+Math.max(5,Math.ceil(R*0.1)),sM:M+Math.max(20,Math.ceil(M*0.1)),n:L.length}};
var _sch82=sugCargaHTML;sugCargaHTML=function(){if(MODO!=='vacio')return _sch82.apply(this,arguments);var s=sugCarga();if(!s.n||!(s.sR||s.sM))return '';
 return '<div class="card note" style="padding:10px 12px;margin:8px 0"><b>Sugerido para hoy: '+(s.sR?s.sR+' cajas':'')+(s.sR&&s.sM?' y ':'')+(s.sM?s.sM+' kg':'')+'</b><div class="lbl">'+s.n+' de tus '+s.tot+' clientes de hoy ya tienen historial o pedido: llevan ~'+(s.R?s.R+' cajas':'')+(s.R&&s.M?' y ':'')+(s.M?s.M+' kg':'')+', más un poco por si acaso.'+(s.n<s.tot?' A los otros '+(s.tot-s.n)+' todavía no se les ha entregado.':'')+'</div><button class="btn sm sec" style="margin-top:6px" data-act="usarsug">Usar lo sugerido</button></div>'};
/* la tarjeta de arriba dice lo mismo */
if(typeof stock72==='function'){var _st82=stock72;stock72=function(){if(MODO!=='vacio')return _st82.apply(this,arguments);if(S.role!=='rep'||S.salida.ok)return;var m=document.querySelector('main'),c=m&&m.querySelector('.card.rep1');if(!c||c.dataset.x72)return;var s=sugCarga();
 if(s.n&&(s.sR||s.sM)){c.dataset.x72='1';c.innerHTML='<div class="h">'+SV38.camion+'<span>¿Cuánto cargas hoy?</span></div><div style="font-size:19px;font-weight:800;margin-top:8px">Sugerido: '+(s.sR?s.sR+' cajas':'')+(s.sR&&s.sM?' y ':'')+(s.sM?s.sM+' kg':'')+'</div><div class="lbl" style="margin-top:4px">Con lo que de verdad llevan tus clientes de hoy'+(s.n<s.tot?' ('+s.n+' de '+s.tot+' tienen historial)':'')+'. Abajo, en "Iniciar el día", lo puedes usar con un toque.</div>';return}
 return _st82.apply(this,arguments)}}
/* datos de la demo que se copiaban a cada cliente y vehículo nuevo */
function limpiaTpl82(s){if(!s||MODO!=='vacio')return false;var ch=false,B=null;try{var b=(s.bods||[])[0];if(b&&b.lat!=null)B={lat:+b.lat,lng:+b.lng}}catch(e){}
 (s.cli||[]).forEach(function(c){if(num(c.pR)===4&&num(c.pM)===30){c.pR=0;c.pM=0;ch=true}if(num(c.km)===7&&num(c.min)===15){var k=B&&c.lat!=null?kmE(B,c):null;c.km=k!=null?Math.round(k*10)/10:0;c.min=k!=null?Math.round(k*2.5):0;ch=true}});
 (s.veh||[]).forEach(function(v){if(num(v.valor)===330000){v.valor=0;ch=true}if(num(v.precioC)===385000){v.precioC=0;ch=true}if(v.afDue==='2026-12-10'){v.afDue='';ch=true}if(num(v.kmMes)===3200){v.kmMes=0;ch=true}});return ch}
if(MODO==='vacio'){var _nc82=nuevoCli;nuevoCli=function(o){var c=_nc82.apply(this,arguments);c.pR=0;c.pM=0;if(num(c.km)===7&&num(c.min)===15){c.km=0;c.min=0}return c};
 var _nv82=nuevoVeh;nuevoVeh=function(o){var v=_nv82.apply(this,arguments);if(num(v.valor)===330000)v.valor=num(o&&o.valor)||0;if(num(v.precioC)===385000)v.precioC=num(o&&o.precioC)||0;if(v.afDue==='2026-12-10')v.afDue=(o&&o.afDue)||'';if(num(v.kmMes)===3200)v.kmMes=0;return v};
 limpiaTpl82(S);if(typeof nbAplica==='function'){var _nbA82=nbAplica;nbAplica=function(){var r=_nbA82.apply(this,arguments);if(limpiaTpl82(S)){setTimeout(function(){try{nbEmpuja()}catch(e){}},900);r=true}return r}}}
/* un cliente al que se le pone ubicación: su distancia desde la bodega */
var _rdKm82=render;render=function(){try{if(MODO==='vacio'){var b=(S.bods||[])[0];if(b&&b.lat!=null)(S.cli||[]).forEach(function(c){if(c.lat!=null&&!num(c.km)){var k=kmE({lat:+b.lat,lng:+b.lng},c);if(k){c.km=Math.round(k*10)/10;c.min=Math.round(k*2.5)}}})}}catch(e){}return _rdKm82.apply(this,arguments)};

/* ---------- 48 · fotos de evidencia: solo con la cámara, con marca completa, y el administrador las ve ----------
   Las fotos marcadas "solo cámara" (las 4 del vehículo, odómetro, tickets, combustible, fruta mala, lo que regresa…) ya no
   ofrecen "Galería"; una foto vieja (de más de 2 minutos) en una de ellas se rechaza. La marca va ARRIBA (abajo la tapaba la
   franja de fecha y placa): fecha y hora · quién · placa y vehículo. En Rutas, "📷 Fotos del vehículo" de cada chofer. */
function soloCam82(inp){return !!(inp&&inp.hasAttribute&&inp.hasAttribute('capture'))}
var _ca82=cam73Abre;cam73Abre=function(inp){var r=_ca82.apply(this,arguments);try{if(soloCam82(inp)){var g=document.querySelector('#cam73 [data-cam="gal"]');if(g){var s=document.createElement('span');s.setAttribute('style','width:64px;font-size:12px;text-align:center;color:#fff;opacity:.8');s.textContent='Solo cámara';g.replaceWith(s)}CAM73.solo82=1}else CAM73.solo82=0}catch(e){}return r};
var _cg82=cam73Galeria;cam73Galeria=function(){if(CAM73.solo82){toast('Esta foto solo se puede tomar con la cámara');return}return _cg82.apply(this,arguments)};
window.addEventListener('change',function(e){var t=e.target;if(!t||t.type!=='file'||!soloCam82(t))return;var f=t.files&&t.files[0];if(!f)return;if(f.lastModified&&Date.now()-f.lastModified>2*60000){e.stopImmediatePropagation();try{t.value=''}catch(er){}toast('Esta foto se toma en el momento con la cámara (no de la galería)')}},true);
var _cp82=cam73Prende;cam73Prende=function(){var r=_cp82.apply(this,arguments);if(CAM73.solo82)setTimeout(function(){var m=document.querySelector('#cam73 .msg');if(m&&/Galer/.test(m.innerHTML))m.innerHTML='No se pudo abrir la cámara.<br><span style="font-weight:400;font-size:15px">Dale permiso de cámara a la app: Ajustes del celular → Apps → Ruta Fácil → Permisos → Cámara.</span>'},1500);return r};
function vehFoto82(){try{if(S.vw&&S.vw.open){var v=vehById(+S.vw.veh);if(v)return v}return vehHoy()}catch(e){return null}}
cam73Sello=function(cx,w,h){var q='';try{q=quienFoto73()||''}catch(e){}var v=vehFoto82(),l1=new Date().toLocaleString('es-MX',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})+(q?' · '+q:''),l2=v&&(S.role==='rep'||S.vw&&S.vw.open)?('Placa '+(String(v.pl||'').toUpperCase()||'sin placa')+' · '+(v.n||'')):'';
 var hh=Math.max(22,Math.round(w*22/480)),n=l2?2:1;cx.fillStyle='rgba(0,0,0,.6)';cx.fillRect(0,0,w,hh*n);cx.fillStyle='#fff';cx.font='bold '+Math.round(hh*0.6)+'px sans-serif';cx.textBaseline='middle';cx.fillText(l1,Math.round(hh*0.3),hh/2);if(l2)cx.fillText(l2,Math.round(hh*0.3),hh*1.5)};
/* el administrador ve las fotos */
function fotoSrc82(x){if(!x)return null;if(typeof x==='object')x=x.src||x.url||x.d||null;if(typeof x!=='string')return null;if(/^(data:image|https?:|blob:)/.test(x))return x;return ''}
function fv82HTML(){var id=S.fv82;if(id==null||S.role!=='admin')return '';var sal=nbRGet(id,'salida')||{},F=sal.fotos||{},FF=sal.fotosFin||{},L=[['Al salir',F],['Al regresar',FF]],h='',hay=0;
 L.forEach(function(g){var it=FOTOS.concat([['odo','Odómetro']]).map(function(x){var s=fotoSrc82(g[1][x[0]]);if(s===null)return '';hay++;return '<figure style="margin:0"><div style="aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:var(--line);display:flex;align-items:center;justify-content:center">'+(s?'<img src="'+s+'" alt="'+esc(x[1])+'" style="width:100%;height:100%;object-fit:cover">':'<span class="lbl">Cargando la foto…</span>')+'</div><figcaption class="lbl" style="margin-top:4px">'+esc(x[1])+'</figcaption></figure>'}).join('');
  if(it)h+='<div class="card"><b>'+g[0]+'</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px">'+it+'</div></div>'});
 if(!hay)h='<div class="card note">'+esc(chofN(id))+' todavía no toma las fotos del vehículo hoy.</div>';
 var v=null;try{var vh=nbRGet(id,'vehHoy');v=vh!=null?vehById(+vh):null}catch(e){}
 return ovW70('fv82','Fotos de '+chofN(id),(v?'<div class="lbl" style="margin-bottom:6px">'+esc(v.n)+' · placa '+esc(String(v.pl||'').toUpperCase())+(sal.odoIni!=null?' · salió con '+num(sal.odoIni).toLocaleString('es-MX')+' km':'')+'</div>':'')+h+'<div class="lbl">Toca una foto para verla en grande. Cada una lleva la fecha, la hora, quién la tomó y la placa.</div>','fv82x')}
function fv82Pon(){var o=document.getElementById('fv82'),h=fv82HTML();if(!h){if(o)o.remove();return}if(o&&o._h===h)return;ovPon70('fv82',h);var n=document.getElementById('fv82');if(n){n._h=h;n.style.zIndex='99'}}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="fv82"],[data-act="fv82x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();if(b.dataset.act==='fv82x'){S.fv82=null;render();return}S.fv82=+b.dataset.id;render()},true);
var _rtF82=rt81HTML;rt81HTML=function(){var h=_rtF82.apply(this,arguments);if(!h||!S.rt81||S.rt81.dia!=='hoy')return h;return h.replace(/(<b style="font-size:18px">)([^<]*)(<\/b><br><span class="lbl">)/g,function(m,a,n,c){var ch=chs81().filter(function(x){return chofN(x.id)===n})[0];return ch?a+n+c.replace('<br>',' <button class="btn sm sec" data-act="fv82" data-id="'+ch.id+'" style="margin:4px 0 2px;min-height:36px">📷 Fotos del vehículo</button><br>'):m})};
var _rdF82=render;render=function(){var r=_rdF82.apply(this,arguments);try{fv82Pon()}catch(e){}return r};

/* ---------- 49–53 · lo que se nos estaba pasando (re-análisis 14 nov) ---------- */
/* 49 · ranking de choferes "este mes": de las rutas del mes (el contador .mes solo lo llenaba la demo) */
function mesCh82(){var m0=iso(TODAY).slice(0,7),T={};var pon=function(ch,L){var o=T[ch]=T[ch]||{ven:0,R:0,M:0,cob:0,cred:0};(L||[]).forEach(function(l){if(!l||l.anul)return;o.ven+=num(l.total);o.R+=num(l.R);o.M+=num(l.M);o.cob+=num(l.pago)+num(l.abono);o.cred+=Math.max(0,num(l.total)-num(l.pago))})};
 (S.rutasHist||[]).forEach(function(e){if(e&&String(e.f||'').slice(0,7)===m0)pon(+e.ch,e.log)});rutasDia82(iso(TODAY)).forEach(function(r){if(!r.arch)pon(+r.ch,r.log)});return T}
var _rkC82=typeof rankChof==='function'?rankChof:null;if(_rkC82)rankChof=function(){if(MODO!=='vacio')return _rkC82.apply(this,arguments);var T=mesCh82(),keep={};S.choferes.forEach(function(c){keep[c.id]=c.mes;c.mes=T[c.id]||{ven:0,R:0,M:0,cob:0,cred:0}});try{return _rkC82.apply(this,arguments)}finally{S.choferes.forEach(function(c){c.mes=keep[c.id]})}};
/* 51 · "última compra", "compras pagadas" y "este mes" de cada cliente: de las entregas, en cualquier celular */
function cliHist82(){var k=(S.rutasHist||[]).length+'|'+(S.log||[]).length+'|'+iso(TODAY);if(cliHist82.k===k)return cliHist82.m;var m0=iso(TODAY).slice(0,7),M={};var pon=function(f,L){(L||[]).forEach(function(l){if(!l||l.anul||l.c==null)return;var o=M[l.c]=M[l.c]||{ult:null,pag:0,mesR:0,mesM:0};if(!o.ult||f>o.ult)o.ult=f;if(num(l.total)>0&&num(l.pago)>=num(l.total)-0.005)o.pag++;if(f.slice(0,7)===m0){o.mesR+=num(l.R);o.mesM+=num(l.M)}})};
 (S.rutasHist||[]).forEach(function(e){if(e&&e.f)pon(e.f,e.log)});rutasDia82(iso(TODAY)).forEach(function(r){if(!r.arch)pon(iso(TODAY),r.log)});cliHist82.k=k;cliHist82.m=M;return M}
function cliSync82(){if(MODO!=='vacio')return;var M=cliHist82();(S.cli||[]).forEach(function(c){var o=M[c.id];if(!o)return;if(o.ult&&(!c.ult||o.ult>c.ult))c.ult=o.ult;if(o.pag>num(c.compras))c.compras=o.pag;if(o.mesR>num(c.mesR))c.mesR=o.mesR;if(o.mesM>num(c.mesM))c.mesM=r2(o.mesM)})}
/* el contador "este mes" de clientes se reinicia al cambiar de mes (nadie lo hacía) */
/* → movido (tema-rutadia.js) */
/* 52 · textos de la demo que llegaban a la app real */
var _cf82=typeof compFotos==='function'?compFotos:null;if(_cf82)compFotos=function(){var h=_cf82.apply(this,arguments);return MODO==='vacio'?String(h).replace('Sin fotos del vehículo en esta demo.','Este día no se tomaron las fotos del vehículo.'):h};
function txtDemo82(){if(MODO!=='vacio')return;var m=document.querySelector('main');if(!m)return;var w=document.createTreeWalker(m,NodeFilter.SHOW_TEXT),t,R=[['Las fotos y los datos son de ejemplo. En la versión APK se guardan cifrados y solo los ve el administrador.','Las fotos y los datos del personal solo los ve el administrador.'],['No hay datos en esa fecha. Hay información hasta ayer.','No hay movimientos en esa fecha.'],['El historial de ejemplo es solo de ruta; desde hoy la venta local se guarda aparte.','La venta en bodega se suma aparte de la de ruta.'],[', hasta ayer','']];
 while(t=w.nextNode()){var v=t.nodeValue;if(!/ejemplo|hasta ayer/.test(v))continue;R.forEach(function(r){v=v.split(r[0]).join(r[1])});if(v!==t.nodeValue)t.nodeValue=v}}
/* 53 · la "Revisión del lunes" vieja (llantas/frenos/aceite, salía a diario por la demo): fuera; ya existe la revisión semanal por pasos */
if(typeof REV_DEMO!=='undefined'&&MODO==='vacio'){REV_DEMO=false;revHTML=function(){return ''}}
var _rdX82=render;render=function(){try{cliSync82()}catch(e){}var r=_rdX82.apply(this,arguments);try{txtDemo82()}catch(e){}return r};

/* ---------- 55 · pedido "para hoy" a un chofer que YA mandó su cierre ----------
   Antes de la hora límite (Ajustes; tope 7:30 pm): te pregunta "¿Se lo mandas? Ya cerró" y al chofer le llega "¿Puedes llevar este
   pedido?" Sí/No (5 min). Si no puede, no contesta, o ya es tarde: pasa a mañana con ese chofer y te avisa "¿Lo pasas a otro?". */
function hLim82(){var h=String(S.cfg&&S.cfg.hPed82||'17:00');var m=/^(\d{1,2}):(\d{2})$/.exec(h);var mins=m?+m[1]*60+ +m[2]:17*60;return Math.min(mins,19*60+30)}
function tarde82(){var d=new Date();return d.getHours()*60+d.getMinutes()>=hLim82()}
function cerro82(id){try{var c=nbRGet(id,'cierre');return !!(c&&c.sent)}catch(e){return false}}
function pedManana82(c,id,por){ovPon81(man81(),c.id,id);if(c.ped)c.ped.cuando='mañana';S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'El pedido de '+c.n+' pasó a mañana con '+chofN(id)+' ('+por+')'});
 (S.avPrecio=S.avPrecio||[]).push('El pedido de '+c.n+' quedó para MAÑANA con '+chofN(id)+' ('+por+'). Si urge hoy, pásalo a otro chofer en Rutas.');try{rutaAviso(id,'Pedido para mañana: '+c.n)}catch(e){}}
var _p57A82=p57Asigna;p57Asigna=function(c,id){if(MODO!=='vacio'||!cerro82(id)||S.p57&&S.p57.fz82===+id)return _p57A82.apply(this,arguments);
 if(tarde82()){pedManana82(c,id,'ya cerró y pasa de la hora límite');return 'Ya es tarde: '+chofN(id)+' cerró, así que el pedido de '+c.n+' queda para mañana'}
 /* buena hora: se le pregunta al chofer */ S.pedQ82=S.pedQ82||[];S.pedQ82.push({id:Date.now(),c:c.id,ch:+id,t:Date.now(),f:iso(TODAY),est:'pend'});S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Le preguntó a '+chofN(id)+' si puede llevar el pedido de '+c.n+' (ya cerró)'});return 'Se le preguntó a '+chofN(id)+' si puede llevarlo (ya cerró). Si no contesta en 5 min, queda para mañana.'};
try{if(NB_SH.indexOf('pedQ82')<0)NB_SH.push('pedQ82')}catch(e){}
function pedQVence82(){var ch=false;(S.pedQ82||[]).forEach(function(p){if(p.est==='pend'&&Date.now()-p.t>PE_ESPERA){p.est='tiempo';ch=true;var c=cl(p.c);if(c&&(S.role==='admin'||S.encOn))pedManana82(c,p.ch,'no contestó')}});return ch}
/* el admin ve la espera */
function pedQAdm82(){if(!(S.role==='admin'&&!S.encOn)||S.tab.admin!=='inicio')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="pedq82"]'))return;pedQVence82();var L=(S.pedQ82||[]).filter(function(p){return p.f===iso(TODAY)&&(p.est==='pend'||Date.now()-p.t<PE_ESPERA+180000)});if(!L.length)return;
 var d=document.createElement('div');d.dataset.x='pedq82';d.innerHTML=L.map(function(p){var c=cl(p.c);return '<div class="card '+(p.est==='ok'?'good':(p.est==='pend'?'note':'alert'))+'" style="padding:10px 14px"><b>📦 Pedido de '+esc(c?c.n:'')+' · '+esc(chofN(p.ch))+' ya cerró</b><div>'+(p.est==='pend'?'Esperando a que diga si puede llevarlo…':(p.est==='ok'?'✓ Dijo que sí: ya lo tiene en su ruta.':'No puede hoy: el pedido quedó para mañana.'))+'</div></div>'}).join('');m.prepend(d)}
/* el chofer contesta */
function pedQRep82(){if(S.role!=='rep')return;pedQVence82();var m=document.querySelector('main');if(!m||m.querySelector('[data-x="pedq82r"]'))return;var L=(S.pedQ82||[]).filter(function(p){return p.ch===+S.chofHoy&&p.f===iso(TODAY)&&p.est==='pend'});if(!L.length)return;
 var d=document.createElement('div');d.dataset.x='pedq82r';d.innerHTML=L.map(function(p){var c=cl(p.c),q=c&&c.ped||{};return '<div class="card alert" style="padding:12px 14px"><b style="font-size:18px">📦 ¿Puedes llevar este pedido?</b><div style="font-size:17px;margin-top:4px">'+esc(c?c.n:'')+(num(q.R)||num(q.M)?' · '+(num(q.R)?num(q.R)+' cajas':'')+(num(q.R)&&num(q.M)?' y ':'')+(num(q.M)?num(q.M)+' kg':''):'')+'</div><div class="lbl">Ya mandaste tu cierre. Si vas, se reabre tu ruta solo para esta entrega y haces un cierre corto al terminar.</div><div style="display:flex;gap:8px;margin-top:10px"><button class="btn sec" style="flex:1;min-height:54px" data-act="pedq82" data-id="'+p.id+'" data-v="no">No puedo</button><button class="btn" style="flex:2;min-height:54px" data-act="pedq82" data-id="'+p.id+'" data-v="si">Sí, lo llevo</button></div></div>'}).join('');m.prepend(d)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pedq82"]');if(!b)return;e.stopImmediatePropagation();var p=(S.pedQ82||[]).filter(function(x){return String(x.id)===b.dataset.id})[0];if(!p||p.est!=='pend')return;var c=cl(p.c);
 if(b.dataset.v==='si'){p.est='ok';if(c){S.stops=S.stops||[];if(!S.stops.some(function(s){return +s.c===c.id&&!s.done}))S.stops.push({c:c.id,ped:true,tarde82:1});S.cierre.sent=false;S.cierre.reab82=1;S.tab.rep='ruta';S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Aceptó llevar el pedido de '+c.n+' después de su cierre'})}toast('Listo: se reabrió tu ruta solo para este pedido')}
 else{p.est='no';if(c)pedManana82(c,p.ch,'dijo que no puede');toast('Se avisó: el pedido queda para mañana')}render()},true);
/* Ajustes: la hora límite */
var _ajP82=ajHTML;ajHTML=function(){var h=_ajP82.apply(this,arguments);if(!h||h.indexOf('id="ajov"')<0||S.role!=='admin'||S.encOn)return h;
 var c='<details class="card" data-k="ajped82"'+(S.dOpen.ajped82?' open':'')+'><summary><b>Pedidos tarde</b><span class="lbl">hasta qué hora se mandan hoy</span></summary><div class="lbl" style="margin-top:6px">Si un chofer ya mandó su cierre y le asignas un pedido para hoy antes de esta hora, se le pregunta si puede llevarlo. Después de esta hora (y siempre después de las 7:30 pm) el pedido pasa a mañana.</div><div class="field"><label for="cfg_hPed82">Hora límite</label><input id="cfg_hPed82" type="time" data-bind="cfg.hPed82" value="'+esc(S.cfg.hPed82||'17:00')+'" max="19:30"></div></details>';
 var i=h.lastIndexOf('</div></div>');return i<0?h:h.slice(0,i)+c+h.slice(i)};

/* ---------- 56 · kilos sueltos de la venta en bodega: en Bodega y en el conteo ---------- */
function sueltos82(){return r2(num(S.vlAbierta))}
function sueltosPon82(){if(S.role!=='admin'||S.tab.admin!=='bodega')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="suel82"]'))return;var k=sueltos82();if(!(k>0))return;var ref=m.querySelector('[data-act="registrarcnt"]');if(!ref)return;var c=ref.closest('.card');if(!c)return;
 var d=document.createElement('div');d.dataset.x='suel82';d.className='field';d.innerHTML='<label for="cnt82s">Kg sueltos de roatán (caja abierta en venta local) (app: '+k+')</label><input id="cnt82s" type="number" inputmode="decimal" step="any" min="0" data-bind="cnt82.suel" value="'+esc(S.cnt82&&S.cnt82.suel!=null?S.cnt82.suel:'')+'"><div class="lbl">Siguen para mañana. Si cuentas menos, la diferencia es merma.</div>';ref.before(d)}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="registrarcnt"]');if(!b)return;var X=S.cnt82||{};if(X.suel==null||String(X.suel).trim()==='')return;var fis=num(X.suel),app=sueltos82(),dif=r2(app-fis);if(dif<=0.001){S.vlAbierta=fis;return}
 setTimeout(function(){try{var cR=0;try{cR=costoCajaAct()/(num(vlKgCaja())||20)}catch(er){}S.mermas.push({tipo:'Día',fecha:iso(TODAY),R:0,M:0,kgS82:dif,valor:r2(dif*cR),txt:'Kg sueltos de roatán: faltan '+dif+' kg',mot82:X.mot==='Otro'?'Otro: '+String(X.otro||'').trim():(X.mot||'Se echó a perder (merma)')});S.vlAbierta=fis;S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Conteo: faltan '+dif+' kg sueltos de roatán ('+money(dif*cR)+')'});render()}catch(er){}},5)},true);
/* la tarjeta de Bodega lo dice claro */
function sueltosTxt82(){if(S.role!=='admin'&&S.role!=='local')return;var m=document.querySelector('main');if(!m)return;var w=document.createTreeWalker(m,NodeFilter.SHOW_TEXT),t;while(t=w.nextNode()){var v=t.nodeValue;if(v.indexOf('Caja de roatán abierta: le quedan')<0)continue;t.nodeValue=v.replace(/Caja de roatán abierta: le quedan ~([\d.]+) kg\./,'Kg sueltos de roatán (caja abierta): ~$1 kg. Siguen para mañana; se cuentan en "Contar bodega".')}}

/* ---------- 58 · taras que faltan al recibir al chofer: se le cargan (igual que la fruta) ---------- */
/* l12 ya suma las taras que faltan al faltante al precio de la tara (recFaltaMonto usa cfg.cajaVal). Lo que faltaba: que el precio sea el de Ajustes → Taras, y las que SOBRAN se abonen. */
recFaltaMonto=function(d){var pt=num(S.cajaCfg&&S.cajaCfg.precio)||num(S.cfg.cajaVal||45);return r2(Math.max(0,-d.dR)*num(S.precio.R)+Math.max(0,-d.dM)*num(S.precio.M)+Math.max(0,-d.dV)*pt)};
var _rT82=recFaltaTxt;recFaltaTxt=function(d){var t=_rT82.apply(this,arguments);return t.replace(/caja(s?) vacía(s?)/,'tara$1')};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="recep"]');if(!b)return;setTimeout(function(){try{var r=S.recep;if(!r||r.sob82||!(num(r.dV)>0))return;r.sob82=1;var pt=num(S.cajaCfg&&S.cajaCfg.precio)||num(S.cfg.cajaVal||45),m=r2(num(r.dV)*pt);
 S.faltantes.push({ch:+S.chofHoy,m:-m,fecha:iso(TODAY),desc:true,pend:true,rec:1,txt:'Trajo '+num(r.dV)+' tara'+(num(r.dV)>1?'s':'')+' de más'});S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Recepción: '+chofN(S.chofHoy)+' trajo '+num(r.dV)+' taras de más (se le abonan '+money(m)+')'});toast('Trajo taras de más: se le abonan '+money(m))}catch(er){}},30)},true);

/* ---------- 59 · días sin movimientos: no se pide precio ni cierre de caja; "cuadran las cuentas" lo dice ---------- */
function sinMov82(d){var hay=false;try{rutasDia82(d).forEach(function(r){if(!rutaVacia(r.r||{log:r.log,salida:{ok:false}})||(r.log||[]).length)hay=true});if((S.vlVentas||[]).some(function(v){return v.f82===d}))hay=true;if((S.gastos||[]).some(function(g){return (g.f||g.f82)===d&&!/Retiro/.test(g.t||'')}))hay=true;if((S.cargas||[]).some(function(c){return c.fecha===d&&c.est!=='Por llegar'}))hay=true}catch(e){return false}return !hay}
var _cAP82=cajaAyerPend;cajaAyerPend=function(){if(_cAP82.apply(this,arguments)===false)return false;try{var y=ayerIso();if(sinMov82(y)){S.sinTrabajo=(S.sinTrabajo||[]).concat([y]).filter(function(x,i,a){return a.indexOf(x)===i});S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:'App',x:'El '+fmtF(y)+' no hubo movimientos: no se pide cierre de caja'});return false}}catch(e){}return true};
var _pI82=popItems;popItems=function(){var L=_pI82.apply(this,arguments);try{if(S.role==='admin'&&sinMov82(iso(TODAY))&&new Date().getHours()>=12){L=L.filter(function(x){return !(x&&x.t==='Precio de hoy')})}}catch(e){}return L};
var _cu82=cuadre82;cuadre82=function(d){var F=_cu82.apply(this,arguments);try{if(sinMov82(d))F.forEach(function(o){o.e='ok';o.L=['Día sin movimientos.']})}catch(e){}return F};
var _rdY82=render;render=function(){try{pedQVence82()}catch(e){}var r=_rdY82.apply(this,arguments);try{pedQAdm82();pedQRep82();sueltosPon82();sueltosTxt82()}catch(e){console.error('l82b',e)}return r};
