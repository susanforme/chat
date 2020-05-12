import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  headImg: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});
const User = mongoose.model<IUser>('User', UserSchema);

export default User;

export interface IUser extends mongoose.Document {
  createTime: string;
  userName: string;
  password: string;
  headImg: string;
  balance: number;
}
