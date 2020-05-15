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

interface UploadData {
  userId: string;
  commodityId: string;
  comment: string;
}
