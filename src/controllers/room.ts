import Room from '@/models/room';
import Record from '@/models/record';

export function updateRoom(uploadData: uploadMsg, callback: Function) {
  const { roomId, send, receive, msg } = uploadData;
  const record = new Record({ roomId, send, receive, msg });
  record.save((err, product) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    Room.findOneAndUpdate(
      { roomId },
      { $push: { record: product.id }, users: [send, receive] },
      { setDefaultsOnInsert: true, upsert: true },
      (err) => {
        if (err) {
          return callback({ status: 0, data: { msg: '服务器内部错误' } });
        }
        callback(null);
      }
    );
  });
}

export function queryPersonalChatList(id: string, callback: Function) {
  Room.find({ users: id }, 'users')
    .populate('users', { headImg: 1, userName: 1, id: 1 })
    .exec((err, data) => {
      if (err) {
        return callback({ status: 0, data: { msg: '服务器内部错误' } });
      }
      const body = data.map((v) => {
        return v.users.filter((v) => v.id !== id)[0];
      });
      callback(null, body);
    });
}

export function queryPersonalHistoryChat(roomId: string, callback: Function) {
  Record.find({ roomId })
    .populate('send', { userName: 1, id: 1, headImg: 1 })
    .populate('receive', { userName: 1, id: 1, headImg: 1 })
    .exec((err, data) => {
      if (err) {
        return callback({ status: 0, data: { msg: '服务器内部错误' } });
      }
      const body = data.map((v) => {
        const { createTime, msg, send, receive } = v;
        return { createTime, msg, send, receive };
      });
      callback(null, body);
    });
}

interface uploadMsg {
  roomId: string;
  send: string;
  receive: string;
  msg: string;
  createTime: string;
}
