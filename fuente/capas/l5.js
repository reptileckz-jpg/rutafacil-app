/* ===================== v3.9 · 5. Cuentas seguras ===================== */
/* ---- 5.1 Efectivo en caja = lo que de verdad está en la caja ----
   Antes: contaba lo que cobraba el chofer como si ya estuviera en la caja, sin restar sus gastos de ruta,
   y al empezar un segundo cierre se perdía el primero. Ahora: el dinero del chofer entra a la caja cuando
   el administrador lo recibe (lo que de verdad le entregó). Mientras tanto se ve aparte: "Con el chofer". */
function cierresCaja(){return sum(S.cierresPrev||[],function(x){return num(x.rec)})+(S.cierreReg?num(S.cierreReg.rec):0)}
function cajaBase(){return S.cajaBase!=null?num(S.cajaBase):(window.PN_MODO==='vacio'?0:15290)}
cajaEsp=function(){return aportesTot()-(S.vjEfeOut||0)+(S.vjEfeBack||0)+cajaBase()+cierresCaja()+cobAdm()-addedG()-cargaOut()-provPagTot()-viajeAdel()+sum(S.cargas.filter(function(c){return c.viaje&&c.viaje.liq}),function(c){return c.viaje.liq.rec-c.viaje.efe+c.viaje.fin.pago+c.viaje.fin.gastos})};
/* lo que trae el chofer y todavía no entrega */
function conChofer(){return S.cierreReg?0:Math.max(0,logCash()-gchTot()-recTot())}
/* los gastos del chofer los paga él con el dinero de la ruta: no salen de la caja (ya vienen restados de lo que entrega) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="enviar"]');if(!b)return;setTimeout(function(){(S.gastos||[]).forEach(function(g){if(g.tmp&&(g.t==='Combustible de reparto'||g.t==='Gasto de ruta'))g.caja=false})},0)},true);

/* ---- 5.2 Nada se borra: se ANULA con motivo ---- */
S.anulados=S.anulados||[];
var MOTIVOS=['Me equivoqué de monto','Se registró dos veces','No se hizo','Otro'];
function anularPide(tipo,i,desc){S.anF={tipo:tipo,i:i,desc:desc,mot:'',otro:''};abrirModal('Anular '+esc(desc),'<div class="lbl">No se borra: queda tachado con quién, cuándo y por qué. Si era un error de monto, después registra el correcto.</div><div class="chips" style="margin:8px 0;flex-wrap:wrap" role="group" aria-label="Motivo">'+MOTIVOS.map(function(m){return '<button data-act="anmot" data-v="'+m+'">'+m+'</button>'}).join('')+'</div><div class="field"><label for="anotro">Detalle (opcional)</label><input id="anotro" type="text" data-bind="anF.otro" style="width:180px;text-align:left"></div>',[['Anular','anularok']])}
function anularHaz(){var f=S.anF;if(!f)return;var mot=(f.mot||'')+(f.otro?(f.mot?' · ':'')+f.otro:'');if(!mot.trim()){toast('Escoge el motivo');return false}
 var it=null,arr=null,extra='';
 if(f.tipo==='g'){arr=S.gastos;it=arr[f.i]}
 if(f.tipo==='ch'){arr=S.gch;it=arr[f.i]}
 if(f.tipo==='rc'){arr=S.recs;it=arr[f.i]}
 if(f.tipo==='pd'){arr=S.prov;it=arr[f.i]}
 if(f.tipo==='fijo'){var fz=S.fijos[f.i];if(!fz)return;var gi=-1;S.gastos.forEach(function(g,k){if(gi<0&&g.n===fz.n&&(g.t==='Gasto fijo'||g.t==='Retiro del dueño')&&(!g.f||g.f===fz.pag))gi=k});arr=S.gastos;it=gi>=0?S.gastos[gi]:null;f.i=gi;fz.pag=null;extra=' (pago de '+fz.n+')'}
 if(!it){S.modal=null;S.anF=null;render();return true}
 arr.splice(f.i,1);var reg={tipo:f.tipo,item:it,desc:f.desc+extra,motivo:mot,por:quien(),f:iso(TODAY),h:hhmm()};S.anulados.push(reg);
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Anuló '+f.desc+extra+': '+mot});
 if(S.role==='rep')S.avPrecio.push(chofN(S.chofHoy)+' anuló '+f.desc+' ('+mot+')');
 S.modal=null;S.anF=null;S.gsheet=null;toast('Anulado: '+f.desc);render();return true}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,D=b.dataset;
 if(a==='gxdel2'){e.stopImmediatePropagation();var x=S.gastos[+D.i];if(x)anularPide('g',+D.i,'el gasto '+x.t+' de '+money(x.m));return}
 if(a==='gxdel'){e.stopImmediatePropagation();var y=S.gch[+D.i];if(y)anularPide('ch',+D.i,'el gasto '+y.tipo+' de '+money(y.m));return}
 if(a==='delrec'){e.stopImmediatePropagation();var r=S.recs[+D.i];if(r)anularPide('rc',+D.i,'la recarga de '+money(r.total));return}
 if(a==='fijodespagar'){e.stopImmediatePropagation();var fz=S.fijos[+D.i];if(fz)anularPide('fijo',+D.i,'el pago de '+fz.n+' ('+money(num(fz.m))+')');return}
 if(a==='pdborrar'){e.stopImmediatePropagation();var pd=S.prov[+D.i];if(pd)anularPide('pd',+D.i,'la deuda con '+pd.n+' de '+money(num(pd.tot)));return}
 if(a==='anmot'){e.stopImmediatePropagation();if(S.anF)S.anF.mot=D.v;Array.prototype.forEach.call(document.querySelectorAll('[data-act="anmot"]'),function(x){x.setAttribute('aria-pressed',String(x===b))});return}
 if(a==='anularok'){e.stopImmediatePropagation();anularHaz();return}},true);
/* el modal de deslizar un gasto ya no dice "borrar" */
/* sw2Hecho: pasó a tema-piezas.js */
function anuladosHTML(){var L=S.anulados||[];if(!L.length)return '';return '<details class="card" data-k="anul"'+(S.dOpen.anul?' open':'')+'><summary><b>Anulados</b><span class="lbl">'+L.length+' · no cuentan en nada</span></summary>'+L.slice().reverse().map(function(r){var m=r.item&&(r.item.m!=null?r.item.m:(r.item.total!=null?r.item.total:r.item.tot));return '<div class="row"><span><s>'+esc(r.desc)+'</s><br><span class="lbl">'+esc(r.motivo)+' · '+esc(r.por)+' · '+fmtF(r.f)+' '+esc(r.h)+'</span></span><b style="text-decoration:line-through;color:var(--muted)">'+money(num(m))+'</b></div>'}).join('')+'</details>'}

/* ---- 5.3 El chofer puede corregir una entrega ya guardada (te llega aviso, no necesita permiso) ---- */
S.entSnap=S.entSnap||{};S.entCorr=S.entCorr||[];
var CLIK=['cred','credDesde','compras','vac','vacDesde','nuevo','extra','ult','c30','mesR','mesM','ped','conf','lat','lng','gpsPor','n','ap','a','tel','credOk','rapida','oculto','f','chofer','dp'];
function cpy(o){return o==null?o:JSON.parse(JSON.stringify(o))}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="guardar"]');if(!b||S.role!=='rep'||!S.d)return;var c=curCli(),i=curStop();if(!c||i<0)return;
 var pre={c:c.id,i:i,inv:{reparto:S.inv.reparto,repartoKg:S.inv.repartoKg},cli:{},stop:cpy(S.stops[i]),reloj:S.reloj,otros:cpy(S.otrosPend),pend:cpy(S.pendManana),d:cpy(S.d),n0:S.log.length};CLIK.forEach(function(k){pre.cli[k]=cpy(c[k])});pre.cli.dias=cpy(c.dias);
 var corr=S.corrigiendo;setTimeout(function(){if(S.log.length>pre.n0){var li=S.log.length-1;S.entSnap[li]=pre;
  if(corr&&corr.c===c.id){var l=S.log[li],an=corr.antes;var t=function(x){return x.R+' cajas, '+x.M+' kg, '+money(x.total)+(x.total-x.pago>0.005?' (crédito '+money(x.total-x.pago)+')':'')};
   S.avPrecio.push(chofN(S.chofHoy)+' corrigió la entrega de '+c.n+': antes '+t(an)+'; ahora '+t(l));S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Corrigió la entrega de '+c.n+' (antes '+t(an)+'; ahora '+t(l)+')'});
   S.entCorr.push({c:c.id,antes:an,ahora:cpy(l),h:hhmm()});l.corr=1;S.corrigiendo=null;render()}}},30)},true);
function entCorregir(si){var st=S.stops[si];if(!st||!st.done||S.cierre.sent)return;var li=st.logI,l=S.log[li],pre=S.entSnap[li];if(!l||!pre){toast('Esta entrega no se puede corregir desde aquí. Avísale al administrador.');return}
 var c=cl(l.c);var after={inv:{reparto:S.inv.reparto,repartoKg:S.inv.repartoKg},cli:{},stop:cpy(st),reloj:S.reloj,otros:cpy(S.otrosPend),pend:cpy(S.pendManana)};CLIK.forEach(function(k){after.cli[k]=cpy(c[k])});after.cli.dias=cpy(c.dias);
 /* deshacer el efecto de la entrega */
 S.inv.reparto=r2(S.inv.reparto+l.R);S.inv.repartoKg=r2(S.inv.repartoKg+l.M);CLIK.forEach(function(k){c[k]=cpy(pre.cli[k])});c.dias=cpy(pre.cli.dias);
 S.log.splice(li,1);S.stops.forEach(function(s){if(s.logI!=null&&s.logI>li)s.logI--});var ns={};Object.keys(S.entSnap).forEach(function(k){var n=+k;if(n<li)ns[n]=S.entSnap[k];else if(n>li)ns[n-1]=S.entSnap[k]});S.entSnap=ns;
 st.done=false;delete st.logI;st.sal=null;S.otrosPend=cpy(pre.otros)||S.otrosPend;
 S.corrigiendo={c:c.id,si:si,li:li,l:l,pre:pre,after:after,antes:{R:l.R,M:l.M,total:l.total,pago:l.pago,abono:l.abono,V:l.V}};
 S.cur=si;resetDraft(c);S.d=cpy(pre.d);S._d0=JSON.stringify(S.d);S.tab.rep='entrega';toast('Corrige lo que haga falta y vuelve a guardar');render();window.scrollTo(0,0)}
/* si sale sin volver a guardar, la entrega se queda como estaba */
function entCorrDeshacer(){var k=S.corrigiendo;if(!k)return;var c=cl(k.c),st=S.stops[k.si];S.log.splice(k.li,0,k.l);S.stops.forEach(function(s){if(s!==st&&s.logI!=null&&s.logI>=k.li)s.logI++});var ns={};Object.keys(S.entSnap).forEach(function(x){var n=+x;ns[n>=k.li?n+1:n]=S.entSnap[x]});ns[k.li]=k.pre;S.entSnap=ns;
 S.inv.reparto=k.after.inv.reparto;S.inv.repartoKg=k.after.inv.repartoKg;CLIK.forEach(function(x){c[x]=cpy(k.after.cli[x])});c.dias=cpy(k.after.cli.dias);Object.keys(k.after.stop).forEach(function(x){st[x]=k.after.stop[x]});st.logI=k.li;S.otrosPend=k.after.otros;S.corrigiendo=null}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,D=b.dataset;
 if(a==='entcorr'){e.stopImmediatePropagation();entCorregir(+D.i);return}
 if(S.corrigiendo&&S.role==='rep'&&(a==='entvolver'||a==='entvolver2'||(a==='tab'&&D.t!=='entrega'))&&!D.ok){e.stopImmediatePropagation();var tgt=b;abrirModal('¿Dejar la entrega como estaba?','No guardaste la corrección. La entrega se queda como la habías guardado antes.',[['Sí, dejarla como estaba','corrno',' data-ok="1"']]);window._corrNext=function(){if(a==='tab'){S.tab.rep=D.t}else S.tab.rep='ruta'};return}
 if(a==='corrno'){e.stopImmediatePropagation();S.modal=null;entCorrDeshacer();var f=window._corrNext;window._corrNext=null;if(f)f();else S.tab.rep='ruta';toast('La entrega quedó como estaba');render();return}},true);

/* ---- 5.4 Revisión automática de cuentas ---- */
function cuentasRevisar(){var R=[],ok=function(n,c,det){R.push({n:n,ok:!!c,det:det||''})},fin=function(x){return typeof x==='number'&&isFinite(x)};
 var I=S.inv,caja=cajaEsp(),deb=credTotal(),pd=provDeb(),pv=sum(pd,function(p){return p.pen});
 ok('Los números se pueden calcular',[caja,deb,pv,I.verdes,I.maduras,I.kgVerde,I.kgMaduro,I.reparto,I.repartoKg,I.vacias,logCash(),cobAdm(),addedG()].every(fin),'Algún número salió vacío o inválido');
 var neg=[['cajas verdes',I.verdes],['cajas maduras',I.maduras],['kilos de macho verde',I.kgVerde],['kilos de macho maduro',I.kgMaduro],['cajas en el camión',I.reparto],['kilos en el camión',I.repartoKg],['cajas vacías',I.vacias]].filter(function(x){return x[1]<-0.001});
 ok('Inventario sin números negativos',!neg.length,neg.map(function(x){return x[0]+': '+x[1]}).join(', '));
 var cn=S.cli.filter(function(c){return c.cred<-0.5});ok('Ningún cliente con deuda negativa',!cn.length,cn.map(function(c){return c.n+' '+money(c.cred)}).join(', '));
 var cd=S.cli.filter(function(c){return c.cred>0.005&&!c.credDesde&&!c.oculto});ok('Cada deuda tiene desde cuándo',!cd.length,cd.map(function(c){return c.n}).join(', '));
 var w=cajasDonde();ok('Las cajas cuadran con dónde están',Math.abs(w.tot-(w.vac+w.llenas+w.cam+(w.camV||0)+w.cli+w.pv))<0.5&&w.cli===sum(S.cli.filter(function(c){return !c.oculto}),function(c){return c.vac}),'Total '+w.tot);
 if(S.cajasT0!=null&&!(S.setup&&!S.setup.fin))ok('Ninguna caja se pierde sin registrarse',Math.abs(w.tot-cajasEsperadas())<0.5,'hay '+w.tot+' y deberían ser '+cajasEsperadas());
 var vn=S.cli.filter(function(c){return c.vac<0});ok('Ningún cliente debe cajas negativas',!vn.length,vn.map(function(c){return c.n}).join(', '));
 var sp=sum(provNames(),function(n){return provSaldo(n)});ok('Deuda a proveedores: total = suma por proveedor',Math.abs(sp-pv)<0.5,money(sp)+' contra '+money(pv));
 var bad=S.log.filter(function(l){var t=num(l.R)*num(l.pr)+num(l.M)*num(l.pm);return Math.abs(t-num(l.total))>0.6||num(l.pago)>num(l.total)+0.005||num(l.pago)<-0.005||num(l.abono)<-0.005});
 ok('Cada entrega: cantidades × precio = total',!bad.length,bad.map(function(l){var c=cl(l.c);return (c?c.n:'?')+' '+money(l.total)}).join(', '));
 var r=cierreRes();ok('Efectivo del chofer = cobrado − sus gastos',Math.abs(r.efectivo-(logCash()-gchTot()-recTot()))<0.01,money(r.efectivo));
 ok('Lo cobrado hoy = pagos + abonos de las entregas',Math.abs(logCash()-sum(S.log,function(l){return num(l.pago)+num(l.abono)}))<0.01);
 var gt=(S.gastos||[]).filter(function(g){return !(num(g.m)>0)});ok('Todos los gastos tienen monto',!gt.length,gt.map(function(g){return g.t}).join(', '));
 var an=(S.anulados||[]).filter(function(x){return x.tipo==='g'&&S.gastos.indexOf(x.item)>-1});ok('Lo anulado no se cuenta',!an.length);
 var fp=S.fijos.filter(function(f){return f.pag&&!S.gastos.some(function(g){return g.n===f.n})&&f.pag===iso(TODAY)});ok('Cada gasto fijo pagado hoy salió de la caja',!fp.length,fp.map(function(f){return f.n}).join(', '));
 var dup={};S.fijos.forEach(function(f){var n=S.gastos.filter(function(g){return g.n===f.n&&(g.t==='Gasto fijo'||g.t==='Retiro del dueño')&&g.f===iso(TODAY)}).length;if(n>1)dup[f.n]=n});ok('Ningún gasto fijo se pagó dos veces hoy',!Object.keys(dup).length,Object.keys(dup).join(', '));
 if(S.cierreReg&&S.cierre.res){var fx=S.cierreReg.f!=null?S.faltantes[S.cierreReg.f]:null,d0=num(S.cierreReg.rec)-S.cierre.res.efectivo;ok('Faltante del chofer = lo que debía − lo que entregó',d0>-0.005||(fx&&Math.abs(fx.m+d0)<0.01),money(d0))}
 return R}
var _cuMal='';
function cuentasHTML(){var R=cuentasRevisar(),m=R.filter(function(x){return !x.ok});
 return '<details class="card'+(m.length?' alert':'')+'" data-k="cuentas"'+(S.dOpen.cuentas||m.length?' open':'')+'><summary><b>'+(m.length?'⚠ Algo no cuadra':'✓ Las cuentas cuadran')+'</b><span class="lbl">'+(R.length-m.length)+' de '+R.length+' revisiones</span></summary>'
  +R.map(function(x){return '<div class="row"><span>'+(x.ok?'✓ ':'⚠ ')+esc(x.n)+(x.ok||!x.det?'':'<br><span class="lbl neg">'+esc(x.det)+'</span>')+'</span></div>'}).join('')+'<div class="lbl">La app se revisa sola después de cada movimiento.</div></details>'}
/* aviso si algo deja de cuadrar */
/* avisos: pasó a tema-avisos.js */
var _rL5=render;render=function(){_rL5.apply(this,arguments);try{var R=cuentasRevisar().filter(function(x){return !x.ok}).map(function(x){return x.n}).join('|');if(R&&R!==_cuMal)setTimeout(function(){toast('⚠ Algo no cuadra: '+R.split('|')[0]+'. Revísalo en Estadísticas.')},10);_cuMal=R;
 var m=document.querySelector('main');if(!m)return;
 if(S.role==='admin'&&S.tab.admin==='estadisticas'&&!m.querySelector('[data-k="cuentas"]')){var h1=m.querySelector('h1'),w=document.createElement('div');w.innerHTML=cuentasHTML();if(h1)h1.after(w.firstElementChild)}
 if(S.role==='cont'&&S.tab.cont==='cres'&&!m.querySelector('[data-k="cuentas"]')){var w2=document.createElement('div');w2.innerHTML=cuentasHTML();var n1=m.querySelector('.card.note');if(n1)n1.after(w2.firstElementChild)}
 if(((S.role==='admin'&&S.tab.admin==='gastos')||(S.role==='cont'&&S.tab.cont==='cgas'))&&!m.querySelector('[data-k="anul"]')&&S.anulados.length){var w3=document.createElement('div');w3.innerHTML=anuladosHTML();var ft=m.querySelector('.foot');if(ft)ft.before(w3.firstElementChild)}
 Array.prototype.forEach.call(m.querySelectorAll('.lbl'),function(x){if(x.textContent==='Toca uno para corregirlo. Deslízalo a un lado para borrarlo.')x.textContent='Toca uno para corregirlo. Deslízalo a un lado para anularlo (queda registrado).'});
 /* "con el chofer" en Finanzas y en el cierre de caja */
 if(S.role==='admin'&&S.tab.admin==='inicio'){var cc=conChofer(),cj=Array.prototype.slice.call(m.querySelectorAll('details[data-k="cajadia"]'))[0];if(cj&&cc>0.5&&!cj.querySelector('[data-conch]')){var rr=document.createElement('div');rr.setAttribute('data-conch','1');rr.className='lbl';rr.style.margin='6px 0';rr.innerHTML='Además, <b>'+money(cc)+'</b> los trae '+esc(chofN(S.chofHoy))+' y todavía no los entrega (no cuentan en la caja).';var sm=cj.querySelector('summary');if(sm)sm.after(rr)}}
 /* botón Corregir en las entregas hechas */
 if(S.role==='rep'&&S.tab.rep==='ruta'&&!S.cierre.sent){Array.prototype.forEach.call(m.querySelectorAll('.stop'),function(row,k){})}
}catch(e){console.error(e)}};
/* lista de entregas hechas con botón para corregir */
function corrListaHTML(){if(S.role!=='rep'||S.cierre.sent)return '';var L=S.stops.map(function(s,i){return {s:s,i:i}}).filter(function(o){return o.s.done&&o.s.logI!=null&&S.log[o.s.logI]});if(!L.length)return '';
 return '<details class="card" data-k="entdone"'+(S.dOpen.entdone?' open':'')+'><summary><b>Entregas hechas</b><span class="lbl">'+L.length+' · toca Corregir si te equivocaste</span></summary>'+L.map(function(o){var l=S.log[o.s.logI],c=cl(l.c);return '<div class="row"><span>'+esc(c?c.n:'')+'<br><span class="lbl">'+l.R+' cajas · '+l.M+' kg · '+money(l.total)+(l.corr?' · corregida':'')+'</span></span><button class="btn sm sec" style="width:auto" data-act="entcorr" data-i="'+o.i+'">Corregir</button></div>'}).join('')+'<div class="lbl">Al corregir, al administrador le llega el aviso con lo de antes y lo de ahora.</div></details>'}
/* las cajas vacías que el chofer ya recogió van en el camión: cuentan en el total */
/* cajasDonde: pasó a tema-cajas.js */
/* al cerrar, las cajas de la fruta que se cambió regresan vacías */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="enviar"]');if(!b||!b.dataset.ok&&!(S.cierre&&S.cierre.gxConf))return;var L=(S.cambios||[]).filter(function(x){return !x.dev});setTimeout(function(){if(S.cierre.sent){L.forEach(function(x){if(!x.dev){S.inv.vacias+=num(x.R);x.dev=1}})}},0)},true);
/* cuántas cajas hay en total solo cambia por compras, ajustes, rotas o cobradas */
function cajasMovTot(){return sum((S.cajasMov||[]).filter(function(m){return !/Regresaron sin llenar/.test(m.t)}),function(m){return num(m.n)})}
function cajasEsperadas(){var vr=S.cierre&&!S.cierre.sent?sum(S.log,function(l){return num(l.Vr)}):0;return S.cajasT0+cajasMovTot()-vr}
(function(){var fij=function(s){var sv=S;S=s;try{s.cajasT0=cajasDonde().tot-cajasMovTot()}finally{S=sv}return s};var _frC=fresh;fresh=function(){return fij(_frC.apply(this,arguments))};fij(S)})();

/* pagar a un proveedor una deuda anotada a mano: también sale de la caja (antes bajaba la deuda pero el dinero no salía) */
provPagar=function(prov,m,forma,cid){var rest=num(m),tot0=rest;forma=forma||'Efectivo';
 if(!cid){(S.prov||[]).filter(function(d){return d.n===prov&&num(d.tot)-num(d.ab)>0.005}).sort(function(a,b){return String(a.f||'').localeCompare(String(b.f||''))}).forEach(function(d){if(rest<=0.005)return;var x=r2(Math.min(rest,num(d.tot)-num(d.ab)));d.ab=r2(num(d.ab)+x);rest=r2(rest-x);if(forma==='Efectivo')S.provPag.push({n:prov,m:x,f:iso(TODAY),q:quien()});else S.provPagT=(S.provPagT||[]).concat([{n:prov,m:x,f:iso(TODAY),forma:forma}])})}
 var man=r2(tot0-rest);if(man>0.005)S.avPrecio.push(quien()+' le pagó '+money(man)+' a '+prov+' · '+(forma==='Efectivo'?'efectivo de caja':String(forma).toLowerCase()));
 if(rest>0.005)rest=r2(rest-num(_provPagarI(prov,rest,forma,cid)||0));return r2(tot0-rest)};
