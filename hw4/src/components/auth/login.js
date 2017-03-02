import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { logIn } from './loginAction'
import ErrLogIn from './errorLogIn'

const LogIn = ({ logInEvent }) => (
	<div>
		<h2 className="form-signin-heading col-sm-offset-2">Please log in!</h2>
	    <p><input type="text" id="inputUserName" className="form-control" placeholder="User Name" required></input></p>
	    <p><input type="password" id="inputPassword" className="form-control" placeholder="Password" required></input></p>
	    <div><ErrLogIn/></div>
	    <button className="btn btn-primary btn-primary btn-block" type="submit" id="logIn" onClick={ logInEvent }>Sign in</button>
    </div>
)

const mapDispatchToProps = dispatch => ({ logInEvent: () => (logIn(dispatch)) });
export default connect(null, mapDispatchToProps)(LogIn);