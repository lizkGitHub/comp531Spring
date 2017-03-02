export const logIn = (dispatch) => {
    const username = document.querySelector("#inputUserName").value;
    const password = document.querySelector("#inputPassword").value;
    var result = validateLogIn(username, password);
    if (result.isValid == false) {
        return dispatch({type: 'errorLogin', errMsg : result.errMsg});
    }else{
        dispatch({type: 'main'});
        return dispatch({type: 'normalLogin'});
    }
}

const validateLogIn = (username, password) => {
    let result = {isValid: true, errMsg: ""};
    if (username == null || username == "") {
        result.errMsg += "username is wrong; "
        result.isValid = false;
    }
    if (password == null || password == "") {
        result.errMsg += "password is wrong; "
        result.isValid = false;
    }
    return result;
}