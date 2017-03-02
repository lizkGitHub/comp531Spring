import { combineReducers } from 'redux'

const initialArticles = require('./data/articles.json')
const initialProfiles= require('./data/profile.json')
const initialFollowers = require('./data/followers.json')

const navigate = (state = { location: '' }, action) => {
    switch(action.type) {
		case 'main':
			return { location:'main' };
		case 'profile':
			return { location:'profile' };
		case 'landing':
			return { location:'landing' };
		default: 
			return state;
	}
}

const logIn = (state = { hasErrorLogIn: null, errMsg:"" }, action) => {
    switch(action.type) {
    	case 'normalLogin':
    		return {  ...state, hasErrorLogIn: false };
	    case 'errorLogin':
			return {  ...state, hasErrorLogIn: true, errMsg: action.errMsg };
	    default:
	    	return state;
	}
}

const register = (state = { hasErrorSignOn: null, successSignOn: null, hasPwdErrorSignOn: null }, action) => {
    switch(action.type) {
		case 'normalRegister':
	    	return {  ...state, hasErrorSignOn: false, successSignOn: true, hasPwdErrorSignOn: false};
	    case 'errorRegister':
	    	return { ...state, hasErrorSignOn: true, successSignOn: false, hasPwdErrorSignOn: false};
	    case 'errorPwdRegister':
	    	return { ...state, hasErrorSignOn: false, successSignOn: false, hasPwdErrorSignOn: true};
	    default:
	    	return state;
	}
}

const main = (state = { headline: 'Happy Happy!', articles: initialArticles.articles, followers: initialFollowers.followers, hasAddFollowerError: false, btnEditArticle: true, btnAddCommentValue: true, hasAddArticleError: false, filterText:''}, action) => {
	 switch(action.type) {
		case 'updateHeadline':
			return { ...state,
				headline: action.headline };
		case 'editArticle':
			return state;
		case 'addComment':
			return state;
		case 'deleteFollower':
			return {
                ...state,
					followers : state.followers.filter(({name}) => name != action.delUser)
            }
		case 'addFollower':
			let newFollowers = state.followers.slice();
			newFollowers.push(action.newFollower)
			return {
				...state,
				followers : newFollowers,
				hasAddFollowerError: false
			};
		case 'addFollowerError':
			return {...state,
				hasAddFollowerError: true
			};
		case 'addArticle':
			let newArticles = state.articles.slice();
			newArticles.push(action.newArticle)
			return {
				...state,
				articles: newArticles
			}
		case 'addArticleError':
			return {
				...state,
				hasAddArticleError: true
			}
		case 'search':
			return {
				...state,
				filterText: action.text
			}
	    default:
	    	return state;
	}
}

const profile = (state = { hasError: false, profiles: initialProfiles.profiles, errMsg:"" }, action) => {
    switch(action.type) {
    	case 'normalUpdateProfile':
    		return { 
				...state,
				hasError: false,
				profiles: action.newProfiles };
	    case 'errorUpdateProfile':
			return { 
				...state,
				hasError: true,
				errMsg: action.errMsg};
	    default:
	    	return state;
	}
}

const Reducer = combineReducers({ navigate, logIn, register, main, profile });

export default Reducer;