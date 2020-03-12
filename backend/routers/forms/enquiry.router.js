const router = require('express').Router();
const controller = require('../../controllers/forms/enquiry.controller');

router.post('/contact-us', controller.contactUs);

module.exports = router;
