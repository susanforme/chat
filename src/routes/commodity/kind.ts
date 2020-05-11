import express from 'express';

const router = express.Router();

const kind = [
  { name: '家电', img: 'root/jiadian.png' },
  { name: '手机', img: 'root/mobile.png' },
  { name: '电脑', img: 'root/mac.png' },
  { name: '平板', img: 'root/ipad.png' },
  { name: '服装', img: 'root/fuzhuang.png' },
  { name: '图书', img: 'root/book.png' },
  { name: '鞋子', img: 'root/xiezi.png' },
  { name: '二手车', img: 'root/car.png' },
  { name: '数码', img: 'root/shuma.png' },
  { name: '其他', img: 'root/other.png' },
];

router.get('/kind', (req, res) => {
  res.send({ status: 1, data: { kind } });
});

export default router;
