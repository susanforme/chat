import express from 'express';
import { updateUserHeadImg } from '@/controllers/user';

const router = express.Router();

router.put('/headimg', (req, res) => {
  const { userId, headImg } = req.body;
  if (!(userId && headImg)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  updateUserHeadImg(userId, headImg)
    .then(() => res.send({ status: 1, data: { msg: '成功' } }))
    .catch((err) => res.status(400).send({ status: 0, data: err.message }));
});

export default router;
