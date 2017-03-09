var headlines = {headlines: [
        {username: 'user1', headline: 'user1 headline'}, 
        {username: 'user2', headline: 'user2 headline'}
]}

var emails = {emails: [
        {username: 'user1', email: 'user1@rice.edu'}, 
        {username: 'user2', email: 'user2@rice.edu'}
]}

var zipcodes = {zipcodes: [
        {username: 'user1', zipcode: '77030'}, 
        {username: 'user2', zipcode: '77035'}
]}

var avatars = {avatars: [
        {username: 'user1', avatar: 'www.rice.edu'}, 
        {username: 'user2', avatar: 'www.rice.edu'}
]}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
    res.send(headlines.headlines.filter(r => r.username == req.params.user))
}

const putHeadine = (req, res) => {
    headlines.headlines.map(r => {
        if (r.username == req.body.username) {
            r.headline = req.body.headline
        }
    })
    res.send(headlines.headlines.filter(r => r.username == req.body.username))
}

const getEmail = (req, res) => {
    res.send(emails.emails.filter(r => r.username == req.params.user))
}

const putEmail = (req, res) => {
    emails.emails.map(r => {
        if (r.username == req.body.username) {
            r.email = req.body.email
        }
    })
    res.send(emails.emails.filter(r => r.username == req.body.username))

}

const getZipcode = (req, res) => {
    res.send(zipcodes.zipcodes.filter(r => r.username == req.params.user))
}

const putZipcode = (req, res) => {
    zipcodes.zipcodes.map(r => {
        if (r.username == req.body.username) {
            r.zipcode = req.body.zipcode
        }
    })
    res.send(zipcodes.zipcodes.filter(r => r.username == req.body.username))
}

const getAvatar = (req, res) => {
    res.send(avatars.avatars.filter(r => r.username == req.params.user))
}

const putAvatar = (req, res) => {
    avatars.avatars.map(r => {
        if (r.username == req.body.username) {
            r.avatar = req.body.avatar
        }
    })
    res.send(avatars.avatars.filter(r => r.username == req.body.username))
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadline)
     app.put('/headline', putHeadine)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatar)
     app.put('/avatar', putAvatar)
}
