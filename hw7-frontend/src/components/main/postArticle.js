import React from 'react'
import { connect } from 'react-redux'
import {postArticle} from './articleAction'
import ErrAddArticle from './errorAddArticle.js'

const PostArticle = ({addArticle, addArticleInfo}) => {
    let articleText
    let text
    let fd = new FormData()

    const _addArticle = () => {
        if(articleText.value !="") {
            text = articleText.value
            addArticle(text)
            addArticleInfo("successfully post an article")
        } else {
            addArticleInfo("nothing to post")
        }
        
        // fd.append('text', articleText.value)
        // if(fd.has('image') ||  (articleText.value !="")) {
        //     addArticle(fd)
        //     addArticleInfo("successfully post an article")

        // } else {
        //     addArticleInfo("nothing to post")
        // }
        
        _clear()
    }

    const _clear = () => {
        articleText.value = ""
        fd.delete('image')
        fd.delete('text')
    }

    const _uploadImage = (e) => {
        let file = e.target.files[0]
        if (file != null && file != "") {
            fd.append('image', file)
        } 
    }

    return (
    <div className="row">
        <div className="col-sm-12">
            <div className="panel panel-default text-left">
                <div className="panel-body">
                        <div className="form-group col-sm-12">
                            <textarea className="form-control" id="inputArticle" rows="4" 
                            ref={ (node) => articleText = node } placeholder="share..."></textarea><br/>
                            <input type="file" accept="image/jpg" className="form-control" id="uploadPhoto" 
                            onChange={(e) => _uploadImage(e)} name="upload a photo"></input>
                        </div>
                        <button type="reset" onClick={_clear} className="btn btn-primary btn-sm col-sm-offset-10">Cancel</button>
                        <button type="button" id="postArticleBtn" className="btn btn-primary btn-sm" onClick={ _addArticle }> Post </button>
                    <ErrAddArticle/>
                </div>
            </div>
        </div>
    </div>
    )
}

const mapDispatchToProps = (dispatch) => ({ 
    addArticle: (fd) => {
        dispatch(postArticle(fd)) 
    },
    addArticleInfo: (msg) => {
        dispatch({type:'addArticleError', msg: msg})
    }
});
export default connect(null, mapDispatchToProps)(PostArticle);



/*import React from 'react'
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
export default connect(null, mapDispatchToProps)(PostArticle);*/
