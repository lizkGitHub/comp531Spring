import React from 'react'
import { connect } from 'react-redux'

const ErrAddArticle = ({ hasError }) => {
	if (hasError){
		return (
			<div className="alert alert-danger ">
			    <strong>please input something to share!</strong> 
			</div>
		);
	}else{
		return ( <div></div> );
	}
}

const mapStateToProps = state => ({ hasError: state.main.hasAddArticleError });

export default connect(mapStateToProps, null)(ErrAddArticle);