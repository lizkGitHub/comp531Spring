import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './main/main'
import Profile from './profile/profile'
import Landing from './auth/landing'

var  App = ({location}) => {
    let Child = Landing
    switch (location) {
        case 'main' :
            Child = Main
            break
        case 'profile' :
            Child = Profile 
            break
        default:
            Child = Landing 
    }
    return (
        <div>
            <Child/>    
        </div>

    )
}

const mapStateToProps = state => ({ location: state.navigate.location });

App = connect((state) => mapStateToProps, null)(App);

export default App;
