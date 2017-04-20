import { combineReducers } from 'redux'
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

const logIn = (state = { hasErrorLogIn: null, errMsg:"", authenticated: false }, action) => {
    switch(action.type) {
    	case 'normalLogin':
    		return {
				...state, 
				hasErrorLogIn: false,
				authenticated: true};
	    case 'errorLogin':
			return {  ...state, hasErrorLogIn: true, errMsg: action.errMsg, authenticated: false };
	    case 'normalLogout':
			return {  ...state, hasErrorLogIn: false, authenticated: false, errMsg:""};

		default:
	    	return state;
	}
}

const register = (state = { 
	hasErrorSignOn: false, 
	successSignOn: false, 
	hasPwdErrorSignOn: false, 
	errRegisterMsg:"", 
	successRegisterMsg:"" }, action) => {
    switch(action.type) {
		case 'normalRegister':
	    	return {  ...state, hasErrorSignOn: false, successSignOn: true, hasPwdErrorSignOn: false, successRegisterMsg: action.msg};
	    case 'errorRegister':
	    	return { ...state, hasErrorSignOn: true, successSignOn: false, hasPwdErrorSignOn: false, errRegisterMsg: action.msg};
	    case 'errorPwdRegister':
	    	return { ...state, hasErrorSignOn: false, successSignOn: false, hasPwdErrorSignOn: true};
	    default:
	    	return state;
	}
}

const main = (state = { 
	headline: '', 
	articles: [], 
	followers: [], 
	hasAddFollowerError: false, 
	btnEditArticle: true, 
	btnAddCommentValue: true, 
	hasAddArticleError: false, 
	errMsg:"",
	filterText:'', 
	errFollowerMsg:'', 
	displayedArticles:[]}, action) => {
	 switch(action.type) {
		case 'clearMain' :
			return {
				headline: '', 
				articles: [], 
				followers: [], 
				hasAddFollowerError: false, 
				btnEditArticle: true, 
				btnAddCommentValue: true, 
				hasAddArticleError: false, 
				errMsg:"",
				filterText:'', 
				errFollowerMsg:'', 
				displayedArticles:[]
			}
		case 'editArticle':
			return state;
		case 'addComment':
			return {
				...state,
				articles: state.articles.map((a) => {
					if (a._id === action._id) {
						action.article.showComments = true
						return action.article

					}
					return a
				}),
				displayedArticles: state.articles.map((a) => {
					if (a._id === action._id) {
						action.article.showComments = true
						return action.article

					}
					return a
				})
			}
		case 'deleteFollower':
			return {
                ...state,
				followers : state.followers.filter(({username}) => username != action.delUser)
            }
		case 'addFollower':
			let newFollowers = state.followers.slice();
			newFollowers.push(action.follower)
			return {
				...state,
				followers : newFollowers,
				hasAddFollowerError: false
			};
		case 'addFollowerError':
			return {...state,
				hasAddFollowerError: true,
				errFollowerMsg: action.data
			};
		case 'headlineError':
			return {...state,
				hasAddFollowerError: true,
				errFollowerMsg: action.data
			};
		case 'addArticle':
			let newArticles = state.articles.slice();
			newArticles.push(action.newArticle)
			return {
				...state,
				articles: newArticles,
				displayedArticles: newArticles
			}
		case 'addArticleError':
			return {
				...state,
				hasAddArticleError: true,
				errMsg: action.msg
			}
		case 'fetchError':
			return {
				...state,
				hasAddArticleError: true,
				errMsg: action.msg
			}
		case 'toggleComments':
            return {
                ...state,
                articles : state.articles.map((x) => {
                    if (x._id === action._id) {
                        x.showComments = action.showComments
                    }
                    return x
                }),
				displayedArticles: state.articles.map((x) => {
                    if (x._id === action._id) {
                        x.showComments = action.showComments
                    }
                    return x
                })

            }
		case 'getArticles':
			let newArticle = action.articles;

			// let newArticle = state.articles.concat(action.articles);
			return {
				...state,
				articles: newArticle,
				displayedArticles: newArticle
			}
		case 'editPostArticle':
			return {
				...state,
				articles: state.articles.map((a) => {
					if(a._id == action.id) {
						action.editedArticle.showComments = true
						return action.editedArticle
					}
					return a
				}),
				displayedArticles: state.displayedArticles.map((a) => {
					if(a._id == action.id) {
						action.editedArticle.showComments = true
						return action.editedArticle
					}
					return a
				})
			}
		case 'search':
			return {
				...state,
				filterText: action.text,
				displayedArticles: filter(state.articles, action.text)
			}
		case 'clearFollowerArticle':
			return {
				...state,
				followers:[],
				articles:[],
				displayedArticles:[]
			}
	    default:
	    	return state;
	}
}

const profile = (state = { hasError: false,updateSuccess:false,successMsg:"", profiles: {
    displayName: '',
    username: '',
    email: '',
    zipcode: '',
    headline: '',
	avatar:'',
	dob:''}, errMsg:"" }, action) => {
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
				successMsg: "",
				updateSuccess: false,
				errMsg: action.errMsg};
		case 'updateUsername':
			return {
				...state,
				hasError: false,
				profiles: {...state.profiles, username: action.username}
			}

		case 'updateEmail':
			return {
				...state,
				hasError: false,
				profiles: {...state.profiles, email: action.email}
			}
		case 'updateZipcode':
			return {
				...state,
				hasError: false,
				profiles: {...state.profiles, zipcode:action.zipcode}
			}
		case 'updateHeadline':
			return {
				...state,
				hasError: false,
				profiles: {...state.profiles, headline:action.headline}
			}
		case 'updateAvatar':
			return {
				...state,
				hasError: false,
				profiles: {...state.profiles, avatar:action.avatar}
			}
		case 'updateSuccess':
			return {
			...state,
			hasError: false,
			successMsg: action.successMsg,
			updateSuccess: true
		}
		case 'updateDOB':
			return {
			...state,
			hasError: false,
			profiles: {...state.profiles, dob:action.dob}
		}
		case 'clearProfile' :
			return {
				hasError: false,updateSuccess:false,successMsg:"", profiles: {
				displayName: '',
				username: '',
				email: '',
				zipcode: '',
				headline: '',
				avatar:'',
				dob:''}, errMsg:"" 
			}
	    default:
	    	return state;
	}
}

function filter(articles, target) {
	return articles.filter(({author, text}) => (author.indexOf(target) > -1 || text.indexOf(target) > -1))
}

const Reducer = combineReducers({ navigate, logIn, register, main, profile });
export default Reducer;