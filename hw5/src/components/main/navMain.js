import React from 'react'
import { connect } from 'react-redux'
import { logout } from './../auth/logoutAction'

const NavMain = ({ nevToProfile, nevToLanding }) => (
	<div>
		<nav className="navbar navbar-inverse">
	        <div className="container-fluid">
	            <div className="navbar-header">
	                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                </button>
	                <a className="navbar-brand">Ricebook</a>
	            </div>

	            <div className="collapse navbar-collapse" id="myNavbar">
	                <ul className="nav navbar-nav">
	                    <li className="active"><a>Home</a></li>
	                    <li><a  onClick={ nevToProfile }>Profile</a></li>
	                </ul>
	                <ul className="nav navbar-nav navbar-right">
	                    <li><a id="logOut" onClick={ nevToLanding }>
							<span className="glyphicon glyphicon-user"></span> Log out</a>
						</li>
	                </ul>
	            </div>
	        </div>
	    </nav>
	</div>
)

const mapDispatchToProps = dispatch => ({ nevToProfile: () => dispatch({type: 'profile'}), 
										  nevToLanding: () => dispatch(logout()) });
export default connect(null, mapDispatchToProps)(NavMain);