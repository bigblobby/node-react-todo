const User = require('../models/user.model');
const decorator = require('../decorators/user.decorator');
const userHelper = require('../helpers/user.helper');

// Route controllers
function register(req, res, next){
    const { username, password, email } = req.body;
    User.create({ username, password, email })
        .then(user => {
            if(user){
                let token = userHelper.newToken(user);
                res.cookie('token', token, {maxAge: Number(process.env.JWT_EXPIRE) * 1000});
                res.json({ message: 'account created successfully' })
            }
        }).catch(err => {
            res.status(500).json({err: err});
        });
}

async function login(req, res){
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).send({message: 'Email and password required'});
    }

    if (username && password) {
        let user = await User.findOne({
            where: { username: username },
        });

        if (!user) {
            res.status(401).json({ message: 'No such user found' });
        }
        const match = await user.checkPassword(password);

        if (match) {
            let token = userHelper.newToken(user);
            res.cookie('token', token, {maxAge: Number(process.env.JWT_EXPIRE) * 1000});
            res.status(201).json({ message: 'ok', token: token });
        } else {
            res.status(401).json({ message: 'Password is incorrect' });
        }
    }
}

async function verifyUser(req, res){
    const token = req.body.token;
    if(token){
        const tokenData = await userHelper.verifyToken(token);
        const user = await userHelper.getUser(tokenData.id);

        if(user){
            res.status(200).json({ user: user });
        } else {
            res.json({ message: 'No user found' });
        }
    } else {
        res.json({message: 'No token provided'});
    }
}

function updateUser(req, res){
    //TODO
}

module.exports = {
    register: register,
    login: login,
    verifyUser: verifyUser,
    updateUser: updateUser,
};

