const User = require('../models/user.model');
const decorator = require('../decorators/user.decorator');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = User.findOne({
        where: { id: jwt_payload.id },
    });

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

User.sync();

function register(req, res, next){
    const { username, password, email } = req.body;
    User.create({ username, password, email })
        .then(user =>
            res.json({ user, msg: 'account created successfully' })
        ).catch(err => {
            res.json({err: err});
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
            let payload = { id: user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: Number(process.env.JWT_EXPIRE)});
            res.cookie('token', token, {maxAge: Number(process.env.JWT_EXPIRE) * 1000});
            res.status(201).json({ msg: 'ok', token: token });
        } else {
            res.status(401).json({ msg: 'Password is incorrect' });
        }
    }
}

function getUser(req, res){
    User.findOne({
       where: {id: req.body.id}
    }).then(result => {
        if(result){
            res.status(200).json({
                user: decorator.decorateUser(result)
            })
        } else {
            res.status(404).json({
                message: 'No user found'
            });
        }
    }).catch(err => {
        res.status(500).json({message: err});
    })
}

module.exports = {
    register: register,
    login: login,
    getUser: getUser,
    strategy: strategy
};

