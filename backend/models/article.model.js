const Sequelize = require('sequelize');
const db = require('../db');
const helper = require('../helpers/model.helpers');

const Article = db.define('article', {
    slug: {
        type: Sequelize.STRING,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    summary: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, {
    modelName: 'todo',
    paranoid: true
});

Article.beforeCreate((article) => {
    article.slug = helper.slugify(article.title);
});

module.exports = Article;
