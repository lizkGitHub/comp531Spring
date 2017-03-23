import React from 'react'
import { connect } from 'react-redux'

import { editArticle  } from './articleAction'
import { toggleComments, addComment} from './commentAction'
import Comment from './comment'
export const Article = ({ _id, author, date, text, img, btnEditValue, btnAddCommentValue, comments, showComments, editArticle, addComment, toggleComments}) => {
    
    let showCommentBtn = "ShowComment"
    let hideCommentBtn = "HideComment"
    let commentBtn = (showComments===true ? hideCommentBtn : showCommentBtn)
    const _toggleComments = () => {
        return toggleComments(_id, !showComments)
    }
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
            <div className="card-user">            
            <span><a href="#" className="lead card-user-name">{author}</a>
            <span className="glyphicon glyphicon-pencil" aria-hidden="false"></span>
            <span className="small timestamp">{date}</span></span>
            { btnEditValue ? 
                <button className="btn btn-sm btn-default pull-right" type="button" 
                id="editArticle" onClick={ editArticle }>edit</button>
            : null}
            </div>
            </div>
            <div className="panel-body">
            <p className="card-user-content">{text}</p>
            { img!==null && img!=='' && img!==undefined ? <img  className="card-img" src={img}/> : null }

            <br/>
            { btnAddCommentValue ? 
                <form className="form">
                <div className="input-group text-center">
                <input className="form-control input-sm" id="commentText" placeholder="Comment..." type="text"/>
                    <span className="input-group-btn"><button id="addComment" className="btn btn-sm btn-primary" 
                    type="button" onClick={ addComment }>Comment</button></span>
                    <span className="input-group-btn"><button id="showComment" className="btn btn-sm btn-primary" 
                    type="button" onClick={ _toggleComments }>{commentBtn}</button></span>
                </div>  
                </form>
            : null}

            <div>
                {showComments ? comments.map(c =>
                    <Comment author={c.author} key={c.commentId} date={c.date} avatar={c.avatar} 
                    articleId={c._id} text={c.text} />
                ) : null}
            </div>
            </div>
        </div>
    );  
}

const mapStateToProps = (state, ownProps )=> ({ 
		_id: ownProps._id, author: ownProps.author, date: ownProps.date, text: ownProps.text, img: ownProps.img, 
        btnEditValue: state.main.btnEditArticle, btnAddCommentValue: state.main.btnAddCommentValue
		});
const mapDispatchToProps = dispatch => ({ editArticle: () => dispatch(editArticle()), 
										  addComment: () => dispatch(addComment()),
                                        toggleComments: (_id, showComments) => dispatch(toggleComments(_id, 
                                        showComments))});

export default connect(mapStateToProps, mapDispatchToProps)(Article);