import React from 'react'
import { connect } from 'react-redux'

import Navigate from './navigate'
import Avatar from './avatar'
import Update from './update'

const Profile = () => (
    <div>
    	<Navigate/>

    	<div className="container">
            <div className="col-sm-1"></div>
            <Avatar/>
    		<Update/>
            <div className="col-sm-1"></div>
        </div>

        <br/><br/>

        <footer className="container-fluid text-center">
            <p>RiceBook © 2017</p>
            <p>Contact: zhaokang.li@rice.edu</p>
        </footer>
        
    </div>
)

export default connect(null, null)(Profile);
