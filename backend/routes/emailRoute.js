const express = require('express');
const { sendEmail } = require('../controllers/sendEmailController');
const { bulkEmailValidationRules } = require('../validators/emailValidation');
const router = express.Router();

router.post("/send-bulk",bulkEmailValidationRules, sendEmail);

module.exports = router;