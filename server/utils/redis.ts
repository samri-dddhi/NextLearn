// import Redis from "ioredis";
// require("dotenv").config();

// const redisClient = () => {
//     if(process.env.REDIS_URL) {
//         console.log("redis connected");
//         return new Redis(process.env.REDIS_URL);
//     }
//     throw new Error(" redis connection failed ");
// }
// export const redis = redisClient();
import Redis from "ioredis";
require("dotenv").config();

let client: Redis | undefined;

const redisClient = (): Redis => {
  if (!client) {
    if (!process.env.REDIS_URL) throw new Error("Redis URL missing");

    client = new Redis(process.env.REDIS_URL, {
      tls: { rejectUnauthorized: false },
      enableReadyCheck: false,
      maxRetriesPerRequest: 1,
    });

    client.on("connect", () => console.log("✅ Redis connected"));
    client.on("error", (err) => console.error("❌ Redis error:", err.message));
  }

  return client!;
};

export { redisClient };
export const redis = redisClient();

