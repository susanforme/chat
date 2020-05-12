import express from 'express';
import { updateLocation } from '@/controllers/location';

const router = express.Router();

router.post('/location', (req, res) => {
  const body = req.body;
  const { name, phoneNum } = body;
  if (name && phoneNum) {
    return updateLocation(body, (err: any, data: any) => {
      if (err) {
        return res.send(err);
      }
      res.send({ status: 1, data });
    });
  }
  res.status(500).send({ status: 0, data: { msg: '参数错误' } });
});

export default router;
