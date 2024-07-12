const { errorResponse, successResponse } = require("../helpers/responser");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(errorResponse("No files were uploaded.",400));
    }
    return res.status(201).json(successResponse("File uploaded successfully",201));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Internal server error", error.statusCode));
  }
};

module.exports = { uploadFile };

