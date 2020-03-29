const router = require('express').Router();
const controller = require('../controllers/user.controller');
const upload = require('../config/multer').upload;

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/account/:id', controller.updateUser);
router.post('/verify-token', controller.verifyUser);
router.put('/upload-avatar', upload.single('avatar'), controller.uploadAvatar);

module.exports = router;
