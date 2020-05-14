import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const KindSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  kindName: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: true,
  },
});
const Kind = mongoose.model<IKind>('Kind', KindSchema);

export default Kind;

interface IKind extends mongoose.Document {
  createTime: string;
  kindName: string;
  imgPath: string;
}
