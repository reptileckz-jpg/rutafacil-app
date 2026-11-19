/* 148 · errores a la nube · 149 · aviso de versión nueva · 151 · batería · 152 · precio menor al mayoreo con permiso y aviso al admin ·
   158 · "Entrar" con los nombres que ya entraron en este celular (solo la contraseña). La nube y el celular se simulan. */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('dialog',d=>d.accept());
await p.addInitScript(()=>{window.__pnTest=1;window.__hora93=11;window.__nat={bat:false,pide:0,abre:[]};
 window.Capacitor={Plugins:{RutaNativa:{pushToken:function(){return Promise.resolve({token:'TOKEN-ADMIN'})},bateriaEstado:function(){return Promise.resolve({libre:window.__nat.bat})},bateriaPide:function(){window.__nat.pide++;window.__nat.bat=true;return Promise.resolve({})}}}};
 window.open=function(u){window.__nat.abre.push(u);return null};
 window.fetch=function(u){window.__fetch=u;return Promise.resolve({ok:true,json:function(){return Promise.resolve({tag_name:'v1.0.52',assets:[{name:'RutaFacil-1.0.52.apk',browser_download_url:'https://github.com/x/releases/download/v1.0.52/RutaFacil-1.0.52.apk'}]})}})};
 try{localStorage.clear()}catch(e){}});
await p.goto('file:///mnt/user-data/outputs/platanos-primera-vez.html');await p.waitForTimeout(900);const ev=(f,a)=>p.evaluate(f,a),W=ms=>p.waitForTimeout(ms);let r;
await ev(()=>{var U=S.setup;U.veh=[{n:'Camioneta Uno',pl:'AAA1',plEdo:'Baja California',comb:'Gasolina',img:0,odo:1000}];U.per=[{n:'Danu',puesto:'chofer',tel:'1'}];U.cli=[{n:'Doña Mary',a:'x',tel:'6640000001',dias:[0,1,2,3,4,5,6],cred:0,vac:0,ch:'0'}];U.prov=[];S.precio.R=275;S.precio.M=20;suAplicar();
 window.__esc=[];NB.on=true;NB.listo=true;NB.est='listo';NB.neg='pn';NB.ad=Object.assign({},NB.ad||{},{set:function(path,obj){window.__esc.push({path:path,obj:JSON.parse(JSON.stringify(obj))});return Promise.resolve()}});
 S.role='admin';S.pinOk[pinKey()]=true;S.tutVisto={rep:true,admin:true}});

/* ---------- 148 ---------- */
r=await ev(()=>{window.__esc=[];apErr('error interno','x is not a function','Chofer · Ruta');apErr('error interno','x is not a function','Chofer · Ruta');
 return new Promise(res=>setTimeout(()=>res(window.__esc.filter(x=>/\/err\//.test(x.path))),400))});
ok(r.length===1&&/^n\/pn\/err\//.test(r[0].path),'148 · el error se manda solo a la nube (una vez, aunque se repita)',r.map(x=>x.path));
ok(r[0]&&Object.keys(r[0].obj).sort().join(',')==='apk,ch,donde,f,h,rol,t,tipo,txt,web'&&r[0].obj.txt==='x is not a function'&&r[0].obj.web==='10.12','con la versión, el papel y la pantalla (solo los campos que dejan las reglas)',r[0]&&r[0].obj);
r=await ev(()=>{NB.listo=false;window.__esc=[];apErr('error interno','otro error','Inicio');var n1=ERR148.cola.length;NB.listo=true;err148Manda();return new Promise(res=>setTimeout(()=>res([n1,window.__esc.filter(x=>/\/err\//.test(x.path)).length,ERR148.cola.length]),400))});
ok(r[0]===1&&r[1]===1&&r[2]===0,'sin nube se guarda en el celular y se manda después',r);

/* ---------- 149 ---------- */
r=await ev(()=>{APP_VER='1.0.51';try{localStorage.removeItem('nv149')}catch(e){}NV149.rev=0;nv149Revisa(true);return new Promise(res=>setTimeout(()=>{S.tab.admin='inicio';render();var c=document.querySelector('main [data-k="nv149"]');res({f:window.__fetch,t:c?c.innerText:''})},300))});
ok(/api\.github\.com\/repos\/reptileckz-jpg\/rutafacil-app\/releases\/latest/.test(r.f)&&/Hay una versión nueva/.test(r.t)&&/1\.0\.52/.test(r.t)&&/1\.0\.51/.test(r.t),'149 · revisa GitHub y avisa que hay versión nueva (1.0.52; tiene la 1.0.51)',r);
r=await ev(()=>{document.querySelector('main [data-act="nv149baja"]').click();return window.__nat.abre.slice(-1)[0]});ok(/RutaFacil-1\.0\.52\.apk$/.test(r),'"Descargar" abre el APK nuevo',r);
r=await ev(()=>{document.querySelector('main [data-act="nv149x"]').click();return !!document.querySelector('main [data-k="nv149"]')});ok(!r,'"Después" la esconde hasta mañana');
r=await ev(()=>{APP_VER='1.0.52';try{localStorage.removeItem('nv149x')}catch(e){}render();return !!document.querySelector('main [data-k="nv149"]')});ok(!r,'con la versión al día no sale nada');
r=await ev(()=>{var d=corteDatos();var L=tkCorte143(d);return [d.ver,L.slice(-1)[0].s]});ok(r[0]==='app 10.12 · APK 1.0.52'&&/Hecho con la app 10\.11 · APK 1\.0\.52/.test(r[1]),'el corte dice con qué versión se hizo',r);

/* ---------- 151 ---------- */
r=await ev(()=>{BAT151.rev=0;bat151Revisa();return new Promise(res=>setTimeout(()=>{S.tab.admin='inicio';render();var c=document.querySelector('main [data-k="bat151"]');res(c?c.innerText:'')},300))});
ok(/funcione en segundo plano/.test(r)&&/no te llegan los avisos con la app cerrada/.test(r),'151 · si Android puede apagar la app, sale la tarjeta para permitirlo',r.slice(0,120));
r=await ev(()=>{document.querySelector('main [data-act="bat151si"]').click();return new Promise(res=>setTimeout(()=>{render();res([window.__nat.pide,!!document.querySelector('main [data-k="bat151"]')])},1900))});
ok(r[0]===1&&!r[1],'"Permitir" abre la ventana de Android y ya permitido, la tarjeta se quita',r);

/* ---------- 152 ---------- */
r=await ev(()=>{S.mayP={R:'250',M:'18'};var D=S.choferes.filter(c=>c.n==='Danu')[0];window.__D=D.id;S.role='rep';S.chofHoy=D.id;var c=S.cli[0];
 var d1={R:10,M:0,may:true,pRm:'250',pMm:''},d2={R:10,M:0,may:true,pRm:'230',pMm:''};return [mayNecesitaPerm(c,d1),mayNecesitaPerm(c,d2),D.mayPerm||false]});
ok(r[0]===false&&r[1]===true&&!r[2],'152 · precio de mayoreo: sin permiso · precio MENOR al de mayoreo: pide permiso (aunque el chofer no esté marcado)',r);
r=await ev(()=>{var c=S.cli[0];S.stops=[{c:c.id,done:false}];S.cur=0;S.d={R:10,M:0,V:0,may:true,pRm:'230',pMm:'',mode:'todo'};var h=mayNotaHTML();var v=entValida();return [h,v]});
ok(/Ese precio es menor que el de mayoreo \(\$250 la caja\): necesitas permiso del administrador/.test(r[0])&&/maypide/.test(r[0]),'en la entrega: "Ese precio es menor que el de mayoreo" y el botón Pedir permiso',r[0].slice(0,200));
ok(Array.isArray(r[1])&&/Pide permiso/.test(r[1][1]),'no deja guardar sin permiso',r[1]);
r=await ev(()=>{window.__esc=[];var c=S.cli[0];mayPideL().push({c:c.id,ch:+S.chofHoy,f:iso(TODAY),t:Date.now(),est:'pend',R:10,M:0,pR:230,pM:0});S.permisos=(S.permisos||[]).concat([{c:c.id,ch:+S.chofHoy,est:'pend',f:iso(TODAY)}]);render();render();
 return window.__esc.filter(x=>/\/push\//.test(x.path)).map(x=>x.obj)});
ok(r.length===2&&r.every(x=>x.ch==='admins'&&x.tipo==='permiso')&&/Danu pide permiso de precio/.test(r.map(x=>x.titulo).join('|'))&&/10 cajas a \$230/.test(r.map(x=>x.texto).join('|'))&&/pide permiso para fiar/.test(r.map(x=>x.titulo).join('|')),'cada permiso que pide (precio y fiar) le llega al celular del administrador, una sola vez',r);
ok(r.every(x=>Object.keys(x).sort().join(',')==='ch,t,texto,tipo,titulo'),'solo los campos que dejan las reglas');
r=await ev(()=>{var c=S.cli[0];var p0=mayPideL().slice(-1)[0];p0.est='ok';S.d={R:10,M:0,V:0,may:true,pRm:'230',pMm:'',mode:'todo'};var a=entValida();S.d.pRm='200';var b2=mayPideDe(c.id);return [a===''||a==null||!Array.isArray(a)||!/permiso/i.test(a[1]||''),b2]});
ok(r[0]&&r[1]===null,'con permiso sí deja; si después baja más el precio, pide permiso otra vez',r);
r=await ev(()=>{S.role='admin';NB.perfil={rol:'admin',activo:true};NB.user={uid:'U1'};_pa152.k='';window.__esc=[];pushRegistraAdm152();return new Promise(res=>setTimeout(()=>res(window.__esc.filter(x=>/\/tok\//.test(x.path)).map(x=>[x.path,x.obj.t])),300))});
ok(r.length===1&&r[0][0]==='n/pn/tok/a~U1'&&r[0][1]==='TOKEN-ADMIN','el celular del administrador registra su token para los permisos (tok/a~uid)',r);

/* ---------- 158 ---------- */
r=await ev(()=>{NB.perfil={rol:'chofer',activo:true,nombre:'Danu',usuario:'danu',chId:window.__D};NB.user={uid:'U2',email:'danu.x@rutafacil.app'};rec158Guarda();
 NB.perfil={rol:'admin',activo:true,nombre:'Ricardo Nieto'};NB.user={uid:'U1',email:'ricardo@gmail.com'};rec158Guarda();return rec158L()});
ok(r.length===2&&r[0].n==='Ricardo Nieto'&&r[0].u==='ricardo@gmail.com'&&r[1].n==='Danu'&&r[1].u==='danu'&&!JSON.stringify(r).match(/pw|contra/i),'158 · el celular recuerda quién entró (usuario y nombre, nunca la contraseña), el último primero',r);
r=await ev(()=>{window.__login=[];NB.ad.get=function(pa){return Promise.resolve(pa==='usuarios/danu'?{email:'danu.x@rutafacil.app'}:null)};NB.ad.login=function(em,pw){window.__login.push([em,pw]);return Promise.resolve()};
 NB.listo=false;NB.est='login';NBF.modo='entrar';_nbSig='';nbPantalla();var o=document.getElementById('nbov');return o?o.innerText:''});
ok(/¿Quién eres\?/.test(r)&&/Ricardo Nieto/.test(r)&&/Danu/.test(r)&&/Otra persona/.test(r)&&!/Usuario o correo/.test(r),'al cerrar sesión: "¿Quién eres?" con los nombres (ya no pide el correo)',r.slice(0,200));
r=await ev(()=>{document.querySelector('#nbov [data-nb="rec158"][data-i="1"]').click();var o=document.getElementById('nbov');return o.innerText});
ok(/Hola, Danu/.test(r)&&/Contraseña/.test(r)&&!/Usuario o correo/.test(r)&&/No soy Danu/.test(r),'toca su nombre: "Hola, Danu" y solo la contraseña',r.slice(0,200));
r=await ev(()=>{document.getElementById('nbp').value='secreta1';document.querySelector('#nbov [data-nb="entrar"]').click();return new Promise(res=>setTimeout(()=>res(window.__login),300))});
ok(r.length===1&&r[0][0]==='danu.x@rutafacil.app'&&r[0][1]==='secreta1','entra con su usuario guardado y la contraseña que escribió',r);
r=await ev(()=>{NBF.ocupado=false;NBF158.i=null;_nbSig='';nbPantalla();document.querySelector('#nbov [data-nb="otro158"]').click();return document.getElementById('nbov').innerText});
ok(/Usuario o correo/.test(r),'"Otra persona": la pantalla de siempre (usuario o correo)');
r=await ev(()=>{NBF158.otro=false;NBF158.i=null;_nbSig='';nbPantalla();document.querySelector('#nbov [data-nb="rec158"][data-i="0"]').click();document.querySelector('#nbov [data-nb="rec158q"]').click();return [rec158L().length,document.getElementById('nbov').innerText]});
ok(r[0]===1&&!/Ricardo Nieto/.test(r[1]),'"Quitar de este celular" lo borra de la lista',r);
r=await ev(()=>{NB.est='listo';NB.listo=true;nbPantalla();return !!document.getElementById('nbov')});ok(!r,'ya adentro, la pantalla se quita');
ok(!errs.length,'sin errores',errs);
console.log(nOK+' OK · '+nF+' FAIL');await b.close()})();
