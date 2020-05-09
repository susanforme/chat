import express from 'express';
import router from '../routes';
import bodyPareser from 'body-parser';
import swig from 'swig';
import path from 'path';
import session from 'express-session';
import mongo from 'connect-mongo';

const MongoStore = mongo(session);

function setConfig(app: express.Express) {
  //body解析中间件
  app.use(bodyPareser.json());

  //session处理
  app.use(
    session({
      secret: 'a chat application',
      resave: false,
      name:
        'connect.sid' /*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/,
      cookie: { maxAge: 2592000000, sameSite: 'lax' }, //过期时间
      rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
      store: new MongoStore({
        url: 'mongodb://localhost:27017/chat', //数据库的地址  shop是数据库名
        touchAfter: 24 * 3600, // 通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
      }),
    })
  );

  app.engine('html', swig.renderFile);
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'html');
  swig.setDefaults({ cache: false });
  app.use('/public', express.static(path.join(__dirname, '../../public')));

  app.all('*', function (req, res, next) {
    console.log(req.ip);

    //允许跨域域名
    const origin = ['http://127.0.0.1:5500'];
    if (origin.includes(req.headers.origin as string)) {
      //跨域
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
  });
  //路由中间件写最后
  app.use(router);
}

export default setConfig;
