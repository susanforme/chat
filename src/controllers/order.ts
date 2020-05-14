import Order from '@/models/order';

//提交订单
export async function insertOrder(uploadData: UploadMsg) {
  const {
    commodityId: commodity,
    receive,
    buyerId,
    sellerId,
    evaluate,
  } = uploadData;
  const order = new Order({ receive, buyerId, sellerId, evaluate, commodity });
  const data = await order.save();
  return data;
}

//根据订单id查询商品
export async function queryOrderByOrderId(id: string) {
  const data = await Order.findById(id);
  if (!data) {
    throw new Error('商品查询为空');
  }
  return data;
}

//根据卖家id计数
export async function queryOrderCountBySellerId(id: string) {
  const count = await Order.countDocuments({ sellerId: id });
  return count;
}

//根据买家id计数
export async function queryOrderCountByBuyerId(id: string) {
  const count = await Order.countDocuments({ buyerId: id });
  return count;
}

interface UploadMsg {
  commodityId: string;
  receive: {
    phoneNum: string;
    name: string;
    area: string;
  };
  buyerId: string;
  sellerId: string;
  evaluate?: string;
}
