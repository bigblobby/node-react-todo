const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/account/:id', controller.updateUser);
router.post('/verify-token', controller.verifyUser);

module.exports = router;
