import React from 'react'
import { connect } from 'react-redux'

import { editArticle, addComment } from './articleAction'
const Article = ({ _id, author, date, text, img, btnEditValue, btnAddCommentValue, editArticle, addComment}) => (
	
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
        { img===null ? null : <img  className="card-img" src={img}/> }
        <br/>
        { btnAddCommentValue ? 
            <form className="form">
            <div className="input-group text-center">
            <input className="form-control input-sm" id="commentText" placeholder="Comment..." type="text"/>
                <span className="input-group-btn"><button id="addComment" className="btn btn-sm btn-primary" 
                type="button" onClick={ addComment }>Comment</button></span>
            </div>  
            </form>
        : null}
        </div>
    </div>
);


const mapStateToProps = (state, ownProps )=> ({ 
		_id: ownProps._id, author: ownProps.author, date: ownProps.date, text: ownProps.text, img: ownProps.img, 
        btnEditValue: state.main.btnEditArticle, btnAddCommentValue: state.main.btnAddCommentValue
		});
const mapDispatchToProps = dispatch => ({ editArticle: () => dispatch(editArticle()), 
										  addComment: () => dispatch(addComment()) });

export default connect(mapStateToProps, mapDispatchToProps)(Article);