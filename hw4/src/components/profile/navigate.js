import React from 'react'
import { connect } from 'react-redux'

const Navigate = ({ nevToMain, logOut }) => (
	<div>
		<nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand active">Ricebook</a>
                </div>

                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li><a onClick={ nevToMain }>Home</a></li>
                        <li className="active"><a>Profile</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a id="logOut" onClick={ logOut }><span className="glyphicon glyphicon-user"></span> Log out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
	</div>
);

const mapDispatchToProps = dispatch => ({ nevToMain: () => dispatch({type: 'main'}), 
                                          logOut: () => dispatch({type:'landing'}) });

export default connect(null, mapDispatchToProps)(Navigate);