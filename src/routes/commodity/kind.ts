import express from 'express';

const router = express.Router();

const kind = [
  { name: '家电', imgPath: 'root/jiadian.png' },
  { name: '手机', imgPath: 'root/mobile.png' },
  { name: '电脑', imgPath: 'root/mac.png' },
  { name: '平板', imgPath: 'root/ipad.png' },
  { name: '服装', imgPath: 'root/fuzhuang.png' },
  { name: '图书', imgPath: 'root/book.png' },
  { name: '鞋子', imgPath: 'root/xiezi.png' },
  { name: '二手车', imgPath: 'root/car.png' },
  { name: '数码', imgPath: 'root/shuma.png' },
  { name: '其他', imgPath: 'root/other.png' },
];

router.get('/kind', (req, res) => {
  res.send({ status: 1, data: { kind } });
});

export default router;
