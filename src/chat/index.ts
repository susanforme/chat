import socket from 'socket.io';
function chat(io: socket.Server) {
  io.on('connection', (socket) => {
    socket.on('chat', (msg: any) => {
      io.emit('back', msg);
    });
    socket.on('disconnect', () => {
      console.log('a clent disconnect');
    });
  });
}

export default chat;
