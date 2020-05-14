import Room from '@/models/room';
import Record from '@/models/record';

export async function updateRoom(uploadData: uploadMsg) {
  const { roomId, send, receive, msg } = uploadData;
  const record = new Record({ roomId, send, receive, msg });
  const product = await record.save();
  await Room.findOneAndUpdate(
    { roomId },
    { $push: { record: product.id }, users: [send, receive] },
    { setDefaultsOnInsert: true, upsert: true }
  );
  return;
}

export async function queryPersonalChatList(id: string) {
  const data = await Room.find({ users: id }, 'users').populate('users', {
    headImg: 1,
    userName: 1,
    id: 1,
  });
  const body = data.map((v) => {
    return v.users.filter((v) => v.id !== id)[0];
  });
  return body;
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
