import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const CommoditySchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  name: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgPath: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  isSale: {
    type: String,
    default: false,
  },
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});
const Commodity = mongoose.model<ICommodity>('Commodity', CommoditySchema);

export default Commodity;

interface ICommodity extends mongoose.Document {
  createTime: string;
  name: string;
  kind: string;
  price: number;
  imgPath: string[];
  description: string;
  owner: string;
  isSale: boolean;
  comment: any[];
}
