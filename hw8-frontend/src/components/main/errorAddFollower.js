import React from 'react'
import { connect } from 'react-redux'

const ErrAdd = ({ hasError, msg }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong>{msg}</strong> 
			</div>
		);
	}else{
		return ( <div></div> );
	}
}

const mapStateToProps = state => ({ hasError: state.main.hasAddFollowerError, msg: state.main.errFollowerMsg});
export default connect(mapStateToProps, null)(ErrAdd);