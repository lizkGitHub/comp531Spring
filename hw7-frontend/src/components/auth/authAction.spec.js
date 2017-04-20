import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Login action tests', () => {
    let url, resource, logIn, logout
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            global.fetch = fetch
            resource = require('./../../actions').resource
            url = require('./../../actions').url
            logIn = require('./loginAction').logIn
            logout = require('./logoutAction').logout

        }
    })
    url = require('./../../actions').url
    logIn = require('./loginAction').logIn
    logout = require('./logoutAction').logout

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should login in a user', (done) => {

        const username = 'zl5'
        const password = 'aaa'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username, result:'success'}
        })

        logIn(username, password)(
            (action) => {
                switch (action.type) {
                    case 'normalLogin':     
                        expect(action).to.eql({type: 'normalLogin'})
                        done()                   
                        break
                } 
            }
            
        )
    })

    it('should not login in an invalid user', (done) => {
        const username = 'testuser'
        const password = 'pwd'
        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            status: 401
        })
        logIn(username, password)(
            (action) => {
                switch (action.type) {
                    case 'errorLogin':
                        expect(action).to.eql({
                            type: 'errorLogin',
                            errMsg: 'username or password is wrong'
                        })
                        done()
                        break
                }
            }
        )
    })

    it('should login out an user', (done) => {
        mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        })
        logout()(
            (action) => {
                switch (action.type) {
                    case 'normalLogout':
                        expect(action).to.eql({type: 'normalLogout'})
                        break
                    case 'clearFollowerArticle':
                        expect(action).to.eql({type: 'clearFollowerArticle'})
                        done()
                        break
                }
            }
        )
    })
})