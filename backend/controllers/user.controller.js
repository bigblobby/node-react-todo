const User = require('../models/user.model');
const Media = require('../models/media.model');
const decorator = require('../decorators/user.decorator');
const userHelper = require('../helpers/user.helper');
const fs = require('fs');
const path = require('path');

// Route controllers
function register(req, res, next) {
    const { username, password, email } = req.body;
    User.create({ username, password, email })
        .then(user => {
            if(user) {
                let token = userHelper.newToken(user);
                res.json({ message: 'account created successfully', token: token })
            }
        }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err });
    });
}

async function login(req, res) {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).send({ message: 'Email and password required' });
    }

    if(username && password) {
        let user = await User.findOne({
            where: { username: username },
        });

        if(!user) {
            res.status(401).json({ message: 'No such user found' });
        }
        const match = await user.checkPassword(password);

        if(match) {
            let token = userHelper.newToken(user);
            res.status(201).json({ message: 'ok', token: token });
        } else {
            res.status(401).json({ message: 'Password is incorrect' });
        }
    }
}

async function verifyUser(req, res) {
    if(!req.headers.authorization) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const [ prefix, token ] = req.headers.authorization.split(' ');

    if(token) {
        try {
            const tokenData = await userHelper.verifyToken(token);
            const user = await userHelper.getUser(tokenData.id);
            const decoratedUser = await decorator.decorateUser(user);

            if(decoratedUser) {
                res.status(200).json({ user: decoratedUser });
            } else {
                res.json({ message: 'No user found' });
            }
        } catch(e) {
            console.log(e);
            res.status(401).json({ message: 'Token expired' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
}

function updateUser(req, res) {
    //TODO
}

function uploadAvatar(req, res) {
    if(!req.file) {
        console.error('There was a problem with this image');
        res.status(500).json({ error: 'Please try again' });
    } else {
        Media.create({
            originalFilename: req.file.originalname,
            filename: req.file.filename,
            mimetype: req.file.mimetype
        }).then(media => {
            const updates = {
                mediaId: media.dataValues.id
            };

            User.update(updates, {
                where: { id: req.body.id },
                returning: true
            }).then(user => {
                if(user[1]) {
                    return userHelper.getUser(req.body.id);
                } else {
                    return null;
                }
            }).then(async user => {
                if(user) {
                    const decoratedUser = await decorator.decorateUser(user);

                    res.status(200).json({
                        user: decoratedUser
                    });
                } else {
                    res.status(400).json({ message: 'No user found' });
                }
            }).catch(err => {
                console.error(err);
                res.status(500).json({ message: err });
            });
        });
    }
}

module.exports = {
    register: register,
    login: login,
    verifyUser: verifyUser,
    updateUser: updateUser,
    uploadAvatar: uploadAvatar,
};

