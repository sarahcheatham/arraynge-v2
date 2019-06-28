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
        }).then(userId =>{
            dispatch(setCurrentUserId(userId));
        });
    };
}

export const setCurrentUserId = userId => {
    return {
        type: "SET_USER_ID",
        value: userId
    }
}

export const setSignUpSignInError = error => {
    return {
        type: "SET_SIGN_UP_SIGN_IN_ERROR",
        value: error
    }
}

export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const fetchUsersBegin = () =>({
    type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users =>({
    type: FETCH_USERS_SUCCESS,
    payload: { users }
});

export const fetchUsersFailure = error =>({
    type: FETCH_USERS_FAILURE,
    payload: { error }
});

export const loadUserData = () => {
    return dispatch => {
        dispatch(fetchUsersBegin());
        return fetch('/api/users')
            .then(handleErrors)
            .then(res => res.json())
            .then(users => {
                    // const { token } = data;
                    // localStorage.setItem("token", token);
                    dispatch(fetchUsersSuccess(users));
                    return users;
            })
            .catch(error => dispatch(fetchUsersFailure(error)))
    };
}

export const createUserData = credentials => {
    return dispatch => {
        fetch("/api/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        })
    //     .then(res => res.json())
    //     .then(data => {
    //     const { token } = data;
    //     localStorage.setItem("token", token);
    //     this.setState({
    //       signUpSignInError: "",
    //       authenticated: token
    //     });
    //     this.props.loadUserId();
    //   });
        .then(()=> dispatch(loadUserData()))
    }
}

export const FETCH_SESSION_BEGIN = "FETCH_SESSION_BEGIN";
export const FETCH_SESSION_SUCCESS = "FETCH_SESSION_SUCCESS";
export const FETCH_SESSION_FAILURE = "FETCH_SESSION_FAILURE";

export const fetchSessionBegin = () =>({
    type: FETCH_SESSION_BEGIN
});

export const fetchSessionSuccess = session =>({
    type: FETCH_SESSION_SUCCESS,
    payload: { session }
});

export const fetchSessionFailure = error =>({
    type: FETCH_SESSION_FAILURE,
    payload: { error }
});

export const loadSession = () => {
    return dispatch => {
        dispatch(fetchSessionBegin());
        return fetch('/api/session')
            .then(handleErrors)
            .then(res => res.json())
            .then(session => {
                    dispatch(fetchSessionSuccess(session));
                    return session;
            })
            .catch(error => dispatch(fetchSessionFailure(error)))
    };
}

export const createSession = credentials => {
    return dispatch => {
        fetch("/api/sessions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
          })
          .then(()=> dispatch(loadSession()))
    }
}