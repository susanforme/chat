import socket from 'socket.io';
function chat(io: socket.Server) {
  io.on('connection', (socket) => {
    socket.on('chat', (msg: any) => {
      msg.id = socket.id;
      io.emit('back', msg);
    });
    socket.on('disconnect', () => {
      console.log('a clent disconnect');
    });
  });
}

export default chat;
