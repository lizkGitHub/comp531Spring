import { resource } from './../../actions'

export const addComment = (_id, comment) => {
    const endpoint = `articles/${_id}`
    return (dispatch) => {
        resource('PUT', endpoint, {
            text:comment, commentId: -1
        })
        .then((r) => {
            const commentArticle = r.articles[0]
            commentArticle.comments.sort((a,b) => {
								if (a.date < b.date)
									return 1
								if (a.date > b.date)
									return -1
								return 0
							})
            const addedComment = commentArticle.comments[0]
            dispatch({
                        type: 'addComment',
                        _id, 
                        comment : addedComment,
                        article: commentArticle
                    })
        })
    }
}

export const toggleComments = (_id, showComments) => {
    return ({
            type: 'toggleComments',
            _id, showComments
        })
}

export const postEditComment = (articleId, commentId, commentContent) => {
    const endpoint = `articles/${articleId}`
    return (dispatch) => {
        resource('PUT', endpoint, {text:commentContent, commentId: commentId})
        .then((r) => {
            const editedArticle = r.articles[0]
            const commentArticle = r.articles[0]
            editedArticle.comments.sort((a,b) => {
                if (a.date < b.date)
                    return 1
                if (a.date > b.date)
                    return -1
                return 0
            })
            dispatch({
                type: 'editPostArticle',
                id: articleId,
                editedArticle: editedArticle
            })
        })
        .catch((err) => {
            dispatch({type: 'articleError', msg:err})
        })
    }
}

