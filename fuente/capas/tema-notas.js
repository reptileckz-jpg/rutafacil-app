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
