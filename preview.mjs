import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {handleStory} from './lib/story-api.mjs';
const root=path.resolve('public');
http.createServer(async(req,res)=>{try{const url='http://127.0.0.1:4173'+req.url,name=new URL(url).pathname;if(name==='/api/story'||name==='/api/model'){let body='';for await(const part of req){body+=part;if(body.length>80000){res.writeHead(413);res.end();return;}}const r=await handleStory(new Request(url,{method:req.method,headers:req.headers,...(req.method==='POST'?{body}:{})}),process.env);res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()));return;}const files={'/':'workspace.html','/style.css':'style.css','/app.js':'app.js','/model.js':'model.js'};const file=files[name];if(!file){res.writeHead(404);res.end('Not found');return;}res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8');res.end(fs.readFileSync(path.join(root,file)));}catch{res.writeHead(500);res.end('Preview error');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
