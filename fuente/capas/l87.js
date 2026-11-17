/* ===================== v8.7 · 71–74 (17 nov) prueba de la 1.0.36
   71 Solo se pide el cierre (y se bloquea la ruta de hoy) si el chofer SALIÓ (tocó "Iniciar"). Si no salió, su ruta vieja se archiva
      sola y le sale la de hoy; si tenía entregas sin haber salido, al admin le llega "cuádralo con él".
   72 "Aviso del administrador" del chofer: agrupado ("Mañana te tocan también 13 clientes: A, B, C y 10 más"), sin repetidos.
   73 "¿Cuánto cargas hoy?": se lee en modo oscuro; si menos de la mitad de los clientes de hoy tiene historial, no inventa un número.
   74 "X no envió su cierre": se quita solo si ya no aplica (ruta liberada, cierre mandado, o no salió); al tocarlo, la pantalla del
      cierre trae "Recordarle" y "Liberar su ruta de hoy"; y la sección se llama "Cierre del chofer" (no "cierreadm"). ===================== */
(function(){var st=document.createElement('style');st.textContent=[
 '.card.rep1,.card.rep1 *{color:#0F2A1A}.card.rep1 .lbl{color:#335244!important}'].join('\n');document.head.appendChild(st)})();
function salio87(o){return !!(o&&o.salida&&o.salida.ok)}

/* ---------- 71 · bloquear solo si salió ---------- */
var _rr87=rutaRenueva80;rutaRenueva80=function(){var v=null;try{v=rutaVieja80()}catch(e){}if(!v)return _rr87.apply(this,arguments);var o=arPack(),env=!!(o.cierre&&o.cierre.sent);
 if(!env&&!salio87(o)){var f=v==='antes'?ayer80():v;try{if((o.log||[]).length){S.rutasHist=S.rutasHist||[];if(!S.rutasHist.some(function(x){return x.f===f&&+x.ch===+S.chofHoy}))S.rutasHist.push({f:f,ch:+S.chofHoy,log:o.log,res:null,enviado:false,sinSalir87:1});
   (S.avPrecio=S.avPrecio||[]).push(chofN(S.chofHoy)+' tenía '+o.log.length+' entrega'+(o.log.length===1?'':'s')+' '+del80(f)+' sin haber iniciado ruta ni mandado cierre: cuádralo con él.')}}catch(e){}
  var rv=rutaVacia;rutaVacia=function(x){return !salio87(x)};try{return _rr87.apply(this,arguments)}finally{rutaVacia=rv}}
 return _rr87.apply(this,arguments)};
/* el admin: solo las rutas de choferes que SÍ salieron */
var _pl87=porLib86;porLib86=function(){var hoy=iso(TODAY);return _pl87.apply(this,arguments).filter(function(x){var o=x.propia?S:(S.chSt||{})[x.id];return salio87(o)})};
/* la pantallita del chofer, tampoco si no salió */
var _d80H87=dia80HTML;dia80HTML=function(){if(S.role==='rep'&&S.dia80&&!salio87(S)&&!(S.cierre&&S.cierre.sent)){S.dia80=null;setTimeout(function(){try{render()}catch(e){}},0);return ''}return _d80H87.apply(this,arguments)};

/* ---------- 74 · "X no envió su cierre": se quita solo; y su pantalla trae botones ---------- */
function bloqueado87(nombre){return porLib86().some(function(x){return chofN(x.id)===nombre})}
function limpiaCierre87(){if(S.role!=='admin'||!Array.isArray(S.avPrecio))return;var cambio=false;S.avPrecio=S.avPrecio.filter(function(x){var m=/^(?:URGENTE:\s*)?(.+?) no envió su cierre de ayer/.exec(String(x||''));if(!m)return true;var ns=m[1].split(/,\s*/),sigue=ns.some(bloqueado87);if(!sigue)cambio=true;return sigue});return cambio}
var _avD87=avDestino;avDestino=function(x){var r=_avD87.apply(this,arguments);try{if(/no envió su cierre/.test(String(x))&&r){r.t='inicio';r.sel='[data-x="dia80a"]'}}catch(e){}return r};
function cierreAdm87(){if(S.role!=='admin'||S.tab.admin!=='cierreadm')return;var m=document.querySelector('main');if(!m||m.querySelector('[data-x="cad87"]'))return;var id=S.chofHoy;if(id==null||(S.cierre&&S.cierre.sent))return;var bl=porLib86().some(function(x){return x.id===+id});
 var d=document.createElement('div');d.dataset.x='cad87';d.className='card '+(bl?'alert':'note');d.style.padding='12px 14px';
 d.innerHTML=bl?'<b style="font-size:18px">'+esc(chofN(id))+' no ha mandado su cierre '+esc(del80(S.rutaDia80))+'</b><div class="lbl">Si no puede mandarlo, libera su ruta de hoy; lo de antes se queda en el historial para cuadrarlo con él.</div><div style="display:flex;gap:8px;margin-top:10px"><button class="btn sec" style="flex:1;min-height:52px" data-act="dia80r" data-id="'+id+'">Recordarle</button><button class="btn" style="flex:1;min-height:52px" data-act="lib86" data-id="'+id+'">Liberar su ruta de hoy</button></div>'
  :'<b style="font-size:17px">'+esc(chofN(id))+' todavía no manda su cierre de hoy</b><div class="lbl">Te sale aquí en cuanto lo mande.</div>';m.prepend(d)}
try{SEC86.cierreadm='Cierre del chofer';SEC86.rutas='Rutas'}catch(e){}

/* ---------- 72 · avisos del administrador al chofer: agrupados ---------- */
function agrupa87(L){var out=[],man=[],no=[],ya={};(L||[]).forEach(function(x){String(x||'').split(' · ').forEach(function(p){p=p.trim();if(!p)return;var m=/^Mañana también te toca (.+)$/.exec(p),n=/^Mañana no visitas a (.+)$/.exec(p);if(m){if(man.indexOf(m[1])<0)man.push(m[1]);return}if(n){if(no.indexOf(n[1])<0)no.push(n[1]);return}if(!ya[p]){ya[p]=1;out.push(p)}})});
 var lst=function(a){return a.length<=4?a.slice(0,-1).join(', ')+(a.length>1?' y ':'')+a[a.length-1]:a.slice(0,3).join(', ')+' y '+(a.length-3)+' más'};
 if(man.length)out.unshift('📅 Mañana te toca'+(man.length===1?'':'n')+' también '+(man.length===1?man[0]:man.length+' clientes: '+lst(man)));if(no.length)out.unshift('🚫 Mañana no visitas a '+lst(no));return out}
function avChofer87(){if(S.role!=='rep'||S.chofHoy==null||!S.rutaAv)return;var L=S.rutaAv[S.chofHoy];if(!Array.isArray(L)||!L.length)return;var G=agrupa87(L);if(JSON.stringify(G)!==JSON.stringify(L))S.rutaAv[S.chofHoy]=G}

/* ---------- 73 · cuánto cargar: sin número si faltan datos ---------- */
var _sug87=sugCarga;sugCarga=function(){var s=_sug87.apply(this,arguments);try{if(MODO==='vacio'&&s&&s.tot&&s.n>0&&s.n*2<s.tot){s.poco87=1;s.sR=0;s.sM=0}}catch(e){}return s};
var _st87=stock72;stock72=function(){if(MODO!=='vacio')return _st87.apply(this,arguments);var s=null;try{s=sugCarga()}catch(e){}if(s&&s.poco87&&S.role==='rep'&&!S.salida.ok){var m=document.querySelector('main'),c=m&&m.querySelector('.card.rep1');if(c&&!c.dataset.x72){c.dataset.x72='1';
  c.innerHTML='<div class="h">'+SV38.camion+'<span>¿Cuánto cargas hoy?</span></div><div style="font-size:17px;font-weight:800;margin-top:8px">Todavía no hay datos suficientes</div><div class="lbl" style="margin-top:4px">Solo '+s.n+' de tus '+s.tot+' clientes de hoy ya tienen entregas. Carga lo que te diga el administrador; la app aprende con cada entrega.</div>'}return}
 return _st87.apply(this,arguments)};

var _rd87=render;render=function(){try{avChofer87();limpiaCierre87()}catch(e){console.error('l87',e)}var r=_rd87.apply(this,arguments);try{cierreAdm87()}catch(e){console.error('l87b',e)}return r};
