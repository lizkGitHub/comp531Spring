const validate = (displayName, email, phone, zipcode, password, confirmPW, profile) => {
	let newProfile = profile
	let pattern; 
	let emailIsValid = true;
	let phoneIsValid = true;
	let zipCodeIsValid = true;
	var errMsg = ""; // keep error message
	let result = {valid:true} // result includes isValid and the new profile
	if (displayName != null && displayName.value != "") {
		newProfile.displayName = displayName.value;
	}
	if (emailAddr.value != null && emailAddr.value != ""){
		pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
		if (pattern.test(emailAddr.value)) {
			newProfile.email = emailAddr.value;
		} else {
			result.valid = false;
			errMsg += "email is not valid; ";
		}
	} 
	if (phoneNumber.value != null && phoneNumber.value != ""){
		pattern = /^\d{3}-\d{3}-\d{4}$/;;
		if(pattern.test(phoneNumber.value)) {
			newProfile.phone = phoneNumber.value
		}else {
			result.valid = false;
			errMsg += "phone number is not valid; ";
		}
	} 
	if (zipCodeValue.value != null && zipCodeValue.value != ""){
		pattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if(pattern.test(zipCodeValue.value)) {
			newProfile.zipCode = zipCodeValue.value
		}else {
			result.valid = false;
			errMsg += "zipcode is not valid; ";
		}
	}
	if (pwdValue.value == pwdConfValue.value && 
		pwdValue.value != null && pwdValue.value != ""){
		newProfile.password = password.value;
	}
	if (pwdValue.value != pwdConfValue.value){
		result.valid = false;
		errMsg += "password confirmation is not the same as password; ";
	}
	result.errMsg = errMsg;
	result.newProfiles = [newProfile];
	return result;
}

export const updateProfile = (event, displayName, email, phone, zipcode, password, confirmPW, profile) => {	
	event.preventDefault(); // prevent automatically redirect to the landing page immediately after the form is submitted
	let validResult = validate(displayName, email, phone, zipcode, password, confirmPW, profile)
	if ( validResult.valid ){
		return ({ type: 'normalUpdateProfile', newProfiles: validResult.newProfiles});
	}else{
		return ({ type: 'errorUpdateProfile', errMsg : validResult.errMsg });
	}
}