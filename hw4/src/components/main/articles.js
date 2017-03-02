import React from 'react'
import { connect } from 'react-redux'

import Article from './article'

const Articles = ({ getArticles, articles }) => (
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
          		comments={article.comments}/> ) 
		}     
	</div>
);

function filter(articles, target) {
	return articles.filter(({author, text}) => (author.indexOf(target) > -1 || text.indexOf(target) > -1))
}


const mapStateToProps = state => ({ articles: filter(state.main.articles, state.main.filterText) });
export default connect(mapStateToProps, null)(Articles);