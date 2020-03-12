function buildErrorMessages(errors){
    //console.log(errors);
    // let messages = {};
    //
    // for(let error in errors){
    //     let message;
    //
    //     switch(errors[error].validatorKey){
    //         case 'is_null':
    //             message = 'This field must not be blank';
    //             break;
    //         case 'isEmail':
    //             message = 'This is not a valid email';
    //             break;
    //         case 'isNumeric':
    //             message = 'This is not a valid number';
    //             break;
    //         default:
    //             message = 'Something is wrong with this field.';
    //     }
    //     messages[errors[error].path] = message
    // }
    //
    // return messages;

    const messages = {};

    for(let error in errors){
        messages[errors[error].path] = errors[error].message;
    }

    return messages;
}

module.exports = buildErrorMessages;
