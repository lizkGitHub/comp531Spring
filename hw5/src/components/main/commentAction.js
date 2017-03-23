export const addComment = () => {
    return ({ type: 'addComment'});
}

export const toggleComments = (_id, showComments) => {
    return ({
            type: 'toggleComments',
            _id, showComments
        })
}