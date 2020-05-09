import express from 'express';
import formidable from 'formidable';
import dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import fs from 'fs';
const COS = require('cos-nodejs-sdk-v5');

const router = express.Router();
const ID_KEY = dotenv.config({ path: path.join(process.cwd(), '/bin/.env') })
  .parsed;

const cos = new COS({
  SecretId: ID_KEY?.MY_TENCENT_ID,
  SecretKey: ID_KEY?.MY_TENCENT_KEY,
});

router.post('/img', (req, res) => {
  const form = new formidable.IncomingForm();
  form.hash = 'sha256';
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.send({ status: 0, data: { msg: '请重试' } });
    }
    const formName = Object.keys(files)[0];
    const extname = path.extname(files[formName].name);
    const fileName = files[formName].name.replace(extname, '');
    cos.putObject(
      {
        Bucket: 'static-resource-1256396014' /* 必须 */,
        Region: 'ap-nanjing' /* 必须 */,
        Key: `/img/${fileName + files[formName].hash}${extname}` /* 必须 */,
        StorageClass: 'STANDARD',
        Body: fs.createReadStream(files[formName].path), // 上传文件对象
      },
      (err: any, data: any) => {
        if (err) {
          return res.send({ status: 0, data: { msg: '请重试' } });
        }
        return res.send({
          status: 1,
          data: { src: `${fileName + files[formName].hash}${extname}` },
        });
      }
    );
  });
});

export default router;
