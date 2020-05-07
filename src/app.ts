import express from 'express';
import http from 'http';
import socket from 'socket.io';
import chat from './chat';
import setConfig from './config';

const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = 5050;

//聊天组件
chat(io);

//配置文件
setConfig(app);

server.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
