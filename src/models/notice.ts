import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const NoticeSchema = new Schema({
  createTime: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
  },
});
const Notice = mongoose.model<INotice>('Notice', NoticeSchema);

export default Notice;

interface INotice extends mongoose.Document {
  createTime: string;
  content: string;
  imgPath: string;
}
