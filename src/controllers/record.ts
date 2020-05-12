import Record from '@/models/record';

export function updateRecord(uploadData: uploadMsg, callback: Function) {
  const { roomId, send, receive, msg, createTime, userIds } = uploadData;
  Record.findOne({ roomId: uploadData.roomId }, (err, data: Room) => {
    if (err) {
      return callback({ status: 0, data: { msg: '网络错误' } });
    } else if (data) {
      return Record.updateOne(
        { roomId: data.roomId },
        { record: [...data.record, { send, receive, msg, createTime }] },
        (err, raw) => {
          if (err) {
            return callback({ status: 0, data: { msg: '网络错误' } });
          }
          return callback(null, raw);
        }
      );
    }
    const record = new Record({
      roomId,
      userIds,
      record: [{ send, receive, msg, createTime }],
    });
    record.save((err, data) => {
      if (err) {
        console.log(err);
        return callback({ status: 0, data: { msg: '服务器错误' } });
      }
      callback(null, data);
    });
  });
}

export function queryPersonalChatList(id: string, callback: Function) {
  Record.find({ userIds: id }, 'userIds', (err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    const body = data.map((v) => {
      return v.userIds.filter((v) => v !== id)[0];
    });
    callback(null, body);
  });
}

export function queryPersonalHistoryChat(
  userIds: string[],
  callback: Function
) {
  const roomId = userIds.sort().reduce((pre, cur) => pre + cur);
  Record.findOne({ roomId }, 'record', (err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    callback(null, data);
  });
}

interface Room {
  roomId: string;
  createTime: string;
  record: RecordList;
  userIds: string[];
}

interface uploadMsg {
  roomId: string;
  send: {
    id: string;
    userName: string;
  };
  receive: {
    id: string;
    userName: string;
  };
  msg: string;
  createTime: string;
  userIds: string[];
}

type RecordList = {
  send: {
    id: string;
    userName: string;
  };
  receive: {
    id: string;
    userName: string;
  };
  msg: string;
  createTime: string;
}[];
