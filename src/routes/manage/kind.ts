import express from 'express';
import { insertKind } from '@/controllers/kind';

const router = express.Router();

router.post('/kind', (req, res) => {
  const { kindName, imgPath } = req.body;
  if (!(kindName && imgPath)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  insertKind(kindName, imgPath)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ status: 0 }));
});

export default router;
