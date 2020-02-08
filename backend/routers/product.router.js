const router = require('express').Router();
const controller = require('../controllers/product.controller');

router.route('/')
    .get(controller.getAll)
    .post(controller.createOne);

router.route('/search')
    .post(controller.search);

module.exports = router;
