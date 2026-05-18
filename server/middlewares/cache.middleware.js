import { get, setEx } from '../config/redis';

const cache = (key, ttl = 3600) => {
  return async (req, res, next) => {
    try {
      const cacheKey = `${key}:${req.originalUrl}`;
      const cachedData = await get(cacheKey);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      res.locals.cacheKey = cacheKey;
      res.locals.cacheTTL = ttl;
      next();
    } catch (error) {
      next();
    }
  };
};

const cacheResponse = (data) => {
  return (req, res, next) => {
    if (res.locals.cacheKey && res.locals.cacheTTL) {
      setEx(res.locals.cacheKey, res.locals.cacheTTL, JSON.stringify(data));
    }
    next();
  };
};

export default { cache, cacheResponse };