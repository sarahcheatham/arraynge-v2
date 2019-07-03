export const handleErrors = response => {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

export const loadUserId = () => {
    return dispatch => {
        fetch("/api/userId")
        .then(res =>{
            return res.text();
        }).then(userId => {
            dispatch(setCurrentUserId(userId));
        });
    };
}

export const setCurrentUserId = userId => {
    return {
        type: "SET_USER_ID",
        value: userId
    };
}

export const setSignUpSignInError = error => {
    return {
        type: "SET_SIGN_UP_SIGN_IN_ERROR",
        value: error
    };
}

export const loadWelcomeMessage = () => {
    return dispatch => {
        fetch("/api/welcome").then(res => {
            return res.text();
        }).then(welcomeMessage => {
            dispatch(setWelcomeMessage(welcomeMessage))
        });
    }
}

export const setWelcomeMessage = welcomeMessage => {
    return {
        type: "SET_WELCOME_MESSAGE",
        value: welcomeMessage
    }
}
//classdata fetch
export const FETCH_CLASSDATA_BEGIN = "FETCH_CLASSDATA_BEGIN";
export const FETCH_CLASSDATA_SUCCESS = "FETCH_CLASSSDATA_SUCCESS";
export const FETCH_CLASSDATA_FAILURE = "FETCH_CLASSDATA_FAILURE";

export const fetchClassDataBegin = () =>({
    type: FETCH_CLASSDATA_BEGIN
});

export const fetchClassDataSuccess = classes =>({
    type: FETCH_CLASSDATA_SUCCESS,
    payload: { classes }
});

export const fetchClassDataFailure = error =>({
    type: FETCH_CLASSDATA_FAILURE,
    payload: { error }
});

export const loadClassData = () => {
    return dispatch => {
        dispatch(fetchClassDataBegin());
        return fetch('/api/classdata')
            .then(handleErrors)
            .then(res => res.json())
            .then(classes => {
                    dispatch(fetchClassDataSuccess(classes));
                    return classes;
            })
            .catch(error => dispatch(fetchClassDataFailure(error)))
    };
}

export const createClassData = classdata => {
    return dispatch => {
        fetch("/api/classdata",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(classdata)
        }).then(()=> dispatch(loadClassData()));
    }
}

export const updateClassData = item => {
    return dispatch => {
        fetch("/api/classdata/:id", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        })
        .then(()=> dispatch(loadClassData()))
    }
}

export const deleteClassData = item => {
    return dispatch => {
        fetch("/api/classdata/:id", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        })
        .then(()=> dispatch(loadClassData()))
    }
}