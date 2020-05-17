import express from 'express';
import { insertKind, deleteKind, queryAllKind } from '@/controllers/kind';

const router = express.Router();

router.post('/kind', (req, res) => {
  const { kindName, imgPath } = req.body;
  if (!(kindName && imgPath)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  insertKind(kindName, imgPath)
    .then((data) => res.send(data))
    .catch(() => res.status(400).send({ status: 0 }));
});

router.delete('/kind/:kindName', (req, res) => {
  const kindName = req.params.kindName;
  deleteKind(kindName)
    .then(() => res.send({ status: 1 }))
    .catch(() =>
      res.status(400).send({ status: 0, data: { msg: '删除失败' } })
    );
});

router.get('/kind', (req, res) => {
  queryAllKind()
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
