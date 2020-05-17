import Room from '@/models/room';
import Record from '@/models/record';
import mongoose from 'mongoose';

/**
 * 新建房间或直接插入聊天记录
 * @param uploadData
 */
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

/**
 * 根据id查询聊天列表
 * @param id
 */
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

/**
 * 查询两个人之间的历史聊天记录
 * @param roomId
 */
export async function queryPersonalHistoryChat(roomId: string) {
  const data = await Record.find({ roomId })
    .populate('send', { userName: 1, id: 1, headImg: 1 })
    .populate('receive', { userName: 1, id: 1, headImg: 1 });
  const body = data.map((v) => {
    const { createTime, msg, send, receive } = v;
    return { createTime, msg, send, receive };
  });
  return body;
}

//后台所需

/**
 * 分页查询
 */
export async function queryPagtionRoom(id: string, isNext: boolean) {
  if (id === '1') {
    const data = await Room.find({})
      .populate('users', { userName: 1, _id: 1 })
      .sort({ _id: 1 })
      .limit(10);
    return data;
  }
  let method;
  if (isNext) {
    method = { $gt: id };
  } else {
    method = { $lt: id };
  }
  const data = await Room.find({ _id: method })
    .populate('users', { userName: 1, _id: 1 })
    .sort({ _id: 1 })
    .limit(10);
  if (data.length === 0) {
    throw new Error('当前页不存在');
  }
  return data;
}

/**
 * 删除该房间
 */
export async function deleteRoom(id: string) {
  const data = await Room.findOneAndDelete({ roomId: id });
  if (!data) {
    throw new Error('该房间不存在');
  }
  return;
}

/**
 * 删除该房间下的一条聊天记录
 */
export async function deleteRoomRecord(roomId: string, recordId: string) {
  await Room.findOneAndUpdate(
    { roomId },
    { $pull: { record: mongoose.Types.ObjectId(recordId) } }
  );
}

interface uploadMsg {
  roomId: string;
  send: string;
  receive: string;
  msg: string;
  createTime: string;
}
