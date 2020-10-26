const koa = require("koa");
const koaBody = require("koa-body");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const auth = require("./server/auth");
const atob = require("atob");
const api = require("./server/api");

const Redis = require("ioredis");
const RedisSessionStore = require("./server/session-store");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();
//创建Redis client
const redis = new Redis();

//设置nodejs全局增加一个atob方法
global.atob = atob;

app.prepare().then(() => {
  const server = new koa();
  const router = new Router();

  server.keys = ["Jokcy develop Github App"];

  server.use(koaBody());
  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis),
  };

  server.use(session(SESSION_CONFIG, server));

  //配置处理github OAuth的登录
  auth(server); //这个是中间件
  api(server);

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    // await next();
  });

  router.get("/a/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id },
    });
    ctx.respond = false; //不再使用koa内置的他对于body的处理，而改为我们手动去返回我们想返回的对应的http内容
  });

  router.get("/api/user/info", async (ctx) => {
    const user = ctx.session.userInfo;
    if (!user) {
      ctx.status = 401;
      ctx.body = "Need Login";
    } else {
      ctx.body = user;
      ctx.set("Content-Type", "application/json");
    }
  });

  server.use(router.routes());

  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
