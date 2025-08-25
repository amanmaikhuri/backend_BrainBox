import rateLimit from "../config/upstash.js";

 const rateLimiter = async (req, res, next) =>{
  try {
    // Implement your rate limiting logic here
    const ip = req.ip;
    const { success } = await rateLimit.limit(ip); 
    if(!success){
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
    // If the request is within the allowed limit, call next() to proceed
    next();
  } catch (error) {
    console.error('Rate Limiter Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default rateLimiter;