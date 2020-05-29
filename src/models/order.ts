import mongoose from 'mongoose';

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
  },
  receiveTime: {
    type: String,
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
  },
  status: {
    type: Number,
    default: 0,
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
  deliveryTime?: string;
  receiveTime?: string;
  sellerId: any;
  buyerId: any;
  evaluate: string;
  status: 0 | 1 | 2 | 3;
}
