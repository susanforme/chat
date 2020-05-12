import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  createTime: {
    type: String,
    default: new Date().toLocaleString(), //不传入创建时间的默认方法
  },
  commodity: { type: Schema.Types.ObjectId, ref: 'Commodity', required: true },
  receiveMsg: {
    type: Object,
    required: true,
  },
  deliveryTime: {
    time: String,
    default: new Date().toLocaleString(),
  },
  receiveTime: {
    time: String,
    default: new Date().toLocaleString(),
  },
});
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

interface IOrder extends mongoose.Document {
  createTime: string;
  commodity: any;
  receiveMsg: {
    phoneNum: string;
    name: string;
    area: string;
  };
  deliveryTime: string;
  receiveTime: string;
}
