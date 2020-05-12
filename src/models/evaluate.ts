import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const EvaluateSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  commodityId: {
    type: Schema.Types.ObjectId,
    ref: 'Commodity',
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  evaluate: {
    type: String,
    default: '此用户未填写评价',
  },
  score: {
    type: Number,
    default: 5,
  },
});
const Evaluate = mongoose.model<IEvaluate>('Evaluate', EvaluateSchema);

export default Evaluate;

interface IEvaluate extends mongoose.Document {
  createTime: string;
  commodityId: string;
  buyerId: string;
  sellerId: string;
  evaluate: string;
  score: number;
}
