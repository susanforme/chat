import express from 'express';
import { queryPersonalHistoryChat } from '@/controllers/room';
import { findByIdUser } from '@/controllers/user';

const router = express.Router();

router.get('/history/:id', (req, res) => {
  const users = req.params.id.split('_');
  const roomId = users.sort().reduce((pre, cur) => pre + cur);
  if (!roomId) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  historyApiColletions(roomId, users)
    .then((data) => res.send({ status: 1, data }))
    .catch(() =>
      res.status(400).send({ status: 0, data: { msg: '服务器错误' } })
    );
});

export default router;

async function historyApiColletions(roomId: string, users: string[]) {
  const data = await Promise.all([
    queryPersonalHistoryChat(roomId),
    findByIdUser(users[0]),
    findByIdUser(users[1]),
  ]);
  return { history: data[0], users: [data[1], data[2]] };
}
