const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)
var articles = [ 
          { id:1, author: 'Scott', body:'A post 1' },
          { id:2, author: 'Scott1', body:'A post 2' },
          { id:3, author: 'Scott2', body:'A post 3' }
     ]

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)
     var payload = {}
     switch (req.url) {
         case '/':
            payload = { 'hello': 'world' }
            break
        case '/articles':
            payload = { 'articles': articles }
            break
        case '/login':
            if (req.method ==='POST') {
                var reqJson = JSON.parse(req.body)
                payload.username = reqJson.username
                payload.result = 'success'
            }
            break
        case '/logout':
            if (req.method === 'PUT') {
                payload = 'OK'
            }
        default:
            console.log('unsupported url')
     }
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}