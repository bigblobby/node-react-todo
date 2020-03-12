const Sequelize = require('sequelize');
const db = require('../../db');

const ContactEnquiry = db.define('contact_enquiry', {
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'You must fill in this field'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'You must fill in this field'
            },
            isEmail: {
                args: true,
                msg: 'This is not a valid email'
            }
        }
    },
    telephone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'You must fill in this field'
            },
            isNumeric: {
                args: true,
                msg: 'This is not a valid phone number'
            }
        }
    },
    agreeTerms: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            checkForTrue(value){
                if(typeof value === 'boolean' && !value){
                    throw new Error('You must agree to the terms');
                }
            }
        }
    }
}, {
    modelName: 'contact_enquiry'
});

module.exports = ContactEnquiry;
