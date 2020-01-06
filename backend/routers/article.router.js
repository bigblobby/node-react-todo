const router = require('express').Router();
const controller = require('../controllers/article.controller');

router.route('/')
    .get(controller.getAll)
    .post(controller.createOne);

router.route('/:id')
    .get(controller.getOne)
    .delete(controller.deleteOne)
    .put(controller.updateOne);

module.exports = router;
