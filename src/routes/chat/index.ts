import express from 'express';
import msgList from './msgList';
import history from './history';

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

//获取聊天列表
router.use(msgList);

//获取聊天历史记录
router.use(history);

export default router;
