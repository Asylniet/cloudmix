import { getRedisCredentials } from "@/helpers/getRedisCredentials";
import { Redis } from "@upstash/redis";

export const redis = new Redis(getRedisCredentials());
