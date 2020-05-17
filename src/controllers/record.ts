import Record from '@/models/record';

//后台所需

/**
 * 分页查询聊天记录
 */
export async function queryPagationRecord(id: string, isNext: boolean) {
  if (id === '1') {
    const data = await Record.find({}).sort({ _id: 1 }).limit(10);
    return data;
  }
  let method;
  if (isNext) {
    method = { $gt: id };
  } else {
    method = { $lt: id };
  }
  const data = await Record.find({ _id: method }).sort({ _id: 1 }).limit(10);
  if (data.length === 0) {
    throw new Error('当前页不存在');
  }
  return data;
}

/**
 * 删除聊天记录
 */
export async function deleteRecord(id: string) {
  const data = await Record.findByIdAndDelete(id);
  if (!data) {
    throw new Error('该条聊天记录不存在');
  }
  return data;
}
