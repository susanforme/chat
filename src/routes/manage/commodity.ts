import express from 'express';
import { queryPagetion, deleteCommodity } from '@/controllers/commodity';

const router = express.Router();

router.get('/commodity/:id_isNext', (req, res) => {
  const [id, isNext] = req.params.id_isNext.split('_');
  if (!(isNext === 'true' || isNext === 'false') && id !== '1') {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  const page: boolean = eval(isNext);
  queryPagetion(id, page)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

router.delete('/commodity/:id', (req, res) => {
  const id = req.params.id;
  deleteCommodity(id)
    .then(() => res.send({ status: 1, data: { msg: '删除成功' } }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;
