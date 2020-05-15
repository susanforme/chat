import Comment from '@/models/comment';

/**
 * 插入评论
 * @param uploadData
 */
export async function insertComment(uploadData: UploadData) {
  const comment = new Comment(uploadData);
  const product = await comment.save();
  return product;
}

//后台所需

/**
 * 分页查询id
 * @param id
 */
export async function queryPagtionComment(id: string) {
  //速度是skip的10倍
  if (id === '1') {
    const data = await Comment.find({})
      .populate('userId', { userName: 1 })
      .populate('commodityId', { name: 1, _id: 1, createTime: 1 })
      .sort({ _id: 1 })
      .limit(10);
    return data;
  }
  const data = await Comment.find({ _id: { $gt: id } })
    .populate('userId', { userName: 1 })
    .populate('commodityId', { name: 1, _id: 1, createTime: 1 })
    .sort({ _id: 1 })
    .limit(10);
  if (data.length === 0) {
    throw new Error('当前页不存在');
  }
  return data;
}

/**
 * 只是删除评论表中的数据还需要更新商品中的数据
 * @param id
 */
export async function deleteComment(id: string) {
  const data = await Comment.findByIdAndDelete(id);
  if (!data) {
    throw new Error('该评论不存在');
  }
  return data;
}

/**
 * 根据房间id删除所有旗下所有聊天记录
 */
export async function deleteCommentByRoomId(id: string) {
  await Comment.find({ roomId: id });
}

interface UploadData {
  userId: string;
  commodityId: string;
  comment: string;
}
