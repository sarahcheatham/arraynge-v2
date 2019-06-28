const storeState =  {
    users: {
        loading: false,
        error: null,
        users: []
    },
    session: {
        loading: false,
        error: null,
        session: []
    },
    currentUserId: "",
    signUpSignInError: "",
}

export default storeState