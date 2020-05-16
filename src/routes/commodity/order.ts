import express from 'express';
import { insertOrder } from '@/controllers/order';
import { updateCommoidtySaleStatus } from '@/controllers/commodity';

const router = express.Router();

router.post('/order', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const { commodityId, receive, buyerId, sellerId, evaluate } = req.body;
  if (!(commodityId && receive && buyerId && sellerId)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  getOrderApiCollections({ commodityId, receive, buyerId, sellerId, evaluate })
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function getOrderApiCollections(body: RequestBody) {
  // 优化为并行
  const data = await Promise.all([
    updateCommoidtySaleStatus(body.commodityId),
    insertOrder(body),
  ]);
  // await updateCommoidtySaleStatus(body.commodityId);
  // const data = await insertOrder(body);
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
  evaluate: string;
}
