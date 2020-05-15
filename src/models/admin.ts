import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  headImg: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});
const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;

interface IAdmin extends mongoose.Document {
  createTime: string;
  userName: string;
  password: string;
  headImg: string;
  token: string;
}
