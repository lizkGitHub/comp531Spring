import React from 'react'
import { connect } from 'react-redux'

const ErrAddArticle = ({ hasError, msg }) => {
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

const mapStateToProps = state => ({ hasError: state.main.hasAddArticleError, msg: state.main.errMsg });
export default connect(mapStateToProps, null)(ErrAddArticle);