import Order from '@/models/order';

//提交订单
export function insertOrder(uploadData: UploadMsg, callback: Function) {
  const {
    commodityId: commodity,
    receive,
    buyerId,
    sellerId,
    evaluate,
  } = uploadData;
  const order = new Order({ receive, buyerId, sellerId, evaluate, commodity });
  order.save((err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    callback(null, data);
  });
}

//根据订单id查询商品
export function queryOrderByOrderId(id: string, callback: Function) {
  Order.findById(id, (err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    callback(null, data);
  });
}

//根据卖家id计数
export function queryOrderCountBySellerId(id: string, callback: Function) {
  Order.countDocuments({ sellerId: id }, (err, count) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    callback(null, count);
  });
}

//根据买家id计数
export function queryOrderCountByBuyerId(id: string, callback: Function) {
  Order.countDocuments({ buyerId: id }, (err, count) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    callback(null, count);
  });
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
