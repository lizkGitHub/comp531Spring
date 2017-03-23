import React from 'react'
import { connect } from 'react-redux'
import {putHeadline} from './../profile/updateProfileAction'

const Headline = ({username, headline, putHeadline, avatar }) => {
	let newHeadline;
	const _Update = () => (
		putHeadline(newHeadline)
	)
	return(
		<div className="well">
			<img src={avatar} className="img-responsive"></img>
			<h3>{username}</h3>
			<p><span id="currentStatus">{headline}</span></p>

		<div className="input-group text-center">
			<input className="form-control input-sm" id="inputStatus" ref={(node) => newHeadline=node} placeholder="new status" type="text"></input>
				<span className="input-group-btn"><button id="btnUploadStatus" className="btn btn-sm btn-primary" onClick={ _Update } type="button">Update</button></span>
			</div>

		</div>
	)
}

const mapStateToProps = (state) => ({
	username: state.profile.profiles.username, 
	headline: state.profile.profiles.headline, 
	avatar: state.profile.profiles.avatar});
const mapDispatchToProps = (dispatch) => ({ 
    putHeadline: (newHeadline) => {
        dispatch(putHeadline(newHeadline.value)) 
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Headline);
