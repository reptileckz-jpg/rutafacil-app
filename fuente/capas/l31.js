/* ===================== v6.0 · Pedidos: siempre responde, cliente nuevo y a quién se lo das ===================== */
function pedChoferes(){return (S.choferes||[]).filter(function(c){return c&&!c.baja&&!c.arch&&esCh(c)})}
function pedPos(id){var st=nbRGet(id,'stops')||[],pos=null;st.forEach(function(s){if(s.done){var c=cl(s.c);if(c&&c.lat!=null)pos=c}});var sal=nbRGet(id,'salida');return {pos:pos||BOD,activo:!!(sal&&sal.ok)}}
function pedSugerido(c){if(!c)return null;var L=pedChoferes(),mejor=null,dm=1e9;if(c.lat!=null)L.forEach(function(ch){var p=pedPos(ch.id);if(!p.activo)return;var d=kmE(p.pos,c);if(d!=null&&d<dm){dm=d;mejor=ch.id}});return mejor!=null?mejor:(c.chofer!=null?+c.chofer:(L[0]?L[0].id:null))}
function pedAsigna(c,chId,cuando,tx){var cu=cuando||'hoy';if(cu==='hoy'){var st=nbRGet(chId,'stops');if(!st){nbRSet(chId,'stops',[]);st=nbRGet(chId,'stops')}if(!st.some(function(x){return x.c===c.id&&!x.done}))st.push({c:c.id,ped:true})}else{if(S.rutaAdd.indexOf(c.id)<0)S.rutaAdd.push(c.id)}
 try{rutaAviso(chId,'Pedido para '+cu+': '+tx)}catch(e){S.avPrecio.push('Pedido para '+chofN(chId)+' ('+cu+'): '+tx)}}
function pedNuevoCli(n,tel,ch){var id=S.nextCli++;S.cli.push({id:id,n:n,ap:'',a:'',vac:0,cred:0,f:7,km:1,min:5,tel:tel||'',dias:[],chofer:ch!=null?+ch:+S.chofHoy,lim:1500,dp:null,tag:'',credOk:false,compras:0,tipo:'',recibe:'',lat:null,lng:null,porCh:S.role==='rep'?+S.chofHoy:null,altaPed:true});return cl(id)}
/* ---- admin: "Pedido por WhatsApp" ---- */
/* pedidoCard: pasó a tema-inicio.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="pedido"],[data-act="pfch"]');if(!b)return;e.stopImmediatePropagation();var p=S.pf;p.err='';p.ok='';
 if(b.dataset.act==='pfch'){p.ch=+b.dataset.id;p.chCli=p.cli;render();return}
 var R=Math.round(num(p.R)),M=r2(num(p.M)),c;
 if(p.cli==='__nuevo'){if(!String(p.nn||'').trim()){p.err='Escribe el nombre del cliente nuevo';render();return}}else{c=cl(+p.cli);if(!c){p.err='Elige el cliente';render();return}}
 if(R<=0&&M<=0){p.err='Escribe cuántas cajas o kilos pidió';render();return}if(p.ch==null||!pedChoferes().some(function(x){return +x.id===+p.ch})){p.err='Elige quién lo entrega';render();return}
 if(!c){c=pedNuevoCli(String(p.nn).trim(),String(p.nt||'').trim(),p.ch);S.avPrecio.push('Cliente nuevo por pedido: '+c.n+(c.tel?' · tel. '+c.tel:''))}
 c.ped={R:R,M:M,cuando:p.cuando||'hoy',nota:p.nota||''};var tx=c.n+' ('+R+' cajas, '+M+' kg)';pedAsigna(c,+p.ch,p.cuando,tx);
 S.pf={cli:String(c.id),R:'',M:'',cuando:p.cuando,nota:'',ok:'Listo: pedido de '+tx+' para '+(p.cuando||'hoy')+'. Se le avisó a '+chofN(+p.ch)+'.'};S.hist.push({t:fmtF(iso(TODAY))+' '+hhmm(),q:quien(),x:'Registró pedido de '+tx+' para '+chofN(+p.ch)});toast('Pedido registrado');render()},true);
/* ---- chofer: "+ Pedido de un cliente" ---- */
/* rpForm: pasó a tema-sueltas.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="rpsave"]');if(!b||!S.rp)return;var p=S.rp;p.err='';
 if(p.cli==='__nuevo'){if(!String(p.nn||'').trim()){e.stopImmediatePropagation();p.err='Escribe el nombre del cliente nuevo';render();return}if(!(num(p.R)>0||num(p.M)>0)){e.stopImmediatePropagation();p.err='Escribe cuántas cajas o kilos pidió';render();return}
  var c=pedNuevoCli(String(p.nn).trim(),String(p.nt||'').trim(),+S.chofHoy);p.cli=String(c.id);S.avPrecio.push(chofN(+S.chofHoy)+' registró un cliente nuevo por pedido: '+c.n+(c.tel?' · tel. '+c.tel:''));return}
 if(!cl(+p.cli)){e.stopImmediatePropagation();p.err='Elige el cliente';render();return}
 if(!(num(p.R)>0||num(p.M)>0)){e.stopImmediatePropagation();p.err='Escribe cuántas cajas o kilos pidió';render();return}},true);
