import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  userId: {
    type: String,
    required: true,
  },
  commodityId: {
    type: String,
    required: true,
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
  userId: string;
  commodityId: string;
  comment: string;
}
