import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Profile actions', () => {
    let url, resource, fetchField, putHeadline
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            global.fetch = fetch
            resource = require('./../../actions').resource
            url = require('./../../actions').url
            fetchField = require('./updateProfileAction').fetchField
            putHeadline = require('./updateProfileAction').putHeadline
            
        }
    })
    
    resource = require('./../../actions').resource
    url = require('./../../actions').url
    fetchField = require('./updateProfileAction').fetchField
    putHeadline = require('./updateProfileAction').putHeadline

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
            
        }
    })

    it('should fetch the user\'s proile(avatar) information', (done) => {
        const avatar = 'avatars'
        const user = 'zl'
        const endpointAvatar = `avatars/${user}`
        mock(`${url}/${endpointAvatar}`,{
            headers: {'Content-Type':'application/json'},
            json: { avatars: [
                { username:user, avatar:'url'}
            ]}
        })
        fetchField(avatar, user)(
            (action) => {
                expect(action.type).to.eql('updateAvatar')
                expect(action.avatar).to.eql('url')
                done()
            }
        )
    })

    it('should fetch the user\'s proile(email) information', (done) => {
        const email = 'email'
        const user = 'zl'
        const endpointEmail = `email/${user}`
        mock(`${url}/${endpointEmail}`,{
            headers: {'Content-Type':'application/json'},
            json: { email: [
                { username:user, email:'zl@rice.edu'}
            ]}
        })
        fetchField(email, user)(
            (action) => {
                expect(action.type).to.eql('updateEmail')
                expect(action.email).to.eql([
                    { username:user, email:'zl@rice.edu'}
                ])
                done()
            }
        )   
    })

    it('should fetch the user\'s proile(zipcode) information', (done) => {
        const zipcode = 'zipcode'
        const user = 'zl'
        const endpointZipcode = `zipcode/${user}`
        mock(`${url}/${endpointZipcode}`,{
            headers: {'Content-Type':'application/json'},
            json: { zipcode: [
                { username:user, zipcode:'11111'}
            ]}
        })
        fetchField(zipcode, user)(
            (action) => {
                expect(action.type).to.eql('updateZipcode')
                expect(action.zipcode).to.eql([
                    { username:user, zipcode:'11111'}
                ])
                done()
            }
        )   
    })

    it('should fetch the user\'s proile(headline) information', (done) => {
        const headline = 'headlines'
        const user = 'zl'
        const endpoint = `headlines/${user}`
        mock(`${url}/${endpoint}`,{
            headers: {'Content-Type':'application/json'},
            json: { headlines: [
                { username:user, headline:'new headline'}
            ]}
        })
        fetchField(headline, user)(
            (action) => {
                expect(action.type).to.eql('updateHeadline')
                expect(action.headline).to.eql('new headline')
                done()
            }
        )   
    })


    it('should update headline', (done) => {
        const newHeadline = 'new headline'
        mock(`${url}/headline`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json: {
                username: 'zl',
                headline: newHeadline
            }
        })

        putHeadline(newHeadline) (
            (action) => {
                expect(action.type).to.eql('updateHeadline')
                expect(action.headline).to.eql(newHeadline)
                done()
            }
        )  
    })
})