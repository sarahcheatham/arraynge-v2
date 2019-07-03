import storeState from './state';
import { combineReducers } from 'redux';
import { 
    FETCH_CLASSDATA_BEGIN,
    FETCH_CLASSDATA_SUCCESS,
    FETCH_CLASSDATA_FAILURE,
} from './actions';

const currentUserId = (state = storeState, action) => {
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

const welcomeMessage = (state = "", action) => {
    if(action.type === "SET_WELCOME_MESSAGE"){
        return action.value
    }
    return state;
}

const classdata = (state = storeState, action) => {
    switch(action.type){
        case FETCH_CLASSDATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_CLASSDATA_SUCCESS:
            return {
                ...state,
                loading: false, 
                classdata: action.payload.classdata
            };
        case FETCH_CLASSDATA_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
                classdata: []
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    currentUserId, signUpSignInError, welcomeMessage, classdata
});

export default rootReducer;

