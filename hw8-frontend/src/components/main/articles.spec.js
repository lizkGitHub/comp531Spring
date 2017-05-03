import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Articles } from './articles'
import { postArticle } from './articleAction'
import {shallow} from 'enzyme'
describe('ArticlesView (component tests)', () => {
    it('should render articles', () => {
        const articles = [
                {
                    "_id": 1111111,
                    "text": "article for user 11111111\r",
                    "date": "2016-06-04T03:22:35.721Z",
                    "img": null,
                    "comments": [],
                    "author": "ab6"
                },
                {
                    "_id": 1111112,
                    "text": "article for user 1111112\r",
                    "date": "2014-06-01T18:22:37.347Z",
                    "img": null,
                    "comments": [],
                    "author": "ab3"
                }
            ]
        const node = shallow(<Articles articles={articles} />)
        expect(node.children().length).to.equal(2)
    })

    it('should dispatch actions to create a new article', () => {
        let postArticle = require('./articleAction').postArticle
        postArticle('new article ...')(
            fn => fn(action => {
            expect(action).to.eql({ type: 'addArticle', newArticle})
            done()
        }))
    })
})