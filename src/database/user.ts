import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now(), //不传入创建时间的默认方法
  },
});
const User = mongoose.model('User', UserSchema);

export default User;
