import React from 'react'
import { connect } from 'react-redux'

const InfoSignOn = ({ hasError, success, hasPwdError }) => {
	if (success){
		return (
			<div className="alert alert-success fade in">
			    <strong>Success!</strong> Now you can login in!
			</div>
		);
	}else if (hasError){
		return (
			<div className="alert alert-danger fade in">
			    <strong>Error!</strong> All information is required!
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
	hasPwdError: state.register.hasPwdErrorSignOn });

export default connect(mapStateToProps, null)(InfoSignOn);

