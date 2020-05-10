import express from 'express';
import { queryPersonalChatList } from '@/api/record';

const router = express.Router();

router.get('/msglist', (req, res) => {
  const id = req.query.id;
  if (typeof id === 'string') {
    return queryPersonalChatList(id, (err: any, data: any) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(data);
    });
  }
  return res.status(400).send({ status: 0, data: { msg: '查询参数错误' } });
});

export default router;
