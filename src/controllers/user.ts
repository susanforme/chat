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
      return callback({ status: 0, data: { msg: '服务器内部错误' } });
    }
    if (!res) {
      return callback({ status: 0, data: { msg: '查询为空' } });
    }
    callback(null, res);
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

//查询余额
export function queryByIdGetBalance(id: string, callback: Function) {
  User.findById(id, 'balance', (err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器错误' } });
    }
    callback(null, data);
  });
}

//修改余额
export function updateBalanceById(
  id: string,
  amount: number,
  callback: Function
) {
  // User.findByIdAndUpdate(id,{balance:})
  User.findById(id, 'balance', (err, data) => {
    if (err) {
      return callback({ status: 0, data: { msg: '服务器错误' } });
    }
    if ((data?.balance as number) + amount < 0) {
      return callback({ status: 0, data: { msg: '余额不足' } });
    }
    User.findByIdAndUpdate(
      id,
      { balance: (data?.balance as number) + amount },
      (err) => {
        if (err) {
          return callback({ status: 0, data: { msg: '服务器错误' } });
        }
        callback(null);
      }
    );
  });
}

type UserMsg = {
  userName: string;
  password?: string;
};
