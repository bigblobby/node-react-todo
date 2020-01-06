const router = require('express').Router();
const controller = require('../controllers/todo.controller');

const mw = require('../middleware/todo.middleware');

// Router specific middleware
router.use(mw.logger);

router.route('/')
    .get(controller.getAll)
    .post(controller.createOne);

router.route('/:id')
    .get(controller.getOne)
    .delete(controller.deleteOne)
    .put(controller.updateOne);

module.exports = router;
