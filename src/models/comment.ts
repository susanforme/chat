import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  commodityId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Commodity',
  },
  comment: {
    type: String,
    required: true,
  },
});
const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;

interface IComment extends mongoose.Document {
  createTime: string;
  userId: any;
  commodityId: string;
  comment: string;
}
