import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logIn } from './loginAction'
import ErrLogIn from './errorLogIn'
import {url} from './../../actions'

const LogIn = ({ logInEvent }) => {
	let username, pwd
	const _logInEvent = () => {
		logInEvent(username.value, pwd.value)
	}
	return (
		<div>
			<h2 className="form-signin-heading col-sm-offset-2">Please log in!</h2>
			<p><input type="text" id="inputUserName" ref={ (node) => username = node } className="form-control" placeholder="User Name" required></input></p>
			<p><input type="password" id="inputPassword" ref={ (node) => pwd = node } className="form-control" placeholder="Password" required></input></p>
			<div><ErrLogIn/></div>
			<button className="btn btn-primary btn-primary btn-block" type="submit" id="logIn" onClick={ _logInEvent }>Sign in</button>
			<br/>
			<a href={`${url}/auth/facebook`} className="btn btn-primary center-block">Login with Facebook</a>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({ logInEvent: (username, pwd) => dispatch(logIn(username, pwd)) });
export default connect(null, mapDispatchToProps)(LogIn);