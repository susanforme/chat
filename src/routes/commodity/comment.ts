import { insertComment } from '@/api/comment';
import { updateCommoidtyComment } from '@/api/commodity';
import express from 'express';

const router = express.Router();

//更新评论
router.post('/comment', (req, res) => {
  const body = req.body;
  insertComment(body, (err: any, data: any) => {
    if (err) {
      return res.send(err);
    }
    updateCommoidtyComment(
      { commodityId: data.commodityId, comment: data._id },
      (err: any) => {
        if (err) {
          return res.send(err);
        }
        res.send({ status: 1, data });
      }
    );
  });
});

export default router;
