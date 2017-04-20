import { resource } from './../../actions'
import {getArticles} from './articleAction'
export const deleteFollower = (delUser) => {
    return ({ type: 'deleteFollower', delUser: delUser});
}

export const removeFollower = (userId) => {
    return (dispatch, getState) => {
        const endpoint = `following/${userId}`
        resource('DELETE', endpoint).then ((r) => {
            const idList = r.following
            // get the previous followings state
            const {followers} = getState().main

            if (idList.length !== followers.length - 1) {
                return
            }
            dispatch(clearFollowerArticle())
            dispatch(getArticles(r.username))
            dispatch(getFollowings(r.username))
            dispatch(deleteFollower(userId))
        }).catch((err) => {
            dispatch({type: "addFollowerError", data:err})
        })
    }
}

export const putFollowing = (userId) => {
    return (dispatch, getState) => {
        const endpoint = `following/${userId}`
        resource('PUT', endpoint).then ((r) => {
            const idList = r.following
            // get the previous followings state
            const {followers} = getState().main
            if (idList.indexOf(userId) === -1) {
                dispatch({type : 'addFollowerError', data : 'User is invalid'})
                return
            } else if (followers.findIndex(x => x.username === userId) !== -1) {
                dispatch({type : 'addFollowerError', data : 'User has already been your following'})
                return
            }
            dispatch(getFriendProfile(userId))
            dispatch(getArticles(userId))
        }).catch((err) => {
            dispatch({type: "addFollowerError", data:err})
        })
    }
}

export const addFollower = (follower) => {    
    return ({ type: 'addFollower', follower});
}

export const clearFollowerArticle = () => {
    return ({ type: 'clearFollowerArticle'})
}

export const getFollowings = (userId) => {
    
    const endpoint = (userId) ? `following/${userId}` : 'following'
    return (dispatch) => {
        resource('GET', endpoint, )
            .then((r) => {
                const idList = r.following
                const pList = idList.map((id) => {
                    dispatch(getFriendProfile(id))
                    // dispatch(getArticles(id))
                })

            })
            .catch((err) => {
                dispatch({type: "addFollowerError", data:err})
            })
    }
}

export const getFriendProfile = (userId) => {
    const friend = {username : userId}
    const p1 = resource('GET', 'avatars' + '/' + userId)
        .then((r) => {
                friend.avatar = r.avatars[0].avatar
            }
        )
        .catch((err) => {
            dispatch({type: "addFollowerError", data:err})
        })
    const p2 = resource('GET', 'headlines' + '/' + userId)
        .then((r) => {
                friend.headline = r.headlines[0].headline
            }
        )
        .catch((err) => {
            dispatch({type: "addFollowerError", data:err})
        })
    return (dispatch) => {
        Promise.all([p1, p2]).then(() => {
            dispatch(addFollower(friend))
        })
    }
}