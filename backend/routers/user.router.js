const router = require('express').Router();
const controller = require('../controllers/user.controller');
const multer = require('multer');
const uuid = require('uuid');
// var upload = multer({dest: 'uploads/'});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4().toString() + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif") {
        cb(null, true);
    } else {
        cb("File type is not allowed", false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: 1024 * 1024 * 5
});

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/account/:id', controller.updateUser);
router.post('/verify-token', controller.verifyUser);
router.put('/upload-avatar', upload.single('avatar'), controller.uploadAvatar);

module.exports = router;
