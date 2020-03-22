const Sequelize = require('sequelize');
const db = require('../db');

const Media = db.define('media', {
    filename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    originalFilename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mimetype: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    modelName: 'media',
    paranoid: true
});

Media.sync();

module.exports = Media;
