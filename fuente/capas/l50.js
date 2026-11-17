/* ===================== v6.4 · Cierre y equipo: billetes con + y −, recepción del cierre en una tarjeta grande,
   equipo (celular, terminal, impresora, llaves) con buen/mal estado al salir y al regresar, y qué hacer con un faltante ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.mm{display:flex;align-items:center;gap:6px}.mm button{width:52px;height:52px;border-radius:14px;border:2px solid var(--line);background:var(--surface);font-size:26px;font-weight:900;color:var(--fg);flex:none}.mm button:active{transform:scale(.94)}.mm input{width:64px!important;text-align:center;font-size:20px;font-weight:800;min-height:52px}',
 '.efbill{grid-template-columns:1fr auto!important}',
 '#rcov,#eqov{position:fixed;inset:0;z-index:93;background:var(--bg);overflow-y:auto}#rcov .w,#eqov .w{max-width:560px;margin:0 auto;padding:calc(14px + var(--sbar,0px)) 16px 40px;min-height:100%;display:flex;flex-direction:column}',
 '#rcov .q,#eqov .q{font-size:24px;font-weight:900;line-height:1.2;margin:12px 2px 8px}#rcov .big,#eqov .big{min-height:64px;font-size:19px}',
 '.dbe{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:52px;border-top:1px solid var(--line);font-size:18px}.dbe:first-of-type{border-top:0}.dbe b{font-size:22px}',
 '.eqit{border-top:1px solid var(--line);padding:10px 0}.eqit:first-of-type{border-top:0}.eqit .chips button{min-height:48px;font-size:16px}'].join('\n');document.head.appendChild(st)})();
['eqDia','eqDanos','eqTarde'].forEach(function(k){if(NB_SH.indexOf(k)<0)NB_SH.push(k)});
/* ---------- 82 · billetes: [ − ] número [ + ] ---------- */
function mmHTML(id,dato,val,extra){return '<div class="mm"><button type="button" data-act="mmmenos" data-for="'+id+'" aria-label="Uno menos">−</button><input id="'+id+'" type="number" inputmode="numeric" min="0" '+dato+' value="'+esc(val)+'" placeholder="0"'+(extra||'')+'><button type="button" data-act="mmmas" data-for="'+id+'" aria-label="Uno más">+</button></div>'}
var _efP50=efPasoHTML;efPasoHTML=function(){var h=_efP50.apply(this,arguments),b=(S.cierre&&S.cierre.bill)||{};
 BILLETES.forEach(function(d){h=h.replace(new RegExp('<input id="efb'+d+'" type="number" inputmode="numeric" min="0" data-ef="b'+d+'" value="[^"]*" placeholder="0">'),mmHTML('efb'+d,'data-ef="b'+d+'"',b['b'+d]||''))});return h};
document.addEventListener('click',function(e){var bt=e.target.closest&&e.target.closest('[data-act="mmmas"],[data-act="mmmenos"]');if(!bt)return;e.stopImmediatePropagation();e.preventDefault();var i=document.getElementById(bt.dataset.for);if(!i)return;
 var v=Math.max(0,Math.round(num(i.value))+(bt.dataset.act==='mmmas'?1:-1));if(i.dataset.paso)v=Math.max(0,r2(num(i.value)+(bt.dataset.act==='mmmas'?1:-1)*num(i.dataset.paso)));i.value=v||'';try{vibrar(12)}catch(er){}i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}))},true);
/* ---------- 90 · equipo del chofer ---------- */
function eqDe(ch){var L=(S.bienes||[]).filter(function(b){return +b.quien===+ch&&b.est!=='Dado de baja'}).map(function(b){return {k:'b'+b.id,n:b.n,bid:b.id}});
 var vid=vehAsig(ch),v=vid!=null?vehById(+vid):null;if(v)L.push({k:'v'+v.id,n:'Llaves de '+v.n,vid:v.id});return L}
function eqRegDe(ch){var d=(S.eqDia||{})[iso(TODAY)];return d&&d[ch]||{}}
function eqHTML(modo,ch,x){var L=eqDe(ch);if(!L.length)return '<div class="lbl">No tiene equipo asignado. Asígnalo en Ajustes → Bienes.</div>';
 return L.map(function(it){var s=(x.est||{})[it.k]||{};return '<div class="eqit"><b style="font-size:18px">'+esc(it.n)+'</b><div class="chips" role="group" aria-label="Estado de '+esc(it.n)+'" style="margin-top:6px"><button data-act="eqest" data-k="'+it.k+'" data-v="bien" aria-pressed="'+(s.v==='bien')+'">👍 Buen estado</button><button data-act="eqest" data-k="'+it.k+'" data-v="mal" aria-pressed="'+(s.v==='mal')+'">⚠️ Mal estado</button>'+(modo==='regreso'?'<button data-act="eqest" data-k="'+it.k+'" data-v="falta" aria-pressed="'+(s.v==='falta')+'">✗ No lo entregó</button>':'')+'</div>'
  +(s.v==='mal'?'<div class="field"><label for="eqn_'+it.k+'">¿Qué tiene?</label><input id="eqn_'+it.k+'" type="text" data-eqn="'+it.k+'" value="'+esc(s.nota||'')+'" placeholder="ej. pantalla estrellada" style="width:200px;text-align:left"></div><label class="btn sm sec" for="eqf_'+it.k+'" style="display:inline-flex;align-items:center;cursor:pointer;width:auto;margin-top:4px">'+(s.foto?'✓ Foto':'📷 Foto (opcional)')+'</label><input id="eqf_'+it.k+'" type="file" accept="image/*" capture="environment" data-eqf="'+it.k+'" style="position:absolute;opacity:0;width:1px;height:1px">':'')+'</div>'}).join('')}
function eqFaltan(ch,x,modo){return eqDe(ch).filter(function(it){var s=(x.est||{})[it.k];return !s||!s.v||(s.v==='mal'&&!String(s.nota||'').trim())})}
function eqGuarda(ch,x,modo){var d=S.eqDia=S.eqDia||{},h=iso(TODAY);d[h]=d[h]||{};var r=d[h][ch]=d[h][ch]||{};r[modo]={t:hhmm(),est:x.est,q:quien()};
 eqDe(ch).forEach(function(it){var s=x.est[it.k];if(!s)return;if(s.v==='mal'||s.v==='falta'){S.eqDanos=S.eqDanos||[];S.eqDanos.push({f:h,h:hhmm(),k:it.k,n:it.n,ch:ch,modo:modo,v:s.v,nota:s.nota||'',foto:s.foto||null});
  eqAplica();
  S.avPrecio.push((s.v==='falta'?'URGENTE: '+chofN(ch)+' NO entregó '+it.n:(modo==='salida'?chofN(ch)+' recibió '+it.n+' en mal estado: ':'URGENTE: '+chofN(ch)+' entregó '+it.n+' en mal estado: ')+(s.nota||'')))}})}
/* al empezar el día: el chofer recibe su equipo (antes de iniciar la ruta) */
function eqOvHTML(){var x=S.eqov;if(!x)return '';var ch=+S.chofHoy;
 return '<div id="eqov" role="dialog" aria-label="Equipo"><div class="w"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:18px">Antes de salir</b><div class="lbl">Revisa lo que te llevas</div></span><button class="helpb" style="margin:0" data-act="eqx" aria-label="Cerrar">×</button></div><div class="q">¿Cómo recibes tu equipo?</div><div class="card">'+eqHTML('salida',ch,x)+'</div>'
  +(x.err?'<div class="neg" role="alert" style="font-weight:700;margin:10px 2px">'+esc(x.err)+'</div>':'')+'<div style="margin-top:auto;padding-top:14px"><button class="btn big" data-act="eqok">Listo, ya lo revisé</button></div></div></div>'}
var _suH50=setupHTML;setupHTML=function(){return rcHTML()||eqOvHTML()||_suH50.apply(this,arguments)};
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="iniciar"],[data-act="bienvgo"]');if(!b||S.role!=='rep'||S.eqov)return;var ch=+S.chofHoy;if(!eqDe(ch).length||eqRegDe(ch).salida)return;e.stopImmediatePropagation();e.preventDefault();S.eqov={est:{},sig:b.dataset.act};render()},true);
document.addEventListener('input',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.eqn)return;var x=S.eqov||S.rcv;if(!x)return;x.est[t.dataset.eqn]=x.est[t.dataset.eqn]||{};x.est[t.dataset.eqn].nota=t.value},true);
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.eqf)return;var x=S.eqov||S.rcv,f=t.files&&t.files[0];if(!x||!f)return;var k=t.dataset.eqf,fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var r=Math.min(1,FOTO_PX119/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*r);cv.height=Math.round(im.height*r);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);x.est[k]=x.est[k]||{};x.est[k].foto=cv.toDataURL('image/jpeg',FOTO_Q119);render()};im.src=fr.result};fr.readAsDataURL(f)},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,x=S.eqov||S.rcv;
 if(a==='eqest'&&x){e.stopImmediatePropagation();x.est[b.dataset.k]=x.est[b.dataset.k]||{};x.est[b.dataset.k].v=b.dataset.v;x.err='';render();return}
 if(a==='eqx'){e.stopImmediatePropagation();S.eqov=null;render();return}
 if(a==='eqok'&&S.eqov){e.stopImmediatePropagation();var ch=+S.chofHoy,F=eqFaltan(ch,S.eqov,'salida');if(F.length){S.eqov.err='Falta revisar: '+F.map(function(z){return z.n}).join(', ');render();setTimeout(function(){var el=document.querySelector('#eqov [role="alert"]');if(el)marcaFalta(el)},30);return}
  eqGuarda(ch,S.eqov,'salida');var sig=S.eqov.sig;S.eqov=null;render();setTimeout(function(){var bt=document.querySelector('[data-act="'+sig+'"]');if(bt)bt.click()},60);return}},true);
/* ---------- 85 · recepción del cierre: lo que debe regresar, un toque si llegó todo ---------- */
function rcDebe(){var r=S.cierre.res||{},c=S.cierre,d=c.corte||{};return {R:Math.max(0,num(r.reg)),M:Math.max(0,num(r.regK)),V:num(r.V),efe:num(r.efectivo),dice:d.ent!=null?num(d.ent):null,bolsa:d.bolsa||''}}
function rcHTML(){var x=S.rcv;if(!x||S.role!=='admin')return '';var D=rcDebe(),ch=+S.chofHoy,nm=esc(chofN(ch)),h='';
 if(x.p===0){h='<div class="q">'+nm+' debe regresar</div><div class="card">'
   +'<div class="dbe"><span>Cajas vacías</span><b>'+D.V+'</b></div><div class="dbe"><span>Cajas llenas de roatán</span><b>'+D.R+'</b></div><div class="dbe"><span>Kilos de macho</span><b>'+D.M+' kg</b></div><div class="dbe"><span>Efectivo</span><b>'+money(D.efe)+'</b></div>'
   +(D.dice!=null&&Math.abs(D.dice-D.efe)>=0.5?'<div class="lbl" style="margin-top:6px">Él dice que entrega <b>'+money(D.dice)+'</b>'+(S.cierre.corte&&S.cierre.corte.mot?' ('+esc(S.cierre.corte.mot)+')':'')+'.</div>':'')+(D.bolsa?'<div class="lbl">Bolsa '+esc(D.bolsa)+'</div>':'')+'</div>'
   +'<div style="margin-top:auto;padding-top:14px"><button class="btn big" data-act="rctodo">✓ Sí, llegó todo eso</button><button class="btn sec big" style="margin-top:8px" data-act="rcdif">No, llegó diferente</button></div>'}
 if(x.p===1){h='<div class="q">¿Qué llegó?</div><div class="lbl" style="margin:0 2px 8px">Corrige solo lo que no cuadre.</div><div class="card">'
   +'<div class="field"><label for="rcxV">Cajas vacías <span class="lbl">(debe '+D.V+')</span></label>'+mmHTML('rcxV','data-rc="V"',x.V)+'</div>'
   +'<div class="field"><label for="rcxR">Cajas llenas <span class="lbl">(debe '+D.R+')</span></label>'+mmHTML('rcxR','data-rc="R"',x.R)+'</div>'
   +'<div class="field"><label for="rcxM">Kilos de macho <span class="lbl">(debe '+D.M+')</span></label>'+mmHTML('rcxM','data-rc="M"',x.M,' data-paso="1"')+'</div>'
   +'<div class="field"><label for="rcxE">Efectivo $ <span class="lbl">(debe '+money(D.efe)+')</span></label><input id="rcxE" type="number" inputmode="decimal" data-rc="E" value="'+esc(x.E)+'" style="width:130px"></div></div>'
   +'<div style="margin-top:auto;padding-top:14px"><button class="btn big" data-act="rcsig">Siguiente</button><button class="btn sec" style="margin-top:8px" data-act="rcatras">Atrás</button></div>'}
 if(x.p===2){h='<div class="q">¿Cómo entregó su equipo?</div><div class="card">'+eqHTML('regreso',ch,x)+'</div>'+(x.err?'<div class="neg" role="alert" style="font-weight:700;margin:10px 2px">'+esc(x.err)+'</div>':'')+'<div style="margin-top:auto;padding-top:14px"><button class="btn big" data-act="rceqok">Siguiente</button><button class="btn sec" style="margin-top:8px" data-act="rcatras">Atrás</button></div>'}
 if(x.p===3){var dif=r2(num(x.E)-D.efe);h='<div class="q">'+(Math.abs(dif)<0.5?'Todo cuadra ✓':(dif<0?'Faltan '+money(-dif):'Sobran '+money(dif)))+'</div>';
  if(Math.abs(dif)<0.5)h+='<div class="card good">Recibiste '+money(num(x.E))+'.</div><div style="margin-top:auto;padding-top:14px"><button class="btn big" data-act="rcfin" data-o="ok">Terminar</button></div>';
  else if(dif<0)h+='<div class="card alert">'+nm+' entregó '+money(num(x.E))+' y debía '+money(D.efe)+'.</div><div class="lbl" style="margin:8px 2px">¿Qué hacemos con lo que falta?</div>'
   +'<button class="btn big" data-act="rcfin" data-o="desc">Descontárselo de su pago</button><button class="btn sec big" style="margin-top:8px" data-act="rcfin" data-o="pago">Ya lo pagó ahorita</button><button class="btn sec big" style="margin-top:8px" data-act="rcfin" data-o="nodesc">No descontar (lo absorbe el negocio)</button>';
  else h+='<div class="card note">'+nm+' entregó '+money(num(x.E))+' y debía '+money(D.efe)+'.</div><button class="btn big" data-act="rcfin" data-o="caja">Guardarlo en la caja</button><button class="btn sec big" style="margin-top:8px" data-act="rcfin" data-o="chofer">Es de '+nm+' (se le regresa)</button>'}
 return '<div id="rcov" role="dialog" aria-label="Recibir el cierre"><div class="w"><div style="display:flex;align-items:center;gap:10px"><span class="grow"><b style="font-size:18px">Recibir el cierre de '+nm+'</b><div class="lbl">'+['Lo que debe regresar','Lo que llegó','Su equipo','Efectivo'][x.p]+'</div></span><button class="helpb" style="margin:0" data-act="rcx" aria-label="Cerrar">×</button></div>'+h+'</div></div>'}
document.addEventListener('input',function(e){var t=e.target;if(t&&t.dataset&&t.dataset.rc&&S.rcv)S.rcv[t.dataset.rc]=t.value},true);
function rcRegistra(x,o){var D=rcDebe(),ch=+S.chofHoy;S.cierreRec=String(num(x.E));
 /* fruta: lo mismo que "Confirmar recepción" */
 var clk=function(act,ok){var b=document.createElement('button');b.dataset.act=act;if(ok)b.dataset.ok='1';b.style.display='none';document.body.appendChild(b);try{b.click()}finally{b.remove()}};
 if(!S.cierreReg)clk('regcierre',true);S.modal=null;
 /* fruta al final: si faltan cajas, la app pregunta si fue faltante del chofer o merma */
 var pon=function(id,v){var i=document.getElementById(id);if(i){i.value=String(v);return null}i=document.createElement('input');i.id=id;i.value=String(v);i.style.display='none';document.body.appendChild(i);return i};var tmp=[pon('rcR',num(x.R)),pon('rcM',num(x.M)),pon('rcV',num(x.V))].filter(Boolean);
 try{if(!S.recep)clk('recep')}finally{tmp.forEach(function(i){i.remove()})}
 var g=S.cierreReg,fi=g&&g.f!=null?S.faltantes[g.f]:null,dif=r2(num(x.E)-D.efe);
 if(dif<-0.5&&fi){if(o==='desc'){fi.desc=true}else if(o==='pago'){fi.desc=false;fi.pend=false;fi.pagado=iso(TODAY);(S.aportes=S.aportes||[]).push({t:'Faltante pagado',de:chofN(ch),f:iso(TODAY),m:-dif,n:'Pagó su faltante del cierre',tipo:'faltante'})}else if(o==='nodesc'){fi.desc=false;fi.absorbe=true}fi.txt=(fi.txt?fi.txt+' · ':'')+'Faltante del cierre del '+fCorta(iso(TODAY))}
 if(dif>0.5){if(o==='chofer'){(S.aportes=S.aportes||[]).push({t:'Sobrante regresado',de:chofN(ch),f:iso(TODAY),m:-dif,n:'Se le regresó el sobrante'})}}
 S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Recibió el cierre de '+chofN(ch)+': '+money(num(x.E))+(Math.abs(dif)>=0.5?(dif<0?' (faltante ':' (sobrante ')+money(Math.abs(dif))+': '+({desc:'se descuenta de su pago',pago:'ya lo pagó',nodesc:'no se descuenta',caja:'a la caja',chofer:'se le regresa'}[o]||'')+')':'')})}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,x=S.rcv;
 if(a==='vercierre'&&S.role==='admin'&&S.cierre&&S.cierre.res&&!S.cierreReg&&!(S.recep)){e.stopImmediatePropagation();var D=rcDebe();S.rcv={p:0,R:String(D.R),M:String(D.M),V:String(D.V),E:String(D.dice!=null?D.dice:D.efe),est:{}};render();return}
 if(!x)return;
 if(a==='rcx'){e.stopImmediatePropagation();S.rcv=null;render();return}
 if(a==='rctodo'){e.stopImmediatePropagation();x.p=eqDe(+S.chofHoy).length?2:3;render();window.scrollTo(0,0);return}
 if(a==='rcdif'){e.stopImmediatePropagation();x.p=1;render();return}
 if(a==='rcatras'){e.stopImmediatePropagation();x.p=x.p===2&&x.vioDif?1:0;render();return}
 if(a==='rcsig'){e.stopImmediatePropagation();if(String(x.E).trim()===''){x.err='Escribe el efectivo que recibiste';render();marcaFalta(document.getElementById('rcxE'));return}x.vioDif=true;x.p=eqDe(+S.chofHoy).length?2:3;render();return}
 if(a==='rceqok'){e.stopImmediatePropagation();var F=eqFaltan(+S.chofHoy,x,'regreso');if(F.length){x.err='Falta revisar: '+F.map(function(z){return z.n}).join(', ');render();setTimeout(function(){var el=document.querySelector('#rcov [role="alert"]');if(el)marcaFalta(el)},30);return}x.err='';x.p=3;render();return}
 if(a==='rcfin'){e.stopImmediatePropagation();var o=b.dataset.o,ch=+S.chofHoy;var go=function(){if(eqDe(ch).length)eqGuarda(ch,x,'regreso');rcRegistra(x,o);S.rcv=null;S.tab.admin='cierreadm';toast('Cierre de '+chofN(ch)+' recibido');render();window.scrollTo(0,0)};
  if(o==='ok'){go();return}abrirModal('¿Seguro?',{desc:'Se le descuenta de su próximo pago y lo verá en su sueldo.',pago:'Se registra que lo pagó y entra a la caja.',nodesc:'No se le descuenta; queda como faltante de la caja.',caja:'El sobrante se queda en la caja.',chofer:'Se registra que se le regresó.'}[o]||'',[['Sí','rcfinsi',' data-o="'+o+'"']]);return}
 if(a==='rcfinsi'){e.stopImmediatePropagation();S.modal=null;var o2=b.dataset.o,ch2=+S.chofHoy;if(eqDe(ch2).length)eqGuarda(ch2,x,'regreso');rcRegistra(x,o2);S.rcv=null;S.tab.admin='cierreadm';toast('Cierre de '+chofN(ch2)+' recibido');render();window.scrollTo(0,0);return}},true);
/* en la pantalla del cierre, arriba, el botón grande para recibir con la tarjeta */
var _cAdm50=cierreAdm;cierreAdm=function(){var h=_cAdm50.apply(this,arguments);if(!S.cierre||!S.cierre.res||!S.cierre.sent||(S.cierreReg&&S.recep))return h;
 return '<button class="btn big" data-act="rcabre" style="margin:4px 0 10px">📥 Recibir el cierre de '+esc(chofN(S.chofHoy))+'</button>'+h};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="rcabre"]');if(!b)return;e.stopImmediatePropagation();var D=rcDebe();S.rcv={p:0,R:String(D.R),M:String(D.M),V:String(D.V),E:String(D.dice!=null?D.dice:D.efe),est:{}};render();window.scrollTo(0,0)},true);
function fCorta(d){var p=String(d).split('-');return p.length===3?p[2]+'/'+MES[+p[1]-1].toLowerCase().slice(0,3):d}
/* en su sueldo, cada faltante con su motivo (el chofer ve por qué se le descuenta) */
var _szRes50=szRes;szRes=function(c){var h=_szRes50.apply(this,arguments),L=(S.faltantes||[]).filter(function(f){return f.ch===c.id&&f.desc&&f.pend&&f.m>0.005});if(!L.length)return h;
 return h+'<div class="lbl" style="margin-top:4px">'+L.map(function(f){return '· '+esc(f.txt||('Faltante del '+fCorta(f.fecha)))+': −'+money(f.m)}).join('<br>')+'</div>'};
/* si pasan 3 horas desde que mandó el cierre y no ha entregado su equipo: aviso urgente */
function eqRevisaTarde(){try{if(S.role!=='admin'||!S.cierre||!S.cierre.sent||!S.ciEnvH)return;var ch=+S.chofHoy;if(!eqDe(ch).length||eqRegDe(ch).regreso)return;
 var p=String(S.ciEnvH).split(':'),t=new Date();var min=t.getHours()*60+t.getMinutes()-(+p[0]*60+ +p[1]);if(!(min>=180))return;var k=iso(TODAY)+'|'+ch;S.eqTarde=S.eqTarde||{};if(S.eqTarde[k])return;S.eqTarde[k]=1;
 S.avPrecio.push('URGENTE: '+chofN(ch)+' no ha entregado su equipo (mandó su cierre a las '+S.ciEnvH+')');render()}catch(e){}}
setInterval(eqRevisaTarde,5*60*1000);
/* el historial del bien lo escribe el administrador (los bienes solo los cambia él en la nube) */
function eqAplica(){if(S.role!=='admin'||!S.eqDanos)return;S.eqDanos.forEach(function(d){if(d.ap||d.k.charAt(0)!=='b')return;d.ap=1;var b=(S.bienes||[]).filter(function(z){return 'b'+z.id===d.k})[0];if(!b)return;b.hist=b.hist||[];
 b.hist.push({f:d.f,x:(d.v==='falta'?'No lo entregó ':'Mal estado ')+(d.modo==='salida'?'al recibirlo ':'al entregarlo ')+chofN(d.ch)+(d.nota?': '+d.nota:''),foto:d.foto||undefined});if(d.v==='mal')b.est='Mal estado'})}
var _rd50=render;render=function(){try{eqAplica()}catch(e){}return _rd50.apply(this,arguments)};
