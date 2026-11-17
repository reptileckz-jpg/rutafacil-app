/* ===================== v5 · Configuración inicial completa =====================
   El asistente pide más datos (negocio, papeles del vehículo, licencia, sueldo y PIN, horario de clientes…).
   Todo se puede dejar vacío: lo que falte te lo recuerda la burbuja de "Datos que faltan". */
function suX(path,l,v,t,ph){return '<div class="field"><label>'+l+'</label><input type="'+(t||'text')+'" data-bind="'+path+'" value="'+esc(v==null?'':v)+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+(t==='number'?' inputmode="decimal" min="0" step="any"':'')+(t==='tel'?' inputmode="tel"':'')+(t==='pin'?'':'')+(t==='text'||!t?' style="width:180px;text-align:left"':'')+'></div>'}
function suPin(path,l,v){return '<div class="field"><label>'+l+'</label><input type="tel" inputmode="numeric" maxlength="4" pattern="[0-9]*" data-bind="'+path+'" value="'+esc(v||'')+'" placeholder="4 números" style="width:120px;letter-spacing:6px;text-align:center"></div>'}
var SU_NOTA='<div class="lbl" style="margin-top:6px">Si no lo tienes a la mano, déjalo vacío: te lo recuerdo después.</div>';
var _suH16=setupHTML;setupHTML=function(){var h=_suH16.apply(this,arguments);if(!h||h.indexOf('id="setov"')<0)return h;var U=S.setup,p=U.p;
 if(p===0){var k='a:'+S.adminYo;U.pinA=U.pinA==null?(S.pins[k]||''):U.pinA;
  var x='<div class="card"><b>Datos del negocio</b>'+suX('cfg.tel','Teléfono',S.cfg.tel,'tel')+suX('cfg.dir','Dirección',S.cfg.dir)+suX('cfg.rfc','RFC (si facturas)',S.cfg.rfc)+suX('cfg.correo','Correo',S.cfg.correo,'email')+'</div><div class="card"><b>Tu PIN para entrar</b><div class="lbl">Así nadie más entra como administrador. No uses 1234.</div>'+suPin('setup.pinA','PIN',U.pinA)+'</div>';
  var i=h.indexOf('<div class="card">');var j=i>-1?h.indexOf('</div>',h.indexOf('setup.yo',i)):-1;if(j>-1){j+=6;h=h.slice(0,j)+x+h.slice(j)}}
 if(p===2){var f=U.vf||{};h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="veh">','<div class="lbl" style="margin-top:12px"><b>Seguro y papeles</b></div>'+suX('setup.vf.aseg','Aseguradora',f.aseg)+suX('setup.vf.segVence','El seguro vence',f.segVence,'date')+suX('setup.vf.tcVence','Tarjeta de circulación vence',f.tcVence,'date')+suX('setup.vf.verVence','Próxima verificación',f.verVence,'date')
  +'<div class="lbl" style="margin-top:12px"><b>Para sus cuentas</b></div>'+suX('setup.vf.capL','Tanque (litros)',f.capL,'number')+suX('setup.vf.acLast','Km del último cambio de aceite',f.acLast,'number')+SU_NOTA+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="veh">')}
 if(p===3){var e=U.ef||{},ch=(e.puesto||'chofer')==='chofer';h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="per">',(ch?suX('setup.ef.licV','Su licencia vence',e.licV,'date'):'')+suX('setup.ef.sueldo','Sueldo por semana $',e.sueldo,'number')+suPin('setup.ef.pin','Su PIN (4 números)',e.pin)+SU_NOTA+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="per">')}
 if(p===4){var c=U.cf||{};h=h.replace(/(data-bind="setup\.cf\.n"[^>]*><\/div>)/,'$1'+suX('setup.cf.ap','Apodo o cómo le dicen',c.ap,'text','ej. la de la esquina verde'));h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="cli">',suX('setup.cf.hAb','Abre a las',c.hAb,'time')+suX('setup.cf.hCi','Cierra a las',c.hCi,'time')+suX('setup.cf.recibe','¿Quién recibe?',c.recibe,'text','ej. Don Beto')+suX('setup.cf.lim','Límite de crédito $',c.lim,'number')+SU_NOTA+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="cli">')}
 if(p===5){var pf=U.pf||{};h=h.replace('<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="prov">',suX('setup.pf.dir','Dirección o lugar',pf.dir)+'<button class="btn sec" style="margin-top:8px" data-act="suadd" data-k="prov">')}
 return h};
/* el PIN solo números */
document.addEventListener('input',function(e){var t=e.target;if(t&&t.maxLength===4&&t.dataset&&/pin/i.test(t.dataset.bind||'')){var v=t.value.replace(/\D/g,'').slice(0,4);if(v!==t.value)t.value=v;var ps=t.dataset.bind.split('.'),o=S;for(var i=0;i<ps.length-1;i++){o=o[ps[i]];if(!o)return}o[ps[ps.length-1]]=v}},false);
var _suAp16=suAplicar;suAplicar=function(){var U=S.setup,nC0=S.choferes.length,nCl0=S.cli.length;var r=_suAp16.apply(this,arguments);
 try{U.veh.forEach(function(v,i){var o=S.veh[i];if(!o)return;['aseg','segVence','tcVence','verVence'].forEach(function(k){if(v[k])o[k]=v[k]});if(num(v.capL)>0)o.capL=num(v.capL);if(num(v.acLast)>0)o.acLast=num(v.acLast)});
  var emps=S.choferes.slice(nC0);U.per.forEach(function(x,i){var c=emps[i];if(!c)return;if(x.licV)c.licV=x.licV;if(num(x.sueldo)>0)c.sz.monto=String(num(x.sueldo));if(/^\d{4}$/.test(String(x.pin||''))&&x.pin!=='1234')S.pins['c:'+c.id]=String(x.pin)});
  var cls=S.cli.slice(nCl0);U.cli.forEach(function(x,i){var c=cls[i];if(!c)return;['ap','hAb','hCi','recibe'].forEach(function(k){if(x[k])c[k]=x[k]});if(num(x.lim)>0){c.lim=num(x.lim);c.limMan=num(x.lim)}});
  U.prov.forEach(function(x){if(x.dir)provD(x.n).dir=x.dir});
  if(/^\d{4}$/.test(String(U.pinA||''))&&U.pinA!=='1234')S.pins['a:'+S.adminYo]=String(U.pinA)}catch(e){console.error(e)}
 return r};

/* ===================== v5 · Datos que faltan =====================
   Una burbuja (como la del viaje) que muestra UNO a la vez: el más importante. Al tocarla se abre
   "Datos que faltan", agrupados por prioridad; cada uno te lleva a donde se llena. No se quita hasta
   que no falte nada (se puede minimizar). */
var DF_GR=[[1,'Seguridad y dinero'],[2,'Papeles y vencimientos'],[3,'Para trabajar'],[4,'Contacto y extras']];
function dfVacio(v){return v==null||String(v).trim()===''||v===0}
function dfLista(){var L=[],add=function(pr,txt,go){L.push({pr:pr,txt:txt,go:go})};
 try{
  if(!S.pins['a:'+S.adminYo])add(1,'Tu PIN propio (todavía es 1234)',{t:'aj'});
  S.choferes.forEach(function(c){if(c.baja||c.arch||(typeof esAdm==='function'&&esAdm(c)))return;var ch=(c.puesto||'chofer')==='chofer',g={t:'emp',id:c.id};
   if(ch&&!S.pins['c:'+c.id])add(1,'PIN propio de '+c.n,{t:'emppin',id:c.id});
   var z=c.sz||{};if(z.tipo!=='ninguno'&&dfVacio(z.monto)&&dfVacio(z.porDia)&&dfVacio(z.base))add(1,'Sueldo de '+c.n,{t:'empsue',id:c.id});
   if(ch&&dfVacio(c.licV))add(2,'Cuándo vence la licencia de '+c.n,Object.assign({k:'licV'},g));
   if(ch&&!c.lic)add(2,'Foto de la licencia de '+c.n,Object.assign({k:'lic'},g));
   if(dfVacio(c.tel))add(3,'Teléfono de '+c.n,Object.assign({k:'tel'},g));
   if(dfVacio(c.dir))add(4,'Dirección de '+c.n,Object.assign({k:'dir'},g));
   if(!c.ine)add(4,'INE de '+c.n,Object.assign({k:'ine'},g));
   if(!c.foto)add(4,'Foto de '+c.n,Object.assign({k:'foto'},g));
   if(dfVacio(c.r1n)&&dfVacio(c.r2n))add(4,'Referencias de '+c.n,Object.assign({k:'r1n'},g));
   if(dfVacio(c.emn))add(4,'A quién avisar si '+c.n+' tiene un accidente',Object.assign({k:'emn'},g))});
  S.veh.forEach(function(v){if(v.baja)return;var g={t:'veh',id:v.id};
   if(dfVacio(v.pl))add(2,'Placas de '+v.n,Object.assign({p:0},g));
   if(dfVacio(v.segVence)&&dfVacio(v.pol))add(2,'Seguro de '+v.n,Object.assign({p:2},g));
   if(dfVacio(v.tcVence))add(2,'Tarjeta de circulación de '+v.n,Object.assign({p:2},g));
   if(dfVacio(v.verVence)&&!(typeof verifDe==='function'&&verifDe(v)))add(2,'Verificación de '+v.n,Object.assign({p:2},g));
   if(dfVacio(v.capL))add(3,'Litros del tanque de '+v.n,Object.assign({p:1},g));
   if(dfVacio(v.odo))add(3,'Kilometraje de '+v.n,Object.assign({p:0},g));
   if(dfVacio(v.acLast))add(3,'Último cambio de aceite de '+v.n,Object.assign({p:3},g));
   /* 100 · ya no se inventan (antes venían de la camioneta de la demo) */
   if(MODO==='vacio'&&!v.esAuto&&dfVacio(v.rend0)&&!(v.hist&&v.hist.length))add(3,'Rendimiento de '+v.n+' (km por litro)',Object.assign({p:1},g));
   var an=v.anual||{};if(MODO==='vacio'&&!(num(an.seguro)||num(an.tenencia)||num(an.verif)||num(an.placas)))add(3,'Lo que pagas al año por '+v.n+' (seguro, tenencia, verificación y placas)',Object.assign({p:2},g))});
  /* 100 · el costo de la caja y del kilo mientras no hay ninguna carga */
  if(MODO==='vacio'&&((!hayCostoCarga96('R')&&!num(S.cfg.costoIniR))||(!hayCostoCarga96('M')&&!num(S.cfg.costoIniM))))add(1,'Cuánto te cuesta la caja de roatán y el kilo de macho (mientras registras tu primera carga)',{t:'costo96'});
  S.cli.forEach(function(c){if(c.oculto||c.arch||c.rapida)return;var g={t:'cli',id:c.id};
   if(dfVacio(c.a))add(3,'Dirección de '+c.n,g);
   if(dfVacio(c.tel))add(3,'Teléfono de '+c.n,g);
   if(!(c.dias&&c.dias.length)&&!c.sinRuta)add(3,'Días de visita de '+c.n,{t:'clidias',id:c.id});
   if(dfVacio(c.hAb)||dfVacio(c.hCi))add(3,'Horario de '+c.n,g);else if(horMal117(c))add(3,'Horario de '+c.n+': dice que cierra a las '+horaTxt117(c.hCi)+', revísalo',g);
   if(dfVacio(c.recibe))add(4,'Quién recibe en '+c.n,g)});
  if(dfVacio(S.cfg.tel))add(3,'Teléfono del negocio',{t:'aj'});
  if(dfVacio(S.cfg.dir))add(3,'Dirección del negocio',{t:'aj'});
  if(dfVacio(S.cfg.rfc))add(4,'RFC del negocio',{t:'aj'});
  (typeof provNames==='function'?provNames():[]).forEach(function(n){var d=provD(n);if(dfVacio(d.tel))add(4,'Teléfono de '+n+' (proveedor)',{t:'prov',n:n});if(dfVacio(d.dir))add(4,'Dirección de '+n+' (proveedor)',{t:'prov',n:n})});
 }catch(e){console.error('dfLista',e)}
 L.sort(function(a,b){return a.pr-b.pr});return L}
function dfOn(){return S.role==='admin'&&!S.encOn&&!(S.setup&&!S.setup.fin)&&(!window.__pnTest||S.dfTest)}
(function(){var st=document.createElement('style');st.textContent=[
 '.dfbub{display:flex;align-items:center;gap:10px;background:#3A2A08;color:#fff;border-radius:26px;padding:12px 14px;box-shadow:0 10px 24px rgba(0,0,0,.22);cursor:pointer;margin-bottom:12px}',
 '.dfbub .dfi{width:38px;height:38px;border-radius:50%;background:var(--banana,#F2C230);color:#3A2A08;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;flex:none}',
 '.dfbub .dfbar{height:4px;border-radius:2px;background:rgba(255,255,255,.25);margin-top:6px;overflow:hidden}.dfbub .dfbar i{display:block;height:100%;background:#F2C230;border-radius:2px}',
 '#dfov{position:fixed;inset:0;z-index:34;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}#dfov .fiw{max-width:560px;margin:0 auto;padding:0 16px 48px}',
 '#dfov .fihd{position:sticky;top:0;z-index:3;background:var(--bg);padding:10px 0 8px;display:flex;align-items:center;gap:10px}#dfov .fiback{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);font-size:22px;color:var(--fg);flex:none}',
 '#dfov .dfit{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:none;border:0;border-top:1px solid var(--line);padding:12px 0;color:inherit;font-size:15px;cursor:pointer}#dfov .dfit:first-of-type{border-top:0}'
].join('\n');document.head.appendChild(st)})();
function dfBurbuja(){if(!dfOn())return '';var L=dfLista();if(!L.length)return '';var x=L[0],tot=S.dfTot=Math.max(S.dfTot||0,L.length),pc=Math.round((1-L.length/tot)*100);
 if(S.dfMin)return '<div style="display:flex;justify-content:flex-end;margin-bottom:8px"><button class="popin" data-act="dfmax" style="display:flex;align-items:center;gap:6px;background:#3A2A08;color:#fff;border:0;border-radius:999px;padding:10px 16px;font-weight:800;box-shadow:0 6px 16px rgba(0,0,0,.25)"><span class="dfi" style="width:22px;height:22px;border-radius:50%;background:#F2C230;color:#3A2A08;display:inline-flex;align-items:center;justify-content:center;font-size:14px">!</span> Faltan '+L.length+'</button></div>';
 return '<div class="dfbub slideup" data-act="dfopen" role="button" tabindex="0" data-key="dfbub"><span class="dfi">!</span><span class="grow"><span style="font-size:12px;opacity:.85">Datos que faltan · '+L.length+' por llenar</span><br><b style="font-size:16px">'+esc(x.txt)+'</b><div class="dfbar"><i style="width:'+pc+'%"></i></div></span><span style="font-size:20px">›</span><button class="link" style="color:#fff;min-height:30px;font-size:20px" data-act="dfmin" aria-label="Minimizar">–</button></div>'}
var _vwB16=vwBurbuja;vwBurbuja=function(){return dfBurbuja()+_vwB16.apply(this,arguments)};
function dfHTML(){if(!S.dfOpen||!dfOn())return '';var L=dfLista(),h='<div id="dfov" role="dialog" aria-label="Datos que faltan"><div class="fiw"><div class="fihd"><button class="fiback" data-act="dfx" aria-label="Regresar">←</button><span class="grow"><b style="font-size:19px">Datos que faltan</b><br><span class="lbl">'+(L.length?L.length+' por llenar · empieza por lo de arriba':'¡No falta nada!')+'</span></span></div>';
 if(!L.length)h+='<div class="card good"><b>Todo está completo</b><div class="lbl">Ya no te voy a recordar nada.</div></div>';
 DF_GR.forEach(function(g){var X=[];L.forEach(function(x,i){if(x.pr===g[0])X.push([x,i])});if(!X.length)return;
  h+='<div class="card"><b>'+g[1]+'</b> <span class="pill'+(g[0]<=2?' warn':'')+'">'+X.length+'</span>'+X.map(function(y){return '<button class="dfit" data-act="dfgo" data-i="'+y[1]+'"><span class="grow">'+esc(y[0].txt)+'</span><span style="font-size:20px">›</span></button>'}).join('')+'</div>'});
 return h+'</div></div>'}
var _suH16b=setupHTML;setupHTML=function(){var h=_suH16b.apply(this,arguments);return h||dfHTML()};
/* ir a donde se llena */
function dfIr(x){var g=x.go;S.dfOpen=false;S.menu=false;var sel=null;
 if(g.t==='aj'){S.aj=true;sel=/PIN/.test(x.txt)?'#ajov [data-act^="pin"]':(/RFC/.test(x.txt)?'#ajov [data-bind="cfg.rfc"]':(/Teléfono/.test(x.txt)?'#ajov [data-bind="cfg.tel"]':'#ajov [data-bind="cfg.dir"]'))}
 else if(g.t==='emp'||g.t==='emppin'||g.t==='empsue'){S.tab.admin='personal';S.openCh=g.id;S.chEdit=g.t==='emp'?g.id:null;
  if(g.t==='empsue')S.fiTab=S.fiTab||{};sel=g.t==='emp'?(g.k==='lic'||g.k==='ine'||g.k==='foto'?'#fiov [data-chimg="'+g.id+':'+g.k+'"], #fiov label[for*="'+g.k+'"]':'#ch'+g.id+g.k):(g.t==='emppin'?'#fiov [data-act^="pin"]':null);
  if(g.t==='empsue'){render();var tb=document.querySelector('#fiov [data-act="fitab"][data-v="sue"]');if(tb)tb.click();return}}
 else if(g.t==='costo96'){wzAbre('costo96',{R:S.cfg.costoIniR||'',M:S.cfg.costoIniM||''});return}
 else if(g.t==='veh'){S.tab.admin='vehiculos';S.vehOpen=null;render();var b=document.createElement('button');b.dataset.act='vedit';b.dataset.id=g.id;b.style.display='none';document.body.appendChild(b);b.click();b.remove();S.vfP=g.p||0}
 else if(g.t==='cli'||g.t==='clidias'){S.tab.admin='clientes';S.openCli=g.id;if(g.t==='cli'){render();var b2=document.createElement('button');b2.dataset.act='ceedit';b2.dataset.id=g.id;b2.style.display='none';document.body.appendChild(b2);b2.click();b2.remove()}}
 else if(g.t==='prov'){S.openProv=g.n;S.pvEdit=g.n}
 render();window.scrollTo(0,0);if(sel)setTimeout(function(){var el=document.querySelector(sel);if(el){el.scrollIntoView({block:'center'});el.classList.remove('falta');void el.offsetWidth;el.classList.add('falta');if(el.focus&&el.tagName==='INPUT')el.focus({preventScroll:true})}},250)}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='dfopen'){e.stopImmediatePropagation();S.dfOpen=true;render();var o=document.getElementById('dfov');if(o)o.scrollTop=0;return}
 if(a==='dfx'){e.stopImmediatePropagation();S.dfOpen=false;render();return}
 if(a==='dfmin'){e.stopImmediatePropagation();S.dfMin=true;render();return}
 if(a==='dfmax'){e.stopImmediatePropagation();S.dfMin=false;render();return}
 if(a==='dfgo'){e.stopImmediatePropagation();var x=dfLista()[+b.dataset.i];if(x)dfIr(x);return}},true);
