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
  record: {
    type: Array,
    default: [],
  },
});
const Record = mongoose.model<IRecord>('Record', RecordSchema);

export default Record;

interface IRecord extends mongoose.Document {
  roomId: string;
  createTime: string;
  record: RecordList;
}

type RecordList = {
  send: {
    id: string;
    userName: string;
  };
  receive: {
    id: string;
    userName: string;
  };
  msg: string;
  createTime: string;
}[];
