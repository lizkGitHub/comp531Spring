
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
     newArticle.text = req.body.text
     res.send(newArticle)
     articles['articles'].push(newArticle)
}

const getArticles = (req, res) => {
    const id = req.params.id
    if (!id) {
        res.send(articles)
    } else {
     const result = {}
     result.articles = articles.articles.filter(x => (x.id == id))
        res.send(result)
    }
}



module.exports = (app) => {
     app.post('/article', addArticle)
     app.get('/articles/:id*?', getArticles)
}