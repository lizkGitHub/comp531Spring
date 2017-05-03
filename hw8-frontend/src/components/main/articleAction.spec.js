import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import * as articleAction from './articleAction'

describe('Validate Article actions', () => {
    let url, resource, getArticles, search
    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            global.fetch = fetch
            resource = require('./../../actions').resource
            url = require('./../../actions').url
            getArticles = require('./articleAction').getArticles
            search = require('./articleAction').search

        }
    })
    resource = require('./../../actions').resource
    url = require('./../../actions').url
    getArticles = require('./articleAction').getArticles
    search = require('./articleAction').search

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should fetch articles', (done) => {
        const username = 'testusername'
        const payload = {
            headers: {'Content-Type':'application/json'},
            json: { articles: [
                { id:1, author: 'Scott', text:'Test post 1' },
                { id:2, author: 'Zhaokang', text:'Test post 2' }
            ]}
        }
        mock(`${url}/articles`, payload)
        getArticles()(
            (action) => {
                expect(action.type).to.eql('getArticles')
                expect(action.articles.length).to.eql(2)
                done()
        })
    })

    it('should update the search keyword', (done) => {
        let newKeyword = "searchKey"
        var result = articleAction.search(newKeyword)
        expect(result).to.eql({ 
                "text": newKeyword, type: 'search'
            })            
        done()    
    })
})