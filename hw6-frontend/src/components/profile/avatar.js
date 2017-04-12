import React from 'react'
import {Component} from 'react'
import { connect } from 'react-redux'
import { putAvatar } from './updateProfileAction'

export const InfoItem = ({id, text, label}) => {
    return (
        <tr> 
            <td>{label}</td> 
            <td id={id}>{text}</td> 
        </tr> 
    )
}

const Avatar = ({profiles, putAvatar}) => {
let fd = new FormData()
const _uploadImage = (e) => {
    let file = e.target.files[0]
    if (file != null && file != "") {
        fd.append('image', file)
        putAvatar(fd)
    } 
    
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

    </div>
)};

const mapStateToProps = (state) => ({ profiles: state.profile.profiles});
const mapDispatchToProps = dispatch => ({ putAvatar: (fd) => dispatch(putAvatar(fd)) });

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
