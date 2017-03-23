import { resource } from './../../actions'

export const editArticle = () => {
    return ({ type: 'editArticle'});
}

export const addArticle = (newArticle) => {
    
    if (newArticle == null ) {
        return ({ type: 'addArticleError'});
    }
    return ({ type: 'addArticle', newArticle});
}

export const getArticles = (userId) => {
    const endpoint = (userId) ? `articles/${userId}` : 'articles'
    return (dispatch) => {
        resource('GET', endpoint, )
            .then((r) => {
                // add showComments for hiding comments area
                const _articles = r.articles.map((article) => {
                    return {
                        ...article,
                        showComments : false,
                    }
                })
                dispatch({ type: 'getArticles', articles: _articles})
            })
            .catch((err) => {
                dispatch({type: 'articleError', msg:err})
            })
    }
}

export const postArticle = (message) => {
    const fd = new FormData();
    if (message == ""){
        return (dispatch) => dispatch({type: "articleError", 
        msg:"please input something to share!"})
    }
    fd.append('text', message);
    fd.append('image', null)
    const endpoint = 'article'
    return (dispatch) => {
        resource('POST', endpoint, fd, true)
            .then((r) => {
                const newArticle = r.articles[0]
                dispatch(addArticle(newArticle))
            })
            .catch((err) => {
                dispatch({type: 'articleError', msg:err})
            })
    }
}

export const search = (text) => {
    return ({ type: 'search', "text": text });
}