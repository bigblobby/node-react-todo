const mediaHelper = require('../helpers/media.helper');
const path = require('path');

async function decorateUser(user, properties = {}){
    let decoratedUser = {};

    decoratedUser.id = user.id;
    decoratedUser.username = user.username;
    decoratedUser.email = user.email;
    decoratedUser.roles = user.roles;

    if(user.firstName) decoratedUser.firstName = user.firstName;
    if(user.lastName) decoratedUser.lastName = user.lastName;
    if(user.media){
        try {
            const settings = {
                filename: user.media.filename,
                mimetype: user.media.mimetype,
                height: 200,
                width: 200,
                quality: 90,
                filterName: 'avatar'
            };
            decoratedUser.avatar = await mediaHelper.processImage(settings);
        } catch(e) {
            console.log(e);
        }
    }

    decoratedUser = {...decoratedUser, ...properties};
    return decoratedUser;
}

module.exports = {
    decorateUser: decorateUser
};
