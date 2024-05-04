import { Redis } from "@upstash/redis";

const { REDIS_URL, REDIS_SECRET } = process.env;

if (!REDIS_URL) {
  throw new Error("REDIS_URL is required");
}

if (!REDIS_SECRET) {
  throw new Error("REDIS_SECRET is required");
}

export const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_SECRET,
});
