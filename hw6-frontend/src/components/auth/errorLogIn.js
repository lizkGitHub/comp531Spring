import React  from 'react'
import { connect } from 'react-redux'

const ErrLogIn = ({ hasError, errMsg }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong>Error:</strong>  {errMsg}
			</div>
		);
	}else{
		return (<div></div>);
	}
}

const mapStateToProps = state => ({ hasError: state.logIn.hasErrorLogIn, 
	errMsg: state.logIn.errMsg });

export default connect(mapStateToProps, null)(ErrLogIn);