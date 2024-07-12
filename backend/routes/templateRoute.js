const express = require('express');
const { getEmailTemplateByName, getAllTemplates } = require('../controllers/templateController');
const { getTemplate } = require('../validators/templateValidation');
const router = express.Router();


router.get('/', getAllTemplates);
router.get('/:name',getTemplate, getEmailTemplateByName);

module.exports = router;