import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  createTime: {
    type: String,
    required: true,
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
