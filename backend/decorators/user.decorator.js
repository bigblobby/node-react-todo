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
            const location = path.join(__dirname, '../uploads/') + user.media.filename;
            decoratedUser.avatar = await mediaHelper.dataEncode(location, user.media.mimetype);
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
