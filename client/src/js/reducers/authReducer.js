const initialState = {
    isAuthenticated: false,
    isFailure: false,
    isLoading: false,
    currentUser: null,
};

function authReducer(state = initialState, action){
    switch(action.type){
        case "AUTH_SUCCESS":
            return {
                ...state,
                isFailure: false,
                isAuthenticated: true
            };
        case "AUTH_FAILURE":
            return {
                ...state,
                isFailure: true,
                isAuthenticated: false
            };
        case 'AUTH_LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                isFailure: false,
                isLoading: false,
                currentUser: null,
            };
        case 'AUTH_REQUEST_PROFILE': //request user profile
            return {
                ...state,
                isFailure: false,
                isLoading: true,
                currentUser: null,
            };
        case 'AUTH_RECEIVE_PROFILE': //receive user profile
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                currentUser: action.data
            };
        case "TOGGLE_LOADING":
            return {
                ...state,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
}

export default authReducer;
