import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const files={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js'};const file=files[name];if(!file){res.writeHead(404);res.end('Not found');return;}res.setHeader('Content-Type',{'index.html':'text/html; charset=utf-8','style.css':'text/css; charset=utf-8','app.js':'text/javascript; charset=utf-8'}[file]);res.end(fs.readFileSync(path.join(root,file)));}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
