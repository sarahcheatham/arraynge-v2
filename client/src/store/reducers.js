import storeState from './state';
import { combineReducers } from 'redux';
import { 
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_SESSION_BEGIN,
    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE,
} from './actions';

const users = (state = storeState, action) => {
    switch(action.type){
        case FETCH_USERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false, 
                users: action.payload.users
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
                users: []
            };
        default:
            return state;
    }
}

const session = (state = storeState, action) => {
    switch(action.type){
        case FETCH_SESSION_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SESSION_SUCCESS:
            return {
                ...state,
                loading: false, 
                session: action.payload.session
            };
        case FETCH_SESSION_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
                session: []
            };
        default:
            return state;
    }
}

const currentUserId = (state = "", action) => {
    if(action.type === "SET_USER_ID"){
        return action.value
    }
    return state;
}

const signUpSignInError = (state = storeState, action) => {
    if(action.type === "SET_SIGN_UP_SIGN_IN_ERROR"){
        return action.value
    }
    return state;
}

const rootReducer = combineReducers({
    users, session, currentUserId, signUpSignInError
});

export default rootReducer;

