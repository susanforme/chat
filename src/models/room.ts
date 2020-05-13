import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  record: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Record',
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
const Room = mongoose.model<IRoom>('Room', RoomSchema);

export default Room;

interface IRoom extends mongoose.Document {
  roomId: string;
  createTime: string;
  record: any[];
  users: any[];
}
