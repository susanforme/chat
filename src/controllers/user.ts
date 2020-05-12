import User from '@/models/user';
import Idention from 'identicon.js';
import SHA512 from 'crypto-js/sha512';

//添加用户
export function addUser(data: UserMsg, callback: Function) {
  const { userName } = data;
  const hash = SHA512(userName).toString();
  const headImg = `data:image/png;base64,${new Idention(hash, 64).toString()}`;
  const user = new User({ ...data, headImg });
  User.findOne({ userName }, (err, res) => {
    if (err) {
      callback(err);
    } else if (res) {
      callback({ status: 0, msg: '用户名已经存在' });
    } else {
      user.save(function (err, product) {
        if (err) {
          callback(err);
        } else {
          callback(null, product);
        }
      });
    }
  });
}
//通过id查询
export function findByIdUser(id: string, callback: Function) {
  User.findById(id, ['userName', 'headImg'], function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
}

//登录
export function findByNameUser(body: UserMsg, callback: Function) {
  User.findOne(body, ['userName', 'headImg'], function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
}

type UserMsg = {
  userName: string;
  password?: string;
};
