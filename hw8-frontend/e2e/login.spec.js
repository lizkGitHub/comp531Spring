import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys, driver } from './selenium'
import common from './common'

describe('HW6 front-end E2E login testing', () => {

    it('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(5000)
            .then(findId('loggedInUsername').getText()
            .then(text => {
                expect(text).to.eql(common.creds.username)
            })
            .then(done))
    })

    it('should log out', (done) => {
        common.logout().then(done)
    })
})

