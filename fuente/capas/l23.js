/* ===================== v5.1 · Ficha del cliente: foto de la fachada y crédito desde el buró ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.fihero.confoto{padding-top:0;overflow:hidden}',
 '.clifoto{position:relative;width:calc(100% + 28px);margin:0 -14px;height:170px;background:#DDE3D8 center/cover no-repeat}',
 '.clifoto::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(0,0,0,.35))}',
 '.clifoto .clicam{position:absolute;right:10px;bottom:10px;z-index:1;background:rgba(255,255,255,.92);color:#1E2A1A;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.2)}',
 '.fihero.confoto .avt{margin-top:-44px;border:4px solid var(--surface);position:relative;z-index:1}',
 '.buroc{cursor:pointer}.buroc .ir{float:right;font-size:20px;line-height:1}',
 '#crov{position:fixed;inset:0;z-index:84;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}#crov .fiw{max-width:560px;margin:0 auto;padding:0 16px 48px}',
 '#crov .fihd{position:sticky;top:0;z-index:3;background:var(--bg);padding:calc(10px + var(--sbar,0px)) 0 8px;display:flex;align-items:center;gap:10px}',
 '#crov .fiback{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);font-size:22px;color:var(--fg);flex:none}',
 '#crov .acc{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}'
].join('\n');document.head.appendChild(st)})();
/* foto de la fachada como portada */
var _fiCli23=fiCli;fiCli=function(f){var h=_fiCli23.apply(this,arguments),c=cl(f.id);if(!c)return h;
 var foto=c.foto,inp='<input id="fhx'+c.id+'" type="file" accept="image/*" capture="environment" data-fach="'+c.id+'" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">';
 if(foto)h=h.replace('<div class="fihero"><span class="avt"','<div class="fihero confoto"><div class="clifoto" style="background-image:url(\''+foto+'\')"><label class="clicam" for="fhx'+c.id+'">📷 Cambiar foto</label>'+inp+'</div><span class="avt"');
 else h=h.replace(/(<div class="fihero"><span class="avt"[^>]*>[^<]*<\/span>)/,'$1<label class="btn sm sec" for="fhx'+c.id+'" style="display:inline-flex;align-items:center;cursor:pointer;width:auto">📷 Foto de la fachada</label>'+inp);
 return h};
/* "excepción tuya" solo si de verdad es distinta al máximo general */
limBase=function(c){var d=limDefDe(c);if(c.limMan!=null&&c.limMan!==''&&num(c.limMan)===d)c.limMan=null;return c.limMan!=null&&c.limMan!==''?num(c.limMan):d};
/* la tarjeta del buró se puede tocar */
var _mh23=mayHistHTML;mayHistHTML=function(c){var h=_mh23.apply(this,arguments);if(!c||S.role!=='admin')return h;
 return h.replace('<div class="card note" style="padding:10px 12px;margin:6px 0"><b>Buró</b>','<div class="card note buroc" role="button" tabindex="0" data-act="cropen" data-id="'+c.id+'" style="padding:10px 12px;margin:6px 0"><span class="ir">›</span><b>Buró y crédito</b>').replace('<button class="link" data-act="buroreset" data-id="'+c.id+'">Perdonar y regresar a Bueno</button>','')};
/* congelar: no se le fía, pero puede pagar */
/* credBloq: pasó a tema-ruta.js */
/* ---- la pantalla para manejar su crédito ---- */
function crHTML(){var id=S.crCli;if(id==null||S.role!=='admin')return '';var c=cl(id);if(!c){S.crCli=null;return ''}var b=buroDe(c),cf=crCfg(),lim=limEf(c),pagos=S.cobros.filter(function(x){return x.c===c.id}).slice(-5).reverse(),edad=c.cred>0?credAge(c):0;
 var est=!c.credOk?'<span class="pill warn">Solo contado (crédito cancelado)</span>':(c.credFrz?'<span class="pill wait">Crédito congelado</span>':buroPill(c));
 var msg='Hola'+(c.recibe?' '+c.recibe:'')+', le saludamos de '+(S.cfg.nombre||'')+'. Le recordamos que tiene un saldo pendiente de '+money(c.cred)+'. ¿Cuándo podemos pasar a cobrarlo? Gracias.';
 return '<div id="crov" role="dialog" aria-label="Crédito de '+esc(c.n)+'"><div class="fiw"><div class="fihd"><button class="fiback" data-act="crx" aria-label="Regresar">←</button><span class="grow"><b style="font-size:19px">Crédito de '+esc(c.n)+'</b><br>'+est+'</span></div>'
  +'<div class="card">'+rw('Te debe',c.cred>0?'<b class="neg">'+money(c.cred)+'</b>':'<b style="color:var(--accent)">Nada</b>')+(c.cred>0?rw('Desde hace',edad+' días'):'')+rw('Límite que puede deber',money(lim)+(c.limMan!=null?' (excepción tuya)':''))+rw('Buró',BURO[b.n][0]+' '+BURO[b.n][1]+(b.n&&b.n<3?' · sube al liquidar a tiempo '+(3-b.ok)+' vez(es)':''))+'</div>'
  +(c.cred>0?'<div class="card"><b>Cobrarle</b><div class="field"><label for="abc_'+c.id+'">¿Cuánto te pagó? $</label><input id="abc_'+c.id+'" type="number" inputmode="decimal" min="0" step="any"></div><div class="acc"><button class="btn sm" data-act="cobrar" data-id="'+c.id+'">Registrar pago</button><button class="btn sm sec" data-act="cobrartodo" data-id="'+c.id+'">Pagó todo ('+money(c.cred)+')</button></div>'
   +(c.tel?'<a class="btn sm sec" style="margin-top:8px;display:flex;align-items:center;justify-content:center;text-decoration:none" target="_blank" rel="noopener" data-act="crrec" data-id="'+c.id+'" href="'+waLink(c,msg)+'">📲 Recordarle por WhatsApp</a>':'<div class="lbl" style="margin-top:6px">Agrega su teléfono para recordarle por WhatsApp.</div>')+(c.recUlt?'<div class="lbl" style="margin-top:4px">Último recordatorio: '+esc(c.recUlt)+'</div>':'')+'</div>':'')
  +'<div class="card"><b>Su límite</b><div class="lbl">El máximo para '+(chCredDe(c)?'los clientes de '+esc(chCredDe(c).n):'cada cliente')+' es '+money(limDefDe(c))+'. Si le pones otro, queda como excepción tuya (y el buró lo baja igual si se atrasa).</div><div class="acc"><button class="btn sm sec" data-act="crlim" data-id="'+c.id+'" data-d="-500">Bajar $500</button><button class="btn sm sec" data-act="crlim" data-id="'+c.id+'" data-d="500">Subir $500</button></div>'
   +'<div class="field" style="margin-top:8px"><label for="crlv">Ponerle exactamente $</label><input id="crlv" type="number" inputmode="decimal" min="0" data-bind="crLimV" value="'+esc(S.crLimV==null?limBase(c):S.crLimV)+'"></div><div class="acc"><button class="btn sm" data-act="crlimset" data-id="'+c.id+'">Guardar límite</button>'+(c.limMan!=null?'<button class="btn sm sec" data-act="crlimdef" data-id="'+c.id+'">Quitar excepción</button>':'')+'</div></div>'
  +'<div class="card"><b>Buró</b><div class="acc">'+(b.n?'<button class="btn sm sec" data-act="buroreset" data-id="'+c.id+'">Perdonar: regresar a Bueno</button>':'')+(b.n<3?'<button class="btn sm sec" data-act="crbaja" data-id="'+c.id+'">Bajarlo un nivel</button>':'')+'</div></div>'
  +'<div class="card"><b>Fiarle o no</b><div class="lbl">Congelar: por ahora no se le fía, pero puede pagar lo que debe. Cancelar: queda solo de contado hasta que lo reactives.</div><div class="acc">'
   +(c.credOk?(c.credFrz?'<button class="btn sm" data-act="crfrz" data-id="'+c.id+'" data-v="0">Descongelar</button>':'<button class="btn sm sec" data-act="crfrz" data-id="'+c.id+'" data-v="1">Congelar crédito</button>')+'<button class="btn sm sec" style="color:var(--danger)" data-act="crcan" data-id="'+c.id+'" data-v="1">Cancelar crédito</button>':'<button class="btn sm" data-act="crcan" data-id="'+c.id+'" data-v="0">Reactivar crédito</button>')+'</div></div>'
  +'<div class="card"><b>Últimos pagos</b>'+(pagos.length?pagos.map(function(x){return rw(fmtF(x.f||x.fecha||iso(TODAY))+(x.q?' · '+esc(x.q):''),money(num(x.m||x.monto)))}).join(''):'<div class="lbl">Todavía no hay pagos registrados.</div>')+'</div></div></div>'}
var _suH23=setupHTML;setupHTML=function(){var h=_suH23.apply(this,arguments);return h||crHTML()};
function crHist(c,x){S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:c.n+': '+x})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,c=b.dataset.id!=null?cl(+b.dataset.id):null;
 if(a==='cropen'){e.stopImmediatePropagation();S.crCli=+b.dataset.id;S.crLimV=null;render();var o=document.getElementById('crov');if(o)o.scrollTop=0;return}
 if(a==='crx'){e.stopImmediatePropagation();S.crCli=null;render();return}
 if(a==='crlim'){e.stopImmediatePropagation();var v=Math.max(0,limBase(c)+num(b.dataset.d));c.limMan=v===limDefDe(c)?null:v;c.limRev=false;S.crLimV=null;crHist(c,'límite a '+money(v));toast('Límite de '+c.n+': '+money(limEf(c)));render();return}
 if(a==='crlimset'){e.stopImmediatePropagation();var v2=num(S.crLimV==null?limBase(c):S.crLimV);c.limMan=v2===limDefDe(c)?null:v2;c.limRev=false;S.crLimV=null;crHist(c,'límite a '+money(v2));toast('Límite guardado: '+money(limEf(c)));render();return}
 if(a==='crlimdef'){e.stopImmediatePropagation();c.limMan=null;S.crLimV=null;crHist(c,'quitó la excepción de límite');toast('Regresó al máximo general');render();return}
 if(a==='crbaja'){e.stopImmediatePropagation();var bb=buroDe(c);bb.n=Math.min(3,bb.n+1);bb.ok=0;bb.porque='Lo bajó el administrador';crHist(c,'buró bajado a '+BURO[bb.n][1]);toast(c.n+': '+BURO[bb.n][1]);render();return}
 if(a==='crfrz'){e.stopImmediatePropagation();c.credFrz=b.dataset.v==='1';crHist(c,c.credFrz?'congeló su crédito':'descongeló su crédito');toast(c.credFrz?'Crédito congelado: solo puede pagar':'Crédito activo otra vez');render();return}
 if(a==='crcan'){e.stopImmediatePropagation();c.credOk=b.dataset.v!=='1';if(c.credOk)c.credFrz=false;crHist(c,c.credOk?'reactivó su crédito':'canceló su crédito');toast(c.credOk?'Crédito reactivado':'Crédito cancelado: solo de contado');render();return}
 if(a==='crrec'){c.recUlt=fmtF(iso(TODAY))+' '+hhmm();crHist(c,'le mandó recordatorio de pago');setTimeout(render,50)}},true);
