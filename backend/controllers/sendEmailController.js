const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../helpers/responser");
const { sendBulkEmail } = require("../services/emailService");

const sendEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errorResponse(errors.array(),422));
    }
    await sendBulkEmail(req.body);
    return res.status(200).json(successResponse("Bulk email sent has been initialized",200));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(errorResponse("Internal server error", error.statusCode));
  }
};

module.exports = { sendEmail };
