const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const User = require('../models/user.model');

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

function newToken(user){
    return jwt.sign({id: user.id, roles: user.roles}, jwtOptions.secretOrKey, {expiresIn: Number(process.env.JWT_EXPIRE)});
}

function verifyToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtOptions.secretOrKey, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        })
    });
}

function getUser(id){
    return new Promise((resolve, reject) => {
        User.findOne({
            where: {id: id}
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
}

module.exports = {
    newToken: newToken,
    verifyToken: verifyToken,
    getUser: getUser,
    strategy: strategy
};
