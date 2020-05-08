import socket from 'socket.io';
function chat(io: socket.Server) {
  io.on('connection', (socket) => {
    socket.on('chat', (data: any) => {
      const roomId = [data.sendId, data.receiveId]
        .sort()
        .reduce((pre, curr) => pre + curr);
      socket.join(roomId);
      io.to(roomId).emit('back', data);
    });
    socket.on('disconnect', () => {
      // console.log('a clent disconnect');
    });
  });
}

export default chat;
