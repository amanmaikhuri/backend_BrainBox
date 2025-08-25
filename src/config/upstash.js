// Correct import: Ratelimit (not RateLimit)
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";
dotenv.config();

// Create a new rate limiter: 5 requests per 10 seconds
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "60 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default rateLimit;