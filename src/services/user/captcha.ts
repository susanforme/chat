import svgCaptcha from 'svg-captcha';
import express from 'express';
import BASE64 from 'base64-js';

const router = express.Router();

router.get('/captcha', (req, res) => {
  const colors = randomGenerator(3, true, 0, 255);
  const captcha = svgCaptcha.create({
    background: `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${
      0.1 * Math.random()
    })`,
  });
  const svgBase64 = BASE64.fromByteArray(new Buffer(captcha.data));
  res.send({
    status: 1,
    data: {
      imgPath: 'data:image/svg+xml;base64,' + svgBase64,
      text: captcha.text,
    },
  });
});

export default router;

function randomGenerator(
  count: number,
  isInteger: boolean,
  low: number,
  high: number
) {
  const randomNums: number[] = [];
  for (let i = 0; i < count; i++) {
    const num = Math.random() * (high - low) + low;
    if (isInteger) {
      randomNums.push(Math.round(num));
    } else {
      randomNums.push(num);
    }
  }
  return randomNums;
}
