
function responseLogger(req, res, next) {
    const startTime = Date.now();
    const { method, originalUrl, ip, headers } = req;
    const userAgent = headers['user-agent']; 
    const originalEnd = res.end;
    res.end = function(chunk, encoding) {
      res.end = originalEnd;
      res.end(chunk, encoding);
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      console.log(`[${new Date().toISOString()}] ${method}  ${ip}  ${userAgent} ${originalUrl} ${statusCode} - ${duration}ms`);
    };
  
    next();
  }
  
  module.exports = responseLogger;
  