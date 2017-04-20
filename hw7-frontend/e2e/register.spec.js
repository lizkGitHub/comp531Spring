import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys, driver } from './selenium'
import common from './common'

describe('HW6 front-end E2E register testing', () => {
    it('should Register a new user', (done) => {
        go()
        .then(sleep(1000))
        .then(findId('accountNameRG').clear())
        .then(findId('emailAddrRG').clear())
        .then(findId('phoneNumberRG').clear())
        .then(findId('zipCodeRG').clear())
        .then(findId('passwordRG').clear())
        .then(findId('passwordConfRG').clear())
        .then(findId('accountNameRG').sendKeys('testUserName'))
        .then(findId('emailAddrRG').sendKeys('test@rice.edu'))
        .then(findId('phoneNumberRG').sendKeys('111-111-1111'))
        .then(findId('dateOfBirthRG').sendKeys('1992/02/03'))
        .then(findId('zipCodeRG').sendKeys('77030'))
        .then(findId('passwordRG').sendKeys('pw'))
        .then(findId('passwordConfRG').sendKeys('pw'))
        .then(findId('signOn').click())
        .then(sleep(1000))
        .then(findId('infoSignOnSuccess').getText()
            .then(text => {
                expect(text).to.equal("Success! Now you can login in!")
            }))
        .then(done)
    })
})