import React from 'react'
import { connect } from 'react-redux'

const ErrUpdate = ({ hasError, errMsg }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong>Error!</strong>  {errMsg}
			</div>
		);
	}else{
		return ( <div></div> );
	}
}

const mapStateToProps = state => ({ hasError: state.profile.hasError, errMsg : state.profile.errMsg });

export default connect(mapStateToProps, null)(ErrUpdate);