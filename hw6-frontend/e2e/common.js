import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'zl52test',
    password: 'would-dinner-character'
}

exports.login = () =>
    sleep(500)
        .then(findId('inputUserName').clear())
        .then(findId('inputPassword').clear())
        .then(findId('inputUserName').sendKeys(exports.creds.username))
        .then(findId('inputPassword').sendKeys(exports.creds.password))
        .then(findId('logIn').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('logOut').click())
    .then(sleep(1000))
