/* 167 · Inicio "Bento Glossy 3D": la clase .ini167 en Inicio del admin, emojis → ilustraciones SOLO en el texto (no en atributos ni
   campos), la entrada sale solo al llegar (no en cada redibujado), los datos y botones siguen iguales, y fuera de Inicio no se aplica. */
const {chromium}=require('playwright');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=12});
await p.goto('file:///mnt/user-data/outputs/prototipo-platanos.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a);let r;
await ev(()=>{S.tutVisto={rep:true,admin:true};S.popVisto={admin:iso(TODAY),cont:iso(TODAY)};S.role='admin';S.pinOk[pinKey()]=true;S.tab.admin='cargas';render()});
/* lo que hay en Inicio SIN el tema (para comparar que no se pierde nada) */
r=await ev(()=>{S.tab.admin='inicio';var _i=ini167;ini167=function(){};render();var m=document.querySelector('main');var o={acts:[...m.querySelectorAll('[data-act]')].map(x=>x.dataset.act).join(','),txt:m.innerText.replace(/💰|🍌|🚚|📅|🏠|📦|⏳/g,'').replace(/\s+/g,' ').trim()};ini167=_i;window.__antes=o;return o.acts.length});
r=await ev(()=>{S.tab.admin='cargas';render();S.tab.admin='inicio';render();var m=document.querySelector('main');return {clase:m.className,in:m.classList.contains('ini167in'),acts:[...m.querySelectorAll('[data-act]')].map(x=>x.dataset.act).join(','),txt:m.innerText.replace(/\s+/g,' ').trim(),ic:m.querySelectorAll('.ic3d167[role="img"]').length,emo:(m.innerText.match(/💰|🍌|🚚|📅|🏠|📦|⏳/g)||[]).length,sprite:!!document.getElementById('defs167')}});
ok(/ini167/.test(r.clase)&&r.in&&r.ic>0&&r.emo===0&&r.sprite,'al llegar a Inicio: estilo 167, entrada animada, emojis → ilustraciones 3D (con su degradado)',r);
const A0=await ev(()=>window.__antes.acts);ok(r.acts===A0,'los mismos botones (data-act) que sin el tema');
ok(r.txt===(await ev(()=>window.__antes.txt)),'el mismo texto y números que sin el tema (solo cambian los emojis)');
r=await ev(()=>{var m=document.querySelector('main');var mal=[...m.querySelectorAll('*')].some(x=>[...x.attributes].some(a=>a.name!=='class'&&/<span|ic3d167/.test(a.value)));var inp=[...m.querySelectorAll('input,textarea')].some(x=>/ic3d167/.test(x.value));return [mal,inp]});
ok(!r[0]&&!r[1],'ningún atributo ni campo tocado',r);
r=await ev(()=>{render();return document.querySelector('main').classList.contains('ini167in')});ok(r===false,'al volver a dibujar sin cambiar de pantalla: sin animación de entrada (no parpadea)');
r=await ev(()=>{S.tab.admin='clientes';render();return document.querySelector('main').className});ok(!/ini167/.test(r),'en otras pantallas no se aplica',r);
r=await ev(()=>{S.tab.admin='mas';render();var a=document.querySelector('.mas166').classList.contains('quieto167');render();var b2=document.querySelector('.mas166').classList.contains('quieto167');return [a,b2]});ok(r[0]===false&&r[1]===true,'"Más": su entrada sale al llegar y no en cada redibujado',r);
ok(!errs.length,'sin errores',errs);console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
