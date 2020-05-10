import express from 'express';
import msgList from './msgList';
import history from './history';

const router = express.Router();

//获取聊天列表
router.use(msgList);

//获取聊天历史记录
router.use(history);

export default router;
