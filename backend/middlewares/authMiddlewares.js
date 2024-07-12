const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helpers/responser');

const verifyToken= (req,res,next) => {
    const token = req.headers['authorization']?.split(' ');
    if (!token) {
        return res.status(401).json(errorResponse("Token is required",401));
    }

    jwt.verify(token[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(errorResponse("Invalid Token",403));
        }
        req.user = decoded; 
        next();
      });
}

module.exports = {verifyToken} 