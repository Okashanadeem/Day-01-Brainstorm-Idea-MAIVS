import { Request, Response, NextFunction } from 'express';

const ipRequestCounts = new Map<string, { count: number; startTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 1000; // Increased for demo purposes

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const currentTime = Date.now();

  const record = ipRequestCounts.get(ip);

  if (!record) {
    ipRequestCounts.set(ip, { count: 1, startTime: currentTime });
    return next();
  }

  if (currentTime - record.startTime > RATE_LIMIT_WINDOW) {
    // Reset window
    record.count = 1;
    record.startTime = currentTime;
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    return res.status(429).json({
      message: 'Too many requests from this IP, please try again later.'
    });
  }

  record.count += 1;
  next();
};

// Stricter limiter for sensitive actions like OTP or Login
export const strictRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const currentTime = Date.now();
  
  // Use a different key/map or prefix for strict limits to avoid collision with general limit
  const key = `strict_${ip}`;
  const record = ipRequestCounts.get(key);
  
  const STRICT_WINDOW = 60 * 60 * 1000; // 1 hour
  const STRICT_MAX = 10; // 10 attempts

  if (!record) {
    ipRequestCounts.set(key, { count: 1, startTime: currentTime });
    return next();
  }

  if (currentTime - record.startTime > STRICT_WINDOW) {
    record.count = 1;
    record.startTime = currentTime;
    return next();
  }

  if (record.count >= STRICT_MAX) {
    return res.status(429).json({
      message: 'Too many attempts. Please try again in an hour.'
    });
  }

  record.count += 1;
  next();
};
