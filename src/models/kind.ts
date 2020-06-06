import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const KindSchema = new Schema({
  createTime: {
    type: String,
    required: true,
  },
  kindName: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: true,
  },
});
const Kind = mongoose.model<IKind>('Kind', KindSchema);

export default Kind;

interface IKind extends mongoose.Document {
  createTime: string;
  kindName: string;
  imgPath: string;
}
