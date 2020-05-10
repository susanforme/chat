import 'module-alias/register';
import express from 'express';
import https from 'https';
import socket from 'socket.io';
import chat from './chat';
import setConfig from './config';
import path from 'path';
import fs from 'fs';

const app = express();
const cert = fs.readFileSync(path.join(__dirname, '../cert/cert.pem'));
const key = fs.readFileSync(path.join(__dirname, '../cert/key.pem'));
const options = { key, cert };

const server = https.createServer(options, app);
const io = socket(server);
const port = 443;

//聊天组件
chat(io);

//配置文件
setConfig(app);

server.listen(port, () =>
  console.log(`server is running at https://127.0.0.1:${port}`)
);
