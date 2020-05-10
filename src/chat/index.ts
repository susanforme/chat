import socket from 'socket.io';
import { updateRecord } from '@/api/record';

function chat(io: socket.Server) {
  io.on('connection', (socket) => {
    socket.on('chat', (data: uploadMsg) => {
      const roomId = [data.send.id, data.receive.id]
        .sort()
        .reduce((pre, curr) => pre + curr);
      socket.join(roomId);
      io.to(roomId).emit('back', { status: 1, data });
      const body = { ...data, createTime: new Date().toLocaleString(), roomId };
      updateRecord(body, (err: any, data: any) => {
        if (err) {
          return console.log(`roomId 为${roomId}的聊天记录保存失败`);
        }
        console.log(`roomId 为${roomId}的聊天记录已经保存`);
      });
    });
    socket.on('disconnect', () => {
      // console.log('a clent disconnect');
    });
  });
}

export default chat;

interface uploadMsg {
  roomId?: string;
  send: {
    id: string;
    userName: string;
  };
  receive: {
    id: string;
    userName: string;
  };
  msg: string;
  createTime?: string;
}
