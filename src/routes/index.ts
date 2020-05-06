import express from 'express';
import admin from './admin';
import error from './error';

const router = express.Router();

//admin测试,正式构建请删除
router.use(admin);

//注意二级目录放在一级的前面
//注意错误处理一定要放在最后
router.use(error);
export default router;
