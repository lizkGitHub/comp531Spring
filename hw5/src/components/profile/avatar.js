import React from 'react'
import {Component} from 'react'
import { connect } from 'react-redux'

export const InfoItem = ({id, text, label}) => {
    return (
        <tr> 
            <td>{label}</td> 
            <td id={id}>{text}</td> 
        </tr> 
    )
}

const Avatar = ({profiles}) => {
return (
	<div className="col-sm-4">
        <h2 className="form-signup-heading col-sm-offset-3">Current Info</h2>
        <br/> 
        <p><img src={profiles.avatar} 
            className="img-user-head center-block img-rounded user"></img></p>
         <div className="fileUpload center-block btn btn-md btn-primary">
            <span>upload new picture</span>
            <input type="file" className="form-control upload" id="uploadPhoto"/>
        </div>
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
export default connect(mapStateToProps, null)(Avatar);

