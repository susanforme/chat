import express from 'express';
import { queryPagtionComment, deleteComment } from '@/controllers/comment';
import { deleteCommodityComment } from '@/controllers/commodity';

const router = express.Router();

router.get('/comment/:id', (req, res) => {
  const id = req.params.id;
  queryPagtionComment(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

router.delete('/comment/:id', (req, res) => {
  const id = req.params.id;
  deleteCommentApiColletions(id)
    .then(() => res.send({ status: 1, data: { msg: '成功' } }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function deleteCommentApiColletions(id: string) {
  const data = await deleteComment(id);
  await deleteCommodityComment(data.commodityId, id);
}
