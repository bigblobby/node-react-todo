function decorateUser(user){
    const decoratedUser = {};

    decoratedUser.id = user.id;
    decoratedUser.username = user.username;
    decoratedUser.email = user.email;

    return decoratedUser;
}

module.exports = {
    decorateUser: decorateUser
};
