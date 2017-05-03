import React from 'react'
import { connect } from 'react-redux'
// import ContentEditable from './contentEditable'
import { postEditComment  } from './commentAction'



const Comment = ( { avatar, date, commentId, author, text, articleId, loginUser, postEditComment} ) => {
	const newDate = date.substring(0, 10);
	const newSecond = date.substring(11, 19);
	let commentContent
	var ContentEditable = require("react-contenteditable");

	const _postEditComment = () => {
		if(typeof(commentContent) == "undefined") {
			return
		}
        postEditComment(articleId, commentId, commentContent)
    }
	return (
			<div className="well">
				<p className="commentText" >
					<span > <b>{author}</b> commented at {newSecond} on {newDate} :</span>
				</p>
				{ (author == loginUser) ? 
				<button className="btn btn-sm btn-default pull-right" type="button" 
					onClick={ _postEditComment }>post comment</button>
				: null}
				<ContentEditable className="card-user-content" html={text} disabled={loginUser != author} 
				onChange={ (e) => {commentContent = e.target.value} }/>
			</div>
	);

}

const mapStateToProps = (state) => ({loginUser: state.profile.profiles.username})


const mapDispatchToProps = dispatch => ({ 
    postEditComment: (articleId, commentId, commentContent) => dispatch(postEditComment(articleId, commentId, commentContent))});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);