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
      cookie: { maxAge: 86400000 }, //过期时间
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
  app.use('/public', express.static(__dirname + '/public'));
  //路由中间件写最后
  app.use(router);
}

export default setConfig;