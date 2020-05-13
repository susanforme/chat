import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const RecordSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  send: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receive: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  msg: {
    type: String,
    default: ' ',
  },
});
const Record = mongoose.model<IRecord>('Record', RecordSchema);

export default Record;

interface IRecord extends mongoose.Document {
  send: any;
  receive: any;
  msg: string;
  createTime: string;
  roomId: string;
}
