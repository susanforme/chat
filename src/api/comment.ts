import Comment from '@/database/comment';

//插入评论

export function insertComment(uploadData: UploadData, callback: Function) {
  const comment = new Comment(uploadData);
  comment.save((err, product) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器错误' } });
    }
    callback(null, product);
  });
}

interface UploadData {
  userId: string;
  commodityId: string;
  comment: string;
}
