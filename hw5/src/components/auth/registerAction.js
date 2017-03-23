import {resource} from './../../actions'

const validateSignOn = (nameValue, displayName, emailAddr, phoneNumber,
		dateOfBirth, zipCode, password, passwordConf) => {
	if (nameValue == null || nameValue == "") {
	    return false;
	}else if (emailAddr == null || emailAddr == "") {
	    return false;
	}else if (phoneNumber == null || phoneNumber == "") {
	    return false;
	}else if (dateOfBirth == null || dateOfBirth == "") {
	    return false;
	}else if (zipCode == null || zipCode == "") {
	    return false;
	}else if (password == null || password == "") {
	    return false;
	}else if (passwordConf == null || passwordConf == "") {
	    return false;
	}else{
	    return true;
	}
}

const validatePassword = () => {
	var password = document.forms["accountRegisteration"]["password"].value;
	var passwordConf = document.forms["accountRegisteration"]["passwordConf"].value;

	if (password != passwordConf){
	    return false;
	}else{
	    return true;
	}
}

export const signOnFunc = (event) => {
	// prevent automatically redirect to the landing page immediately after the form is submitted
	event.preventDefault(); 
	var nameValue = document.forms["accountRegisteration"]["accountName"].value;
	var displayName = document.forms["accountRegisteration"]["displayName"].value;
	var emailAddr = document.forms["accountRegisteration"]["emailAddr"].value;
	var phoneNumber = document.forms["accountRegisteration"]["phoneNumber"].value;
	var dateOfBirth = document.forms["accountRegisteration"]["dateOfBirth"].value;
	var zipCode = document.forms["accountRegisteration"]["zipCode"].value;
	var password = document.forms["accountRegisteration"]["password"].value;
	var passwordConf = document.forms["accountRegisteration"]["passwordConf"].value;
	if (validateSignOn(nameValue, displayName, emailAddr, phoneNumber,
		dateOfBirth, zipCode, password, passwordConf) == false){
		return dispatch(errorRegister("All information is required!"));
	}else if (validatePassword() == false){
		return ({ type: 'errorPwdRegister' });
	}else {
		const payload = { username: nameValue, email: emailAddr, dob: dateOfBirth, zipcode: zipCode, password: password};
		return (dispatch) => {
			resource('POST', 'register', payload)
				.then((r) => {
					const usr = r.username
					dispatch(normalRegister("Now you can login in!"))
				})
				.catch((err) => {
					dispatch(errorRegister("All information is required!"))
				})
		}
	}
}

export const normalRegister = (msg) => {
	return { type: 'normalRegister', msg: msg }
}

export const errorRegister = (msg) => {
	return { type: 'errorRegister', msg: msg }
}