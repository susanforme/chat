import express from 'express';
import {
  updateLocation,
  queryLocation,
  deleteLocation,
} from '@/controllers/location';

const router = express.Router();

//更新地址
router.post('/location', (req, res) => {
  const body = req.body;
  const { name, phoneNum } = body;
  if (name && phoneNum) {
    return updateLocation(body, (err: any, data: any) => {
      if (err) {
        return res.send(err);
      }
      res.send({ status: 1, data });
    });
  }
  res.status(500).send({ status: 0, data: { msg: '参数错误' } });
});

//请求地址
router.get('/location/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  queryLocation(id, (err: any, data: any) => {
    if (err) {
      return res.send(err);
    }
    res.send({ status: 1, data: data.information });
  });
});

//删除地址
router.delete('/location/:id', (req, res) => {
  const [user, position] = req.params.id.split('_');
  if (!(user && position)) {
    return res.status(400).send({ status: 0, data: { msg: '参数错误' } });
  }
  deleteLocation(user, position, (err: any, data: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ status: 1 });
  });
});

export default router;
