import express from 'express';
import { queryPersonalHistoryChat } from '@/controllers/record';

const router = express.Router();

router.post('/history', (req, res) => {
  const body = req.body;
  if (body.userIds) {
    return queryPersonalHistoryChat(body.userIds, (err: any, data: any) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ status: 1, data: data.record });
    });
  }
  res.status(400).send({ status: 0, data: { msg: '参数错误' } });
});

export default router;
