/* ===================== v5 · Cajas que regresan sin bodeguero =====================
   A) Quien recibe el dinero, recibe las cajas: al registrar el efectivo te lleva a contarlas.
   B) Lo que regresa NO entra a bodega hasta que alguien lo cuente ("Cajas sin contar" en Inicio).
   C) El chofer toma una foto obligatoria de lo que regresa en el camión. */
function regPend(){return !!(S.cierre&&S.cierre.sent&&S.cierre.res&&!S.recep&&S.cierre.porContar)}
function regAlgo(r){return Math.max(0,r.reg)>0||Math.max(0,r.regK)>0||r.V>0}
/* chofer: foto en el paso "Cajas" del cierre */
var _cierreF=cierre;cierre=function(){var h=_cierreF.apply(this,arguments),c=S.cierre;if(c.sent)return h;var r=cierreRes();if(!regAlgo(r))return h;
 var ft=c.fotoReg,blk='<div style="border-top:1px solid var(--line);margin-top:8px;padding:10px 0 6px"><b>Foto de lo que regresas</b><div class="lbl">Toma una foto donde se vean las cajas llenas y las vacías que traes en el camión. Es obligatoria para enviar el cierre.</div>'
  +(ft?'<img src="'+ft+'" alt="Foto de lo que regresa" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin-top:8px">':'')
  +'<label for="regF" class="btn '+(ft?'sec ':'')+'sm" id="regFb" style="display:flex;align-items:center;justify-content:center;cursor:pointer;margin-top:8px">'+(ft?'Cambiar foto':'📷 Tomar foto')+'</label><input id="regF" type="file" accept="image/*" capture="environment" data-regf="1" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none"></div>';
 return h.replace(/(Cajas vacías recibidas<\/span><b>-?[\d.]+<\/b><\/div>)(<\/div>)/,'$1'+blk+'$2')};
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.regf||!t.files||!t.files[0])return;var fr=new FileReader();
 fr.onload=function(){var im=new Image();im.onload=function(){var k=Math.min(1,FOTO_PX119/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*k);cv.height=Math.round(im.height*k);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);S.cierre.fotoReg=cv.toDataURL('image/jpeg',FOTO_Q119);toast('Foto guardada')};im.src=fr.result};fr.readAsDataURL(t.files[0]);try{t.value=''}catch(er){}},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='enviar'&&S.role==='rep'&&S.cierre&&!S.cierre.sent&&!S.cierre.fotoReg&&regAlgo(cierreRes())){e.stopImmediatePropagation();S.modal=null;S.cierreP=2;window._faltaSel='#regFb';toast('Falta la foto de lo que regresas en el camión');render();return}
 },true);
/* después de enviar: lo que regresa queda "sin contar" (sale de bodega hasta que alguien lo cuente).
   Se hace al dibujar, porque el botón de enviar pasa por la confirmación y otros pasos. */
var _regRegAnt=null;
var _rCaj13=render;render=function(){
 try{var c=S.cierre;if(c&&c.sent&&c.res&&!c.regMov&&!S.recep&&!S.arOn){var r=c.res;c.regMov=true;c.porContar=true;
   S.inv.maduras-=Math.max(0,r.reg);S.inv.kgMaduro=r2(S.inv.kgMaduro-Math.max(0,r.regK));S.inv.vacias-=r.V}
  var hayReg=!!S.cierreReg;if(hayReg&&_regRegAnt===false&&!S.recep&&c&&c.porContar&&S.role==='admin'){S.toast=(S.toast?S.toast+'. ':'')+'Ahora cuenta las cajas que regresó';setTimeout(function(){var k=document.querySelector('[data-key="recep"]');if(!k)return;var y=k.getBoundingClientRect().top+window.scrollY-70;window.scrollTo({top:Math.max(0,y),behavior:'smooth'});k.classList.remove('flashsc');void k.offsetWidth;k.classList.add('flashsc')},120)}
  _regRegAnt=hayReg}catch(e){}
 return _rCaj13.apply(this,arguments)};
/* admin: la foto del chofer junto al conteo, y el aviso en Inicio */
var _recC13=recepCard;recepCard=function(r){var h=_recC13.apply(this,arguments),ft=S.cierre.fotoReg;if(!ft)return h;
 var img='<details style="margin-top:8px"><summary class="lbl" style="cursor:pointer">Ver la foto que tomó '+esc(chofN(S.chofHoy))+'</summary><img src="'+ft+'" alt="Foto de lo que regresó" style="width:100%;border-radius:12px;margin-top:6px" data-act="fotover"></details>';
 return h.replace(/<\/div>$/,img+'</div>')};
var _cTop13=cierreTop;cierreTop=function(){var h=_cTop13.apply(this,arguments);if(regPend()&&!cierrePend()){var r=S.cierre.res;
 h+='<button class="card alert" data-act="vercierre" style="text-align:left;width:100%;color:inherit;display:flex;gap:12px;align-items:center;border-width:2px"><span class="ic" style="background:var(--danger);color:#fff">'+icon('caja',20)+'</span><span class="grow"><b style="font-size:17px">Cajas sin contar de '+esc(chofN(S.chofHoy))+'</b><br><span class="lbl">Regresó del reparto. Cuéntalas para que entren a bodega.</span></span><span style="font-size:22px">›</span></button>'}return h};

/* ===================== v5 · Mayoreo con control =====================
   - En el cierre, junto a cada cliente al que se le dio mayoreo: "No darle mayoreo" o "Hacerlo cliente de mayoreo".
   - Si un chofer junta 2 mayoreos que no aprobaste en 30 días, la app te sugiere "Mayoreo solo con mi permiso".
   - Con el permiso activado, el chofer lo pide desde la entrega. Si no contestas en 5 minutos, se vende a precio normal.
   - Los clientes que tú pusiste como de mayoreo nunca necesitan permiso. */
var MAY_ESPERA=5*60000;
function mayPideL(){return S.mayPide||(S.mayPide=[])}
function mayRechL(){return S.mayRech||(S.mayRech=[])}
function chofById(id){return S.choferes.filter(function(x){return x.id===+id})[0]}
function mayRech30(ch){var lim=iso(new Date(TODAY.getTime()-30*864e5));return mayRechL().filter(function(x){return x.ch===+ch&&x.f>=lim}).length}
function mayNecesitaPerm(c,d){var ch=chofById(S.chofHoy);return !!(ch&&ch.mayPerm&&c&&!c.mayoreo&&d&&(d.may||(d.mayQ==='may'&&d.R>10)))}
function mayPideDe(cid){var L=mayPideL().filter(function(x){return x.c===cid&&x.ch===+S.chofHoy&&x.f===iso(TODAY)});return L[L.length-1]||null}
/* los que llevan más de 5 minutos sin respuesta → precio normal */
function mayVencer(){var ch=false;mayPideL().forEach(function(p){if(p.est==='pend'&&Date.now()-p.t>MAY_ESPERA){p.est='tiempo';ch=true;S.rutaAv[p.ch]=(S.rutaAv[p.ch]||[]).concat(['El administrador no contestó a tiempo: a '+cl(p.c).n+' se le vende a precio normal.']);
  S.avPrecio=S.avPrecio.filter(function(x){return x.indexOf('permiso de mayoreo para '+cl(p.c).n)<0});
  if(S.d&&curCli()&&curCli().id===p.c){S.d.may=false;S.d.mayQ='norm'}}});return ch}
setInterval(function(){try{if(mayVencer())render()}catch(e){}},15000);
/* el cliente con "nunca mayoreo" no lo lleva ni automático */
var _mayAuto13=mayAutoOk;mayAutoOk=function(c,d){if(c&&c.mayNo){if(d)d.mayQ='norm';return false}return _mayAuto13.apply(this,arguments)};
var _entV13=entValida;entValida=function(){var k=entregaCalc(),d=S.d;if(k.c&&d){var c=k.c;
  if(d.may&&c.mayNo)return ['CH:[data-act="may"][data-v="0"]','A '+c.n+' no se le da mayoreo (lo decidió el administrador)'];
  if(mayNecesitaPerm(c,d)){mayVencer();var p=mayPideDe(c.id);if(!p||p.est!=='ok'){S.dOpen.entmas=true;return ['CH:[data-act="maypide"]',p&&p.est==='pend'?'Espera el permiso del administrador o cambia a precio normal':'Pide permiso para el mayoreo o cambia a precio normal']}}}
 return _entV13.apply(this,arguments)};
/* tarjeta de precio del chofer: botón para pedir permiso y su estado */
function mayNotaHTML(){var c=curCli(),d=S.d;if(!c||!d)return '';
 if(c.mayNo)return '<div class="lbl" style="margin-top:6px">A este cliente no se le da mayoreo.</div>';
 var p=mayPideDe(c.id),x,ch=chofById(S.chofHoy);if(!mayNecesitaPerm(c,d)&&!(p&&ch&&ch.mayPerm&&(p.est==='no'||p.est==='tiempo')))return '';
 if(!p)x='<b>Necesitas permiso del administrador para el mayoreo</b><div class="lbl">Escribe el precio y pide permiso. Si no contesta en 5 minutos, se vende a precio normal.</div><button class="btn sm" style="margin-top:8px" data-act="maypide">Pedir permiso</button>';
 else if(p.est==='pend')x='<b>Esperando permiso del administrador</b><div class="mayreloj" data-mayt="'+p.t+'">'+mayRelojTxt(p.t)+'</div><div class="lbl">Si no contesta antes de que llegue a 0:00, se vende a precio normal.</div>';
 else if(p.est==='ok')x='<b class="pos">✓ El administrador dio permiso</b>';
 else x='<div class="neg" style="font-weight:700">'+(p.est==='no'?'El administrador dijo que no.':'No contestó a tiempo.')+' Véndele a precio normal.</div>';
 return '<div class="card note" data-key="maynota" style="margin:8px 0 0;padding:10px 12px">'+x+'</div>'}
var _prC13=precioCard;precioCard=function(){var h=_prC13.apply(this,arguments),x=mayNotaHTML();return x?h.replace(/<\/div>$/,x+'</div>'):h};
var _ent13=entrega;entrega=function(){var h=_ent13.apply(this,arguments),x=mayNotaHTML();if(!x)return h;
 if(/Mínimo permitido:[^<]*<\/div>/.test(h))return h.replace(/(Mínimo permitido:[^<]*<\/div>)/,'$1'+x);return h.replace(/(Mayoreo a mano<\/button><\/div>)/,'$1'+x)};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,D=b.dataset;
 if(a==='may'&&D.v==='1'&&S.role==='rep'){var c=curCli();S.dOpen.entmas=true;if(c&&c.mayNo){e.stopImmediatePropagation();toast('A '+c.n+' no se le da mayoreo (lo decidió el administrador)');return}}
 if(a==='maypide'){e.stopImmediatePropagation();var c2=curCli(),d=S.d;if(!c2)return;
  if(d.may&&((d.R>0&&num(d.pRm)<=0)||(d.M>0&&num(d.pMm)<=0))){window._faltaSel=d.R>0&&num(d.pRm)<=0?'#pRm':'#pMm';toast('Primero escribe el precio de mayoreo');render();return}
  mayPideL().push({c:c2.id,ch:+S.chofHoy,f:iso(TODAY),t:Date.now(),est:'pend',R:d.R,M:d.M,pR:d.may?num(d.pRm):num((S.mayP||{}).R),pM:d.may?num(d.pMm):num((S.mayP||{}).M)});
  S.avPrecio.push('URGENTE: '+chofN(S.chofHoy)+' pide permiso de mayoreo para '+c2.n);toast('Se le pidió permiso al administrador');render();return}
 if(a==='mayok'||a==='mayneg'){e.stopImmediatePropagation();var p=mayPideL()[+D.i];if(!p||p.est!=='pend'){render();return}var cn=cl(p.c).n;p.est=a==='mayok'?'ok':'no';
  S.avPrecio=S.avPrecio.filter(function(x){return x.indexOf('permiso de mayoreo para '+cn)<0});
  S.rutaAv[p.ch]=(S.rutaAv[p.ch]||[]).concat([(a==='mayok'?'Sí puedes darle mayoreo hoy a ':'No le des mayoreo a ')+cn+'.']);
  if(a==='mayneg'&&S.d&&S.role!=='admin'&&curCli()&&curCli().id===p.c){S.d.may=false;S.d.mayQ='norm'}
  toast(a==='mayok'?'Permiso dado':'Le dijiste que no');render();return}
 /* desde el cierre o la ficha del cliente */
 if(a==='mayno'){e.stopImmediatePropagation();var c3=cl(+D.id);c3.mayNo=true;c3.mayoreo=false;
  if(D.t==='chofer'||D.t==='el'){mayRechL().push({ch:+D.ch||+S.chofHoy,c:c3.id,f:iso(TODAY)})}
  S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'A '+c3.n+' ya no se le da mayoreo'});toast('A '+c3.n+' ya no se le da mayoreo');render();return}
 if(a==='mayfijo'){e.stopImmediatePropagation();var c4=cl(+D.id);c4.mayoreo=true;c4.mayNo=false;toast(c4.n+' ya es cliente de mayoreo');render();return}
 if(a==='maysi'){e.stopImmediatePropagation();var c5=cl(+D.id);c5.mayNo=false;toast('A '+c5.n+' se le puede volver a dar mayoreo');render();return}
 if(a==='mayperm'){e.stopImmediatePropagation();var ch=chofById(D.id);if(!ch)return;ch.mayPerm=D.v==='1';toast(ch.mayPerm?ch.n+': mayoreo solo con tu permiso':ch.n+' ya puede dar mayoreo sin pedirte permiso');render();return}
},true);
/* admin: tarjeta de permisos en Inicio */
var _perms13=permsHTML;permsHTML=function(){var h=_perms13.apply(this,arguments);if(S.role!=='admin')return h;mayVencer();var L=[];mayPideL().forEach(function(p,i){if(p.est==='pend')L.push([p,i])});if(!L.length)return h;
 return h+'<div class="card alert" style="padding:10px 12px;border-width:2px"><b class="neg">Piden permiso para mayoreo</b>'+L.map(function(x){var p=x[0],c=cl(p.c),seg=Math.max(0,Math.ceil((MAY_ESPERA-(Date.now()-p.t))/1000)),pn=num(c.ppR)||num(S.precio.R),pm=num(c.ppM)||num(S.precio.M);
  return '<div style="border-top:1px solid var(--line);padding:8px 0"><b>'+esc(chofN(p.ch))+'</b> quiere darle mayoreo a <b>'+esc(c.n)+'</b><div class="lbl">'+(p.R?p.R+' cajas a '+money(p.pR)+' (normal '+money(pn)+')':'')+(p.R&&p.M?' · ':'')+(p.M?p.M+' kg a '+f2(p.pM)+' (normal '+f2(pm)+')':'')+' · si no contestas en '+Math.ceil(seg/60)+' min se vende normal</div><div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm" style="flex:1" data-act="mayok" data-i="'+x[1]+'">Sí, hoy sí</button><button class="btn sm sec" style="flex:1" data-act="mayneg" data-i="'+x[1]+'">No</button></div></div>'}).join('')+'</div>'};
/* cierre: botones por cliente y sugerencia de "solo con permiso" */
mayRepHTML=function(){var L=S.log.filter(function(l){return l.mayT});if(!L.length)return '';var G=[['chofer','Lo dio el chofer a mano'],['fijo','Cliente con mayoreo fijo (lo pusiste tú)'],['auto','Automático por más de 10 cajas']],tot=0,ch=chofById(S.chofHoy);
 var h='<div class="card" data-key="mayrep"><b>Precios de mayoreo del día</b>';G.forEach(function(g){var X=L.filter(function(l){return l.mayT===g[0]});if(!X.length)return;var st=sum(X,function(l){return (num(l.pnR)-num(l.pr))*l.R+(num(l.pnM)-num(l.pm))*l.M});tot+=st;
  h+='<div class="lbl" style="margin-top:10px'+(g[0]==='chofer'?';color:var(--danger)':'')+'"><b>'+g[1]+'</b> · −'+money(st)+'</div>'+X.map(function(l){var c=cl(l.c),dif=(num(l.pnR)-num(l.pr))*l.R+(num(l.pnM)-num(l.pm))*l.M,bajo=(l.R&&num(l.pr)<costoCajaAct())||(l.M&&num(l.pm)<costoKgMAct());
   var bt='';if(c&&g[0]!=='fijo'&&S.role==='admin'){bt=c.mayNo?'<div class="lbl" style="margin-top:4px">Ya no se le da mayoreo · <button class="link" data-act="maysi" data-id="'+c.id+'">Deshacer</button></div>':(c.mayoreo?'<div class="lbl" style="margin-top:4px">Ya es cliente de mayoreo</div>':'<div style="display:flex;gap:6px;margin-top:6px"><button class="btn sm sec" style="flex:1" data-act="mayno" data-id="'+c.id+'" data-t="'+(l.mayEl?'el':g[0])+'" data-ch="'+S.chofHoy+'">No darle mayoreo</button><button class="btn sm sec" style="flex:1" data-act="mayfijo" data-id="'+c.id+'">Hacerlo cliente de mayoreo</button></div>')}
   return '<div style="border-top:1px solid var(--line);padding:6px 0"><div class="row" style="border:0;padding:0"><span>'+esc(c?c.n:'')+'<br><span class="lbl">'+(l.R?l.R+' cajas a '+money(l.pr)+' (normal '+money(l.pnR)+')':'')+(l.R&&l.M?' · ':'')+(l.M?l.M+' kg a '+f2(l.pm)+' (normal '+f2(l.pnM)+')':'')+(l.mayEl?' · lo escogió el chofer':'')+'</span></span><b class="'+(bajo?'neg':'')+'" style="white-space:nowrap;text-align:right">−'+money(dif)+(bajo?'<br><span style="font-size:12px">abajo del costo</span>':'')+'</b></div>'+bt+'</div>'}).join('')});
 h+='<div class="row" style="min-height:48px"><b>Total que se dejó de cobrar</b><b class="neg">−'+money(tot)+'</b></div>';
 if(ch&&S.role==='admin'){var n=mayRech30(ch.id);if(ch.mayPerm)h+='<div class="lbl" style="margin-top:4px">'+esc(ch.n)+' solo puede dar mayoreo con tu permiso · <button class="link" data-act="mayperm" data-id="'+ch.id+'" data-v="0">Quitar</button></div>';
  else if(n>=2)h+='<div class="card alert" style="margin:8px 0 0;padding:10px 12px"><b>'+esc(ch.n)+' lleva '+n+' mayoreos que no aprobaste en 30 días</b><div class="lbl">¿Quieres que desde ahora te pida permiso? Los clientes de mayoreo que tú pusiste no lo necesitan.</div><button class="btn sm" style="margin-top:8px" data-act="mayperm" data-id="'+ch.id+'" data-v="1">Mayoreo solo con mi permiso</button></div>'}
 return h+'</div>'};
/* ficha del cliente: "nunca darle mayoreo" */
var _mayH13=mayHistHTML;mayHistHTML=function(c){var h=_mayH13.apply(this,arguments);if(S.role!=='admin'||!c)return h;
 return h+(c.mayNo?'<div class="lbl" style="margin:6px 0">No se le da mayoreo · <button class="link" data-act="maysi" data-id="'+c.id+'">Permitir otra vez</button></div>':'')};
/* tarjeta del chofer en Personal: el interruptor */
var _suel13=sueldos;sueldos=function(){var h=_suel13.apply(this,arguments);
 return h.replace(/<div class="field" style="margin-top:6px"><label for="adl_(\d+)"/g,function(m,id){var ch=chofById(id);if(!ch)return m;var n=mayRech30(ch.id);
  return '<div class="row" style="margin-top:6px"><span>Mayoreo<br><span class="lbl">'+(ch.mayPerm?'Solo con tu permiso':'Lo puede dar sin pedirte permiso')+(n?' · '+n+' no aprobado'+(n>1?'s':'')+' en 30 días':'')+'</span></span><button class="btn sm sec" style="width:auto" data-act="mayperm" data-id="'+ch.id+'" data-v="'+(ch.mayPerm?'0':'1')+'">'+(ch.mayPerm?'Quitar permiso':'Pedir permiso')+'</button></div>'+m})};
/* cronómetro de 5 minutos que corre solo (sin volver a dibujar la pantalla) */
(function(){var st=document.createElement('style');st.textContent='.mayreloj{font-size:30px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:1px;margin:4px 0}.mayreloj.poco{color:var(--danger)}';document.head.appendChild(st)})();
function mayRelojTxt(t){var s=Math.max(0,Math.ceil((MAY_ESPERA-(Date.now()-t))/1000));return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
setInterval(function(){var L=document.querySelectorAll('[data-mayt]');if(!L.length)return;var fin=false;Array.prototype.forEach.call(L,function(el){var t=+el.getAttribute('data-mayt'),tx=mayRelojTxt(t);if(el.textContent!==tx)el.textContent=tx;el.classList.toggle('poco',Date.now()-t>MAY_ESPERA-60000);if(Date.now()-t>MAY_ESPERA)fin=true});if(fin){mayVencer();render()}},1000);
var _perms13b=permsHTML;permsHTML=function(){return _perms13b.apply(this,arguments).replace(/ · si no contestas en \d+ min se vende normal<\/div>(<div style="display:flex;gap:8px;margin-top:6px"><button class="btn sm" style="flex:1" data-act="mayok" data-i="(\d+)")/g,function(m,rest,i){var p=mayPideL()[+i];return '</div><div class="lbl" style="margin-top:4px">Se vende a precio normal en <b data-mayt="'+p.t+'" style="font-variant-numeric:tabular-nums">'+mayRelojTxt(p.t)+'</b></div>'+rest})};

/* ===================== v5 · Sin conexión: aviso corto =====================
   Antes salía una tarjeta con mucho texto. Ahora solo una barrita: "Sin conexión · tus datos se guardan". */
(function(){var st=document.createElement('style');st.textContent='.sinconx{display:flex;align-items:center;gap:8px;padding:8px 12px;margin:0 0 10px;border-radius:12px;background:var(--danger);color:#fff;font-weight:700;font-size:14px}.sinconx span{font-weight:500;opacity:.9}';document.head.appendChild(st)})();
senalBanner=function(){if(S.role!=='rep')return '';var c=conn(+S.chofHoy);if(c.on)return '';return '<div class="sinconx" role="status">📶 Sin conexión <span>· tus datos se guardan</span></div>'};
var _toast13=toast;toast=function(t){if(typeof t==='string'){if(/^Sin señal: lo que captures/.test(t)){render();return}else if(/^Volvió la señal/.test(t))t='Volvió la conexión · ya se mandó todo'}return _toast13.call(this,t)};
/* si falta la foto, primero se avisa (antes del "¿Enviar?") */
var _confM13=confMsg;confMsg=function(D){if(D&&D.act==='enviar'&&S.role==='rep'&&S.cierre&&!S.cierre.sent&&!S.cierre.fotoReg&&regAlgo(cierreRes()))return null;return _confM13.apply(this,arguments)};
/* las cajas "sin contar" siguen existiendo: cuentan como en el camión hasta que alguien las cuente */
var _cdD13=cajasDonde;cajasDonde=function(){var w=_cdD13.apply(this,arguments);if(regPend()){var r=S.cierre.res,ll=Math.max(0,num(r.reg)),vv=Math.max(0,num(r.V));/* 121 · sin el dato ya no da NaN ("Total NaN") */w.cam+=ll;w.camV=(w.camV||0)+vv;w.tot+=ll+vv;w.sinC=ll+vv}return w};
/* "Seguir trabajando" con cajas sin contar:
   - si reabre su cierre (todavía no le recibían el dinero): se deshace el "sin contar" y todo vuelve como estaba.
   - si empieza un segundo cierre: lo que no se contó sigue en el camión y sale otra vez en el nuevo cierre. */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="seguir"]');if(!b||!regPend())return;var c=S.cierre,r=c.res;
 if(!S.cierreReg){S.inv.maduras+=Math.max(0,r.reg);S.inv.kgMaduro=r2(S.inv.kgMaduro+Math.max(0,r.regK));S.inv.vacias+=r.V;c.porContar=false;c.regMov=false;c.fotoReg=null;return}
 var cR=Math.max(0,r.reg),cM=Math.max(0,r.regK),cV=r.V,quien=chofN(S.chofHoy);
 setTimeout(function(){if(S.cierre===c)return;S.inv.reparto+=cR;S.inv.repartoKg=r2(S.inv.repartoKg+cM);S.cierre.salioR+=cR;S.cierre.salioM=r2(S.cierre.salioM+cM);S.inv.vacias+=cV;
  if(cR||cM||cV)S.avPrecio.push('No se contaron las cajas del cierre anterior de '+quien+': '+cR+' cajas y '+cM+' kg siguen en su camión'+(cV?'; '+cV+' vacías pasaron a bodega sin contar':''));render()},0)},true);
/* en un segundo cierre, la recepción empieza de cero (antes se quedaba la del primer cierre y lo nuevo nunca se contaba) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="seguir"]');if(!b||!S.cierreReg)return;var c=S.cierre;
 setTimeout(function(){if(S.cierre!==c){if(S.recep)(S.recepPrev=S.recepPrev||[]).push(S.recep);S.recep=null;S._recC=null;render()}},0)},true);

/* ===================== v5 · Tutorial: no te saca de la pantalla que explica =====================
   Antes, si tocabas una sección (o deslizabas) mientras salía el tutorial, se cambiaba de pantalla y
   los siguientes pasos salían encima de otra. Ahora mientras dura el tutorial solo funcionan sus botones. */
function tutTab(){return S.tut?(S.tut.k==='rep'?'ruta':'inicio'):null}
document.addEventListener('click',function(e){if(!S.tut||!document.getElementById('tutov')||(_pin&&_pin.modo))return;var b=e.target.closest&&e.target.closest('[data-act]');var a=b&&b.dataset.act;
 if(a&&/^tut/.test(a))return;if(e.target.closest&&e.target.closest('.bub'))return;
 e.stopImmediatePropagation();e.preventDefault();var bub=document.querySelector('#tutov .bub');if(bub){bub.classList.remove('tutno');void bub.offsetWidth;bub.classList.add('tutno')}},true);
(function(){var st=document.createElement('style');st.textContent='@keyframes tutNo{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}#tutov .bub.tutno{animation:tutNo .3s ease}';document.head.appendChild(st)})();
var _rTut13=render;render=function(){if(S.tut&&S.role&&S.tab&&S.tab[S.role]!==tutTab()){S.tab[S.role]=tutTab()}return _rTut13.apply(this,arguments)};
