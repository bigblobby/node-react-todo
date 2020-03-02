const router = require('express').Router();
const controller = require('../controllers/todo.controller');
const logger = require('../middleware/todo.middleware').logger;
const cache = require('../middleware/flatcache');

// TODO cache needs to be cleared when a todo it created or updated
router.route('/')
    .get(cache('todos', 30), controller.getAll)
    .post(controller.createOne);

router.route('/:id')
    .get(cache('todos', 1440), controller.getOne)
    .delete(controller.deleteOne)
    .put(controller.updateOne);

module.exports = router;
