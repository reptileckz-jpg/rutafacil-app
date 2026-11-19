/* ===================== TEMA · Notas de remisión (nació como tema, 17 nov · punto 107) =====================
   Antes el número de la nota era cuántas entregas llevaba la ruta ESE DÍA: cada día volvía a 1 y dos choferes
   podían dar el mismo número. Ahora cada chofer (también el administrador que reparte) tiene su serie con una letra
   y un consecutivo que nunca se reinicia: A-0001, A-0002… La letra sale del orden de alta de los choferes, así que
   dos celulares sin señal calculan la misma; el consecutivo lo lleva solo el celular de ese chofer (se guarda en la nube).
   Si se cambia algo de las notas de remisión, se cambia AQUÍ.
   ============================================================================================ */
function letra107(i){var A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';return i<26?A[i]:A[Math.floor(i/26)-1]+A[i%26]}
/* la serie de un chofer: se calcula una vez y se guarda en él */
function serie107(c){if(!c)return 'X';if(!c.serie107){var L=(S.choferes||[]).slice().sort(function(a,b){return num(a.id)-num(b.id)});c.serie107=letra107(Math.max(0,L.indexOf(c)))}return c.serie107}
/* el número de la siguiente nota (y se le anota a la entrega) */
function folioNota107(){var c=(S.choferes||[]).filter(function(x){return +x.id===+S.chofHoy})[0],n;
 if(c){c.folio107=num(c.folio107)+1;n=serie107(c)+'-'+('000'+c.folio107).slice(-4)}else{S.cfg.folio107=num(S.cfg.folio107)+1;n='X-'+('000'+S.cfg.folio107).slice(-4)}
 try{var l=S.log&&S.log[S.log.length-1];if(l&&!l.folio107)l.folio107=n}catch(e){}return n}
function folioTxt107(f){return typeof f==='string'?f:('000'+f).slice(-4)}

/* ---------- La nota de remisión: cómo se ve y qué lleva (aplanado el 18 nov; antes en l9, l17, l18, l63, en el mismo orden) ----------
   notaBlock: la nota en pantalla (sin nombre si así se pidió, logo propio, mandar el ticket por WhatsApp);
   notaImg: la imagen del ticket con logo propio; notaItems: los renglones (teléfono del negocio); notasDe: las notas que ve cada quien. */
/* notaBlock · de l9 */
var _nbL9=notaBlock;notaBlock=function(){var h=_nbL9.apply(this,arguments);if(!h)return h;
 h=h.replace('<img src="'+LOGO+'" alt="" style="width:90px;display:block;margin:0 auto 6px">','<img src="'+IMG.tk+'" alt="Plátanos Nietos" class="tklogo">');
 if(tkSinNombre())h=h.replace('<div style="text-align:center;font-weight:700;font-size:16px">'+esc(String(S.cfg.nombre).toUpperCase())+'</div>','');return h};

/* notaBlock · de l9 */
var _nbLg=notaBlock;notaBlock=function(){var h=_nbLg.apply(this,arguments);if(!h)return h;var src=logoTkSrc();
 if(src!==IMG.tk){var tag='<img src="'+IMG.tk+'" alt="Plátanos Nietos" class="tklogo">';h=h.replace(tag,src?'<img src="'+src+'" alt="Logo" class="tklogo">':'');
  if(tkSinNombre()&&h.indexOf('font-weight:700;font-size:16px">'+esc(String(S.cfg.nombre).toUpperCase())+'</div>')<0){var i=h.indexOf('class="tklogo">');var nm='<div style="text-align:center;font-weight:700;font-size:16px">'+esc(String(S.cfg.nombre).toUpperCase())+'</div>';h=i>-1?h.slice(0,i+15)+nm+h.slice(i+15):h.replace(/(<div[^>]*>)/,'$1'+nm)}}
 return h};

/* notaImg · de l9 */
var _niLg=notaImg;notaImg=function(n){var src=logoTkSrc();if(src===IMG.tk)return _niLg.apply(this,arguments);
 var it=notaItems(n),im=tkImg(src),LW=0,LH=0;if(im&&im.complete&&im.naturalWidth){LW=Math.min(170,im.naturalWidth);LH=Math.round(LW*im.naturalHeight/im.naturalWidth);if(LH>170){LH=170;LW=Math.round(170*im.naturalWidth/im.naturalHeight)}}
 var W=440,y0=(LH?LH+40:34),H=y0+it.length*28+10,cv=document.createElement('canvas');cv.width=W;cv.height=H;var cx=cv.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,W,H);if(LH)try{cx.drawImage(im,W/2-LW/2,12,LW,LH)}catch(e){}
 cx.fillStyle='#111';var y=y0;it.forEach(function(x){cx.font=(x.b?'bold ':'')+'15px monospace';if(x.t==='hr'){cx.fillRect(20,y-12,W-40,1)}else if(x.t==='c'){cx.textAlign='center';cx.font=(x.b?'bold 19px':'15px')+' monospace';cx.fillText(x.s,W/2,y)}else{cx.fillStyle=x.c==='neg'?'#B3261E':(x.c==='ok'?'#2F7D32':'#111');cx.textAlign='left';cx.fillText(x.k,20,y);cx.textAlign='right';cx.fillText(x.v,W-20,y);cx.fillStyle='#111'}y+=28});return cv.toDataURL('image/png')};

/* notaBlock · de l17 */
var _nB17=notaBlock;notaBlock=function(){var h=_nB17.apply(this,arguments),n=S.nota;if(!tkNecesita(n))return h;var debe=n.total-n.pago,x;
 if(!tkHecho(n)){var tel=tkTel(n);
  x='<div class="card alert" id="tkcard" data-key="tkcard" style="border-width:2px"><b class="neg" style="font-size:17px">Mándale su ticket al cliente</b><div style="font-size:15px;margin-top:4px">'+(debe>0.005?'Le quedó a deber <b>'+money(debe)+'</b>':'')+(debe>0.005&&n.abono>0?' y ':'')+(n.abono>0?'Dio un abono de <b>'+money(n.abono)+'</b>':'')+'. Ahora debe <b>'+money(n.cred)+'</b>.</div><div class="lbl">Es obligatorio para seguir con la ruta.</div>'
   +(tel.length===10?'':'<div class="field" style="margin-top:6px"><label for="tktel">WhatsApp del cliente</label><input id="tktel" type="tel" inputmode="tel" data-bind="nota.tel" value="'+esc(n.tel||'')+'" placeholder="10 números" style="width:160px;text-align:left"></div>')
   +'<button class="btn" style="margin-top:10px;background:#1FA855" data-act="tkwa">📲 Mandar por WhatsApp'+(imprOk()?' e imprimir':'')+'</button>'
   +'<button class="link" style="margin-top:6px" data-act="tknowa">El cliente no tiene WhatsApp</button></div>'}
 else x='<div class="card good" data-key="tkcard"><b>'+(n.waOk?'✓ Ticket enviado por WhatsApp':'Sin WhatsApp')+(n.prOk?' · ✓ impreso':'')+'</b>'+(n.sinTk&&!n.prOk?'<div class="lbl">Se le avisó al administrador que se fue sin ticket.</div>':'')+(!n.prOk&&imprOk()?'<button class="btn sm sec" style="margin-top:6px" data-act="tkprint">Imprimir ticket</button>':'')+'</div>';
 return x+h};

/* notaItems · de l18 */
var _nI18=notaItems;notaItems=function(n){var it=_nI18.apply(this,arguments),t=String(S.cfg.tel||'').trim();if(!t)return it;
 it=it.filter(function(x){return !(x.t==='c'&&x.s==='Tel. '+t)});var k=it.length-1;it.splice(k,0,{t:'c',s:'Pedidos por WhatsApp:'},{t:'c',s:t,b:1});return it};

/* notasDe · de l63 */
var _nd63=notasDe;notasDe=function(k){var orig=S.notasN||[],rol=S.role==='rep'?'ch':(S.encOn?'enc':'adm');var gen=/^cli:/.test(k)?'cli:*':(/^prov:/.test(k)?'prov:*':null);
 S.notasN=orig.filter(function(n){if((n.k!==k&&n.k!==gen))return false;var v=n.v||'todos';return rol==='adm'||v==='todos'||v===rol}).map(function(n){return n.k===gen?Object.assign({},n,{k:k}):n});try{return _nd63.call(this,k)}finally{S.notasN=orig}};

/* ---------- 129 · la imagen del ticket: botones que sí funcionan (antes decía "mantén presionada", y en el APK no hace nada) ----------
   Sale solo con "Ver como imagen" o si el ticket no se pudo mandar. Guardar = a Descargas del celular; Compartir = la hoja de compartir (WhatsApp…). */
function tkImgHTML129(n){return '<div class="card" style="padding:10px;margin-top:8px"><img src="'+n.img+'" alt="Nota de remisión como imagen" style="width:100%;border:1px solid var(--line);border-radius:10px">'
 +'<button class="btn sec" style="margin-top:8px" data-act="imgguarda">💾 Guardar en el celular</button>'
 +'<button class="btn sec" style="margin-top:8px" data-act="tkimgcomp">📤 Compartir la imagen</button>'
 +'<button class="link" style="margin-top:6px" data-act="tkimgx">Ocultar la imagen</button></div>'}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act="tkimgcomp"],[data-act="tkimgx"]');if(!b)return;e.stopImmediatePropagation();var n=S.nota;if(!n)return;
 if(b.dataset.act==='tkimgx'){n.img=null;render();return}
 if(!n.img)return;var t='';try{t=telDiez(n.tel||((S.cli.filter(function(x){return x.n===n.cli})[0]||{}).tel))}catch(er){}
 natCompartir(n.img,'ticket-'+(n.folio||'')+'.png',{tel:t,texto:''}).then(function(ok){if(!ok)toast('Este celular no deja compartir desde aquí. Usa "Guardar en el celular" y mándala desde WhatsApp.')})},true);

/* ---------- 135 · el ticket dice el precio de cada cosa: "Roatán · 20 cajas a $275 c/u = $5,500", "Macho · 15 kg a $20 el kilo = $300",
   y debajo si fue mayoreo o precio especial (con el precio normal). Lo que no se llevó ya no sale en 0. ---------- */
function notaProd135(nom,q,u,pr,t,p){var L=[{t:'kv',k:nom+' · '+q.toLocaleString('es-MX')+' '+u+' a '+money(pr)+(p==='R'?' c/u':' el kilo'),v:money(r2(q*pr))}];
 if(t&&t.t!=='dia')L.push({t:'kv',k:'   '+t.txt,v:num(t.n)&&Math.abs(num(t.n)-pr)>0.005?'normal '+money(num(t.n)):''});return L}
var _nI135=notaItems;notaItems=function(n){var it=_nI135.apply(this,arguments);if(!n)return it;try{var out=[];it.forEach(function(x){
  if(x&&x.t==='kv'&&x.k==='Plátano roatán'){if(num(n.R)>0)out=out.concat(notaProd135('Roatán',num(n.R),num(n.R)===1?'caja':'cajas',num(n.pr),n.tR||(n.may?{t:'mayChofer',txt:'Mayoreo'}:null),'R'))}
  else if(x&&x.t==='kv'&&x.k==='Plátano macho'){if(num(n.M)>0)out=out.concat(notaProd135('Macho',num(n.M),'kg',num(n.pm),n.tM||(n.may?{t:'mayChofer',txt:'Mayoreo'}:null),'M'))}
  else out.push(x)});return out}catch(e){return it}};
