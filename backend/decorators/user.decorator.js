function decorateUser(user){
    const decoratedUser = {};

    decoratedUser.id = user.id;
    decoratedUser.username = user.username;
    decoratedUser.email = user.email;

    if(user.firstName) decoratedUser.firstName;
    if(user.lastName) decoratedUser.lastName;

    return decoratedUser;
}

module.exports = {
    decorateUser: decorateUser
};
