import express from 'express';
import formidable from 'formidable';
import path from 'path';
import cosUpload from './cosUpload';
import SHA256 from 'crypto-js/sha256';

const router = express.Router();

router.post('/img', (req, res) => {
  const form = new formidable.IncomingForm();
  form.hash = 'sha256';
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.send({ status: 0, data: { msg: '请重试' } });
    }
    const formName = Object.keys(files)[0],
      extname = path.extname(files[formName].name),
      fileName = files[formName].name.replace(extname, ''),
      hash =
        files[formName].hash ||
        SHA256(formName + fileName + extname).toString(),
      filePath = files[formName].path;
    cosUpload({ extname, filePath, hash, fileName }, (err: any, data: any) => {
      if (err) {
        return res.send(err);
      }
      return res.send(data);
    });
  });
});

export default router;
