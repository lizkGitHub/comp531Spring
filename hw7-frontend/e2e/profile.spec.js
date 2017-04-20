import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys, driver } from './selenium'
import common from './common'

describe('HW6 front-end E2E profile testing', () => {
    it('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('Navigate to the profile view, Update the user\'s email and verify', (done) => {
        const oldEmail = 'old@rice.edu'
        const newEmail = 'new@rice.edu'
        sleep(500)
        .then(findId('nevToProfile').click())
        .then(sleep(1000))
        .then(findId('emailAddr').clear())
        .then(findId('emailAddr').sendKeys(oldEmail))
        .then(findId('submit').click())
        .then(sleep(500))
        .then(findId('email').getText()
            .then(text => {
                expect(text).to.equal(`${oldEmail}`)
            }))
        .then(findId('emailAddr').clear())
        .then(findId('emailAddr').sendKeys(newEmail))
        .then(findId('submit').click())
        .then(sleep(500))
        .then(findId('email').getText()
            .then(text => {
                expect(text).to.equal(`${newEmail}`)
            }))
        .then(done)
    })

    it('Navigate to the profile view, Update the user\'s zipcode and verify', (done) => {
        const oldZipcode = 77030
        const newZipcode = 77005
        sleep(500)
        .then(findId('zipCodeValue').clear())
        .then(findId('zipCodeValue').sendKeys(oldZipcode))
        .then(findId('submit').click())
        .then(sleep(500))
        .then(findId('zipCode').getText()
            .then(text => {
                expect(text).to.equal(`${oldZipcode}`)
            }))
        .then(findId('zipCodeValue').clear())
        .then(findId('zipCodeValue').sendKeys(newZipcode))
        .then(findId('submit').click())
        .then(sleep(500))
        .then(findId('zipCode').getText()
            .then(text => {
                expect(text).to.equal(`${newZipcode}`)
            }))
        .then(done)
    })

    it('Navigate to the profile view, Update the user\'s password,' 
        + 'verify a "will not change" message is returned', (done) => {
        const newPassword = 'testpw'
        const msg = 'password will not change at this time'
        sleep(500)
        .then(findId('pwdValue').clear())
        .then(findId('pwdValue').sendKeys(newPassword))
        .then(findId('pwdConfValue').clear())
        .then(findId('pwdConfValue').sendKeys(newPassword))
        .then(findId('submit').click())
        .then(sleep(500))
        .then(findId('successMsg').getText()
            .then(text => {
                expect(text.indexOf(msg)).to.be.above(0)
            }))
        .then(done)
    })

    it('should log out', (done) => {
        common.logout().then(done)
    })
})