const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.route('/register')
    .post(controller.register);

router.route('/login')
    .post(controller.login);

router.route('/account')
    .post(controller.getUser);

module.exports = router;
