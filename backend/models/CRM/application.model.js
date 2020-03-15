const Sequelize = require('sequelize');
const db = require('../../db');
const uuid = require('uuid/v1');

const ApplicationEnquiry = db.define('application_enquiry', {
    fullName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    income: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    expenses: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    agreeTerms: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    securityId: {
        type: Sequelize.STRING
    }
}, {
    modelName: 'application_enquiry'
});

ApplicationEnquiry.beforeCreate((enquiry) => {
    enquiry.securityId = uuid();
});

module.exports = ApplicationEnquiry;
