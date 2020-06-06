import Admin from '@/models/admin';
import { SHA512, SHA256, MD5 } from 'crypto-js';
import Idention from 'identicon.js';
import dotenv from 'dotenv';
import path from 'path';

const MY_TOKEN = dotenv.config({ path: path.join(process.cwd(), '/bin/.env') })
  .parsed?.ADMIN_ENCRY_STRING;

/**
 *注册账号
 */
export async function insertAdminAccount(body: RegisterAdminBody) {
  const isHaveSameName = await Admin.findOne({ userName: body.userName });
  if (isHaveSameName) {
    throw new Error('用户名重复');
  }
  const token = SHA512(body.userName + MY_TOKEN).toString();
  const hash = SHA256(body.userName).toString();
  const headImg = `data:image/png;base64,${new Idention(hash, 64).toString()}`;
  const password = MD5(body.password + MY_TOKEN).toString();
  const admin = new Admin({
    ...body,
    token,
    headImg,
    password,
    createTime: new Date().toLocaleString(),
  });
  const data = await admin.save();
  return { _id: data._id, headImg, token, userName: body.userName };
}

/**
 * 登录账号
 */
export async function queryAdminAccount(body: LoginAdminBody) {
  const password = MD5(body.password + MY_TOKEN).toString();
  const loginBody = { ...body, password };
  const data = await Admin.findOne(loginBody, ['userName', 'headImg']);
  if (!data) {
    throw new Error('账号,密码或口令错误');
  }
  return data;
}

/**
 * 通过用户名查询
 */
export async function queryAdminByUserName(userName: string) {
  const data = await Admin.findOne({ userName });
  if (!data) {
    throw new Error('不存在该用户');
  }
  return;
}

interface RegisterAdminBody {
  userName: string;
  password: string;
}

interface LoginAdminBody {
  /**
   * 登录所需口令
   */
  token: string;
  userName: string;
  password: string;
}
