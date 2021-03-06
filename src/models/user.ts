import mongoose from 'mongoose';

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
    required: true,
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
