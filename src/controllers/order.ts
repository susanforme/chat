import Order from '@/models/order';

/**
 *提交订单
 */
export async function insertOrder(uploadData: UploadMsg) {
  const {
    commodityId: commodity,
    receive,
    buyerId,
    sellerId,
    evaluate,
  } = uploadData;
  const order = new Order({
    receive,
    buyerId,
    sellerId,
    evaluate,
    commodity,
    createTime: new Date().toLocaleString(),
  });
  const data = await order.save();
  return data;
}

/**
 *根据订单id查询商品
 */
export async function queryOrderByOrderId(id: string) {
  const data = await Order.findById(id);
  if (!data) {
    throw new Error('商品查询为空');
  }
  return data;
}

/**
 *根据卖家id计数
 */
export async function queryOrderCountBySellerId(id: string) {
  const count = await Order.countDocuments({ sellerId: id });
  return count;
}

/**
 *根据买家id计数
 */
export async function queryOrderCountByBuyerId(id: string) {
  const count = await Order.countDocuments({ buyerId: id });
  return count;
}

/**
 * 根据卖家id查询对卖家的评价
 */
export async function queryEvaluateBySellId(id: string) {
  const data = await Order.find({ sellerId: id }).populate('buyerId');
  const body = data.map((v) => {
    const { createTime, evaluate } = v;
    const { userName, headImg } = v.buyerId;
    return { createTime, evaluate, user: { userName, headImg } };
  });
  return body;
}

/**
 * 根据买家id查询订单
 */
export async function queryOrderByBuyerId(id: string) {
  const data = await Order.find({ buyerId: id })
    .populate('buyerId', {
      userName: 1,
      _id: 1,
      headImg: 1,
    })
    .populate('sellerId', {
      userName: 1,
      _id: 1,
      headImg: 1,
    })
    .populate('commodity', {
      imgPath: 1,
      price: 1,
      description: 1,
    });
  return data;
}

/**
 *  根据卖家id查询订单
 */
export async function queryOrderBySellId(id: string) {
  const data = await Order.find({ sellerId: id })
    .populate('sellerId', {
      userName: 1,
      _id: 1,
      headImg: 1,
    })
    .populate('buyerId', {
      userName: 1,
      _id: 1,
      headImg: 1,
    })
    .populate('commodity', {
      imgPath: 1,
      price: 1,
      description: 1,
    });
  return data;
}

/**
 * 卖家发货
 */
export async function sellerShipped(orderId: string, userId: string) {
  const data = await Order.findOneAndUpdate(
    { _id: orderId, sellerId: userId, status: 0 },
    { status: 1, deliveryTime: new Date().toLocaleString() }
  );
  if (!data) {
    throw new Error('当前操作订单用户不是订单卖家或已经发货');
  }
  return;
}

/**
 * 买家收货
 */

export async function buyerReceive(orderId: string, userId: string) {
  const data = await Order.findOneAndUpdate(
    { _id: orderId, buyerId: userId, status: 1 },
    { status: 2, receiveTime: new Date().toLocaleString() }
  ).populate('commodity', { price: 1 });
  if (!data) {
    throw new Error('当前操作订单用户不是订单买家或已经收货');
  }
  return data;
}

/**
 * 评价
 */
export async function evaluateAndUpateStatus(
  orderId: string,
  userId: string,
  evaluate: string
) {
  const data = await Order.findOneAndUpdate(
    { _id: orderId, buyerId: userId, status: 2 },
    { status: 3, evaluate: evaluate || '该用户未发表评价' }
  );
  if (!data) {
    throw new Error('当前操作订单用户不是订单买家或已经完成订单');
  }
  return data;
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
