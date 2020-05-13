import express from 'express';
import { findByIdUser } from '@/controllers/user';
import {
  queryOrderCountByBuyerId,
  queryOrderCountBySellerId,
} from '@/controllers/order';

import { queryByOwnerIdGetCommodityCount } from '@/controllers/commodity';

const router = express.Router();

router.get('/profile/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  findByIdUser(id, (err: any, userData: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!userData) {
      return res
        .status(400)
        .send({ status: 0, data: { msg: '查询id结果为空' } });
    }
    const { userName, headImg } = userData;
    queryOrderCountByBuyerId(id, (err: any, buyCount: any) => {
      if (err) {
        return res.status(500).send(err);
      }
      queryOrderCountBySellerId(id, (err: any, sellCount: any) => {
        if (err) {
          return res.status(500).send(err);
        }
        queryByOwnerIdGetCommodityCount(id, (err: any, totalCount: any) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.send({
            status: 1,
            data: { userName, headImg, buyCount, sellCount, totalCount },
          });
        });
      });
    });
  });
});

export default router;
