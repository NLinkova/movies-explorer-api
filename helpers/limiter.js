const rateLimit = require('express-rate-limit');
// rate limiting
// Here the limiter is set to 1440 * 60 * 1000 to equal 1 day or 24 hours
// then the max is set to 500 requests over the 24 hours
const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000, // 24 hours
  max: 500, // limit each IP to 500 requests per 24 hours
  delayMs: 500, // delays each request to one each per 0.5 second
  message: 'You have reached your limit of requests',
});

module.exports = limiter;
