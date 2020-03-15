const router = require('express').Router();
const controller = require('../../controllers/forms/application.controller');

router.post('/step-one', controller.stepOne);
router.post('/step-two', controller.stepTwo);

module.exports = router;
