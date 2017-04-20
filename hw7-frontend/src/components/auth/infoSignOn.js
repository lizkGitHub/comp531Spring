import React from 'react'
import { connect } from 'react-redux'

const InfoSignOn = ({ hasError, success, hasPwdError, errRegisterMsg, successRegisterMsg }) => {
	if (success){
		return (
			<div id="infoSignOnSuccess" className="alert alert-success fade in">
			    <strong>Success!</strong> {successRegisterMsg}
			</div>
		);
	}else if (hasError){
		return (
			<div className="alert alert-danger fade in">
			    <strong>Error!</strong> {errRegisterMsg}
			</div>
		);
	}else if (hasPwdError){
		return (
			<div className="alert alert-danger fade in">
			    <strong>Error!</strong> Two passwords are different!
			</div>
		);
	}else{
		return (<div></div>);
	}
}

const mapStateToProps = state => ({ 
	hasError: state.register.hasErrorSignOn, 
	success: state.register.successSignOn, 
	hasPwdError: state.register.hasPwdErrorSignOn,
	errRegisterMsg: state.register.errRegisterMsg,
	successRegisterMsg: state.register.successRegisterMsg
	 });

export default connect(mapStateToProps, null)(InfoSignOn);

