import express from 'express';
import router from './routes';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);
app.use(router);

io.on('connection', (socket) => {
  socket.on('chat', (msg: any) => {
    console.log(msg);
    io.emit('back', msg);
  });
  socket.on('disconnect', () => {
    console.log('a clent disconnect');
  });
});
server.listen(5050, () =>
  console.log('server is running at http://localhost:5050')
);
