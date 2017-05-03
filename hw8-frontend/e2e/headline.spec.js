import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys, driver } from './selenium'
import common from './common'

describe('HW6 front-end E2E headline testing', () => {
    it('should log in', (done) => {
        go().then(common.login).then(done)
    })
    
    it("should update the headline and verify the change", (done) => {
        var oldHeadline = 'old headline'
        var newHeadline = 'new headline'
        sleep(500)
        // find the headline input
        .then(findId('inputStatus').clear())
        .then(findId('inputStatus').sendKeys(oldHeadline))
        .then(findId('btnUploadStatus').click())
        .then(sleep(1000))
        // verify the headline is updated
        .then(findId('currentStatus').getText()
            .then(text => {
                expect(text).to.equal(oldHeadline)
            }))
        .then(sleep(1000))
        .then(findId('inputStatus').clear())
        .then(findId('inputStatus').sendKeys(newHeadline))
        .then(findId('btnUploadStatus').click())
        .then(sleep(1000))
        // verify the headline is updated
        .then(findId('currentStatus').getText()
            .then(text => {
                expect(text).to.equal(newHeadline)
            }))
            .then(done)
    })

    it('should log out', (done) => {
        common.logout().then(done)
    })
})