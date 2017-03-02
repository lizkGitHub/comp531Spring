import React from 'react'
import { connect } from 'react-redux'

import NavMain from './navMain'
import Headline from './headline'
import Followers from './followers'
import Articles from './articles'
import PostArticle from './postArticle'
import Searchbar from './searchbar'

const Main = () => (
	<div>
		<NavMain/>
	    <div className="container-fluid">
	        <div className="row">
	            <div className="col-sm-3 well">
	                <Headline/>
	                <Followers/>
	            </div>
	            <div className="col-sm-9">
                    <PostArticle/>
                    <Searchbar/>
		            <Articles/>
		        </div>
	        </div>
	    </div>
	    <footer className="container-fluid text-center">
	        <p>RiceBook © 2017</p>
	        <p>Contact: Zhaokang.li@rice.edu</p>
	    </footer>
	</div>
)


export default connect(null, null)(Main);

