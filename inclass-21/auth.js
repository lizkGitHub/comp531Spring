const md5 = require('md5')
var cookieParser = require('cookie-parser') 
var User = {users: []};

module.exports = app => {
	app.post('/login', login)
	app.post('/register', register)
}

var cookieKey = 'sid'

const register = (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	console.log(username)
	const user = {username}
	user.salt = 'Add Salt' + Math.random().toString()
	user.hash = md5(user.salt + password);
	User.users.push(user);
	const msg = {username : username, result : "success"}	
	console.log(msg)
	res.send(msg)
	// res.send({users: [{username: username, salt: salt, h1: h1}]});
}

function isLoggedIn(req, res, next) {
	var sid = req.cookies[cookieKey]

	if(!sid) {
		return res.sendStatus(401)
	}

	var username = sessionUser[sid]
	if(username) {
		req.username = username
		next()
	} else {
		res.sendStatus(401)
	}
}

const getUser = (username) => {
	const result = User.users.filter((user) => user.username === username)
	if (result.length === 0) {
		return
	} else {
		return result[0]
	}
}

function login(req, res) {
	var username = req.body.username
	var password = req.body.password
	console.log(username)
	if (!username || !password) {
		res.sendStatus(400)
		return
	}
	var userObj = getUser(username)
	if (!userObj) {
		res.sendStatus(401)
		return
	}
	const hash = md5(userObj.salt + password)
	if (hash !== userObj.hash) {
		res.sendStatus(401)
		return
	}
	res.cookie(cookieKey, generateCode(userObj),
		{maxAge: 3600*1000, httpOnly: true})
	var msg = { username: username, result: 'success login'}
	res.send(msg)
}

const generateCode = (userObj) => {
	return md5(JSON.stringify(userObj))
}