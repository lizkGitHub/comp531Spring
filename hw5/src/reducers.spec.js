import { expect } from 'chai'
import Reducer, {} from './reducers'

const initState = {
    navigate: {
        location: ''
    },
    logIn: {
        hasErrorLogIn: null, 
        errMsg:"", 
        authenticated: false 
    },
    register: {
        hasErrorSignOn: false, 
        successSignOn: false, 
        hasPwdErrorSignOn: false,
        errRegisterMsg:"", 
        successRegisterMsg:"" 
    },
    main: {
        headline: '', articles: [], followers: [], hasAddFollowerError: false, 
        btnEditArticle: true, btnAddCommentValue: true, hasAddArticleError: false, 
        filterText:'', errFollowerMsg:'', errMsg:'',  displayedArticles:[]
    },
    profile: {
        hasError: false,updateSuccess:false,successMsg:"", 
        profiles: {
            displayName: '',
            username: '',
            email: '',
            zipcode: '',
            headline: '',
            dob:'',
            avatar:''}, 
        errMsg:"" 
    },
}

describe('Validate reducer', () => {

    it('should initialize state', () => {
        expect(Reducer({}, {})).to.eql(initState)
    })

    const before = initState
    const testArticles = {
        "articles": [
            {
                "_id": 1111111,
                "text": "test article 1\r",
                "date": "2015-07-05T09:26:39.741Z",
                "img": null,
                "comments": [],
                "author": "aa8"
            },
            {
                "_id": 1111112,
                "text": "test article 2\r",
                "date": "2015-06-01T19:22:37.347Z",
                "img": null,
                "comments": [],
                "author": "bb3"
            }
        ]
    }
    it('should set the articles', () => {
        const state = Reducer(before, {
            type: 'getArticles',
            articles: testArticles.articles
        })
        expect(state).to.eql({
            ...before,
            main:{
                ...before.main,
                articles: testArticles.articles,
                displayedArticles: testArticles.articles
            }
        })
    })

    it('should set the search keyword', () => {
        const state = Reducer(before, {
            type: 'search',
            text: 'filterText'
        })
        expect(state.main.filterText).to.eql('filterText')
    })

    it('should filter displayed articles by the search keyword', () => {
    const stateSetArticles = Reducer(before, {
            type: 'getArticles',
            articles: testArticles.articles
        })
        expect(stateSetArticles).to.eql({
            ...before,
            main:{
                ...before.main,
                articles: testArticles.articles,
                displayedArticles: testArticles.articles
            }
        })


        const state = Reducer(stateSetArticles, {
            type: 'search',
            text: 'aa8'
        })
        expect(state.main.displayedArticles).to.eql([{
                "_id": 1111111,
                "text": "test article 1\r",
                "date": "2015-07-05T09:26:39.741Z",
                "img": null,
                "comments": [],
                "author": "aa8"
            }])
    })

    it('should state success (for displaying success message to user)', () => {
        const state = Reducer(before, {
            type: 'updateSuccess',
            successMsg: 'successfully update'
        })
        expect(state.profile.updateSuccess).to.eql(true)
        expect(state.profile.successMsg).to.eql('successfully update')
    })

    it('should state error (for displaying error message to user)', () => {
        const state = Reducer(before, {
            type: 'errorUpdateProfile',
            errMsg: 'error update'
        })
        expect(state.profile.hasError).to.eql(true)
        expect(state.profile.errMsg).to.eql('error update')
    })
})