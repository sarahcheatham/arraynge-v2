const storeState =  {
    currentUserId: "",
    username: "",
    signUpSignInError: "",
    currentClass: {},
    classdata: {
        loading: false,
        error: null,
        classes: []
    },
    currentYear: "",
    currentSubject: "",
    currentGradeLevel: "",
    currentCount: 0,
    numberOfStudents: 0,
    studentdata: {
        loading: false,
        error: null,
        students: []
    },
    sortBy: ""
}

export default storeState