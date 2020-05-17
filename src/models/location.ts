import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const LocationSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  information: {
    type: Array,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});
const Location = mongoose.model<ILocation>('Location', LocationSchema);

export default Location;

interface ILocation extends mongoose.Document {
  createTime: string;
  information: { name: string; area: string; phoneNum: number; _id: any }[];
  user: any;
}
