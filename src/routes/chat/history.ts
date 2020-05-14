import express from 'express';
import { queryPersonalHistoryChat } from '@/controllers/room';

const router = express.Router();

router.get('/history/:id', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const users = req.params.id.split('_');
  const roomId = users.sort().reduce((pre, cur) => pre + cur);
  if (!roomId) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  queryPersonalHistoryChat(roomId)
    .then((data) => res.send({ status: 1, data }))
    .catch(() =>
      res.status(500).send({ status: 0, data: { msg: '服务器错误' } })
    );
});

export default router;
