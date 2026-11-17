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
