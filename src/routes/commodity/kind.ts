import express from 'express';

const router = express.Router();

const kind = [
  { name: '家电', imgPath: 'root/mobile/jiadian.png' },
  { name: '手机', imgPath: 'root/mobile/mobile.png' },
  { name: '电脑', imgPath: 'root/mobile/mac.png' },
  { name: '平板', imgPath: 'root/mobile/ipad.png' },
  { name: '服装', imgPath: 'root/mobile/fuzhuang.png' },
  { name: '图书', imgPath: 'root/mobile/book.png' },
  { name: '鞋子', imgPath: 'root/mobile/xiezi.png' },
  { name: '二手车', imgPath: 'root/mobile/car.png' },
  { name: '数码', imgPath: 'root/mobile/shuma.png' },
  { name: '其他', imgPath: 'root/mobile/other.png' },
];

router.get('/kind', (req, res) => {
  res.send({ status: 1, data: { kind } });
});

export default router;
