import express from 'express';
import { queryNotice, insertNotice, deleteNotice } from '@/controllers/notice';

const router = express.Router();

router.get('/notice', (req, res) => {
  queryNotice()
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.post('/notice', (req, res) => {
  const { content, imgPath } = req.body;
  if (!(content && imgPath)) {
    return res.status(400).send({ status: 0, data: { msg: '请求体错误' } });
  }
  insertNotice({ content, imgPath })
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.delete('/notice/:id', (req, res) => {
  const id = req.params.id;
  deleteNotice(id)
    .then(() => res.send({ status: 1, data: { msg: '删除成功' } }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
