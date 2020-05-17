import express from 'express';
import { queryByOwnerGetCommodity } from '@/controllers/commodity';
import { queryEvaluateBySellId } from '@/controllers/order';

const router = express.Router();

router.get('/personal/:id', (req, res) => {
  if (!req.session?.userName) {
    return res.status(401).send({ status: 0, data: { msg: '未登录' } });
  }
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  getPersonalApiCollections(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(400).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function getPersonalApiCollections(id: string) {
  // const commodityData = await queryByOwnerGetCommodity(id);
  // const commodity = commodityData.map((v) => {
  //   const { price, _id, description, imgPath } = v;
  //   return { price, _id, description, imgPath };
  // });
  // const evaluate = await queryEvaluateBySellId(id);
  // return { commodity, evaluate };
  //优化为promise并行
  const data = await Promise.all([
    queryByOwnerGetCommodity(id),
    queryEvaluateBySellId(id),
  ]);
  const commodity = data[0].map((v) => {
    const { price, _id, description, imgPath } = v;
    return { price, _id, description, imgPath };
  });
  return { commodity, evaluate: data[1] };
}
