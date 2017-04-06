import React from 'react'
import { connect } from 'react-redux'
import ErrUpdate from './errorUpdate'
import SuccessUpdate from './successUpdate'
import { updateProfile } from './updateProfileAction'

export const UpdateItem = ({inputtype, id, placeholderText, label, pattern, reference, readonly}) => {
    return (
        <div className="form-group">
            <label className="control-label col-sm-4">{label}</label>
            <div className="col-sm-6">
                <input type={inputtype} id={id} className="form-control" ref={reference}
                placeholder={placeholderText} pattern={pattern} readOnly={readonly}>
                </input>
            </div>
        </div>
    )
}

const Update = ({ update, profile }) => {
    let displayName;  // used to clear input
    let email
    let phone
    let zipcode
    let password
    let confirmPW
    const _update = (event) => {
        update(event, displayName, email, phone, zipcode, password, confirmPW, profile)
        displayName.value=""
        email.value=""
        phone.value=""
        zipcode.value=""
        password.value=""
        confirmPW.value=""
    }
 	return (
     <div>
        <form name="accountRegisteration" className="form-horizontal col-sm-6" id="signOnForm" action="#">
        	<h2 className="form-signup-heading col-sm-offset-3">Update your info</h2>
        	<br/> 
            <UpdateItem inputtype="text" id="displayNameValue" reference={(node) => {displayName=node; return node}} placeholderText="(Optional) please enter a name to display"
             label="Display name:" readonly="readonly"/>
            <UpdateItem inputtype="email" id="emailAddr" reference={(node) => {email=node; return node}} placeholderText="Please enter an email address"
             label="Email:"/>
            <UpdateItem inputtype="text" id="phoneNumber" reference={(node) => {phone=node; return node}} pattern='^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$'
            placeholderText="e.g. 713-333-3333" label="Phone Number:" readonly="readonly"/>
            <UpdateItem inputtype="text" id="zipCodeValue" reference={(node) => {zipcode=node; return node}} pattern='^[0-9][0-9][0-9][0-9][0-9]$'
            placeholderText="e.g. 77030" label="Zip code:"/>
            <UpdateItem inputtype="password" id="pwdValue"
            placeholderText="Please set an password" reference={(node) => {password=node; return node}} label="Password:"/>
            <UpdateItem inputtype="password" id="pwdConfValue"
            placeholderText="Please re-enter the password" reference={(node) => {confirmPW=node; return node}} label="Confirm Password:"/>
            <div className="col-sm-8 col-sm-offset-2" >
            	<div><ErrUpdate/></div>
                <div><SuccessUpdate/></div>
                <button className="btn btn-primary btn-block"  id="submit" onClick={ _update }>Update</button>
            </div>
            <div className="col-sm-2">
            </div>
        </form> 
    </div>)
};

const mapStateToProps = (state) => ({ profile: state.profile.profiles});
const mapDispatchToProps = dispatch => ({ update: (event, displayName, email, phone, zipcode, password, confirmPW, profile) => ( 
    dispatch(updateProfile(event, displayName, email, phone, zipcode, password, confirmPW, profile))) });

export default connect(mapStateToProps, mapDispatchToProps)(Update);