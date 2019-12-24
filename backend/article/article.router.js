const router = require('express').Router();
const controller = require('./article.controller');

router.route('/')
    .get(controller.getAll)
    .post(controller.createOne);

router.route('/:id')
    .get(controller.getOne)
    .delete(controller.deleteOne)
    .put(controller.updateOne);

module.exports = router;
