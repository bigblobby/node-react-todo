const Sequelize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcrypt');
const Media = require('./media.model');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    roles: {
        type: Sequelize.STRING,
        defaultValue: '["ROLE_USER"]'
    }
}, {
    modelName: 'user',
    paranoid: true
});

User.beforeCreate(async (user) => {
    return bcrypt.hash(user.password, 8)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => {
            console.log(err);
        });
});

User.prototype.checkPassword = async function(password){
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }

            resolve(same);
        });
    });
};

User.belongsTo(Media, {as: 'media'});
User.sync();

module.exports = User;
