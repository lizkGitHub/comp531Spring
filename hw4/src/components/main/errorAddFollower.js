import React from 'react'
import { connect } from 'react-redux'

const ErrAdd = ({ hasError }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong>please input the username!</strong> 
			</div>
		);
	}else{
		return ( <div></div> );
	}
}

const mapStateToProps = state => ({ hasError: state.main.hasAddFollowerError });

export default connect(mapStateToProps, null)(ErrAdd);