import Commodity from '@/models/commodity';
import mongoose from 'mongoose';

/**
 *  保存商品数据
 */
export async function insertCommodity(uploadData: uploadMsg) {
  const commodity = new Commodity({ ...uploadData, comment: [] });
  const product = await commodity.save();
  return product;
}

/**
 *  请求单个商品页面数据
 */
export async function queryCommodity(commodityId: string) {
  const data = Commodity.findById(commodityId).populate('comment');
  if (!data) {
    throw new Error('商品查询为空');
  }
  return data;
}

/**
 * 更新商品页面的评论,只是负责商品部分,评论部分在评论模块更新
 */
export async function updateCommoidtyComment(comment: CommodityComment) {
  const data = await Commodity.findById(comment.commodityId);
  const oldComment = data?.comment || [];
  const body = await Commodity.findByIdAndUpdate(comment.commodityId, {
    comment: [...oldComment, comment.comment],
  });
  return body;
}

/**
 *  更新商品是否卖出
 */
export async function updateCommoidtySaleStatus(commodityId: string) {
  const data = await Commodity.findByIdAndUpdate(commodityId, { isSale: true });
  if (!data) {
    throw new Error('商品查询为空');
  }
  return data;
}

/**
 *  根据用户id查询本人发布的商品总个数
 */
export async function queryByOwnerIdGetCommodityCount(owner: string) {
  const count = await Commodity.countDocuments({ owner });
  return count;
}

/**
 *  根据分类查询商品
 */
export async function queryByKindGetCommodity(id: string) {
  const data = await Commodity.aggregate([
    {
      $sample: { size: 20 },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    { $match: { kind: mongoose.Types.ObjectId(id) } },
  ]);
  const body = data.map((v) => {
    const { price, description, _id, imgPath, name } = v;
    const { userName, headImg } = v.owner[0];
    return {
      price,
      description,
      _id,
      imgPath,
      user: { userName, headImg },
      name,
    };
  });
  return body;
}

/**
 *  随机推荐商品
 */
export async function randomRecommendCommodity() {
  const data = await Commodity.aggregate([
    {
      $sample: { size: 20 },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    { $match: { isSale: false } },
  ]);
  const body = data.map((v) => {
    const { price, description, _id, imgPath, name } = v;
    const { userName, headImg } = v.owner[0];
    return {
      price,
      description,
      _id,
      imgPath,
      user: { userName, headImg },
      name,
    };
  });
  return body;
}

/**
 *  根据用户id查询所有拥有的商品
 */
export async function queryByOwnerGetCommodity(id: string) {
  const data = await Commodity.find({ owner: id });
  return data;
}

/**
 * 模糊查询商品根据商品名字
 */
export async function queryCommodityByName(name: string) {
  const regx = new RegExp(name, 'i');
  const data = await Commodity.aggregate([
    {
      $sample: { size: 20 },
    },
    { $match: { name: { $regex: regx } } },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
  ]);
  const body = data.map((v) => {
    const { price, imgPath, description, name, _id } = v;
    const { userName, headImg } = v.owner;
    return {
      price,
      imgPath,
      description,
      name,
      user: { userName, headImg },
      _id,
    };
  });
  return body;
}

//以下为后台接口

/**
 * 分页查询商品数据
 * @param id
 */
export async function queryPagetion(id: string, isNext: boolean) {
  if (id === '1') {
    const data = await Commodity.find({})
      .populate('owner', { userName: 1, _id: 1 })
      .populate('comment', { comment: 1, createTime: 1, userId: 1 })
      .sort({ _id: 1 })
      .limit(10);
    return data;
  }
  let method;
  if (isNext) {
    method = { $gt: id };
  } else {
    method = { $lt: id };
  }
  const data = await Commodity.find({ _id: method })
    .populate('owner', { userName: 1, _id: 1 })
    .populate('comment', { comment: 1, createTime: 1, userId: 1 })
    .sort({ _id: 1 })
    .limit(10);
  if (data.length === 0) {
    throw new Error('当前页不存在');
  }
  return data;
}

/**
 * 删除商品
 * @param id
 */
export async function deleteCommodity(id: string) {
  const data = await Commodity.findByIdAndDelete(id);
  if (!data) {
    throw new Error('删除数据不存在');
  }
  return;
}

/**
 * 删除评论,注意只是删除商品表中的评论,
 * @params id 商品id
 */
export async function deleteCommodityComment(
  commodityId: string,
  commentId: string
) {
  await Commodity.findByIdAndUpdate(commodityId, {
    $pull: { comment: mongoose.Types.ObjectId(commentId) },
  });
  return;
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
