/* Vite · el armado nuevo (fuente/vite/armar.mjs, "npm run build", "npm run dev") da EXACTAMENTE la misma app y se detiene si algo está mal.
   Uso: node fuente/pruebas/tvite.js   (desde cualquier carpeta) */
const path=require('path'),fs=require('fs'),os=require('os'),{execSync}=require('child_process');
const R=path.resolve(__dirname,'../..');let nOK=0,nF=0;const ok=(c,m,x)=>{c?nOK++:nF++;console.log((c?'OK   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
(async()=>{const A=await import(path.join(R,'fuente/vite/armar.mjs'));const parches=(await import(path.join(R,'fuente/vite/parches.mjs'))).default;
 const a=A.armar(),b=A.armar();
 ok(a.demo===b.demo&&a.real===b.real&&a.www===b.www,'armar dos veces da lo mismo (no se queda con la librería de la primera vez)');
 ok(/APP_VER='\d+\.\d+'/.test(a.demo)&&a.demo.indexOf('//@@capa tema-version.js')>-1&&/var CAPAS77=\[\[\d+,"l1\.js"\]/.test(a.demo),'trae todas las capas, la versión y el mapa de errores');
 ok(a.real.indexOf('window.PN_MODO="vacio"')>-1&&a.demo.indexOf('window.PN_MODO="vacio"')<0,'la real tiene PN_MODO="vacio" y la demo no');
 ok(['leaflet/leaflet.js','firebase.js','mapas-cfg.js','mapas.js'].every(x=>a.www.indexOf('<script src="'+x+'">')>-1),'la del APK trae Leaflet, Firebase y mapas');
 const out=path.join(os.tmpdir(),'tvite-'+process.pid);
 execSync('node '+JSON.stringify(path.join(R,'fuente/vite/armar.mjs'))+' '+JSON.stringify(out));
 ok(fs.readFileSync(path.join(out,'prototipo-platanos.html'),'utf8')===a.demo&&fs.readFileSync(path.join(out,'www-index.html'),'utf8')===a.www,'"npm run armar" escribe lo mismo');
 ok(fs.readFileSync(path.join(R,'www/index.html'),'utf8')===a.www,'www/index.html (lo que lleva el APK) es igual a lo que arma Vite');
 /* un cambio de texto que ya no encuentra lo que busca: se detiene */
 let e1='';try{A.armar({parches:parches.concat([['R','ESTO-NO-EXISTE-EN-LA-BASE','x',1]])})}catch(e){e1=e.message}
 ok(/^FALLÓ EL ARMADO: el cambio esperaba 1 y encontró 0/.test(e1),'si un cambio no encuentra su texto: "FALLÓ EL ARMADO"',e1.slice(0,80));
 /* una capa con error de sintaxis: se detiene */
 const cp=path.join(os.tmpdir(),'tvite-capas-'+process.pid);fs.mkdirSync(cp,{recursive:true});const C=path.join(R,'fuente/capas');
 fs.readdirSync(C).filter(f=>/\.(js|json)$/.test(f)).forEach(f=>fs.copyFileSync(path.join(C,f),path.join(cp,f)));fs.appendFileSync(path.join(cp,'tema-version.js'),'\nfunction roto({\n');
 let e2='';try{A.armar({capas:cp})}catch(e){e2=e.message}
 ok(/^FALLÓ EL ARMADO: el script tiene un error de sintaxis/.test(e2),'si una capa tiene un error de sintaxis: "FALLÓ EL ARMADO"',e2.slice(0,80));
 /* vite build */
 const w0=fs.readFileSync(path.join(R,'www/index.html'),'utf8');let vb='';
 try{vb=execSync('npx vite build --config fuente/vite/vite.config.mjs 2>&1',{cwd:R}).toString()}catch(e){vb='ERR '+e.message}
 const D=path.join(R,'dist-vite');const L=fs.existsSync(D)?fs.readdirSync(D).sort():[];
 ok(JSON.stringify(L)===JSON.stringify(['platanos-primera-vez.html','prototipo-platanos.html','www-index.html']),'vite build deja las tres versiones (y nada más)',L);
 ok(L.length===3&&fs.readFileSync(path.join(D,'prototipo-platanos.html'),'utf8')===a.demo&&fs.readFileSync(path.join(D,'platanos-primera-vez.html'),'utf8')===a.real&&fs.readFileSync(path.join(D,'www-index.html'),'utf8')===a.www,'vite build: idéntico byte por byte (demo, real y APK)');
 ok(fs.readFileSync(path.join(R,'www/index.html'),'utf8')===w0,'vite build deja www/index.html igual');
 fs.rmSync(out,{recursive:true,force:true});fs.rmSync(cp,{recursive:true,force:true});
 console.log(nOK+' OK · '+nF+' FAIL')})();
