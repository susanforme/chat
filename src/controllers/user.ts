import User from '@/models/user';
import Idention from 'identicon.js';
import SHA512 from 'crypto-js/sha512';

/**
 * 添加用户
 * @param data
 */
export async function addUser(data: UserMsg) {
  const { userName } = data;
  const hash = SHA512(userName).toString();
  const headImg = `data:image/png;base64,${new Idention(hash, 64).toString()}`;
  const user = new User({ ...data, headImg });
  const userData = await User.findOne({ userName });
  if (userData) {
    throw new Error('用户名已经存在');
  }
  const product = await user.save();
  return product;
}

/**
 * 通过id查询
 * @param id
 */
export async function findByIdUser(id: string) {
  const data = await User.findById(id, ['userName', 'headImg']);
  if (!data) {
    throw new Error('不存在');
  }
  return data;
}

/**
 * 登录
 * @param body
 */
export async function findByNameUser(body: UserMsg) {
  const data = User.findOne(body, ['userName', 'headImg']);
  if (!data) {
    throw new Error('账号或者密码错误');
  }
  return data;
}

/**
 * 查询余额
 * @param id
 */
export async function queryByIdGetBalance(id: string) {
  const data = await User.findById(id, 'balance');
  return data;
}

/**
 * 修改余额
 * @param id
 * @param amount
 */
export async function updateBalanceById(id: string, amount: number) {
  const data = await User.findById(id, 'balance');
  if ((data?.balance as number) + amount < 0) {
    throw new Error('余额不足');
  }
  await User.findByIdAndUpdate(id, {
    balance: (data?.balance as number) + amount,
  });
  return;
}

/**
 * 后台分页查询用户
 * @param page
 */
export async function queryPagtionUser(id: string, isNext: boolean) {
  //速度是skip的10倍
  if (id === '1') {
    const data = await User.find({}, [
      'userName',
      'createTime',
      'balance',
      '_id',
      'password',
    ])
      .sort({ _id: 1 })
      .limit(10);
    return data;
  }
  let method;
  if (isNext) {
    method = { $gt: id };
  } else {
    method = { $lt: id };
  }
  const data = await User.find({ _id: method }, [
    'userName',
    'createTime',
    'balance',
    '_id',
    'password',
  ])
    .sort({ _id: 1 })
    .limit(10);
  if (data.length === 0) {
    throw new Error('当前页不存在');
  }
  return data;
}

/**
 * 删除用户
 * @param id
 */
export async function deleteUser(id: string) {
  const data = await User.findByIdAndDelete(id);
  if (!data) {
    throw new Error('删除用户错误,该用户不存在');
  }
  return;
}

type UserMsg = {
  userName: string;
  password?: string;
};
