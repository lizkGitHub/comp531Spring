import React from 'react'
import { connect } from 'react-redux'

const Headline = ({ headline, updateHeadline }) => {
	let newHeadline;
	const _Update = () => (
		updateHeadline(newHeadline)
	)
	return(
		<div className="well">
			<img src="figures/imgUserHead0.jpg" className="img-responsive"></img>
			<h3>Finch</h3>
			<p><span id="currentStatus">{headline}</span></p>

		<div className="input-group text-center">
			<input className="form-control input-sm" id="inputStatus" ref={(node) => newHeadline=node} placeholder="new status" type="text"></input>
				<span className="input-group-btn"><button id="btnUploadStatus" className="btn btn-sm btn-primary" onClick={ _Update } type="button">Update</button></span>
			</div>

		</div>
	)
}

const mapStateToProps = (state) => ({ headline: state.main.headline});
const mapDispatchToProps = (dispatch) => ({ 
    updateHeadline: (newHeadline) => {
        dispatch({ type: 'updateHeadline', headline: newHeadline.value}) 
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Headline);
