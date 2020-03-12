const ContactEnquiry = require('../../models/CRM/contact-enquiry.model');
const buildErrorMessages = require('../../validators/form.validator');

function contactUs(req, res){
    ContactEnquiry.sync().then(() => {
        ContactEnquiry.create({
            fullName: req.body.fullName,
            email: req.body.email,
            telephone: req.body.telephone,
            agreeTerms: req.body.agreeTerms
        }).then(item => {
            console.log(item);
            res.status(200).json({
                success: true,
                enquiry_id: item.id
            })
        }).catch((err) => {
            console.log(err.errors);
            const errors = buildErrorMessages(err.errors);
            res.status(400).json({
                success: false,
                errors: errors
            })
        });
    });
}

module.exports = {
    contactUs: contactUs
};
