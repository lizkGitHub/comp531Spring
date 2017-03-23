import React from 'react'
import { connect } from 'react-redux'
import {removeFollower} from './followerAction'

const Follower = ({imgSrc, friendName, friendStatus, id, delFollower}) => {
    const _delFollower = () => {
        delFollower(friendName)
    }
    return (
    <div className="friend-list" id={id}>
        <button className="glyphicon glyphicon-remove" onClick={_delFollower}></button>
        <img src={imgSrc} className="img-circle  center-block"/> 
        <div className="clearfix"></div>
        <div className="friend-list-info"><a href="#" className="lead">{friendName}</a></div>
        <p className="friend-list-info">{friendStatus}</p>
        <hr/>
    </div>)
}

const mapDispatchToProps = (dispatch, getstate, ownProps) => ({ 
    delFollower: (username) => {
        dispatch(removeFollower(username)) 
    }
});
export default connect(null, mapDispatchToProps)(Follower);