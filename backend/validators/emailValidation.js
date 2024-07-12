const { body } = require("express-validator");

const bulkEmailValidationRules = [
  body("file_name").notEmpty().withMessage("Enter a file name"),

  body("email_subject").notEmpty().withMessage("Enter a email subject"),

  body("email_body").notEmpty().withMessage("Enter a email_body"),
];

module.exports = { bulkEmailValidationRules };
