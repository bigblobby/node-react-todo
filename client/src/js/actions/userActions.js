import StorageService from "../StorageService";
import Api from "../api";
import { push } from 'connected-react-router'

/**
 * Action types
 *
 */

const loginAdmin = () => ({
    type: 'AUTH_ADMIN'
});

const loginSuccess = () => ({
    type: 'AUTH_SUCCESS',
});

const loginFailure = (data) => ({
    type: 'AUTH_FAILURE',
    data: data
});

const logoutAction = () => ({
    type: 'AUTH_LOGOUT'
});

const requestProfile = () => ({
    type: 'AUTH_REQUEST_PROFILE',
});

const receiveProfile = (data) => ({
    type: 'AUTH_RECEIVE_PROFILE',
    data: data
});


/**
 * Action creators
 *
 */

export const login = (params) => {
    return async function(dispatch) {
        try {
            const data = await Api.login(params);
            const token = data.data.token;
            StorageService.setToken(token);
            dispatch(loginSuccess());
            dispatch(push('/account'));
        } catch(e) {
            const error = e.response.data.message;
            console.error(error);
            dispatch(loginFailure({ error: error }));
        }
    }
};

export const logout = () => {
    return function(dispatch) {
        StorageService.removeToken();
        dispatch(logoutAction());
        dispatch(push('/'))
    }
};

export const verifyToken = () => {
    return async function(dispatch) {
        if(!StorageService.getToken()) {
            dispatch(logoutAction());
            return;
        }

        try {
            dispatch(requestProfile());
            const user = await Api.verifyAndGetUser({ token: StorageService.getToken() });
            dispatch(receiveProfile({
                user: user.data.user
            }));
            dispatch(loginSuccess());
            if(user.data.user.roles.includes("ROLE_ADMIN")){
                dispatch(loginAdmin());
            }
        } catch(e) {
            console.error(e.message);
            StorageService.removeToken();
            dispatch(logoutAction())
        }
    }
};

export const updateUser = (user) => {
    return async function(dispatch) {
        if(!StorageService.getToken()) {
            dispatch(logoutAction());
            return;
        }

        dispatch(receiveProfile({
            user: user
        }));
    }
};
