const { EmailTemplate } = require("../database/models");

const getTemplate = async (name) => {
  try {
    return await EmailTemplate.findOne({
      where: [{name}]
    });
  } catch (error) {
    console.error(`Error in finding template: ${error.message}`);
    throw new Error("Could not finding template. Please try again.");
  }
};

const getTemplates = async () => {
    try {
      return await EmailTemplate.findAll();
    } catch (error) {
        console.error(`Error in finding template: ${error.message}`);
        throw new Error("Could not finding template. Please try again.");
    }
  };

module.exports  = {getTemplate,getTemplates}