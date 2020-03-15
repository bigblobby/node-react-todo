// TODO clean up the validation

const ApplicationEnquiry = require('../../models/CRM/application.model');
const validator = require('validator');
const util = require('../../utils/objects');

function stepOne(req, res){
    const {fullName, email, telephone} = req.body;
    const errors = {};


    if(validator.isEmpty(fullName)){
        errors.fullName = 'This field must not be blank';
    }

    if(!validator.isEmail(email)){
        errors.email = 'This must be a valid email address';
    }

    if(validator.isEmpty(email)){
        errors.email = 'This field must not be blank';
    }

    if(!validator.isNumeric(telephone)){
        errors.telephone = 'This field must only contain numbers';
    }

    if(validator.isEmpty(telephone)){
        errors.telephone = 'This field must not be blank';
    }

    if(util.isObjectEmpty(errors)){
        ApplicationEnquiry.sync().then(() => {
            ApplicationEnquiry.create({
                fullName: fullName,
                email: email,
                telephone: telephone
            }).then(item => {
                res.status(200).json({
                    success: true,
                    nextStep: 2,
                    id: item.securityId
                });
            }).catch(err => {
                console.log(err);
                res.status(500);
            })
        });
    } else {
        res.status(400).json({
            success: false,
            errors: errors
        });
    }
}

function stepTwo(req, res){
    const {id, income, expenses, agreeTerms} = req.body;
    const errors = {};

    if(typeof income !== 'number'){
        errors.income = 'This field must only contain numbers';
    }

    if(!(/\d/g.test(income))){
        errors.income = 'This field must not be blank';
    }

    if(typeof expenses !== 'number'){
        errors.expenses = 'This field must only contain numbers';
    }

    if(!(/\d/g.test(expenses))){
        errors.expenses = 'This field must not be blank';
    }

    if(typeof agreeTerms === 'boolean' && !agreeTerms){
        errors.agreeTerms = 'You must agree to the terms';
    }

    if(util.isObjectEmpty(errors)){
        ApplicationEnquiry.update({
            income: income,
            expenses: expenses,
            agreeTerms: agreeTerms,
        }, {
            where: {
                securityId: id
            },
            returning: true
        }).then(enquiry => {
            console.log(enquiry);
            if(enquiry[1]){
                return ApplicationEnquiry.findOne({where: { securityId: id }});
            } else {
                return null;
            }
        }).then(enquiry => {
            if(enquiry){
                res.status(200).json({
                    success: true,
                    completed: true,
                    nextStep: null
                });
            } else {
                res.status(400).json({message: 'No enquiry found'});
            }
        }).catch(err => {
            console.error(err);
            res.status(500).json({message: err});
        })
    } else {
        res.status(400).json({
            success: false,
            errors: errors
        });
    }
}

function checkErrors(input, constraints){

}

module.exports = {
    stepOne: stepOne,
    stepTwo: stepTwo
};
