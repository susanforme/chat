import express from 'express';
import { queryByOwnerGetCommodity } from '@/controllers/commodity';
import { queryEvaluateBySellId } from '@/controllers/order';

const router = express.Router();

router.get('/personal/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  getPersonalApiCollections(id)
    .then((data) => res.send({ status: 1, data }))
    .catch((err) =>
      res.status(500).send({ status: 0, data: { msg: err.message } })
    );
});

export default router;

async function getPersonalApiCollections(id: string) {
  const commodityData = await queryByOwnerGetCommodity(id);
  const commodity = commodityData.map((v) => {
    const { price, _id, description, imgPath } = v;
    return { price, _id, description, imgPath };
  });
  const evaluate = await queryEvaluateBySellId(id);
  return { commodity, evaluate };
}
