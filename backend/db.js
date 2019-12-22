const Sequelize = require('sequelize');

module.exports = new Sequelize('node_todo', 'remote', 'password', {
    host: '127.0.0.1',
    dialect: 'mysql'
});
