import { insertComment } from '@/controllers/comment';
import { updateCommoidtyComment } from '@/controllers/commodity';
import express from 'express';

const router = express.Router();

//更新评论
router.post('/comment', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const body = req.body;
  getCommentApiCollections(body)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function getCommentApiCollections(body: any) {
  const data = await insertComment(body);
  const result = await updateCommoidtyComment({
    commodityId: data.commodityId,
    comment: data._id,
  });
  return result;
}
