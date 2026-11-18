/* ===================== v6.2 · Código QR (hecho aquí, sin internet) e impresora de tickets Bluetooth (ESC/POS) ===================== */
var QR=(function(){
 var ECC_CW=[ // [L,M] palabras de corrección por bloque, versiones 1..40
  [-1,7,10],[-1,10,16],[-1,15,26],[-1,20,18],[-1,26,24],[-1,18,16],[-1,20,18],[-1,24,22],[-1,30,22],[-1,18,26],[-1,20,30],[-1,24,22],[-1,26,22],[-1,30,24],[-1,22,24],[-1,24,28],[-1,28,28],[-1,30,26],[-1,28,26],[-1,28,26],[-1,28,26],[-1,28,28],[-1,30,28],[-1,30,28],[-1,26,28],[-1,28,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28],[-1,30,28]];
 var NB=[ // número de bloques [L,M]
  [-1,1,1],[-1,1,1],[-1,1,1],[-1,1,2],[-1,1,2],[-1,2,4],[-1,2,4],[-1,2,4],[-1,2,5],[-1,4,5],[-1,4,5],[-1,4,8],[-1,4,9],[-1,4,9],[-1,6,10],[-1,6,10],[-1,6,11],[-1,6,13],[-1,7,14],[-1,8,16],[-1,8,17],[-1,9,17],[-1,9,18],[-1,10,20],[-1,12,21],[-1,12,23],[-1,12,25],[-1,13,26],[-1,14,28],[-1,15,29],[-1,16,31],[-1,17,33],[-1,18,35],[-1,19,37],[-1,19,38],[-1,20,40],[-1,21,43],[-1,22,45],[-1,24,47],[-1,25,49]];
 function rawMod(v){var r=(16*v+128)*v+64;if(v>=2){var n=Math.floor(v/7)+2;r-=(25*n-10)*n-55;if(v>=7)r-=36}return r}
 function dataCW(v,e){return Math.floor(rawMod(v)/8)-ECC_CW[v-1][e]*NB[v-1][e]}
 function gfMul(x,y){var z=0;for(var i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z&255}
 function rsDiv(deg){var r=[];for(var i=0;i<deg-1;i++)r.push(0);r.push(1);var root=1;for(var i2=0;i2<deg;i2++){for(var j=0;j<r.length;j++){r[j]=gfMul(r[j],root);if(j+1<r.length)r[j]^=r[j+1]}root=gfMul(root,2)}return r}
 function rsRem(data,div){var r=div.map(function(){return 0});data.forEach(function(b){var f=b^r.shift();r.push(0);div.forEach(function(c,i){r[i]^=gfMul(c,f)})});return r}
 function alignPos(v){if(v===1)return [];var n=Math.floor(v/7)+2,step=v===32?26:Math.ceil((v*4+4)/(n*2-2))*2,res=[6];for(var p=v*4+10;res.length<n;p-=step)res.splice(1,0,p);return res}
 function encode(text,eccM){var e=eccM===false?1:2; /* 1=L, 2=M */ var bytes=Array.prototype.slice.call(new TextEncoder().encode(text)),v,cap;
  for(v=1;v<=40;v++){cap=dataCW(v,e)*8;var need=4+(v<10?8:16)+bytes.length*8;if(need<=cap)break}if(v>40)throw new Error('QR: muy largo');
  var bb=[],add=function(val,len){for(var i=len-1;i>=0;i--)bb.push((val>>>i)&1)};add(4,4);add(bytes.length,v<10?8:16);bytes.forEach(function(b){add(b,8)});
  add(0,Math.min(4,cap-bb.length));add(0,(8-bb.length%8)%8);for(var pad=0xEC;bb.length<cap;pad^=0xEC^0x11)add(pad,8);
  var data=[];for(var i=0;i<bb.length;i+=8){var x=0;for(var k=0;k<8;k++)x=(x<<1)|bb[i+k];data.push(x)}
  /* bloques y corrección */
  var nb=NB[v-1][e],ec=ECC_CW[v-1][e],raw=Math.floor(rawMod(v)/8),ns=nb-raw%nb,sl=Math.floor(raw/nb),div=rsDiv(ec),blocks=[],o=0;
  for(var b=0;b<nb;b++){var dat=data.slice(o,o+sl-ec+(b<ns?0:1));o+=dat.length;var eccb=rsRem(dat,div);if(b<ns)dat.push(0);blocks.push(dat.concat(eccb))}
  var fin=[];for(var i3=0;i3<blocks[0].length;i3++)blocks.forEach(function(bl,j){if(i3!==sl-ec||j>=ns)fin.push(bl[i3])});
  /* matriz */
  var sz=v*4+17,M=[],F=[];for(var y=0;y<sz;y++){M.push(new Array(sz).fill(false));F.push(new Array(sz).fill(false))}
  var set=function(x,y,d){M[y][x]=d;F[y][x]=true};
  for(var t=0;t<sz;t++){set(6,t,t%2===0);set(t,6,t%2===0)}
  var finder=function(x,y){for(var dy=-4;dy<=4;dy++)for(var dx=-4;dx<=4;dx++){var d=Math.max(Math.abs(dx),Math.abs(dy)),xx=x+dx,yy=y+dy;if(xx>=0&&xx<sz&&yy>=0&&yy<sz)set(xx,yy,d!==2&&d!==4)}};
  finder(3,3);finder(sz-4,3);finder(3,sz-4);
  var ap=alignPos(v),na=ap.length;for(var a=0;a<na;a++)for(var b2=0;b2<na;b2++){if((a===0&&b2===0)||(a===0&&b2===na-1)||(a===na-1&&b2===0))continue;for(var dy2=-2;dy2<=2;dy2++)for(var dx2=-2;dx2<=2;dx2++)set(ap[a]+dx2,ap[b2]+dy2,Math.max(Math.abs(dx2),Math.abs(dy2))!==1)}
  var fmtBits=function(mask){var d=(e===1?1:0)<<3|mask,rem=d;for(var i=0;i<10;i++)rem=(rem<<1)^((rem>>>9)*0x537);return ((d<<10)|rem)^0x5412};
  var drawFmt=function(mask){var bits=fmtBits(mask),g=function(i){return ((bits>>>i)&1)!==0};
   for(var i=0;i<=5;i++)set(8,i,g(i));set(8,7,g(6));set(8,8,g(7));set(7,8,g(8));for(var i2=9;i2<15;i2++)set(14-i2,8,g(i2));
   for(var i3=0;i3<8;i3++)set(sz-1-i3,8,g(i3));for(var i4=8;i4<15;i4++)set(8,sz-15+i4,g(i4));set(8,sz-8,true)};
  drawFmt(0);
  if(v>=7){var rem=v;for(var i5=0;i5<12;i5++)rem=(rem<<1)^((rem>>>11)*0x1F25);var vb=v<<12|rem;for(var i6=0;i6<18;i6++){var bt=((vb>>>i6)&1)!==0,aa=sz-11+i6%3,bb2=Math.floor(i6/3);set(aa,bb2,bt);set(bb2,aa,bt)}}
  /* datos en zigzag */
  var bi=0;for(var right=sz-1;right>=1;right-=2){if(right===6)right=5;for(var vert=0;vert<sz;vert++)for(var j2=0;j2<2;j2++){var xx=right-j2,up=((right+1)&2)===0,yy=up?sz-1-vert:vert;if(!F[yy][xx]&&bi<fin.length*8){M[yy][xx]=((fin[bi>>>3]>>>(7-(bi&7)))&1)!==0;bi++}}}
  /* máscara (se prueba cuál deja menos penalización) */
  var maskF=[function(x,y){return (x+y)%2===0},function(x,y){return y%2===0},function(x){return x%3===0},function(x,y){return (x+y)%3===0},function(x,y){return (Math.floor(x/3)+Math.floor(y/2))%2===0},function(x,y){return x*y%2+x*y%3===0},function(x,y){return (x*y%2+x*y%3)%2===0},function(x,y){return ((x+y)%2+x*y%3)%2===0}];
  var applyMask=function(m){for(var y=0;y<sz;y++)for(var x=0;x<sz;x++)if(!F[y][x]&&maskF[m](x,y))M[y][x]=!M[y][x]};
  var penal=function(){var p=0,run,c;for(var y=0;y<sz;y++){run=1;for(var x=1;x<sz;x++){if(M[y][x]===M[y][x-1]){run++;if(run===5)p+=3;else if(run>5)p++}else run=1}}
   for(var x2=0;x2<sz;x2++){run=1;for(var y2=1;y2<sz;y2++){if(M[y2][x2]===M[y2-1][x2]){run++;if(run===5)p+=3;else if(run>5)p++}else run=1}}
   for(var y3=0;y3<sz-1;y3++)for(var x3=0;x3<sz-1;x3++){c=M[y3][x3];if(c===M[y3][x3+1]&&c===M[y3+1][x3]&&c===M[y3+1][x3+1])p+=3}
   var dark=0;M.forEach(function(r){r.forEach(function(q){if(q)dark++})});p+=Math.floor(Math.abs(dark*20-sz*sz*10)/(sz*sz))*10;return p};
  var best=0,bp=1e9;for(var m=0;m<8;m++){applyMask(m);drawFmt(m);var pp=penal();if(pp<bp){bp=pp;best=m}applyMask(m)}
  applyMask(best);drawFmt(best);return {n:sz,m:M}}
 function svg(text,px,eccM){var q=encode(text,eccM),n=q.n,b=4,s='';for(var y=0;y<n;y++)for(var x=0;x<n;x++)if(q.m[y][x])s+='M'+(x+b)+','+(y+b)+'h1v1h-1z';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+(n+2*b)+' '+(n+2*b)+'" width="'+(px||160)+'" height="'+(px||160)+'" shape-rendering="crispEdges" role="img" aria-label="Código QR"><rect width="100%" height="100%" fill="#fff"/><path d="'+s+'" fill="#000"/></svg>'}
 function canvas(cx,text,x0,y0,px,eccM){var q=encode(text,eccM),n=q.n,c=Math.max(1,Math.floor(px/(n+8)));x0+=Math.floor((px-c*(n+8))/2);y0+=Math.floor((px-c*(n+8))/2);cx.fillStyle='#fff';cx.fillRect(x0,y0,px,px);cx.fillStyle='#000';for(var y=0;y<n;y++)for(var x=0;x<n;x++)if(q.m[y][x])cx.fillRect(Math.floor(x0+(x+4)*c),Math.floor(y0+(y+4)*c),Math.ceil(c),Math.ceil(c))}
 return {encode:encode,svg:svg,canvas:canvas}})();
/* código de verificación: si alguien cambia un número del corte, el código ya no coincide */
function verifCodigo(txt){var h=0x811C9DC5;for(var i=0;i<txt.length;i++){h^=txt.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}var s=(h>>>0).toString(36).toUpperCase();return ('000000'+s).slice(-6)}
/* ---------- impresora Bluetooth (ESC/POS) ---------- */
function natPl39(){var C=window.Capacitor;return C&&C.Plugins&&C.Plugins.RutaNativa||null}
function sinAcentos(s){return String(s==null?'':s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\x20-\x7E\n]/g,'')}
function escItems(items,qr){var cols=(S.impr&&S.impr.papel==='80')?48:32,B=[],put=function(s){for(var i=0;i<s.length;i++)B.push(s.charCodeAt(i)&255)},raw=function(a){B.push.apply(B,a)};
 raw([0x1B,0x40]);
 items.forEach(function(x){if(x.t==='hr'){put(new Array(cols+1).join('-')+'\n');return}
  if(x.t==='c'){raw([0x1B,0x61,1]);if(x.b)raw([0x1B,0x45,1]);put(sinAcentos(x.s).slice(0,cols*2)+'\n');if(x.b)raw([0x1B,0x45,0]);raw([0x1B,0x61,0]);return}
  var k=sinAcentos(x.k),v=sinAcentos(x.v);if(x.b)raw([0x1B,0x45,1]);if(k.length+v.length+1<=cols)put(k+new Array(cols-k.length-v.length+1).join(' ')+v+'\n');else put(k+'\n'+new Array(Math.max(1,cols-v.length+1)).join(' ')+v+'\n');if(x.b)raw([0x1B,0x45,0])});
 if(qr){var d=Array.prototype.slice.call(new TextEncoder().encode(qr)),L=d.length+3;raw([0x1B,0x61,1]);raw([0x1D,0x28,0x6B,4,0,0x31,0x41,0x32,0]);raw([0x1D,0x28,0x6B,3,0,0x31,0x43,cols>40?7:5]);raw([0x1D,0x28,0x6B,3,0,0x31,0x45,0x31]);raw([0x1D,0x28,0x6B,L&255,L>>8,0x31,0x50,0x30]);raw(d);raw([0x1D,0x28,0x6B,3,0,0x31,0x51,0x30]);raw([0x1B,0x61,0])}
 put('\n\n\n');raw([0x1D,0x56,0x42,0]);return new Uint8Array(B)}
function u8b64_39(u){var s='';for(var i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)}
function imprimirItems(items,qr){var n=natPl39(),im=S.impr||{};if(!n||!im.mac)return Promise.reject(new Error('sin impresora'));return n.btImprimir({mac:im.mac,base64:u8b64_39(escItems(items,qr))})}
var _imprOk39=imprOk;imprOk=function(){return !!(S.impr&&S.impr.mac)||_imprOk39.apply(this,arguments)};
var _tkI39=tkImprimir;tkImprimir=function(n){var r=_tkI39.apply(this,arguments);if(S.impr&&S.impr.mac)imprimirItems(notaItems(n)).then(function(){toast('Ticket impreso')},function(e){n.prOk=false;toast('No se pudo imprimir: revisa que la impresora esté prendida');render()});return r};
/* Ajustes: buscar y escoger la impresora */
function imprCardHTML(){if(!natPl39())return '';var im=S.impr||{},L=S.imprLista;
 return '<details class="card" data-k="ajimpr"'+(S.dOpen.ajimpr?' open':'')+'><summary><b>Impresora de tickets</b><span class="lbl">'+(im.mac?esc(im.nom||im.mac):'sin conectar')+'</span></summary>'
  +'<div class="lbl" style="margin-top:6px">Primero emparéjala en el Bluetooth del celular (la clave casi siempre es 0000 o 1234). Luego búscala aquí.</div>'
  +'<button class="btn sec" style="margin-top:8px" data-act="imprbusca">Buscar impresoras</button>'
  +(L&&L.length?L.map(function(d){return '<button class="btn sm'+(im.mac===d.mac?'':' sec')+'" style="margin-top:6px" data-act="imprpon" data-mac="'+esc(d.mac)+'" data-nom="'+esc(d.nombre||'')+'">'+(im.mac===d.mac?'✓ ':'')+esc(d.nombre||d.mac)+'</button>'}).join(''):(L?'<div class="lbl" style="margin-top:6px">No hay aparatos emparejados.</div>':''))
  +(im.mac?'<button class="btn sm sec" style="margin-top:8px" data-act="imprprueba">Imprimir prueba</button><button class="link" style="margin-top:4px" data-act="imprquita">Quitar impresora</button>':'')+'</details>'}
/* ajHTML: pasó a tema-ajustes.js */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,n=natPl39();
 if(a==='imprbusca'){e.stopImmediatePropagation();if(!n)return;n.btLista().then(function(r){S.imprLista=r.lista||[];render()},function(er){toast(er&&er.message?er.message:'No se pudo buscar')});return}
 if(a==='imprpon'){e.stopImmediatePropagation();S.impr=S.impr||{papel:'58',auto:false};S.impr.mac=b.dataset.mac;S.impr.nom=b.dataset.nom;toast('Impresora lista: '+(b.dataset.nom||''));render();return}
 if(a==='imprquita'){e.stopImmediatePropagation();if(S.impr){delete S.impr.mac;delete S.impr.nom}render();return}
 if(a==='imprprueba'){e.stopImmediatePropagation();imprimirItems([{t:'c',s:S.cfg.nombre||'Ruta Fácil',b:1},{t:'c',s:'Prueba de impresión'},{t:'hr'},{t:'kv',k:'Fecha',v:fmtF(iso(TODAY))+' '+hhmm()},{t:'kv',k:'Acentos',v:'Plátano maduro'}],'Ruta Facil').then(function(){toast('Listo, ¿salió el ticket?')},function(er){toast('No se pudo imprimir: '+(er&&er.message||''))});return}},true);
