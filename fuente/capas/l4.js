/* ===================== v3.9 · 4. Borradores: si sales a medio llenar ===================== */
/* Un borrador NO cuenta en ninguna cuenta hasta que se guarda de verdad. */
S.borr=S.borr||{};
var _borrNext=null,_borrForm=null,_borrBypass=false;
function jsonEq(a,b){try{return JSON.stringify(a)===JSON.stringify(b)}catch(e){return false}}
function chSnapOf(c){var o={};Object.keys(c).forEach(function(k){if(typeof c[k]!=='object'||c[k]===null)o[k]=c[k]});return o}
/* qué formulario está abierto y si cambió algo */
var BF={
 ent:{abierto:function(){return S.role==='rep'&&S.tab.rep==='entrega'&&!!S.d&&curCli()},sucio:function(){return S._d0!=null&&JSON.stringify(S.d)!==S._d0},
  nom:function(){var c=curCli();return 'Entrega a '+(c?c.n:'un cliente')},
  guardar:function(){var c=curCli();S.borr.ent={c:c.id,cur:S.cur,d:JSON.parse(JSON.stringify(S.d))};var st=S.stops[S.cur];S.tab.rep='ruta'},
  borrar:function(){var st=S.stops[curStop()];if(st&&!st.done)st.lleg=null;S.err='';resetDraft(st?cl(st.c):null);delete S.borr.ent;S.tab.rep='ruta'}},
 cm:{abierto:function(){return S.role==='admin'&&!!S.cm},sucio:function(){return S._cm0!=null&&JSON.stringify(S.cm)!==S._cm0},nom:function(){return 'Registro de carga'},
  guardar:function(){S.borr.cm={cm:S.cm,c0:S._cm0};S.cm=null},borrar:function(){S.cm=null;delete S.borr.cm}},
 vf:{abierto:function(){return S.role==='admin'&&!!S.vf},sucio:function(){return S._vf0!=null&&JSON.stringify(S.vf)!==S._vf0},nom:function(){return S.vfId!=null?'Cambios a un vehículo':'Vehículo nuevo'},
  guardar:function(){S.borr.vf={vf:S.vf,id:S.vfId,p:S.vfP,c0:S._vf0};S.vf=null;S.vfId=null},borrar:function(){S.vf=null;S.vfId=null;S.vfP=0;delete S.borr.vf}},
 ce:{abierto:function(){return S.role==='admin'&&S.cliEdit!=null&&!!S.ce},sucio:function(){return S._ce0!=null&&JSON.stringify(S.ce)!==S._ce0},nom:function(){var c=cl(S.cliEdit);return 'Datos de '+(c?c.n:'un cliente')},
  guardar:function(){S.borr.ce={id:S.cliEdit,ce:S.ce,c0:S._ce0};S.cliEdit=null;S.ce=null},borrar:function(){S.cliEdit=null;S.ce=null;delete S.borr.ce}},
 ch:{abierto:function(){return S.role==='admin'&&S.chEdit!=null},sucio:function(){var c=S.choferes.filter(function(x){return x.id===S.chEdit})[0];return !!(c&&S._ch0&&!jsonEq(chSnapOf(c),S._ch0))},nom:function(){var c=S.choferes.filter(function(x){return x.id===S.chEdit})[0];return 'Datos de '+(c?c.n:'un empleado')},
  guardar:function(){S.chEdit=null;toast('Datos guardados')},borrar:function(){var c=S.choferes.filter(function(x){return x.id===S.chEdit})[0];if(c&&S._ch0)Object.keys(S._ch0).forEach(function(k){c[k]=S._ch0[k]});S.chEdit=null}},
 gx:{abierto:function(){return S.role==='rep'&&!!S.gxSheet},sucio:function(){var g=S.gx||{};return String(g.monto||'')!==''||String(g.nota||'')!==''||!!g.foto},nom:function(){return 'Gasto de '+((S.gx||{}).tipo||'la ruta')},
  guardar:function(){S.borr.gx=1;S.gxSheet=false},borrar:function(){S.gx={tipo:(S.gx||{}).tipo||'Comida o viáticos',monto:'',nota:'',foto:null};delete S.borr.gx;S.gxSheet=false}},
 vl:{abierto:function(){return S.role==='local'&&S.tab.local==='local'},sucio:function(){return (S.vl.lin||[]).some(function(l){return num(l.kg)>0})},nom:function(){return 'Venta local'},
  guardar:function(){S.borr.vl=1},borrar:function(){S.vl.lin=[{p:S.vlProd[0]?S.vlProd[0].n:'',kg:''}];delete S.borr.vl}}};
/* ¿hay que preguntar? si sí, enseña la ventanita y regresa true */
function borrSalir(quien,next){var k=null;Object.keys(BF).forEach(function(x){if(!k&&BF[x].abierto()&&BF[x].sucio())k=x});
 if(quien==='ficha'&&k!=='ce'&&k!=='ch')k=null;
 if(!k)return false;_borrForm=k;_borrNext=next||null;
 abrirModal('¿Dejas esto a medio llenar?','<b>'+esc(BF[k].nom())+'</b><div class="lbl" style="margin-top:6px">'+(k==='ch'?'Los cambios a los datos del empleado se guardan al momento.':'Si lo guardas para después, no cuenta en ninguna cuenta hasta que lo termines y lo guardes de verdad.')+'</div>',
  [[k==='ch'?'Guardar cambios':'Guardar para seguir después','borrkeep'],[k==='ch'?'Borrar lo que cambié':'Borrar lo que llené','borrdel'],['Seguir llenando','borrseguir']]);return true}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,D=b.dataset;
 if(a==='borrkeep'||a==='borrdel'||a==='borrseguir'){e.stopImmediatePropagation();S.modal=null;var k=_borrForm,nx=_borrNext;_borrForm=null;_borrNext=null;
  if(a==='borrseguir'){render();return}
  if(a==='borrdel'&&!D.ok){_borrForm=k;_borrNext=nx;abrirModal('¿Borrar lo que llenaste?','Se pierde lo que escribiste en: <b>'+esc(BF[k].nom())+'</b>.',[['Sí, borrarlo','borrdel',' data-ok="1"'],['No, regresar','borrseguir']]);return}
  if(k)BF[k][a==='borrkeep'?'guardar':'borrar']();if(a==='borrkeep'&&k!=='ch')toast('Guardado para después. Lo ves arriba en "Sin terminar".');
  _borrBypass=true;try{if(nx)nx();else render()}finally{_borrBypass=false}window.scrollTo(0,0);return}
 if(_borrBypass)return;
 /* salidas de cada formulario */
 if(a==='entvolver'&&BF.ent.abierto()&&BF.ent.sucio()){e.stopImmediatePropagation();borrSalir('ent',function(){render()});return}
 if(a==='cmx'&&BF.cm.sucio()){e.stopImmediatePropagation();borrSalir('cm',function(){render()});return}
 if(a==='vcancel'&&BF.vf.abierto()&&BF.vf.sucio()){e.stopImmediatePropagation();borrSalir('vf',function(){render()});return}
 if(a==='cecancel'&&BF.ce.abierto()&&BF.ce.sucio()){e.stopImmediatePropagation();borrSalir('ce',function(){render()});return}
 if(a==='gxsx'&&BF.gx.abierto()&&BF.gx.sucio()){e.stopImmediatePropagation();borrSalir('gx',function(){render()});return}
 if((a==='tab'||a==='role'||a==='chofsel'||a==='adminyo')&&!_borrBypass){var k=null;['ent','cm','vf','ce','gx','vl'].forEach(function(x){if(!k&&BF[x].abierto()&&BF[x].sucio())k=x});
  if(k&&!(a==='tab'&&D.t===S.tab[S.role])){e.stopImmediatePropagation();var tgt=b;borrSalir(k,function(){tgt.click()});return}}
 /* fotos de cuando se abre cada formulario, para saber si cambió algo */
 if(a==='ceedit')setTimeout(function(){S._ce0=JSON.stringify(S.ce)},0);
 if(a==='chedit')setTimeout(function(){var c=S.choferes.filter(function(x){return x.id===S.chEdit})[0];S._ch0=c?chSnapOf(c):null},0);
 if(a==='vnew'||a==='vedit')setTimeout(function(){S._vf0=S.vf?JSON.stringify(S.vf):null},0);
 if(a==='guardar'&&S.role==='rep'){var c0=curCli();setTimeout(function(){if(S.borr.ent&&c0&&S.borr.ent.c===c0.id&&S.log.some(function(l){return l.c===c0.id}))delete S.borr.ent},40)}
 if(a==='gxsave')setTimeout(function(){if(!BF.gx.sucio())delete S.borr.gx},40);
 if(a==='vsave')setTimeout(function(){if(!S.vf)delete S.borr.vf},40);
 if(a==='cesave')setTimeout(function(){if(!S.ce)delete S.borr.ce},40);
 if(a==='vlvender')setTimeout(function(){if(!BF.vl.sucio())delete S.borr.vl},40);
 /* seguir un borrador */
 if(a==='borrir'){e.stopImmediatePropagation();var w=D.k,B=S.borr[w];
  if(w==='ent'&&B){var i=S.stops.map(function(s){return s.c}).indexOf(B.c);if(i<0){delete S.borr.ent;render();return}S.cur=i;S.tab.rep='entrega';var fr=cl(B.c);resetDraft(fr);S.d=JSON.parse(JSON.stringify(B.d));delete S.borr.ent}
  if(w==='cm'&&B){S.cm=B.cm;S._cm0=B.c0;delete S.borr.cm;S.tab.admin='cargas'}
  if(w==='vf'&&B){S.vf=B.vf;S.vfId=B.id;S.vfP=B.p||0;S._vf0=B.c0;delete S.borr.vf;S.tab.admin='vehiculos'}
  if(w==='ce'&&B){S.tab.admin='clientes';S.openCli=B.id;S.cliEdit=B.id;S.ce=B.ce;S._ce0=B.c0;S.fiTab['cli:'+B.id]='dat';delete S.borr.ce}
  if(w==='gx'){S.gxSheet=true;delete S.borr.gx}
  if(w==='vl'){S.tab.local='local';delete S.borr.vl}
  render();window.scrollTo(0,0);return}
 if(a==='borrx'){e.stopImmediatePropagation();var w2=D.k;if(w2==='ent'&&S.borr.ent){delete S.borr.ent}if(w2==='cm')delete S.borr.cm;if(w2==='vf')delete S.borr.vf;if(w2==='ce')delete S.borr.ce;if(w2==='gx'){BF.gx.borrar()}if(w2==='vl')BF.vl.borrar();toast('Borrador borrado');render();return}
 /* entrar a la misma entrega que dejaste guardada */
 if(a==='entregar'&&S.borr.ent){var st=S.stops[+D.i];if(st&&st.c===S.borr.ent.c){var B2=S.borr.ent;setTimeout(function(){S.d=JSON.parse(JSON.stringify(B2.d));delete S.borr.ent;toast('Seguimos con lo que habías llenado');render()},0)}}
 /* mandar el cierre con cosas sin terminar */
 if(a==='enviar'&&!D.ok&&borrPend().length){e.stopImmediatePropagation();abrirModal('Tienes cosas sin terminar',borrPend().map(function(x){return '• '+esc(x.n)}).join('<br>')+'<div class="lbl" style="margin-top:6px">Lo que no termines no se cuenta en el cierre.</div>',[['Ir a terminarlo','borrir',' data-k="'+borrPend()[0].k+'"'],['Enviar de todos modos','enviar',' data-ok="1"']]);return}
 if(a==='enviar'&&D.ok){S.modal=null}},true);
var _cmNK=cmNuevo;cmNuevo=function(){var r=_cmNK.apply(this,arguments);S._cm0=JSON.stringify(S.cm);return r};
function borrPend(){var L=[];var B=S.borr||{};
 if(S.role==='rep'){if(B.ent){var c=cl(B.ent.c);L.push({k:'ent',n:'Entrega a '+(c?c.n:'cliente')})}if(B.gx)L.push({k:'gx',n:'Gasto de '+((S.gx||{}).tipo||'la ruta')+' ('+money(num((S.gx||{}).monto))+')'})}
 if(S.role==='admin'){if(B.cm)L.push({k:'cm',n:'Registro de carga'});if(B.vf)L.push({k:'vf',n:B.id!=null?'Cambios a un vehículo':'Vehículo nuevo'});if(B.ce){var c2=cl(B.ce.id);L.push({k:'ce',n:'Datos de '+(c2?c2.n:'un cliente')})}}
 if(S.role==='local'&&B.vl)L.push({k:'vl',n:'Venta local'});return L}
function borrBanner(){var L=borrPend();if(!L.length)return '';return '<div class="card note" role="status" style="border:2px solid var(--orange)"><b>Sin terminar</b>'+L.map(function(x){return '<div class="row"><span>'+esc(x.n)+'</span><span style="display:flex;gap:6px"><button class="btn sm" style="width:auto" data-act="borrir" data-k="'+x.k+'">Continuar</button><button class="btn sm sec" style="width:auto" data-act="borrx" data-k="'+x.k+'">Borrar</button></span></div>'}).join('')+'<div class="lbl">No cuenta en ninguna cuenta hasta que lo guardes. En la app final también se guarda solo si se cierra la app o se apaga el teléfono.</div></div>'}
var _rL4=render;render=function(){_rL4.apply(this,arguments);try{var m=document.querySelector('main');if(!m||m.querySelector('[data-borr]'))return;var h=borrBanner();if(!h)return;if(S.role==='rep'&&S.tab.rep==='entrega')return;var w=document.createElement('div');w.setAttribute('data-borr','1');w.innerHTML=h;m.insertBefore(w.firstElementChild,m.firstElementChild);m.firstElementChild.setAttribute('data-borr','1')}catch(e){}};
