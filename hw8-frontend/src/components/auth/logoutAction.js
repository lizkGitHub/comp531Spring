import {resource,navigate} from './../../actions'
import {clearFollowerArticle} from './../main/followerAction'
export const logout = () => {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(() => {
                dispatch({type: 'normalLogout'})
                // clean the state content
                dispatch(clearFollowerArticle())
                dispatch({type: 'clearProfile'})
                dispatch({type: 'clearMain'})
                dispatch(navigate('landing'))
            })
            .catch((err) => {
                alert(err)
            })
    }
}