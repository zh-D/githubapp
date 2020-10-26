async function test() {
  const Redis = require("ioredis");
  const redis = new Redis({
    post: 6379,
  });
  await redis.set("c", 123);
  //awati redis.setex('c',10,123)

  const keys = await redis.keys("*");

  console.log(keys);

  console.log(await redis.get("c"));
}

test();
