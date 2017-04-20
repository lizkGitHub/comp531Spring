import React, { Component } from 'react'
import { connect } from 'react-redux'

import Article from './article'

export const Articles = ({ articles }) => {
		return (
			<div>
				{ 
					articles.sort((a,b) => {
								if (a.date < b.date)
									return 1
								if (a.date > b.date)
									return -1
								return 0
							})
					.map( article => <Article _id={article._id} key={article._id} author={article.author}
									date={article.date} text={article.text} img={article.img} 
									comments={article.comments} showComments={article.showComments}/> ) 
				}     
			</div>
	)
}


const mapStateToProps = state => ({ articles: state.main.displayedArticles });

export default connect(mapStateToProps, null)(Articles);