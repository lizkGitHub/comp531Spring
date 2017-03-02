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

const Avatar = ({profiles}) => (
	<div className="col-sm-4">
        <h2 className="form-signup-heading col-sm-offset-3">Current Info</h2>
        <br/> 
        <p><img src="figures/imgUserHead0.jpg" 
            className="img-user-head center-block img-rounded user"></img></p>
         <div className="fileUpload center-block btn btn-md btn-primary">
            <span>upload new picture</span>
            <input type="file" className="form-control upload" id="uploadPhoto"/>
        </div>
        <br/><br/>
        <table className="table table-hover"> 
            <tbody> 
                <InfoItem id="displayName" label="DisplayName" text={profiles[0].displayName}/>
                <InfoItem id="email" label="email" text={profiles[0].email}/>
                <InfoItem id="phoneNum" label="PhoneNumber" text={profiles[0].phone}/>
                <InfoItem id="birthdate" label="birthdate" text={profiles[0].birthdate}/>
                <InfoItem id="zipCode" label="zipCode" text={profiles[0].zipCode}/>
            </tbody> 
        </table> 

    </div>
);

const mapStateToProps = (state) => ({ profiles: state.profile.profiles});
export default connect(mapStateToProps, null)(Avatar);

