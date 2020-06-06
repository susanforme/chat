import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const RecordSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
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
