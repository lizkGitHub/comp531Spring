import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate actions (these are functions that dispatch actions)', () => {
    let resource, url, navigate, errLogin, normalRegister, postArticle
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            
        }
        resource = require('./actions').resource
        url = require('./actions').url
        navigate = require('./actions').navigate
        errLogin = require('./components/auth/loginAction').errLogin
        normalRegister  = require('./components/auth/registerAction').normalRegister
        postArticle = require('./components/main/articleAction').postArticle
        

    })
    resource = require('./actions').resource
    url = require('./actions').url
    navigate = require('./actions').navigate
    errLogin = require('./components/auth/loginAction').errLogin
    normalRegister  = require('./components/auth/registerAction').normalRegister
    postArticle = require('./components/main/articleAction').postArticle

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('resource should be a resource (i.e., mock a request)', (done) => {
        mock(`${url}/headlines`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{
                username: 'usertest',
                headline: 'headline test'
            }
        })
        resource('GET', 'headlines')
            .then((res) => {
                expect(res).to.eql({
                    username: 'usertest',
                    headline: 'headline test'
                })
            })
            .then(done)
            .catch(done)
    })

    it('resource should give me the http error', (done) => {
        resource('GET', 'error').then((res) => {
        })
        .then(done)
        .catch((err) => {
            expect(err).to.exist
            done()
        })
    })

    it('resource should be POSTable', (done) => {
        const user = 'test'
        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json: {
                username: user,
                result:"success"
            }
        })

        resource('POST', 'login', { user, password: 'pwd' })
            .then((res) => {
                expect(res).to.eql({ username: 'test', result:"success"})
            })
            .then(done)
            .catch((err) => {
                expect(err).to.not.exist
                done()
            })
    })

    it('should navigate (to profile, main, or landing)', (done) => {
        const main = "main"
        const profile = "profile"
        const landing = "landing" 
        expect(navigate(main)).to.eql({ type: main})
        expect(navigate(profile)).to.eql({ type: profile})
        expect(navigate(landing)).to.eql({ type: landing})
        done()
    })

    it('should update error message (for displaying error mesage to user)', (done) => {
        const errMsg = "got an error"
        expect(errLogin(errMsg)).to.eql({type: 'errorLogin', errMsg : "got an error"})
        
        postArticle('')(
            (action => {
            expect(action).to.eql({ type: 'articleError', 
                msg:"please input something to share!"})
            done()
        }))
    })

    it('should update success message (for displaying success message to user)', (done) => {
        const msg = "register success"
        expect(normalRegister(msg)).to.eql({type: 'normalRegister', msg : "register success"})
        done()
    })

})