import React from 'react'
import { connect } from 'react-redux'

import { postEditArticle  } from './articleAction'
import { toggleComments, addComment} from './commentAction'
// import ContentEditable from './contentEditable'
import Comment from './comment'
export const Article = ({ _id, author, date, text,img, key, btnEditValue, btnAddCommentValue, postEditArticle, comments, showComments, editArticle, addComment, toggleComments, loginUser}) => {
    
    let showCommentBtn = "ShowComment"
    let hideCommentBtn = "HideComment"
    let commentBtn = (showComments===true ? hideCommentBtn : showCommentBtn)
    let articleContent
    let comment
    const _toggleComments = () => {
        return toggleComments(_id, !showComments)
    }
    const _postEditArticle = () => {
        postEditArticle(_id, articleContent)
    }

    const _addComment = () => {
        addComment(_id, comment.value)
        comment.value = ""
    }
    var ContentEditable = require("react-contenteditable");


    return (
        <div className="panel panel-default article">
            <div className="panel-heading">
            <div className="card-user">            
            <span><a href="#" className="lead card-user-name">{author}</a>
            <span className="glyphicon glyphicon-pencil" aria-hidden="false"></span>
            <span className="small timestamp">{date}</span></span>
            { (author == loginUser) ? 
                <button className="btn btn-sm btn-default pull-right editArticleBtn" type="button" 
                 onClick={ _postEditArticle }>edit post</button>
            : null}
            </div>
            </div>
            <div className="panel-body">
            <ContentEditable className="card-user-content" html={text} disabled={loginUser != author} 
            onChange={ (e) => {articleContent = e.target.value} }/>
            
            { img!==null && img!=='' && img!==undefined ? <img  className="card-img" src={img}/> : null }

            <br/>
            { btnAddCommentValue ? 
                <form className="form">
                <div className="input-group text-center">
                <input className="form-control input-sm" id="commentText" ref={(node) => (comment = node)} 
                placeholder="Comment..." type="text"/>
                <span className="input-group-btn"><button id="addComment" className="btn btn-sm btn-primary" 
                    type="button" onClick={ _addComment }>Comment</button></span>
                <span className="input-group-btn"><button id="showComment" className="btn btn-sm btn-primary" 
                    type="button" onClick={ _toggleComments }>{commentBtn}</button></span>
                </div>  
                </form>
            : null}

            <div>
                {showComments ? comments.sort((a,b) => {
                    if (a.date < b.date)
                        return 1
                    if (a.date > b.date)
                        return -1
                    return 0
                })
                .map(c =>
                    <Comment author={c.author} key={c.commentId} commentId={c.commentId} date={c.date} avatar={c.avatar} 
                    articleId={_id} text={c.text} />
                ) : null
                }
            </div>
            </div>
        </div>
    );  
}

const mapStateToProps = (state, ownProps )=> ({ 
		_id: ownProps._id, author: ownProps.author, date: ownProps.date, text: ownProps.text, img: ownProps.img, 
        btnEditValue: state.main.btnEditArticle, btnAddCommentValue: state.main.btnAddCommentValue, 
        loginUser: state.profile.profiles.username
		});
const mapDispatchToProps = dispatch => ({ editArticle: () => dispatch(editArticle()), 
    addComment: (_id, comment) => dispatch(addComment(_id, comment)),
    toggleComments: (_id, showComments) => dispatch(toggleComments(_id, showComments)),
    postEditArticle: (id, text) => dispatch(postEditArticle(id, text))});

export default connect(mapStateToProps, mapDispatchToProps)(Article);