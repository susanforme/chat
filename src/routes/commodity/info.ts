import express from 'express';
import { insertCommodity, queryCommodity } from '@/controllers/commodity';

const router = express.Router();

//插入商品信息
router.post('/info', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const body = req.body;
  const { owner, kind, price, description, imgPath } = body;
  if (!(owner && kind && price && description && imgPath)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  if (Array.isArray(imgPath) && imgPath.length === 0) {
    return res
      .status(400)
      .send({ status: 0, data: { msg: '至少上传一张图片' } });
  }
  insertCommodity(body)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

//请求商品信息
router.get('/info/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    return queryCommodity(id)
      .then((data) => res.send({ status: 1, data }))
      .catch((err) =>
        res.status(400).send({ status: 0, data: { msg: err.message } })
      );
  }
  res.status(400).send({ status: 0, data: { msg: '参数错误' } });
});

export default router;
