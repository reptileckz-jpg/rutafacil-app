/* ===================== v5 · Personal: "Agregar a alguien nuevo" con su propia pantalla =====================
   Antes: en Personal había un formulario chico (nombre y puesto) y al agregar te mandaba a la ficha con todas
   sus pestañas. Ahora en Personal solo está la tarjeta; al tocarla se abre una pantalla para dar de alta con todo. */
(function(){var st=document.createElement('style');st.textContent=[
 '#npov{position:fixed;inset:0;z-index:34;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}',
 '#npov .fiw{max-width:560px;margin:0 auto;padding:0 16px 48px}',
 '#npov .fihd{position:sticky;top:0;z-index:3;background:var(--bg);padding:10px 0 8px;display:flex;align-items:center;gap:10px}',
 '#npov .fiback{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--surface);font-size:22px;line-height:1;color:var(--fg);flex:none}',
 '#npov .fihd b{font-size:19px}',
 '#npov .field input{width:190px;text-align:left}',
 '.npfotos{display:flex;gap:10px;margin:8px 0}.npfotos label{flex:1;min-height:92px;border:1.5px dashed var(--line);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-size:13px;cursor:pointer;background:var(--surface);overflow:hidden;position:relative;text-align:center;padding:4px}',
 '.npfotos label img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.npfotos label span{position:relative;background:rgba(255,255,255,.85);border-radius:8px;padding:1px 6px;color:#1E2A1A}',
 '.npadd{display:flex;align-items:center;gap:12px;width:100%;text-align:left;color:inherit;cursor:pointer}',
 '.npadd .ic{width:44px;height:44px;border-radius:50%;background:var(--accent);color:var(--accent-ink);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;flex:none}'
].join('\n');document.head.appendChild(st)})();
function npBlank(){return {n:'',puesto:'chofer',tel:'',dir:'',ing:iso(TODAY),licV:'',foto:null,ine:null,lic:null,r1n:'',r1p:'',r1t:'',r2n:'',r2p:'',r2t:'',emn:'',emp:'',emt:'',sueldo:''}}
function npF(k,l,t,ph){var v=S.np[k];return '<div class="field"><label for="np_'+k+'">'+l+'</label><input id="np_'+k+'" type="'+(t||'text')+'" data-bind="np.'+k+'" value="'+esc(v==null?'':v)+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+(t==='tel'?' inputmode="tel"':'')+(t==='number'?' inputmode="decimal" min="0" step="any"':'')+'></div>'}
function npFoto(k,l){var u=S.np[k];return '<label for="npf_'+k+'">'+(u?'<img src="'+u+'" alt="'+l+'">':'<b style="font-size:22px">📷</b>')+'<span>'+l+'</span></label><input id="npf_'+k+'" type="file" accept="image/*" capture="environment" data-npf="'+k+'" style="position:absolute;opacity:0;width:1px;height:1px;pointer-events:none">'}
function npHTML(){if(!S.np||S.role!=='admin')return '';var n=S.np,ch=n.puesto==='chofer';
 return '<div id="npov" role="dialog" aria-label="Agregar a alguien nuevo"><div class="fiw"><div class="fihd"><button class="fiback" data-act="npx" aria-label="Regresar">←</button><span class="grow"><b>Agregar a alguien nuevo</b><br><span class="lbl">Solo el nombre es obligatorio. Lo que falte te lo recuerdo después.</span></span></div>'
  +'<div class="card"><b>¿Quién es?</b>'+npF('n','Nombre completo')+'<div class="lbl" style="margin-top:6px"><b>Puesto</b></div><div class="chips" role="group" style="margin:6px 0">'+PUESTOS.map(function(p){return '<button data-act="nppuesto" data-v="'+p[0]+'" aria-pressed="'+(n.puesto===p[0])+'">'+p[1]+'</button>'}).join('')+'</div>'
  +'<div class="npfotos">'+npFoto('foto','Fotografía')+npFoto('ine','INE')+(ch?npFoto('lic','Licencia'):'')+'</div></div>'
  +'<div class="card"><b>Contacto y trabajo</b>'+npF('tel','Teléfono','tel')+npF('dir','Dirección')+npF('ing','Entró a trabajar','date')+(ch?npF('licV','La licencia vence','date'):'')+npF('sueldo','Sueldo por semana $','number')+'</div>'
  +'<div class="card"><b>Referencias</b><div class="lbl" style="margin-top:6px">Referencia 1</div>'+npF('r1n','Nombre')+npF('r1p','Parentesco','text','mamá, compadre…')+npF('r1t','Teléfono','tel')
  +'<div class="lbl" style="margin-top:10px">Referencia 2</div>'+npF('r2n','Nombre')+npF('r2p','Parentesco','text','hermano, exjefe…')+npF('r2t','Teléfono','tel')+'</div>'
  +'<div class="card"><b>En caso de accidente, avisar a</b>'+npF('emn','Nombre')+npF('emp','Parentesco','text','esposa, mamá…')+npF('emt','Teléfono','tel')+'</div>'
  +'<button class="btn" style="margin-top:6px;min-height:56px" data-act="npsave">Guardar</button></div></div>'}
/* va dentro del dibujo de la pantalla (junto al asistente), para que no se vuelva a crear en cada cambio */
var _suH15=setupHTML;setupHTML=function(){var h=_suH15.apply(this,arguments);return h||npHTML()};
var _pers15=personal;personal=function(){var h=_pers15.apply(this,arguments),a=h.indexOf('<div class="card"><b>Agregar a alguien del personal</b>');if(a<0)a=h.indexOf('<div class="card"><b>Agregar chofer o personal</b>');if(a<0)return h;
 var e=h.indexOf('data-act="addch"',a);e=h.indexOf('</div>',e)+6;
 return h.slice(0,a)+'<button class="card npadd" data-act="npopen"><span class="ic">+</span><span class="grow"><b style="font-size:17px">Agregar a alguien nuevo</b><br><span class="lbl">Chofer, ayudante, bodega, venta local…</span></span><span style="font-size:22px">›</span></button>'+h.slice(e)};
document.addEventListener('change',function(e){var t=e.target;if(!t||!t.dataset||!t.dataset.npf||!t.files||!t.files[0]||!S.np)return;var k=t.dataset.npf;fotoLeer(t.files[0],function(u){S.np[k]=u;render()})},true);
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act;
 if(a==='npopen'){e.stopImmediatePropagation();S.np=npBlank();render();setTimeout(function(){var o=document.getElementById('npov');if(o)o.scrollTop=0;var i=document.getElementById('np_n');if(i)i.focus()},60);return}
 if(a==='npx'){e.stopImmediatePropagation();S.np=null;render();return}
 if(a==='nppuesto'){e.stopImmediatePropagation();S.np.puesto=b.dataset.v;render();return}
 if(a==='npsave'){e.stopImmediatePropagation();var n=S.np;if(!String(n.n||'').trim()){window._faltaSel='#np_n';toast('Escribe el nombre completo');render();return}
  var c=nuevoEmp({n:String(n.n).trim(),puesto:n.puesto,tel:n.tel});['dir','ing','licV','foto','ine','lic','r1n','r1p','r1t','r2n','r2p','r2t','emn','emp','emt'].forEach(function(k){if(n[k]!=null&&n[k]!=='')c[k]=n[k]});
  if(num(n.sueldo)>0)c.sz.monto=String(num(n.sueldo));S.choferes.push(c);S.np=null;
  S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Agregó a '+c.n+' ('+puestoN(c)+')'});toast('Agregado: '+c.n+(typeof faltaDe==='function'&&faltaDe('emp',c).length?' · lo que falte te lo recuerdo':''));render();window.scrollTo(0,0);return}},true);

/* ===================== v5 · Parentesco con menú =====================
   Antes era un campo con sugerencias que en el celular no abría nada. Ahora: botones con lo básico
   y "Otro" abre más opciones (y si no está, se escribe). */
var PAR_B=['Papá o mamá','Hermano(a)','Amigo(a)','Pareja'],PAR_O=['Hijo(a)','Tío(a)','Primo(a)','Abuelo(a)','Cuñado(a)','Suegro(a)','Compadre / comadre','Padrino / madrina','Vecino(a)','Exjefe','Compañero(a) de trabajo'];
(function(){var st=document.createElement('style');st.textContent='.parsel{padding:8px 0;border-top:1px solid var(--line)}.parsel .chips{flex-wrap:wrap;gap:6px;margin-top:6px}.parsel .chips button{flex:0 0 auto;min-width:0;padding:0 14px}.parsel .paro{margin-top:8px;padding:8px;border-radius:12px;background:var(--surface-2,rgba(0,0,0,.04))}';document.head.appendChild(st)})();
function parVal(t){var p=t.split(':');if(p[0]==='np')return (S.np||{})[p[1]]||'';var c=S.choferes.filter(function(x){return x.id===+p[1]})[0];return c?c[p[2]]||'':''}
function parSet(t,v){var p=t.split(':');if(p[0]==='np'){S.np[p[1]]=v;return}var c=S.choferes.filter(function(x){return x.id===+p[1]})[0];if(c)c[p[2]]=v}
function parHTML(t){var v=parVal(t),otro=S.parOtro===t||(v&&PAR_B.indexOf(v)<0),libre=v&&PAR_B.indexOf(v)<0&&PAR_O.indexOf(v)<0;
 return '<div class="parsel" data-key="par-'+t+'"><div>Parentesco'+(v?': <b>'+esc(v)+'</b>':'')+'</div><div class="chips" role="group" aria-label="Parentesco">'+PAR_B.map(function(x){return '<button data-act="parset" data-t="'+t+'" data-v="'+esc(x)+'" aria-pressed="'+(v===x)+'">'+x+'</button>'}).join('')+'<button data-act="parotro" data-t="'+t+'" aria-pressed="'+otro+'">Otro…</button></div>'
  +(otro?'<div class="paro"><div class="lbl">Escoge uno</div><div class="chips" role="group">'+PAR_O.map(function(x){return '<button data-act="parset" data-t="'+t+'" data-v="'+esc(x)+'" aria-pressed="'+(v===x)+'">'+x+'</button>'}).join('')+'</div><div class="field" style="margin-top:6px"><label for="parl_'+t.replace(/:/g,'_')+'">¿Otro? Escríbelo</label><input id="parl_'+t.replace(/:/g,'_')+'" type="text" data-part="'+t+'" value="'+esc(libre?v:'')+'" placeholder="ej. padrastro" style="width:150px;text-align:left"></div></div>':'')+'</div>'}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="parset"],[data-act="parotro"]');if(!b)return;e.stopImmediatePropagation();var t=b.dataset.t;
 if(b.dataset.act==='parotro'){S.parOtro=S.parOtro===t&&PAR_B.indexOf(parVal(t))>-1?null:t;if(PAR_B.indexOf(parVal(t))>-1)parSet(t,'');render();return}
 parSet(t,b.dataset.v);S.parOtro=PAR_O.indexOf(b.dataset.v)>-1?t:null;render()},true);
document.addEventListener('input',function(e){var x=e.target;if(x&&x.dataset&&x.dataset.part){parSet(x.dataset.part,x.value)}},true);
/* en la pantalla de alta */
var _npF15=npF;npF=function(k,l,t,ph){if(/^(r1p|r2p|emp)$/.test(k))return parHTML('np:'+k);return _npF15.apply(this,arguments)};
/* y al editar a alguien que ya existe */
var _fiEmp15=fiEmp;fiEmp=function(f){var h=_fiEmp15.apply(this,arguments);return h.replace(/<div class="field"><label for="ch(\d+)(r1p|r2p|emp)">Parentesco<\/label><input[^>]*><\/div>/g,function(m,id,k){return parHTML('ch:'+id+':'+k)})};
