import Record from '../database/record';

export function updateRecord(uploadData: uploadMsg, callback: Function) {
  const { roomId, send, receive, msg, createTime } = uploadData;
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

interface Room {
  roomId: string;
  createTime: string;
  record: RecordList;
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
