import express from 'express';
import { insertOrder } from '@/controllers/order';
import {
  updateCommoidtySaleStatus,
  queryCommodity,
} from '@/controllers/commodity';
import { updateBalanceById } from '@/controllers/user';

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const { commodityId, receive, buyerId, sellerId } = req.body;
  if (!(commodityId && receive && buyerId && sellerId)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  postOrderApiCollections({ commodityId, receive, buyerId, sellerId })
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function postOrderApiCollections(body: RequestBody) {
  // 优化为并行
  const { price, isSale } = await queryCommodity(body.commodityId);
  if (isSale) {
    throw new Error('该商品已经卖出');
  }
  await updateBalanceById(body.buyerId, -price);
  const data = await Promise.all([
    updateCommoidtySaleStatus(body.commodityId),
    insertOrder(body),
  ]);
  return data[1];
}

interface RequestBody {
  commodityId: string;
  receive: {
    phoneNum: string;
    name: string;
    area: string;
  };
  buyerId: string;
  sellerId: string;
}
