export const editArticle = () => {
    return ({ type: 'editArticle'});
}

export const addComment = () => {
    return ({ type: 'addComment'});
}

export const addArticle = (newArticleText) => {
    
    if (newArticleText == null 
    || newArticleText == "") {
        return ({ type: 'addArticleError'});
    }
    const newArticle = {"_id": Math.random() * 10000, "date": (new Date()).toString(), "text": newArticleText.value, "img":null, "comments":[], "author":"Finch"};
    newArticleText.value = ""  // clear the input
    return ({ type: 'addArticle', newArticle});

}

export const search = (text) => {
    return ({ type: 'search', "text": text.value });
}