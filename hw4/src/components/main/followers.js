import React from 'react'
import { connect } from 'react-redux'
import Follower from './follower.js'
import {addFollower} from './followerAction'
import ErrAdd from './errorAddFollower.js'

const Followers = ({followerlist, addFollower}) => {
    let username; // used to clear input text
    const _addFollower = () => (
        addFollower(username)
    )
    return (
    <div className="panel panel-default well well-list">
        <div className="panel-heading"><a href="#" className="pull-right">View all</a> 
            <h4>Friends</h4>
        </div>

        <div className="panel-body">
            {
                followerlist.map(follower => 
                (<Follower id={follower._id} key={follower._id} imgSrc={follower.img} 
                friendName={follower.name} friendStatus={follower.status}/>))
            }
        <div className="input-group text-center">
            <input className="form-control input-sm" id="addUser" ref={(node) => username=node} placeholder="user" type="text"/>
                <span className="input-group-btn"><button id="btnAddStatus" className="btn btn-sm btn-primary" 
                onClick={_addFollower} type="button">Add</button></span>
        </div>
        <ErrAdd/>
        </div>
    </div>		
    )
       
}


const mapStateToProps = (state) => ({ followerlist: state.main.followers});
const mapDispatchToProps = (dispatch) => ({ 
    addFollower: (username) => {
        dispatch(addFollower(username)) 
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Followers);