const Sequelize = require('sequelize');
const db = require('../db');

const Todo = db.define('todo', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    }
}, {
    modelName: 'todo',
    paranoid: true
});

module.exports = Todo;
