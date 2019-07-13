import storeState from './state';
import { combineReducers } from 'redux';
import { 
    FETCH_CLASSDATA_BEGIN,
    FETCH_CLASSDATA_SUCCESS,
    FETCH_CLASSDATA_FAILURE,
    // FETCH_STUDENT_DATA_BEGIN,
    // FETCH_STUDENT_DATA_SUCCESS,
    // FETCH_STUDENT_DATA_FAILURE,
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

const username = (state = "", action) => {
    if(action.type === "SET_USER_NAME"){
        return action.value
    }
    return state;
}

const currentClass = (state = storeState, action) => {
    if(action.type === "SET_CURRENT_CLASS"){
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
                classes: action.payload.classes
            };
        case FETCH_CLASSDATA_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload.error,
                classes: []
            };
        // case FETCH_STUDENT_DATA_BEGIN:
        //     return {
        //         ...state,
        //         loading: true,
        //         error: null
        //     };
        // case FETCH_STUDENT_DATA_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false, 
        //         students: action.payload.classdata.classes.students
        //     };
        // case FETCH_STUDENT_DATA_FAILURE:
        //     return {
        //         ...state, 
        //         loading: false,
        //         error: action.payload.error,
        //         students: []
        //     };
        default:
            return state;
    }
}

// const students = (state = storeState.classdata.classes, action) => {
//     if(action.type === "FETCH_STUDENT_DATA"){
//         return action.value
//     }
//     return state;
// }

// const studentdata = (state = storeState, action) => {
//     console.log("STATE:", state)
//     switch(action.type){
//         case FETCH_STUDENT_DATA_BEGIN:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null
//             };
//         case FETCH_STUDENT_DATA_SUCCESS:
//             return {
//                 ...state,
//                 loading: false, 
//                 students: action.payload.students
//             };
//         case FETCH_STUDENT_DATA_FAILURE:
//             return {
//                 ...state, 
//                 loading: false,
//                 error: action.payload.error,
//                 students: []
//             };
//         default:
//             return state;
//     }
// }

const currentGradeLevel = (state = storeState, action) => {
    if(action.type === "SET_GRADE_LEVEL"){
        return action.value
    }
    return state;
}

const currentSubject = (state = storeState, action) => {
    if(action.type === "SET_SUBJECT"){
        return action.value
    }
    return state;
}

const currentYear = (state = storeState, action) => {
    if(action.type === "SET_YEAR"){
        return action.value
    }
    return state;
}

const numberOfStudents = (state = storeState, action) => {
    if(action.type === "SET_NUMBER_OF_STUDENTS"){
        return action.value
    }
    return state;
}

const currentCount = (state = storeState, action) => {
    if(action.type === "SET_COUNTER"){
        return action.value
    }
    return state;
}

const rootReducer = combineReducers({
    currentUserId, signUpSignInError, username, currentClass, classdata, currentGradeLevel, currentSubject, currentYear, numberOfStudents, currentCount
});

export default rootReducer;

