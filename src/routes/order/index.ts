import express from 'express';
import order from './order';
import buyer from './buyer';
import seller from './seller';

const router = express.Router();

//敏感操作鉴权
router.use((req, res, next) => {
  if (!req.session?.userName) {
    return res
      .status(403)
      .send({ status: 0, data: { msg: '无权限请登录后再尝试' } });
  }
  next();
});

//订单
router.use(order);

//买家操作
router.use(buyer);

//卖家操作
router.use(seller);

export default router;
