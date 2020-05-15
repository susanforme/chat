import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const NoticeSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
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
