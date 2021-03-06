import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  createTime: {
    type: String,
    required: true,
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
