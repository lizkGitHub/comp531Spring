import {resource} from './../../actions'

export const updateAvatar = (avatar) => {
    return {
        type: 'updateAvatar',
        avatar
    }
}

export const updateUsername = (username) => {
    return {
        type: 'updateUsername',
        username
    }
}

export const updateEmail = (email) => {
    return {
        type: 'updateEmail',
        email
    }
}

export const updateZipcode = (zipcode) => {
    return {
        type: 'updateZipcode',
        zipcode
    }
}

export const updateHeadline = (headline) => {
    return {
        type: 'updateHeadline',
        headline
    }
}

export const updateDOB = (dob) => {
    return {
        type: 'updateDOB',
        dob
    }
}

export const putHeadline = (headline) => {
    return (dispatch) => {
        resource('PUT', 'headline', {
            headline
        }).then ((r) => {
            dispatch(updateHeadline(r.headline))
        }).catch((err) => {
			dispatch({type:"headlineError", data:err})
        })
    }
}

export const putEmail = (email) => {
    return (dispatch) => {
        resource('PUT', 'email', {
            email
        }).then ((r) => {
            dispatch(updateEmail(r.email))
        }).catch((err) => {
			dispatch({type:'errorUpdateProfile', errMsg: err})
        })
    }
}

export const putZipcode = (zipcode) => {
    return (dispatch) => {
        resource('PUT', 'zipcode', {
            zipcode
        }).then ((r) => {
            dispatch(updateZipcode(r.zipcode))
        }).catch((err) => {
			dispatch({type:'errorUpdateProfile', errMsg: err})			
        })
    }
}

export const putPassword = (password) => {
    return (dispatch) => {
        resource('PUT', 'password', {
            password
        }).then ((r) => {
            dispatch({type : 'passwordMsg', data : r.message})
        }).catch((err) => {
			dispatch({type:'errorUpdateProfile', errMsg: err})
        })
    }
}

export const putAvatar = (avatarFD) => {
	return (dispatch) => {
		resource('PUT', 'avatar', avatarFD, true)
		.then((r) => {
			dispatch(updateAvatar(r.avatar))
			dispatch({type:'updateSuccess', 
				successMsg: "successfully update avatar!"})
		})
		.catch((err) => {
			dispatch({type:'errorUpdateProfile', errMsg: err})
		})
	}
}

export const fetchField = (field, param) => {
    const endpoint = (param) ? field + '/' + param : field
    return (dispatch) => {resource('GET', endpoint)
        .then((r) => {
            switch(field) {
                case "avatars":
                    dispatch(updateAvatar(r.avatars[0].avatar))
                    break
                case "zipcode":
                    dispatch(updateZipcode(r.zipcode))
                    break
                case "email" :
                    dispatch(updateEmail(r.email))
                    break
                case "headlines":
                    dispatch(updateHeadline(r.headlines[0].headline))
                    dispatch(updateUsername(r.headlines[0].username))
                    break
				case "dob":
					dispatch(updateDOB(r.dob))
					break
            }
        })
        .catch((err) => {
			dispatch({type:"fetchError", msg: err})	
        })
    }
}

const validate = (displayName, email, phone, zipcode, password, confirmPW, profile) => {
	let updateList = []
	let newProfile = profile
	let pattern; 
	let emailIsValid = true;
	let phoneIsValid = true;
	let zipCodeIsValid = true;
	let errMsg = ""; // keep error message
	let result = {valid:true} 
	if (displayName != null && displayName.value != "") {
		newProfile.displayName = displayName.value;
	}
	if (emailAddr.value != null && emailAddr.value != ""){
		pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
		if (pattern.test(emailAddr.value)) {
			newProfile.email = emailAddr.value;
			updateList.push("email")
		} else {
			result.valid = false;
			errMsg += "email is not valid; ";
		}
	} 
	if (phoneNumber.value != null && phoneNumber.value != ""){
		pattern = /^\d{3}-\d{3}-\d{4}$/;;
		if(pattern.test(phoneNumber.value)) {
			newProfile.phone = phoneNumber.value
			updateList.push("phone")
		}else {
			result.valid = false;
			errMsg += "phone number is not valid; ";
		}
	} 
	if (zipCodeValue.value != null && zipCodeValue.value != ""){
		pattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		if(pattern.test(zipCodeValue.value)) {
			newProfile.zipCode = zipCodeValue.value
			updateList.push("zipcode")
		}else {
			result.valid = false;
			errMsg += "zipcode is not valid; ";
		}
	}
	if (pwdValue.value == pwdConfValue.value && 
		pwdValue.value != null && pwdValue.value != ""){
		newProfile.password = password.value;
		updateList.push("password")
	}
	if (pwdValue.value != pwdConfValue.value){
		result.valid = false;
		errMsg += "password confirmation is not the same as password; ";
	}
	result.errMsg = errMsg;
	result.newProfiles = [newProfile];
	result.updateList = updateList;
	return result;
}

export const updateProfile = (event, displayName, email, phone, zipcode, password, confirmPW, profile) => {	
	// prevent automatically redirect to the landing page immediately after the form is submitted
	event.preventDefault(); 
	let validResult = validate(displayName, email, phone, zipcode, password, confirmPW, profile)
	if ( validResult.valid ){
		return (dispatch) => {
			validResult.updateList.map((updateEntry) => {
				switch(updateEntry)
				{
					case "email":
						dispatch(putEmail(email.value))
						break
					case "zipcode":
						dispatch(putZipcode(zipcode.value))
						break
					case "password":
						dispatch(putPassword(password.value))
						break
					default:
						dispatch({ type: 'errorUpdateProfile', errMsg : "nothing to update" });
					
				}
			})
			let updateInfo = ""
			let pwInfo = ""
			validResult.updateList.map((updateEntry) => {
				updateInfo += updateEntry +" "
				if (updateEntry === "password") {
					pwInfo = " password will not change at this time"
				}
			})
			dispatch({type: 'updateSuccess', successMsg: "successfully update " 
				+ updateInfo + pwInfo})
		}
	}else{
		return ({ type: 'errorUpdateProfile', errMsg : validResult.errMsg });
	}
}