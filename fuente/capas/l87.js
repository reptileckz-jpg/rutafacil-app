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
/* → movido (tema-rutadia.js) */
/* el admin: solo las rutas de choferes que SÍ salieron */
/* → movido (tema-rutadia.js) */
/* la pantallita del chofer, tampoco si no salió */
/* → movido (tema-rutadia.js) */

/* ---------- 74 · "X no envió su cierre": se quita solo; y su pantalla trae botones ---------- */
function bloqueado87(nombre){return porLib86().some(function(x){return chofN(x.id)===nombre})}
function limpiaCierre87(){if(S.role!=='admin'||!Array.isArray(S.avPrecio))return;var cambio=false;S.avPrecio=S.avPrecio.filter(function(x){var m=/^(?:URGENTE:\s*)?(.+?) no envió su cierre de ayer/.exec(String(x||''));if(!m)return true;var ns=m[1].split(/,\s*/),sigue=ns.some(bloqueado87);if(!sigue)cambio=true;return sigue});return cambio}
/* avDestino: pasó a tema-avisos.js */
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
/* sugCarga: pasó a tema-viaje.js */
/* stock72: pasó a tema-piezas.js */

/* render: pasó a tema-dibujar2.js */
