import 'module-alias/register';
import express from 'express';
import https from 'https';
import socket from 'socket.io';
import chat from './chat';
import setConfig from './config';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
const cert = fs.readFileSync(path.join(__dirname, '../cert/cert.pem'));
const key = fs.readFileSync(path.join(__dirname, '../cert/key.pem'));
const options = { key, cert };

const server = https.createServer(options, app);
const io = socket(server);
const port = 5050;

const PATH_ENV =
  dotenv.config({ path: path.join(process.cwd(), '/bin/.env') }).parsed || {};

mongoose
  .connect(`mongodb://localhost:27017/sweet`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: PATH_ENV.DATA_BASE_SWEET_ACCOUNT,
    pass: PATH_ENV.DATA_BASE_SWEET_PASSWORD,
  })
  .then(() => {
    //配置文件
    setConfig(app);

    //聊天组件
    chat(io);

    server.listen(port, () =>
      console.log(`server is running at https://127.0.0.1:${port}`)
    );
    server.on('secureConnection', (socket) => {
      socket.setTimeout(30 * 1000);
    });
  });
