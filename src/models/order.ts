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
  commodity: {
    type: Schema.Types.ObjectId,
    ref: 'Commodity',
    required: true,
  },
  receive: {
    type: Object,
    required: true,
  },
  deliveryTime: {
    type: String,
    default: new Date().toLocaleString(),
  },
  receiveTime: {
    type: String,
    default: new Date().toLocaleString(),
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
});
const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

interface IOrder extends mongoose.Document {
  createTime: string;
  commodity: any;
  receive: {
    phoneNum: string;
    name: string;
    area: string;
  };
  deliveryTime: string;
  receiveTime: string;
  sellerId: any;
  buyerId: any;
  evaluate: string;
}
