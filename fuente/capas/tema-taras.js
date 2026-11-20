/* ===================== TEMA · Taras prestadas y deudas en la entrega (nació como tema, 17 nov · puntos 108 y 109) =====================
   108 · Cobrarle las taras al cliente (Ricardo):
   - El chofer se las cobra desde la entrega ("💵 Cobrarle las taras"). A los 25 días (Ajustes → Buró de taras) se lo pide en rojo.
   - Al cobrarlas, las taras se quedan con el cliente (salen de las taras del negocio con su movimiento, para que todo cuadre)
     y su precio pasa a ser deuda en pesos que se cobra COMO ABONO en esa misma entrega: entra al efectivo del chofer, al ticket y al cierre.
   - Al chofer igual se le descuentan a los 30 días: a precio completo las que no regresaron ni se pagaron (como antes, l72) y a
     MITAD DE PRECIO las que el cliente pagó ("castigo por no pedirlas").
   - El "fondo para taras" es un reporte (Estadísticas): lo cobrado a clientes y lo descontado a choferes por taras.
   109 · Si el cliente YA debía dinero o taras de antes: aviso grande arriba de la entrega y, al terminarla sin cobrar, una ventana
     que lo recuerda (como la de taras prestadas): "Cobrar ahora", "Ya le pedí, no tenía" o "Regresar a la entrega".
   Si se cambia algo de esto, se cambia AQUÍ.
   ============================================================================================ */
function tarCobDias108(){return num(S.cfg&&S.cfg.tarCob108)||25}
function tarPr108(){return tarCfg72().pr}
function cliEnt108(){var i=curStop();return i>=0&&S.stops[i]?cl(S.stops[i].c):null}
function diasDesde108(f){return f?Math.max(0,Math.round((TODAY-new Date(f+'T12:00:00'))/864e5)):0}

/* ---------- 108 · el botón en la tarjeta de taras de la entrega (lo llama tarEnt72) ---------- */
function tarCobBtn108(c,e){if(!c||!(num(c.vac)>0))return '';var D=tarCobDias108(),ya=e>=D;
 return (ya?'<div style="font-size:16px;margin-top:6px;font-weight:800;color:var(--danger)">Ya pasaron '+D+' días: cóbrale las taras ('+money(tarPr108())+' cada una).</div>':'')
  +'<button class="btn'+(ya?'':' sec')+'" style="margin-top:8px;min-height:54px;font-size:17px" data-act="tar108">💵 Cobrarle las taras</button>'}

/* ---------- 108 · la tarjeta de pantalla completa para cobrarlas ---------- */
function tar108HTML(){var x=S.tar108;if(!x)return '';var c=cl(x.c);if(!c||!(num(c.vac)>0)){S.tar108=null;return ''}var n=Math.max(1,Math.min(num(c.vac),Math.round(num(x.n)||num(c.vac)))),pr=tarPr108(),m=r2(n*pr);x.n=n;
 return ovW70('tar108ov','Cobrarle las taras','<div class="card tb72" style="padding:14px"><div style="font-size:20px;font-weight:900">'+esc(c.n)+' debe '+c.vac+' tara'+(c.vac===1?'':'s')+'</div>'
  +'<div class="lbl" style="font-size:16px;margin-top:4px">Desde hace '+diasDesde108(c.vacDesde)+' días.</div></div>'
  +'<div class="card" style="padding:14px"><div style="font-size:17px;font-weight:800">¿Cuántas le cobras?</div><div class="row" style="margin-top:8px;justify-content:center;gap:16px"><button class="btn sec" style="width:64px;min-height:56px;font-size:26px" data-act="tar108n" data-d="-1" aria-label="Menos">−</button><b style="font-size:34px">'+n+'</b><button class="btn sec" style="width:64px;min-height:56px;font-size:26px" data-act="tar108n" data-d="1" aria-label="Más">+</button></div>'
  +'<div style="text-align:center;font-size:18px;margin-top:8px">'+n+' × '+money(pr)+' = <b style="font-size:22px">'+money(m)+'</b></div>'
  +'<div class="lbl" style="font-size:15px;margin-top:10px">Esas taras se quedan con el cliente. Los '+money(m)+' se cobran en esta entrega, como abono (salen en su ticket y en tu efectivo).</div></div>'
  +'<button class="btn big" data-act="tar108ok">Sí, cobrar '+money(m)+'</button><button class="btn sec big" data-act="tar108x">Regresar a la entrega</button>','tar108x')}
function tarCobra108(c,n){var pr=tarPr108(),m=r2(n*pr),hoy=iso(TODAY);if(!c||!(n>0))return 0;var desde=c.vacDesde||hoy;
 /* las taras se quedan con el cliente: salen de las del negocio (movimiento, para que cuadre) */
 c.vac=Math.max(0,num(c.vac)-n);if(!c.vac)c.vacDesde=null;
 S.cajasMov=S.cajasMov||[];S.cajasMov.push({t:'Taras que compró '+c.n+' ('+n+' × '+money(pr)+')',f:hoy,n:-n,m:m,tar108:c.id,ch:S.chofHoy});
 /* para el descuento al chofer a mitad de precio cuando se cumplan sus 30 días */
 c.tarPag108=(c.tarPag108||[]).concat([{n:n,desde:desde,f:hoy}]);
 /* su precio pasa a deuda en pesos y se cobra como abono en esta entrega */
 var cr0=num(c.cred);c.cred=r2(cr0+m);if(cr0<=0.005)c.credDesde=hoy;if(S.d)S.d.abono=String(r2(num(S.d.abono)+m));
 S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:quien(),x:'Le cobró a '+c.n+' '+n+' taras ('+money(m)+'): se le quedan al cliente'});
 return m}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tar108"],[data-act="tar108n"],[data-act="tar108ok"],[data-act="tar108x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var a=b.dataset.act;
 if(a==='tar108'){var c=cliEnt108();if(c)S.tar108={c:c.id,n:num(c.vac)};render();return}
 var x=S.tar108;if(!x){render();return}
 if(a==='tar108n'){x.n=num(x.n)+num(b.dataset.d);render();return}
 if(a==='tar108x'){S.tar108=null;render();return}
 var c2=cl(x.c),m=tarCobra108(c2,num(x.n));S.tar108=null;render();toast('Listo: se suman '+money(m)+' a lo que te paga en esta entrega (abono)')},true);

/* ---------- 108 · al chofer, a los 30 días, MITAD de precio por las que el cliente pagó (lo hace el celular del administrador; lo llama tarBuro72) ---------- */
function tarCastigo108(T){var hoy=iso(TODAY);(S.cli||[]).forEach(function(c){if(!c||c.oculto||!c.tarPag108||!c.tarPag108.length)return;var ch=c.chofer;if(ch==null)return;
 c.tarPag108.forEach(function(p){if(p.desc||diasDesde108(p.desde)<T.d3)return;p.desc=hoy;var m=r2(num(p.n)*T.pr/2),cn=chofN(ch);
  S.faltantes.push({ch:+ch,m:m,fecha:hoy,desc:true,pend:true,mot:'Taras que pagó '+c.n+' sin regresarlas ('+p.n+' × '+money(T.pr)+' a mitad de precio)',tar108:c.id});
  S.hist.push({t:fmtF(hoy)+' '+hhmm(),q:'La app',x:'Descuento a '+cn+': '+money(m)+' (mitad de precio) por '+p.n+' taras que '+c.n+' pagó y no regresó'});
  (S.avPrecio=S.avPrecio||[]).push('Se descontaron '+money(m)+' del sueldo de '+cn+' (mitad de precio) por '+p.n+' taras que '+c.n+' pagó en lugar de regresarlas.')})})}
try{if(typeof CLIK!=='undefined'&&CLIK.push)['tarPag108'].forEach(function(k){if(CLIK.indexOf(k)<0)CLIK.push(k)})}catch(e){}

/* ---------- 108 · el fondo para taras (reporte en Estadísticas) ---------- */
function tarFondo108(){var cli=r2(sum((S.cajasMov||[]).filter(function(m){return m&&m.tar108!=null}),function(m){return num(m.m)})),ch=r2(sum((S.faltantes||[]).filter(function(f){return f&&(f.tar72!=null||f.tar108!=null)}),function(f){return num(f.m)}));return {cli:cli,ch:ch,tot:r2(cli+ch)}}
function tarFondoCard108(){if(S.role!=='admin'||S.tab.admin!=='estadisticas')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="tf108"]'))return;var F=tarFondo108();
 var d=document.createElement('div');d.className='card';d.dataset.x='tf108';d.style.padding='12px 14px';
 d.innerHTML='<b style="font-size:17px">🧺 Fondo para comprar taras</b><div class="lbl">Lo que se ha juntado por taras que no regresaron.</div>'+rw('Cobrado a clientes',money(F.cli))+rw('Descontado a choferes',money(F.ch))+'<div class="row" style="min-height:48px"><b>Total</b><b>'+money(F.tot)+'</b></div>';
 var h=m.querySelector('h1');if(h&&h.nextSibling)h.parentNode.insertBefore(d,h.nextSibling);else m.appendChild(d)}

/* ---------- 109 · lo que el cliente YA debía antes de esta entrega ---------- */
function debAntes109(){var c=cliEnt108();if(!c||c.oculto||c.rapida)return null;var d=S.d||{},cr=num(c.cred),tv=num(c.vac);return {c:c,cr:cr,tv:tv,dc:diasDesde108(c.credDesde),dt:diasDesde108(c.vacDesde)}}
/* aviso grande arriba de la entrega (lo llama l72 después de dibujar) */
function debCard109(){if(S.role!=='rep'||S.tab.rep!=='entrega')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="deb109"]'))return;var x=debAntes109();if(!x||!(x.cr>0.005||x.tv>0))return;
 var L=[];if(x.cr>0.005)L.push('<b>'+money(x.cr)+'</b> de antes'+(x.dc?' (desde hace '+x.dc+' días)':''));if(x.tv>0&&!m.querySelector('[data-x="tar72"]'))L.push('<b>'+x.tv+' tara'+(x.tv===1?'':'s')+'</b>');
 if(!L.length)return;var d=document.createElement('div');d.className='card';d.dataset.x='deb109';d.setAttribute('style','padding:12px 14px;border:3px solid var(--danger);background:color-mix(in srgb,var(--danger) 10%,var(--surface))');
 d.innerHTML='<div style="font-size:19px;font-weight:900;color:var(--danger)">⚠️ '+esc(x.c.n)+' te debe '+L.join(' y ')+'</div><div style="font-size:16px;margin-top:4px">Cóbraselo en esta entrega'+(x.cr>0.005?' (abono)':'')+'.</div>';
 var an=m.querySelector('.card');if(an)an.before(d);else m.prepend(d)}
/* al terminar la entrega sin cobrar lo de antes: ventana que lo recuerda */
function deb109HTML(){var y=S.deb109;if(!y)return '';var c=cl(y.c);if(!c){S.deb109=null;return ''}
 var L=[];if(y.cr>0.005)L.push(money(y.cr)+(y.ab>0.005?' (te abonó '+money(y.ab)+')':''));if(y.tv>0)L.push(y.tv+' tara'+(y.tv===1?'':'s'));
 return ovW70('deb109ov','Antes de terminar','<div class="card" style="padding:14px;border:3px solid var(--danger)"><div style="font-size:20px;font-weight:900">'+esc(c.n)+' ya te debía '+L.join(' y ')+'</div>'
  +'<div style="font-size:17px;margin-top:6px">¿Ya se lo pediste? Lo que no cobres sigue en su cuenta.</div></div>'
  +'<button class="btn big" data-act="deb109cob">💵 Cobrar ahora</button><button class="btn sec big" data-act="deb109pedi">Ya le pedí, no tenía</button><button class="btn sec big" data-act="deb109x">Regresar a la entrega</button>','deb109x')}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="entconf"]');if(!b||S.role!=='rep'||!S.d||S.d._deb109)return;var x=debAntes109();if(!x)return;var k=entregaCalc()||{},d=S.d;
 /* si en esta entrega ya salió la ventana de taras prestadas, aquí solo se recuerda el dinero */
 var faltaDin=x.cr>0.005&&num(k.abono)<x.cr-0.005,faltaTar=x.tv>0&&num(d.V)<x.tv&&!d._tar72;if(!faltaDin&&!faltaTar)return;
 e.preventDefault();e.stopImmediatePropagation();S.deb109={c:x.c.id,cr:faltaDin?x.cr:0,ab:num(k.abono),tv:faltaTar?x.tv:0};render()},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="deb109cob"],[data-act="deb109pedi"],[data-act="deb109x"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();var y=S.deb109,a=b.dataset.act;S.deb109=null;
 if(a==='deb109x'||!y){render();return}
 if(a==='deb109cob'){/* 179: primero al PASO donde está lo que hay que cobrar (la entrega va por pasos; antes se quedaba en "Cajas vacías y taras" y el campo del abono estaba en "Cobro", escondido) */
  try{if(typeof entPon125==='function'&&entActivo125()){var pasos=entPasos179();entPon125(y.cr>0?pasos.cobro:pasos.vacias)}}catch(er){}
  render();setTimeout(function(){var vis=function(sel){return Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function(x){return !x.closest('.wz-hide')&&x.getBoundingClientRect().height>0})[0]||null};var el=(y.cr>0?(vis('[data-act="abono115"]')&&vis('[data-act="abono115"]').parentNode)||vis('[data-bind="d.abono"]'):vis('[data-bind="d.V"], #dV, [data-k="d.V"]'))||document.querySelector('[data-bind="d.abono"]');if(el){el.scrollIntoView({block:'center'});try{marcaFalta(el)}catch(er){}if(el.focus)el.focus()}toast(y.cr>0?'Escoge o escribe cuánto te abona de lo que debía':'Anota las taras que te regresa')},350);return}
 /* "Ya le pedí, no tenía": queda registrado y se termina la entrega */
 var c=cl(y.c);if(S.d)S.d._deb109='pedi';render();setTimeout(function(){var bt=document.querySelector('[data-act="entconf"]');if(bt)bt.click();try{if(c)S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:chofN(S.chofHoy),x:'Le pidió a '+c.n+' lo que debía de antes'+(y.cr>0?' ('+money(y.cr)+')':'')+(y.tv>0?' y '+y.tv+' taras':'')+': no tenía'})}catch(er){}},40)},true);

/* ---------- 116 · tope de cajas vacías del chofer (como el tope de dinero: entre todos sus clientes) ----------
   Ajustes: cfg.tarCh116 (de inicio 20; vacío = sin tope). Por chofer: ch.tarMax116 (en "Crédito de sus clientes").
   En la entrega no deja guardar si con lo que deja se pasa del tope; se arregla recogiendo vacías o cobrándolas. */
function tarTope116(ch){var v=ch&&ch.tarMax116!=null&&ch.tarMax116!==''?ch.tarMax116:(S.cfg.tarCh116==null?'20':S.cfg.tarCh116);return String(v).trim()===''?0:Math.max(0,Math.round(num(v)))}
function chVac116(chId,excepto){return sum(S.cli.filter(function(c){return !c.oculto&&+c.chofer===+chId&&c.id!==excepto}),function(c){return num(c.vac)})}
function tarPasa116(){var k=entregaCalc(),d=S.d;if(!k||!k.c||!d||(k.c.rapida&&!d.reg))return null;var c=k.c,tope=tarTope116(chofHoyObj());if(!(tope>0))return null;
 var q=Math.max(0,num(c.vac)+num(d.R)-num(d.V));if(q<=num(c.vac))return null;var otros=chVac116(S.chofHoy,c.id);if(otros+q<=tope)return null;return {tope:tope,ya:otros+num(c.vac),q:q,otros:otros}}
var _ev116=entValida;entValida=function(){var r=_ev116.apply(this,arguments);if(r)return r;var x=tarPasa116();if(!x)return null;
 return ['#dV','Tus clientes ya te deben '+x.ya+' cajas vacías. Tu tope es '+x.tope+': recoge vacías o cóbraselas antes de dejar más']};
/* el renglón en "Cajas vacías" de la entrega (lo llama vacSaldo115) */
function tarLinea116(c,q){var tope=tarTope116(chofHoyObj());if(!(tope>0)||!c||S.role!=='rep')return '';var t=chVac116(S.chofHoy,c.id)+num(q),pasa=t>tope&&num(q)>num(c.vac);
 return '<div style="font-size:15px;margin-top:4px'+(pasa?';color:var(--danger);font-weight:800':'')+'">Tus clientes te deberían '+t+' de '+tope+' cajas'+(pasa?' · ya no puedes dejar más':'')+'</div>'}
/* en la ficha del chofer (admin) */
function tarCampo116(ch){var cf=S.cfg.tarCh116==null?'20':S.cfg.tarCh116,pv=ch.tarMax116!=null&&ch.tarMax116!=='',t=tarTope116(ch);
 return '<div class="field"><label for="chtv'+ch.id+'">Tope de cajas vacías de todos sus clientes</label><input id="chtv'+ch.id+'" type="number" inputmode="numeric" step="1" min="0" data-chtar116="'+ch.id+'" value="'+esc(pv?ch.tarMax116:cf)+'"></div>'
  +'<div class="lbl">Sus clientes le deben '+chVac116(ch.id,null)+(t>0?' de '+t:'')+' cajas vacías</div>'}
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.chtar116)return;var ch=S.choferes.filter(function(x){return x.id===+t.dataset.chtar116})[0];if(!ch)return;
 var ant=tarTope116(ch),v=String(t.value).trim()===''?'':String(Math.max(0,Math.round(num(t.value))));ch.tarMax116=v;
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Cambió el tope de cajas vacías de '+ch.n+': '+(ant||'sin tope')+' → '+(tarTope116(ch)||'sin tope')});toast('Tope de cajas de '+ch.n+': '+(tarTope116(ch)||'sin tope'));render()});

/* 179: en qué paso de la entrega está cada cosa (Cobro y Cajas vacías/taras), con la misma regla que arma los pasos */
function entPasos179(){var o={cobro:1,vacias:2};try{var m=document.querySelector('main'),sk=entSalta125();if(sk)o.vacias=1;if(!m)return o;
 var c=m.querySelector('[data-bind="d.abono"]'),v=m.querySelector('[data-bind="d.V"],#dV');var pc=c?entPasoDe125(c,sk):null,pv=v?entPasoDe125(v,sk):null;if(pc!=null)o.cobro=pc;if(pv!=null)o.vacias=pv}catch(e){}return o}
