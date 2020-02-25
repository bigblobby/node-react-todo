/**
 * Action types
 *
 */

const loginSuccess = () => ({
    type: 'AUTH_SUCCESS',
});

const loginFailure = () => ({
    type: 'AUTH_FAILURE',
});

const logoutAction = () => ({
    type: 'AUTH_LOGOUT'
});

const requestProfile = () => ({
    type: 'AUTH_REQUEST_PROFILE',
});

const receiveProfile = (data) => ({
    type: 'AUTH_RECEIVE_PROFILE',
    data
});



/**
 * Action creators
 * TODO implement this properly
 */

export const login = () => {
    return function(dispatch){
        try {
            setTimeout(() => dispatch(loginSuccess()),1000);
        } catch(e) {
            dispatch(loginFailure());
        }
    }
};

export const logout = () => {
    return function(dispatch){
        dispatch(logoutAction());
    }
};
