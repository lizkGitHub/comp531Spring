import {resource, navigate} from './../../actions'
import {getArticles} from './../main/articleAction'
import * as ProfileActions from './../profile/updateProfileAction'
import {getFollowings} from './../main/followerAction'

export const logIn = (username, password) => {
    var result = validateLogIn(username, password);
    if (result.isValid == false) {
        return errLogin(result.errMsg);
    }else{
        return (dispatch) =>{
            resource('POST', 'login', { username: username,password: password})
                .then((r) => {
                    dispatch(ProfileActions.updateUsername(r.username))
                    dispatch(normalLogin())
                    dispatch({type:"normalUser"})
                    dispatch(getArticles(r.username))
                    dispatch(getFollowings(r.username))
                    const fieldList = ['avatars','zipcode', 'email','headlines','dob']
                    const pList = fieldList.map((field) => dispatch(ProfileActions.fetchField(field)))
                    dispatch(getAuthType())
                    dispatch(navigate('main'))

                })
            .catch((error) => {
                dispatch(errLogin("username or password is wrong"))})
        }
    }
}

export const isLoggedIn = () => {
    const endpoint =  'headlines'
    return (dispatch) => {resource('GET', endpoint)
        .then((r) => {
            dispatch(ProfileActions.updateUsername(r.username))
            dispatch(normalLogin())
            dispatch(getArticles(r.username))
            dispatch(getFollowings(r.username))
            dispatch(getAuthType())
            const fieldList = ['avatars','zipcode', 'email','headlines','dob']
            const pList = fieldList.map((field) => dispatch(ProfileActions.fetchField(field)))
            dispatch({type: 'main'})

        })
        .catch((err) => {
			dispatch({type: 'landing'})	
        })    
    }
}

export const errLogin = (errMsg) => {
    return ({type: 'errorLogin', errMsg : errMsg});
}

const normalLogin = () => (
    {type: 'normalLogin'}
)

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

const getAuthType = () => {
    return (dispatch) => {resource('GET', 'authType')
    .then((r) => {
        console.log("authtype")
        console.log(r.auth)
        console.log("authtype end")
        dispatch({type: 'authType', data: r.auth})
    })}
}

export const link2Normal = (username, password, logInUser) => {
     return (dispatch) =>{
        resource('POST', 'link2Normal', { username: username,password: password, logInUser: logInUser})
            .then((r) => {
                dispatch(getAuthType())
                dispatch(ProfileActions.updateUsername(r.username))
                dispatch(normalLogin())
                dispatch(getArticles(r.username))
                dispatch(getFollowings(r.username))
                dispatch(getAuthType())
                const fieldList = ['avatars','zipcode', 'email','headlines','dob']
                const pList = fieldList.map((field) => dispatch(ProfileActions.fetchField(field)))
                dispatch({type: 'main'})
        })
        .catch((error) => {
            dispatch({type:'errorUpdateProfile', errMsg: "username or password is wrong"})			
        })
    }
}

export const unlink = (username) => {
    return (dispatch) => {
        resource('POST', 'unlinkAccount', { username: username})
            .then((r) => { 
                dispatch(getAuthType())
                
                // dispatch(navigate('main'))
            })
        .catch((error) => {
            dispatch({type:'errorUpdateProfile', errMsg: error})			
            // dispatch(errLogin("username or password is wrong"))})
        })
    }
}