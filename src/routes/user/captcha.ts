import svgCaptcha from 'svg-captcha';
import express from 'express';

const router = express.Router();

router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create();
  res.send({ status: 1, data: { img: captcha.data, text: captcha.text } });
});

export default router;
