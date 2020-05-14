import { insertComment } from '@/controllers/comment';
import { updateCommoidtyComment } from '@/controllers/commodity';
import express from 'express';

const router = express.Router();

//更新评论
router.post('/comment', (req, res) => {
  const body = req.body;
  getCommentApiCollections(body)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
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
