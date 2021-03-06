import path from 'path';
import process from 'process';
import dotenv from 'dotenv';
import fs from 'fs';
import SHA512 from 'crypto-js/sha512';

const COS = require('cos-nodejs-sdk-v5');
const ID_KEY = dotenv.config({ path: path.join(process.cwd(), '/bin/.env') })
  .parsed;

const cos = new COS({
  SecretId: ID_KEY?.MY_TENCENT_ID,
  SecretKey: ID_KEY?.MY_TENCENT_KEY,
});

function cosUpload(options: Options, callback: Function) {
  const { fileName, hash, extname, filePath } = options;
  const timeHash = SHA512(new Date().toUTCString()).toString();
  cos.putObject(
    {
      Bucket: 'static-resource-1256396014' /* 必须 */,
      Region: 'ap-nanjing' /* 必须 */,
      Key: `/img/public/${new Date()
        .toLocaleDateString()
        .replace(/\//g, '.')}/${fileName + timeHash}${extname}` /* 必须 */,
      StorageClass: 'STANDARD',
      Body: fs.createReadStream(filePath), // 上传文件对象
    },
    (err: any, data: any) => {
      if (err) {
        return callback({ status: 0, data: { msg: '请重试' } });
      }
      return callback(null, {
        status: 1,
        data: {
          src: `${new Date().toLocaleDateString().replace(/\//g, '.')}/${
            fileName + timeHash
          }${extname}`,
        },
      });
    }
  );
}

export default cosUpload;

interface Options {
  fileName: string;
  hash: string;
  extname: string;
  filePath: string;
}
