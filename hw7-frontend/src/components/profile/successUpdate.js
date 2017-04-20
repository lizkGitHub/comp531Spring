import React from 'react'
import { connect } from 'react-redux'

const SuccessUpdate = ({ updateSuccess, successMsg }) => {
	if (updateSuccess){
		return (
			<div className="alert alert-danger " id="successMsg">
			    <strong>success!</strong>  {successMsg}
			</div>
		);
	}else{
		return ( <div></div> );
	}
}

const mapStateToProps = state => ({ updateSuccess: state.profile.updateSuccess, successMsg : state.profile.successMsg });
export default connect(mapStateToProps, null)(SuccessUpdate);