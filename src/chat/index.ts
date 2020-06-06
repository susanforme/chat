import socket from 'socket.io';
import { updateRoom } from '@/controllers/room';
import sharedSession from 'express-socket.io-session';
import { mySession } from '@/config';

function chat(io: socket.Server) {
  io.use(sharedSession(mySession, { autoSave: true }));
  io.on('connection', (socket) => {
    //session不存在断开连接
    if (!socket.handshake.session?.userName) {
      // socket.disconnect(true);
      console.log(socket.handshake.session?.userName);
    }
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
      updateRoom(body)
        .then(() =>
          console.log(
            `roomId 为${roomId}的聊天记录已经保存${new Date().toLocaleString()}`
          )
        )
        .catch(() =>
          console.log(
            `roomId 为${roomId}的聊天记录保存失败${new Date().toLocaleString()}`
          )
        );
    });
    socket.on('disconnect', () => {
      console.log(
        `username 为${
          socket.handshake.session?.userName
        } 的客户端已经断开${new Date().toLocaleString()}`
      );
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
