import React from 'react'
import { connect } from 'react-redux'

const Comment = ( { avatar, date, author, text, articleId} ) => {
	const newDate = date.substring(0, 10);
	const newSecond = date.substring(11, 19);
		return (
			  	<div className="well">
			      	<p className="commentText" >
			      		<span > <b>{author}</b> commented at {newSecond} on {newDate} :</span>
			      	</p>
                    <p className="commentText" >{text}</p>
				</div>
		);

}

export default connect(null, null)(Comment);