const router = require('express').Router();
const controller = require('../controllers/product.controller');
const cache = require('../middleware/flatcache');

router.route('/')
    .get(controller.getAll)
    .post(controller.createOne);

router.route('/search')
    .post(cache('products', 30), controller.search);

module.exports = router;
