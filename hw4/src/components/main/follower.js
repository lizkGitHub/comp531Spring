import React from 'react'
import { connect } from 'react-redux'
import {deleteFollower} from './followerAction'

const Follower = ({imgSrc, friendName, friendStatus, id, delFollower}) => (
    <div className="friend-list" id={id}>
        <button className="glyphicon glyphicon-remove" onClick={delFollower}></button>
        <img src={imgSrc} className="img-circle  center-block"/> 
        <div className="clearfix"></div>
        <div className="friend-list-info"><a href="#" className="lead">{friendName}</a></div>
        <p className="friend-list-info">{friendStatus}</p>
        <hr/>
    </div>
)

const mapDispatchToProps = (dispatch, ownProps) => ({ 
    delFollower: () => {
        dispatch(deleteFollower(ownProps.friendName)) 
    }
});

export default connect(null, mapDispatchToProps)(Follower);