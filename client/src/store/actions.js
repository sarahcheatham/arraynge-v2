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

export const loadUsername = () => {
    return dispatch => {
        fetch("/api/username").then(res => {
            return res.text();
        }).then(username => {
            dispatch(setUsername(username))
        });
    }
}

export const setUsername = username => {
    return {
        type: "SET_USER_NAME",
        value: username
    }
}

export const setCurrentGradeLevel = gradelevel =>{
    return {
        type: "SET_GRADE_LEVEL",
        value: gradelevel
    }
}

export const setCurrentSubject = subject => {
    return {
        type: "SET_SUBJECT",
        value: subject
    }
}

export const setYear = year => {
    return {
        type: "SET_YEAR",
        value: year
    }
}

export const setNumberOfStudents = numOfStudents => {
    return {
        type: "SET_NUMBER_OF_STUDENTS",
        value: numOfStudents
    }
}

export const setCounter = counter => {
    return {
        type: "SET_COUNTER",
        value: counter
    }
}

//classdata fetch
export const FETCH_CLASSDATA_BEGIN = "FETCH_CLASSDATA_BEGIN";
export const FETCH_CLASSDATA_SUCCESS = "FETCH_CLASSDATA_SUCCESS";
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

// show one class fetch call
export const loadCurrentClass = classId => {
    return dispatch => {
        fetch(`/api/classdata/${classId}`)
        .then(res => {
            return res.json();
        }).then(currentClass => {
            dispatch(setCurrentClass(currentClass))
        });
    }
}

//sets the current class to the class you select 
export const setCurrentClass = currentClass => {
    return {
        type: "SET_CURRENT_CLASS",
        value: currentClass
    }
}

// last class default fetch
export const loadLastClass = () => {
    return dispatch => {
        fetch(`/api/classdata/lastclass/:id`)
        .then(res => {
            return res.json();
        }).then(currentClass => {
            dispatch(setCurrentClass(currentClass))
        });
    }
}

// export const showOneClass = (classId, classdata) => {
//     console.log("ACTIONS SHOW ONE CLASS:", classdata)
//     return dispatch => {
//         fetch(`/api/classdata/${classId}`, {
//             method: "GET",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(classdata)
//         })
//         .then(()=> dispatch(loadStudentData(classId)))
//     }
// }

export const createClassData = classdata => {
    console.log("ACTIONS CREATE CLASS:", classdata)
    return dispatch => {
        fetch("/api/classdata",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(classdata)
        }).then(()=> dispatch(loadClassData()));
    }
}

export const updateClassData = (classId, classdata) => {
    console.log("ACTIONS UPDATE CLASS:", classdata)
    return dispatch => {
        fetch(`/api/classdata/${classId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(classdata)
        })
        .then(()=> dispatch(loadClassData()))
    }
}

export const deleteClassData = (classId, classdata) => {
    console.log("ACTIONS DELETE CLASS:", classdata)
    return dispatch => {
        fetch(`/api/classdata/${classId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(classdata)
        })
        .then(()=> dispatch(loadClassData()))
    }
}
//student data
export const FETCH_STUDENT_DATA_BEGIN = "FETCH_STUDENT_DATA_BEGIN";
export const FETCH_STUDENT_DATA_SUCCESS = "FETCH_STUDENT_DATA_SUCCESS";
export const FETCH_STUDENT_DATA_FAILURE = "FETCH_STUDENT_DATA_FAILURE";

export const fetchStudentDataBegin = () =>({
    type: FETCH_STUDENT_DATA_BEGIN
});

export const fetchStudentDataSuccess = students =>({
    type: FETCH_STUDENT_DATA_SUCCESS,
    payload: { students }
});

export const fetchStudentDataFailure = error =>({
    type: FETCH_STUDENT_DATA_FAILURE,
    payload: { error }
});

export const loadStudentData = (classId) => {
    return dispatch => {
        dispatch(fetchStudentDataBegin());
        return fetch(`/api/classdata/${classId}/studentdata`)
            .then(handleErrors)
            .then(res => res.json())
            .then(students => {
                    dispatch(fetchStudentDataSuccess(students));
                    return students;
            })
            .catch(error => dispatch(fetchStudentDataFailure(error)))
    };
}

export const showOneStudent = (classId, studentId, student) => {
    console.log("ACTIONS SHOW:", student)
    return dispatch => {
        fetch(`/api/classdata/${classId}/studentdata/${studentId}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        })
        .then(()=> dispatch(loadStudentData(classId)))
    }
}

export const createStudentData = (classId, student) => {
    console.log("ACTIONS CREATE:", student)
    return dispatch => {
        fetch(`/api/classdata/${classId}/studentdata`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(()=> dispatch(loadStudentData(classId)));
    }
}


export const updateStudentData = (classId, studentId, student) => {
    console.log("ACTIONS UPDATE:", student)
    return dispatch => {
        fetch(`/api/classdata/${classId}/studentdata/${studentId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        })
        .then(()=> dispatch(loadStudentData(classId)))
    }
}

export const deleteStudentData = (classId, studentId, student) => {
    return dispatch => {
        fetch(`/api/classdata/${classId}/studentdata/${studentId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        })
        .then(()=> dispatch(loadStudentData(classId)))
    }
}
