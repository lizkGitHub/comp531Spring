import React from 'react'
import {Component} from 'react'
import { connect } from 'react-redux'
import { putAvatar } from './updateProfileAction'
import { url } from './../../actions'
import {link2Normal, unlink} from './../auth/loginAction'
export const InfoItem = ({id, text, label}) => {
    return (
        <tr> 
            <td>{label}</td> 
            <td id={id}>{text}</td> 
        </tr> 
    )
}

const Avatar = ({profiles, putAvatar, authType, link2Normal, logInUser, unlink, normalUser}) => {


let fd = new FormData()
let username, password
const _uploadImage = (e) => {
    let file = e.target.files[0]
    if (file != null && file != "") {
        fd.append('image', file)
        putAvatar(fd)
    } 
    
}
console.log(profiles)

const _link2Normal = () => {
    link2Normal(username.value, password.value, profiles.username)
}

const _unlink = () => {
    unlink(profiles.username)
}

return (
	<div className="col-sm-4">
        <h2 className="form-signup-heading col-sm-offset-3">Current Info</h2>
        <br/> 
        <p><img src={profiles.avatar} 
            className="img-user-head center-block img-rounded user"></img></p>
         <div className="fileUpload center-block btn btn-md btn-primary">
            <span>upload new picture</span>
            <input type="file" accept="image/jpg" className="form-control upload" id="uploadPhoto"
                onChange={(e) => _uploadImage(e)}/>    
        </div>
        <p className="center"> only .jpg accepted</p>
        <br/><br/>
        <table className="table table-hover"> 
            <tbody> 
                <InfoItem id="displayName" label="DisplayName" text={profiles.displayName}/>
                <InfoItem id="email" label="email" text={profiles.email}/>
                <InfoItem id="phoneNum" label="PhoneNumber" text={profiles.phone}/>
                <InfoItem id="birthdate" label="birthdate" text={(new Date(profiles.dob)).toLocaleDateString()}/>
                <InfoItem id="zipCode" label="zipCode" text={profiles.zipcode}/>
            </tbody> 
        </table> 
        {(authType.normal && authType.facebook) ? <p>facebook account is linked to normal account. You can unlink when you log in as normal user.</p>: null}
        {(authType.normal && authType.facebook && (normalUser) && (!profiles.username.includes('@facebook'))) ? <button className="btn btn-primary"  onClick={ _unlink }>Unlink Account</button>: null}
        {!(authType.normal) ? 
            (
                <div>
                    <p>link to normal account</p>
                    <form name="link2Normal" className="form-horizontal" action="#">
                        <input type='text' className="form-control" ref={(node) => (username = node)}
                            placeholder='username'></input>
                        <input type='password' className="form-control" ref={(node) => (password = node)}
                            placeholder='password'></input>
                    </form>
                    <button className="btn btn-primary"  onClick={ _link2Normal }>Link Normal Account</button>
                </div>
            )
            : null}
        {/*{!(authType.facebook) ? <a href={`${url}/auth/facebook`} className="btn btn-primary">Link Facebook Account</a>: null}*/}
        {!(authType.facebook) ? <p>you can link to facebook in profile page when you log in with facebook account</p>: null}

        {/*<a href={`${url}/linkAccount`} className="btn btn-info">Link Account</a>*/}
        

    </div>
)};

const mapStateToProps = (state) => ({ 
    profiles: state.profile.profiles,
    authType: state.logIn.authType,
    normalUser: state.logIn.normalUser
});
const mapDispatchToProps = dispatch => ({ 
    putAvatar: (fd) => dispatch(putAvatar(fd)),
    link2Normal: (username, password, logInUser) => {
        dispatch(link2Normal(username, password, logInUser))
        // linkAccount()(dispatch)
    },
    unlink: (username) => dispatch(unlink(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

