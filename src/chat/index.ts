import socket from 'socket.io';
import { updateRoom } from '@/controllers/room';

function chat(io: socket.Server) {
  io.on('connection', (socket) => {
    socket.on('chat', (data: uploadMsg) => {
      const userIds = [data.send, data.receive];
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
      updateRoom(body, (err: any) => {
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
  send: string;
  receive: string;
  msg: string;
  createTime?: string;
  userIds?: string[];
}
