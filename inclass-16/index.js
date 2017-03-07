
const express = require('express')
const bodyParser = require('body-parser')

var articles = { articles: [ 
          { id:1, author: 'Scott', body:'A post 1' },
          { id:2, author: 'author1', body:'A post 2' },
          { id:3, author: 'author2', body:'A post 3' }
     ]}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     var newArticle = {}
     newArticle.id = articles['articles'].length + 1
     newArticle.body = req.body.body
     res.send(newArticle)
     articles['articles'].push(newArticle)
}

const hello = (req, res) => res.send({ hello: 'world' })
const getArticles = (req, res) => res.send(articles)

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http:${addr.address}:${addr.port}`)
})