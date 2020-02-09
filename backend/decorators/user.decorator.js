function decorateUser(user){
    const decoratedUser = {};

    decoratedUser.id = user.id;
    decoratedUser.username = user.username;
    decoratedUser.email = user.email;
    //decoratedUser.roles = user.roles;

    if(user.firstName) decoratedUser.firstName;
    if(user.lastName) decoratedUser.lastName;

    return decoratedUser;
}

module.exports = {
    decorateUser: decorateUser
};
