/* ===================== TEMA · Cobranza (punto 84, 17 nov) =====================
   Ricardo: lo que más tiempo le quita es el seguimiento de créditos: "saber quién debe y desde cuándo" y "recordarles y que paguen".
   - Inicio: tarjeta "💰 Te deben $X · N vencidos" que abre la pantalla Cobranza.
   - Cobranza: total por cobrar y vencido; clientes en 3 grupos (vencido hace mucho / vencido / al corriente); filtro por chofer.
     Cada cliente: cuánto debe, desde cuándo, su plazo, su chofer, último aviso y si prometió pagar.
     Botones: "📲 Estado de cuenta" (WhatsApp con el desglose), "🤝 Prometió pagar" (día y cuánto), "💵 Abono", "Ver crédito".
     "Mandar a todos los vencidos": uno por uno por WhatsApp, sin escribir nada.
   - Plazo: el general (Ajustes → "🛡️ Controles": "Mensaje de WhatsApp a los N días") y, si se quiere, uno distinto por cliente
     (en la pantalla de su crédito).
   - Promesa de pago: ese día te avisa a ti (Por atender) y le sale al chofer en su ruta y en la entrega. Si pasó el día y no
     pagó nada, el cliente se pone en rojo y te avisa.
   Datos nuevos en cada cliente (viajan con "cli"): plazo91, prom91 {f,m,cred0,q,no}, promH91 (últimas promesas), recF91.
   ======================================================================================= */
(function(){var st=document.createElement('style');st.textContent=[
 '#cob91{position:fixed;inset:0;z-index:83;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}#cob91 .fiw{max-width:560px;margin:0 auto;padding:0 16px 60px}',
 '#cob91 .fihd{position:sticky;top:0;z-index:3;background:var(--bg);padding:calc(10px + var(--sbar,0px)) 0 8px;display:flex;align-items:center;gap:10px}',
 '#cob91 .fiback{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);font-size:22px;color:var(--fg);flex:none}',
 '.cob91tot{display:grid;grid-template-columns:1fr 1fr;gap:8px}.cob91tot>div{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:10px 12px}.cob91tot b{display:block;font-size:22px}.cob91tot span{font-size:13px;color:var(--muted)}',
 '.cob91g{margin:16px 2px 6px;font-size:16px;font-weight:800;display:flex;align-items:center;gap:8px}.cob91g i{width:12px;height:12px;border-radius:50%;display:inline-block}',
 '.cob91c{background:var(--surface);border:1px solid var(--line);border-left:6px solid #16A34A;border-radius:14px;padding:12px 14px;margin-top:8px}',
 '.cob91c.am{border-left-color:#F59E0B}.cob91c.ro{border-left-color:#DC2626}.cob91c .cb91h{display:flex;justify-content:space-between;align-items:baseline;gap:8px}',
 '.cob91c .cb91h b{font-size:18px}.cob91c .cb91h .m{font-size:20px;font-weight:800;white-space:nowrap}.cob91c .ln{font-size:14px;color:var(--muted);margin-top:3px;line-height:1.35}',
 '.cob91c .pr{margin-top:6px;font-size:14px;font-weight:700;padding:6px 10px;border-radius:10px;background:color-mix(in srgb,#16A34A 12%,var(--surface))}.cob91c .pr.no{background:color-mix(in srgb,#DC2626 14%,var(--surface));color:#B91C1C}',
 '.cob91c .bt{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px}.cob91c .bt>*{min-height:46px;border-radius:12px;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;text-decoration:none;padding:0 6px;text-align:center}',
 '.cob91c .bt .wa{background:#16A34A;color:#fff;border:0}.cob91c .bt .sc{background:var(--surface);color:var(--fg);border:1.5px solid var(--line)}',
 '.cob91p{margin-top:10px;padding:10px;border-radius:12px;background:color-mix(in srgb,var(--accent) 8%,var(--surface));border:1px solid var(--line)}',
 '.cob91p .chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.cob91p .chips button{min-height:40px;padding:0 12px;border-radius:999px;border:1.5px solid var(--line);background:var(--surface);color:var(--fg);font-weight:700}',
 '.cob91p .chips button[aria-pressed="true"]{background:var(--accent);color:#fff;border-color:var(--accent)}',
 '.cob91seq{position:sticky;top:62px;z-index:2;background:color-mix(in srgb,#16A34A 14%,var(--bg));border:2px solid #16A34A;border-radius:14px;padding:10px 12px;margin:6px 0}',
 '.cob91ini{cursor:pointer}.cob91ini .big{font-size:24px;font-weight:800}',
 '.cob91ch{background:color-mix(in srgb,#16A34A 12%,var(--surface));border:1.5px solid #16A34A;border-radius:14px;padding:10px 12px;margin:8px 0;font-size:15px}'].join('\n');document.head.appendChild(st)})();

var DIAS91=['dom','lun','mar','mié','jue','vie','sáb'];
function fCorta91(f){var d=new Date(String(f).slice(0,10)+'T12:00:00');if(isNaN(d))return String(f||'');return DIAS91[d.getDay()]+' '+d.getDate()+' '+['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][d.getMonth()]}
function plazoGen91(){return Math.max(1,num(S.cfg&&S.cfg.cbWa)||5)}
function plazo91(c){return c&&c.plazo91!=null&&c.plazo91!==''?Math.max(1,num(c.plazo91)):plazoGen91()}
/* rojo: prometió y no pagó, o lleva 15 días o más pasado su plazo · amarillo: ya pasó su plazo · verde: al corriente */
function est91(c){if(!(num(c.cred)>0.005))return 'ok';if(c.prom91&&c.prom91.no)return 'ro';var d=credAge(c),p=plazo91(c);if(d>=p+15)return 'ro';if(d>=p)return 'am';return 've'}
function deud91(ch){return (S.cli||[]).filter(function(c){return c&&!c.oculto&&num(c.cred)>0.005&&(ch==null||ch===''||String(c.chofer)===String(ch))}).sort(function(a,b){return credAge(b)-credAge(a)||num(b.cred)-num(a.cred)})}
function promHoy91(c){var p=c&&c.prom91;return !!(p&&!p.no&&p.f<=iso(TODAY)&&num(c.cred)>0.005)}

/* ---------- estado de cuenta (WhatsApp) ---------- */
function movs91(c){var d0=c.credDesde||'0000',L=[],vis={};
 var pon=function(f,ch,lg){(lg||[]).forEach(function(l){if(!l||+l.c!==+c.id||l.anul||l.cancel)return;var tot=num(l.total),pg=num(l.pago),ab=num(l.abono);if(tot-pg<=0.005&&ab<=0.005)return;var k=f+'|'+ch+'|'+(l.h||'')+'|'+tot+'|'+pg+'|'+ab;if(vis[k])return;vis[k]=1;L.push({f:f,l:l})})};
 (S.rutasHist||[]).forEach(function(e){if(e&&e.f>=d0)pon(e.f,e.ch,e.log)});
 var hoy=iso(TODAY);if(S.chofHoy!=null&&!S.arOn)pon(S.rutaDia80||hoy,S.chofHoy,S.log);Object.keys(S.chSt||{}).forEach(function(id){if(+id===+S.chofHoy)return;var o=S.chSt[id];if(o)pon(o.rutaDia80||hoy,+id,o.log)});
 (S.cobros||[]).forEach(function(x){if(x&&+x.c===+c.id&&x.f&&x.f>=d0)L.push({f:x.f,ab:num(x.m)})});
 return L.sort(function(a,b){return a.f<b.f?-1:a.f>b.f?1:0})}
function edoCta91(c){var L=movs91(c).slice(-15),neg=(S.cfg&&S.cfg.nombre)||'';
 var t='Hola'+(c.recibe?' '+c.recibe:'')+', le saludamos de '+neg+'. Le compartimos su estado de cuenta:\n';
 L.forEach(function(x){if(x.ab!=null){t+='\n• '+fCorta91(x.f)+': abono '+money(x.ab);return}var l=x.l,q=[];if(num(l.R))q.push(num(l.R)+' caja'+(num(l.R)===1?'':'s')+' de roatán');if(num(l.M))q.push(num(l.M)+' kg de macho');
  var deb=Math.max(0,num(l.total)-num(l.pago));t+='\n• '+fCorta91(x.f)+': '+(q.join(' y ')||'compra')+' por '+money(num(l.total))+(num(l.pago)>0.005?', pagó '+money(num(l.pago)):'')+(deb>0.005?', quedó a crédito '+money(deb):'')+(num(l.abono)>0.005?', abonó '+money(num(l.abono)):'')});
 t+='\n\nSaldo pendiente: *'+money(c.cred)+'*'+(c.credDesde?' (desde el '+fCorta91(c.credDesde)+')':'')+'.';
 if(c.prom91&&!c.prom91.no&&c.prom91.f>=iso(TODAY))t+='\nQuedamos en que nos paga el '+fCorta91(c.prom91.f)+'.';else t+='\n¿Cuándo podemos pasar a cobrarlo?';
 return t+' Gracias.'}
function avisado91(c){c.recUlt=fmtF(iso(TODAY))+' '+hhmm();c.recF91=iso(TODAY);try{crHist(c,'le mandó su estado de cuenta')}catch(e){}}

/* ---------- la tarjeta de Inicio ---------- */
function ini91(){if(S.role!=='admin'||S.encOn||S.tab.admin!=='inicio')return;var m=document.querySelector('main');if(!m)return;var vie=m.querySelector('[data-k="cobrarhoy"]');if(vie)vie.remove();if(m.querySelector('[data-x="cob91c"]'))return;
 var D=deud91();if(!D.length)return;var tot=sum(D,function(c){return num(c.cred)}),V=D.filter(function(c){var e=est91(c);return e==='am'||e==='ro'}),R=D.filter(function(c){return est91(c)==='ro'}),P=D.filter(promHoy91);
 var d=document.createElement('div');d.className='card cob91ini'+(R.length?' alert':'');d.dataset.x='cob91c';d.dataset.act='cob91o';d.setAttribute('role','button');d.tabIndex=0;d.style.padding='12px 14px';
 d.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span><b style="font-size:17px">💰 Te deben</b><div class="big">'+money(tot)+'</div></span><span class="lbl" style="font-size:24px">›</span></div>'
  +'<div class="lbl" style="font-size:15px">'+D.length+' cliente'+(D.length===1?'':'s')+(V.length?' · <b class="neg">'+V.length+' vencido'+(V.length===1?'':'s')+' ('+money(sum(V,function(c){return num(c.cred)}))+')</b>':' · ninguno vencido')+'</div>'
  +(P.length?'<div style="margin-top:6px;font-weight:800">🤝 Prometieron pagar hoy: '+P.map(function(c){return esc(c.n)+' '+money(num(c.prom91.m)||num(c.cred))}).join(', ')+'</div>':'')
  +'<div class="lbl" style="margin-top:4px">Toca para ver quién debe, desde cuándo, y mandarles su estado de cuenta.</div>';
 var a=m.querySelector('[data-x="cu82e"]')||m.querySelector('[data-x="rt81e"]');if(a&&a.parentNode===m)a.after(d);else m.prepend(d)}

/* ---------- la pantalla Cobranza ---------- */
function cob91HTML(){var X=S.cob91;if(!X||S.role!=='admin'||X.inl)return '';return '<div id="cob91" role="dialog" aria-label="Cobranza"><div class="fiw"><div class="fihd"><button class="fiback" data-act="cob91x" aria-label="Regresar">←</button><span class="grow"><b style="font-size:20px">Cobranza</b><br><span class="lbl">Plazo general: '+plazoGen91()+' días (se cambia en Ajustes)</span></span></div>'+cob91Cuerpo()+'</div></div>'}
/* el contenido (se usa en la pestaña Cobranza de Clientes y en la ventana) */
function cob91Cuerpo(){var X=S.cob91=S.cob91||{ch:null};var hoy=iso(TODAY),Dall=deud91(),D=deud91(X.ch),tot=sum(D,function(c){return num(c.cred)}),V=D.filter(function(c){var e=est91(c);return e==='am'||e==='ro'}),vt=sum(V,function(c){return num(c.cred)});
 var chs={};Dall.forEach(function(c){if(c.chofer!=null)chs[c.chofer]=(chs[c.chofer]||0)+1});var CH=Object.keys(chs);
 var h='';
 h+='<div class="cob91tot"><div><b>'+money(tot)+'</b><span>por cobrar · '+D.length+' cliente'+(D.length===1?'':'s')+'</span></div><div><b class="'+(vt>0.005?'neg':'')+'">'+money(vt)+'</b><span>vencido · '+V.length+' cliente'+(V.length===1?'':'s')+'</span></div></div>';
 if(CH.length>1)h+='<div class="chips" role="group" aria-label="Chofer" style="margin-top:10px"><button data-act="cob91ch" data-v="" aria-pressed="'+(X.ch==null||X.ch==='')+'">Todos</button>'+CH.map(function(id){return '<button data-act="cob91ch" data-v="'+id+'" aria-pressed="'+(String(X.ch)===String(id))+'">'+esc(chofN(+id))+' ('+chs[id]+')</button>'}).join('')+'</div>';
 var Vt=V.filter(function(c){return c.tel});
 if(X.seq&&X.seq.length){var i=X.si||0;if(i>=X.seq.length)h+='<div class="cob91seq"><b>✓ Listo: se mandó a los '+X.seq.length+'.</b><button class="btn sm sec" style="margin-top:8px" data-act="cob91sx">Cerrar</button></div>';
  else{var c0=cl(X.seq[i]);h+='<div class="cob91seq"><b>Mandando a los vencidos: '+(i+1)+' de '+X.seq.length+'</b>'+(c0?'<a class="btn" style="display:flex;align-items:center;justify-content:center;text-decoration:none;margin-top:8px;min-height:54px" target="_blank" rel="noopener" data-act="cob91sw" data-id="'+c0.id+'" href="'+waLink(c0,edoCta91(c0))+'">📲 Mandar a '+esc(c0.n)+' ('+money(c0.cred)+')</a>':'')+'<div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm sec" style="flex:1" data-act="cob91sn">Saltar</button><button class="btn sm sec" style="flex:1" data-act="cob91sx">Terminar</button></div><div class="lbl" style="margin-top:4px">Se abre WhatsApp con el mensaje listo; lo mandas y regresas aquí para el siguiente.</div></div>'}}
 else if(Vt.length>1)h+='<button class="btn" style="margin-top:10px;min-height:54px" data-act="cob91s">📲 Mandar estado de cuenta a todos los vencidos ('+Vt.length+')</button>';
 if(!D.length)h+='<div class="card good" style="margin-top:12px;text-align:center;font-size:17px">✓ Nadie te debe'+(X.ch!=null&&X.ch!==''?' de esta ruta':'')+'.</div>';
 [['ro','#DC2626','Vencidos hace mucho o no pagaron lo que prometieron'],['am','#F59E0B','Vencidos'],['ve','#16A34A','Al corriente (todavía en su plazo)']].forEach(function(g){var L=D.filter(function(c){return est91(c)===g[0]});if(!L.length)return;
  h+='<div class="cob91g"><i style="background:'+g[1]+'"></i>'+g[2]+' · '+L.length+'</div>'+L.map(function(c){return cob91Cli(c,g[0])}).join('')});
 return h}
function cob91Cli(c,e){var X=S.cob91,d=credAge(c),p=plazo91(c),pr=c.prom91,hoy=iso(TODAY);
 var h='<div class="cob91c '+(e==='ro'?'ro':e==='am'?'am':'')+'" data-cid="'+c.id+'"><div class="cb91h"><b>'+esc(c.n)+'</b><span class="m '+(e==='ve'?'':'neg')+'">'+money(c.cred)+'</span></div>'
  +'<div class="ln">Debe desde el '+(c.credDesde?fCorta91(c.credDesde):'—')+' · hace <b>'+d+' día'+(d===1?'':'s')+'</b> · plazo '+p+' días'+(c.plazo91!=null&&c.plazo91!==''?' (suyo)':'')+(d>=p?' · <b class="neg">vencido hace '+(d-p)+' día'+(d-p===1?'':'s')+'</b>':' · vence en '+(p-d)+' día'+(p-d===1?'':'s'))+'</div>'
  +'<div class="ln">Chofer: '+(c.chofer!=null?esc(chofN(c.chofer)):'sin chofer')+' · '+(c.recUlt?'último aviso: '+esc(String(c.recUlt).replace(/<[^>]*>/g,'')):'no se le ha avisado')+'</div>';
 if(pr)h+='<div class="pr'+(pr.no?' no':'')+'">'+(pr.no?'❗ Prometió pagar el '+fCorta91(pr.f)+' y no pagó':'🤝 Prometió pagar '+(pr.f===hoy?'<u>hoy</u>':'el '+fCorta91(pr.f)))+(num(pr.m)?': '+money(num(pr.m)):'')+'</div>';
 if(X&&+X.prom===+c.id){var f=X.pf||'';var ch='';for(var i=1;i<=7;i++){var dd=iso(new Date(TODAY.getTime()+i*864e5));ch+='<button data-act="cob91pf" data-v="'+dd+'" aria-pressed="'+(f===dd)+'">'+(i===1?'Mañana':fCorta91(dd).replace(/ \w+$/,''))+'</button>'}
  h+='<div class="cob91p"><b>¿Qué día prometió pagar?</b><div class="chips">'+ch+'</div><div class="field"><label for="cob91fd">Otro día</label><input id="cob91fd" type="date" min="'+hoy+'" value="'+esc(f)+'"></div>'
   +'<div class="field"><label for="cob91m">¿Cuánto? $</label><input id="cob91m" type="number" inputmode="decimal" min="0" value="'+esc(X.pm!=null?X.pm:Math.round(num(c.cred)))+'"></div>'
   +'<div class="lbl">Ese día te aviso a ti y le sale a '+(c.chofer!=null?esc(chofN(c.chofer)):'su chofer')+' en su ruta.</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" style="flex:1" data-act="cob91pg" data-id="'+c.id+'">Guardar</button><button class="btn sec" style="flex:1" data-act="cob91pc">Cancelar</button></div>'
   +(pr?'<button class="btn sm sec" style="margin-top:6px" data-act="cob91pq" data-id="'+c.id+'">Quitar la promesa</button>':'')+'</div>'}
 h+='<div class="bt">'+(c.tel?'<a class="wa" target="_blank" rel="noopener" data-act="cob91wa" data-id="'+c.id+'" href="'+waLink(c,edoCta91(c))+'">📲 Estado de cuenta</a>':'<button class="sc" data-act="cropen" data-id="'+c.id+'">Sin teléfono</button>')
  +'<button class="sc" data-act="cob91p" data-id="'+c.id+'">🤝 Prometió pagar</button><button class="sc" data-act="cobrar" data-id="'+c.id+'">💵 Registrar abono</button><button class="sc" data-act="cropen" data-id="'+c.id+'">Ver su crédito ›</button></div></div>';
 return h}
function cob91Pon(){var o=document.getElementById('cob91'),y=o?o.scrollTop:0,h=cob91HTML();if(!h){if(o)o.remove();return}if(o&&o._h===h)return;ovPon70('cob91',h);var n=document.getElementById('cob91');if(n){n._h=h;n.scrollTop=y}}

/* ---------- plazo propio (en la pantalla del crédito del cliente) ---------- */
var _crH91=crHTML;crHTML=function(){var h=_crH91.apply(this,arguments);if(!h)return h;var c=cl(S.crCli);if(!c)return h;var g=plazoGen91(),p=c.plazo91!=null&&c.plazo91!==''?num(c.plazo91):null;
 var card='<div class="card"><b>Plazo para pagar</b><div class="lbl">'+(p==null?'Usa el general: '+g+' días.':'Suyo: '+p+' días (el general es '+g+').')+' Después de ese plazo sale como vencido en Cobranza.</div><div class="acc">'
  +'<button class="btn sm '+(p==null?'':'sec')+'" data-act="cob91pl" data-id="'+c.id+'" data-v="">General ('+g+')</button>'+[7,15,30].filter(function(x){return x!==g}).map(function(x){return '<button class="btn sm '+(p===x?'':'sec')+'" data-act="cob91pl" data-id="'+c.id+'" data-v="'+x+'">'+x+' días</button>'}).join('')+'</div></div>';
 var i=h.indexOf('<div class="card"><b>Su límite</b>');return i>-1?h.slice(0,i)+card+h.slice(i):h.replace(/<\/div><\/div>$/,card+'</div></div>')};

/* ---------- promesas: revisar al día siguiente ---------- */
function rev91(){if(S.role!=='admin')return;var hoy=iso(TODAY);(S.cli||[]).forEach(function(c){var p=c&&c.prom91;if(!p)return;
 if(!(num(c.cred)>0.005)){c.promH91=(c.promH91||[]).slice(-4).concat([{f:p.f,m:p.m,ok:true}]);c.prom91=null;try{crHist(c,'cumplió: pagó lo que prometió')}catch(e){}return}
 if(!p.no&&p.f<hoy){if(num(c.cred)<num(p.cred0)-0.5){c.promH91=(c.promH91||[]).slice(-4).concat([{f:p.f,m:p.m,ok:true,parte:true}]);c.prom91=null;try{crHist(c,'pagó una parte de lo que prometió')}catch(e){}}
  else{p.no=true;c.promH91=(c.promH91||[]).slice(-4).concat([{f:p.f,m:p.m,ok:false}]);try{crHist(c,'no pagó lo que prometió el '+fCorta91(p.f))}catch(e){}}}})}
/* avisos: pasó a tema-avisos.js */
/* avDestino: pasó a tema-avisos.js */

/* ---------- los abonos llevan fecha (para el estado de cuenta) ---------- */
function cobF91(){var L=S.cobros;if(!Array.isArray(L))return;if(S.cobN91==null||S.cobN91>L.length){S.cobN91=L.length;return}for(var i=S.cobN91;i<L.length;i++){var x=L[i];if(x&&!x.f){x.f=iso(TODAY);x.h=hhmm();try{x.q=quien()}catch(e){}}}S.cobN91=L.length}

/* ---------- chofer: en su ruta y en la entrega ---------- */
function ch91(){if(S.role!=='rep')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="cob91r"]'))return;var t=S.tab.rep,hoy=iso(TODAY);
 if(t==='entrega'){var i=curStop(),c=i>=0?cl(S.stops[i].c):null;if(!c||!promHoy91(c))return;var p=c.prom91,d=document.createElement('div');d.className='cob91ch';d.dataset.x='cob91r';
  d.innerHTML='🤝 <b>'+esc(c.n)+' prometió pagar '+(p.f===hoy?'hoy':'el '+fCorta91(p.f))+(num(p.m)?' '+money(num(p.m)):'')+'</b><div class="lbl">Te debe '+money(c.cred)+'. Recuérdaselo y regístralo como abono en esta entrega.</div>';m.prepend(d);return}
 if(t==='ruta'){var ids={};(S.stops||[]).forEach(function(s){if(!s.done)ids[+s.c]=1});var L=(S.cli||[]).filter(function(c){return ids[c.id]&&promHoy91(c)});if(!L.length)return;var d2=document.createElement('div');d2.className='cob91ch';d2.dataset.x='cob91r';
  d2.innerHTML='🤝 <b>Hoy te prometieron pagar:</b> '+L.map(function(c){return esc(c.n)+' '+money(num(c.prom91.m)||num(c.cred))}).join(', ');var hl=m.querySelector('.hola89');if(hl)hl.after(d2);else m.prepend(d2)}}

/* ---------- toques ---------- */
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act^="cob91"]');if(!b)return;var a=b.dataset.act,id=b.dataset.id!=null?+b.dataset.id:null,c=id!=null?cl(id):null,X=S.cob91;
 if(a==='cob91wa'||a==='cob91sw'){if(c)avisado91(c);if(a==='cob91sw'&&X)X.si=(X.si||0)+1;setTimeout(render,60);return}   /* el enlace abre WhatsApp */
 e.preventDefault();e.stopImmediatePropagation();
 if(a==='cob91o'){S.cob91={ch:null,inl:1};S.cli92='cob';S.tab.admin='clientes';render();window.scrollTo(0,0);return}
 if(a==='cob91pl'){if(!c)return;c.plazo91=b.dataset.v===''?null:num(b.dataset.v);try{crHist(c,'plazo para pagar: '+(c.plazo91==null?'el general':c.plazo91+' días'))}catch(er){}toast('Plazo de '+c.n+': '+plazo91(c)+' días');render();return}
 if(!X)return;
 if(a==='cob91x'){S.cob91=null;render();return}
 if(a==='cob91ch'){X.ch=b.dataset.v===''?null:b.dataset.v;X.seq=null;render();return}
 if(a==='cob91s'){var D=deud91(X.ch).filter(function(c){var s=est91(c);return (s==='am'||s==='ro')&&c.tel});X.seq=D.map(function(c){return c.id});X.si=0;render();var o2=document.getElementById('cob91');if(o2)o2.scrollTop=0;else window.scrollTo(0,0);return}
 if(a==='cob91sn'){X.si=(X.si||0)+1;render();return}
 if(a==='cob91sx'){X.seq=null;X.si=0;render();return}
 if(a==='cob91p'){X.prom=id;X.pf=c&&c.prom91&&!c.prom91.no?c.prom91.f:'';X.pm=c&&c.prom91&&num(c.prom91.m)?c.prom91.m:null;render();setTimeout(function(){var k=document.querySelector('.cob91p');if(k)k.scrollIntoView({block:'center'})},30);return}
 if(a==='cob91pc'){X.prom=null;render();return}
 if(a==='cob91pf'){var mi=document.getElementById('cob91m');if(mi)X.pm=mi.value;X.pf=b.dataset.v;render();return}
 if(a==='cob91pq'){if(c){c.prom91=null;try{crHist(c,'se quitó su promesa de pago')}catch(er){}}X.prom=null;toast('Se quitó la promesa');render();return}
 if(a==='cob91pg'){if(!c)return;var fd=document.getElementById('cob91fd'),f=(fd&&fd.value)||X.pf,m=num((document.getElementById('cob91m')||{}).value);if(!f){toast('Escoge el día que prometió pagar');return}if(f<iso(TODAY)){toast('Ese día ya pasó');return}
  c.prom91={f:f,m:m>0?Math.min(m,num(c.cred)):num(c.cred),cred0:num(c.cred),q:quien(),h:hhmm(),cre:iso(TODAY)};X.prom=null;X.pf='';X.pm=null;try{crHist(c,'prometió pagar '+money(c.prom91.m)+' el '+fCorta91(f))}catch(er){}
  toast('Anotado: '+c.n+' paga el '+fCorta91(f));render();return}},true);
/* la fecha escrita a mano también marca el día */
document.addEventListener('change',function(e){var t=e.target;if(t&&t.id==='cob91fd'&&S.cob91){var mi=document.getElementById('cob91m');if(mi)S.cob91.pm=mi.value;S.cob91.pf=t.value;render()}},true);

var _rd91=render;render=function(){try{cobF91();rev91()}catch(e){console.error('cob91',e)}var r=_rd91.apply(this,arguments);try{ini91();ch91();cob91Pon()}catch(e){console.error('cob91b',e)}return r};

/* ---------- 155 · Ricardo: "haz todo lo que me dijiste" (sugerencia 8: recordatorio de cobro por WhatsApp) ----------
   WhatsApp no deja mandar mensajes solos (sin que alguien toque "enviar"), así que la app te dice a quién le toca HOY y te los pone
   en fila: vencidos con teléfono a los que no se les ha mandado su estado de cuenta en los últimos N días (Ajustes → "🛡️ Controles":
   "Recordarle cada", 7 por defecto). En "Hoy" (Inicio): "📲 Hoy toca recordarle a N clientes" → "Ir ›" abre Cobranza y empieza
   a mandar uno por uno (el mismo "Mandar a todos los vencidos"). No cambia ninguna cuenta. */
function cada155(){return Math.max(1,num((S.cfg||{}).cb155)||7)}
function toca155(){var lim=iso(new Date(TODAY.getTime()-cada155()*864e5));return deud91().filter(function(c){var s=est91(c);return (s==='am'||s==='ro')&&c.tel&&!(c.recF91&&c.recF91>lim)})}
/* en "Hoy" (Inicio): el renglón de cobrar dice a cuántos toca recordarles hoy y "Ir ›" empieza a mandarles uno por uno */
var _hT155=hoyTareas;hoyTareas=function(){var L=_hT155.apply(this,arguments);try{var X=toca155();if(!X.length)return L;var t='📲 Hoy toca recordarle a '+X.length+(X.length===1?' cliente':' clientes')+' que debe'+(X.length===1?'':'n')+' ('+money(sum(X,function(c){return num(c.cred)}))+')',k=-1;
 L.forEach(function(x,i){if(x&&x.k==='cb')k=i});if(k>-1)L[k]=Object.assign({},L[k],{t:L[k].t+' · 📲 hoy toca recordarle a '+X.length,r155:1});else L.push({k:'cb',t:t,go:'clientes',r155:1})}catch(e){}return L};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cob155"],[data-x="hoy92"] .it92 [data-act="cli92"]');if(!b)return;if(b.dataset.act==='cli92'){var it=b.closest('.it92');if(!it||!it.querySelector('[data-k="cb"]')||!toca155().length)return}e.stopImmediatePropagation();e.preventDefault();
 var L=toca155();S.cob91={ch:null,inl:1,seq:L.map(function(c){return c.id}),si:0};S.cli92='cob';S.tab.admin='clientes';render();window.scrollTo(0,0)},true);
