/* ===================== TEMA · Avisos y pendientes (aplanado el 17 nov) =====================
   Antes estaba repartido en envolturas encadenadas en l5, l6, l9, l22, l37, l51, l52, l60, l63, l67, l68, l69, l70,
   l82, l87, l88, tema-cobranza.js y tema-pantallas.js. Aquí está todo junto, en el MISMO orden, y hace exactamente lo mismo.
   Se arma AL FINAL (después de tema-pantallas.js), en build.sh.
   Si se cambia algo de los avisos o pendientes, se cambia AQUÍ (no se agregan envolturas en capas nuevas).

   - avisos: la lista de avisos (lo que hay que atender). Cada paso agrega, quita o filtra.
   - avDestino: a dónde lleva cada aviso al tocarlo ("Ir", "Atender", numeritos).
   - avRow: cómo se dibuja un renglón de aviso. avisosHTML: la tarjeta "Por atender" + "Informativos".
   - avFoco: marca el lugar exacto al llegar. tabBadges: numeritos de la barra. pendCard86: "🔔 N pendientes · ver" (Ir / Listo).
   Las funciones que usan los pasos (cuentasRevisar, minAvisos, avEsAct, avInfo68, atrasLista93…) siguen en su capa.
   ============================================================================================ */

/* ---------- la lista de avisos ---------- */
var _avisosBase=avisos;
avisos=function(){var a=_avisosBase.apply(this,arguments);
 /* l5 · aviso si algo deja de cuadrar */
 try{cuentasRevisar().filter(function(x){return !x.ok}).forEach(function(x){a.unshift('URGENTE: no cuadra · '+x.n+(x.det?' ('+x.det+')':''))})}catch(e){}
 /* l6 · choferes sin señal y cambios que no les han llegado */
 try{offIds().forEach(function(id){var m=sinSenMin(id),p=(S.pendCh[id]||[]).length;if(m>=60)a.unshift(chofN(id)+' lleva '+sinDurTxt(m)+' sin señal'+(conn(id).pos?' · última ubicación: '+conn(id).pos:''));if(p)a.push('Pendiente de llegar a '+chofN(id)+' (sin señal): '+p+' cambio'+(p>1?'s':''))})}catch(e){}
 /* l22 · los de minAvisos van primero */
 try{a=minAvisos().concat(a)}catch(e){}
 /* l60 · 21 · lo que solo es actividad del día no es aviso */
 a=a.filter(function(x){return typeof x!=='string'||!avEsAct(x)});
 /* l63 · días sin respaldo */
 try{if(S.role==='admin'&&!S.encOn&&natPl()&&natPl().respaldoGuardar){var u=respUlt(),d=u?Math.round((new Date(iso(new Date())).getTime()-new Date(u).getTime())/864e5):99;if(d>2)a.push('URGENTE: lleva '+(u?d+' días':'mucho')+' sin respaldo. Ve a Ajustes › Respaldo y toca "Respaldar ahora".')}}catch(e){}
 /* l88 · los que se marcaron "✓ Listo" o "Recordar mañana" */
 if(S.role==='admin'){var hoy88=iso(TODAY),O=S.avOk88||{},D=S.avLater88||{};
  a=a.filter(function(x){if(typeof x!=='string')return true;if(O[x])return false;if(D[x]&&D[x]>hoy88)return false;return true})}
 /* 91 · Cobranza: promesas de pago de hoy y las que no se cumplieron */
 try{if(S.role==='admin'){var hoy=iso(TODAY);(S.cli||[]).forEach(function(c){var p=c&&c.prom91;if(!p||c.oculto||!(num(c.cred)>0.005))return;
  if(p.no)a.push('Pago vencido: '+c.n+' no pagó su deuda como prometió ('+fCorta91(p.f)+'): debe '+money(c.cred));else if(p.f===hoy)a.push('🤝 Hoy ('+fCorta91(p.f)+') prometió pagar '+c.n+': '+money(num(p.m)||num(c.cred)))})}}catch(e){}
 /* 92 · lo que solo informa va a "Lo que pasó hoy" (INFO92 está en tema-pantallas.js) */
 if(adm92())a=a.filter(function(x){if(typeof x==='string'&&INFO92.test(x)){try{actAdd(null,x)}catch(e){}return false}return true});
 /* 95 · lo que falta recibir es URGENTE y va hasta arriba (atrasTxt95 está en tema-pantallas.js) */
 try{if(adm92()&&typeof atrasLista93==='function')atrasLista93().forEach(function(x){a.unshift(atrasTxt95(x))})}catch(e){}
 return a};

/* ---------- a dónde lleva cada aviso ---------- */
/* Primero los que se deciden sin preguntar a nadie más (95 y l6); luego la base; luego cada paso puede corregir el destino. */
function avDst37(x,r){r=r||{t:'inicio',cli:null};var ch=avChofDe(x),pk=typeof avPinK==='function'?avPinK(x):null;r.sel=null;
 if(pk||/PIN de /.test(x)){var id=pk&&/^c:/.test(pk)?+pk.slice(2):(ch?ch.id:null);r.t='personal';r.cli=null;if(id){S.openCh=id;S.fiTab['emp:'+id]='dat'}r.sel='[data-act="pinreset"]';return r}
 if(/pide reabrir su ruta/.test(x)){r.t='inicio';r.cli=null;r.sel='[data-act="reabsi"]';return r}
 if(/no envió su cierre|segundo cierre|reabrió su (cierre|ruta)|Cierre con faltante|no se contaron las cajas/i.test(x)){r.t='cierreadm';r.cli=null;if(ch&&+S.chofHoy!==+ch.id)try{chCambiar(+ch.id)}catch(e){}return r}
 if(/SIN ticket: .*(L por|combustible)|cargó combustible SIN ticket/.test(x)||/registró un gasto/.test(x)){r.t='gastos';r.cli=null;return r}
 if(/báscula|Báscula/.test(x)){r.t='cargas';r.cli=null;return r}
 if(/DEF|Consumo alto|Problema en el viaje|cajas vacías se quedaron|lleva \d+ cajas vacías|Pagar a |roatán de .* vino bajo/.test(x)){r.t='cargas';r.cli=null;return r}
 if(/Salió con una falla|no puede salir|hizo el encargo|no pudo hacer el encargo/.test(x)){r.t='vehiculos';r.cli=null;var vh=S.veh.filter(function(v){return !v.baja&&x.indexOf(v.n)>-1})[0];if(vh)S.vehOpen=vh.id;return r}
 if(/Pedido para|registró un pedido/.test(x)){r.t='inicio';r.cli=null;r.sel='.pedcard,[data-key="pedidos"]';return r}
 if(/no tomó la foto|anuló|corrigió la entrega|pidió corregir|canceló la entrega|cambió fruta|está ayudando|cargó .* más en bodega|Reporte de/.test(x)&&ch){r.t='personal';r.cli=null;S.openCh=ch.id;S.fiTab['emp:'+ch.id]='ruta';return r}
 if(/Revisa el número|agregó el teléfono|dio de alta un cliente|Cliente nuevo|guardó la ubicación|no pudo guardar la ubicación|cerró el negocio|le compró a otro proveedor|pasó su límite|Mayoreo por debajo|mayoreo .* veces|ya lleva 5 compras|bajó su consumo|pide permiso (de mayoreo|para fiarle)|quedó con deuda/.test(x)){
  var c=null;S.cli.forEach(function(k){if(!k.oculto&&k.n&&x.indexOf(k.n)>-1&&(!c||k.n.length>c.n.length))c=k});if(c){r.t='clientes';r.cli=c.id;S.fiTab=S.fiTab||{};if(/número|teléfono|ubicación|dio de alta|Cliente nuevo/.test(x))S.fiTab['cli:'+c.id]='dat';return r}}
 if(r.t==='inicio'&&ch&&!esAdm(ch)){r.t='personal';S.openCh=ch.id}
 return r}
function avDst60(x,r){r=r||{t:'inicio',cli:null};try{var ch=avChofDe(x);
 /* ubicación / celular apagado → ficha del chofer, en "Su recorrido" con su última ubicación */
 if(/\[gps(ev)?:|no manda su ubicación|apagó el celular|apagó la ubicación|quitó el permiso de ubicación|ubicación detenida|sin señal/.test(x)){r.t='personal';r.cli=null;if(ch){S.openCh=ch.id;S.fiTab=S.fiTab||{};S.fiTab['emp:'+ch.id]='ruta'}r.sel='[data-k^="gpsruta"]';return r}
 /* efectivo que no coincide → tarjeta del faltante */
 if(/el efectivo de .* no coincide/.test(x)){S.faov={x:x};r.t=S.tab[S.role]||'inicio';r.cli=null;r.sel=null;return r}
 /* faltante de cierre → recepción */
 if(/faltante|Faltaron/i.test(x)&&!/no coincide/.test(x)){r.t='cierreadm';if(ch&&+S.chofHoy!==+ch.id)try{chCambiar(+ch.id)}catch(e){}return r}
 /* equipo sin entregar → bienes del chofer */
 if(/no ha entregado su equipo|NO entregó /.test(x)){r.t='bienes';r.cli=null;return r}}catch(e){}return r}
var _avDestinoBase=avDestino;
avDestino=function(x){
 /* 95 · lo que falta recibir → Rutas, a su tarjeta (no pasa por nada más) */
 if(/^URGENTE: falta recibir /.test(String(x)))return {t:'rutas',cli:null,sel:'[data-x="atr93c"]'};
 /* l6 · sin señal → Personal (sin preguntar a la base) */
 var r=/sin señal|Pendiente de llegar a/.test(x)?{t:'personal',cli:null}:_avDestinoBase.apply(this,arguments);
 /* l9 · vehículos, pagos fijos, bienes y licencias */
 var vh=S.veh.filter(function(v){return !v.baja&&x.indexOf(v.n)>-1})[0];
 if(vh){var tb=/[Mm]ensualidad/.test(x)?'cre':(/verificar|Verificación|Seguro|Tarjeta|placa/.test(x)?'pap':(/aceite|afinación|[Ll]lantas|[Ff]renos|servicio/.test(x)?'tal':null));if(tb){r.t='vehiculos';r.cli=null;S.vehOpen=vh.id;S.fiTab['veh:'+vh.id]=tb}}
 if(/^(Falta pagar|Mañana toca pagar)/.test(x)){r.t='gastos';r.cli=null;S.gsec='fijos'}
 var bn=(S.bienes||[]).filter(function(b){return b.est!=='Dado de baja'&&x.indexOf(b.n)>-1})[0];if(bn&&/calibrar|Vence |Venció /.test(x)){r.t='bienes';r.cli=null;S.bienOpen=bn.id}
 var ch=S.choferes.filter(function(c){return new RegExp('(^|[^A-Za-zÁÉÍÓÚáéíóúñÑ])'+reEsc(chofN(c.id))+'([^A-Za-zÁÉÍÓÚáéíóúñÑ]|$)').test(x)})[0];
 if(ch&&/Licencia|sin señal/.test(x)){r.t='personal';r.cli=null;S.openCh=ch.id;S.fiTab['emp:'+ch.id]=/Licencia/.test(x)?'dat':'ruta'}
 /* l37 · PIN, cierres, gastos, cargas, vehículos, pedidos, choferes y clientes (con el lugar exacto) */
 r=avDst37(x,r);
 /* l60 · ubicación, efectivo que no coincide, faltantes, equipo */
 r=avDst60(x,r);
 /* l68 · lotes de fruta → Bodega, al lote */
 r=r||{t:'inicio',cli:null};try{
  if(/(roat[aá]n|macho).*(madur|se pasa|pas[oó] su tiempo|pasaron de tiempo)|Lote de (roat[aá]n|macho)/i.test(x)&&!r.sel){var R=/roat[aá]n/i.test(x);r.t='bodega';r.cli=null;r.sel='[data-x="antig65"] .lote[data-p="'+(R?'R':'M')+'"],[data-x="antig65"]';r.lote68=R?'R':'M'}
 }catch(e){}
 /* l69 · "no cuadra" → Bodega (taras/cajas) o "¿Cuadran las cuentas?" */
 r=r||{t:'inicio',cli:null};try{if(/no cuadra/.test(x)){if(/taras|cajas/i.test(x)){r.t='bodega';r.cli=null;r.sel='[data-act="cjfis"],.card.cajas68,[data-x="exist65"]'}else if(!r.sel){r.t='inicio';r.cli=null;r.sel='[data-x="cuadra68"]'}}}catch(e){}
 /* l82 · lote que pasó su tiempo → su botón "Sacar" */
 try{var m=/^Lote de (roatán|macho) \(([\d.]+) (cajas|kg)\) pasó su tiempo/i.exec(String(x||''));if(m&&r){var pr=/roat/i.test(m[1])?'R':'M',q=num(m[2]),l=(S.lotes||[]).filter(function(o){return o.prod===pr&&num(o.q)===q})[0]||(S.lotes||[]).filter(function(o){return o.prod===pr})[0];
  r.t='bodega';r.sel=l?'[data-act="sacar"][data-id="'+l.id+'"]':'[data-act="sacar"]';delete r.lote68}}catch(e){}
 /* l87 · "no envió su cierre" → Inicio, a su tarjeta */
 try{if(/no envió su cierre/.test(String(x))&&r){r.t='inicio';r.sel='[data-x="dia80a"]'}}catch(e){}
 /* 91 · promesas de pago → la tarjeta de Cobranza */
 try{if(/prometió pagar|como prometió/.test(String(x))&&r){r.t='inicio';r.cli=null;r.sel='[data-x="cob91c"]'}}catch(e){}
 /* 92 · sin señal / ubicación → Rutas (ya no Personal) */
 try{if(r&&r.t==='personal'&&/sin señal|última ubicación|ubicación del chofer|apagó el GPS|GPS apagado/i.test(String(x)))r.t='rutas'}catch(e){}
 return r};

/* ---------- cómo se dibuja un renglón de aviso ---------- */
var _avRowBase=avRow;
avRow=function(x,u){var h=_avRowBase.apply(this,arguments);
 /* l37 · sin la marca [pin:…] */
 h=h.replace(/\s*\[pin:[^\]]+\]/,'');
 /* l51 · en segunda persona si lo hiciste tú ("Registraste…") */
 var y=avYo(x);if(y!==x)h=h.replace('<span class="grow">'+esc(x)+'</span>','<span class="grow">'+esc(y)+'</span>');
 /* l52 · los avisos con [tel:…] y [geo:…] muestran botones de Llamar y Ver dónde */
 var tel=/ \[tel:(\d+)\]/.exec(x),geo=/ \[geo:(-?[\d.]+),(-?[\d.]+)\]/.exec(x);
 if(tel||geo){var lim=x.replace(/ \[tel:\d+\]/,'').replace(/ \[geo:[^\]]+\]/,'');h=h.replace('<span class="grow">'+esc(x)+'</span>','<span class="grow">'+esc(avYo(lim))+'</span>').replace('<span class="grow">'+esc(avYo(x))+'</span>','<span class="grow">'+esc(avYo(lim))+'</span>');
  var bt=(tel?'<a class="btn sm" style="width:auto;min-height:40px;display:inline-flex;align-items:center" href="tel:'+tel[1]+'" data-noav="1">📞 Llamar</a>':'')+(geo?'<a class="btn sm sec" style="width:auto;min-height:40px;display:inline-flex;align-items:center" href="https://www.google.com/maps?q='+geo[1]+','+geo[2]+'" target="_blank" rel="noopener" data-noav="1">📍 Ver dónde</a>':'');
  h=h.replace(/<\/div>$/,'<span style="display:flex;gap:6px;flex-wrap:wrap">'+bt+'</span></div>')}
 /* l60 · sin las marcas [gps:…] */
 h=h.replace(/\s*\[(gps|gpsev):[^\]]*\]/g,'');
 /* l68 · color e ícono por tipo; "Posponer" abajo del texto */
 try{var I=avInfo68(x);
  h=h.replace('data-swipe=','data-c68="'+I.col+'" data-swipe=').replace('style="display:flex;','style="--c68:'+COL68[I.col]+';display:flex;').replace(/(role="button" tabindex="0"[^>]*>)/,'$1<span class="ic68" aria-hidden="true">'+ic68(I.ic)+'</span>');
  /* la marca de "Urgente/Pronto" la da el color; el borde izquierdo de antes ya no */
  h=h.replace(/;border-left:5px solid var\(--danger\);font-weight:700/,';font-weight:700');
  var m=/<button class="link"[^>]*data-act="avpos"[^>]*>[^<]*<\/button>/.exec(h);if(m){h=h.replace(m[0],'');h=h.replace(/(<span class="grow">)([\s\S]*?)(<\/span>)/,'$1$2<br>'+m[0].replace('class="link"','class="link pos68"')+'$3')}}catch(e){}
 return h};

/* ---------- l60 · tarjeta "Por atender" (por nivel: Urgente / Pronto / Info) + "Informativos" ---------- */
avisosHTML=function(av){var hoy=iso(TODAY),G=actGrupos(hoy),gk=Object.keys(G),visto=(S.actVisto||{})[hoy]||0,nAct=actDe(null,hoy).length;
 var U=av.filter(function(x){return AV_URG.test(x)}),I=av.filter(function(x){return !AV_URG.test(x)&&AV_INFO.test(x)}),N=av.filter(function(x){return U.indexOf(x)<0&&I.indexOf(x)<0});
 var lv={r:'Urgente',o:'Pronto',b:'Info'},row=function(x){var n=avNivel(x);return avRow(x).replace('class="av"','class="av avl '+n+'"').replace(/(role="button" tabindex="0"[^>]*>)/,'$1<span class="avlv '+n+'">'+lv[n]+'</span>')};
 N.sort(function(a,b){var o={r:0,o:1,b:2};return o[avNivel(a)]-o[avNivel(b)]});var P=U.concat(N);
 var h=P.length?'<div class="card'+(U.length?' alert':'')+'" style="'+(U.length?'border-width:2px':'')+'"><b class="tt">Por atender ('+P.length+')</b><div class="lbl">Toca uno para ir a donde se resuelve. Deslízalo hacia un lado para posponerlo a mañana.</div>'+P.map(row).join('')+'</div>':'';
 var nInfo=I.length+gk.length;if(nInfo&&(I.length||nAct>visto)){h+='<details class="card" data-k="avinfo"'+(S.dOpen.avinfo?' open':'')+'><summary><b>Informativos</b><span class="lbl">'+nInfo+' · se borran solos mañana</span></summary>'
  +gk.map(function(k){return '<div class="actl"><b>'+esc(k)+':</b> '+esc(actResumen(G[k]))+'</div>'}).join('')+I.map(row).join('')
  +(nAct?'<details style="margin-top:6px"><summary class="lbl">Ver la actividad de hoy ('+nAct+')</summary>'+actDiaHTML(hoy,null,' ')+'</details>':'')
  +'<button class="btn sm sec" style="width:auto;margin-top:8px" data-act="avvisto">Marcar todo como visto</button></details>'}
 return h};

/* ---------- al llegar, se marca el lugar exacto ---------- */
var _avFocoBase=avFoco;
avFoco=function(sel){_avFocoBase.apply(this,arguments);
 /* l70 · al llegar desde el numerito de la barra a un lote, además se abren sus opciones */
 try{if(/\.lote\[data-p=/.test(sel||'')){setTimeout(function(){var el=document.querySelector(sel.split(',')[0]);if(el&&!S.lt53)el.click()},900)}}catch(e){}};

/* ---------- numeritos de la barra ---------- */
var _tabBadgesBase=tabBadges;
tabBadges=function(){var r=_tabBadgesBase.apply(this,arguments);
 /* l67 · 46 · todos los que parpadean van al mismo compás (no arrancan de nuevo al redibujar) */
 try{var d=-(Date.now()%1100)+'ms';Array.prototype.forEach.call(document.querySelectorAll('nav.tabs .tbadge.blink'),function(b){b.style.animationDelay=d})}catch(e){}
 /* 92 · rojo solo lo urgente; lo demás un puntito gris */
 try{[].slice.call(document.querySelectorAll('nav.tabs .tbadge.suave')).forEach(function(b){b.classList.add('dot92');b.classList.remove('blink');b.textContent=''})}catch(e){}
 return r};

/* ---------- pendientes de cada sección: "🔔 N pendientes · ver" con Ir / ✓ Listo ---------- */
/* l88 · cada pendiente con "Ir ›" y "✓ Listo" (o "Recordar mañana"; la falla del vehículo con sus 3 opciones) */
function pndIr88(){var c=document.querySelector('[data-x="pnd86"]');if(!c||c.dataset.v88)return;c.dataset.v88='1';
 Array.prototype.forEach.call(c.querySelectorAll('button.it[data-act="avgo"]'),function(b){var x=decodeURIComponent(b.dataset.k||''),din=DIN88.test(x),fa=/^(URGENTE:\s*)?Salió con una falla/.test(x);var d=document.createElement('div');d.className='it88';
  d.innerHTML=b.querySelector('.tx').innerHTML.replace(/<span class="lbl" style="font-size:20px">›<\/span>/,'')+(fa?falla88HTML(x):'<div class="row88"><button class="ir88" data-act="avgo" data-k="'+b.dataset.k+'">Ir ›</button>'+(din?'<button class="ok88" data-act="av88m" data-k="'+b.dataset.k+'">Recordar mañana</button>':'<button class="ok88" data-act="av88ok" data-k="'+b.dataset.k+'">✓ Listo</button>')+'</div>');b.replaceWith(d)});
 var lb=c.querySelector('.lbl');if(lb)lb.textContent='Es el numerito de la barra de abajo. "Ir" te lleva a resolverlo; "✓ Listo" lo quita.'}
/* 92 · un solo renglón que se abre; el título ya no se repite pegado ("Tienda Don BetoTienda Don Beto: …") */
function pndRenglon92(){try{var c=document.querySelector('main [data-x="pnd86"]');if(!c||c.dataset.v92)return;c.dataset.v92='1';var t=S.tab.admin;
 [].slice.call(c.querySelectorAll('.it88')).forEach(function(it){var b=it.querySelector('b'),l=it.querySelector('.lbl');if(!b||!l)return;var bt=b.textContent.trim(),lt=l.textContent.trim();if(bt&&lt.indexOf(bt)===0){var rest=lt.slice(bt.length).replace(/^[\s:·,-]+/,'');if(rest)l.textContent=rest.charAt(0).toUpperCase()+rest.slice(1);else l.remove()}});
 var n=c.querySelectorAll('.it88, button.it').length;var tit=c.querySelector('b');var txt=tit?tit.textContent.replace(/^🔔\s*/,''):(n+' pendientes');if(tit)tit.parentNode===c&&tit.remove();var lb=c.querySelector(':scope>.lbl');if(lb)lb.remove();
 var abierto=(S.pnd92||'')===t;c.classList.add('c92');if(!abierto)c.classList.add('cerr92');
 var h=document.createElement('button');h.className='hd92';h.dataset.act='pnd92';h.innerHTML='🔔 '+esc(txt)+'<span class="go">'+(abierto?'cerrar ▲':'ver ›')+'</span>';c.prepend(h)}catch(e){console.error('pnd92',e)}}
var _pendCardBase=pendCard86;
pendCard86=function(){_pendCardBase.apply(this,arguments);pndIr88();pndRenglon92()};

/* 165 · el pendiente marcado (avFoco) ya no se borra si la pantalla se vuelve a dibujar mientras está marcado (un aviso que sale justo
   después redibujaba y la tarjeta nueva salía sin la marca): durante esos 3.4 s, cada redibujado se la vuelve a poner. */
var foco165={sel:null,hasta:0};
var _avF165=avFoco;avFoco=function(sel){if(sel)foco165={sel:sel,hasta:Date.now()+3400};return _avF165.apply(this,arguments)};
var _rd165f=render;render=function(){var r=_rd165f.apply(this,arguments);try{if(foco165.sel&&Date.now()<foco165.hasta){var el=document.querySelector(foco165.sel);if(el){var c=el.closest('.card')||el;if(!c.classList.contains('avfoco')){c.classList.add('avfoco');setTimeout(function(){c.classList.remove('avfoco')},Math.max(0,foco165.hasta-Date.now()))}}}}catch(e){}return r};
