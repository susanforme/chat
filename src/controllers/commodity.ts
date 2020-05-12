import Commodity from '@/models/commodity';

//保存商品数据
export function insertCommodity(uploadData: uploadMsg, callback: Function) {
  const commodity = new Commodity({ ...uploadData, comment: [] });
  commodity.save((err, product) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器错误' } });
    }
    callback(null, product);
  });
}

//请求单个商品页面数据
export function queryCommodity(commodityId: string, callback: Function) {
  Commodity.findById(commodityId)
    .populate('comment')
    .exec((err, data) => {
      if (err) {
        return callback({ status: 0, data: { msg: '服务器错误' } });
      }
      callback(null, data);
    });
}

//更新商品页面的评论
export function updateCommoidtyComment(
  comment: CommodityComment,
  callback: Function
) {
  Commodity.findById(comment.commodityId).exec((err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器错误' } });
    }
    const oldComment = data?.comment || [];
    Commodity.findByIdAndUpdate(
      comment.commodityId,
      {
        comment: [...oldComment, comment.comment],
      },
      (err, data) => {
        if (err) {
          return callback({ status: 0, data: { msg: '服务器错误' } });
        }
        callback(null, data);
      }
    );
  });
}

//更新商品是否卖出
export function updateCommoidtySaleStatus(
  commodityId: string,
  callback: Function
) {
  Commodity.findByIdAndUpdate(commodityId, { isSale: true }, (err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器错误' } });
    }
    callback(null, data);
  });
}

interface uploadMsg {
  name: string;
  kind: string;
  price: number;
  imgPath: string[];
  description: string;
  owner: string;
  comment: any[];
}

interface CommodityComment {
  commodityId: string;
  //这里的comment是id
  comment: string;
}
