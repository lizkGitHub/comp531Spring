import React from 'react'
import { connect } from 'react-redux'
import {postArticle} from './articleAction'
import ErrAddArticle from './errorAddArticle.js'

const PostArticle = ({addArticle}) => {
    let articleText

    const _addArticle = () => {
        addArticle(articleText.value)
    }

    const _clear = () => {
        articleText.value = ""
    }

    return (
    <div className="row">
        <div className="col-sm-12">
            <div className="panel panel-default text-left">
                <div className="panel-body">
                        <div className="form-group col-sm-12">
                            <textarea className="form-control" id="inputArticle" rows="4" 
                            ref={ (node) => articleText = node } placeholder="share..."></textarea><br/>
                            <input type="file" className="form-control" id="uploadPhoto" name="upload a photo"></input>
                        </div>
                        <button type="reset" onClick={_clear} className="btn btn-primary btn-sm col-sm-offset-10">Cancel</button>
                        <button type="button" className="btn btn-primary btn-sm" onClick={ _addArticle }> Post </button>
                    <ErrAddArticle/>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => ({ 
    addArticle: (text) => {
        dispatch(postArticle(text)) 
    }
});
export default connect(null, mapDispatchToProps)(PostArticle);
