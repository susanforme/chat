import express from 'express';
import { findByIdUser } from '@/controllers/user';
import {
  queryOrderCountByBuyerId,
  queryOrderCountBySellerId,
} from '@/controllers/order';

import { queryByOwnerIdGetCommodityCount } from '@/controllers/commodity';

const router = express.Router();

router.get('/profile/:id', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  getProfileApiCollections(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function getProfileApiCollections(id: string) {
  const userData = await findByIdUser(id);
  const { userName, headImg } = userData;
  const buyCount = await queryOrderCountByBuyerId(id);
  const sellCount = await queryOrderCountBySellerId(id);
  const totalCount = await queryByOwnerIdGetCommodityCount(id);
  return { userName, headImg, buyCount, sellCount, totalCount };
}
