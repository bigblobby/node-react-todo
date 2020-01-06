const router = require('express').Router();
const controller = require('../controllers/product.controller');

router.route('/')
    .get(controller.getAll)
    .post(controller.createOne);

module.exports = router;
