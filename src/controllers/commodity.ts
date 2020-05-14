import Commodity from '@/models/commodity';

//保存商品数据
export async function insertCommodity(uploadData: uploadMsg) {
  const commodity = new Commodity({ ...uploadData, comment: [] });
  const product = await commodity.save();
  return product;
}

//请求单个商品页面数据
export async function queryCommodity(commodityId: string) {
  const data = Commodity.findById(commodityId).populate('comment');
  if (!data) {
    throw new Error('商品查询为空');
  }
  return data;
}

//更新商品页面的评论,只是负责商品部分,评论部分在评论模块更新
export async function updateCommoidtyComment(comment: CommodityComment) {
  const data = await Commodity.findById(comment.commodityId);
  const oldComment = data?.comment || [];
  const body = await Commodity.findByIdAndUpdate(comment.commodityId, {
    comment: [...oldComment, comment.comment],
  });
  return body;
}

//更新商品是否卖出
export async function updateCommoidtySaleStatus(commodityId: string) {
  const data = await Commodity.findByIdAndUpdate(commodityId, { isSale: true });
  if (!data) {
    throw new Error('商品查询为空');
  }
  return data;
}

//根据用户id查询本人发布的商品总个数
export async function queryByOwnerIdGetCommodityCount(owner: string) {
  const count = await Commodity.countDocuments({ owner });
  return count;
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
