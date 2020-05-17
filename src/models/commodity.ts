import mongoose from 'mongoose';

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
    type: Schema.Types.ObjectId,
    ref: 'Kind',
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
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  isSale: {
    type: Boolean,
    default: false,
  },
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});
const Commodity = mongoose.model<ICommodity>('Commodity', CommoditySchema);

export default Commodity;

interface ICommodity extends mongoose.Document {
  createTime: string;
  name: string;
  kind: any;
  price: number;
  imgPath: string[];
  description: string;
  owner: any;
  isSale: boolean;
  comment: any[];
}
