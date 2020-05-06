import svgCaptcha from 'svg-captcha';
import express from 'express';

const router = express.Router();

router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create();
  console.log(captcha.text);
  res.type('svg').send(captcha.data);
});

export default router;
