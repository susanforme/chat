import express from 'express';
import { queryPersonalChatList } from '@/controllers/room';

const router = express.Router();

//查询聊天列表有哪些人
router.get('/msglist/:id', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ status: 0, data: { msg: '查询参数错误' } });
  }
  queryPersonalChatList(id)
    .then((data) => res.send({ status: 1, data }))
    .catch(() => {
      res.status(500).send({ status: 0, data: { msg: '服务器错误' } });
    });
});

export default router;
