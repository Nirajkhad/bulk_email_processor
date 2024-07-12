const { errorResponse, successResponse } = require("../helpers/responser");
const { getTemplate, getTemplates } = require("../repositories/emailRepo");

const getEmailTemplateByName = async (req, res) => {
  try {
    const template = await getTemplate(req.params.name);
    if (!template) {
      return res.status(404).json(errorResponse("Template not found",404));
    }
    return res.status(200).json(successResponse(template));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(errorResponse("Internal server error", error.statusCode));
  }
};

const getAllTemplates = async (req, res) => {
  try {
    const templates = await getTemplates(req.params.id);
    return res.status(200).json(successResponse(templates), 200);
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Internal server error", error.statusCode));
  }
};

module.exports = { getEmailTemplateByName, getAllTemplates };
