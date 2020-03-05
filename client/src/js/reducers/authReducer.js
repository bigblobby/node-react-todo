const initialState = {
    isAdmin: false,
    isAuthenticated: false,
    isFailure: false,
    isLoading: false,
    currentUser: null,
    error: null
};

function authReducer(state = initialState, action){
    switch(action.type){
        case "AUTH_ADMIN":
            return {
                ...state,
                error: null,
                isFailure: false,
                isAuthenticated: true,
                isAdmin: true
            };
        case "AUTH_SUCCESS":
            return {
                ...state,
                error: null,
                isFailure: false,
                isAuthenticated: true,
                isAdmin: false
            };
        case "AUTH_FAILURE":
            return {
                ...state,
                error: action.data.error,
                isFailure: true,
                isAuthenticated: false,
                isAdmin: false
            };
        case 'AUTH_LOGOUT':
            return {
                ...state,
                error: null,
                isAuthenticated: false,
                isFailure: false,
                isLoading: false,
                currentUser: null,
                isAdmin: false
            };
        case 'AUTH_REQUEST_PROFILE': //request user profile
            return {
                ...state,
                error: null,
                isFailure: false,
                isLoading: true,
                currentUser: null,
                isAdmin: false
            };
        case 'AUTH_RECEIVE_PROFILE': //receive user profile
            return {
                ...state,
                error: null,
                isLoading: false,
                isFailure: false,
                currentUser: action.data.user,
                isAdmin: false
            };
        default:
            return state;
    }
}

export default authReducer;
