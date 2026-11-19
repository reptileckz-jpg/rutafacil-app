/* ===================== v5 · Control de crédito y mayoreo ("buró") =====================
   - Mayoreo por cliente: 2 mayoreos a mano en 10 días → aviso y se bloquea "en revisión" hasta que decidas.
   - Crédito: máximo $1,500 por cliente (excepciones solo tú) y lo que deben todos los clientes de un chofer
     no pasa de $5,000.
   - Buró: el límite baja solo si el cliente tarda en pagar; sube un nivel al liquidar 3 veces a tiempo.
   Todos los números se cambian en Ajustes. */
var CR_DEF={crCli:'1500',crCh:'5000',mayD:'10',mayN:'2',bD1:'7',bD2:'15',bD3:'30',bL2:'1000',bL3:'500'};
function crCfg(){S.cfg=S.cfg||{};Object.keys(CR_DEF).forEach(function(k){if(S.cfg[k]==null||S.cfg[k]==='')S.cfg[k]=CR_DEF[k]});return S.cfg}
var BURO=[['🟢','Bueno'],['🟡','Regular'],['🟠','Malo'],['🔴','Bloqueado']];
function buroTierEdad(d){var c=crCfg();return d<=num(c.bD1)?0:(d<=num(c.bD2)?1:(d<=num(c.bD3)?2:3))}
function buroDe(c){c.buro=c.buro||{n:0,ok:0};return c.buro}
function limBase(c){return c.limMan!=null&&c.limMan!==''?num(c.limMan):num(crCfg().crCli)}
function limEf(c){var b=buroDe(c),cf=crCfg(),base=limBase(c),k=[1,num(cf.bL2)/num(cf.crCli),num(cf.bL3)/num(cf.crCli),0][b.n];return b.n===0?base:Math.round(base*Math.min(1,k))}
/* se actualiza el nivel: baja en cuanto tarda; sube al liquidar a tiempo 3 veces */
function buroSync(){crCfg();S.cli.forEach(function(c){if(c.rapida&&!c.reg)return;var b=buroDe(c),edad=credAge(c);
 if(c.cred>0.5){var t=buroTierEdad(edad);if(t>b.n){b.n=t;b.ok=0;b.baja=iso(TODAY);b.porque='Tardó '+edad+' días en pagar'}c._edad=edad}
 else if(c._credAnt>0.5){/* acaba de liquidar */var e=c._edad||0;if(b.n===3){b.n=2;b.ok=0;b.sube=iso(TODAY)}else if(e<=num(crCfg().bD1)){b.ok++;if(b.ok>=3&&b.n>0){b.n--;b.ok=0;b.sube=iso(TODAY)}}else b.ok=0;c._edad=0}
 c._credAnt=c.cred;c.lim=limEf(c)})}
/* clientes que ya tenían más de $1,500: bajan y tú decides la excepción */
(function(){try{crCfg();S.cli.forEach(function(c){if(c.limRevVisto)return;c.limRevVisto=1;if(num(c.lim)>num(S.cfg.crCli)&&c.limMan==null){c.limOld=num(c.lim);c.limRev=true}});buroSync()}catch(e){}})();
var _rBu19=render;render=function(){try{buroSync()}catch(e){}return _rBu19.apply(this,arguments)};
/* el admin edita el límite: eso es su excepción */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="cesave"]');if(!b||!S.ce)return;var id=S.cliEdit,v=num(S.ce.lim);
 setTimeout(function(){var c=cl(id);if(!c)return;c.limMan=v>0&&v!==num(crCfg().crCli)?v:null;c.limRev=false;buroSync();render()},0)},true);
var _ceedit19=null;document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="ceedit"]');if(!b)return;setTimeout(function(){var c=cl(+b.dataset.id);if(S.ce&&c)S.ce.lim=String(limBase(c));render()},0)},true);
/* bloqueos */
/* credBloq: pasó a tema-ruta.js */
function chDeuda(ch,excepto){return r2(sum(S.cli.filter(function(c){return !c.oculto&&+c.chofer===+ch&&c.id!==excepto}),function(c){return num(c.cred)}))}
/* entValida: pasó a tema-ruta.js */
function buroPill(c){var b=buroDe(c),x=BURO[b.n];return '<span class="pill" style="background:'+['rgba(47,125,50,.14)','rgba(242,194,48,.25)','rgba(230,126,34,.2)','rgba(192,57,43,.18)'][b.n]+';color:inherit">'+x[0]+' '+x[1]+'</span>'}
/* en la entrega: su calificación, su límite y cuánto le queda al chofer */
/* entrega: pasó a tema-ruta.js */
/* en la ficha del cliente (admin) */
/* mayHistHTML: pasó a tema-fichas.js */
/* mayoreo por cliente: 2 veces en 10 días → en revisión */
function mayAM(c){var cf=crCfg(),lim=iso(new Date(TODAY.getTime()-num(cf.mayD)*864e5));return (c.mayAM||[]).filter(function(f){return f>lim})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="guardar"]');if(!b||S.role!=='rep')return;var c=curCli(),n0=S.log.length;if(!c)return;
 setTimeout(function(){if(S.log.length<=n0)return;var l=S.log[S.log.length-1];if(!(l.mayT==='chofer'||l.mayEl)||c.mayoreo)return;c.mayAM=(c.mayAM||[]).concat([iso(TODAY)]);var cf=crCfg();
  if(mayAM(c).length>=num(cf.mayN)&&!c.mayRev){c.mayRev=true;c.mayNo=true;S.avPrecio.push('URGENTE: a '+c.n+' se le dio mayoreo '+mayAM(c).length+' veces en '+cf.mayD+' días. Se bloqueó hasta que lo revises');render()}},60)},true);
function mayRevHTML(){var L=S.cli.filter(function(c){return c.mayRev&&!c.oculto});if(!L.length||S.role!=='admin')return '';
 return '<div class="card alert" data-key="mayrev" style="padding:10px 12px;border-width:2px"><b class="neg">Mayoreo en revisión</b><div class="lbl">Se les dio mayoreo a mano '+crCfg().mayN+' veces o más en '+crCfg().mayD+' días. Revisa si su consumo lo justifica.</div>'+L.map(function(c){var H=(c.mayHist||[]).slice(-3);return '<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+esc(c.n)+'</b><div class="lbl">'+H.map(function(x){return fmtF(x.f)+(x.pr?' · caja '+money(x.pr):'')+(x.pm?' · kg '+f2(x.pm):'')+(x.q?' ('+esc(x.q)+')':'')}).join('<br>')+'<br>Compra en 30 días: '+money(num(c.c30))+'</div><div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap"><button class="btn sm" style="flex:1" data-act="mayrevsi" data-id="'+c.id+'">Lo justifica: cliente de mayoreo</button><button class="btn sm sec" style="flex:1" data-act="mayrevno" data-id="'+c.id+'">No darle mayoreo</button><button class="btn sm sec" style="flex:1" data-act="mayrevdes" data-id="'+c.id+'">Desbloquear</button></div></div>'}).join('')+'</div>'}
function limRevHTML(){var L=S.cli.filter(function(c){return c.limRev&&!c.oculto});if(!L.length||S.role!=='admin')return '';
 return '<details class="card note" data-key="limrev" style="padding:10px 12px"><summary><b>Límites de crédito por decidir</b><span class="lbl">'+L.length+' cliente'+(L.length>1?'s':'')+' tenían más de '+money(num(crCfg().crCli))+'</span></summary>'+L.map(function(c){return '<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+esc(c.n)+'</b> <span class="lbl">tenía '+money(c.limOld)+' · ahora '+money(limEf(c))+'</span><div style="display:flex;gap:6px;margin-top:6px"><button class="btn sm sec" style="flex:1" data-act="limexc" data-id="'+c.id+'">Dejarle '+money(c.limOld)+'</button><button class="btn sm sec" style="flex:1" data-act="limok" data-id="'+c.id+'">Que quede en '+money(num(crCfg().crCli))+'</button></div></div>'}).join('')+'</details>'}
/* permsHTML: pasó a tema-fichas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,c=b.dataset.id!=null?cl(+b.dataset.id):null;
 if(a==='mayrevsi'){e.stopImmediatePropagation();c.mayRev=false;c.mayNo=false;c.mayoreo=true;c.mayAM=[];toast(c.n+' ya es cliente de mayoreo');render();return}
 if(a==='mayrevno'){e.stopImmediatePropagation();c.mayRev=false;c.mayNo=true;toast('A '+c.n+' ya no se le da mayoreo');render();return}
 if(a==='mayrevdes'){e.stopImmediatePropagation();c.mayRev=false;c.mayNo=false;c.mayAM=[];toast('Desbloqueado: a '+c.n+' se le puede volver a dar mayoreo');render();return}
 if(a==='limexc'){e.stopImmediatePropagation();c.limMan=c.limOld;c.limRev=false;buroSync();toast(c.n+': límite de '+money(c.limOld)+' (excepción)');render();return}
 if(a==='limok'){e.stopImmediatePropagation();c.limMan=null;c.limRev=false;buroSync();toast(c.n+': límite de '+money(num(crCfg().crCli)));render();return}
 if(a==='buroreset'){e.stopImmediatePropagation();var bb=buroDe(c);bb.n=0;bb.ok=0;bb.porque='';c._edad=0;toast(c.n+' regresó a Bueno');render();return}},true);
/* los mensajes del chofer cuando está en revisión */
/* toast: pasó a tema-toast.js */
/* regla del chofer: rechazos en los mismos días (antes 30) */
mayRech30=function(ch){var lim=iso(new Date(TODAY.getTime()-num(crCfg().mayD)*864e5));return mayRechL().filter(function(x){return x.ch===+ch&&x.f>lim}).length};
/* Ajustes */
/* ajHTML: pasó a tema-ajustes.js */
