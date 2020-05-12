import socket from 'socket.io';
import { updateRecord } from '@/controllers/record';

function chat(io: socket.Server) {
  io.on('connection', (socket) => {
    socket.on('chat', (data: uploadMsg) => {
      const userIds = [data.send.id, data.receive.id];
      const roomId = userIds.sort().reduce((pre, curr) => pre + curr);
      socket.join(roomId);
      io.to(roomId).emit('back', {
        status: 1,
        data: { ...data, createTime: new Date().toLocaleString() },
      });
      const body = {
        ...data,
        createTime: new Date().toLocaleString(),
        roomId,
        userIds,
      };
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
  userIds?: string[];
}
