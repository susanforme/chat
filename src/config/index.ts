import express from 'express';
import router from '../routes';
import bodyPareser from 'body-parser';
import session from 'express-session';
import mongo from 'connect-mongo';

const MongoStore = mongo(session);

function setConfig(app: express.Express) {
  //body解析中间件
  app.use(bodyPareser.json());

  // app.set('trust proxy', 1); // trust first proxy

  //session处理
  app.use(
    session({
      secret: 'a chat application',
      resave: false,
      name:
        'connect.sid' /*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/,
      cookie: { maxAge: 2592000000, sameSite: 'lax', secure: true }, //过期时间
      rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
      store: new MongoStore({
        url: 'mongodb://localhost:27017/chat', //数据库的地址  shop是数据库名
        touchAfter: 24 * 3600, // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
      }),
    })
  );

  //鉴权
  app.use('*', (req, res, next) => {
    // 建议在细分模块再鉴权
    next();
  });
  //路由中间件写最后
  app.use(router);
}

export default setConfig;
