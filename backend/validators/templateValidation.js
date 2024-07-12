const { param } = require("express-validator");

const getTemplate = [param("name").notEmpty().withMessage("Name is required")];

module.exports = {
  getTemplate,
};
