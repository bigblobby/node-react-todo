const router = require('express').Router();
const controller = require('../controllers/todo.controller');
const logger = require('../middleware/todo.middleware').logger;
var cacher = require('../middleware/flatcache');


// Router specific middleware
//router.use(logger);

router.route('/')
    .get(cacher('todos', 30), controller.getAll)
    .post(controller.createOne);

router.route('/:id')
    .get(cacher('todos', 1440), controller.getOne)
    .delete(controller.deleteOne)
    .put(controller.updateOne);

module.exports = router;
