const { errorResponse } = require("../helpers/responser");

const notFound = (req, res, next) => {
  return res.status(404).json(errorResponse("Route not found", 404));
};

module.exports = { notFound };
