const multer = require("multer");
const { errorResponse } = require("../helpers/responser");


const exceptionHandler = (err, req, res, next)=>{
    if (err instanceof multer.MulterError) {
        res.status(400).json(errorResponse(err.message,400));
      } else {
        res.status(500).json(errorResponse(err.message,500));
    }
}

module.exports = {exceptionHandler};
