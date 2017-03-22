/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		.then(body => {
			expect(body.articles.length).to.be.at.least(3)
		})
		.then(done)
		.catch(done)
 	}, 500)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		fetch(url('/article'), {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'text':'first article'
			})
		})
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		// verify you get the article back with an id and the content
		.then(body => {
			expect(JSON.parse(body).id).to.not.be.undefined
			expect(JSON.parse(body).text).to.eql('first article')
			return JSON.parse(body).id
		})
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		.then(oldId => {
			fetch(url('/article'), {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				text:'second article'
			})})
			.then(res => {
				expect(res.status).to.eql(200)
				return res.json()
			})
			.then(body => {
				expect(body.id).to.eql(oldId + 1)
				expect(body.text).to.eql('second article')
			})
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		fetch(url('/articles'))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.json()
		})
		// call GET /articles first to find an id, perhaps one at random
		.then(body => {
			const idx = Math.floor(Math.random() * body.articles.length+1)
			fetch(url(`/articles/${idx}`))
			.then(res => {
				expect(res.status).to.eql(200)
				return res.json()
			})
			.then(body => {
				expect(body.articles.length).to.eql(1)
			})
		})
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned	
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/0"))
		.then(res => {
			expect(res.status).to.eql(200);
			return res.json();			
		})
		.then(body => {
			expect(body.articles.length).to.eql(0)
		})		
		.then(done)
		.catch(done)
	}, 200)

});